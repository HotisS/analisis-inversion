// Textos del analista (B3, corte 2026-10-27). Cifras del motor copiadas de calc tras el último cálculo.
// Primer informe de B3; modelo de forma: informes de HKEX, CME y LSEG. La síntesis está en sintesis.mjs (se escribe la última).
let SX = {};
try { SX = (await import('./sintesis.mjs')).default; } catch (e) { SX = {}; }

export default {
  limitaciones: 'Divisa de las cuentas, de la valoración y de la cotización: BRL (B3SA3, Novo Mercado). Precio: cierre de São Paulo del 26-oct-2026 (15,07 BRL), el día de la caída tras la victoria de Lula del 25-oct; a la hora del análisis no había cierre del 27-oct. El ADR BOLSY (OTC, 1 ADR = 3 acciones) cerró a 8,38 USD, equivalente a 15,10 BRL con 5,403 BRL/USD [D16, D9]. B3 no presenta 20-F: cuentas de la CVM (DFP 2018-2025 e ITR 1T26-2T26, datos abiertos) y releases de la empresa. 2016-2017 no son comparables (fusión con Cetip en marzo de 2017 y cambio de presentación de ingresos): la serie empieza en 2018. BPA de 2018-2019 divididos por 3 por el desdoblamiento de 2021. El balance quita de la caja, del activo y del pasivo las garantías en efectivo de los participantes de la cámara (2.655 M) y los proventos en custodia (184 M), dinero de clientes, como en HKEX, CME y LSEG. La historia del PER usa el beneficio recurrente de B3 (suma la amortización de intangibles de Cetip y quita no recurrentes), con 2024 y 2025 estimados con los trimestres publicados. Consenso y objetivos de los analistas anteriores a la segunda vuelta. No se ajustan los recursos propios que B3 dedica a las salvaguardas de la cámara (importe no localizado). Los comparables son de Yahoo Finance del 26-oct en BRL a los cambios del día.',
  controles_explicados: [
    { control: 'Crecimiento a perpetuidad ≤ 3 %', explicacion: 'El 5,5 % es nominal en BRL: inflación esperada del Focus del 4,1 % para 2027 (3,5-3,7 % para 2028-2029) más ≈ 1,4 puntos reales, dentro del rango del encargo (inflación más 0-1,5 puntos) y muy por debajo de la tasa libre (15,4 %) [P1]. El control está pensado para divisas de inflación baja.' },
    { control: 'Convicción frente a la sugerida por los criterios', explicacion: 'Los criterios dan «Media»; ponemos «Baja» porque el WACC cambió 2,5 puntos en un día con la tasa libre y el precio cayó un 36 %: la señal depende de una tasa de descuento en plena dislocación, y con la tasa previa a la elección la calidad pasaría el filtro (ver la sensibilidad del WACC).' },
  ],
  huecos: [],
  per_actual: 12.8,
  per_excluidos: 'PER adelantado = precio de cierre ÷ BPA recurrente del año siguiente: 2021 13,8x (11,14 ÷ 0,805); 2022 16,4x (13,21 ÷ 0,807); 2023 16,6x (14,55 ÷ 0,875); 2024 10,4x (10,32 ÷ 0,990); 2025 12,2x (13,89 ÷ nuestro 1,14 de 2026e) [A1, A7, A8, A11, D1]. Excluidos 2020 y anteriores: no hay serie recurrente comparable (amortización de Cetip de ≈ 1.000 M al año y cambio de presentación de ingresos) y el cierre de 2020 (20,66) es una burbuja de volumen con la Selic al 2 %.',
  casos_12m: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 1.10, multiplo: null, precio: null, justificacion: 'El nuevo gobierno sube la tributación de dividendos y elimina o recorta los JCP, la Selic sube por encima del 15 % y salen inversores: ingresos +3 % en 2027 y +4 % en 2028 (12.080 M), margen EBITDA del 66,5 % y tipo efectivo del 33 % al perder parte del escudo de los JCP. Beneficio de ≈ 5.400 M con 4.900 M de acciones.' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 1.29, multiplo: null, precio: null, justificacion: '2026e +12 % (1S26 +14,4 % y segundo semestre más flojo), +6 % en 2027 y +7 % en 2028: ingresos de 12.790 M, margen EBITDA del 69,5 % (8.890 M), amortización del 3,3 %, resultado financiero neto de ≈ +475 M y tipo efectivo del 30 % (nominal del 37 % con escudo de JCP). Beneficio de ≈ 6.260 M con 4.856 M de acciones (recompra anunciada de hasta 230 M, ejecutada en parte) [A5, D6].' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 1.36, multiplo: null, precio: null, justificacion: 'La volatilidad electoral y la Selic alta mantienen volúmenes récord de contado, renta fija y Tesouro Direto: +8 % en 2027 y +9 % en 2028 (13.280 M) y un punto más de margen (70,5 %). Beneficio de ≈ 6.600 M.' },
  ],
  media_12m: 17.52,
  diferencia_consenso: 'Nuestro BPA de 2026e (1,14) queda un 5 % por debajo del consenso (1,20) y el de 2027e (1,18), un 12 % por debajo (1,35) [D2]. La diferencia viene de tres cosas: el tipo nominal del 37 % desde el 2T26 (LC 224/2025), que el consenso de antes del verano quizá no recoge del todo; que no contamos créditos extraordinarios de JCP antiguos (510 M en el 4T25 y 277,5 M en el 2T26) como recurrentes; y menos recompras. El consenso es anterior a la segunda vuelta y no recoge la caída.',
  objetivo_comentario: 'El objetivo a 12 meses (17,52) sale de un PER base de 13,3 veces sobre un BPA de 2028e de 1,29: la mitad del camino entre el PER adelantado de hoy (12,8) y la mediana de 2021-2025 (13,8). Da un 18,2 % ponderado y un 15,8 % en el base, pero el valor intrínseco (10,50) queda un 30 % por debajo del precio: con un bono a 10 años del 15,4 % el DCF no sostiene ni el precio de después de la caída. Con la regla v2 (historia al cierre) 15,8 % / 11,6 %. Con un BPA un 10 % peor, 6,7 % / 4,5 %: la rentabilidad depende de que el beneficio aguante con la Selic y los impuestos nuevos.',
  valoracion_comentario: 'El DCF pesa un 50 % y los escenarios un 40 % porque es un negocio de caja estable con un margen EBITDA del 70 %; los comparables solo un 10 %: las bolsas desarrolladas cotizan con tasas libres del 3-5 %, no del 15,4 %, y su PER (22,6 de mediana) no se puede trasladar a Brasil sin la prima país. Transacciones, cero: son del sector de datos (Refinitiv, IHS Markit), en dólares y con otra tasa. La señal la decide el DCF en BRL: 8,46 en el base, 10,50 ponderado, 11,14 con la prima implícita del mercado. Con la tasa libre previa a la elección (12,98 %, WACC 17,41 %) el ponderado sube a 11,88; con el 13,5 % del encargo (WACC 17,90 %), a 11,54. En ningún caso llega al precio, ni al de antes de la elección (23,65).',
  dcf_justificacion: {
    crecimiento: 'Ingresos netos +12 % en 2026e: el 1S26 creció un 14,4 % (5.639 M) con récord de contado (+20 % de volumen medio diario en el 2T26) y de los negocios recurrentes (+17 %), y suponemos un segundo semestre al +8-9 % [A4, A5]. Después +6 % en 2027e (normalización de volúmenes y Selic alta), +7 % en 2028e y hacia el 5,5 %, cerca del crecimiento nominal del PIB brasileño. El crecimiento medio de 2018-2025 fue del 11 % anual, con la fusión de Cetip completa desde 2018 [A1].',
    margenes: 'Margen EBITDA recurrente del 69,5 % en 2026e y del 69-70 % después, frente al 69,7 % de 2025 y el 70,8 % del 1S26 (sin la plusvalía de Dimensa) [A1, A5]. La guía de gastos ajustados de 2026 (2.400-2.600 M) es compatible [D6].',
    inversion: 'Capex del 2,8-3,0 % de los ingresos (guía de 260-350 M en 2026) y amortización del 3,0-3,4 %, ya sin la de los intangibles de Cetip, que terminó en 2024-2025 (1.090 M en 2023, 572 M en 2024, 387 M en 2025) [A1, D6]. Circulante del 2 % de los ingresos.',
    wacc: 'Tasa libre del 15,435 %: bono a 10 años de Brasil el 26-oct-2026 (12,98 % el día anterior; DI1F31 15,24 %) [D3, D10]. Beta de 1,10: la mensual de 5 años frente al BOVA11 es de 1,57 (ajustada 1,38) [D1], pero esa beta mide la sensibilidad de B3 al ciclo brasileño, que ya está en la tasa en BRL; el sector de bolsas mundial está en ≈ 1,0. Prima de mercado del 5,5 % y prima adicional de 0: el riesgo país ya está en la tasa en reales. El escáner del 26-oct sumaba 3 puntos más de prima país sobre una tasa en BRL: contaba el riesgo país dos veces. Coste de la deuda del 15,5 % (debentures ligadas al CDI y bonos en USD cubiertos) y peso del 16,6 % (14.933 M de deuda frente a 75.324 M de capitalización). WACC del 19,75 %.',
    terminal: 'Gordon con un crecimiento del 5,5 % nominal en BRL: inflación del Focus para 2027 del 4,1 % más ≈ 1,4 puntos reales [P1]. El valor terminal pesa un 44 % del DCF, poco porque el WACC es alto. Implica ≈ 5,7 veces el EBITDA terminal, frente a 10,0 veces hoy.',
  },
  puente_comentarios: {
    '2026e': 'Volumen: récord de contado, renta fija y Tesouro Direto en el 1S26 (+14,4 % de ingresos netos) [A5]; precio ≈ 1,5 puntos por mezcla y tarifas; perímetro −0,5 (venta de Dimensa).',
    '2027e': 'Volúmenes más normales tras el año electoral; la Selic alta resta contado y suma renta fija.',
    '2028e': 'Volumen 4,5 %, precio 2,5 % (inflación).',
    '2029e': 'Volumen 4 %, precio 2,5 %.',
    '2030e': 'Converge al PIB nominal.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Sí: el crecimiento medio proyectado (6,9 % nominal en BRL, ≈ 3 % real) está por debajo del de 2018-2025 (11 % anual) y del PIB nominal más la penetración de la renta variable en Brasil, y no necesita capital nuevo: capex del 3 % de los ingresos. B3 es el monopolio de hecho de la bolsa, la compensación y el depósito en Brasil [B1, B3].',
  dcf_lectura: 'El DCF da 8,46 por acción, un 43,9 % por debajo del precio, con un WACC del 19,75 % y un valor terminal del 44 %. El DCF inverso dice que el precio descuenta un crecimiento del 20,5 % anual en 2027-2032 frente al 6,1 % de nuestro base, o una rentabilidad implícita del 13,3 %, por debajo de la propia tasa libre (15,4 %): el mercado no cree que el bono a 10 años se quede en el 15 % o descuenta a B3 con una tasa menor que la del Estado. Es el problema de fondo de valorar en BRL con la curva del día de la elección: cualquier activo brasileño de duración larga sale caro.',
  narrativas: {
    Bajista: 'El gobierno grava dividendos y elimina los JCP, la Selic sube al 16-17 % y los extranjeros (≈ 50 % del volumen de contado) salen: volumen de contado a la baja, menos salidas a bolsa y margen 3 puntos menor. Crecimiento terminal del 4,5 % y WACC un punto mayor.',
    Base: 'Brasil sigue con tipos altos pero sin ruptura: B3 crece con la inflación más un poco de volumen, mantiene el margen del 70 % y devuelve casi todo el beneficio.',
    Alcista: 'La volatilidad y la renta fija sostienen volúmenes récord y los nuevos negocios (datos, Tesouro Direto, derivados de cripto y de renta fija) crecen: +2 puntos de crecimiento y un punto más de margen.',
  },
  escenarios_comentario: 'Los tres escenarios del DCF quedan por debajo del precio (6,56, 8,46 y 9,31): la asimetría es negativa (−0,68 veces). Lo que mueve el valor no es el negocio sino la tasa: con 2,5 puntos menos de tasa libre (la de antes de la elección) el base sube a 10,03. A 12 meses, el bajista con PER de 10,4 veces da 11,44 (−24 %) y el alcista 24,34 (+62 %).',
  suma_partes_comentario: 'No aplica: contado, derivados, renta fija y datos comparten la misma infraestructura de negociación, compensación y depósito.',
  secciones: {
    rentabilidad: { comentario: 'El ROIC del motor (con el fondo de comercio, NOPAT sobre capital invertido) fue del 23,3 % en 2025 y del 20-23 % desde 2020, frente a un WACC del 19,75 %: diferencia de 3,6 puntos, por debajo de 4,5 (filtro del método). Con la tasa libre de antes de la elección (WACC 17,41 %) la diferencia sería de 5,9 puntos y pasaría el filtro; con el 13,5 % del encargo (WACC 17,90 %), de 5,4. Sin el fondo de comercio el ROIC no tiene sentido: el fondo de comercio (24.359 M, ≈ 14.400 M de la fusión BM&FBovespa y ≈ 7.900 M de Cetip) es mayor que el capital invertido (18.803 M en 2025), porque el circulante es negativo y el pasivo por impuesto diferido (6.841 M, nacido de amortizar fiscalmente ese fondo de comercio) resta capital: el capital operativo sin fondo de comercio es negativo y el rendimiento, infinito. Quitando solo el fondo de comercio de Cetip el ROIC sería ≈ 40 %. El filtro usa el del método, con fondo de comercio: 23,3 %. El ROE fue del 25,6 % [A1, A4].', confianza: 'Media' },
    capital: { comentario: 'Reparto casi total: 90-110 % del beneficio en 2026 entre dividendos, JCP y recompras, con un programa de hasta 230 M de acciones (≈ 4,5 %) [D6]. Las acciones bajan de 6.160 M equivalentes en 2018 a 4.998 M en junio de 2026 [A1, A4]. Deuda bruta de 14.933 M frente a 16.452 M de caja propia: caja neta de ≈ 1.500 M. No hay compras grandes desde Neoway (2021); Dimensa se vendió en 2026.' },
    comparables: { comentario: 'B3 cotiza a 11,4 veces el beneficio de los próximos 12 meses y a 10,0 veces el EBITDA de los últimos 12 meses, frente a medianas de 22,6 y ≈ 17 veces de nueve bolsas (CME, ICE, Nasdaq, Cboe, HKEX, LSEG, Bolsa Mexicana, SGX y ASX) [D2, D9]. El descuento del 50 % es el precio del riesgo Brasil: la comparación útil es la Bolsa Mexicana (11,3 veces) [B4]. Por eso los comparables pesan poco.' },
    transacciones: { comentario: 'No hay transacciones de bolsas recientes comparables con datos; las del repositorio son de datos financieros (Refinitiv, IHS Markit, Adenza) a 13-31 veces el EBITDA en USD [D8]. Peso cero.' },
    multiplos_historicos: { comentario: 'El PER adelantado sobre beneficio recurrente es de 12,8 veces frente a una mediana de 13,8 en 2021-2025 y un mínimo de 10,4 (cierre de 2024, con la Selic subiendo hacia el 15 %) [D1]. Con el beneficio publicado, que en 2021-2024 cargaba la amortización de Cetip, el PER parece más alto; no se usa. La acción ya cotizó así: en diciembre de 2024 cayó a 10,32 con el miedo fiscal.' },
    bolsa: {
      comentario: 'La acción cae un 36,3 % el 26-oct (hasta −50 % en la apertura, con circuit breaker del Ibovespa, −13,9 %) y pierde un 15,4 % en un mes, pero aún gana un 19,0 % en 12 meses: el 5-oct había subido a 23,30 con la primera vuelta y el 23-oct cerró a 23,65 [D1, D11, D12]. Beta de 5 años de 1,57 frente al BOVA11, volatilidad de 60 días del 106 % y caída máxima del 38,4 % [D1].',
      contexto: {
        movimiento: { fecha: '2026-10-26', var_1m_pct: -15.4, var_3m_pct: -4.1, var_6m_pct: -19.5, var_12m_pct: 19.0, dist_max_52s_pct: -36.4, dist_min_52s_pct: 22.2, dist_max_historico_pct: -36.4, tendencia: 'lateral', volatilidad_60d_pct: 106, avisos: [] },
        movimientos_fuertes: [
          { periodo: 'oct-2026 (26-oct)', var_pct: -36.3, causa: 'Lula gana la segunda vuelta del 25-oct con el 51,79 % frente a Flávio Bolsonaro: el mercado había comprado la alternancia tras la primera vuelta. El 26-oct el EWZ cayó un 18-27 % antes de abrir, el Ibovespa un 13,9 % con circuit breaker, los bancos un 14-29 %, el real un 8-10 % (5,403 por dólar) y el bono a 10 años subió del 12,98 % al 15,44 % [D3, D10, D12, D14]. B3, como valor más líquido y termómetro del mercado de capitales, cayó un 36 % sin noticia propia; se temen impuestos sobre dividendos y JCP, un impuesto a las grandes fortunas y más control estatal [D11, D13, E1].', veredicto: 'retrasa', condicion: 'Hasta que el gobierno electo concrete su política fiscal (tributación de dividendos y JCP, marco fiscal de 2027) o hasta un precio que lo descuente; nuestro límite de compra (10,50) ya lo hace.' },
          { periodo: 'oct-2026 (5-oct a 23-oct)', var_pct: 34.8, causa: 'Subida tras la primera vuelta (4-oct), que el mercado leyó como probable cambio de gobierno: de 19,00 el 2-oct a 23,30 el 5-oct y 23,65 el 23-oct [D1].', veredicto: 'no cambia', condicion: null },
          { periodo: 'may-2026', var_pct: -19.7, causa: 'Caída de un mes hasta el 19-may con los primeros sondeos favorables a Lula, la subida del CSLL (LC 224/2025) y el relevo de consejero delegado (Christian Egan sustituye a Gilson Finkelsztain) [A6, C1, C2].', veredicto: 'no cambia', condicion: null },
        ],
        noticias: [
          { fecha: '2026-10-26', tipo: 'litigios y reguladores', hecho: 'Victoria de Lula: posibles impuestos sobre dividendos y JCP, impuesto a las grandes fortunas y más intervención; sin medidas concretas anunciadas [D11, D13].', veredicto: 'retrasa', condicion: 'Hasta conocer las medidas fiscales del gobierno electo.' },
          { fecha: '2026-10-26', tipo: 'otro', hecho: 'El mercado descuenta una subida de la Selic en noviembre; el Focus la tenía en el 13,25 % para final de 2026 antes de la elección [D10].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-08-11', tipo: 'resultados', hecho: '2T26: ingresos netos de 2.766 M (+8,8 %), lucro recurrente de 1.377 M; los mercados de derivados cayeron un 8 % en contratos [A5, E4, E5].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-05-19', tipo: 'directivos', hecho: 'Christian George Egan, nuevo consejero delegado; sustituye a Gilson Finkelsztain [C1, C2].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-03-31', tipo: 'otro', hecho: 'Venta de Dimensa (plusvalía de 124 M en el 1S26) y recompra de hasta 230 M de acciones [A4, D6].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-11-12', tipo: 'resultados', hecho: 'Resultados del 3T26 el 12-nov-2026 [D15].', veredicto: 'no cambia', condicion: null },
        ],
        proximos_resultados: '2026-11-12',
        veredicto: 'retrasa',
        condicion: 'que el gobierno electo concrete la tributación de dividendos y JCP y el marco fiscal de 2027, o hasta un precio que lo descuente (≤ 10,50 BRL, nuestro valor intrínseco). No aplaza por los resultados del 12-nov (regla 11).',
        comentario: 'La caída tiene una causa conocida (la elección) que nuestra tesis recoge a través de la tasa en BRL: el bono a 10 años al 15,4 % es lo que hunde el DCF. Lo que no recoge aún es el cambio fiscal: si se gravan los dividendos o desaparecen los JCP, el tipo efectivo de B3 sube y los inversores locales pierden interés en la bolsa. Para B3, Lula cambia cuatro cosas: (1) Selic más alta más tiempo, que desplaza el ahorro a renta fija (B3 cobra menos por renta fija que por contado) y sube la tasa de descuento; (2) real más débil, que abarata la acción para el extranjero pero ahuyenta flujos; (3) riesgo fiscal, que es la causa del salto del bono; (4) regulación y tributación del capital, que puede tocar los JCP (≈ 3 puntos de tipo efectivo) y el volumen. Global: retrasa, aunque la señal ya es «No mantener» por el valor intrínseco.',
      },
    },
  },
  catalizadores: {
    items: [
      { fecha: '12-nov-2026', evento: 'Resultados del 3T26', efecto: 'Volúmenes de septiembre-octubre récord por la volatilidad; tipo efectivo con el CSLL nuevo', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Nov-dic de 2026', evento: 'Primeras medidas fiscales del gobierno electo (presupuesto de 2027, dividendos, JCP)', efecto: 'Decide el bajista: tipo efectivo +3-5 puntos y salida de inversores', probabilidad: 'Alta', sentido: '−' },
      { fecha: 'Nov-dic de 2026', evento: 'Copom: subida de la Selic', efecto: 'Más tasa de descuento; más renta fija y menos contado', probabilidad: 'Alta', sentido: '−' },
      { fecha: 'Feb-2027', evento: 'Resultados de 2026, guía de 2027 y nueva recompra', efecto: 'Reparto del 90-110 %', probabilidad: 'Alta', sentido: '+' },
      { fecha: '2027', evento: 'Bajada del bono a 10 años hacia el 13 %', efecto: 'El DCF sube ≈ 1,5 BRL y el ROIC − WACC pasa de 5', probabilidad: 'Media', sentido: '+' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Tributación de dividendos y fin de los JCP', tipo: 'Regulatorio / fiscal', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 a −25 % (bajista a 12 meses: 11,44, −24 %)', mitigante: 'Reparto vía recompras; los JCP antiguos (≈ 3.250 M) ya reconocidos', senal: 'Proyecto de ley con fecha' },
      { riesgo: 'Selic y bono a 10 años por encima del 15 % durante años', tipo: 'Macro / tipos', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−20 % en el DCF por cada 2,5 puntos', mitigante: 'Más ingresos de renta fija y de la caja propia', senal: 'DI1F31 por encima del 15 %' },
      { riesgo: 'Salida de inversores extranjeros y caída del contado', tipo: 'Cíclico', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Negocios recurrentes (datos, depósito, OTC) del ≈ 40 % de los ingresos', senal: 'Volumen medio diario de contado por debajo de 25.000 M' },
      { riesgo: 'Competencia de una segunda bolsa (ATS, A5X) y presión de tarifas', tipo: 'Competencia', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'Cámara y depósito integrados, red de participantes', senal: 'Licencia de la CVM a un competidor con cámara propia' },
      { riesgo: 'Fallo de la cámara en un día extremo como el 26-oct', tipo: 'Operativo', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: 'n.d.', mitigante: 'Garantías de los participantes y salvaguardas', senal: 'Llamadas de margen extraordinarias' },
    ],
    premortem: 'Octubre de 2027: B3 vale 9 BRL. El gobierno gravó los dividendos al 15 % y eliminó los JCP en 2027; la Selic subió al 16,5 % y la renta variable perdió un 20 % de volumen frente a la renta fija. El tipo efectivo de B3 pasó del 29 % al 34 % y el beneficio bajó un 8 %. El PER cayó a 9 veces, el mínimo de 2015-2016.',
    ia: { exposicion: 'Baja', sentido: 'Mixto', efecto_valor: 'Pequeño', comentario: 'La IA no sustituye una bolsa con monopolio de compensación y depósito; puede aumentar la negociación algorítmica (más volumen) y competir en datos, una parte pequeña de los ingresos.' },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Fiscal', pregunta: '¿Qué efecto tendría el fin de los JCP en el tipo efectivo y en el reparto?', por_que: 'Es el principal riesgo de la victoria de Lula para B3.' },
      { tema: 'Cámara', pregunta: '¿Cuántos recursos propios dedica B3 a las salvaguardas de la cámara y cuánto de la caja es libre?', por_que: 'Cambia el puente: hoy suponemos libre toda la caja propia.' },
      { tema: 'Volumen', pregunta: '¿Cómo fueron los volúmenes y la salida de extranjeros en las semanas tras la elección?', por_que: 'Separa el miedo de un cambio de negocio.' },
      { tema: 'Renta fija', pregunta: '¿Cuánto compensa la renta fija y el Tesouro Direto la caída del contado con la Selic alta?', por_que: 'Define el crecimiento de 2027.' },
    ],
    confianza: 'Media',
  },
  fuentes: [
    { id: 1, titulo: 'Focus: mercado vê IPCA e Selic maiores em 2026 e 2027 (Focus del 15-jun-2026: IPCA 2027 4,10 %, 2028 3,68 %, 2029 3,50 %)', editor: 'Eu Quero Investir', tipo: 'Prensa', fecha: '2026-06-15', url: 'https://euqueroinvestir.com/economia/focus-mercado-ve-ipca-e-selic-maiores-em-2026-e-2027' },
  ],
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Baja', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: SX.sintesis ?? null,
    tesis: 'B3 es el monopolio de hecho de la bolsa, la compensación y el depósito de Brasil, con un margen EBITDA del 70 %, capex del 3 % de los ingresos y un reparto del 90-110 % del beneficio [A1, D6]. Gana con el volumen y la inflación y no necesita capital. Pero valorada en reales con el bono al 15,4 % y un WACC del 19,75 %, ni siquiera tras caer un 36 % el precio queda por debajo de su valor: el DCF da 8,46 y el valor intrínseco ponderado, 10,50.',
    vision_diferencial: {
      mercado_descuenta: 'Una rentabilidad del 13,3 % anual, por debajo del bono a 10 años: el mercado no cree que los tipos se queden en el 15 % o paga por un negocio de monopolio que en BRL no rinde lo que la deuda del Estado.',
      nuestra_vision: 'Que el negocio es de calidad pero el precio no compensa el riesgo Brasil con la curva actual, y que el cambio fiscal de Lula puede quitar el escudo de los JCP.',
      por_que: 'El ROIC del 23 % apenas supera el WACC en BRL (3,6 puntos) y el valor intrínseco queda un 30 % bajo el precio incluso con la prima implícita del mercado.',
    },
    a_favor: [
      '**Monopolio y margen**: única bolsa, cámara y depósito de Brasil, margen EBITDA del 70 % [A1, B1].',
      '**Barata frente a su historia y al sector**: 12,8 veces el BPA recurrente del año próximo frente a 13,8 de mediana y 22,6 de las bolsas del mundo [D2].',
      '**Reparto del 90-110 %** y recompra de hasta el 4,5 % del capital [D6].',
      '**Récord de volumen en 2026**: ingresos netos +14,4 % en el 1S26 [A5].',
    ],
    en_contra: [
      '**Valor intrínseco muy bajo el precio**: 10,50 frente a 15,07 con el bono al 15,4 %.',
      '**ROIC − WACC de 3,6 puntos**, bajo el 4,5 del método.',
      '**Riesgo fiscal**: impuestos sobre dividendos y JCP tras la victoria de Lula [D11, D13].',
      '**BPA un 10 % peor** deja la rentabilidad en 6,7 %.',
    ],
    que_vigilar: 'Las primeras medidas fiscales del gobierno electo, el bono a 10 años (por debajo del 13,5 % la calidad pasaría el filtro) y los volúmenes de contado tras la elección.',
    cambiaria_recomendacion: SX.cambiaria_recomendacion ?? [],
    kpis_seguimiento: [
      { kpi: 'Bono de Brasil a 10 años', nivel_actual: '15,435 % (26-oct)', umbral_alerta: '> 16 %', por_que: 'Decide el WACC y la calidad.' },
      { kpi: 'Volumen medio diario de contado', nivel_actual: '31.310 M (2T26)', umbral_alerta: '< 25.000 M', por_que: 'El 40 % de los ingresos ligados al ciclo.' },
      { kpi: 'Tipo efectivo', nivel_actual: '≈ 29-30 %', umbral_alerta: '> 33 %', por_que: 'Mide el efecto de JCP y CSLL.' },
      { kpi: 'Margen EBITDA recurrente', nivel_actual: '70,1 % (2T26)', umbral_alerta: '< 67 %', por_que: 'Disciplina de costes.' },
    ],
  },
};
