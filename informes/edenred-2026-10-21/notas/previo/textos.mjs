// Textos del analista (Edenred, corte 2026-10-19). Cifras del motor tal cual (calc); hechos con cita de su nota.

export const limitaciones = 'Cotiza en Euronext París en EUR y publica en EUR: tipo 1. Cuentas 2020-2025 de los Documents d\'enregistrement universel 2021, 2023 y 2025, con el XBRL ESEF del grupo (LEI 9695006LOD5B2D7Y0N70) como partida y corregido donde no cuadraba (amortización de 2023, pasivo total de 2019-2020) [A1-A3]. La segmentación vigente (Benefits & Engagement, Mobility, Payment Solutions & New Markets) solo está reexpresada para 2024 y 2025 [A1]; la serie 2020-2025 por líneas antiguas se guarda aparte y no se mezcla. Edenred no separa los pagos de arrendamientos en el estado de flujos: se estiman iguales a la amortización de los derechos de uso. **Trato del float (decisión del análisis):** el circulante de 2024 y 2025 se presenta sin el float (cuentas ligadas al float y fondos a reembolsar fuera; URD 2025, pág. 159 [A1]); 2020-2023 no se puede reconstruir igual, así que los ratios de circulante de esos años no son comparables. En el puente, 2.739 M de la caja (float neto 4.357 M menos caja restringida 1.618 M a jun-26 [A4]) se tratan como dinero de clientes (otros ajustes), mientras el rendimiento del float («other revenue») se queda en el EBITDA, como lo publica la empresa y lo usa el consenso. Precio: cierre del 16-oct-2026 (la sesión del 19-oct seguía abierta al hacer el cálculo) [D1].';

export const controles_explicados = [
  { control: 'Tipo impositivo efectivo razonable (2023)', explicacion: 'El 42,3 % de 2023 se debe a la multa de 158 M de la Autorité de la concurrence, no deducible y registrada en otros ingresos y gastos [A2]. No se proyecta: el DCF usa el 33 %.' },
  { control: 'EBIT + resultado financiero = BAI', explicacion: 'Edenred deja «otros ingresos y gastos» (reestructuraciones, deterioros, costes de compras; 28-46 M al año y 195 M en 2023 por la multa) entre el EBIT y el BAI [A1-A3]. El BPA propio los resta (−37 M al año, media de 2024-2025).' },
  { control: 'Compra robusta (v3 y v2 dan Comprar)', explicacion: 'La v2 de control da Mantener (13,4 %) y la sostenibilidad es «En parte»: el informe no da Comprar (ver la justificación de la recomendación). Para mantener basta la vigente.' },
];

export const negocio_descripcion = null;

export const ajustes_financieros = 'Se usan las cifras publicadas. EBITDA y EBIT son los de Edenred, que incluyen el «other revenue» (rendimiento del float: 229 M en 2025, 113 M en el 1S26) [A1, A5]. Partidas no recurrentes bajo el EBIT en «otros ingresos y gastos»: 195 M en 2023 (multa francesa y costes), 28-46 M en los demás años, sobre todo reestructuraciones y costes de compras que se repiten; por eso el BPA propio los resta cada año. 2023 lleva además la entrada de Reward Gateway (consolidada desde el 16-may-2023) y 2024 las compras de IP (tarjetas de energía en Italia), RB y PagBem (Brasil) y Spirii [A1, A2].';

export const contexto_comentario = 'La acción casi dobla desde el mínimo de marzo (15,23 EUR) y está a un 2,5 % del máximo de 52 semanas, con tendencia alcista; la subida la explican hechos con fuente: 1S26 y guía mejores (23-jul), aproximación de fondos (18-jun), entrada del grupo Niel con un 8 % en opciones y una ley francesa que deja el tope de comisiones a un decreto posible desde 2028 [D3, D18, D15, B1]. No hay oferta, colocación ni ampliación pendiente. Los ingresos del 3T26 (21-oct) no retrasan nada: la regla 13 no aplaza por resultados cercanos. La ley no tiene fecha en el Senado y no fija tope; el decreto, si llega, sería desde 2028 y está en el bajista. Veredicto: no cambia.';

