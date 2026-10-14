// Textos largos del analista (Fiserv, corte 2026-10-14). Las cifras del motor van tal cual, sin cita.
export default {
  limitaciones: 'Análisis hecho desde la nube con la red limitada a la búsqueda web: sec.gov, la web de inversores, Yahoo y MarketScreener no se pudieron abrir, y las herramientas descargar.mjs y bolsa.mjs no funcionan aquí. Las cifras salen de los extractos de búsqueda de los comunicados 8-K, del 10-K y 10-Q, de Stock Analysis, Macrotrends y de la prensa financiera, con la URL como fuente y cruzadas cuando fue posible; lo que no cuadró quedó en null y en «Información no disponible». Ingresos GAAP (incluyen ≈1.400 M de reembolsos de franqueo sin margen); el BPA de la empresa y de la regla a 12 meses es el ajustado (sin amortización de intangibles comprados ni costes de reestructuración). Los ingresos por segmento de 2025 son estimación propia (resultado ÷ margen). Los comparables son de julio-agosto de 2026, no de la fecha de corte. La acción cotiza en Nasdaq como FISV desde el 11-nov-2025 (antes NYSE: FI) [D3]. El presupuesto de búsquedas se agotó antes de cerrar sector, competidores, gobierno completo y bolsa.',

  controles_explicados: [
    { control: 'Sección de núcleo con datos: sector', explicacion: 'Sin tamaño de mercado: el presupuesto de búsquedas compartido se agotó (hueco registrado). Se da la definición, los motores y Porter con datos de la propia empresa.' },
    { control: 'Fuentes sin citar', explicacion: 'Algunas fuentes de mercado se usaron solo para cruzar cifras (Macrotrends, MarketBeat, Investing).' },
  ],

  secciones: {
    historia: {
      resumen: 'Fiserv nació en 1984 en Milwaukee como proveedor de proceso de datos para bancos y creció durante tres décadas comprando procesadores de core bancario y de pagos. En 2019 compró First Data, que le dio Clover (terminales y software para pequeños comercios), la adquirencia de grandes cuentas y las redes de débito; esa compra explica el fondo de comercio de 37.703 M que hoy pesa en el balance [A1, A7]. Tras años de crecimiento del 10 % orgánico, la etapa de Frank Bisignano terminó en 2025; su sucesor, Mike Lyons, recortó la guía el 29-oct-2025 y la acción cayó un 44 % en un día [A17, B4]. Lyons se fue a Truist en junio de 2026 y el copresidente Takis Georgakopoulos tomó el relevo [C3].',
    },
    negocio: {
      descripcion: 'Fiserv es uno de los grandes procesadores de pagos y de tecnología bancaria de EE. UU., con 21.193 M USD de ingresos en 2025 [A6]. Tiene dos segmentos de tamaño parecido. Merchant Solutions (≈10.100 M, estimación) cobra a comercios por aceptar tarjetas: Clover para pequeños comercios (3.300 M en 2025, +23 %), adquirencia para grandes cuentas, comercio electrónico y Argentina [A21]. Financial Solutions (≈9.700 M) vende a bancos y cooperativas de crédito el sistema central (core), el proceso de emisión de tarjetas, las redes de débito STAR y Accel y pagos digitales como Zelle y el pago de facturas [A1, A21]. Clientes: miles de entidades financieras de EE. UU. y millones de comercios.',
      como_gana_dinero: 'Casi todo es recurrente: comisiones por transacción (porcentaje del volumen en comercios, tarifa por cuenta o por operación en bancos) y contratos plurianuales de proceso. El margen depende de la escala: el 45,3 % de margen operativo de Financial Solutions y el 34,5 % de Merchant en 2025 salen de repartir una infraestructura fija entre más transacciones [A2]. Por eso el apalancamiento operativo funciona también al revés: con los ingresos ajustados cayendo un 2-4 % en el 1S26, el margen operativo ajustado bajó del 38,7 % al 30,8 % [A3, A4]. Hay ingresos no recurrentes que distorsionan: las ventas de terminales, las cuotas por resolución anticipada de contratos y los ingresos por anticipo de cobros en Argentina, que la dirección citó en el recorte de agosto [A15, A16].',
      clientes: 'Fiserv no publica concentración por cliente en los extractos disponibles. Los contratos bancarios son de 5-7 años y su renovación es la clave del segmento financiero: en 2026 la dirección atribuye la caída de Financial Solutions (−6 % en el 1T26 y −8 % en el 2T26 orgánico) a implantaciones de grandes clientes retrasadas, una de ellas por una compra del propio cliente, y a menos ventas de producto [A3, A4, A15]. El poder de precios está en cuestión: la dirección de Lyons habló de «reiniciar» los objetivos de crecimiento y margen y de inversiones aplazadas que hubo que hacer [A17]; no hay datos de subidas de tarifa frente a costes.',
      geografias: null,
      confianza: 'Media',
    },
    sector: {
      definicion: 'El mercado relevante son dos: la adquirencia de pagos con tarjeta en EE. UU. (Fiserv compite con Chase, Global Payments-Worldpay, Stripe, Square, Toast y Shift4) y la tecnología para bancos y cooperativas de crédito de EE. UU. (core, emisión de tarjetas y redes de débito), donde los rivales son FIS y Jack Henry. No se ha podido fijar un tamaño de mercado con dos fuentes independientes (hueco).',
      tamano: null, unidad_serie: null, serie: [], tcac_historico_pct: null, tcac_previsto_pct: null, cr5_pct: null,
      estructura: 'Moderadamente concentrada',
      drivers: [
        { driver: 'Paso del efectivo a la tarjeta y al pago digital', efecto: '+', horizonte: 'Estructural', evidencia: 'El volumen de Clover crece un 9 % en el 2T26 aunque los ingresos del grupo caen [A16].' },
        { driver: 'Consolidación de bancos pequeños', efecto: '−', horizonte: 'Estructural', evidencia: 'Una gran implantación se retrasó por la compra del propio cliente en 2026 [A15].' },
        { driver: 'Competencia de software integrado (Toast, Square, Stripe)', efecto: '−', horizonte: 'Estructural', evidencia: 'Clover pasó de crecer un 15 % en volumen en 2024 a un 8 % en el 3T25 [A17].' },
        { driver: 'Consumo y ciclo en Argentina', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'El frenazo argentino explica parte de los dos recortes de guía (oct-2025 y ago-2026) [A15, A17].' },
        { driver: 'Precio de la consolidación del sector', efecto: '+', horizonte: 'Estructural', evidencia: 'Worldpay se vendió a 8,5x EBITDA y Issuer Solutions a 12,3x en 2025 [B2].' },
      ],
      porter: [
        { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Global Payments compró Worldpay en 2025 y FIS compró Issuer Solutions: dos rivales con más escala en el mismo año [B2]; Clover se frena frente al software integrado [A17].' },
        { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Los grandes comercios y bancos negocian precio en cada renovación; la caída del 8 % orgánico de Financial Solutions en el 2T26 muestra el riesgo [A4].' },
        { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Visa y Mastercard fijan las tasas de intercambio, pero se repercuten al comercio.' },
        { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Stripe, Adyen y los proveedores de software verticales entran por el comercio electrónico y el software; en el core bancario la entrada es lenta por los costes de cambio.' },
        { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Pagos inmediatos (FedNow, Zelle, que procesa la propia Fiserv) y billeteras digitales desplazan parte de la tarjeta.' },
      ],
      ciclo: { posicion: 'Madurez del ciclo', comentario: 'El volumen de pagos sigue al consumo nominal de EE. UU., que crece, pero los precios por transacción bajan por la competencia. En 2020 el volumen de comercios cayó con los cierres y se recuperó en 2021; el core bancario apenas notó el ciclo. El sector entero se ha abaratado en 2025-26: Global Payments y FIS cotizan a 6,4-6,5x beneficio adelantado [D15, D16].' },
      regulacion: 'La regulación de las tasas de intercambio del débito (Durbin, Reserva Federal) y la ley de competencia de tarjetas de crédito en el Congreso afectan a las redes de débito y a la adquirencia. Los bancos clientes están regulados por la OCC y la Fed, lo que exige a Fiserv seguridad y continuidad del servicio. No hay cifras de impacto en las fuentes disponibles.',
      tendencias: 'Tres tendencias: el software integrado para comercios (donde Clover compite con Toast y Square), los pagos en tiempo real y la modernización del core bancario hacia la nube. Fiserv tiene posición en las tres, pero la desaceleración de Clover y la caída de Financial Solutions en 2026 dicen que hoy pierde terreno [A4, A16]. El día del inversor de mayo-2026 puso la inteligencia artificial y la plataforma única de comercios en el centro del plan [D7].',
      confianza: 'Baja',
    },
    competencia: {
      cuota_pct: null,
      posicion: 'Uno de los dos o tres mayores adquirentes de EE. UU. y el mayor proveedor de tecnología para bancos y cooperativas de crédito junto a FIS y Jack Henry (sin cuota publicada en las fuentes disponibles).',
      competidores: [
        { nombre: 'Global Payments (con Worldpay)', pais: 'EE. UU.', ticker: 'GPN', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rival directo en adquirencia; tras comprar Worldpay (22.700 M netos) y vender Issuer Solutions se ha vuelto un adquirente puro [B2].' },
        { nombre: 'FIS', pais: 'EE. UU.', ticker: 'FIS', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rival en core bancario y, con Issuer Solutions (13.500 M), en emisión de tarjetas [B2].' },
        { nombre: 'Jack Henry', pais: 'EE. UU.', ticker: 'JKHY', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Core para bancos medianos y cooperativas; el único del grupo que conserva un PER de ≈21x [D18].' },
        { nombre: 'Shift4', pais: 'EE. UU.', ticker: 'FOUR', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Adquirencia con software integrado en hostelería y ocio; compite con Clover [D19].' },
        { nombre: 'Stripe', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'No cotiza; líder del comercio electrónico.' },
      ],
      foso: { veredicto: 'Estrecho', tendencia: 'Se estrecha', fuentes: [
        { fuente: 'Efectos de red', puntuacion: 2, evidencia: 'Redes de débito STAR y Accel y Zelle, pero sin efecto de red propio frente a Visa y Mastercard [A1].' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Cambiar de core bancario lleva años; los contratos son plurianuales. Aun así, Financial Solutions cae un 8 % orgánico en el 2T26 [A4].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Clover es una marca reconocida en pequeños comercios (3.300 M de ingresos) [A21].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Margen operativo del 45,3 % en Financial Solutions en 2025 [A2], pero cayendo dos puntos al año.' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'La escala sostiene el margen, pero la de Global Payments-Worldpay ya es comparable [B2].' },
      ] },
      amenazas: 'Lo que más erosiona el foso hoy es interno: dos años de inversión aplazada que ahora hay que recuperar, según la propia dirección [A17], y la rotación de la cúpula (dos consejeros delegados en 13 meses) [C3]. Fuera, Clover pierde velocidad frente a Toast, Square y Shift4, y la consolidación de rivales (Worldpay en Global Payments, Issuer Solutions en FIS) iguala la escala [B2]. Probabilidad de erosión adicional en dos años: media-alta.',
      confianza: 'Baja',
    },
    financieros: {
      comentario: 'Los ingresos GAAP subieron de 16.226 M en 2021 a 21.193 M en 2025 (+6,8 % anual) y el EBIT de 2.288 M a 5.818 M, sobre todo por la integración de First Data y el crecimiento de Clover [A6]. En 2025 el crecimiento se frenó al 4 % (orgánico) y el margen operativo ajustado bajó del 39,4 % al 37,4 % [A2]. En 2026 la caída se acelera: ingresos ajustados −2 % en el 1T26 y −4 % en el 2T26, orgánico −4 % y −5 %, y margen operativo ajustado del 30,8 % en el semestre (38,7 % un año antes) [A3, A4]. El BPA contable (1,99 USD en 2021 y 6,34 en 2025) sube más que el beneficio por las recompras: las acciones diluidas bajan de 670 M a 549 M [A12].',
      ajustes: 'El BPA ajustado de la empresa excluye la amortización de intangibles comprados (≈1.400 M al año, sobre todo de First Data), los costes de integración y reestructuración (en 2026, los del plan One Fiserv) y las plusvalías o deterioros de participadas (595 M de deterioro de una participada en 2024) [A2, A4]. En 2025: BPA contable 6,34 USD y ajustado 8,64 [A2, D6]. Los costes del plan One Fiserv se repetirán en 2026-27, así que no son del todo no recurrentes. Los ingresos ajustados excluyen los reembolsos de franqueo (≈1.400 M sin margen).',
      confianza: 'Media',
    },
    trimestres: {
      ultima_presentacion: 'En el 2T26 (6-ago) el nuevo consejero delegado, Takis Georgakopoulos, recortó la guía de 2026 por segunda vez en nueve meses: BPA ajustado de 7,20-7,40 USD (antes 8,00-8,30) y orgánico de −1 % a 0 % (antes +1-3 %) [A4, A14]. El BPA del trimestre (1,84 USD) quedó por debajo de los 1,91 esperados [A15]. La explicación: implantaciones de grandes clientes retrasadas (una por la compra del propio cliente), menos ventas de producto y terminales, Argentina y desinversiones; el crecimiento del segundo semestre pasa del 6-8 % prometido en el día del inversor a ≈2 % [A15, A16]. La dirección insistió en que no es estructural y amplió la revisión de cartera, con las redes de débito en el perímetro [A16]. En la conferencia del 1T26 (5-may), con Lyons, el mensaje era el contrario: guía mantenida y segundo semestre fuerte [A13]. Los analistas preguntaron por la visibilidad de los contratos firmados y por el plan a 2029; la dirección no dio cifras nuevas del plan a medio plazo, que sigue formalmente vigente.',
    },
    balance: {
      otros_pasivos: 'Fiserv mantiene en el balance activos y pasivos de liquidación (fondos de comercios y de titulares en tránsito) que se compensan y no se tratan como deuda ni como caja. No hay pensiones relevantes en las fuentes disponibles. Los minoritarios (participaciones de bancos socios en la adquirencia) son pequeños en la cuenta (10 M de beneficio en 2025) [A22] y se dejan fuera del puente. Rating, covenants y vencimientos no se pudieron leer (hueco).',
      comentario: 'La deuda financiera pasó de 20.729 M en 2021 a 28.997 M en 2025 (largo plazo 27.758 M y corto 1.239 M) y bajó a 27.886 M en junio de 2026 [A5, A9]. La subida de 2025 financió recompras de 5.600 M, más que la caja libre del año (4.440 M) [A2]. Con la caída del beneficio, la deuda neta sobre EBITDA es de 3,0x; la empresa se compromete a llevar el apalancamiento bruto a ≈2,5x en 2029 [D8]. El fondo de comercio (37.703 M) supera al patrimonio (25.809 M) [A7].',
    },
    flujos: {
      comentario: 'La conversión en caja es alta: el flujo operativo pasó de 4.034 M en 2021 a 6.631 M en 2024 y 6.060 M en 2025, y la caja libre de 2025 fue de 4.440 M según la empresa [A2, A11]. El capex (1.160-1.620 M, el 7-8 % de las ventas) es casi todo software capitalizado y terminales; la empresa no separa mantenimiento y crecimiento. Estimación propia: casi todo es de mantenimiento, porque el crecimiento de 2025-26 no lo ha devuelto. En el 1S26 el flujo operativo bajó a 2.080 M (2.310 M en el 1S25) y el capex subió a 956 M, el 9 % de las ventas [A4, A14]. La empresa promete más de 13.500 M de caja libre en 2027-29 [D8].',
    },
    calidad: {
      comentario: 'El auditor es Deloitte [C1]. Tres puntos. Primero, la diferencia entre BPA contable y ajustado es grande y estable (6,34 frente a 8,64 USD en 2025) porque la amortización de First Data se excluye; es legítima, pero los costes de reestructuración del plan One Fiserv se repetirán varios años [A2]. Segundo, el capex es casi todo software capitalizado: un cambio de criterio o un deterioro de ese software reduciría el beneficio. Tercero, el anterior equipo comunicó objetivos (10 % orgánico en 2025) que el nuevo tuvo que retirar en octubre de 2025 citando inversiones aplazadas [A17]; no hay reexpresión. El Altman Z del motor (0,78) es bajo por el fondo de comercio y la deuda, no por un riesgo de quiebra inmediato; el Piotroski (5) es neutro y el Beneish no se puede calcular por falta de partidas.',
      senales: [
        { senal: 'Objetivos retirados dos veces en nueve meses', nivel: 'Alta', comentario: 'Oct-2025 y ago-2026 [A4, A17].' },
        { senal: 'Reestructuración recurrente fuera del BPA ajustado', nivel: 'Media', comentario: 'Plan One Fiserv en 2025-27 [A4].' },
        { senal: 'Software capitalizado (≈8 % de las ventas)', nivel: 'Media', comentario: 'Capex de 956 M en el 1S26 [A14].' },
      ],
    },
    rentabilidad: {
      comentario: 'El ROIC del motor fue del 8,6 % en 2021, del 14,0 % en 2022 (año con el capital invertido infravalorado por falta de datos de balance), del 10,4 % en 2023, del 8,5 % en 2024 y del 8,9 % en 2025. Con un WACC del 8,42 %, Fiserv apenas cubre su coste de capital: la compra de First Data (fondo de comercio de 37.703 M) diluyó el rendimiento, aunque el negocio operativo sin el fondo de comercio rinde mucho más. El ROIC lo mueve el margen y no la rotación, que es baja (0,27 veces) por el capital invertido inflado por las compras. Con el margen cayendo en 2026, el ROIC de este año bajará por debajo del WACC. Frente a sus pares, el problema es común: Global Payments y FIS cargan también fondos de comercio enormes [B2].',
      confianza: 'Media',
    },
    capital: {
      politica: 'Fiserv no paga dividendo. Toda la caja va a recompras, compras y reducción de deuda. En 2025 recompró 32,2 M de acciones por 5.600 M, más que su caja libre (4.440 M), pero solo 200 M en el 4T25, ya con la acción hundida [A2]. El plan del día del inversor dedica «la mayoría» de los más de 13.500 M de caja libre de 2027-29 a los accionistas y baja el apalancamiento bruto a ≈2,5x en 2029 [D8].',
      adquisiciones: [
        { anio: '2019', objetivo: 'First Data', importe: null, ev_ebitda: null, financiacion: 'Acciones y deuda', resultado: 'Creó el segmento de comercios y Clover, pero dejó 37.703 M de fondo de comercio y un ROIC que apenas cubre el WACC [A7].' },
      ],
      comentario: 'Veredicto negativo. La dirección recompró 5.600 M de acciones en 2025 a precios de 130-230 USD, endeudándose, justo antes de que la acción cayera a menos de 50 USD; al precio actual, esa misma caja habría recomprado más del doble de acciones [A2]. La caja libre por acción del motor pasó de 4,29 USD en 2021 a más de 8 USD en 2025 gracias a las recompras, pero el ROIC no mejoró (8,6 % y 8,9 %). Tras el recorte de agosto, recomprar a 6x beneficio sería lo más rentable, pero la deuda (3,0x EBITDA) y el objetivo de 2,5x limitan el ritmo.',
      confianza: 'Media',
    },
    directivos: {
      comentario: 'La credibilidad está en mínimos: el equipo de Lyons prometió en febrero de 2026 un BPA de 8,00-8,30 USD y lo mantuvo en mayo (día del inversor) y en junio (relevo), y el 6-ago lo bajó a 7,20-7,40 [A4, C3]. En 2025 la guía inicial (10,10-10,30 USD) acabó en 8,64 [C8, A2]. Takis Georgakopoulos viene de dirigir pagos en J.P. Morgan, lleva en Fiserv desde finales de 2024 y su nombramiento fue una sucesión interna; mantiene el equipo [C3, C4]. El director financiero, Paul Todd, lleva un año. No hay plan de sucesión visible más allá de esto.',
    },
    gobierno: {
      remuneracion: 'Según el proxy de 2026, el variable a largo plazo exige un TSR relativo en el percentil 55 del S&P 500 para pagar el objetivo y se limita al objetivo si el TSR absoluto a tres años es negativo [C1]. La junta de 2026 votó además premios de fichaje y de retención para el nuevo equipo y métricas nuevas ligadas al plan One Fiserv, lo que debilita la relación entre pago y resultado en un año de pérdidas para el accionista [C7]. La remuneración total del primer ejecutivo y el resultado del voto consultivo no se pudieron leer (hueco).',
      control_y_defensas: 'Capital disperso, sin accionista de control ni clases de acciones; consejo de once miembros elegidos cada año [C1]. Presidente independiente (Gordon Nixon) separado del primer ejecutivo; aun así hubo una propuesta de accionistas para hacerlo obligatorio por estatutos [C1]. Jana Partners, con menos del 1 %, presiona para revisar la cartera y vender negocios no centrales, apoyando al equipo [C5].',
    },
    consenso: {
      guidance: 'Guía de 2026 (6-ago-2026): crecimiento orgánico de −1 % a 0 % y BPA ajustado de 7,20-7,40 USD, frente a +1-3 % y 8,00-8,30 USD de febrero, mayo y junio [A4, A14]. Plan a medio plazo (14-may-2026, no retirado): ingresos ajustados +4-6 % anual en 2026-29, margen operativo ajustado de más del 37 % y BPA de más de 12 USD en 2029, con crecimiento de dos dígitos desde 2027 y una conversión de caja del 90 % [D7, D8]. Próximos resultados: 3-nov-2026 [D1].',
      revisiones: 'Las estimaciones solo bajan. El BPA de 2026 pasó de ≈10,2 USD (guía de febrero de 2025) a 8,10-8,13 tras la guía de 2026 [D9, D12] y ahora a ≈7,30 con el recorte de agosto [A4]. El BPA de 2027 del consenso (9,01 USD, 22 analistas) es de junio y no recoge ese recorte [D9]. Los objetivos de precio también bajan: 76,77 USD de media en julio (MarketBeat) [D12], 62,37 en agosto (Investing) [D13] y 59,12 hoy (Stock Analysis, 35 analistas, «mantener») [D1]; Truist en 53 y Stephens en 57 [D11].',
    },
    multiplos_historicos: {
      comentario: 'Fiserv cotiza a 5,7x EBITDA de los últimos 12 meses, con un descuento del 55 % frente a su media de cinco años (12,7x), y a un PER contable de 8,9x frente a 26,7x de media. Ha cambiado algo estructural: hasta 2024 el mercado pagaba un crecimiento del 10 % orgánico y márgenes al alza (PER ajustado de 23,3x al cierre de 2024) y hoy descuenta una caída del negocio. El descuento es del sector: Global Payments y FIS también cotizan a 6,4-6,5x beneficio [D15, D16].',
    },
    comparables: {
      criterio: 'Procesadores de pagos y tecnología bancaria de EE. UU. con datos publicados: Global Payments (adquirencia), FIS (core y emisión), Jack Henry (core), Shift4 (adquirencia con software) y PayPal (pagos digitales, sin PER adelantado en las fuentes). Faltan Adyen, Block y Toast por falta de datos (hueco). Las cifras son de julio-agosto de 2026, no de la fecha de corte.',
      comentario: 'La mediana del PER adelantado es de 8,0x, con Global Payments (6,4x) y FIS (6,5x) en el mismo cajón que Fiserv y Jack Henry (20,9x) como excepción: es el único que crece sin compras ni reestructuración [D15, D16, D18]. Fiserv, a 5,4x el BPA de los próximos 12 meses del consenso, cotiza en el extremo bajo. El valor implícito por PER (69,16 USD con la mediana) es engañoso: el BPA de consenso de 2027 no recoge el recorte de agosto. Con nuestro BPA de 2027e (7,39 USD), la mediana de 8,0x daría ≈59 USD.',
    },
    transacciones: {
      comentario: 'Las dos operaciones del sector de 2025 marcan el valor de control: Worldpay a 8,5x EBITDA con sinergias (adquirencia) e Issuer Solutions a 12,3x (proceso para emisores, el negocio más parecido a Financial Solutions) [B2]. Fiserv cotiza a 5,7x EBITDA: muy por debajo de ambas. Una venta de partes (las redes de débito están en revisión [A16]) podría cristalizar valor, y el tamaño (≈52.000 M de valor empresa) hace improbable una compra del grupo entero, aunque no imposible para un fondo con socios. No pondero las transacciones (solo dos con múltiplo).',
    },
    sentimiento: {
      lectura: 'El sentimiento es negativo y empeora desde la salida del CEO en junio y el recorte de agosto: la palabra que más se repite es «trampa de valor» [E1, E3]. Los particulares que defienden el valor se apoyan en Clover y en el múltiplo (≈5x beneficio) [E4], pero incluso las narrativas optimistas bajan su valor razonable [E2]. No es una capitulación eufórica a la inversa: el tono coincide con el de los analistas (consenso «mantener» y objetivos a la baja) y con los datos (orgánico −5 %). Aporta una idea útil: el mercado no pagará el descuento hasta ver dos trimestres sin sorpresas, lo que retrasa la convergencia al valor intrínseco más allá de 12 meses.',
    },
    catalizadores: { items: [
      { fecha: '3-nov-2026', evento: 'Resultados del 3T26', efecto: 'Primera prueba de la guía rebajada; un nuevo recorte sería el tercero en un año', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Feb-2027', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Dirá si el plan de +4-6 % y BPA de 12 USD en 2029 sigue vivo', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-2027 (sin fecha)', evento: 'Revisión de cartera: venta de redes de débito u otros negocios', efecto: 'Cristalizaría valor a múltiplos de transacción (8,5-12,3x EBITDA) y reduciría deuda', probabilidad: 'Media', sentido: '+' },
      { fecha: 'Mayo-2027', evento: 'Junta de accionistas (voto de remuneración y propuesta de presidente independiente)', efecto: 'Termómetro del apoyo al nuevo equipo y a Jana', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027', evento: 'Nuevo programa de recompras con la caja libre', efecto: 'A 6x beneficio, cada 1.000 M recompran ≈4 % del capital', probabilidad: 'Media', sentido: '+' },
    ], confianza: 'Media' },
    riesgos: {
      items: [
        { riesgo: 'Pérdida estructural de clientes y precio en Financial Solutions', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−40 % (escenario bajista del DCF)', mitigante: 'Contratos plurianuales y costes de cambio altos', senal: 'Orgánico de Financial Solutions peor que −5 % en el 3T26 o el 4T26' },
        { riesgo: 'Tercer recorte de guía y pérdida total de credibilidad', tipo: 'Gestión', probabilidad: 'Media', impacto: 'Alto', efecto_valor: 'PER a 5x: −15-20 %', mitigante: 'Guía ya rebajada a una base baja', senal: 'BPA del 3T26 por debajo de 1,80 USD' },
        { riesgo: 'Clover pierde la carrera frente a Toast, Square y Shift4', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10-15 %', mitigante: 'Base instalada y canal bancario', senal: 'Crecimiento del volumen de Clover por debajo del 7 %' },
        { riesgo: 'Deuda (3,0x EBITDA) con beneficio en caída', tipo: 'Financiero', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'Menos recompras; −5-10 %', mitigante: 'Caja libre de ≈4.000 M al año', senal: 'Rebaja de rating o deuda neta/EBITDA > 3,5x' },
        { riesgo: 'Argentina (devaluación, consumo)', tipo: 'País', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−3-5 %', mitigante: 'Peso pequeño en el grupo', senal: 'Nuevos ajustes por Argentina en la guía' },
        { riesgo: 'Rotación de la cúpula y ejecución del plan One Fiserv', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Sucesión interna, equipo mantenido', senal: 'Salida del CFO o de los presidentes de segmento' },
      ],
      premortem: 'Octubre de 2029: la acción ha perdido un 40 % desde 46,66 USD. Lo que pasó: el 3T26 confirmó que la caída de Financial Solutions no era un retraso de implantaciones sino la pérdida de bancos medianos hacia Jack Henry y FIS, que ofrecían cores en la nube a menor precio. En 2027 el orgánico siguió en negativo (−2 %) y el margen operativo ajustado no pasó del 31 %. Clover se estancó al 5 % de crecimiento de volumen porque Toast y Square se llevaron la restauración y el comercio minorista con software propio. Con el BPA en 6,5 USD y la deuda en 3,5x EBITDA, la empresa paró las recompras y vendió las redes de débito a un múltiplo menor de lo esperado para pagar deuda. El mercado siguió pagando 5x beneficio. Los indicadores que lo habrían anticipado: el orgánico de Financial Solutions de cada trimestre de 2026, la desaceleración del volumen de Clover por debajo del 8 % y la ausencia de recompras en el 2S26 pese a una acción a 6x beneficio.',
    },
    preguntas: { items: [
      { tema: 'Financial Solutions', pregunta: '¿Cuánto de la caída del 8 % orgánico del 2T26 son implantaciones retrasadas con fecha y cuánto son bajas o rebajas de precio?', por_que: 'Decide si el bajista (crecimiento plano) es el escenario central.' },
      { tema: 'Plan a 2029', pregunta: '¿Mantiene el nuevo CEO el BPA de más de 12 USD en 2029 tras el recorte de agosto?', por_que: 'Nuestro base es un 18 % inferior al consenso de 2027.' },
      { tema: 'Revisión de cartera', pregunta: '¿Qué negocios están en venta y a qué múltiplo esperan venderlos?', por_que: 'Una venta a 8-12x EBITDA frente a 5,7x del grupo es el catalizador más claro.' },
      { tema: 'Recompras', pregunta: '¿Por qué solo 200 M de recompras en el 4T25 y qué se hará en 2027 con la acción a 6x beneficio?', por_que: 'Es la palanca de valor más barata si la deuda lo permite.' },
      { tema: 'Clover', pregunta: '¿Cuál es el crecimiento de Clover sin anticipos argentinos y sin ventas de terminales?', por_que: 'La tesis alcista descansa en Clover.' },
      { tema: 'Software capitalizado', pregunta: '¿Cuánto del capex (956 M en el 1S26) es software capitalizado y con qué vida útil?', por_que: 'Afecta a la calidad del beneficio y de la caja libre.' },
    ], confianza: 'Media' },
  },

  dcf_justificacion: {
    crecimiento: '2026e −3,0 % (fijo): ingresos GAAP del 1S26 −3 % y guía orgánica de −1 % a 0 % con desinversiones [A4]. 2027e +1,5 %, 2028e +2,5 % y 3,0 % en 2029-30e: la mitad del 4-6 % anual que promete la empresa [D7], porque Financial Solutions cae un 6-8 % orgánico en 2026 y la dirección ha fallado dos guías. Después, 2,5 % (inflación más poco volumen). El consenso de ingresos de 2027-28e (20.861-21.642 M) [D10] queda cerca de nuestra senda.',
    margenes: 'Margen EBITDA del 39,0 % en 2026e-27e y del 40 % desde 2029e, frente al 42,6 % de 2025 y al 44,1 % de 2024. Recoge una caída permanente de 2-3 puntos por el precio y la reinversión, con algo de recuperación desde el 30,8 % de margen operativo ajustado del 1S26 [A4]. La empresa promete un margen operativo ajustado de más del 37 % en 2029 (37,4 % en 2025) [D7]: nosotros no lo damos por recuperado.',
    inversion: 'Capex del 8,5 % de las ventas en 2026e (956 M en el 1S26, el 9 %) [A14] y del 8,0 % después (7,6 % en 2025). La amortización del DCF excluye los ≈1.400 M anuales de intangibles comprados (no deducibles en su mayoría), así que converge al capex: 8,7 % en 2026e y 8,0 % después. Circulante del 3 % de las ventas (sin dato de balance; hueco).',
    wacc: 'Tasa libre del 5,22 % (bono a 10 años del 13-oct) [D21], beta de 1,15 (estimación propia: la acción se ha comportado como un valor de riesgo específico tras dos caídas del 44 % y el 10 % en un día; sin beta publicada en las fuentes), prima de mercado del 5,5 % y 1,5 puntos adicionales por riesgo de ejecución y de gobierno. Coste de la deuda del 5,5 % (1.493 M de intereses netos sobre ≈27.000 M) [A22], tipo del 21,5 % (guía de la empresa) [D8]. Peso de la deuda del 53 % a valor de mercado. WACC del 8,42 %.',
    terminal: 'Crecimiento a perpetuidad del 2,5 % (inflación de EE. UU. más algo de volumen, por debajo de la tasa libre menos medio punto). El valor terminal pesa un 59 %. El múltiplo de salida de contraste (8x EBITDA) es el de las transacciones del sector [B2] y daría menos valor.',
  },

  puente_comentarios: {
    '2026e': 'Volumen −1,5 % (bajas e implantaciones retrasadas en Financial Solutions, −6/−8 % orgánico) y otros −1,5 % (desinversiones, menos terminales y Argentina) [A4, A15].',
    '2027e': 'Volumen +2 % (implantaciones retrasadas en marcha y Clover al +8-10 %) y otros −0,5 % (efecto completo de las desinversiones).',
    '2028e': 'Volumen +2 % y precio +0,5 % (repercusión parcial de la inflación).',
    '2029e': 'Volumen +2,5 % (pagos con tarjeta que crecen con el consumo) y precio +0,5 %.',
    '2030e': 'Igual que 2029e.',
  },

  veredicto: 'En parte',
  sostenibilidad_justificacion: 'En parte. El crecimiento medio proyectado (1,9 % anual) no necesita capital nuevo (reinversión neta de solo el 1 % del NOPAT) y queda por debajo del 4 % orgánico de 2025 y del 4-6 % que promete la empresa [A2, D7], así que no es exigente en volumen. La duda es la calidad: el foso se estrecha, Financial Solutions cae un 6-8 % orgánico en 2026 y no hay poder de precios demostrado [A4]. El ROIC (8,9 %) apenas cubre el WACC (8,42 %), por lo que crecer no crea valor. No se rebaja más el base porque ya está a la mitad de la guía; la prueba de cuota no se puede hacer (sin tamaño de mercado).',

  dcf_lectura: 'El DCF da 118,18 USD por acción frente a 46,66 USD de precio (+153,3 %), con un WACC del 8,42 % y un valor terminal del 59 %. La sensibilidad (WACC y crecimiento ± 0,5 puntos) va de 98,40 a 145,81 USD: el precio queda muy por debajo incluso del extremo bajo. El DCF inverso explica por qué: a 46,66 USD el mercado descuenta que los ingresos caigan un 5,5 % al año entre 2027e y 2035e (frente a +2,5 % en nuestro base) o que el margen EBITDA baje al 26,5 % (40 % en el base). Es una hipótesis muy exigente a la baja: Fiserv nunca ha encadenado dos años de caída y genera 4.000-4.400 M de caja libre al año. Rentabilidad implícita del 12,9 % frente a un WACC del 8,42 %. Es la clave del informe: a largo plazo hay margen de seguridad, pero el DCF no dice cuándo se cierra el descuento.',

  narrativas: {
    Bajista: 'Financial Solutions sigue perdiendo clientes y precio, Clover se frena y la revisión de cartera no vende nada: crecimiento 2,5 puntos menor cada año (plano de media), margen 2,5 puntos más bajo (37,5 %) y terminal del 1,5 %. Es lo que le pasó a FIS en 2023-24 antes de vender Worldpay.',
    Base: 'Recuperación lenta desde 2027: +1,5-3 % de ingresos, la mitad de lo que promete la empresa, margen EBITDA del 39-40 % y deuda a la baja con la caja libre.',
    Alcista: 'Las implantaciones retrasadas entran, Clover vuelve al +12-15 % y la venta de las redes de débito reduce deuda: ingresos +3-4,5 % y margen del 41,5 %.',
  },
  escenarios_comentario: 'El DCF da 68,95 USD en el bajista (+47,8 % sobre el precio), 118,18 en el base y 145,48 en el alcista (+211,8 %). Incluso el bajista queda por encima del precio: el mercado descuenta algo peor que nuestro peor caso, una caída continuada de ingresos. Por eso la asimetría del valor intrínseco no es medible (no hay pérdida en el bajista). La asimetría a 12 meses sí lo es (ver objetivo a 12 meses): ahí el bajista pierde un 24 %, porque el múltiplo no tiene por qué subir en un año.',
  suma_partes_comentario: 'No se hace: los ingresos por segmento de 2025 son una estimación propia y no hay EBITDA por segmento. Las transacciones de 2025 (8,5x para adquirencia y 12,3x para proceso de emisores) [B2] sugieren que una suma de partes daría más que el valor de mercado, pero sin cifras fiables no se pondera.',
  valoracion_comentario: 'El DCF pesa un 40 % porque la caja libre es estable y conocida (4.440 M en 2025) [A2]; los comparables, un 30 %, porque el sector entero se ha abaratado y el PER es la referencia del mercado, aunque su BPA de consenso (anterior al recorte) los infla; los escenarios, un 30 %, para recoger el riesgo de un bajista verosímil. Las transacciones no pesan (dos operaciones). La dispersión es enorme: de 55,98 USD (PER del cuartil bajo de comparables) a 145,81 (DCF alto), y todos los métodos quedan por encima del precio. El valor intrínseco ponderado es de 100,68 USD, pero no es un precio a 12 meses: la acción necesita recuperar credibilidad antes de recuperar múltiplo.',

  objetivo12m_comentario: 'El valor intrínseco (100,68 USD) duplica el objetivo a 12 meses (49,22 USD): la distancia es de más del 100 %, así que la tesis de valor es a varios años. Para cerrarla hacen falta tres cosas con fecha: que el 3T26 (3-nov) y el 4T26 (febrero) cumplan la guía rebajada, que la revisión de cartera venda algún negocio a 8-12x EBITDA y que la caja libre vuelva a recompras a 6x beneficio. Sin esos hechos, la regla común deja el múltiplo en el actual (6,3x) y la rentabilidad a 12 meses en un dígito.',
};
