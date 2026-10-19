// Textos del analista (Edarat, corte 2026-10-19). Citas con la letra de la nota ([A2] = fuente 2 de A.json).
// Las cifras del motor (DCF, escenarios, objetivo a 12 meses, controles) van sin cita y se comprueban tras el último cálculo.
import F from './textos-final.mjs';

const limitaciones = 'Cotiza en Nomu, el mercado paralelo de Tadawul, abierto solo a inversores cualificados (un extranjero entra como inversor extranjero cualificado, QFI), en SAR y de domingo a jueves [B4]. Liquidez muy escasa: ≈ 3.600 acciones y ≈ 1 M SAR al día de media en tres meses, con sesiones de menos de 100 acciones; el cierre del 19-oct-2026 se hizo con 1.136 acciones (316.000 SAR) [D1, D2]. Una posición de 1.000 EUR (≈ 4.100 SAR) cabe, pero mueve el precio. Cuentas: sin XBRL y con Saudi Exchange cerrado (403); se usaron los anuncios oficiales de Tadawul y sus adjuntos (vía Euroland), las cuentas auditadas de 2022 (escaneadas, leídas como imagen) y los estados intermedios del 1S26 (vía Argaam); los balances y flujos de 2023-2024 vienen de Stock Analysis (secundaria) [A1-A8]. Nomu solo exige cuentas semestrales: no hay trimestres. Sin analistas que la sigan. Cotiza desde el 26-dic-2022: el cierre de 2022 llegó tres sesiones después de la salida directa y no sirve como múltiplo; la historia útil es de tres años. Índice: el TASI y el índice de Nomu no tienen serie en Yahoo; la beta y las rentabilidades relativas se miden contra el ETF KSA, y la beta medida (0,34) no es útil con esta liquidez [D1]. Precio: cierre del 19-oct-2026 (275,40 SAR) [D2]. Sin foros ni redes con opiniones útiles: la sección de sentimiento no se imprime.';

const huecos = [];

const controles_explicados = [
  { control: 'Tipo impositivo efectivo razonable (2023)', explicacion: 'En Arabia Saudí la parte saudí del capital paga zakat (2,5 % sobre una base patrimonial) y la extranjera un 20 % de impuesto sobre el beneficio; los tres fundadores son libaneses y los extranjeros tenían el 40 % a fin de 2022 [C3]. El 10,5 % de 2023 es esa mezcla, no un crédito fiscal; el DCF proyecta un 8,5 %, el tipo de 2025 y del 1S26 [A2, A5].' },
  { control: 'Tipo impositivo efectivo razonable (2024)', explicacion: 'Mismo motivo: zakat sobre la parte saudí y 20 % sobre la extranjera (10,1 % del beneficio antes de impuestos). Baja a medida que los fundadores extranjeros pierden peso en el capital [A4, C3].' },
  { control: 'Tipo impositivo efectivo razonable (2025)', explicacion: 'El 8,5 % de 2025 (y del 1S26) es el de zakat e impuesto de sociedades de una empresa con accionistas saudíes y extranjeros; es el que proyecta el DCF [A2, A3].' },
  { control: 'DCF inverso calculable', explicacion: 'No hay solución porque el precio está muy lejos del valor del DCF (≈ 71 SAR frente a 275): con un circulante del 32 % de las ventas (MIS paga tarde) y capex de reposición de las GPU, más crecimiento apenas añade flujo de caja libre, y ni un margen EBITDA del 60 % justifica el precio. El motor sí calcula la rentabilidad implícita (≈ 6 %, frente a un WACC del 13,8 %). No es un error de los supuestos: el circulante y el capex son los de la empresa [A2, D11].' },
];