export const rentabilidad_comentario = 'El ROIC del motor (154,4 % en 2025) no sirve para comparar: el capital invertido es casi nulo (477 M) porque el circulante es muy negativo y el patrimonio contable es negativo (−922 M) por la escisión de Accor en 2010 [A1, A4]. La lectura útil es otra: el negocio crece sin capital (capex del 6-8 % de los ingresos, casi todo desarrollo de plataformas) y el FFO pasó de 475 M en 2020 a 899 M en 2025 [A1]. Sobre un capital operativo sin float (fondo de comercio 3.003 M, intangibles 1.358 M, inmovilizado y derechos de uso ≈ 276 M y circulante sin float de −933 M, ≈ 3.700 M), el NOPAT de 2025 (736 M) rinde en torno al 20 % (estimación propia), más de 11 puntos por encima del WACC del 8,26 %. Pluxee, el comparable más cercano, declara un ROIC del 13,4 % [D34]. Lo que se erosiona es el margen por la regulación, no la intensidad de capital.';

export const multiplos_comentario = 'Edenred cotiza con un descuento grande frente a su historia: PER de los últimos 12 meses de 14,6 veces frente a una media de 34,5 (percentil 17) y EV/EBITDA de 9,0 frente a 15,1 [D1]. El cambio es estructural, no de humor: entre 2024 y 2026 tres reguladores (Italia, Brasil y ahora Francia) han limitado comisiones o abierto la competencia, y los tipos que inflaron el «other revenue» ya bajan. La historia anterior a 2024 es de un negocio sin topes y con crecimiento de dos cifras; por eso la regla a 12 meses no supone volver a ella y el método lo controla con la v2.';

export const etapa2_justificacion = 'No se usa. El ROIC supera al WACC en más de 5 puntos, pero el exceso viene de comisiones que los reguladores están recortando y del rendimiento del float, que baja con los tipos. Sin visibilidad sobre el decreto francés ni sobre la interoperabilidad brasileña, alargar el crecimiento más allá de 2035 sería suponer lo que el mercado hoy no paga.';

export const dcf_justificacion = {
  crecimiento: 'Dos motores [P]: ingresos operativos y rendimiento del float. 2026e fijo con la guía (EBITDA 1.230-1.270 M, −7/−10 % comparable; other revenue ≈ 210 M) [A5]: ingresos de 2.983 M (+0,7 %), en línea con el consenso (2.962 M) [D4]. 2027e +5,5 % operativo: crecimiento intrínseco del 8,0 % del 1S26 [A5] menos el último efecto del tope italiano, la salida de Edenred Pay North America (≈ 1 punto) [A10] y la interoperabilidad brasileña desde noviembre [B11]. 2028e-2029e 6,5-6,0 %, por debajo del objetivo de la empresa (EBITDA +8/+12 %) y del crecimiento del mercado abordado (5-7 %) [B13]; luego converge al 3 %.',
  margenes: 'Margen EBITDA operativo del 37,5 % en 2026e (37,0 % en el 1S26) [A5], 39,3 % en 2027e y 40,3 % en 2028e, hasta el 41,0 % desde 2030e, que es el de 2025 antes de los topes (41,4 %) [A1]. El other revenue: float del 1,62 veces los ingresos operativos (el de 2025) a un rendimiento que baja del 4,3 % al 3,5 % con los tipos. EBITDA total de 1.354 M en 2027e y 1.463 M en 2028e, prácticamente el consenso (1.352 y 1.460 M) [D4].',
  inversion: 'Capex del 8,2 % de los ingresos bajando al 7,7 %: 6-8 % de desarrollo (guía) más el 1,5 % de arrendamientos (NIIF 16) [A1, A6]. Amortización del 9,0 % (incluye la del precio pagado por Reward Gateway) convergiendo al capex. Circulante sin float del −30 % de los ingresos (−31,5 % en 2025 y −33,1 % en 2024) [A1].',
  wacc: 'Tasa libre: Bund a 10 años, 3,49 % el 19-oct-2026 (Bundesbank) [D10]. Beta 1,00: 1,02 mensual de 5 años frente al STOXX 600 (0,83 frente al CAC 40; semanales de 2 años 0,92-1,06) [D1]. Prima de mercado del 5,5 % más 0,8 puntos por riesgo regulatorio (tres topes en dos años). Coste de la deuda del 4,2 % (bono de 500 M a 2033) y peso del 22 %. WACC 8,26 %. La regla relativa usa la prima implícita de Damodaran (4,20 %) [D11].',
  terminal: 'Gordon al 2,5 %: inflación del euro cerca del 2 % y crecimiento real bajo, coherente con un Bund del 3,49 %. El múltiplo implícito se compara con los comparables (EV/EBITDA de 6-13 veces) [D34-D39].',
};

