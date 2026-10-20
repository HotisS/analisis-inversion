// Textos del analista (Lundin Gold, corte 2026-10-20). Citas: [A1] = fuente 1 de A.json, [P1] = fuente propia.
export default {
  limitaciones: 'Canadá no tiene XBRL en herramientas/cuentas.mjs: las cuentas 2021-2025 y los trimestres de 2026 se copiaron de los estados auditados e intermedios (NIIF, USD). El precio es el cierre de Toronto del 19-oct-2026 (91,25 CAD), pasado a USD al 1,4097 del Banco de Canadá; el consenso de Yahoo y MarketScreener viene en CAD y se pasó a USD. SEDI, CanadianInsider y Simply Wall St no abren: sin operaciones de directivos. El puente al valor de las acciones es a 30-jun-2026: no recoge el flujo libre de julio a octubre (≈ 300-350 M con el oro del 3T) ni el dividendo que se declarará en noviembre. La plata (stream con LunR desde abril de 2026) queda fuera de ingresos y del puente. El informe técnico vigente es de 2023 (vida de la mina hasta 2034): el perfil de producción posterior a 2028 es estimación propia.',
  controles_explicados: [
    { control: 'Tipo impositivo efectivo razonable (2023)', explicacion: 'El 37,1 % de 2023 sale de las pérdidas por valor razonable del stream y del offtake de oro con Newmont (en el resultado financiero, −104,4 M), que no son deducibles en Ecuador: el impuesto se paga sobre el resultado de la mina [A3]. Desde la recompra de esos contratos en junio de 2024 el tipo vuelve a la zona del 30 % (32,8 % en 2024, 29,5 % en 2025) [A2, A1]. El DCF usa un 31 % (22 % de impuesto sobre la renta sobre una base que ya resta la participación del Estado y de los trabajadores y la regalía), no el de 2023.' },
    { control: 'DCF inverso calculable', explicacion: 'No hay solución porque el DCF de una mina que se agota apenas responde al crecimiento y al margen dentro del rango que prueba el motor: el valor del caso base (22,10 USD) es un tercio del precio. Lo que sí se puede calcular es el oro que justifica el precio: extrapolando nuestros escenarios (cada 100 USD de oro mueven el valor ≈ 0,66 USD por acción), el precio de 64,73 USD exige un oro de ≈ 10.500 USD/oz durante toda la vida de la mina con el WACC del 14,7 %, o bien una vida y una producción muy superiores a las de las reservas (5,85 Moz). Bajar el WACC al de la prima del mercado (13,3 %) solo sube el valor a 23,83 USD: el problema no es la tasa de descuento.' },
    { control: 'Proyección propia frente a consenso (2028e)', explicacion: 'Nuestros ingresos de 2027-2028 están un 15 % por debajo del consenso porque usamos el oro de hoy plano (4.150 USD/oz) y el consenso, a juzgar por sus ingresos de ≈ 2.450-2.460 M con 475.000-525.000 onzas, supone ≈ 4.700-4.900 USD [D3, A11]. En producción coincidimos (la guía). Nuestro escenario alcista (oro a 4.900) reproduce el consenso: ingresos de 2.450 M en 2027. No proyectamos el oro al alza: usamos el precio de contado del 19-oct (≈ 4.160 USD) [P1] como mejor estimación disponible y llevamos las subidas y bajadas a los escenarios.' },
  ],
  huecos: [],
  secciones: {
    historia: {
      resumen: 'Lundin Gold nació como Fortress Resources (1986), una sociedad de cartera del grupo Lundin que en diciembre de 2014 compró a Kinross el yacimiento de Fruta del Norte (FDN), en el sur de la Amazonía ecuatoriana, y tomó su nombre actual [A17]. FDN lo descubrió Aurelian Resources entre 2003 y 2008; Kinross la compró en 2008 e hizo los estudios de viabilidad de 2009 y 2011 sin llegar a construir [A17]. Lundin Gold hizo su propia viabilidad en 2015-2016, construyó la mina con deuda de proyecto, un stream y un offtake de oro, y entró en producción comercial en febrero de 2020, con tres meses de parada por la COVID ese año [A17, A5]. Desde 2023 ha pagado toda la deuda y recomprado el stream y el offtake (2024), y desde 2025 reparte casi todo el flujo libre. Newmont (32 %) y la familia Lundin (26 %) controlan la sociedad [C1].',
      hitos: [
        { anio: '2003-2008', hito: 'Aurelian Resources descubre y define el yacimiento epitermal de Fruta del Norte [A17].' },
        { anio: '2008', hito: 'Kinross compra Aurelian; viabilidad previa (2009) y viabilidad (2011), sin construir [A17].' },
        { anio: '2014', hito: 'Fortress Minerals compra FDN y las concesiones de Kinross en Ecuador y pasa a llamarse Lundin Gold [A17].' },
        { anio: '2016', hito: 'Estudio de viabilidad propio y decisión de construir con financiación de proyecto (stream, prepago y offtake de oro) [A17].' },
        { anio: '2020', hito: 'Producción comercial desde febrero; parada de tres meses por la COVID [A17, A5].' },
        { anio: '2023', hito: 'Newmont compra Newcrest y pasa a tener el 32 %; se paga la deuda senior y se renueva la concesión La Zarza hasta 2048; nuevo informe técnico (vida hasta 2034) [A17].' },
        { anio: '2024', hito: 'Recompra del stream y el offtake a Newmont por 330 M USD: la empresa queda sin deuda y vende todo su oro a precio de mercado [A17].' },
        { anio: '2025', hito: 'Producción récord (498.315 oz) a 3.594 USD/oz y beneficio de 792 M; nuevo consejero delegado (Jamie Beck) en noviembre; reservas de 5,85 Moz [A1, C3, A12].' },
        { anio: '2026', hito: 'Stream de plata vendido a LunR Royalties y repartido a los accionistas (junio); siete pórfidos de cobre y oro descubiertos; reclamación fiscal del SRI de 154 M por 2023 (septiembre) [A6, B8, A16].' },
      ],
      confianza: 'Alta',
    },
    rentabilidad: {
      comentario: 'Con el WACC del 14,7 % (alto por la prima de Ecuador), Lundin Gold crea valor desde que la mina funciona a pleno: ROIC del 21,2 % en 2021, 16,5 % en 2022 y 22,8 % en 2023, y del 46,3 % y 96,9 % en 2024-2025 [A1, A2, A3]. El salto no viene de mejor gestión sino de dos cosas mecánicas: el oro (de 1.772 a 3.594 USD/oz realizados entre 2021 y 2025, con costes por onza casi planos) y la amortización del capital invertido, que baja de 1.292 a 800 M porque la mina se deprecia y no hay inversiones nuevas grandes [A1, A5]. Es rotación y margen a la vez (margen neto del 30 % al 44 %, rotación de 0,44 a 1,08). A precios de oro de 2021-2023 el diferencial ROIC − WACC sería de solo 2-8 puntos. Frente a las grandes (Agnico, Newmont), el margen EBITDA del 69 % es de los más altos del sector por la ley de 9,5 g/t [B3, A1]. El ROIC incremental no tiene sentido aquí: el capital baja mientras el beneficio sube.',
      confianza: 'Media',
    },
    esg: {
      calificaciones: [],
      materialidad: 'Tres asuntos mueven las cifras. (1) La presa de relaves: el informe anual la llama el riesgo ambiental más material; cada recrecimiento (quinto en 2025, sexto en 2026) entra en el AISC, y una rotura pararía la mina única [A1]. (2) Agua y energía: la electricidad es sobre todo hidroeléctrica de la red de Ecuador y la empresa declara que la sequía puede limitar la planta [A1]. (3) Relación con las comunidades de la Amazonía (Zamora Chinchipe): el 93 % de la plantilla es ecuatoriana y el 53 % de comunidades locales y regionales; compras locales de 36 M USD en 2025 [A1]. Seguridad: cero accidentes mortales y TRIR de 0,22 en 2025 (−65 %); emisiones de alcance 1 y 2 de 0,10 tCO₂e por onza [A1]. No hemos encontrado calificaciones publicadas de MSCI o Sustainalytics.',
      controversias: 'La principal es fiscal: el 8-sep-2026 el SRI notificó 154 M USD (73 de cuota y 81 de recargos) por el cálculo del ajuste soberano de 2023; la empresa lo recurre [A16]. Hay además una demanda antigua de un accionista de Aurelian contra Aurelian, Kinross y Lundin Gold por la compra de 2008 (reclama la devolución de acciones e intereses), que la empresa considera sin fundamento [A17]. Sin sanciones ambientales ni accidentes graves en tres años [A1].',
      confianza: 'Media',
    },
  },
  parches: [],
  huecos_resueltos: [],
  dcf_justificacion: {
    crecimiento: 'Los ingresos son onzas vendidas × precio del oro. 2026e es casi real (nueve meses publicados: 374.019 oz vendidas a 4.518 USD) [A10]. Desde 2027 el oro queda plano en 4.150 USD/oz, el cierre del 19-oct, y la producción sigue la guía (475.000-525.000 oz en 2026-2028) [A11]; después baja un 2-6 % al año con la ley del plan de mina (la reserva media es de 7,09 g/t frente a los 9,5 g/t de 2025) [A12]. La plata, vendida a LunR, no entra.',
    margenes: 'Margen EBITDA del 71,5 % en 2027-2028: coste en efectivo de 900-960 USD/oz de la guía más regalía (5 % + 1 %) y participación de los trabajadores, que suben con el precio, y gastos generales y exploración (85 M) [A11]. Baja un punto al año desde 2029 por la menor ley (más coste por onza) [A12]. En 2025 fue del 69,3 % con el oro a 3.594 [A1].',
    inversion: 'Inversión de mantenimiento de 75-90 M en 2026, 80-95 en 2027 y 50-85 en 2028, más el desarrollo de FDNS y FDN East y la exploración capitalizada: 9 % de las ventas en 2027 y 6-7 % después [A11]. No incluimos una ampliación de planta ni un proyecto de cobre: la decisión llegará a final de 2026 sin cifras todavía [A11].',
    wacc: 'Coste del capital del 14,7 %, sin deuda: bono de EE. UU. a 10 años del 5,15 % [D6] + beta de 1,10 × 5,5 % (la de Damodaran para metales preciosos, 1,37 sin deuda corregida por caja en 2026 y 1,11 de media en 2020-2024 [D7]; la nuestra frente al TSX 60 es 1,32 [D1]) + 3,5 % de prima por Ecuador (Caa3, prima de riesgo país de 12,9 % [D8]; una cuarta parte porque vende en dólares fuera del país, pero con toda la mina, los impuestos y las concesiones allí). Con la prima implícita del mercado (4,2 %) el motor da un 13,3 % [D5].',
    terminal: 'Crecimiento perpetuo del −3 % desde 2035: una mina se agota. Equivale a seguir produciendo con caída suave gracias a los recursos medidos, indicados e inferidos (7,48 + 2,03 Moz, las medidas e indicadas incluyen las reservas) y a la exploración de FDNS y FDN East [A12]; es generoso en onzas, pero a un 14,7 % pesa solo el 19 % del valor.',
  },
  puente_comentarios: {
    '2026e': 'Volumen +5 % (≈ 524.000 oz vendidas frente a ≈ 498.000) y precio realizado +23 % (≈ 4.410 frente a 3.594 USD); el resto, ajustes de concentrado [A10, A1].',
    '2027e': 'Volumen −4,6 % (500.000 oz, centro de la guía) y oro −6 % (4.150 plano frente a la media de 2026) [A11].',
    '2028e': 'Igual que 2027: guía plana y oro plano [A11].',
    '2029e': 'Menos onzas por la ley (de ≈ 8 a ≈ 7 g/t de las reservas) [A12].',
    '2030e': 'Sigue la bajada de ley; FDNS compensa una parte [A12].',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'La proyección no pide crecer: los ingresos de 2027-2035 bajan de media un 2-3 % al año y la inversión (6-9 % de las ventas) cabe de sobra en un flujo libre del 40 % de los ingresos. La calidad de la mina (ley de 9,5 g/t en 2025, AISC de 1.015 USD/oz, primer cuartil del sector) sostiene el margen proyectado [A1, B3]. El riesgo no es financiar el crecimiento sino la vida de la mina y el precio del oro, que van en los escenarios.',
  dcf_lectura: 'El DCF da 22,10 USD por acción, un 66 % por debajo del precio. No es un problema de tasa de descuento (con el 13,3 % del mercado sale 23,83) ni de la cola (el valor terminal pesa un 19 %): es que, con el oro de hoy, el flujo libre de ≈ 900 M al año que da la mina durante unos 10-12 años no llega a la capitalización de 15.700 M. Para justificar el precio hace falta un oro de ≈ 10.500 USD/oz o que la exploración (FDNS, FDN East, los pórfidos de cobre y oro) añada varias vidas de mina. El mercado paga hoy esa opción y la de un oro más alto.',
  narrativas: {
    Bajista: 'El oro vuelve a 3.300 USD/oz (nivel de mediados de 2025) desde 2027 y se queda ahí: ingresos de 2027 de ≈ 1.650 M, margen EBITDA del 66 %, y Ecuador sube la presión fiscal (WACC +0,5). La producción sigue la guía. Valor de 15,82 USD.',
    Base: 'Oro plano en 4.150 USD/oz, producción de la guía hasta 2028 y bajada suave después; dividendo con el 100 % del flujo libre normalizado. Valor de 22,10 USD.',
    Alcista: 'El oro sube a 4.900 USD/oz desde 2027 (≈ la media de 2026 hasta hoy y lo que parece suponer el consenso) y el margen gana 3 puntos. Valor de 27,02 USD: ni con este oro el DCF se acerca al precio.',
  },
  escenarios_comentario: 'Los escenarios son de precio del oro, que es lo que decide: entre 3.300 y 4.900 USD el valor va de 15,82 a 27,02 USD, todo por debajo del precio de 64,73. Con producción fija, cada 100 USD de oro mueven ≈ 50 M el EBITDA anual y ≈ 0,66 USD el valor por acción. El valor ponderado es de 24,97 USD; asimetría negativa.',
  casos_12m: {
    Bajista: 'Oro a 3.300 USD: BPA de 2028e de 2,75 USD, y PER del mínimo de cinco años (6,1 veces, cierre de 2024, cuando el mercado no creía el oro de entonces) [D1].',
    Base: 'Oro plano en 4.150 USD: BPA de 2028e de 3,87 USD (beneficio de ≈ 940 M), y PER de 14,8 veces (el actual de 16,3 ÷ 1,1).',
    Alcista: 'Oro a 4.900 USD: BPA de 2028e de 4,84 USD con el mismo PER del base (14,8): ni la historia (mediana de 10,8) ni los comparables (9,8) pagan más.',
  },
  diferencia_consenso: 'Nuestro objetivo a 12 meses (50,74 USD = 71,53 CAD) queda un 25 % por debajo del objetivo medio de 13 analistas (95,45 CAD = 67,71 USD; nuestro base, un 15 % por debajo) [D3]. La diferencia es casi toda el oro: el consenso supone ≈ 4.700-4.900 USD (BPA de 2027 de 4,30 USD frente a nuestros 3,87) y un PER más alto. Los analistas van bajando: el BPA de 2027 de Yahoo cayó un 8 % en tres meses y Jefferies, Desjardins, CIBC y RBC recortaron objetivo entre julio y septiembre [D2, D9]. TD Cowen ya pasó a «mantener» en julio de 2025 [D17].',
  objetivo_comentario: 'El objetivo es el PER sobre el BPA de 2028e, que en una mina sin deuda que reparte todo el flujo libre depende casi solo del oro. La regla v3 da un base de 14,8 veces (el PER actual de 16,3 rebajado un 10 %, porque la mediana adelantada de cinco años es de 10,8) y deja el alcista en el mismo múltiplo. La v2 (historia al cierre) también da Vender (−17,2 %). Lo que dice: aunque el oro se quede donde está, el mercado ya paga hoy un PER por encima de su historia, y sin subida del oro el precio no tiene recorrido.',
  valoracion_comentario: 'Los dos métodos dicen lo mismo con distinta intensidad: el DCF (22,10 USD) mide la mina con el oro de hoy y su vida de reservas; el objetivo a 12 meses (50,74) mide lo que el mercado suele pagar por su beneficio. Los comparables (9,8 veces de mediana) dan más que el DCF porque las grandes tienen décadas de reservas y varias minas. Pesos: DCF 45 %, escenarios 40 %, comparables 15 %; las transacciones no pesan (sin múltiplos publicados).',
  catalizadores: {
    items: [
      { fecha: '2026-11-04', evento: 'Resultados del 3T 2026 y dividendo trimestral', efecto: 'Dividendo del 3T con el oro de 4.299 USD realizados: ≈ 1,0-1,1 USD; primera lectura del recurso de la reclamación del SRI', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-12 / 2027-01', evento: 'Guía 2027 y decisión sobre FDNS y la ampliación de planta', efecto: 'Primera cifra de inversión y de producción más allá de 525.000 oz; puede alargar la vida', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-02', evento: 'Reservas y recursos a 31-dic-2026', efecto: 'Si reponen las ≈ 0,6 Moz minadas y añaden FDNS y FDN East, la vida de la mina deja de acortarse', probabilidad: 'Alta', sentido: '+' },
      { fecha: '2027 (primer semestre)', evento: 'Primer recurso del pórfido de cobre y oro de Sandia', efecto: 'Opción de un segundo activo en el distrito; sin él, el valor es solo FDN', probabilidad: 'Media', sentido: '+' },
      { fecha: '2026-2027', evento: 'Recurso de la reclamación del SRI por 2023 (154 M) y ajuste soberano de 2024-2025', efecto: 'Si se repite para 2024-2025 con el oro más alto, el coste podría ser varias veces mayor', probabilidad: 'Media', sentido: '−' },
      { fecha: 'continuo', evento: 'Precio del oro', efecto: 'Cada 100 USD/oz ≈ 50 M de EBITDA y ≈ 0,15 USD de BPA al año', probabilidad: 'Alta', sentido: '+/−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Precio del oro: la acción mueve el doble que el oro y el BPA casi en proporción', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−28 % en el DCF con oro a 3.300 USD (bajista: 15,82 frente a 22,10)', mitigante: 'Sin deuda, AISC de ≈ 1.100 USD/oz: gana dinero hasta con oro muy por debajo del actual', senal: 'Oro por debajo de 3.800 USD varias semanas; salidas de ETF de oro' },
      { riesgo: 'Una sola mina en un solo país (Ecuador, Caa3): régimen fiscal, ajuste soberano y estabilidad política', tipo: 'Regulatorio / país', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−10 a −30 % según el alcance (el ajuste soberano garantiza al Estado ≥ 50 % de los beneficios)', mitigante: 'Contrato de explotación y de protección de inversiones; concesión hasta 2048; economía dolarizada', senal: 'Reclamaciones del SRI para 2024-2025, cambios en la ley de minería o en la regalía' },
      { riesgo: 'Reclamación del SRI (154 M) por 2023 y posibles ajustes de 2024-2025', tipo: 'Fiscal', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−1 % por 2023; −3 a −5 % si se extiende a 2024-2025 con más beneficio', mitigante: 'Recurso en curso; el puente ya resta la mitad de 2023', senal: 'Resolución del recurso; nota en los resultados del 3T' },
      { riesgo: 'Vida de la mina: reservas de 5,85 Moz (≈ 11-12 años) y ley a la baja', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Alto', efecto_valor: 'El precio exige varias vidas de mina más que las reservas', mitigante: 'Conversión de 0,91 Moz de inferidos en 2025; FDNS, FDN East, Bonza Sur', senal: 'Reservas de 2026 que no reponen lo minado' },
      { riesgo: 'Valoración: PER de 16,3 veces frente a una mediana adelantada de 10,8 y comparables a 9,8', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−16 % ponderado a 12 meses (regla v3)', mitigante: 'Dividendo del 6 % con el oro de hoy', senal: 'PER que no baja aunque el oro baje (señal de exceso)' },
      { riesgo: 'Presa de relaves, agua y energía hidroeléctrica', tipo: 'Operativo / ESG', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: 'Parada de la única mina: −10 % o más por cada trimestre perdido', mitigante: 'Seguimiento externo y recrecimientos programados', senal: 'Incidencias en la presa; cortes eléctricos en Ecuador' },
      { riesgo: 'Accionistas de control (Newmont 31,9 %, familia Lundin 26,3 %)', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'Sin prima de OPA posible sin ellos', mitigante: 'Reparto del 100 % del flujo libre normalizado', senal: 'Venta de la participación de Newmont (colocación con descuento)' },
    ],
    premortem: 'Octubre de 2029: la acción vale un 40 % menos. Lo más probable es que el oro, tras el pico de enero de 2026 (5.318 USD), hubiera seguido bajando hasta los 3.300-3.500 USD con la vuelta de los tipos reales positivos y la venta de oro de los ETF; con el AISC estable, el beneficio por acción cayó de 4,4 a ≈ 2,8 USD y el dividendo variable a la mitad. El PER, que en 2026 estaba en 16 veces por la escasez de minas de primer nivel, volvió a su media de 10-11: los dos efectos juntos restaron más del 40 %. A la vez, Ecuador extendió el ajuste soberano a 2024-2025 y el SRI reclamó varios cientos de millones, y la decisión sobre FDNS se retrasó. Newmont, que vendía activos, colocó su 32 % con descuento. Lo habrían anticipado el oro por debajo de 3.800 USD, las salidas de ETF y una segunda notificación del SRI.',
    ia: { exposicion: 'Baja', sentido: 'Neutral', efecto_valor: '±1-2 % a 3-5 años', comentario: 'La IA no cambia lo que vende Lundin Gold (oro, un bien físico cuyo precio fija el mercado mundial) ni sustituye la mina. Toca solo los costes: planificación de la mina y del procesado, mantenimiento predictivo de la planta, interpretación de los sondeos de exploración y seguridad, donde puede ahorrar algún punto de coste por onza. La empresa no ha publicado proyectos de IA relevantes. Indirectamente, la demanda de electricidad de los centros de datos sube el coste de la energía y el cobre (opción de los pórfidos), un efecto pequeño frente al oro. Señal: una caída del AISC atribuida a automatización o un descubrimiento acelerado por modelos de datos. Riesgo de IA bajo y neutral.' },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Vida de la mina', pregunta: '¿Cuándo publicarán un informe técnico nuevo que sustituya al de 2023, y cuántos años de producción a 500.000 oz dan las reservas y FDNS?', por_que: 'El precio solo se justifica con muchas más onzas que las reservas actuales.' },
      { tema: 'Ecuador', pregunta: '¿Qué base usa el SRI en la reclamación de 2023 y se aplicaría el mismo criterio a 2024-2025?', por_que: 'Con el oro más alto, el ajuste de 2024-2025 podría ser varias veces el de 2023.' },
      { tema: 'Ampliación', pregunta: '¿Qué inversión y qué producción tendrán FDNS y la ampliación de la planta que se decide a final de 2026?', por_que: 'Es lo que puede alargar la vida y subir la producción por encima de la guía plana.' },
      { tema: 'Cobre', pregunta: '¿Qué ley y tamaño esperan para el primer recurso de Sandia y cómo financiarían una mina de pórfido?', por_que: 'Un segundo activo cambiaría el perfil de mina única.' },
      { tema: 'Dividendo', pregunta: '¿Mantendrán el 100 % del flujo libre normalizado si hay que invertir en FDNS y el cobre?', por_que: 'El dividendo del 6 % sostiene hoy buena parte del interés por la acción.' },
      { tema: 'Newmont', pregunta: '¿Tiene Newmont intención de vender su 31,9 %?', por_que: 'Una colocación con descuento presionaría el precio y cambiaría el control.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Vender',
    conviccion: 'Media',
    justificacion_recomendacion: null,
    horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Vender, con convicción media. Con el oro plano en 4.150 USD/oz, el objetivo a 12 meses es de 50,74 USD (71,53 CAD) frente a un precio de 64,73 USD (91,25 CAD, cierre del 19-oct-2026): rentabilidad ponderada del −15,5 % y del base del −5,4 % con dividendo. El valor intrínseco (24,97 USD) está un 61 % por debajo y el objetivo medio de los analistas, en 67,71 USD. La razón principal: el precio ya descuenta un oro muy por encima del actual y una vida de mina mucho más larga que la de las reservas. La convicción es media y no alta, como sugiere el motor, porque todo depende de una variable que nadie predice: con el oro a 4.900 USD el base a 12 meses sería +17 %; la bajaría a baja un oro sostenido por encima de 5.000, y la subiría un oro por debajo de 3.800.

**El negocio.** Fruta del Norte es una de las minas de oro de mayor ley del mundo (9,5 g/t en 2025) con un AISC de 1.015 USD/oz, primer cuartil del sector [A1, B3]. Sin deuda y con margen EBITDA del 69 %, el ROIC fue del 96,9 % en 2025 frente a un WACC del 14,7 %; pero a los precios de oro de 2021-2023 el diferencial era de 2-8 puntos: la calidad es la de la mina y el resto es el oro. La sostenibilidad del crecimiento es «Sí» porque no proyectamos crecimiento: la inversión de mantenimiento cabe con holgura en el flujo libre. El problema es la vida: 5,85 Moz de reservas, ≈ 11-12 años [A12].

**Sector y ciclo.** El oro subió de 2.388 USD de media en 2024 a ≈ 3.300 en 2025 [B2]; Lundin Gold lo vendió a 4.518 de media en los nueve primeros meses de 2026, con un pico de 5.318 en enero, y hoy está en ≈ 4.160 [A10, P1]. La acción amplifica el oro ≈ 2 veces (−11 % en el año, −25 % desde el máximo).

**Finanzas.** Ingresos de 1.783 M en 2025 (+49 %) y beneficio de 792 M; flujo libre de 964 M en los 12 meses a junio de 2026, repartido casi entero en dividendos (3,95 USD ordinarios en 12 meses más 3,09 de LunR) [A1, A6]. Caja de 507 M y sin deuda.

**Equipo y gobierno.** Cumple la guía de producción desde 2021. Newmont (31,9 %) y la familia Lundin (26,3 %) controlan la sociedad, y el consejero delegado cambió en noviembre de 2025 [C1, C3]. Resta algo: el minoritario no decide y una OPA con prima es improbable.

**Valoración.** El DCF (22,10 USD) muestra que el flujo de la mina con el oro de hoy no paga la capitalización; el oro que justifica el precio es de ≈ 10.500 USD. El PER de 16,3 veces está por encima de la mediana adelantada de cinco años (10,8) y de los comparables (9,8). Discrepamos del consenso en el oro (supone ≈ 4.700-4.900), no en la mina.

**Riesgos y catalizadores.** El oro (bajista −28 % en el DCF) y Ecuador (reclamación del SRI de 154 M por 2023, que puede repetirse en 2024-2025) [A16]. Catalizadores: resultados del 4-nov, guía 2027 y decisión sobre FDNS (diciembre), reservas de 2026 (febrero) y el primer recurso de cobre de Sandia (2027). El sentimiento de foros empeora sin capitulación.

**Qué cambiaría la decisión.** Por debajo de 60,77 USD (85,67 CAD) pasaría a Mantener; Comprar solo por debajo de 24,97 USD (35,20 CAD), el valor intrínseco. Unas reservas de 2026 que alarguen la vida a 15 años o un oro sostenido por encima de 5.000 USD nos harían revisar al alza.`,
    tesis: 'Lundin Gold es una mina de oro: Fruta del Norte, en Ecuador, produce ≈ 500.000 onzas al año con una ley de 9,5 g/t y un AISC de ≈ 1.000-1.100 USD/oz, de los más bajos del mundo [A1, A11]. Sin deuda y con el oro a 4.150 USD, genera ≈ 900 M USD de flujo libre al año y los reparte casi enteros [A1].\n\nEl precio (64,73 USD; 15.700 M de capitalización) es 16,3 veces nuestro BPA de los próximos 12 meses, frente a una mediana adelantada de 10,8 y comparables a 9,8. El DCF a 14,7 % da 22,10 USD: para llegar al precio, el oro tendría que estar en ≈ 10.500 USD durante toda la vida de la mina o la exploración tendría que multiplicar las reservas (5,85 Moz).\n\nEl mercado paga escasez: minas de primer nivel sin deuda, en un ciclo del oro que ha doblado su precio en dos años, y la opción de FDNS, FDN East y siete pórfidos de cobre y oro [B8]. Para invertir hay que creer que el oro sigue por encima de 5.000 USD y que el distrito es una segunda mina. Nosotros no lo descartamos, pero a este precio el riesgo está en el lado malo: con el oro de hoy, la acción vale un 5 % menos dentro de 12 meses en el caso base y un 68 % menos en el bajista.',
    vision_diferencial: {
      mercado_descuenta: 'Que el oro se mantiene alto (el consenso de BPA de 2027, 4,30 USD, supone ≈ 4.700-4.900 USD/oz) y que Fruta del Norte tendrá mucha más vida que la de sus reservas gracias a FDNS, FDN East y el cobre; paga 16 veces el beneficio por una mina única en Ecuador [D3].',
      nuestra_vision: 'Coincidimos en la mina (producción de la guía, costes) y discrepamos en el oro y la vida: con el oro de hoy y las reservas de hoy, la acción vale menos de la mitad. La opción de la exploración existe, pero hoy no tiene recursos publicados que la midan.',
      por_que: 'Del precio del oro nadie sabe más que el mercado, y por eso lo dejamos en el de hoy. Lo que sí sabemos es que cada caída del oro en 2026 (enero, abril-mayo) restó el doble a la acción, y que el PER actual está un 50 % por encima de su historia.',
    },
    a_favor: [
      '**Mina de primer nivel**: ley de 9,5 g/t y AISC de 1.015 USD/oz en 2025, primer cuartil del sector.',
      '**Sin deuda y caja de 507 M**: todo el flujo libre va al accionista.',
      '**Dividendo del 6 %**: 3,95 USD ordinarios en 12 meses con la política del 100 % del flujo libre normalizado.',
      '**Exploración con resultados**: FDNS, FDN East y siete pórfidos; 0,91 Moz de inferidos convertidos en 2025.',
      '**Guía cumplida**: producción récord de 153.736 oz en el 3T 2026.',
    ],
    en_contra: [
      '**El precio exige un oro de ≈ 10.500 USD**: el DCF con el oro de hoy da 22,10 USD, un 66 % menos.',
      '**Una mina en un país Caa3**: reclamación del SRI de 154 M y un Estado con ≥ 50 % de los beneficios garantizado.',
      '**Vida de reservas de ≈ 11-12 años**: 5,85 Moz con la ley bajando de 9,5 a 7,1 g/t.',
      '**PER de 16,3 frente a 10,8 de su historia**: −15,5 % ponderado a 12 meses.',
      '**Accionistas de control**: Newmont y los Lundin tienen el 58 %; sin prima de OPA posible sin ellos.',
    ],
    que_vigilar: 'La tesis de venta depende de que el oro no vuelva a subir con fuerza y de que las reservas no se multipliquen. La señal en contra sería un oro sostenido por encima de 5.000 USD (el base a 12 meses pasaría a positivo) o unas reservas a 31-dic-2026 que, con FDNS, alarguen la vida a 15 años o más.',
    cambiaria_recomendacion: [
      'Precio por debajo de 60,77 USD (85,67 CAD): Mantener.',
      'Precio por debajo de 24,97 USD (35,20 CAD): Comprar (valor intrínseco).',
      'Oro sostenido por encima de 5.000 USD/oz durante un trimestre: revisar al alza el BPA y la recomendación.',
      'Reservas a 31-dic-2026 con vida de 15 años o más (FDNS incluido): revisar el DCF al alza.',
      'Reclamación del SRI extendida a 2024-2025 por más de 300 M: reforzar Vender.',
    ],
    kpis_seguimiento: [
      { kpi: 'Precio del oro', nivel_actual: '≈ 4.160 USD/oz', umbral_alerta: '> 5.000 o < 3.800', por_que: 'Mueve el BPA casi en proporción.' },
      { kpi: 'Producción trimestral', nivel_actual: '153.736 oz (3T 2026)', umbral_alerta: '< 115.000 oz', por_que: 'Guía de 475.000-525.000 al año.' },
      { kpi: 'AISC', nivel_actual: 'Guía 1.110-1.170 USD/oz', umbral_alerta: '> 1.300', por_que: 'Mide la ley y la inflación minera.' },
      { kpi: 'Reservas', nivel_actual: '5,85 Moz a 7,09 g/t', umbral_alerta: '< 5,5 Moz', por_que: 'Vida de la mina.' },
      { kpi: 'Reclamaciones del SRI', nivel_actual: '154 M (2023)', umbral_alerta: 'Nuevas por 2024-2025', por_que: 'Riesgo país y fiscal.' },
    ],
  },
};
