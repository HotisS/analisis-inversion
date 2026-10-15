// Textos del analista para Everpure (corte 2026-10-15). Cifras del motor tal cual; hechos con cita de la nota ([A3] = fuente 3 de A.json).
export default {
  fuentes: [],
  limitaciones: 'Línea cotizada: acciones ordinarias de clase A en la Bolsa de Nueva York (símbolo P desde enero de 2026; antes PSTG). ISIN de Pure Storage (US74624M1027), el que figura en los registros consultados. Ejercicio de 52/53 semanas que acaba el primer domingo después del 30 de enero: FY2026 = febrero de 2025 a 1-feb-2026 (etiqueta «fin»). Precio: cierre del 14-oct-2026 (141,49 USD); la sesión del 15-oct no había cerrado y a media sesión cotizaba en torno a 131 USD (−7 %). Caja = caja más valores negociables. Deuda: los convertibles de 2023 y el préstamo de 100 M USD ya están amortizados; arrendamientos operativos fuera de la deuda (US GAAP). Ingresos por producto y suscripción solo desde FY2024 (los anteriores no se han reexpresado en el material leído). El objetivo FY2028 de la reunión con analistas del 23-sep-2026 viene de prensa, no del documento de la empresa.',
  controles_explicados: [
    { control: 'Circulante del primer año de proyección', explicacion: 'Los ingresos diferidos pesan menos sobre las ventas porque crece mucho más el producto (hiperescala, cobrado al entregar) que la suscripción; además la empresa ha adelantado ≈700 M USD a proveedores de flash en el 1S FY27 [A3].' },
    { control: 'Múltiplos LTM y NTM de cada comparable', explicacion: 'Everpure: el EBITDA contable de los últimos 12 meses (384 M) lleva restados ≈540 M de pagos en acciones y el de los próximos 12 meses sale del consenso ajustado; el salto es de definición y de crecimiento real (+38 % en ventas).' },
    { control: 'Crecimiento del BPA base', explicacion: 'El BPA GAAP parte de un año de márgenes mínimos (5,1 % neto en FY2026): pasar a 2,87 en FY2029e es la guía de ingresos (+38 %) más el apalancamiento operativo; el consenso está aún más arriba (3,06).' },
    { control: 'Capitalización calculada', explicacion: 'Stock Analysis multiplica por 333,2 M de acciones en circulación; el informe usa 345,6 M diluidas (2T FY27) [A3, D5].' },
  ],
  huecos: [],
  casos_12m: [
    { escenario: 'Bajista', metrica: 'PER FY2029e', beneficio_por_accion: 2.12, multiplo: null, precio: null, justificacion: 'Los hiperescaladores frenan los pedidos tras la ola de 2026 y la flash cara recorta el margen: ventas FY2029e de 7.134 M USD (+26 % y +12 %), margen EBITDA contable del 16 %. BPA 2,12 con 350 M de acciones.' },
    { escenario: 'Base', metrica: 'PER FY2029e', beneficio_por_accion: 2.87, multiplo: null, precio: null, justificacion: 'Guía FY2027 cumplida (5.055 M), +32 % en FY2028e (por debajo del objetivo de 7.000-7.300 M) y +18 % en FY2029e; margen EBITDA contable del 19 % con pagos en acciones del ≈10 % de las ventas. Ventas 7.873 M; BPA 2,87.' },
    { escenario: 'Alcista', metrica: 'PER FY2029e', beneficio_por_accion: 3.43, multiplo: null, precio: null, justificacion: 'Se cumple el objetivo FY2028 y entra un tercer hiperescalador: ventas FY2029e de 8.387 M USD y margen del 21 %. BPA 3,43, por encima del consenso (3,06).' },
  ],
  per_historico: {
    base: 'adelantado', actual: 66.4, mediana_5a: 119.3, minimo_5a: 76.4, media_larga: 111.0, anios: 4,
    excluidos: 'Base adelantada: cierre de cada ejercicio ÷ BPA GAAP del ejercicio siguiente. FY2022 115,2 (26,49 ÷ 0,23); FY2024 129,0 (39,99 ÷ 0,31); FY2025 123,3 (67,79 ÷ 0,55); FY2026 76,4 (69,54 ÷ nuestro BPA FY2027e de 0,91). Excluido FY2023 (152,3x: por encima de 150x) y FY2020-FY2021 (pérdidas el año siguiente). Toda la historia es de años con márgenes mínimos: el PER histórico está inflado por el BPA deprimido. Actual: 141,49 ÷ BPA FY2028e propio de 2,13.',
    v2: { mediana_5a: 126.1, minimo_5a: 125.8, media_larga: 126.1, excluidos: 'Historia al cierre (precio ÷ BPA del mismo ejercicio): FY2023 125,8 y FY2026 126,4. Excluidos FY2024 y FY2025 (210x y 219x, por encima de 150x) y los años de pérdidas.' },
  },
  diferencia_consenso: 'Nuestro BPA de FY2028e (2,13) y FY2029e (2,87) queda un 5 % y un 6 % por debajo del consenso GAAP (2,24 y 3,06): proyectamos ventas FY2028e de 6.672 M frente a 7.026 M. La diferencia grande está en el precio: nuestro base (≈210 USD) supera en un 39 % el objetivo medio de 20 analistas (151,11 USD). Viene del múltiplo: la regla sube el PER actual (66x) un 10 % porque la historia, hecha con años de beneficio mínimo, está en 115-129x. No lo corregimos, pero es la cifra más frágil del informe.',
  objetivo_comentario: 'El valor intrínseco (40,62 USD) y el objetivo a 12 meses (≈221 USD) están a más de cinco veces: el DCF pide un 13,46 % de rentabilidad y paga los pagos en acciones como coste; la regla de múltiplos supone que el mercado siga pagando 66-74 veces un beneficio que se triplica en dos años. La distancia no se cierra con un catalizador: haría falta que los márgenes GAAP llegaran al 30 % o más de forma duradera. La tesis de valor real no existe a este precio; el objetivo a 12 meses depende del humor del mercado con la IA.',
  veredicto: 'En parte',
  secciones: {
    historia: {
      resumen: 'Pure Storage nació en 2009 para sustituir los discos duros de las cabinas empresariales por memoria flash con su propio software (Purity) y sus propios módulos (DirectFlash). Salió a bolsa en 2015 y perdió dinero hasta FY2022, financiando el crecimiento con caja de la salida a bolsa y convertibles. Con Charles Giancarlo (desde 2017) pasó al modelo de suscripción Evergreen, compró Portworx (2020) y en 2024 logró su primer contrato con un hiperescalador (Meta) para sustituir discos duros en centros de datos. En enero de 2026 cambió su nombre a Everpure y su símbolo a «P» [B10]; en agosto de 2026 anunció un segundo hiperescalador de los cinco mayores [B9] y en septiembre entró en el S&P 500 [D9].',
    },
    negocio: {
      descripcion: 'Everpure vende sistemas de almacenamiento de datos 100 % flash: FlashArray (bloques, bases de datos y virtualización), FlashBlade (archivos y objetos; FlashBlade//EXA para entrenamiento de IA) y, desde 2024, la tecnología DirectFlash que licencia a hiperescaladores, que fabrican sus propios equipos y le pagan una regalía por capacidad enviada [A1, B1]. Encima va una capa de software y servicio: Evergreen (actualizaciones de controladoras sin cambiar el equipo), Evergreen//One (almacenamiento como servicio que se paga por uso), Pure1 y Portworx para Kubernetes [A1]. Vende a través de socios a grandes empresas (≈64 % del Fortune 500), proveedores de servicios gestionados y nubes de IA; el 67 % de los ingresos de FY2026 se facturó en Estados Unidos [A1].',
      como_gana_dinero: 'Dos fuentes: el producto (1.971,7 M USD en FY2026, 54 %), cobrado al entregar con márgenes brutos del 66-70 %, y la suscripción (1.691,2 M, 46 %), recurrente, con margen del ≈74 % y 2.100 M USD de ARR en el 2T FY27 (+20 %) [A1, A3]. El margen depende sobre todo del precio de la memoria flash, que Everpure compra a fabricantes como cualquier rival: en el 1S FY27 la subida histórica del NAND bajó el margen de producto y obligó a adelantar ≈700 M USD a proveedores [A3]. Los gastos operativos absorben el 41 % de las ventas y los pagos en acciones el 12-13 %, así que el margen operativo GAAP es de solo el 3,1 % en FY2026 frente al ≈17 % ajustado [A1, A6]. Fuerte estacionalidad: el 1T es el trimestre más flojo y el 4T el mejor [B1].',
      clientes: 'Sin cliente de más del 10 % de los ingresos en FY2025 y FY2026; en FY2024 uno superó el 10 % (un distribuidor) [A1]. La concentración nueva está en la hiperescala: dos clientes de los cinco mayores del mundo, contratos que dependen de pedidos muy grandes y con un periodo de diseño largo [A1, A3]. La renovación de la base instalada es alta (NPS certificado de 84) y la suscripción crece por encima del 15 % desde hace años [A1]. Poder de precio: en el 1S FY27 la empresa subió precios para trasladar el coste de la flash y aun así la demanda creció (+54 % en producto en el 2T) [A3], pero el margen bruto bajó 1,8 puntos: traslada el coste, no lo mejora.',
    },
    sector: {
      definicion: 'El mercado relevante es el almacenamiento externo empresarial (cabinas para centros de datos de empresas y proveedores de servicios), que IDC mide en ≈33.000 M USD en 2025 (+3,9 %) [B2, B3]. Dentro, las cabinas solo flash crecen a doble dígito (+18,1 % en el 4T25) a costa de las híbridas (−6,7 %) [B3]. No incluye el almacenamiento que construyen los hiperescaladores con discos duros y SSD propios, el mercado nuevo al que Everpure entra con regalías: su tamaño no se publica de forma gratuita. Usamos IDC porque es la única serie con los mismos proveedores que compiten con Everpure.',
      drivers: [
        { driver: 'Datos para la IA (entrenamiento e inferencia)', efecto: '+', horizonte: 'Estructural', evidencia: 'IDC vincula el crecimiento de la flash a la IA; FlashBlade//EXA y la plataforma de datos para GPU [B3, B1].' },
        { driver: 'Sustitución de discos duros por flash en hiperescala', efecto: '+', horizonte: 'Estructural', evidencia: 'Dos hiperescaladores de los cinco mayores con DirectFlash; ahorro de energía y espacio en el centro de datos [B9, B1].' },
        { driver: 'Precio de la memoria NAND', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Subida histórica en el 1S FY27: más ingresos por unidad pero menor margen bruto y anticipos a proveedores [A3].' },
        { driver: 'Salida de clientes de VMware tras su compra por Broadcom', efecto: '+', horizonte: 'Cíclico', evidencia: 'Portworx y la integración con OpenShift de Red Hat captan cargas virtualizadas [B9].' },
        { driver: 'Nube pública', efecto: '−', horizonte: 'Estructural', evidencia: 'Los grandes proveedores de nube ofrecen almacenamiento propio como alternativa [B1].' },
      ],
      porter: [
        { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Dell, NetApp, HPE, Hitachi, IBM y Huawei compiten en el mismo cliente; Dell y HPE empaquetan el almacenamiento con servidores de IA [B1, B6].' },
        { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Los hiperescaladores negocian contratos enormes y fabrican el equipo; las empresas grandes compran por concurso [A1].' },
        { fuerza: 'Poder de los proveedores', intensidad: 4, justificacion: 'Cuatro fabricantes de NAND; la subida de 2026 obligó a pagar por adelantado ≈700 M USD [A3].' },
        { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Hacen falta años de software y certificaciones; los nuevos entran en nichos (VAST Data en IA) [B1].' },
        { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Almacenamiento de la nube pública y sistemas que diseñan los propios hiperescaladores [B1].' },
      ],
      ciclo: { posicion: 'Expansión', comentario: 'El almacenamiento empresarial solo creció un 3,9 % en 2025, pero la flash crece a doble dígito y el gasto en centros de datos de IA está en máximos [B2, B3]. El sector es cíclico: en 2008-09 y en 2023 (exceso de inventario y digestión de la nube) los pedidos cayeron y los precios de la flash se hundieron; Everpure creció en 2020 y 2023 con márgenes débiles. Hoy la combinación de NAND cara y pedidos de IA se parece a un pico de ciclo.' },
      regulacion: 'Pocas normas sectoriales: controles de exportación de tecnología y cifrado de EE. UU., aranceles sobre componentes fabricados en Asia (incluida China) y normas de residencia y protección de datos que favorecen el almacenamiento en las propias instalaciones [B1]. La empresa avisa de que los cambios rápidos de política comercial desde 2025 pueden encarecer componentes [A1].',
      tendencias: 'La IA convierte el almacenamiento en un cuello de botella del centro de datos (energía y espacio por terabyte), lo que favorece la flash densa de Everpure frente a los discos duros [B1, B9]. Everpure se reposiciona como «gestión de datos» (Data Intelligence, Data Stream, compra de 1touch) para no ser solo un proveedor de cajas [B9, A4]. El riesgo es que los hiperescaladores, que ya diseñan sus equipos, internalicen también el software.',
    },
    competencia: {
      posicion: 'Uno de los cinco mayores en almacenamiento externo empresarial y el que más rápido crece según IDC (con Huawei) [B4]; cuota estimada del 11,1 % (estimación propia: ingresos de FY2026 sobre el mercado de IDC de 2025, que incluye solo cabinas, así que la cifra mezcla perímetros) [B2]. Líder del cuadrante de Gartner en almacenamiento empresarial dos años seguidos [B9].',
      foso: {
        veredicto: 'Estrecho', tendencia: 'Se amplía',
        fuentes: [
          { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'Sin efectos de red: cada cliente compra su propio equipo.' },
          { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Evergreen ata al cliente a la base instalada y la suscripción crece ≥15 % al año; migrar datos es caro [A1].' },
          { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'DirectFlash y Purity: la regalía de los hiperescaladores paga por esa tecnología [B1].' },
          { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Más densidad y menos energía por terabyte, pero compra la flash al mismo precio que los rivales [A3].' },
          { fuente: 'Escala eficiente', puntuacion: 1, evidencia: 'Dell y HPE son mucho mayores y empaquetan el almacenamiento con servidores [B6, B7].' },
        ],
      },
      amenazas: 'Tres: que Dell y HPE regalen almacenamiento dentro de sus paquetes de servidores de IA (probabilidad media); que los hiperescaladores reduzcan la regalía o internalicen el diseño cuando el volumen sea grande (media, a 3-5 años); y que la flash barata vuelva y haga caer el ingreso por unidad (alta en un ciclo normal). El foso es de producto y de base instalada, no de coste: el margen operativo GAAP del 3 % no lo demuestra todavía.',
    },
    financieros: {
      comentario: 'Los ingresos pasaron de 1.684 M USD en FY2021 a 3.663 M en FY2026 (16,8 % anual, casi todo orgánico: Portworx es la única compra relevante) y se aceleran al +37 % en el 1S FY27 por la hiperescala, la IA y las subidas de precio [A1, A3]. El margen EBITDA contable sigue bajo (6,9 % en FY2026) porque los pagos en acciones (481,7 M, 13,2 % de las ventas) y una estructura comercial pesada se comen el margen bruto del 70 % [A2]. El beneficio neto de FY2026 (188,2 M) se apoya en 109,5 M de resultado financiero (intereses de la caja y una plusvalía de una inversión), más de la mitad del beneficio antes de impuestos [A1]. Margen operativo GAAP: −15,5 % en FY2021, 3,0 % en FY2023 y 3,1 % en FY2026.',
      ajustes: 'La empresa publica un resultado operativo ajustado que suma los pagos en acciones, las cargas sociales de esas acciones y la amortización de intangibles comprados: 229,6 M USD en el 2T FY27 frente a 63,2 M en GAAP (19,4 % frente a 5,3 % de margen) [A3]. Usamos las cifras GAAP: los pagos en acciones se repiten todos los años y la empresa gasta en recompras y retenciones fiscales (613,5 M en FY2026) más que lo que generan para evitar la dilución [A2]. En FY2026 hubo una ganancia por valoración de una inversión estratégica (30,4 M en el 1S), no recurrente [A8].',
    },
    trimestres: {
      ultima_presentacion: 'En el 2T FY27 (26-ago-2026) la dirección habló de «ocho trimestres seguidos de aceleración»: ingresos de 1.185,9 M (+38 %), producto +54 % y una segunda victoria de diseño con un hiperescalador de los cinco mayores; subió la guía del año de 4.410-4.510 M a 5.030-5.070 M USD y el resultado operativo ajustado a 940-960 M [A3]. El director financiero admitió «subidas de precio históricas del sector» en el 1S: el margen bruto bajó al 68,4 % y el flujo de caja libre fue de −237,6 M por los anticipos a proveedores de flash (577 M en el trimestre) [A3]. En el 1T (27-may) el mensaje fue el mismo, pero la guía del 2T decepcionó y la acción cayó un 14,8 % ese día [D11]. Lo que la dirección no cuantifica: el margen de la regalía de hiperescala, cuánto del crecimiento es precio y cuándo se recuperan los anticipos. En la reunión con analistas del 23-sep fijó un objetivo para FY2028 de 7.000-7.300 M USD de ingresos y 1.700-1.900 M de resultado operativo ajustado [D7].',
    },
    balance: {
      otros_pasivos: 'Sin deuda financiera desde FY2026 (los convertibles se convirtieron en 2023 y el préstamo de 100 M se amortizó en el 2T FY26) y una línea de 500 M USD sin disponer hasta junio de 2030, con cláusulas habituales [A1, A3]. Los pasivos que importan son operativos: 2.521 M USD de ingresos diferidos (servicio ya cobrado que hay que prestar) y arrendamientos operativos de 225 M, que en US GAAP no van al puente [A3]. En el activo, 1.026 M USD de gastos anticipados y otros activos corrientes, casi todo anticipos a proveedores de memoria flash: una exposición a que el precio de la NAND baje antes de consumirlos [A3].',
      comentario: 'El circulante es negativo (−37 % de las ventas en FY2026) porque los clientes pagan la suscripción por adelantado: el crecimiento se financia solo [A1]. En el 1S FY27 eso cambió de signo por los anticipos a proveedores: la caja y los valores negociables bajaron de 1.547 a 1.008 M USD en seis meses [A3]. La caja neta sigue siendo holgada, pero la empresa usa ahora su balance para asegurarse la flash: si el ciclo se da la vuelta, el riesgo es de inventario y de anticipos, no de deuda.',
    },
    flujos: {
      comentario: 'Hasta FY2026 la conversión en caja fue alta: flujo operativo de 880 M USD frente a un beneficio de 188 M, por los pagos en acciones (que no son caja) y los ingresos diferidos [A2]. Pero ese flujo libre no queda para el accionista: en FY2026 se gastaron 613,5 M en recompras y retenciones fiscales de acciones de empleados, más que el flujo libre (615,8 M) [A2]. En los últimos doce meses a agosto de 2026 el flujo libre baja a ≈128 M por los anticipos de flash [A3]. El capex (264 M en FY2026, 7,2 % de las ventas) incluye equipos de Evergreen//One y de pruebas; estimamos que la mitad es mantenimiento (estimación propia).',
    },
    calidad: {
      comentario: 'Deloitte firma sin salvedades las cuentas y el control interno de FY2026 [A1]. Indicadores del motor: Altman Z de 9,89 (sin riesgo de quiebra), Piotroski F de 7 y Beneish M de −2,88 (sin señal de manipulación). Lo que pesa no es la contabilidad sino la diferencia entre lo publicado y lo ajustado: los pagos en acciones son el 13 % de las ventas y el 256 % del beneficio neto de FY2026 [A2]. El ingreso por suscripción se reconoce a lo largo del contrato y el producto al entregar; la regalía de hiperescala se reconoce cuando el hiperescalador envía sus equipos, lo que hace los trimestres más irregulares [A1]. Los anticipos a proveedores (≈700 M en el 1S FY27) y el aumento de existencias (+30 M) son el punto a vigilar [A3].',
      senales: [
        { senal: 'Pagos en acciones del 13 % de las ventas', nivel: 'Alta', comentario: '481,7 M USD en FY2026; las recompras solo compensan la dilución [A2].' },
        { senal: 'Anticipos a proveedores de flash (≈700 M en seis meses)', nivel: 'Media', comentario: 'Flujo de caja libre negativo en el 2T FY27; riesgo si baja el precio de la NAND [A3].' },
        { senal: 'Beneficio apoyado en ingresos financieros', nivel: 'Media', comentario: 'Resultado financiero de 109,5 M en FY2026, la mitad del beneficio antes de impuestos [A1].' },
      ],
    },
    rentabilidad: {
      confianza: 'Media',
      comentario: 'Con la contabilidad GAAP, Everpure todavía no crea valor: el capital invertido del motor sale negativo (la caja y los ingresos diferidos superan al patrimonio), así que el ROIC estándar no tiene sentido. Sobre el capital fijo (inmovilizado, intangibles y fondo de comercio: 901 M USD) el ROIC operativo de FY2026 es del 10,7 %, por debajo de un WACC del 13,46 % (−2,8 puntos). Con el ajustado (sumando los pagos en acciones) pasaría del 50 %, que es la cifra que circula en los proveedores (Stock Analysis da 43,9 %) [D5]; no la usamos porque los pagos en acciones son un coste recurrente. El ROE de FY2026 es del 13,7 % y viene de los intereses de la caja más que del negocio. Para FY2027e, con nuestra proyección, el ROIC sobre capital fijo subiría al ≈25 %, pero el capital incluiría además ≈1.000 M de anticipos.',
    },
    capital: {
      confianza: 'Alta',
      politica: 'Sin dividendo. Recompras continuas: el consejo amplió en FY2026 la autorización en 650 M USD y quedaban 329 M al cierre del ejercicio, sin fecha de vencimiento [A1]. Las retenciones fiscales de las acciones que se entregan a empleados (270,9 M en FY2026) son otra forma de recompra [A2]. Prioridades declaradas: invertir en crecimiento (hiperescala, IA, plataforma de datos) y compensar la dilución [A1].',
      adquisiciones: [
        { anio: 'FY2021', objetivo: 'Portworx (almacenamiento para Kubernetes)', importe: 340, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada como Portworx by Everpure; sin deterioro del fondo de comercio (365 M en FY2026) [A1].' },
        { anio: 'FY2027', objetivo: '1touch (descubrimiento y gobierno de datos)', importe: 125.3, ev_ebitda: null, financiacion: 'Caja', resultado: 'Cerrada en el 2T FY27; base de Everpure Data Intelligence; fondo de comercio +101 M [A3, A4].' },
      ],
      comentario: 'Asignadora de capital correcta pero no brillante: compra poco y caro de forma prudente, y su principal uso de caja es devolver a los empleados la dilución de las acciones que les paga. En FY2025-FY2026 recompras y retenciones (1.193 M USD) superaron el flujo libre acumulado (1.143 M), y aun así las acciones diluidas apenas bajaron de 343 a 343 M [A2]. En 2026 la empresa ha preferido usar la caja para asegurarse la flash; mientras dure el ciclo de la NAND, la recompra queda en segundo plano.',
    },
    directivos: {
      comentario: 'Giancarlo lleva nueve años y ha llevado a la empresa de pérdidas a beneficios GAAP y a la hiperescala; su credibilidad es alta en ingresos (la guía de FY2026 y FY2027 se ha subido varias veces) y baja en márgenes (diciembre de 2025: la acción cayó un 27 % en un día por el gasto) [C4, D10]. Cambio reciente de director financiero (Robbiati, junio de 2025) y de director comercial; sin plan de sucesión público para el consejero delegado, que también preside el consejo. Señal en contra: el fundador y el consejero delegado venden fuerte en 2026.',
    },
    gobierno: {
      remuneracion: 'El consejero delegado cobró 18,43 M USD en FY2026: 0,85 M de fijo, 1,57 M de variable anual y 16,01 M en acciones, casi todas ligadas a objetivos (ingresos, margen operativo ajustado y ARR de suscripción; dos pasos: primero se ganan y después vencen en varios años) [C1]. Ninguna métrica mide la rentabilidad del capital ni el beneficio GAAP: premia crecer y el margen ajustado, que excluye los pagos en acciones. En 2024 los accionistas rechazaron la remuneración (algo más del 40 % a favor) por un paquete extraordinario de 36,65 M USD; en 2025 la aprobaron con más del 73 % y en 2026 con el 88,7 % [C1, C2]. Ratio salarial de 90 a 1 [C1].',
      control_y_defensas: 'Sin accionista de control: Fidelity (14,1 %) y BlackRock (10,0 %) son los mayores; consejeros y directivos tienen el 5,1 %, sobre todo el fundador Colgrove (3,8 %) [C1]. Una acción, un voto. Defensas: consejo escalonado en tres clases con mandatos de tres años y elección por mayoría simple (pluralidad), lo que dificulta un cambio de control; presidente ejecutivo y sin consejero independiente coordinador [C1, C2]. Sin operaciones vinculadas relevantes en el proxy.',
    },
    consenso: {
      guidance: 'Guía FY2027 (26-ago-2026): ingresos de 5.030-5.070 M USD (+37-38 %) y resultado operativo ajustado de 940-960 M (+48-51 %); 3T de 1.325-1.335 M y 265-275 M [D8]. La guía inicial de febrero era de 4.300-4.400 M: se ha subido dos veces [C4]. Objetivo FY2028 de la reunión con analistas (23-sep-2026): 7.000-7.300 M de ingresos y 1.700-1.900 M de resultado operativo ajustado [D7].',
      revisiones: 'Fuerte revisión al alza en tres meses: el consenso de ventas FY2028 está ya en 7.026 M USD (en el objetivo de la empresa) y el BPA GAAP en 2,24 [D2]. Tras la reunión de septiembre y el inicio de octubre subieron objetivo Needham (a 185), Guggenheim (a 215), Evercore (a 155), Piper Sandler (a 162) y BofA (a 180) [D9]. Solo hay estimaciones completas de MarketScreener; el objetivo medio (151,11 USD con 20 analistas) se contrasta con Gotrade (≈139 USD, tabla anterior a las subidas) [D2].',
    },
    bolsa: {
      comentario: 'La acción ha ganado un 111,1 % en el año y un 53 % en doce meses frente al 17,5 % del S&P 500, con una volatilidad del 71 % [D1]. El recorrido es de montaña rusa: máximo de ≈100 USD en noviembre de 2025, −27 % el 3-dic por los márgenes, mínimo de 56,78 USD en marzo de 2026, y desde ahí +177 % hasta 157,57 USD el 13-oct gracias a la guía del 2T, el segundo hiperescalador, la entrada en el S&P 500 y el objetivo FY2028 [D1, D7, D9]. La beta semanal de dos años (2,14) es muy superior a la mensual de cinco (1,41): el riesgo ha subido con la tesis de la IA.',
      contexto: {
        movimiento: { fecha: '2026-10-15', var_1m_pct: 34.7, var_3m_pct: 89.5, var_6m_pct: 93.9, var_12m_pct: 42.1, dist_max_52s_pct: -16.2, dist_min_52s_pct: 130.7, dist_max_historico_pct: -16.2, tendencia: 'alcista', volatilidad_60d_pct: 71.0, avisos: ['P1 Subida fuerte: +35 % en un mes'] },
        movimientos_fuertes: [
          { periodo: 'dic-2025', var_pct: -27.3, causa: 'Resultados del 3T FY26: el gasto operativo subió un 23 % y la empresa dijo que reinvertiría el negocio de hiperescala en I+D y ventas; JP Morgan y Citi bajan objetivo y Susquehanna rebaja [D10].', veredicto: 'no cambia', condicion: null },
          { periodo: 'may-2026', var_pct: -14.8, causa: 'Tras el 1T FY27, la guía del 2T quedó por debajo de lo que esperaban los analistas (un día; −23,8 % en el mes hasta el 10-jun) [D11].', veredicto: 'no cambia', condicion: null },
          { periodo: 'ago-2026', var_pct: 72.8, causa: 'Segundo hiperescalador de los cinco mayores (10-ago) y resultados del 2T con la guía del año subida un 13 % [A3].', veredicto: 'no cambia', condicion: null },
          { periodo: 'oct-2026', var_pct: -16.5, causa: '−9,9 % el 14-oct y ≈−7 % el 15-oct sin noticia propia identificada: caída del S&P 500 y de los valores de IA, recogida de beneficios tras +35 % en un mes y ventas de consejeros [D12, D1].', veredicto: 'no cambia', condicion: null },
        ],
        noticias: [
          { fecha: '2026-10-13', tipo: 'directivos', hecho: 'Ventas de la dirección por 338,8 M USD en 12 meses (Colgrove 240,5 M y Giancarlo 86,4 M, con plan 10b5-1), la última el 13-oct [C3].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-10-08', tipo: 'recomendación', hecho: 'Needham sube objetivo a 185 USD y Guggenheim a 215; Evercore a 155 (5-oct) [D9].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-09-23', tipo: 'resultados', hecho: 'Reunión con analistas: objetivo FY2028 de 7.000-7.300 M USD de ingresos y 1.700-1.900 M de resultado operativo ajustado [D7].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-09-04', tipo: 'rumor', hecho: 'Entrada en el S&P 500 (anunciada el 4-sep) [D9].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-11-18', tipo: 'resultados', hecho: 'Resultados del 3T FY27 (fecha estimada por Stock Analysis; en 2025 fueron el 2-dic) [D5].', veredicto: 'no cambia', condicion: null },
        ],
        proximos_resultados: '2026-11-18',
        veredicto: 'no cambia',
        condicion: null,
        comentario: 'El precio se ha más que doblado en seis meses con la tesis de la IA y la hiperescala, y ahora corrige (−16 % desde el máximo del 13-oct) sin noticia propia. No hay colocaciones, ampliaciones ni litigios pendientes. Las ventas de la dirección son grandes pero con planes programados. Ninguna noticia cambia la conclusión, que no depende del momento: el valor intrínseco está muy por debajo del precio y la calidad no llega al umbral.',
      },
    },
    multiplos_historicos: {
      comentario: 'Everpure siempre ha cotizado a múltiplos de beneficio GAAP altísimos porque ese beneficio ha sido mínimo: PER adelantado de 115-129 veces en FY2022-FY2025 y 76 veces al cierre de FY2026. Hoy, a 66 veces el BPA FY2028e propio, está por debajo de su historia, pero esa historia no es un ancla útil: la mejora de margen que el mercado ya paga es la misma que justificaría el descuento. Excluimos FY2021 y FY2022 de la comparación de EV/EBITDA por EBITDA negativo.',
    },
    comparables: {
      criterio: 'Proveedores de almacenamiento e infraestructura de centros de datos cotizados en EE. UU.: NetApp (el más parecido), Dell y HPE (rivales directos dentro de grupos de servidores), Nutanix (infraestructura de software), Arista (infraestructura de red para IA, otro ganador de los centros de datos) y Seagate (discos duros, al que sustituye la flash). Sin VAST Data ni Huawei (no cotizan). Su PER adelantado de Stock Analysis es ajustado: no es comparable con el BPA GAAP de Everpure, por eso los comparables tienen peso 0.',
      comentario: 'Everpure cotiza a 55,5 veces el EBITDA NTM y 75,9 veces el BPA NTM, frente a una mediana de 21 veces el PER ajustado de los comparables. La prima se debe a que crece al 38 % y ellos al 5-25 %, pero su margen EBITDA contable (≈9 % LTM) es una fracción del de NetApp (28 %) o Seagate (37 %). Arista, el otro ganador de la IA en el centro de datos, cotiza a 42 veces con un margen del 44 %: Everpure pide un múltiplo de Arista sin su rentabilidad. Los valores implícitos de los múltiplos (24,62-52,39 USD) no sirven más que como suelo.',
    },
    catalizadores: {
      confianza: 'Media',
      items: [
        { fecha: 'nov-dic 2026', evento: 'Resultados del 3T FY27 (guía 1.325-1.335 M USD)', efecto: 'Prueba de la guía subida y del margen bruto con la flash cara', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: 'feb-mar 2027', evento: 'Resultados del 4T FY27 y guía FY2028', efecto: 'Confirmar el camino a 7.000-7.300 M USD', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: '2027', evento: 'Tercer hiperescalador o ampliación de los actuales', efecto: 'Valida el negocio de regalías', probabilidad: 'Media', sentido: '+' },
        { fecha: '2027', evento: 'Giro del precio de la memoria NAND', efecto: 'Menor ingreso por unidad y riesgo sobre los anticipos', probabilidad: 'Media', sentido: '−' },
        { fecha: 'continuo', evento: 'Ventas de la dirección con planes 10b5-1', efecto: 'Presión de oferta', probabilidad: 'Alta', sentido: '−' },
      ],
    },
    riesgos: {
      confianza: 'Media',
      items: [
        { riesgo: 'Precio de la flash: el ciclo de la NAND se da la vuelta', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−45 % (escenario bajista: 22,65 USD frente a 40,88)', mitigante: 'Suscripción recurrente (46 % de los ingresos)', senal: 'Margen bruto de producto por debajo del 63 % o anticipos que no bajan' },
        { riesgo: 'Concentración en dos hiperescaladores', tipo: 'Clientes', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−30 % sobre el precio de mercado', mitigante: 'Contratos plurianuales y RPO de 4.100 M USD', senal: 'Bajada de la RPO o regalías trimestrales planas' },
        { riesgo: 'Expectativas: el precio descuenta un 35,3 % de crecimiento anual', tipo: 'Valoración', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−71 % hasta el valor intrínseco', mitigante: 'Guía subida dos veces en 2026', senal: 'Guía del 3T o del FY2028 por debajo del consenso' },
        { riesgo: 'Pagos en acciones y dilución', tipo: 'Gobierno', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Recompras', senal: 'Pagos en acciones por encima del 13 % de las ventas' },
        { riesgo: 'Competencia de Dell y HPE con paquetes de IA', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−15 %', mitigante: 'Tecnología DirectFlash y Evergreen', senal: 'Cuota de IDC estancada' },
        { riesgo: 'Ventas de la dirección', tipo: 'Gobierno', probabilidad: 'Alta', impacto: 'Bajo', efecto_valor: '−5 %', mitigante: 'Planes programados', senal: 'Ventas fuera de planes 10b5-1' },
      ],
      premortem: 'Octubre de 2029: la acción vale un 40 % menos. En 2027 los fabricantes de NAND ampliaron capacidad y el precio de la flash cayó; los ingresos de producto, inflados por las subidas de 2026, se frenaron, y los ≈1.000 M USD de anticipos se consumieron a precios por encima del mercado, hundiendo el margen bruto. A la vez, el primer hiperescalador completó su despliegue y el segundo negoció una regalía menor. La empresa siguió pagando un 12 % de las ventas en acciones y el margen GAAP no pasó del 10 %. El mercado, que pagaba 66 veces un beneficio que esperaba triplicar, pasó a pagar 30 veces uno que solo se dobló. Señales que lo habrían anticipado: el margen bruto de producto (65,3 % en el 2T FY27, bajando), los anticipos a proveedores y la RPO de hiperescala.',
      ia: { exposicion: 'Alta', sentido: 'Oportunidad', efecto_valor: '+10 % sobre el valor intrínseco a 3-5 años', comentario: 'La IA es el motor de la tesis, no una amenaza: los centros de datos de IA necesitan almacenamiento rápido y denso, y la flash de Everpure ahorra energía y espacio frente a los discos duros [B9, B1]. Ya se nota en las cifras: producto +54 % y dos hiperescaladores [A3]. El riesgo de que la IA sustituya su producto es bajo: no vende trabajo que un modelo automatice. El riesgo real es de dependencia: que la demanda de IA sea cíclica (una burbuja de inversión) y que el valor lo capturen los hiperescaladores con su poder de compra. Riesgo de IA para el negocio: bajo; riesgo de expectativas ligadas a la IA: alto. Señal: pedidos y regalías de hiperescala trimestre a trimestre.' },
    },
    esg: {
      confianza: 'Baja',
      materialidad: 'El asunto material es la energía: la empresa vende menor consumo y espacio por terabyte frente a los discos duros, que es parte de su argumento ante los hiperescaladores [B1]. El segundo es la cadena de suministro de componentes, con proveedores en Asia (incluida China) y riesgo de aranceles y de minerales de conflicto (presenta el formulario SD cada año) [A1]. El tercero es la remuneración en acciones, que diluye al accionista.',
      controversias: 'Sin sanciones ni litigios relevantes en tres años en el 10-K FY2026 [A1]. La única controversia de gobierno es el rechazo de la remuneración en la junta de 2024 [C1].',
    },
    preguntas: {
      confianza: 'Media',
      items: [
        { tema: 'Hiperescala', pregunta: '¿Qué margen bruto y qué ingreso por terabyte deja la regalía de hiperescala frente a la venta de cabinas?', por_que: 'Decide si el crecimiento sube o diluye el margen GAAP.' },
        { tema: 'Precio', pregunta: '¿Qué parte del +38 % de FY2027 es subida de precio por el coste de la flash?', por_que: 'Si el precio de la NAND baja, esa parte se pierde.' },
        { tema: 'Anticipos', pregunta: '¿A qué precio y en qué plazo se consumen los ≈700 M USD adelantados a proveedores?', por_que: 'Riesgo de margen si la flash se abarata.' },
        { tema: 'Pagos en acciones', pregunta: '¿Cuándo bajarán los pagos en acciones del 12-13 % de las ventas?', por_que: 'Es la diferencia entre el margen ajustado del 19 % y el GAAP del 5 %.' },
        { tema: 'Dirección', pregunta: '¿Por qué venden el fundador y el consejero delegado tras la subida?', por_que: '338,8 M USD vendidos en 12 meses.' },
        { tema: 'Objetivo FY2028', pregunta: '¿Cuántos hiperescaladores supone el objetivo de 7.000-7.300 M USD?', por_que: 'Concentración del crecimiento.' },
      ],
    },
    sentimiento: {
      temas: [
        { tema: 'Everpure como ganador de la IA', postura: 'Alcista', peso: 'Alto', contraste: 'Las cifras lo apoyan en ventas (+38 %) y pedidos (RPO +44 %), no aún en beneficio GAAP (margen operativo del 5,3 %) [A3].' },
        { tema: 'Valoración', postura: 'Dividida', peso: 'Alto', contraste: 'El DCF inverso pide un 35,3 % anual de crecimiento: es exigente.' },
        { tema: 'Ventas de la dirección', postura: 'Bajista', peso: 'Medio', contraste: 'Ciertas: 338,8 M USD en 12 meses, con planes programados [C3].' },
        { tema: 'Volatilidad y corto plazo', postura: 'Dividida', peso: 'Medio', contraste: 'Volatilidad del 71 %; la acción cae y sube un 10 % en un día sin noticias.' },
      ],
      lectura: 'El sentimiento es de euforia que se enfría: tras doblarse en seis meses y entrar en el S&P 500, los foros pasan de «top holding» a hablar de cierre de huecos y de liquidez de salida. No anticipa ningún riesgo que el informe no recoja, pero confirma que el precio depende del flujo hacia los valores de IA más que de las cifras. Va en la misma dirección que los analistas (Comprar) y en contra de nuestra conclusión de valor.',
    },
    valoracion: {},
  },
  dcf_justificacion: {
    crecimiento: 'FY2027e fijo en la guía (5.055 M USD, +38 %), ya con dos trimestres publicados [A3]. FY2028e +32 %, por debajo del objetivo de la empresa (+39-45 %) y del consenso (7.026 M) porque parte del crecimiento de 2026 es precio de la flash [D2, D7]. Después baja: 18 %, 13 %, 10 %, 8 %, 6 % y 4,5 %. El crecimiento histórico fue del 16,8 % anual en FY2021-FY2026.',
    margenes: 'Margen EBITDA contable (después de pagos en acciones) del 10 % en FY2027e (resultado operativo ajustado de 950 M menos ≈600 M de pagos en acciones, más 175 M de amortización), 16,5 % en FY2028e y hasta el 22 % al final, frente al 6,9 % de FY2026. NetApp tiene un 28,4 % [B5]: suponemos que Everpure se acerca sin llegar, porque sus pagos en acciones son el doble.',
    inversion: 'Capex del 6,5 % de las ventas en FY2027e (7,2 % en FY2026) que baja al 4 % porque la regalía de hiperescala no necesita fábrica; amortización del 3,5 %. Circulante del −33 % al −25 % de las ventas: los ingresos diferidos pesan menos al crecer más el producto. Los anticipos a proveedores no se proyectan: los tratamos como un pico del ciclo.',
    wacc: 'Tasa libre del 5,21 % (bono a 10 años, FRED, 13-oct) [D3]; beta 1,5 entre la mensual de cinco años (1,41) y la semanal de dos (2,14) [D1]; prima del 5,5 %; sin deuda. WACC del 13,46 %. Con la prima implícita del mercado (4,20 %) el coste baja, pero no cambia la conclusión [D4].',
    terminal: 'Gordon con un 3 % (inflación más crecimiento real, por debajo de la tasa libre del 5,21 % menos medio punto). El múltiplo de salida de 18 veces EBITDA es coherente con NetApp y Dell (19,5 veces) [D6].',
  },
  puente_comentarios: {
    'FY2027e': 'Volumen 26 puntos (hiperescala, IA y Evergreen//One), precio 10 puntos (subidas para trasladar el coste de la flash, que la empresa reconoce) y 2 puntos de la compra de 1touch y la mezcla [A3].',
    'FY2028e': 'Volumen 28 puntos (segundo hiperescalador a pleno ritmo y nuevos clientes de IA), precio 2 puntos, otros 2 [D7].',
    'FY2029e': 'Volumen 16 puntos, con la hiperescala ya en una base alta; precio y mezcla 2 puntos.',
    'FY2030e': 'Volumen 12 puntos y precio 1 punto: suscripción y renovaciones.',
    'FY2031e': 'Volumen 9 puntos y precio 1 punto.',
  },
  sostenibilidad_justificacion: 'En parte. El crecimiento no necesita capital: el circulante es negativo y la regalía de hiperescala no pide fábrica, así que la prueba de reinversión del motor sale holgada. Pero la calidad que debería sostenerlo es débil en GAAP: ROIC operativo del 10,7 % frente a un WACC del 13,46 %, margen operativo del 3 % y una parte del crecimiento de FY2027 es precio de la flash. La cuota: con ventas de ≈11.000 M USD en FY2034e, Everpure necesitaría más que doblar su peso en el almacenamiento externo (33.000 M en 2025), algo que solo cuadra si la hiperescala se cuenta como mercado nuevo, cuyo tamaño no se publica; por eso el mercado final va en blanco y la prueba de cuota se hace a mano. El foso (costes de cambio, DirectFlash) es estrecho y se amplía, pero no está demostrado en márgenes.',
  dcf_lectura: 'El DCF da 40,88 USD por acción, un 71 % por debajo del precio, con un 54 % del valor en el valor terminal. El DCF inverso dice que, con nuestros márgenes, el precio de 141,49 USD descuenta un crecimiento de ingresos del 35,3 % anual en los años no fijos, frente al 13,1 % de nuestro caso base; o, mirado al revés, una rentabilidad implícita del 6,0 % anual, por debajo de la tasa libre de riesgo. Es una exigencia sin precedente en la historia de la empresa (16,8 % anual en cinco años) y en el sector (el almacenamiento externo crece un 4 %). Para cuadrar el precio harían falta a la vez un crecimiento cercano al objetivo FY2028 durante varios años y márgenes GAAP del 30 % o más, el nivel de Arista. El caso alcista (56,55 USD) tampoco se acerca.',
  narrativas: {
    Bajista: 'La NAND se abarata en 2027, la hiperescala se frena tras los primeros despliegues y el margen se queda en el 16-19 %. Ya le pasó al sector en 2023.',
    Base: 'Se cumple la guía de FY2027 y el crecimiento baja del 32 % al 4,5 % en ocho años, con margen EBITDA contable hasta el 22 %.',
    Alcista: 'Llega un tercer hiperescalador y se cumple el objetivo FY2028; el margen sube 2 puntos más.',
  },
  escenarios_comentario: 'Los tres escenarios quedan muy por debajo del precio (22,65, 40,88 y 56,55 USD): incluso el alcista pierde un 60 %. La asimetría del valor intrínseco es negativa (−0,71). El precio solo se explica con un crecimiento más largo y márgenes más altos que nuestro alcista, o con una tasa de descuento mucho menor (la del mercado de IA).',
  valoracion_comentario: 'DCF 60 % y escenarios 40 %: es el método que recoge la dependencia de los márgenes futuros. Comparables con peso 0 porque su PER es ajustado y el nuestro es GAAP; transacciones sin datos. La dispersión es enorme: los múltiplos de los comparables dan 24-52 USD, el DCF 41 y el objetivo a 12 meses de la regla ≈221. El valor intrínseco (40,62 USD) es la referencia para comprar; el objetivo a 12 meses depende de que el mercado mantenga múltiplos de 66-74 veces.',
  resumen: {
    recomendacion: 'Mantener',
    conviccion: 'Media',
    justificacion_recomendacion: null,
    horizonte: '12 meses',
    tesis: 'Everpure (antes Pure Storage) es la empresa de almacenamiento flash que más crece: ingresos +38 % en el 2T FY27, dos hiperescaladores de los cinco mayores y una guía subida dos veces en 2026 [A3]. La IA convierte el almacenamiento en un cuello de botella de energía y espacio, y su tecnología DirectFlash lo resuelve [B1].\n\nEl precio, 141,49 USD, descuenta un crecimiento del 35,3 % anual durante años con nuestros márgenes, o una rentabilidad implícita del 6,0 %; a 66 veces nuestro BPA FY2028e y 55,5 veces el EBITDA NTM, ya paga el éxito del objetivo FY2028 [D7].\n\nPara invertir hay que creer que el margen GAAP pasará del 3 % al 25-30 % y que el ciclo de la flash y la hiperescala no se darán la vuelta. Los pagos en acciones (13 % de las ventas) y un ROIC operativo por debajo del WACC dicen que la calidad aún no lo demuestra.',
    vision_diferencial: {
      mercado_descuenta: 'Que Everpure es un ganador estructural de la IA y que el beneficio GAAP se triplicará de aquí a FY2029 (consenso 3,06 USD por acción) sin que el ciclo de la flash lo estropee.',
      nuestra_vision: 'Compartimos el crecimiento (nuestro BPA FY2029e es 2,87), no el precio: con un coste de capital del 13,46 % y los pagos en acciones como coste, el negocio vale 40,62 USD.',
      por_que: 'Parte del crecimiento es precio de la NAND, la concentración en dos clientes es alta y la dirección vende.',
    },
    a_favor: [
      '**Crecimiento acelerado**: ingresos +38 % y RPO +44 % en el 2T FY27 [A3].',
      '**Hiperescala**: dos de los cinco mayores hiperescaladores con DirectFlash [B9].',
      '**Balance sin deuda**: 1.007,9 M USD de caja y valores negociables [A3].',
      '**Suscripción recurrente**: ARR de 2.100 M USD (+20 %) [A3].',
    ],
    en_contra: [
      '**Valor intrínseco muy por debajo**: 40,62 USD, un 71 % menos que el precio.',
      '**Calidad insuficiente**: ROIC operativo del 10,7 % frente a un WACC del 13,46 %.',
      '**Pagos en acciones**: 13,2 % de las ventas en FY2026 [A2].',
      '**Ventas de la dirección**: 338,8 M USD en 12 meses [C3].',
      '**Ciclo de la flash**: ≈700 M USD adelantados a proveedores en el 1S FY27 [A3].',
    ],
    que_vigilar: 'La tesis depende de que el margen bruto de producto aguante con la flash cara y de que la hiperescala siga creciendo. La señal de que no se cumple: margen bruto total por debajo del 66 %, RPO estancada o anticipos a proveedores que no bajan en dos trimestres.',
    cambiaria_recomendacion: [
      'Precio por debajo de 40,62 USD (valor intrínseco) con la calidad intacta.',
      'ROIC operativo GAAP por encima del 18,5 % (WACC + 5) durante dos ejercicios.',
      'Guía FY2028 por debajo de 6.000 M USD: rebaja del objetivo a 12 meses.',
      'Pagos en acciones por debajo del 8 % de las ventas.',
    ],
    kpis_seguimiento: [
      { kpi: 'Margen bruto GAAP', nivel_actual: '68,4 % (2T FY27)', umbral_alerta: '< 66 %', por_que: 'Coste de la flash' },
      { kpi: 'RPO', nivel_actual: '4.100 M USD (+44 %)', umbral_alerta: 'Crecimiento < 20 %', por_que: 'Pedidos futuros' },
      { kpi: 'Pagos en acciones / ventas', nivel_actual: '12,6 % (1S FY27)', umbral_alerta: '> 14 %', por_que: 'Dilución' },
      { kpi: 'Flujo de caja libre trimestral', nivel_actual: '−237,6 M USD (2T FY27)', umbral_alerta: 'Negativo dos trimestres más', por_que: 'Anticipos' },
    ],
    sintesis: '**La recomendación y por qué.** Mantener con convicción media, que en la práctica es «no comprar»: el valor intrínseco es de 40,62 USD, un 71,3 % por debajo del precio de 141,49 USD, y la calidad no llega al umbral. La regla de múltiplos da un objetivo a 12 meses de 220,26 USD (+55,7 % ponderada; +48,1 % en el base), muy por encima del objetivo medio de 20 analistas (151,11 USD), pero esa cifra sale de mantener un PER de 66-74 veces sobre un beneficio que se triplica, no de lo que vale el negocio. La convicción es media porque las dos reglas coinciden y el valor intrínseco está lejos del precio; subiría a alta si el precio bajara hacia 40,62 USD con márgenes GAAP al alza, y bajaría si el margen bruto cayera por debajo del 66 %.\n\n**El negocio.** Everpure vende almacenamiento 100 % flash a grandes empresas y, desde 2024, licencia su tecnología DirectFlash a hiperescaladores: dos de los cinco mayores ya la usan [B9]. Crece un 38 % y la RPO un 44 % [A3]. Pero en GAAP apenas gana dinero: margen operativo del 3,1 % en FY2026, pagos en acciones del 13,2 % de las ventas y un ROIC operativo del 10,7 % frente a un WACC del 13,46 % [A2]. La sostenibilidad del crecimiento es «En parte»: el crecimiento no necesita capital (circulante negativo), pero la rentabilidad que debería sostenerlo aún no existe y parte del +38 % es precio de la flash.\n\n**Finanzas.** Sin deuda y con 1.007,9 M USD de caja y valores [A3]. El flujo libre, alto hasta FY2026, se ha ido a recompras que solo compensan la dilución y, en 2026, a ≈700 M USD de anticipos a proveedores de memoria, que dejaron el flujo libre del 2T FY27 en −237,6 M [A3].\n\n**Equipo y gobierno.** Giancarlo cumple en ingresos y falla en márgenes; preside el consejo, que es escalonado y sin consejero coordinador. La dirección ha vendido 338,8 M USD en 12 meses y no ha comprado nada [C3]. La remuneración premia ingresos y margen ajustado, no la rentabilidad del capital.\n\n**Valoración.** El DCF da 40,88 USD; el precio descuenta un crecimiento del 35,3 % anual en los años no fijos frente al 13,1 % de nuestro base, o una rentabilidad implícita del 6,0 %, por debajo del bono. Ni el alcista (56,55 USD) se acerca. Nuestro BPA coincide casi con el consenso (2,87 frente a 3,06 en FY2029e): la discrepancia con el mercado es de precio, no de cifras.\n\n**Riesgos y catalizadores.** El mayor es el ciclo de la NAND: si la flash se abarata, se pierde la parte de precio del crecimiento y los anticipos se consumen caros (bajista 22,65 USD). El segundo, la concentración en dos hiperescaladores. Riesgo de IA para el negocio: bajo (la IA es su demanda, no su sustituto); riesgo de expectativas ligadas a la IA: alto. Próximos resultados estimados para el 18-nov-2026. Los foros pasan de la euforia a la recogida de beneficios.\n\n**Qué cambiaría la decisión.** Comprar por debajo de 40,62 USD (límite robusto 40,61) si además el ROIC operativo supera el 18,5 %; vender por encima de 244,73 USD. Lo que haría revisar la tesis: guía FY2028 por debajo de 6.000 M USD, pagos en acciones por debajo del 8 % de las ventas o un tercer hiperescalador.',
  },
};
