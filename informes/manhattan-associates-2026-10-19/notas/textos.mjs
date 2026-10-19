// Textos del analista (Manhattan Associates, corte 2026-10-19). Citas con la letra de la nota ([A3] = fuente 3 de A.json; [P1] propia).
export default {
  limitaciones: 'Cifras en millones de USD, ejercicio natural (cierre a 31 de diciembre), US GAAP. Último ejercicio real: 2025 (10-K del 4-feb-2026); últimos 12 meses a 30-jun-2026 (10-Q del 2T26, 31-jul-2026). El 3T26 se publica el 27-oct-2026 tras el cierre (no el 21-oct, como se suponía al encargar el análisis) [D8]. Precio: cierre del 16-oct-2026 (222,17 USD); la sesión del 19-oct estaba abierta al hacer el análisis (225,52 USD a las 12:25 de Nueva York [P2]) y la decisión se comprueba con ese precio en las pruebas de robustez. El DCF usa el EBITDA GAAP, que resta la remuneración en acciones (111 M USD en 2025, 10,3 % de las ventas): es un coste real para el accionista. La regla a 12 meses y su historia usan el BPA AJUSTADO de la empresa (sin remuneración en acciones ni reestructuración), la misma base que el consenso. Los arrendamientos operativos no van al puente (US GAAP). El ROIC del motor no es significativo: el capital invertido contable es casi nulo o negativo (cobros anticipados de 337 M y patrimonio reducido por las recompras). Las estimaciones de 2028e del consenso y los múltiplos EV/EBITDA de las transacciones no se encontraron gratis.',
  controles_explicados: [
    { control: 'ROIC del motor', explicacion: 'El ROIC del motor (2.235 % en 2025; sin dato o de miles por ciento en 2021-2024) no tiene sentido: el capital invertido contable es casi nulo porque los clientes pagan por adelantado (pasivos de contrato de 337 M USD frente a 215 M de clientes) y las recompras han dejado el patrimonio en 315 M (157,5 M en junio de 2026) con 329 M de caja [A1, A8]. La medida exigente, con inmovilizado + fondo de comercio + clientes sin restar los cobros anticipados (23 + 62 + 215 = 300 M) y el resultado operativo GAAP después de un 23 % de impuestos (279,8 × 0,77 = 215 M), da un 72 %: ROIC − WACC ≈ +61 puntos. Aunque se capitalizara toda la I+D de cinco años (≈ 600 M), el ROIC seguiría por encima del 20 %.' },
    { control: 'ROE y patrimonio pequeño', explicacion: 'El ROE del 72 % (2025) lo inflan las recompras (1.500 M USD en diez años, 315 M en 2025 y 275 M en el 1S26) que han reducido el patrimonio a 157,5 M en junio de 2026 [A2]; no hay deuda, así que no es apalancamiento financiero sino capital devuelto.' },
    { control: 'Remuneración en acciones', explicacion: 'La remuneración en acciones (111 M USD en 2025, 10,3 % de las ventas; 59 M en 2022) es la diferencia principal entre el BPA GAAP (3,60) y el ajustado (5,06) [A4, A10]. El DCF la trata como coste (EBITDA GAAP); la regla a 12 meses usa el BPA ajustado porque es la base del consenso y de la historia del PER. Si el DCF la excluyera, el valor subiría de 83 a ≈ 112 USD, aún un 50 % bajo el precio.' },
  ],
  huecos: [],
  secciones: {
    historia: {
      resumen: 'Manhattan Associates nace en 1990 en Atlanta como una consultora de software para almacenes, fundada por Alan Dabbiere; en 1995 lanza su sistema de gestión de almacenes (WMS) para AS/400 y en 1998 sale a bolsa en el Nasdaq [B5]. Con compras pequeñas sumó transporte (Logistics.com, 2002), planificación (Evant, 2005) y tienda (GlobalBay, 2014), y desde 2005 es líder del cuadrante de Gartner en WMS [B5]. Su giro decisivo fue reescribir todo el producto como una sola plataforma nativa de nube (Manhattan Active, desde 2017): Active WM en 2020 y Active TM en 2021 [B5]. Desde entonces la nube ha pasado de casi nada a ser el 38 % de las ventas, con un margen operativo ajustado que subió del 25 % al 35 % [A4]. Eddie Capel, consejero delegado de 2013 a 2025, dejó el cargo a Eric Clark (de NTT Data) en febrero de 2025 y es presidente no ejecutivo desde 2026 [C1, C5].',
      hitos: [
        { anio: '1990', hito: 'Fundación en Atlanta (Georgia) como especialista en software de almacenes [B5].' },
        { anio: '1998', hito: 'Salida a bolsa en el Nasdaq [B5].' },
        { anio: '2002', hito: 'Compra de Logistics.com: entrada en la gestión del transporte (TMS) [B5].' },
        { anio: '2005', hito: 'Compra de Evant (planificación); primer año como líder de Gartner en WMS [B5].' },
        { anio: '2014', hito: 'Compra de GlobalBay (tienda y punto de venta); última compra relevante [B5].' },
        { anio: '2017-2021', hito: 'Manhattan Active: plataforma única nativa de nube; Active WM (2020) y Active TM (2021) [B5].' },
        { anio: '2025', hito: 'Eric Clark sucede a Eddie Capel como consejero delegado; venta de servicios floja y acción −36 % en el año [C1, D1].' },
        { anio: '2026', hito: 'Agentes de IA (Active Agents, Agent Foundry), recorte de plantilla del ≈ 6 %, recompras de 275 M en el 1S26 y guía subida dos veces [A2, A9, B1].' },
      ],
      confianza: 'Media',
    },
    rentabilidad: {
      comentario: 'El ROIC del motor no sirve: el capital invertido contable es casi nulo o negativo porque los clientes pagan la nube por adelantado (337 M USD de pasivos de contrato en 2025) y las recompras han dejado el patrimonio en 157,5 M en junio de 2026, sin deuda [A1, A2]. La medida exigente, con inmovilizado, fondo de comercio y clientes (≈ 300 M en 2025) y el resultado operativo GAAP después de impuestos (215 M), da un 72 %, frente a un WACC del 10,9 %: ≈ +61 puntos. Es el perfil de un software maduro de nicho que crece sin capital: inversión del 1,4 % de las ventas y ninguna compra de empresas en diez años. El ROE (72 %) lo inflan las recompras, no la deuda. La tendencia es buena: el resultado operativo GAAP pasó de 144 M en 2021 a 280 M en 2025 con un capital casi constante, y el margen operativo ajustado del 26 % al 35 % [A4, A10]. El riesgo para la rentabilidad no es el capital sino el precio: si los agentes de IA abaratan el software de almacén o los servicios de implantación, la caída sería de margen, no de rotación.',
      confianza: 'Media',
    },
    esg: {
      calificaciones: [],
      materialidad: 'Lo material para Manhattan es la seguridad y disponibilidad de su nube (sus clientes paran almacenes y tiendas si el sistema cae), la protección de datos de clientes y consumidores, el uso responsable de la IA (agentes que toman decisiones operativas) y la retención de talento técnico, con buena parte de la I+D en India [A1]. Su efecto ambiental es indirecto: el software reduce kilómetros vacíos, inventario y desperdicio de sus clientes; las emisiones propias son de oficinas y de la nube contratada (Google Cloud).',
      controversias: 'Sin controversias ni demandas relevantes en el 10-K de 2025 ni en los 10-Q de 2026 [A1, A8]. En gobierno: consejo escalonado (no se elige entero cada año), 24,6 % de votos en contra del consejero Hollembaek en 2026 y 10,5 % en contra de la remuneración, con un consejero delegado que cobró 16,70 M USD en 2025 (121 veces el empleado mediano) [C1, C2]. Calificaciones de MSCI, Sustainalytics o CDP no comprobadas en fuente primaria: no se dan.',
      confianza: 'Baja',
    },
    bolsa: {
      contexto: {
        movimiento: { fecha: '2026-10-19', var_1m_pct: 6.5, var_3m_pct: 41.5, var_6m_pct: 68.2, var_12m_pct: 16.6, dist_max_52s_pct: -0.8, dist_min_52s_pct: 86.2, dist_max_historico_pct: -27.3, tendencia: 'alcista', volatilidad_60d_pct: 53.0, avisos: ['P1 Subida fuerte: +42 % en tres meses', 'P2 A 1 % del máximo de 52 semanas tras subir un 42 % en tres meses'] },
        movimientos_fuertes: [
          { periodo: 'jul-2026', var_pct: 47.7, causa: 'Resultados del 2T26 el 28-jul: ventas +9,3 %, nube +26 %, cartera contratada (RPO) de 2.470 M (+23 %), BPA ajustado de 1,39 frente a 1,32 esperado y guía de 2026 subida por segunda vez; la acción subió un 21,3 % el 29-jul (+22,6 % en la sesión) [D12, A2]. Antes, la guía del 1T26 (+5,9 % el 22-abr) [A11].', veredicto: 'no cambia', condicion: null },
          { periodo: '30-jul-2026', var_pct: -6.4, causa: 'Recogida de beneficios al día siguiente de la subida del 21 %; sin noticia de la empresa [D1, D13].', veredicto: 'no cambia', condicion: null },
          { periodo: 'sep-2026', var_pct: -11.0, causa: 'Caída de un mes hasta el 30-sep con el software y la subida de la rentabilidad del Tesoro (bono a 10 años por encima del 5 %); sin noticia de la empresa [D13, D4].', veredicto: 'no cambia', condicion: null },
          { periodo: '13-may-2026', var_pct: -6.9, causa: 'Caída de un día sin causa propia encontrada (sin notas, 8-K ni cambios de recomendación ese día en EDGAR ni en los titulares revisados) [D13].', veredicto: 'no cambia', condicion: null },
          { periodo: 'feb-abr-2026', var_pct: -30.0, causa: 'Miedo a que los agentes de IA sustituyan el software de aplicaciones: −10,0 % el 3-feb (herramientas de Anthropic para empresas), −9,8 % el 23-feb (sin causa propia encontrada), −5,1 % el 24-mar y −7,3 % el 9-abr (Managed Agents de Anthropic); mínimo de 119 USD el 10-abr [D14, D15, P1]. Antes, −5,2 % el 28-ene por una guía de 2026 floja [D16].', veredicto: 'no cambia', condicion: null },
        ],
        noticias: [
          { fecha: '2026-10-12', tipo: 'recomendación', hecho: 'Morgan Stanley sube MANH a Sobreponderar y el objetivo de 180 a 250 USD (+6,3 % en el día) [D17, D13].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-10-07', tipo: 'resultados', hecho: 'Fecha de los resultados del 3T26: 27-oct-2026 tras el cierre, con conferencia a las 16:30 de Nueva York [D8].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-08-11', tipo: 'directivos', hecho: 'Ventas de directivos en 12 meses por 3,34 M USD (Clark 3.000 acciones a 197,76 el 11-ago; Gantt 5.139 a 195,53 el 30-jul; Hollembaek 1.579 a 189,88), ninguna compra y ninguna con plan 10b5-1 [D18].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-07-28', tipo: 'resultados', hecho: '2T26: guía de 2026 subida a 1.160-1.166 M de ventas y 5,44-5,50 USD de BPA ajustado; recompras de 275 M en el semestre y 225 M autorizados pendientes [A2].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-06-01', tipo: 'resultados', hecho: 'Reducción de plantilla del ≈ 6 % con 8,3 M de reestructuración; guía confirmada [A9].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-05-18', tipo: 'accionista de referencia', hecho: 'Junta de 2026: 89,4 % a favor de la remuneración; 24,6 % en contra del consejero Hollembaek; ampliación del plan de acciones en 3 M de títulos (≈ 5 % del capital) [C2, C8].', veredicto: 'no cambia', condicion: null },
        ],
        proximos_resultados: '2026-10-27',
        veredicto: 'no cambia',
        condicion: null,
        comentario: 'La acción ha subido un 86 % desde el mínimo de abril y está a un 1 % del máximo de 52 semanas: lo explica la recuperación de la contratación y de la guía (2T26) y una mejora de Morgan Stanley, después de una caída del 61 % entre diciembre de 2024 y abril de 2026 por la guía floja de 2025 y el miedo a la IA [D1, D12, D14]. No hay colocaciones, ampliaciones, convertibles ni ofertas; los directivos venden poco (3,3 M USD) y no compran. El único hecho pendiente son los resultados del 27-oct, que no aplazan la decisión (la tendencia es alcista). Veredicto: no cambia, porque la decisión ya es no comprar por valoración, no por el momento de la cotización.',
      },
    },
  },
  parches: [],
  huecos_resueltos: [],
  dcf_justificacion: {
    crecimiento: '2026e (+7,5 %, fijo) es el centro de la guía de ventas (1.160-1.166 M USD) [A2] y el consenso (1.165,5 M) [D2]. Después, +9,0 % en 2027e (consenso +8,5 % [D2]) y +9,5 % en 2028e, apoyados en una cartera contratada (RPO) de 2.470 M (+23 %) y una nube que crece un 26 % [A2]; a partir de 2029e el crecimiento baja al 4 % de 2035e. La media de 2026e-2035e (7,3 %) está por encima del 6,7 % anual de 2021-2025 y por debajo del mercado de software de cadena de suministro (+8,7 % anual hasta 2030 según MarketsandMarkets [B2]), porque la nube empuja pero los servicios (47 % de las ventas) y el mantenimiento en retirada frenan [A1].',
    margenes: 'Margen EBITDA GAAP (con la remuneración en acciones como coste) del 24,8 % en 2026e, calibrado con la guía de BPA GAAP (3,59-3,65 USD) y la reestructuración de 8,3 M [A2, A9], que sube al 30,5 % en 2032e: equivale a un margen operativo ajustado de ≈ 40 %, cinco puntos sobre el 35,1 % guiado para 2026, por la escala de la nube (margen bruto creciente) y el menor peso de los servicios. Es un supuesto generoso: el margen GAAP de 2025 fue del 26,5 % y no se proyecta ninguna presión de precios de la IA en el caso base.',
    inversion: 'Inversión del 1,4 % de las ventas (15,5 M USD en 2025 [A10]) y amortización del 0,6 %. Circulante del −13 % de las ventas (clientes 215 M, proveedores 22 M y cobros anticipados 337 M en 2025 [A1]): crecer genera caja. No se proyectan compras de empresas (ninguna en diez años).',
    wacc: 'Tasa libre del 5,09 % (bono del Tesoro a 10 años, 16-oct-2026 [D4]); beta de 1,05, entre la ajustada mensual a 5 años (0,92) y la semanal a 2 años (1,15) [D1]; prima del 5,5 %; sin deuda. WACC del 10,87 %. Con la prima implícita del mercado (4,2 % [D5]) el WACC baja al 9,5 % y el DCF sube a 100,49 USD: la conclusión no depende de la tasa.',
    terminal: 'Crecimiento a perpetuidad del 3,0 %, algo por encima de la inflación esperada porque el software de cadena de suministro sigue ganando peso; el valor terminal pesa un 54 % del total. Con un 4 % y un WACC del 9,9 % (la esquina más favorable de la tabla) el DCF solo llega a 104,90 USD.',
  },
  puente_comentarios: {
    '2026e': 'Guía de 2026 [A2]: volumen (clientes nuevos y migraciones a la nube, +26 % de nube) del 6 %, precio del 2,5 % (subidas anuales de suscripción) y −1 punto de otros por la caída del mantenimiento y del hardware.',
    '2027e': 'Volumen del 6,5 % (RPO +23 %, conversión a la nube de la base instalada [A2]) y precio del 2,5 %; consenso +8,5 % [D2].',
    '2028e': 'Volumen del 7 % con los agentes de IA y la gestión del transporte vendidos a la base, y precio del 2,5 %.',
    '2029e': 'Volumen del 6,5 % y precio del 2,5 %: la nube pesa más y los servicios de implantación crecen menos.',
    '2030e': 'Volumen del 6 % y precio del 2,5 %, en línea con el mercado (+8,7 % anual hasta 2030 [B2]).',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'El crecimiento proyectado (7,3 % medio en 2026e-2035e) no necesita capital: el circulante es negativo, la inversión es del 1,4 % de las ventas y no hay compras. La cuota implícita en 2030e (≈ 2,8 % de un mercado de 58.420 M USD [B2]) es la misma que hoy, y la cartera contratada (2.470 M, 2,1 veces las ventas de 2026) cubre buena parte de los dos primeros años [A2]. El motor da también «Sí». El riesgo para la sostenibilidad no es la financiación sino el precio: si la IA reduce las horas de implantación (los servicios son el 47 % de las ventas) o abarata las licencias por usuario, las ventas crecerían menos con el mismo volumen; lo recoge el bajista.',
  dcf_lectura: 'El DCF da 82,98 USD por acción, un 62,7 % por debajo del precio, con un WACC del 10,87 % y un valor terminal del 54 %. El DCF inverso dice que el precio descuenta un crecimiento anual de las ventas del 21,8 % durante diez años con nuestros márgenes, el triple de nuestro 7,3 % y del 8,7 % del mercado [B2]: la rentabilidad implícita en el precio es del 6,0 % anual, por debajo de cualquier coste del capital razonable. Con la prima de riesgo que hoy pide el mercado (4,2 %) vale 100,49 USD, y aun excluyendo la remuneración en acciones (como hace la empresa en su ajustado) ≈ 112 USD. La conclusión es robusta: el precio paga un crecimiento y unos márgenes que ni la guía ni el mercado sostienen.',
  narrativas: {
    Bajista: 'Los agentes de IA y SAP, Oracle y Blue Yonder abaratan el software de almacén y reducen las horas de implantación (servicios, 47 % de las ventas); el crecimiento queda 3 puntos por debajo y el margen 3 puntos por debajo del base, con WACC medio punto mayor y crecimiento terminal del 2,5 %.',
    Base: 'La nube crece al 20-25 % mientras los servicios se estabilizan; ventas +7,5-9,5 % en 2026-2028 y bajando hacia el 4 %, margen EBITDA GAAP del 24,8 % al 30,5 % por la escala de la nube.',
    Alcista: 'Los agentes de IA se convierten en una línea de ingresos nueva sobre la base instalada y el transporte gana cuota: 2 puntos más de crecimiento y de margen al año.',
  },
  escenarios_comentario: 'Los tres escenarios del DCF quedan muy por debajo del precio: bajista 55,90 USD (−74,8 %), base 82,98 (−62,7 %) y alcista 101,34 (−54,4 %); el ponderado es de 80,79 USD. Ni con dos puntos más de crecimiento y margen al año durante diez años se acerca al precio: la cotización depende de que el mercado siga pagando 37 veces el BPA ajustado, no del flujo de caja.',
  casos_12m: {
    Bajista: 'Crecimiento 3 puntos menor en 2027e y 2028e y margen 3 puntos menor por presión de precios de la IA y competencia de SAP, Oracle y Blue Yonder: BPA ajustado de 6,02 USD en 2028e (−13 % frente al base) y el PER vuelve a su mínimo de cinco años (31,7 veces, el de diciembre de 2025, en plena caída del software).',
    Base: 'Ventas +9,0 % en 2027e y +9,5 % en 2028e, margen operativo ajustado del 36,8 % en 2028e (35,1 % guiado para 2026), 6 M de ingresos financieros, tipo ajustado del 21,4 % y 58,75 M de acciones sin recompras no anunciadas: BPA ajustado de 6,91 USD (+12,4 % anual desde los 5,47 de 2026e). PER de 40,7 veces: el actual (37,0) camino de la mediana adelantada de cinco años (45,6), con el tope de ×1,1.',
    Alcista: 'Dos puntos más de crecimiento y de margen por los agentes de IA y el transporte: BPA ajustado de 7,55 USD y PER de 45,6 veces, la mediana de cinco años.',
  },
  diferencia_consenso: 'Nuestro BPA ajustado de 2026e (5,47 USD) está en el centro de la guía (5,44-5,50) y un 0,5 % bajo el consenso (5,50); el de 2027e (6,14) coincide con el consenso (6,145) [A2, D2]. No hay consenso gratuito de 2028e; nuestro 6,91 supone un +12,5 % sobre 2027e. La distancia con el objetivo medio de los analistas (230,20 USD, 10 analistas) está en el múltiplo: el consenso aplica ≈ 37 veces el BPA de 2027e y la regla común lleva el PER a 40,7 veces, porque la mediana de cinco años (45,6) es más alta que el múltiplo actual.',
  objetivo_comentario: 'El objetivo a 12 meses (274,40 USD, ponderado) queda un 23,5 % sobre el precio del 16-oct (+21,7 % sobre los 225,52 de la sesión del 19-oct) y el base (281,24) un 26,6 %: la regla de múltiplos ve la acción barata frente a su propia historia, que se formó con tipos bajos y la fiebre del software de 2021-2024 (PER adelantado de 45-56 veces). Pero no basta: el valor intrínseco (90,70 USD) está un 60 % bajo el precio, así que la regla no da Comprar y no pasa el filtro de mantener (valor intrínseco no más de un 15 % bajo el precio). Con el BPA un 10 % menor la ponderada cae al 9,5 %. Crecimiento del BPA base: +12,4 % anual sobre el ajustado (el que mide el motor sobre el BPA GAAP de 3,60 incluye la remuneración en acciones). Para comprar haría falta un precio de 90,70 USD (−59 %).',
  valoracion_comentario: 'Pesos: DCF 45 %, escenarios 40 % y comparables 15 %. El DCF manda porque Manhattan es un negocio estable, sin deuda y con caja predecible; los comparables (software vertical con ROIC alto: Descartes, Kinaxis, SPS Commerce, Tyler, Bentley, PTC, Guidewire, Roper y Veeva) dan entre 87 y 164 USD por EV/EBITDA y entre 131 y 154 por PER, también muy por debajo del precio: Manhattan cotiza a 45 veces el EBITDA LTM y 37 veces el BPA de los próximos 12 meses, frente a una mediana de comparables de 23 veces el PER [D2]. Las transacciones (E2open a 3,5 veces las ventas, Coupa a 8,4 y Blue Yonder a ≈ 8,5) dan 117-166 USD [D9-D11] y no pesan porque no hay EBITDA publicado. El valor objetivo de la síntesis es de 90,70 USD (−59,2 %); con la prima del mercado, 105,26 USD.',
  catalizadores: {
    items: [
      { fecha: '2026-10-27', evento: 'Resultados del 3T26 (tras el cierre)', efecto: 'Crecimiento de la nube y del RPO frente a la guía de 2.620-2.680 M; guía de 2026 (consenso de BPA del trimestre: 1,46 USD) [D8, D2]', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-01', evento: 'Resultados del 4T26 y guía de 2027', efecto: 'La guía frente a los 6,15 USD de BPA del consenso; en 2025 y 2026 la guía inicial decepcionó (−5,2 % el 28-ene-2026) [D16]', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-2027', evento: 'Ventas de agentes de IA (Active Agents, Agent Foundry)', efecto: 'Si se convierten en ingresos medibles, línea nueva sobre la base instalada [A13]', probabilidad: 'Media', sentido: '+' },
      { fecha: 'Continuo', evento: 'Lanzamientos de agentes de empresa de Anthropic, OpenAI, SAP u Oracle', efecto: 'Cada anuncio ha costado al software de aplicaciones un 5-10 % en un día (3-feb, 9-abr) [D14, D15]', probabilidad: 'Alta', sentido: '−' },
      { fecha: 'Continuo', evento: 'Recompras (225 M USD autorizados pendientes)', efecto: '≈ +1,5 % de BPA al año; a 37 veces el BPA rinden poco', probabilidad: 'Alta', sentido: '+' },
      { fecha: '2027', evento: 'Tipos de interés a largo plazo (bono a 10 años del 5,1 %)', efecto: 'Un múltiplo de 37 veces es muy sensible a los tipos: la caída de septiembre de 2026 [D4]', probabilidad: 'Media', sentido: '+/−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Valoración: 37 veces el BPA ajustado de los próximos 12 meses y 45 veces el EBITDA; el DCF vale 83 USD', tipo: 'Valoración', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−15 % si el PER vuelve a 31,7 (mínimo de 5 años); −60 % al valor del DCF', mitigante: 'Crecimiento del BPA del 12 % anual y caja neta', senal: 'Guía de 2027 por debajo de 6,15 USD de BPA o crecimiento de la nube por debajo del 20 %' },
      { riesgo: 'IA: agentes que automatizan la planificación y la implantación, o que abaratan el software por usuario', tipo: 'Tecnología', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−20 a −35 % a 3-5 años (bajista del DCF −25 % sobre el base)', mitigante: 'El WMS es un sistema de registro que ejecuta en tiempo real con hardware y robots; Manhattan vende sus propios agentes [B1, P1]', senal: 'Caída de los servicios de implantación más allá de lo guiado o precios por usuario a la baja' },
      { riesgo: 'Competencia de SAP (EWM), Oracle (WMS Cloud), Blue Yonder (Panasonic) y Körber, y de los ERP que venden a su base', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'Tasa de éxito en concursos superior al 70 % y liderazgo de Gartner desde 2005 [A11, B5]', senal: 'Tasa de éxito por debajo del 60 % o pérdida de clientes grandes' },
      { riesgo: 'Servicios de implantación (47 % de las ventas) cíclicos y en presión: cayeron en 2025', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Recorte de plantilla del 6 % y socios integradores', senal: 'Servicios por debajo de 130 M USD en un trimestre' },
      { riesgo: 'Remuneración en acciones (10,3 % de las ventas) y recompras a múltiplos altos', tipo: 'Asignación de capital', probabilidad: 'Alta', impacto: 'Bajo', efecto_valor: '−2 a −3 % al año de dilución compensada con caja', mitigante: 'Acciones diluidas −1,6 % al año en diez años', senal: 'Remuneración en acciones por encima del 11 % de las ventas' },
      { riesgo: 'Ciclo de inversión del comercio minorista y de la logística (aranceles, consumo de EE. UU.)', tipo: 'Macro', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'Ingresos recurrentes del 50 % y RPO de 2.470 M', senal: 'RPO creciendo menos del 15 %' },
      { riesgo: 'Gobierno: consejo escalonado, directivos que venden y no compran, 24,6 % en contra de un consejero', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: 'Señal, no valor', mitigante: 'Presidente no ejecutivo y consejero independiente de referencia', senal: 'Ventas de directivos fuera de las ventanas habituales' },
    ],
    premortem: 'Octubre de 2027: la acción ha perdido un 40 %. No fue un mal trimestre sino un cambio de precio del software: SAP y Oracle incluyeron agentes de almacén y transporte en sus suites sin coste adicional, y los agentes de propósito general redujeron a la mitad las horas de configuración de un WMS, así que los servicios (47 % de las ventas) cayeron un 15 % y la nube siguió creciendo pero al 15 %, no al 25 %. La guía de 2027 decepcionó por tercer año en enero, el bono a 10 años siguió por encima del 5 % y el mercado dejó de pagar 37 veces: volvió a las 25-30 veces de 2017-2018. El BPA creció un 6 % en vez del 12 %. La señal temprana: un RPO creciendo por debajo del 15 % y una tasa de éxito en concursos por debajo del 70 %.',
    ia: {
      exposicion: 'Media', sentido: 'Mixto', efecto_valor: '−20 a +10 % a 3-5 años',
      comentario: 'Manhattan está en la parte menos expuesta del software de aplicaciones: el WMS y el TMS son sistemas de registro y ejecución en tiempo real, conectados con escáneres, robots y transportistas, donde un error para un almacén; la ficha sectorial los pone en riesgo bajo o medio-bajo [P1]. Un agente no sustituye esa capa: la necesita para actuar. La empresa ya vende agentes (Active Agents) y una herramienta para crearlos (Agent Foundry), adoptados por más del 10 % de su base según la conferencia del 2T26 [A13, B1]. La exposición está en dos sitios. Primero, los servicios de implantación (47 % de las ventas, ≈ 530 M USD en 2026e), trabajo de configuración e integración que la IA puede abaratar: si las horas caen un 20 %, las ventas caen ≈ 9 %. Segundo, el precio: si SAP, Oracle o Blue Yonder regalan agentes con sus suites, o si los clientes pagan por resultado y no por usuario, la nube crece menos. El mercado ya lo ha castigado dos veces (−10 % el 3-feb y −7,3 % el 9-abr con anuncios de Anthropic) y ha rebotado con los resultados [D14]. Lo recoge el bajista (−3 puntos de crecimiento y de margen). Señal: servicios cayendo más rápido que la nube crece.',
    },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'IA y servicios', pregunta: '¿Cuántas horas de implantación por cliente ahorran hoy los agentes y las herramientas de IA, y cómo se reflejará en el precio de los servicios en 2027-2028?', por_que: 'Los servicios son el 47 % de las ventas; es la vía principal del riesgo de IA.' },
      { tema: 'Precio de los agentes', pregunta: '¿Cómo se cobran Active Agents y Agent Foundry (por usuario, por transacción, incluidos) y qué parte del RPO corresponde a ellos?', por_que: 'Decide si la IA es una línea nueva (alcista) o un regalo para defender la base (bajista).' },
      { tema: 'Competencia', pregunta: '¿Cómo ha evolucionado la tasa de éxito frente a SAP EWM, Oracle y Blue Yonder en los concursos de 2026, y en cuántos los ERP ofrecen el WMS gratis?', por_que: 'La tasa superior al 70 % sostiene el crecimiento de la nube.' },
      { tema: 'Margen', pregunta: '¿Cuál es el margen operativo ajustado a largo plazo y cuánto aportará el recorte de plantilla del 6 % en 2027?', por_que: 'El DCF base ya supone ≈ 40 % de margen ajustado; más margen es la única vía para acercarse al precio.' },
      { tema: 'Remuneración en acciones', pregunta: '¿Por qué la remuneración en acciones subió de 59 M USD en 2022 a 111 M en 2025 y qué nivel se espera?', por_que: 'Es un coste del 10 % de las ventas que el ajustado excluye.' },
      { tema: 'Recompras', pregunta: '¿Con qué criterio de precio se recompra, después de gastar 275 M en el 1S26 y con la acción hoy un 60 % más cara?', por_que: 'Recomprar a 37 veces el BPA rinde menos del 3 % al accionista.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Baja', justificacion_recomendacion: 'La regla a 12 meses da Mantener (ponderada +23,5 %, base +26,6 %), pero el valor intrínseco (90,70 USD) está un 60 % bajo el precio: no se compra y las pruebas de robustez lo dejan en «no mantener».', horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener con convicción baja, que en la práctica es no comprar. La regla a 12 meses da un objetivo de 274,40 USD (+23,5 % ponderado, +26,6 % en el base) frente a un precio de 222,17 USD (cierre del 16-oct-2026; 225,52 en la sesión del 19-oct a las 12:25 de Nueva York), porque el PER actual (37 veces el BPA ajustado de los próximos 12 meses) está por debajo de su mediana de cinco años (45,6). Pero el valor intrínseco es de 90,70 USD, un 59 % por debajo del precio: el DCF inverso dice que el precio descuenta un crecimiento del 21,8 % anual durante diez años, el triple del nuestro. La regla no da Comprar y no pasa el filtro de mantener; con el BPA un 10 % menor, la ponderada cae al 9,5 %. Compraríamos por debajo de 90,70 USD. La convicción es baja, y no media como sugieren los criterios, porque las dos señales chocan: la regla de múltiplos ve un 23 % de subida y el valor intrínseco un 59 % de caída. La subiría un margen a largo plazo muy superior al guiado o un precio cercano al valor intrínseco; la bajaría (hacia vender) una guía de 2027 floja o una nube creciendo menos del 20 %.

**El negocio.** Líder en software de gestión de almacenes, transporte y pedidos omnicanal, con 1.081 M USD de ventas en 2025, sin deuda y con 186 M de caja [A1, A2]. La nube (38 % de las ventas) crece un 26 % y la cartera contratada (2.470 M) un 23 %; los servicios de implantación (47 %) son la parte cíclica [A2]. El ROIC exigente es del 72 % (+61 puntos sobre el WACC): calidad «Sí». La sostenibilidad del crecimiento es «Sí»: proyectamos un 7,3 % anual sin necesidad de capital y con la cuota constante.

**Finanzas.** El BPA ajustado creció un 18 % anual de 2021 a 2025 (de 2,23 a 5,06 USD) y la guía de 2026 es de 5,44-5,50 (+8 %), subida dos veces [A2, A6]. El margen operativo ajustado pasó del 26 % al 35 %, pero la remuneración en acciones (111 M, 10,3 % de las ventas) es la diferencia entre el BPA ajustado y el GAAP (3,60) [A10]. El flujo libre fue de 374 M en 2025, todo para recompras (315 M) [A10].

**Equipo y gobierno.** Eric Clark, consejero delegado desde febrero de 2025, ha devuelto el crecimiento del 3 % al 9 % y la empresa ha batido la guía inicial de BPA en 2025 y 2026 [C1, C7]. Nueva directora financiera desde abril de 2026. Debilidades: consejo escalonado, 24,6 % de votos contra un consejero y directivos que venden (3,3 M USD) sin comprar [C2, D18].

**Valoración.** El DCF da 82,98 USD (−62,7 %) con un WACC del 10,87 %; con la prima del mercado, 100,49, y sin restar la remuneración en acciones, ≈ 112. Los comparables dan 87-164 USD y las transacciones 117-166: todos los métodos quedan muy por debajo del precio. La regla a 12 meses es favorable solo porque la historia del PER (45-56 veces en 2021-2024) se formó con tipos cercanos a cero.

**Riesgos y catalizadores.** El mayor riesgo es el múltiplo. Después, la IA (exposición media): el WMS es difícil de sustituir, pero los servicios de implantación (47 %) y el precio por usuario pueden abaratarse, y SAP, Oracle y Blue Yonder pueden regalar agentes; el mercado ya castigó a la acción un 10 % y un 7 % en dos días de anuncios de Anthropic. Catalizador: resultados del 3T26 el 27-oct-2026. Regla 13: no cambia.

**Qué cambiaría la decisión.** Comprar por debajo de 90,70 USD; con más margen a largo plazo (ajustado del 45 % o más) o crecimiento sostenido del 15 % el valor subiría, pero no hasta el precio. Una guía de 2027 por debajo de 6,15 USD o una nube creciendo menos del 20 % reforzarían la venta.`,
    tesis: 'Manhattan es probablemente el mejor software de almacén del mundo: líder de Gartner desde 2005, una sola plataforma nativa de nube, ninguna compra en diez años, sin deuda y con un ROIC que no cabe en la contabilidad. Tras caer un 61 % por la guía floja de 2025 y el miedo a la IA, ha recuperado el crecimiento (+9 %), la nube (+26 %) y la contratación (RPO +23 %) [A2].\n\nEl problema es el precio: tras subir un 86 % desde abril, cotiza a 37 veces el BPA ajustado de los próximos 12 meses y a 45 veces el EBITDA. El DCF, con márgenes que suben cinco puntos y un crecimiento por encima del histórico, vale 83 USD; el precio descuenta un 21,8 % de crecimiento anual durante diez años.\n\nLa regla de múltiplos da una ganancia del 23 % a 12 meses solo porque compara con 2021-2024, cuando el software cotizaba a 45-56 veces con tipos cercanos a cero. Con el bono a 10 años al 5,1 % y la IA cuestionando el precio del software, no hay margen de seguridad.',
    vision_diferencial: {
      mercado_descuenta: 'Que la nube sigue creciendo al 20-25 % durante años, que los agentes de IA son una oportunidad y no una amenaza, y que el múltiplo de 37 veces es el normal de un software de calidad; los analistas esperan 230 USD (+4 %).',
      nuestra_vision: 'Coincidimos en el BPA (6,14 USD en 2027e frente a 6,145) y en la calidad, y discrepamos en el precio: ningún flujo de caja razonable justifica 222 USD con un coste del capital del 9,5-10,9 %.',
      por_que: 'La historia del PER de 2021-2024 se formó con tipos cercanos a cero; en 2017-2018, con tipos del 2-3 %, el PER adelantado fue de 24-28 veces. La IA no destruye el WMS, pero sí puede abaratar los servicios (47 % de las ventas) y el precio por usuario.',
    },
    a_favor: [
      '**Líder del nicho**: Gartner desde 2005 y tasa de éxito superior al 70 % en concursos.',
      '**Nube +26 %**: RPO de 2.470 M (+23 %) y guía subida dos veces en 2026.',
      '**Sin deuda y sin compras**: crecimiento orgánico con circulante negativo y ROIC exigente del 72 %.',
      '**Riesgo de IA bajo en el núcleo**: el WMS es un sistema de registro y ejecución; la empresa ya vende agentes.',
      '**BPA +12 % anual**: 5,47 USD en 2026e y 6,91 en 2028e en nuestro base.',
    ],
    en_contra: [
      '**Precio**: DCF de 83 USD frente a 222; el precio descuenta un 21,8 % de crecimiento anual.',
      '**Múltiplo**: 37 veces el BPA ajustado y 45 veces el EBITDA; +86 % desde abril.',
      '**IA y servicios**: el 47 % de las ventas son horas de implantación que la IA puede abaratar.',
      '**Remuneración en acciones**: 10,3 % de las ventas, excluida del BPA ajustado.',
      '**Directivos vendedores**: ventas sin ninguna compra en 12 meses.',
    ],
    que_vigilar: 'La tesis del mercado depende de que la nube siga creciendo por encima del 20 % y de que la IA sea una línea nueva y no un recorte de precio. La señal en contra sería un RPO por debajo del +15 %, servicios cayendo más de un 5 % o una guía de 2027 por debajo de 6,15 USD de BPA.',
    cambiaria_recomendacion: [
      'Precio por debajo de 90,70 USD: Comprar (valor intrínseco por encima del precio y regla a 12 meses favorable).',
      'Margen operativo ajustado guiado a largo plazo del 45 % o más con crecimiento del 12 % o más: revisar el DCF al alza.',
      'Guía de 2027 (enero) por debajo de 6,15 USD o nube creciendo menos del 20 %: reforzar no comprar.',
      'Agentes de IA de SAP, Oracle o Blue Yonder incluidos sin coste en sus suites y caída de la tasa de éxito: rebajar el base.',
    ],
    kpis_seguimiento: [
      { kpi: 'Crecimiento de la nube', nivel_actual: '+26 % (2T26)', umbral_alerta: '< +20 %', por_que: 'Motor del crecimiento y del margen.' },
      { kpi: 'RPO (cartera contratada)', nivel_actual: '2.470 M (+23 %); guía 2.620-2.680', umbral_alerta: '< +15 %', por_que: 'Anticipa las ventas de nube.' },
      { kpi: 'Ventas de servicios', nivel_actual: '133,0 M (2T26)', umbral_alerta: '< 130 M en un trimestre', por_que: 'Primera víctima del riesgo de IA.' },
      { kpi: 'Margen operativo ajustado', nivel_actual: '35,0-35,2 % (guía 2026)', umbral_alerta: '< 34 %', por_que: 'Presión de precios o de costes.' },
      { kpi: 'BPA ajustado (guía 2026)', nivel_actual: '5,44-5,50 USD', umbral_alerta: '< 5,44 USD', por_que: 'Base del objetivo a 12 meses.' },
    ],
  },
};