const secciones = {
  historia: {
    resumen: 'Edarat nació en Riad en 2008, fundada por tres ingenieros libaneses (Adel Rizk, Erick Baduy y Ghassan Al-Khazen), como ingeniería de centros de datos: diseño, supervisión de obra y mantenimiento técnico [B4, B3]. En 2015 abrió una sucursal en Dubái y hacia 2020-2021 lanzó EdaratCloud, una nube local de infraestructura como servicio [B4, A1]. Antes de salir a bolsa, Al Moammar Information Systems (MIS), un integrador saudí cotizado, tenía el 40 % [B3]. Salió a Nomu el 26-dic-2022 por cotización directa del 20 % del capital [B4]; en 2024 MIS vendió un 10 % en privado por 61,49 M SAR para dar flotante al paso al mercado principal, que sigue pendiente [B15, B16]. En 2025-2026 creció con proyectos de MIS, entró en colocation y aprobó un plan de 150 M SAR en GPU [B5, B6].',
  },
  negocio: {
    descripcion: 'Edarat tiene dos negocios. Ingeniería de centros de datos (116,2 M SAR, el 60 % de las ventas de 2025): diseña centros de datos, supervisa su construcción, los prueba y los pone en marcha, y gestiona su mantenimiento técnico [A3]. Nube y colocation (76,2 M, el 40 %): EdaratCloud, una nube local de infraestructura como servicio para organismos y empresas que deben guardar sus datos en el país, y desde abril de 2025 alquiler de espacio en centros de datos (colocation) y computación en el borde [A3, A7]. En 2025 facturó 192,4 M SAR (+84 %) y ganó 36,3 M [A3]. Vende casi todo en Arabia Saudí, con una sucursal en Dubái [B4].',
    como_gana_dinero: 'En ingeniería cobra por proyecto: honorarios de diseño y supervisión por hitos, con márgenes brutos altos (55 % en el 1S26, 42 % en el 1S25) porque el coste es sobre todo de ingenieros propios y subcontratas [A2]. En la nube cobra suscripciones mensuales por capacidad, y en colocation alquila espacio, energía y conexión por contratos de 3-5 años (Mobily 18 M SAR al año; SenseTime 16,5 M en tres años; Edge Network, más de 48 M en cinco) [B8, B9, B10]. La nube tiene menos margen bruto (30,5 % en el 1S25 y solo 7,6 % en el 1S26, con el coste de la capacidad de colocation y la amortización de la nube ampliada) [A2]. Ahora apuesta por alquilar capacidad de GPU para IA: 150 M SAR de inversión, financiada con crédito del proveedor y bancos [B6, B7].',
    clientes: 'El cliente decisivo es MIS, su accionista del 30 %: le compró 41,2 M en 2024 (39 % de las ventas), 77,6 M en 2025 (40 %) y 50,2 M en el 1S26 (55 %), y le debía 56,5 M a 30-jun-2026 [A10, A2]. En 2026 le ha adjudicado 72,45 M (marzo), 19,84 M en colocation (julio) y 197,8 M con IVA por el diseño y la supervisión de un centro de datos de IA de 200 MW (septiembre) [D12, D19, D10]. El resto son grandes grupos y organismos: Center3 (stc), Mobily, NEOM, Tadawul, Banque Saudi Fransi, Saudi Energy y Ma’aden [B13, B8]. Poder de negociación: alto del lado de MIS, que es cliente, proveedor (vende capacidad de colocation) y accionista a la vez [A2].',
  },
  sector: {
    definicion: 'El mercado relevante es el de centros de datos de Arabia Saudí: 2.110 M USD (≈ 7.900 M SAR) en 2025 y 3.900 M USD en 2030, un 13,1 % anual según Mordor Intelligence [B1]. La colocation es el tramo que más crece: 315 M USD en 2024 y 1.800 M en 2030 (+33,7 % anual, ≈ 1.290 MW) según Arizton [B2]. Es una medida aproximada para Edarat, que vende ingeniería y nube, no centros de datos propios. Con Mordor, Edarat tiene ≈ 2,4 % del mercado.',
    ciclo: {
      posicion: 'Expansión',
      comentario: 'El ciclo es de inversión fuerte: el Estado y el PIF quieren hacer de Arabia Saudí un centro regional de IA, con centros de datos de cientos de megavatios (el de 200 MW de MIS es uno) y la entrada de Google, Microsoft, Oracle y AWS con regiones propias [B5, B1]. La demanda de ingeniería depende de que esos proyectos se ejecuten: si el petróleo baja y el gasto público se recorta, los proyectos se aplazan y la ingeniería lo nota primero. Señales: adjudicaciones de MIS y de los operadores (stc, Mobily), y el precio del alquiler de GPU, que en EE. UU. ya ha bajado con la oferta [B5, B8].',
    },
    regulacion: 'La ley de protección de datos personales y las normas de la Autoridad Nacional de Ciberseguridad y de la CST obligan a guardar en el país los datos públicos y regulados: es el origen de la nube soberana local, donde Edarat compite [B1, B13]. El riesgo es que los hiperescaladores ya cumplen esas normas con regiones propias en Arabia Saudí. Las operaciones con MIS son vinculadas: las aprueba la junta con informe del auditor [A10]. Como valor de Nomu, Edarat solo publica cuentas semestrales; el paso al mercado principal, aprobado en 2024 y con Al Rajhi Capital de asesor desde abril de 2026, le exigiría informar cada trimestre [B16].',
    tendencias: 'A favor: el gasto en centros de datos para IA, la soberanía de datos y la colocation (+34 % anual según Arizton) [B2, B1]. Edarat se mueve hacia donde va el dinero: ingeniería de un centro de IA de 200 MW y alquiler de GPU [B5, B6]. En contra: la nube local compite con los hiperescaladores en precio, las GPU se abaratan y se quedan viejas en 3-5 años, y la ingeniería es un negocio de proyectos que se acaba cuando acaba la obra [B7].',
  },
  competencia: {
    amenazas: 'La primera amenaza es depender de MIS: si MIS reduce sus proyectos, los adjudica a otro o paga más tarde, Edarat pierde más de la mitad de sus ventas y casi todo su margen; lo veo posible (30 % en tres años) porque MIS ya no tiene consejero en Edarat desde septiembre de 2026 [A2, C1]. La segunda, la nube: Google, Microsoft, Oracle y AWS abren regiones en el país y stc (Center3) y Mobily tienen centros de datos propios, lo que aprieta el margen de EdaratCloud (7,6 % bruto en el 1S26) [A2, B12]. La tercera, las GPU: si el precio del alquiler sigue bajando, los 150 M SAR no se recuperan en los cinco años de vida útil [B7].',
  },
  financieros: {
    comentario: 'Las ventas pasaron de 37,3 M SAR en 2021 a 192,4 M en 2025 (+53 % anual) y el beneficio de 6,5 M a 36,3 M [A1, A3]. El salto de 2025 (+84 %) vino de proyectos de ingeniería de MIS (77,6 M, el 40 %) y de la nueva colocation [A3, A10]. El margen EBITDA subió del 22 % en 2021 al 28-30 % en 2022-2024 y bajó al 23,7 % en 2025 por la mezcla (colocation de poco margen) [A1, A9]. En el 1S26 las ventas crecieron un 22 % (91,6 M) y el beneficio un 30 % (19,8 M), pero con un 55 % de las ventas a MIS y el margen bruto de la nube hundido al 7,6 % [A6, A2].',
    ajustes: 'Uso cifras publicadas. El BPA está reexpresado a las acciones de hoy (7,545 M) tras cuatro ampliaciones gratuitas: 2023, 2024, 2025 y la del 50 % aprobada el 14-jun-2026 [A6]. 2021-2022: el beneficio operativo publicado incluye los gastos financieros, pequeños [A1]. El flujo operativo de 2025 (33,4 M) está inflado por 22 M de proveedores que se pagaron en el 1S26 [A2]. Los pagos en acciones a empleados son pequeños (0,3 M en el 1S26) [A2].',
  },
  trimestres: {
    ultima_presentacion: 'Edarat no hace presentaciones de resultados con guía; el anuncio del 1S26 (29-jul-2026) atribuye el crecimiento a nuevos contratos de ingeniería (+27 %, 56 M SAR) y a más capacidad de colocation (+15 %, 35,6 M) [A6]. Lo que no explica: por qué el margen bruto de la nube cayó del 30,5 % al 7,6 % y por qué las ventas a MIS subieron al 55 % del total [A2]. Desde entonces ha anunciado el contrato de 200 MW de MIS y el pedido de GPU, que cambian el perfil de 2027 [D10, D11]. Los próximos resultados (anuales de 2026) se esperan hacia febrero de 2027 (los de 2025 salieron el 9-feb-2026) [D14].',
  },
  balance: {
    otros_pasivos: 'Indemnizaciones por cese de los empleados (obligación legal saudí) de 11,0 M SAR a 30-jun-2026, que trato como deuda en el puente [D7]. Pasivos de contrato (cobros por adelantado) de 12,0 M [D7]. Compromiso fuera de balance: el pedido de GPU de 127,5 M SAR (sep-2026), que se pagará con crédito del proveedor y préstamos bancarios a partir del 4T26 [D11].',
    comentario: 'Balance hoy con caja neta: 36,2 M SAR de caja frente a 5,3 M de préstamo y 0,9 M de arrendamientos a 30-jun-2026 [D7]. Va a cambiar: el plan de GPU (150 M, el 130 % del patrimonio de 115 M) se financia con deuda, y el préstamo bancario tiene un límite de pasivo total / patrimonio tangible de 1,25 que el pedido acerca [A2, D11]. El punto delicado es el circulante: clientes, MIS y obra pendiente de facturar suman 88 M (42 % de las ventas de doce meses), y solo MIS debe 56,5 M [A2].',
  },
  flujos: {
    comentario: 'La conversión de beneficio en caja es irregular: flujo operativo del 116 % del beneficio en 2022, 28 % en 2023, 33 % en 2024 y 92 % en 2025, y 61 % en el 1S26 [A1, A8, A2]. La causa es el cobro de MIS y la obra pendiente de facturar: el circulante come casi todo el crecimiento. El capex fue del 1,7-9 % de las ventas hasta 2025 (17,4 M en 2025, ampliación de la nube) y saltará al 30 % en 2026-2027 con las GPU [A8, D11]. No reparte dividendo desde 2022; recompra pocas acciones para el plan de empleados [A1, A8].',
  },
  calidad: {
    comentario: 'Cuentas sin salvedades: PKF Al-Bassam audita las anuales y revisa las semestrales [A1, A2, A3]. Lo que más cuidado pide: el reconocimiento por hitos de los proyectos de MIS (activos de contrato de 28,8 M a fin de 2025) y el saldo de 56,5 M con MIS, una vinculada [A2]. El margen bruto de la ingeniería subió al 55 % justo cuando MIS pasó a ser el 55 % de las ventas: los precios entre partes vinculadas merecen una lectura escéptica [A2, A10].',
    senales: [
      { senal: 'Ventas y margen concentrados en una vinculada', nivel: 'Alta', comentario: 'MIS, accionista del 30 %, fue el 55 % de las ventas del 1S26 y debe 56,5 M [A2].' },
      { senal: 'Cobro lento', nivel: 'Media', comentario: 'Flujo operativo del 28-33 % del beneficio en 2023-2024 [A8].' },
      { senal: 'Partes vinculadas de los directivos', nivel: 'Media', comentario: 'Edarat Lebanon (16,66 % del consejero delegado y del vicepresidente) presta servicios a Edarat [A10].' },
    ],
  },
  rentabilidad: {
    comentario: 'La rentabilidad sobre el capital es alta por ahora: con un capital invertido de ≈ 85 M SAR (patrimonio de 95 M menos la caja neta) y un beneficio operativo después de impuestos de ≈ 37 M, el ROIC de 2025 está por encima del 40 % y el ROE fue del 38 % [A3]. La causa es el modelo de ingeniería: casi sin activos fijos (21,6 M de equipos) y con márgenes brutos del 40-55 % en proyectos de MIS [A2]. Va a bajar: las GPU añaden 150 M de capital con una rentabilidad por probar, y la nube ya gana poco [D11, A2]. Los comparables saudíes rinden menos (Solutions by stc, margen EBITDA del 15 %) [D3].',
    confianza: 'Media',
  },
  capital: {
    politica: 'Sin política de dividendos publicada: pagó 3,5 M SAR en 2022 y nada desde entonces [A1]. Reparte acciones gratuitas cada año (2023, 2024, 2025 y 2026) para dar liquidez, sin efecto en el valor [A6]. Prioriza invertir en la nube y en GPU (plan de 150 M) y entrar en centros de datos (40 % de National Excellence Data Centers, comprado a MIS) [B6, A14].',
    comentario: 'La asignación de capital ha sido buena mientras el negocio era de ingeniería con poco capital: el patrimonio pasó de 12,9 M a 115 M SAR sin ampliaciones de dinero [A1, A2]. La apuesta de las GPU cambia el perfil: 150 M SAR, más que todo el patrimonio, en activos que se quedan viejos en cinco años, sin cliente anunciado para esa capacidad y financiados con deuda [B6, B7]. Si se alquilan bien, suman ≈ 50-60 M de ventas al año; si no, la amortización (30 M al año) se come el beneficio. Las operaciones con MIS (compra de un 40 % de una sociedad de centros de datos a MIS) piden vigilancia [A14].',
  },
  directivos: {
    comentario: 'Equipo fundador: Erick Baduy dirige la empresa desde 2008 y Adel Rizk es consejero ejecutivo; cada uno tenía el 13,33 % a fin de 2022, último dato publicado [C3]. El director financiero, Ghassan Abou Ammar, está desde 2008 [C3]. Han multiplicado las ventas por cinco en cuatro años sin pedir dinero a los accionistas. No dan guía, así que no hay historial de cumplimiento. Lo que preocupa: Baduy y Rizk tienen cada uno el 16,66 % de Edarat Lebanon, que presta servicios a Edarat (0,7 M SAR en 2025), y la dependencia de MIS [C4]. Los directivos clave cobraron 1,5 M SAR en salarios en el 1S26 [C5].',
  },
  gobierno: {
    remuneracion: 'Solo se publica el total: 1,53 M SAR en salarios de los directivos clave en el 1S26 (1,87 M en el 1S25), sin desglose del consejero delegado [C5]. Hay un plan de acciones para empleados con autocartera (8.384 acciones concedidas en 2025, con consolidación en cuatro años) [C5]. No hay voto consultivo de la remuneración publicado.',
    control_y_defensas: 'No hay un accionista de control: MIS tiene el 30 % y los tres fundadores tenían el 40 % a fin de 2022 [C3, C6]. Desde el 17-sep-2026 el consejo tiene cinco miembros, tres independientes (el presidente, Salam Al-Khunaizi, y el vicepresidente, Musaed Al-Sudairi, entre ellos) y dos ejecutivos fundadores; MIS ya no tiene consejero y el presidente anterior, Abdullah Al-Ghamdi, tenía un interés indirecto en MIS [C1, C2, C4]. Una acción, un voto. La junta del 17-sep-2026 tuvo una asistencia del 57,9 % [C1]. La comisión de auditoría la preside un externo, Fahad Al-Humaidi [C7].',
    alertas: [
      'MIS es a la vez accionista del 30 %, el cliente del 55 % de las ventas del 1S26, deudor de 56,5 M SAR y avalista del préstamo bancario [C4, C5].',
      'El consejero delegado y el vicepresidente saliente tienen el 16,66 % cada uno de Edarat Lebanon, proveedora vinculada [C4].',
      'No se publica la remuneración del consejero delegado [C5].',
    ],
  },
  consenso: {
    guidance: 'Edarat no da guía de ventas ni de márgenes; los anuncios de resultados solo explican las causas del periodo [A6, A3].',
    revisiones: 'Ningún analista publica estimaciones de Edarat: Yahoo no tiene cobertura y Argaam no recoge informes de casas de análisis para valores de Nomu [D3]. El mercado se guía por los anuncios de contratos de Tadawul.',
  },
  multiplos_historicos: {
    comentario: 'Edarat cotiza a 43 veces nuestro BPA de 2027e, por encima de su mediana adelantada de 2023-2025 (28,3 veces) y cerca del máximo (47,6 veces a fin de 2024) [D1]. La historia útil es corta (tres años) y de un valor que se multiplicó por once entre 2022 y 2024 al pasar de microempresa a tener contratos de MIS. Excluyo 2022: el cierre llegó tres sesiones después de la salida directa a Nomu y daría 8,7 veces, un precio sin descubrir. El PER de los comparables (16,5 veces de mediana) muestra cuánto paga el mercado por el crecimiento de Edarat.',
  },
  comparables: {
    criterio: 'Tres grupos con datos del mismo día: servicios de TI saudíes con estimaciones (Elm, Solutions by stc y Perfect Presentation), operadores de centros de datos de EE. UU. (Equinix y Digital Realty, REIT con PER alto por la amortización) e ingenierías globales que diseñan centros de datos (WSP y Jacobs) [D3]. Fuera: MIS (sin estimaciones; cotiza a 99 veces el EBITDA), NEXTDC, IREN y Applied Digital (en pérdidas). Ninguno mezcla, como Edarat, ingeniería de proyecto y nube local con un cliente vinculado del 55 %.',
    comentario: 'Edarat cotiza a 40 veces el EBITDA de los últimos doce meses y 51 veces el beneficio: más que Equinix (26 veces el EBITDA), que tiene activos de larga vida, y tres veces más que las ingenierías (WSP 12,8, Jacobs 18,3) y los saudíes de TI (11-17) [D3]. Su margen EBITDA (24 %) es como el de Elm y menor que el de los operadores (46-48 %). Solo el crecimiento (+84 % en 2025) justifica una prima, y la mitad de ese crecimiento viene de una vinculada. Los comparables pesan un 20 %.',
  },
  transacciones: {
    comentario: 'La única operación con precio es la venta privada del 10 % por MIS en marzo de 2024: 61,49 M SAR, que valoran la empresa en 615 M (≈ 81 SAR por acción de hoy), 7,6 veces las ventas y 27 veces el EBITDA de 2023 [D17]. Fue una venta para dar flotante, no una compra de control, entre partes que se conocen; no le doy peso.',
  },
  esg: {
    materialidad: 'Lo material es el consumo de energía y agua de los centros de datos que diseña y opera, la seguridad de los datos de sus clientes de nube (organismos, bancos, Tadawul) y la saudización del empleo técnico [B1, B13]. No hay calificaciones ESG públicas.',
    controversias: 'No constan sanciones ni incidentes de seguridad publicados. La controversia de gobierno es la red de operaciones con MIS y con Edarat Lebanon [A10].',
  },
  bolsa: {
    comentario: 'La acción cerró a 275,40 SAR el 19-oct-2026: +87 % en un año (el mercado saudí, −11 %) y +73 % en 2026, aunque un 17 % por debajo del máximo de 52 semanas (333 SAR el 24-sep) [D1, D2]. Subió un 214 % en 2023 y un 265 % en 2024 y cayó un 30 % en 2025 [D1]. Vale 2.079 M SAR, 3,4 veces lo que pagaron por el 10 % en 2024 [D3, D17]. Volatilidad del 49 % y movimientos diarios de más del 10 % con pocos miles de acciones: la liquidez (≈ 1 M SAR al día) es el primer riesgo de la acción [D1, D8].',
    contexto: {
      movimiento: { fecha: '2026-10-19', var_1m_pct: 0.8, var_3m_pct: -3.4, var_6m_pct: 6.4, var_12m_pct: 89.5, dist_max_52s_pct: -9.4, dist_min_52s_pct: 96.3, dist_max_historico_pct: -9.4, tendencia: 'alcista', volatilidad_60d_pct: 49, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'nov-2025 a feb-2026', var_pct: 77, causa: 'De 140 SAR (2-nov-2025, ajustado) a ≈ 248 (máximo del 3-feb-2026; 372,2 sin ajustar): contratos de colocation con SenseTime (oct) y Mobily (nov), pedido de MIS (dic) y un +44 % en enero sin noticia propia encontrada, antes de unos resultados de 2025 con ventas +84 % (9-feb) [D9, D22, D14, D1].', veredicto: 'no cambia', condicion: null },
        { periodo: '17-ago-2026', var_pct: -12.6, causa: 'Caída de un día con 2.679 acciones, recuperada al día siguiente con 31.813: ruido de liquidez, sin noticia [D1].', veredicto: 'no cambia', condicion: null },
        { periodo: 'sep-oct 2026', var_pct: -17, causa: 'Del máximo de 333 SAR (24-sep), tras el contrato de 200 MW de MIS y el plan de GPU (+10 % en septiembre), a 275,40: −6,7 % el 1-oct y −3,4 % el 19-oct, sin noticia propia [D10, D11, D1, D2].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-09-17', tipo: 'directivos', hecho: 'Junta extraordinaria: consejo nuevo con tres independientes (presidente y vicepresidente), sin consejero de MIS; recompra de hasta 15.000 acciones para el plan de empleados [D21].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-09', tipo: 'accionista de referencia', hecho: 'MIS (accionista del 30 %) adjudica a Edarat el diseño y la supervisión de un centro de datos de IA de 200 MW por 197,8 M SAR con IVA; el mismo día, plan de 150 M SAR en GPU (pedido de 127,5 M el 16-sep) [D10, D11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-29', tipo: 'resultados', hecho: '1S26: ventas +22 % (91,6 M SAR) y beneficio +30 % (19,8 M); MIS, el 55 % de las ventas; pedido de colocation de MIS de 19,84 M [D13, D19].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-06-14', tipo: 'ampliación o convertible', hecho: 'Ampliación gratuita del 50 % (de 50,4 M a 75,6 M SAR de capital): sin dinero nuevo ni efecto en el valor [D15].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-04-23', tipo: 'accionista de referencia', hecho: 'Paso al mercado principal en marcha con Al Rajhi Capital como asesor. En 2024 MIS vendió el 10 % «para cumplir los requisitos de liquidez» del paso; con un flotante de ≈ 50 % no hace falta otra colocación, pero el paso dará liquidez a MIS y a los fundadores para vender (overhang) [D16, D17, D3].', veredicto: 'no cambia', condicion: 'Vigilar: una colocación de MIS o de los fundadores al pasar al mercado principal' },
        { fecha: '2027-02-09', tipo: 'resultados', hecho: 'Próximos resultados (anuales de 2026), estimados hacia el 9-feb-2027 por la fecha de los de 2025 [D14].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2027-02-09',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La subida de un año (+87 %) la explican los resultados de 2025 (+84 % en ventas), los contratos de MIS (72,45 M en marzo y 197,8 M en septiembre) y la colocation (Mobily, SenseTime, Edge Network, Rackspace); el +44 % de enero no tiene noticia propia encontrada y la caída desde el máximo de septiembre tampoco: con ≈ 1 M SAR al día, el precio se mueve mucho con poco volumen [D1, D14, D10]. No hay colocación anunciada ni bloqueo por vencer (la salida directa fue en 2022). Veredicto: no cambia; la recomendación no es de compra por valor, así que no hay hecho que esperar.',
    },
  },
};

export default {
  limitaciones, huecos, controles_explicados, secciones,
  dcf_justificacion: {
    crecimiento: '2026e se apoya en el 1S26 (ventas +22 %) y en un segundo semestre que compara con un 2S25 muy fuerte (+99 %): proyecto +20 % (230,8 M SAR) con los contratos de MIS de marzo y julio y la colocation de Mobily y Edge Network [A6, D12, D19, D20]. 2027e salta un 36 %: el negocio actual +15 % (el centro de IA de 200 MW de MIS, 197,8 M con IVA en varios años; Rackspace desde el 2T27) y ≈ 50 M de alquiler de GPU [D10, D18, D11]. Después, del 14 % al 6 % en 2032e, por debajo del mercado de centros de datos (13 % anual) [B1].',
    margenes: 'El margen EBITDA fue del 22,3 % en 2021, 27,5 % en 2022, 28,4 % en 2023, 29,9 % en 2024 y 23,7 % en 2025 (24,9 % en los últimos doce meses) [A1, A9, A2]. Proyecto un 25 % en 2026e y un 31-31,5 % en 2027-2028e con las GPU, que en alquiler de capacidad dan ≈ 65 % de margen EBITDA, y una bajada al 29,5 % en 2032e por la competencia de los hiperescaladores y la caída del precio del alquiler de GPU [B7].',
    inversion: 'Capex del 30 % de las ventas en 2026e y del 32 % en 2027e: las GPU (127,5 M pedidos y hasta 150 M aprobados) más ≈ 4 % de las ventas para la nube [D11]. Después, del 11 % al 10 %: las GPU se amortizan en cinco años y hay que reponerlas. Amortización del 4,5 % en 2026e y del 13 % en 2027e (30 M al año de GPU sobre 5,1 M en 2025), que baja al 9,5 % [A3, D11]. Circulante del 32 % de las ventas (≈ 34 % a jun-26), por el cobro lento de MIS [A2]. Zakat e impuestos del 8,5 % (8,5 % en 2025 y en el 1S26) [A2, A3].',
    wacc: 'Flujos en SAR, anclado al USD a 3,75: tasa libre del 5,61 %, el Treasury a 10 años (5,10 %, FRED, 15-oct-2026) más el diferencial soberano saudí (0,51 %, Damodaran) [D4, D5]. Beta de 1,10, de sector (servicios de TI y centros de datos): la medida contra el mercado saudí (0,34 mensual a cinco años) no sirve con ≈ 3.600 acciones al día [D1]. Prima de mercado del 5,5 % y prima adicional del 2,28 %: 0,78 % de país (Damodaran) y 1,5 % por tamaño e iliquidez de Nomu [D5]. Deuda del 3 % al 9 % (SAIBOR + 4 %) [A2].',
    terminal: 'Crecimiento a perpetuidad del 3,0 % en SAR/USD: la inflación esperada del dólar más algo de crecimiento real de un mercado joven, pero desde un negocio de proyectos y de capacidad que compite con gigantes. Gordon con un WACC del 13,8 % implica ≈ 5 veces el EBITDA terminal (con un múltiplo de salida de 15 veces, el crecimiento a perpetuidad implícito sería del 9,8 %, imposible a largo plazo), muy por debajo de lo que paga hoy el mercado por Edarat (40 veces el EBITDA de doce meses) y de la mediana de los comparables (≈ 17 veces) [D3].',
  },
  puente_comentarios: {
    '2026e': 'Volumen de ingeniería (contratos de MIS de marzo) y de colocation (Mobily, Edge Network) ≈ 11 %; otros 9 puntos por la incorporación a colocation de MIS (19,84 M, pago único) [D12, D19, D20].',
    '2027e': 'Negocio actual +15 % (centro de IA de 200 MW de MIS, Rackspace); otros 21 puntos por el alquiler de GPU, nuevo [D10, D18, D11].',
    '2028e': 'Volumen de ingeniería y nube ≈ 10 % y GPU todo el año [D11].',
    '2029e': 'Mercado de centros de datos al 13 % según Mordor; Edarat por debajo [B1].',
    '2030e': 'Madurez de la flota de GPU y competencia de los hiperescaladores [B1].',
  },
  veredicto: 'En parte',
  sostenibilidad_justificacion: null,
  dcf_lectura: null,
  narrativas: {
    Bajista: 'MIS frena o reparte sus proyectos, las GPU se alquilan a la mitad de lo previsto y la nube sigue sin margen: el crecimiento baja 6 puntos cada año (≈ 30 % en 2027e con las GPU y ≈ 8 % en 2028e) y el margen EBITDA 5 puntos, con la misma amortización de las GPU ya compradas [A2, D11].',
    Base: 'Edarat ejecuta el diseño del centro de 200 MW de MIS, alquila sus GPU a ≈ 50-60 M SAR al año y la colocation crece: ventas +36 % en 2027e y frenando al 6 % en 2032e, margen EBITDA del 25 % al 31 % con las GPU.',
    Alcista: 'La IA en Arabia Saudí tira de la demanda: más proyectos de MIS y de otros operadores, las GPU llenas y más capacidad: 6 puntos más de crecimiento y 3 de margen [B1, B2, B5].',
  },
  ...F,
};
