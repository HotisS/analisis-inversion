// Textos del analista (Paylocity, corte 2026-10-20). Citas con la letra de la nota ([A2] = fuente 2 de A.json; [P1] propia).
export default {
  limitaciones: 'Cifras en millones de USD, ejercicio a 30 de junio etiquetado por el año en que termina (FY2026 = jul-25 a jun-26). El último ejercicio real es FY2026 y no hay trimestres posteriores: el LTM es FY2026 (el 1T FY2027 se publica el 5-nov-2026 [D7]). Precio: cierre del 19-oct-2026 (166,17 USD); la sesión del 20-oct estaba abierta al hacer el análisis (170,32 USD a las 11:44 de Nueva York [D2]) y la decisión se comprueba con ese precio en las pruebas de robustez. Todo el análisis está en BPA GAAP, con los pagos en acciones (138,7 M USD en FY2026, 7,8 % de las ventas) como coste real, como en el informe de Paycom [P2]; el consenso de Yahoo (8,74 USD en FY2027) es BPA no GAAP y solo sirve de contraste. Los fondos de clientes (3.210,5 M) y sus obligaciones (3.209,0 M) quedan fuera de la caja y del puente: son dinero de nóminas en tránsito [A1]. Los intereses que cobra por ellos (120,0 M en FY2026) sí son ingresos de la empresa y se proyectan con la bajada de tipos de la guía (≈ 103 M en FY2027 [A8]). El PER actual de la regla usa el BPA de los próximos 12 meses (8,3 meses de FY2027e y 3,7 de FY2028e), la misma base que la historia. Calificación crediticia: no tiene (solo una línea bancaria). Precio de una acción en EUR: ≈ 148 EUR, un 0,5 % de una cartera de 30.000 EUR.',
  controles_explicados: [
    { control: 'Cambio de perímetro declarado (FY2022)', explicacion: 'No es una compra: el activo total salta de 2.414,9 a 4.809,0 M USD porque los fondos de clientes al cierre pasaron de ≈ 1.830 a ≈ 4.090 M (activo corriente sin caja) [A1]. Ese saldo depende del día en que cae el 30 de junio dentro del calendario de nóminas e impuestos y se compensa casi al céntimo con las obligaciones con clientes del pasivo; en FY2023 volvió a ≈ 2.760 M. Las compras de FY2022 (107,6 M; el fondo de comercio pasó de 33,7 a 101,9 M) añadieron poco a los ingresos, que crecieron un 34 % sobre todo por clientes nuevos y la vuelta del empleo tras la pandemia [A1, A4]. Por lo mismo, Altman Z (2,49, zona gris) no mide aquí la solvencia: el activo y el pasivo corriente están inflados por los fondos y la deuda neta es negativa.' },
    { control: 'Capitalización calculada ≈ publicada', explicacion: 'La calculada (8.890 M USD) usa el cierre del 19-oct (166,17 USD) y 53,5 M de acciones diluidas (53,06 M en circulación el 29-jul-2026 más la dilución) [A1]; la publicada por Yahoo (9.200 M) usa el precio de la sesión del 20-oct (170,32 USD) y ≈ 54 M de acciones [D2]. Con el mismo precio la diferencia es del 1 %.' },
  ],
  huecos: [],
  secciones: {
    rentabilidad: {
      comentario: 'El ROIC del motor es del 26,5 % en FY2026 (NOPAT de 269 M USD sobre un capital invertido de 1.014 M), frente a un WACC del 10,0 %: +16,5 puntos. Hay que restarle el flotante: sin los intereses de los fondos de clientes (120,0 M antes de impuestos), el NOPAT baja a ≈ 185 M y el ROIC a ≈ 18 %, todavía 8 puntos sobre el WACC [A1, A2]. El ROIC sin fondo de comercio (41,1 %) muestra que el negocio propio necesita muy poco capital; la compra de Airbase (320 M) bajó el ROIC total de 32,8 % en FY2024 a 26,5 % [A1]. El rendimiento del capital incremental (27 % de FY2017 a FY2026) está en línea. Lo que no se ve en el capital invertido es el coste real del crecimiento: los costes de contratos activados (559,2 M en balance; 177,1 M activados en FY2026) y los pagos en acciones, que este análisis trata como gasto [A1, A7]. El ROE (22 %) es menor que el ROIC porque la empresa tiene más caja que deuda.',
      confianza: 'Media',
    },
  },
  parches: [],
  huecos_resueltos: [],
  dcf_justificacion: {
    crecimiento: 'FY2027e (+6,6 %) es el centro de la guía de ingresos totales (1.880-1.895 M USD, +7 %) con un punto menos de intereses de fondos: recurrentes +8 % y fondos de 120,0 a ≈ 103 M por dos bajadas de tipos [A2, A8]. El consenso espera 1.894 M [D2]. FY2028e-FY2029e +8 %: recurrentes al 9 % (clientes +5-6 %, ingreso por cliente +2,5-3 % con módulos, Airbase y agentes de IA) y fondos planos; después baja hasta el 4 % en FY2034e. Es la mitad del crecimiento histórico (21,8 % anual) porque el mercado direccionable crece al 4,7 % y la empresa ya tiene el 7,3 % [B1, B2].',
    margenes: 'Margen EBITDA GAAP (con los pagos en acciones como gasto) del 28,9 % en FY2027e: guía de EBITDA ajustado de 690-700 M menos ≈ 145 M de pagos en acciones con cotizaciones y ≈ 5 M de otros ajustes [A2]. Incluye ≈ 1,3 puntos de la nueva vida de 8 años de los costes de contratos, que no cambia la caja (el DCF lo resta en la inversión) [A2]. Sube hasta el 35,5 % en FY2033e por el apalancamiento en ventas y administración y porque los pagos en acciones bajan del 7,8 % al 5 % de las ventas que se fija la empresa; equivale a un EBITDA ajustado del ≈ 40,5 %, el extremo bajo del objetivo de la empresa (40-45 %) [A11].',
    inversion: '«Capex» del 10,0 % de las ventas en FY2027e, que baja al 7,4 %: inmovilizado (≈ 2 %), software activado (69,3 M en FY2026, 3,9 %) y el aumento neto de los costes de contratos activados (47,9 M en FY2026, 2,7 %; ≈ 4 % en FY2027e porque la vida más larga baja la amortización y sube el saldo) [A1, A2]. Amortización del 6,3 % de las ventas (111,8 M en FY2026). Circulante del −1 % de las ventas: la empresa cobra por débito al pagar la nómina y tiene ingresos diferidos [A1].',
    wacc: 'Tasa libre del 5,15 % (bono del Tesoro a 10 años, 19-oct-2026 [D4]); beta de 0,90, la media de las medidas (0,64 ajustada mensual a 5 años, 1,09 ajustada semanal a 5 años, 0,72 semanal a 2 años [D1]) y la usada para Paycom [P2]; prima del 5,5 %; sin prima adicional (medio, líquido, sin riesgo país). Coste de la deuda del 6 % (SOFR + 1,00-1,625 % de la línea [A10]) con un peso del 1 %: deuda de 81,3 M frente a 8.890 M de capitalización. WACC del 10,04 %.',
    terminal: 'Crecimiento a perpetuidad del 3,0 %, el mismo que en Paycom [P2]: el empleo y los salarios nominales crecen ≈ 3-4 % y la empresa aún gana cuota. El múltiplo de salida implícito es de ≈ 8 veces el EBITDA, bajo para software, porque el WACC del 10 % es exigente; con la prima del mercado (4,2 %) el DCF sube a 148,05 USD.',
  },
  puente_comentarios: {
    'FY2027e': 'Guía [A2, A8]: recurrentes +8 % (clientes nuevos ≈ 5,5 %, ingreso por cliente ≈ 2 %, con plantillas de clientes planas) y −1 punto por los intereses de fondos (120,0 → ≈ 103 M).',
    'FY2028e': 'Clientes +5,5 % y precio y módulos +2,5 %; intereses de fondos planos (tipos ya bajados).',
    'FY2029e': 'Igual que FY2028e: Airbase, agentes de IA y venta cruzada sostienen el ingreso por cliente.',
    'FY2030e': 'Volumen del 5 %: menos clientes nuevos en un mercado del que ya tiene el 8 %.',
    'FY2031e': 'Volumen del 4,5 % y precio del 2,5 %; cuota implícita del 9,0 % del mercado direccionable.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'El crecimiento proyectado (6,5 % medio en FY2027e-FY2034e) es menos de un tercio del histórico (21,8 % anual) y algo mayor que el del mercado (4,7 % del Census [B2]); la cuota sube del 7,3 % al 9,0 % en FY2031e, 1,2 veces la actual, con una retención del 92 % y un 25 % de ventas nuevas por corredores y asesores [A1, A8]. El negocio no necesita capital nuevo para crecer: la reinversión bruta (capex + circulante) del 42 % del NOPAT financia un 11,1 % al ROIC actual, y la proyección supone un rendimiento del 22,2 % frente al 27 % histórico. La parte frágil no es la reinversión sino dos ingresos que no dependen de la empresa: los intereses de los fondos (≈ 6 % de las ventas, ≈ 25 % del EBIT) y el número de empleados de los clientes (cobro por empleado).',
  dcf_lectura: 'El DCF da 123,12 USD por acción, un 25,9 % bajo el precio, con un WACC del 10,04 % y un valor terminal que pesa el 65 %. El DCF inverso dice que el precio descuenta un crecimiento del 11,3 % anual durante ocho años con nuestros márgenes (o un margen EBITDA final del 44,9 % con nuestro crecimiento), frente al 6,5 % de nuestro base y al 7 % de la guía de FY2027: la rentabilidad implícita en el precio es del 8,3 %, menos que el WACC. Con la prima implícita del mercado (4,2 %, WACC 8,9 %) el DCF sube a 148,05 USD, todavía un 10,9 % bajo el precio. El rango del DCF (WACC y crecimiento ± 0,5) va de 110,10 a 140,38.',
  narrativas: {
    Bajista: 'La Reserva Federal baja los tipos a corto al 2 % y los intereses de los fondos caen ≈ 70 M; la IA y un empleo plano reducen los empleados por cliente, y Rippling, ADP y Paychex-Paycor presionan precios: 3 puntos menos de crecimiento y de margen y un WACC medio punto mayor.',
    Base: 'Guía de FY2027 cumplida (+7 %), recurrentes al 8-9 % dos años y desaceleración hasta el 4 %; margen EBITDA GAAP del 28,9 % al 35,5 % con menos pagos en acciones; intereses de fondos ≈ 103 M y planos.',
    Alcista: 'Los agentes de IA se cobran aparte, Airbase y la venta cruzada suben el ingreso por cliente y los tipos se quedan donde están: 1,5 puntos más de crecimiento y de margen (EBITDA ajustado ≈ 42 %, dentro del objetivo de la empresa).',
  },
  escenarios_comentario: 'Los tres escenarios del DCF quedan bajo el precio: el alcista vale 142,82 USD (−14,1 %) y el bajista 81,27 (−51,1 %). Para que el valor intrínseco llegue a 166 USD hace falta a la vez un WACC del 9 % y un crecimiento a perpetuidad del 3,5 % (153 USD) o el EBITDA ajustado del 45 %, el techo del objetivo de la empresa. El precio no paga el negocio de hoy sino el éxito del plan a largo plazo.',
  casos_12m: {
    Bajista: 'Crecimiento del 5,0 % en FY2028e y margen EBITDA GAAP 3 puntos menor (tipos al 2 %, plantillas en caída, presión de precios): BPA GAAP de 5,71 USD y el PER vuelve a su mínimo adelantado de cinco años (17,9 veces, el de junio de 2026 en plena venta del software por la IA).',
    Base: 'Ventas +6,6 % en FY2027e y +8,0 % en FY2028e, margen EBITDA GAAP del 30,5 %, amortización del 6,3 %, impuesto del 27 % y 53,9 M de acciones sin recompras nuevas: BPA GAAP de 6,70 USD (+16,7 % anual desde 4,92). La regla da 29,9 veces: el PER actual (27,2) a mitad de camino hacia la mediana adelantada (36,8) con el tope de ×1,1.',
    Alcista: 'Un 1,5 puntos más de crecimiento y de margen por la monetización de la IA y Airbase: BPA GAAP de 7,21 USD × el techo de la regla (base × 1,35 = 40,4 veces).',
  },
  diferencia_consenso: 'El consenso (8,74 USD en FY2027 y 9,72 en FY2028 [D2]) es BPA no GAAP: excluye los pagos en acciones (≈ 145 M), la amortización de intangibles comprados (≈ 21 M) y otros ajustes, con un impuesto normalizado. Nuestro BPA GAAP de FY2027e (5,84) equivale a ≈ 8,6-8,7 USD no GAAP, en línea con el consenso; el de FY2028e (6,70) a ≈ 9,6. Coincidimos en el negocio; la diferencia es de base contable. El objetivo medio de los analistas (172,60 USD) está un 14 % bajo nuestro base a 12 meses (200,33), porque la regla aplica un PER GAAP de 29,9 veces, por debajo de su historia.',
  objetivo_comentario: 'El objetivo a 12 meses (198,54 USD, ponderado) queda un 19,5 % sobre el precio y el base (200,33 USD) un 20,6 %: pasan los umbrales de la regla (15 % y 12 %). No es Comprar porque falla la tercera condición: el valor intrínseco (131,70 USD) está un 20,7 % bajo el precio. La regla a 12 meses mira el rebote del múltiplo frente a su propia historia (el PER adelantado era de 33-51 veces en FY2023-FY2025) y el DCF mira el flujo de caja: los dos no pueden tener razón a la vez durante mucho tiempo. La historia del PER es de una empresa que crecía al 20-30 %; hoy crece al 7-8 % y la mediana de cinco años está inflada por la burbuja de 2021-2022. El bajista (102,21 USD, −38,5 %) muestra lo que pasa si el múltiplo vuelve al de junio de 2026.',
  valoracion_comentario: 'Pesos: DCF 45 %, escenarios 30 %, comparables 20 % y transacciones 5 %. El DCF es el método más fiable para un negocio estable de cobro recurrente, con dos ajustes que lo hacen exigente: los pagos en acciones como coste (7,8 % de las ventas hoy, 5 % a largo plazo) y la bajada de tipos en los intereses de fondos. Los comparables (151,89 USD con el PER no GAAP de los próximos 12 meses, mediana de 16,8 veces: ADP, Paychex, Paycom, Workday, Intuit y TriNet [D6]) dan más porque el sector cotiza barato tras la venta de 2026, pero Paylocity cotiza con prima (≈ 18-19 veces el BPA no GAAP). Las transacciones (212,81 USD: Dayforce, Paycor, Ultimate a 6,3-10 veces las ventas [D14-D17]) incluyen prima de control y pesan poco: no hay ninguna oferta y el fundador tiene el 15,6 % [C1]. Síntesis: 131,70 USD (−20,7 %); con la prima del mercado, 149,88 (−9,8 %).',
  catalizadores: {
    items: [
      { fecha: '2026-11-05', evento: 'Resultados del 1T FY2027', efecto: 'Guía de ingresos (1.880-1.895 M USD) y de EBITDA ajustado (690-700 M); primera lectura de plantillas, intereses de fondos y agentes de IA', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-12-03', evento: 'Junta de accionistas', efecto: 'Salida del consejero Craig Conway; voto de remuneración (93 % a favor en 2025)', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-01 y 2027-03', evento: 'Bajadas de tipos de la Reserva Federal (las dos de la guía)', efecto: '≈ 9 M USD menos de intereses de fondos por cada 25 pb al año, ≈ 0,12 USD de BPA', probabilidad: 'Media', sentido: '−' },
      { fecha: '2027-02', evento: 'Resultados del 2T FY2027 y altas de enero', efecto: 'El tercer trimestre fiscal es el más fuerte: lectura de ventas nuevas y del cobro de la IA', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-08', evento: 'Resultados de FY2027 y guía de FY2028', efecto: 'Si la guía de recurrentes vuelve al 9-10 %, el DCF sube', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Continuo', evento: 'Recompras (≈ 1.300 M USD autorizados; 398,1 M en FY2026)', efecto: 'Hasta +3-4 % de BPA al año si mantiene el ritmo de FY2026', probabilidad: 'Media', sentido: '+' },
      { fecha: 'Mensual', evento: 'Empleo privado de EE. UU. (+0,5 % interanual a septiembre de 2026)', efecto: 'Cobro por empleado: un empleo en caída resta ingresos sin perder clientes', probabilidad: 'Media', sentido: '+/−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Valoración: el precio descuenta un 11,3 % de crecimiento anual durante ocho años frente al 7 % de la guía', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−26 % hasta el DCF; −38 % si el PER vuelve al mínimo de junio de 2026', mitigante: 'La regla a 12 meses da +20 % por el rebote del múltiplo; el consenso no GAAP sube.' },
      { riesgo: 'Bajada de tipos: los intereses de los fondos de clientes (120,0 M USD en FY2026, ≈ 25 % del EBIT) bajan con el tipo a corto', tipo: 'Mercado', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−0,47 USD de BPA por cada 100 pb (−7 %); −1,41 USD (−24 %) con tipos a cero', mitigante: 'La guía ya incluye dos bajadas (≈ 103 M); parte de los fondos está invertida a plazo [A1, A8].' },
      { riesgo: 'IA: menos empleados en los clientes (cobro por empleado) y presión sobre el precio del software por usuario', tipo: 'Tecnología', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−10 a −20 % a 3-5 años en el bajista', mitigante: 'Cobra por todos los empleados del cliente, no por usuarios de RR. HH., y la mayoría son de planta, sanidad y servicios; vende agentes de IA aparte [A8].' },
      { riesgo: 'Empleo de EE. UU.: plantillas de clientes planas o en caída', tipo: 'Ciclo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−3 a −5 % de ingresos en una recesión como la de 2020', mitigante: 'La guía ya supone plantillas planas; la retención es del 92 % [A1, A8].' },
      { riesgo: 'Competencia: ADP, Paychex-Paycor, Paycom, Dayforce (Thoma Bravo) y Rippling en empresas medianas', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−1 a −2 puntos de crecimiento', mitigante: 'Mercado fragmentado (cuota del 7,3 %); corredores aportan > 25 % de las ventas nuevas [B1, A8].' },
      { riesgo: 'Pagos en acciones y ventas de directivos', tipo: 'Gobierno', probabilidad: 'Alta', impacto: 'Bajo', efecto_valor: '7,8 % de las ventas; 32,7 M USD vendidos en 12 meses, ninguna compra', mitigante: 'Objetivo del 5 % y recompras de 398,1 M en FY2026 [A11, C4].' },
      { riesgo: 'Seguridad de datos y fraude en los fondos de clientes', tipo: 'Operativo', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: 'Pérdida de clientes y multas', mitigante: 'ISO 27001, SOC 1/SOC 2; sin incidentes materiales declarados [A1].' },
    ],
    premortem: 'Octubre de 2027: la acción ha perdido un 35 %. No fue un mal año de producto sino de precio y de ciclo: la Reserva Federal bajó tres veces en lugar de dos, los intereses de los fondos cayeron a ≈ 85 M, y los clientes medianos recortaron plantillas administrativas con la IA mientras el empleo privado se quedaba plano. La guía de FY2028 llegó con recurrentes al 6 %, el mercado volvió a vender el software por usuario como en febrero de 2026 y el PER GAAP volvió a 18-20 veces. El valor intrínseco que el DCF marcaba (123 USD) resultó ser el suelo, no el techo.',
    ia: {
      exposicion: 'Media', sentido: 'Mixto', efecto_valor: '−10 a +5 % a 3-5 años',
      comentario: 'La IA corta en los dos sentidos. En contra: Paylocity cobra por empleado del cliente al mes, así que todo lo que reduzca plantillas en sus clientes (atención al cliente, contabilidad, administración) le quita ingresos sin perder clientes; y el mercado teme que agentes de IA y herramientas más baratas abaraten el software de RR. HH. por usuario: ese miedo hundió la acción un 45 % entre enero y abril de 2026 (−7,2 % el 6-feb pese a batir resultados) [D1, B9]. Rivales nuevos con capital riesgo (Rippling) construyen sobre una base de datos de empleado única que encaja bien con la IA [B10]. A favor: el 80-90 % de los empleados de sus clientes trabaja en planta, sanidad, comercio y servicios, donde la IA quita menos puestos; la nómina y los impuestos son un servicio con responsabilidad legal que la IA no elimina sino que automatiza dentro de la plataforma; y la empresa vende agentes de IA aparte («monetización directa incremental»), está abierta a cobrar por uso, compró Aidora (gestión de bajas con IA) y las interacciones con su IA casi se duplicaron en el 4T26 [A8, D9]. La guía de FY2027 ya supone plantillas planas. Nuestro bajista (−3 puntos de crecimiento y de margen) es el caso en que la IA resta empleados y precio a la vez; el alcista es el caso en que la cobra.',
    },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Fondos de clientes', pregunta: '¿Qué parte de los 3.400-3.500 M USD de saldo medio está invertida a plazo fijo y a qué rentabilidad, y cuánto bajan los intereses por cada 25 pb de recorte?', por_que: 'Son ≈ 25 % del EBIT; 100 pb son ≈ 0,47 USD de BPA [A8, P3].' },
      { tema: 'IA y plantillas', pregunta: '¿Cuántos empleados por cliente se facturaron en FY2026 frente a FY2025, y qué parte de los clientes ha reducido plantilla administrativa?', por_que: 'Separa el efecto de la IA del ciclo del empleo.' },
      { tema: 'Cobro de la IA', pregunta: '¿Cuántos ingresos dan ya los agentes de IA y con qué modelo de precio (por empleado, por uso)?', por_que: 'Es lo que convierte el riesgo de IA en el alcista.' },
      { tema: 'Costes de contratos', pregunta: '¿Por qué se alarga la vida de 7 a 8 años y cuál es la duración media real de un cliente?', por_que: 'Sube el margen GAAP 1,2-1,4 puntos sin cambiar la caja [A2].' },
      { tema: 'Pagos en acciones', pregunta: '¿Cuándo llegará al 5 % de las ventas desde el 7,8 % y cuánto de la recompra solo compensa la dilución?', por_que: 'Es la mayor diferencia entre el BPA GAAP y el ajustado.' },
      { tema: 'Competencia', pregunta: '¿Cómo ha cambiado la tasa de victorias frente a Paychex-Paycor, Dayforce y Rippling en el último año?', por_que: 'El mercado medio se ha concentrado en 2025 con dos compras grandes [D14, D15].' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener, con convicción media. La regla a 12 meses da un objetivo de 198,54 USD (nuestro BPA GAAP de FY2028e × el PER de la regla común), +19,5 % ponderado y +20,6 % el base, que pasarían el umbral de compra; pero el valor intrínseco (131,70 USD) está un 20,7 % bajo el precio de 166,17 USD (cierre del 19-oct-2026), y la regla exige las tres condiciones. La acción ha subido un 59 % desde junio y está en máximos de 52 semanas. La convicción es media porque las dos lecturas chocan: el múltiplo frente a su historia invita a comprar y el flujo de caja no; subiría si la guía de FY2028 vuelve a recurrentes del 10 % o el precio baja hacia el valor intrínseco, y bajaría con más recortes de tipos o plantillas de clientes en caída.

**El negocio.** Paylocity vende por suscripción software en la nube de nóminas, impuestos, RR. HH., gastos y tiempo a ≈ 44.400 empresas medianas de EE. UU. (de 10 a 5.000 empleados; media de más de 150), y cobra por empleado al mes [A1]. Tiene el 7,3 % de su mercado direccionable (22.500 M USD), una retención del 92 % y ningún cliente con más del 1 % [B1]. Gana además intereses por los fondos de nómina de sus clientes que tiene en tránsito (120,0 M en FY2026) [A2].

**Finanzas.** Ingresos de 1.771,3 M (+11 %), margen EBITDA GAAP del 28,1 % y BPA GAAP de 4,92 USD (+22 %); flujo libre de 427,8 M (24 % de las ventas), sin deuda neta [A1, A2]. Dos partidas pesan: los pagos en acciones (138,7 M, 7,8 % de las ventas) y los intereses de fondos, que son ≈ 25 % del EBIT y bajan a ≈ 103 M en FY2027 con los tipos [A8]. La guía de FY2027 es de +7 % de ventas.

**Equipo y gobierno.** El fundador Steve Sarowitz tiene el 15,6 % y el presidente ejecutivo Steve Beauchamp, consejero delegado hasta 2025, el 3,5 % [C1]. La dirección ha batido su guía inicial cuatro años seguidos [C5]. Presidente ejecutivo no independiente; voto de remuneración del 93 % [C2]. Los directivos vendieron 32,7 M USD en 12 meses, casi todo con planes programados, sin compras [C4].

**Valoración.** El DCF da 123,12 USD (−25,9 %) con un WACC del 10,0 %; el DCF inverso descuenta un 11,3 % de crecimiento anual durante ocho años frente al 6,5 % de nuestro base y al 7 % de la guía. Con la prima del mercado (4,2 %), 148,05 USD. Los comparables dan 151,89 y las transacciones, con prima de control, 212,81. Calidad alta: ROIC del 26,5 % (≈ 18 % sin el flotante) frente a un WACC del 10,0 %, y crecimiento sostenible (prueba superada).

**Riesgos y catalizadores.** El primero es el precio: si el PER vuelve al de junio de 2026 (18 veces), −38 %. Después, la bajada de tipos (100 pb restan ≈ 0,47 USD de BPA, un 7 %), la IA (menos empleados en los clientes y precio del software por usuario, frente a la venta de agentes de IA) y el empleo de EE. UU. Resultados del 1T FY2027 el 5-nov-2026.

**Qué cambiaría la decisión.** Comprar por debajo de 131,70 USD (el valor intrínseco), con la rentabilidad a 12 meses muy por encima de los umbrales a ese precio; Vender por encima de 220,60. Una guía de FY2028 con recurrentes al 10 % y pagos en acciones hacia el 5 % subiría el DCF; dos bajadas más de tipos o plantillas en caída reforzarían Mantener.`,
    tesis: 'Paylocity es un buen negocio, recurrente, con un ROIC del 26 % y sin deuda neta, que sigue ganando cuota en un mercado fragmentado de nóminas y RR. HH. para empresas medianas. El precio, tras subir un 59 % desde junio, ya descuenta más crecimiento del que la empresa guía: el DCF da 123 USD y el precio pide un 11 % anual durante ocho años con dos vientos en contra (la bajada de tipos sobre los intereses de los fondos y la IA sobre las plantillas de los clientes).',
    vision_diferencial: {
      mercado_descuenta: 'Que la venta de software por miedo a la IA fue exagerada, que Paylocity cobra la IA en lugar de sufrirla y que el BPA no GAAP crece al 10-11 % (8,74 → 9,72 USD); los analistas esperan 172,60 USD, un 4 % sobre el precio [D2].',
      nuestra_vision: 'Coincidimos en el negocio (nuestro BPA GAAP equivale al consenso no GAAP) y discrepamos en el precio: con los pagos en acciones como coste y los intereses de fondos a la baja, el flujo libre del accionista no justifica 27 veces el BPA GAAP de los próximos 12 meses con un crecimiento del 7-8 %.',
      por_que: 'El rebote desde 93 USD fue de múltiplo, no de beneficios (la guía de FY2027 es la más baja de su historia). La historia del PER que justifica el rebote es la de una empresa que crecía al 20-30 %.',
    },
    a_favor: [
      '**Negocio recurrente y fiel**: retención del 92 %, ningún cliente con más del 1 % de las ventas.',
      '**ROIC del 26,5 %**: ≈ 18 % sin el flotante; ≈ 8-16 puntos sobre el WACC.',
      '**Sin deuda neta y recompras**: 398,1 M recomprados en FY2026; ≈ 1.300 M autorizados.',
      '**Guía cumplida**: cuatro años batiendo la guía inicial de ingresos y EBITDA.',
      '**Margen al alza**: EBITDA GAAP del 15,8 % en FY2022 al 28,1 % en FY2026.',
    ],
    en_contra: [
      '**Valor intrínseco bajo el precio**: DCF de 123 USD (−26 %); el precio descuenta un 11 % anual.',
      '**Intereses de fondos**: ≈ 25 % del EBIT y bajan con los tipos (−17 M en FY2027).',
      '**IA y empleo**: cobro por empleado del cliente con empleo privado al +0,5 %.',
      '**Pagos en acciones**: 7,8 % de las ventas; los directivos venden (32,7 M USD), no compran.',
      '**Tras un +59 %**: en máximos de 52 semanas, con avisos P1 y P2.',
    ],
    que_vigilar: 'La tesis depende de que los recurrentes sigan creciendo al 8-9 % con plantillas planas, de que la IA se cobre aparte y de que los intereses de fondos se queden en ≈ 100 M. La señal en contra sería una guía de recurrentes por debajo del 7 % o un ingreso por cliente que deja de crecer.',
    cambiaria_recomendacion: [
      'Precio por debajo de 131,70 USD: Comprar (ponderada ≥ 15 %, base ≥ 12 % y valor intrínseco por encima del precio).',
      'Precio entre 131,70 y 220,60 USD: Mantener.',
      'Guía de FY2028 (agosto de 2027) con recurrentes ≥ 10 % y pagos en acciones ≤ 6 % de las ventas: revisar el DCF al alza.',
      'Ingresos por intereses de fondos por debajo de 85 M USD o plantillas de clientes en caída dos trimestres: reforzar Mantener o pasar a Vender.',
    ],
    kpis_seguimiento: [
      { kpi: 'Ingresos recurrentes (crecimiento)', nivel_actual: '+12,2 % (FY2026); guía FY2027 +8 %', umbral_alerta: '< +7 %', por_que: 'Motor del valor.' },
      { kpi: 'Intereses de fondos de clientes', nivel_actual: '120,0 M USD (FY2026); ≈ 103 M guía', umbral_alerta: '< 85 M', por_que: '≈ 25 % del EBIT.' },
      { kpi: 'EBITDA ajustado (guía FY2027)', nivel_actual: '690-700 M USD', umbral_alerta: '< 690 M', por_que: 'Base del BPA.' },
      { kpi: 'Pagos en acciones (% de ventas)', nivel_actual: '7,8 %', umbral_alerta: '> 8 %', por_que: 'Coste real; objetivo del 5 %.' },
      { kpi: 'Empleo privado de EE. UU.', nivel_actual: '+0,5 % interanual (sept-2026)', umbral_alerta: '< 0 %', por_que: 'Cobro por empleado.' },
    ],
  },
};
