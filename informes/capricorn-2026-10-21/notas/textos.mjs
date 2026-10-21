// Textos del analista (Capricorn Metals, corte 2026-10-21). Citas: [A1] = fuente 1 de A.json, [P1] = fuente propia.
export default {
  limitaciones: 'Australia no tiene XBRL en herramientas/cuentas.mjs: las cuentas de FY2022-FY2026 (cierre a 30 de junio) se copiaron de los estados auditados por KPMG publicados en la ASX (NIIF australianas, AUD), y los semestres de las notas de resultados y de los informes trimestrales. El BPA de la historia del PER es el subyacente diluido (sin el valor razonable ni el cierre de las coberturas de oro, que hundieron el resultado estatutario de FY2023 y restaron en FY2025-FY2026). El precio es el cierre de Sídney del 21-oct-2026 (13,88 AUD). El puente al valor de las acciones es a 30-jun-2026: no recoge la caja generada en el 1T FY2027 (+62,2 M antes de inversión, 535,0 M de caja y oro a 30-sep) ni el informe trimestral completo, que sale a finales de octubre. La producción posterior a FY2031 es estimación propia sobre las reservas y la PFS de Mt Gibson; la aprobación estatal de Mt Gibson (Parte IV y Parte V) no ha llegado. HotCopper, Market Index, Livewire, Simply Wall St y MarketScreener no abren: el sentimiento sale solo de Motley Fool Australia y FNArena.',
  controles_explicados: [],
  huecos: [],
  secciones: {
    historia: {
      resumen: 'Capricorn Metals es una productora de oro de Perth que cotiza en la ASX. Su primer activo, Karlawinda, en la región de Pilbara (Australia Occidental), lo exploraron WMC (2004-2008) e IGO (2008-2014) antes de pasar a Capricorn [A10]. En julio de 2019 entró como presidente ejecutivo Mark Clark, que había dirigido Equigold y Regis Resources, con varios consejeros de Regis; financió y construyó la mina, que vertió el primer oro el 30-jun-2021 en plazo y presupuesto [C1, A6]. En 2021 compró Mt Gibson, una mina histórica en la región de Yalgoo, que se ha convertido en su segundo proyecto, y en 2025-2026 sumó Warriedar y varios permisos alrededor para formar un distrito [A6, A1]. En 2025 cerró las coberturas de oro con las que financió la construcción y devolvió toda la deuda; en 2026 pagó su primer dividendo, terminó la ampliación de Karlawinda a 6,5 Mt al año y publicó la PFS actualizada de Mt Gibson [A16, A17, A7, A12, A14].',
      hitos: [
        { anio: '2004-2014', hito: 'WMC e IGO exploran Karlawinda (Bibra) antes de que pase a Capricorn [A10].' },
        { anio: '2019', hito: 'Mark Clark (antes en Equigold y Regis Resources) entra como presidente ejecutivo; consejo renovado con antiguos de Regis [C1].' },
        { anio: '2021', hito: 'Primer oro en Karlawinda (30 de junio), en plazo y presupuesto, con financiación bancaria y coberturas; compra de Mt Gibson [A6].' },
        { anio: 'FY2023', hito: 'Pérdida por valor razonable de las coberturas con el oro al alza: beneficio estatutario de 4,4 M frente a 85,8 M subyacente [A5].' },
        { anio: '2024', hito: 'Colocación de 200 M AUD a 6,00 AUD para Mt Gibson y la ampliación de Karlawinda [A3].' },
        { anio: '2025', hito: 'Salida del consejero delegado Paul Criddle (cargo personal desestimado): Clark asume sus funciones. Cierre de todas las coberturas y deuda cero (junio) [C4, C5, A16, A17].' },
        { anio: '2025-2026', hito: 'Compra de Warriedar (Golden Range y Fields Find) por acciones y otros permisos alrededor de Mt Gibson (nov-2025); venta de Big Springs por 26 M (jul-2026) [A1, A18].' },
        { anio: '2026', hito: 'Primer dividendo (5 céntimos, febrero); aprobación federal de Mt Gibson (30-jun); PFS actualizada, reservas del grupo de 5,24 Moz y aspiración «Range 500» (27-jul); ampliación de Karlawinda terminada (23-sep) [A7, B6, A13, A14, A15, A12].' },
      ],
      confianza: 'Alta',
    },
    rentabilidad: {
      comentario: 'Con un WACC del 13,5 %, Capricorn crea mucho valor desde que Karlawinda produce: ROIC del 33,6 % en FY2022, 30,4 % en FY2023, 38,0 % en FY2024, 51,2 % en FY2025 y 45,1 % en FY2026 [A1, A3-A6]. La diferencia ROIC − WACC fue de 17 a 38 puntos todos los años, incluso con el oro a 2.400-2.700 AUD de FY2022-FY2023. Dos razones: una mina a cielo abierto de baja ley pero de coste bajo (AISC de 1.208-1.629 AUD/oz) y poco capital invertido (≈ 300 M hasta FY2024). La bajada de FY2026 frente a FY2025 no es peor negocio: el capital invertido casi se dobla (de 365 a 702 M) con la ampliación de Karlawinda, Warriedar y la exploración de Mt Gibson, que aún no producen. En los próximos dos años el ROIC bajará con la construcción de Mt Gibson (≈ 600 M de inversión antes de producir), y volverá a subir desde FY2029 si la mina arranca en plazo: con nuestro caso base, el NOPAT de FY2030 (≈ 870 M) sobre un capital de ≈ 1.500 M da ≈ 55-60 %. El ROE es menor que el ROIC por la caja sin usar (505 M a 30-jun-2026) [A1].',
      confianza: 'Media',
    },
    esg: {
      calificaciones: [],
      materialidad: 'Tres asuntos mueven las cifras. (1) Permisos y patrimonio aborigen: Mt Gibson necesita la aprobación ambiental del Estado (Parte IV de la ley ambiental de Australia Occidental, revisión pública cerrada) y las licencias de la Parte V; la federal llegó el 30-jun-2026 [B6, A15]. La relación con los propietarios tradicionales (Nyiyaparli en Karlawinda; Badimia en Mt Gibson) es condición de las dos minas [A1]. (2) Agua y relaves: la presa de relaves de Karlawinda funciona con licencia del regulador del agua (DWER); en FY2026 se reutilizaron 1.681 ML de agua y se estudia un espesador para recuperar más [A1]. (3) Energía y emisiones: la mina usa sobre todo gas (más diésel en la flota), con una base de 100.000 t de CO2 del Safeguard Mechanism; el alcance 3 se publicará desde FY2027 y se estudian placas solares y eólica [A1]. Seguridad: TRIFR de 4,45 en FY2026 (6,52 en FY2025) y un accidente con baja [A1].',
      controversias: 'Sin controversias ambientales o de cumplimiento conocidas. La única de los últimos dos años fue personal: en abril de 2025 se acusó al consejero delegado Paul Criddle de agresión con agravantes; el cargo se desestimó en mayo y él dimitió como consejero delegado (hoy es consejero delegado adjunto) [C4, C5, A1]. En la junta de 2025, el 22 % votó contra los derechos de acciones a Mark Clark y casi el 10 % contra su reelección [C2].',
      confianza: 'Media',
    },
  },
  parches: [],
  huecos_resueltos: [],
  suma_partes: 'No se hace suma de partes: Karlawinda y Mt Gibson ya están juntas en la proyección por onzas, y Golden Range (Warriedar) y la exploración regional no tienen un plan de mina publicado que permita valorarlas aparte. Para contrastar: la PFS da a Mt Gibson un VAN antes de impuestos de 6.065 M AUD al 7,5 % con el oro a 5.500 AUD [A14]; después de impuestos y al 13,5 % de nuestro WACC queda en ≈ 2.000-2.500 M, y Karlawinda con ≈ 150.000 oz al año durante diez años vale ≈ 1.800-2.000 M. Con la caja (≈ 300 M netos), la suma da ≈ 4.200-4.800 M (9-10,5 AUD por acción), coherente con el DCF.',
  dcf_justificacion: {
    crecimiento: 'Los ingresos son onzas vendidas × precio del oro en AUD; no hay coberturas desde junio de 2025 [A16]. Oro plano en 5.900 AUD/oz, el cierre del 21-oct (4.142 USD al 0,7028) [P1, B2]; FY2027 lleva el 1T ya vendido a ≈ 6.300 AUD. Producción: 142.000 oz en FY2027 (centro alto de la guía de 137.000-147.000 [A10]; Karlawinda ya ampliada [A12]); Mt Gibson arranca con seis meses de retraso sobre el calendario de la empresa (195.000 oz del grupo en FY2028 frente a 220.000 de «Range 500») y sube a 375.000-400.000 en FY2030-FY2032, algo por debajo de la aspiración de 380.000-410.000 [A15]. Después baja con la ley de Karlawinda (reservas a 0,6 g/t) y Mt Gibson en su media de vida (190.000 oz) [A13, A14].',
    margenes: 'Coste por onza (sin amortización, con regalías y exploración en gastos) de ≈ 2.320 AUD en FY2026 [A2]. Sube a ≈ 2.550 en FY2027 con la guía de AISC (1.900-2.100 frente a 1.629: más estéril movido con la ampliación) → margen EBITDA del 57 % [A10]. FY2028 con el arranque de Mt Gibson (AISC del año 1 de 2.127) → 56 %. Desde FY2029 Mt Gibson en régimen (AISC de 1.700-1.820) → 61-63 %, y baja un punto al año desde FY2033 [A14]. Regalías: el 2,5 % del Estado de Australia Occidental más regalías privadas (5,6 % de las ventas en FY2026; 3,35 % en Mt Gibson) [A2, B5]; suben y bajan con el oro, por eso los escenarios mueven el margen.',
    inversion: 'FY2027: inversión inicial de Mt Gibson (345 M más 129 M de minería previa; ≈ 45 % este año), Karlawinda y exploración capitalizada → 39 % de las ventas (≈ 330 M). FY2028: el resto de Mt Gibson → 33 % (≈ 380 M). Desde FY2029, mantenimiento de las dos minas (59 M de capital de Mt Gibson tras el arranque, recrecimientos de las presas de relaves, flota) y exploración: 8-10 % [A14, A10].',
    wacc: 'Coste del capital del 13,5 %, sin deuda: bono australiano a 10 años del 5,31 % (RBA, 14-oct-2026) [D6] + beta de 1,30 × 5,5 % (la de Damodaran para metales preciosos es de 1,37 [D7]; la nuestra frente al S&P/ASX 200, 1,44 la bruta y 1,29 la ajustada [D1]) + 1,0 % de prima por depender hoy de una sola mina y tener un proyecto pendiente de aprobación. Con la prima implícita del mercado (4,2 %) el WACC sería del 11,8 % [D5].',
    terminal: 'Crecimiento perpetuo del −3 % desde FY2036: las minas se agotan. Entre FY2027 y FY2036 se producen ≈ 3,2 Moz; quedan ≈ 1,5-2 Moz de reservas y 8,66 Moz de recursos del grupo (que incluyen las reservas) y la exploración del distrito de Mt Gibson [A13]. El valor terminal pesa el 27 % del valor de empresa.',
  },
  puente_comentarios: {
    '2027e': 'Volumen +15 % (142.000 oz frente a 123.096 vendidas) con la ampliación de Karlawinda; precio −4 % (≈ 6.000 AUD frente a 6.241 de FY2026) [A10, A2].',
    '2028e': 'Volumen +37 % con medio año de Mt Gibson (≈ 45.000 oz) y Karlawinda a 150.000; oro plano en 5.900 AUD [A14, A12].',
    '2029e': 'Primer año completo de Mt Gibson (≈ 170.000 oz) [A14].',
    '2030e': 'Mt Gibson en los años de mayor producción (260.000 oz en los años 3-6 de la PFS) [A14].',
    '2031e': 'Grupo en ≈ 400.000 oz, por debajo de los 410.000 de «Range 500» [A15].',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'El crecimiento no sale de ganar cuota a nadie (el oro se vende entero al precio del mercado: la cuota pasa del 0,1 % al 0,3 % de la producción mundial) sino de dos minas con reservas declaradas: Karlawinda ampliada (1,57 Moz) y Mt Gibson (3,67 Moz, PFS de julio de 2026) [A13, A14]. La inversión (≈ 710 M en FY2027-FY2028) se paga con la caja (535 M a 30-sep) y el flujo de Karlawinda (≈ 250-300 M al año después de impuestos con el oro de hoy) sin deuda [A11]. Lo que no está asegurado es el plazo: falta la aprobación estatal de Mt Gibson, y por eso el caso base ya lleva seis meses de retraso sobre el calendario de la empresa y el bajista doce.',
  dcf_lectura: 'El DCF da 10,34 AUD por acción, un 26 % por debajo del precio de 13,88. No es la cola (el valor terminal pesa un 27 %) ni el crecimiento (el caso base ya triplica la producción con Mt Gibson): es el oro y la tasa. Con el oro de hoy plano (5.900 AUD) y un WACC del 13,5 %, las dos minas no llegan a la capitalización de 6.380 M. El precio supone una rentabilidad anual del 9,6 % (por debajo de nuestro 13,5 % y del 11,8 % que pide el mercado) o un oro de ≈ 7.000 AUD (≈ 4.900 USD) sostenido: cada 100 AUD de oro mueven ≈ 0,30 AUD el valor por acción. El escenario alcista (oro a 6.700 AUD y Mt Gibson en el calendario de la empresa) da 12,98: ni así llega al precio.',
  narrativas: {
    Bajista: 'El oro baja a 5.000 AUD/oz (≈ 3.500 USD, el nivel de finales de 2025) y Mt Gibson llega doce meses tarde sobre el calendario de la empresa (aprobación estatal lenta o retrasos de obra): 160.000 oz en FY2028 y 280.000 en FY2029. Margen EBITDA 7,5 puntos menor (los costes por onza no bajan con el oro) y WACC +0,5. Valor de 7,09 AUD.',
    Base: 'Oro plano en 5.900 AUD/oz, Karlawinda a 150.000 oz al año y Mt Gibson con seis meses de retraso (primer oro a mediados de 2028); grupo en ≈ 400.000 oz desde FY2031. Valor de 10,34 AUD.',
    Alcista: 'El oro sube a 6.700 AUD/oz (≈ 4.700 USD, la media de enero-agosto de 2026) y Mt Gibson sigue el calendario de «Range 500» (220.000 oz del grupo en FY2028 y 410.000 en FY2031); margen 5 puntos mayor. Valor de 12,98 AUD: ni con este oro el DCF llega al precio.',
  },
  escenarios_comentario: 'Los escenarios combinan las dos cosas que deciden: el oro (5.000 / 5.900 / 6.700 AUD/oz) y el plazo de Mt Gibson (12 / 6 / 0 meses de retraso sobre la empresa). El valor va de 7,09 a 12,98 AUD, todo por debajo del precio de 13,88; el ponderado (25/50/25) es de 10,19. La asimetría es negativa: el bajista resta un 49 % y el alcista un 6,5 %. Para el horizonte de 12 meses, con el PER, el abanico es mucho más ancho (4,92-20,83 AUD) porque el beneficio de FY2028 depende casi entero del oro y de cuántas onzas dé Mt Gibson ese año.',
  casos_12m: {
    Bajista: 'Oro a 5.000 AUD y Mt Gibson con 12 meses de retraso: BPA de FY2028e de 0,52 AUD, y PER del mínimo de cinco años (9,4 veces, junio de 2024) [D1].',
    Base: 'Oro plano en 5.900 AUD y Mt Gibson con seis meses de retraso: BPA de FY2028e de 0,88 AUD (beneficio de ≈ 405 M), y PER de 16,8 veces (el actual de 18,5 rebajado un 10 %, porque la mediana adelantada de cinco años es de 13,7).',
    Alcista: 'Oro a 6.700 AUD y Mt Gibson en plazo: BPA de FY2028e de 1,24 AUD (≈ el consenso de 1,25) con el mismo PER del base (16,8): ni la historia (mediana de 13,7) ni los comparables (11,1) pagan más.',
  },
  diferencia_consenso: 'Nuestro objetivo a 12 meses (13,84 AUD) queda un 29 % por debajo del objetivo medio de 8 analistas (19,61; nuestro base, un 25 % por debajo) [D2]. La diferencia está en el beneficio de FY2028: el consenso espera 1,25 AUD por acción y nosotros 0,88. Para llegar ahí hace falta el oro de ≈ 6.700 AUD y Mt Gibson en plazo, que es nuestro alcista. Los analistas van recortando: el BPA de FY2027 bajó de 0,874 a 0,850 en 90 días, y Macquarie bajó el objetivo a 15,50 (Neutral) el 2-oct [D2, D3].',
  objetivo_comentario: 'El objetivo es el PER sobre el BPA de FY2028e, el primer ejercicio con Mt Gibson produciendo. La regla v3 da un base de 16,8 veces (el PER actual de 18,5 rebajado un 10 %, porque la mediana adelantada de cinco años es de 13,7) y deja el alcista en el mismo múltiplo. Con el oro de hoy, la acción vale ≈ lo que cuesta: +0,4 % ponderado y +7,3 % el base con dividendo. La v2 (historia al cierre) da +8,2 %, también Mantener. El BPA base crece un 10 % al año desde el subyacente de FY2026 (0,73) y un 18 % desde el estatutario (0,63): lo explica la producción, que pasa de 123.000 a 195.000 oz, con el oro algo más bajo y costes más altos.',
  valoracion_comentario: 'El DCF (10,34 AUD) mide las dos minas con el oro de hoy y su vida de reservas; el objetivo a 12 meses (13,84) mide lo que el mercado suele pagar por su beneficio. Los comparables (PER de 11,1 veces de mediana sobre los próximos 12 meses) dan 10,3-13,1 AUD porque las grandes productoras australianas cotizan a 7-16 veces [D4]. Pesos: DCF 45 %, escenarios 40 %, comparables 15 %; sin transacciones con múltiplos comparables publicados. Valor intrínseco de 10,35 AUD, un 25 % por debajo del precio: Capricorn no tiene margen de seguridad hoy.',
  catalizadores: {
    items: [
      { fecha: '2026-10 (finales)', evento: 'Informe trimestral del 1T FY2027 (julio-septiembre)', efecto: 'AISC real tras la ampliación (guía de 1.900-2.100) y calendario de Mt Gibson', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-11-24', evento: 'Junta general', efecto: 'Votos sobre la remuneración y la reelección de consejeros; actualización de permisos', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-12 / 2027 (1S)', evento: 'Aprobación estatal de Mt Gibson (Parte IV) y licencias de la Parte V; inicio de obras', efecto: 'Quita el mayor riesgo del plan: el base pasa a parecerse al alcista en onzas', probabilidad: 'Media', sentido: '+' },
      { fecha: '2027-02', evento: 'Resultados del primer semestre FY2027 y dividendo', efecto: 'Primer semestre con la ampliación; dividendo frente a la inversión de Mt Gibson', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-07', evento: 'Reservas y recursos a 30-jun-2027 y guía FY2028', efecto: 'Golden Range y la exploración regional pueden añadir vida', probabilidad: 'Alta', sentido: '+' },
      { fecha: '2028 (1T natural)', evento: 'Primer oro de Mt Gibson (calendario de la empresa)', efecto: 'Paso de mina única a dos minas', probabilidad: 'Media', sentido: '+' },
      { fecha: 'continuo', evento: 'Precio del oro', efecto: 'Cada 100 AUD/oz ≈ 14 M de EBITDA al año hoy y ≈ 40 M con las dos minas; ≈ 0,30 AUD de valor por acción', probabilidad: 'Alta', sentido: '+/−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Precio del oro: la acción mueve ≈ 2-3 veces lo que mueve el oro y el beneficio casi en proporción', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−31 % en el DCF con oro a 5.000 AUD y retraso (bajista: 7,09 frente a 10,34); −64 % a 12 meses en el bajista', mitigante: 'Sin deuda ni coberturas; AISC de ≈ 2.000 AUD/oz: gana dinero hasta con el oro un 60 % más bajo', senal: 'Oro por debajo de 5.300 AUD varias semanas' },
      { riesgo: 'Una sola mina en producción (Karlawinda) hasta 2028', tipo: 'Operativo', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: 'Cada trimestre perdido ≈ −5 % del valor; un problema en la presa de relaves o la planta ampliada para todo el ingreso', mitigante: 'Mina a cielo abierto sencilla, cumplió la guía en FY2025-FY2026; planta nueva en paralelo a la antigua', senal: 'Producción trimestral por debajo de 32.000 oz con la planta ampliada' },
      { riesgo: 'Aprobaciones y ejecución de Mt Gibson: falta la aprobación ambiental estatal (Parte IV) y las licencias de la Parte V; obra de 345 M más 129 M de minería previa', tipo: 'Regulatorio / ejecución', probabilidad: 'Media', impacto: 'Alto', efecto_valor: 'Cada 6 meses de retraso ≈ −0,3 a −0,5 AUD por acción en el DCF y ≈ −0,15 AUD de BPA en FY2028', mitigante: 'Aprobación federal ya concedida (30-jun-2026), revisión pública cerrada, ingeniería y contratos cerrados; el equipo construyó Karlawinda y su ampliación en plazo [A11, A12]', senal: 'Que la EPA de Australia Occidental pida información adicional o alargue la evaluación más allá del 1S de 2027' },
      { riesgo: 'Vida de las reservas: Karlawinda tiene 1,57 Moz a 0,6 g/t (≈ 10 años a 150.000 oz) y la ley de lo que se procesa baja', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'El valor terminal (27 %) supone producción menguante y no un desplome', mitigante: 'Recursos de 8,66 Moz; distrito de Mt Gibson y Golden Range con exploración activa', senal: 'Reservas de julio de 2027 que no reponen lo minado' },
      { riesgo: 'Costes: el AISC sube de 1.629 a 1.900-2.100 AUD en FY2027 con la ampliación', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '≈ −0,02 AUD de BPA al año por cada 100 AUD de AISC', mitigante: 'Contratos cerrados; más volumen reparte los costes fijos', senal: 'AISC trimestral por encima de 2.200 AUD' },
      { riesgo: 'Valoración: PER de 18,5 veces nuestro BPA de 12 meses frente a una mediana adelantada de 13,7 y comparables a 11,1', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Alto', efecto_valor: 'Valor intrínseco un 25 % por debajo del precio', mitigante: 'Crecimiento de producción que los comparables no tienen', senal: 'PER que no baja aunque baje el oro' },
      { riesgo: 'Gobierno: presidente ejecutivo que hace de consejero delegado desde mayo de 2025', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'Dependencia de una persona clave', mitigante: 'Cuatro consejeros independientes; equipo de dirección con consejero delegado adjunto, director de operaciones y de desarrollo', senal: 'Votos en contra en la junta del 24-nov-2026' },
    ],
    premortem: 'Octubre de 2029: la acción vale un 40 % menos. Lo más probable es una combinación de dos cosas. Primero, el oro: tras el pico de enero de 2026 (≈ 6.700 AUD) siguió bajando hasta los 4.800-5.000 AUD con tipos reales más altos y ventas de los ETF. Con el AISC de ≈ 2.000 AUD, el beneficio por onza cayó un 30 %. Segundo, Mt Gibson: la EPA tardó un año más de lo previsto y la obra se encareció un 20 %, así que el primer oro llegó a finales de 2028 y la inversión se comió la caja y el dividendo. El mercado, que en 2026 pagaba 18 veces el beneficio por el crecimiento, pasó a pagar las 10 veces de su mínimo.',
    ia: { exposicion: 'Baja', sentido: 'Neutral', efecto_valor: '±1-2 % a 3-5 años', comentario: 'La IA no cambia lo que vende Capricorn (oro, un bien físico cuyo precio fija el mercado mundial) ni sustituye a la mina. Toca solo los costes: planificación de la mina y del procesado, mantenimiento predictivo de la flota y la planta, interpretación de sondeos de exploración (útil en el distrito de Mt Gibson) y seguridad. Ahí puede ahorrar algo, pero la ventaja la tendrán también los demás productores, así que no cambia la posición relativa. Riesgo de IA bajo.' },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Mt Gibson', pregunta: '¿Cuándo esperan la recomendación de la EPA de Australia Occidental y el visto bueno del ministro, y cuánto de la inversión inicial (345 M) ya está comprometido en contratos?', por_que: 'El calendario de Mt Gibson decide el beneficio de FY2028 y el objetivo a 12 meses.' },
      { tema: 'Costes', pregunta: '¿Qué AISC esperan en Karlawinda con la planta ampliada en régimen y la ley bajando hacia la de reservas (0,6 g/t)?', por_que: 'La guía de FY2027 sube el AISC un 25 %; hay que saber si es pico o nivel.' },
      { tema: 'Reservas', pregunta: '¿Qué parte de Golden Range (Warriedar) puede convertirse en reservas y procesarse en Mt Gibson?', por_que: 'Es la vía para alargar la vida más allá de las reservas actuales.' },
      { tema: 'Capital', pregunta: '¿Mantendrán el dividendo durante la construcción de Mt Gibson o priorizarán la caja?', por_que: 'La caja (535 M) cubre la inversión, pero con poco margen si el oro baja.' },
      { tema: 'Gobierno', pregunta: '¿Hay plan de sucesión y de un consejero delegado separado del presidente?', por_que: 'Mark Clark concentra la presidencia y la dirección desde mayo de 2025.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Mantener',
    conviccion: 'Media',
    justificacion_recomendacion: null,
    horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener, con convicción media. Con el oro plano en 5.900 AUD/oz, el objetivo a 12 meses es de 13,84 AUD frente a un precio de 13,88 AUD (cierre de Sídney del 21-oct-2026): rentabilidad ponderada del +0,4 % y del base del +7,3 % con dividendo. El valor intrínseco (10,35 AUD) está un 25 % por debajo y el objetivo medio de los analistas (19,61) un 41 % por encima: ellos esperan más oro y Mt Gibson en plazo [D2]. La convicción es media porque las dos reglas coinciden (12 meses y valor intrínseco) y la calidad es alta, pero el resultado depende casi entero de una variable que no prevemos, el oro: la subiría la aprobación estatal de Mt Gibson (quita el riesgo de plazo) y la bajaría un oro por debajo de 5.300 AUD o un AISC de Karlawinda por encima de 2.200.

**El negocio.** Capricorn produce oro en una mina a cielo abierto, Karlawinda (Australia Occidental), recién ampliada a ≈ 150.000 oz al año, y prepara una segunda, Mt Gibson (PFS: 3,67 Moz de reservas, 190.000 oz al año durante 19 años) [A12, A14]. Sin deuda ni coberturas desde junio de 2025 [A17]. El ROIC fue del 30-51 % en FY2022-FY2026 frente a un WACC del 13,5 %: calidad alta. La sostenibilidad del crecimiento es «Sí»: las onzas están en reservas y la inversión cabe en la caja.

**Sector y ciclo.** El oro realizado subió de ≈ 2.450 AUD/oz en FY2022 a 6.241 en FY2026, con un pico de ≈ 6.700 en enero de 2026, y hoy está en ≈ 5.900 [A2, B2]. La acción amplifica el oro ≈ 2-3 veces (−22 % desde el máximo de agosto).

**Finanzas.** Ventas récord de 769 M en FY2026 (+46 %), EBITDA de 484 M (63 %) y beneficio subyacente de 327 M; caja neta de 505 M a 30-jun y 535 M de caja y oro a 30-sep [A2, A11]. Primer dividendo (10 céntimos en el año).

**Equipo y gobierno.** Mark Clark (presidente ejecutivo, 3,8 % del capital) construyó minas en Equigold, Regis y Capricorn en plazo; hace también de consejero delegado desde mayo de 2025 [C1, C5]. Cuatro consejeros independientes.

**Valoración.** El DCF (10,34 AUD) muestra que, con el oro de hoy y un 13,5 % de tasa, las dos minas no pagan la capitalización: el precio supone un oro de ≈ 7.000 AUD o una rentabilidad del 9,6 %. El PER de 18,5 veces está por encima de su mediana adelantada (13,7) y de los comparables (11,1).

**Riesgos y catalizadores.** El oro (bajista −49 % en el DCF y −64 % a 12 meses) y la aprobación estatal de Mt Gibson. Catalizadores: informe trimestral de finales de octubre, junta del 24-nov, aprobación de la Parte IV y primer oro de Mt Gibson (2028). Riesgo de IA bajo.

**Qué cambiaría la decisión.** Comprar por debajo de 10,35 AUD (valor intrínseco, con la regla a 12 meses en ≥ 15 %); Vender por encima de 15,49. La aprobación estatal de Mt Gibson con el oro por encima de 6.500 AUD nos haría revisar al alza.`,
    tesis: 'Capricorn Metals es una productora de oro australiana con una mina, Karlawinda, que da ≈ 150.000 oz al año tras su ampliación, y un segundo proyecto, Mt Gibson, que la llevaría a ≈ 400.000 oz hacia 2031 [A12, A15]. Sin deuda, con 535 M de caja y un ROIC por encima del 30 % todos los años [A11].\n\nEl precio (13,88 AUD; ≈ 6.380 M de capitalización) es 18,5 veces nuestro BPA de los próximos 12 meses: ya descuenta Mt Gibson en marcha y un oro algo más alto que el de hoy. Con el oro plano en 5.900 AUD, el objetivo a 12 meses es de 13,84 (+0,4 %) y el valor intrínseco de 10,35. Buena empresa a precio lleno: Mantener.',
    vision_diferencial: {
      mercado_descuenta: 'Que Mt Gibson llega en plazo y que el oro se mantiene en ≈ 6.500-7.000 AUD: el consenso de BPA de FY2028 (1,25 AUD) es nuestro escenario alcista [D2].',
      nuestra_vision: 'Coincidimos en la calidad y en el plan (las onzas están en reservas) y discrepamos en el oro y el plazo: con el oro de hoy y seis meses de retraso, la acción vale lo que cuesta a 12 meses y un 25 % menos a largo plazo.',
      por_que: 'Del precio del oro nadie sabe más que el mercado, y por eso lo dejamos en el de hoy. Lo que sí sabemos es que la aprobación estatal de Mt Gibson no ha llegado y que cada caída del oro en 2026 restó a la acción entre el doble y el triple.',
    },
    a_favor: [
      '**Calidad**: ROIC del 30-51 % en FY2022-FY2026, frente a un WACC del 13,5 %.',
      '**Sin deuda ni coberturas**: todo el oro se vende a precio de mercado; 535 M de caja y oro a 30-sep.',
      '**Crecimiento con reservas**: Karlawinda ampliada en plazo y Mt Gibson con 3,67 Moz en la PFS.',
      '**Equipo que construye en plazo**: Karlawinda (2021) y su ampliación (2026).',
      '**Distrito de exploración**: Golden Range y 8,66 Moz de recursos del grupo.',
    ],
    en_contra: [
      '**El precio exige un oro de ≈ 7.000 AUD**: el DCF con el oro de hoy da 10,34 AUD, un 26 % menos.',
      '**Una sola mina hasta 2028**: Karlawinda es todo el ingreso.',
      '**Mt Gibson sin aprobación estatal**: el calendario puede alargarse.',
      '**AISC al alza**: de 1.629 a 1.900-2.100 AUD en FY2027.',
      '**PER de 18,5 frente a 13,7 de su historia** y 11,1 de los comparables.',
    ],
    que_vigilar: 'La tesis depende del oro y del plazo de Mt Gibson. La señal a favor sería la aprobación estatal con el oro por encima de 6.500 AUD (el base a 12 meses se acercaría al alcista); la señal en contra, un oro por debajo de 5.300 AUD o una evaluación de la EPA que se alargue más allá de mediados de 2027.',
    cambiaria_recomendacion: [
      'Precio por debajo de 10,35 AUD: Comprar (valor intrínseco y regla a 12 meses).',
      'Precio por encima de 15,49 AUD: Vender (ponderada a 12 meses ≤ −10 %).',
      'Aprobación estatal de Mt Gibson y oro sostenido por encima de 6.500 AUD/oz: revisar al alza el BPA de FY2028.',
      'Oro por debajo de 5.300 AUD/oz durante un trimestre: revisar a la baja.',
      'Retraso de la Parte IV más allá del 1S de 2027: rebajar el base al bajista en onzas.',
    ],
    kpis_seguimiento: [
      { kpi: 'Precio del oro en AUD', nivel_actual: '≈ 5.900 AUD/oz', umbral_alerta: '> 6.500 o < 5.300', por_que: 'Mueve el BPA casi en proporción.' },
      { kpi: 'Producción trimestral de Karlawinda', nivel_actual: '31.218 oz (1T FY2027)', umbral_alerta: '< 32.000 con la planta ampliada', por_que: 'Guía de 137.000-147.000 oz al año.' },
      { kpi: 'AISC', nivel_actual: 'Guía 1.900-2.100 AUD/oz', umbral_alerta: '> 2.200', por_que: 'Mide el coste de la ampliación.' },
      { kpi: 'Permisos de Mt Gibson', nivel_actual: 'Federal concedido; Parte IV en evaluación', umbral_alerta: 'Sin decisión a mediados de 2027', por_que: 'Decide el plazo del segundo activo.' },
      { kpi: 'Caja y oro', nivel_actual: '535,0 M (30-sep-2026)', umbral_alerta: '< 250 M durante la obra', por_que: 'Financia Mt Gibson sin deuda.' },
    ],
  },
};
