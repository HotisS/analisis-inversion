// Textos del analista (Givaudan, corte 2026-10-14). Citas con letra de nota; [P1] = fuente propia.
export default {
  limitaciones: 'Análisis hecho desde la nube con la red limitada a la búsqueda web: la web de inversores de Givaudan, los PDF del informe anual y del semestre, la SIX y los proveedores de datos no se pudieron abrir, así que las cifras salen de los extractos de búsqueda de los comunicados de la empresa, de Stock Analysis, MarketScreener, Fintel y la prensa económica suiza, cruzadas cuando fue posible. La confianza es menor que en un análisis normal. Faltan los impuestos y el resultado financiero exactos (usamos un tipo efectivo del 15 %), la deuda bruta y la caja por separado (trabajamos con la deuda neta publicada) y la deuda neta de junio de 2026, que estimamos en ≈4.500 M CHF con el ratio de 2,8 veces el EBITDA. Precio: 3.714 CHF, el nivel que la prensa da para la sesión del 13-oct-2026 tras las ventas de nueve meses; el cierre del 14-oct no salió en la búsqueda. Los cierres anuales se deducen del PER anual de MarketScreener por el BPA publicado.',
  controles_explicados: [
    { control: 'Al menos 5 comparables', explicacion: 'Solo cuatro competidores directos cotizan con un PER fiable en las fuentes disponibles (Symrise, DSM-Firmenich, IFF y Kerry). Sensient, Croda y Novonesis se buscaron sin dato (hueco). Por eso los comparables pesan solo un 20 %.' },
    { control: 'Al menos 10 fuentes primarias', explicacion: 'Desde este entorno no se pueden abrir los informes anuales; las primarias son los comunicados de resultados citados por la búsqueda.' },
    { control: 'Crecimiento financiable', explicacion: 'La amortización (4,9 % de las ventas) incluye la de intangibles comprados, así que el capex (3,9-4,2 %) queda por debajo y la reinversión neta sale negativa. Hecha a mano: la inversión orgánica (capex + circulante, ≈5 % de las ventas) sobre un capital operativo sin fondo de comercio de ≈3.500 M da un ROIC orgánico de más del 30 % y financia de sobra el 3,5 % proyectado; el ROIC con todo el fondo de comercio (14,2 %) también lo cubre con creces. Ver dcf.sostenibilidad.' },
  ],
  parches: [],
  huecos_resueltos: [],

  secciones: {
    negocio: {
      clientes: 'Clientes muy repartidos: los grandes grupos de consumo (alimentación, bebidas, higiene, cosmética y perfumería de lujo) y, cada vez más, clientes locales y regionales de mercados emergentes, que crecen más deprisa [B5]. Givaudan está en las listas cortas de proveedores de los grandes, que encargan cada fórmula a dos o tres casas en concurso. El poder de precios es real pero con retraso: traslada los costes de materias primas a precio en unos meses, como en 2022-2023, cuando el margen EBITDA cayó al 20,7 % y se recuperó al 23,8 % en 2024 [A5, A2].',
    },
    financieros: {
      comentario: 'Las ventas pasaron de 6.203 M CHF en 2019 a 7.472 M en 2025: un 3,1 % anual en francos, con un crecimiento comparable de alrededor del 5 % que la divisa recorta cada año [A15, A1]. El margen EBITDA cayó del 22,2 % de 2021 al 20,7 % de 2022 por la inflación de materias primas y volvió al 23,4-23,8 % en 2024-2025 con subidas de precio y ahorros [A5, A4, A1]. El beneficio neto subió de 821 M en 2021 a 1.090 M en 2024 y bajó un 1,7 % en 2025 (1.071 M) por la divisa [A3, A1]. En el 1S26 las ventas cayeron un 1,7 % en francos (+3,6 % comparable) y el beneficio neto, de 592 M a 475 M, con 103 M de costes no recurrentes por litigios, reestructuración y las investigaciones de competencia [A6, A14]. Los nueve meses (+5,2 % comparable, +2,6 % en francos) muestran un tercer trimestre mucho mejor [A8, A9].',
      ajustes: 'Usamos cifras publicadas. El EBITDA «comparable» o ajustado de la empresa excluye reestructuraciones, litigios y costes de las investigaciones de competencia (2025: 1.807 M, 24,2 %, frente a 1.751 M publicados) [A1]; en el DCF partimos de un margen recurrente del 23,8 % en 2026e, entre el publicado y el ajustado, porque parte de esos costes se repite. El tipo efectivo del 15 % es una estimación propia (no tenemos el impuesto de cada año), igual que el reparto entre impuestos y resultado financiero de la cuenta.',
    },
    trimestres: {
      ultima_presentacion: 'En julio (1S26) la dirección presentó un semestre de crecimiento por debajo del objetivo (+3,6 %) y margen a la baja (EBITDA ajustado del 24,3 % frente al 25,2 %), con la caja libre negativa por más inversión y circulante, y prometió mejora secuencial en Taste & Wellbeing, fuerza en Fragrance & Beauty y una inflación de costes de un dígito bajo en el segundo semestre [A6, A12]. El 13-oct-2026 cumplió: nueve meses al +5,2 % comparable frente a un consenso del 3,9 %, con la perfumería del trimestre al +13,5 % por la perfumería fina; los sabores de Norteamérica siguen débiles (−3,3 % en nueve meses) [A8, A9, D13]. No hemos podido leer las transcripciones; según la prensa, las preguntas van sobre el margen del segundo semestre, la recuperación de Taste & Wellbeing y las investigaciones de competencia.',
    },
    balance: {
      otros_pasivos: 'El pasivo relevante es la deuda financiera (bonos en francos y euros y papel comercial), que solo tenemos en neto: 3.678 M a diciembre de 2025 y ≈4.500 M a junio de 2026 (estimación propia) [A1, A6]. Las investigaciones de competencia en Europa, EE. UU., Reino Unido y Suiza ya han costado acuerdos y provisiones (parte de los 103 M de no recurrentes del 1S26) y son el principal pasivo contingente [A6]. Pensiones y arrendamientos no los hemos podido separar (hueco); suelen ser unos cientos de millones en la empresa.',
      comentario: 'Balance cómodo para un negocio tan estable: deuda neta de 2,1 veces el EBITDA a fin de 2025, que sube estacionalmente a 2,8 veces en junio por el pago del dividendo y la caja libre negativa del semestre [A1, A6]. El fondo de comercio (4.722 M) es el 40 % del activo (11.864 M) y el patrimonio, 4.568 M [A11, A10]. Sin compras grandes desde 2021, la deuda baja con la caja libre.',
    },
    flujos: {
      comentario: 'La caja libre publicada (después de intereses y arrendamientos) fue de 843 M en 2021, 479 M en 2022 (circulante inflado por la crisis de suministro), 920 M en 2023, 1.158 M en 2024 y 1.053 M en 2025 (14,1 % de las ventas) [A5, A4, A1]. Convierte en caja libre cerca del 100 % del beneficio neto. El capex neto es estable, ≈3,8 % de las ventas [A1]. El 1S26 (caja libre ajustada de −119 M) refleja más inversión y circulante temporalmente alto [A6]; el objetivo es una caja libre de más del 12 % de las ventas de media en 2026-2030 [A13].',
    },
    capital: {
      politica: 'Dividendo creciente desde la salida a bolsa en 2000: 72 CHF por acción con cargo a 2025 (+2,9 %), la 25.ª subida seguida, ≈60 % del beneficio [A1]. No hay recompras. El resto de la caja libre se dedica a reducir deuda y a compras pequeñas de ingredientes y tecnologías.',
      comentario: 'Givaudan creció con compras en 2014-2021 (Naturex, Albert Vieille, Fragrance Oils, Drom) y desde 2022 ha frenado para desendeudarse: la deuda neta bajó de 4.002 M en 2024 a 3.678 M en 2025 [A1]. El reparto, dos tercios del beneficio en dividendos y el resto para deuda, es prudente para un negocio que necesita poco capital. El fondo de comercio (4.722 M) recuerda que parte del crecimiento pasado fue comprado [A11].',
    },
    directivos: {
      comentario: 'Cambio de cúpula en 2026: Christian Stammkoetter, que viene de dirigir Asia, Oriente Medio y África en Danone, es primer ejecutivo desde el 1-mar-2026, y Gilles Andrier, primer ejecutivo durante unos 20 años, preside el consejo desde la junta del 19-mar-2026 [C1, C2]. El historial de cumplimiento es bueno: el plan 2021-2025 (crecimiento comparable del 4-5 %) se cumplió y el de 2026-2030 (4-6 %) va al 5,2 % en nueve meses [A13, A8]. La caja libre del plan anterior quedó por debajo del objetivo en 2022 (6,7 %) por el circulante [A5].',
    },
    gobierno: {
      remuneracion: 'No hemos podido leer el informe de remuneraciones ni los resultados de la junta (hueco). En Suiza los accionistas votan cada año la remuneración del consejo y de la dirección (ordenanza Minder).',
    },
    comparables: {
      criterio: 'Los cuatro competidores con negocio parecido y PER disponible: Symrise y Kerry (del informe de Viscofan del 6-oct-2026 de este repositorio) [D4], IFF (15,5-17,5x; usamos 16,5x) [D5] y DSM-Firmenich (20,9x) [D6]. Ninguno tiene el margen, la cuota ni la caja libre de Givaudan.',
      comentario: 'La mediana del PER de los próximos 12 meses es de 18,8x frente a ≈30x de Givaudan: una prima del 60 % que el mercado lleva décadas pagando por el líder con el margen y la conversión de caja más altos del sector. Por comparables Givaudan valdría 2.135-2.594 CHF, muy por debajo del precio; por eso pesan solo un 20 %. Sirven de suelo para el escenario bajista, no de objetivo.',
    },
    multiplos_historicos: {
      comentario: 'El PER al cierre de cada año (BPA publicado) fue de 46,6x en 2020 y 54,2x en 2021, con tipos cero; bajó a 30,6x en 2022, subió a 36,1x en 2023 y 33,7x en 2024 y cayó a 27,1x en 2025, el mínimo de la serie [D2]. El ZKB da una media de diez años de 35,7x sobre el BPA ajustado [D8]. Hoy cotiza a ≈29,5x nuestro BPA de 2027e: por debajo de la media de 2022-2025 (31,9x) y muy por encima de los comparables. La acción cayó de ≈4.790 CHF a fin de 2021 a ≈3.130 a fin de 2025 y en 2026 fue de ≈2.940 en abril [D12] a 3.714 tras las ventas de nueve meses [D1].',
    },
    consenso: {
      guidance: 'Sin guía anual cuantificada. Objetivos 2026-2030: crecimiento comparable medio del 4-6 % y caja libre ajustada de más del 12 % de las ventas [A13]. Para el 2S26, la empresa espera mejora secuencial en Taste & Wellbeing, impulso fuerte en Fragrance & Beauty e inflación de costes de un dígito bajo [A12]. Próxima cita: resultados anuales a finales de enero de 2027 (fecha exacta sin verificar).',
      revisiones: 'Antes de las ventas de nueve meses, el consenso del AWP esperaba 5.783 M de ventas y un 4,7 % comparable en el 3T; salieron 5.891 M y un +5,2 % en nueve meses [D13, A8]. BPA de MarketScreener: 115,3 CHF (2026e), 126,1 (2027e) y 133,4 (2028e) [D2]. Objetivo medio de 19 analistas ≈3.461 CHF en julio (de 2.800 a 4.500) [D7]; el ZKB da 3.968 de valor razonable, JPMorgan subió a 3.800 (neutral) y la prensa cita 3.850 tras los nueve meses [D8, D9, D14]. Tras el dato es probable que los objetivos suban.',
    },
    sentimiento: {
      lectura: 'Sentimiento mejorando: de dividido en verano (margen y caja libre del semestre, avisos de analistas) a positivo tras los nueve meses, cuando Givaudan fue el mejor valor del STOXX 600 [E1, E3, E6]. Los particulares ven calidad a un PER bajo para su historia; los escépticos, que la prima frente a los rivales sigue siendo grande. No hemos podido leer Reddit, Stocktwits ni el foro de cash.ch; la lectura se apoya en portales de particulares y en la prensa [E2, E4, E5].',
    },
    sector: {
      regulacion: 'Lo que más pesa son las investigaciones de competencia abiertas en 2023 por la Comisión Europea, el Departamento de Justicia de EE. UU., la CMA británica y la COMCO suiza sobre posibles acuerdos entre los cuatro grandes de fragancias; ya hay acuerdos de litigios en los no recurrentes de 2026 [A6]. Las normas de ingredientes (REACH, IFRA) suben el coste de entrada y favorecen a los grandes.',
      tendencias: 'La perfumería fina crece a doble dígito (+18,3 % en 2025 y +13,5 % en el 3T26 en Givaudan) por la «premiumización» y los mercados emergentes, mientras los sabores para alimentación crecen poco en EE. UU. y Europa [A1, A9, A8]. El mercado total crece un 3-4 % anual según IAL e IMARC [B1, B2].',
    },
    competencia: {
      amenazas: 'Ningún rival amenaza la posición: dsm-firmenich está en plena integración y separando negocios, IFF vende activos para reducir deuda y Symrise es más pequeña [B4, D5]. La amenaza real es regulatoria (las investigaciones de competencia) y de mezcla: si la perfumería fina se enfría tras dos años de doble dígito, el crecimiento volvería al 3-4 %.',
    },
  },

  dcf_justificacion: {
    crecimiento: '2026e fijo en +2,5 % en francos (nueve meses +2,6 %) [A8]. Después, un 3,5 % anual en 2027-2030 y bajada hasta el 1 %: volumen +3 % y precio +1,5 % (el plan de crecimiento comparable del 4-6 %) menos ≈1 punto de divisa [A13]. Es más que el 3,1 % anual en francos de 2019-2025 (que incluía compras) y menos que el consenso (7.893 y 8.248 M en 2027-2028e) [A15, D2]. La primera versión, con un 4,5 %, suponía casi sin efecto divisa; la rebajamos tras la prueba de sostenibilidad.',
    margenes: 'Margen EBITDA del 23,8 % en 2026e (ajustado del 1S26: 24,3 %, con parte de los no recurrentes como gasto habitual) [A6], subiendo al 24,5 % en 2030e: el nivel comparable de 2024-2025 (24,2-24,5 %) [A1]. No suponemos la mejora del plan 2030 más allá de eso. Cada punto de margen vale ≈180 CHF por acción (estimación propia con el DCF).',
    inversion: 'Capex del 4,2 % de las ventas en 2026-27e (la empresa invierte más en 2026) y del 3,9 % después, frente al 3,8 % de 2024-2025 [A1, A6]. Circulante del 21,6 % de las ventas (clientes de diciembre de 2025) [A11, P1]. La amortización (4,9 %) incluye la de intangibles comprados y por eso supera al capex.',
    wacc: 'Todo en francos. Tasa libre del 0,54 % (bono de la Confederación a 10 años, 8-oct-2026) [D10]; beta de 0,75 (estimación propia: defensiva de consumo; no hemos podido leer la de la acción), prima de mercado del 5,5 % y 1 punto adicional, como en el informe de Roche, porque los flujos están en divisas y el bono suizo es anormalmente bajo. Coste de la deuda del 2 % antes de impuestos y un 12 % de deuda. WACC del 5,19 %. Con la prima implícita del mercado (4,2 %) [D11], el WACC baja al 4,33 % y el DCF sube a 4.515 CHF: la valoración depende mucho de la tasa.',
    terminal: 'Crecimiento a perpetuidad del 1,0 % en francos: inflación suiza esperada de ≈0,5-1 % sin crecimiento real en francos, por debajo de la tasa libre más medio punto; un terminal del 2 % sería incoherente con el bono al 0,54 %. El valor terminal pesa un 70 % y el múltiplo implícito es de 17,2x el EBITDA, por encima del de salida de contraste (15x) y de los comparables (≈12x) [D4].',
  },

  puente_comentarios: {
    '2026e': 'Nueve meses: +5,2 % comparable (volumen ≈3,5 % y precio ≈1,5 %) y −2,6 puntos de divisa [A8].',
    '2027e': 'Plan 2026-2030 (4-6 % comparable): volumen +3 %, precio +1,5 %, divisa −1 [A13].',
    '2028e': 'Igual que 2027e: perfumería fina y emergentes compensan la alimentación de EE. UU. [A9].',
    '2029e': 'Crecimiento de crucero dentro del plan [A13].',
    '2030e': 'Último año del plan; cuota estable en ≈21 % [B1].',
  },
  veredicto: 'En parte',
  sostenibilidad_justificacion: 'En parte, tras rebajar el base. La prueba de cuota pasa: con el mercado de IAL (43.070 M USD en 2025, +4,2 %; ≈34.500 M CHF) Givaudan tiene ≈21 % y la proyección lo deja en ≈21 % en 2030e [B1]. El poder de precios y los costes de cambio sostienen el volumen. La reinversión no limita: el negocio necesita poco capital y el ROIC orgánico supera el 30 %. Lo que no cuadraba era el crecimiento en francos: la versión inicial (4,5 % anual) era más alta que el 3,1 % anual de 2019-2025, que además incluía compras. Rebajamos el base a un 3,5 % en 2027-2030 (crecimiento medio del 2,7 % en diez años), suponiendo ≈1 punto anual de divisa; el DCF bajó de 3.729 a 3.482 CHF. Queda «En parte» porque el crecimiento depende de una divisa que no controlamos.',
  dcf_lectura: 'El DCF da 3.481,66 CHF por acción, un 6,3 % por debajo del precio, con un WACC del 5,19 % y un valor terminal que pesa el 70 %. El DCF inverso dice que a 3.714 CHF el mercado descuenta un crecimiento del 3,6 % anual de 2027 a 2035 (nuestro base, 2,7 %) o un margen EBITDA del 25,7 % (el nuestro, 24,5 %): es decir, que Givaudan cumpla el centro de su plan sin pérdida por divisa, o que mejore un punto el margen. No es exigente para el líder del sector, pero tampoco deja margen de seguridad: el precio solo rinde un 5,0 % anual. Con la prima implícita del mercado (WACC del 4,33 %), el DCF sube a 4.515 CHF y el valor objetivo a 4.046,65 (+9,0 %): la conclusión depende de la tasa de descuento más que de las cifras.',
  narrativas: {
    Bajista: 'La perfumería fina se normaliza tras dos años de doble dígito, la alimentación de EE. UU. sigue cayendo y el franco se aprecia: crecimiento de ≈1,5 % en francos y margen del 23 %, como 2025 publicado. Es lo que pasó en 2022-2023 con los costes.',
    Base: 'Plan 2026-2030 cumplido en moneda local (4-6 %) con ≈1 punto de divisa en contra: ventas +3,5 % en francos hasta 2030 y margen EBITDA del 24,5 %.',
    Alcista: 'Perfumería fina y emergentes mantienen el crecimiento en el 6 % comparable, la divisa es neutra y el margen sube al 25,5 %.',
  },
  escenarios_comentario: 'El DCF da 2.514,48 CHF en el bajista (−32,3 %), 3.481,66 en el base (−6,3 %) y 4.092,51 en el alcista (+10,2 %). Asimetría negativa a largo plazo: con un WACC del 5,2 % y un terminal del 1 %, pequeños cambios de crecimiento mueven mucho el valor. El valor ponderado de los escenarios es de 3.392,58 CHF.',
  suma_partes_comentario: 'No aplica: las dos divisiones comparten clientes, laboratorios y compras, y no hay cotizados puros de cada una que den un múltiplo más fiable que el del grupo.',
  valoracion_comentario: 'El DCF pesa un 50 %: negocio estable, con caja previsible. Los escenarios, un 30 %, y los comparables, un 20 %, porque cotizan con un descuento estructural frente al líder. El valor objetivo es de 3.233,97 CHF (−12,9 %). Los comparables (2.135-2.594 CHF) tiran hacia abajo; con la prima implícita del mercado, el objetivo sube a 4.046,65 CHF. El precio está en la parte alta del rango razonable, no fuera de él.',
  rentabilidad_comentario: 'El ROIC de 2025 es del 14,2 %: NOPAT de 1.174 M sobre un capital invertido de 8.246 M (patrimonio de 4.568 M más deuda neta de 3.678 M, con todo el fondo de comercio de las compras) [A10, A1]. Supera en 9 puntos el WACC del 5,19 %. Sin el fondo de comercio de las compras, el ROIC orgánico pasa del 30 %. El ROE de ≈23 % (beneficio de 1.071 M sobre 4.568 M de patrimonio) refleja algo de apalancamiento. El ROIC incremental de 2021-2025 sale bajo porque la divisa recortó las ventas en francos mientras el capital crecía con las compras de 2021.',
  diferencia_consenso: 'Nuestro base (3.896,95 CHF) queda un 12,6 % por encima del objetivo medio de los analistas (3.461 CHF, 19 analistas, julio) [D7], pero en línea con los objetivos más recientes (JPMorgan 3.800, ZKB 3.968, prensa 3.850) [D9, D8, D14]. Nuestro BPA de 2028e (132,1 CHF) coincide casi con el del consenso (133,4) [D2]: la diferencia es de fecha del consenso, no de cifras.',
  objetivo12m_comentario: 'El objetivo a 12 meses (3.880,86 CHF, +6,4 % con el dividendo) queda un 20 % por encima del valor intrínseco (3.233,97 CHF). La distancia es el múltiplo: la regla común toma el PER actual (29,5x), por debajo de la media de 2022-2025, mientras el DCF con un bono suizo al 0,54 % y una prima adicional de 1 punto da menos. Con la prima implícita del mercado, el valor intrínseco subiría a 4.046,65 CHF, por encima del objetivo a 12 meses: la dispersión la explica la tasa, no el negocio.',
  oj: {
    Bajista: 'Ventas de 7.890 M en 2028e (+1,5 % anual) y margen EBITDA del 22,7 %: EBIT de 1.404 M, −150 M de resultado financiero, impuesto del 15 % y 9,226 M de acciones: BPA de 115,6 CHF.',
    Base: 'Ventas de 8.204 M y margen EBITDA del 24,2 % en 2028e: EBITDA de 1.985 M, amortización del 4,9 % (402 M), EBIT de 1.583 M, −150 M de resultado financiero (deuda neta de ≈4.000 M al ≈3 %), impuesto del 15 % y 9,226 M de acciones: BPA de 132,1 CHF.',
    Alcista: 'Ventas de 8.444 M (+5 % anual) y margen del 25,2 %: EBIT de 1.714 M; BPA de 144,1 CHF.',
  },

  catalizadores: {
    items: [
      { fecha: 'Finales de enero de 2027', evento: 'Resultados de 2026', efecto: 'Margen del segundo semestre y caja libre: si el margen ajustado vuelve al 24,5 % y la caja libre al 12 %, el mercado premia', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-2027', evento: 'Cierre de las investigaciones de competencia', efecto: 'Un acuerdo global acotado quitaría incertidumbre; una multa europea grande restaría', probabilidad: 'Media', sentido: '+/−' },
      { fecha: 'Abril de 2027', evento: 'Ventas del 1T27', efecto: 'Confirmación de la recuperación de Taste & Wellbeing', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027', evento: 'Primera estrategia del nuevo primer ejecutivo', efecto: 'Prioridades de margen y de compras', probabilidad: 'Media', sentido: '+/−' },
    ],
    confianza: 'Media',
  },

  riesgos: {
    items: [
      { riesgo: 'Se enfría la perfumería fina', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−14 % a 12 meses (bajista: 3.132,76 CHF)', mitigante: 'Cartera diversificada en consumo y alimentación', senal: 'Crecimiento de Fragrance & Beauty por debajo del 4 % en un semestre' },
      { riesgo: 'Multa o acuerdos por las investigaciones de competencia', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−3 a −8 % (una multa de 1.000-2.500 M)', mitigante: 'Balance con deuda de 2,1x el EBITDA', senal: 'Pliego de cargos de la Comisión Europea' },
      { riesgo: 'Apreciación del franco', tipo: 'Divisa', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−5 % por cada 2 puntos menos de crecimiento en francos', mitigante: 'Costes repartidos por el mundo', senal: 'Crecimiento en francos por debajo del 2 % con el comparable al 5 %' },
      { riesgo: 'Subida de tipos en francos', tipo: 'Valoración', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−10 a −15 % por cada medio punto de WACC', mitigante: 'Negocio defensivo con caja estable', senal: 'Bono de la Confederación por encima del 1 %' },
      { riesgo: 'Cambio de primer ejecutivo', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'El anterior preside el consejo', senal: 'Salidas en la dirección o un cambio de plan' },
    ],
    premortem: 'Es octubre de 2029 y la acción vale 2.800 CHF. La perfumería fina, que creció a doble dígito en 2024-2026, volvió al 3 % cuando los grandes grupos de lujo recortaron lanzamientos; la alimentación de EE. UU. siguió cayendo por los nuevos fármacos contra la obesidad y las marcas blancas, y el franco subió otro 10 %. El crecimiento en francos se quedó en el 1-2 % y la Comisión Europea impuso una multa de más de 1.000 M. El mercado dejó de pagar 30 veces y bajó al 25x de un químico de calidad. La señal que lo habría anticipado: dos semestres seguidos con Fragrance & Beauty por debajo del 4 %.',
    confianza: 'Media',
  },

  preguntas: {
    items: [
      { tema: 'Margen', pregunta: '¿Qué parte de los 103 M de no recurrentes del 1S26 se repetirá en 2027?', por_que: 'Separa el margen publicado del ajustado (23,4 % frente a 24,2 % en 2025).' },
      { tema: 'Competencia', pregunta: '¿Qué provisión tiene dotada por las investigaciones de competencia y en qué plazo espera cerrarlas?', por_que: 'Es el mayor pasivo contingente.' },
      { tema: 'Crecimiento', pregunta: '¿Cuánto del +13,5 % de la perfumería en el 3T es reposición de existencias de los clientes?', por_que: 'Decide si el ritmo es repetible.' },
      { tema: 'Caja', pregunta: '¿Por qué la caja libre del 1S26 fue negativa y cuándo vuelve al 12 %?', por_que: 'Es el objetivo del plan 2030.' },
      { tema: 'Divisa', pregunta: '¿Qué efecto divisa espera en 2027 con el franco actual?', por_que: 'Es la diferencia entre nuestro base y el plan en moneda local.' },
    ],
    confianza: 'Media',
  },

  fuentes: [
    { id: 1, titulo: '2025 Half year results / Financial summary (existencias de 1.425 M a dic-24). Extracto de búsqueda', editor: 'Givaudan SA', tipo: 'Primaria', fecha: '2025-07-22', url: 'https://www.givaudan.com/specials/file/giv-2025-hy-financial-summary.pdf' },
  ],
  huecos: [],
};
