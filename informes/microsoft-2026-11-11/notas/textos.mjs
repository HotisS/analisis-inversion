// Textos del analista (Microsoft, corte 2026-11-11). Cifras del cálculo tal cual; citas con la letra de la nota.
import { objetivo_12m } from './o12.mjs';

export const textos = {
  meta: {
    limitaciones: `Línea cotizada única (Nasdaq: MSFT); cuentas y cotización en USD, US GAAP. El ejercicio cierra el 30 de junio y la etiqueta es la del año en que termina: FY2027 va de julio de 2026 a junio de 2027 y el 1T27 es julio-septiembre de 2026 [A23]. El precio es el cierre del 10-nov-2026, porque la sesión del 11 no había cerrado a la fecha de corte [D2]. El último periodo publicado es el 1T27 (10-Q del 28-oct-2026) [A23]. Los segmentos son los vigentes desde FY2027 (Agents and Infra; Devices and Consumer) con la historia reexpresada por la empresa para FY2024-FY2026 [A25]; FY2017-FY2023 no existen en esa base y se quedan sin dato. El puente es del balance a 30-sep-2026; la emisión de bonos de 25.000 M liquidada el 4-nov entra en caja y en deuda por el mismo importe y no cambia la deuda neta, así que no se ajusta [A27, C30]. Iteración nueva del análisis del 8-oct-2026: cada dato se ha vuelto a comprobar a la fecha de corte.`,
    controles_explicados: [
      { control: 'Crecimiento a perpetuidad', explicacion: 'El 3,5 % es nominal en dólares: con el bono a 10 años al 4,98 % y una inflación esperada de unos 2,3-2,5 %, supone un 1 % real, por debajo del límite de la tasa libre menos medio punto (4,48 %).' },
      { control: 'Regresión múltiplo-crecimiento', explicacion: 'Con ocho comparables de modelos distintos (publicidad, comercio, hardware, software de aplicaciones, nube de infraestructura) el crecimiento no explica los múltiplos (R² = 0,07). La regresión no se usa en la valoración.' },
    ],
  },
  identificacion: { sector: 'Tecnologías de la información', industria: 'Software', sede: 'Redmond, Washington (EE. UU.)', fundacion: '1975', empleados: 223000, web: 'www.microsoft.com/investor' },
  _parches: [
    { ruta: 'bolsa.contexto.noticias[2].hecho', valor: 'Emisión de bonos senior por 25.000 M USD en diez tramos (2028-2066), con cupones fijos del 4,85 % al 6,35 % y rating Aaa/AAA; entra caja y deuda por el mismo importe [C30, A28].' },
    { ruta: 'bolsa.contexto.noticias[2].tipo', valor: 'ampliación o convertible' },
    { ruta: 'bolsa.contexto.noticias[4]', valor: { fecha: '2026-10-16', tipo: 'demanda o regulador', hecho: 'La CMA británica propone designar a Microsoft con estatus de mercado estratégico en software de empresa; la consulta cierra el 13-nov y el plazo legal acaba el 13-feb-2027. Podría imponer condiciones de licencia en la nube, no multas inmediatas [B25].', veredicto: 'no cambia', condicion: null } },
    { ruta: 'bolsa.contexto.noticias[5]', valor: { fecha: '2026-11-10', tipo: 'rumor', hecho: 'Anthropic lanza herramientas ofimáticas propias; en los foros es el tema bajista del momento como amenaza para Office y Copilot. Microsoft es accionista de Anthropic (ganancia de 3.200 M en el 4T26) y su capacidad corre en parte en Azure [E6, A11].', veredicto: 'no cambia', condicion: null } },
  ],
  rentabilidad: {
    comentario: `Microsoft crea valor con holgura: el ROIC de FY2026 es del 30,9 % frente a un WACC del 10,03 %, 20,9 puntos por encima. Pero baja deprisa: era del 100,5 % en FY2019 y del 69,4 % en FY2022, porque el capital invertido crece más que el beneficio operativo. El margen no es el problema (EBIT del 46,8 %, máximo de la serie): lo es la rotación, por el inmovilizado, que pasó de 74.398 M en FY2022 a 313.076 M en FY2026 y a 346.844 M en septiembre de 2026, y por Activision (75.408 M en 2023) [A1, A23]. El ROIC incremental de los últimos años es del 27,7 %: cada dólar nuevo rinde menos que el negocio heredado, pero casi el triple del coste de capital. Sin fondo de comercio el ROIC es del 43,8 %. Frente a sus rivales de nube, el margen operativo de Microsoft (46,8 %) supera al de AWS (37,8 %) y Google Cloud (34,2 %) [B16, B18].`,
  },
  multiplos_historicos: {
    comentario: `Microsoft cotiza a 18,9 veces el EBITDA de los últimos 12 meses y a 27,8 veces su beneficio, frente a una media de 21,1 y 34,5 veces en sus diez últimos cierres de ejercicio: un 10 % y un 19 % de descuento. No es barato por historia en lo que importa: el EBITDA de hoy aún no carga la amortización del capex de 2026-2027, y el PER lleva ganancias de OpenAI y Anthropic. Lo estructural es el cambio de negocio: pasa de software con poco capital a infraestructura intensiva en capital, que el mercado ha pagado a menos múltiplo (el cierre de FY2026, 373,02 USD, era 18,4 veces nuestro BPA del año siguiente). La tasa libre ha bajado del 5,27 % al 4,98 % en un mes [D4].`,
  },
  comparables: {
    comentario: `Microsoft cotiza a 14,9 veces el EBITDA de los próximos 12 meses y 24,7 veces el beneficio, frente a medianas de 14,2 y 19,3 veces: una prima pequeña en EBITDA y del 28 % en beneficio. La prima se justifica en parte: tiene el margen EBITDA más alto del grupo (58,4 % frente a una mediana del 37 %) y un ROIC del 30,9 % frente al 19,5 %. Pero la muestra es frágil: el crecimiento no explica los múltiplos (R² = 0,07), el EV/EBITDA de los próximos 12 meses de los comparables es estimación propia porque la fuente gratuita no da EBITDA estimado [D13], y hay valores raros (Adobe a 8,7 veces beneficio; Oracle crece un 41,6 % con deuda). Ningún comparable tiene el perfil de Microsoft. Por eso pesan solo un 15 %.`,
  },
  transacciones: {
    comentario: `Las cinco operaciones grandes del software se pagaron a una mediana de 7,7 veces las ventas (Activision, Nuance, VMware, Splunk y Ansys) [D14-D18]. Con ese múltiplo Microsoft valdría 370,51 USD por acción, por debajo del precio, pero no dice nada del valor de control: con 3,97 billones USD de capitalización, un 99,9 % de capital flotante y sin accionista de control, Microsoft no puede ser objetivo de una compra [D3]. Sirven para otra cosa: Activision se pagó a 7,8 veces las ventas en 2022-2023 y hoy XBOX cae (21.790 M en FY2026 frente a 23.455 M) [A25]. Peso 0 %.`,
  },
  suma_partes: {
    aplica: false, descuento_holding_pct: 0, partes: [],
    comentario: `Los dos segmentos nuevos tienen perfiles distintos (Agents and Infra, el 80,8 % de las ventas y el 87,8 % del EBIT de FY2026; Devices and Consumer, que cae un 3 %) [A25, A24], pero no hay comparables puros con cifras homogéneas: la nube de Amazon y Google va dentro de grupos con publicidad y comercio, y el capex, que es lo que decide el valor, no se reparte por segmento. La valoración se hace por DCF del grupo; la participación en OpenAI se suma en el puente.`,
    confianza: 'Media',
  },
  dcf: {
    justificacion: {
      crecimiento: `El 1T27 creció un 19 % y la guía del 2T27 es del 18-19 %, con Azure al 49-50 % a tipo constante [A24, A26]. La cartera comercial es de 677.000 M (+73 %), con un 30 % a reconocer en 12 meses [A23]. Proyectamos +18,5 % en FY2027 (+17,5 % en el análisis anterior), +18 % en FY2028 y +17 % en FY2029, por debajo del consenso (+19,3 %, +20,5 % y +19,5 %) porque OpenAI ya factura el 10,8 % de las ventas del trimestre (10.000 M) y diversifica proveedores (Amazon, Oracle) [A23, B16, D3, D7]. Después, el crecimiento baja hasta el 6,5 % en FY2036. TCAC de la proyección: 12,6 %, frente al 14,7 % de FY2017-FY2026.`,
      margenes: `El margen EBITDA sube del 58,4 % de FY2026 al 62 % en FY2027 (el 1T27 dio un 62,5 %) y al 63 % desde FY2029 [A24]. Sube porque la amortización, que crece con el capex, no está en el EBITDA; el margen operativo guiado para el 2T27 es algo inferior al de hace un año [A26]. Frente al consenso, nuestro EBITDA queda un 1,5 % por encima en FY2027 y un 8,3 % por debajo en FY2029 [D7]: el margen bruto de Microsoft Cloud se queda en torno al 65 % por la IA, y los arrendamientos que pasan a operativos con la vida útil de 25 años cargan el EBITDA [A26, A23].`,
      inversion: `El capex incluye las altas de arrendamientos financieros. FY2027: 51 % de las ventas, unos 200.500 M, coherente con 45.200 M en el 1T27, más de 50.000 M en el 2T27 y unos 170.000 M en el año natural 2026 (antes 175.000 M, por retrasos de proveedores) [A26]. Baja al 34 % en FY2029 y al 24,5 % en FY2036, por encima del 13-14 % de FY2020-FY2022, porque la IA exige reponer GPU cada pocos años. Es la misma cola de la versión v2 del análisis anterior, la que pasa la prueba de sostenibilidad. La amortización sube del 11,6 % de las ventas al 20,5 % y converge al 18,5 %. Circulante comercial del 12 % de las ventas (12,0 % en FY2026).`,
      wacc: `Tasa libre: Tesoro a 10 años, 4,98 % (10-nov-2026) [D4]. Beta de 1,05, entre la ajustada mensual de cinco años frente al S&P 500 (1,03) y la semanal (1,09) [D2]; frente al Nasdaq o al software sale más baja, pero Microsoft pesa mucho en esos índices y la prima que aplicamos es la del S&P 500. Prima de mercado del 5 %, sin prima adicional (rating Aaa/AAA y caja) [A28]. Coste de la deuda del 5 %, en línea con los bonos emitidos el 4-nov (4,85-6,35 %) [C30], y peso de la deuda del 3,2 % a valor de mercado. WACC: 10,03 % (10,34 % en el análisis anterior).`,
      terminal: `Gordon con un crecimiento del 3,5 % nominal en dólares (un 1 % real con una inflación de unos 2,3-2,5 %), por debajo de la tasa libre menos medio punto. Antes del terminal, una etapa de transición de cinco años (FY2037-FY2041) en la que el crecimiento baja del 6,5 % al 3,5 % con el margen constante. El valor terminal pesa un 52 % del valor.`,
    },
    etapa2: {
      justificacion: `El mercado de nube de infraestructura creció un 55 % en el 3T26 hasta 167.700 M al trimestre y un 26,6 % anual entre 2020 y 2025 [B5, B9]; la IA no está aún penetrada en la empresa, y Microsoft tiene 677.000 M de cartera comercial [A23]. Con un ROIC del 30,9 % frente a un WACC del 10,03 %, crecer crea valor; los costes de cambio de Microsoft 365 y Azure sostienen la ventaja. Por eso la transición: cinco años en los que el crecimiento baja del 6,5 % al 3,5 %.`,
    },
    sostenibilidad: {
      puente_ingresos: [
        { periodo: 'FY2027e', volumen_pct: 16, precio_pct: 2.5, otros_pct: 0, comentario: 'Volumen: Azure +48 % en el 1T27 y guía del 49-50 % en el 2T27, con la demanda por encima de la capacidad; precio: Microsoft 365 E3 +8 %, E5 +5 % y Office 365 E3 +13 % desde el 1-jul-2026, y la venta de E5 y Copilot sobre la base instalada [A24, A26, B4]. Reparto, estimación propia.' },
        { periodo: 'FY2028e', volumen_pct: 16, precio_pct: 2, otros_pct: 0, comentario: 'Volumen: entra en ingresos la capacidad del capex de FY2026-FY2027 y se reconoce la cartera (677.000 M, el 30 % a 12 meses); precio: ingreso por usuario de Microsoft 365, que crece por encima de los puestos [A23, B4].' },
        { periodo: 'FY2029e', volumen_pct: 15, precio_pct: 2, otros_pct: 0, comentario: 'Volumen: Azure y servicios de IA con el mercado de nube creciendo por encima del 25 % (26,6 % anual en 2020-2025 según Synergy); precio, como en FY2028 [B9, B5].' },
        { periodo: 'FY2030e', volumen_pct: 13, precio_pct: 2, otros_pct: 0, comentario: 'El volumen modera con la base; el precio sigue la venta de suites superiores (E5, Copilot) [B4].' },
      ],
      mercado_final: null,
      veredicto: 'En parte',
      justificacion: `En parte. Foso amplio: costes de cambio (677.000 M de cartera) e integración de Azure, Microsoft 365 y Copilot; poder de precios demostrado con las subidas de julio de 2026 [A23, B4]. La reinversión de la proyección (34 % del NOPAT) financia al ROIC actual un 10,4 % anual que, con unos dos puntos de precio que no piden capital, cubre el 12,6 % proyectado; el capital nuevo rinde un 29,4 % frente al 27,7 % histórico. Pero ya no es software sin capital: el ROIC bajó del 100,5 % al 30,9 % y Azure pierde cuota (19 % en el 3T26 frente al 21 % del 4T25) [B5]. Cuota final sin perímetro comparable (null): Azure es menos de un tercio del grupo.`,
    },
    lectura: `El DCF da 448,72 USD por acción, un 15,8 % por debajo del precio, con el valor terminal en el 52 % del total. Sube frente al análisis del 8-oct (419,91) por la tasa libre más baja (4,98 % frente a 5,27 %) y un FY2027 más fuerte, y baja algo por la participación en OpenAI (24 % en vez de 27 %). El DCF inverso dice que el precio de 533,16 descuenta un crecimiento del 14,3 % anual durante diez años con nuestros márgenes, frente al 12,6 % de nuestro base y al 14,7 % de la última década; o, con nuestro crecimiento, un margen EBITDA del 69,8 % frente al 63 %. La rentabilidad implícita es del 9,1 %, por debajo de nuestro WACC (10,03 %) y del que pide hoy el mercado (9,4 %). Es exigente pero no absurdo: pide que Microsoft repita la década de la nube con un negocio que ahora consume la mitad de sus ventas en capex.`,
  },
  narrativas: {
    Bajista: 'OpenAI reparte su gasto entre Amazon, Oracle y su propia capacidad, Azure baja del 40 % y Copilot no despega frente a herramientas de Anthropic y Google; el crecimiento cae tres puntos y el margen tres más mientras la amortización del capex ya hecho sigue llegando. Ya pasó en FY2023: los clientes optimizaron su nube y el crecimiento bajó al 6,9 %.',
    Base: 'Azure crece por encima del 40 % dos años más con la capacidad nueva, Microsoft 365 sube precio y puestos, y el capex baja del 51 % al 34 % de las ventas en FY2029. El margen EBITDA llega al 63 %.',
    Alcista: 'La IA se generaliza en la empresa, Copilot pasa a ser estándar y Azure mantiene su cuota; el crecimiento supera en dos puntos al base y el margen en uno y medio.',
  },
  escenarios: {
    comentario: `La asimetría es mala: el alcista vale 579,21 USD (+8,6 %) y el bajista 269,17 USD (−49,5 %), 0,17 veces. El bajista pesa tanto porque el capex ya comprometido (364.600 M en arrendamientos no iniciados) sigue cargando la amortización aunque el crecimiento baje [A23]. Con la prima implícita del mercado (4,41 %), la asimetría mejora a 0,5 veces. No compensa a estos precios.`,
  },
  valoracion: {
    puente: { fecha: '2026-09-30', deuda_financiera: 35481, arrendamientos: 70973, caja: 64509, minoritarios: 0, pensiones: 0, asociadas: 97400, otros_ajustes: -25408 },
    comentario: `Pesos: DCF 45 %, escenarios 40 % y comparables 15 %; transacciones y suma de partes, 0. El DCF es el método que mejor recoge lo que decide el valor, la inversión en IA: los múltiplos de hoy aún no cargan la amortización del capex de 2026-2027. El puente suma OpenAI a la referencia que dio Microsoft tras la recapitalización (unos 135.000 M al 27 %, es decir unos 500.000 M por el 100 %) [A10], ajustada al 24 % actual (120.000 M) y menos un impuesto latente del 21 % sobre la plusvalía frente al valor contable (12.400 M): 97.400 M, unos 13,1 USD por acción [A23]. Las rondas posteriores valoran OpenAI por encima, pero no hemos leído el documento original. Los arrendamientos financieros (70.973 M) son deuda; los operativos, no. El resto de inversiones a largo (25.408 M) suma valor. La dispersión va de 370,51 USD (transacciones) a 505,82 (EV/EBITDA de los comparables). El valor objetivo, 442,95 USD, está un 16,9 % por debajo del precio.`,
    objetivo_12m: {
      ...objetivo_12m,
      consenso: { bpa_ano1: 20.01, bpa_ano2: 24.20, objetivo_medio: 634.14, objetivo_min: 440, objetivo_max: 870, analistas: 58, tendencia_3m: 'subidas', fuente: 'Yahoo Finance (BPA, 11-nov) y Stock Analysis (objetivos, 6-nov) [D3, D8]' },
      diferencia_consenso: `Nuestro BPA base de FY2028e (22,68) queda un 6,3 % por debajo del consenso (24,20) y nuestro precio base (621,43) un 2,0 % por debajo del objetivo medio de los analistas (634,14). La diferencia de BPA viene de las ventas (464.010 M frente a 477.139 M, −2,8 %: no damos por hecho que OpenAI siga comprando al ritmo actual), del margen (−1,8 % en EBITDA) y de que no contamos ingresos financieros ni ganancias de OpenAI. El objetivo medio de los analistas cae dentro de nuestro rango (362,48-690,56).`,
      media: 558.16,
      comentario: `El valor intrínseco (442,95) queda un 22 % por debajo del objetivo a 12 meses ponderado (570,52). La distancia es de múltiplo: el objetivo a 12 meses supone que el mercado sigue pagando unas 27 veces el beneficio de FY2028, que aún no carga toda la amortización del capex; el DCF cobra ese capex entero. Para cerrarla haría falta que el capex baje antes de lo que proyectamos sin que frene Azure. El bajista a 12 meses (18,4 veces, el múltiplo del cierre de FY2026, en el mínimo de junio) es el que más pesa en la caída de la ponderada frente al análisis anterior.`,
    },
  },
  catalizadores: {
    items: [
      { fecha: '13-nov-2026 y 13-feb-2027', evento: 'Consulta y decisión de la CMA sobre el estatus de mercado estratégico en software de empresa', efecto: 'Condiciones de licencia en la nube en el Reino Unido', probabilidad: 'Alta', sentido: '−' },
      { fecha: '8-dic-2026', evento: 'Junta de accionistas: propuesta de separar presidente y CEO; salida de tres consejeros', efecto: 'Gobierno; sin efecto en las cifras', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '27-ene-2027 (estimada)', evento: 'Resultados del 2T27: Azure frente a la guía del 49-50 % y capex frente a más de 50.000 M', efecto: 'Confirma o no el crecimiento de FY2027', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '1S 2027', evento: 'Decisión final de la Comisión Europea sobre Azure como guardián de acceso (DMA)', efecto: 'Obligaciones de interoperabilidad y portabilidad en la nube', probabilidad: 'Media', sentido: '−' },
      { fecha: 'Julio de 2027', evento: 'Resultados del 4T27 y guía de capex de FY2028', efecto: 'Si el capex deja de crecer, sube el FCF y el DCF', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027', evento: 'Reparto del gasto de OpenAI entre Azure, AWS y Oracle', efecto: 'OpenAI es el 10,8 % de las ventas del 1T27', probabilidad: 'Media', sentido: '−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'El capex de IA no rinde: la capacidad crece más que la demanda pagada', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−40 % (escenario bajista: 269,17 USD)', mitigante: '677.000 M de cartera comercial; demanda por encima de la capacidad según la empresa [A23, A26]', senal: 'Azure por debajo del 35 % con el capex aún creciendo' },
      { riesgo: 'Concentración en OpenAI: 10.000 M de ingresos en el 1T27 (10,8 %) y una parte grande de la cartera', tipo: 'Cliente', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−10 % a −15 %', mitigante: 'Contratos firmados; participación del 24 % [A23]', senal: 'Más contratos de OpenAI con AWS u Oracle; caída del RPO' },
      { riesgo: 'Copilot y Office pierden frente a agentes de terceros (Anthropic, Google)', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Base instalada y costes de cambio de Microsoft 365', senal: 'Microsoft 365 commercial cloud por debajo del +15 %' },
      { riesgo: 'Regulación de la nube: CMA (estatus de mercado estratégico) y DMA en la UE', tipo: 'Regulatorio', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−3 % a −5 %', mitigante: 'Concesiones previas (Teams) [B28]', senal: 'Decisión de la CMA del 13-feb-2027 [B25]' },
      { riesgo: 'La vida útil más larga (servidores 6 años, edificios 25) infla el beneficio si la IA obliga a reponer antes', tipo: 'Contable', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−8 % (amortización +2 puntos de las ventas)', mitigante: 'El DCF ya usa capex y no beneficio', senal: 'Deterioros de equipos o cambios de vida útil a la baja' },
      { riesgo: 'Pérdida de cuota de Azure frente a AWS, Google y las neonubes', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Crecimiento de Azure (+48 %) por encima del mercado en valor absoluto', senal: 'Cuota de Synergy por debajo del 18 % [B5]' },
      { riesgo: 'Disputa fiscal con el IRS (28.900 M por 2004-2013)', tipo: 'Fiscal', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−1 % a −4 %', mitigante: 'Recurso y provisiones de posiciones inciertas [A1]', senal: 'Resolución del recurso' },
    ],
    premortem: `Es noviembre de 2029 y Microsoft vale un 40 % menos. Entre 2027 y 2028 el mercado de IA siguió creciendo, pero los grandes laboratorios repartieron su gasto: OpenAI se llevó a AWS y a Oracle una parte de lo que compraba en Azure, y Anthropic y Google ofrecieron agentes de oficina más baratos que Copilot. Azure bajó del 48 % al 25 % de crecimiento mientras llegaba la amortización de los más de 360.000 M de arrendamientos firmados en 2026. El margen operativo cayó del 50 % al 40 % y el FCF se quedó en el 15 % del beneficio. El mercado dejó de pagar 27 veces el beneficio a un negocio de infraestructura y lo valoró como a Oracle o Amazon, a 18-20 veces: el múltiplo del cierre de junio de 2026. Las señales estaban: el peso de OpenAI en las ventas (10,8 % en el 1T27), la pérdida de cuota de Azure en Synergy (21 % a 19 %) y que la empresa dejara de dar los puestos de Copilot.`,
    ia: {
      exposicion: 'Alta', sentido: 'Mixto', efecto_valor: '+/−20 %',
      comentario: `La IA es a la vez el motor y el riesgo. Oportunidad: Azure crece un 48 % por la demanda de IA y la cartera comercial suma 677.000 M [A23, A24]. Amenaza: Microsoft 365 (100.299 M en FY2026, la segunda línea) es el producto que los agentes de Anthropic, Google u OpenAI pueden sustituir o abaratar, y la IA convierte a Microsoft en un negocio de capital (capex del 49 % de las ventas en el 1T27). La empresa no da los puestos de Copilot [A26]. Señal: Microsoft 365 commercial cloud por debajo del +15 % o Azure por debajo del 35 %.`,
    },
  },
  preguntas: {
    items: [
      { tema: 'OpenAI', pregunta: '¿Qué parte de la cartera comercial de 677.000 M y de los 10.000 M de ingresos del 1T27 es de OpenAI, y con qué plazos?', por_que: 'Es el cliente que decide el crecimiento de Azure; ya compra a AWS y Oracle.' },
      { tema: 'Capex', pregunta: '¿Cuándo deja de crecer el capex (con arrendamientos) en porcentaje de las ventas?', por_que: 'Cada punto de capex en la cola resta unos 9,5 USD por acción en el DCF.' },
      { tema: 'Vida útil', pregunta: '¿Cuánto beneficio aporta el paso de 15 a 25 años en edificios, y cuánto el paso de arrendamientos financieros a operativos?', por_que: 'Mueve el BPA y el capex publicado sin mover la caja.' },
      { tema: 'Copilot', pregunta: '¿Cuántos puestos de pago de Microsoft 365 Copilot hay y a qué precio medio?', por_que: 'La empresa dejó de dar la cifra; es la prueba de que la IA monetiza en productividad.' },
      { tema: 'Cuota', pregunta: '¿Por qué baja la cuota de Azure en Synergy (21 % a 19 %) con el crecimiento al 48 %?', por_que: 'Si es capacidad, se corrige; si es competencia, cambia la tesis.' },
      { tema: 'Bonos', pregunta: '¿Por qué emitir 25.000 M de deuda con 64.509 M de caja e inversiones?', por_que: 'Puede anticipar más capex o compras.' },
    ],
    confianza: 'Media',
  },
};
