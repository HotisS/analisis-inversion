// Textos del analista (BTG Pactual, BPAC11, corte 2026-10-27). Citas con la letra de la nota ([A3] = fuente 3 de A.json).
// Todo por UNIT (1 ON + 2 PNA) y en BRL. Las cifras de valoración salen de banco-ri.mjs y del motor (datos.json → calc).
export default {
  limitaciones: 'Cifras en millones de BRL, ejercicio natural. BASE: el lucro líquido ajustado y el ROAE ajustado de los informes trimestrales del banco (BR GAAP de gestión, sin la amortización del fondo de comercio ni algunos efectos de valor razonable), que son los que usan el consenso y la prensa [A1, A2]; las NIIF consolidadas de la CVM se usan como contraste (beneficio atribuible de 16.006 M en 2025 frente a 16.685 M ajustado) [A7]. Último trimestre publicado: 2T26 (30-jun-2026); el 3T26 se publica el 10-nov-2026 antes de la apertura [D8]. ES UN BANCO: deuda, caja y minoritarios del puente van a cero (los depósitos y emisiones son la materia prima), el «EBITDA» es el beneficio antes de impuestos ajustado, el «capex» es el beneficio retenido y el DCF del motor es, por construcción, un modelo de dividendos; el valor que manda es el de exceso de rentabilidad (valoracion-banco.md). Los ratios de empresa industrial (Altman, Piotroski, deuda/EBITDA, circulante, caja libre) no tienen sentido aquí. Precio: cierre de B3 del 26-oct-2026 (60,00 BRL), el día después de la reelección de Lula; la barra diaria de Yahoo de ese día viene vacía y el cierre sale del intradía y del cierre oficial de B3 [D1, D10].',
  controles_explicados: [
    { control: 'Crecimiento a perpetuidad ≤ 3 %', explicacion: 'El 3 % es para monedas fuertes. Aquí todo va en BRL nominales: el g del 5,0 % = inflación esperada a largo plazo del Focus (IPCA del 3,5 % en 2029-2030 y del 3,75-4,3 % en 2027-2028 [D5]; tomamos ≈ 4 %) + 1 punto real, dentro de la horquilla del encargo (inflación + 0-1,5). En términos reales es un 1 %, menos que el PIB potencial de Brasil.' },
    { control: 'Caja proyectada coherente con la histórica', explicacion: 'El «flujo libre» histórico de un banco (flujo operativo NIIF − capex) mezcla la variación de depósitos, préstamos y cartera de títulos y no mide lo que se lleva el accionista (−16.500 M en 2023, +7.914 M en 2024) [A7]. El flujo del DCF adaptado es otra cosa: beneficio − retención = JCP y dividendos (≈ 30 % del beneficio, 1,04 BRL por unit en 2025 y hasta 0,77 aprobados en ago-2026) [A2, A8]. No son comparables.' },
    { control: 'Capitalización calculada ≈ publicada', explicacion: 'La publicada (202.174 M BRL, Yahoo [D2]) no usa el número de units equivalentes: 11.670 M de acciones (3.890 M de units) menos 82,4 M en autocartera dan 11.587,7 M de acciones = 3.862,6 M de units × 60,00 BRL = 231.753 M [A9]. Es el mismo número que usa el banco para el BPA y el valor contable por unit, y el que usa toda la valoración.' },
  ],
  huecos: [],
  parches: [],
  huecos_resueltos: [],
  secciones: {
    rentabilidad: {
      comentario: 'Para un banco, la medida de la calidad es el ROE ajustado frente al coste del capital propio (Ke), que hace el papel del ROIC − WACC (con deuda, caja y minoritarios a cero, el ROIC del motor es el ROE sobre el patrimonio ajustado medio). El ROE subió del 17,4 % de 2021 al 26,2 % de 2025 (ROAE publicado 26,9 %; 26,6 % en el 1S26) [A1, A2], con menos peso del trading (del 30,8 % al 18,4 % de los ingresos) y más de banca privada, gestión y crédito. Frente a un Ke del 22,48 % (tasa libre del 15,44 % del bono a 10 años del 26-oct [D3] + 1,28 × 5,5), el diferencial es de solo 3,7 puntos (4,2 con el 2T26): por debajo de 4,5, así que la regla de calidad no deja comprar en ningún nivel. Con la tasa libre del 23-oct (12,98 %, Ke 20,02 %) el diferencial sería de 6,2-6,7 puntos. Es decir: el banco crea valor con holgura en BRL, pero el tipo de hoy se come casi todo el margen. El ROE depende en parte de la propia Selic: «Interest & Others» (el rendimiento del patrimonio a la Selic) es el 17,3 % de los ingresos del 1S26 [A1].',
      confianza: 'Media',
    },
    bolsa: {
      contexto: {
        movimiento: { fecha: '2026-10-26', var_1m_pct: -4.3, var_3m_pct: 8.0, var_6m_pct: -0.8, var_12m_pct: 25.9, dist_max_52s_pct: -26.6, dist_min_52s_pct: 25.6, dist_max_historico_pct: -26.6, tendencia: 'alcista', volatilidad_60d_pct: 79.8, avisos: ['Cifras calculadas a mano con el cierre de 60,00 BRL del 26-oct (movimiento.mjs se quedaba en el 23-oct porque Yahoo no tiene la barra diaria del 26): ningún aviso P1-P5 salta; precio un 2,6 % sobre la media de 200 sesiones (58,5) y por debajo de la de 50 (64,1).'] },
        movimientos_fuertes: [
          { periodo: '26-oct-2026 (−24,8 % en el día)', var_pct: -24.8, causa: 'Reelección de Lula el 25-oct (51,8 % de los votos) contra lo que daban las encuestas y lo que había descontado la bolsa tras la primera vuelta: Ibovespa −13,5 % con circuit breaker, dólar +8-9 %, bono a 10 años +2,46 puntos (15,44 %), DI ene-2031 al 15,19 %, riesgo país +26 %. BTG cae un 24,83 % (mínimo de 48,93 BRL, −38,7 %) y cierra un 9,1 % por debajo del 2-oct; BB −29 %, Bradesco −22 %, Itaú −14 %, B3 −36 % [D9, D10, D3].', veredicto: 'retrasa', condicion: 'Hasta los resultados del 3T26 (10-nov) y la decisión del Copom de primeros de noviembre, que dirán si la Selic baja, se para o sube' },
          { periodo: '2 a 23-oct-2026 (+20,9 %; +37,5 % en el mes al 5-oct)', var_pct: 20.9, causa: 'Rali de la primera vuelta: la bolsa apostó por la victoria de Flávio Bolsonaro y una política fiscal más dura; BTG fue el banco que más subió (Itaú +7,7 %) por su peso en mercado de capitales [D10, D11].', veredicto: 'no cambia', condicion: null },
          { periodo: '11-ago-2026 (−6,9 % en el día)', var_pct: -6.9, causa: 'Resultados del 2T26: ROAE del 26,7 % y beneficio récord, pero el mercado esperaba más en banca de inversión y castigó el coste del crédito (2.020 M de pérdidas esperadas en el trimestre) [A1, A7, D11].', veredicto: 'no cambia', condicion: null },
          { periodo: '19-may-2026 (−17,5 % en el mes)', var_pct: -17.5, causa: 'Caída general de los bancos brasileños con la subida de los tipos largos y el ruido fiscal de mayo; los resultados del 1T26 habían sido «difíciles de criticar» [D13, D1].', veredicto: 'no cambia', condicion: null },
          { periodo: '5-dic-2025 (−7,9 % en el día)', var_pct: -7.9, causa: 'Ruido electoral: anuncio de la candidatura de Flávio Bolsonaro y salto de los tipos largos [D1, D11].', veredicto: 'no cambia', condicion: null },
        ],
        noticias: [
          { fecha: '2026-10-26', tipo: 'demanda o regulador', hecho: 'Tras la elección, el mercado pasa de descontar un recorte de 0,25 puntos de la Selic (13,75 %) en el Copom de la semana siguiente a descontar una posible subida; el ministro de Hacienda promete cambiar la ley para buscar el centro de la meta fiscal [D9, D10, D7].', veredicto: 'retrasa', condicion: 'Hasta el Copom de primeros de noviembre' },
          { fecha: '2026-10-26', tipo: 'recomendación', hecho: 'JPMorgan, Morgan Stanley y el propio BTG prevén un periodo de corrección relevante de la bolsa brasileña [D9].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-11-10', tipo: 'resultados', hecho: 'Resultados del 3T26 antes de la apertura, 14 días después del corte [D8].', veredicto: 'retrasa', condicion: 'Hasta los resultados del 10-nov' },
          { fecha: '2026-09-19', tipo: 'recomendación', hecho: 'Citi sube el precio objetivo; Itaú BBA (18-ago) ve el múltiplo «cerca del suelo histórico» y JPMorgan sube a Comprar (22-jun) [D11]. Los 13 analistas de Yahoo: 11 comprar y 2 mantener, objetivo medio de 75,31 BRL, todo antes de la elección [D2].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-08-05', tipo: 'resultados', hecho: 'JCP de hasta 0,77 BRL por unit con cargo a 2026 [D11, A8].', veredicto: 'no cambia', condicion: null },
          { fecha: '2025-10-14', tipo: 'fusión u oferta', hecho: 'Incorporación del resto de Banco Pan (0,2128 units por acción preferente, prima de más del 30 %), cerrada en 2026: Pan pasa al 100 % y emite units nuevas [D14].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-10-27', tipo: 'accionista de referencia', hecho: 'Sin colocaciones ni ventas anunciadas de los socios (64,9 % + 3,7 %; 79,6 % de los votos) [A9, C2].', veredicto: 'no cambia', condicion: null },
        ],
        proximos_resultados: '2026-11-10',
        veredicto: 'retrasa',
        condicion: 'Hasta los resultados del 3T26 (10-nov-2026) y el Copom de primeros de noviembre',
        comentario: 'El 26-oct BTG perdió en un día lo que había ganado desde la primera vuelta y un 9 % más: la reelección de Lula subió 2,46 puntos el bono a 10 años y el mercado pasó de esperar recortes de la Selic a temer subidas [D3, D9, D10]. Para el banco eso cambia, sobre todo, el coste del capital (Ke del 20,0 % al 22,5 %: el valor de exceso de rentabilidad baja de 32,77 a 26,37 BRL, −20 %); el beneficio cambia menos: más Selic sube la remuneración del patrimonio (17 % de los ingresos), pero frena la banca de inversión, el mercado de capitales y el crédito. Veredicto: retrasa, hasta el Copom y los resultados del 10-nov, por la volatilidad (80 % a 60 sesiones) y porque el BPA de 2027 todavía no recoge el golpe.',
      },
    },
  },
  dcf_justificacion: {
    crecimiento: 'El beneficio sale del modelo de exceso de rentabilidad: ROE ajustado sobre el valor contable de inicio de cada año (26,2 % en el 2H26, 26,3 % en 2027e, 25,1 % en 2028e y bajando hasta el 24 % en 2035e) y payout del 30 % hasta 2030e, que sube al 79 % en 2035e para que el patrimonio crezca al 5 % a perpetuidad [A1, A2, A8]. 2026e (+25,7 %, fijo): 1S26 real (9.950 M) + 2H26 de 10.430 M, con Banco Pan al 100 %. 2027e: BPA de 5,91 BRL, un 3,6 % menos que el consenso anterior a la elección (6,13 [D2]) por menos banca de inversión y más coste del crédito. Los «ingresos» son el beneficio ÷ 0,4906 (margen 62,5 %, impuestos 21,5 %).',
    margenes: '«Margen EBITDA» = beneficio antes de impuestos ajustado ÷ ingresos ajustados: 60,8 % en 2021, 63,0 % en 2024, 64,6 % en 2025 y 62,3 % en los últimos doce meses [A1, A2]. Se fija en el 62,5 %; la eficiencia (gastos ÷ ingresos del 35,4 % en 2025 y 37,1 % en el 2T26) y el coste del crédito quedan dentro.',
    inversion: '«Capex» = beneficio retenido para que crezca el patrimonio: (1 − payout) × beneficio = 34,3 % de los ingresos hasta 2030e y 10,2 % en 2035e. Con un capital ordinario (CET1) del 11,6 % y un Basilea del 16,0 % en el 2T26 [A1], crecer el balance un 17 % al año exige retener; amortización y circulante a cero.',
    wacc: 'Coste del capital propio en BRL: tasa libre del 15,44 % (bono de Brasil a 10 años, 26-oct-2026 [D3]) + beta de 1,28 (ajustada, mensual de 5 años frente al Ibovespa [D1]) × prima del 5,5 % = 22,48 %. Sin prima país: ya va dentro del bono en BRL (los 3 puntos extra del escáner eran una doble cuenta). Peso de la deuda 0 %: WACC = Ke. Con la tasa del 23-oct (12,98 %) el Ke sería del 20,02 %, y con la del encargo antes de la elección (≈ 13,5 %), del 20,54 %.',
    terminal: 'Crecimiento a perpetuidad del 5,0 % en BRL nominales: inflación esperada a largo plazo ≈ 4 % (Focus: IPCA de 3,5 % en 2029-2030 [D5]) + 1 punto real. A partir de 2035e el ROE se queda en el 24 %, 1,5 puntos sobre el Ke: el exceso a perpetuidad es pequeño.',
  },
  puente_comentarios: {
    '2026e': 'Volumen = valor contable medio por unit +22 % (Banco Pan al 100 % y beneficio retenido); ROE estable; +3,6 puntos de otros por pasar del margen real de 2025 (64,6 %) al 62,5 % normal del modelo [A1, D14].',
    '2027e': 'Patrimonio medio +21 %; ROE medio −7 % (de 28 % a 26 % sobre patrimonio medio: menos banca de inversión tras el 26-oct).',
    '2028e': 'Patrimonio +18 %; ROE −4 % (25,1 % sobre el inicio).',
    '2029e': 'Patrimonio +17,5 %; ROE estable.',
    '2030e': 'Patrimonio +17,4 %; ROE −1 %.',
  },
  veredicto: 'En parte',
  sostenibilidad_justificacion: 'Las pruebas del motor dan «Sí»: el capital nuevo rinde un 22,8 % en la proyección, por debajo del ROE de 2025 (26,2 %) y del incremental histórico (38,7 %). Lo dejamos en «En parte» por dos motivos. Primero, un ROE del 24-26 % es el máximo de la historia de BTG (17-23 % en 2021-2024) y sale en parte de la propia Selic (17 % de los ingresos) y de un ciclo bueno del mercado de capitales [A1, A4]. Segundo, crecer el patrimonio un 17 % al año hasta 2030 exige capital: el CET1 (11,6 %) deja poco margen sobre el mínimo regulatorio y el payout no puede subir antes [A1]. El foso es estrecho (marca, red de banca privada y de mercado de capitales, socios con capital propio). El crecimiento medio proyectado (14,2 %) supera al financiable con el ROE de 2025 (12,9 %) solo por 2026e (+25,7 %, fijo), que suma Banco Pan al 100 % y el semestre ya ganado; sin ese año, 2027e-2035e crecen un 12,9 % anual, justo lo financiable: no hace falta rebajar el base.',
  dcf_lectura: 'El DCF adaptado (un modelo de dividendos) da 25,95 BRL por unit y el de exceso de rentabilidad, 26,37: un 57 % por debajo del precio. El P/VC justificado con un ROE del 25 % es de 1,14 veces, frente a las 2,91 del precio (60,00 ÷ 20,60 de valor contable del 2T26). El DCF inverso dice que el precio descuenta una rentabilidad exigida del 14,6 % anual con nuestros flujos, o un crecimiento de los ingresos del 26,6 % anual, frente al 12,9 % del base; con el P/VC, un Ke del 11,9 %: menos que el propio bono a 10 años (15,44 %). Con la prima implícita del mercado (4,2 %, Ke del 20,8 %) el valor sube a 29,60. Las cifras del DCF tienen sentido (coinciden con el modelo de exceso de rentabilidad), pero dependen casi por completo del Ke.',
  narrativas: {
    Bajista: 'El ROE baja 4 puntos (22 % en 2027e): el 26-oct abre un ciclo de tipos altos, menos operaciones de banca de inversión y renta variable, más morosidad en Pan y en las pymes, y menos rendimiento del trading.',
    Base: 'ROE ajustado del 26 % en 2026e-2027e que baja hasta el 24 % en 2035e; payout del 30 % y patrimonio que crece un 17 % al año hasta 2030; Ke del 22,48 %.',
    Alcista: 'El ROE sube 2 puntos (28 %): la volatilidad da más trading, la Selic alta rinde más sobre el patrimonio y la banca privada sigue captando.',
  },
  escenarios_comentario: 'Los tres escenarios quedan muy por debajo del precio: alcista 30,06 BRL (−50 %), base 25,95 (−57 %) y bajista 18,94 (−68 %), muy cerca de los del modelo de exceso de rentabilidad (30,86, 26,37 y 18,77). El rango lo mueve mucho más el Ke que el ROE: con la tasa libre del 23-oct, el base sería de 32,77 BRL y, con un ROE 2 puntos mayor, de 38,51; ni así se acerca a los 60 del precio.',
  suma_partes: {
    aplica: true, descuento_holding_pct: 0,
    partes: [
      { segmento: 'Gestión de patrimonios y de activos (Wealth + Asset Management, 22,4 % de los ingresos del 1S26)', metrica: 'Beneficio neto 2026e', valor_metrica: 4565, multiplo: 9.0, ev_directo: null, justificacion: 'Beneficio repartido por el peso en los ingresos del 1S26 [A1]. PER de 9 veces: entre XP (6,7 veces el BPA de 2026e) y las gestoras globales (Goldman 12,1, Morgan Stanley 13,5) [D2].' },
      { segmento: 'Banca de inversión y Sales & Trading (23,6 %)', metrica: 'Beneficio neto 2026e', valor_metrica: 4810, multiplo: 6.0, ev_directo: null, justificacion: 'Negocio volátil y ligado al mercado de capitales brasileño: PER de 6 veces, el de los bancos brasileños después del 26-oct [D2].' },
      { segmento: 'Crédito corporativo, consumo (Banco Pan) y rendimiento del patrimonio (54,2 %)', metrica: 'Beneficio neto 2026e', valor_metrica: 11046, multiplo: 6.0, ev_directo: null, justificacion: 'PER de los bancos de crédito: Bradesco 5,6, Santander 6,1, Itaú 8,3, Banco do Brasil 4,2 veces [D2].' },
    ],
    comentario: 'Contraste, peso 0: con el beneficio de 2026e (20.380 M) repartido por ingresos —supone márgenes iguales en todos los negocios, lo que no es cierto— y los PER de los cotizados brasileños después del 26-oct, la suma de partes da ≈ 136.000 M BRL, unos 35 BRL por unit (−41 %). El banco no publica beneficio por línea de negocio [A1].',
    confianza: 'Baja',
  },
  casos_12m: {
    Bajista: 'ROE 4 puntos menor (ciclo de tipos altos, menos mercado de capitales, más morosidad): BPA de 5,41 BRL en 2028e × 6,3 veces (el mínimo adelantado de 5 años, el de 2024) = 34,08 BRL.',
    Base: 'ROE del 25,1 % sobre el valor contable de inicio de 2028 y payout del 30 %: BPA de 6,68 BRL en 2028e × 9,9 veces (a mitad de camino del actual, 10,2, hacia la mediana adelantada, 9,7) = 66,13 BRL.',
    Alcista: 'ROE 2 puntos mayor (trading, Selic alta sobre el patrimonio, banca privada): BPA de 7,35 BRL × 11,0 veces (la media adelantada de 2019-2025) = 80,85 BRL.',
  },
  diferencia_consenso: 'Nuestro BPA de 2026e (5,28 BRL) queda un 0,8 % por debajo del consenso (5,32) y el de 2027e (5,91) un 3,6 % por debajo (6,13) [D2]: rebajamos 2027e por el golpe del 26-oct en banca de inversión y crédito, que el consenso, anterior a la elección, aún no recoge. El objetivo medio de los analistas (75,31 BRL) es también anterior al 26-oct y queda un 14 % por encima de nuestro base (66,13).',
  objetivo_comentario: 'El objetivo a 12 meses ponderado (61,80 BRL) da un +5,2 % con el dividendo y el base, un +12,4 %: no llega al 15 % que pide la regla, y además el valor intrínseco (25,59 BRL) está un 57 % por debajo del precio. Mantener. La regla a 12 meses se fía del PER histórico (9,7 veces adelantado), que es el de un mercado que siempre ha pagado por BTG mucho más que su Ke en BRL: eso es lo que separa el objetivo a 12 meses del valor intrínseco.',
  valoracion_comentario: 'Pesos: DCF adaptado (modelo de dividendos) 50 % y escenarios 50 %, que reproducen el de exceso de rentabilidad (26,37 BRL, el valor que manda; ver valoracion-banco.md). Comparables, suma de partes (≈ 35 BRL) y P/VC justificado (1,14 veces, 23,5 BRL) quedan como contraste. Con el Ke de hoy todos dan entre 19 y 39 BRL. El precio (60,00) solo se explica con un Ke del 12-15 %, por debajo de la tasa libre brasileña: o el mercado cree que los tipos largos volverán al 10-11 % y que el ROE del 25 % durará décadas, o el CAPM en BRL exagera el riesgo de BTG.',
  catalizadores: {
    items: [
      { fecha: '2026-11 (primera semana)', evento: 'Copom: mantener, recortar o subir la Selic (13,75 %)', efecto: 'Fija la tasa libre y el Ke; una subida apoya el rendimiento del patrimonio pero frena el mercado de capitales', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-11-10', evento: 'Resultados del 3T26 (antes de la apertura)', efecto: 'Último trimestre antes de la elección: ROAE, captación de banca privada, coste del crédito', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-11/12', evento: 'Equipo económico y paquete fiscal del nuevo mandato de Lula', efecto: 'Si convence, baja el bono a 10 años y sube el valor (cada punto de tasa libre ≈ 2,6 BRL por unit)', probabilidad: 'Media', sentido: '+/−' },
      { fecha: '2027-02', evento: 'Resultados de 2026 y guía de ROAE de 2027', efecto: 'Confirmar un ROE > 25 % con la Selic alta', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027', evento: 'Integración de Banco Pan al 100 % y de las compras de banca privada (Julius Baer Brasil, JGP, HSBC Uruguay)', efecto: 'Más beneficio por unit y más crédito al consumo', probabilidad: 'Media', sentido: '+' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Tipos largos en BRL altos durante años (fiscal del nuevo mandato)', tipo: 'Macro', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−10 % por cada 1 punto más de tasa libre (≈ 2,6 BRL por unit)', mitigante: 'La Selic alta sube la remuneración del patrimonio (17 % de los ingresos) [A1].' },
      { riesgo: 'Menos mercado de capitales: banca de inversión, salidas a bolsa, renta variable', tipo: 'Ciclo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'La banca de inversión es solo el 5,2 % de los ingresos del 1S26 [A1].' },
      { riesgo: 'Pérdida en la tesorería (Sales & Trading) en un día como el 26-oct', tipo: 'Mercado', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−3 a −8 %', mitigante: 'VaR medio del 0,22 % del patrimonio en el 2T26 (0,38 % en el 4T25); el trading bajó del 30,8 % al 18,4 % de los ingresos [A1, A2].' },
      { riesgo: 'Morosidad: Banco Pan (consumo), pymes y crédito corporativo con tipos altos', tipo: 'Crédito', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'Coste del riesgo ≈ 2 % de la cartera amplia; fase 3 del 3,7 % [A1, A7].' },
      { riesgo: 'Gobierno y personas clave: un caso como el de 2015 (detención de Esteves) y la salida de depósitos', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−20 a −40 %', mitigante: 'Liquidez (LCR del 160 %), financiación diversificada y la absolución de 2018; los socios controlan el 79,6 % de los votos [A1, C2, C4].' },
      { riesgo: 'Capital: crecer el balance un 17 % al año con un CET1 del 11,6 %', tipo: 'Regulación', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Payout del 25-30 % y emisiones de deuda subordinada y perpetua [A1, A8].' },
      { riesgo: 'Riesgo de IA (gestores automatizados y plataformas digitales que abaratan la banca privada y la intermediación)', tipo: 'Tecnología', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '±3 % a 3-5 años', mitigante: 'BTG ya compite en digital (BTG Pactual digital, Banco Pan) y su cliente rico valora el asesor.' },
    ],
    premortem: 'Octubre de 2028: la unit vale 35 BRL. El nuevo mandato no convenció con su plan fiscal, el bono a 10 años se quedó por encima del 15 % y la Selic volvió a subir en 2027. La banca de inversión y la renta variable se secaron, Banco Pan sufrió con la morosidad del consumo y el ROE bajó al 21-22 %. El mercado dejó de pagar 2,9 veces el valor contable por un banco que ya no ganaba mucho más que su coste del capital, y el PER cayó a 6 veces, el de 2024.',
    ia: {
      exposicion: 'Media', sentido: 'Mixto', efecto_valor: '±3 % a 3-5 años',
      comentario: 'La IA abarata el asesoramiento y la intermediación (gestores automatizados, comparadores, carteras modelo), que son parte de la banca privada y de la plataforma digital de BTG; también puede bajar los costes del banco (eficiencia del 35-37 %). En la banca de inversión y en la tesorería, lo que vende BTG es balance, relaciones y riesgo, que la IA no sustituye. Efecto neto pequeño.',
    },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Selic y ROE', pregunta: '¿Cuánto del ROE del 26 % depende de la Selic sobre el patrimonio y qué ROE da con una Selic del 10 %?', por_que: 'Separa la calidad del banco del nivel de los tipos.' },
      { tema: 'Capital', pregunta: '¿Qué CET1 objetivo tiene y cuánto puede crecer el balance sin subir el payout ni emitir?', por_que: 'El valor supone un patrimonio que crece un 17 % al año hasta 2030.' },
      { tema: '26-oct', pregunta: '¿Cómo terminó la tesorería la semana de la elección y cómo va la captación de banca privada en octubre-noviembre?', por_que: 'Es la primera prueba del riesgo de mercado y de la franquicia.' },
      { tema: 'Banco Pan', pregunta: '¿Qué coste del crédito espera en Pan con la Selic alta en 2027?', por_que: 'Es la parte de consumo, la más sensible a los tipos.' },
      { tema: 'Socios', pregunta: '¿Cómo se renueva el partnership y qué pasa con las units de los socios que salen?', por_que: 'Posible oferta de units y gobierno del banco.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Baja', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener, con convicción baja; para quien no la tiene, no comprar. El objetivo a 12 meses es de 61,80 BRL (nuestro BPA de 2028e × el PER de la regla común), un +5,2 % ponderado y un +12,4 % en el base: por debajo del 15 % de compra. El valor intrínseco (25,59 BRL; 26,37 con el modelo de exceso de rentabilidad) está un 57 % por debajo del precio de 60,00 BRL (cierre de B3 del 26-oct-2026). Y la calidad no pasa: el ROE ajustado (26,2 %) supera al Ke (22,48 %) en solo 3,7 puntos, menos de 4,5. **El método no da una señal fiable**: con un Ke en BRL de este nivel casi ningún banco brasileño vale su precio, y el precio solo se explica con un Ke del 12-15 %. La convicción es baja, y no media como sugieren los criterios, porque las reglas coinciden en Mantener pero apuntan en sentidos opuestos (+5 % a 12 meses frente a −57 % de valor intrínseco) y todo depende de un Ke tomado el día de mayor tensión de los tipos; subiría la convicción un bono a 10 años estable (en el 13 % o en el 15 %) y unos resultados del 3T26 con un ROAE por encima del 26 %, y la bajaría un Copom que sube la Selic con un ROE a la baja.

**El negocio.** BTG es el mayor banco de inversión de América Latina, con banca privada, gestión de activos, crédito a empresas, tesorería y, desde 2026, Banco Pan al 100 % [A1, D14]. Ingresos ajustados de 33.039 M BRL en 2025 y beneficio de 16.685 M (BPA de 4,32 BRL por unit) [A2]. La calidad sostiene el crecimiento proyectado solo en parte: el ROE del 24-26 % es el máximo de su historia y en parte viene de la propia Selic.

**Finanzas.** El ROE ajustado subió del 17,4 % de 2021 al 26,2 % de 2025, con menos trading y más comisiones [A1, A2]. Capital justo: CET1 del 11,6 % y Basilea del 16,0 %; liquidez holgada (LCR del 160 %); VaR medio del 0,22 % del patrimonio; fase 3 del 3,7 % [A1].

**Equipo y gobierno.** Lo controlan sus socios (68,6 % del capital, 79,6 % de los votos); André Esteves, detenido en 2015 y absuelto en 2018, preside el consejo y Roberto Sallouti es el consejero delegado desde 2016 [C1, C2, C4]. La crisis de 2015 enseñó el riesgo de persona clave: salida de depósitos y venta de activos.

**Valoración.** Ke = 15,44 % (bono a 10 años del 26-oct [D3]) + 1,28 × 5,5 = 22,48 %; sin prima país, que ya está en el bono. El modelo de exceso de rentabilidad da 26,37 BRL (1,28 veces el valor contable) y el P/VC justificado, 1,14 veces frente a las 2,91 del precio. Con la tasa del 23-oct (Ke del 20,0 %) daría 32,77 y con la prima del mercado (4,2 %), 29,60. El DCF inverso descuenta una rentabilidad exigida del 14,6 %.

**El efecto Lula.** La reelección del 25-oct subió 2,46 puntos el bono a 10 años y BTG cayó un 24,8 % en un día [D3, D10]. Para el banco cambia sobre todo el Ke (−20 % de valor); el beneficio, menos: más Selic sobre el patrimonio, menos mercado de capitales y más morosidad (BPA de 2027e −3,6 % frente al consenso). Contexto: retrasa hasta el Copom y los resultados del 10-nov [D8].

**Qué cambiaría la decisión.** Comprar exige a la vez un precio por debajo de 25,59 BRL y un diferencial ROE − Ke de al menos 4,5 puntos (con el Ke de hoy, un ROE del 27 % sostenido); vender, por encima de 70,11 BRL. Un bono a 10 años de vuelta al 13 % subiría el valor a ≈ 33 BRL, todavía lejos del precio.`,
    tesis: 'BTG es un banco de muy alta calidad para Brasil (ROE ajustado del 26 %, menos dependiente del trading, banca privada que capta) que cotiza a 2,9 veces su valor contable. Con un coste del capital en BRL del 22,5 % tras la elección, esa calidad apenas supera el coste y el valor intrínseco es de 26 BRL: el precio descuenta tipos mucho más bajos o un ROE alto durante décadas.',
    vision_diferencial: {
      mercado_descuenta: 'Un Ke del 12-15 % (por debajo del bono a 10 años en BRL) o un crecimiento del 26 % anual; los analistas, antes de la elección, ponían un objetivo medio de 75 BRL con 11 de 13 en comprar [D2].',
      nuestra_vision: 'Coincidimos en el beneficio (BPA de 2027e de 5,91 frente a 6,13); discrepamos en el coste del capital: con el bono en el 15,4 %, un ROE del 25 % vale poco más que el valor contable.',
      por_que: 'Es aritmética: P/VC = (ROE − g) ÷ (Ke − g) = (25 − 5) ÷ (22,5 − 5) = 1,14 veces.',
    },
    a_favor: [
      '**ROE alto y estable**: 26,2 % en 2025 y 26,6 % en el 1S26.',
      '**Menos trading**: del 30,8 % al 18,4 % de los ingresos.',
      '**Banca privada**: crece con compras (Julius Baer Brasil, JGP) y captación.',
      '**La Selic alta** sube el rendimiento del patrimonio.',
      '**PER moderado**: 10,2 veces el BPA de 2027e, cerca de su mediana (9,7).',
    ],
    en_contra: [
      '**Valor intrínseco**: 26 BRL frente a 60 con el Ke de hoy.',
      '**ROE − Ke de 3,7 puntos**: no pasa la regla de calidad.',
      '**2,9 veces el valor contable**: justificado 1,1 veces.',
      '**Ciclo**: mercado de capitales y crédito a la baja con tipos altos.',
      '**Persona clave y gobierno**: la crisis de 2015.',
    ],
    que_vigilar: 'La tesis depende del bono a 10 años en BRL (cada punto ≈ 2,6 BRL de valor por unit) y de que el ROE se mantenga por encima del 25 % con tipos altos. La señal en contra sería un ROAE por debajo del 23 % o un CET1 por debajo del 11 %.',
    cambiaria_recomendacion: [
      'Precio por debajo de 25,59 BRL con un ROE − Ke ≥ 4,5 puntos: Comprar.',
      'Precio por encima de 70,11 BRL: Vender (ponderada ≤ −10 %).',
      'Bono a 10 años en el 13 % o menos de forma estable: repetir el análisis (Ke ≈ 20 %, diferencial ≈ 6 puntos).',
      'ROAE ajustado < 23 % dos trimestres seguidos: revisar a la baja.',
    ],
    kpis_seguimiento: [
      { kpi: 'ROAE ajustado', nivel_actual: '26,7 % (2T26)', umbral_alerta: '< 23 %', por_que: 'Es la calidad del banco.' },
      { kpi: 'Bono de Brasil a 10 años', nivel_actual: '15,44 % (26-oct)', umbral_alerta: '> 16 % o < 13 %', por_que: 'Mueve el Ke y el valor.' },
      { kpi: 'CET1', nivel_actual: '11,6 % (2T26)', umbral_alerta: '< 11 %', por_que: 'Limita el crecimiento y el payout.' },
      { kpi: 'VaR medio ÷ patrimonio', nivel_actual: '0,22 % (2T26)', umbral_alerta: '> 0,4 %', por_que: 'Riesgo de la tesorería.' },
      { kpi: 'Coste del crédito', nivel_actual: '≈ 2 % (1S26)', umbral_alerta: '> 2,5 %', por_que: 'Morosidad con tipos altos.' },
    ],
    confianza: 'Baja',
  },
  fuentes: [],
};
