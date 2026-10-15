// Textos del analista (Modine, corte 2026-10-15). Cifras del motor tal cual; hechos con cita de la nota ([A1], [D7]).
export default {
  limitaciones: 'Precio de cierre del miércoles 14-oct-2026 (157,75 USD): el jueves 15-oct, fecha de corte, la sesión de Nueva York no había cerrado (150,14 USD a las 13:00 de Nueva York) [D1, D6]. El análisis es de Modine sin Performance Technologies, escindida y fusionada con Gentherm el 1-oct-2026 [D7]. La cuenta FY2024-FY2026 es el pro forma del artículo 11 sin Performance Technologies que publicó la empresa (no auditado) [A1]; FY2022-FY2023 es estimación propia con el segmento Climate Solutions y Corporate del 10-K FY2024 [A5]. Los balances FY2022-FY2025 y todos los flujos son los publicados, con Performance Technologies, porque no hay balances ni flujos pro forma de esos años [A6]; el balance FY2026 es el pro forma a 30-jun-2026 [A1]. Por eso los ratios de balance de los años anteriores no comparan con la cuenta. Los precios de cierre de los ejercicios anteriores a FY2027 incluyen el valor de Performance Technologies (≈15 USD por acción en acciones de Gentherm al cierre de la operación [D7]). El consenso gratuito mezcla perímetros (FY2027e con Performance Technologies en el primer semestre) [D2]. Ejercicio de abril a marzo; «FY2026» termina el 31-mar-2026.',
  controles_explicados: [
    { control: 'Tipo impositivo efectivo razonable (FY2026)', explicacion: 'El 37,1 % sale del cargo de 116,1 M por terminar el plan de pensiones, con menos deducción fiscal en el pro forma [A1]; el DCF usa un 24 %, el tipo combinado que da la empresa [A1].' },
    { control: 'DCF inverso calculable', explicacion: 'No hay crecimiento razonable que lleve el DCF al precio con el margen del caso base: el motor da el margen implícito (30 % de EBITDA frente al 17 % del base) y la rentabilidad implícita (7,8 %), que son la lectura del precio.' },
    { control: 'Crecimiento del BPA base ≤ 25 % anual desde el último real', explicacion: 'El BPA real de FY2026 (1,00 USD) lleva el cargo de pensiones de 116,1 M; sin él sería ≈2,60 USD (estimación propia), y el BPA de FY2029e (8,89) supone un 49 % anual, en línea con unas ventas de centros de datos que crecen un 73-90 % [A2, A3]. Explicado en el comentario del objetivo.' },
  ],
  huecos: [
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) 10-K FY2026 (competencia): sin cuotas; 2) informes de mercado gratuitos (Arizton, ResearchAndMarkets): cuotas de pago; 3) derivarla de las ventas de los competidores: Vertiv y Schneider no separan refrigeración', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'margen_ebit_pct de los competidores', tipo: 'Complemento', intentos: '1) Yahoo (solo margen EBITDA de grupo); 2) informes anuales: no separan la refrigeración de centros de datos; 3) se da el margen EBITDA del grupo en el comentario', decision: 'Omitido' },
    { seccion: 'balance', campo: 'vencimientos', tipo: 'Complemento', intentos: '1) Pro forma 8-K/A (solo saldo); 2) 10-Q del 1T FY2027: antes de amortizar 198,6 M con el cobro de la escisión; 3) 8-K del cierre: sin calendario nuevo', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Proxy 2026 y 10-K: no citan calificaciones; 2) MSCI y Sustainalytics: de pago; 3) prensa: nada reciente', decision: 'Omitido' },
    { seccion: 'trimestres', campo: 'EBITDA y BPA por trimestre del perímetro que queda', tipo: 'Complemento', intentos: '1) Pro forma: solo FY y 1T FY2027; 2) reexpresión de segmentos (ventas, margen bruto y beneficio operativo por segmento, sin costes centrales por trimestre); 3) no se puede repartir el corporativo por trimestre sin inventar', decision: 'Omitido' },
    { seccion: 'identificacion', campo: 'proximos_resultados', tipo: 'Complemento', intentos: '1) Web de inversores: sin anuncio del 2T FY2027 a 15-oct; 2) calendario de prensa: sin fecha; 3) el año pasado, 28-oct (después del cierre)', decision: 'Calculado y marcado como estimación' },
  ],
  secciones: {
    negocio: {
      geografias: [{ nombre: 'América', peso_pct: 74.5 }, { nombre: 'Europa', peso_pct: 24.3 }, { nombre: 'Asia', peso_pct: 1.2 }], geografias_criterio: 'origen',
      descripcion: 'Tras la escisión, Modine (pronto Modexus Solutions) diseña y fabrica equipos para enfriar y climatizar: enfriadoras, unidades de aire y CDU de refrigeración líquida para centros de datos (Data Centers, 1.108 M de ventas en FY2026) y baterías, intercambiadores, calefactores industriales y unidades de tratamiento de aire para edificios, naves, invernaderos y frío comercial (Commercial HVAC, 974 M) [A4, A2]. Vende a hiperescaladores y operadores de colocation, a fabricantes de climatización (OEM) y a instaladores y distribuidores. Tiene 28 plantas en Climate Solutions: 17 en América, 9 en Europa y 2 en Asia [B1]; el 74 % de las ventas de ese segmento se factura en América [A2]. La marca Modine pasa a Gentherm y la empresa la usa con licencia en climatización comercial [D7].',
      como_gana_dinero: 'Vende equipos por proyecto y por pedido, sin ingresos recurrentes relevantes. En centros de datos el margen depende de llenar la capacidad nueva y de la mezcla: en FY2026 dio un 24,7 % bruto y un 17,6 % operativo, pero en el 1T FY2027 bajó al 20,2 % bruto y al 13,3 % operativo por los costes de arrancar plantas y la falta de componentes [A4, A3]. Climatización comercial da un 25-26 % bruto y un 13 % operativo, con estacionalidad de invierno en calefacción [A4]. Los costes centrales (88,4 M en FY2026, el 4,3 % de las ventas del perímetro) pesan ahora sobre la mitad de ventas que antes [A2, A1]. Alto apalancamiento operativo: cada punto de margen bruto en centros de datos son ≈17 M de beneficio operativo con las ventas de FY2027e.',
      clientes: 'Concentración alta: los diez primeros clientes son el 49 % de las ventas del grupo de FY2026 y los cinco primeros están en centros de datos, vehículo comercial y maquinaria [A2]; sin Performance Technologies el peso de los hiperescaladores en el perímetro es mayor. En agosto de 2026 la prensa informó de que Google sería un cliente de unos 4.000 M en varios años, sin confirmación de la empresa [D9]. Poder de precios: el margen bruto del perímetro subió del 18 % en FY2022 al 25 % en FY2026 [A5, A1], pero en centros de datos el cliente reparte pedidos y el 1T FY2027 muestra que el coste de la capacidad no se repercute de inmediato [A3].',
    },
    calidad: {
      comentario: 'La calidad contable es aceptable pero con dos reservas. Primera, la historia del perímetro que se valora es pro forma no auditada (FY2024-FY2026) y estimación propia (FY2022-FY2023) [A1, A5]. Segunda, el auditor (KPMG) dio en FY2024 opinión adversa sobre el control interno por una debilidad material en los controles de TI de Europa, sin errores en las cuentas [A5]; no aparece en FY2026 [A2]. El BPA ajustado de la empresa excluye reestructuraciones, costes de compras y de la escisión y el cargo de pensiones; en FY2026 el cargo de 116,1 M fue no monetario [A2]. Altman Z 6,40 (sin riesgo), Piotroski 7 de 9 y Beneish −2,77 (sin señal de manipulación): los tres se calculan con balances consolidados de otro perímetro, así que orientan, no deciden. La remuneración en acciones es moderada (el consejero delegado, 6,1 M de 10,2 M) [C1].',
    },
    rentabilidad: {
      comentario: 'El ROIC del perímetro es del 12,9 % en FY2026 (16,6 % sin fondo de comercio), con un WACC del 12,84 %: crea muy poco valor sobre su coste de capital, que es alto por la beta (1,45) y por un bono a 10 años del 5,21 % [D4]. El capital medio mezcla el balance consolidado de FY2025 con el pro forma de FY2026, de tamaño parecido (1.130 M y 1.168 M). El ROIC incremental histórico (29,6 %) es mucho mejor: el NOPAT subió más que el capital mientras el 80/20 elevaba márgenes. Vertiv y Trane rinden por encima del 20 % sobre el capital, con márgenes EBITDA del 23 % y el 19 % [B5]. La tesis necesita que el margen de centros de datos vuelva: con el 17 % de EBITDA del caso base, el ROIC de FY2029e superaría el 20 % (estimación propia), pero el requisito se mide con el último ejercicio real.',
      confianza: 'Media',
    },
    capital: {
      politica: 'No paga dividendo. Prioridades declaradas: capacidad para centros de datos (capex de 143 M en FY2026 y 46 M solo en el 1T FY2027 [A2, A3]), compras selectivas en climatización comercial y recompras puntuales [A2]. El cobro de la escisión (198,6 M en total) se usó para amortizar la línea de crédito [A1]. En el 1T FY2027 la deuda neta subió 70 M por la compra de acciones a los directivos dentro del plan de remuneración [A3].',
      adquisiciones: [
        { anio: 'FY2017', objetivo: 'Luvata Heat Transfer Solutions', importe: 364, ev_ebitda: null, financiacion: 'Deuda y caja', resultado: 'Base de Heat Transfer Solutions; el grupo tuvo pérdidas en FY2021 con deterioros [A6].' },
        { anio: 'FY2024', objetivo: 'Scott Springfield Manufacturing', importe: 184, ev_ebitda: null, financiacion: 'Deuda', resultado: 'Unidades de aire para centros de datos y edificios; integrada en Climate Solutions [A2].' },
        { anio: 'FY2026', objetivo: 'L.B. White', importe: 111, ev_ebitda: null, financiacion: 'Deuda', resultado: 'Calefacción especial; parte de los 119 M de ventas añadidas en FY2026 [A2].' },
        { anio: 'FY2026', objetivo: 'Climate by Design International', importe: 64, ev_ebitda: null, financiacion: 'Deuda', resultado: 'Deshumidificación y unidades de proceso [A2].' },
        { anio: 'FY2027', objetivo: 'Performance Technologies (venta: escisión y fusión con Gentherm)', importe: 946, ev_ebitda: 8.1, financiacion: '156 M en caja + 43,6 % de Gentherm para los accionistas', resultado: 'Cerrada el 1-oct-2026; valorada en 946,4 M con el precio de Gentherm del 30-sep [D7].' },
      ],
      comentario: 'Buena asignación en los últimos cinco años: el capital se ha llevado de un negocio de automoción de margen bajo a centros de datos y climatización, y la escisión cobra caja y deja el negocio de vehículos fuera sin coste fiscal [D7]. El ROIC incremental histórico del 29,6 % lo confirma. Dos dudas: el capex crece más rápido que el beneficio (flujo libre negativo en el 1T FY2027 [A3]) y las compras de climatización se pagan con deuda sin múltiplo publicado. Las recompras son menores y en parte sirven para retener a directivos.',
      confianza: 'Media',
    },
    bolsa: {
      comentario: 'Rentabilidad excepcional en cinco años (67,1 % anual frente al 13 % del S&P 500) por la reconversión a centros de datos, pero con volatilidad del 71,5 % y una caída máxima del 51,6 % en cinco años [D1]. En 2026 la acción subió de 120 a 323 USD (máximo del 26-may tras los resultados anuales) y ha devuelto la mitad: el sector de infraestructura de IA corrigió en junio-julio y en septiembre [D9], el 1T FY2027 mostró el margen de centros de datos hundido [A3] y la escisión restó ≈15 USD por acción en acciones de Gentherm a partir del 2-oct [D7]. Posición corta del 5,9 % del capital libre [D2].',
      contexto: {
        movimiento: { fecha: '2026-10-15', var_1m_pct: -17.1, var_3m_pct: -34.5, var_6m_pct: -36.2, var_12m_pct: -2.3, dist_max_52s_pct: -51.1, dist_min_52s_pct: 25.4, dist_max_historico_pct: -51.1, tendencia: 'bajista', volatilidad_60d_pct: 70, avisos: ['P3 Caída fuerte: −35 % en tres meses', 'P5 Un 30 % por debajo de la media de 200 sesiones (tendencia bajista)'] },
        movimientos_fuertes: [
          { periodo: 'ene-2026', var_pct: 20.3, causa: 'Subida del 29-ene con el anuncio de la escisión de Performance Technologies y el objetivo de crecer un 50-70 % anual en centros de datos [B2].', veredicto: 'no cambia', condicion: null },
          { periodo: 'may-2026', var_pct: 13.6, causa: 'Subida del 26-may con los resultados de FY2026 (ventas +23 %) [A7].', veredicto: 'no cambia', condicion: null },
          { periodo: 'jun-jul-2026', var_pct: -30.5, causa: 'Corrección de las acciones de infraestructura de IA [D9], ventas de directivos [C3] y caídas del 28 y 29-jul (−9,7 % y −14,4 %) antes de unos resultados con el margen de centros de datos 9,6 puntos más bajo [A3]; sin hecho de la empresa identificado los días 28-29.', veredicto: 'no cambia', condicion: null },
          { periodo: 'sep-oct-2026', var_pct: -17.1, causa: 'El 28-sep (−11,6 %) fue la fecha de registro de la escisión; el 2-oct (−5,8 %) cotizó ya sin Performance Technologies (≈15 USD por acción en acciones de Gentherm) [D7, D10]; el 14-oct (−8,6 %) cayó con el Nasdaq (−1,9 %) sin noticia propia encontrada [D6].', veredicto: 'no cambia', condicion: null },
        ],
        noticias: [
          { fecha: '2026-10-01', tipo: 'fusión u oferta', hecho: 'Cierre de la escisión: los accionistas reciben 0,44619 acciones de Gentherm por acción y la empresa 156 M en caja [D7].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-10-13', tipo: 'accionista de referencia', hecho: 'Junta extraordinaria el 13-nov-2026 para cambiar el nombre a Modexus Solutions [D12]; sin efecto económico.', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-06-22', tipo: 'directivos', hecho: 'Ventas de directivos y consejeros por 40,4 M USD en 12 meses, sin compras; el consejero delegado vendió 5,1 M con plan 10b5-1 [C3].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-08-21', tipo: 'rumor', hecho: 'Informe de prensa que señala a Google como cliente de unos 4.000 M en centros de datos; la acción subió ese día [D9]. Sin confirmación de la empresa.', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-07-29', tipo: 'recomendación', hecho: 'Recortes del BPA de consenso en 90 días (FY2027e de 7,80 a 6,51 USD) [D2]; objetivos de 260-355 USD fijados en mayo-junio [D11].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-10-28', tipo: 'resultados', hecho: 'Resultados del 2T FY2027 hacia el 28-oct (estimación: misma semana que en 2025; sin anuncio aún) y primera guía sin Performance Technologies [A3].', veredicto: 'no cambia', condicion: null },
        ],
        proximos_resultados: '2026-10-28',
        veredicto: 'no cambia',
        condicion: null,
        comentario: 'La caída del 51 % desde máximos se explica por tres cosas: la corrección de las acciones de IA, el margen de centros de datos del 1T y los ≈15 USD por acción que salieron con Gentherm; no hay colocación, ampliación ni litigio pendiente. Las ventas de directivos son grandes pero repartidas, varias con plan 10b5-1 y tras una subida de veinte veces en cuatro años: no llegan a «descarta». Nada de esto cambia la conclusión, que la decide la valoración: el precio sigue muy por encima del valor intrínseco. Los resultados cercanos no aplazan nada (regla 11). Fuentes: EDGAR, Seeking Alpha, Quiver, Stocktwits.',
      },
    },
    multiplos_historicos: {
      comentario: 'Solo tres cierres sirven (FY2024-FY2026): antes, Modine era otra empresa, un proveedor de automoción que cotizaba a 3-9 veces el beneficio del año siguiente. Con la historia adelantada el PER fue de 27,8x (mar-24), 19,9x (mar-25, con el BPA de FY2026 sin el cargo de pensiones) y 39,8x (mar-26, con nuestro BPA de FY2027e del grupo entero, 5,45 USD); hoy cotiza a 21,5x nuestro BPA de FY2028e. El PER de los últimos doce meses (109,5x) no significa nada: el BPA de FY2026 lleva el cargo de pensiones y el pro forma excluye el beneficio del negocio escindido. El mercado ha pasado de pagar el crecimiento a dudar de él.',
    },
    comparables: {
      criterio: 'Nueve cotizadas de climatización y de infraestructura térmica y eléctrica de centros de datos de EE. UU. e Irlanda, con datos de Yahoo del 15-oct-2026 [D2]: Vertiv (el comparable más directo en centros de datos), nVent, Eaton (refrigeración líquida con Boyd), Trane, Johnson Controls y Carrier (enfriadoras y climatización comercial), Lennox, AAON y SPX (climatización comercial y frío). Fuera Schneider (cotiza en euros y la refrigeración es una parte pequeña) y Daikin (Japón, otro ciclo). El PER de los próximos doce meses usa BPA ajustado de consenso; el de Modine, nuestro BPA, casi igual al ajustado de la empresa.',
      comentario: 'Modine queda en la zona de crecimiento alto (≈40 % en los próximos doce meses frente al 6-30 % de los comparables) pero con el margen EBITDA más bajo del grupo (13 % frente a una mediana del 21 %). La mediana del PER de los próximos 12 meses (22,9x) da 194,45 USD; con el EV/EBITDA de los últimos 12 meses, 122,39 USD: el EBITDA actual no sostiene el precio y el PER solo lo hace si se cumple nuestro BPA de FY2028e. Una prima sobre Trane o Lennox se justifica por crecimiento, pero el ROIC (12,9 %) está por debajo del de Vertiv o Trane [B5]. Peso del 20 %.',
    },
    transacciones: {
      comentario: 'Los grandes pagan caro la refrigeración líquida: Eaton, 22,5 veces el EBITDA de 2026e por Boyd Thermal [B6]; Schneider, un múltiplo medio de un dígito de las ventas por Motivair [B7]. La venta de Performance Technologies (8,1 veces el EBITDA ajustado, 6,8 con sinergias [B2]) no es comparable. Modine podría ser objetivo (sin accionista de control, capitalización de ≈8.500 M), pero tiene consejo escalonado y la operación tendría que pagar sobre un precio que ya está por encima del valor intrínseco. Peso 0: no hay múltiplos suficientes de operaciones comparables.',
    },
    sentimiento: {
      lectura: 'El sentimiento de los particulares está dividido y empeora con el precio: unos ven «una caída para comprar» y otros miran soportes más abajo [E1, E2]. No es capitulación: los mensajes siguen esperando 200-300 USD, cerca del objetivo de los analistas, mientras el valor intrínseco del informe es de 93 USD. El foro apunta a lo mismo que el análisis (el margen de centros de datos) y no añade riesgos nuevos.',
    },
    catalizadores: {
      items: [
        { fecha: '≈28-oct-2026', evento: 'Resultados del 2T FY2027 y primera guía sin Performance Technologies', efecto: 'Fija la base de BPA del nuevo perímetro; el margen de centros de datos del 2T dice si el 1T fue puntual', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: '13-nov-2026', evento: 'Junta extraordinaria: cambio de nombre a Modexus Solutions', efecto: 'Sin efecto económico', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: 'feb-2027', evento: 'Resultados del 3T FY2027', efecto: 'Primer trimestre completo sin Performance Technologies; capacidad nueva en marcha', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: 'ene-feb 2027', evento: 'Presupuestos de capex de 2027 de los hiperescaladores', efecto: 'Marcan la demanda de FY2028', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: 'may-2027', evento: 'Resultados de FY2027 y guía de FY2028', efecto: 'Objetivo de centros de datos > 2.000 M', probabilidad: 'Alta', sentido: '+/−' },
      ],
      confianza: 'Media',
    },
    riesgos: {
      items: [
        { riesgo: 'Frenazo del capex de IA de los hiperescaladores', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−41 % (bajista 39,80 frente al base 67,51)', mitigante: 'Climatización comercial (≈45 % de las ventas)', senal: 'Guías de capex de Microsoft, Alphabet, Amazon y Meta' },
        { riesgo: 'El margen de centros de datos no vuelve al 24-30 % bruto', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−20 % (2 puntos de margen menos)', mitigante: 'Curva de aprendizaje de las plantas nuevas', senal: 'Margen bruto del segmento en el 2T y 3T FY2027 por debajo del 22 %' },
        { riesgo: 'Concentración de clientes', tipo: 'Comercial', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 % por cliente grande perdido', mitigante: 'Cualificación con varios hiperescaladores', senal: 'Peso del primer cliente en el 10-K FY2027' },
        { riesgo: 'Competencia de grupos mayores (Vertiv, Schneider, Eaton con Boyd, Trane)', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Capacidad y plazos de entrega', senal: 'Precio medio y cuota en los concursos' },
        { riesgo: 'Falta de componentes y aranceles', tipo: 'Suministro', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Proveedores nuevos cualificados', senal: 'Comentarios del 2T sobre plazos' },
        { riesgo: 'Costes centrales sobredimensionados tras la escisión', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−5 %', mitigante: 'Acuerdo de servicios transitorios con Gentherm [A1]', senal: 'Corporate por encima de 80 M anuales' },
        { riesgo: 'Cambio tecnológico en la refrigeración (directa al chip, inmersión)', tipo: 'Tecnológico', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Vende CDU de refrigeración líquida', senal: 'Mezcla de pedidos por tecnología' },
      ],
      premortem: 'Octubre de 2029: la acción vale un 40 % menos. Lo más probable: en 2027 los hiperescaladores frenaron la inversión tras dos años de gasto récord sin el retorno esperado en la IA, y los pedidos de enfriadoras cayeron justo cuando Modine terminaba sus plantas nuevas de EE. UU. y Reino Unido. Con más capacidad que pedidos, el margen bruto de centros de datos no volvió del 20 % del 1T FY2027, los costes centrales que dejó la escisión pesaron más y el capex pagado no rindió su coste de capital. A la vez Vertiv, Schneider y Eaton (con Boyd) bajaron precios para llenar sus fábricas, y un cliente grande repartió su pedido. El BPA de FY2029 quedó en torno a 5-6 USD en vez de 8,9, y el mercado, que ya había pasado de pagar 40 veces a 18, no tuvo motivo para volver a pagar más. La señal temprana: el margen bruto de centros de datos del 2T y del 3T FY2027 por debajo del 22 % y unas guías de capex de los hiperescaladores para 2027 planas.',
      ia: { exposicion: 'Alta', sentido: 'Oportunidad', efecto_valor: '+15 % / −40 %', comentario: 'La IA no amenaza con sustituir lo que vende Modine: son equipos físicos de refrigeración que la IA necesita más (los bastidores de IA multiplican el calor por bastidor) y la empresa ya vende CDU de refrigeración líquida [B1]. El riesgo es el contrario: dependencia. Centros de datos son ya ≈54 % de las ventas del perímetro [A4] y la tesis entera depende de que el capex de IA siga creciendo; un frenazo lleva al escenario bajista (−41 % sobre el valor base). Riesgo de IA para el negocio: bajo como sustitución, alto como concentración en un ciclo. Señal: guías de capex de los hiperescaladores y pedidos de refrigeración líquida.' },
      confianza: 'Media',
    },
    preguntas: {
      items: [
        { tema: 'Margen', pregunta: '¿Qué margen bruto de centros de datos espera en el 4T FY2027 y cuánto de la caída del 1T son costes de arranque que desaparecen?', por_que: 'Cada punto son ≈17 M de beneficio operativo; el caso base pide el 17 % de EBITDA en FY2028.' },
        { tema: 'Guía', pregunta: '¿Cuál es el EBITDA ajustado de FY2027 sin Performance Technologies y qué parte de la guía de 650-680 M aportaba ese negocio?', por_que: 'Es la base que falta para el BPA del nuevo perímetro.' },
        { tema: 'Clientes', pregunta: '¿Cuánto pesa el primer cliente en el perímetro que queda y qué duración tienen los acuerdos (incluido el de Google publicado en prensa)?', por_que: 'La concentración es el mayor riesgo y no se publica sin Performance Technologies.' },
        { tema: 'Costes centrales', pregunta: '¿A cuánto bajarán los 88 M de costes centrales tras la escisión y en qué plazo?', por_que: 'Son el 4,3 % de las ventas del perímetro.' },
        { tema: 'Capex', pregunta: '¿Qué capex de capacidad queda para llegar a los objetivos de FY2028 y qué ROIC espera de él?', por_que: 'El ROIC actual (12,9 %) apenas cubre el WACC.' },
        { tema: 'Directivos', pregunta: '¿Por qué tantas ventas de directivos (40 M en 12 meses) y ninguna compra?', por_que: 'Señal de gobierno a vigilar.' },
      ],
      confianza: 'Media',
    },
  },
  dcf_justificacion: {
    crecimiento: 'FY2027e +38 %: el 1T creció un 50 % pro forma [A1] con centros de datos +90 % y climatización +22 % [A3]; la guía del grupo (+20-35 % con Performance Technologies plana) implica +30-55 % para el perímetro [A3], y frenamos por la falta de componentes. FY2028e +30 %: centros de datos +40 % (la empresa apunta a 50-70 % [B2]) y climatización +8 %. Después, convergencia al 5 % en FY2033e y terminal del 3 %. El consenso de ventas de FY2028e (4.139 M [D2]) queda un 12 % por encima de nuestros 3.687 M.',
    margenes: 'EBITDA del 15,0 % en FY2027e (13,6 % en FY2026 sin no recurrentes; 1T FY2027 deprimido) y del 17-17,5 % desde FY2028e, cuando la capacidad nueva madure: es el 19,6 % del segmento antes de costes centrales que daba la empresa en ene-26 [B2] menos ≈2,5 puntos de corporativo. Por debajo del 23 % de Vertiv y del 19 % de Trane [B5].',
    inversion: 'Capex del 5,5 % de las ventas en FY2027e y del 5,0 % en FY2028e (5,6 % en FY2026 [A2]), bajando al 3,6 % al final, por encima de la amortización (3,1 %). Circulante del 22 % de las ventas (≈22 % en el pro forma de jun-26 [A1]).',
    wacc: 'Tasa libre 5,21 % (bono a 10 años de EE. UU., 13-oct [D4]); beta 1,45, entre la ajustada semanal de cinco años (1,43) y la ajustada mensual (1,54) [D1]; prima de mercado del 5,5 %; deuda al 4 % del valor con un coste del 6,0 %. WACC 12,84 %. Con la prima implícita del mercado (4,2 % [D5]) el WACC baja al 11,03 %.',
    terminal: 'Gordon con un 3,0 %: crecimiento nominal de EE. UU., por debajo de la tasa libre menos medio punto. El valor terminal es el 65 % del valor; el múltiplo de salida implícito queda por debajo de la mediana de los comparables, coherente con un negocio que deja de crecer al doble del mercado.',
  },
  puente: {
    FY2027e: 'Volumen 33 puntos (capacidad nueva de centros de datos y climatización comercial), precio 3 (repercusión de aranceles y materiales) y otros 2 (año completo de Climate by Design y L.B. White) [A2, A3].',
    FY2028e: 'Volumen 27 puntos (centros de datos +40 %, por debajo del 50-70 % que apunta la empresa [B2]) y precio 3.',
    FY2029e: 'Volumen 15 puntos y precio 3: el mercado de refrigeración de centros de datos crece un 16,5-17 % anual hasta 2030 [B3, B4].',
  },
  veredicto: 'En parte',
  sostenibilidad_justificacion: 'Las pruebas del motor pasan: la reinversión de la proyección (38 % del NOPAT) supone que el capital nuevo rinde un 36,2 %, por debajo de 1,25 veces el ROIC incremental histórico (29,6 %), y la cuota de centros de datos pasaría del ≈5,5 % a ≈6 % en 2030 (prueba a mano, mercado final en blanco porque la cifra de ventas del grupo incluye climatización comercial). Pero el juicio es «En parte»: el foso es estrecho, el ROIC actual (12,9 %) apenas cubre el WACC, el poder de precios en centros de datos no se ha demostrado con capacidad abundante (el margen del 1T cayó 9,6 puntos [A3]) y el crecimiento depende de pocos clientes y de un solo ciclo de inversión.',
  dcf_lectura: 'El DCF da 67,51 USD por acción, un 57,2 % por debajo del precio, con un 65 % del valor en el terminal. El valor intrínseco ponderado (DCF, comparables y escenarios) es de 93,14 USD (−41,0 %); con la prima implícita del mercado, 108,25 USD. El DCF inverso no encuentra un crecimiento razonable que justifique el precio con nuestro margen: hace falta un margen EBITDA del 30 % sostenido con nuestro crecimiento, casi el doble del 17 % del caso base y por encima del 23 % de Vertiv, el mejor del sector. Dicho de otro modo, a 157,75 USD el comprador obtiene un 7,8 % anual si se cumple nuestro caso base, por debajo del 12,8 % de su coste de capital y del 11,0 % que pide el mercado. El precio descuenta que el auge de los centros de datos dure mucho más que nuestra proyección o que Modine alcance márgenes de líder; las dos cosas son posibles, ninguna está demostrada.',
  narrativas: {
    Bajista: 'Los hiperescaladores frenan el capex en 2027 y la capacidad nueva del sector baja precios: el crecimiento se queda 8 puntos por debajo cada año (FY2027e +30 %, FY2028e +22 %) y el margen EBITDA 2,5 puntos (14,5 % desde FY2028e). Le pasó a Modine en el 1T FY2027 con el margen y a Vertiv en 2022.',
    Base: 'Centros de datos crece un 55 % en FY2027e y un 40 % en FY2028e, por debajo del 50-70 % de la empresa; el margen se recupera al 17-17,5 % de EBITDA con la capacidad madura.',
    Alcista: 'La empresa cumple su objetivo (centros de datos +50-70 % dos años) y llega a márgenes cercanos a los del segmento sin corporativo (19-19,5 % de EBITDA): crecimiento 6 puntos más y margen 2 puntos más.',
  },
  escenarios_comentario: 'Asimetría muy desfavorable sobre el valor intrínseco: incluso el alcista (99,99 USD) queda un 36,6 % por debajo del precio, y el bajista (39,80 USD) un 74,8 %. Sobre el objetivo a 12 meses la lectura cambia: el mercado paga múltiplos de crecimiento y, si se cumple nuestro BPA, el precio puede subir aunque la empresa valga menos de lo que cotiza. Esa divergencia es el centro del informe.',
  casos12m: {
    Bajista: 'Ventas de FY2029e de 3.585 M (+30 %, +22 %, +10 %) con un 15,0 % de EBITDA: BPA de 6,04 USD con 54,5 M de acciones.',
    Base: 'Ventas de FY2029e de 4.351 M (+38 %, +30 %, +18 %) con un 17,5 % de EBITDA, amortización del 2,5 %, 15 M de intereses y un 24 % de impuestos: BPA de 8,89 USD.',
    Alcista: 'Ventas de FY2029e de 4.991 M con un 19,5 % de EBITDA: BPA de 11,62 USD.',
  },
  per_excluidos: 'Historia adelantada (cierre de marzo ÷ BPA real del ejercicio siguiente, publicado del grupo): FY2024 (mar-24) 95,19 ÷ 3,42 = 27,8x; FY2025 (mar-25) 76,75 ÷ 3,86 (BPA de FY2026 sin el cargo de pensiones) = 19,9x; FY2026 (mar-26) 216,71 ÷ 5,45 (nuestro BPA de FY2027e del grupo, con Performance Technologies en el 1S) = 39,8x. Fuera FY2021-FY2023 (3-9x): otra empresa, proveedor de automoción antes del 80/20. Actual: 157,75 ÷ 7,35 (nuestro BPA de FY2028e) = 21,5x. Solo tres años: decide el selector (la más baja de v3 y v2).',
  per_excluidos_v2: 'Historia al cierre (precio de marzo ÷ BPA del mismo ejercicio): FY2024 31,4x; FY2025 22,4x; FY2026 56,1x con el BPA sin el cargo de pensiones (3,86). Fuera FY2021-FY2023 (otra empresa).',
  diferencia_consenso: 'Nuestro BPA de FY2028e (7,35 USD) queda un 28 % por debajo del consenso (10,16 USD, tres analistas [D2]): ventas un 11 % menores (3.687 M frente a 4.139 M) por la falta de componentes y un margen EBITDA del 17 % frente a uno implícito cercano al 20 %, que exigiría que centros de datos recupere ya el 25-30 % bruto. El consenso es ajustado (sin reestructuraciones ni costes de la escisión). Nuestro objetivo base (191,14 USD) queda un 37 % por debajo del objetivo medio de los analistas (302,13 USD), fijado en su mayoría en mayo-junio con la acción a 250-320 USD y antes de restar los ≈15 USD de Gentherm.',
  objetivo_comentario: 'El objetivo a 12 meses (204,54 USD, +29,7 %; base 191,14 USD, +21,2 %) y el valor intrínseco (93,14 USD) están a más de un 100 % de distancia. El objetivo dice a cuánto puede cotizar si el mercado sigue pagando 21-22 veces un BPA que crece un 49 % anual hasta FY2029e (desde 2,60 USD sin el cargo de pensiones de FY2026); el DCF dice que ese BPA, descontado al 12,84 %, no vale el precio. Para cerrar la distancia haría falta un margen EBITDA del 30 %, un crecimiento largo muy por encima del proyectado o un coste de capital mucho menor. Ningún catalizador con fecha lo resuelve en un año: la tesis de valor es a varios años y hoy no la hay.',
  valoracion_comentario: 'Pesos: DCF 60 %, comparables 20 % y escenarios 20 %; transacciones 0 (las de refrigeración líquida son de otro tamaño y con prima de control). El DCF es el método más fiable para una empresa cuyo valor depende de cuánto dure el crecimiento y de qué margen alcance. La dispersión es enorme: de 67,51 USD (DCF) a 194,45 USD (PER de los comparables). El mercado está en el extremo alto: paga el múltiplo de crecimiento de los comparables sobre un BPA que aún no existe.',
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener, con convicción media, y no comprar. La regla a 12 meses da un objetivo de 204,54 USD (+29,7 % ponderada y +21,2 % en el base, con la regla v2 que elige el selector por tener solo tres años de historia útil), pero el valor intrínseco es de 93,14 USD, un 41,0 % por debajo de los 157,75 USD del cierre del 14-oct: no pasa el filtro de valor real y la regla del valor intrínseco da Vender con el WACC propio y con la prima del mercado. El objetivo medio de los analistas, 302,13 USD, queda fuera de nuestro rango y es en su mayoría anterior a la caída y a la escisión. La convicción es media: subiría si el margen bruto de centros de datos vuelve al 24 % en el 2T o el 3T FY2027, y bajaría si la guía sin Performance Technologies queda por debajo de 450 M de EBITDA ajustado.

**El negocio.** Desde el 1-oct Modine es una empresa de refrigeración de centros de datos (≈54 % de las ventas) y climatización comercial: naves, edificios, invernaderos y frío comercial [A4, D7]. Las ventas de centros de datos pasaron de 138 M en FY2022 a 1.112 M en FY2026 [A5, A2], pero el ROIC del perímetro es del 12,9 %, casi igual al WACC del 12,84 %, y el foso es estrecho: diez clientes son la mitad de las ventas y el margen bruto de centros de datos cayó del 29,8 % al 20,2 % en el 1T FY2027 al arrancar capacidad [A2, A3]. Sostenibilidad del crecimiento: «En parte». Las pruebas de reinversión pasan, pero el poder de precios no está demostrado y todo depende de un solo ciclo de inversión.

**Finanzas.** La historia es pro forma (FY2024-FY2026) y estimada (FY2022-FY2023) [A1, A5]. Deuda neta pro forma de 265 M (0,9 veces el EBITDA) tras amortizar 198,6 M con el cobro de la escisión [A1]. El flujo libre del 1T fue negativo por el capex de capacidad [A3]. El BPA de FY2026 (1,00 USD) lleva un cargo de pensiones de 116,1 M [A1].

**Equipo y gobierno.** El equipo que hizo la transformación sigue. Restan 40,4 M USD de ventas de directivos en 12 meses sin una compra [C3] y un consejo escalonado [C2].

**Valoración.** El DCF da 67,51 USD; los comparables por PER, 194,45 USD. El DCF inverso pide un margen EBITDA del 30 % con nuestro crecimiento, frente al 17 % de nuestro caso base y el 23 % de Vertiv; a este precio la rentabilidad implícita es del 7,8 % anual, por debajo del 12,8 % de coste de capital y del 11,0 % del mercado. Nuestro BPA de FY2028e (7,35 USD) está un 28 % por debajo del consenso (10,16 USD) por ventas y margen. El mercado paga crecimiento; nosotros no vemos el margen que lo justifique.

**Riesgos y catalizadores.** Un frenazo del capex de IA lleva al bajista (39,80 USD de valor, −74,8 %); el margen de centros de datos que no vuelve resta un 20 %; la concentración de clientes, un 15 % por cliente grande. Catalizadores: resultados del 2T FY2027 hacia el 28-oct con la primera guía sin Performance Technologies y la junta del 13-nov. Los foros están divididos; no añaden riesgos.

**Qué cambiaría la decisión.** Comprar por debajo de 93,14 USD con la calidad cumplida (ROIC − WACC ≥ 5 puntos); vender por encima de 227,27 USD. Revisaríamos al alza con un margen EBITDA del perímetro por encima del 18 % dos trimestres seguidos, que subiría el valor intrínseco.`,
    tesis: 'Modine se ha convertido en una empresa de refrigeración de centros de datos y climatización comercial: 2.055 M de ventas pro forma en FY2026, un 22,6 % anual desde FY2022, con centros de datos multiplicados por ocho [A1, A5, A2]. Es un proveedor real del cuello de botella térmico de la IA y ha demostrado saber reasignar capital (escisión con 156 M de caja, ROIC incremental del 29,6 %).\n\nEl precio (157,75 USD, 8.519 M de capitalización) descuenta mucho más: el DCF inverso pide un margen EBITDA del 30 % sostenido, frente al 13,6 % de FY2026 y al 23 % de Vertiv, y la rentabilidad implícita es del 7,8 % anual frente a un coste de capital del 12,8 %. Por PER (21,5 veces nuestro BPA de FY2028e) parece razonable frente a los comparables (22,9x), pero ese BPA aún no existe y el del 1T muestra márgenes en caída.\n\nPara invertir hay que creer que la inversión en IA sigue creciendo varios años, que Modine recupera y mejora el margen con capacidad abundante en el sector y que mantiene a sus pocos grandes clientes. Nuestro análisis ve un negocio que crece pero que hoy apenas gana su coste de capital, a un precio que exige márgenes de líder.',
    vision_diferencial: {
      mercado_descuenta: 'Que el BPA se multiplique por más de tres hasta FY2028 (10,16 USD de consenso) y que el sector siga pagando 21-25 veces ese beneficio; los analistas, objetivos de 260-355 USD [D2, D3].',
      nuestra_vision: 'El crecimiento es real pero el margen no: con un 17 % de EBITDA, el BPA de FY2028e es de 7,35 USD y el valor descontado al coste de capital es de 67,51-93,14 USD.',
      por_que: 'El 1T FY2027 ya muestra que la capacidad nueva cuesta margen, la competencia (Vertiv, Schneider, Eaton) invierte a la vez y el cliente concentra el poder de negociación.',
    },
    a_favor: [
      '**Crecimiento de centros de datos** del 90 % en el 1T FY2027 [A3].',
      '**Escisión cerrada** con 156 M de caja y deuda neta de 0,9 veces el EBITDA [A1, D7].',
      '**ROIC incremental** histórico del 29,6 %.',
      '**PER de 21,5x** nuestro BPA de FY2028e, en línea con los comparables (22,9x).',
    ],
    en_contra: [
      '**Valor intrínseco de 93,14 USD**, un 41,0 % bajo el precio.',
      '**ROIC del 12,9 %** frente a un WACC del 12,84 %.',
      '**Margen bruto de centros de datos** del 20,2 %, 9,6 puntos menos [A3].',
      '**Diez clientes** son el 49 % de las ventas [A2].',
      '**Ventas de directivos** de 40,4 M USD sin compras [C3].',
    ],
    que_vigilar: 'La tesis depende del margen de centros de datos con la capacidad nueva. Si el margen bruto del segmento vuelve al 24 % o más en el 2T-3T FY2027 y la guía sin Performance Technologies da al menos un 16 % de EBITDA ajustado, el valor intrínseco subiría; si se queda en el 20-21 %, el bajista gana peso.',
    cambiaria_recomendacion: [
      'Precio por debajo de 93,14 USD con ROIC − WACC ≥ 5 puntos: Comprar.',
      'Precio por encima de 227,27 USD: Vender.',
      'Margen bruto de Data Centers por debajo del 20 % en el 2T FY2027: bajaríamos el caso base.',
      'Guía de FY2028 de centros de datos por debajo de 2.000 M: revisión a la baja.',
    ],
    kpis_seguimiento: [
      { kpi: 'Margen bruto de Data Centers', nivel_actual: '20,2 % (1T FY2027)', umbral_alerta: '< 20 %', por_que: 'Mide si la capacidad nueva rinde.' },
      { kpi: 'Crecimiento de ventas de Data Centers', nivel_actual: '+90 %', umbral_alerta: '< +30 %', por_que: 'La tesis del mercado.' },
      { kpi: 'Costes centrales', nivel_actual: '88,4 M (FY2026)', umbral_alerta: '> 80 M tras la escisión', por_que: 'Peso sobre un perímetro más pequeño.' },
      { kpi: 'Capex de los hiperescaladores', nivel_actual: 'Creciente', umbral_alerta: 'Guías planas para 2027', por_que: 'Demanda final.' },
    ],
  },
  fuentes: [],
};
