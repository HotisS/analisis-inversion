// Textos del analista (Grupo Aeroméxico, corte 2026-10-18). Las cifras del motor se copian de calc tras el último cálculo.
const nulos = [];
for (const i of [2, 3, 4, 5, 6]) nulos.push({ ruta: `comparables.empresas[${i}].ev_ebitda_ltm`, valor: null });
for (let i = 0; i < 7; i++) nulos.push({ ruta: `comparables.empresas[${i}].ev_ventas`, valor: null });

export default {
  limitaciones: 'Línea analizada: el ADS de la Bolsa de Nueva York (AERO), en USD; cada ADS equivale a 10 acciones ordinarias, que también cotizan en la Bolsa Mexicana de Valores (AERO, símbolo de Yahoo AERO.MX). Todas las cifras por acción del informe son **por ADS** (145,9 M de ADS = 1.459 M de acciones). Precio: cierre del viernes 16-oct-2026. La herramienta de cuentas de la SEC no sirve aún (la empresa solo tiene datos de portada en el XBRL): las cuentas salen a mano del 20-F de 2025, del folleto de la salida a bolsa (424B1) y del F-1 de 2024, y los trimestres de los 6-K. La empresa presenta en USD (moneda funcional) con NIIF del IASB y la cuenta por naturaleza: el «coste de ventas» del informe es el queroseno y no hay gastos generales separados. El EBITDA es el resultado de explotación más amortizaciones (NIIF 16: sin alquiler de aviones), no el EBITDAR ajustado de la empresa. El EBITDA trimestral es aproximado (EBITDAR menos alquileres a corto plazo). El consenso de MarketScreener viene en pesos y se pasó a USD; su BPA no cuadra con su beneficio neto. No hay historia del PER útil: antes del Chapter 11 (2020-2022) la acción era otra estructura de capital.',
  controles_explicados: [
    { control: 'Tipo impositivo efectivo razonable (2023)', explicacion: 'El 5,0 % de 2023 y el 11,4 % de 2024 (15,0 % en 2025) salen del reconocimiento de pérdidas fiscales anteriores que estaban provisionadas y de la diferencia de cambio de la moneda funcional; quedan 1.918 M de pérdidas sin reconocer (575 M de efecto fiscal) [A1]. El DCF no proyecta esos tipos: usa el 20 % en 2026-2028, el 25 % en 2029-2030 y el 30 % legal desde 2031.' },
    { control: 'Tipo impositivo efectivo razonable (2024)', explicacion: 'Ver 2023: reconocimiento de pérdidas fiscales y efecto de la moneda funcional [A1].' },
    { control: 'Compra robusta (v3 y v2 dan Comprar)', explicacion: 'No hay historia del PER de ningún tipo (el ADS cotiza desde nov-2025): v3 y v2 caen en la misma regla (base = PER actual) y no hay contraste posible. La robustez lo marca como poco firme (M2) y lo tratamos como motivo para esperar.' },
  ],
  huecos: [
    { seccion: 'sentimiento', campo: 'sección entera', tipo: 'Complemento', intentos: '1) Stocktwits (0 mensajes de AERO en la API pública); 2) Seeking Alpha (el canal RSS solo da noticias, sin comentarios); 3) búsqueda web de debate en foros en español e inglés (sin hilos con contenido tras la salida a bolsa)', decision: 'Omitido' },
  ],
  parches: [
    ...nulos,
    { ruta: 'balance.vencimientos', valor: [{ anio: '2029', importe: 500 }, { anio: '2031', importe: 610 }] },
    { ruta: 'comparables.comentario', valor: 'Aeroméxico cotiza a 7,3 veces el BPA de los próximos 12 meses del consenso, frente a una mediana de 9,8 de los comparables (8,4-11,0), y a 4,1 veces el EBITDA de los últimos 12 meses frente a 5,3-6,1 de LATAM y Copa [D5, D6, D10]. Solo se usa el EV/EBITDA de las dos que publican con NIIF 16 como Aeroméxico: las de EE. UU. (US GAAP) restan el alquiler de los aviones del EBITDA y Volaris sale con un margen del 6,3 % en el proveedor que no es el de sus cuentas, y no se comparan; el EV/ventas tampoco, porque depende de cuánta flota es propia. El descuento frente a Copa y LATAM, con ROIC del 16,6 % y del 27,1 %, se explica por la deuda (2,1 veces el EBITDA), el riesgo del peso y la huelga de pilotos; no por la rentabilidad, que es mayor. Usamos el PER de la mediana como referencia del alcista a 12 meses.' },
  ],
  huecos_resueltos: [],
  veredicto: 'Sí',
  secciones: {
    rentabilidad: {
      comentario: 'El ROIC del informe ya cuenta los aviones arrendados: el capital invertido suma patrimonio, deuda y arrendamientos (2.956 M en 2025) y resta la caja, así que el patrimonio negativo tras el Chapter 11 (−594 M) no lo infla. Da un 32,9 % en 2025 (45,3 % en 2024 y 39,9 % en 2023) frente a un WACC del 9,78 %: unos 23 puntos de diferencia, no los +150 de los filtros que dividen por un patrimonio negativo o casi nulo y olvidan los arrendamientos. Lo comprobamos por el activo: inmovilizado con derechos de uso, intangibles, depósitos y circulante menos el anticipo de billetes y el programa de puntos suman unos 2.708 M de media en 2024-2025 [A1]. Con ese capital el ROIC es del 26,7 %, y con un EBIT de mitad de ciclo (12,3 % de margen sobre 6.084 M) y el 30 % de impuestos, del 17,5 % [P1]. Lo mueve el margen y una rotación de 2 veces. El ROIC incremental (44,4 %) recoge la salida del Chapter 11 y no se repite. Copa (16,6 %) y LATAM (27,1 %) quedan por debajo [D6, D10]: Aeroméxico crea valor con holgura incluso a mitad de ciclo.',
      confianza: 'Media',
    },
    catalizadores: {
      items: [
        { fecha: '2026-10-19', evento: 'Resultados del 3T26 (conferencia el 20-oct)', efecto: 'Guía del trimestre de 1.590-1.620 M y margen operativo del 14-17 %; un margen bajo el 14 % recortaría nuestro BPA de 2027', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: '2026-10-26', evento: 'Junta: recompra de hasta 100 M USD al año', efecto: 'Un 4 % de la capitalización al año si se ejecuta entera', probabilidad: 'Alta', sentido: '+' },
        { fecha: '2026-11 (mediados)', evento: 'Fin de la prórroga del emplazamiento a huelga de los pilotos (ASPA)', efecto: 'Una huelga de dos semanas costaría unos 0,3-0,4 USD de BPA; un acuerdo despeja la compra', probabilidad: 'Media', sentido: '+/−' },
        { fecha: '2026-11 en adelante', evento: 'Primera fecha de amortización anticipada de los bonos del 8,625 % de 2031 (104,125)', efecto: 'Refinanciar a menor cupón ahorraría 15-25 M de intereses al año', probabilidad: 'Media', sentido: '+' },
        { fecha: '2027-02', evento: 'Resultados del 4T26 y guía de 2027', efecto: 'Nuestro base supone un margen EBITDA del 27 % en 2027', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: '2027', evento: 'Recurso del DOT contra la sentencia que anuló el fin de la inmunidad de la empresa conjunta con Delta', efecto: 'Perder la inmunidad restaría ingresos transfronterizos coordinados', probabilidad: 'Baja', sentido: '−' },
        { fecha: '2027 (a partir de mayo)', evento: 'Fin de los periodos de bloqueo y posibles colocaciones de Apollo, Silver Point o Delta', efecto: 'Oferta de papel sobre un flotante del 21 %', probabilidad: 'Media', sentido: '−' },
      ],
      confianza: 'Media',
    },
    riesgos: {
      items: [
        { riesgo: 'Precio del queroseno (sin coberturas)', tipo: 'Mercado', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−10 % a −15 % por cada 0,50 USD por galón sostenido un año (escenario bajista: −86 % en valor intrínseco)', mitigante: 'Ajuste de capacidad y tarifas; recargos en internacional', senal: 'Queroseno del Golfo por encima de 3,5 USD por galón' },
        { riesgo: 'Huelga de pilotos (ASPA) o un convenio caro', tipo: 'Laboral', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−5 % a −10 %', mitigante: 'Prórroga de 45 días y precedente de acuerdo en 2022', senal: 'Rechazo de la oferta en noviembre de 2026' },
        { riesgo: 'Peso mexicano (ingresos domésticos en pesos, deuda en dólares)', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '±5 % por cada peso de diferencia', mitigante: 'El 63 % del pasaje es internacional y en dólares', senal: 'Peso por encima de 20 o por debajo de 16,5' },
        { riesgo: 'Venta de los accionistas de referencia (Apollo 18,9 %, Silver Point 9,0 %, otros fondos del Chapter 11)', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 % temporal', mitigante: 'Recompra propuesta y Delta como socio estable', senal: 'Colocaciones aceleradas o 13G/A a la baja' },
        { riesgo: 'Motores CFM LEAP-1B y GEnx (palas de turbina)', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−3 % a −5 %', mitigante: 'No usa los Pratt & Whitney GTF que inmovilizan a Volaris y Viva; compensaciones del fabricante', senal: 'Más de 33 retiradas de motor en 2026' },
        { riesgo: 'Empresa conjunta con Delta (inmunidad antimonopolio, franjas en la Ciudad de México)', tipo: 'Regulatorio', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−10 % a −15 %', mitigante: 'Sentencia favorable del 11.º Circuito (ago-2026)', senal: 'Recurso del DOT o nuevas restricciones de franjas en MEX' },
        { riesgo: 'Competencia de las ULCC (Volaris y Viva) al volver sus aviones', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Red internacional y clientela premium (43 % del pasaje)', senal: 'Cuota doméstica por debajo del 23 %' },
        { riesgo: 'Deuda y arrendamientos (4.069 M) en un ciclo malo', tipo: 'Financiero', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: 'Escenario bajista: el valor de la acción casi desaparece con un margen EBITDA del 23 % permanente', mitigante: 'Liquidez de 1.237 M y sin vencimientos de bonos hasta 2029', senal: 'Deuda neta ajustada sobre EBITDA por encima de 3 veces' },
      ],
      premortem: 'Octubre de 2029: el ADS vale 9,60 USD, un 40 % menos. La cadena empezó en noviembre de 2026: los pilotos pararon diez días y el convenio cerró con subidas del 12 % en dos años, que añadieron unos 60 M de coste al año. En 2027 el queroseno no bajó de 3,4 USD por galón y Volaris y Viva recuperaron los aviones parados de Pratt & Whitney: más asientos domésticos con tarifas a la baja y la cuota de Aeroméxico en el 22 %. El margen EBITDA se quedó en el 23-24 % y el BPA de 2028 en 1,30 USD, la mitad de nuestro base. Apollo y Silver Point vendieron en dos colocaciones con descuento y la recompra se suspendió para proteger la caja. Con 4.000 M de deuda y arrendamientos, la caída del EBITDA pesó casi entera en el valor de la acción. Lo habrían anticipado el margen operativo del 3T26 por debajo del 14 %, el queroseno por encima de 3,5 USD y la cuota doméstica de la AFAC por debajo del 23 %.',
      ia: {
        exposicion: 'Baja', sentido: 'Mixto', efecto_valor: '−3 % a +3 %',
        comentario: 'La IA no sustituye un vuelo: el ingreso depende de mover personas y carga en aviones con franjas y tripulaciones. Toca dos partes. Por el lado de los costes es una oportunidad: atención al cliente, planificación de tripulaciones, mantenimiento predictivo de motores y gestión de ingresos (precios y ocupación), donde Aeroméxico ya invierte con Delta como socio tecnológico [B1]. Por el lado de la venta, los agentes de IA que buscan y reservan pueden convertir el billete en una mercancía comparada por precio y llevarse parte de la venta directa y de los ingresos premium (43 % del pasaje) [A4]. El efecto neto lo vemos pequeño a 3-5 años. La señal sería una caída de la venta directa o del ingreso por pasajero premium mientras crece la venta a través de intermediarios.',
      },
      confianza: 'Media',
    },
    preguntas: {
      items: [
        { tema: 'Pilotos', pregunta: '¿Qué coste anual supondría la contrapropuesta de ASPA frente al 3,2 % ofrecido, y qué plan hay si estalla la huelga a mediados de noviembre?', por_que: 'Es la condición de la que depende la compra (regla 13: retrasa).' },
        { tema: 'Margen de 2027', pregunta: '¿Con el queroseno a 3,0 USD por galón, qué margen EBITDAR esperan para 2027 frente al 28,5-30,5 % de la guía original de 2026?', por_que: 'Nuestro BPA de 2028 supone un margen EBITDA del 27 %.' },
        { tema: 'Accionistas del Chapter 11', pregunta: '¿Tienen Apollo, Silver Point y los demás fondos periodos de bloqueo pendientes o planes de colocación?', por_que: 'Más de un tercio del capital está en manos de fondos que entraron en la reorganización.' },
        { tema: 'Recompra', pregunta: '¿Se ejecutarán los 100 M de recompra aunque el queroseno siga caro, y con qué límite de deuda?', por_que: 'Es un 4 % del capital al año y no está en nuestro BPA.' },
        { tema: 'Bonos', pregunta: '¿Amortizarán en noviembre los bonos del 8,625 % de 2031 a 104,125?', por_que: 'El coste financiero recurrente (470-480 M) es la partida que más separa nuestro BPA del EBIT.' },
        { tema: 'Flota y motores', pregunta: '¿Cuántos aviones con motores LEAP-1B estarán en tierra en 2027 y qué compensación pagará CFM?', por_que: 'Las retiradas de motor limitan el crecimiento de capacidad que proyectamos (4 % anual).' },
        { tema: 'Delta', pregunta: '¿Ha recurrido el DOT la sentencia del 11.º Circuito y qué parte de los ingresos transfronterizos depende de la inmunidad?', por_que: 'Perder la empresa conjunta restaría valor a la red internacional (63 % del pasaje).' },
        { tema: 'Impuestos', pregunta: '¿Cuántos de los 1.918 M de pérdidas fiscales sin reconocer podrán usarse antes de caducar?', por_que: 'Nuestro tipo del 20 % en 2026-2028 depende de ellas.' },
      ],
      confianza: 'Media',
    },
  },
  dcf_justificacion: {
    crecimiento: 'Ingresos de +13,5 % en 2026, el centro de la guía de 6.050-6.120 M, que suma un 4,5 % de capacidad y precio y el peso fuerte (17,5 frente a 19,2 por dólar en 2025) en los ingresos domésticos [C8, D23]. Después, +6 % en 2027-2028 (capacidad del 4 % con los aviones de 2026 y precio del 2 %), bajando al 3,5 % en 2034-2035, por debajo del 6,0 % anual de los pasajeros de México en 2014-2024 [B1].',
    margenes: 'Margen EBITDA del 24,7 % en 2026 (primer semestre de 592 M y la guía del segundo), del 27 % en 2027-2028, frente al 30,9 % de 2025 y al 30,6 % de 2024 con queroseno barato [A1]. Desde 2031, un 25,5 % de mitad de ciclo, que equivale a cuatro años al 27,5 % y uno de crisis al 17,5 %: una aerolínea no mantiene el margen de un buen año.',
    inversion: 'Capex del 19 % de las ventas en 2026 y del 15,5 % al final, incluidas las altas de aviones arrendados (854 M en 2025 más 386 M de inversión propia, el 23 % de las ventas) [A1], porque el puente resta los arrendamientos como deuda. Amortización del 13,2 % (13,6 % en 2025). Circulante negativo del 15 % de las ventas por el anticipo de billetes y los puntos.',
    wacc: 'Tasa libre: bono de EE. UU. a 10 años del 5,10 % [D13], porque la empresa presenta en dólares; más la prima de riesgo de México de Damodaran (2,46 %) [D15]. Beta de 1,7: la desapalancada del transporte aéreo (0,76) [D16] reapalancada con la deuda y los arrendamientos de hoy (1,75 veces la capitalización). Prima de mercado del 5 %, coste de la deuda del 8 % (cupones de 8,25-8,625 %) y peso de la deuda del 60 %: WACC del 9,78 %.',
    terminal: 'Gordon con un crecimiento del 2,5 % nominal en dólares: la inflación de EE. UU. y algo de crecimiento real del tráfico mexicano, por debajo del 3,5 % del último año proyectado. El múltiplo implícito es de 3,8 veces el EBITDA terminal, por debajo de los 5,3-6,1 de LATAM y Copa.',
  },
  puente_comentarios: {
    '2026e': 'Capacidad +2-3 % según la guía y pasaje premium, más precio del 9 % por el peso fuerte y las tarifas internacionales [C8, D23].',
    '2027e': 'Volumen +4 % con los aviones nuevos y la vuelta de motores; precio +2 % (inflación de EE. UU.) [B1].',
    '2028e': 'Volumen +4 %, precio +2 %.',
    '2029e': 'Volumen +3,5 % (mercado mexicano al 6 % histórico menos cuota cedida a las ULCC), precio +2 % [B1].',
    '2030e': 'Volumen +3 %, precio +2 %.',
  },
  sostenibilidad_justificacion: 'Sí. El crecimiento proyectado (5,5 % anual) queda por debajo del 9,2 % que financia la reinversión al ROIC actual, y la proyección supone que el capital nuevo rinde solo un 3,3 %, muy por debajo del 44,4 % incremental histórico: el capex con los aviones arrendados es prudente. No exige ganar cuota: el volumen crece al 3-4 %, por debajo del 6,0 % anual del mercado mexicano [B1], con la cuota doméstica cedida a las ULCC en 2025 (del 28 % al 25 %). El poder de precios es limitado y cíclico: el queroseno y el peso deciden el margen. Por eso el margen terminal es de mitad de ciclo (25,5 %), no el de 2024-2025.',
  dcf_lectura: 'El DCF da 23,34 USD por ADS, un 46,1 % por encima del precio, con un WACC del 9,78 % y un valor terminal del 54 %. El DCF inverso dice que el precio de 15,98 exige solo un crecimiento del 2,7 % anual en 2027-2035 frente al 4,7 % de nuestro caso base, o equivale a una rentabilidad implícita del 11,1 % con nuestros flujos, por encima del WACC. La sensibilidad es alta: con un WACC del 10,8 % y un terminal del 1,5 % el DCF baja a 15,23, el precio. El supuesto que más pesa es el margen de mitad de ciclo: cada punto de margen EBITDA permanente mueve el valor de la acción unos 4 USD por el apalancamiento de 4.069 M de deuda y arrendamientos.',
  narrativas: {
    Bajista: 'El queroseno se queda caro, Volaris y Viva recuperan sus aviones y bajan tarifas, y un convenio de pilotos caro sube los costes: crecimiento 2 puntos menor, margen EBITDA del 23 % permanente y WACC del 10,3 %. Con 4.069 M de deuda y arrendamientos, el valor de la acción casi desaparece (2,26 USD). Pasó en 2020 y en el 1T26 [A1, A5].',
    Base: 'Guía de 2026 cumplida, margen EBITDA del 27 % en 2027-2028 con el queroseno a unos 3 USD por galón, capacidad del 4 % y un margen de mitad de ciclo del 25,5 % desde 2031.',
    Alcista: 'Queroseno barato, convenio razonable y la recompra en marcha: crecimiento 1,5 puntos mayor, margen EBITDA del 27 % terminal (2024-2025 superaron el 30 %) y terminal del 3 %.',
  },
  escenarios_comentario: 'La asimetría del valor intrínseco es positiva pero con una cola muy gruesa: el alcista (40,76) gana un 155,1 % y el bajista (2,26) pierde un 85,9 %, porque la deuda y los arrendamientos multiplican cualquier cambio de margen. El ponderado da 22,43. A 12 meses el bajista pierde un 45,9 % (8,64 USD con un BPA de 1,44 a 6,0 veces) y el alcista gana un 97,5 %. Es una acción para una posición pequeña, no para concentrar.',
  casos_12m: {
    Bajista: 'BPA 2028e de 1,44: ventas 2 puntos por debajo cada año desde 2027 (6.574 M), margen EBITDA del 24,5 %, resultado financiero de −480 M y 20 % de impuestos.',
    Base: 'BPA 2028e de 2,59: ventas de 6.836 M, margen EBITDA del 27 %, amortización del 13,2 %, resultado financiero recurrente de −470 M y 20 % de impuestos (pérdidas fiscales) sobre 145,9 M de ADS.',
    Alcista: 'BPA 2028e de 3,43: ventas de 7.031 M, margen del 28,5 % y resultado financiero de −450 M por la refinanciación de los bonos.',
  },
  diferencia_consenso: 'Nuestro BPA de 2027 (2,25) queda un 3,8 % por debajo del consenso (2,34) y el de 2028 (2,59) un 30,6 % por debajo (3,73) [D2]. En ventas y EBITDA casi coincidimos (−1,9 % y −3,0 % en 2028): la diferencia está debajo del EBIT. El consenso supone un resultado financiero más bajo, o el tipo impositivo de 2023-2025 (5-15 %), y su BPA de 2026 (1,62) no cuadra con su propio beneficio. Lo revisamos y lo mantenemos: los intereses de la deuda y los arrendamientos fueron de 546 M en 2025 [A1]. Nuestro precio base (18,39) queda un 34,5 % por debajo del objetivo medio de los analistas (28,06), que está fuera de nuestro rango por arriba del base.',
  media_12m: 19.53,
  objetivo_comentario: 'El objetivo a 12 meses (19,25) queda un 15 % por debajo del valor intrínseco (22,65): la distancia es pequeña y la cierra el beneficio de 2027 si el queroseno se queda en unos 3 USD por galón. El PER del base (7,1 veces) es el de hoy, sin revalorización: la rentabilidad sale del crecimiento del BPA de 1,01 en 2026 a 2,59 en 2028. Para que el precio converja al valor intrínseco haría falta un año sin crisis de combustible, el convenio de pilotos firmado y la recompra ejecutada; los tres tienen fecha en los próximos seis meses.',
  valoracion_comentario: 'Pesos: DCF 50 %, comparables 25 % y escenarios 25 %; transacciones 0 % porque no hay operaciones de aerolíneas con cifras primarias comparables. El DCF es el método central porque recoge la inversión en flota con arrendamientos y el margen de mitad de ciclo; los comparables solo por PER (21,49), porque el EV/EBITDA de las de EE. UU. no es comparable con NIIF 16. La síntesis da 22,65 USD, un 41,7 % por encima del precio; con la prima implícita del mercado, 25,38. La deuda neta ajustada del puente (3.556 M) suma a la deuda y los arrendamientos las pensiones netas de impuestos (192 M) y las provisiones de devolución de aviones (332 M).',
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Media', horizonte: '12 meses',
    justificacion_recomendacion: 'La regla da Comprar (rentabilidad ponderada a 12 meses del 20,4 %, del base del 15,1 % y valor intrínseco de 22,65, por encima del precio), pero no la seguimos hoy por tres razones que la valoración no recoge. Primera, la huelga de pilotos: el emplazamiento de ASPA se prorrogó 45 días desde el 1-oct y vence a mediados de noviembre, y la regla 13 dice que el informe retrasa la compra hasta que haya convenio. Segunda, la prueba de robustez: con el BPA un 10 % más bajo la rentabilidad cae al 8,4 %, el colchón de BPA es de solo un 3 % y la acción robusta es Esperar, con un límite de 14,78 USD. Tercera, no hay historia del PER (M2): el múltiplo de referencia es el de hoy. Los resultados del 3T26 salen mañana. Pasaríamos a Comprar con el convenio firmado y un precio por debajo de 14,78.',
    sintesis: `**La recomendación y por qué.** Mantener, con convicción media, aunque la regla da Comprar. El objetivo a 12 meses es de 19,25 USD por ADS (nuestro BPA de 2028 por un PER de 7,1 veces), con una rentabilidad ponderada del 20,4 % y del 15,1 % en el base; el valor intrínseco es de 22,65, un 41,7 % por encima de los 15,98 del cierre del 16-oct, y el objetivo medio de los analistas (28,06) queda por encima de todo nuestro rango salvo el alcista [D3]. No compramos hoy porque la huelga de pilotos tiene fecha (mediados de noviembre) y la prueba de robustez da Esperar: con un BPA un 10 % menor la rentabilidad cae al 8,4 %. La convicción es media: subiría con el convenio firmado y un margen operativo del 3T26 dentro de la guía (14-17 %); bajaría con el queroseno por encima de 3,5 USD por galón.

**El negocio.** La aerolínea de red de México, con el 25 % del pasaje doméstico, el 14 % del internacional (21 % con Delta) y un 43 % del ingreso de pasaje en clase premium [A1, A4]. El ROIC, con los aviones arrendados en el capital, es del 32,9 % frente a un WACC del 9,78 %; a mitad de ciclo y con el 30 % de impuestos, del 17,5 % [P1]. Los +150 puntos de los filtros salen de dividir por un patrimonio negativo (−594 M) tras el Chapter 11. La sostenibilidad del crecimiento es «Sí»: el 5,5 % anual proyectado es menor que el 9,2 % que financia la reinversión y no exige ganar cuota.

**Sector y ciclo.** El ciclo manda: el queroseno subió un 79,6 % por galón en el 2T26 con la guerra de Oriente Medio, sin coberturas, y la empresa perdió 0,40 USD por ADS en el trimestre [A4, A9]. A favor, sus motores son CFM LEAP y GE: los problemas de Pratt & Whitney inmovilizan a Volaris y Viva, no a Aeroméxico [B1].

**Finanzas.** Ingresos de 5.361 M en 2025 y una guía de 6.050-6.120 M en 2026 [A1, D23]. La deuda neta ajustada es de 3.556 M, 2,1 veces el EBITDA, con liquidez de 1.237 M y sin vencimientos de bonos hasta 2029 [D23]. La caja libre de los últimos 12 meses fue de solo 140 M.

**Equipo y gobierno.** Cumplió la guía de 2025 y recortó la de 2026 en julio por el combustible [C8]. Consejeros y directivos compraron 103.212 ADS en marzo [C6]. Más de un tercio del capital es de fondos del Chapter 11 (Apollo 18,9 %, Silver Point 9,0 %) y Delta tiene el 18,7 % [C1, C4]: sus ventas son un riesgo de oferta.

**Valoración.** El DCF da 23,34 USD; el precio exige solo un crecimiento del 2,7 % anual frente a nuestro 4,7 %, o una rentabilidad implícita del 11,1 %, por encima del WACC. Cotiza a 7,3 veces el BPA del consenso frente a 9,8 de los comparables [D5]. Nuestro BPA de 2028 (2,59) queda un 30,6 % por debajo del consenso (3,73), por los intereses y los impuestos.

**Riesgos y catalizadores.** El queroseno (escenario bajista: 2,26 USD de valor y 8,64 a 12 meses), los pilotos (−5 % a −10 %) y las colocaciones de los fondos (−10 % temporal). El riesgo de la IA es bajo: no sustituye el vuelo, aunque los agentes de reserva pueden presionar la venta directa. Catalizadores: resultados del 3T26 el 19-oct, junta de la recompra de 100 M el 26-oct y fin de la prórroga de la huelga a mediados de noviembre [D18, D25, D24].

**Qué cambiaría la decisión.** Compraríamos por debajo de 14,78 USD (límite robusto) con el convenio de pilotos firmado, y venderíamos por encima de 21,38. Pasaríamos a Vender con una huelga de más de una semana o con el queroseno por encima de 3,5 USD por galón dos trimestres seguidos.`,
    tesis: 'Grupo Aeroméxico es la aerolínea de red de México: 169 aviones, el 25 % del pasaje doméstico, la empresa conjunta con Delta en el transfronterizo y un 43 % del ingreso de pasaje en premium [A1, A4]. Salió del Chapter 11 en 2022 con la deuda recortada y volvió a bolsa en Nueva York en noviembre de 2025 a 19,00 USD por ADS [D21]. Con los aviones arrendados en el capital, gana un ROIC del 32,9 %, y del 17,5 % a mitad de ciclo [P1].\n\nEl precio (15,98) descuenta poco: el DCF inverso pide un crecimiento del 2,7 % anual frente a nuestro 4,7 %, y cotiza a 7,3 veces el BPA del consenso frente a 9,8 de los comparables [D5]. La caída del 27,2 % en 2026 recoge el queroseno de la guerra de Oriente Medio y la pérdida del 2T26 [D1, A4].\n\nPara invertir hay que creer que 2026 es un mal año del ciclo y no el nuevo nivel: que el margen EBITDA vuelve al 27 % con el queroseno a unos 3 USD, que los pilotos firman sin huelga y que los fondos del Chapter 11 venden de forma ordenada. La deuda y los arrendamientos (4.069 M) hacen que el error cueste mucho: el bajista deja la acción en 8,64 a 12 meses.',
    vision_diferencial: {
      mercado_descuenta: 'Un PER de 7,1 veces nuestro BPA de 2027 y un descuento frente a Copa y LATAM: el mercado paga a Aeroméxico como una aerolínea emergente endeudada con riesgo de huelga y de colocaciones, aunque los analistas mantengan un objetivo medio de 28,06 con 8 de 11 en comprar [D3].',
      nuestra_vision: 'La rentabilidad es mejor que la de sus comparables y el precio descuenta un crecimiento menor que el que financia la reinversión. Pero nuestro BPA de 2028 (2,59) está un 30,6 % por debajo del consenso: los analistas cuentan menos intereses e impuestos de los que vemos.',
      por_que: 'Los intereses de la deuda y los arrendamientos fueron de 546 M en 2025 y las pérdidas fiscales se agotan [A1]. Somos más prudentes que la calle en el beneficio y aun así sale una rentabilidad del 20,4 %; lo que nos frena es el calendario (pilotos) y la cola del bajista, no el valor.',
    },
    a_favor: [
      '**ROIC alto con los arrendamientos en el capital**: 32,9 % en 2025 y 17,5 % a mitad de ciclo, frente a un WACC del 9,78 %.',
      '**Precio exigente solo con el ciclo malo**: el DCF inverso pide un crecimiento del 2,7 % frente a nuestro 4,7 %.',
      '**Sin motores Pratt & Whitney GTF**: sus rivales ULCC tienen aviones en tierra y Aeroméxico no [B1].',
      '**Recompra de hasta 100 M al año**, un 4 % de la capitalización, a votar el 26-oct [D25].',
      '**Delta como socio y accionista (18,7 %)** y la inmunidad de la empresa conjunta confirmada por el tribunal en ago-2026 [D19].',
    ],
    en_contra: [
      '**Queroseno sin coberturas**: −0,40 USD por ADS en el 2T26 con el galón un 79,6 % más caro [A4].',
      '**Huelga de pilotos con fecha**: el emplazamiento vence a mediados de noviembre de 2026 [D24].',
      '**Apalancamiento**: 4.069 M de deuda y arrendamientos; el bajista deja el valor de la acción en 2,26 USD.',
      '**Oferta de papel**: Apollo (18,9 %) y Silver Point (9,0 %) entraron en el Chapter 11 y el flotante es del 21 % [C4].',
      '**Sin historia de múltiplos**: el ADS cotiza desde nov-2025 y el objetivo a 12 meses usa el PER de hoy.',
    ],
    que_vigilar: 'La tesis depende de que 2026 sea un año malo del ciclo y no el nuevo nivel: margen operativo del 3T26 dentro del 14-17 % de la guía, queroseno por debajo de 3,5 USD por galón y un convenio de pilotos sin huelga en noviembre. La señal de que no se cumple: una guía de 2027 con un margen EBITDAR por debajo del 26 % o una huelga de más de una semana. Después, cualquier colocación de Apollo o Silver Point con descuento.',
    cambiaria_recomendacion: [
      'Convenio de pilotos firmado y precio por debajo de 14,78 USD: pasaríamos a Comprar.',
      'Precio por encima de 21,38 USD: pasaríamos a Vender.',
      'Huelga de más de una semana o un convenio con subidas por encima del 8 % anual: revisaríamos el BPA a la baja y la recomendación a Vender.',
      'Queroseno por encima de 3,5 USD por galón dos trimestres seguidos: Vender.',
      'Margen operativo del 3T26 por debajo del 14 % (fondo de la guía): recortaríamos el BPA de 2027.',
    ],
    kpis_seguimiento: [
      { kpi: 'Margen operativo trimestral', nivel_actual: '4,6 % en el 2T26 (17,5 % en el 2T25); guía del 3T26 del 14-17 %', umbral_alerta: 'Por debajo del 14 % en el 3T26 o del 15,5 % en el 4T26', por_que: 'Nuestro BPA de 2027 supone volver al margen de 2025.' },
      { kpi: 'Precio del queroseno', nivel_actual: 'Guía con 3,2 USD por galón en el 3T26 y 3,0 en el 4T26', umbral_alerta: 'Por encima de 3,5 USD', por_que: 'Un 21 % de las ventas, sin coberturas.' },
      { kpi: 'Negociación con ASPA', nivel_actual: 'Oferta del 3,2 % rechazada; prórroga hasta mediados de noviembre', umbral_alerta: 'Huelga o subida por encima del 8 %', por_que: 'Condición de la compra.' },
      { kpi: 'Cuota doméstica (AFAC)', nivel_actual: '25 % (2025)', umbral_alerta: 'Por debajo del 23 %', por_que: 'Mide la presión de Volaris y Viva.' },
      { kpi: 'Deuda neta ajustada / EBITDA', nivel_actual: '2,1 veces', umbral_alerta: 'Por encima de 3 veces', por_que: 'El apalancamiento multiplica el ciclo.' },
    ],
  },
  fuentes: [
    { id: 1, titulo: 'Cálculos propios: capital invertido operativo por el activo, ROIC de mitad de ciclo, BPA por escenario y WACC (notas/supuestos.mjs)', editor: 'Elaboración propia', tipo: 'Primaria', fecha: '2026-10-18', url: null },
  ],
};
