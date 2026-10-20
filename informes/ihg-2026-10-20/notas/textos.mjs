// Textos del analista (IHG, corte 2026-10-20). Citas con la letra de la nota ([A3] = fuente 3 de A.json; [P1] propia).
export default {
  limitaciones: 'Cifras en millones de USD, ejercicio natural. La cuenta va en la base de «segmentos reportables» de IHG: sin los ingresos y costes del Fondo del Sistema (marketing, reservas y fidelidad que pagan los hoteles y que IHG gasta en su nombre, sin margen a lo largo del tiempo), sin los costes reembolsados por los hoteles gestionados y sin excepcionales; es la base de la guía, del BPA ajustado y del consenso [A1, A3]. El balance y los flujos son los NIIF del 20-F (XBRL de la SEC) [A8], con los activos y pasivos de contratos fuera del circulante porque mezclan los ingresos diferidos de la fidelidad del Fondo [A3]. La acción cotiza en Londres en USD desde el 2-ene-2026 [D5]; la historia de precios es la del ADR de NYSE (1:1, en USD), porque Yahoo convierte la historia de Londres en GBp al cambio de hoy [D1]. Precio: cierre del 19-oct-2026 en Londres (167,75 USD); la sesión del 20-oct estaba abierta al hacer el análisis (167,45-167,55 USD a las 10:43 UTC [D4]) y la decisión se comprueba con el precio del día en las pruebas de robustez. El PER actual de la regla usa el BPA de los próximos 12 meses (2,4 meses de 2026e y 9,6 de 2027e), la misma base que la historia. Avance del 3T el 22-oct-2026, dos días después del corte [D17]. Calificaciones ESG sin comprobar. Una acción ≈ 150 EUR (1,1215 USD por EUR [P1]).',
  controles_explicados: [
    { control: 'ROIC del motor', explicacion: 'El ROIC del motor (165 % en 2025, 235 % en 2024) no significa nada: el capital invertido contable (patrimonio + deuda − caja) es de solo 557 M porque el patrimonio es negativo (−2.978 M a 30-jun-2026) por 3.750 M de recompras y dividendos extraordinarios desde 2022 [A2, A1]. El ROIC a mano sobre el capital operativo del activo (fondo de comercio e intangibles 1.155 + inmovilizado 148 + derechos de uso 269 + activos de contratos con propietarios, el dinero clave, 798 + costes de contratos 108 + circulante 162 ≈ 2.640 M) con el NOPAT de 2025 (923 M) da un ≈ 35 %: ROIC − WACC ≈ +25 puntos [A1, A3].' },
    { control: 'Transacciones sin múltiplo', explicacion: 'Las compras del sector son de marcas sin hoteles (Ruby, Six Senses, Radisson Américas, Apple Leisure) y ninguna publicó su múltiplo de EBITDA: se dan los importes como contexto y pesan 0 en la síntesis [D8-D11].' },
    { control: 'Comparables', explicacion: 'La mediana de 14,6 veces mezcla dos grupos: Marriott, Hilton e Hyatt (29,7-35,5 veces), con el mismo modelo de comisiones, y grupos con más inmuebles, más gama económica o más China (12,7-17,1 veces). Pesan un 10 % y la regla a 12 meses no los usa para el base [D4].' },
  ],
  huecos: [],
  secciones: {
    negocio: {
      descripcion: 'IHG es el cuarto grupo hotelero del mundo por habitaciones: ≈ 7.100 hoteles y 1,05 M de habitaciones en más de cien países bajo 21 marcas, de la gama media (Holiday Inn Express, con ≈ 3.300 hoteles, Holiday Inn, avid, Garner) a las estancias largas (Staybridge, Candlewood, Atwell), la gama alta (Crowne Plaza, voco, Hotel Indigo, Kimpton, Ruby) y el lujo (InterContinental, Regent, Six Senses, Vignette) [A1, B1]. No es dueña de los hoteles: el 73 % de las habitaciones son franquicias y el 27 % los gestiona para sus propietarios; menos del 1 % es propio o arrendado [A3]. Su cliente directo es el propietario del hotel, al que vende marca, reservas, fidelidad (IHG One Rewards, más de 160 M de socios), tecnología y compras; el huésped paga al hotel. EE. UU. y Canadá son la mitad de la red y Américas el 66 % del resultado regional; tiene 348.000 habitaciones en cartera, el 33 % del sistema actual [A2].',
      como_gana_dinero: 'IHG cobra comisiones recurrentes: la franquicia paga un porcentaje de los ingresos por habitaciones del hotel, y la gestión una comisión base sobre las ventas más un incentivo sobre el beneficio del hotel [A3]. Se suman tasas de tecnología y servicios, las comisiones de las tarjetas de crédito de marca compartida y la venta de puntos (segmento Central, que pasó de −66 a +36 M de resultado en 2025) [A1]. Los ingresos crecen con la red neta (+4,5-5 % al año) y el RevPAR; los costes del negocio de comisiones crecen un 1-3 %, de ahí un margen de comisiones del 64,8 % que sube 100-150 pb al año [A1, A2]. Apalancamiento operativo alto y estacionalidad suave (el 2T y el 3T son los más fuertes). Marketing, reservas y fidelidad se pagan con el Fondo del Sistema, que se financia con tasas de los hoteles y no da margen a IHG a lo largo del tiempo [A3].',
    },
    historia: {
      resumen: 'IHG nace en 2003 de la división de Six Continents (la antigua cervecera Bass) en dos empresas: los hoteles (IHG) y los pubs (Mitchells & Butlers) [A3]. Bass había comprado Holiday Inn (fundada en 1952 en Memphis) en 1988-1990 e InterContinental en 1998. Desde 2003 IHG vendió casi todos sus hoteles para quedarse con las marcas, la franquicia y la gestión: hoy menos del 1 % de sus habitaciones es propio o arrendado [A3]. Compró marcas en vez de edificios: Kimpton (2015), Regent (2018), Six Senses (2019) y Ruby (2025), y creó otras (avid, voco, Garner, Vignette) [A3, A1]. La pandemia hundió el resultado un 75 % en 2020; desde 2022 el modelo de comisiones, con recompras de 500-950 M al año, ha llevado el BPA ajustado de 2,82 USD (2022) a 5,01 (2025) [A1, A5]. Elie Maalouf es consejero delegado desde julio de 2023 y la acción cotiza en USD desde enero de 2026 [C1, D5].',
      hitos: [
        { anio: '1952', hito: 'Kemmons Wilson abre el primer Holiday Inn en Memphis (EE. UU.).' },
        { anio: '1988-1998', hito: 'Bass compra Holiday Inn (1988-1990) e InterContinental (1998); nace Holiday Inn Express (1991).' },
        { anio: '2003', hito: 'Six Continents se divide: IHG sale a bolsa en Londres con los hoteles y Mitchells & Butlers con los pubs.' },
        { anio: '2003-2015', hito: 'Venta de casi todos los hoteles propios: IHG pasa a vivir de comisiones de franquicia y gestión.' },
        { anio: '2015-2019', hito: 'Compra de Kimpton, Regent (51 %) y Six Senses (300 M USD); lanzamiento de avid y voco [A3].' },
        { anio: '2020', hito: 'Pandemia: ingresos de segmentos −52 % y resultado −75 %; se suspende el dividendo [A5].' },
        { anio: '2023-2024', hito: 'Elie Maalouf consejero delegado; algoritmo de crecimiento con BPA +12-15 % anual; lanzamiento de Garner [C1, A7].' },
        { anio: '2025-2026', hito: 'Compra de Ruby; BPA ajustado de 5,01 USD (+16 %); la acción pasa a cotizar en USD (2-ene-2026) [A1, D5].' },
      ],
      confianza: 'Media',
    },
    rentabilidad: {
      comentario: 'El ROIC del motor (165 % en 2025) no sirve: el capital invertido contable es de solo 557 M porque las recompras y los dividendos extraordinarios dejaron el patrimonio en −2.978 M [A2]. La medida exigente, sobre el capital operativo del activo (fondo de comercio e intangibles, inmovilizado, derechos de uso, dinero clave pagado a propietarios, costes de contratos y circulante: ≈ 2.640 M) y con el NOPAT de 2025 (923 M), da un ≈ 35 % frente a un WACC del 9,8 %: ≈ +25 puntos [A1, A3]. Lo explica el modelo de comisiones: IHG cobra un porcentaje de los ingresos de ≈ 7.100 hoteles que construyen y pagan otros, con un margen de comisiones del 64,8 % [A1]. Tendencia: el resultado de segmentos subió de 828 M (2022) a 1.265 M (2025) mientras la inversión neta anual seguía en 185-253 M, así que el rendimiento del capital nuevo es muy alto; el riesgo es el dinero clave, que crece (83 M solo en el 1S26) y que todos los grupos pagan cada vez más para firmar hoteles [A2, A9].',
      confianza: 'Media',
    },
    esg: {
      calificaciones: [],
      materialidad: 'Lo material para IHG es lo que afecta a los hoteles de sus propietarios y a la marca: (1) emisiones y energía de ≈ 7.100 hoteles que no controla (objetivos de reducción por habitación y estándares de marca que encarecen la obra para el propietario) [A3]; (2) seguridad de los huéspedes y trata de personas en hoteles franquiciados, un riesgo de demandas para todas las marcas en EE. UU. [A3]; y (3) ciberseguridad y datos de más de 160 M de socios de IHG One Rewards, que es el activo que la protege de las agencias y de los agentes de IA [A2]. El efecto en las cifras es indirecto: costes de los propietarios, reputación y litigios, no consumo propio.',
      controversias: 'Ciberataque de septiembre de 2022 que dejó sin servicio las reservas y las aplicaciones durante días. Política de remuneración aprobada con solo el 69,51 % a favor en la junta de 2025 [C3]; remuneración del consejero delegado de 13,87 M USD en 2025 [C1]. Demandas en EE. UU. contra varias marcas hoteleras por trata de personas en hoteles franquiciados, sin cifras relevantes para IHG en sus cuentas [A3]. Calificaciones de MSCI, Sustainalytics o CDP no comprobadas en fuente primaria.',
      confianza: 'Baja',
    },
  },
  parches: [],
  huecos_resueltos: [],
  dcf_justificacion: {
    crecimiento: '2026e (+7,0 %, fijo) es el consenso (2.642 M [D2]) y lo que da el 1S26 (+6,8 %) con un RevPAR de EE. UU. más flojo en el 2S tras el Mundial [A2]. Después, el crecimiento baja del 6,0 % al 3,0 % en 2033e: la red neta crece hoy un 4,5-5 % (cartera del 33 % del sistema, la mitad en obra) y el RevPAR un 1-2 % real, como el PIB nominal de viajes [A2, B8]. El histórico 2018-2025 (+3,6 % anual) está deprimido por la pandemia; 2022-2025 creció un 10 % anual con la recuperación [A1]. El consenso de 2027e y 2028e (+5,9 % y +5,2 % [D2, D3]) está en línea con el base.',
    margenes: 'Margen EBITDA del 54,0 % en 2025 (resultado de segmentos + amortización); sube al 55,7 % en 2026e (consenso 1.471 M [D2]) y al 60,5 % desde 2031e. El algoritmo de 2024 promete +100-150 pb al año de margen de comisiones, y se ha cumplido (59,3 % en 2023, 64,8 % en 2025, 65,9 % en el 1S26) porque los costes del negocio de comisiones crecen un 1-3 % frente a ingresos +6-7 % [A1, A2, C8]. Paramos la mejora en 2031e porque la tasa de bajas, el dinero clave y la presión de los propietarios ponen techo: Hilton, con el mismo modelo, está en márgenes parecidos [B4].',
    inversion: 'Inversión del 7,5 % de los ingresos (7,0 % desde 2029e) que incluye el dinero clave pagado a propietarios para firmar hoteles (en NIIF va en el flujo operativo y no en el capex), el inmovilizado y software y los pagos de arrendamientos: la guía es de 200-250 M al año y la inversión neta de 2025 fue de 185 M (7,5 %) [A1, A10]. Amortización del 2,7 % (67 M en 2025). Circulante del 6,5 % de los ingresos, el 6,6 % de 2025 sin los saldos de contratos del Fondo del Sistema [A8]. Tipo del 27 %, la guía de 26-27 % [A2].',
    wacc: 'Tasa libre del 5,15 % (bono del Tesoro a 10 años, 19-oct-2026 [D12]), porque las cuentas, el precio y la deuda están en USD. Beta de 1,05: la mensual a cinco años frente al MSCI ACWI es de 1,21 y la semanal a dos años de 0,78 [D1]; tomamos una intermedia, la de un negocio cíclico de viajes con apalancamiento financiero moderado. Prima de mercado del 5,5 %. Coste de la deuda del 5,6 % (bonos en EUR y GBP con cobertura a USD, el último de 850 M EUR en septiembre [D14]) y peso de la deuda del 16 % a valor de mercado (≈ 4.500 M de deuda y arrendamientos frente a ≈ 24.900 M de capitalización). WACC del 9,83 %; con la prima implícita de Damodaran (4,20 % [D13]) sería del 8,7 %.',
    terminal: 'Crecimiento a perpetuidad del 2,5 %: inflación esperada de EE. UU. (≈ 2-2,5 %) más poco crecimiento real, por debajo de la tasa libre menos medio punto (4,65 %). Un negocio de marcas con foso podría crecer algo más que el PIB nominal durante décadas por las conversiones de hoteles independientes a marcas, pero el valor terminal ya pesa el 62 %; preferimos no pagar ese crecimiento dos veces. Múltiplo de salida de referencia de 18 veces el EBITDA, por debajo del actual (20,8 veces) y en el rango de Marriott e Hilton.',
  },
  puente_comentarios: {
    '2026e': 'Red neta +4,5 % (5,0 % interanual a junio [A2]), RevPAR ≈ +2,5 % en el año (+4,1 % en el 1S26 con el Mundial; 2S más flojo en EE. UU. y Oriente Medio [A2, A9]).',
    '2027e': 'Red neta +4,5 % con la cartera de 348.000 habitaciones (33 % del sistema) [A2] y RevPAR +1,5 %, sin el empuje del Mundial.',
    '2028e': 'Red neta +4,0 % y RevPAR +1,3 %: el crecimiento converge hacia el de la industria (≈ 4 % nominal [B8]).',
    '2029e': 'Red neta +3,8 % y RevPAR +1,2 %.',
    '2030e': 'Red neta +3,5 % y RevPAR +1,0 %.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Sí. El crecimiento proyectado (4,8 % anual) está por debajo de lo que IHG ha demostrado fuera de la pandemia (red neta +4-5 % y RevPAR +1-3 % al año) y casi no necesita capital: la reinversión acumulada es el 12 % del NOPAT. La prueba en un negocio de activos ligeros es el poder de precios y la cuota: IHG pasa del 5,5 % a ≈ 6,4 % de las habitaciones mundiales en 2033e si su red crece un 4 % y la industria un 2 % (estimación propia con [B1]), coherente con el 79 % de marca en la cartera mundial frente al 57 % del parque actual; el foso (fidelidad del 67 % de las noches, contratos de 15-30 años) es amplio [B1, A2].',
  dcf_lectura: 'El DCF da 78,03 USD por acción, un 53,5 % por debajo del precio, con un WACC del 9,83 % y un valor terminal que pesa el 62 %. El DCF inverso explica la distancia: para justificar 167,75 USD harían falta ingresos +16,2 % anual en 2027e-2033e (el base es del 4,5 %) o, con nuestro crecimiento, ningún margen razonable; la rentabilidad anual implícita en el precio es del 6,5 %, apenas 1,4 puntos sobre el bono de EE. UU. (5,15 %) y por debajo del WACC (9,8 %) y de lo que pide el mercado (8,7 %). Con la prima implícita del mercado el valor sube a 94,46 USD, aún un 44 % por debajo. Es exigente frente a la historia: con el mismo bono, IHG cotiza a un rendimiento del flujo libre del 3,8 %. El mercado paga la calidad (ROIC del ≈ 35 %, foso amplio, BPA +15 % al año con recompras) como si los tipos fueran a bajar o el crecimiento fuera a durar mucho más que nuestra proyección. Es el mismo patrón que Marriott e Hilton (29-33 veces): todo el sector cotiza por encima de su valor con estos tipos.',
  narrativas: {
    Bajista: 'Recesión de viajes en EE. UU. en 2027 (como en 2009 o en el 3T-4T25, pero más larga): el RevPAR cae un 10-15 %, los ingresos de segmentos un 8 % y el margen cuatro puntos; después la red crece un punto y medio menos por más bajas y menos firmas, y los agentes de IA cobran comisión por las reservas. WACC +0,5 puntos y terminal del 2 %.',
    Base: 'Red neta +4-4,5 % y RevPAR +1-2,5 % al año; margen de comisiones +100-150 pb al año hasta 2030 y después estable; recompras al ritmo de la caja libre (no incluidas en el DCF, que valora la empresa).',
    Alcista: 'EE. UU. vuelve a RevPAR +3-4 % y las conversiones aceleran la red al 6 % (como Hilton): un punto y medio más de crecimiento y de margen al año.',
  },
  escenarios_comentario: 'Los tres escenarios quedan por debajo del precio: el alcista vale 90,12 USD (−46 %) y el bajista 46,92 (−72 %). No hay asimetría a favor: incluso con un crecimiento como el de Hilton y el margen de comisiones subiendo hasta el 62 %, el flujo libre descontado al 9,8 % no llega al precio. El valor depende sobre todo del WACC y del terminal (cada medio punto de WACC mueve el valor ≈ 10 %), no del ciclo: por eso la decisión a 12 meses la da el múltiplo y no el DCF.',
  casos_12m: {
    Bajista: 'Recesión de viajes en 2027: ingresos −8 % y margen cuatro puntos menor; en 2028e se recupera algo (ingresos +3,8 %, margen del 56,5 %): BPA de 5,72 USD, un 20 % por debajo del base, y el PER vuelve a su mínimo de cinco años (15,5 veces, el de diciembre de 2022, con el turismo aún saliendo de la pandemia).',
    Base: 'Ingresos +7,0 % en 2026e, +6,0 % en 2027e y +5,3 % en 2028e, margen EBITDA del 58,5 %, interés de 205 M, tipo del 27 % y 146,9 M de acciones sin recompras nuevas: BPA de 7,15 USD en 2028e (+12,6 % anual desde los 5,01 de 2025).',
    Alcista: 'Un punto y medio más de crecimiento y de margen al año (RevPAR de EE. UU. +3-4 %, conversiones): BPA de 7,61 USD; la regla no le da más PER que al base porque la historia (mediana de 23,1 veces) y los comparables (14,6) están por debajo del PER del base (24,8).',
  },
  diferencia_consenso: 'Nuestro BPA de 2026e (5,68 USD) queda un 2 % por debajo del consenso (5,79) y el de 2028e (7,15) un 3 % por debajo (7,34 [D3]): la diferencia es casi entera de las recompras, que el consenso incluye (≈ 900 M al año, un 3-4 % menos de acciones cada año) y nosotros no, salvo lo que queda de la de 2026 [D2]. En ventas y margen coincidimos. Nuestro precio base a 12 meses (177,32 USD) está un 7,7 % por encima del objetivo medio de los analistas (164,67; horquilla 120-195) [D4].',
  objetivo_comentario: 'El objetivo a 12 meses (158,01 USD ponderado; 177,32 en el base) está más de un 100 % por encima del valor intrínseco (77,45 USD): el mercado valora IHG por el múltiplo del beneficio y el DCF no lo justifica con un bono al 5,15 %. Cerrar esa distancia no depende de un catalizador con fecha sino de los tipos de interés (un bono al 4 % sube el DCF ≈ 25 %) o de años de crecimiento por encima del previsto. La tesis no es a 12 meses: el base da +6,8 % con el dividendo y el ponderado −4,7 %, porque el bajista (una recesión de viajes) devolvería el PER al mínimo de 2022.',
  valoracion_comentario: 'Pesos: DCF 45 %, escenarios 45 % y comparables 10 %. El DCF es el método más limpio para un negocio de comisiones con poca inversión y flujos previsibles, y los escenarios recogen el ciclo de viajes. Los comparables pesan poco porque la muestra está partida: Marriott, Hilton e Hyatt cotizan a 30-35 veces y el resto, con inmuebles, gama económica o China, a 13-17; la mediana (14,6) infravalora a IHG y la de los tres grandes la sobrevaloraría. Las transacciones no tienen múltiplos publicados y pesan 0. La dispersión es enorme: los métodos intrínsecos dan 47-108 USD y el mercado y los analistas 120-195. La diferencia es la tasa de descuento: la acción solo tiene sentido a este precio con una rentabilidad exigida del 6,5 %.',
  catalizadores: {
    items: [
      { fecha: '2026-10-22', evento: 'Avance del 3T 2026', efecto: 'RevPAR de EE. UU. tras el Mundial, red neta, firmas y ritmo de la recompra; posible cambio en la frase de cumplir el consenso', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-02', evento: 'Resultados de 2026 y recompra de 2027', efecto: 'Tamaño de la recompra (950 M en 2026) y algoritmo de crecimiento; dividendo +10 %', probabilidad: 'Alta', sentido: '+' },
      { fecha: '2027-05', evento: 'Junta de accionistas y avance del 1T 2027', efecto: 'Voto de remuneración (69,5 % en 2025) y primer RevPAR sin el Mundial', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-08', evento: 'Resultados del 1S 2027', efecto: 'Comparación difícil con el 2T26 del Mundial en EE. UU.', probabilidad: 'Alta', sentido: '−' },
      { fecha: '2026-2027', evento: 'Acuerdos de reserva con agentes de IA (Google, OpenAI)', efecto: 'Si la reserva sigue siendo directa y con fidelidad, reduce el riesgo de intermediación', probabilidad: 'Media', sentido: '+/−' },
      { fecha: 'Continuo', evento: 'Tipos de interés de EE. UU.', efecto: 'El valor depende mucho de la tasa libre: −1 punto sube el DCF ≈ 25 %', probabilidad: 'Media', sentido: '+/−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Múltiplo: cotiza a 26,7 veces el BPA de los próximos 12 meses frente a una mediana adelantada de cinco años de 23,1 y un mínimo de 15,5', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−13 % si vuelve a la mediana; −42 % al mínimo', mitigante: 'BPA +12-15 % al año con recompras', senal: 'Rebajas del consenso de BPA de 2027' },
      { riesgo: 'Ciclo de viajes en EE. UU. (la mitad del sistema y el 66 % del resultado regional): recesión, menos viajes internacionales a EE. UU., fin del efecto Mundial', tipo: 'Ciclo', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−20 a −45 % (bajista de la regla)', mitigante: 'Ingresos sobre las ventas de los hoteles, no sobre su beneficio, en la franquicia', senal: 'RevPAR de EE. UU. negativo dos trimestres seguidos' },
      { riesgo: 'Agentes de IA que se conviertan en el nuevo intermediario de la reserva', tipo: 'Tecnología', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 % a 3-5 años', mitigante: 'Fidelidad del 67 % de las noches; acuerdos para que la reserva siga siendo directa', senal: 'Bajada del canal directo digital (26 % de los ingresos por habitaciones)' },
      { riesgo: 'Gran China y Oriente Medio: demanda débil, geopolítica', tipo: 'Geopolítico', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−3 a −5 %', mitigante: 'Gran China es el 7 % de los ingresos de segmentos; Oriente Medio menos', senal: 'RevPAR de Gran China negativo; conflicto en el Golfo' },
      { riesgo: 'Competencia por firmar propietarios: más dinero clave y comisiones más bajas', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Firmas +8 % en el 1S26; marcas de conversión', senal: 'Dinero clave por encima de 250 M al año o bajas por encima del 2 %' },
      { riesgo: 'Apalancamiento: patrimonio negativo y deuda neta de 2,6 veces el EBITDA para seguir recomprando', tipo: 'Financiero', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 % en una crisis', mitigante: 'Grado de inversión y vencimientos escalonados', senal: 'Rebaja de la calificación o recompra suspendida' },
      { riesgo: 'Airbnb y alquileres de corta estancia en ocio', tipo: 'Competencia', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: '−2 %', mitigante: 'IHG está en negocios y gama media de carretera, donde Airbnb pesa poco', senal: 'Airbnb ganando cuota en viaje de negocios' },
    ],
    premortem: 'Octubre de 2029: la acción ha perdido un 40 %. La economía de EE. UU. entró en recesión a mediados de 2027 y el RevPAR del país cayó un 10 % en un año, justo después del pico del Mundial de 2026. El BPA de 2027 bajó un 10 % y el mercado dejó de pagar 26 veces: el PER volvió a 16, como en 2022. Al mismo tiempo, Google y OpenAI llevaban dos años vendiendo hoteles dentro de sus agentes: la mitad de los huéspedes jóvenes reservaba sin entrar en la aplicación de IHG, y los propietarios empezaron a preguntar para qué pagaban la comisión de marca si la reserva venía del agente. IHG respondió con más dinero clave y rebajas de tasas para retener hoteles; el margen de comisiones dejó de subir. Con el patrimonio negativo y la deuda en 3 veces el EBITDA, la empresa frenó la recompra y el BPA dejó de crecer por esa vía. Los indicadores que lo habrían anticipado: el RevPAR de EE. UU. del 3T26 y 4T26, la caída del canal directo digital y las bajas de hoteles por encima del 2 %.',
    ia: {
      exposicion: 'Media', sentido: 'Mixto', efecto_valor: '−5 a −10 % a 3-5 años (con la oportunidad de costes, ≈ −5 %)',
      comentario: 'La IA toca la parte más valiosa de IHG: la distribución. Hoy el sistema de IHG aporta el 83 % de los ingresos por habitaciones de sus hoteles y la fidelidad el 67 % de las noches (73 % en EE. UU.) [A2, B2]; el canal digital directo es el 26 % [B10]. Si los agentes de Google u OpenAI se convierten en el sitio donde se elige y se reserva, pueden cobrar como una agencia en línea (15-20 %) y debilitar el vínculo con la fidelidad, que es lo que justifica la comisión de marca. IHG ya está en el piloto de reservas con agentes de Google, en el que la reserva sigue siendo directa, y tiene un complemento para ChatGPT [B10, B2]. A favor: la IA baja costes de atención y operaciones (los costes del negocio de comisiones apenas crecen) y una marca con datos de 160 M de socios es útil a los agentes. Señal de alarma: caída del canal directo digital o de la penetración de la fidelidad.',
    },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'RevPAR de EE. UU.', pregunta: '¿Cuánto del +5,2 % del 2T26 en EE. UU. fue el Mundial y qué RevPAR esperan para 2027 sin él?', por_que: 'EE. UU. es el 66 % del resultado regional; el bajista de la regla es una recesión de viajes allí.' },
      { tema: 'Agentes de IA', pregunta: '¿En qué condiciones económicas (comisión, puntos de fidelidad, datos del cliente) se reserva a través de los agentes de Google y de ChatGPT, y qué parte de las reservas viene ya de ahí?', por_que: 'Si el agente cobra como una agencia, el margen de los propietarios y el valor de la marca bajan.' },
      { tema: 'Dinero clave', pregunta: '¿Cuánto dinero clave se pagó por habitación firmada en 2025-2026 frente a 2019, y qué retorno exigen?', por_que: 'Es la inversión que sostiene la red; si sube más que las comisiones, el ROIC baja.' },
      { tema: 'Tarjeta de crédito', pregunta: '¿Cuánto aportan las comisiones de las tarjetas de crédito de marca compartida al resultado de Central y cuánto crecen tras la renovación de los acuerdos?', por_que: 'Explican buena parte del salto de Central de −66 a +36 M en 2025.' },
      { tema: 'Apalancamiento', pregunta: '¿Hasta qué deuda neta sobre EBITDA mantendrían la recompra en una recesión como la de 2020?', por_que: 'Las recompras son ≈ 3-4 puntos del crecimiento del BPA al año.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener, con convicción media; no es compra. El objetivo a 12 meses es de 158,01 USD (nuestro BPA de 2028e × el PER de la regla común, ponderado 25/50/25): −4,7 % con el dividendo, y +6,8 % en el caso base. No llega al 15 % ponderado ni al 12 % del base, y el valor intrínseco (77,45 USD) está un 54 % por debajo del precio de 167,75 USD (cierre del 19-oct-2026). La convicción es media porque las dos reglas (la de 12 meses y la del valor intrínseco) apuntan lejos de una compra y el negocio es de calidad; la convicción bajaría con un RevPAR de EE. UU. negativo tras el Mundial y subiría con una caída del precio hacia el valor real o con tipos más bajos.

**El negocio.** IHG pone marca, reservas y fidelidad a ≈ 7.100 hoteles de otros (Holiday Inn Express, Holiday Inn, Crowne Plaza, InterContinental, Kimpton, Six Senses) y cobra una comisión sobre lo que facturan: menos del 1 % de las habitaciones son suyas [A3]. Ingresos de segmentos de 2.468 M USD en 2025 con un margen de comisiones del 64,8 % [A1].

**Finanzas.** El BPA ajustado pasó de 2,82 USD en 2022 a 5,01 en 2025 (+21 % anual) con ingresos +10 % anual, margen al alza y recompras que bajaron las acciones un 16 % desde 2021 [A1, A5]. En el 1S26, BPA +13 % y RevPAR +4,1 % [A2]. Patrimonio negativo (−2.978 M) por las recompras y deuda neta de 2,6 veces el EBITDA [A2]. ROIC a mano del ≈ 35 % frente a un WACC del 9,8 %: pasa la calidad (≈ +25 puntos) y el crecimiento previsto es sostenible.

**Equipo y gobierno.** Elie Maalouf, consejero delegado desde 2023, ha cumplido el algoritmo de crecimiento de 2024 [C8]. Consejo mayoritariamente independiente; la política de remuneración solo tuvo un 69,5 % a favor en 2025 [C3].

**Valoración.** El DCF da 78,03 USD (−53,5 %) y el DCF inverso pide ingresos +16 % anual: el precio solo cuadra con una rentabilidad exigida del 6,5 %, con el bono de EE. UU. al 5,15 %. Con la prima del mercado (4,2 %) el DCF sube a 94,46 USD. La regla a 12 meses baja el PER de 26,7 veces a 24,8 (mitad de camino hacia la mediana de cinco años, 23,1) y el bajista lo lleva al mínimo de 15,5. Los analistas esperan 164,67 USD de media (16; 120-195) [D4].

**Riesgos y catalizadores.** El mayor riesgo es el ciclo de viajes en EE. UU. tras el Mundial unido a un múltiplo alto; después, los agentes de IA como intermediarios de la reserva (exposición media, −5 a −10 % del valor a 3-5 años), China y Oriente Medio y la competencia por firmar hoteles. Próximo dato: avance del 3T el 22-oct-2026 [D17].

**Qué cambiaría la decisión.** Comprar exigiría a la vez una rentabilidad ponderada del 15 % y un precio por debajo del valor intrínseco: hoy, por debajo de 77,45 USD. Mantener entre 77,45 y 177,68 USD; vender por encima de 177,68. Una bajada fuerte de los tipos de EE. UU. o un crecimiento de la red por encima del 6 % sostenido mejorarían el valor real.`,
    tesis: 'IHG es una de las mejores empresas del sector: cobra comisiones sobre las ventas de ≈ 7.100 hoteles que pagan otros, con un ROIC del ≈ 35 %, un foso amplio (fidelidad del 67 % de las noches, contratos de 15-30 años) y un BPA que crece un 12-15 % al año con recompras. Pero a 26,7 veces el BPA de los próximos 12 meses el precio ya descuenta esa calidad: el DCF vale la mitad con el bono de EE. UU. al 5,15 % y la regla a 12 meses no da rentabilidad suficiente con un bajista de recesión de viajes.',
    vision_diferencial: {
      mercado_descuenta: 'Que IHG seguirá subiendo el BPA un 12-15 % al año (red +4-5 %, RevPAR +2-3 %, margen +100-150 pb y recompras de ≈ 900 M al año) y que el PER de 25-27 veces es el normal para un negocio de comisiones; los analistas esperan 164,67 USD, un 2 % menos que hoy.',
      nuestra_vision: 'Coincidimos en el negocio y en el BPA (−2/−3 % por no contar recompras nuevas) y discrepamos en el precio: con la tasa libre al 5,15 % el flujo libre de IHG (3,8 % sobre la capitalización) no compensa el riesgo de un ciclo de viajes que ya ha restado el 75 % del resultado una vez (2020).',
      por_que: 'La historia adelantada muestra que IHG cotizó a 15,5 veces en 2022 y a 19-23 veces en 2017-2023; el PER actual es el más alto de la serie sin pandemia. La IA añade un riesgo nuevo justo en la distribución, que es la razón de ser de la marca.',
    },
    a_favor: [
      '**Modelo de comisiones**: menos del 1 % de las habitaciones son propias; margen de comisiones del 64,8 %.',
      '**ROIC del ≈ 35 %**: ≈ 25 puntos sobre el WACC con inversión neta de ≈ 200 M al año.',
      '**Crecimiento visible**: cartera de 348.000 habitaciones (33 % del sistema), la mitad en obra.',
      '**Fidelidad**: más de 160 M de socios y el 67 % de las noches.',
      '**Recompras y dividendo**: 950 M de recompra en 2026 y dividendo +10 % al año.',
    ],
    en_contra: [
      '**Caro**: 26,7 veces el BPA adelantado frente a una mediana de 23,1 y un mínimo de 15,5.',
      '**Valor real a la mitad**: DCF de 78 USD con el bono al 5,15 %.',
      '**Ciclo**: EE. UU. es el 66 % del resultado regional; en 2020 el resultado cayó un 75 %.',
      '**IA en la reserva**: los agentes pueden convertirse en un nuevo intermediario.',
      '**Patrimonio negativo**: −2.978 M; menos colchón en una recesión.',
    ],
    que_vigilar: 'La tesis de mantener depende de que el RevPAR de EE. UU. siga positivo tras el Mundial y de que la red crezca un 4-5 % con el margen subiendo. La señal en contra sería un RevPAR de EE. UU. negativo dos trimestres seguidos, una caída del canal directo digital o una recompra menor en 2027.',
    cambiaria_recomendacion: [
      'Precio por debajo de 77,45 USD: Comprar (ponderada ≥ 15 %, base ≥ 12 % y valor intrínseco por encima).',
      'Precio entre 77,45 y 177,68 USD: Mantener.',
      'Precio por encima de 177,68 USD: Vender o reducir (ponderada ≤ −10 %).',
      'Bono de EE. UU. a 10 años por debajo del 4 %: revisar el valor intrínseco al alza (≈ +25 %).',
      'RevPAR de EE. UU. negativo dos trimestres o caída del canal directo: revisar a la baja.',
    ],
    kpis_seguimiento: [
      { kpi: 'RevPAR de EE. UU.', nivel_actual: '+5,2 % (2T26)', umbral_alerta: '< 0 % dos trimestres', por_que: 'Mueve el 66 % del resultado regional.' },
      { kpi: 'Crecimiento neto de la red', nivel_actual: '+5,0 % (jun-26)', umbral_alerta: '< 4 %', por_que: 'Es el volumen del puente de ingresos.' },
      { kpi: 'Margen de comisiones', nivel_actual: '65,9 % (1S26)', umbral_alerta: 'Sin subida en el año', por_que: 'Sostiene el margen del DCF.' },
      { kpi: 'Penetración de la fidelidad', nivel_actual: '≈ 67 % de las noches', umbral_alerta: '< 64 %', por_que: 'Mide el riesgo de intermediación por IA.' },
      { kpi: 'BPA ajustado', nivel_actual: '5,79 USD consenso 2026', umbral_alerta: '< 5,60 USD', por_que: 'Base del objetivo a 12 meses.' },
    ],
  },
};
