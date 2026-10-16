// Textos del analista (TMX Group, corte 2026-10-16). Las cifras del motor se copian de calc tras el último cálculo.
export default {
  limitaciones: 'Línea cotizada: Bolsa de Toronto (X), la única. Cuentas 2023-2025 de los informes anuales auditados y del MD&A; 2021 y 2022, de las notas de resultados del 4T22 y del 4T21 (Canadá no tiene XBRL de SEDAR+ accesible y la web de inversores de TMX bloquea las descargas automáticas). BPA ajustado a la división de 5 por 1 de junio de 2023. El balance analítico excluye los saldos de compensación de CDCC y CDS y los fondos de los participantes, que se compensan entre sí. Segmentos solo para 2023-2025 (la segmentación cambió en 2023). Consenso de dos fuentes secundarias (Zonebourse para estimaciones y MarketBeat para objetivos). Sin registro de operaciones de directivos (SEDI no abre) ni sentimiento de foros (Stockhouse y Reddit bloquean el acceso).',
  controles_explicados: [
    { control: 'Regresión múltiplo-crecimiento explicativa', explicacion: 'Con ocho comparables de modelos distintos (bolsas con derivados, datos e índices, renta fija electrónica) el crecimiento no explica el múltiplo (R² 0,14); usamos la mediana.' },
    { control: 'Crecimiento del BPA base ≤ 25 % anual desde el último real', explicacion: 'El BPA del objetivo a 12 meses es ajustado (sin la amortización de intangibles de compras), la misma base que la historia del PER. Frente al BPA ajustado de 2025 (2,13 CAD) el de 2028e (3,10) crece un 13,3 % anual; frente al publicado (1,49) parece un 27,7 % porque el publicado de 2025 lleva 114 M de amortización de compras y 38,5 M de diferencias de cambio no monetarias.' },
  ],
  huecos: [],
  parches: [
    { ruta: 'financieros.ajustes', valor: 'Las cifras de la cuenta son las publicadas. TMX publica además un BPA ajustado que suma la amortización de intangibles de compras (114,4 M antes de impuestos en 2025), los costes de compras e integración (10,1 M), litigios (14,1 M), la reorganización de 2025 (12,0 M), el cargo del registro de auditoría consolidado de BOX (7,3 M), los ajustes de pagos contingentes (26,5 M) y las diferencias de cambio de la financiación interna (38,5 M): 2,13 CAD en 2025 frente a 1,49 publicados [A2]. Como partidas no recurrentes dentro del EBITDA solo se devuelven litigios, reorganización y el cargo de BOX (33,4 M en 2025; 26,6 M en los 12 meses a junio de 2026): los costes de compras se repiten cada año en un comprador en serie y se quedan dentro. El acuerdo judicial de 83,8 M del 1T26 está en «otros ingresos», fuera del EBITDA [A8]. El BPA ajustado solo se usa para la historia del PER y el objetivo a 12 meses.' },
  ],
  secciones: {
    rentabilidad: {
      comentario: 'TMX crea valor, pero poco sobre el capital que ha pagado: el ROIC es del 9,1 % en 2025 frente a un WACC del 7,52 % (+1,6 puntos), porque el capital invertido medio incluye 7.320 M de fondo de comercio e intangibles (el 111 % del capital, más que el propio capital neto por el circulante negativo) [A1]. El ROIC se ha movido entre el 7,8 % (2021) y el 9,8 % (2022) y sube desde 2023 (8,2 %, 8,7 % y 9,1 %) con las sinergias de VettaFi y BOX; el ROIC incremental de 2021-2025 es del 11,8 %, por encima del WACC. Lo que lo mueve es el margen (EBITDA del 55,4 % publicado en 2025), no la rotación (0,2 veces). Frente a la mediana de comparables (10,7 %) queda algo por debajo, en línea con ICE (8,6 %) y por encima de LSEG (6,5 %) [D6]. Sin el fondo de comercio, el rendimiento de los activos tangibles es de varias veces el WACC: el foso es real y la dirección lo ha pagado a precio de mercado.',
      confianza: 'Media',
    },
    capital: {
      comentario: 'La asignación del capital es buena en el negocio y exigente en el precio. Entre 2021 y 2025 el flujo libre acumulado (2.090 M, una conversión del 98 % del beneficio) pagó compras por 1.604 M, dividendos por 993 M y recompras por 239 M [A1]. Las compras grandes (BOX 2022, VettaFi 2024, RAFI y Cboe Australia y Canadá en 2026, y MEMX anunciada) llevan la empresa de bolsa canadiense a negocio global de datos, índices y derivados: el 51 % de los ingresos ya viene de fuera de Canadá. VettaFi y Trayport crecen a doble dígito y BOX ha subido el EBIT de derivados un 42 % en 2025 [A2]. El precio pagado es alto (RAFI a 12,9 veces el EBITDA y unos 28 veces el beneficio de MEMX implícito) y el ROIC apenas supera el WACC. El dividendo (40-50 % del BPA ajustado) sube cada año y las recompras de 2026 (151,2 M a 50,88 CAD) se hicieron un 6 % por debajo del precio actual [A8].',
    },
    bolsa: {
      comentario: 'La acción sube un 5,5 % en 2026 con dividendos frente al +15,9 % del índice canadiense (XIC) y el +20,2 % de las financieras canadienses (XFN), y un 9,9 % en doce meses frente al 21,3 % del índice [D1]. A largo plazo gana con holgura: 17,7 % anual en cinco años frente al 14,4 % y 18,7 % en diez frente al 12,6 %. Este año la frenaron dos caídas sin noticia propia: el 3-feb (−8,6 %), con la venta general de acciones de datos y software por el miedo a las herramientas de IA, y la de mayo-junio (−15,3 %), con el temor a más deuda por las compras; la recuperó en julio con el 2T26 [D1, D14, D15]. La beta frente al XIC es baja (0,41 semanal a cinco años), la volatilidad del 24,8 % y la caída máxima de cinco años del −22,8 %. Cotiza un 3 % por debajo de su máximo de 52 semanas (57,27 CAD).',
    },
    multiplos_historicos: {
      comentario: 'TMX cotiza con prima moderada frente a su propia historia: un EV/EBITDA de los últimos doce meses de 17,4 veces frente a una media de 15,1 al cierre de cada año desde 2021, y un PER de los últimos doce meses de 25,0 veces, igual a su media (que está inflada por el BPA publicado bajo de 2023-2025). En base adelantada y con BPA ajustado (precio de cierre entre el BPA ajustado del año siguiente), la mediana de cinco años es de 18,85 veces, el mínimo de 17,99 (2021) y la media de siete años de 19,22; hoy paga 19,5 veces nuestro BPA ajustado de 2027. La horquilla histórica es estrecha (17,9-21,3 veces) y el múltiplo ha subido en 2024-2025 con el giro hacia datos e índices, que el mercado paga más.',
    },
    comparables: {
      comentario: 'TMX cotiza a 22,5 veces el beneficio publicado de los próximos doce meses y 15,5 veces el EBITDA, en línea con la mediana de sus comparables (23,4 y 15,1 veces), con un margen EBITDA parecido (58,3 % frente a 59,6 %) y más crecimiento (12,3 % frente a 8,2 %), pero menos ROIC (9,1 % frente a 10,7 %) [D6]. Frente a Euronext, la bolsa de tamaño más parecido, es más cara (Euronext cotiza a 20,8 veces) y crece algo más; frente a ICE y Nasdaq, que también combinan bolsa y datos, cotiza a un PER parecido (21,6 y 24,3 veces). El tamaño (15.000 M CAD) y la dependencia de un solo mercado de acciones justifican no pagar prima. La regresión no explica nada (R² 0,14): usamos la mediana.',
    },
    transacciones: {
      comentario: 'Las operaciones del sector se pagan entre 13 y 24 veces el EBITDA (mediana de 13,1 veces) porque son de datos y software con prima de control; no las ponderamos. TMX es comprador, no objetivo: la ley de Ontario y de Quebec limita al 10 % la participación de un solo accionista sin permiso de los reguladores, lo que hace casi imposible una OPA [C1]. Sus compras de 2026 (RAFI a 10,0 veces las ventas y 12,9 veces el EBITDA; Cboe Australia y Canadá a 4,7 veces las ventas) están dentro de la horquilla del sector [D9, D11].',
    },
  },
  dcf_justificacion: {
    crecimiento: 'El 2026 queda casi cerrado: el primer semestre crece un 16 % (orgánico del 12 % en el 2T26) y el segundo suma RAFI desde el 18-ago y Cboe Australia [A7, D10, D16]; proyectamos +14,2 % (1.961 M), en línea con el consenso (1.949 M) [D2]. En 2027, +13,0 % con un año entero de RAFI y Cboe (unos 5,5 puntos de perímetro), en línea con el consenso (2.207 M). Después, 8 % en 2028 y bajada gradual al 5 % en 2032: el orgánico de 2025 fue del 15 % y el objetivo TM2X pide doblar ingresos en 5-7 años. MEMX queda fuera del caso base hasta que cierre (previsto en el 2S27).',
    margenes: 'Margen EBITDA del 59,5 % en 2026-2027, el ajustado de la empresa (58,9 % y 56,6 % publicados en el 1T26 y el 2T26, ≈ 60-61 % ajustado) menos un punto de costes de compras e integración que se repiten cada año; sube al 60,5 % desde 2029 por el apalancamiento operativo de índices y datos, cuyo margen incremental supera el 70 % [A2, A7].',
    inversion: 'Amortización del 3,6 % de los ingresos, sin la de intangibles de compras (114 M en 2025, que no es caja), y capex del 5,0 % (4,8 % desde 2029), que incluye la modernización de la posnegociación de CDS y las altas de derechos de uso [A2]. Circulante del 0,5 % de los ingresos: el negocio cobra por adelantado las cuotas de cotización y las licencias.',
    wacc: 'Tasa libre del 3,85 %, el bono canadiense a 10 años del 14-oct-2026 (Banco de Canadá) [D4]. Beta de 0,80: la semanal a cinco años frente al XIC es 0,41 y la mensual (0,08) no tiene sentido estadístico; el índice canadiense, cargado de bancos y materias primas, infravalora la sensibilidad de los volúmenes al mercado y usamos la de las bolsas cotizadas (0,8-0,9) [D1]. Prima de mercado del 5,5 %, sin prima adicional (rating AA bajo de DBRS). Coste de la deuda del 4,5 % (bonos del 2 % al 4,8 %) y 15 % de deuda. WACC del 7,52 %.',
    terminal: 'Crecimiento a perpetuidad del 2,75 %: inflación canadiense del 2 % más tres cuartos de punto de crecimiento real, por debajo de la tasa libre menos medio punto (3,35 %), porque el 51 % de los ingresos viene de fuera de Canadá y crece más. El valor terminal pesa el 77 % del DCF. El múltiplo de salida implícito (14,7 veces el EBITDA) está por debajo de la mediana de los comparables (15,1).',
  },
  puente_comentarios: {
    '2026e': 'Volumen de derivados (+15 % en el 1S26), renta variable y activos replicados de VettaFi (+49 % en 2025); precios estables; RAFI (desde agosto) y Cboe Australia aportan unos 4 puntos de perímetro [A7, A9].',
    '2027e': 'Año entero de RAFI y Cboe Australia y Canadá (≈ 5,5 puntos de perímetro), normalización de volúmenes y subida de tarifas de Trayport ligada al IPC británico [A2, D11].',
    '2028e': 'Crecimiento orgánico de índices, datos y derivados; precios de cotización y datos con la inflación.',
    '2029e': 'Volumen al ritmo del mercado de capitales norteamericano y precios con la inflación.',
    '2030e': 'Convergencia hacia el crecimiento nominal de los mercados de datos y de infraestructura de mercado (7 % anual) [B1].',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Sí. El crecimiento orgánico proyectado desde 2028 (8 % bajando al 5 %) queda por debajo del orgánico de 2025 (15 %) y del 2T26 (12 %) [A2, A7], y en línea con el crecimiento del mercado de datos e infraestructura de mercado (7-7,4 % anual según Burton-Taylor) [B1]: TMX no necesita ganar cuota fuera de Canadá para cumplirlo. La reinversión es pequeña (capex del 5 % de los ingresos frente a una amortización propia del 3,6 %) y el ROIC incremental de 2021-2025 (11,8 %) supera el WACC, así que el crecimiento crea valor. El perímetro de 2026-2027 (RAFI y Cboe) está pagado y cerrado o a falta de la aprobación de Cboe Canadá. La cuota en Canadá (61 % del volumen) es el punto débil: Cboe Canadá pasa a TMX, pero los sistemas alternativos siguen compitiendo.',
  dcf_lectura: 'El DCF da 68,30 CAD por acción, un 25,8 % por encima del precio, con el valor terminal en el 77 % del total. El DCF inverso dice que el precio de 54,31 CAD descuenta un crecimiento del 4,0 % anual en 2027-2032 frente al 7,8 % de nuestro caso base, o una rentabilidad del 8,5 % frente a nuestro WACC del 7,52 %. Es una expectativa baja para una empresa que crece de forma orgánica entre el 12 % y el 15 %. Con la prima implícita del mercado (4,2 %), el DCF sube a 87,14 CAD. La sensibilidad es alta: medio punto de WACC o de crecimiento terminal mueve el valor entre 55,42 y 87,97 CAD. La discrepancia con el objetivo a 12 meses es de horizonte: el DCF paga el crecimiento a varios años; el mercado, hoy, solo el de los próximos dos.',
  narrativas: {
    Bajista: 'Los volúmenes de derivados y de renta variable vuelven a los niveles de 2023, la IA abarata los datos y los índices simples, y las compras (RAFI, Cboe) no dan las sinergias: crecimiento 3 puntos menor, margen 2 puntos más bajo y WACC medio punto mayor.',
    Base: 'Perímetro de RAFI y Cboe integrado, orgánico del 6-8 % y margen EBITDA del 59,5-60,5 %, en línea con el consenso de ingresos de 2026-2027.',
    Alcista: 'Los activos replicados de VettaFi y RAFI siguen creciendo con los ETF, Trayport gana más redes de energía y la posnegociación moderniza su oferta: crecimiento 1,5 puntos mayor y margen un punto mejor.',
  },
  escenarios_comentario: 'La asimetría del DCF es favorable: el alcista gana un 40,3 % y el bajista pierde un 11,8 % (3,42 veces), y los escenarios ponderan 65,18 CAD. A 12 meses la asimetría es menor (1,89 veces): en el bajista el PER bajaría a 15,3 veces (base × 0,8) y la acción caería a 42,53 CAD, cerca del mínimo de febrero; en el alcista el mercado pagaría la mediana de los comparables (23,4 veces) y llegaría a 76,52 CAD. El riesgo no es el negocio sino el múltiplo, que en TMX ha sido muy estable (17,9-21,3 veces adelantado).',
  casos_12m: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 2.78, multiplo: null, precio: null, justificacion: 'Ingresos de 2.265 M en 2028 (3 puntos menos de crecimiento en 2027-2028) y margen EBITDA del 58 %: EBITDA de 1.314 M, menos 82 M de amortización propia y unos 85 M de intereses netos, 26,5 % de impuestos y 65 M de minoritarios de BOX, entre 276 M de acciones diluidas. BPA ajustado, sin la amortización de intangibles de compras.' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 3.10, multiplo: null, precio: null, justificacion: 'Ingresos de 2.393 M y margen del 60 % (EBITDA de 1.436 M), menos 86 M de amortización propia y unos 85 M de intereses netos, 26,5 % de impuestos y unos 70 M de minoritarios: ≈ 860 M entre 276 M de acciones, sin recompras no anunciadas ni MEMX. La misma fórmula da 2,13 CAD en 2025, igual que el BPA ajustado publicado.' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 3.27, multiplo: null, precio: null, justificacion: 'Ingresos de 2.459 M (1,5 puntos más de crecimiento) y margen del 61 % (EBITDA de 1.500 M); mismos intereses, impuestos y acciones y 72 M de minoritarios.' },
  ],
  per_actual: 19.5,
  per_excluidos: 'Ninguno. Historia adelantada con BPA ajustado diluido (la base de los casos): cierre de cada año entre el BPA ajustado del año siguiente (2019: 22,49/1,176 = 19,1; 2020: 25,43/1,42 = 17,9; 2021: 25,65/1,426 = 18,0; 2022: 27,10/1,46 = 18,6; 2023: 32,05/1,70 = 18,9; 2024: 44,28/2,13 = 20,8; 2025: 52,23 entre nuestro BPA ajustado de 2026 de 2,45 = 21,3). Mediana de cinco años (2021-2025) 18,85 veces, mínimo 17,99, media de siete años 19,22. Precios y BPA ajustados a la división de 5 por 1 de 2023. PER actual: 54,31 entre nuestro BPA ajustado de 2027 (2,78).',
  per_v2_excluidos: 'Ninguno: precio de cierre entre el BPA ajustado diluido del mismo año (2020: 21,6; 2021: 18,1; 2022: 19,0; 2023: 22,0; 2024: 26,0; 2025: 24,5).',
  diferencia_consenso: 'Nuestro BPA de 2027 (2,78 CAD) queda un 13,5 % por encima del consenso (2,45) [D2]. La diferencia es de base, no de negocio: el nuestro es ajustado (sin la amortización de intangibles de compras, ≈ 0,33 CAD por acción tras impuestos), la base de la historia del PER; en base publicada sería de unos 2,45, igual que el consenso. Las ventas coinciden en 2026-2027 (1.961 y 2.216 M frente a 1.949 y 2.207); en 2028 las nuestras quedan un 7,9 % por debajo (2.393 frente a 2.598 M) porque no incluimos MEMX. Nuestro precio base (59,52 CAD) queda un 9,2 % por debajo del objetivo medio de los analistas (65,55): ellos aplican un múltiplo más alto, cercano al de los comparables.',
  media_12m: 59.52,
  objetivo_comentario: 'El valor intrínseco (64,26 CAD) queda un 8 % por encima del objetivo a 12 meses (59,52 CAD). La distancia es pequeña: el PER adelantado de hoy (19,5 veces) ya está cerca de su mediana de cinco años (18,85) y la regla solo lo baja a 19,2 veces; casi toda la rentabilidad a 12 meses (11,3 %) sale del crecimiento del beneficio. Para cerrar la distancia bastaría con que el 3T26 (29-oct) y los resultados anuales de febrero confirmen el orgánico de doble dígito y la integración de RAFI y Cboe. El BPA de 2028e (3,10) es ajustado y crece un 13,3 % anual desde el ajustado de 2025 (2,13); frente al publicado de 2025 (1,49) parecería un 27,7 %, pero esa cifra lleva 114 M de amortización de compras y 38,5 M de diferencias de cambio no monetarias.',
  valoracion_comentario: 'Pesamos el DCF (40 %) y los escenarios (40 %) porque el negocio es recurrente en más de la mitad y está bien documentado, y los comparables (20 %) porque TMX cotiza en línea con ellos. Las transacciones no cuentan: son de datos y software con prima de control, y TMX no puede ser objetivo por el límite legal del 10 %. Los métodos dan un rango coherente pero amplio: PER de los comparables de 53,30 a 59,80 CAD, EV/EBITDA de 47,70 a 62,23, DCF de 55,42 a 87,97 según WACC y crecimiento. La síntesis da 64,26 CAD, un 18,3 % sobre el precio. En el puente, los minoritarios de BOX van a un valor estimado de mercado de 880 M (unos 63 M de beneficio anual por 14 veces) y no a su valor contable de 222 M; la caja retenida por los reguladores (≈ 240 M) no se cuenta; y lo pagado por RAFI y Cboe después del balance (1.093 M) se resta, porque su EBITDA ya está en la proyección [A8, D9, D11].',
  catalizadores: {
    items: [
      { fecha: '2026-10-29', evento: 'Resultados del 3T26 (conferencia el 30-oct)', efecto: 'Primer trimestre con RAFI y Cboe Australia; prueba del orgánico de doble dígito y de la deuda tras las compras', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-2027', evento: 'Cierre de la compra de Cboe Canadá', efecto: 'Consolida la negociación de renta variable canadiense (más cuota) a cambio de condiciones de la Oficina de Competencia', probabilidad: 'Media', sentido: '+' },
      { fecha: 'Febrero de 2027', evento: 'Resultados de 2026, dividendo y renovación de la recompra', efecto: 'Subida del dividendo (40-50 % del BPA ajustado) y nuevo programa de recompras desde el 27-feb', probabilidad: 'Alta', sentido: '+' },
      { fecha: '2026-2027', evento: 'Flujos hacia los ETF que replican índices de VettaFi y RAFI', efecto: 'Los ingresos de índices dependen de los activos replicados (≈ 263.000 M USD con RAFI)', probabilidad: 'Media', sentido: '+/−' },
      { fecha: '2S27', evento: 'Cierre de la compra del 59 % de MEMX (≈ 800 M USD)', efecto: 'Entrada en la negociación de acciones de EE. UU.; más deuda y riesgo de integración, fuera del caso base', probabilidad: 'Media', sentido: '+/−' },
      { fecha: '2027', evento: 'Modernización de la posnegociación de CDS', efecto: 'Inversión y riesgo operativo en el depositario canadiense', probabilidad: 'Alta', sentido: '−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Compras caras o mal integradas (RAFI, Cboe, MEMX)', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−10 a −15 % (MEMX añade ≈ 1.127 M CAD de deuda)', mitigante: 'Historial de integración de VettaFi y BOX y objetivo de deuda de 1,5-2,5 veces el EBITDA', senal: 'Deuda por encima de 2,5 veces el EBITDA ajustado o deterioro del fondo de comercio' },
      { riesgo: 'Vuelta de los volúmenes de derivados y renta variable a niveles normales', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−11,8 % (escenario bajista); −20 % a 12 meses', mitigante: 'Más de la mitad de los ingresos (datos, índices, Trayport, cuotas de cotización) es recurrente', senal: 'Volumen de contratos de MX por debajo del de 2025 dos trimestres seguidos' },
      { riesgo: 'Compresión del múltiplo', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−18 % si el PER adelantado baja de 19,5 al mínimo de 5 años con base × 0,8 (15,3 veces)', mitigante: 'El PER adelantado ya está cerca de su mediana (18,85) y en línea con los comparables', senal: 'Rotación del mercado fuera de financieras y datos' },
      { riesgo: 'Competencia en la negociación canadiense', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−3 a −5 % (negociación de renta variable y fija, 17 % de los ingresos)', mitigante: 'La compra de Cboe Canadá elimina al segundo competidor', senal: 'Cuota de TMX por debajo del 55 % del volumen' },
      { riesgo: 'Fallo operativo o regulatorio de CDS o CDCC', tipo: 'Operativo', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−10 %', mitigante: 'Supervisión de la OSC, la AMF y el Banco de Canadá; rating AA bajo', senal: 'Incidentes en la modernización de la posnegociación' },
      { riesgo: 'Pocas salidas a bolsa y ampliaciones en TSX y TSXV', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−2 a −3 %', mitigante: 'Las cuotas anuales de cotización son el grueso del segmento (17 % de los ingresos)', senal: 'Capital captado en TSXV por debajo del de 2023' },
      { riesgo: 'La IA abarata los datos y los índices simples', tipo: 'Tecnológico', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Los índices replicados por ETF y la red de Trayport son difíciles de sustituir; los datos de la bolsa son propios', senal: 'Crecimiento de Global Insights por debajo del 8 %' },
      { riesgo: 'Tipo de cambio (51 % de los ingresos fuera de Canadá)', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '±3 %', mitigante: 'Costes también en USD y GBP', senal: 'USD/CAD por debajo de 1,30' },
    ],
    premortem: 'Octubre de 2029: la acción ha perdido un 40 %. La historia más probable es la del comprador en serie que pagó demasiado. En 2027 TMX cerró MEMX y se endeudó por encima de 3 veces el EBITDA justo cuando los volúmenes de derivados y de acciones volvieron a los niveles de 2023; la negociación de acciones de EE. UU. resultó un negocio de márgenes finos con competencia feroz y MEMX perdió cuota. A la vez, la IA y los índices de bajo coste presionaron las comisiones de VettaFi y RAFI, y el crecimiento de Global Insights bajó del 16 % al 5 %. El ROIC cayó por debajo del WACC, la agencia rebajó el rating y la empresa recortó las recompras. El mercado, que pagaba 19-21 veces el beneficio adelantado, volvió a las 15 veces. Lo habrían anticipado una deuda por encima de 2,5 veces el EBITDA ajustado tras MEMX, un orgánico trimestral por debajo del 5 % y un crecimiento de los activos replicados de VettaFi inferior al de los ETF de EE. UU.',
    ia: {
      exposicion: 'Media',
      sentido: 'Mixto',
      efecto_valor: '−5 %',
      comentario: 'La IA toca sobre todo Global Insights (41 % de los ingresos de 2025): datos de mercado, índices y herramientas de análisis (Verity, WSH) que agentes de IA podrían replicar o abaratar; la acción cayó un 8,6 % el 3-feb-2026 con la venta general de acciones de datos y software [D14]. Cotización, negociación, compensación y depósito (59 %) son infraestructura regulada con licencia que la IA no sustituye, y la negociación algorítmica tiende a aumentar los volúmenes. Los índices replicados por ETF y la red de Trayport valen por su adopción, no por el cálculo. TMX usa la IA en productos de datos y en costes. Señal: crecimiento de los ingresos de datos e índices por debajo del 8 % o bajas de licencias de Trayport.',
    },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'MEMX', pregunta: '¿Cuál es el rendimiento esperado de MEMX sobre el capital pagado y cómo se financiará sin pasar de 2,5 veces el EBITDA?', por_que: 'Es la mayor compra y queda fuera del caso base.' },
      { tema: 'Orgánico', pregunta: '¿Qué parte del 12 % orgánico del 2T26 es volatilidad y cuál es estructural (ETF, Trayport, derivados)?', por_que: 'Decide si el 8 % de 2028 es prudente.' },
      { tema: 'Cboe Canadá', pregunta: '¿Qué condiciones pondrá la Oficina de Competencia a la compra de Cboe Canadá?', por_que: 'Cuota y precios en la negociación canadiense.' },
      { tema: 'Índices', pregunta: '¿Cómo evolucionan las comisiones por activo replicado de VettaFi y RAFI frente al crecimiento de los ETF?', por_que: 'Riesgo de compresión de precios por la IA y los índices baratos.' },
      { tema: 'Capital', pregunta: '¿Se mantendrán las recompras con las compras de 2026-2027?', por_que: 'El BPA no supone recompras sin anunciar.' },
      { tema: 'Cifras ajustadas', pregunta: '¿Cuándo dejarán de repetirse los costes de compras e integración y las diferencias de cambio que excluye el BPA ajustado?', por_que: 'La distancia entre BPA ajustado (2,13) y publicado (1,49) es del 43 %.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Mantener',
    conviccion: 'Media',
    justificacion_recomendacion: null,
    horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener, con convicción media. El objetivo a 12 meses es de 59,52 CAD, un 11,3 % por encima del precio de 54,31 CAD con el dividendo (ponderada); en el caso base, también +11,3 %. No llega al 15 % que pide la regla para comprar. El valor intrínseco es de 64,26 CAD (+18,3 %) y el objetivo medio de los analistas, de 65,55. La razón: TMX es un buen negocio a un precio razonable, a 19,5 veces nuestro beneficio ajustado de 2027 frente a una mediana histórica de 18,85, y casi toda la rentabilidad a 12 meses sale del crecimiento del beneficio, no del múltiplo. La convicción es media porque las reglas coinciden (Mantener a 12 meses; el valor intrínseco y la prima del mercado darían Comprar) y el negocio es previsible, pero la compra de MEMX añade riesgo; subiría con un precio por debajo de 52,56 CAD o con un 3T26 (29-oct) que confirme el orgánico de doble dígito, y bajaría si la deuda pasa de 2,5 veces el EBITDA ajustado.

**El negocio.** TMX tiene el monopolio de la infraestructura del mercado canadiense (TSX, TSXV, Montreal Exchange, las cámaras CDCC y CDS) y un negocio global de datos e índices (VettaFi, RAFI, Trayport) que ya es el 41 % de los ingresos [B2]. El margen EBITDA publicado es del 55,4 % y el ROIC del 9,1 % frente a un WACC del 7,52 % (+1,6 puntos), lastrado por el fondo de comercio de las compras. Veredicto de calidad: **No** llega al umbral de cartera (ROIC − WACC ≥ 5), aunque el foso es amplio. La sostenibilidad del crecimiento es **Sí**: el orgánico proyectado está por debajo del reciente y del mercado.

**Finanzas.** Los ingresos crecen un 15 % anual en 2021-2025 y un 16 % en el 2T26 (12 % orgánico) [A7]. La deuda neta ajustada es de 2.875 M (2,7 veces el EBITDA) contando las compras de RAFI y Cboe. El BPA ajustado (2,13 CAD en 2025) supera al publicado (1,49) en un 43 % por la amortización de compras.

**Comparación con sus pares.** A 22,5 veces el beneficio de los próximos doce meses, TMX cotiza en línea con la mediana de ICE, CME, Nasdaq, Deutsche Börse, LSEG, Tradeweb, MSCI y Euronext (23,4 veces), con más crecimiento y menos ROIC [D6]. Es más cara que Euronext (20,8 veces), que sale también en Mantener.

**Equipo y gobierno.** Consejero delegado desde 2020 que ha doblado los ingresos y cumplido su guía; consejo de 12 con 11 independientes y voto de remuneración del 95,5 % [C1]. La ley limita al 10 % la participación de un accionista: no hay OPA posible.

**Valoración.** El DCF da 68,30 CAD; el precio descuenta un crecimiento del 4,0 % anual frente al 7,8 % de nuestro base. Con la prima del mercado (4,2 %), 87,14. Nuestro BPA de 2027 queda un 13,5 % por encima del consenso solo porque es ajustado.

**Riesgos y catalizadores.** El mayor riesgo es pagar demasiado por las compras, sobre todo MEMX (≈ 800 M USD, cierre en el 2S27). Después, volúmenes y múltiplo: en el bajista a 12 meses la acción cae a 42,53 CAD. El riesgo de IA es medio y mixto: toca datos e índices (41 %), no la infraestructura regulada. Catalizadores: 3T26 el 29-oct-2026, cierre de Cboe Canadá y resultados anuales en febrero.

**Qué cambiaría la decisión.** Compraríamos por debajo de 52,56 CAD y venderíamos por encima de 67,16. Pasaríamos a Vender si la deuda supera 2,5 veces el EBITDA ajustado tras MEMX o si el orgánico trimestral baja del 5 %.`,
    tesis: 'TMX es el dueño de la infraestructura del mercado de capitales canadiense —cotización, negociación, derivados, compensación y depósito— y la ha usado para construir un negocio global de datos, índices y energía que ya aporta el 41 % de los ingresos [B2]. Gana dinero con un margen EBITDA ajustado cercano al 60 % y más de la mitad de ingresos recurrentes.\n\nEl precio de 54,31 CAD descuenta un crecimiento del 4,0 % anual en 2027-2032, muy por debajo del orgánico reciente (12-15 %); a 22,5 veces el beneficio de los próximos doce meses cotiza en línea con sus comparables y a 19,5 veces nuestro BPA ajustado de 2027, cerca de su mediana histórica.\n\nPara invertir hay que creer que las compras de 2026-2027 (RAFI, Cboe, MEMX) rendirán por encima de su coste y que los índices y los datos seguirán creciendo a doble dígito. El valor a largo plazo existe (64,26 CAD), pero a 12 meses la rentabilidad esperada (11,3 %) no llega al umbral de compra.',
    vision_diferencial: {
      mercado_descuenta: 'Un crecimiento moderado (4 % anual implícito) y un múltiplo en línea con los comparables; los analistas, más optimistas, ven 65,55 CAD de objetivo medio.',
      nuestra_vision: 'Vemos un valor intrínseco algo superior (64,26 CAD) y un objetivo a 12 meses de 59,52, un 9,2 % por debajo del de los analistas, porque no damos al múltiplo prima sobre su historia.',
      por_que: 'El PER adelantado de TMX ha estado entre 17,9 y 21,3 veces en siete años; los analistas aplican múltiplos cercanos a los de ICE o Nasdaq, que tienen más escala. No tenemos una visión distinta del negocio; sí del múltiplo y del riesgo de las compras.',
    },
    a_favor: [
      '**Monopolio regulado en Canadá**: única bolsa principal, única cámara de derivados y único depositario.',
      '**Crecimiento orgánico**: 15 % en 2025 y 12 % en el 2T26.',
      '**Datos e índices globales**: VettaFi, RAFI y Trayport, el 41 % de los ingresos, crecen a doble dígito.',
      '**Precio razonable**: el precio descuenta un 4 % de crecimiento anual frente al 7,8 % de nuestro base.',
      '**Gobierno sólido**: consejo independiente, rating AA bajo y dividendo creciente.',
    ],
    en_contra: [
      '**ROIC apenas sobre el WACC**: 9,1 % frente a 7,52 % por el fondo de comercio de las compras.',
      '**Comprador en serie**: MEMX (≈ 800 M USD) llevará la deuda al techo del objetivo.',
      '**Rentabilidad a 12 meses del 11,3 %**: por debajo del umbral de compra (15 %).',
      '**Cifras ajustadas**: el BPA ajustado supera al publicado en un 43 %.',
      '**Exposición a la IA en datos e índices**: la acción cayó un 8,6 % el 3-feb-2026 con el sector.',
    ],
    que_vigilar: 'La tesis depende de que las compras de 2026 se integren sin sustos y de que el orgánico se mantenga por encima del 6-8 % cuando la volatilidad se normalice. La señal de que no se cumple sería una deuda por encima de 2,5 veces el EBITDA ajustado o un crecimiento de Global Insights por debajo del 8 %.',
    cambiaria_recomendacion: [
      'Precio por debajo de 52,56 CAD: pasaríamos a Comprar.',
      'Precio por encima de 67,16 CAD: pasaríamos a Vender o reducir.',
      'Si la deuda supera 2,5 veces el EBITDA ajustado tras MEMX, bajaríamos el caso base.',
      'Si el orgánico trimestral baja del 5 %, revisaríamos el crecimiento de 2027-2028.',
    ],
    kpis_seguimiento: [
      { kpi: 'Crecimiento orgánico trimestral', nivel_actual: '+12 % (2T26)', umbral_alerta: '< 5 %', por_que: 'Base del 8 % de 2028' },
      { kpi: 'Deuda / EBITDA ajustado', nivel_actual: '2,2 veces (dic-25)', umbral_alerta: '> 2,5 veces', por_que: 'Techo del objetivo y del rating' },
      { kpi: 'Activos replicados de VettaFi y RAFI', nivel_actual: '≈ 263.000 M USD', umbral_alerta: 'Caída de dos trimestres', por_que: 'Motor de los ingresos de índices' },
      { kpi: 'Ingreso recurrente anualizado de Trayport', nivel_actual: '≈ 276 M CAD (4T25)', umbral_alerta: 'Crecimiento < 8 %', por_que: 'Negocio de más margen' },
      { kpi: 'Cuota del volumen canadiense de renta variable', nivel_actual: '61 % (4T25)', umbral_alerta: '< 55 %', por_que: 'Foso en la negociación' },
    ],
  },
};
