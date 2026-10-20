// Textos del analista (Veolia, corte 2026-10-20). Las cifras del motor se repasan tras el último cálculo.
export default {
  limitaciones: 'Cotización en Euronext París (VIE), la línea principal; el ADR (VEOEY) no se usa. Precio: cierre oficial del lunes 19-oct-2026 (31,93 EUR, subasta de cierre de las 17:35 de París), del histórico de Euronext [D2], porque Yahoo no traía el cierre de ese día; la sesión del 20-oct estaba abierta al hacer el análisis (31,92 EUR a las 10:15). Cuentas 2021-2024 del XBRL ESEF del regulador [A6] y 2025 de las cuentas consolidadas de la empresa [A1] (2025 aún no está en filings.xbrl.org). El EBIT de la cuenta es el resultado operativo publicado antes de puestas en equivalencia, con la amortización de la asignación del precio de Suez y las partidas no corrientes; el BPA del objetivo a 12 meses es el corriente de la empresa (sin esa amortización) menos los cupones de los híbridos, en la misma base que la historia. Puente al 30-jun-2026 [A5]: los híbridos (TSS, 3.744 M) se restan como deuda y los minoritarios a valor de mercado aproximado. Segmentos solo 2024-2025 (segmentación vigente). Comparables de Yahoo del 20-oct convertidos con el BCE del 19-oct (USD 1,1225; GBP 0,84205) [D9, D10]. La OAT a 10 años sale de una fuente secundaria (Idéal Investisseur) contrastada con la serie mensual del BCE [D7, D8]; la revisión de Moody’s del 23-oct y los disturbios del fin de semana del 17-oct son contexto del encargo que no se ha podido leer en una fuente primaria.',
  controles_explicados: [
    { control: 'BAI − impuestos − minoritarios = beneficio neto (2022)', explicacion: 'La diferencia (78 M) es el resultado de actividades interrumpidas (venta de activos de Suez y del negocio EPC), que va debajo del resultado de las operaciones continuadas [A1, A6].' },
    { control: 'BAI − impuestos − minoritarios = beneficio neto (2024)', explicacion: 'Diferencia de 103 M por el resultado de actividades interrumpidas, sobre todo el negocio EPC (ingeniería y construcción) abandonado en todas las geografías [A2].' },
    { control: 'BAI − impuestos − minoritarios = beneficio neto (2025)', explicacion: 'Diferencia de 118 M por la misma razón: pérdidas de actividades interrumpidas (EPC) [A2].' },
    { control: 'BPA = beneficio neto / acciones (2025)', explicacion: 'El BPA publicado (1,54 EUR) resta del numerador los cupones de los híbridos (121 M brutos en 2025, ≈90 M netos de impuestos) y usa las acciones medias (729 M), no las diluidas al cierre: (1.217 − 90) / 729 = 1,55 [A1, A2].' },
  ],
  huecos: [
    { seccion: 'rentabilidad', campo: 'roic_operativo_pct', tipo: 'Complemento', intentos: '1) URD 2025: solo el ROCE de la empresa (9,4 % después de impuestos, con puestas en equivalencia); 2) cuentas 2025: sin capital empleado por segmento; 3) presentación FY2025: ROCE del grupo sin desglose', decision: 'Omitido (se usa el ROCE de la empresa como contraste)' },
  ],
  secciones: {
    historia: {
      resumen: 'Veolia es la antigua Compagnie Générale des Eaux, creada en 1853 para dar agua a las ciudades francesas. En los noventa fue la base del conglomerado Vivendi; las actividades de medio ambiente salieron a bolsa en 2000 y tomaron el nombre de Veolia en 2003. Con Antoine Frérot (consejero delegado desde 2009) vendió transporte y activos dispersos y en 2020-2022 hizo la gran operación de su historia: la compra de Suez, su rival de siempre, por unos 13.000 M, que la convirtió en el número uno mundial en agua, residuos y energía local, con los activos franceses de Suez vendidos a un consorcio para cumplir con la competencia. Desde 2022 la dirige Estelle Brachlianoff, que ha integrado Suez (534 M de sinergias), ha comprado el 30 % que faltaba de Tecnologías del Agua y Clean Earth en EE. UU., y ha lanzado un plan de ventas de activos de más de 2.000 M hasta mediados de 2028 [B2-B4, A2, A4].',
      confianza: 'Alta',
    },
    negocio: {
      descripcion: 'Veolia presta tres servicios esenciales a ayuntamientos e industrias en unos 40 países: agua (captación, potabilización, distribución y depuración, con contratos de concesión y gestión delegada, y equipos y química de tratamiento de Tecnologías del Agua), residuos (recogida, reciclaje, valorización energética y, cada vez más, residuos peligrosos, donde es número uno mundial y número dos en EE. UU. tras comprar Clean Earth) y energía local (redes de calor, cogeneración y servicios energéticos, sobre todo en Europa central y oriental). En 2025 vendió 44.396 M y obtuvo un EBITDA de 7.050 M [A1, A2]. Se organiza en cuatro segmentos: Francia y residuos peligrosos de Europa (el 20 % de las ventas), resto de Europa (43 %), resto del mundo (25 %) y Tecnologías del Agua (11 %) [A2].',
      como_gana_dinero: 'Cobra contratos largos con precios indexados a fórmulas que siguen la inflación de salarios, energía y materiales, en su mayoría con clientes públicos (agua y redes de calor) o grandes industriales (residuos peligrosos, agua industrial). Casi todo es recurrente: la parte de proyectos (construcción de plantas en Tecnologías del Agua) es pequeña y la de EPC se abandonó en 2024 [A2]. El margen depende de la eficiencia (ahorros de 399 M en 2025, de los que retiene casi la mitad [A2]), del retraso con que las fórmulas trasladan la inflación y, en energía, de los precios de la electricidad y el gas. Es un negocio intensivo en capital (inversión neta del 8,7 % de las ventas [A3]) con poco apalancamiento operativo y un circulante negativo, porque cobra antes de lo que paga.',
      clientes: 'No hay un cliente relevante: miles de ayuntamientos, mancomunidades e industriales (petroquímica, minería, microelectrónica, alimentación). Los contratos municipales de agua en Francia duran 8-15 años y se renuevan por concurso; los de residuos peligrosos e industriales, 3-10 años. El poder de precios está demostrado: en 2022-2023, con una inflación del 6-10 %, las fórmulas de indexación y las renegociaciones mantuvieron el margen EBITDA en torno al 14,5 % y en 2025 subió al 15,9 % [A2, A3]. El riesgo está en la renovación: con las cuentas locales francesas apretadas, los ayuntamientos negocian más y algunos vuelven a la gestión pública directa (remunicipalización), aunque Veolia sigue siendo el primer operador de agua delegada en Francia [B2].',
      confianza: 'Alta',
    },
    sector: {
      definicion: 'El mercado relevante son los servicios medioambientales externalizados: agua y depuración gestionadas por operadores privados, recogida y tratamiento de residuos (también peligrosos) y energía local, en Europa, Norteamérica y otros países donde Veolia opera. No hay una cifra común fiable: los informes gratuitos mezclan perímetros incompatibles (residuos entre 330.000 M y 1,2 billones de USD), así que el tamaño se omite [B1]. La ficha sectorial de residuos del repositorio describe la parte de residuos sólidos de Norteamérica, que es de otros [B1].',
      drivers: [
        { driver: 'Escasez de agua y reutilización', efecto: '+', horizonte: 'Estructural', evidencia: 'Contratos de reutilización y desalación, y agua para centros de datos y microelectrónica: objetivo de 1.000 M de ventas en 2030 en ese nicho [A4].' },
        { driver: 'Residuos peligrosos y contaminantes nuevos (PFAS)', efecto: '+', horizonte: 'Estructural', evidencia: 'Clean Earth (ventas de 1.030 M USD) y Enviropacific; mercado de residuos peligrosos de EE. UU. con crecimiento del 5-6 % anual según la empresa [A9, B5].' },
        { driver: 'Precios de la energía', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'En el 1S26 las ventas crecieron un 0,8 % orgánico, un 1,5 % sin los precios de la energía [A4].' },
        { driver: 'Producción industrial y construcción', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Los volúmenes de residuos industriales y comerciales siguen a la industria europea; en el 1S26 pesó el efecto «comercio y volúmenes» positivo, pero los proyectos de Tecnologías del Agua cayeron por Oriente Medio [A4].' },
        { driver: 'Finanzas públicas locales y regulación', efecto: '−', horizonte: 'Cíclico', evidencia: 'Presupuestos municipales franceses ajustados y presupuesto 2027 del Estado con medidas fiscales [B7]; los clientes públicos negocian más las renovaciones.' },
      ],
      porter: [
        { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Pocos grandes en cada país (nueva Suez y Saur en agua en Francia; Séché, Hera, A2A, Remondis o Clean Harbors en residuos), con concursos muy competidos en agua municipal [B2, B6].' },
        { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Ayuntamientos con poder de concurso y opción de remunicipalizar; en residuos peligrosos los industriales negocian menos porque el tratamiento es regulado y escaso.' },
        { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Energía, química y mano de obra con muchas fuentes; las fórmulas de indexación trasladan el coste con algún retraso [A2].' },
        { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Permisos de vertederos e incineradoras, referencias técnicas y balance para contratos de 10-30 años; los fondos de infraestructura entran comprando, no desde cero.' },
        { fuerza: 'Amenaza de sustitutos', intensidad: 1, justificacion: 'El agua, la depuración y el tratamiento de residuos no tienen sustituto; el único es la gestión pública directa.' },
      ],
      ciclo: { posicion: 'Madurez del ciclo', comentario: 'El negocio es defensivo: en 2009 y en 2020 las ventas cayeron por volúmenes industriales y energía, pero las de agua aguantaron; en 2022 la inflación se trasladó a precios con unos meses de retraso. Hoy la industria europea está floja y los precios de la energía bajan, lo que resta ventas pero no margen (16,0 % en el 1S26 [A4]). Lo que más mueve la acción no es el ciclo de negocio sino el de los tipos de interés: el sector cotiza como una utility y se abarata cuando sube el Bund.' },
      regulacion: 'En Francia, los contratos de agua delegada se rigen por la ley Sapin (concursos y duración limitada) y los precios los aprueba cada ayuntamiento; el presupuesto 2027 mantiene un recargo sobre el impuesto de sociedades de los grandes grupos, aunque un 30 % menor [B7, D18]. En la UE, las directivas de aguas residuales urbanas (revisada en 2024, con responsabilidad ampliada del productor para micro-contaminantes) y de residuos favorecen la inversión. En EE. UU., la EPA ha fijado límites de PFAS en agua potable y regula los residuos peligrosos (RCRA), lo que sostiene la demanda de Clean Earth [B5].',
      tendencias: 'Tres cambios favorecen a Veolia: la escasez de agua y la reutilización (más tecnología y contratos industriales), la descontaminación de PFAS y los residuos peligrosos (precios regulados y pocas plantas) y la descarbonización de las redes de calor en Europa central. En contra: la digitalización y la IA ayudan sobre todo a la eficiencia, que en parte hay que devolver al cliente en las renovaciones, y la remunicipalización en Francia. Veolia gana con los tres primeros porque ya es el líder en cada uno [A4, B2].',
      confianza: 'Media',
    },
    competencia: {
      foso: {
        veredicto: 'Estrecho', tendencia: 'Estable',
        fuentes: [
          { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'No hay red: cada contrato es local.' },
          { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Contratos de 8-30 años y redes que conoce el operador; cambiar en mitad del contrato es caro, pero en la renovación hay concurso.' },
          { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Permisos de vertederos, incineradoras y plantas de residuos peligrosos difíciles de replicar; tecnologías del agua con patentes de membranas y química [A2].' },
          { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Escala en compras y eficiencia (399 M de ahorros brutos en 2025) [A2]; margen EBITDA del 15,9 % frente al 14,0 % de Séché [B6].' },
          { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'En residuos peligrosos y redes de calor hay uno o dos operadores por región; Clean Earth la hace número dos en EE. UU. [A9].' },
        ],
      },
      amenazas: 'La erosión vendría por la renovación de contratos: en Francia los ayuntamientos negocian más con presupuestos ajustados y alguno vuelve a la gestión pública; en residuos peligrosos de EE. UU., Clean Harbors y Republic compiten por las mismas plantas. La tecnología no amenaza el foso, aunque la competencia china en membranas y equipos sí presiona los precios de Tecnologías del Agua.',
      confianza: 'Media',
    },
    financieros: {
      comentario: 'Las ventas pasaron de 28.508 M en 2021 a 42.885 M en 2022 por la consolidación de Suez y desde entonces están planas (44.396 M en 2025), porque la bajada de los precios de la energía compensa el crecimiento orgánico [A3]. Lo que sí crece es el margen: el EBITDA subió del 14,4 % de las ventas en 2023 al 15,9 % en 2025 y al 16,0 % en el 1S26, por los ahorros de eficiencia y las sinergias de Suez [A2, A4]. El resultado neto corriente de la empresa creció de 896 M (2021) a 1.643 M (2025), un 16 % anual, y el publicado, de 404 M a 1.217 M; la diferencia es la amortización de los activos revalorizados de Suez y las partidas no corrientes [A2, A3]. En 2026 la guía pide un EBITDA orgánico del +5-6 % y un resultado neto corriente de al menos +8 % a cambio constante con Clean Earth [A4].',
      ajustes: 'Veolia publica un resultado neto corriente que excluye la amortización de la asignación del precio de compra de Suez (y desde 2026 la de Clean Earth), los deterioros y las partidas no corrientes: 1.643 M en 2025 frente a 1.217 M publicado [A2]. Su BPA corriente (2,25 EUR) no resta los cupones de los híbridos; el publicado sí [A3]. El BPA del objetivo a 12 meses usa el corriente menos esos cupones netos (≈90 M en 2025), porque son un coste para el accionista ordinario. La cuenta del informe usa las cifras publicadas.',
      confianza: 'Alta',
    },
    trimestres: {
      ultima_presentacion: 'En el 1S26 (30-jul) la dirección elevó la guía del resultado neto corriente (al menos +8 % a cambio constante con Clean Earth) y confirmó el EBITDA orgánico del +5-6 %. El margen subió 70 puntos básicos, al 16,0 %, con 195 M de ahorros. Lo que no gustó: la caja libre del semestre fue negativa (−288 M, mejor que los −451 M del 1S25 por estacionalidad), la deuda neta subió a 24.548 M por Clean Earth, y Tecnologías del Agua bajó en proyectos por Oriente Medio. La empresa espera que Clean Earth aporte al BPA corriente desde 2027 y firmó 500 M de ventas de activos en 2026 [A4, A7].',
      confianza: 'Alta',
    },
    balance: {
      otros_pasivos: 'Pensiones y prestaciones a empleados: 647 M de provisión, ≈480 M netos de impuestos en el puente. Híbridos (títulos super-subordinados perpetuos): 3.744 M al 30-jun-2026, que la contabilidad trata como patrimonio y el informe resta como deuda. Minoritarios: 2.624 M en libros al 30-jun; se restan a ≈5.100 M (402 M de beneficio de 2025 por unas 12,7 veces, el PER del grupo) porque son negocios rentables de Europa central y España cuyo valor de mercado está muy por encima del contable [A1, A5].',
      comentario: 'La deuda financiera neta de la empresa subió de 19.657 M a fin de 2025 a 24.548 M al 30-jun-2026 por la compra de Clean Earth (2.600 M), Enviropacific y la estacionalidad del circulante; con arrendamientos e híbridos, los derechos por delante del accionista suman unos 32.000 M, más que la capitalización (23.373 M) [A4, A5]. La guía es cerrar 2026 con una deuda neta de unas 3 veces el EBITDA. El rating es BBB (S&P) y Baa1 (Moody’s), estable, confirmado en abril y mayo de 2026 [A5]; el coste medio de la financiación es del 3,7 % y la vida media de 6,2 años, con 9.792 M que vencen en 2026 (sobre todo papel comercial) y una liquidez de 15.205 M [A5]. El Altman Z (0,82) sale bajo, como en todas las utilities con mucho activo fijo y deuda; no es una señal de quiebra en un negocio con flujos regulados y rating BBB.',
      confianza: 'Alta',
    },
    flujos: {
      comentario: 'Veolia genera un flujo operativo de unos 5.000 M al año (5.153 M en 2025), pero invierte casi todo: inversión industrial de 3.212 M, arrendamientos de 556 M, intereses de 764 M y dividendos de 1.280 M en 2025 [A1]. La caja libre después de capex y arrendamientos (1.385 M en 2025) cubre el dividendo pero no las compras, que se financian con deuda y ventas de activos. Es un negocio con poca caja libre para el accionista: el 3-5 % de las ventas, frente al 12-15 % de los grandes de residuos de EE. UU. [B1]. En 2025 hubo recompras de 402 M para compensar el plan de accionariado de los empleados.',
      confianza: 'Alta',
    },
    calidad: {
      comentario: 'Las cuentas cuadran entre el XBRL del regulador, las cuentas consolidadas y los comentarios de resultados [A1-A3, A6]; los auditores son Deloitte y EY, con opinión sin salvedades. El Beneish (−2,77) no da señal de manipulación y el Piotroski (7 de 9) es bueno. Los puntos a vigilar son la distancia entre el resultado corriente y el publicado (426 M en 2025, sobre todo amortización de la compra de Suez, que es real pero no de caja), las pérdidas recurrentes de actividades interrumpidas (EPC) y la caja libre negativa del primer semestre, que es estacional.',
      senales: [
        { senal: 'Resultado corriente frente al publicado', nivel: 'Media', comentario: '1.643 M frente a 1.217 M en 2025: la diferencia (amortización de la asignación del precio de Suez, deterioros y no corrientes) es estable y está explicada en la conciliación [A2].' },
        { senal: 'Actividades interrumpidas recurrentes', nivel: 'Baja', comentario: 'Pérdidas del negocio EPC abandonado en 2024 y 2025 (≈100 M al año) [A2].' },
        { senal: 'Fondo de comercio', nivel: 'Media', comentario: '11.456 M a fin de 2025 (34 % del capital invertido), sobre todo de Suez; sube con Clean Earth (≈2.000 M más).' },
      ],
      confianza: 'Media',
    },
    rentabilidad: {
      comentario: 'Veolia crea poco valor por encima de su coste de capital. El ROIC con fondo de comercio subió del 3,8 % en 2021 al 6,9 % en 2025, frente a un WACC del 6,3 %: menos de un punto de margen. Sin el fondo de comercio llega al 10,4 % y el ROCE de la propia empresa (con puestas en equivalencia, después de impuestos) es del 9,4 % [A2]. El ROIC incremental de 2021-2025 (11,9 %) es mejor que el medio, porque las sinergias de Suez se han cumplido. Para el filtro de calidad decide el ROIC publicado: con 0,6 puntos sobre el WACC, Veolia no pasa (pide 5). Clean Earth, pagada a 15 veces el EBITDA (9,8 con sinergias), rebaja el ROIC en 2026-2027 [A9].',
      confianza: 'Media',
    },
    capital: {
      politica: 'Prioridades del plan GreenUp 2024-2027: inversión en los negocios de crecimiento (tecnologías del agua, residuos peligrosos, bioenergía), dividendo que crece con el BPA corriente (1,50 EUR por 2025, +7 %), recompras para compensar el accionariado de los empleados y deuda neta de unas 3 veces el EBITDA. Las compras se financian con ventas de activos: más de 2.000 M hasta mediados de 2028 [A2, A4].',
      comentario: 'La dirección ha cumplido lo que prometió con Suez (534 M de sinergias frente a 500 M y ROCE del 7,6 % al 9,4 % en dos años [A2, A3]) y ha rotado la cartera hacia negocios de más crecimiento. Pero ha pagado caro: Clean Earth a 15 veces el EBITDA, el doble que el múltiplo del grupo, y la deuda vuelve a 3 veces el EBITDA. El juicio sobre la asignación de capital depende de que las ventas de activos se hagan a buen precio y de que Clean Earth dé las sinergias de 120 M USD [A9].',
      confianza: 'Media',
    },
    directivos: {
      comentario: 'Equipo estable y creíble: Brachlianoff lleva cuatro años al frente y ha cumplido la guía de 2023, 2024 y 2025, y la de 2026 va en camino con el resultado neto corriente elevado en julio [C3, C4]. Frérot, el arquitecto de la compra de Suez, sigue de presidente no ejecutivo, renovado en 2026 [C2]. Los directivos tienen poco capital propio (0,01 % la consejera delegada); en 2026 solo hubo ventas pequeñas de dos miembros del comité ejecutivo (Graveson, 0,46 M) [C2].',
      confianza: 'Media',
    },
    gobierno: {
      remuneracion: 'La consejera delegada cobró 3,48 M por 2025: 1,03 M fijo, 1,41 M de variable anual y 1,04 M de acciones a largo plazo, 62 veces el salario medio [C1]. El variable mide el BPA corriente, la caja libre, el ROCE y objetivos de impacto medioambiental, así que está ligado a la rentabilidad. El porcentaje de voto de la junta sobre la remuneración no se ha localizado.',
      control_y_defensas: 'No hay accionista de control: los empleados tienen el 9,35 % (con derechos de voto dobles por la ley Florange para los títulos nominativos de más de dos años), BlackRock el 5,48 %, la Caisse des Dépôts el 5,11 % y CriteriaCaixa el 5,10 % [C1]. El voto doble refuerza a los empleados y a la Caisse des Dépôts frente a una opa hostil, pero ninguno controla.',
      confianza: 'Media',
    },
    consenso: {
      guidance: 'Guía 2026 (30-jul-2026): crecimiento orgánico sólido de las ventas sin los precios de la energía, EBITDA orgánico del +5 % al +6 %, resultado neto corriente al menos +8 % a cambio constante con Clean Earth (elevada), BPA corriente y dividendo creciendo al mismo ritmo, y deuda neta de unas 3 veces el EBITDA. Clean Earth aportará al BPA corriente desde 2027 [A4].',
      revisiones: 'Las estimaciones de BPA de 2026 apenas se han movido en tres meses (2,41 EUR), con el efecto de la guía elevada compensado por el dólar [D4]. Las recomendaciones están divididas entre comprar (13) y mantener (5); Morgan Stanley bajó a «en línea» el 28-jul con objetivo de 38 EUR y RBC subió el suyo a 41,5 el 19-ago [D14, D15].',
    },
    bolsa: {
      comentario: 'La acción sube un 13,8 % en el año frente al 11,6 % del STOXX 600, pero ha caído un 14,8 % desde su máximo de 37,52 EUR del 14-jul, el doble que el CAC 40 (−6,0 %) y mucho más que el STOXX 600 (−0,1 %) y que las utilities europeas (−4,8 %) [D1, D17]. A tres años gana un 13,4 % anual con dividendos, menos que el índice (17,4 %). La beta mensual de cinco años frente al STOXX 600 es de 1,25 y la semanal de dos años, de 0,91; la volatilidad es baja (18 %).',
      contexto: {
        movimiento: { fecha: '2026-10-20', var_1m_pct: 0.6, var_3m_pct: -14.3, var_6m_pct: -10.4, var_12m_pct: 7.4, dist_max_52s_pct: -14.9, dist_min_52s_pct: 12.4, dist_max_historico_pct: -14.9, tendencia: 'bajista', volatilidad_60d_pct: 18.2, avisos: [] },
        movimientos_fuertes: [
          { periodo: '14-31 jul 2026', var_pct: -8.1, causa: 'Causa propia: Morgan Stanley baja a «en línea» el 28-jul y el 31-jul, el día después de los resultados del 1S26, cae un 3,7 % por la caja libre negativa (−288 M), la deuda de 24.548 M y los proyectos de Tecnologías del Agua; el STOXX 600 sube en esas semanas [A4, D14, D17].', veredicto: 'no cambia', condicion: null },
          { periodo: '31 jul-19 oct 2026', var_pct: -7.4, causa: 'Riesgo país francés: cae lo mismo que el CAC 40 (−7,5 %) y mucho más que el STOXX 600 (−1,3 %) y las utilities europeas (−1,0 %), mientras el diferencial OAT-Bund sube a 1,36-1,42 puntos; Engie (−16 %), Vinci (−13 %) y Séché (−13 %) caen más [D7, D17].', veredicto: 'no cambia', condicion: null },
          { periodo: '27-ago-2026', var_pct: -3.9, causa: 'Caída en un día con todo el mercado francés (CAC 40 −1,7 %, Engie −3,4 %, Vinci −3,9 %) y sin noticia de la empresa: riesgo país [D17].', veredicto: 'no cambia', condicion: null },
        ],
        noticias: [
          { fecha: '2026-07-28', tipo: 'recomendación', hecho: 'Morgan Stanley baja a «en línea» con objetivo de 38 EUR: ve el potencial limitado tras la subida [D14].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-07-30', tipo: 'resultados', hecho: 'Resultados del 1S26: EBITDA +5,0 % orgánico, margen del 16,0 %, guía del resultado neto corriente elevada; caja libre de −288 M y deuda de 24.548 M [A4].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-08-19', tipo: 'recomendación', hecho: 'RBC sube el objetivo a 41,5 EUR y destaca a Veolia en el CAC 40 [D15].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-10-01', tipo: 'regulación', hecho: 'El proyecto de presupuesto 2027 mantiene el recargo sobre el impuesto de sociedades de los grandes grupos, un 30 % menor que en 2025-2026 [D18, B7].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-10-07', tipo: 'rumor', hecho: 'Análisis de prensa «tras un 20 % de caída, ¿el final del túnel?»: soporte técnico en 30 EUR [D16].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-10-19', tipo: 'macro', hecho: 'La OAT a 10 años cierra en el 4,85 % y el Bund en el 3,49 %: diferencial de 1,36 puntos, desde ≈0,8 a principios de julio; disturbios en Francia el fin de semana del 17-oct (contexto del encargo, sin fuente primaria) [D5, D7].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-10-23', tipo: 'macro', hecho: 'Revisión prevista de la calificación de Francia por Moody’s (contexto del encargo). Un recorte subiría la OAT, pero el rating de Veolia (Baa1) ya está por debajo del de Francia y su deuda cotiza por su propio riesgo [A5].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-11-05', tipo: 'resultados', hecho: 'Publicación de los nueve primeros meses de 2026 [A4].', veredicto: 'no cambia', condicion: null },
        ],
        proximos_resultados: '2026-11-05',
        veredicto: 'no cambia',
        condicion: null,
        comentario: 'La caída desde el máximo (−14,8 %) tiene dos mitades. La primera, del 14 al 31 de julio (−8 %), es propia: una rebaja de Morgan Stanley y una reacción floja a los resultados por la caja libre y la deuda, con el STOXX 600 al alza. La segunda, desde el 1-ago (−7,4 %), es riesgo país: Veolia cae lo mismo que el CAC 40 y seis puntos más que el STOXX 600 y las utilities europeas, mientras el diferencial OAT-Bund sube a 1,36-1,42 puntos [D7, D17]. No hay ninguna noticia de la empresa que cambie las cifras: la guía se elevó en julio. Por eso el veredicto es «no cambia»: el riesgo país está en el precio y en la sensibilidad del DCF, y los resultados del 5-nov no retrasan la decisión.',
      },
    },
    multiplos_historicos: {
      serie: [
        { anio: '2020', precio_cierre: 19.29, ev_ebitda_ntm: null, per_ntm: 13.2, excluir: false },
        { anio: '2021', precio_cierre: 32.26, ev_ebitda_ntm: null, per_ntm: 20.3, excluir: false },
        { anio: '2022', precio_cierre: 24.00, ev_ebitda_ntm: null, per_ntm: 13.3, excluir: false },
        { anio: '2023', precio_cierre: 28.56, ev_ebitda_ntm: null, per_ntm: 14.0, excluir: false },
        { anio: '2024', precio_cierre: 27.11, ev_ebitda_ntm: null, per_ntm: 12.7, excluir: false },
        { anio: '2025', precio_cierre: 29.72, ev_ebitda_ntm: null, per_ntm: 12.9, excluir: false },
      ],
      confianza: 'Media',
      comentario: 'Con el beneficio publicado, la acción cotiza a 20,7 veces los últimos doce meses, algo por debajo de su media de cinco años (22,3); ese PER está inflado por la amortización de la compra de Suez. En la base que usa el objetivo (precio ÷ BPA corriente del año siguiente menos los cupones de los híbridos), cotiza a 12,6 veces, en línea con su mediana de cinco años (13,3) y con el mínimo (12,7). El PER de 2021 (20,3 veces) fue el de la euforia de la compra de Suez con tipos negativos; desde 2022, con el Bund por encima del 2 %, el múltiplo se ha quedado en 12,7-14 veces. Nada estructural ha cambiado: la empresa crece algo más y tiene más deuda.',
    },
    comparables: {
      criterio: 'Diez empresas de agua, residuos y servicios medioambientales con cifras del mismo día (20-oct-2026) de Yahoo Finance, convertidas a euros [D9, D10]: utilities multiservicio italianas (Hera, Acea, Iren, A2A), residuos peligrosos y medioambientales en Francia (Séché), agua regulada en Reino Unido y EE. UU. (Severn Trent, United Utilities, American Water) y residuos en EE. UU. (Republic Services, Clean Harbors). Ninguna tiene la misma mezcla que Veolia; las de EE. UU. cotizan con prima por su crecimiento y por el mercado.',
      comentario: 'Veolia cotiza a 12,3 veces el beneficio de los próximos doce meses (BPA de consenso) y a 7,7 veces el EBITDA, frente a 13,1 y 10,7 veces de mediana del grupo. Frente a las europeas (Hera 10,6, Iren 9,8, A2A 11,3, Séché 11,3) está en línea o algo cara; frente a las de agua regulada británicas (13,6) y a las de EE. UU. (20-31 veces), barata. El EV/EBITDA bajo se explica por la deuda y los minoritarios, que el mercado descuenta, y por el margen (16 % frente al 25 % de mediana). Los comparables no entran en la valoración: los múltiplos de valor empresa no sirven con un puente tan grande y la mezcla de negocios es distinta.',
    },
    transacciones: {
      comentario: 'Las tres compras recientes de Veolia muestran lo que paga el mercado por cada negocio: residuos peligrosos en EE. UU. a 15 veces el EBITDA (Clean Earth, 9,8 con sinergias) [D11], tecnologías del agua a ≈8 veces (el 30 % de WTS, estimación propia) [D12] y descontaminación en Australia a 0,9 veces las ventas [D13]. No se usan en la valoración: son compras de control de negocios distintos del grueso del grupo y no hay transacciones de grupos multiservicio comparables.',
    },
  },
  suma_partes: {
    aplica: true, descuento_holding_pct: 5,
    partes: [
      { segmento: 'Francia y residuos peligrosos de Europa', metrica: 'EBITDA 2025', valor_metrica: 1475, multiplo: 8.0, ev_directo: null, justificacion: 'Agua delegada y residuos en Francia y residuos peligrosos en Europa: entre Séché (≈7 veces) y las utilities de agua regulada (11-13 veces) [B6, D9].' },
      { segmento: 'Europa', metrica: 'EBITDA 2025', valor_metrica: 2758, multiplo: 7.5, ev_directo: null, justificacion: 'Redes de calor, agua y residuos en Europa central, Alemania, Reino Unido, España e Italia: al nivel de Hera, Iren y A2A (7-8 veces) [D9].' },
      { segmento: 'Resto del mundo', metrica: 'EBITDA 2025', valor_metrica: 2009, multiplo: 8.5, ev_directo: null, justificacion: 'EE. UU., Latinoamérica, Asia y Oriente Medio: más crecimiento y más riesgo país; entre las europeas y las de EE. UU.' },
      { segmento: 'Tecnologías del Agua', metrica: 'EBITDA 2025', valor_metrica: 669, multiplo: 11.0, ev_directo: null, justificacion: 'Equipos, química y servicios de tratamiento de agua: por debajo de los especialistas cotizados por su margen (13,5 %) y por encima de lo pagado por el 30 % de WTS (≈8 veces) [D12].' },
      { segmento: 'Clean Earth', metrica: 'Precio pagado (junio de 2026)', valor_metrica: 2600, multiplo: 1, ev_directo: 2600, justificacion: 'Al precio pagado (3.000 M USD), que el mercado valida: Clean Harbors cotiza a más de 15 veces el EBITDA [D9, D11].' },
      { segmento: 'Otros y holding', metrica: 'EBITDA 2025', valor_metrica: 139, multiplo: 6.0, ev_directo: null, justificacion: 'Resultado de las actividades centrales y de servicios compartidos.' },
    ],
    comentario: 'Veolia tiene negocios con perfiles distintos (agua regulada, residuos, energía, tecnología), así que la suma de partes da una referencia útil, con un descuento de holding del 5 % por la complejidad. Da 34,39 EUR por acción, un 7,7 % por encima del precio y casi igual que el DCF: el mercado no está aplicando un descuento de conglomerado relevante. No entra en la valoración porque los múltiplos de cada parte son aproximados.',
    confianza: 'Baja',
  },
  dcf_justificacion: {
    crecimiento: 'El 2026e (+3,0 %, fijo) sale de la guía: crecimiento orgánico del 1-2 % con precios de la energía a la baja, siete meses de Clean Earth y nueve de Enviropacific (+2 puntos) y un efecto divisa de −1 punto por el dólar [A4]. El 2027e (+4,0 %) suma un punto por los cinco meses de Clean Earth que faltan. Desde 2028e, solo orgánico: volumen del 1-1,5 % y precio del 2 %, en la línea de 2023-2025, bajando al 2,2 % en 2035e. No se modelan las ventas de activos (> 2.000 M), que se tratan como neutras en valor, ni compras nuevas.',
    margenes: 'Margen EBITDA del 16,3 % en 2026e (16,0 % en el 1S26 y un segundo semestre más fuerte, como en 2025 [A4]) que sube al 17,0 % en 2030e por los ahorros (> 350 M al año, de los que se retiene la mitad) y la mezcla hacia residuos peligrosos. Es prudente frente a la guía de EBITDA del +5-6 % anual del plan GreenUp: el base da un EBITDA del +5 % al +6 % en 2027-2028 y del 4-5 % después.',
    inversion: 'Capex del 10,3 % de las ventas: inversión industrial neta (8,7 % en 2025 [A3]) más los pagos de arrendamientos (1,3 %) y los gastos de renovación que van debajo del EBITDA (0,7 %), menos la parte de las ventas de activos industriales. Amortización del 7,7 % (amortizaciones corrientes más renovación, sin la de la compra de Suez). Circulante del −9 % de las ventas, como en 2021-2025. Con ese capex, la inversión neta (capex menos amortización y circulante) financia el crecimiento con un rendimiento del 13,5 %, cerca del ROIC incremental histórico (11,9 %); con un 9,5 % la prueba de sostenibilidad fallaba (20 %) y se subió el capex.',
    wacc: 'Tasa libre del 3,49 % (Bund a 10 años del 19-oct-2026, Bundesbank) [D5]; beta de 1,0, entre la semanal de dos años (0,91) y la mensual ajustada de cinco años (1,17) frente al STOXX 600 [D1]; prima de mercado del 5,5 % y prima adicional de 0,6 puntos por el riesgo país: el 19 % de las ventas en Francia con un diferencial OAT-Bund de 1,36 puntos (≈0,25) y un 15-20 % en Latinoamérica, Oriente Medio, África y Asia (≈0,35). Coste de la deuda del 4,3 % antes de impuestos (financiación del 3,7 % [A4] más el coste marginal de una emisión BBB a 10 años), tipo del 25,8 % y peso de la deuda del 51 % (deuda neta, arrendamientos e híbridos frente a la capitalización). WACC del 6,33 %.',
    terminal: 'Media de Gordon con un crecimiento del 2,0 % (la inflación del euro; por debajo de la tasa libre menos medio punto) y de un múltiplo de salida de 8 veces el EBITDA, el del grupo hoy (7,7 veces) y por debajo de la mediana de los comparables (10,7). El valor terminal pesa el 71 % del valor de empresa, normal en un negocio de contratos largos.',
  },
  puente_comentarios: {
    '2026e': 'Orgánico del 1-2 % con la energía a la baja (precio +1,5, volumen +1,0), perímetro de Clean Earth y Enviropacific (+2) y divisa (−1,5): otros +0,5 [A4].',
    '2027e': 'Volumen +1,5 y precio +1,5 (indexación con la inflación del 2 %, algo menos en energía), y un punto de arrastre de Clean Earth.',
    '2028e': 'Solo orgánico: volumen +1,5 (residuos peligrosos y agua industrial) y precio +2,0.',
    '2029e': 'Volumen +1,3 y precio +2,0.',
    '2030e': 'Volumen +1,0 y precio +2,0, la inflación de las fórmulas.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Sí. El crecimiento medio proyectado (2,9 % anual) es la suma de precio (≈2 %, la inflación que trasladan las fórmulas de los contratos) y volumen (≈1 %), sin compras nuevas, por debajo de la TCAC histórica (11,7 %, inflada por Suez) y del orgánico de 2023-2025 (3-5 % con la energía). La reinversión neta que supone financia ese crecimiento con un rendimiento del 13,5 % sobre el capital nuevo, cerca del ROIC incremental histórico (11,9 %) y por debajo del límite de 1,25 veces. La cuota de mercado no hace falta subirla: crecer con la inflación es lo que han hecho los contratos en 2022-2025 [A2, A3].',
  dcf_lectura: 'El DCF da 34,25 EUR por acción, un 7,3 % por encima del precio, con un WACC del 6,33 % y un valor terminal del 71 % del valor de empresa. El DCF inverso dice que el precio descuenta un crecimiento del 2,6 % anual en 2027-2035, muy cerca de nuestro base (2,9 %): el mercado valora a Veolia más o menos como nosotros. Con la prima implícita del mercado (4,2 %) el DCF sube a 42,45 EUR.\n\n**Sensibilidad a la OAT.** Si en lugar del Bund (3,49 %) se usa la OAT francesa a 10 años (4,85 % el 19-oct [D7]) como tasa libre, el WACC sube 0,66 puntos, al 6,99 %, y el DCF baja a 27,48 EUR (−19,8 %, −6,77 EUR), un 13,9 % por debajo del precio; el valor real (DCF 60 % y escenarios 40 %) pasa de 33,85 a 27,14 EUR (−19,8 %). Es una cota alta del efecto: supone que todo el negocio paga el riesgo de Francia, que solo es el 19 % de las ventas, y suma ese riesgo a la prima adicional de 0,6 puntos que ya lleva el WACC. Pero muestra la palanca: con 32.000 M de deuda e híbridos por delante del accionista, cada medio punto de tasa quita unos 5 EUR por acción.',
  narrativas: {
    Bajista: 'La subida de los tipos y del riesgo país francés se mantiene, los ayuntamientos franceses aprietan en las renovaciones y la industria europea sigue floja: un punto menos de crecimiento al año y un punto menos de margen (el EBITDA vuelve al 15-16 %), con un WACC medio punto más alto. Con la deuda que tiene, el valor del accionista cae a 10 EUR.',
    Base: 'Se cumple la guía de 2026 y el plan GreenUp en su parte baja: crecimiento con la inflación (≈3 %), margen EBITDA que sube al 17 % en 2030 con los ahorros y Clean Earth integrada.',
    Alcista: 'El agua para la industria y los centros de datos, los PFAS y los residuos peligrosos crecen más de lo previsto y las ventas de activos se hacen a buen precio: un punto más de crecimiento, medio punto más de margen y un múltiplo de salida de 9 veces.',
  },
  escenarios_comentario: 'Los escenarios son casi simétricos en euros (+20 y −24 EUR sobre el base) pero muy abiertos en porcentaje (de −68 % a +70 %) por el apalancamiento: el valor del accionista es solo el 44 % del valor de empresa, así que un punto de margen o medio punto de WACC mueven mucho la acción. El ponderado (33,25 EUR) queda cerca del precio. A 12 meses, con múltiplos, el rango es más estrecho (de −27 % a +37 %) porque el mercado valora a Veolia por PER y no por flujos descontados.',
  casos_12m: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 2.23, multiplo: null, precio: null, justificacion: 'Ventas de 47.800 M en 2028e (+2,5 % y +2,0 % en 2027-2028) y margen EBITDA del 15,8 %; EBIT corriente de ≈3.960 M, resultado financiero de −1.100 M, impuestos del 25,8 %, minoritarios del 20,5 % y cupones de híbridos de 97 M netos: 1.610 M entre 724 M de acciones.' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 2.75, multiplo: null, precio: null, justificacion: 'Ventas de 49.221 M y EBITDA de 8.269 M en 2028e (16,8 %); EBIT corriente de ≈4.580 M (amortización y renovación del 7,7 % y 100 M de puestas en equivalencia), resultado financiero de −1.070 M, impuestos del 25,8 %, minoritarios del 20,5 % y cupones de 97 M: 1.993 M entre 724 M de acciones. Sin cupones serían 2,89 EUR.' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 3.04, multiplo: null, precio: null, justificacion: 'Ventas de 50.175 M (+5 % y +4,5 % en 2027-2028) y margen EBITDA del 17,3 %; resultado financiero de −1.060 M con las ventas de activos: 2.203 M entre 724 M de acciones.' },
  ],
  per_historico: {
    base: 'adelantado', actual: 12.6, mediana_5a: 13.3, minimo_5a: 12.7, media_larga: 14.4,
    excluidos: 'Historia adelantada (cierre de cada año ÷ BPA corriente del año siguiente menos los cupones de los híbridos netos de impuestos; estimación propia con las acciones medias y los cupones de cada año [A1-A3]): 2020 13,2x (19,29 ÷ 1,46); 2021 20,3x (32,26 ÷ 1,59); 2022 13,3x (24,00 ÷ 1,80); 2023 14,0x (28,56 ÷ 2,04); 2024 12,7x (27,11 ÷ 2,13); 2025 12,9x (29,72 ÷ 2,30, nuestro 2026e). Mediana y mínimo de 2021-2025; media larga de 2020-2025. No se excluye ningún año, aunque 2021 (euforia de Suez con tipos negativos) sube la media. Actual: 31,93 ÷ 2,53 (nuestro 2027e).',
    v2: { mediana_5a: 15.1, minimo_5a: 13.3, media_larga: 16.1, excluidos: 'Historia al cierre (precio ÷ BPA corriente menos cupones del mismo año): 2021 22,1x; 2022 15,1x; 2023 15,9x; 2024 13,3x; 2025 14,0x. Sin 2020 (beneficio hundido por la covid).' },
  },
  diferencia_consenso: 'Nuestro BPA de 2026e (2,30 EUR) y de 2027e (2,53) están un 4-5 % por debajo del consenso (2,41 y 2,64) [D4], pero solo por la base: restamos los cupones de los híbridos (≈0,13 EUR por acción), que el BPA corriente de la empresa y el consenso no restan. Sin cupones, nuestras cifras (2,43 y 2,66) coinciden con el consenso, y las ventas y el EBITDA quedan un 1-2 % y menos de un 1 % por debajo. Nuestro objetivo base (35,48 EUR) queda un 8 % por debajo del objetivo medio de los analistas (38,56), que aplican múltiplos algo más altos.',
  media_12m: 34.15,
  objetivo_comentario: 'El objetivo a 12 meses (34,48 EUR) y el valor real (33,85 EUR) casi coinciden: Veolia está valorada más o menos por lo que vale, y la rentabilidad esperada a un año (12,7 % ponderada con el dividendo del 4,7 %) es sobre todo dividendo y crecimiento del BPA. Para que se abra una oportunidad haría falta que el riesgo país francés baje (el diferencial OAT-Bund, de 1,36 puntos, volviendo a 0,8) o que el precio caiga por debajo de 31,29 EUR sin cambio en el negocio.',
  valoracion_comentario: 'Pesos: DCF 60 % y escenarios 40 %, sin comparables, transacciones ni suma de partes. El DCF es el método natural en un negocio de contratos largos con márgenes estables, pero es muy sensible a la tasa por la deuda; los escenarios recogen esa asimetría. Los comparables de valor empresa no sirven con un puente de 32.000 M entre deuda, híbridos y minoritarios (el EV/EBITDA da de 28 a 104 EUR), y el PER de los comparables (34 EUR) solo confirma el rango. El valor real (33,85 EUR) queda un 6,0 % por encima del precio; con la prima del mercado, 41,71 EUR.',
  catalizadores: {
    items: [
      { fecha: '23 oct 2026', evento: 'Revisión de la calificación de Francia por Moody’s', efecto: 'Un recorte subiría la OAT y el riesgo país (la caída desde agosto es de −7,4 %); mantenerla aliviaría a las francesas', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '5 nov 2026', evento: 'Ventas y EBITDA de los nueve primeros meses', efecto: 'Confirmación de la guía de EBITDA (+5-6 %) y del resultado neto corriente (≥ +8 %); primeros datos de Clean Earth [A4]', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Oct-dic 2026', evento: 'Votación del presupuesto 2027 en Francia', efecto: 'Recargo del impuesto de sociedades de los grandes grupos un 30 % menor; riesgo de moción de censura y de más ruido político [D18]', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '17 feb 2027', evento: 'Resultados anuales de 2026 y guía de 2027', efecto: 'Último año del plan GreenUp; dividendo de 2026 [A4]', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-2028', evento: 'Ventas de activos de más de 2.000 M (500 M firmados en 2026)', efecto: 'Bajan la deuda hacia 2,5-3 veces el EBITDA; el precio de venta dirá si el mercado valora bien la cartera [A4]', probabilidad: 'Media', sentido: '+' },
      { fecha: '2027-2029', evento: 'Sinergias de Clean Earth (120 M USD en el año 4)', efecto: 'BPA corriente +3-4 % si se cumplen; Veolia dice que es acretiva desde 2027 [A9]', probabilidad: 'Media', sentido: '+' },
      { fecha: '4T26', evento: 'Jornada temática en Asia', efecto: 'Crecimiento en agua para microelectrónica y centros de datos [A4]', probabilidad: 'Alta', sentido: '+' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Riesgo país francés (diferencial OAT-Bund, rating, presupuesto)', tipo: 'Macro / país', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−20 % si se descuenta toda la empresa con la OAT (de 34,25 a 27,48 EUR); −7 a −10 % con la parte francesa', mitigante: 'Francia es el 19,3 % de las ventas y el 20,9 % del EBITDA de los segmentos; la deuda se financia en euros a tipo fijo (3,7 %) con rating propio BBB/Baa1; el tipo impositivo corriente bajó en 2025 (25,4 %) pese al recargo [A2, A5]', senal: 'Diferencial OAT-Bund por encima de 1,6 puntos o recorte de Moody’s el 23-oct' },
      { riesgo: 'Tipos de interés altos (Bund)', tipo: 'Valoración / financiación', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 % por cada medio punto de WACC (de 34,25 a 29,04 EUR)', mitigante: 'Deuda a tipo fijo con vida media de 6,2 años; las fórmulas de los contratos indexan la inflación [A5]', senal: 'Bund a 10 años por encima del 4 %' },
      { riesgo: 'Apalancamiento tras Clean Earth', tipo: 'Balance', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 % si las ventas de activos se retrasan y la deuda neta se queda por encima de 3 veces el EBITDA', mitigante: 'Plan de ventas de más de 2.000 M hasta mediados de 2028, 500 M firmados; liquidez de 15.205 M [A4, A5]', senal: 'Deuda neta / EBITDA por encima de 3,2 veces a fin de 2026' },
      { riesgo: 'Renovación de contratos públicos en Francia', tipo: 'Negocio / cliente', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Primer operador de agua delegada en Francia; los contratos se renuevan por tramos a lo largo de muchos años [B2]', senal: 'Pérdida de un gran contrato municipal (Lyon, Île-de-France) o margen de Francia por debajo del 16 %' },
      { riesgo: 'Integración de Clean Earth y precio pagado', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Historial con Suez (sinergias por encima de lo prometido) [A2]', senal: 'Sinergias por debajo de 40 M USD en 2027' },
      { riesgo: 'Divisas (dólar y emergentes)', tipo: 'Divisa', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−3 %', mitigante: 'Costes y ventas en la misma divisa en cada país', senal: 'Efecto divisa peor que −2 % en el EBITDA' },
      { riesgo: 'Consumo interno y actividad industrial en Francia y Europa', tipo: 'Ciclo', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−3 %', mitigante: 'Agua y residuos municipales poco cíclicos; la parte industrial francesa es pequeña', senal: 'Volúmenes de residuos industriales a la baja dos trimestres' },
    ],
    premortem: 'Es octubre de 2028 y la acción vale 22 EUR, un 30 % menos. La historia empezó a finales de 2026: Moody’s rebajó a Francia, el presupuesto 2027 salió con más impuestos tras una crisis de gobierno y el diferencial OAT-Bund se quedó en 1,5-2 puntos; el Bund subió al 4 %. Los ayuntamientos franceses, sin dinero, renegociaron contratos de agua a la baja y Lyon y otras ciudades volvieron a la gestión pública. Las ventas de activos se retrasaron porque los compradores pedían descuento, la deuda se quedó en 3,3 veces el EBITDA y S&P puso a Veolia en perspectiva negativa. El PER bajó a 10 veces, como en 2012-2013. Lo que lo habría anunciado: el diferencial OAT-Bund por encima de 1,6 puntos y un margen de Francia a la baja en los nueve meses.',
    ia: { exposicion: 'Baja', sentido: 'Mixto', efecto_valor: '+2 % en el base (eficiencias); sin riesgo de sustitución', comentario: 'La IA no sustituye lo que vende Veolia (tratar agua y residuos exige plantas y redes). Le afecta por dos vías: como herramienta de eficiencia (la empresa quiere que el 50 % de sus ahorros venga del digital y la IA en 2030, frente al 23 % en 2025) y como cliente, porque los centros de datos necesitan agua y refrigeración (objetivo de 1.000 M de ventas en 2030 con microelectrónica) [A4, A10]. El riesgo es que los ahorros se devuelvan al cliente en las renovaciones.' },
    confianza: 'Media',
  },
  esg: {
    materialidad: 'Lo material es lo que Veolia vende: agua, residuos y energía con menos emisiones. Sus mayores emisiones son las de la quema de carbón en redes de calor de Europa central (salida prevista hacia 2030) y las de los vertederos; su exposición a la regulación climática es por tanto doble, de coste y de demanda. Tiene buenas calificaciones (CDP A en clima y agua, 80/100 en S&P Global) [B2].',
    controversias: null,
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Francia', pregunta: '¿Qué parte del EBITDA francés viene de contratos públicos que se renuevan en 2026-2028 y qué margen se ha perdido en las últimas renovaciones?', por_que: 'Es el canal por el que el riesgo país llega al negocio, más que la deuda.' },
      { tema: 'Impuestos', pregunta: '¿Cuánto pagó Veolia por el recargo francés del impuesto de sociedades en 2025-2026 y cuánto ahorra con el presupuesto 2027?', por_que: 'El tipo corriente bajó en 2025; no está claro cuánto aporta Francia a la base imponible.' },
      { tema: 'Deuda', pregunta: '¿Ha subido el diferencial de crédito de los bonos de Veolia desde agosto y a qué coste se refinancian los 9.792 M que vencen en 2026?', por_que: 'Decide el coste de la deuda del WACC y el resultado financiero.' },
      { tema: 'Desinversiones', pregunta: '¿Qué activos componen el plan de ventas de más de 2.000 M y a qué múltiplo se firmaron los 500 M de 2026?', por_que: 'Si se venden por encima de 8 veces el EBITDA crean valor frente al múltiplo del grupo.' },
      { tema: 'Clean Earth', pregunta: '¿Cuánto EBITDA aportó Clean Earth en sus primeros meses y qué parte de las sinergias de 120 M USD está ya firmada?', por_que: 'Se pagó a 15 veces el EBITDA; las sinergias deciden si la compra crea valor.' },
      { tema: 'Híbridos', pregunta: '¿Piensa Veolia sustituir los híbridos por deuda ordinaria o por acciones cuando llegue la primera fecha de amortización?', por_que: 'Son 3.744 M y su cupón resta ≈0,13 EUR al BPA del accionista.' },
    ],
    confianza: 'Media',
  },
  sentimiento_temas: [
    { tema: 'La acción baja con buenos resultados', postura: 'Dividida', peso: 'Alto', contraste: 'Es cierto: guía elevada en julio y caída del 15 % desde el máximo; la mitad es riesgo país y la otra mitad la rebaja de Morgan Stanley y la caja del semestre [A4, D14, D17].' },
    { tema: 'Tipos de interés', postura: 'Bajista', peso: 'Alto', contraste: 'Los datos lo respaldan: el Bund ha subido medio punto desde julio y la OAT más de uno [D5, D7].' },
    { tema: 'Valor defensivo con dividendo', postura: 'Alcista', peso: 'Medio', contraste: 'Dividendo del 4,7 % y negocio poco cíclico; el informe coincide, pero con mucha deuda.' },
    { tema: 'Soporte técnico en 30 EUR', postura: 'Dividida', peso: 'Bajo', contraste: 'Sin valor para la tesis; coincide con el límite de compra por debajo de 31,29 EUR.' },
  ],
  sentimiento_lectura: 'El sentimiento ha empeorado pero no es extremo: el foro francés está desconcertado porque la acción baja con buenos resultados y culpa a los tipos, y el inversor estadounidense apenas la sigue [E1, E2]. No hay capitulación ni euforia, y coincide con un consenso de analistas dividido. Lo único que aporta es que la caída se lee como macro, igual que en el informe; no cambia la decisión.',
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Baja', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener, con convicción baja. El objetivo a 12 meses es 34,48 EUR (12,9 veces nuestro BPA de 2028e en el base), con una rentabilidad ponderada del 12,7 % y del 15,8 % en el base, con el dividendo: la ponderada no llega al 15 % que pide una compra. El valor real (33,85 EUR, DCF 60 % y escenarios 40 %) está un 6,0 % por encima del precio de 31,93 EUR. Y la calidad no pasa: el ROIC (6,9 %) supera al WACC (6,3 %) por menos de un punto, lejos de los 5 que exige una compra. La convicción es baja porque la regla absoluta y la relativa discrepan (con la prima del mercado el DCF da 42,45 EUR).

**El negocio.** Veolia es el líder mundial en agua, residuos y energía local, con contratos largos indexados a la inflación y clientes públicos e industriales [A2]. Desde la compra de Suez ha subido el margen EBITDA del 14,4 % al 16,0 % y el resultado neto corriente un 16 % anual [A2, A4]. Su punto débil es el balance: unos 32.000 M de deuda, arrendamientos e híbridos por delante del accionista, más que su capitalización, y una caja libre que no cubre las compras.

**Francia y la caída.** Francia es el 19,3 % de las ventas y el segmento de Francia y residuos peligrosos de Europa, el 20,9 % del EBITDA [A2]. El riesgo país le llega por cinco canales: el coste de la deuda (limitado: deuda a tipo fijo al 3,7 % con rating propio BBB/Baa1), los impuestos (el recargo de los grandes grupos, que el presupuesto 2027 rebaja un 30 %; el tipo corriente del grupo bajó en 2025), las tarifas y los contratos públicos (ayuntamientos con menos dinero que negocian más las renovaciones de agua), el consumo interno (poco: residuos y agua municipales) y, sobre todo, la tasa de descuento que aplica el mercado. La caída desde el máximo del 14-jul (−14,8 %) tiene dos mitades: del 14 al 31 de julio (−8 %) es propia (rebaja de Morgan Stanley, caja libre negativa y deuda tras Clean Earth); desde el 1-ago (−7,4 %) es riesgo país: cae lo mismo que el CAC 40 y seis puntos más que el STOXX 600 y las utilities europeas, con el diferencial OAT-Bund en 1,36-1,42 puntos [D7, D17]. Si el DCF se descontara con la OAT (4,85 %) en vez del Bund, el valor real bajaría un 19,8 %, a 27,14 EUR.

**Valoración.** El DCF da 34,25 EUR y el inverso dice que el precio descuenta un crecimiento del 2,6 % anual, casi nuestro base (2,9 %). En PER adelantado cotiza a 12,6 veces, en su mediana de cinco años (13,3). Nuestro BPA coincide con el consenso una vez quitados los cupones de los híbridos [D4]. El apalancamiento abre mucho los escenarios: de 10 a 54 EUR.

**Riesgos y catalizadores.** El riesgo mayor es que el riesgo país y los tipos se queden altos (−20 % con la OAT), y después el apalancamiento si se retrasan las ventas de activos. Catalizadores con fecha: Moody’s sobre Francia el 23-oct, los nueve meses el 5-nov, el presupuesto 2027 y los anuales el 17-feb-2027. El riesgo de IA es bajo: es una herramienta de eficiencia y una fuente de demanda (agua para centros de datos), no un sustituto.

**Qué cambiaría la decisión.** Por debajo de 31,29 EUR la rentabilidad ponderada pasaría del 15 %, pero sin ROIC − WACC ≥ 5 no sería una compra robusta. Venderíamos por encima de 39,98 EUR o si el diferencial OAT-Bund pasa de 2 puntos con un recorte del rating de Veolia.`,
    tesis: 'Veolia es el líder mundial de servicios medioambientales esenciales, con contratos indexados a la inflación y un margen que sube con los ahorros y las sinergias de Suez [A2]. Pero tiene mucha deuda y crea poco valor sobre su coste de capital (ROIC del 6,9 % frente a un WACC del 6,3 %), y al precio actual el mercado ya descuenta nuestro caso base. Con la prima de riesgo francesa en máximos desde 2012, la acción depende más de la OAT que de sus resultados.',
    vision_diferencial: {
      mercado_descuenta: 'Un crecimiento del 2,6 % anual, un PER adelantado de 12,6 veces y un riesgo país francés que se queda: el precio ya incorpora la mitad de la subida del diferencial.',
      nuestra_vision: 'Coincidimos en el negocio y en el BPA; vemos más riesgo en el balance (híbridos y minoritarios que el PER no recoge) y menos en el negocio francés, que es una quinta parte del grupo.',
      por_que: 'La caída de agosto a octubre ha sido igual que la del CAC 40, sin noticias de la empresa: el mercado vende Francia, no Veolia. Pero a 12,6 veces el BPA y con un ROIC que apenas supera el WACC, no hay margen de seguridad suficiente para comprar.',
    },
    a_favor: [
      '**Negocio esencial**: agua, residuos y energía con contratos indexados a la inflación; margen EBITDA del 16,0 % en el 1S26, +70 puntos básicos [A4].',
      '**Ejecución**: guía cumplida en 2023, 2024 y 2025, sinergias de Suez por encima de lo prometido y guía de 2026 elevada en julio [C3, C4].',
      '**Dividendo**: 4,7 % de rentabilidad, creciendo con el BPA corriente [A4].',
      '**Valoración en su mediana**: 12,6 veces el BPA adelantado y el precio descuenta nuestro crecimiento base.',
      '**Riesgo país ya en el precio**: −7,4 % desde agosto, como el CAC 40, sin noticias propias [D17].',
    ],
    en_contra: [
      '**Calidad para comprar**: ROIC − WACC de 0,6 puntos, lejos de los 5 que se piden.',
      '**Deuda**: unos 32.000 M de deuda, arrendamientos e híbridos, 3 veces el EBITDA con Clean Earth [A4].',
      '**Sensibilidad a la tasa**: con la OAT en vez del Bund, el valor real baja un 19,8 %.',
      '**Caja libre**: negativa en el 1S26 (−288 M) y no cubre las compras [A4].',
      '**Compra cara**: Clean Earth a 15 veces el EBITDA, el doble que el grupo [A9].',
    ],
    que_vigilar: 'La tesis depende de que el riesgo país francés no pase al negocio (renovación de contratos de agua y margen de Francia) y de que la deuda baje con las ventas de activos. La señal de que no se cumple: un diferencial OAT-Bund por encima de 1,6 puntos con un margen de Francia a la baja en los nueve meses, o una deuda neta por encima de 3,2 veces el EBITDA a fin de 2026.',
    cambiaria_recomendacion: [
      'Si el precio baja de 31,29 EUR sin cambios en la guía el 5-nov, la rentabilidad ponderada pasaría del 15 %; aun así, sin ROIC − WACC ≥ 5 no sería una compra robusta.',
      'Si el precio supera 39,98 EUR sin mejora del BPA, pasaríamos a Vender.',
      'Si Moody’s rebaja a Francia y el diferencial OAT-Bund pasa de 2 puntos con una rebaja del rating de Veolia, rebajaríamos el base y probablemente pasaríamos a Vender.',
      'Si las ventas de activos se firman por encima de 9 veces el EBITDA y la deuda baja de 2,7 veces, subiríamos el caso base.',
    ],
    kpis_seguimiento: [
      { kpi: 'Diferencial OAT-Bund a 10 años', nivel_actual: '1,36 puntos (19-oct-2026)', umbral_alerta: '> 1,6 puntos', por_que: 'Mide el riesgo país que el mercado aplica a las francesas [D7].' },
      { kpi: 'Crecimiento orgánico del EBITDA', nivel_actual: '+5,0 % (1S26)', umbral_alerta: '< +4 % en el año', por_que: 'Guía del +5-6 % y base del caso base [A4].' },
      { kpi: 'Deuda financiera neta / EBITDA', nivel_actual: '≈3,4x (30-jun-2026, con estacionalidad; guía ≈3x a fin de año)', umbral_alerta: '> 3,2x a fin de 2026', por_que: 'Con el rating BBB, decide el margen para comprar y el coste de la deuda [A4, A5].' },
      { kpi: 'Margen EBITDA de Francia y residuos peligrosos de Europa', nivel_actual: '16,5 % (2025)', umbral_alerta: '< 16 %', por_que: 'Es donde llegaría al negocio el riesgo país [A2].' },
      { kpi: 'Ventas de activos firmadas', nivel_actual: '≈500 M (2026)', umbral_alerta: '< 1.000 M a fin de 2027', por_que: 'Plan de más de 2.000 M hasta mediados de 2028 [A4].' },
    ],
  },
};
