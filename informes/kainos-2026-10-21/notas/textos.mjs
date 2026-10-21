// Textos del analista para Kainos Group (corte 2026-10-21). Citas con la letra de la nota ([A2] = fuente 2 de A.json).
// Las cifras de valoración son las del motor (calc) con el precio de cierre del 21-oct-2026 (13,20 GBP).
export default {
  limitaciones: 'Cifras en millones de GBP; BPA y DPA en GBP (la acción cotiza en peniques: 1.320 GBp = 13,20 GBP). Ejercicio a 31 de marzo (FY2026 = abr-2025 a mar-2026). La contribución de las divisiones (tipo EBITDA, antes de 23,7 M de costes centrales en FY2026) solo se publica desde FY2024; en FY2021-FY2023 se dan solo los ingresos, y el reparto de FY2021 entre Workday Services y Workday Products se obtiene por diferencia con el total de Workday. Los semestres llevan el EBITDA ajustado de la empresa (sin remuneración en acciones), no el contable. La caja incluye los depósitos a plazo (la «cash position» de la empresa), que el ESEF separa.',
  controles_explicados: [
    { control: 'ROIC del motor', explicacion: 'El ROIC del motor (293,7 % en FY2026) se calcula sobre un capital invertido de 14 M (patrimonio + arrendamientos − caja) que no significa nada en una empresa de servicios con caja neta y circulante negativo. Con el capital operativo con fondo de comercio (inmovilizado 13,1 + intangibles 8,9 + fondo de comercio 44,3 + inmueble 3,9 − circulante 42,1 = 28,1 M) el ROIC es del ≈ 143 %, y sin contar el circulante negativo (70,2 M), del ≈ 57 %: muy por encima del WACC (11,35 %) en cualquier medida [A1].' },
  ],
  huecos: [],
  secciones: {
    historia: {
      resumen: 'Kainos nace en 1986 en Belfast como empresa conjunta de ICL y de Queen\'s University Belfast (a través de Qubis, que aún tiene el 8,7 %). Brendan Mooney la dirige desde 2001 y la saca a bolsa en Londres en 2015. Crece con dos apuestas: los servicios digitales para la Administración británica (la «GOV.UK» de los trámites en línea) y Workday, de la que es socio desde 2011 y para la que desarrolla un producto propio de pruebas. La pandemia (servicios digitales del NHS) llevó la acción a un máximo en 2021; el frenazo de 2023-25 y una sucesión fallida en la dirección la hundieron un 71 % [A1, A6, C1].',
      hitos: [
        { anio: '1986', hito: 'Fundación en Belfast como empresa conjunta de ICL y Queen\'s University Belfast [A6].' },
        { anio: '2001', hito: 'Brendan Mooney, consejero delegado [C1].' },
        { anio: '2011', hito: 'Kainos se hace socio de servicios de Workday [B1].' },
        { anio: '2015', hito: 'Salida a bolsa en Londres [A6].' },
        { anio: '2020-2021', hito: 'Servicios digitales de la pandemia para el NHS; ventas de 234,7 M en FY2021 con un margen EBITDA del 22,8 % [A7].' },
        { anio: '2023', hito: 'Russell Sloan sustituye a Mooney como consejero delegado [C1].' },
        { anio: '2024', hito: 'Acuerdo estratégico con Workday (julio; ≈ 7,8 M GBP al año de comisión) y vuelta de Mooney como consejero delegado (diciembre) [A2, C1].' },
        { anio: 'FY2025', hito: 'Ventas −4 % y reestructuración de 8,4 M con 190 despidos [A3].' },
        { anio: '2025-2026', hito: 'Compra de Davis Pier en Canadá (sep-2025); Workday vende en exclusiva el «Pay Transparency Analyzer powered by Kainos»; pedidos +32 % y ventas +17 % en FY2026 [A2].' },
      ],
      confianza: 'Media',
    },
    rentabilidad: {
      comentario: 'Kainos es un negocio de muy poco capital: no tiene deuda, el circulante comercial es negativo (−42,1 M, por los cobros anticipados de suscripciones y proyectos) y el capex es del 1-2 % de las ventas. Por eso el ROIC del motor (293,7 % en FY2026; 142-385 % desde FY2021) no es informativo: el capital invertido neto de caja es de solo 14 M. Con el capital operativo con fondo de comercio el ROIC es del ≈ 143 %, y sin contar el circulante negativo, del ≈ 57 % [A1]. El ROE es del 35,7 % con un patrimonio reducido por las recompras. Lo que sí importa es el margen: el NOPAT pasó de 44 M en FY2024 a 37 M en FY2025 y 40 M en FY2026 con un 13 % más de ventas, porque el margen EBITDA contable cayó del 18,0 % al 14,1 % (contratistas, Seguridad Social, comisión de Workday y bonus) [A2]. La calidad pasa con mucha holgura (ROIC − WACC muy por encima de 5 puntos en cualquier medida); el riesgo no está en el capital sino en el precio por hora que puede cobrar.',
      confianza: 'Media',
    },
    esg: {
      calificaciones: [],
      materialidad: 'Lo material para Kainos es el talento (3.475 personas, con contratistas de 69 a 259 en FY2026 y un NPS de clientes que bajó de 70 a 61), la seguridad de los datos de los sistemas públicos y sanitarios que construye y mantiene (un incidente costaría contratos y acreditaciones) y el «valor social» que puntúa en las licitaciones públicas británicas (≈ 10 % de la nota en muchos concursos). Las emisiones son pequeñas (oficinas y viajes) y la nueva sede de Belfast es la principal inversión física [A1, A2].',
      controversias: 'No se han encontrado sanciones, litigios ni incidentes de seguridad relevantes en los últimos tres años en los informes anuales ni en la prensa revisada; el único hecho laboral notable son los 190 despidos de la reestructuración de FY2025 [A3, A1].',
      confianza: 'Baja',
    },
  },
  parches: [],
  huecos_resueltos: [],
  dcf_justificacion: {
    crecimiento: 'FY2027e (+24 %, fijo) se apoya en la cartera contratada de 433,9 M (+18 %), en pedidos de 505,3 M (+32 %), en Davis Pier un año entero y en el avance del 18-ago-2026, que dio ventas «cómodamente por encima» de 509 M; el consenso está hoy en 541 M y nosotros en 534,6 M [A2, A9, D2]. Después, 9 % en FY2028e (consenso 585 M; nosotros 582,7) y convergencia al 3,5 % en FY2034e: por debajo de la TCAC histórica (12,9 % FY2021-FY2026) y del crecimiento de Workday (+12-13 %), porque la IA presiona las horas facturables.',
    margenes: 'Margen EBITDA contable (con la remuneración en acciones como coste) del 14,5 % en FY2027e, 15,5 % en FY2028e y 16,0 % después. FY2026 fue del 14,1 % con 29 M de contratistas y subcontratas que la empresa quiere sustituir por plantilla; la mediana de FY2022-FY2026 es del 15,7 % y FY2024 llegó al 18,0 % [A2, A7]. No proyectamos volver al 18 %: la IA y la competencia por concurso bajan el precio por hora, y la comisión a Workday (≈ 7,8 M al año) se queda [A2].',
    inversion: 'Capex del 2,5 % de las ventas en FY2027e (sede de Belfast) y del 1,5-1,6 % después (1,5-5,8 M al año en FY2021-FY2025); amortización del 1,4 %; I+D a gasto (18,7 M en FY2026, sin capitalizar). Circulante del −9 % de las ventas (−9,8 % en FY2026): los cobros anticipados financian el crecimiento [A1, A2].',
    wacc: 'Tasa libre del 5,30 % (gilt a 10 años, 16-oct-2026 [D4]); beta de 1,10, entre la ajustada mensual de 5 años frente al FTSE 250 (1,15; 1,23 sin ajustar) y la del sector de servicios de TI, porque los cinco años recogen la burbuja y la caída de 2021-2025 [D1]; prima de mercado del 5,5 % y sin prima adicional (el riesgo de IA va en el escenario bajista, no en la tasa); sin deuda. WACC del 11,35 %. Con la prima implícita del mercado (4,2 % [D5]) sería del 9,92 % y el DCF daría 9,02 GBP.',
    terminal: 'Crecimiento a perpetuidad del 2,5 % (inflación británica a largo plazo y algo de volumen); el múltiplo de salida implícito es de 7,9x el EBITDA, cerca de la mediana de los comparables (8,3x [D3]). Con un múltiplo de salida de 12x el valor terminal subiría de 1.022 a 1.549 M.',
  },
  puente_comentarios: {
    'FY2027e': 'Volumen: plantilla y contratistas +21 % al cierre de FY2026 y cartera +18 %; precio +2 %; otros +4 %: Davis Pier un año entero y el producto de transparencia salarial que vende Workday [A2].',
    'FY2028e': 'Volumen del 6,5 % (contratos grandes del sector público y sanitario en marcha, Norteamérica, ARR de Products) y precio del 2,5 %; consenso +8,1 % [D3].',
    'FY2029e': 'Volumen del 5,5 % y precio del 2,5 %: menos horas por proyecto por la IA, compensadas con más proyectos de IA y datos.',
    'FY2030e': 'Volumen del 4,5 % y precio del 2,5 %.',
    'FY2031e': 'Volumen del 3,5 % y precio del 2,5 %: converge hacia el crecimiento de Workday a largo plazo y del gasto público nominal.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'El crecimiento proyectado (8,3 % medio en FY2027e-FY2034e, 24 % en el primer año y 3,5-9 % después) está por debajo del histórico (12,9 %) y casi no necesita capital: el negocio crece con personas y con circulante negativo, y el motor no encuentra problemas de financiación (crecimiento financiable del 29 %). El primer año está respaldado por la cartera contratada (433,9 M, ≈ 81 % de las ventas de FY2027e) y por el avance de agosto [A2, A9]. Lo que podría romperlo no es el capital sino el precio por hora: si la IA reduce las horas que el cliente paga más deprisa de lo que Kainos gana proyectos nuevos, el volumen caería. Lo recogemos en el bajista (−4 puntos de crecimiento y −2,5 de margen), no en el base, porque hoy los pedidos crecen un 32 % y los ingresos de IA y datos un 11 % [A2].',
  dcf_lectura: 'El DCF da 7,63 GBP por acción (763 p), un 42 % por debajo del precio (13,20 GBP), con el 55 % del valor en el terminal; con la prima implícita del mercado (WACC 9,92 %) serían 9,02 GBP, aún un 32 % por debajo. El DCF inverso dice que el precio necesita un 16 % de crecimiento anual en FY2028e-FY2034e (nuestro base: 6,1 %) o un margen EBITDA del 27,8 % (nuestro base: 16 %), o aceptar una rentabilidad del 7,5 % anual. Ni la historia de Kainos (margen máximo del 22,8 % en el año de la pandemia) ni el sector (márgenes del 10-19 % [D3]) sostienen eso.',
  narrativas: {
    Bajista: 'La IA abarata el desarrollo y la implantación: los clientes públicos y los de Workday piden menos horas o precios más bajos, Workday integra pruebas automatizadas en su plataforma y el gasto público británico se aprieta tras el presupuesto. Crecimiento 4 puntos menor desde FY2028e (5 % y 4 %), margen EBITDA 2,5 puntos más bajo (13,5 %) y WACC 0,5 puntos mayor: 4,70 GBP por acción.',
    Base: 'FY2027e de +24 % con la cartera y el avance de agosto, crecimiento que converge del 9 % al 3,5 % y margen que se recupera al 16 % al sustituir contratistas: 7,63 GBP por acción.',
    Alcista: 'Kainos se convierte en el principal integrador de IA de la Administración británica, Norteamérica sigue al +50-100 % y Workday Products acelera con Workday como canal: 1,5 puntos más de crecimiento y 1 punto más de margen (17 %): 8,80 GBP por acción.',
  },
  escenarios_comentario: 'Los tres escenarios del DCF quedan por debajo del precio (4,70, 7,63 y 8,80 GBP; ponderado 7,19): aun en el alcista, el valor intrínseco está un 33 % por debajo de 13,20 GBP. El precio solo se justifica con un múltiplo como el de la historia de Kainos (PER de 27-29x), no con sus flujos descontados al coste de capital. Esa es la tensión del informe: a 12 meses la regla común da +15,6 % ponderado porque el PER histórico es alto, pero el valor real no llega al precio.',
  casos_12m: {
    Bajista: 'Ventas FY2029e de 595 M (+5 % y +4 % tras FY2027e) y margen EBITDA del 13,5 %: BPA de 0,464 GBP. PER de 16,1x, el mínimo de cinco años (cierre de FY2026, en plena venta de software por la IA).',
    Base: 'Ventas de 534,6 M en FY2027e, 582,7 M en FY2028e y 629,3 M en FY2029e, margen EBITDA del 16 %, intereses de 3 M y 116,6 M de acciones: BPA de 0,598 GBP. PER de 27,8x: el actual (26,5x) a mitad de camino de la mediana de cinco años (29,2x).',
    Alcista: 'Un punto y medio más de crecimiento y un punto más de margen (17 %): BPA de 0,655 GBP. PER de 29,2x, la mediana de cinco años.',
  },
  diferencia_consenso: 'Nuestro BPA coincide con el consenso de MarketScreener, que está en una base cercana a la contable: 0,453 frente a 0,464 GBP en FY2027e (−2 %), 0,534 frente a 0,537 en FY2028e y 0,598 frente a 0,605 en FY2029e [D2]. Las ventas también (534,6 frente a 541,0 M en FY2027e; 629,3 frente a 648,7 en FY2029e). La diferencia está en el múltiplo: nuestro objetivo ponderado (14,96 GBP) y el del base (16,62) quedan un 18 % y un 31 % por encima del objetivo medio de los analistas (12,73 GBP, 11 analistas), que equivale a ≈ 21x nuestro BPA de FY2029e. La regla común aplica la historia de Kainos (mediana adelantada de 29,2x), que es de cuando crecía al 20-30 % anual; los analistas aplican múltiplos más cercanos al sector (11x).',
  objetivo_comentario: 'Objetivo a 12 meses de 14,96 GBP (1.496 p) ponderado: +15,6 % con el dividendo (2,2 %) y +28,2 % en el base (16,62 GBP), con un bajista de 7,47 GBP (−41 %) y un alcista de 19,13 GBP (+47 %): asimetría de 1,03. La regla v2 de control da 16,9 % ponderado y 15,5 % en el base. Los números a 12 meses superan los umbrales de compra, pero el valor intrínseco (7,15 GBP) está un 46 % por debajo del precio, así que la regla da Mantener. Un bajista del −41 % pesa: el mínimo de cinco años (16,1x) es de febrero de 2026, cuando el mercado descontó que la IA hundiría a las consultoras.',
  valoracion_comentario: 'Pesos: DCF 45 %, escenarios 40 % y comparables 15 %; transacciones 0 % (no hay operaciones comparables con múltiplos publicados) y sin suma de partes como método. Los comparables (PER de 11,2x y EV/EBITDA de 8,3x) dan 4,5-7,8 GBP: el sector de servicios de TI cotiza en mínimos por el miedo a la IA y Kainos lleva más del doble de múltiplo. El valor objetivo de 7,15 GBP es la síntesis; con la prima del mercado, 8,29 GBP. Todas las medidas de valor real quedan por debajo del precio; solo el PER histórico de la propia Kainos lo alcanza. El mismo miedo a la IA pesa sobre los servicios de TI europeos analizados hoy (Reply) [P2].',
  suma_partes_comentario: 'No se usa como método, pero sirve de prueba: aunque Workday Products (contribución de 23,6 M en FY2026, margen bruto del 78 %, ARR de 89 M) valiera 20 veces su contribución (472 M) y los servicios (Digital Services y Workday Services, 68,4 M de contribución menos 23,7 M de costes centrales = 44,7 M) la mediana del sector (8,3x, 371 M), con la caja neta ajustada (≈ 48 M), saldrían ≈ 891 M: 7,6 GBP por acción, lejos de 13,20 [A2, D3].',
  movimientos_fuertes: [
    { periodo: 'dic-2025', var_pct: -7.7, causa: 'Caída del 7,7 % el 10-dic-2025 sin hecho propio publicado ese día (RNS y prensa revisados); el anuncio de diciembre fue la ampliación en Polonia de Workday Services [D1, A2].', veredicto: 'no cambia', condicion: null },
    { periodo: 'feb-2026', var_pct: -28, causa: 'Venta de software y servicios por las herramientas de IA (Claude Cowork, 3-feb-2026: −8,5 % ese día; −5,5 % el 11-feb); mínimo de 52 semanas de 6,86 GBP el 25-feb y PER adelantado en mínimos de una década [D10, D1].', veredicto: 'no cambia', condicion: null },
    { periodo: 'jun-2026', var_pct: -15.4, causa: 'Caída del 15,4 % en el mes hasta el 30-jun (−5,2 % el 18-jun), con el sentimiento del sector tecnológico; sin hecho propio [D1].', veredicto: 'no cambia', condicion: null },
    { periodo: 'jul-ago 2026', var_pct: 61.2, causa: 'Avance del 18-ago-2026: FY2027 «cómodamente por encima» del consenso (509 M y 77 M); la acción sube casi un 20 % ese día y Berenberg y Stifel suben objetivos [D6, D7].', veredicto: 'no cambia', condicion: null },
  ],
  noticias: [
    { fecha: '2025-11-10', tipo: 'resultados', hecho: 'Resultados del 1S FY2026: ventas +7 % (196,1 M), BAI ajustado −16 % por contratistas y costes, nueva recompra de 30 M [A4].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-03-18', tipo: 'accionista de referencia', hecho: 'Liontrust baja del 5 % (4,996 %) [C5].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-04-20', tipo: 'resultados', hecho: 'Avance de cierre de FY2026: ingresos por encima del consenso (406,5 M) y BAI ajustado en línea (66,4 M) [A10].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-05-18', tipo: 'resultados', hecho: 'Resultados de FY2026: ventas +17 %, BAI ajustado +2 %, pedidos +32 %, margen a la baja por contratistas; dividendo de 29,6 p y sin nueva recompra [A2].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-07-01', tipo: 'directivos', hecho: 'La cónyuge del director financiero vende 760.911 acciones a 7,79 GBP (≈ 5,9 M GBP), siete semanas antes del avance que subió la acción [C3].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-08-18', tipo: 'resultados', hecho: 'Avance del 1S FY2027: ventas y beneficio del año «cómodamente por encima» del consenso; resultados del semestre el 9-nov-2026 [A9].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-08-19', tipo: 'recomendación', hecho: 'Berenberg sube el objetivo de 1.185 a 1.330 p (compra); Stifel de 1.282 a 1.395 p [D7].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-09-08', tipo: 'accionista de referencia', hecho: 'Qubis (Queen\'s University Belfast) baja del 9,34 % al 8,67 % [C5].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-09-22', tipo: 'directivos', hecho: 'Junta: informe de remuneración aprobado con el 98,6 %; Katie Davis deja el consejo; 116,26 M de acciones con derecho de voto el 1-oct [C2, C6, C7].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-10-07', tipo: 'accionista de referencia', hecho: 'Baillie Gifford baja del 6,36 % al 4,50 % [C5].', veredicto: 'no cambia', condicion: null },
  ],
  contexto_comentario: 'La acción ha subido un 64 % en tres meses y está en su máximo de 52 semanas (avisos P1 y P2), por una causa propia y comprobada: el avance del 18-ago-2026, que subió las estimaciones del consenso (BPA de FY2027 de 0,484 a 0,525 GBP en Yahoo [D3]). No hay ningún hecho pendiente que cambie la decisión: ni oferta, ni ampliación, ni litigio. La venta de la persona vinculada al director financiero (1-jul) fue una sola y anterior a la subida; las ventas de Qubis y Baillie Gifford son toma de beneficios de accionistas antiguos. Veredicto: no cambia. Los resultados del 1S FY2027 (9-nov-2026) son la siguiente prueba [C4, C5].',
  catalizadores: {
    items: [
      { fecha: '2026-11-09', evento: 'Resultados del 1S FY2027', efecto: 'Primer dato de margen con menos contratistas y del crecimiento con los contratos grandes; confirma o no el «cómodamente por encima» de agosto.', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Finales de nov-2026', evento: 'Resultados del 3T de Workday y presupuesto británico de otoño', efecto: 'Demanda de implantaciones de Workday y marco de gasto público para 2027-28.', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Abr-2027', evento: 'Avance de cierre de FY2027', efecto: 'Ventas frente a 541 M de consenso y BAI ajustado frente a ≈ 84 M.', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'May-2027', evento: 'Resultados de FY2027 y guía de FY2028', efecto: 'Margen del 2S, ARR de Products (¿100 M?) y política de recompras.', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027', evento: 'Traslado a la nueva sede de Belfast', efecto: 'Termina el capex extraordinario.', probabilidad: 'Media', sentido: '+' },
      { fecha: '12-18 meses', evento: 'Nuevas funciones de IA de Workday (pruebas, agentes) y adjudicaciones de los marcos digitales del Gobierno británico', efecto: 'Dirán si la IA quita trabajo a los socios o abre proyectos nuevos.', probabilidad: 'Media', sentido: '+/−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'La IA abarata el desarrollo y la implantación por horas', tipo: 'Tecnológico / estratégico', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−38 % (escenario bajista del DCF: 4,70 frente a 7,63 GBP); a 12 meses, −41 % con el PER mínimo', mitigante: 'Kainos vende proyectos de IA (45,8 M) y es el 7.º proveedor de IA del sector público británico; los proyectos públicos piden acreditación y responsabilidad que la IA no da [A2].', senal: 'Pedidos o cartera de Digital Services planos o a la baja dos semestres seguidos; precio medio por día a la baja en los marcos públicos.' },
      { riesgo: 'Dependencia de Workday', tipo: 'Socio / concentración', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 a −25 % si Workday integra pruebas automatizadas o reduce el papel de los socios', mitigante: 'Workday vende un producto de Kainos en exclusiva y tiene un acuerdo estratégico con ella desde 2024 [A2].', senal: 'Retención de ingresos de Products por debajo del 85 % (90 % hoy) o anuncio de herramientas de pruebas nativas de Workday.' },
      { riesgo: 'Gasto público británico', tipo: 'Cliente / político', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−10 a −15 % (un año de crecimiento nulo en Digital Services)', mitigante: 'Contratos plurianuales con el Home Office, Transporte y NHS England; Canadá crece [A2].', senal: 'Revisión de gasto o presupuesto con recortes en tecnología; pedidos públicos a la baja.' },
      { riesgo: 'Los márgenes no se recuperan', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−6 % por cada punto de margen EBITDA permanente (sensibilidad del DCF)', mitigante: 'Sustitución de contratistas por plantilla prometida para el 2S FY2027 [A2].', senal: 'Margen EBITDA ajustado del 1S FY2027 por debajo del 15 %.' },
      { riesgo: 'Múltiplo exigente', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−41 % a 12 meses si vuelve al PER mínimo de cinco años (16,1x)', mitigante: 'Caja neta y crecimiento previsto por encima del sector.', senal: 'Una decepción en los resultados del 9-nov-2026.' },
      { riesgo: 'Ejecución de contratos grandes de precio fijo', tipo: 'Operativo', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−3 a −5 %', mitigante: 'Historial largo en la Administración; ingresos devengados vigilados [A1].', senal: 'Ingresos devengados por encima del 10 % de las ventas o provisiones por contratos onerosos.' },
      { riesgo: 'Talento y calidad del servicio', tipo: 'Personas', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−3 a −5 %', mitigante: 'Centros en Belfast y Polonia; plan de acciones para empleados [A1].', senal: 'NPS por debajo de 55 (61 hoy) o rotación al alza.' },
      { riesgo: 'Divisa', tipo: 'Financiero', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: '−2 %', mitigante: 'Costes y ventas en la misma divisa en cada país.', senal: 'Libra muy fuerte frente al dólar (EE. UU. es el 26 % de las ventas).' },
    ],
    premortem: 'Octubre de 2029: la acción vale un 40 % menos. Lo que pasó: en 2027 las herramientas de IA para programar y configurar software maduraron y los clientes públicos empezaron a pedir los mismos sistemas con la mitad de horas; los marcos de contratación del Gobierno bajaron las tarifas por día y Digital Services, que había crecido un 23 % en FY2026, se quedó plano en FY2028. A la vez, Workday metió pruebas automatizadas con IA en su plataforma y la retención de Workday Products bajó del 90 % al 80 %; Workday Services sufrió porque los clientes implantaban más rápido y con menos consultores. Los márgenes no volvieron al 16 % porque el precio caía más deprisa que los costes. El mercado, que pagaba 26x el beneficio por la historia de crecimiento, pasó a pagar el múltiplo del sector (11-16x). Lo habrían anticipado los pedidos de Digital Services (sin crecer dos semestres), la retención de Products por debajo del 85 % y el margen del 1S FY2027 por debajo del 15 %.',
    ia: {
      exposicion: 'Alta',
      sentido: 'Mixto',
      efecto_valor: '−20 a −40 % a 3-5 años si se cumple el bajista; +5-10 % si Kainos captura los proyectos de IA del sector público',
      comentario: 'Más del 80 % de las ventas son horas de desarrollo, integración e implantación (Digital Services 56 %, Workday Services 25 %), justo lo que la IA generativa abarata: el cliente puede pedir lo mismo con menos horas o hacerlo en casa. Resta también en Products si Workday integra pruebas automatizadas. Suma porque la Administración necesita integradores acreditados para meter IA en sistemas críticos: Kainos facturó 45,8 M en IA y datos (+11 %), es el 7.º proveedor de IA del sector público británico y usa IA en su propia entrega, lo que puede subir su margen si mantiene el precio por proyecto. Hoy pesa más la amenaza: los ingresos de IA crecen menos que la división y el mercado ya castigó al sector en febrero. Señal: pedidos y precio por día de Digital Services, y retención de Products [A2, D10, P1].',
    },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'IA y precio', pregunta: '¿Cuánto ha bajado el precio por día o las horas por proyecto en los contratos públicos renovados en 2026, y qué parte de los contratos es de precio fijo (donde la IA mejora el margen de Kainos)?', por_que: 'Decide si la IA es amenaza u oportunidad para el 80 % de las ventas.' },
      { tema: 'Margen', pregunta: '¿Qué margen EBITDA ajustado espera la dirección en el 2S FY2027 al sustituir contratistas, y cuántos contratistas quedan?', por_que: 'El base supone volver al 16 % contable; cada punto vale ≈ 6 % del valor.' },
      { tema: 'Workday', pregunta: '¿Qué dice el acuerdo estratégico con Workday sobre exclusividad, duración y comisión (7,8 M al año), y qué pasaría si Workday lanza pruebas nativas?', por_que: 'Workday Services y Products son el 44 % de las ventas y el 39 % de la contribución.' },
      { tema: 'Products', pregunta: '¿Por qué bajó la retención de ingresos de Products del 93 % al 90 %?', por_que: 'Es el negocio de más margen y el que justifica la prima de múltiplo.' },
      { tema: 'Crecimiento de FY2027', pregunta: '¿Qué parte del +24-25 % es de contratos grandes que no se repiten y qué parte de Davis Pier?', por_que: 'Separa crecimiento recurrente de puntual para FY2028e.' },
      { tema: 'Capital', pregunta: '¿Por qué no hay recompra nueva con la acción al doble que hace ocho meses, y cuál es la caja mínima que quiere mantener el consejo?', por_que: 'Las recompras se hicieron a 7-9 GBP; la política futura cambia el BPA.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Mantener',
    conviccion: 'Media',
    justificacion_recomendacion: null,
    horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener, con convicción media. El objetivo a 12 meses es de 14,96 GBP (1.496 p) frente a un precio de 13,20 GBP (cierre del 21-oct-2026): +15,6 % ponderado con el dividendo y +28,2 % en el base, con un bajista de −41 % y un alcista de +47 % (asimetría de 1,03). La regla a 12 meses pasa sus dos umbrales, pero el valor intrínseco (7,15 GBP, un 46 % por debajo del precio) no llega, y sin valor real no hay Comprar. La convicción es media porque el resultado depende de que el mercado siga pagando por Kainos su PER histórico (27-29x) y no el del sector (11x); bajaría si el margen del 1S FY2027 (9-nov) sale por debajo del 15 %.

**El negocio.** Kainos hace servicios digitales para la Administración británica y el NHS (56 % de las ventas), implanta Workday (25 %) y vende su propio software de pruebas para clientes de Workday (19 %, margen bruto del 78 %) [A2]. No tiene deuda, el circulante es negativo y el ROIC está muy por encima del WACC en cualquier medida (≈ 57 % sin el circulante negativo). El veredicto de sostenibilidad es «Sí»: el crecimiento proyectado (8,3 % medio, por debajo del 12,9 % histórico) casi no necesita capital y el primer año lo cubre la cartera de 433,9 M; el riesgo no es de capital sino de precio por hora.

**Finanzas.** Las ventas crecieron un 17 % en FY2026 (431,1 M) y los pedidos un 32 %, pero el margen EBITDA contable cayó del 18,0 % de FY2024 al 14,1 % por contratistas, subcontratas, Seguridad Social, la comisión a Workday y bonus [A2]. La caja bajó de 133,7 a 89,1 M por 55,7 M de recompras.

**Equipo y gobierno.** Fundadores al mando (Mooney 9 %, McCann 3 %), remuneración modesta (443 miles de GBP el consejero delegado) y aprobada con el 98,6 % [C1, C2]. La cónyuge del director financiero vendió 5,9 M GBP en julio a 7,79 GBP, antes del avance que disparó la acción [C3]: una sola venta, sin señal de fraude, pero no es una compra de los de dentro.

**Valoración.** Nuestro BPA coincide con el consenso (0,598 GBP en FY2029e frente a 0,605). El DCF da 7,63 GBP con un WACC del 11,35 % (9,02 con la prima del mercado) y el DCF inverso dice que el precio exige un 16 % de crecimiento anual hasta FY2034e o un margen del 27,8 %. Los comparables (PER de 11,2x) dan 4,7-7,8 GBP. Solo el PER histórico de Kainos alcanza el precio: de ahí el +15,6 % a 12 meses frente a un valor real muy inferior.

**Riesgos y catalizadores.** La IA es el riesgo central: más del 80 % de las ventas son horas de desarrollo e implantación que la IA abarata (bajista del DCF −38 %). Después, Workday (44 % de las ventas entre servicios y producto) y el gasto público británico (53 % entre sector público y sanidad). El catalizador inmediato son los resultados del 9-nov-2026. La acción ha subido un 64 % en tres meses (avisos P1 y P2), con causa propia: el avance de agosto.

**Qué cambiaría la decisión.** Por debajo de 7,15 GBP (715 p) pasaría a Comprar (el valor intrínseco llegaría al precio); por encima de 16,95 GBP, Vender. Un margen EBITDA ajustado del 1S FY2027 por encima del 17 % con pedidos al alza subiría el valor real; pedidos de Digital Services planos o una retención de Products por debajo del 85 % bajarían el objetivo.`,
    tesis: 'Kainos es una consultora de Belfast con tres negocios: servicios digitales para la Administración británica y el NHS, implantación de Workday y un software propio de pruebas para clientes de Workday con 89 M de ingresos recurrentes. Sin deuda y con circulante negativo, convierte en caja casi todo su beneficio; vendió 431 M en FY2026 (+17 %) con pedidos récord (505 M) [A2].\n\nEl precio (13,20 GBP, ≈ 26x el BPA contable de los próximos 12 meses) descuenta, según el DCF inverso, un 16 % de crecimiento anual durante siete años o un margen EBITDA del 28 %: el doble de lo que ha hecho nunca salvo en la pandemia. Los comparables cotizan a 11x.\n\nPara invertir hay que creer que la IA será para Kainos una fuente de proyectos y de margen, no un recorte de horas, y que el mercado seguirá pagando el múltiplo de una empresa de crecimiento. Las cifras de FY2026 apoyan la demanda (pedidos +32 %), pero no el margen (14,1 %), y los ingresos de IA crecen menos que la división (+11 %). Pagamos el precio de la historia y no el del riesgo: Mantener.',
    vision_diferencial: {
      mercado_descuenta: 'Que Kainos vuelve a ser una empresa de crecimiento: +25 % en FY2027, BPA de 0,60 GBP en FY2029 y un múltiplo de 25-30x, como en 2018-2024, sostenido por la IA como fuente de proyectos.',
      nuestra_vision: 'Coincidimos en el beneficio de los próximos tres años (nuestro BPA está a un 1-2 % del consenso), pero no en lo que vale a largo plazo: con el coste de capital de una empresa de beta 1,1 y márgenes del 16 %, el valor está en 7-9 GBP.',
      por_que: 'La IA ataca directamente lo que Kainos factura (horas), el margen no se ha recuperado y el resto del sector cotiza a 11x precisamente por eso. El múltiplo histórico de Kainos se formó con crecimientos del 20-30 % y márgenes del 18-23 % que hoy no tiene.',
    },
    a_favor: [
      '**Demanda fuerte**: pedidos +32 % (505,3 M) y cartera +18 % (433,9 M) en FY2026 [A2].',
      '**Producto propio de calidad**: Workday Products con ARR de 89 M (+23 %) y margen bruto del 78 % [A2].',
      '**Balance sin deuda**: 89,1 M de caja y circulante negativo; FCF de ≈ 48 M [A1].',
      '**Guía al alza**: FY2027 «cómodamente por encima» de 509 M; consenso hoy en 541 M [A9, D2].',
      '**Equipo alineado**: fundadores con ≈ 12 % entre el consejero delegado y el financiero [C1].',
    ],
    en_contra: [
      '**Riesgo de IA central**: más del 80 % de las ventas son horas de desarrollo e implantación [A2].',
      '**Márgenes a la baja**: EBITDA contable del 14,1 % en FY2026 frente al 18,0 % en FY2024 [A2].',
      '**Valor real muy por debajo**: valor intrínseco de 7,15 GBP, un 46 % menos que el precio.',
      '**Múltiplo exigente**: ≈ 26x el BPA contable frente a 11x del sector [D3].',
      '**Dependencias**: Workday (44 % de las ventas) y el gasto público británico (53 %) [A2].',
    ],
    que_vigilar: 'La tesis depende de que la IA no reduzca el precio por hora más deprisa de lo que Kainos gana proyectos y de que el margen vuelva al 16 % contable al sustituir contratistas. La señal de que no se cumple: margen EBITDA ajustado del 1S FY2027 por debajo del 15 %, pedidos de Digital Services planos dos semestres o retención de Products por debajo del 85 %.',
    cambiaria_recomendacion: [
      'Precio por debajo de 7,15 GBP (715 p): Comprar (el valor intrínseco llegaría al precio con la ponderada por encima del 15 %).',
      'Precio por encima de 16,95 GBP: Vender.',
      'Margen EBITDA ajustado del 1S FY2027 por encima del 17 % con pedidos al alza: revisar el base al alza (margen terminal del 18 %).',
      'Pedidos de Digital Services planos dos semestres o precio por día a la baja en los marcos públicos: bajar el base al escenario bajista.',
      'Workday anuncia pruebas automatizadas nativas o la retención de Products cae por debajo del 85 %: revisar Products y el múltiplo.',
    ],
    kpis_seguimiento: [
      { kpi: 'Margen EBITDA ajustado semestral', nivel_actual: '15,4 % (2S FY2026)', umbral_alerta: '< 15 %', por_que: 'Mide si la recuperación de márgenes del base llega.' },
      { kpi: 'Pedidos de Digital Services', nivel_actual: '261,3 M (+29 %)', umbral_alerta: 'Dos semestres sin crecer', por_que: 'Primera señal de que la IA quita horas.' },
      { kpi: 'ARR y retención de Workday Products', nivel_actual: '89,0 M; 90 %', umbral_alerta: 'Retención < 85 %', por_que: 'Negocio de más margen y más expuesto a Workday.' },
      { kpi: 'Contratistas', nivel_actual: '259', umbral_alerta: '> 250 al cierre de FY2027', por_que: 'Su sustitución es la palanca del margen.' },
      { kpi: 'Ingresos de IA y datos', nivel_actual: '45,8 M (+11 %)', umbral_alerta: 'Crecimiento < al de Digital Services', por_que: 'Dice si la IA suma más de lo que resta.' },
    ],
    confianza: 'Media',
  },
};
