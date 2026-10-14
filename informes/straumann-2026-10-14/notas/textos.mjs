// Textos del analista (Straumann, corte 2026-10-14). Citas con la letra de la nota.
export default {
  limitaciones: 'Análisis hecho desde la nube con la red limitada a la búsqueda web: la web de la empresa, Yahoo y los proveedores de datos no se pudieron abrir, así que las cifras salen de los extractos de búsqueda de las notas de prensa y presentaciones de Straumann, de Stock Analysis, Stockopedia y Fintel y de la prensa financiera suiza (AWP), cruzadas cuando fue posible. La confianza es menor que en un análisis normal: el balance solo tiene activo total, patrimonio, caja e intangibles, y la deuda solo el total de 2025 (509 M con arrendamientos). **Precio**: no se encontró un cierre fechado del 13-oct-2026; se usa 92,00 CHF, la cotización citada el 3-oct-2026 [D8] (las páginas sin fecha daban 88,7-98,0 CHF) [D17]. **Cuenta en base core** (la de la empresa: sin amortización de intangibles de compras, deterioros ni reestructuración), que es la que sigue el mercado y la del objetivo a 12 meses; el beneficio IFRS de 2025 fue ≈356 M frente a 478 M core [A1, A2, A5]. 2021-2022 incluyen DrSmile; 2023 en adelante, sin ella. Acción desdoblada 1:10 en 2022: precios y BPA anteriores divididos por diez [A11]. El circulante no se pudo reconstruir: la inversión en circulante se suma al capex del DCF (≈1,2 puntos de las ventas).',

  controles_explicados: [
    { control: 'Rendimiento del capital nuevo', explicacion: 'El ROIC incremental histórico (5,8 %) sale de un capital invertido incompleto (sin deuda en 2021-2024) y mezcla la pérdida de DrSmile; no es representativo. La prueba se hace a mano en dcf.sostenibilidad.' },
    { control: 'Circulante', explicacion: 'Sin existencias, clientes ni proveedores publicados en las fuentes accesibles; la inversión en circulante va dentro del capex (≈1,2 puntos de las ventas).' },
    { control: 'Objetivo 12 m frente al consenso', explicacion: 'Nuestro base (100,39) queda un 12,5 % por debajo del objetivo medio (114,75): explicado en diferencia_consenso.' },
  ],

  parches: [],
  huecos_resueltos: [],

  secciones: {
    financieros: {
      comentario: 'Las ventas pasaron de 2.022 M en 2021 a 2.605 M en 2025 (con DrSmile fuera desde 2023): el crecimiento orgánico fue del 15,7 % en 2022, del 13,7 % en 2024 y del 8,9 % en 2025, pero el franco fuerte lo recorta mucho en la cifra publicada (+4,1 % en 2025 y +2,3 % en el 1S26, frente a +7,8 % orgánico) [A1, A3, A9, A10]. El margen EBIT core bajó del 27,4 % de 2021 al 25,2 % de 2025; a tipos constantes fue del 26,5 %, así que casi toda la erosión es divisa (costes en francos, ventas en euros, dólares, reales y yuanes) [A1, A10]. En 2026 la guía pide +140-170 puntos básicos a tipos constantes; el 1S26 dio un 26,9 % a tipos constantes y un 25,7 % publicado [A3, A15]. El BPA core apenas se ha movido en cinco años (2,85 en 2021, 3,00 en 2025): el crecimiento orgánico se lo ha comido la divisa y el ciclo de inversión [A9, A10, A11].',
      ajustes: 'Usamos las cifras core de la empresa. La diferencia con el IFRS es la amortización de intangibles de compras (PPA), deterioros y reestructuración: ≈120 M en 2025 (BPA IFRS 2,23 frente a 3,00 core) y ≈43 M en 2024 (2,87 frente a 3,14) [A1, A2, A5, A9]. En 2023 la pérdida de DrSmile (−202 M) va como operación interrumpida [A5]. La amortización de PPA es recurrente mientras haya intangibles comprados, pero no es caja; la reestructuración de 2025 sí se ha repetido dos años y es la parte que más sobrestima el core.',
    },
    trimestres: {
      ultima_presentacion: 'En el 2T26 (19-ago) el crecimiento orgánico aceleró al 8,5 % (7,1 % en el 1T26), con ventas de 707,0 M; el margen EBIT core del semestre fue del 25,7 % publicado y del 26,9 % a tipos constantes, y el beneficio core subió un 15,7 % hasta 262 M [A3, A4, A14]. La dirección confirmó la guía elevada en junio (+140-170 pb de margen a tipos constantes), repartida por igual entre semestres, y anunció que Christopher Norbye sustituirá a Guillaume Daniellot como primer ejecutivo el 1-dic-2026 [A18]. Frente a febrero, el discurso cambió de «prudencia por aranceles» a «aranceles menores de lo previsto» [A15]. Las preguntas se centraron en China (APAC creció solo un 0,5 % en el 1T26 por el retraso de la segunda licitación centralizada) y en la divisa; sin China el grupo habría crecido ≈10 % [A16]. La caja libre del semestre fue de 169 M (12,2 % de las ventas, +49 %) [A3, A12].',
    },
    balance: {
      otros_pasivos: 'No se han podido leer las notas del informe anual: sin datos de provisiones, garantías, pagos aplazados de compras ni opciones de venta de minoritarios. El grupo no tiene rating público ni covenants conocidos. La deuda total de 509 M de 2025 incluye arrendamientos según Stock Analysis [A7]; Simply Wall St daba ≈231 M de deuda financiera a mediados de 2025, lo que dejaría ≈280 M de arrendamientos (estimación sin verificar).',
      comentario: 'El balance es de caja neta casi nula: 504 M de caja frente a ≈509 M de deuda con arrendamientos al cierre de 2025, y 381 M de caja en junio de 2026 tras pagar el dividendo [A2, A7, A19]. El patrimonio subió de 1.500 M (2021) a 2.165 M (2025) y el activo total, de 2.968 M a 3.758 M [A8]. La caja bajó de 880 M en 2021 a 375 M en 2024 por el ciclo de capex y las compras de distribuidores; en 2025 se recupera. No hay presión financiera: el riesgo del balance es nulo frente al de la cuenta.',
    },
    flujos: {
      comentario: 'El flujo operativo ha sido estable (415-560 M), pero el capex subió del 5,2 % de las ventas en 2021 al 8,6 % en 2025 (223 M con intangibles), y la caja libre de la empresa fue de 290 M en 2025 (11,1 % de las ventas): una conversión de ≈61 % del beneficio core [A2, A6]. En el 1S26 la caja libre subió un 49 % a 169 M por menos capex [A3, A19]. La dirección habla de un «ciclo alto de capex» (capacidad en implantes y alineadores y digital) que ya baja; estimación propia: el mantenimiento ronda la amortización (≈5,4 % de las ventas) y el resto (≈3 puntos) es crecimiento [A2].',
    },
    calidad: {
      comentario: 'La calidad contable es buena pero la base core exige vigilancia: la distancia con el IFRS pasó de ≈43 M en 2024 a ≈120 M en 2025 por deterioros y reestructuración [A1, A2, A9]. El Altman Z (6,80) sitúa a la empresa lejos de cualquier tensión; el Piotroski (5) es mediocre porque la cuenta y el balance llegan incompletos, y el Beneish no se puede calcular sin circulante. No hay señales de capitalización agresiva ni de cambios de criterio en las fuentes leídas; la venta de DrSmile limpió un negocio con pérdidas. Lo que más pesa es la divisa, que no es contable.',
    },
    capital: {
      comentario: 'La asignación de capital es correcta pero sin brillo en la última década: el ROIC sigue alto (25,6 % en 2025), pero el BPA core apenas ha subido desde 2021 (2,85 a 3,00) por la divisa, el ciclo de capex y la aventura de DrSmile, que costó 202 M de pérdida en 2023 [A5, A9, A10]. No hay recompras y el dividendo crece despacio (payout ≈33 %) [A1]. La caja libre acumulada se ha dedicado a capex y a comprar distribuidores; con caja neta nula, la empresa no tiene margen para recompras grandes sin deuda.',
    },
    consenso: {},
    multiplos_historicos: {
      comentario: 'El PER core de los últimos 12 meses (28,6x) está en el mínimo de su historia limpia (2022: 34,9x; 2023: 49,1x; 2025: 31,2x) [D9, D10]. Excluimos 2021 (68x, burbuja pospandemia) y no hay precio de cierre de 2024. El descuento se explica por el BPA estancado cuatro años y por la entrada de competidores de valor en China; no por un deterioro de la rentabilidad, que sigue por encima del 25 %. 2019 (44,8x sobre un BPA core de 2,12) confirma que la media larga (≈40x) es de otra época de tipos [A13].',
    },
    comparables: {
      criterio: 'Fabricantes europeos, australianos y estadounidenses de tecnología médica con consumibles recurrentes, pago parcial del paciente y márgenes altos: Sonova, Demant y Cochlear (audición), Coloplast y Smith & Nephew (consumibles y ortopedia), Align (el único rival dental cotizado con datos homogéneos), Edwards (implantes de nicho) y Alcon (oftalmología). Envista y Dentsply Sirona no se incluyen porque no se obtuvieron sus cifras; Osstem ya no cotiza [D11, D12, D13, D14].',
      comentario: 'Straumann cotiza a 26,2x el PER de los próximos 12 meses y 18,7x el EV/EBITDA de los últimos 12, por encima de la mediana de los comparables (PER ≈23x) y muy por encima de Align (15x), que es su competidor más directo pero crece menos [D14]. La prima se justifica en parte por el ROIC (25,6 %) y el crecimiento orgánico del 8-9 %, por encima de casi todos, pero el crecimiento publicado en francos (≈3 % en 2026) no la sostiene. El valor implícito por comparables (PER NTM) es de 56,74-89,59 CHF, por debajo del precio.',
    },
  },

  etapa2_justificacion: 'El implante dental está poco penetrado fuera de Europa y EE. UU. (China multiplicó volúmenes tras la licitación de 2023, y Latinoamérica y Asia crecen a doble dígito), y el mercado crecería un 6,9-8,3 % anual hasta 2034-2035 [B11, B13]. Straumann es el primero con >32 % de cuota y su ROIC (25,6 %) supera al WACC en más de 18 puntos: crecer crea valor. Cinco años de transición desde el 5,0 % de 2032e hasta el 1,0 % terminal recogen que la ventaja (marca clínica, costes de cambio, ecosistema digital) dura más que la proyección explícita [B11].',

  dcf_justificacion: {
    crecimiento: '2026e queda fijo en +3,0 % en francos: 7,8 % orgánico en el 1S26 y guía de un dígito alto, menos ≈5 puntos de divisa (2,3 % publicado en el 1S26) [A3, A15]. De 2027e a 2029e, 7,0-6,5 %: orgánico del 7-8 % (la mitad baja de la historia y en línea con el mercado) sin efecto divisa; luego baja al 5 % en 2032e. El consenso de ingresos de 2028e (3.306 M) es un 7,6 % superior a nuestro 3.072 M: asume menos divisa [D3].',
    margenes: 'Margen EBITDA core del 30,8 % en 2026e (EBIT core ≈25,4 % publicado con la guía de +140-170 pb a tipos constantes y la divisa del 1S26) que sube al 33,0 % en 2031e por apalancamiento operativo y fin del ciclo de capex. Es el nivel de 2021 (EBIT core 27,4 %) con algo más de mezcla de valor [A3, A10].',
    inversion: 'Capex del 8,5 % de las ventas en 2026e-2027e, bajando al 7,0 % en 2032e; incluye ≈1,2 puntos de inversión en circulante, porque no se pudo reconstruir el circulante. Amortización del 5,4 % de las ventas (la core de 2025) [A2, A6].',
    wacc: 'Tasa libre del 0,54 % (bono suizo a 10 años del 8-oct-2026) [D15]; beta de 1,10 (dispositivos de pago privado, más cíclicos que la media del sector salud; no se pudo calcular con bolsa.mjs); prima de mercado del 5,5 % y prima adicional de 1 punto porque los flujos están en euros, dólares, reales y yuanes y el bono suizo es anormalmente bajo, igual que en Roche y Givaudan en este repositorio. Coste de la deuda del 2 % y peso del 3 %. WACC del 7,41 %; con la prima implícita del mercado (4,2 %), el 6,0 %.',
    terminal: 'Gordon al 1,0 %: crecimiento real bajo en francos con inflación suiza del ≈0,5-1 %. Queda por encima de la tasa libre menos medio punto, pero el bono suizo no refleja la inflación de las divisas en que se vende; con 0,5 % el valor baja ≈5 %. El múltiplo de salida implícito es coherente con la historia de la empresa.',
  },

  puente_comentarios: {
    '2026e': 'Volumen 5,8 % y precio 2,0 % (guía de crecimiento orgánico de un dígito alto: 7,8 % en el 1S26); divisa −4,8 puntos (1S26: −5,5) [A3].',
    '2027e': 'Volumen 5 % (mercado 6,9-8,3 %, China estabilizada tras la licitación) y precio 2 % (historia de subidas anuales en premium); sin efecto divisa [B11, B13].',
    '2028e': 'Igual que 2027e; ningún aumento de cuota.',
    '2029e': 'El volumen se modera al 4,5 % con el mercado.',
    '2030e': 'Volumen 4 % y precio 2 %: crecimiento por debajo del mercado previsto.',
  },

  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Sí. El crecimiento proyectado (5,7 % anual medio) es inferior al orgánico que la empresa ha logrado en cada uno de los últimos cinco años (8,9-15,7 %) y al del mercado de implantes (6,9-8,3 %), así que no exige ganar cuota (32 % hoy) [A1, B11]. La reinversión es pequeña (≈11 % del NOPAT con capex del 7-8,5 % de las ventas) y el motor no hace la prueba por «activos ligeros»; a mano: con un ROIC del 25,6 %, cada punto de crecimiento pide ≈4 % del NOPAT, y el resto lo pone el poder de precios demostrado (margen bruto ≈70 % estable y aranceles absorbidos en 2026) [B8, B9]. El riesgo no es de capacidad sino de precio en China.',

  dcf_lectura: 'El DCF da 75,15 CHF por acción (−18,3 % sobre 92,00), con un WACC del 7,41 % y un valor terminal del 55 %; la sensibilidad (WACC y crecimiento ± 0,5 puntos) va de 66,40 a 87,05 CHF, siempre por debajo del precio. El DCF inverso dice que el mercado descuenta un crecimiento del 9,3 % anual de 2027e a 2032e, frente al 6,2 % de nuestro caso base y al 6,9 % previsto para el mercado de implantes: exigente, porque supone recuperar el crecimiento de 2022-2024 y ganar cuota. La rentabilidad implícita en el precio es del 6,3 %, por debajo de nuestro WACC (7,41 %) y por encima de lo que pide hoy el mercado (6,0 %). Con la prima implícita del mercado el valor sube a 92,49 CHF: el precio es justo si se acepta el coste de capital del mercado de hoy, no el nuestro. La diferencia es de tasa más que de cifras.',

  narrativas: {
    Bajista: 'La segunda licitación china prima a los fabricantes locales y el franco sigue fuerte: el crecimiento cae 3 puntos al año y el margen 1,5 puntos, como en 2023-2025, cuando el BPA no creció [A9, B10].',
    Base: 'Crecimiento orgánico del 7-8 %, divisa neutra desde 2027 y margen EBITDA core hasta el 33 % con el fin del ciclo de capex.',
    Alcista: 'Norteamérica sigue al 7-8 %, China se estabiliza y la ortodoncia y el digital suman: 2 puntos más de crecimiento y 1 de margen.',
  },
  escenarios_comentario: 'El DCF da 53,18 CHF en el bajista (−42,2 %), 75,15 en el base y 88,96 en el alcista (−3,3 %): ni el alcista llega al precio con nuestro WACC. Con la prima del mercado el rango sube a 67,87-114,82. La asimetría del valor intrínseco es negativa; la del objetivo a 12 meses es favorable (3,04x) porque el PER actual ya está en mínimos de su historia.',

  valoracion_comentario: 'El DCF pesa un 50 %: es un negocio de caja estable con poca inversión. Los comparables, un 25 %, porque el sector cotiza por PER y Straumann lleva prima; los escenarios, el 25 % restante. No hay transacciones con múltiplo. Todos los métodos quedan por debajo del precio (valor objetivo de 75,97 CHF, −17,4 %); solo el DCF con la prima del mercado (92,49) y el objetivo medio de los analistas (114,75) lo superan. La dispersión dice que el precio paga el crecimiento de 2022-2024 y un coste de capital bajo.',

  bpa_just: {
    Bajista: 'Ventas 2028e de 2.902 M (−3 puntos al año en 2027-2028) y margen EBIT core del 25,3 %: EBIT de 734 M, conversión a beneficio neto core del 72,9 % (la de 2025: 478/656), 159,5 M de acciones sin recompras.',
    Base: 'Ventas 2028e de 3.072 M (7 % en 2027 y 2028) y margen EBIT core del 26,8 % (EBITDA 32,2 % menos amortización 5,4 %): EBIT de 823 M, conversión del 72,9 % como en 2025, beneficio core de 600 M y 159,5 M de acciones.',
    Alcista: 'Ventas 2028e de 3.188 M (+2 puntos) y margen EBIT core del 27,8 % (+1 punto): EBIT de 886 M, beneficio core de 646 M y 159,5 M de acciones.',
  },
  per_excluidos: 'PER core al cierre de cada año (precio ÷ BPA core): 2019 44,8x (95,04 ÷ 2,12); 2021 excluido (68,0x, burbuja pospandemia); 2022 34,9x (105,60 ÷ 3,03); 2023 49,1x (135,60 ÷ 2,76); 2024 sin precio de cierre verificado; 2025 31,2x (93,46 ÷ 3,00) [A10, A11, A13, D9, D10]. Mediana de cinco años con los disponibles: 34,9x; mínimo 31,2x; media larga (2019, 2022, 2023, 2025): 40,0x. Actual = 92,00 ÷ 3,44 (nuestro BPA core de 2027e) = 26,7x. Comparables: mediana del PER NTM 22,9x [D11-D14].',
  diferencia_consenso: 'Nuestro base (100,39 CHF) queda un 12,5 % por debajo del objetivo medio de los analistas (114,75; 81-153). Casi todo sale del BPA: 3,44 en 2027e y 3,76 en 2028e frente a 3,62 y 4,17 del consenso (−5 % y −10 %) [D3]. El consenso proyecta ventas de 3.306 M en 2028e frente a nuestros 3.072 M: supone menos divisa en contra; además nuestra conversión de EBIT a beneficio (72,9 %, la de 2025) no mejora. El múltiplo es parecido: 26,7x frente a ≈27-28x implícito en los objetivos.',
  objetivo12m_comentario: 'El objetivo a 12 meses (104,34 CHF ponderado; 100,39 el base) queda un 37 % por encima del valor intrínseco (75,97 CHF): el mercado paga por Straumann un coste de capital menor que el nuestro y lo seguirá haciendo mientras el BPA crezca al 10 % anual que proyectamos para 2026-2028. Para cerrar la distancia con el valor intrínseco haría falta una caída del PER hacia 20x, que solo se vio fuera de esta muestra, o una subida de tipos en francos. La tesis a 12 meses depende de que el BPA core crezca del 3,00 de 2025 al 3,76 de 2028e; el catalizador son los resultados anuales de febrero de 2027, con la guía de margen.',

  rentabilidad_comentario: 'Straumann crea mucho valor: el ROIC (NOPAT core entre capital invertido) es del 25,6 % en 2025 frente a un WACC del 7,41 %, más de 18 puntos de diferencia, aunque baja desde el 31,5 % de 2024 porque el capital invertido sube con el ciclo de capex y el NOPAT apenas crece. Lo mueve el margen (EBIT core del 25-27 %) más que la rotación (0,7 veces). El ROIC incremental que calcula el motor (5,8 %) no es representativo: el capital de 2021-2024 llega sin deuda y mezcla la pérdida de DrSmile. Frente a los comparables, solo Edwards y los audífonos premium se le acercan; Coloplast rinde un 11,9 % [D11].',

  catalizadores: {
    items: [
      { fecha: '28-oct-2026', evento: 'Ventas del 3T26', efecto: 'Confirmación del crecimiento orgánico del 7-9 % y de China', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '1-dic-2026', evento: 'Christopher Norbye, primer ejecutivo', efecto: 'Riesgo de cambio de prioridades o de revisión de objetivos a medio plazo', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Feb-2027', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Margen core tras +140-170 pb y primera guía del nuevo CEO', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-2027', evento: 'Segunda licitación centralizada de implantes en China (VBP)', efecto: 'Precio y cuota en China; preferencia por productos locales', probabilidad: 'Media', sentido: '−' },
      { fecha: 'Abr-2027', evento: 'Junta general', efecto: 'Dividendo (≈1,05 CHF) y votos de remuneración tras el bono de retención de 2026', probabilidad: 'Alta', sentido: '+/−' },
    ],
    confianza: 'Media',
  },

  riesgos: {
    items: [
      { riesgo: 'China: segunda licitación (VBP) que favorece a fabricantes locales', tipo: 'Regulatorio / competencia', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−10 % a −15 % (hacia el bajista)', mitigante: 'Producción local y Neodent en el segmento de valor', senal: 'Crecimiento de APAC por debajo del 3 % dos trimestres seguidos' },
      { riesgo: 'Franco fuerte', tipo: 'Divisa', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−5 % por cada 5 % de apreciación sostenida', mitigante: 'Costes en Brasil, China y EE. UU.', senal: 'Diferencia entre crecimiento orgánico y en francos > 5 puntos' },
      { riesgo: 'Relevo del primer ejecutivo y salida del fundador', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % a −10 % si cambia la guía', mitigante: 'Consejo con presidenta en el cargo y accionistas de referencia estables', senal: 'Revisión de los objetivos a medio plazo en febrero de 2027' },
      { riesgo: 'Consumo de EE. UU. y pago del bolsillo', tipo: 'Ciclo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Diversificación geográfica (EMEA ≈43 %)', senal: 'Norteamérica por debajo del 3 % orgánico' },
      { riesgo: 'Competencia de valor (coreanos y chinos) fuera de Asia', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % a −10 % por margen', mitigante: 'Neodent y Anthogyr en valor', senal: 'Margen bruto por debajo del 68 %' },
      { riesgo: 'Aranceles de EE. UU. sobre importaciones suizas', tipo: 'Regulatorio', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Producción fuera de Suiza; guía ya subida por aranceles menores', senal: 'Nueva subida arancelaria a Suiza' },
    ],
    premortem: 'Es octubre de 2029 y la acción ha perdido un 40 %. China celebró la segunda licitación a finales de 2026 y los fabricantes locales se quedaron con los lotes de mayor volumen; Straumann mantuvo el precio en premium y perdió cuota en el que había sido su motor de crecimiento. A la vez, el franco siguió fuerte y el nuevo primer ejecutivo, llegado en diciembre de 2026, rebajó en febrero de 2027 los objetivos a medio plazo para «recentrar» la cartera y anunció reestructuración. El BPA core, que ya llevaba cinco años plano, cayó a 2,8 CHF y el mercado, que pagaba 27x por una recuperación, pasó a pagar 20x, como a Align. La señal estaba en los trimestres: APAC por debajo del 3 % orgánico dos veces seguidas y la diferencia entre crecimiento orgánico y en francos por encima de los 5 puntos.',
    confianza: 'Media',
  },

  preguntas: {
    items: [
      { tema: 'China', pregunta: '¿Qué parte de las ventas de APAC depende de la segunda licitación y qué cuota de lotes espera con producción local?', por_que: 'Es el riesgo con más efecto en el valor (bajista −42 %).' },
      { tema: 'Divisa', pregunta: '¿Qué porcentaje de costes está en francos y qué cobertura natural queda tras las ampliaciones fuera de Suiza?', por_que: 'La divisa explica casi toda la erosión del margen publicado desde 2021.' },
      { tema: 'Sucesión', pregunta: '¿Mantendrá el nuevo CEO los objetivos de margen a medio plazo y por qué hizo falta un bono de retención?', por_que: 'Solo el 74 % del capital presente lo aprobó.' },
      { tema: 'Capex', pregunta: '¿Cuándo vuelve el capex al 6 % de las ventas y cuánto es mantenimiento?', por_que: 'La caja libre (11 % de las ventas) depende de ello.' },
      { tema: 'Core frente a IFRS', pregunta: '¿Qué parte de los ≈120 M de ajustes de 2025 es reestructuración que se repetirá?', por_que: 'El objetivo a 12 meses se hace sobre BPA core.' },
      { tema: 'Capital', pregunta: '¿Contempla recompras ahora que el PER está en mínimos de una década?', por_que: 'Con caja neta nula, una recompra pediría deuda.' },
    ],
    confianza: 'Media',
  },

  resumen: {
    recomendacion: 'Mantener',
    conviccion: 'Baja',
    justificacion_recomendacion: null,
    horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener con convicción baja. El objetivo a 12 meses es de 104,34 CHF (nuestro PER por nuestro BPA de 2028e), una rentabilidad ponderada del 14,5 % y del 10,2 % en el caso base, con dividendo; el valor intrínseco es de 75,97 CHF (−17,4 %) y el objetivo medio de los analistas, de 114,75 CHF. No llega a Comprar porque la base queda por debajo del 12 % y el valor intrínseco por debajo del precio de 92,00 CHF. La convicción es baja porque las reglas discrepan (Vender con nuestro WACC, Mantener con la prima del mercado) y la diferencia es de tasa de descuento, no de cifras; subiría si los resultados de febrero de 2027 confirman un margen core publicado por encima del 26 % y APAC vuelve a crecer.

**El negocio.** Straumann es el primer fabricante mundial de implantes dentales (>32 % de cuota) con un margen bruto del 70 % y un ROIC del 25,6 %, más de 18 puntos por encima del WACC (7,41 %) [B8, B11]. **Sostenibilidad: Sí**: el 5,7 % anual que proyectamos está por debajo del orgánico de cada uno de los últimos cinco años y del mercado (6,9-8,3 %), y no necesita ganar cuota. El problema no es el negocio sino que su BPA core apenas ha subido desde 2021 (2,85 a 3,00) [A10, A11].

**Finanzas.** El crecimiento orgánico fue del 8,9 % en 2025 y del 7,8 % en el 1S26, pero en francos solo del 4,1 % y del 2,3 %: la divisa resta ≈5 puntos y ≈1,2 de margen [A1, A3]. La caja libre fue de 290 M en 2025 (11,1 % de las ventas) por un capex alto del 8,6 %; la deuda neta es casi nula. El beneficio IFRS (≈356 M) queda ≈120 M por debajo del core [A2].

**Equipo y gobierno.** En 2026 coinciden la salida del fundador del consejo y el relevo del primer ejecutivo (Norbye desde el 1-dic); el bono de retención solo obtuvo un 74 % de votos [C3]. Sin accionista de control: los dos fundadores suman el 25,7 % [C4].

**Valoración.** El DCF da 75,15 CHF y el DCF inverso dice que el precio descuenta un crecimiento del 9,3 % anual de 2027e a 2032e, frente al 6,2 % de nuestro base: exigente. Con la prima implícita del mercado (4,2 %) el valor sube a 92,49 CHF, el precio. Los comparables cotizan a ≈23x frente a 26,2x de Straumann. El PER core está en mínimos de su historia limpia (28,6x frente a una mediana de 34,9x), y por eso el objetivo a 12 meses, que usa el PER actual de 26,7x, sí da rentabilidad: es apuesta por el crecimiento del BPA (≈10 % anual hasta 2028e), no por la expansión del múltiplo. Nuestro base queda un 12,5 % por debajo del consenso porque proyectamos menos ventas en francos.

**Riesgos y catalizadores.** El mayor riesgo es la segunda licitación de implantes en China, que puede favorecer a los locales (APAC creció un 0,5 % en el 1T26) [A16]; el segundo, el franco. Catalizadores: ventas del 3T26 el 28-oct, llegada de Norbye el 1-dic y resultados y guía en febrero de 2027. Los foros están divididos y no señalan un riesgo nuevo.

**Qué cambiaría la decisión.** Compraríamos por debajo de 75,97 CHF, donde el precio quedaría bajo el valor intrínseco y, con el objetivo de hoy fijo, la ponderada y la base superarían el 15 % y el 12 %; venderíamos por encima de 117,05 CHF. Pasaríamos a Comprar si el BPA core de 2026 supera 3,40 CHF con guía de margen al alza para 2027, y a Vender si APAC cae dos trimestres o el nuevo CEO rebaja los objetivos.`,
    tesis: 'Straumann es el líder mundial de implantes dentales, con un 32 % de cuota, un margen bruto del 70 % y un ROIC del 25,6 %; crece al 8-9 % orgánico en un mercado que lo hará al 7-8 % durante una década [B8, B11, A1]. Su foso (evidencia clínica, costes de cambio de los componentes y ecosistema digital) es amplio y estable.\n\nEl precio (92,00 CHF, 26,2x el BPA de los próximos 12 meses) descuenta un crecimiento del 9,3 % anual hasta 2032, más del que esperamos (6,2 %) y del previsto para el mercado; el DCF da 75,15 CHF con nuestro WACC y 92,49 CHF con la prima de riesgo que hoy pide el mercado.\n\nEl mercado acierta al pagar calidad, pero lleva cuatro años sin que el BPA crezca por la divisa, China y el capex. Para invertir hay que creer que el BPA core sube un 10 % anual hasta 2028 y que el franco deja de restar: entonces el PER actual basta para ganar un 10 % al año. No da margen de seguridad frente al valor intrínseco.',
    vision_diferencial: {
      mercado_descuenta: 'Que Straumann volverá a crecer al ritmo de 2022-2024 (≈9 % anual) y que su prima sobre los comparables se mantiene; los analistas, con un objetivo medio de 114,75 CHF, esperan un BPA de 4,17 CHF en 2028.',
      nuestra_vision: 'El negocio es igual de bueno, pero la divisa y China dejan el crecimiento en francos en el 6-7 % y el BPA de 2028e en 3,76 CHF; a nuestro coste de capital el valor es de 75,97 CHF.',
      por_que: 'Cuatro años de BPA plano con crecimiento orgánico alto demuestran que la divisa no es un efecto pasajero para una empresa con costes en francos; el consenso de ingresos ya ha bajado de 2.818 a 2.749 M para 2026 desde diciembre [D3].',
    },
    a_favor: [
      '**Líder con foso amplio**: >32 % de cuota mundial y margen bruto del 70 % [B8, B11].',
      '**ROIC del 25,6 %**, más de 18 puntos por encima del WACC.',
      '**PER en mínimos**: 28,6x los últimos 12 meses frente a una mediana histórica de 34,9x.',
      '**Guía de margen al alza**: +140-170 pb a tipos constantes en 2026, confirmada en agosto [A3, A15].',
      '**Balance sin deuda neta** y caja libre del 11-12 % de las ventas [A2, A3].',
    ],
    en_contra: [
      '**BPA core plano** desde 2021 (2,85 a 3,00 CHF) [A10, A11].',
      '**Valor intrínseco de 75,97 CHF**, un 17,4 % bajo el precio.',
      '**China**: APAC creció un 0,5 % en el 1T26 y la licitación puede favorecer a los locales [A16].',
      '**Divisa**: resta ≈5 puntos de crecimiento y ≈1,2 de margen [A3].',
      '**Doble relevo** (fundador y CEO) en 2026 con un bono de retención al 74 % de votos [C3].',
    ],
    que_vigilar: 'La tesis depende de que el BPA core crezca al 10 % anual hasta 2028e (de 3,00 a 3,76 CHF). La señal de que no se cumple sería un margen EBIT core publicado de 2026 por debajo del 25 %, APAC por debajo del 3 % orgánico dos trimestres seguidos o una rebaja de los objetivos a medio plazo del nuevo CEO en febrero de 2027.',
    cambiaria_recomendacion: [
      'Precio por debajo de 75,97 CHF: pasaríamos a Comprar (valor intrínseco ≥ precio; con el objetivo fijo, ponderada > 15 % y base > 12 %).',
      'Precio por encima de 117,05 CHF: Vender.',
      'BPA core de 2026 por encima de 3,40 CHF con guía de margen al alza para 2027: revisaríamos al alza la base.',
      'Crecimiento de APAC negativo en el 3T26 o en el 4T26: rebajaríamos a la mitad la probabilidad del alcista.',
    ],
    kpis_seguimiento: [
      { kpi: 'Crecimiento orgánico del grupo', nivel_actual: '8,5 % (2T26)', umbral_alerta: '< 6 %', por_que: 'Base del crecimiento del BPA.' },
      { kpi: 'Margen EBIT core publicado', nivel_actual: '25,7 % (1S26)', umbral_alerta: '< 25 % en 2026', por_que: 'Guía de +140-170 pb.' },
      { kpi: 'Crecimiento orgánico de APAC', nivel_actual: '0,5 % (1T26)', umbral_alerta: '< 0 % dos trimestres', por_que: 'Licitación china.' },
      { kpi: 'Diferencia orgánico − francos', nivel_actual: '5,5 puntos (1S26)', umbral_alerta: '> 6 puntos', por_que: 'Efecto divisa.' },
      { kpi: 'Caja libre sobre ventas', nivel_actual: '12,2 % (1S26)', umbral_alerta: '< 10 %', por_que: 'Fin del ciclo de capex.' },
    ],
    confianza: 'Baja',
  },

  fuentes: [],
  huecos: [
    { seccion: 'dcf', campo: 'beta propia de la acción', tipo: 'Complemento', intentos: '1) bolsa.mjs (sin red); 2) Yahoo y Stock Analysis (no abren); 3) WebSearch (sin beta fechada)', decision: 'Omitido' },
  ],
};