export const sostenibilidad = {
  puente_ingresos: [
    { periodo: '2027e', volumen_pct: 6.0, precio_pct: -0.6, otros_pct: -0.5, comentario: 'Volumen: crecimiento intrínseco del 8,0 % del 1S26 menos la interoperabilidad brasileña [A5, B11]. Precio: último efecto del tope italiano en jul-ago [B10]. Otros: salida de Edenred Pay North America y other revenue a la baja (estimación propia).' },
    { periodo: '2028e', volumen_pct: 6.0, precio_pct: 0.0, otros_pct: 0.2, comentario: 'Volumen del 6 % (5-7 % del mercado abordado [B13]); comisión media constante. Otros: other revenue estable.' },
    { periodo: '2029e', volumen_pct: 5.6, precio_pct: 0.0, otros_pct: 0.1, comentario: 'Desaceleración hacia el crecimiento del mercado.' },
  ],
  mercado_final: null,
  veredicto: 'En parte',
  justificacion: 'El volumen se sostiene: crecimiento intrínseco del 8,0 % en el 1S26, más de 700.000 usuarios nuevos en 2025 y penetración baja fuera de Francia [A1, A5], y no necesita capital (activos ligeros: la reinversión neta es negativa). Pero el precio lo fija cada vez más el regulador: Italia topó al 5 %, Brasil al 3,6 % con apertura e interoperabilidad, y Francia puede topar por decreto desde 2028 [B1, B11]. La proyección no supone subidas de comisión y el tope francés está en el bajista, por eso no se rebaja el base; pero sin poder de precios demostrado la calidad sostiene el volumen, no el margen: «En parte». La prueba de cuota se hace a mano: la cuota publicada es solo de Francia y no hay estadística mundial comparable, así que no se da un mercado final.',
};

export const dcf_lectura = 'El DCF da 47,59 EUR por acción, un 58,4 % sobre el precio, con el 61 % del valor en el terminal. El DCF inverso dice que el precio descuenta un crecimiento del 1,0 % anual en 2027e-2035e (base 4,6 %) o un margen del 34,4 % (base 44,2 %), y una rentabilidad implícita del 10,2 % frente a un WACC del 8,26 %. Es una lectura conservadora frente a la historia (15,1 % de crecimiento anual en 2020-2025) y frente a la guía de la propia empresa para 2027-2028: el mercado paga un negocio que deja de crecer por la regulación. El valor depende de dos decisiones que se explican aparte: el trato del float (2.739 M de caja que no se consideran libres; con el criterio de la empresa el valor subiría unos 12 EUR) y la beta.';

export const narrativas = {
  Bajista: 'Francia aprueba el decreto de tope en 2028 y la interoperabilidad brasileña quita cuota: crecimiento 2,5 puntos menor y margen 3 puntos más bajo, con un 2028 de −6 y −4 puntos. Es lo que ya pasó en Italia (ingresos −9 % en el 1S26) [B10].',
  Base: 'Se cumple lo que hoy dice la guía: 2026 en la parte alta del −7/−10 % comparable y vuelta al crecimiento del EBITDA del 8 % en 2027-2028, sin tope francés hasta, como pronto, 2028 [A5, B1].',
  Alcista: 'El Senado no endurece el texto, el decreto no llega o es suave y la plataforma de pymes y movilidad acelera: 1,5 puntos más de crecimiento y 1 de margen. Una oferta de un fondo sería un extra que no se valora [C9].',
};

