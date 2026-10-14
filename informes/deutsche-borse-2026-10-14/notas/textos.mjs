// Textos del analista (Deutsche Börse, corte 2026-10-14). Cifras del motor tal cual; hechos con cita de nota.
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); }

export default {
  limitaciones: 'Análisis hecho desde un entorno sin descargas: solo búsqueda web. Las cifras salen de comunicados de resultados de la empresa citados por la búsqueda y de proveedores (MarketScreener, Fintel, Simply Wall St, Börsengeflüster); no se han leído las notas del informe anual. Ingresos = ingresos netos del grupo **con** resultado de tesorería, como los publica la empresa. 2021-2023 sin EBIT, impuestos ni amortizaciones (solo ingresos, EBITDA y beneficio). Impuestos y minoritarios de 2025 repartidos por estimación propia (tipo del 26,5 %). LTM a junio de 2026 estimado con los crecimientos redondeados del 1S26. Balance y flujos casi vacíos: el puente usa la deuda bruta de Simply Wall St (dic-24) y la deuda neta de MarketScreener (2025), y el capital invertido del ROIC es patrimonio (Fintel) + deuda neta. Acciones (180,6 M) estimadas tras la recompra de 2026. El balance bancario de Clearstream y Eurex Clearing (≈ 300.000 M de activos, saldos de clientes) queda fuera, como en el informe de ICE. Comparables tomados del informe de ICE del 8-oct-2026 (cifras de MarketScreener al 7-oct), pasados a euros a 1,175 USD/EUR. Bono alemán a 10 años de Cbonds a 15-jun-2026 (2,95 %). Sin bolsa.mjs: no hay rentabilidades, beta ni volatilidad medidas.',
  controles_explicados: [
    { control: 'Regresión múltiplo-crecimiento', explicacion: 'Con siete comparables de modelos distintos (bolsas, datos puros, plataformas) el crecimiento no explica el múltiplo: no se usa la regresión, solo las medianas.' },
  ],
  secciones: {
    negocio: {
      como_gana_dinero: 'Cobra comisiones por contrato negociado y compensado (Eurex, EEX), por custodia y liquidación sobre los activos depositados (Clearstream), licencias de índices y datos, y suscripciones de software (SimCorp). Además gana intereses sobre los saldos de efectivo que los clientes dejan en Clearstream y como garantía en Eurex Clearing: el **resultado de tesorería**, 837 M EUR en 2025 (14 % de los ingresos netos, frente a 1.050 M en 2024) y más de 700 M previstos en 2026 [A1, A2]. Casi todo el coste es de personal y tecnología, así que el apalancamiento operativo es alto: el EBITDA sin tesorería creció un 14 % en 2025 con ingresos netos sin tesorería un 9 % mayores [A1]. Lo cíclico (volatilidad, tipos) pesa menos que en 2022, cuando explicó 14 de los 24 puntos de crecimiento [A9].',
      clientes: 'Bancos, intermediarios, gestoras, aseguradoras y empresas energéticas de todo el mundo. No hay concentración relevante publicada en las fuentes leídas. El poder de precios se ve en el margen: EBITDA del 58 % del total en 2025 (3.512 M sobre 6.026 M) y del 51,6 % sin tesorería (2.675 M sobre 5.189 M) [A1].',
    },
    financieros: {
      comentario: 'Los ingresos netos pasan de 3.510 M EUR en 2021 a 6.026 M en 2025 [A1, A9]: un crecimiento compuesto alto por tres motores que no se repetirán igual. Los tipos de interés llevaron el resultado de tesorería de casi nada a ≈ 1.050 M en 2024; SimCorp (desde octubre de 2023) sumó crecimiento comprado; y la volatilidad de 2022 infló la negociación [A3, A8, A9]. En 2025 el crecimiento total fue solo del 3 % porque la tesorería cayó un 20 %, de 1.050 M a 837 M, mientras la parte sin tesorería subió un 9 % [A1]. El margen EBITDA total sube de 58,2 % (2021) a 58,3 % (2025) con un pico en 2024; sin tesorería pasa del 49 % al 51,5 % [A1, A3]. El 1S26 confirma la tendencia: ingresos sin tesorería +11 % y EBITDA sin tesorería +16 % [A2].',
      ajustes: 'Usamos cifras reportadas. La empresa destaca el BPA antes de los efectos del precio de compra (cash EPS: 11,65 EUR en 2025 frente a 10,90 reportado), que excluye la amortización de intangibles comprados (SimCorp, ISS) [A1]. El 1S26 incluye 20 M de costes de la compra de Allfunds [A14]. No hay deterioros relevantes en las fuentes leídas.',
    },
    trimestres: {
      ultima_presentacion: 'En el 2T26 (22-jul) la dirección presentó un crecimiento «estructural y diversificado»: ingresos sin tesorería +9 % hasta 1.412 M EUR y EBITDA sin tesorería +13 % hasta 775 M, con 205 M de tesorería [A2]. Subió la previsión de tesorería a más de 700 M (con lo que espera más de 6.400 M de ingresos netos y más de 3.800 M de EBITDA) y mantuvo la de la parte sin tesorería (≈ 5.700 M y ≈ 3.100 M) [A2]. Terminó la recompra de 500 M el 26-jun [A2]. La acción bajó tras la cifra pese a la mejora: el mercado ya esperaba más tesorería [E3]. Las preguntas giraron en torno a los tipos del BCE, Allfunds (calendario y competencia) y el crecimiento de SimCorp en la nube [C2]. El 3T26 se publica el 20-oct-2026 [D4].',
    },
    balance: {
      liquidez: 'Deuda neta corporativa ≈ 3.750 M EUR a dic-25 según MarketScreener (1,0 veces el EBITDA de los últimos 12 meses) [A13]; con los 1.100 M de ISS STOXX y los 500 M de la recompra, la ajustada es de 5.350 M (1,4 veces).',
      rating: null,
      otros_pasivos: 'El balance consolidado incluye ≈ 300.000 M EUR de activos y pasivos de las actividades de cámara (Eurex Clearing) y de banco (Clearstream), sobre todo saldos de clientes y garantías [A11]. No se suman a la deuda: son pasivos de los clientes con su activo enfrente, y su rendimiento es el resultado de tesorería que ya está en el EBITDA. La compra de Allfunds exigirá ≈ 3.700 M en efectivo (estimación propia: 6,00 EUR por cada una de unas 615 M de acciones) y elevará la deuda neta en el 1S27 [A6].',
      comentario: 'No hemos podido leer el balance completo. Con los datos disponibles, la deuda es baja frente al EBITDA (1,0 veces la neta) y el patrimonio crece de 11.300 M a 11.829 M en 2025 [A11, A12]. La deuda bruta de ≈ 7.200 M procede de la compra de SimCorp [A12].',
    },
    flujos: {
      comentario: 'Solo tenemos el FCF de 2025 de MarketScreener (≈ 2.097 M EUR, con un capex de ≈ 355 M, el 5,9 % de los ingresos) [A13]: una conversión de alrededor del 105 % del beneficio neto. Es un negocio de activos ligeros: el capex es sobre todo desarrollo de software y la amortización incluye ≈ 190 M de intangibles comprados (estimación a partir de la diferencia entre BPA de caja y reportado).',
    },
    calidad: {
      auditor: null, anios_auditor: null, opinion: null,
      comentario: 'No hemos leído el informe de auditoría. Altman y Beneish no se calculan (faltan partidas de balance) y el Piotroski de 4 no es interpretable con tan pocos datos. La diferencia entre BPA reportado y de caja (0,75 EUR en 2025) es la amortización de intangibles de compras, recurrente mientras siga comprando [A1].',
      senales: [{ senal: 'Ninguna relevante', nivel: 'Baja', comentario: 'Revisados los comunicados de 2022-2026: sin cambios de criterio ni deterioros publicados; cobertura limitada.' }],
      confianza: 'Baja',
    },
    rentabilidad: {
      comentario: 'El ROIC de 2025 es del 13 % con el capital invertido estimado (patrimonio más deuda neta), frente a un WACC del 7,08 %: crea valor, aunque menos que antes de SimCorp, que añadió fondo de comercio [A11]. El ROE es del 17,3 %. ICE, con más fondo de comercio, tiene un 8,1 %; CME, un 12,2 % [D8]. El ROIC sin el resultado de tesorería sería unos 2 puntos menor (estimación propia: la tesorería aporta ≈ 600 M de NOPAT), así que la creación de valor depende en parte de los tipos.',
      confianza: 'Baja',
    },
    capital: {
      politica: 'Reparte el 30-40 % del beneficio en dividendo creciente (4,20 EUR por 2025, +5 %) y desde 2025 recompra con regularidad: 500 M en 2025 y otros 500 M terminados en junio de 2026 [A1, A2]. La prioridad sigue siendo crecer con compras en software y datos: SimCorp (2023), el 20 % de ISS STOXX (2026) y Allfunds (pendiente) [A5, A6].',
      comentario: 'La dirección es una compradora en serie disciplinada en deuda: tras SimCorp mantuvo la deuda neta en torno a una vez el EBITDA. El crecimiento por acción ha sido bueno (BPA de 6,59 a 10,90 EUR entre 2021 y 2025) con acciones estables [A1, A9]. El riesgo está en Allfunds: 5.300 M por una plataforma de distribución de fondos con márgenes presionados, que emitirá ≈ 7,5 M de acciones nuevas (estimación propia) y exige pasar la revisión de competencia de Bruselas [A6, B5].',
    },
    directivos: {
      comentario: 'Equipo nuevo en la cúpula desde 2025 (Leithner, promoción interna con sucesión anunciada), que ha cumplido la guía de 2025 y la ha mejorado en 2026 [A1, A2, C1]. Hereda una estrategia de compras (Horizon 2026) que ahora tiene que ejecutar con Allfunds. No hemos podido verificar la remuneración ni las operaciones de directivos.',
    },
    consenso: {
      guidance: 'Para 2026: ingresos netos sin tesorería ≈ 5.700 M EUR y EBITDA sin tesorería ≈ 3.100 M; resultado de tesorería de más de 700 M (subido en julio); con tesorería, más de 6.400 M y más de 3.800 M (confirmado el 22-jul-2026) [A2]. El plan Horizon 2026 apuntaba a un crecimiento orgánico de los ingresos sin tesorería de en torno al 10 % anual [A3].',
      revisiones: 'Las estimaciones de MarketScreener son de julio de 2026 y no tienen número de analistas [D2]. Las recomendaciones salen de Google Finance (11 analistas: 8 comprar, 3 mantener) y se contrastan con TipRanks (3 comprar, 9 mantener; objetivo medio 267,64 EUR) [D3, D11]. En octubre suben los objetivos: Deutsche Bank a 313 EUR y Jefferies a 330 EUR [D10]. JP Morgan recortó en mayo sus BPA hasta 2028 y UBS los subió en marzo, por la negociación del 1T [D10].',
    },
    multiplos_historicos: {
      comentario: 'Al cierre de cada año, el PER sobre el BPA reportado se ha movido entre 19,8 veces (2022) y 22,3 veces (2021), con una mediana de 20,5 veces en 2021-2025 [D5, D6]. Hoy cotiza a 25,7 veces el BPA de los últimos 12 meses publicados de 2025 y a 23,1 veces el de los próximos 12 meses: una prima de unos 2,5 puntos sobre su historia. El cambio estructural (más software y datos, con menos peso de lo cíclico) la justificaría en parte; la caída del resultado de tesorería, no.',
    },
    comparables: {
      criterio: 'Siete infraestructuras de mercado y datos: bolsas con cámara y datos (ICE, CME, Nasdaq, LSEG), una plataforma de renta fija (Tradeweb) y dos de datos e índices (S&P Global, MSCI), que se parecen a ISS STOXX y SimCorp. Las cifras son del informe de ICE del 8-oct-2026 (MarketScreener al 7-oct), con la capitalización pasada a euros [D8]. Euronext y Cboe quedan fuera por falta de estimaciones del mismo proveedor. Ojo: el PER de los estadounidenses es sobre BPA ajustado; el de Deutsche Börse, sobre el reportado (el de caja es un 7 % mayor).',
      comentario: 'Deutsche Börse cotiza a 14,6 veces el EBITDA de los próximos 12 meses y 23,1 veces el beneficio, frente a medianas de 15,7 y 23,9 veces. El descuento en EV/EBITDA se explica por el resultado de tesorería, que el mercado paga a menos múltiplo, y el PER similar, por un ROIC (13 %) y un margen (58,9 %) en línea con la mediana. CME e ICE, las más parecidas en derivados y compensación, cotizan a 21,7 y 21,0 veces el beneficio: frente a ellas no hay descuento. La regresión no explica nada (R² 0,06) y no se usa.',
    },
    transacciones: {
      comentario: 'Las compras de datos y software financiero se pagan caras (24-31 veces el EBITDA: IHS Markit, Adenza) y las de plataformas de negociación, menos (MarketAxess, 13 veces) [D8]. No ponderamos transacciones: Deutsche Börse es compradora y, con 54.000 M de capitalización y sin accionista de control, no es objeto probable de una oferta.',
    },
    catalizadores: {
      items: [
        { fecha: '20-oct-2026', evento: 'Resultados del 3T26', efecto: 'Confirma o no la guía de tesorería (> 700 M) y el crecimiento sin tesorería del 9-11 %', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: 'Febrero de 2027', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Primera guía con el BCE en torno al 2 %: mide cuánto cae la tesorería', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: '1S27', evento: 'Decisión de competencia de la Comisión Europea sobre Allfunds y cierre', efecto: 'Unos 7,5 M de acciones nuevas y ≈ 3.700 M de deuda; 60 M de sinergias de costes', probabilidad: 'Media', sentido: '+/−' },
        { fecha: '2026-2027', evento: 'Nueva recompra anual (desde 2025 la empresa recompra cada año)', efecto: 'Apoya el BPA en ≈ 1 %', probabilidad: 'Media', sentido: '+' },
        { fecha: 'Octubre de 2027', evento: 'Paso a la liquidación T+1 en Europa', efecto: 'Inversión y riesgo operativo para Clearstream', probabilidad: 'Alta', sentido: '−' },
      ],
      confianza: 'Media',
    },
    riesgos: {
      items: [
        { riesgo: 'Bajada de tipos del BCE más profunda', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−6 % por cada 300 M menos de resultado de tesorería (estimación propia)', mitigante: 'Crecimiento estructural sin tesorería del 9-11 %', senal: 'Tipo de depósito del BCE por debajo del 1,5 % o saldos de efectivo en Clearstream por debajo de 15.000 M' },
        { riesgo: 'Allfunds: sobreprecio o bloqueo de competencia', tipo: 'Ejecución', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−3 a −5 % si destruye valor', mitigante: '60 M de sinergias de costes anunciadas', senal: 'Fase II de la Comisión Europea o deterioros de SimCorp/Allfunds' },
        { riesgo: 'Normalización de la volatilidad y de los volúmenes de Eurex', tipo: 'Cíclico', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−12,2 % (escenario bajista)', mitigante: 'Diversificación hacia software y datos', senal: 'Contratos de Eurex por debajo del año anterior dos trimestres seguidos' },
        { riesgo: 'Regulación europea de la post-contratación y de las cámaras', tipo: 'Regulatorio', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'n.d.', mitigante: 'EMIR 3 favorece a Eurex Clearing', senal: 'Propuestas de la Comisión sobre tarifas o consolidación de depositarios' },
        { riesgo: 'Ejecución en software (SimCorp en la nube)', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−3 % (estimación propia)', mitigante: 'Cartera de clientes con costes de cambio altos', senal: 'ARR de SimCorp por debajo del 10 % de crecimiento' },
        { riesgo: 'Valoración: el precio ya está en máximos', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−4 % si vuelve a la mediana de su PER histórico (20,5 veces)', mitigante: 'Calidad del negocio', senal: 'PER de los próximos 12 meses por encima de 25 veces' },
      ],
      premortem: 'Octubre de 2029: la acción ha perdido un 40 %. El BCE bajó el tipo de depósito al 1 % en 2027 y los saldos de clientes en Clearstream se redujeron: el resultado de tesorería cayó a menos de 300 M, y el beneficio dejó de crecer dos años seguidos. A la vez, la volatilidad se normalizó y Eurex negoció menos. Allfunds se cerró tras una larga revisión de competencia con concesiones, pagó la deuda con flujo que antes iba a recompras y sus márgenes siguieron bajando con la presión de las gestoras. El mercado dejó de pagar 23 veces por un BPA que ya no crecía y el PER volvió a 17-18 veces, como en 2018-2019. Las señales eran visibles: guía de tesorería a la baja en febrero de 2027, revisiones de BPA a la baja y la fase II de Bruselas.',
      confianza: 'Media',
    },
    preguntas: {
      items: [
        { tema: 'Tesorería', pregunta: '¿Qué resultado de tesorería esperan con el depósito del BCE al 2 % y con qué saldos medios?', por_que: 'Es el 14 % de los ingresos y casi todo margen: mueve el BPA más que ningún otro dato.' },
        { tema: 'Allfunds', pregunta: '¿Qué ROIC esperan de Allfunds en el tercer año y qué concesiones aceptarían ante Bruselas?', por_que: 'Es la mayor compra de su historia y emite ≈ 7,5 M de acciones.' },
        { tema: 'SimCorp', pregunta: '¿Cómo evoluciona el ARR de SimCorp y qué parte ya está en la nube?', por_que: 'Sostiene la tesis de crecimiento estructural sin tesorería.' },
        { tema: 'Capital', pregunta: '¿Seguirá la recompra anual tras Allfunds?', por_que: 'Afecta al BPA de 2027-2028 y a la regla de 12 meses.' },
        { tema: 'Balance', pregunta: '¿Cuánta caja propia libre tiene el grupo fuera de los requisitos regulatorios de Clearstream y Eurex Clearing?', por_que: 'No hemos podido cuadrar la deuda neta: cambia el puente.' },
        { tema: 'Precios', pregunta: '¿Qué subidas de tarifas han aplicado en custodia y en índices en 2025-2026?', por_que: 'Mide el poder de precios que sostiene el crecimiento sin capital nuevo.' },
      ],
      confianza: 'Media',
    },
  },
  dcf_justificacion: {
    crecimiento: '2026e (+7,0 %) sigue la guía: más de 6.400 M de ingresos netos con tesorería [A2]. 2027e (+4,7 %) y 2028e (+6,4 %) suponen que la parte sin tesorería crece un 7 % al año, por debajo del +9-11 % reciente, y que la tesorería baja hasta ≈ 650 M y se estabiliza: quedan en línea con el consenso (6.757 M y 7.202 M) [D2]. Después baja del 6 % al 4 %. No incluye Allfunds (no ha cerrado).',
    margenes: 'Margen EBITDA del 59,7 % en 2026e (guía: más de 3.800 M) y del 61,8 % desde 2028e, por el apalancamiento operativo de la parte sin tesorería (51 % en 2025, 55 % en el 1S26) [A1, A2]. El consenso está en 60,8 % y 61,8 % para 2027e y 2028e [D2]. Bajamos al 61,5 % al final por la mezcla con menos tesorería.',
    inversion: 'Capex del 6 % de los ingresos (≈ 355 M en 2025, el 5,9 %) [A13], hasta el 6,5 % al final, igual a la amortización, que baja del 8 % al 6,5 % al terminarse la amortización de intangibles de SimCorp. Circulante nulo: los saldos de clientes no son circulante de la empresa.',
    wacc: 'Tasa libre del 2,95 % (Bund a 10 años, Cbonds, 15-jun-2026; dato de octubre no disponible) [D7]. Beta de 0,85, estimación propia para una bolsa europea con ingresos recurrentes (no hemos podido medirla). Prima de mercado del 5,5 %, sin prima adicional. Coste de la deuda del 3 % y peso del 10 %. WACC: 7,08 %. Con la prima implícita del mercado (4,2 %) el WACC baja al 6,09 % y el valor sube a 430,73 EUR: la recomendación depende mucho de la tasa.',
    terminal: 'Gordon con un 2,3 % (inflación del euro del 2 % y algo de crecimiento real; por debajo de la tasa libre menos medio punto). El valor terminal es el 76 % del valor. El múltiplo implícito es coherente con los comparables.',
  },
  puente_comentarios: {
    '2026e': 'Volumen: negociación y custodia al alza (+9 % sin tesorería en el 1S26) [A2]; precio: tarifas e índices; otros: caída de la tesorería.',
    '2027e': 'Volumen y SaaS de SimCorp; la tesorería resta unos 2 puntos con el BCE al 2 %.',
    '2028e': 'Crecimiento estructural sin efecto de tesorería (estable en ≈ 650 M).',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Prueba a mano: la reinversión neta es negativa (amortización de intangibles comprados por encima del capex), así que el motor no puede medir el crecimiento financiable. El 5,5 % medio proyectado está por debajo del crecimiento orgánico sin tesorería de los últimos años (+9 % en 2025, +11 % en el 1S26) [A1, A2] y se apoya en volumen (efectos de red de Eurex y Clearstream) y en precios (índices, software con costes de cambio altos). No necesita cuota nueva: el mercado de derivados y datos crece por sí mismo. El ROIC del 13 % frente al 7,08 % de WACC da margen. Por eso el veredicto es Sí; el riesgo está en la tesorería, no en la capacidad del negocio.',
  dcf_lectura: 'El DCF da 334,87 EUR por acción, un 12,0 % sobre el precio, con un WACC del 7,08 % y el 76 % del valor en el terminal. El DCF inverso dice que el precio descuenta un crecimiento del 3,2 % anual en 2027e-2032e, frente al 5,3 % de nuestro caso base, o un margen del 56 % frente al 61,5 %: no es exigente para un negocio que crece al 9-11 % sin tesorería. La rentabilidad implícita es del 7,6 %, algo por encima del WACC. La diferencia con el mercado está en la tesorería: si bajara a cero, el valor caería en torno a un 15-20 % (estimación propia), y eso es lo que el precio parece guardar como colchón. Con la prima implícita del mercado (4,2 %), el valor sube a 430,73 EUR: con tasas de mercado, la acción está barata; con la nuestra, cerca de su valor.',
  narrativas: {
    Bajista: 'El BCE baja al 1 % y la tesorería cae a la mitad; la volatilidad se normaliza y Eurex negocia menos (como en 2017-2019). Crecimiento 2,5 puntos menor y margen 2,5 puntos menor.',
    Base: 'Guía de 2026 cumplida; la parte sin tesorería crece un 7 % y la tesorería se estabiliza en ≈ 650 M.',
    Alcista: 'Tipos estables, volatilidad alta y SimCorp acelera en la nube: crecimiento 1,5 puntos mayor y margen 1 punto mayor.',
  },
  escenarios_comentario: 'Asimetría de 1,97 veces: el alcista gana un 24,0 % y el bajista pierde un 12,2 % sobre el valor intrínseco. El bajista es verosímil (tipos más bajos y menos volatilidad ya ocurrieron en 2015-2019) y no destruye la tesis: el negocio sigue creciendo. Compensa a largo plazo, pero a 12 meses el precio ya recoge buena parte del base.',
  suma_partes_comentario: 'No aplica: los segmentos comparten clientes, tecnología y balance, y no hemos podido obtener el resultado por segmento.',
  valoracion_comentario: 'Pesamos el DCF (50 %), los comparables (30 %) y los escenarios (20 %). Los comparables son fiables para la parte de bolsa y datos; el DCF recoge mejor la caída de la tesorería. No usamos transacciones (prima de control) ni suma de partes. La dispersión es moderada: los comparables dan entre 287 y 367 EUR y el DCF, 335 EUR; las transacciones (461 EUR) son las únicas muy por encima, por las primas pagadas en datos.',
  objetivo_12m: {
    ejercicio: '2028e',
    casos: [
      { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 13.80, multiplo: null, precio: null, justificacion: 'Ventas de 6.850 M (crecimiento 2,5 puntos menor en 2027e-2028e) y margen EBITDA del 59,3 %: EBIT de ≈ 3.546 M, menos 150 M de intereses, 26 % de impuestos y 20 M de minoritarios, entre 180,6 M de acciones.' },
      { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 15.25, multiplo: null, precio: null, justificacion: 'Ventas de 7.183 M y margen del 61,8 %: EBIT de 3.900 M, menos 150 M de intereses y 26 % de impuestos (2.775 M), menos 20 M de minoritarios, entre 180,6 M de acciones. Sin Allfunds ni recompras no anunciadas. La fórmula da 1.995 M en 2025 (cuadra con el publicado).' },
      { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 16.02, multiplo: null, precio: null, justificacion: 'Ventas de ≈ 7.390 M (1,5 puntos más de crecimiento) y margen del 62,8 %: EBIT de ≈ 4.086 M; mismos intereses, impuestos y acciones.' },
    ],
    per_historico: { actual: 21.4, mediana_5a: 20.5, minimo_5a: 19.8, media_larga: 20.7, excluidos: 'Ninguno: 2021-2025 (PER de cierre sobre el BPA reportado: 22,3; 19,8; 19,9; 21,0; 20,5). No hay años de pérdidas; 2018-2020 sin BPA verificado. Actual: 298,90 EUR entre nuestro BPA de 2027e (13,94 EUR).' },
    comparables_per: { mediana: 23.9 },
    consenso: { bpa_ano1: 13.11, bpa_ano2: 14.51, objetivo_medio: 286.00, objetivo_min: null, objetivo_max: 330.00, analistas: 11, tendencia_3m: 'subidas', fuente: 'MarketScreener (BPA, jul-2026), Google Finance (objetivo medio) y finanzen.net (Jefferies 330 EUR) [D2, D3, D10]' },
    diferencia_consenso: 'Nuestro BPA de 2028e (15,25 EUR) supera en un 5 % al del consenso (14,51 EUR) con ventas casi iguales (7.183 M frente a 7.202 M): la diferencia está en la amortización y en los minoritarios, que bajan al comprar el 20 % de ISS STOXX, y en que el consenso de julio es anterior a la mejora de la guía de tesorería. Nuestro objetivo base queda por encima del objetivo medio de los analistas (286 EUR), que el precio ya supera.',
    media: null,
    comentario: 'El objetivo a 12 meses (320,35 EUR) y el valor intrínseco (327,36 EUR; 334,87 EUR el DCF) están cerca: no hay una tesis de varios años esperando a cerrarse, sino una acción que ya cotiza cerca de su valor tras subir un 34 % en el año. Para ganar más del 15 % en un año haría falta que el mercado pagara un PER superior al de su historia o que la tesorería sorprendiera al alza.',
  },
  huecos: [
    { seccion: 'bolsa', campo: 'sección entera', tipo: 'Complemento', intentos: '1) bolsa.mjs (sin red); 2) búsqueda de históricos (solo cierres sueltos); 3) proveedores sin series completas', decision: 'Omitido' },
  ],
  resumen: R,
};
