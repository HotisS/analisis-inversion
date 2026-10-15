// Textos del analista para GEA Group (corte 2026-10-15). Cifras del motor tal cual (datos.json → calc).
const fuentes = [
  { id: 1, titulo: 'Morgan Stanley mejora GEA Group a «equal-weight» por valoración (23-jun-2026)', editor: 'Stockopedia (Refinitiv/Reuters)', tipo: 'Prensa', fecha: '2026-06-23', url: 'https://www.stockopedia.com/share-prices/signify-nv-AMS:LIGHT/news/ms-upgrades-gea-group-on-valuation-despite-mid-term-growth-risks-019ef37f-2cb2-7015-a025-a71d22a7e5a7/' },
  { id: 2, titulo: 'GEA Aktie: Prognoseanhebung vom 21. Juli (subida de la guía y objetivos de Deutsche Bank, RBC y DZ Bank)', editor: 'Börse Express', tipo: 'Prensa', fecha: '2026-07-22', url: 'https://www.boerse-express.com/news/articles/gea-aktie-prognoseanhebung-vom-21-juli-932559' },
  { id: 3, titulo: 'Ad hoc: GEA Group AG resuelve un programa de recompra de hasta 500 M EUR con amortización', editor: 'GEA Group AG', tipo: 'Primaria', fecha: '2026-08-05', url: 'https://www.gea.com/de/news/corporate/2026/ad-hoc-gea-resolves-new-share-buyback-program/' },
];

const sintesis = `**La recomendación y por qué.** Mantener, con convicción baja. El objetivo a 12 meses es de 68,94 EUR (ponderado) y 73,32 EUR en el caso base, frente a un precio de 69,05 EUR: rentabilidad ponderada del 1,7 % y del 8,1 % en el base, lejos del 15 % que pide una compra. El valor intrínseco (69,66 EUR) coincide con el precio y el objetivo medio de 18 analistas es de 70,83 EUR [D2]. La razón principal es que GEA ya cotiza a 20,3 veces nuestro BPA de 2027, por encima de su mediana de cinco años (18,8x), justo cuando el margen está cerca del objetivo de 2030. La convicción es baja porque las dos reglas discrepan: con la prima que hoy pide el mercado (4,2 %) el valor sube a 78,14 EUR y saldría Comprar; subiría si el 3T26 (9-nov) confirma margen ≥ 17,4 % con ventas orgánicas de dos cifras.

**El negocio.** GEA vende máquinas y plantas para lácteos, alimentación, bebidas y farmacia, con un 40 % de ventas de servicio [A7]. El ROIC (20,9 % con el fondo de comercio) supera en 12,4 puntos al WACC (8,49 %), y el ROCE que publica la empresa es del 36,8 % [A6]. El frío industrial y las bombas de calor que interesan a esta tesis ya no son una división: HRT (624,6 M de ventas, el 11 % del grupo, margen del 14,3 %) se disolvió el 31-dic-2025 y se repartió entre Pure Flow Processing y Nutrition Plant Engineering [A1]. Sostenibilidad del crecimiento: **Sí**. El 4,6 % anual que proyectamos se apoya en una cartera récord (3.540 M), en precio repercutido y en un mercado que crece un 4,5 %, y la cuota implícita apenas pasa del 10,6 % al 11,0 %.

**Finanzas.** Ventas de 5.495 M en 2025 (+3,7 % orgánico) con margen EBITDA antes de reestructuración del 16,5 %, y en el 1S26 +8,2 % orgánico y 16,8 % [A1, A6]. Liquidez neta de 70,9 M en junio tras pagar 211,6 M de dividendo; el balance es casi sin deuda (Baa1) [A5]. El FCF convirtió el 93 % del beneficio en 2025.

**Valoración.** El DCF da 69,62 EUR, con el 72 % en el valor terminal. El DCF inverso dice que el precio descuenta un crecimiento del 4,4 % anual (nuestro base: 4,5 %) y un margen del 17,4 % (base: 17,5 %): el mercado paga casi exactamente Mission 30. Los comparables por PER de los próximos 12 meses dan 75,62 EUR, pero con el BPA ajustado del consenso. Frente a su propia historia cotiza con prima: PER de los últimos 12 meses de 25,9x frente a una media de 20,8x.

**Riesgos y catalizadores.** El mayor riesgo es el ciclo de grandes proyectos de lácteos y nueva alimentación: el bajista a 12 meses (45,08 EUR, −32,8 %) supone dos años de pedidos a la baja como en 2023. El fondo soberano de Kuwait vendió un 3 % el 2-sep y conserva cerca del 7,5 % [C4]. Catalizadores: resultados del 3T26 el 9-nov [D9] y la recompra de 500 M [B3].

**Qué cambiaría la decisión.** Compraríamos por debajo de 61,08 EUR; venderíamos por encima de 78,05 EUR. Subiríamos el objetivo si la guía de 2027 apunta a margen ≥ 18 % antes de reestructuración, y lo bajaríamos si los pedidos de los proyectos de más de 15 M caen dos trimestres seguidos.`;