export const escenarios_comentario = 'Con probabilidades 25/50/25, el bajista vale 24,15 EUR (−19,6 %) y el alcista 63,36 (+110,8 %): asimetría de 5,65 veces en el valor intrínseco. A 12 meses, la regla común da 18,43 / 37,05 / 53,53 EUR (−34,2 % / +27,7 % / +82,6 %). El bajista es verosímil, porque ya ha ocurrido en Italia y Brasil, y pierde bastante más a 12 meses que en el DCF porque la regla le aplica el PER mínimo de cinco años (9,7 veces). Respecto a la iteración anterior, el bajista baja del 30 % al 25 %: la ley adoptada el 12-oct no fija el tope del 2,5 % que se temía y lo deja a un decreto posible desde 2028 [B1, B5, B6].';

export const suma_partes_comentario = 'No aplica: los tres segmentos comparten clientes, plataforma y float, y no hay comparables puros cotizados de cada uno con cifras homogéneas.';

export const just12m = {
  Bajista: 'BPA 2028e de 1,90 EUR: ingresos 2,5 puntos por debajo del base cada año y −6 en 2028e, margen −3 y −4 puntos (decreto francés e interoperabilidad brasileña).',
  Base: 'BPA 2028e de 2,47 EUR: EBITDA de 1.463 M (consenso 1.460), amortización del 8,6 %, otros gastos de 37 M, resultado financiero de −210 M, impuestos del 33 %, minoritarios del 7,6 % y 232,7 M de acciones.',
  Alcista: 'BPA 2028e de 2,65 EUR: 1,5 puntos más de crecimiento y 1 más de margen cada año.',
};

export const per_excluidos = 'Historia ADELANTADA (precio de cierre de cada año ÷ BPA real del año siguiente; el de 2025, con nuestro BPA de 2026e): 2018 24,9x; 2019 47,5x; 2020 39,0x; 2021 27,8x; 2022 50,4x; 2023 26,9x; 2024 15,0x; 2025 9,7x. Excluidos por BPA atípico del año siguiente: 2019 (BPA de 2020 hundido por la Covid), 2020 (BPA de 2021 aún por debajo del de 2019) y 2022 (BPA de 2023 de 1,01 EUR por la multa francesa de 158 M). Mediana de los últimos cinco cierres limpios (2021, 2023, 2024, 2025): 21,0x; mínimo 9,7x; media larga (2018, 2021, 2023, 2024, 2025) 20,9x. Historia al cierre (v2, control): 2018 30,3x; 2019 35,7x; 2022 34,8x; 2024 15,8x; 2025 8,9x, sin 2020, 2021 y 2023 (mismos motivos).';

export const diferencia_consenso = 'Nuestro BPA base está muy cerca del consenso (2,21 frente a 2,15 en 2027e, +2,8 %; 2,47 frente a 2,42 en 2028e, +2,1 %), con un EBITDA prácticamente igual (1.463 frente a 1.460 M en 2028e) [D4]. La diferencia de precio (base 37,05 frente al objetivo medio de 31,21, +18,7 %) viene del múltiplo: la regla común sube el PER de hoy (13,6x) un 10 % hacia su historia, y los analistas mantienen el actual o lo bajan. La tendencia de los objetivos es al alza (UBS de 19 a 28,50 tras la ley) [D23].';

export const objetivo_comentario = 'El objetivo a 12 meses (36,52 EUR) queda por debajo del valor intrínseco (44,13 EUR): la distancia (17 %) es la de un mercado que paga la regulación como permanente. Para cerrarla hacen falta dos cosas con fecha: que 2027 confirme la vuelta al crecimiento del EBITDA (guía de marzo de 2027) y que el Senado no endurezca la ley. La cifra que decide para mantener la posición es la v2 de control (13,4 % ponderada, 16,2 % base), porque las variantes razonables se comparan y se comunica la peor.';

