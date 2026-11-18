// Textos del analista (Experian, corte 2026-11-18). Citas con la letra de la nota; [P1] = fuente propia 1.
export default {
  limitaciones: 'Cuentas en millones de USD (la moneda en que informa Experian) con cifras benchmark de la empresa (sin amortización de intangibles adquiridos ni partidas excepcionales), ejercicio a 31 de marzo etiquetado por el año en que termina (FY2026 = abril 2025-marzo 2026). Balance y flujos del ESEF (FY2020-FY2026); cuenta benchmark del informe anual 2026 y de los comunicados; semestre a 30-sep-2026 del RNS del 18-nov-2026 [A1-A4]. La acción cotiza en peniques: precio = cierre del 17-nov-2026 (2.819 p; la sesión del 18-nov, día de resultados, seguía abierta a la hora del corte) pasado a USD con el GBP/USD del BCE del 17-nov (1,3191): 37,19 USD [D3, D4]. La amortización benchmark de FY20-FY24 es estimada; la nota de sector se hereda de la iteración del 14-oct (que reutilizó la de Equifax del 8-oct) con los cambios regulatorios posteriores añadidos.',

  controles_explicados: [
    { control: 'Compra robusta (v3 y v2 dan Comprar)', explicacion: 'La v3 (la que decide) da Comprar con 26,9 % ponderada y 21,9 % en el base; la v2 de control da Mantener (15,4 % y 11,3 %: falla el base por 0,7 puntos). Para comprar como nivel A hace falta que pasen las dos; la señal que se comunica es la acción robusta de robustez.mjs, no la Comprar de la v3 sola.' },
    { control: 'Fuentes sin citar ≤ 15 %', explicacion: 'Las fuentes sin citar vienen de la nota de sector heredada (informe de Equifax del 8-oct y su iteración del 14-oct), que se reutiliza para sector y competencia; se dejan para trazabilidad.' },
  ],

  parches: [],
  huecos_resueltos: [
    { seccion: 'identificacion', campo: 'precio de cierre del 13-oct-2026, rango de 52 semanas y volumen' },
  ],

  secciones: {
    comparables: {
      comentario: 'Experian cotiza a 17,2 veces el BPA benchmark de los próximos 12 meses del consenso, frente a una mediana de 19,2 veces en nueve comparables [D2]. Frente a los otros dos burós ya no hay descuento: Equifax 19,2x y TransUnion 14,5x; FICO, que vende la puntuación hipotecaria, ha bajado a 14,9x tras perder el monopolio en Fannie Mae y Freddie Mac. Las plataformas de datos con ingresos por suscripción (Moody\'s, S&P Global, MSCI, Verisk: 22,7-28,8x) siguen cotizando con prima. El mercado paga a Experian como buró expuesto a la hipoteca y a la IA, pese a un ROIC del 17,4 % y un margen EBIT benchmark del 28,8 % superiores a los de Equifax y TransUnion.',
    },
    financieros: {
      comentario: 'Crecimiento regular: ingresos de 5.179 M USD en el FY20 a 8.445 M en el FY26 (+8,5 % anual) y BPA benchmark de 1,03 a 1,80 USD (+9,7 % anual) [A3]. Solo el FY21 no creció (pandemia). El FY26 fue el mejor de la serie: +13 % de ingresos (8 % orgánico), margen EBIT benchmark del 28,6 % y BPA +15 % [A2, A3]. El primer semestre del FY27 sigue igual: ingresos +8 % a tipos constantes (7 % orgánico), margen del 28,8 % (+50 pb) y BPA benchmark de 97,5 c (+15 %) [A1]. El BPA básico (90,4 c en el semestre) queda un 7 % por debajo del benchmark por la amortización de intangibles comprados (10,3 c) [A1].',
    },
    multiplos_historicos: {
      comentario: 'Con el PER adelantado (precio de cierre de marzo ÷ BPA benchmark del año siguiente), Experian cotizó entre 22,6x y 28,7x en FY20-FY25, con mediana de 27,6x [D3, A3]. Hoy está a 16,4x nuestro BPA del FY28e: un 40 % por debajo. Lo estructural que ha cambiado es doble: la IA, que el mercado lee como amenaza para la consulta de crédito, y la FHFA, que en 2026 ha abierto la puntuación hipotecaria a VantageScore y estudia pasar de tres informes de crédito a dos [B34, B35]. Con el bono de EE. UU. al 5,10 %, además, ningún negocio de datos ha recuperado los múltiplos de 2021.',
      confianza: 'Alta',
    },
    bolsa: {
      contexto: {
        movimiento: { fecha: '2026-11-18', var_1m_pct: -1.8, var_3m_pct: -3.7, var_6m_pct: 8.0, var_12m_pct: -13.2, dist_max_52s_pct: -17.9, dist_min_52s_pct: 20.3, dist_max_historico_pct: -30.1, tendencia: 'alcista', volatilidad_60d_pct: 34, avisos: [] },
        movimientos_fuertes: [
          { periodo: 'sep-2026 (−18,8 % en un mes hasta el 29-sep)', var_pct: -18.8, causa: 'Caída de todo el sector por la FHFA: el 3-sep Pulte dijo que Fannie Mae y Freddie Mac estudian pasar a dos informes de crédito («bi-merge») y el 28-sep metió VantageScore en la misma tabla de precios que FICO; Rocket Mortgage la adoptó como preferente. Equifax y TransUnion cayeron un 18 % y un 21 % entre el 15 y el 30 de septiembre [B34, E8, D2]. No es un hecho propio de Experian.', veredicto: 'no cambia', condicion: null },
          { periodo: 'oct-nov 2026 (+23,7 % en un mes hasta el 4-nov)', var_pct: 23.7, causa: 'Rebote del sector con los resultados del 3T de Equifax (ingresos hipotecarios +15 % con un mercado más débil) y TransUnion, y la recompra de Experian en curso; Equifax subió un 40 % desde su mínimo del 30-sep [D2].', veredicto: 'no cambia', condicion: null },
          { periodo: '26-oct-2026 (−6,7 % en el día)', var_pct: -6.7, causa: 'FICO mantuvo su precio hipotecario en 10 USD («precio plano») para retener prestamistas frente a VantageScore y cayó un 16 %; RBC rebajó Equifax a «sector perform» el mismo día. Arrastró a los tres burós [D2].', veredicto: 'no cambia', condicion: null },
        ],
        noticias: [
          { fecha: '2026-11-18', tipo: 'resultados', hecho: 'Semestral FY27: BPA benchmark +15 %, orgánico 7 %, margen +50 pb; guía de ingresos orgánicos rebajada de 6-8 % a 6-7 % por las hipotecas en EE. UU., pero BPA ≈ +12 % y margen de al menos +50 pb; recompra nueva de 500 M USD [A1].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-10-17', tipo: 'demanda o regulador', hecho: 'La FHFA sigue «estudiando» usar uno o dos informes de crédito en las hipotecas de Fannie Mae y Freddie Mac; sin guía formal ni fecha de aplicación [B35]. Experian dice que un cambio del modelo de distribución de FICO no afecta a su EBIT ni a su BPA benchmark [A1].', veredicto: 'no cambia', condicion: 'Sin fecha: no es un hecho pendiente con calendario. Si la FHFA publica el paso a dos informes, revisar el bajista (la hipoteca de EE. UU. es una parte pequeña del grupo).' },
          { fecha: '2026-10-30', tipo: 'directivos', hecho: 'Kathleen DeRose (presidenta de Remuneración) será consejera de la nueva matriz de IG Group; cargo externo sin conflicto [P1].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-08-04', tipo: 'directivos', hecho: 'Contrato por diferencias de Experian Finance sobre 600.000 acciones a 2.858 p para cubrir planes de empleados; no hay compras ni ventas de consejeros en 12 meses [C6].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-06-17', tipo: 'ampliación o convertible', hecho: 'Bono de 1.000 M USD al 5,35 % a 2036 (A3/A-): deuda, no acciones; sin ampliaciones ni convertibles [A5].', veredicto: 'no cambia', condicion: null },
          { fecha: '2027-02-02', tipo: 'resultados', hecho: 'Próxima publicación: actividad del 3T FY27 [A1].', veredicto: 'no cambia', condicion: null },
        ],
        proximos_resultados: '2027-02-02',
        veredicto: 'no cambia',
        condicion: null,
        comentario: 'El precio se mueve con el sector, no con Experian: los grandes saltos de 2026 (−18,8 % en septiembre, +23,7 % hasta el 4-nov, −6,7 % el 26-oct) llegan a la vez a Equifax, TransUnion y FICO y salen de la FHFA y de la guerra de precios en la puntuación hipotecaria. No hay colocaciones, ampliaciones, ventas de directivos ni ofertas. El único hecho pendiente (el paso a dos informes) no tiene fecha y la guía ya recoge el freno hipotecario. Veredicto: no cambia.',
      },
    },
    gobierno: {},
    calidad: {
      auditor: 'KPMG LLP', anios_auditor: 10, opinion: 'Favorable',
      comentario: 'KPMG audita a Experian desde el ejercicio a marzo de 2017 (diez ejercicios) con opinión favorable [A3]. Las cifras que usa el informe son las benchmark de la empresa, que excluyen la amortización de intangibles adquiridos (263 M USD en el FY26), las partidas excepcionales y las remediciones financieras; la diferencia con el BPA básico es estable (7-10 %) y se explica casi entera por esa amortización [A1, A2]. Capitaliza software y bases de datos (capex del 8-9 % de las ventas), algo normal en un negocio de datos, y la amortización benchmark (7,3 % de las ventas) va un punto por debajo del capex mientras termina la migración a la nube. Los pagos en acciones (≈150 M USD al año) se suman al flujo operativo benchmark. El Piotroski F sale en 5 de 9 porque la deuda y las acciones medias se mueven con las recompras financiadas con deuda, no por deterioro del negocio. Altman y Beneish no se calculan: el ESEF no etiqueta el activo total ni las reservas, y la cuenta benchmark no tiene coste de ventas.',
      senales: [
        { senal: 'Ninguna relevante', nivel: 'Baja', comentario: 'Revisados el informe anual 2026 (auditor, remuneración, deterioros) y el semestral: sin salvedades, sin cambios de criterio salvo la aplicación de las modificaciones de la NIIF 9 (10 M USD en la deuda neta inicial) [A1].' },
      ],
      confianza: 'Media',
    },
  },

  dcf_justificacion: {
    crecimiento: 'FY27e +8,2 %: la guía del 18-nov (6-7 % orgánico, ≈1 % de compras y ≈1 % de divisa) [A1]; año fijo. FY28e +7 % y FY29e +7,5 % (orgánico de un dígito alto, el marco a medio plazo, sin compras ni divisa), y luego baja medio punto al año hasta el 4 % del FY36e. Crecimiento medio proyectado del 6,1 %, por debajo del 8,5 % anual de FY20-FY26.',
    margenes: 'Margen EBITDA benchmark del 35,6 % en el FY26 (3.010 M) y del 35,9 % en el semestre [A1, A2]. Sube con la guía (margen EBIT de al menos +50 pb en el FY27, +30-50 pb al año a medio plazo) hasta el 37,5 % del FY32e y se queda ahí: un margen EBIT benchmark del 30,5 %, 1,7 puntos sobre el del semestre.',
    inversion: 'Capex del 8 % de las ventas en el FY27e (guía) y del 7 % desde el FY29e (el marco a medio plazo, al terminar la migración a la nube), frente a una amortización benchmark del 7,0-7,2 %; circulante del 2 % de las ventas. No se proyectan compras.',
    wacc: 'Tasa libre del 5,10 % (bono de EE. UU. a 10 años del 17-nov, porque dos tercios del negocio y las cuentas están en dólares) [D5], beta de 1,0 (1,01 mensual a 5 años y 0,91 semanal a 2 años frente al FTSE 100) [D3], prima del 5,5 %, coste de la deuda del 4,5 % antes de impuestos (bono a 2036 al 5,35 %, cartera media más baja) y 16 % de deuda a valor de mercado: WACC del 9,44 %. Con la prima implícita del mercado (4,2 %) el WACC sería del 8,35 % [D7].',
    terminal: 'Crecimiento a perpetuidad del 3 %: inflación más algo de volumen de datos. El valor terminal pesa un 58 %.',
  },

  puente_comentarios: {
    'FY2027e': 'Volumen +3,5 % y precio +3 % (orgánico 6,5 %, punto medio de la guía) y otros +1,7 % (≈1 punto de compras y ≈1 de divisa, menos negocios cerrados) [A1].',
    'FY2028e': 'Volumen +4 % y precio +3 %: orgánico del 7 %, como el semestre.',
    'FY2029e': 'Volumen +4,5 % con la hipoteca normalizada; precio +3 %.',
    'FY2030e': 'El volumen se modera al 4 %.',
    'FY2031e': 'Volumen +3,5 %, precio +3 %.',
  },

  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Sí. La reinversión neta es casi nula (1 % del NOPAT), así que la prueba se hace a mano. El crecimiento medio proyectado (6,1 %) es menor que el orgánico real (7-8 % en FY23-FY26 y 7 % en el semestre) [A1, A3], logrado con un capex del 8-9 % de las ventas que la proyección baja al 7 % como dice el marco a medio plazo. Con la reinversión bruta (33 % del NOPAT) el ROIC actual financia un 5,7 % anual; los 0,4 puntos que faltan salen del precio (3 % anual, que en un negocio de datos no pide capital) y el rendimiento implícito de esa reinversión (18,6 %) está por debajo del histórico (19,8 %). La proyección no incluye compras, que Experian sí hace (≈1 punto al año). La cuota no se mide en volumen: crecemos por debajo del gasto en datos de crédito, identidad y fraude (nota de sector), así que mercado_final queda en null. El riesgo no es de financiación sino de precio de la consulta (IA, FHFA): está en el bajista.',

  dcf_lectura: 'El DCF da 39,18 USD por acción (+5,4 % sobre 37,19), con un WACC del 9,44 % y un valor terminal del 58 %. El DCF inverso dice que a 37,19 USD el mercado descuenta un crecimiento de los ingresos del 5,2 % anual en los años no fijos, frente al 5,9 % de nuestro base en esos años: el precio ya recoge casi todo el crecimiento que suponemos, con el bono de EE. UU. al 5,10 %. Con la prima implícita del mercado (WACC del 8,35 %) el DCF sube a 48,76 USD. La diferencia entre las dos lecturas es de tasa, no de cifras. El DCF manda en el valor intrínseco, no en la decisión a 12 meses.',

  narrativas: {
    Bajista: 'La FHFA lleva la hipoteca a dos informes y abarata la puntuación; la IA y los modelos de los propios bancos presionan el precio de la consulta; Consumer Services en Norteamérica sigue cayendo. Crecimiento 2 puntos menor y margen EBITDA 1 punto menor; terminal del 2,5 %.',
    Base: 'Experian cumple la guía del FY27 (6-7 % orgánico, BPA ≈ +12 %) y mantiene un orgánico del 7 % con margen al alza de 30-50 pb al año; ROIC estable en torno al 17-18 %.',
    Alcista: 'Las hipotecas en EE. UU. se recuperan con tipos más bajos, Brasil sigue creciendo a doble dígito y la IA se convierte en producto propio (Ascend, agentes, fraude): +1,5 puntos de crecimiento y +0,5 de margen.',
  },
  escenarios_comentario: 'El DCF da 30,42 USD en el bajista (−18,2 %), 39,18 en el base (+5,4 %) y 44,88 en el alcista (+20,7 %). Con la tasa libre de EE. UU. al 5,10 % la asimetría del DCF es pobre (1,1x); a 12 meses, con la regla común de múltiplos, es mucho mejor (6,3x) porque el PER de hoy está muy por debajo de su historia. Pesos 25/50/25: los riesgos (FHFA, IA) son reales pero las cifras del semestre no los muestran fuera de la hipoteca.',

  valoracion_comentario: 'El DCF pesa un 50 %: negocio estable, con caja previsible y poca inversión. Los comparables, un 25 % (la mediana mezcla burós con plataformas de datos más caras) y los escenarios otro 25 %. No se usan transacciones. El valor intrínseco es de 39,60 USD (≈3.002 p), un 6,5 % sobre el precio; con la prima implícita del mercado sería de 46,70 USD. La decisión la toma el objetivo a 12 meses: con la regla común el base es de 44,64 USD (+21,9 %) y la ponderada de 46,49 USD (+26,9 %).',

  rentabilidad_comentario: 'Experian crea valor con holgura: ROIC del 17,4 % en el FY26 (NOPAT benchmark sobre capital invertido con fondo de comercio) frente a un WACC del 9,44 %: unos 8 puntos de diferencia; la empresa publica un ROCE del 17,2 % en el FY26 y del 17,3 % en el semestre [A1, A3]. Sin el fondo de comercio de las compras (Serasa, ClearSale, Illion…) el rendimiento del negocio orgánico pasa del 50 %. El ROE (≈30 %) está inflado por las recompras y la deuda. El ROIC sube desde el 14,9 % del FY21 porque el margen mejora y las compras recientes son pequeñas frente a la base.',

  diferencia_consenso: 'Nuestro base a 12 meses (44,64 USD, ≈3.384 p) queda un 8,9 % por debajo del objetivo medio de los analistas (49,02 USD, ≈3.716 p; 18 analistas, 16 en comprar) [D2]. La diferencia no sale del BPA: nuestro FY28e (2,27 USD) es el del consenso (2,27) y el FY27e (2,02) está en la guía, algo por encima del 1,99 de Yahoo. Sale del múltiplo: la regla común sube el PER actual (16,4x) solo hasta 18,0x (tope ×1,1), mientras los objetivos de los analistas implican unas 20-22 veces. Si el miedo a la FHFA y a la IA se disipa, ese es el alcista (24,4x).',

  objetivo12m_comentario: 'Con la regla común, el objetivo ponderado es de 46,49 USD (≈3.524 p, +26,9 % con el dividendo) y el base de 44,64 (+21,9 %): la v3 da Comprar. La v2 de control da Mantener (15,4 % y 11,3 %) y el selector se queda en la v3 porque la mediana adelantada (27,6x) es 1,68 veces el PER de hoy, por debajo del 1,8 que marca una desrateada; está cerca: con un precio un 7 % más bajo (≈2.630 p) decidiría la v2. La asimetría es buena (6,3x): el bajista (14,4x × 2,29 = 32,98 USD, −9,4 %) pierde poco porque el PER ya está un 40 % por debajo de su mediana. El valor intrínseco (39,60 USD) limita la compra: por encima de ese precio falla el filtro de valor real.',

  catalizadores: {
    items: [
      { fecha: '2-feb-2027', evento: 'Actividad del 3T FY27 [A1]', efecto: 'Si Norteamérica vuelve al 6-7 % orgánico con la hipoteca estable, se aleja el bajista', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Hasta junio de 2027', evento: 'Recompras anunciadas pendientes (≈1.190 M USD, ≈3,6 % del capital) [A1, A6]', efecto: 'Suman ≈3 % al BPA del FY28 y sostienen el precio', probabilidad: 'Alta', sentido: '+' },
      { fecha: 'Sin fecha', evento: 'Decisión de la FHFA sobre el paso a dos informes de crédito («bi-merge») [B35]', efecto: 'Menos informes por hipoteca en EE. UU.; presión de precio para los tres burós', probabilidad: 'Media', sentido: '−' },
      { fecha: '2027', evento: 'Bajadas de tipos en EE. UU. y recuperación de las hipotecas', efecto: 'Más consultas hipotecarias, el producto de más precio; la guía ya descuenta lo contrario', probabilidad: 'Media', sentido: '+' },
    ],
    confianza: 'Media',
  },

  riesgos: {
    items: [
      { riesgo: 'Regulación hipotecaria en EE. UU. (FHFA: VantageScore al precio de FICO y posible paso a dos informes)', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−9 % a 12 meses (bajista); −18 % del valor intrínseco', mitigante: 'La hipoteca de EE. UU. es una parte pequeña del grupo; Experian copropietaria de VantageScore; la guía de BPA (+12 %) ya incluye el freno hipotecario [A1].', senal: 'Guía formal de la FHFA con fecha; orgánico de Norteamérica por debajo del 5 % dos trimestres.' },
      { riesgo: 'Inteligencia artificial y puntuaciones alternativas que abaratan la consulta de crédito', tipo: 'Competitivo', probabilidad: 'Media', impacto: 'Alto', efecto_valor: 'Bajista: −9 % a 12 meses', mitigante: 'Datos propios aportados por los prestamistas que la IA no replica; renovaciones a más plazo y mayor valor en Norteamérica [A1].', senal: 'B2B Financial Services de Norteamérica por debajo del 8 % orgánico (hoy 13 %).' },
      { riesgo: 'Ciclo de crédito al consumo y tipos altos en EE. UU. y Brasil', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5-10 %', mitigante: 'Diversificación por productos (decisión, fraude, salud, automoción) y regiones; Brasil crece al 15 % [A1].', senal: 'Rebaja de la guía de BPA (≈ +12 %).' },
      { riesgo: 'Brechas de datos y regulación de protección de datos (CFPB, FCA, LGPD)', tipo: 'Regulatorio', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: 'Multas y pérdida de múltiplo', mitigante: 'Historial sin una brecha masiva como la de Equifax de 2017.', senal: 'Incidente comunicado por la empresa.' },
      { riesgo: 'Divisa: cotiza en libras e informa en dólares; real brasileño', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '±5 % en peniques', mitigante: 'Ingresos y BPA en dólares; el inversor en euros soporta el GBP/EUR.', senal: 'GBP/USD.' },
    ],
    premortem: 'Es noviembre de 2027 y la acción vale 2.200 p. La FHFA impuso el paso a dos informes en 2027, VantageScore a 0,99 USD sustituyó a FICO en la mitad de las hipotecas y los grandes bancos llevaron la decisión de crédito a modelos propios con IA y banca abierta. El orgánico de Norteamérica cayó al 3 %, Consumer Services siguió en negativo y el mercado dejó de pagar más de 14 veces beneficios. Lo que lo habría avisado: la guía formal de la FHFA y el orgánico de Norteamérica por debajo del 5 % en el 3T FY27.',
    ia: { exposicion: 'Media', sentido: 'Mixto', efecto_valor: '−9 % (bajista a 12 meses) / +10 % (alcista, IA como producto)', comentario: 'La IA toca dos partes del negocio. Amenaza: la consulta de crédito de menor valor y los comparadores de Consumer Services, si los bancos deciden con modelos propios y datos de banca abierta, o si los asistentes de IA sustituyen el canal de comparación (Experian ya integra sus ofertas en OpenAI y Gemini) [A1]. Oportunidad: los datos propios de pagos que aportan los prestamistas no se replican con IA y ganan valor como insumo; Experian ya vende agentes sobre Ascend (Brasil, 4 clientes), Patient Access Curator en salud y Agent Trust para el comercio con agentes, y la IA le da ≈30 % de productividad en desarrollo y ≈400 M USD de ahorro anual de personal desde 2024 [A1]. Señal: el orgánico de B2B Financial Services en Norteamérica (13 % en el semestre) por debajo del 8 %.' },
    confianza: 'Media',
  },

  preguntas: {
    items: [
      { tema: 'Hipotecas', pregunta: '¿Qué peso tienen los ingresos hipotecarios de EE. UU. en el grupo y cuánto perdería con un paso a dos informes?', por_que: 'Es el riesgo que mueve el sector; la empresa no lo cuantifica.' },
      { tema: 'Consumer Services', pregunta: '¿Cuándo termina el efecto de los contratos de brechas de datos y vuelve a crecer Norteamérica (−7 % en el 2T)?', por_que: 'Es el lastre del semestre.' },
      { tema: 'Capital', pregunta: '¿Hasta dónde subirá el apalancamiento (1,9x hoy) con 2.500 M de recompras anunciadas en el año?', por_que: 'A estos precios cada 1.000 M compra un 3 % del capital; el marco es 2,0-2,5x.' },
    ],
    confianza: 'Media',
  },

  resumen: {
    recomendacion: 'Comprar',
    conviccion: 'Baja',
    justificacion_recomendacion: 'La regla común a 12 meses (v3) da Comprar (+26,9 % ponderada, +21,9 % en el base) y el valor intrínseco (39,60 USD) supera el precio (37,19), pero la compra no es robusta: la v2 de control da Mantener (15,4 % y 11,3 %) y con un BPA un 10 % peor la v3 cae a Mantener. Por eso es una compra de nivel B (tope 4 %) y no de nivel A, y la convicción es Baja: la absoluta (DCF con el bono de EE. UU. al 5,10 %) da Mantener y la relativa Comprar.',
    horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Comprar con convicción baja y solo como nivel B. Con nuestro BPA y la regla común de múltiplos, el objetivo a 12 meses es de 46,49 USD (≈3.524 p) frente a 37,19 USD (2.819 p, cierre del 17 de noviembre): +26,9 % con el dividendo y +21,9 % en el caso base. El valor intrínseco es de 39,60 USD (≈3.002 p, +6,5 %). La compra no es robusta: la v2 de control da Mantener (15,4 % y 11,3 %), igual que la v3 con un BPA un 10 % peor. Nivel B hasta 2.933 p; nivel A solo por debajo de 2.769 p. Quien la tenga, la mantiene mientras cotice por debajo de 3.253 p (filtro de mantener). La convicción es baja porque las dos lecturas del valor discrepan (el DCF con el bono de EE. UU. al 5,10 % da Mantener; con la prima implícita del mercado, Comprar) y porque la compra depende de la v3: subiría si el precio bajara de 2.769 p o si la actividad del 3T confirma el 7 % orgánico con la hipoteca estable; bajaría con una guía formal de la FHFA.

**El negocio.** El mayor buró de crédito del mundo: 8.825 M USD de ingresos en los doce meses a septiembre de 2026, dos tercios en Norteamérica y un 16 % en Latinoamérica (Serasa) [A1]. Vende datos de crédito propios, software de decisión, identidad y fraude y servicios al consumidor. ROIC del 17,4 % frente a un WACC del 9,44 %: unos 8 puntos de creación de valor.

**Finanzas.** Ingresos +8,5 % anual y BPA benchmark +9,7 % anual desde el FY20 [A3]. El semestral del 18 de noviembre: ingresos +8 % a tipos constantes (7 % orgánico), margen EBIT benchmark del 28,8 % (+50 pb) y BPA benchmark de 97,5 c (+15 %) [A1]. La guía del FY27 baja en ingresos (orgánico 6-7 %, antes 6-8 %, por las hipotecas en EE. UU.) pero sube en beneficio: BPA ≈ +12 % (antes «dos dígitos») y margen de al menos +50 pb. Deuda neta de 6.045 M (1,9x) tras 774 M de recompras en el semestre [A1].

**Valoración.** A 16,4 veces nuestro BPA del FY28e, Experian cotiza un 40 % por debajo de su mediana adelantada de cinco años (27,6x) y por debajo de la mediana de nueve comparables (19,2x) [D2]. El DCF da 39,18 USD y el DCF inverso dice que el precio descuenta un 5,2 % anual de crecimiento frente al 5,9 % de nuestro base en los años libres: con el bono de EE. UU. al 5,10 % el margen es pequeño. Nuestro base queda un 8,9 % por debajo del objetivo medio de los analistas (49,02 USD, ≈3.716 p); el BPA es el mismo, la diferencia es el múltiplo.

**Riesgos y catalizadores.** El riesgo que mueve la acción es regulatorio y sectorial: la FHFA ha abierto la puntuación hipotecaria a VantageScore y estudia pasar a dos informes de crédito, sin fecha [B34, B35]; los grandes movimientos de 2026 fueron de todo el sector. Veredicto de precio y noticias: no cambia. Catalizadores: el 3T (2-feb-2027) y ≈1.190 M USD de recompras pendientes.

**Qué ha cambiado desde el 14 de octubre.** El informe anterior (Mantener, +15,6 % con la v2) se hizo sin red, con un precio viejo (2.457,5 p) y un balance estimado; este parte del ESEF, del semestral y de un cierre real. El BPA del FY29e casi no cambia (2,47 → 2,48 USD), pero el precio sube un 15 % y la mediana adelantada pasa de 1,9 a 1,68 veces el PER de hoy: ya no es desrateada y decide la v3. Con un precio un 7 % más bajo (≈2.630 p) volvería a decidir la v2. La señal de alarma anterior (B2B de Norteamérica por debajo del 5 %) no se cumplió: creció un 11 % orgánico [A1].`,
    tesis: 'Experian es el buró de mejor calidad (más margen y ROIC que Equifax y TransUnion) y sigue creciendo al 7 % orgánico con el BPA al 12-15 %, pero cotiza a 16 veces beneficios por la FHFA y la IA. La regla común da un +22 % en el base a 12 meses; la compra no es robusta porque la historia al cierre (v2) y un BPA un 10 % peor la dejan en Mantener.',
    vision_diferencial: {
      mercado_descuenta: 'Un crecimiento de los ingresos del 5,2 % anual (DCF inverso) y un PER de 16,4x sobre el BPA del FY28e, el más bajo de su historia reciente, por el miedo a que la FHFA y la IA abaraten la consulta de crédito.',
      nuestra_vision: 'La hipoteca de EE. UU. es una parte pequeña del grupo y la guía ya descuenta su freno; B2B crece al 9 % y el BPA al 12 %. No suponemos que el múltiplo vuelva a 27x: la regla solo lo sube a 18x.',
      por_que: 'B2B Financial Services de Norteamérica creció un 13 % orgánico en el semestre y Latinoamérica un 15 %; la empresa sube la guía de BPA aunque baje la de ingresos [A1].',
    },
    a_favor: [
      '**Calidad**: ROIC del 17,4 % y margen EBIT benchmark del 28,8 %, los mejores de los tres burós [A1].',
      '**Precio**: 16,4x nuestro BPA del FY28e, un 40 % por debajo de su mediana adelantada de cinco años (27,6x).',
      '**Recompras**: 2.500 M USD anunciados en el año natural; ≈1.190 M pendientes hasta junio de 2027 (≈3,6 % del capital) [A1, A6].',
      '**Beneficio al alza**: BPA benchmark +15 % en el semestre y guía de ≈ +12 % en el FY27 [A1].',
    ],
    en_contra: [
      '**FHFA y puntuación hipotecaria**: VantageScore al precio de FICO y posible paso a dos informes, sin fecha [B34, B35].',
      '**Compra no robusta**: la v2 da Mantener y el colchón de BPA para comprar es solo del 8 %.',
      '**Consumer Services en Norteamérica**: −7 % orgánico en el 2T [A1].',
      '**Tasa alta**: con el bono de EE. UU. al 5,10 % el DCF solo da +5,4 %.',
    ],
    que_vigilar: 'El orgánico de Norteamérica en la actividad del 3T (2 de febrero de 2027): por encima del 6 %, la tesis se refuerza; por debajo del 4 % (hoy 5 % en el 2T), el bajista gana peso. Y cualquier guía formal de la FHFA sobre el paso a dos informes.',
    cambiaria_recomendacion: [
      'Por debajo de 2.769 p (≈36,52 USD) con el mismo BPA, la compra pasa a ser robusta (nivel A: v3 y v2 en Comprar y aguanta un BPA un 10 % peor).',
      'Por encima de 2.933 p deja de ser compra de nivel B; por encima de 3.002 p (valor intrínseco) falla el filtro de valor real.',
      'Quien la tenga, vende por encima de 3.253 p (filtro de mantener); la banda Vender de la regla (ponderada ≤ −10 %) está mucho más arriba, en 52,44 USD (≈3.975 p).',
      'Una guía formal de la FHFA con el paso a dos informes, o el orgánico de Norteamérica por debajo del 4 %, nos haría revisar el BPA del bajista y del base.',
    ],
    kpis_seguimiento: [
      { kpi: 'Crecimiento orgánico del grupo', nivel_actual: '7 % (1S FY27)', umbral_alerta: 'Por debajo del 5 % dos trimestres', por_que: 'Es lo que el mercado duda.' },
      { kpi: 'Norteamérica, orgánico', nivel_actual: '5 % (2T FY27); B2B 11 %', umbral_alerta: 'Por debajo del 4 %', por_que: 'Donde llegan antes la FHFA y la IA.' },
      { kpi: 'Margen EBIT benchmark', nivel_actual: '28,8 % (1S FY27)', umbral_alerta: 'Caída a tipos constantes', por_que: 'Mide el poder de precios.' },
      { kpi: 'Deuda neta / EBITDA', nivel_actual: '1,9x', umbral_alerta: 'Por encima de 2,5x', por_que: 'Las recompras se pagan en parte con deuda.' },
    ],
    confianza: 'Media',
  },
  fuentes: [
    { id: 1, titulo: 'Director Declaration (Kathleen DeRose)', editor: 'Experian plc (RNS)', tipo: 'Primaria', fecha: '2026-10-30', url: 'https://www.investegate.co.uk/announcement/rns/experian--expn/director-declaration/9850428' },
  ],
  huecos: [
    { seccion: 'calidad', campo: 'Altman Z y Beneish M', tipo: 'Complemento', intentos: '1) ESEF: activo total, pasivo total y reservas sin etiquetar; 2) informe anual 2026: balance en otra base (estatutaria) que la cuenta benchmark; 3) comunicados anuales: no rehechos por presupuesto.', decision: 'Omitido' },
  ],
};