export default {
  fuentes,
  limitaciones: 'Línea cotizada: acción ordinaria G1A en Xetra (EUR); el ADR GEAGY no se usa. Sin XBRL: filings.xbrl.org no recoge los ESEF de emisores alemanes, así que la cuenta, el balance y los flujos de 2021-2025 se copiaron de los informes anuales 2022, 2024 y 2025 (PDF y Excel de la empresa) y se cuadraron entre sí (2025 frente al Excel; 2023 y 2021 como comparativos). Segmentos: GEA cambió a cuatro divisiones el 1-ene-2026 y solo publica la estructura nueva reexpresada para 2024 y 2025; los años anteriores (cinco divisiones, con HRT aparte) no se mezclan. El EBITDA de los segmentos es «antes de reestructuración». Acciones: 162,8 M a junio de 2026 menos ≈1,1 M recompradas desde el 10-ago (estimación propia con los informes semanales: ≈126.500 por semana) = 161,7 M; la caja del puente se ajusta con ≈75 M pagados. Consenso de una sola fuente con estimaciones (Stock Analysis), con BPA ajustado que no es comparable con el publicado; contraste del objetivo con Börse Express. Comparables tomados de la ficha sectorial del repositorio (Yahoo, 14-oct-26) y pasados a EUR con el BCE del 15-oct. Transacciones tomadas del informe de Krones del repositorio (9-oct-26) y de la ficha de transferencia de calor.',
  controles_explicados: [
    { control: 'BAI − impuestos − minoritarios = beneficio neto (2022)', explicacion: 'El beneficio neto publicado incluye 26,4 M de operaciones interrumpidas (después de impuestos).' },
    { control: 'BAI − impuestos − minoritarios = beneficio neto (2023)', explicacion: 'Incluye −11,8 M de operaciones interrumpidas.' },
    { control: 'BAI − impuestos − minoritarios = beneficio neto (2024)', explicacion: 'Incluye −13,1 M de operaciones interrumpidas.' },
    { control: 'BAI − impuestos − minoritarios = beneficio neto (2021)', explicacion: 'Incluye 5,6 M de operaciones interrumpidas.' },
    { control: 'BAI − impuestos − minoritarios = beneficio neto (2025)', explicacion: 'Incluye 4,1 M de operaciones interrumpidas.' },
  ],
  huecos: [
    { seccion: 'sentimiento', campo: 'sentimiento', tipo: 'Complemento', intentos: '1) RSS de Seeking Alpha para GEAGY: sin contenido; 2) API de Stocktwits: «Symbol not found» para GEAGY; 3) búsqueda de hilos de wallstreet-online, ariva y finanzen.net: solo noticias, ningún hilo indexado de los últimos tres meses', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe de sostenibilidad 2025 (solo menciones a rankings); 2) web de inversores; 3) ranking de TIME/Statista citado en la nota de prensa del 2T26 (no es una calificación de agencia)', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'insiders', tipo: 'Complemento', intentos: '1) Informe anual 2025 (no lista operaciones); 2) web de inversores (sin sección de operaciones de directivos); 3) búsqueda de comunicaciones del art. 19 MAR en EQS: sin resultados en la búsqueda', decision: 'Omitido' },
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) Coherent Market Insights (no publica cuotas gratis); 2) Meticulous Research (lista empresas sin cuotas); 3) informe anual de GEA (no da cuota)', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'margen EBIT de los competidores', tipo: 'Complemento', intentos: '1) Tetra Pak y SPX Flow no cotizan; 2) JBT Marel y Krones sin datos homogéneos a esta fecha; 3) ficha sectorial del repositorio (márgenes EBITDA, no EBIT)', decision: 'Omitido' },
  ],
  per_excluidos: 'Historia adelantada (cierre de cada año ÷ BPA real del año siguiente): 2020 17,2x (29,28 ÷ 1,70); 2021 21,1x (48,09 ÷ 2,28); 2022 16,8x (38,20 ÷ 2,28); 2023 16,4x (37,69 ÷ 2,30); 2024 18,8x (47,82 ÷ 2,54); 2025 19,1x (57,80 ÷ nuestro BPA 2026e de 3,02). Fuera 2017-2019: sin BPA de 2018-2020 leído en fuente primaria y con la reestructuración y las pérdidas de 2019 (EBIT de −109 M). Mediana de 5 años (2021-2025) 18,8x; mínimo 16,4x; media de 2020-2025 18,2x.',
  casos_12m: {
    Bajista: 'Pedidos de grandes proyectos de lácteos y nueva alimentación a la baja dos años (como en 2023), ventas −3 % en 2027 y margen EBITDA del 14,9 %: BPA 2028e de 2,89 EUR.',
    Base: 'Guía de 2026 cumplida (orgánico 6-8 %, margen 17,0-17,4 % antes de reestructuración), ventas +6 % en 2027 y +5,5 % en 2028 con margen publicado del 17,2 % y la recompra de 500 M: BPA 2028e de 3,76 EUR.',
    Alcista: 'Ciclo de lácteos y farmacia sigue fuerte y el margen llega antes al 18 % publicado: BPA 2028e de 4,08 EUR.',
  },
  diferencia_consenso: 'Nuestro BPA de 2026 (3,02) queda un 10,7 % por debajo del consenso (3,38) y el de 2027 (3,41) un 9,3 % (3,76). La diferencia es de base, no de negocio: el consenso usa el BPA «antes de reestructuración» y nosotros el publicado, que resta 45-60 M al año (≈0,20-0,25 EUR por acción); el resto es un impuesto del 28 % frente al 26-27 % que suelen suponer los analistas. En ventas coincidimos (5.770 M frente a 5.870 M en 2026). Nuestro precio base (73,32) queda un 3,5 % por encima del objetivo medio de los analistas (70,83), dentro de su rango (53-79).',
  objetivo_comentario: 'El objetivo a 12 meses (68,94 EUR ponderado; 73,32 en el base) queda prácticamente en el valor intrínseco (69,66): no hay distancia que cerrar. La regla baja el PER del 20,3x actual al 19,5x porque GEA cotiza por encima de su mediana adelantada de cinco años (18,8x), y el bajista (15,6x sobre un BPA de 2,89) pesa: la empresa es cíclica en los grandes proyectos. Para que la rentabilidad pasase del 15 % haría falta un precio por debajo de 61,08 EUR o un BPA de 2028 un 10 % más alto que el nuestro.',
  valoracion_comentario: 'Pesamos el DCF (40 %) y los escenarios (40 %), porque GEA tiene una historia estable de servicio y márgenes que permite proyectar; los comparables (20 %) dan la referencia de mercado, aunque su PER de los próximos 12 meses se aplica al BPA ajustado del consenso (3,68) y por eso sale alto (75,62 EUR). Las transacciones (81,58 EUR de mediana, con prima de control) quedan a 0 %: GEA no tiene accionista de control ni comprador natural con 11.000 M de capitalización. El valor intrínseco ponderado es de 69,66 EUR, un 0,9 % por encima del precio. Con la prima implícita del mercado (4,2 %) el DCF sube a 80,53 EUR y el objetivo a 78,14: la diferencia entre las dos reglas es de tasa de descuento, no de cifras.',
  suma_partes_comentario: 'No aplica: las cuatro divisiones comparten fábricas, compras, red de servicio y clientes (lácteos y alimentación), y la empresa solo publica dos años de la estructura nueva. Pure Flow Processing (margen del 26,7 %) valdría por sí sola a múltiplos de Alfa Laval, pero no hay base para separar costes centrales (91 M en 2025).',
  dcf_justificacion: {
    crecimiento: 'Ventas +5,0 % en 2026 (fijo: guía orgánica del 6-8 % menos ≈2 puntos de divisa, como en el 1S26: +5,7 % publicado y +8,2 % orgánico) [A5, A6]; +6,0 % en 2027 con la cartera récord de 3.540 M (+13,1 %) [A6], y bajando al 3,0 % en 2033. La media (4,6 %) queda en el objetivo de Mission 30 (más del 5 % orgánico) menos divisas y encima del 4,0 % de 2021-2025 [A1].',
    margenes: 'Margen EBITDA publicado del 16,4 % en 2026 (guía de 17,0-17,4 % antes de reestructuración menos ≈0,8 puntos de reestructuración) y 17,5 % desde 2030, el equivalente a un 18,3 % antes de reestructuración: dentro del objetivo de Mission 30 (17-19 %) [A1]. Sube 1,9 puntos sobre 2025 (15,6 %), menos que los 3,5 puntos que ganó de 2021 a 2025 con más servicio.',
    inversion: 'Capex del 4,6-5,0 % de las ventas al principio (incluidas las altas de derechos de uso, ≈1,2 % de las ventas) y 4,4 % al final, frente a una amortización del 4,0 %; el capex en inmovilizado bajó al 2,7 % en el 1S26 tras el programa de fábricas de 2022-2025 [A5]. Circulante del 3,5 % de las ventas (3,2 % en 2025 con los anticipos de clientes) [A2].',
    wacc: 'Tasa libre: Bund a 10 años del 3,45 % del 15-oct-2026 [D4]. Beta de 0,95, entre la mensual de 5 años frente al DAX (0,85) [D1] y la de maquinaria (≈1,0), porque los grandes proyectos son cíclicos. Prima de mercado del 5,5 %, sin prima adicional (Baa1, 20 % de ventas en Asia-Pacífico y 7 % en Latinoamérica). Coste de la deuda del 3,5 % y peso del 3 % (casi sin deuda). WACC: 8,49 %.',
    terminal: 'Crecimiento terminal del 2,5 % (inflación del euro más ≈0,5 puntos reales, por debajo de la tasa libre menos medio punto) y múltiplo de salida de 13 veces el EBITDA, por debajo de la mediana de los comparables (15,9x) y cerca del 12,9x actual de GEA; método «media» de los dos.',
  },
  puente_comentarios: {
    '2026e': 'Volumen del 4,5 % (pedidos +8,3 % en el 1S26 y cartera +13,1 %) y precio del 2,5 % (repercusión de aranceles y acero); divisas −2 puntos (dólar y monedas emergentes, como en el 1S26) [A5, A6].',
    '2027e': 'Volumen del 3,5 % con la cartera de grandes proyectos y el servicio (objetivo de 2.900 M en 2030) y precio del 2 % [A1].',
    '2028e': 'Volumen del 3,5 % (mercado al 4,5 %) y precio del 2 % [B1].',
    '2029e': 'Volumen del 3 % y precio del 2 %.',
    '2030e': 'Volumen del 2,5 % y precio del 2 %: llega a Mission 30 sin compras.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Las tres pruebas pasan. La proyección reinvierte poco (9 % del NOPAT en neto) porque el circulante lo financian los anticipos de clientes (850 M) y el capex ya hizo la ampliación de fábricas; con la reinversión bruta el crecimiento que financia el ROIC actual es del 10,6 %, más del doble del 4,6 % proyectado, y supone un rendimiento del capital nuevo del 12,3 % frente al 23,1 % histórico. La cuota implícita pasa del 10,6 % al 11,0 % de un mercado que crece un 4,5 % [B1]. El poder de precios está demostrado: el margen subió 3,5 puntos de 2021 a 2025 con la inflación del acero y la energía, y el servicio llegó al 40 % de las ventas [A1].',
  dcf_lectura: 'El DCF da 69,62 EUR por acción, un 0,8 % por encima del precio, con el 72 % del valor en el terminal. El DCF inverso dice que el precio de 69,05 EUR descuenta un crecimiento de las ventas del 4,4 % anual de 2027 a 2033 (nuestro base: 4,5 %) o un margen EBITDA del 17,4 % (base: 17,5 %): el mercado ya paga que GEA cumpla Mission 30, ni más ni menos. Dicho de otro modo, el precio implica una rentabilidad anual del 8,6 %, casi igual a nuestro WACC (8,49 %). Con la prima de riesgo que hoy pide el mercado (4,2 %), el DCF sube a 80,53 EUR: quien acepte el coste de capital del mercado verá un 13 % de potencial, y quien pida el histórico, ninguno. No discrepamos del mercado en las cifras; la decisión depende de la tasa, y por eso la convicción es baja.',
  narrativas: {
    Bajista: 'Los clientes de lácteos y nueva alimentación aplazan proyectos (como en 2023, cuando los pedidos cayeron un 3,7 %), las divisas restan y el margen vuelve al 15 %: ventas −3 % en 2027.',
    Base: 'GEA cumple la guía de 2026 y Mission 30: ventas +4,6 % al año y margen publicado del 17,5 % desde 2030.',
    Alcista: 'La demanda de lácteos, farmacia y bombas de calor industriales se mantiene y el margen llega antes al objetivo alto de Mission 30.',
  },
  escenarios_comentario: 'Bajista 47,79 EUR (−30,8 %), base 69,62 (+0,8 %) y alcista 79,80 (+15,6 %); ponderado 66,71 en el DCF. La asimetría es negativa (0,51x): se pierde el doble de lo que se gana. A 12 meses, con la regla de múltiplos, el bajista da 45,08 EUR (−32,8 %) y el alcista 84,05 (+23,6 %).',
  catalizadores: {
    items: [
      { fecha: '2026-11-09', evento: 'Resultados del 3T26', efecto: 'Confirmación de pedidos récord y margen ≥ 17 %; la llamada previa ya adelantó grandes pedidos [B6].', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-08 a 2027-12', evento: 'Recompra de hasta 500 M EUR (≈4,5 % del capital)', efecto: 'Sube el BPA ≈2 % al año [P3].', probabilidad: 'Alta', sentido: '+' },
      { fecha: '2027-03', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Primer año completo con cuatro divisiones; margen objetivo de 2027.', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-04', evento: 'Junta general: dividendo (1,30 EUR por 2025)', efecto: 'Dividendo creciente.', probabilidad: 'Alta', sentido: '+' },
      { fecha: '2027', evento: 'Posible nueva venta del fondo soberano de Kuwait (≈7,5 %)', efecto: 'Presión técnica sobre el precio, como el 2-sep-2026 [C4].', probabilidad: 'Media', sentido: '−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Ciclo de grandes proyectos (lácteos, nueva alimentación, cerveza)', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−31 % (escenario bajista)', mitigante: 'Servicio del 40 % de las ventas y cartera de 3.540 M [A6].', senal: 'Pedidos de más de 15 M por debajo de 50 M dos trimestres seguidos.' },
      { riesgo: 'Margen: Mission 30 ya en el precio', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 % por cada punto de margen terminal menos (estimación con la sensibilidad del DCF)', mitigante: 'Guía subida dos veces en 2026 [A6].', senal: 'Margen antes de reestructuración < 17 % en 2026.' },
      { riesgo: 'Integración de la reorganización (disolución de HRT y fin del COO)', tipo: 'Ejecución', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Tres de cuatro divisiones con historia propia; el 1S26 ya creció [A1].', senal: 'Margen de Nutrition Plant Engineering < 10 %.' },
      { riesgo: 'Divisas y aranceles de EE. UU.', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−3 %', mitigante: 'Producción local en EE. UU. y repercusión de precios [A1].', senal: 'Diferencia entre crecimiento orgánico y publicado > 3 puntos.' },
      { riesgo: 'Ventas del accionista de referencia (fondo soberano de Kuwait)', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−3 % puntual', mitigante: 'Recompra de 500 M absorbe papel [B3].', senal: 'Comunicación de derechos de voto por debajo del 7,5 %.' },
      { riesgo: 'Granjas lecheras (Farm Technologies) y precio de la leche', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−3 %', mitigante: '14 % de las ventas; servicio del 51 % [A7].', senal: 'Pedidos de Farm Technologies con caída orgánica > 10 %.' },
    ],
    premortem: 'Octubre de 2029: la acción ha perdido un 40 %, de 69 a 41 EUR. En 2027 los grandes clientes de lácteos y nueva alimentación frenaron proyectos por la caída del precio de la leche y la subida de tipos; los pedidos de más de 15 M, que habían pasado de 437 M en 2024 a 561 M en 2025, volvieron a los 300 M. La división de plantas (Nutrition Plant Engineering, un tercio de las ventas con margen del 11 %) perdió apalancamiento y el margen del grupo volvió al 15 %. A la vez el mercado dejó de pagar 20 veces el beneficio por una empresa que ya no subía el margen, y el PER volvió al 16x del mínimo de 2023. El indicador que lo habría anticipado era la relación pedidos/ventas de Nutrition Plant Engineering por debajo de 1 durante dos trimestres y la caída de los pedidos de más de 15 M.',
    ia: { exposicion: 'Baja', sentido: 'Oportunidad', efecto_valor: '+3 %', comentario: 'GEA vende máquinas físicas (separadores, compresores, liofilizadores, plantas) que la IA no sustituye; el 40 % de servicio depende de técnicos y recambios. La IA entra como oportunidad: control autónomo de procesos, mantenimiento predictivo sobre las máquinas conectadas a GEA Cloud (objetivo del 80 % en 2030) y visión artificial en granjas (compra de CattleEye en 2024) [A1]. Riesgo indirecto: los centros de datos de IA compiten por los compresores y el frío industrial, lo que puede ser demanda adicional para la antigua HRT. Señal: peso de los ingresos digitales y de servicio por encima del 40 %. **Riesgo de IA para el negocio: bajo.**' },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Frío industrial', pregunta: '¿Qué ventas y margen tuvo en 2026 la antigua HRT dentro de Pure Flow y de Nutrition Plant Engineering?', por_que: 'La división se disolvió y ya no se puede seguir; es el negocio ligado a bombas de calor y refrigerantes naturales.' },
      { tema: 'Margen', pregunta: '¿Qué margen de Nutrition Plant Engineering es sostenible a lo largo del ciclo?', por_que: 'Es un tercio de las ventas con margen del 11,4 % y decide si se llega al 17-19 %.' },
      { tema: 'Reestructuración', pregunta: '¿Cuándo dejarán de existir los 45-60 M anuales de reestructuración?', por_que: 'Explica el 10 % de diferencia entre nuestro BPA y el del consenso.' },
      { tema: 'Grandes proyectos', pregunta: '¿Qué parte de la cartera de 3.540 M son proyectos de más de 15 M y con qué margen?', por_que: 'Es la parte cíclica de la tesis.' },
      { tema: 'Capital', pregunta: '¿Hay compras de tamaño en Mission 30 o todo irá a recompras?', por_que: 'El ROIC del 21 % se diluiría con compras caras (JBT pagó 20x por Marel).' },
      { tema: 'Accionariado', pregunta: '¿Tiene el fondo soberano de Kuwait un periodo de bloqueo tras la colocación de septiembre?', por_que: 'Un 7,5 % pendiente puede pesar en el precio.' },
    ],
    confianza: 'Media',
  },
  secciones: {
    negocio: {
      descripcion: 'GEA diseña y fabrica máquinas y plantas para producir alimentos, bebidas y medicamentos: separadores centrífugos y decantadores, homogeneizadores, bombas y válvulas higiénicas, compresores y plantas de frío industrial con amoníaco y CO2, bombas de calor industriales, secaderos, liofilizadores, líneas de procesado de carne y panadería, y robots de ordeño [A1]. Desde 2026 se organiza en cuatro divisiones: Pure Flow Processing (componentes, 35 % de las ventas de 2025), Nutrition Plant Engineering (plantas llave en mano, 35 %), Pharma & Food Applications (19 %) y Farm Technologies (14 %) [A7]. Los clientes son lácteas, alimentarias, cerveceras, farmacéuticas y granjas; GEA tiene 18.628 empleados [A1]. La antigua división de frío y calor (HRT: 624,6 M de ventas en 2025) se repartió: los compresores pasaron a Pure Flow y las plantas de frío y bombas de calor a Nutrition Plant Engineering [A1].',
      como_gana_dinero: 'Gana dinero vendiendo la máquina y, sobre todo, su servicio: el 40 % de las ventas (2.197 M en 2025) son recambios, mantenimiento y modernizaciones sobre una base instalada de décadas, con margen superior al de los equipos [A7]. Los componentes estándar (separadores, válvulas, bombas, compresores) dejan márgenes EBITDA del 27 %; las plantas llave en mano, del 11 % pero con anticipos de clientes que financian el circulante [A7]. El margen depende de precio (repercutido en 2022-2023), mezcla de servicio y del volumen de las fábricas; el cuarto trimestre es el más fuerte (28 % de las ventas en 2025) [A7].',
      clientes: 'Sin concentración relevante: miles de clientes industriales y granjas; ningún cliente supera el 10 % de las ventas (no lo informa como riesgo) [A1]. Los proyectos de más de 15 M sumaron 561 M de pedidos en 2025 (9 %) [A7]. El poder de precios se vio en 2022-2023: con el acero y la energía al alza, el margen EBITDA antes de reestructuración subió del 13,3 % (2021) al 14,4 % (2023) y al 16,5 % (2025) [A1, A8]. El servicio repite y es cautivo de la base instalada propia.',
      confianza: 'Alta',
    },
    sector: {
      definicion: 'Equipo de procesado para la industria alimentaria, de bebidas y farmacéutica, a escala mundial: separación, tratamiento térmico, frío, secado, envasado y plantas completas, más su servicio. Usamos la cifra de Coherent Market Insights (57.860 M USD en 2025, +4,5 % anual hasta 2032) porque su perímetro (equipos de procesado) es el más cercano al de GEA; Meticulous Research da un mercado mayor (103.820 M USD en 2031, +5,6 %) que incluye envasado y más gama baja [B1, B2]. El frío industrial y las bombas de calor de proceso son submercados que crecen más (13 % anual para bombas de calor industriales según el escenario de GEA) [B3].',
      regulacion: 'Reglamento europeo de gases fluorados (2024): restringe los refrigerantes sintéticos y favorece el amoníaco y el CO2, donde GEA es fuerte [B3]. Directiva de eficiencia energética y sistema europeo de comercio de emisiones: empujan a electrificar el calor de proceso con bombas de calor. Normas higiénicas (EHEDG, 3-A) y farmacéuticas (GMP) que encarecen la entrada. Aranceles de EE. UU. desde 2025, que GEA repercute.',
      tendencias: 'Electrificación del calor de proceso (bombas de calor de alta temperatura), refrigerantes naturales, proteínas alternativas (nueva alimentación: 66,6 M de ventas en 2025) y digitalización de la base instalada (GEA Cloud, mantenimiento predictivo) [B3]. GEA gana con todas; el riesgo es la competencia china en gama media de plantas y separadores.',
    },
    competencia: {
      foso: {
        veredicto: 'Estrecho', tendencia: 'Estable',
        fuentes: [
          { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica a maquinaria industrial.' },
          { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Plantas homologadas (higiene, GMP) y base instalada con servicio del 40 % de las ventas [A7].' },
          { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Marca Westfalia en separadores y ordeño; referencias de décadas en lácteos.' },
          { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Escala de compras, pero margen EBITDA (15,6 %) por debajo de Alfa Laval (20,7 %) [D7].' },
          { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Separadores y liofilizadores: pocos fabricantes mundiales; ROCE del 36 % [A1].' },
        ],
      },
      amenazas: 'Fabricantes chinos en plantas de gama media y separadores (probabilidad media a cinco años), integración vertical de Tetra Pak en lácteos y la consolidación de JBT Marel en procesado de proteína. El servicio sobre la base instalada protege la mitad del beneficio.',
    },
    calidad: {
      comentario: 'Cuentas NIIF-UE auditadas por PwC desde 2024 sin salvedades [A1]. El Altman Z (3,29) está en zona segura, el Piotroski F (8 de 9) es alto y el Beneish M (−2,77) no apunta a manipulación. Partidas a vigilar: la reestructuración se repite todos los años (48-61 M) y la empresa la excluye de la guía; el impuesto de 2025 (31 %) subió por diferidos; factoring sin recurso de 58 M y un programa voluntario de pago a proveedores mejoran el circulante [A1]. No capitaliza I+D de forma relevante. El resultado de operaciones interrumpidas (−13 a +26 M) viene de negocios vendidos hace años.',
    },
    rentabilidad: {
      comentario: 'GEA crea valor: el ROIC con el fondo de comercio fue del 20,9 % en 2025 frente a un WACC del 8,49 %, y sin el fondo de comercio del 73,8 %, porque el circulante es casi cero (los anticipos de clientes lo financian). El ROIC se ha mantenido entre el 20 % y el 22 % desde 2021 y el incremental histórico es del 23,1 %. La empresa publica un ROCE del 36,2 % (capital empleado medio sin fondo de comercio de las compras antiguas) [A1]. Lo mueve el margen: la rotación del capital es estable. Alfa Laval tiene un ROIC de ≈14 % [D7].',
      confianza: 'Alta',
    },
    capital: {
      comentario: 'Buen asignador desde 2021: devolvió 1.430 M en dividendos y recompras (17,69 M de acciones, el 9,8 % del capital, a una media de 39,60 EUR, por debajo del precio de hoy) [C3], subió el dividendo de 0,90 a 1,30 EUR y no hizo compras caras. El ROIC incremental (23,1 %) confirma que el capex de fábricas de 2022-2025 rindió. La recompra nueva de 500 M a 68 EUR es menos atractiva: compra a un PER de 20x.',
    },
    directivos: {
      comentario: 'Equipo creíble: cumplió la guía de 2024 y 2025 subiéndola durante el año, y Mission 26 dos años antes [C1, C5]. El consejero delegado está desde 2018 y prorrogado hasta 2028; el director financiero es nuevo (nov-2025) y la reorganización de 2026 elimina el puesto de director de operaciones. Sin plan de sucesión público.',
    },
    gobierno: {
      control_y_defensas: 'Sin accionista de control: el fondo soberano de Kuwait tenía un 10,5 % y bajó a ≈7,5 % tras la colocación del 2-sep-2026 [C1, C4]. Una acción, un voto. Consejo de supervisión de doce miembros con cogestión (seis de los trabajadores), presidido por un independiente; sin blindajes estatutarios ni operaciones vinculadas relevantes [C1].',
    },
    consenso: {
      guidance: 'Guía de 2026 (subida el 21-jul-2026 y confirmada en la llamada previa del 5-oct): crecimiento orgánico del 6-8 %, margen EBITDA antes de reestructuración del 17,0-17,4 % y ROCE del 36-40 % [A6, B6]. Mission 30 (oct-2024): orgánico de más del 5 % anual, margen del 17-19 % y ROCE de más del 45 % en 2030 [A1].',
      revisiones: 'Tras el 2T26 subieron los objetivos: Deutsche Bank a 71 EUR (Comprar), RBC 70, y en octubre Oddo BHF a 77, Barclays a 79 y LBBW a 76 [P2, B6]. Morgan Stanley mejoró a «equal-weight» en junio [P1]. El objetivo medio pasó de 66,88 EUR (17 analistas, julio) a 70,83 (18, octubre) [D3, D2]. El BPA de 2026 del consenso (3,38) es «ajustado».',
    },
    bolsa: {
      comentario: 'GEA ha ganado un 30,7 % anual en tres años frente al 18,1 % del DAX, por la mejora del margen del 14,4 % al 16,5 % y la entrada en el DAX. En 2026 sube un 22,1 % frente al 3,0 % del índice: la subida de la guía en julio y la llamada previa del 3T26 la llevaron a máximos históricos [P2, B6].',
      contexto: {
        movimiento: { fecha: '2026-10-15', var_1m_pct: 6.9, var_3m_pct: 16.1, var_6m_pct: 12.0, var_12m_pct: 10.4, dist_max_52s_pct: -0.1, dist_min_52s_pct: 28.6, dist_max_historico_pct: -0.1, tendencia: 'alcista', volatilidad_60d_pct: 17, avisos: [] },
        movimientos_fuertes: [
          { periodo: 'abr-may-2026', var_pct: -12.7, causa: 'Resultados del 1T26 (11-may): ventas +1,2 % con Nutrition Plant Engineering −7,8 % y guía sin cambios; −4,9 % el 11-may y −3,6 % el 13-may [A7, A12].', veredicto: 'no cambia', condicion: null },
          { periodo: 'jun-jul-2026', var_pct: 17.7, causa: 'Rebote desde el mínimo de 53,45 EUR del 3-jun con la mejora de Morgan Stanley (23-jun) y el adelanto de la subida de la guía (21-jul) [P1, P2].', veredicto: 'no cambia', condicion: null },
          { periodo: '2025-12-08', var_pct: -5.0, causa: 'Caída de un día sin noticia propia identificada (mercado y sector).', veredicto: 'no cambia', condicion: null },
          { periodo: '2026-09-02', var_pct: -3.5, causa: 'Colocación acelerada de ≈5 M de acciones (3 %) del fondo soberano de Kuwait a 64,85-65,50 EUR [C4].', veredicto: 'no cambia', condicion: null },
        ],
        noticias: [
          { fecha: '2026-07-21', tipo: 'resultados', hecho: 'Subida de la guía de 2026 (orgánico 6-8 %, margen 17,0-17,4 %) [A6].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-08-05', tipo: 'ampliación o convertible', hecho: 'Recompra de hasta 500 M EUR hasta finales de 2027 con amortización (no es ampliación) [P3].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-09-02', tipo: 'accionista de referencia', hecho: 'El fondo soberano de Kuwait colocó ≈5 M de acciones y queda en ≈7,5 %; sin bloqueo conocido [C4].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-10-05', tipo: 'resultados', hecho: 'Llamada previa al cierre del 3T26: guía confirmada y grandes pedidos por un importe de tres cifras bajas en millones [B6].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-10', tipo: 'recomendación', hecho: 'Subidas de objetivo: Oddo BHF a 77, Barclays a 79 y LBBW a 76 EUR [B6].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-11-09', tipo: 'resultados', hecho: 'Resultados del 3T26 [D9].', veredicto: 'no cambia', condicion: null },
        ],
        proximos_resultados: '2026-11-09',
        veredicto: 'no cambia',
        condicion: null,
        comentario: 'La acción está en máximos históricos (−0,1 % del máximo de 52 semanas) tras subir un 16,1 % en tres meses, por la subida de la guía, la recompra y la llamada previa del 3T26: causas de negocio que ya recoge el informe. La colocación del fondo de Kuwait se hizo el 2-sep y el precio ya la superó; queda un 7,5 % en sus manos que podría volver a venderse, pero no hay un hecho anunciado con fecha. No hay ampliaciones, litigios ni ofertas pendientes. Veredicto: no cambia (la señal la decide la rentabilidad, que hoy es de Mantener).',
      },
    },
    multiplos_historicos: {
      comentario: 'GEA cotiza con prima frente a su historia: 12,9 veces el EBITDA de los últimos 12 meses (media de cinco años: 9,9x) y 25,9 veces el beneficio (media: 20,8x), en el percentil 80. La prima la explica el cambio de perfil (margen +3,5 puntos y ROCE del 36 %) y la entrada en el DAX; el PER adelantado (20,3x sobre nuestro BPA de 2027) queda por encima de la mediana de cinco años (18,8x).',
    },
    comparables: {
      comentario: 'GEA cotiza con descuento frente a los comparables: 12,9 veces el EBITDA frente a una mediana de 15,9x, y 18,8 veces el BPA ajustado del consenso frente a 20,6x. El descuento se explica por el margen (15,6 % publicado frente a una mediana del 21 %) y por la parte de plantas llave en mano, más cíclica y de menos margen. Su ROIC (20,9 %) está entre los más altos del grupo. Aplicaríamos el PER medio de los comparables solo a Pure Flow Processing; para el grupo, su propia historia (18,8x) es la referencia más prudente.',
    },
    transacciones: {
      comentario: 'Las operaciones del sector se pagaron a 13,6-21 veces el EBITDA (mediana 15,1x), por encima del 12,9x de GEA [B7, B4]. GEA podría ser objetivo por tamaño (11.000 M de capitalización) y sin accionista de control, pero no hay señales de interés; no damos peso a una opa.',
    },
    esg: {
      materialidad: 'Las soluciones sostenibles (bombas de calor, recuperación de energía, ahorro de agua) fueron el 45,7 % de las ventas en 2025 y GEA quiere subir ese peso en 2030; sus ingresos alineados con la taxonomía europea se apoyan sobre todo en bombas de calor [B3]. Cumplió un año antes los objetivos intermedios de emisiones de alcance 1 y 2 [A6] y fue la empresa más sostenible de Alemania en el ranking de TIME y Statista de 2026 [A6].',
    },
  },
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Baja', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis,
    tesis: 'GEA es uno de los grandes fabricantes mundiales de máquinas y plantas para lácteos, alimentación, bebidas y farmacia, con un 40 % de ventas de servicio, un ROIC del 20,9 % y un balance casi sin deuda [A1, A7]. Desde 2019 ha subido el margen EBITDA antes de reestructuración del 11 % al 16,5 % y cumple sus guías.\n\nEl precio (69,05 EUR) descuenta que cumpla Mission 30: el DCF inverso pide un 4,4 % de crecimiento anual y un margen del 17,4 %, lo mismo que nuestro base. A 20,3 veces nuestro BPA de 2027 cotiza por encima de su mediana de cinco años (18,8x).\n\nEl mercado acierta: la mejora ya está en el precio. Para invertir hay que creer que el margen superará el 18 % antes de 2030 o comprar en una corrección del ciclo de proyectos, por debajo de 61 EUR.',
    vision_diferencial: {
      mercado_descuenta: 'Que GEA cumple Mission 30: ventas +4-5 % anual y margen del 17-19 % antes de reestructuración en 2030, sin caída del ciclo de proyectos.',
      nuestra_vision: 'Coincidimos en las cifras; añadimos que la reestructuración recurrente (≈0,2 EUR por acción) y el ciclo de grandes proyectos hacen que el BPA publicado quede un 10 % por debajo del que mira el consenso.',
      por_que: 'No tenemos una visión distinta del mercado: es una conclusión válida. La diferencia está en la tasa de descuento (la regla relativa daría Comprar) y en cuánto pesa el bajista.',
    },
    a_favor: [
      '**Servicio**: el 40 % de las ventas (2.197 M en 2025) es recurrente y de más margen [A7].',
      '**Rentabilidad**: ROIC del 20,9 %, 12,4 puntos por encima del WACC; ROCE del 36,8 % [A6].',
      '**Guía al alza**: 2026 subida dos veces; pedidos +15,4 % orgánico en el 2T26 [A6].',
      '**Balance**: liquidez neta y Baa1; recompra de 500 M en curso [A5, P3].',
      '**Frío y calor**: bombas de calor industriales y refrigerantes naturales crecen por regulación [B3].',
    ],
    en_contra: [
      '**Precio**: PER de 20,3x sobre nuestro BPA de 2027, por encima de su mediana de 18,8x.',
      '**Sin margen de seguridad**: valor intrínseco de 69,66 EUR frente a 69,05 de precio.',
      '**Ciclo**: el bajista a 12 meses pierde un 32,8 %; los grandes proyectos oscilan un 30 %.',
      '**Reestructuración recurrente**: 45-60 M al año que el consenso no cuenta.',
      '**HRT disuelta**: el frío industrial ya no se puede seguir por separado [A1].',
    ],
    que_vigilar: 'La tesis depende de que el margen siga subiendo sin que caigan los grandes proyectos. La señal de que no se cumple: pedidos orgánicos negativos dos trimestres seguidos o un margen antes de reestructuración del 4T26 por debajo del 16,5 %.',
    cambiaria_recomendacion: [
      'Precio por debajo de 61,08 EUR con la guía intacta: pasaría a Comprar.',
      'Precio por encima de 78,05 EUR sin subir el BPA: pasaría a Vender.',
      'Guía de 2027 con margen ≥ 18 % antes de reestructuración: subiríamos el BPA de 2028 un 5 %.',
      'Pedidos de proyectos de más de 15 M por debajo de 50 M dos trimestres: bajaríamos al escenario bajista.',
    ],
    kpis_seguimiento: [
      { kpi: 'Pedidos orgánicos', nivel_actual: '+15,4 % (2T26)', umbral_alerta: '< 0 % dos trimestres', por_que: 'Adelantan las ventas un año.' },
      { kpi: 'Margen EBITDA antes de reestructuración', nivel_actual: '17,4 % (2T26)', umbral_alerta: '< 16,5 %', por_que: 'Mission 30 ya está en el precio.' },
      { kpi: 'Peso del servicio', nivel_actual: '39,6 % (2T26)', umbral_alerta: '< 38 %', por_que: 'Sostiene margen y ciclo.' },
      { kpi: 'Liquidez neta', nivel_actual: '70,9 M (jun-26)', umbral_alerta: 'deuda neta > 500 M', por_que: 'Recompra y dividendo dependen de ella.' },
    ],
  },
};
