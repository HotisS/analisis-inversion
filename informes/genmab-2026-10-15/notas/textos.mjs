// Textos del analista para Genmab (corte 2026-10-15). Cifras del motor tal cual; hechos con cita a las notas [A1]… y propias [P1]….
const fuentes = [
  { id: 1, titulo: 'Modelo propio: BPA 2027e-2030e por escenario (ventas × margen EBITDA − amortización − financiero − impuestos ÷ 61,9 M de acciones), notas/supuestos.mjs', editor: 'Análisis propio', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://github.com/HotisS/analisis-inversion' },
];

const limitaciones = 'Se analiza la acción de Copenhague (GMAB, DKK), que es la que compraría un inversor europeo; el ADS del Nasdaq (GMAB) equivale a 1/10 de acción. Las cuentas se publican en USD desde 2025 (con 2021-2024 reexpresados en las cifras clave), así que todo el informe va en USD y el precio se convierte a 6,6693 DKK por USD (BCE, 15-oct-2026) [D6]; el motor da los niveles también en DKK. 2021 y 2022 solo tienen cifras clave en USD (sin amortizaciones, circulante ni balance detallado). El precio es el cierre de Copenhague del 15-oct-2026 (2.529 DKK). El consenso de MarketScreener está en DKK y se ha convertido al mismo tipo. El BPA del objetivo a 12 meses es la media de 2028e-2030e porque 2028 es el último año antes de que caduque la patente de daratumumab en EE. UU.: aplicar el PER a un BPA de 2028 sin normalizar supondría que el mercado ignorará la caída de 2029.';

const controles_explicados = [
  { control: 'Fuentes sin citar', explicacion: 'Las fuentes de contexto (informes trimestrales y XBRL) se usan para las series y no siempre se citan en el texto.' },
  { control: 'Transacciones', explicacion: 'Las compras de biotecnológicas en oncología se pagan por la cartera; no hay múltiplos de EBITDA publicados (hueco registrado) y su peso es 0.' },
];

const secciones = {
  rentabilidad: {
    comentario: 'Genmab creó mucho valor mientras fue una empresa de regalías: ROIC del 106,7 % en 2021, 129,2 % en 2022 y 56,2 % en 2024, con capital invertido de solo 332-1.479 M USD, porque las regalías no necesitan activos. La compra de Merus lo cambió todo: el capital invertido salta a 5.943 M a final de 2025 y el ROIC baja al 14,3 % (15,2 % sin fondo de comercio), apenas 4,6 puntos por encima del WACC del 9,68 %. Con el año completo de Merus (capital de ≈9.000-10.000 M) el ROIC de 2026 rondará el 10 %, a la par del WACC: la compra solo crea valor si petosemtamab vende miles de millones. El ROIC incremental histórico (8,9 %) ya refleja que el capital de las compras rinde mucho menos que las regalías. Frente a los comparables de regalías, Halozyme tiene un ROIC del 32,1 % y Royalty Pharma del 5,4 % [D9, D8].',
    confianza: 'Media',
  },
  calidad: {
    comentario: 'Las cuentas son sencillas y limpias: los ingresos son regalías que informa el socio (J&J, Novartis) y ventas de producto, con auditoría de Deloitte sin salvedades desde 2024 tras el cambio desde PwC [A2]. No hay capitalización de I+D: los 1.606 M de 2025 van a gastos. Los pagos en acciones (128 M en 2025, 3,4 % de los ingresos) son moderados para una biotecnológica [A6]. Lo que más pesa es la compra de Merus: 9.123 M de intangibles sin fondo de comercio nuevo, que dependen del éxito clínico de petosemtamab; un fracaso de la fase 3 obligaría a un deterioro de varios miles de millones [A2]. El tipo impositivo de 2026 (3,6 % en el semestre) está rebajado por créditos de Merus y no se repetirá [A3]. Lectura de los indicadores: Altman Z de 3,14 (zona segura, aunque baja desde niveles muy altos por la deuda), Piotroski F de 4 (débil por la caída del ROA y la subida del apalancamiento en 2025, efecto de la compra y no del negocio) y Beneish M de −2,51 (sin señal de manipulación).',
    confianza: 'Alta',
  },
  capital: {
    comentario: 'La dirección ha asignado bien el capital de las regalías durante una década (recompras moderadas, sin dividendo, todo a I+D propia), pero 2024-2025 marcan un cambio de perfil: 9.000 M en dos compras, la mayor con 5.500 M de deuda [A2]. El ROIC incremental histórico del 8,9 % y el ROIC de 2025 del 14,3 % muestran que el capital nuevo rinde menos que el viejo. La compra de Merus tiene lógica (sustituir las regalías de DARZALEX antes de 2029) y Rina-S avanza bien, pero se pagó una prima por un activo aún en fase 3 [B11]. El veredicto queda abierto hasta las fases 3 de petosemtamab; la dilución es baja (acciones diluidas de 66,0 M en 2021 a 62,7 M en 2025 por recompras) [A2].',
    confianza: 'Media',
  },
  comparables: {
    comentario: 'Con un EV/EBITDA de 23,5 veces los últimos 12 meses y un PER de 23,5 veces los próximos 12, Genmab cotiza muy por encima de la mediana de sus comparables (PER de 12,2 veces), que van de 9,6 (BioMarin, Jazz) a 34,4 (Vertex) [D7, D8, D9]. La prima se explica por el crecimiento a corto plazo (ingresos +19 % en 2026) y por la opción de los lanzamientos de 2027, pero los dos comparables de regalías (Royalty Pharma 10,9 veces, Halozyme 12,2) muestran a cuánto cotizan unas regalías con fecha de caducidad. Por eso los comparables pesan solo un 10 %: valoran un BPA de 2027 que no se mantiene en 2029, y el valor implícito por PER de los próximos 12 meses (197,27 USD de mediana) queda muy por debajo del precio.',
    confianza: 'Media',
  },
  bolsa: {
    contexto: {
      movimiento: { fecha: '2026-10-15', var_1m_pct: 14.4, var_3m_pct: 36.9, var_6m_pct: 41.3, var_12m_pct: 22.5, dist_max_52s_pct: 0.0, dist_min_52s_pct: 65.9, dist_max_historico_pct: -23.2, tendencia: 'alcista', volatilidad_60d_pct: 31.0, avisos: ['P2 A −0 % del máximo de 52 semanas tras subir un 37 % en tres meses'] },
      movimientos_fuertes: [
        { periodo: 'jun-jul 2026', var_pct: 22.6, causa: 'Fase 3 EPCORE DLBCL-4 positiva (29-jun: HR 0,40 en supervivencia libre de progresión) y guía de 2026 subida el 6-ago [B9, A3, D10].', veredicto: 'no cambia', condicion: null },
        { periodo: 'oct-2026', var_pct: 14.4, causa: 'Fase 3 EPCORE DLBCL-2 positiva en primera línea (5-oct: HR 0,49) y datos de fase 2 de Rina-S en ovario (45,9 % de respuestas, 4-oct); el 8-oct, −5,3 % de recogida de beneficios [B8, E1, D10].', veredicto: 'no cambia', condicion: null },
        { periodo: 'ene-2026', var_pct: -6.5, causa: 'Día de −6,5 % (19-ene) tras la fase 3 DLBCL-1 de EPKINLY sin mejora de supervivencia global [B10].', veredicto: 'no cambia', condicion: null },
        { periodo: 'feb-2026', var_pct: -6.6, causa: 'Día de −6,6 % (18-feb) tras los resultados de 2025 (ingresos 50 M por debajo de lo esperado) y una guía de 2026 con el beneficio lastrado por la deuda de Merus [D14, A3].', veredicto: 'no cambia', condicion: null },
        { periodo: 'may-2026', var_pct: -6.7, causa: 'Día de −6,7 % (8-may) tras el 1T26: beneficio neto de 53 M y flujo operativo de 3 M por intereses y pagos de la integración [A4].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-11-05', tipo: 'resultados', hecho: 'Resultados de los nueve meses: primera prueba de la guía subida en agosto; las ventas de DARZALEX del 3T (4.239 M, 2.528 M en EE. UU.) ya se conocen [A7].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-05', tipo: 'resultados', hecho: 'EPCORE DLBCL-2 positiva: epcoritamab + R-CHOP reduce un 51 % el riesgo de progresión o muerte en primera línea [B8].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-07', tipo: 'directivos', hecho: 'La junta extraordinaria aprueba la remuneración del consejo para 2026, retirada en marzo por falta de apoyo [C5, C3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-28', tipo: 'accionista de referencia', hecho: 'Darwin Global Management supera el 5 % (5,11 %); Orbis oscila alrededor del 5 % desde marzo. No hay colocaciones anunciadas [C7, C6].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-23', tipo: 'demanda o regulador', hecho: 'Confirmación de que DLBCL-1 no alcanzó la supervivencia global, único objetivo principal en EE. UU.; Genmab y AbbVie discuten con los reguladores el futuro de esa indicación [E3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-06-16', tipo: 'ampliación o convertible', hecho: 'Ampliaciones pequeñas por ejercicio de warrants de empleados (decenas de miles de acciones); ninguna ampliación ni convertible [A3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-05-29', tipo: 'directivos', hecho: 'Única venta de un consejero en 12 meses: 526 acciones de un consejero elegido por los empleados (≈0,9 M DKK) [C8].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-11-05',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción sube un 36,9 % en tres meses y está en máximos de 52 semanas (aviso P2) por dos fases 3 positivas de EPKINLY y una guía subida, hechos que el informe ya recoge en la proyección. No hay ningún hecho pendiente ajeno al análisis que pueda mover el precio más de un 5 % (ni colocaciones, ni ampliaciones, ni ofertas); los resultados del 5-nov no aplazan nada (regla 11). Las caídas fuertes del año tienen causa conocida (DLBCL-1, resultados de 2025 y del 1T26). Veredicto: no cambia; la señal la decide la valoración.',
    },
  },
};

const dcf_justificacion = {
  crecimiento: 'El año 2026 queda fijo en el punto medio de la guía revisada (4.425 M USD, +19 %) [A3]. 2027 (+18,6 %) y 2028 (+17 %) siguen con DARZALEX a +12-15 % (ventas de J&J de 16.500-16.900 M en 2026 [A3]), Kesimpta, EPKINLY (+48 % en el semestre) y los lanzamientos de Rina-S y petosemtamab en 2027 [B11]; el consenso es algo más alto (≈5.222 M en 2027 y 6.528 M en 2028 [D2]). En 2029 caduca la patente de EE. UU. (≈58 % de las ventas de DARZALEX [A8]) y los ingresos caen un 13 %; en 2031 caduca Europa y Kesimpta en EE. UU. (−2 %) [B3]. Después, los productos propios crecen del 12 % al 4 % hasta 2035.',
  margenes: 'El margen EBITDA de 2026 (27,1 %) sale de la guía: beneficio operativo ajustado de 1.225 M menos 137 M de integración y amortización de compras [A3]. Sube al 35 % en 2028 porque las regalías crecen sin coste, cae al 24 % en 2029 al perder ≈1.900 M de regalías casi sin coste y se recupera hasta el 33 % en 2035, en línea con farmacéuticas que venden productos propios (Roche 29 %, Novartis 31 % de margen EBIT [B7]) y por debajo del 35-41 % de la historia de Genmab, porque EPKINLY comparte beneficio con AbbVie [A3].',
  inversion: 'El capex es mínimo (1,2-1,6 % de las ventas, como el 1,5 % de 2025 [A2]) y converge con la amortización. El circulante se mantiene en el 26 % de las ventas, el nivel de 2025 (cuentas a cobrar de regalías de 1.112 M frente a 3.720 M de ingresos). La inversión que de verdad sostiene el crecimiento es la I+D, que va a la cuenta y por tanto al margen.',
  wacc: 'Flujos en USD: tasa libre del Tesoro a 10 años, 5,21 % [D5]; beta 1,0 (1,01 frente al OMXC25 y 0,65 del ADS frente al S&P 500 [D1, D3]; tomamos 1 por la deuda nueva); prima de mercado 5,5 % y sin prima adicional, porque el riesgo de los ensayos está en los escenarios. Coste de la deuda 6,4 % antes de impuestos (préstamos al 5,5-6,7 % y bonos al 6,25-7,25 % [A2]) con un peso del 18 % a valor de mercado. WACC resultante: 9,68 %.',
  terminal: 'Gordon con un 2,5 % de crecimiento, coherente con la inflación del dólar y por debajo de la tasa libre menos medio punto. El último año explícito (2035) ya crece al 4 % con un margen del 33 %: el valor terminal pesa un 59 % del valor. El múltiplo de salida de referencia (11 veces el EBITDA) está en la parte baja de los comparables porque en 2035 Genmab será una farmacéutica de productos propios con patentes de 2038 en adelante [B3].',
};

const puente_comentarios = {
  '2026e': 'Volumen: DARZALEX (+21 % de ventas en el semestre), Kesimpta (+31 %) y EPKINLY (+48 %); precio: subidas moderadas de los socios; otros: hitos de los socios de Merus [A3].',
  '2027e': 'Volumen: DARZALEX y Kesimpta siguen ganando cuota y entran Rina-S y petosemtamab (lanzamientos previstos en 2027) [A3, B11].',
  '2028e': 'Volumen: primer año completo de los dos lanzamientos y EPKINLY en segunda línea de linfoma difuso (DLBCL-4) [B9].',
  '2029e': 'Volumen: caduca la patente de daratumumab en EE. UU. y se pierde ≈60 % de las regalías de DARZALEX, compensado en parte por los productos propios [B3, A8].',
  '2030e': 'Volumen: EPKINLY en primera línea (si se aprueba con DLBCL-2) y petosemtamab por encima de 1.000 M, el objetivo de la empresa para 2029 [B8, B11].',
};

const sostenibilidad_justificacion = 'En parte. Las pruebas del motor pasan (la proyección apenas necesita capital: reinversión del 5 % del NOPAT), pero en un negocio sin inversión neta la prueba de verdad es la cuota y el poder de precios, y aquí el crecimiento no lo sostiene la calidad demostrada sino el éxito de ensayos todavía abiertos. El foso histórico (regalías de DARZALEX y Kesimpta) tiene fecha de caducidad (2029-2031) [B3]; lo que lo sustituye (EPKINLY, Rina-S, petosemtamab) solo ha demostrado poder de precios en EPKINLY, que reparte el beneficio con AbbVie [A3]. Además, la mitad del crecimiento proyectado de 2027-2028 depende de lanzamientos aún no aprobados [B11]. Mantenemos el caso base, que ya cae un 13 % en 2029, y no un recorte mayor, porque las tres fases 3 de epcoritamab de 2026 (dos positivas) y las designaciones de terapia innovadora de Rina-S y petosemtamab hacen razonable el escenario central [B8, B9, B12].';

const dcf_lectura = 'El DCF da 262,23 USD por acción (1.748 DKK), un 30,8 % por debajo del precio, con el valor terminal pesando un 59 %. La síntesis ponderada (DCF 50 %, escenarios 40 %, comparables 10 %) queda en 255,04 USD (1.700,95 DKK). El DCF inverso es la pregunta central: para justificar 2.529 DKK, Genmab tendría que crecer un 12,7 % anual entre 2027 y 2035 con un margen implícito del 43,3 %, frente al 7,4 % y el 33 % de nuestro caso base. Es decir, el precio descuenta que los productos propios no solo sustituyen las regalías de DARZALEX, sino que en 2035 la empresa vende el doble que hoy con márgenes de empresa de regalías. Eso no tiene precedente en la propia Genmab (que nunca ha lanzado sola un producto) y supera a los mejores de su grupo. Con la prima de riesgo que hoy pide el mercado (4,2 %, WACC del 8,61 %) el valor sube a 309,72 USD, todavía un 18,3 % por debajo del precio. La rentabilidad anual implícita en el precio es del 7,9 %, por debajo de nuestro WACC (9,7 %) y del que pide el mercado (8,6 %): el precio es exigente.';

const narrativas = {
  Bajista: 'Una de las dos fases 3 de petosemtamab o la de Rina-S en ovario fracasa o llega tarde (como DLBCL-1 no logró supervivencia), y la caída de las regalías de 2029 no se compensa: ingresos 4 puntos por debajo cada año y margen 5 puntos menor, con deterioro de parte de los 9.123 M de intangibles de Merus.',
  Base: 'Los dos lanzamientos de 2027 salen en plazo y EPKINLY gana la primera línea de linfoma difuso; los ingresos caen un 13 % en 2029 y vuelven a crecer desde 2030 hasta ≈8.100 M en 2035 con un margen del 33 %.',
  Alcista: 'Petosemtamab supera los 1.000 M en 2029 y Rina-S se convierte en el estándar en ovario resistente a platino; DARZALEX crece más de lo previsto hasta 2028 y la caída de 2029 es menor: ingresos 3 puntos por encima cada año y margen 3 puntos mayor.',
};

const escenarios_comentario = 'La asimetría es mala: el alcista (365,46 USD) queda un 3,6 % por debajo del precio y el bajista (152,05 USD) un 59,9 %, con una asimetría de −0,06. Incluso si todo sale bien, el valor intrínseco no supera el precio actual: el mercado ya paga el escenario alcista. Con la prima del mercado el alcista llega a 448,55 USD, solo un 18 % por encima. No compensa comprar por valor intrínseco.';

const valoracion_comentario = 'Pesamos el DCF (50 %) y los escenarios (40 %) porque recogen año a año la caducidad de las regalías, que es lo que define a Genmab. Los comparables pesan un 10 %: valoran el beneficio de los próximos 12 meses, que en 2029 cae, y dan 197,27 USD de mediana por PER. Las transacciones no pesan (sin múltiplos publicados). La dispersión entre métodos es grande, de 152 USD (bajista) a 365 USD (alcista), y ninguno llega al precio de 379,20 USD; solo el objetivo a 12 meses por PER (448,86 USD) lo supera, porque aplica a nuestro BPA normalizado un PER parecido al actual. La distancia entre las dos cifras es la tesis: el mercado paga hoy el éxito de la cartera, y en 12 meses puede seguir pagándolo si las fases 3 salen bien, pero el valor que generan los flujos no llega.';

const just12 = {
  Bajista: 'BPA normalizado de 12,16 USD (2028e 17,56; 2029e 7,68; 2030e 11,25): ingresos 4 puntos menores cada año y margen 5 puntos menor, con más intereses por amortizar menos deuda [P1].',
  Base: 'BPA normalizado de 17,88 USD (2028e 23,14; 2029e 12,66; 2030e 17,83): ingresos de 6.140 M en 2028, −13 % en 2029 por la caducidad de EE. UU.; margen EBITDA 35 %/24 %/27 %, impuesto del 20 % y 61,9 M de acciones [P1].',
  Alcista: 'BPA normalizado de 22,26 USD (2028e 27,12; 2029e 16,48; 2030e 23,18): ingresos 3 puntos mayores y margen 3 puntos mayor por lanzamientos más rápidos [P1].',
};

const per_excluidos = 'Historia adelantada (precio de cierre en USD ÷ BPA diluido real del año siguiente, cifras clave en USD del informe anual 2025): 2020 57,0x; 2021 35,3x; 2022 44,0x; 2023 18,2x; 2024 13,5x; 2025 28,5x (con nuestro BPA de 2026e, 11,18 USD). Sin exclusiones. Actual: 379,20 ÷ 16,56 (nuestro BPA de 2027e) = 22,9x. Mediana de 2021-2025 28,5x; mínimo 13,5x; media larga 2020-2025 32,8x. Atención: la historia es de antes de la deuda de Merus y con la caducidad más lejos.';

const diferencia_consenso = 'Nuestro BPA de 2028e (23,14 USD) queda un 11 % por debajo del consenso (173 DKK = 25,94 USD) y el de 2027e (16,56) un 4 % por debajo (17,23) [D2]: proyectamos ingresos de 2028 un 6 % menores (6.140 frente a 6.528 M) por prudencia con los lanzamientos. Pero el objetivo a 12 meses no usa el BPA de 2028 sino la media de 2028-2030 (17,88), porque el mercado mirará la caída de 2029; aun así, nuestro base (450,58 USD) queda un 14 % por encima del objetivo medio de los analistas (395,19 USD; 2.635,67 DKK), porque la regla aplica un PER de 25,2 veces, cerca de la historia de Genmab, a ese BPA. No lo acercamos al consenso: la diferencia sale del múltiplo, y el control v2 (base al PER actual de 22,9 veces) da un +7 %.';

const comentario12 = 'El objetivo a 12 meses (448,86 USD; 2.993,60 DKK; +18,4 % ponderado y +18,8 % el base) y el valor intrínseco (255,04 USD; 1.700,95 DKK; −32,7 %) están a 76 puntos de distancia, la mayor que puede darse en este método. El objetivo dice que, si los lanzamientos siguen su curso, el mercado puede seguir pagando un PER de 25 veces el beneficio medio de 2028-2030 dentro de un año; el valor intrínseco dice que los flujos que vendrán después de la caducidad no justifican el precio. Para cerrar la distancia hacia arriba haría falta que petosemtamab y Rina-S superen claramente lo proyectado (el escenario alcista no basta). La tesis de valor es a más de un año y negativa.';

const huecos = [];

const resumen = {
  recomendacion: 'Mantener',
  conviccion: 'Baja',
  justificacion_recomendacion: null,
  horizonte: '12 meses (la tesis de valor, a varios años, es negativa)',
  sintesis: `**La recomendación y por qué.** Mantener con convicción baja. El objetivo a 12 meses es de 448,86 USD (2.993,60 DKK), con una rentabilidad ponderada del 18,4 % y del 18,8 % en el base, pero el valor intrínseco es de 255,04 USD (1.700,95 DKK), un 32,7 % por debajo del precio de 379,20 USD (2.529 DKK), y la regla no da Comprar con el valor intrínseco por debajo del precio. El objetivo medio de los analistas (395,19 USD; 2.635,67 DKK) queda entre las dos cifras [D2]. La asimetría es de −0,06: ni el escenario alcista (365,46 USD) llega al precio. La convicción es baja porque las dos cifras se separan 76 puntos y el control v2 da solo un 7 %; subiría si las fases 3 de petosemtamab confirman los datos de fase 2 y bajaría con cualquier fracaso clínico.

**El negocio.** Genmab cobra regalías de DARZALEX (2.443 M USD en 2025, el 66 % de los ingresos) y Kesimpta casi sin coste, y con ellas financia una I+D de 1.606 M [A2]. Las patentes de daratumumab caducan en 2029 en EE. UU. y en 2031 en Europa [B3]. Para sustituirlas compró ProfoundBio (Rina-S) y Merus (petosemtamab) por ≈9.800 M, con 5.500 M de deuda [A2]. El ROIC cae del 56,2 % de 2024 al 14,3 % en 2025, 4,6 puntos sobre el WACC (9,68 %). Sostenibilidad del crecimiento: **En parte**: la calidad demostrada (regalías) caduca y lo que la sustituye depende de ensayos abiertos.

**Finanzas.** Ingresos +25 % en el primer semestre de 2026 y guía subida a 4.325-4.525 M [A3], pero el beneficio neto baja (356 M frente a 531 M) por los intereses. Deuda neta de ≈3.900 M a junio (≈3,1 veces el EBITDA LTM estimado) [A3]. Cuentas limpias (Beneish −2,51); el riesgo contable es el posible deterioro de los 9.123 M de intangibles de Merus.

**Equipo y gobierno.** Fundador al mando desde 2010 con el 1,06 % del capital y guías cumplidas [C1, C12]; sin accionista de control. Resta la remuneración: el consejo tuvo que retirar la suya en la junta de marzo y el consejero delegado cobró 10,7 M USD, sobre todo en acciones sin objetivos de rentabilidad publicados [C3, C2].

**Valoración.** El DCF (262,23 USD) y los escenarios pesan un 90 % porque recogen la caducidad año a año; los comparables, un 10 %. El DCF inverso exige un crecimiento del 12,7 % anual hasta 2035 con un margen del 43,3 %, frente a nuestro 7,4 % y 33 %: el precio descuenta que Genmab duplica sus ventas tras perder DARZALEX y con márgenes de empresa de regalías. Con la prima del mercado el valor sube a 309,72 USD, aún un 18,3 % bajo el precio.

**Riesgos y catalizadores.** Los dos riesgos mayores son un fracaso de petosemtamab en fase 3 (deterioro y −20-30 % de valor) y una caída de DARZALEX antes de 2029 por la negociación de precios de Medicare. Catalizadores: resultados del 5-nov-2026, datos de fase 3 de Rina-S en ovario (2027) y de petosemtamab (2026-2027) y las presentaciones a la FDA de EPKINLY en primera línea [B8]. El foro de particulares está eufórico tras DLBCL-2 [E1]: buena parte de la noticia ya está en el precio (+36,9 % en tres meses).

**Qué cambiaría la decisión.** Compraríamos por debajo del valor intrínseco (255,04 USD; 1.700,95 DKK) si la calidad mejora; venderíamos por encima de 498,74 USD (3.326 DKK). Pasaríamos a Vender si una fase 3 de petosemtamab o Rina-S falla, y revisaríamos al alza si petosemtamab se aprueba en 2027 con ventas de lanzamiento por encima de lo previsto.`,
  tesis: 'Genmab es una de las biotecnológicas más rentables de Europa: inventó daratumumab, cuyas regalías (2.443 M USD en 2025, +21 %) y las de Kesimpta le dan un 83 % de los ingresos con margen casi total, y tiene plataformas de anticuerpos biespecíficos y ADC que ya han producido siete medicamentos aprobados [A2, B3]. Con ese dinero está construyendo una farmacéutica propia: EPKINLY ya vende y ha logrado dos fases 3 positivas en 2026 [B8, B9], y Rina-S y petosemtamab se lanzarían en 2027 [B11].\n\nEl precio (2.529 DKK, 23.435 M USD de capitalización) descuenta que esa transformación sale bien y deprisa: el DCF inverso pide un crecimiento del 12,7 % anual hasta 2035 con un margen del 43,3 %, cuando las patentes de daratumumab caducan en 2029 (EE. UU.) y 2031 (Europa) y se llevan el 66 % de los ingresos [B3]. Cotiza a 23,5 veces el beneficio de los próximos 12 meses, el doble que los comparables (12,2), y por encima de Royalty Pharma y Halozyme [D7, D8, D9].\n\nPara invertir hay que creer que dos productos aún no aprobados y EPKINLY (que reparte beneficio con AbbVie) sustituyen 2.900 M de regalías casi sin coste antes de 2031 y siguen creciendo. Puede pasar, y por eso el objetivo a 12 meses es positivo, pero no hay margen de seguridad: con nuestro caso base, que ya supone dos lanzamientos con éxito, el valor es un 32,7 % menor que el precio.',
  vision_diferencial: {
    mercado_descuenta: 'Que Genmab supera la caducidad de DARZALEX sin bache: crecimiento del 12,7 % anual hasta 2035 y un margen del 43,3 %, gracias a EPKINLY en primera línea, Rina-S y petosemtamab. El consenso de BPA de 2028 (25,94 USD) y su objetivo medio (395 USD) lo reflejan [D2].',
    nuestra_vision: 'Los lanzamientos pueden salir bien (nuestro base lo supone) y aun así la caída de 2029-2031 es inevitable: en 2029 los ingresos bajan un 13 % y el margen pasa del 35 % al 24 %. Con productos propios, que necesitan fuerza comercial y reparten beneficio, el margen de largo plazo es del 33 %, no del 43 %.',
    por_que: 'Porque perder regalías es perder ingresos con margen casi total, y ninguna farmacéutica comparable gana un 43 % vendiendo sus propios productos (Roche 29 %, Novartis 31 % de margen EBIT [B7]). La historia de Genmab con márgenes del 35-41 % es la de una empresa de regalías, que deja de serlo en 2031.',
  },
  a_favor: [
    '**Regalías en pleno crecimiento hasta 2028**: DARZALEX vendió 4.239 M USD en el 3T26 y la guía de 2026 ya subió a 4.425 M de ingresos [A7, A3].',
    '**Dos fases 3 positivas de EPKINLY en 2026**: reducción del riesgo del 60 % en segunda línea y del 51 % en primera línea de linfoma difuso [B9, B8].',
    '**Cartera tardía con designaciones de terapia innovadora**: Rina-S (cinco fases 3) y petosemtamab (dos fases 3) [A3].',
    '**Plataformas que generan regalías nuevas**: TECVAYLI, TALVEY y RYBREVANT ya aportan 111 M en 2025 [A2].',
    '**Cuentas limpias y guías cumplidas**: Beneish −2,51 y guía de 2025 dentro del rango [C12].',
  ],
  en_contra: [
    '**Caducidad del 66 % de los ingresos**: patentes de daratumumab en 2029 (EE. UU.) y 2031 (Europa) [B3].',
    '**Precio que exige un 12,7 % de crecimiento anual hasta 2035** con un margen del 43,3 %: valor intrínseco 32,7 % por debajo.',
    '**Deuda de 5.375 M USD** por una compra cuyo activo principal sigue en fase 3 [A3].',
    '**ROIC del 14,3 % tras Merus**, solo 4,6 puntos sobre el WACC, y bajando con el año completo de la compra.',
    '**Ensayos fallidos recientes**: DLBCL-1 sin supervivencia global y acasunlimab abandonado [B10, A3].',
    '**Remuneración discutida**: el consejo retiró su propuesta en la junta de marzo de 2026 [C3].',
  ],
  que_vigilar: 'La tesis del mercado depende de que petosemtamab y Rina-S lleguen al mercado en 2027 y vendan lo bastante para cubrir la caída de las regalías de DARZALEX en 2029. Señales: los datos de fase 3 de petosemtamab en cabeza y cuello (LiGeR-HN1 y HN2) y de Rina-S en ovario resistente a platino (RAINFOL-02, reclutamiento cerrado en marzo de 2026) [A3], y la evolución de las ventas de DARZALEX en EE. UU. (2.528 M en el 3T26) [A7].',
  cambiaria_recomendacion: [
    'Si una fase 3 de petosemtamab o Rina-S no alcanza su objetivo principal, pasaríamos a Vender (escenario bajista: 152,05 USD).',
    'Si el precio baja de 255,04 USD (1.700,95 DKK) y el ROIC del año completo con Merus supera el WACC en 5 puntos, reconsideraríamos Comprar.',
    'Si el precio supera 498,74 USD (3.326 DKK), pasaríamos a Vender.',
    'Si las ventas de DARZALEX en EE. UU. caen dos trimestres seguidos antes de 2029 (negociación de Medicare), recortaríamos el base.',
  ],
  kpis_seguimiento: [
    { kpi: 'Ventas de DARZALEX en EE. UU. (trimestre)', nivel_actual: '2.528 M USD (3T26)', umbral_alerta: 'Dos trimestres de caída', por_que: 'Paga ≈60 % de las regalías hasta 2029 [A7].' },
    { kpi: 'Ventas mundiales de EPKINLY', nivel_actual: '175 M USD (2T26, +45 %)', umbral_alerta: 'Crecimiento interanual < 20 %', por_que: 'Es el primer producto propio y el que más pesa en la sustitución [A3].' },
    { kpi: 'Fase 3 de petosemtamab (LiGeR-HN1/HN2)', nivel_actual: 'Reclutando', umbral_alerta: 'Objetivo principal no alcanzado', por_que: 'Sostiene los 9.123 M de intangibles de Merus [A2].' },
    { kpi: 'Deuda neta / EBITDA', nivel_actual: '≈3,1 veces (jun-26, estimación)', umbral_alerta: '> 3,5 veces', por_que: 'Los covenants del préstamo A y el vencimiento de 2030 [A2].' },
  ],
  confianza: 'Media',
};

const riesgos = {
  items: [
    { riesgo: 'Fracaso o retraso de la fase 3 de petosemtamab', tipo: 'Clínico', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−25 %', mitigante: 'Dos designaciones de terapia innovadora y datos de fase 2 sólidos [A3].', senal: 'Datos de LiGeR-HN1/HN2 o retraso de la presentación a la FDA.' },
    { riesgo: 'Caducidad de las regalías de DARZALEX (2029 EE. UU., 2031 Europa)', tipo: 'Patentes', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: 'Ya en el base; adelanto de un año: −8 %', mitigante: 'Productos propios y otras regalías [B3].', senal: 'Litigios de biosimilares o acuerdos de J&J.' },
    { riesgo: 'Fracaso de Rina-S en ovario resistente a platino (RAINFOL-02)', tipo: 'Clínico', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 %', mitigante: '45,9 % de respuestas en fase 2 [E1]; cinco fases 3.', senal: 'Datos de RAINFOL-02 (2027).' },
    { riesgo: 'Negociación de precios de Medicare para DARZALEX antes de 2029', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'La versión subcutánea es más reciente [B3].', senal: 'Lista de medicamentos seleccionados por los CMS.' },
    { riesgo: 'Deuda y covenants', tipo: 'Financiero', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Flujo de regalías hasta 2028 para amortizar [A2].', senal: 'Deuda neta / EBITDA > 3,5 veces.' },
    { riesgo: 'Competencia en linfoma (Roche) y retirada de una indicación de EPKINLY tras DLBCL-1', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'DLBCL-2 y DLBCL-4 positivas [B8, B9].', senal: 'Decisión de la FDA sobre la indicación acelerada.' },
    { riesgo: 'Dependencia de J&J y de AbbVie (litigio por secretos comerciales)', tipo: 'Socios', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Contratos de licencia a largo plazo [B3].', senal: 'Arbitrajes o demandas nuevas.' },
    { riesgo: 'Sucesión del consejero delegado fundador (64 años)', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−3 %', mitigante: 'Equipo directivo amplio [C1].', senal: 'Anuncio de salida sin sucesor.' },
  ],
  premortem: 'Octubre de 2029: la acción ha perdido un 40 %. En 2027 la FDA aprobó petosemtamab, pero la segunda fase 3 (2L/3L) no mejoró la supervivencia y los oncólogos lo reservaron para pocos pacientes: vendió 400 M en 2029, no 1.000 M. Rina-S llegó a ovario resistente a platino, pero tres ADC del receptor de folato se repartieron el mercado. EPKINLY creció en primera línea, pero AbbVie se llevó la mitad del beneficio. En 2029 caducó la patente de EE. UU. de daratumumab y los ingresos cayeron un 18 % con un margen EBITDA del 20 %; Genmab reconoció un deterioro de 3.000 M en los intangibles de Merus, la deuda neta superó 3,5 veces el EBITDA y la empresa suspendió las recompras. El mercado, que en 2026 pagaba 23 veces el beneficio, pasó a valorarla como Royalty Pharma o BioMarin (10 veces) sobre un beneficio la mitad de alto. Las señales que lo anticipaban: el ROIC del 14,3 % tras Merus, la DLBCL-1 sin supervivencia y un precio que exigía un 12,7 % de crecimiento anual.',
  ia: { exposicion: 'Baja', sentido: 'Mixto', efecto_valor: '+/−3 %', comentario: 'La IA no amenaza el producto (anticuerpos para el cáncer) ni las regalías, que dependen de patentes y de la eficacia clínica. Puede ayudar en el descubrimiento de anticuerpos y en el diseño de ensayos, donde Genmab gasta 1.606 M al año [A2]: un ahorro del 5-10 % del tiempo de desarrollo valdría poco frente al tamaño de los activos actuales. El riesgo es indirecto: competidores con plataformas de diseño por IA podrían acelerar biespecíficos rivales en las mismas dianas (CD20xCD3, EGFR). Señal: aprobaciones de anticuerpos diseñados con IA en las indicaciones de EPKINLY o petosemtamab. Riesgo de IA para el negocio: bajo.' },
  confianza: 'Media',
};

const catalizadores = {
  items: [
    { fecha: '2026-11-05', evento: 'Resultados de los nueve meses de 2026', efecto: 'Confirmación de la guía subida; ventas de DARZALEX del 3T ya conocidas (4.239 M) [A7].', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '1S 2027', evento: 'Presentación a la FDA de EPKINLY + R-CHOP en primera línea (DLBCL-2)', efecto: 'Abre el mayor mercado de linfoma difuso [B8].', probabilidad: 'Alta', sentido: '+' },
    { fecha: '2027', evento: 'Datos de fase 3 de Rina-S (RAINFOL-02, ovario resistente a platino)', efecto: 'Binario: aprobación o ≈−15 % de valor [A3].', probabilidad: 'Media', sentido: '+/−' },
    { fecha: '2026-2027', evento: 'Datos de fase 3 de petosemtamab (LiGeR-HN1/HN2) y lanzamiento previsto en 2027', efecto: 'Binario sobre los 9.123 M de intangibles de Merus [B11].', probabilidad: 'Media', sentido: '+/−' },
    { fecha: 'feb-2027', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Primera guía con un año completo de deuda y lanzamientos.', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2029', evento: 'Caducidad de la patente de daratumumab en EE. UU.', efecto: 'Caída del ≈60 % de las regalías de DARZALEX [B3].', probabilidad: 'Alta', sentido: '−' },
  ],
  confianza: 'Media',
};

const preguntas = {
  items: [
    { tema: 'Petosemtamab', pregunta: '¿Cuándo esperan los datos de LiGeR-HN1 y HN2 y qué ventas suponen para 2029 en el plan de compra de Merus?', por_que: 'Sostiene 9.123 M de intangibles y el lanzamiento de 2027 [B11].' },
    { tema: 'Caducidad de DARZALEX', pregunta: '¿Qué parte de las regalías de DARZALEX cae en 2029 y cuál sigue cubierta por patentes de la versión subcutánea u otros países?', por_que: 'El arbitraje excluyó las patentes subcutáneas de J&J [B3].' },
    { tema: 'Margen a largo plazo', pregunta: '¿Qué margen operativo esperan con una cartera de productos propios, sin regalías de DARZALEX?', por_que: 'El precio descuenta un 43,3 %; nuestro base, un 33 %.' },
    { tema: 'Deuda', pregunta: '¿Cuál es el objetivo de apalancamiento y cuánto de la caja de 2027-2028 irá a amortizar el préstamo A antes de 2030?', por_que: 'Vencimiento de 860 M en 2030, justo tras la caducidad [A2].' },
    { tema: 'EPKINLY', pregunta: '¿Mantendrán la indicación de tercera línea de linfoma difuso tras DLBCL-1?', por_que: 'DLBCL-1 no logró la supervivencia global [B10].' },
    { tema: 'Rina-S', pregunta: '¿Cómo se diferenciará frente a Elahere de AbbVie, que es también su socio en EPKINLY?', por_que: 'Competencia directa en ovario [B3].' },
    { tema: 'Remuneración', pregunta: '¿Introducirán objetivos de rentabilidad (ROIC, TSR) en las RSU de la dirección?', por_que: 'El 69 % del pago del consejero delegado son RSU sin métricas publicadas [C2].' },
  ],
  confianza: 'Media',
};

export default {
  fuentes, limitaciones, controles_explicados, huecos, secciones: { ...secciones, resumen, riesgos, catalizadores, preguntas },
  dcf_justificacion, puente_comentarios, veredicto: 'En parte', sostenibilidad_justificacion, dcf_lectura, narrativas, escenarios_comentario,
  valoracion_comentario, just12, per_excluidos, diferencia_consenso, comentario12,
};
