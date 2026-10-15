// Textos del analista (ABB, corte 2026-10-15). Las cifras del motor se copian de calc tras el último cálculo.
// Citas: [A3] = fuente 3 de A.json, [B2] de B.json, [P1] fuente propia.
export default {
  fuentes: [
    { id: 1, titulo: 'ABB Ltd Q2 profit, orders climb; sees growth in Q3, lifts FY26 revenue view', editor: 'RTTNews', tipo: 'Prensa', fecha: '2026-07-16', url: 'https://www.rttnews.com/3667421/abb-ltd-q2-profit-orders-climb-sees-growth-in-q3-lifts-fy26-revenue-view.aspx' },
  ],
  limitaciones: 'Línea cotizada: acción nominativa ABBN en la SIX (también cotiza en Nasdaq Estocolmo y como ADR fuera de mercado, ABBNY). Las cuentas se publican en USD (US GAAP) y la acción cotiza en CHF: todo el informe va en USD y el precio se convierte al cambio del BCE del 15-oct-2026 (1,2045 USD por CHF) [D6]. Precio: cierre del 15-oct-2026, 76,20 CHF (91,78 USD) [D1]. Cuentas 2019-2023 del XBRL de los 20-F presentados a la SEC hasta 2023 [A4] (grupo publicado entonces, con Robotics y con las plusvalías de las ventas de Power Grids y Dodge en el beneficio); 2024-2025 de la información financiera del 4T25 [A3], ya sin Robotics (actividades interrumpidas): los dos tramos no son comparables y se marca como cambio de perímetro. El informe financiero anual 2025 (con la memoria completa) no se pudo descargar (403): vencimientos de la deuda y proveedores de 2019-2023 quedan sin dato. La caja de 2024-2025 suma los valores negociables; la de 2019-2023, solo efectivo. Arrendamientos operativos (US GAAP) dentro del EBITDA y fuera de la deuda. El valor no incluye Rotork (oferta pendiente, ≈5.500 M) ni su aportación; sí los ≈4.800 M netos que se esperan de la venta de Robotics (otros ajustes).',
  controles_explicados: [
    { control: 'BAI − impuestos − minoritarios = beneficio neto (2019)', explicacion: 'El beneficio neto de 2019 incluye el resultado de actividades interrumpidas (Power Grids), que no pasa por el BAI de las continuadas [A4].' },
    { control: 'BAI − impuestos − minoritarios = beneficio neto (2020)', explicacion: 'El beneficio de 2020 incluye la plusvalía de la venta del 80,1 % de Power Grids a Hitachi en actividades interrumpidas [A4].' },
    { control: 'BAI − impuestos − minoritarios = beneficio neto (2021)', explicacion: 'Actividades interrumpidas (Turbocharging y restos de Power Grids) fuera del BAI [A4].' },
    { control: 'BAI − impuestos − minoritarios = beneficio neto (2022)', explicacion: 'Actividades interrumpidas (Turbocharging escindida como Accelleron) fuera del BAI [A4].' },
    { control: 'BAI − impuestos − minoritarios = beneficio neto (2023)', explicacion: 'Resultado de actividades interrumpidas fuera del BAI [A4].' },
    { control: 'Veredicto de sostenibilidad del analista', explicacion: 'El histórico de ingresos del motor (2,9 % anual) mezcla perímetros: ABB vendió Power Grids (2020), Dodge (2021), Turbocharging (2022) y Robotics (2025-26). El crecimiento comparable fue del 7 % en 2025 y del 12 % en el 1S26, con una cartera de 30.007 M (+27 %) [A1, A2]; el crecimiento financiable bruto (7,0 %) cubre casi todo el proyectado (7,1 %).' },
    { control: 'Al menos 3 transacciones', explicacion: 'Solo dos operaciones del sector con múltiplo publicado y comprobado (Rotork y Robotics); pesan 0 en el valor.' },
  ],
  huecos: [
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) Día del inversor de ABB 2025 (sin cuotas); 2) informes anuales de Schneider y Siemens (no publican cuota del mercado conjunto); 3) estudios de mercado (de pago)', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe integrado 2025 (403); 2) páginas de MSCI y Sustainalytics (requieren registro); 3) prensa', decision: 'Omitido' },
  ],
  per_historico: {
    base: 'adelantado', actual: 28.2, mediana_5a: 21.9, minimo_5a: 15.1, media_larga: 21.2,
    excluidos: 'Historia adelantada en USD (cierre de cada año en CHF pasado a USD con el cambio de fin de año ÷ BPA real del año siguiente): 2022 15,1x (30,36 ÷ 2,01); 2023 22,1x (44,38 ÷ 2,01 de actividades continuadas de 2024); 2024 21,7x (54,13 ÷ 2,50 continuadas de 2025); 2025 25,8x (74,90 ÷ 2,90, nuestro BPA de 2026e sin la plusvalía de Robotics). Fuera 2018-2021: el BPA de 2019-2022 lleva las plusvalías y pérdidas de las ventas de Power Grids, Dodge y Turbocharging (2,43 en 2020 con Power Grids; 1,30 en 2022). Actual: 91,78 ÷ 3,25 (nuestro BPA de 2027e) = 28,2x.',
    v2: { mediana_5a: 25.2, minimo_5a: 22.1, media_larga: 25.6, excluidos: 'Historia al cierre (precio ÷ BPA del mismo año, USD): 2022 23,4x; 2023 22,1x; 2024 26,9x; 2025 30,0x (BPA continuados en 2024-2025).' },
  },
  casos_12m: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 2.90, multiplo: null, precio: null, justificacion: 'Los centros de datos frenan su inversión en 2027 y las redes no compensan: ventas +5 % en 2027 y +4 % en 2028, margen EBITDA 2,5 puntos por debajo del base (19,3 %), como en 2019-2020; el mercado vuelve a pagar a ABB como a un industrial cíclico (15x, su mínimo de 2022).' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 3.59, multiplo: null, precio: null, justificacion: 'La cartera de 30.000 M se convierte en ventas: +9 % en 2027 y +8 % en 2028 y margen EBITDA del 21,8 % (EBITA operativo cerca del 21 %, dentro del objetivo de 18-22 %); impuestos del 25 %, ≈1.800 M de acciones tras la recompra anunciada.' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 3.95, multiplo: null, precio: null, justificacion: 'Los centros de datos y la red siguen pidiendo a ritmo de 2026: ventas +11,5 % y +10,5 % y margen un punto mejor (22,8 %) por volumen y precio.' },
  ],
  diferencia_consenso: 'Nuestro BPA de 2028e (3,59) queda un 10 % por debajo del consenso (4,00) y nuestro precio base (91,90) un 9,0 % bajo el objetivo medio (101,03) [D2, D3]. Tres razones: el consenso de MarketScreener mezcla BPA operativo y publicado y probablemente ya suma Rotork; nosotros usamos el BPA publicado (después de amortización de compras, reestructuración y partidas no operativas, ≈1,5-2 puntos de margen); y proyectamos ventas de 44.777 M en 2028 frente a 46.266 M. El múltiplo pesa más que el BPA: la regla no supone que ABB conserve 28x.',
  media_12m: 78.94,
  objetivo_comentario: 'El objetivo a 12 meses (82,18 USD, 68,23 CHF) queda muy por encima del valor intrínseco (52,98 USD) porque el mercado paga hoy 28x el BPA de 2027 y la regla supone que en un año pagará algo menos (25,6x), no el valor del DCF. La distancia entre los dos (55 %) es la prima que el mercado da a la electrificación y a los centros de datos frente a un coste de capital del 10,6 %: cerrarla exige años de crecimiento por encima del 10 %, no un catalizador concreto. La tesis de valor, si la hay, es a varios años; a 12 meses la acción ya descuenta lo bueno.',
  valoracion_comentario: 'Pesos: DCF 50 %, escenarios 30 % y comparables 20 %. El DCF es el método central porque ABB tiene cartera, márgenes y capital invertido estables, pero con la tasa libre de EE. UU. al 5,21 % y una beta de 1,05 descuenta al 10,64 % y deja el valor en 47,22 USD; los comparables (PER de los próximos 12 meses, 74-88 USD) recogen la prima que el sector cobra hoy y por eso pesan algo. Las transacciones pesan 0 (dos operaciones). La dispersión es la conclusión: el DCF vale la mitad del precio y los múltiplos del sector dicen que ABB cotiza con una prima del 10-15 % sobre sus pares. Con la prima implícita del mercado (4,2 %) el valor sube a 60,42 USD, todavía un 34,2 % bajo el precio.',
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Sí. ABB rinde un 26,1 % sobre su capital invertido (2025) y crece sin apenas inversión neta: el capex del 3,0 % de las ventas financia un crecimiento bruto del 7,0 % frente al 7,1 % proyectado. El crecimiento no depende de ganar cuota: sale de una cartera de 30.007 M (+27 %, relación pedidos/ventas de 1,28) y de mercados que la propia ABB ve crecer más del 10 % en centros de datos y 5-10 % en redes y edificios [A1, B1]. El poder de precios está demostrado (precio cerca del +2 % en el 2T26 con subidas de materias primas y aranceles) [A1]. El motor marca «En parte» porque el histórico de ingresos (2,9 %) mezcla cuatro ventas de negocios; el comparable fue del 7 % en 2025.',
  puente_comentarios: {
    '2026e': 'Guía: crecimiento comparable de dos cifras bajas (+12 % en el 1S26), precio cerca del +2 %, divisa +2-3 % y compras pequeñas +1 % [A1].',
    '2027e': 'Conversión de la cartera (30.007 M a jun-26) y mercados de centros de datos y redes; precio en línea con la inflación [A1, B1].',
    '2028e': 'Vuelta hacia el objetivo de crecimiento comparable de 5-7 % más 1-2 % de compras pequeñas [A5].',
    '2029e': 'Objetivo a lo largo del ciclo: 5-7 % comparable [A5].',
    '2030e': 'Mercados maduros (3-5 % a largo plazo según ABB) [B1].',
  },
  dcf_justificacion: {
    crecimiento: 'Ventas +14,5 % en 2026e (fijo: dos trimestres publicados, +16 % en el 1S26 con +12 % comparable, guía elevada en abril y julio) [A1, A7]; +9 % en 2027e, +8 % en 2028e y bajada hasta el 3,5 % en 2033e. El objetivo de la empresa es 5-7 % comparable más 1-2 % de compras a lo largo del ciclo [A5]; los primeros años van por encima por la cartera de 30.007 M (+27 %) [A1]. El consenso espera +11,7 % en 2027 y +8,6 % en 2028 [D2]: estamos algo por debajo en 2027.',
    margenes: 'EBITDA publicado del 21,0 % en 2026e (20,8 % en el 1S26 con la plusvalía inmobiliaria de 377 M y 100 M de provisiones) [A1], hasta el 22,0 % desde 2029e. Equivale a un EBITA operativo del 21-22 %, dentro del objetivo de 18-22 % [A5] y por debajo del 24,9 % que ya da Electrification [A1]. El consenso llega al 22,5 % en 2028 [D2].',
    inversion: 'Capex del 3,0-3,1 % de las ventas en 2026e-2030e (3,0 % en 2025 con la ampliación de capacidad; 200 M en media tensión en Europa en tres años) [A1, A3] y 2,8 % al final, por encima de la amortización (2,4 %). Circulante comercial (existencias + clientes + activos de contrato − proveedores − pasivos de contrato) del 17 % de las ventas, como en 2025 (18,2 %), aunque la empresa lo baja con anticipos de clientes [A1].',
    wacc: 'Flujos en USD: tasa libre del bono a 10 años de EE. UU., 5,21 % [D5]; beta 1,05 entre la mensual de 5 años (1,11), la semanal de 5 años (1,01) y la de 2 años (0,71) frente al SMI [D1]; prima de mercado 5,5 %; deuda al 5,5 % antes de impuestos con un peso del 5 % (deuda neta casi nula). WACC del 10,64 %. Con la prima implícita del mercado (4,2 %) baja al 9,35 % [D4]. La tasa libre alta es lo que más pesa en el valor: es diferencia de tasa, no de cifras.',
    terminal: 'Gordon con un crecimiento del 3,0 % en USD (1-1,5 % real más inflación), por debajo de la tasa libre menos medio punto. El valor terminal es el 61 % del valor. En negocios con poca inversión, Gordon implica un múltiplo del NOPAT de ≈1/(WACC − g), unas 13 veces, muy por debajo de las 25-28 veces a las que cotiza ABB: es el punto donde discrepamos del mercado.',
  },
  dcf_lectura: 'El DCF da 47,22 USD por acción, un 48,6 % bajo el precio, con el 61 % del valor en el terminal. El DCF inverso es la lectura central: para justificar 91,78 USD con nuestro WACC, las ventas tendrían que crecer un 22,3 % al año en 2027e-2033e (nuestro base: 6,1 %), o el margen EBITDA subir al 39,6 % (base 22,0 %). Dicho de otro modo, a este precio el accionista se queda con una rentabilidad implícita del 6,9 % anual frente a un coste de capital del 10,6 % y al 9,3 % que pide el mercado. Es exigente: ABB nunca ha crecido así y su objetivo es del 6-9 % con compras. El mercado está tratando la demanda de centros de datos y redes como un crecimiento de muchos años a tipos bajos; con el bono de EE. UU. al 5,2 %, eso solo se sostiene si el crecimiento dura una década.',
  narrativas: {
    Bajista: 'La inversión en centros de datos se frena en 2027 (como el recorte de alquileres de Microsoft que hundió al sector en febrero de 2025) y la cartera se vacía; el crecimiento cae 4 puntos al año y el margen vuelve 2,5 puntos atrás, al nivel de 2023.',
    Base: 'La cartera de 30.000 M se ejecuta, el crecimiento converge al objetivo de 5-7 % comparable y el margen se estabiliza en el 22 % de EBITDA.',
    Alcista: 'La demanda eléctrica de centros de datos, redes y edificios sigue acelerando: 2,5 puntos más de crecimiento y un punto más de margen cada año.',
  },
  escenarios_comentario: 'Los tres escenarios quedan bajo el precio con nuestro WACC: 31,78 (bajista), 47,22 (base) y 55,29 USD (alcista). Ni el alcista justifica la cotización: lo que el precio descuenta no es un escenario de negocio más optimista, sino una tasa de descuento más baja. A 12 meses la asimetría es de 0,19: el alcista (+11,5 %) gana poco frente a lo que pierde el bajista (−51 %), porque el bajista vuelve al PER de 15x de 2022.',
  secciones: {
    historia: {
      resumen: 'ABB nace en 1988 de la fusión de la sueca ASEA (1883) y la suiza Brown Boveri (1891). Tras crecer comprando, la crisis del amianto de Combustion Engineering la llevó al borde de la quiebra en 2002. Desde 2019 ha reducido la empresa a electrificación y automatización: vendió Power Grids a Hitachi (2020), Dodge (2021), escindió Turbocharging como Accelleron (2022) y en octubre de 2025 acordó vender Robotics a SoftBank por 5.375 M USD [A2, A4]. Con Morten Wierod como consejero delegado desde 2024 y un modelo descentralizado («ABB Way»), el margen EBITA operativo ha pasado del 18,2 % al 19,0 % en 2025 y al 21,8 % en el 1S26 [A1, A2]. En julio de 2026 ofreció 5.500 M USD por Rotork, su mayor compra [A1].',
      hitos: [
        { anio: '1988', hito: 'Fusión de ASEA y BBC Brown Boveri.' },
        { anio: '2002', hito: 'Crisis del amianto de Combustion Engineering; casi quiebra.' },
        { anio: '2017', hito: 'Compra de B&R (automatización de máquinas) y del negocio de instalación de GE Industrial Solutions.' },
        { anio: '2020', hito: 'Venta del 80,1 % de Power Grids a Hitachi [A4].' },
        { anio: '2021', hito: 'Venta de Dodge (transmisión mecánica) y del resto de Hitachi Energy [A4].' },
        { anio: '2022', hito: 'Escisión de Turbocharging como Accelleron.' },
        { anio: '2024', hito: 'Morten Wierod sustituye a Björn Rosengren como consejero delegado [C1].' },
        { anio: '2025', hito: 'Venta de Robotics a SoftBank (5.375 M USD) y nuevos objetivos: margen 18-22 %, ROCE >20 % [A2, A5].' },
        { anio: '2026', hito: 'Oferta por Rotork (≈5.500 M USD, 503 peniques por acción) [A1].' },
      ],
      confianza: 'Media',
    },
    negocio: {
      descripcion: 'ABB fabrica y vende los equipos que llevan la electricidad desde la red hasta el consumo y los que controlan las máquinas y las plantas. Electrification (52 % de las ventas de 2025: 17.357 M) vende interruptores, cuadros, celdas de media tensión, sistemas de alimentación ininterrumpida, material de instalación y gestión de edificios; Motion (25 %: 8.247 M) vende motores, variadores, tracción ferroviaria y condensadores síncronos para estabilizar la red; Automation (24 %: 8.084 M) vende sistemas de control de procesos, electrificación de barcos y puertos, y control de máquinas (B&R) [A3]. Clientes: centros de datos, compañías eléctricas, edificios, industria de procesos, transporte y fabricantes de máquinas, a través de distribuidores, integradores y venta directa. Vende en más de 100 países; EE. UU. es el 29 % y China el 11 % [A3].',
      como_gana_dinero: 'Margen bruto del 41,1 % en 2025 [A3]. La mayor parte son productos de ciclo corto (catálogo vendido por distribuidores) con márgenes altos; el resto son proyectos (celdas, sistemas de control, propulsión) que llenan la cartera y servicios (17 % de las ventas: 5.551 M) recurrentes sobre la base instalada [A3]. El margen depende del volumen (apalancamiento operativo: el EBITA operativo subió un 20 % con ventas +14 % en el 2T26), del precio (≈+2 %) y del coste del cobre, la plata y los aranceles [A1]. Electrification gana un 24,9 % de EBITA operativo, Motion un 18,5 % y Automation un 15,4 % [A1]. Poca estacionalidad; el cuarto trimestre trae más proyectos.',
      clientes: 'Sin concentración relevante: miles de clientes y distribuidores; ningún cliente se menciona como significativo en las cuentas [A3]. El poder de precios está probado: en 2022-2023 subió precios por encima de la inflación de costes y el margen bruto pasó del 39,2 % (2024) al 41,1 % (2025) [A3]; en el 2T26 el precio aportó cerca de un 2 % pese a la subida de materias primas y aranceles [A1]. La cartera de pedidos (30.007 M a jun-26) cubre casi diez meses de ventas y crece un 27 % [A1]. Los pedidos de centros de datos crecieron a tres cifras en Electrification en el 2T26; los de compañías eléctricas se mantuvieron [A1].',
    },
    sector: {
      definicion: 'El mercado relevante es el de equipos eléctricos de baja y media tensión, motores y variadores y automatización de procesos, en todo el mundo. No hay una cifra pública fiable del tamaño conjunto: usamos las previsiones de crecimiento por segmento de la propia ABB (más de 10 % en centros de datos, 5-10 % en redes y edificios y 3-5 % en industria a largo plazo) [B1].',
      drivers: [
        { driver: 'Centros de datos e IA', efecto: '+', horizonte: 'Estructural', evidencia: 'Pedidos de centros de datos a tres cifras en el 2T26; 12 % de las ventas de Electrification en 2024 [A1, B1].' },
        { driver: 'Inversión en redes eléctricas', efecto: '+', horizonte: 'Estructural', evidencia: 'Compañías eléctricas y renovables: 20 % de las ventas de Electrification en 2024; pedidos estables en el 2T26 sobre una base alta y necesidad de inversión «tangible» por activos envejecidos [B1, A1].' },
        { driver: 'Electrificación de edificios e industria', efecto: '+', horizonte: 'Estructural', evidencia: 'Edificios: 34 % de las ventas de Electrification; demanda eléctrica de edificios +95 % hasta 2050 según ABB [B1].' },
        { driver: 'Industria de procesos (química, papel, minería)', efecto: '−', horizonte: 'Cíclico', evidencia: 'Demanda floja en papel, química y minería en el 1S26 [A1].' },
        { driver: 'Tipos de interés y vivienda', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Debilidad en edificios residenciales en el 2T26 [A1].' },
      ],
      porter: [
        { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Cuatro o cinco grandes (Schneider, Siemens, Eaton, ABB, Legrand) con márgenes operativos del 15-22 % [B4].' },
        { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Clientes fragmentados; los hiperescaladores negocian fuerte pero hoy falta capacidad [A1].' },
        { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Cobre, plata y acero; presión de precio frente a coste en Electrification en el 2T26 [A1].' },
        { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Certificaciones, base instalada y redes de distribución; los chinos ganan en media tensión fuera de Occidente.' },
        { fuerza: 'Amenaza de sustitutos', intensidad: 1, justificacion: 'No hay sustituto para distribuir y proteger la electricidad; la corriente continua en centros de datos es una oportunidad que ABB ya vende [D10].' },
      ],
      ciclo: { posicion: 'Expansión', comentario: 'Pedidos en máximos (+30 % en el 2T26), relación pedidos/ventas de 1,27 y cartera +27 % [A1]: el sector está en la parte alta. En 2009 y 2020 los pedidos de ABB cayeron con la industria; en 2022 la cartera aguantó y la acción cayó un 16 % por los tipos [D1]. La dirección dice no ver pedidos adelantados [A1].' },
      regulacion: 'Normas de eficiencia de motores (IE3-IE5 en la UE), códigos eléctricos, eliminación del SF6 en media tensión en la UE (reglamento de gases fluorados de 2024) y aranceles de EE. UU. sobre importaciones, que ABB compensa con precio y fabricación local [A1]. Los subsidios a redes y a la industria en EE. UU. y la UE empujan la demanda.',
      tendencias: 'Más electricidad (centros de datos, bombas de calor, vehículo eléctrico, relocalización industrial) y más automatización. ABB gana: lanza sistemas de corriente continua para centros de datos de alta potencia (septiembre de 2026), alimentación ininterrumpida de media tensión (HiPerGuard) y condensadores síncronos para estabilizar la red [A1, D10]. Pierde peso en robótica (la vende) y está menos expuesta que Siemens al software industrial.',
    },
    competencia: {
      cuota_pct: null,
      posicion: 'N.º 2 mundial en electrificación tras Schneider y n.º 1 en motores y variadores; entre los tres primeros en sistemas de control de procesos (con Emerson, Honeywell y Siemens).',
      foso: {
        veredicto: 'Amplio', tendencia: 'Estable',
        fuentes: [
          { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Poco: algo de ecosistema en software de gestión de energía.' },
          { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Equipos certificados dentro de instalaciones que duran 20-30 años; los servicios son el 17 % de las ventas [A3].' },
          { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Marca y certificaciones; I+D del 4 % de las ventas (1.318 M) [A3].' },
          { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Escala en compras y fábricas locales; margen bruto 41,1 % [A3].' },
          { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Cinco grandes reparten el mercado; ROIC del 26,1 % en 2025, muy por encima del WACC.' },
        ],
      },
      amenazas: 'Fabricantes chinos de media tensión e interruptores con precios bajos fuera de Occidente; Schneider y Eaton en centros de datos de EE. UU.; un frenazo de la inversión en IA que deje capacidad ociosa (probabilidad media en 2-3 años); y la subida del cobre si no se traslada al precio (Electrification ya perdió 140 pb de margen bruto en el 2T26) [A1].',
    },
    financieros: {
      comentario: 'Ventas de actividades continuadas de 30.583 M en 2024 y 33.220 M en 2025 (+9 %, +7 % comparable) [A3]; en el 1S26, 18.209 M (+16 %, +12 % comparable) [A1]. El margen bruto subió 190 pb en 2025 (41,1 %) por precio, volumen y productividad; el EBITA operativo pasó del 18,2 % al 19,0 % y al 21,8 % en el 1S26 (20,2 % sin la plusvalía inmobiliaria del 1T) [A1, A2]. El resultado de explotación publicado (6.047 M, 18,2 %) se beneficia en 2025 de diferencias de cambio y de 140 M de una venta inmobiliaria [A2]. Los años 2019-2023 son del grupo antiguo y llevan plusvalías y pérdidas de ventas de negocios: no son comparables con 2024-2025.',
      ajustes: 'ABB publica un «EBITA operativo» que excluye la amortización de intangibles comprados (≈195 M en 2026), reestructuración (≈200 M), costes de separación de Robotics, partidas no operativas y la valoración a mercado de derivados de divisa y materias primas [A1]. Usamos el resultado publicado. En el 1S26 hay una plusvalía inmobiliaria de 377 M (no recurrente, restada del EBITDA de los últimos 12 meses) y ≈100 M de provisiones por reclamaciones heredadas [A1].',
    },
    trimestres: {
      ultima_presentacion: 'En el 2T26 (16-jul) ABB batió en EBITA operativo (1.925 M, +20 %) y pedidos (12.042 M, +30 %), elevó la guía anual a crecimiento comparable de dos cifras bajas (low double-digit to low-teens) y anunció Rotork [A1, P1]. El BPA publicado (0,68 USD) se quedó por debajo de lo esperado por derivados, provisiones heredadas y un ajuste de valor de una participada [A1]. La dirección insistió en que no ve pedidos adelantados en Electrification (+60 % de pedidos, centros de datos a tres cifras) y en que la presión de precio frente a coste por las materias primas es temporal [A1]. Las preguntas se centraron en el precio de Rotork (≈20 veces el EBITDA según Bernstein) y en el margen de Motion (−130 pb por Gamesa y tracción) [D8]. Frente al 1T26 (+11 % comparable, guía de un dígito alto a dos cifras bajas) [A7], el discurso pasa a «dos cifras», y de recompras a compras. Para el 3T26 (20-oct) espera crecimiento comparable de dos cifras bajas a medias y mejora secuencial del margen [A1].',
    },
    balance: {
      otros_pasivos: 'Provisiones de 1.477 M a corto (garantías, contratos, litigios) y reclamaciones heredadas: ≈100 M nuevos en el 2T26 y un proyecto no estratégico de ≈100 M con litigio en curso [A1, A3]. Pensiones con superávit neto (activos de 937 M frente a pasivos de 550 M en 2025) [A3]. Arrendamientos operativos de 786 M (US GAAP: dentro del EBITDA, fuera del puente). Compromisos: Rotork (≈5.500 M en efectivo, 1S27), a pagar con los ≈4.800 M netos de Robotics y la caja [A1]. Sin covenants relevantes conocidos.',
      comentario: 'Deuda neta de 2.320 M a 30-jun-2026 (0,3 veces el EBITDA), frente a 1.683 M en diciembre, tras pagar 1.907 M de dividendo y recomprar acciones [A1, A3]. El circulante comercial medio bajó del 14,3 % de las ventas (2024) al 11,9 % (jun-26) por los anticipos de clientes, que crecen con la cartera [A1]. Tras cobrar Robotics y pagar Rotork, la deuda neta quedará cerca de 3.000 M, menos de 0,5 veces el EBITDA.',
    },
    flujos: {
      comentario: 'Flujo operativo de actividades continuadas de 5.250 M en 2025 (4.442 M en 2024) y flujo de caja libre de 4.566 M, un 96 % del beneficio neto [A2, A3]; en el 1S26, 2.131 M (+42 %) [A1]. La conversión supera el objetivo del 95 % [A5]. El capex subió a 1.001 M (3,0 % de las ventas) por la ampliación de capacidad; ABB no separa mantenimiento y crecimiento: estimación propia, ≈2,4 % de mantenimiento (la amortización) y el resto, capacidad. Usos de la caja en 2025: dividendos 2.021 M, recompras 1.499 M y compras 752 M [A3]. Los años 2019-2022 tienen flujos operativos bajos (1.287-3.330 M) por los cambios de perímetro y el circulante.',
    },
    calidad: {
      auditor: null, anios_auditor: null, opinion: null,
      comentario: 'Cuentas en US GAAP; el informe financiero anual 2025 (con el informe del auditor) no se pudo descargar (403): auditor y opinión quedan sin comprobar en este informe. Puntos revisados: (1) el resultado de explotación incluye la valoración a mercado de derivados de divisa y materias primas (±60-300 M al año), que la empresa excluye de su EBITA operativo [A1, A3]; (2) las plusvalías inmobiliarias de 2025 (140 M) y 2026 (377 M) entran en el EBITA operativo, lo que infla el margen del 1S26 en unos 2 puntos [A1, A2]; (3) provisiones por reclamaciones heredadas recurrentes (≈100 M en el 2T26) [A1]; (4) pagos en acciones pequeños. Indicadores del motor: Altman Z de 5,68 (lejos de riesgo), Piotroski F de 7 sobre 9 y Beneish M de −2,54 (por debajo de −1,78: sin señal de manipulación). El fondo de comercio (9.637 M) es el 53 % del capital invertido.',
      senales: [
        { senal: 'Plusvalías inmobiliarias dentro del EBITA operativo', nivel: 'Media', comentario: '377 M en el 1T26 y 140 M en 2025: el margen del 1S26 sin ellas es 20,0 %, no 21,8 % [A1, A2].' },
        { senal: 'Reclamaciones heredadas recurrentes', nivel: 'Baja', comentario: '≈100 M en el 2T26 y un proyecto de ≈100 M en litigio [A1].' },
        { senal: 'Derivados a valor de mercado en la cuenta', nivel: 'Baja', comentario: 'Mueven el margen bruto ±50-150 pb por trimestre [A1].' },
      ],
      confianza: 'Media',
    },
    rentabilidad: {
      comentario: 'ABB crea valor con holgura: ROIC del 26,1 % en 2025 (20,9 % en 2024 y 22,6 % en 2023) frente a un WACC del 10,64 %, 15,5 puntos por encima; sin el fondo de comercio, más del 50 %. La empresa da un ROCE del 28,4 % a jun-26 [A1]. La mejora viene del margen (NOPAT del 13,6 % de las ventas en 2025 frente al 11,7 % en 2024), no de la rotación, que se mantiene cerca de 0,8. El ROIC incremental de 2024-2025 es muy alto porque el capital invertido apenas creció (17.133 a 17.300 M) mientras el NOPAT subía un 26 %. Frente a sus pares, ABB está arriba: Schneider y Siemens tienen más fondo de comercio y márgenes operativos similares o menores [B4].',
    },
    capital: {
      politica: 'Prioridades declaradas: inversión orgánica (I+D del 4,5-5,0 % de las ventas), dividendo creciente y sostenible (0,94 CHF por 2025, +4 %), compras pequeñas de 1-2 % de ventas al año y grandes cuando encajen, y devolver el exceso de caja con recompras, manteniendo un rating de grado de inversión fuerte [A5]. Recompra de hasta 2.000 M USD lanzada el 9-feb-2026 (147 M en el 2T26) [A1]. Amortiza las acciones recompradas (20,7 M en abril de 2026) [A1].',
      comentario: 'La asignación de capital ha sido buena: vendió negocios de menor rentabilidad (Power Grids, Dodge, Turbocharging, Robotics) a buenos precios y devolvió la caja (recompras de 3.000-3.700 M al año en 2020-2022) [A4]; el ROIC pasó del 22,6 % (2023) al 26,1 % (2025). El número de acciones ha bajado de 2.135 M en 2019 a 1.815 M en jun-26 [A1, A4]. La duda es Rotork: unos 20 veces el EBITDA con un 60 % de prima [D8], dilutivo el primer año según la propia ABB, en un momento en que la acción de ABB cotiza a 23 veces. Es la primera gran compra de esta dirección y el mercado la recibió con una caída del 5,9 % [D1].',
    },
    directivos: {
      comentario: 'Equipo estable y de la casa: el consejero delegado (Wierod) y el nuevo director financiero (Nilsson) llevan años en ABB y vienen de las áreas que mejor van (Motion y Electrification) [C3]. Han cumplido la guía de 2025 y la han subido en 2026, y elevaron los objetivos a medio plazo en noviembre de 2025 tras superar los anteriores [C6]. La sucesión parece ordenada (relevo anunciado del director financiero con cuatro meses de transición). El riesgo es la ejecución de Rotork, la primera gran compra de este equipo.',
    },
    gobierno: {
      remuneracion: 'El consejero delegado cobró 6,07 M CHF en 2025 (≈7,3 M USD): fijo 1,50 M, beneficios y pensión 0,86 M, variable anual 1,83 M (122 % del objetivo) y variable a largo plazo 1,88 M a valor de concesión [C1]. El variable a largo plazo mide el BPA (50 %), la rentabilidad para el accionista frente a pares (30 %) y la sostenibilidad (20 %); el anual, el EBITA operativo, el ROCE y la caja [C1]. Junta: aprobó todo en 2026, incluido el informe de remuneración consultivo [C4]. Hay recuperación del variable (clawback) y exigencia de tenencia de acciones.',
      control_y_defensas: 'Sin accionista de control: Investor AB (familia Wallenberg) tiene el 14,6 % y un consejero (Johan Forssell); UBS Fund Management el 5,0 % y BlackRock el 4,2 % según sus últimas notificaciones [C2]. Una acción, un voto; sin clases ni límites de voto. Nueve de los diez consejeros son independientes y el presidente no es ejecutivo [C1]. Sin operaciones vinculadas relevantes conocidas.',
    },
    consenso: {
      guidance: 'Guía 2026 (16-jul-2026): relación pedidos/ventas positiva, crecimiento comparable de dos cifras bajas (low double-digit to low-teens; era 6-9 % en enero y de un dígito alto a dos cifras bajas en abril) y mejora del margen EBITA operativo, también sin la plusvalía inmobiliaria del 1T; para el 3T26, crecimiento comparable de dos cifras bajas a medias y mejora secuencial del margen [A1]. Objetivos a lo largo del ciclo (día del inversor de noviembre de 2025): crecimiento comparable del 5-7 % más 1-2 % de compras, margen EBITA operativo del 18-22 %, ROCE >20 %, conversión de caja >95 % y crecimiento del BPA de al menos un dígito alto [A5].',
      revisiones: 'Solo una fuente con estimaciones completas (MarketScreener, 27 analistas): BPA de 3,85 USD en 2026 (con la plusvalía de Robotics), 3,55 en 2027 y 4,00 en 2028 [D2]; recomendación media «Mantener» y objetivo medio de 101,03 USD (80,84-116,55) [D3]. Yahoo da 3,19 USD en 2026 y 3,60 en 2027 [D7], coherente con el anterior en 2027. Las estimaciones de ventas subieron tras elevar la guía en julio; la tendencia de los objetivos en tres meses no se publica en abierto (la damos por estable).',
    },
    bolsa: {
      comentario: 'ABB ha subido un 27,9 % en un año y un 20 % anual en cinco, muy por encima del SMI (+14,5 % y +3,7 %) y del índice industrial europeo [D1]: el mercado la ha recalificado de industrial cíclico a valor de electrificación, al pasar de 15 veces el beneficio adelantado (2022) a 28 veces. Desde el máximo del 22-jun-2026 (89,14 CHF) cae un 14 %: julio restó un 12,9 % por el precio de Rotork y la recogida de beneficios [D1, D8].',
      contexto: {
        movimiento: { fecha: '2026-10-15', var_1m_pct: -2.6, var_3m_pct: -3.9, var_6m_pct: 1.0, var_12m_pct: 29.8, dist_max_52s_pct: -14.0, dist_min_52s_pct: 40.9, dist_max_historico_pct: -14.0, tendencia: 'alcista', volatilidad_60d_pct: 26, avisos: [] },
        movimientos_fuertes: [
          { periodo: 'abr-2026', var_pct: 26.1, causa: 'Resultados del 1T26 (pedidos y margen récord, plusvalía inmobiliaria) y euforia por la demanda eléctrica de los centros de datos [A1, D1].', veredicto: 'no cambia', condicion: null },
          { periodo: 'jul-2026', var_pct: -12.9, causa: 'Oferta por Rotork a ≈20 veces el EBITDA con un 60 % de prima (−5,9 % el 16-jul) y recogida de beneficios tras subir un 40 % en el año [D8, D1].', veredicto: 'no cambia', condicion: null },
        ],
        noticias: [
          { fecha: '2026-07-16', tipo: 'fusión u oferta', hecho: 'Oferta recomendada por Rotork: 503 peniques en efectivo (≈5.500 M USD), cierre previsto en el 1S27 con voto de los accionistas de Rotork y autorizaciones [A1, D8].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-07-16', tipo: 'resultados', hecho: 'Guía de 2026 elevada a crecimiento comparable de dos cifras bajas; BPA del 2T por debajo de lo esperado [A1, P1].', veredicto: 'no cambia', condicion: null },
          { fecha: '2025-10-08', tipo: 'fusión u oferta', hecho: 'Venta de Robotics a SoftBank (valor de empresa 5.375 M USD), cierre previsto en el segundo semestre de 2026 [D9].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-10-15', tipo: 'rumor', hecho: 'Caída del 3,4 % en la sesión del corte junto al sector eléctrico (también ABB India); no encontramos noticia propia de ABB [D3].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-10-20', tipo: 'resultados', hecho: 'Resultados del 3T26 el 20-oct-2026 [D11].', veredicto: 'no cambia', condicion: null },
        ],
        proximos_resultados: '2026-10-20',
        veredicto: 'no cambia',
        condicion: null,
        comentario: 'La acción sube un 29,8 % en 12 meses [D12] pero cae un 14 % desde el máximo de junio, por encima de su media de 200 sesiones (+0,7 %). Ningún movimiento viene de un deterioro del negocio: la subida de abril fue por resultados y la caída de julio por el precio de Rotork. No hay hechos pendientes que puedan mover el precio más de un 5 % en contra (sin colocaciones, ampliaciones ni decisiones judiciales con fecha; Rotork es una compra en efectivo). Los resultados del 20-oct no retrasan nada (regla 11). Veredicto: no cambia.',
      },
    },
    multiplos_historicos: {
      comentario: 'ABB cotiza a 25,4 veces el BPA de los próximos 12 meses y 23,3 veces el EBITDA de los últimos 12; su PER adelantado ha pasado de 15,1x a cierre de 2022 a 22,1x (2023), 21,7x (2024) y 25,8x (2025) en la misma base [D1, A3]. La prima frente a su historia (mediana de 21,9x) refleja el cambio de cartera (más electrificación y menos negocios cíclicos), un ROIC más alto y la demanda de centros de datos. 2019-2021 se excluyen: el BPA lleva plusvalías de ventas de negocios.',
    },
    comparables: {
      criterio: 'Ocho fabricantes cotizados de equipos eléctricos y automatización con más de 20.000 M USD de capitalización salvo Hubbell: Schneider, Siemens, Eaton y Legrand (electrificación), Hubbell (red), Rockwell y Emerson (automatización) y Vertiv (centros de datos). Fuera Hitachi (conglomerado, ejercicio a marzo) y Siemens Energy (generación). PER de los próximos 12 meses ponderando los estimados de Yahoo; EV/EBITDA de los últimos 12 meses del mismo proveedor [D7].',
      comentario: 'ABB cotiza a 25,4 veces el BPA de los próximos 12 meses frente a una mediana de 21,8 veces de sus pares, y a 23,3 veces el EBITDA frente a 20,3 [D7]. La prima se apoya en un ROIC alto y un margen de Electrification (24,9 %) por encima de Schneider o Legrand, pero ABB crece menos que Eaton o Vertiv. Con el PER de los comparables, el valor de ABB queda en 74-88 USD, un 4-19 % bajo el precio: la prima sobre sus pares ya está pagada.',
    },
    transacciones: {
      comentario: 'Las dos operaciones recientes dan referencias opuestas: SoftBank pagó 2,3 veces las ventas por Robotics, un negocio de menor margen, y ABB paga ≈20 veces el EBITDA por Rotork con un 60 % de prima [D8, D9]. ABB, con 166.000 M USD de capitalización y un 14,6 % en manos de Investor AB, no es candidata a una oferta. Las transacciones no pesan en el valor.',
    },
    catalizadores: {
      items: [
        { fecha: '20-oct-2026', evento: 'Resultados del 3T26', efecto: 'Confirmación de la guía del 3T (dos cifras bajas a medias) y del margen', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: '2S26', evento: 'Cierre de la venta de Robotics a SoftBank (≈4.800 M netos)', efecto: 'Caja para Rotork y recompras', probabilidad: 'Alta', sentido: '+' },
        { fecha: '28-ene-2027', evento: 'Resultados del 4T26 y guía de 2027', efecto: 'Primera guía con el ciclo de centros de datos en máximos', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: '1S27', evento: 'Cierre de la compra de Rotork', efecto: 'Más automatización; dilutiva el primer año', probabilidad: 'Media', sentido: '+/−' },
        { fecha: 'feb-2027', evento: 'Fin de la recompra de 2.000 M USD y anuncio de la siguiente', efecto: 'Apoyo al BPA', probabilidad: 'Media', sentido: '+' },
      ],
      confianza: 'Media',
    },
    riesgos: {
      items: [
        { riesgo: 'Frenazo de la inversión en centros de datos', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−40 % (bajista a 12 meses: −51 %)', mitigante: 'Electrification vende también a edificios, redes e industria; centros de datos son ≈12 % de sus ventas', senal: 'Pedidos de Electrification por debajo de las ventas dos trimestres seguidos' },
        { riesgo: 'Compresión del múltiplo con tipos altos', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−30 % si vuelve a 18-20x', mitigante: 'Calidad y ROIC altos', senal: 'Bono de EE. UU. por encima del 5,5 %' },
        { riesgo: 'Precio pagado por Rotork', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−3 % (prima de ≈2.000 M)', mitigante: 'Encaje con Automation; base instalada', senal: 'Margen de Rotork por debajo del plan o deterioro del fondo de comercio' },
        { riesgo: 'Presión del cobre y de los aranceles en el margen', tipo: 'Costes', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−8 % por punto de margen', mitigante: 'Poder de precios (+2 %)', senal: 'Margen bruto de Electrification bajo el 39 %' },
        { riesgo: 'Competencia china en media tensión', tipo: 'Competencia', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Certificaciones y base instalada', senal: 'Caída de cuota o de precios en Asia' },
        { riesgo: 'Reclamaciones heredadas y litigios', tipo: 'Legal', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−1 %', mitigante: 'Provisiones de 1.477 M', senal: 'Nuevas provisiones por encima de 100 M' },
        { riesgo: 'Divisa: cotiza en CHF y gana en USD', tipo: 'Divisa', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '±10 % por cada 10 % del USD/CHF', mitigante: 'Ninguno para el inversor en EUR o CHF', senal: 'USD/CHF por debajo de 0,80' },
      ],
      premortem: 'Octubre de 2029: ABB ha perdido un 40 %. Los hiperescaladores frenaron la inversión en 2027 tras dos años de capacidad ociosa; los pedidos de centros de datos, que crecían a tres cifras, cayeron a la mitad y la relación pedidos/ventas de Electrification bajó de 1. A la vez, el cobre subió y los fabricantes chinos tiraron precios en media tensión, y el margen de Electrification volvió del 25 % al 22 %. Rotork, comprada a 20 veces el EBITDA en la cresta del ciclo, rindió por debajo del plan y obligó a un deterioro. Con el BPA estancado en 3,2 USD y el bono de EE. UU. por encima del 5 %, el mercado dejó de pagar 28 veces y volvió a las 16-18 de un industrial: 3,2 × 17 = 54 USD. Las señales que lo habrían anticipado: pedidos de centros de datos por debajo de las ventas, recortes de capex de los hiperescaladores y el margen bruto de Electrification por debajo del 39 %.',
      ia: { exposicion: 'Media', sentido: 'Oportunidad', efecto_valor: '+10 % (y −40 % si la inversión en IA se frena)', comentario: 'La IA es sobre todo demanda: los centros de datos son ≈12 % de las ventas de Electrification y el segmento que más crece (pedidos a tres cifras en el 2T26) [A1, B1]. ABB vende alimentación ininterrumpida de media tensión, cuadros y corriente continua para centros de alta potencia. El riesgo no es que la IA sustituya sus productos (son físicos y certificados: riesgo de sustitución bajo), sino el ciclo: si la inversión en IA se frena, cae la parte de la cartera que hoy empuja el múltiplo. En costes, la IA ayuda en diseño y servicio. Señal: capex de los hiperescaladores y pedidos de centros de datos de ABB. Riesgo de IA para el negocio: bajo; riesgo de ciclo ligado a la IA: medio.' },
    },
    esg: {
      calificaciones: [],
      materialidad: 'La electrificación y la eficiencia son el negocio: motores IE4-IE5 y variadores que ahorran energía (Rockwool: 738 MWh al año) [A1]. Emisiones propias de alcance 1 y 2 de 120 kt en 12 meses, −11 % interanual [A1]. Seguridad laboral: frecuencia de incidentes registrables de 1,36 por millón de horas [A1]. Eliminación del SF6 en media tensión, que exige tecnología nueva. El variable a largo plazo del equipo directivo pesa un 20 % en sostenibilidad [C1].',
      controversias: 'Reclamaciones heredadas por ≈100 M provisionadas en el 2T26 y un proyecto de ≈100 M con litigio en un negocio no estratégico [A1].',
      confianza: 'Baja',
    },
    preguntas: {
      items: [
        { tema: 'Centros de datos', pregunta: '¿Qué parte de la cartera de 30.000 M es de centros de datos y con qué plazos de entrega y cláusulas de cancelación?', por_que: 'Es lo que más mueve el múltiplo y el bajista.' },
        { tema: 'Rotork', pregunta: '¿Qué margen y qué sinergias justifican pagar ≈20 veces el EBITDA y cuándo supera el ROIC al coste de capital?', por_que: 'Primera gran compra del equipo; 5.500 M.' },
        { tema: 'Margen', pregunta: '¿Cuánto del margen del 1S26 es plusvalía inmobiliaria y derivados, y cuánto sostenible?', por_que: 'Separa el 21,8 % del 20 %.' },
        { tema: 'Precio frente a coste', pregunta: '¿Cuándo cierra Electrification la brecha de precio frente al cobre y la plata?', por_que: 'Perdió 140 pb de margen bruto en el 2T26.' },
        { tema: 'Capacidad', pregunta: '¿Cuánto capex más necesita la cartera y cuánto dura el plan de 200 M en media tensión?', por_que: 'Prueba de sostenibilidad del crecimiento.' },
        { tema: 'Recompras', pregunta: '¿Habrá nueva recompra tras cobrar Robotics y pagar Rotork?', por_que: 'Mueve el BPA de 2028.' },
      ],
      confianza: 'Media',
    },
    sentimiento: {
      temas: [
        { tema: 'Precio de Rotork', postura: 'Bajista', peso: 'Alto', contraste: 'Cierto: ≈20 veces el EBITDA y 60 % de prima [D8]; pesa ≈3 % del valor de ABB.' },
        { tema: 'ABB ya no es un industrial', postura: 'Alcista', peso: 'Medio', contraste: 'El ROIC (26,1 %) y el margen lo respaldan, pero el precio ya lo descuenta (25,4x).' },
        { tema: 'Valoración cara', postura: 'Bajista', peso: 'Medio', contraste: 'Coincide con nuestro DCF inverso: el precio pide un 22,3 % de crecimiento anual.' },
        { tema: 'Qué queda tras vender Robotics y cuánto dura el ciclo de centros de datos', postura: 'Dividida', peso: 'Medio', contraste: 'Robotics era ≈7 % de las ventas y de menor margen; el riesgo de ciclo es real.' },
      ],
      lectura: 'El tono se ha enfriado desde junio: los foros pasaron de «ABB ya no es un industrial» a «sigue demasiado cara» tras Rotork. No hay euforia ni capitulación; el sentimiento coincide con nuestra lectura de valoración y no añade un riesgo que el informe no recoja. No cambia la decisión.',
    },
  },
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: '**La recomendación y por qué.** Mantener, con convicción media. El objetivo a 12 meses es de 82,18 USD (68,23 CHF), frente a 91,78 USD (76,20 CHF) de cierre del 15-oct: rentabilidad ponderada del −9,2 % y del base del +1,4 %, con dividendo. El valor intrínseco (52,98 USD) queda un 42,3 % bajo el precio y el objetivo medio de los analistas (101,03 USD) por encima de nuestro alcista. La razón: ABB es un negocio excelente que cotiza a 28 veces nuestro BPA de 2027, y la regla supone que el múltiplo se modera. La convicción es media porque las dos reglas coinciden; bajaría si el precio pasa de 92,63 USD (≈76,9 CHF), donde la regla da Vender.\n\n**El negocio.** Electrification (52 % de las ventas, 24,9 % de margen EBITA operativo), motores y automatización con un ROIC del 26,1 % frente a un WACC del 10,64 % [A1, A3]. Pedidos récord (+30 % en el 2T26) y cartera de 30.007 M (+27 %) por centros de datos, redes y edificios [A1]. Sostenibilidad del crecimiento: Sí; el 7,1 % anual que proyectamos se financia casi sin capital nuevo y sale de la cartera y del poder de precios, no de ganar cuota.\n\n**Finanzas.** Ventas de 33.220 M en 2025 (+7 % comparable) y +12 % comparable en el 1S26; caja libre de 4.566 M (96 % del beneficio); deuda neta de 2.320 M, 0,3 veces el EBITDA [A1, A2]. El margen del 1S26 (21,8 %) incluye 377 M de una plusvalía inmobiliaria.\n\n**Equipo y gobierno.** Suma: dirección de la casa que ha cumplido y elevado sus objetivos, consejo independiente salvo Investor AB (14,6 %) [C2]. La duda es Rotork: ≈5.500 M a unas 20 veces el EBITDA [D8].\n\n**Valoración.** El DCF da 47,22 USD; los comparables, 74-88 USD; con la prima implícita del mercado, 60,42. El DCF inverso pide un 22,3 % de crecimiento anual de las ventas (nuestro base: 6,1 %) o una rentabilidad implícita del 6,9 % frente al 10,6 % de coste de capital. ABB cotiza con prima sobre sus pares (25,4x frente a 21,8x) y sobre su historia adelantada (21,9x). Nuestro BPA de 2028 (3,59) está un 10 % bajo el consenso (4,00) porque usamos el BPA publicado y no sumamos Rotork.\n\n**Riesgos y catalizadores.** El mayor riesgo es un frenazo de la inversión en centros de datos con compresión del múltiplo: el bajista a 12 meses (15x, el PER de 2022) pierde un 51 %. Resultados del 3T26 el 20-oct, cierre de Robotics en el segundo semestre y de Rotork en el 1S27. Los foros coinciden: cara tras Rotork.\n\n**Qué cambiaría la decisión.** Comprar por debajo de 52,98 USD (≈44 CHF), el valor intrínseco; vender por encima de 92,63 USD (≈76,9 CHF). Pasaríamos a Vender si los pedidos de Electrification caen por debajo de las ventas dos trimestres seguidos o el bono de EE. UU. pasa del 5,5 %; mejoraríamos si el BPA de 2027 supera 3,60 USD con el múltiplo estable.',
    tesis: 'ABB es hoy un fabricante de equipos eléctricos y de automatización con un ROIC del 26,1 %, un margen EBITA operativo del 19-22 % y una cartera récord de 30.007 M USD que crece un 27 % gracias a los centros de datos, las redes y los edificios [A1, A3]. Ha vendido los negocios cíclicos y de menor rentabilidad y devuelve casi toda la caja.\n\nEl precio descuenta mucho: 25,4 veces el BPA de los próximos 12 meses y 28 veces nuestro BPA de 2027; con un coste de capital del 10,6 %, justificar 91,78 USD exige crecer un 22,3 % al año hasta 2033, frente al 6-9 % que la propia empresa se marca [A5].\n\nEl mercado acierta en la calidad y se adelanta en el precio: paga como si el ciclo de centros de datos durara una década a tipos bajos. Para invertir hay que creer que la demanda eléctrica crecerá a dos cifras durante muchos años sin que el múltiplo baje.',
    vision_diferencial: {
      mercado_descuenta: 'Que ABB ha dejado de ser un industrial cíclico y merece un múltiplo de crecimiento (28x el BPA de 2027) por la demanda de centros de datos y redes, con BPA de 4,00 USD en 2028 [D2].',
      nuestra_vision: 'La calidad es real, pero el BPA publicado de 2028 será de unos 3,59 USD y un industrial con este crecimiento tiende a cotizar entre 22 y 26 veces; a 12 meses el recorrido es nulo y el bajista, grande.',
      por_que: 'Porque el consenso mezcla BPA operativo y publicado y suma Rotork, y porque la historia adelantada de ABB (mediana de 21,9x, mínimo de 15,1x en 2022) dice que el múltiplo actual es el más alto de su historia reciente, en un pico de pedidos.',
    },
    a_favor: [
      '**ROIC del 26,1 %**, 15,5 puntos por encima del WACC.',
      '**Cartera récord de 30.007 M** (+27 %) con relación pedidos/ventas de 1,28.',
      '**Electrification con un 24,9 % de margen** y pedidos +60 % en el 2T26.',
      '**Caja libre de 4.566 M** en 2025 (96 % del beneficio) y deuda neta de 0,3 veces el EBITDA.',
      '**Gobierno sólido**: nueve de diez consejeros independientes, una acción un voto.',
    ],
    en_contra: [
      '**El precio pide un 22,3 % de crecimiento anual** con nuestro WACC.',
      '**Múltiplo en máximos**: 28,2x el BPA de 2027 frente a una mediana histórica de 21,9x.',
      '**Rotork a ≈20 veces el EBITDA** con un 60 % de prima.',
      '**Bajista a 12 meses del −51 %** si vuelve el PER de 2022 (15,1x).',
      '**Dependencia del ciclo de centros de datos**, el segmento que más crece.',
    ],
    que_vigilar: 'La tesis depende de que la cartera de centros de datos y redes se convierta en ventas sin cancelaciones y de que el margen de Electrification aguante el cobre. Señales de que no se cumple: relación pedidos/ventas de Electrification por debajo de 1, margen bruto de Electrification bajo el 39 % o un recorte del capex de los hiperescaladores.',
    cambiaria_recomendacion: [
      'Precio por encima de 92,63 USD (≈76,9 CHF): la regla pasa a Vender.',
      'Precio por debajo de 52,98 USD (≈44 CHF), el valor intrínseco: se estudiaría la compra.',
      'Pedidos de Electrification por debajo de las ventas dos trimestres seguidos: Vender.',
      'BPA de 2027 por encima de 3,60 USD con la guía confirmada: revisar al alza el base.',
    ],
    kpis_seguimiento: [
      { kpi: 'Pedidos de Electrification', nivel_actual: '7.231 M en el 2T26 (+60 %)', umbral_alerta: 'Relación pedidos/ventas < 1', por_que: 'Adelanta las ventas de 2027' },
      { kpi: 'Margen EBITA operativo del grupo', nivel_actual: '20,2 % (2T26)', umbral_alerta: '< 19 %', por_que: 'Base del BPA' },
      { kpi: 'Cartera de pedidos', nivel_actual: '30.007 M', umbral_alerta: 'Caída interanual', por_que: 'Visibilidad del crecimiento' },
      { kpi: 'Bono de EE. UU. a 10 años', nivel_actual: '5,21 %', umbral_alerta: '> 5,5 %', por_que: 'Mueve el múltiplo' },
      { kpi: 'Margen bruto de Electrification', nivel_actual: '40,3 % (2T26)', umbral_alerta: '< 39 %', por_que: 'Precio frente al cobre' },
    ],
  },
};