export const valoracion_comentario = 'Pesos: DCF 55, escenarios 35 y comparables 10; transacciones 0 (llevan prima de control y la aproximación de fondos de junio no ha dado oferta [C9]). El DCF es el método más fiable para un negocio que no necesita capital y cuyo valor depende del crecimiento y de la regulación, que se ven mejor en flujos que en múltiplos. Los comparables pesan poco porque no hay ninguno igual (Pluxee cotiza sobre una caja de clientes enorme y los pagadores de flota estadounidenses tienen otra regulación) y porque su PER es ajustado mientras el de Edenred es contable [D34-D39]. La dispersión es amplia: del bajista (24,15) a las transacciones (93,72 de mediana, con prima de control), con el DCF en 47,59 y el valor objetivo en 44,13 EUR.';

export const catalizadores = {
  items: [
    { fecha: '21-oct-2026', evento: 'Ingresos del 3T26', efecto: 'Primera lectura del 2S con los topes de Italia y Brasil completos y la confirmación de la guía 2026', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'nov-2026', evento: 'Interoperabilidad plena de los vales en Brasil (360 días desde el decreto 12.712)', efecto: 'Riesgo de pérdida de cuota y de float en Brasil (21 % de los ingresos)', probabilidad: 'Alta', sentido: '−' },
    { fecha: 'Sin fecha (2026-2027)', evento: 'Examen de la ley del título restaurante en el Senado y comisión mixta', efecto: 'Un tope legal o un decreto anticipado bajaría el valor; un texto igual al de la Asamblea lo deja para 2028', probabilidad: 'Media', sentido: '+/−' },
    { fecha: '4-ene a 31-may-2027', evento: 'Ventana de ejercicio de las opciones de Rock Investment (8 %)', efecto: 'Si pide entrega física, entra un accionista de referencia; si liquida en efectivo, nada', probabilidad: 'Media', sentido: '+' },
    { fecha: 'feb-mar-2027', evento: 'Resultados 2026 y guía 2027', efecto: 'Confirmación (o no) de EBITDA +8/+12 % comparable en 2027', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Antes del 30-sep-2027', evento: 'Resolución de la investigación de la AGCM italiana (A578)', efecto: 'Multa posible sin provisionar', probabilidad: 'Media', sentido: '−' },
    { fecha: 'Abierta', evento: 'Oferta de fondos (aproximación confirmada el 18-jun-2026)', efecto: 'Prima de control; sin novedad desde junio', probabilidad: 'Baja', sentido: '+' },
  ],
  confianza: 'Media',
};

export const riesgos = {
  items: [
    { riesgo: 'Tope de comisiones en Francia por decreto desde 2028 (o legal si el Senado endurece el texto)', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−20 % a −35 % (bajista del DCF −19,6 %; del 12 m −34,2 %)', mitigante: 'La ley no fija porcentaje y exige dictamen de la Autorité y seis meses de adaptación [B1]; Francia es el 13 % de los ingresos [A1]', senal: 'Enmiendas del Senado con tope; consulta de la Autorité' },
    { riesgo: 'Interoperabilidad y apertura en Brasil', tipo: 'Regulatorio y competencia', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−5 % a −10 %', mitigante: 'Edenred ya opera con los topes; 1S26 Brasil +3 % [A5]', senal: 'Ingresos de Brasil en el 3T y 4T26' },
    { riesgo: 'Bajada de tipos que reduce el other revenue', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−100 pb de rendimiento ≈ −50 M de EBITDA (estimación propia)', mitigante: 'Coberturas parciales y float que crece', senal: 'Other revenue semestral por debajo de 100 M' },
    { riesgo: 'Investigación de competencia en Italia (AGCM)', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−2 % a −4 %', mitigante: 'Multa máxima acotada; Edenred ya pagó 158 M en Francia en 2023 y siguió', senal: 'Comunicación de cargos' },
    { riesgo: 'Pérdida de cuota frente a nuevos emisores digitales (Swile, Up) y a los bancos en Francia', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Escala y red de 2 millones de comercios', senal: 'Crecimiento de B&E en Francia por debajo del mercado' },
    { riesgo: 'Gobierno: presidente y consejero delegado a la vez, con votos de remuneración de hasta el 34 % en contra', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: 'n.c.', mitigante: '8 de 9 independientes y consejero coordinador [C1]', senal: 'Voto en contra de la remuneración > 35 %' },
  ],
  premortem: 'Octubre de 2029: la acción ha perdido un 40 %. En 2027 el Senado añadió al texto un tope del 2,5 % para el título digital y el decreto se aprobó en 2028; la comisión media en Francia pasó del 4 % al 2,5 %. A la vez, la interoperabilidad brasileña abrió el mercado a los bancos, que ofrecieron tarjetas sin comisión al comercio, y la cuota de Ticket cayó cinco puntos. El BCE bajó tipos y el other revenue perdió 60 M. El EBITDA de 2028 quedó en 1.220 M, por debajo del de 2025, y el mercado pagó 8 veces el beneficio, como en el mínimo de 2025. El indicador que lo habría avisado: las enmiendas del Senado y el crecimiento de los ingresos de Brasil en el 4T26.',
  ia: { exposicion: 'Baja', sentido: 'Mixto', efecto_valor: '−3 % a +3 %', comentario: 'El negocio es una red regulada de emisión y aceptación de vales: la IA no sustituye el producto, cuyo valor viene de la ventaja fiscal y de la red de comercios. Puede bajar costes de atención, prevención del fraude y venta a pymes (Edenred ya la usa en la conciliación y en el servicio a comercios), y puede ayudar a competidores digitales a entrar más baratos. El riesgo indirecto es que plataformas de nómina y bancos con agentes de IA integren los beneficios sin intermediario. Señal: pérdida de clientes pymes frente a plataformas de nómina en Francia o Brasil.' },
  confianza: 'Media',
};

export const preguntas = {
  items: [
    { tema: 'Francia', pregunta: '¿Qué comisión media cobra hoy en el título restaurante digital en Francia y cuánto EBITDA perdería con un tope del 2,5 %?', por_que: 'Es el mayor riesgo del bajista y la empresa no lo ha cuantificado.' },
    { tema: 'Brasil', pregunta: '¿Cuánto float y cuánta cuota espera perder con la interoperabilidad de noviembre?', por_que: 'Brasil es el 21 % de los ingresos y su float rinde por encima de la media.' },
    { tema: 'Float', pregunta: '¿Qué parte de la caja libre de la deuda neta procede del float y qué rendimiento tiene cubierto para 2027?', por_que: 'Decide unos 12 EUR por acción de valor y el other revenue.' },
    { tema: 'Capital', pregunta: '¿Seguirá recomprando si sigue la aproximación de fondos?', por_que: 'Quedan 100 M del programa de 600 M.' },
    { tema: 'Italia', pregunta: '¿Qué remedios ha ofrecido a la AGCM?', por_que: 'Investigación abierta sin provisión.' },
    { tema: 'Guía 2027', pregunta: '¿Se mantiene el +8/+12 % de EBITDA en 2027 con Edenred Pay North America fuera del perímetro?', por_que: 'Nuestro base supone +8,3 %.' },
  ],
  confianza: 'Media',
};

export { resumen } from './resumen.mjs';

export const fuentes = [];

export const huecos = [
  { seccion: 'competencia', campo: 'cuota_pct', tipo: 'Núcleo', intentos: '1) URD 2025 (solo cuota relativa: 1,7 veces la del n.º 2 en beneficios); 2) CNTR e informe de la Asamblea (cuotas conjuntas de los cuatro emisores en Francia); 3) informes de mercado de beneficios a empleados (sin cifra mundial con el mismo perímetro)', decision: 'Omitido: la posición se describe con la cuota relativa' },
];
