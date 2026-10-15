// Textos del analista para Exelixis (corte 2026-10-15). Citas con letra de nota: [A1] = fuente 1 de A.json; [P1] = fuente propia.
const fuentes = [
  { id: 1, titulo: 'Ficha sectorial corta: biofarma de neurología y enfermedades raras en EE. UU. (sectores/biofarma-neurologia-2026-10-15.md; Exelixis figura entre sus cotizadas)', editor: 'Análisis propio', tipo: 'Sectorial', fecha: '2026-10-15', url: 'sectores/biofarma-neurologia-2026-10-15.md' },
];

const secciones = {
  historia: {
    resumen: 'Exelixis nació en 1994 en el sur de San Francisco como empresa de genómica aplicada a la búsqueda de fármacos; Stelios Papadopoulos, cofundador, preside el consejo desde 1998 [C1]. Durante quince años vivió de alianzas con grandes farmacéuticas y de una cartera de moléculas que casi nunca llegaba al mercado. El giro fue cabozantinib, descubierto en la casa: aprobado en 2012 para el cáncer medular de tiroides (COMETRIQ) y en 2016 para el cáncer renal (CABOMETYX), con Ipsen y Takeda como socios fuera de EE. UU. [A1]. Michael Morrissey, consejero delegado desde 2010, convirtió el producto en la combinación de referencia con nivolumab en primera línea de riñón (2021) y lo amplió a hígado, tiroides y tumores neuroendocrinos [A1, C1]. Desde 2022 tiene la presión de dos activistas, Farallon y Caligan, que forzaron recompras (2.900 M USD desde 2023) y tres consejeros nuevos [A3, C1]. Su segunda molécula, zanzalintinib, espera la decisión de la FDA en colorrectal para el 3-mar-2027 [D12].',
    hitos: [
      { anio: '1994', hito: 'Fundación; Stelios Papadopoulos, cofundador, preside el consejo desde 1998 [C1].' },
      { anio: '2000', hito: 'Salida a bolsa en el Nasdaq; Michael Morrissey entra como responsable de investigación [C1].' },
      { anio: '2012', hito: 'La FDA aprueba COMETRIQ (cabozantinib) para el cáncer medular de tiroides [A1].' },
      { anio: '2016', hito: 'CABOMETYX aprobado en cáncer renal tras tratamiento previo; licencia a Ipsen fuera de EE. UU. y Japón [A1].' },
      { anio: '2021', hito: 'Aprobación de CABOMETYX con nivolumab en primera línea de cáncer renal (CheckMate-9ER) [A1].' },
      { anio: '2023', hito: 'Primera recompra de acciones y acuerdo con Caligan: tres consejeros nuevos; pacto con Teva para genéricos desde el 1-ene-2031 [A3, C1, B6].' },
      { anio: '2025', hito: 'Aprobación en tumores neuroendocrinos (marzo) y fase 3 STELLAR-303 positiva en supervivencia de zanzalintinib en colorrectal [A1, A3].' },
      { anio: '2026', hito: 'La FDA acepta la solicitud de zanzalintinib (feb) y retrasa la decisión al 3-mar-2027 (sep); el Circuito Federal fija el genérico de MSN no antes del 15-ene-2030 (ago) [A4, D12, B5].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Exelixis es una biotecnológica de Alameda (California) que vive de una molécula: cabozantinib, un inhibidor oral de varias tirosina-quinasas (MET, AXL, VEGFR, RET) que descubrió ella misma [A1]. En EE. UU. lo vende con su propia red como CABOMETYX (comprimidos) para el cáncer renal avanzado —sobre todo en primera línea con nivolumab—, el hepatocarcinoma tratado, el cáncer de tiroides diferenciado y, desde marzo de 2025, los tumores neuroendocrinos; y como COMETRIQ (cápsulas) para el cáncer medular de tiroides [A1]. Fuera de EE. UU. lo venden Ipsen y Takeda, que le pagan royalties (179 M USD en 2025) [A5]. Fabrica con terceros y tiene 1.077 empleados, la mitad en I+D [A1]. Su apuesta para sustituir a cabozantinib es zanzalintinib, un inhibidor de nueva generación en fase 3 en colorrectal (solicitud ante la FDA), riñón de células no claras, tumores neuroendocrinos y, con Merck, en combinación con belzutifan [A3].',
    como_gana_dinero: 'Es un negocio de patente y casi puro margen: el coste de ventas fue el 3,9 % de las ventas de producto en 2025 y el gasto está en I+D (825 M USD) y en la red comercial y la administración (519 M) [A1]. Las ventas de producto en EE. UU. (2.123 M) crecieron un 17 % por volumen (unidades +16 %), porque la combinación con nivolumab alarga los tratamientos, y apenas por precio (+1 % neto) [A1]. Los descuentos ya se comen el 29,5 % de las ventas brutas y crecen con el 340B y los programas públicos [A1]. Cada dólar de más llega casi entero al resultado mientras el I+D no suba, por eso el margen EBITDA pasó del 10,7 % de 2023 al 39,7 % de 2025 con el I+D a la baja. Los royalties de Ipsen y Takeda (8 % de los ingresos) son puro beneficio, menos el 3 % que se cede a Royalty Pharma [A1]. No hay estacionalidad relevante; los hitos de los socios hacen saltar algunos trimestres (150 M en el 2T24) [A1].',
    clientes: 'Vende a unos pocos distribuidores y farmacias especializadas, pero quien paga es el sistema: Medicare, Medicaid y las aseguradoras [A1]. El poder de precios es limitado: subió el precio de lista un 3 % en enero de 2026, pero el precio neto medio subió solo un 1 % en 2025 por los descuentos crecientes [A9, A1]. Lo que protege el volumen es la evidencia clínica: la combinación con nivolumab duplicó la supervivencia sin progresión frente a sunitinib en CheckMate-9ER, con beneficio en supervivencia global a cinco años [A1]. El riesgo de pagador es el IRA: cabozantinib tiene la excepción de pequeña biotecnológica hasta el año de precios 2028 y un suelo de precio en 2029-2030 si sigue cumpliendo los requisitos [B2]. Medicare Parte D le aplica además la subida gradual de descuentos de fabricante hasta 2031 [B2].',
  },
  sector: {
    definicion: 'El mercado relevante es el de los fármacos para el cáncer renal avanzado, la indicación que más pesa en las ventas de cabozantinib: 8.200 M USD en 2025 en los siete mayores mercados según IMARC, con una previsión del 4,22 % anual hasta 2036 [B3]. Una segunda fuente da 6.600 M para todos los fármacos del cáncer de riñón en el mundo y un 6,4 % anual hasta 2032 [B4]: usamos IMARC porque su perímetro (cáncer avanzado) es el de cabozantinib. Hígado, tiroides y tumores neuroendocrinos son mercados más pequeños sin tamaño publicado fiable; el colorrectal resistente es el primer mercado de zanzalintinib [A1].',
    drivers: [
      { driver: 'Combinaciones con inmunoterapia en primera línea de riñón', efecto: '+', horizonte: 'Estructural', evidencia: 'Las recargas por la mayor duración del tratamiento con nivolumab explican la mayor parte del +16 % de unidades de 2025 [A1].' },
      { driver: 'Nuevas indicaciones (tumores neuroendocrinos)', efecto: '+', horizonte: 'Estructural', evidencia: 'Aprobación de mar-2025; la empresa amplió su red digestiva para acelerar ventas [A5].' },
      { driver: 'Genéricos de cabozantinib', efecto: '−', horizonte: 'Estructural', evidencia: 'MSN no antes del 15-ene-2030; Teva y otros con licencia desde el 1-ene-2031 [B5, B6].' },
      { driver: 'Precios de Medicare (IRA) y nación más favorecida', efecto: '−', horizonte: 'Estructural', evidencia: 'Excepción de pequeña biotecnológica hasta 2028 y suelo de precio en 2029-2030; aranceles de hasta el 100 % a importados desde abr-2026 [B2].' },
      { driver: 'Nuevos mecanismos en riñón (inhibidores de HIF-2α)', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Belzutifan de Merck compite en segunda línea y a la vez es socio de zanzalintinib en LITESPARK-033 y -034 [B8, A3].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Cinco pautas aprobadas en primera línea de riñón de Merck, BMS, Pfizer y Eisai, y más en desarrollo [B1].' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Medicare y las aseguradoras: descuentos del 29,5 % de las ventas brutas y negociación del IRA a partir de 2029 [A1, B2].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Fabricación contratada; coste de ventas del 3,9 % de las ventas de producto [A1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Seis solicitudes de genérico y tres de fórmulas 505(b)(2) ya presentadas; entrada pactada en 2030-2031 [A2].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 4, justificacion: 'Inhibidores de HIF-2α, anticuerpos conjugados y nuevas combinaciones de inmunoterapia [B1, B8].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'No hay ciclo económico: los tratamientos oncológicos crecieron en 2009, 2020 y 2022 [P1]. El ciclo que importa es el de la patente: cabozantinib está en su último tramo de exclusividad (composición vencida en ago-2026; patentes de sal y formulación hasta 2030-2033) [A1]. Las ventas aún crecen un 10 % anual en el 1S26 [A3], pero la empresa entra en la fase en que el mercado mira el sustituto y no el producto.' },
    regulacion: 'Tres frentes. El IRA: cabozantinib está exento de negociación hasta el año de precios 2028 y tiene un suelo de precio en 2029-2030 si sigue siendo «pequeña biotecnológica» [B2]. Los genéricos: el Circuito Federal confirmó el 31-ago-2026 las patentes que retrasan a MSN hasta el 15-ene-2030, y el juicio por la patente \'039 (vence en feb-2032) empieza el 2-nov-2026 [B5, A2]. La FDA: la decisión sobre zanzalintinib en colorrectal pasó del 3-dic-2026 al 3-mar-2027 por una enmienda mayor de la solicitud [D12]. Además, aranceles de hasta el 100 % a medicamentos importados con patente desde abril de 2026 [B2].',
    tendencias: 'La tendencia que decide es el relevo de mecanismos en riñón: los inhibidores de HIF-2α (belzutifan) y las combinaciones triples desplazan a los inhibidores de quinasa en algunas líneas [B1, B8]. Exelixis ha optado por aliarse: Merck lleva dos fases 3 de zanzalintinib con belzutifan, una de ellas frente a cabozantinib en primera línea tras inmunoterapia adyuvante [A3]. En colorrectal, la detección de enfermedad residual con ADN tumoral circulante abre el ensayo STELLAR-316 con Natera [A3]. La IA en el diseño de moléculas acorta el desarrollo de los rivales, pero no cambia la economía de una patente ya en el mercado.',
  },
  competencia: {
    amenazas: 'La amenaza no es perder cuota antes de 2030, sino la fecha: los genéricos de MSN pueden entrar el 15-ene-2030 y los de Teva y los demás pactados el 1-ene-2031 [B5, B6]. Un medicamento oral pequeño pierde el 80-90 % de sus ventas en uno o dos años tras el genérico (estimación propia por precedentes del sector). Antes, el riesgo es competitivo: Merck con belzutifan y Pfizer y Eisai con sus combinaciones; RBC calculó en marzo que los datos de Merck podían costar a la acción un 5-10 % [B8]. La probabilidad de que zanzalintinib no llegue a sustituir a cabozantinib a tiempo es media: colorrectal tiene un beneficio modesto y un retraso de la FDA, y el resto de fases 3 aún no tiene datos [A3, D12].',
  },
  financieros: {
    comentario: 'Los ingresos pasaron de 1.435 M USD en 2021 a 2.320 M en 2025 (TCAC del 12,8 %), todo orgánico [A1]. El margen EBITDA fue del 20,9 % en 2021, cayó al 10,7 % en 2023 por un I+D de 1.044 M (licencias de moléculas incluidas) y subió al 39,7 % en 2025 tras la reestructuración de 2024 y un I+D de 825 M [A1]. El 2024 lleva 150 M de un hito comercial de Ipsen que no se repite, por eso 2025 crece solo un 7 % con las ventas de producto al +17 % [A1]. El BPA pasó de 0,72 USD en 2021 a 2,78 en 2025 (TCAC del 40,2 %), ayudado por la recompra del 12,6 % de las acciones diluidas [A1]. En los 12 meses a junio de 2026: ingresos de 2.436 M, EBIT de 972 M y BPA de 3,18 USD [A2, A3].',
    ajustes: 'Usamos el BPA publicado (US GAAP). La empresa publica además un BPA «no GAAP» que excluye los pagos en acciones (113 M en 2025; 0,30 USD por acción después de impuestos): 3,08 USD frente a 2,78 en 2025 [A5]. Partidas no recurrentes dentro del EBITDA, que el motor devuelve: en 2024, deterioro de 51,7 M de oficinas arrendadas y 33,7 M de reestructuración (−13 % de plantilla); en 2025, 20,5 M de reestructuración [A1]. Las licencias de moléculas en fase temprana (I+D en curso comprada: 122,5 M en 2023, 110,8 M en 2022) van en el I+D y se repiten cada año en menor cuantía: no las ajustamos [A1, A8].',
  },
  trimestres: {
    ultima_presentacion: 'En la conferencia del 2T26 (5-ago) la dirección rebajó la guía de ingresos de 2026 a 2.500-2.550 M USD (desde 2.525-2.625 M) y la de ventas de producto a 2.300-2.350 M, aunque las ventas del trimestre crecieron un 10,2 % (573 M) [A3]. Bajó también la guía de I+D (825-875 M). El mensaje cambió respecto a enero, cuando habló de «un año de despegue»: ahora el foco es la ejecución de zanzalintinib y el gasto contenido [A9, A3]. Las preguntas de los analistas se concentraron en el análisis final del subgrupo sin metástasis hepáticas de STELLAR-303 (tendencia favorable sin significación estadística, junio de 2026) y en la etiqueta que podrá obtener zanzalintinib, en la competencia de belzutifan y en la fecha de STELLAR-304 («segundo semestre, según eventos»), que ya se ha retrasado varias veces [A3, D13]. La dirección no cuantificó el efecto de los descuentos en el precio neto ni dio objetivos de ventas para zanzalintinib. Un mes después, la FDA amplió tres meses la revisión de colorrectal tras recibir datos actualizados [D12].',
  },
  balance: {
    otros_pasivos: 'No hay deuda financiera ni rating [A2]. Los pasivos que no parecen deuda son los arrendamientos operativos de la sede de Alameda (166 M a largo plazo), que en US GAAP no van al puente porque su gasto ya está en el EBITDA [A2]; los descuentos y comisiones a clientes (66,7 M) y los ensayos clínicos devengados (59,8 M), que son circulante [A2]. No hay pensiones. Litigios de patentes como demandante (MSN, Azurity) y despachos de abogados que buscan accionistas para posibles demandas, sin demanda presentada [A2, D10].',
    comentario: 'La caja e inversiones se han mantenido en 1.700-2.100 M desde 2021 pese a recomprar 2.187 M en 2023-2025: la recompra se paga con el flujo del año [A1]. En el 1S26 bajó a 1.384 M (desde 1.663 M) por 753 M de recompras [A2]. El circulante comercial es del 12 % de las ventas, con clientes que suben al ritmo de las ventas (287 M a cierre de 2025) [A1].',
  },
  flujos: {
    comentario: 'La conversión del beneficio en caja es alta: el flujo libre acumulado de 2021-2025 (2.522 M) fue el 131 % del beneficio neto, porque los pagos en acciones (113 M en 2025) y el efecto de los impuestos diferidos no salen de caja [A1]. Casi todo se devolvió: 2.187 M en recompras en el periodo. El capex es mínimo (0,4 % de las ventas en 2025, con el edificio ya hecho) y el negocio no necesita capital para crecer: el «capex» de verdad son las licencias de moléculas (313 M en 2021-2025, en I+D en curso comprada) [A1]. El LTM a junio de 2026 (1.173 M de flujo libre) está inflado por la recuperación de 99 M de pagos anticipados en el 1S26 [A2].',
  },
  calidad: {
    comentario: 'Las cuentas son limpias: Ernst & Young sin salvedades y control interno eficaz [A1]. Altman Z de 16,00 (zona segura, por la caja y el patrimonio), Piotroski F de 7 y Beneish M de −2,59, lejos de la zona de manipulación. Los ingresos se reconocen netos de descuentos estimados (29,5 % de las ventas brutas), la partida de más juicio contable; las desviaciones de años anteriores han sido pequeñas [A1]. Los pagos en acciones son el 14 % del beneficio neto (113 M) y el BPA ajustado que usa el mercado los excluye [A5]. La I+D en curso comprada se lleva a gasto (no se activa), lo que es conservador [A1]. El tipo impositivo del 17 % de 2025 está por debajo del normal por deducciones de I+D; la guía de 2026 es del 21-23 % [A1, A9].',
    senales: [
      { senal: 'Descuentos sobre ventas brutas al alza', nivel: 'Media', comentario: 'Del 28,1 % al 29,5 % en un año; reducen el precio neto real [A1].' },
      { senal: 'Hitos de socios que hacen saltar los ingresos', nivel: 'Baja', comentario: '150 M de Ipsen en el 2T24 inflan la base de 2024 [A1].' },
      { senal: 'Remuneración en acciones creciente', nivel: 'Baja', comentario: '113 M en 2025 (94 M en 2024); concesión extraordinaria al consejero delegado [A1, C1].' },
    ],
  },
  rentabilidad: {
    comentario: 'Exelixis crea valor desde 2021 con holgura: el ROIC de 2025 fue del 149,3 % frente a un WACC del 11,11 %. El capital invertido es de solo 497 M porque no hay deuda, la caja se excluye y el negocio no necesita fábricas ni inventario; por eso cualquier ROIC sale enorme [A1]. Lo que lo mueve es el margen: de un 9,3 % de margen EBIT en 2023 a un 38,5 % en 2025 sin cambiar el capital. El ROE (35,5 %) es la medida más útil para comparar con sus pares: Vertex y United Therapeutics tienen ROIC del 29-31 % [B7]. El ROIC incremental histórico (366,7 %) dice que el crecimiento reciente no ha necesitado capital; lo que no mide es lo que sostiene ese ROIC: una patente que vence en 2030-2031.',
    confianza: 'Alta',
  },
  capital: {
    politica: 'No paga dividendo. Las prioridades declaradas son invertir en I+D (zanzalintinib y la cartera temprana), devolver caja con recompras y hacer compras o licencias «oportunistas» [A3]. Desde marzo de 2023 ha recomprado 2.900 M USD (93,3 M de acciones a 31,12 USD de media); en mayo de 2026 el consejo aprobó otro programa de 750 M hasta el 31-dic-2027 [A3].',
    comentario: 'Buen asignador desde que llegaron los activistas: las recompras se hicieron a 31,12 USD de media frente a 60,99 de hoy, y redujeron las acciones diluidas un 12,6 % entre 2021 y 2025 [A3, A1]. Antes, el historial es peor: en 2021-2023 gastó en I+D y licencias como si cabozantinib no fuera a vencer (I+D de 1.044 M en 2023) y tuvo que reestructurar en 2024 con 85 M de cargos [A1]. Las licencias compradas (313 M en cinco años) no han dado todavía ningún producto [A1]. La gran decisión pendiente es qué hacer con 1.384 M de caja si zanzalintinib no basta: seguir recomprando o comprar un producto ya en el mercado.',
  },
  directivos: {
    comentario: 'Equipo estable y de la casa: el consejero delegado lleva 26 años en la empresa y 16 en el cargo, el director de I+D descubrió cabozantinib y el comercial lleva desde 2010 [C1]. La credibilidad de la guía es correcta pero no brillante: cumplió 2025 subiéndola dos veces y rebajó 2026 en agosto [C4, C5]. Los plazos de los ensayos se han retrasado varias veces (STELLAR-304 pasó de 2025 a «segundo semestre de 2026») [D13]. No hay plan de sucesión público para un consejero delegado de 65 años, y la directora médica salió en agosto de 2025 [C1].',
  },
  gobierno: {
    remuneracion: 'El consejero delegado cobró 33,24 M USD en 2025: 1,31 M de fijo, 1,38 M de variable anual y 30,54 M en acciones (10,01 M en 2024), 81 veces la remuneración mediana de la plantilla [C1]. El variable a largo plazo se mide por rentabilidad total relativa frente al índice Nasdaq Biotechnology a tres años [C1]. El voto consultivo de 2026 tuvo un 20,9 % en contra (163,1 M a favor y 43,2 M en contra), el umbral a partir del cual los asesores de voto piden explicaciones, por la concesión extraordinaria [C2].',
    control_y_defensas: 'No hay accionista de control: Vanguard (12,3 %), BlackRock (11,1 %) y Farallon (6,1 %) son los mayores [C1]. Una acción, un voto; consejo elegido cada año por mayoría (sin consejo escalonado) y presidente independiente separado del consejero delegado [C1]. Los activistas han tenido efecto: Caligan, cuyo gestor se sienta en el consejo, consiguió en 2023 tres consejeros y la política de recompras [C1]. No hay operaciones vinculadas relevantes. Las ventas de directivos (42,2 M en 12 meses) son altas para una empresa de 15.656 M, y solo una sexta parte con planes programados [C3].',
  },
  consenso: {
    guidance: 'Guía de 2026 (5-ago-2026): ingresos totales de 2.500-2.550 M USD, ventas de producto de 2.300-2.350 M (con una subida de precio de lista del 3 %), coste de ventas del 3,5-4,5 %, I+D de 825-875 M, comercial y administración de 575-625 M y tipo impositivo del 21-23 % [A3]. No incluye ventas de zanzalintinib. La guía de enero era de 2.525-2.625 M de ingresos [A9]. No hay objetivos a medio plazo publicados.',
    revisiones: 'El consenso de Stock Analysis (S&P Global) es de BPA ajustado (sin pagos en acciones): 3,58 USD en 2026 (17 analistas) y 4,27 en 2027, con ventas de 2.600 y 2.900 M [D2]. La recomendación media es «comprar» según S&P, pero MarketBeat la da como «mantener»; el objetivo medio es de 54,87 USD (41-70), por debajo del precio [D2, D10]. En el último mes los objetivos suben (RBC de 45 a 51, Truist de 52 a 54) y Bank of America mantiene vender a 41 [D2, D10]. Solo hay una fuente gratuita con estimaciones completas: lo decimos en las limitaciones.',
  },
  bolsa: {
    comentario: 'La acción ha batido al mercado: +52,4 % en un año frente al +16,9 % del S&P 500 y el +36,0 % del índice de biotecnología (XBI), y un 41,9 % anual en tres años [D1]. Dos motores: las recompras (el BPA crece más que el beneficio) y la expectativa sobre zanzalintinib [A3]. Cotiza en máximos históricos (61,66 USD el 12-oct) tras recuperarse de la caída del 12 % de oct-2025 por los datos de STELLAR-303 [D1, D11]. La posición corta es alta: el 11,37 % de las acciones [D3]. Beta mensual de cinco años de 0,48 y volatilidad del 36,8 %.',
    contexto: {
      movimiento: { fecha: '2026-10-15', var_1m_pct: 10.5, var_3m_pct: 12.2, var_6m_pct: 41.4, var_12m_pct: 58.9, dist_max_52s_pct: 0.0, dist_min_52s_pct: 81.7, dist_max_historico_pct: 0.0, tendencia: 'alcista', volatilidad_60d_pct: 34.0, avisos: ['P2 Cerca de máximos tras subir'] },
      movimientos_fuertes: [
        { periodo: 'oct-2025 (20-oct, −12,0 % en un día)', var_pct: -12.0, causa: 'Presentación en el ESMO de los datos de STELLAR-303: beneficio en supervivencia modesto frente a regorafenib en colorrectal [D11].', veredicto: 'no cambia', condicion: null },
        { periodo: 'nov-2025', var_pct: 14.2, causa: 'Resultados del 3T25 por encima y guía de 2025 subida a 2.300-2.350 M [A6].', veredicto: 'no cambia', condicion: null },
        { periodo: 'mar-2026 (2-mar, −6,9 % en un día)', var_pct: -6.9, causa: 'Datos de Merck con belzutifan en riñón y recorte de objetivo de RBC por la competencia [B8].', veredicto: 'no cambia', condicion: null },
        { periodo: 'may-2026', var_pct: 13.5, causa: 'Resultados del 1T26 (BPA de 0,79 frente a 0,55), nueva recompra de 750 M y acuerdo con Merck para STELLAR-316 [A4, A3].', veredicto: 'no cambia', condicion: null },
        { periodo: 'ago-2026 (6-ago, −7,9 % en un día)', var_pct: -7.9, causa: 'Rebaja de la guía de ingresos de 2026 con los resultados del 2T26 [A3].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-06-22', tipo: 'resultados', hecho: 'Análisis final de STELLAR-303: tendencia favorable en supervivencia sin significación estadística en el subgrupo sin metástasis hepáticas [A3, D13].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-31', tipo: 'demanda o regulador', hecho: 'El Circuito Federal confirma las patentes \'439, \'440 y \'015: el genérico de MSN no antes del 15-ene-2030; juicio de la patente \'039 (feb-2032) desde el 2-nov-2026 [B5].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-11', tipo: 'demanda o regulador', hecho: 'La FDA amplía tres meses la revisión de zanzalintinib en colorrectal: nueva fecha el 3-mar-2027 [D12].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-08', tipo: 'recomendación', hecho: 'RBC sube el objetivo de 45 a 51 USD (sector perform); Truist de 52 a 54 (mantener); Bank of America mantiene vender con 41 USD [D2, D10].', veredicto: 'no cambia', condicion: null },
        { fecha: '2025-10-15 a 2026-10-15', tipo: 'directivos', hecho: 'Ventas de consejeros y directivos de 42,2 M USD (I+D 7,7 M, comercial 7,6 M, financiero 4,6 M, presidente 4,4 M) y una sola compra de 1,19 M (consejero de Caligan) [C3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-11-03', tipo: 'resultados', hecho: 'Resultados del 3T26 (fecha estimada por el calendario de 2025) y datos de STELLAR-304 «en el segundo semestre» [A3].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-11-03',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La subida de 12 meses (+58,9 %) tiene causas conocidas: recompras, resultados por encima y la expectativa sobre zanzalintinib; ningún movimiento fuerte viene de algo que la tesis no recoja. Los hechos pendientes con fecha (juicio de la patente \'039 desde el 2-nov, datos de STELLAR-304 en el semestre y decisión de la FDA el 3-mar-2027) son la propia tesis y están en los escenarios, no son ajenos al análisis; no hay colocaciones ni ampliaciones. Las ventas de directivos son altas pero repartidas y sin un vendedor dominante. Veredicto: no cambia.',
    },
  },
  multiplos_historicos: {
    comentario: 'Exelixis cotiza a 19,2 veces el beneficio de los últimos 12 meses frente a una media de 25,4 en los cierres de 2021-2025 (percentil 40), y a 14,3 veces el EBITDA frente a una media de 13,4 (percentil 80) [D1]. La media del PER de 2021-2023 está inflada por un beneficio deprimido por el I+D (1.044 M en 2023); con la base adelantada (precio ÷ BPA del año siguiente) la mediana de cinco años es de 14,0 veces y hoy paga 16,5 veces nuestro BPA de 2027. Lo estructural es que cada año que pasa acerca el vencimiento de 2030-2031: un múltiplo constante sobre un beneficio que se acerca al precipicio es cada vez más caro.',
  },
  comparables: {
    criterio: 'Biofarmacéuticas estadounidenses rentables de tamaño medio con pocos productos y vencimientos conocidos (las de la ficha sectorial de biofarma) [P1]: Incyte (Jakafi vence en 2028), Jazz (ya pasó el genérico de Xyrem), Neurocrine (INGREZZA hasta 2038), United Therapeutics, BioMarin y Vertex. No hay comparables puros de oncología de un producto con ese tamaño; las grandes de oncología (Merck, BMS, Pfizer) son diversificadas y no sirven. Todas con datos de Stock Analysis al cierre del 14-oct [D4].',
    comentario: 'Exelixis cotiza a 14,3 veces el EBITDA de 12 meses y a 14,8 veces el BPA ajustado de los próximos 12 meses, frente a medianas de 14,1 y 12,0 [D4]. Es de las que tienen el vencimiento más cerca (2030-2031) y cotiza por encima de las que ya lo están sufriendo (Jazz e Incyte, 8-9 veces el EBITDA) y casi como Neurocrine, cuyo vencimiento es de 2038 [D4]. La prima se explica por la caja (1.384 M) y por zanzalintinib. El valor implícito por PER (49,49 USD de mediana) aplica a Exelixis un múltiplo de empresas con vencimientos más lejanos; por eso los comparables pesan solo un 20 %.',
  },
  transacciones: {
    comentario: 'No hay operaciones recientes de oncología de un producto con múltiplo publicado y perímetro comparable; usamos las tres de biofarma de la ficha sectorial (12-21 veces las ventas: Intra-Cellular, GW y Soleno) [D7, D8, D9]. Todas se pagaron por crecimiento con patentes largas, lo contrario de Exelixis; aplicadas a sus ventas darían 135,17 USD por acción, una cifra sin sentido para un producto que vence en 2030. Exelixis puede ser objetivo (sin accionista de control, activistas en el consejo, 1.384 M de caja), pero un comprador pagaría por zanzalintinib, no por cabozantinib. Peso cero.',
  },
  catalizadores: {
    items: [
      { fecha: '2-nov-2026', evento: 'Juicio de la patente \'039 (vence en feb-2032) frente a MSN y Azurity', efecto: 'Si gana, el genérico de MSN se retrasa de 2030 a 2032 y la empresa gana casi un año de ventas (≈ +10 % del valor)', probabilidad: 'Media', sentido: '+' },
      { fecha: '3-nov-2026 (estimada)', evento: 'Resultados del 3T26', efecto: 'Ventas de producto frente a la guía rebajada (2.300-2.350 M)', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2S-2026', evento: 'Datos de STELLAR-304 (zanzalintinib + nivolumab frente a sunitinib en riñón de células no claras)', efecto: 'Primera prueba de zanzalintinib en riñón; un fracaso hunde la tesis del relevo', probabilidad: 'Media', sentido: '+/−' },
      { fecha: 'Feb-2027', evento: 'Guía de 2027', efecto: 'Primera guía con el ritmo de cabozantinib tras el genérico de la composición', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '3-mar-2027', evento: 'Decisión de la FDA sobre zanzalintinib en colorrectal', efecto: 'Primer producto nuevo en diez años; la etiqueta (todos los pacientes o solo un subgrupo) fija su techo', probabilidad: 'Media', sentido: '+/−' },
      { fecha: '2027-2028', evento: 'Datos de STELLAR-311 (tumores neuroendocrinos) y de LITESPARK-033 con Merck', efecto: 'Deciden si zanzalintinib sustituye a cabozantinib en riñón', probabilidad: 'Media', sentido: '+/−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Genéricos de cabozantinib en 2030 (MSN) y 2031 (Teva y otros)', tipo: 'Patentes', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: 'Ya en el caso base; un genérico antes de 2030 restaría ≈ −20 %', mitigante: 'Sentencias favorables hasta 2030; juicio de la patente \'039 en nov-2026', senal: 'Sentencia del juicio de nov-2026 y lanzamientos a riesgo' },
      { riesgo: 'Zanzalintinib no sustituye a cabozantinib (rechazo, etiqueta estrecha o fases 3 fallidas)', tipo: 'Desarrollo', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−18 % (bajista: 30,59 USD)', mitigante: 'Cuatro fases 3 en marcha y dos con Merck', senal: 'Datos de STELLAR-304 y decisión de la FDA del 3-mar-2027' },
      { riesgo: 'Competencia en riñón (belzutifan y nuevas combinaciones)', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % a −10 %', mitigante: 'Alianza con Merck en dos fases 3', senal: 'Cuota de recetas en primera línea de riñón' },
      { riesgo: 'Precio en EE. UU.: IRA desde 2029, nación más favorecida y aranceles', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Excepción de pequeña biotecnológica y suelo de precio en 2029-2030', senal: 'Listas de CMS de cada febrero' },
      { riesgo: 'Compra cara para sustituir a cabozantinib', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % a −10 %', mitigante: 'Activistas en el consejo y política de recompras', senal: 'Anuncio de una compra por encima de 10 veces las ventas' },
      { riesgo: 'Descuentos crecientes que frenan el precio neto', tipo: 'Comercial', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−3 %', mitigante: 'Subidas de precio de lista del 3 % anual', senal: 'Descuentos por encima del 31 % de las ventas brutas' },
      { riesgo: 'Ventas de directivos y remuneración excesiva', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: '−1 %', mitigante: 'Voto anual y activistas', senal: 'Voto de remuneración por debajo del 70 %' },
    ],
    premortem: 'Octubre de 2029: la acción cotiza a 36 USD, un 40 % menos. La historia empezó en marzo de 2027, cuando la FDA aprobó zanzalintinib en colorrectal solo para los pacientes sin metástasis hepáticas: un tercio del mercado previsto. STELLAR-304 dio una mejora de la supervivencia sin progresión pequeña y el riñón de células no claras resultó ser un nicho. En 2028, LITESPARK-033 tardó más de lo previsto y Merck priorizó su propia combinación con lenvatinib. Mientras, cabozantinib siguió creciendo y el BPA llegó a 4,5 USD en 2028, así que el mercado mantuvo 15 veces hasta que, en 2029, se acercaron los genéricos y nadie quiso pagar por un beneficio que iba a caer un 60 %. La empresa usó la caja para comprar un producto oncológico a 15 veces las ventas. El indicador que lo habría anticipado: la etiqueta de colorrectal y la distancia entre la guía de zanzalintinib y los 900 M de 2030 de nuestro caso base.',
    ia: {
      exposicion: 'Baja',
      sentido: 'Mixto',
      efecto_valor: '±2 % a 3-5 años',
      comentario: 'La IA no sustituye lo que vende Exelixis: un medicamento con patente recetado por un oncólogo y pagado por Medicare y las aseguradoras; ninguna parte de las ventas depende de un trabajo que se pueda automatizar [A1]. Toca el lado de los costes y de la competencia. En costes, el diseño de moléculas y de ensayos con IA puede abaratar su I+D (825 M en 2025), que es su mayor gasto. En competencia, acorta el tiempo en que los rivales llegan con nuevos inhibidores de quinasa, lo que puede adelantar la erosión de zanzalintinib en los años 2030. La propia FDA usa IA en la revisión de solicitudes, con efecto incierto en plazos [A1]. Señal observable: número de moléculas diseñadas con IA en fase 2-3 en cáncer renal y colorrectal. Riesgo bajo.',
    },
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo que mueve las cifras es el acceso y el precio de los medicamentos: los descuentos a programas públicos (29,5 % de las ventas brutas) y la negociación de precios del IRA desde 2029 [A1, B2]. El segundo asunto es la gobernanza: remuneración del consejero delegado (33,24 M en 2025, con un 20,9 % de votos en contra) y presión de activistas [C1, C2]. Las emisiones son irrelevantes para las cifras: fabrica con terceros y ocupa oficinas y laboratorios en Alameda [A1].',
    controversias: 'No encontramos sanciones ni multas en los últimos tres años en el 10-K, el 10-Q ni los 8-K. Hay litigios de patentes como demandante (MSN, Azurity) y despachos de abogados que anuncian investigaciones para posibles demandas de accionistas sin demanda presentada (oct-2026) [A2, D10].',
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Zanzalintinib', pregunta: '¿Qué pidió la FDA con la información adicional que llevó a la enmienda mayor, y espera una etiqueta para todos los pacientes o solo para los que no tienen metástasis hepáticas?', por_que: 'Decide si colorrectal vale 300 M o 1.000 M de ventas.' },
      { tema: 'Genéricos', pregunta: '¿Los acuerdos con Teva, Cipla, Sun y Biocon se adelantan si MSN entra en enero de 2030?', por_que: 'Un año de ventas de cabozantinib es casi un tercio del valor del DCF.' },
      { tema: 'STELLAR-304', pregunta: '¿Por qué se ha retrasado cuatro veces la lectura y qué tamaño de efecto haría falta para que sea comercial?', por_que: 'Primera prueba de zanzalintinib en riñón, el mercado de cabozantinib.' },
      { tema: 'Merck', pregunta: '¿Cómo se reparten las ventas de zanzalintinib con belzutifan si LITESPARK-033 sale bien?', por_que: 'El relevo en riñón depende de un ensayo que dirige otra empresa.' },
      { tema: 'Asignación de capital', pregunta: '¿Hasta qué precio seguirá recomprando y qué haría con la caja si zanzalintinib se queda corto?', por_que: 'Recomprar a 61 USD un beneficio que vence en 2030 destruye valor si el DCF tiene razón.' },
      { tema: 'Precio neto', pregunta: '¿Qué parte de las ventas pasa por el 340B y Medicare Parte D y cómo evoluciona su descuento?', por_que: 'Los descuentos crecen más que el precio de lista.' },
      { tema: 'Remuneración', pregunta: '¿Por qué la concesión de 30,5 M en acciones al consejero delegado en 2025 y cómo se liga a zanzalintinib?', por_que: '20,9 % de votos en contra en la junta de 2026.' },
    ],
    confianza: 'Media',
  },
};

const parches = [
  { ruta: 'sentimiento.temas[0].contraste', valor: 'Tienen razón en que importa: el retraso no cambia nuestro caso base (ventas de zanzalintinib desde 2027), pero la etiqueta sí; ninguno de los dos bandos la conoce [D12].' },
  { ruta: 'sentimiento.temas[1].contraste', valor: 'El impulso es real (+58,9 % en 12 meses), pero el precio ya está un 11 % por encima del objetivo medio de los analistas y un 53 % por encima de nuestro valor intrínseco [D2].' },
  { ruta: 'sentimiento.temas[2].contraste', valor: 'Es el riesgo que más pesa en el DCF y el que menos se discute: la caída de 2030-2031 está en nuestra proyección y explica que el valor intrínseco (39,74 USD) quede por debajo del precio [B5, B6].' },
  { ruta: 'sentimiento.temas[3].contraste', valor: 'Posible (sin accionista de control y con activistas), pero un comprador pagaría por zanzalintinib; no lo incluimos en el valor.' },
  { ruta: 'sentimiento.lectura', valor: 'El sentimiento de los particulares es de euforia de impulso (máximos, «no estés corto»), mientras que los analistas están en mantener con objetivos por debajo del precio y la posición corta es del 11,37 % [E1, D2, D3]. Esa divergencia es la señal: el precio sube por recompras y por expectativa sobre zanzalintinib, no por un cambio del vencimiento de cabozantinib. No anticipa un catalizador nuevo; sí un riesgo de caída fuerte si STELLAR-304 o la FDA decepcionan, porque la acción ya descuenta el éxito.' },
  { ruta: 'directivos.equipo[0].participacion_pct', valor: 0.88 },
];

export default {
  fuentes,
  secciones,
  parches,
  limitaciones: 'Cuentas en USD y US GAAP. El ejercicio es de 52/53 semanas y acaba el viernes más próximo al 31 de diciembre: el «2025» acaba el 2-ene-2026 y el LTM, el 3-jul-2026 (la empresa los llama 31-dic y 30-jun). Precio: cierre del 14-oct-2026 en el Nasdaq (la sesión del 15-oct no había cerrado; a media sesión cotizaba a 62,77). Las cifras de 2021-2025 salen del XBRL de la SEC contrastado con el 10-K 2025; la caja incluye los valores negociables a corto y largo plazo. Acciones: 247,8 M en circulación a 27-jul-2026 más 8,9 M de dilución (diferencia entre las medias básica y diluida del 2T26); la caja del puente se ajusta con 58 M de recompras estimadas entre el 3 y el 27 de julio. El consenso de BPA es ajustado (excluye pagos en acciones) y solo hay una fuente gratuita con estimaciones completas (Stock Analysis). Comparables de un solo proveedor con PER sobre BPA ajustado; ninguno es una oncológica de un producto. El mercado final de la sección 3 es de una consultora (IMARC) y no cubre todas las indicaciones de cabozantinib.',
  controles_explicados: [
    { control: 'Veredicto de sostenibilidad del analista coherente', explicacion: 'El motor da «Sí» porque la proyección no necesita capital. Decimos «En parte» porque el crecimiento de 2027-2029 y la recuperación de 2032-2035 dependen de que zanzalintinib, todavía sin aprobar, sustituya a cabozantinib antes de los genéricos de 2030-2031; la calidad (ROIC del 149,3 %) no protege de un vencimiento de patente.' },
  ],
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) web de la empresa y proxy 2026 (sin calificaciones publicadas); 2) MSCI y Sustainalytics públicos (no abren sin registro); 3) prensa (sin fecha ni nota fiable)', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'desglose de recomendaciones y estimaciones de 2028', tipo: 'Complemento', intentos: '1) Stock Analysis (solo 2026 y la cifra agregada de 2027); 2) MarketBeat (solo la media «mantener»); 3) búsqueda web (resúmenes sin cifras verificables)', decision: 'Omitido' },
    { seccion: 'sector', campo: 'cuota de mercado de cabozantinib en cáncer renal', tipo: 'Núcleo', intentos: '1) 10-K 2025 (no publica cuota); 2) IMARC y Reportprime (tamaño del mercado, no cuotas); 3) estimación propia: ventas mundiales de cabozantinib en riñón (≈ 2.000 M) entre 8.200 M', decision: 'Calculado y marcado como estimación' },
    { seccion: 'bolsa', campo: 'causa de las caídas del 7-may-2026 (−5,1 %) y del 31-jul-2026 (−5,3 %)', tipo: 'Complemento', intentos: '1) 8-K y notas de la empresa de esas fechas (ninguno); 2) titulares de Seeking Alpha y MarketBeat (sin noticia específica); 3) búsqueda web (sin resultado fiable)', decision: 'Omitido' },
  ],
  veredicto: 'En parte',
  sostenibilidad_justificacion: 'En parte. La calidad del negocio es indiscutible (ROIC del 149,3 %, sin deuda, margen EBITDA del 39,7 %) y el motor da la prueba por superada porque la proyección no necesita capital. Pero el crecimiento proyectado no depende del capital sino de la patente: el de 2027-2029 (+9-11 % anual) lo sostiene cabozantinib, cuya protección acaba en 2030-2031 [B5, B6], y la recuperación desde 2032 exige que zanzalintinib, todavía sin aprobar y con un beneficio modesto en colorrectal, llegue a 2.350 M de ventas en 2035 [A3, D12]. Ese relevo no es una ventaja demostrada: es una apuesta de desarrollo. No rebajamos el caso base porque ya incorpora la caída de 2030-2031 y pondera zanzalintinib por probabilidad.',
  puente_comentarios: {
    '2026e': 'Cabozantinib +9,8 % en EE. UU. (2.330 M, guía de 2.300-2.350 M): volumen +5 puntos por riñón con nivolumab y tumores neuroendocrinos, precio +2,5 puntos (lista +3 %, descuentos al alza); royalties +1,1 puntos [A3].',
    '2027e': 'Cabozantinib +8 % (2.520 M) por volumen y precio; primeras ventas de zanzalintinib en colorrectal (80 M desde marzo) [D12].',
    '2028e': 'Zanzalintinib a 250 M (colorrectal y, si STELLAR-304 sale bien, riñón de células no claras): 6,1 puntos; cabozantinib +5 %.',
    '2029e': 'Último año completo de cabozantinib sin genéricos (2.700 M); zanzalintinib a 500 M.',
    '2030e': 'Genérico de MSN desde el 15-ene-2030 con probabilidad del 55 %: cabozantinib 1.800 M (−33 %) entre volumen y precio; zanzalintinib +400 M [B5].',
  },
  dcf_justificacion: {
    crecimiento: 'Proyección por producto (estimación propia): cabozantinib en EE. UU. de 2.330 M en 2026 (guía de 2.300-2.350 M) a 2.700 M en 2029, 1.800 M en 2030 (genérico de MSN ponderado al 55 %), 350 M en 2031 (genéricos con licencia) y 120 M en 2035 [A3, B5, B6]. Royalties de 210 M que caen con los genéricos europeos de 2030. Zanzalintinib, ponderado por probabilidad, de 80 M en 2027 a 2.350 M en 2035. El crecimiento medio es del 2,3 % anual con una caída del 16 % en 2030 y del 40 % en 2031. Nuestras ventas de 2027 (2.805 M) quedan un 3 % por debajo del consenso (2.900 M) [D2].',
    margenes: 'Margen EBITDA del 39,9 % en 2026 (guía de gastos) que sube al 49,4 % en 2029 con el I+D estable en 920 M y las ventas al alza; cae al 24,4 % en 2031 con los genéricos y vuelve al 45 % en 2035 con zanzalintinib y un I+D recortado a 650 M [A3]. El 49 % de 2029 tiene precedente: es el margen de United Therapeutics (47,4 %) [D4].',
    inversion: 'Capex del 0,8-1,3 % de las ventas (0,4 % en 2025 y 1,3 % en 2024) y amortización del 1,1-1,7 %; en 2035 se igualan [A1]. Circulante comercial del 12 % de las ventas, el de 2025. Las licencias de moléculas van dentro del I+D (gasto), no del capex. Tipo impositivo del 22 %, centro de la guía de 2026 (21-23 %) [A3].',
    wacc: 'Tasa libre del 5,21 % (bono del Tesoro a 10 años del 13-oct) [D5]. Beta de 0,8: la mensual de cinco años es 0,48, la semanal de cinco años 0,72 y la de dos años 0,91 [D1]; usamos un punto intermedio cercano a la sectorial. Prima de mercado del 5,5 % y prima adicional de 1,5 puntos por depender de un producto con fecha de vencimiento. Sin deuda: WACC del 11,11 %. Con la prima implícita del mercado (4,2 %) el WACC baja al 10,07 % y el valor sube a 41,80 USD [D6].',
    terminal: 'Método «media»: Gordon con un crecimiento del 1,0 % y un múltiplo de salida de 8 veces el EBITDA, los de Jazz e Incyte, que ya viven un vencimiento [D4]. Zanzalintinib tendrá su propio vencimiento a finales de los años 2030, así que un terminal normal (2-3 % y 13-14 veces) sobrevaloraría. El valor terminal pesa un 40 %.',
  },
  dcf_lectura: 'El DCF da 37,42 USD por acción, un 38,6 % por debajo del precio, con un valor terminal que pesa el 40 %. El DCF inverso dice que el precio descuenta un crecimiento anual de las ventas del 10,9 % en 2027-2035 frente al 1,6 % de nuestro caso base, y que ningún margen hasta el 75 % justifica el precio con nuestras ventas; la rentabilidad implícita es del 5,6 %, por debajo del WACC (11,11 %) y de lo que pide el mercado (10,07 %). Es muy exigente: un 10,9 % anual hasta 2035 supone que cabozantinib no cae en 2030-2031 o que zanzalintinib lo sustituye entero y además crece, con ventas de unos 6.000 M en 2035. Ningún analista lo proyecta así: el objetivo medio (54,87 USD) también queda por debajo del precio [D2]. La sensibilidad al WACC es menor que la sensibilidad a zanzalintinib: con la prima del mercado el valor sube a 41,80 USD; con zanzalintinib a 3.500 M en 2035 rondaría los 50.',
  narrativas: {
    Bajista: 'La FDA aprueba zanzalintinib solo para el subgrupo sin metástasis hepáticas y STELLAR-304 no es concluyente: zanzalintinib se queda en torno a 1.000 M en 2035; MSN lanza su genérico en enero de 2030 y los descuentos siguen subiendo. Es lo que le pasó a Incyte con Jakafi: un producto único sin sustituto a tiempo.',
    Base: 'Cabozantinib cumple la guía y crece un 5-8 % anual hasta 2029; genéricos ponderados entre 2030 y 2031; zanzalintinib aprobado en colorrectal en 2027 y en riñón en 2029, con 2.350 M de ventas en 2035 ponderadas por probabilidad.',
    Alcista: 'La empresa gana el juicio de la patente \'039 y retrasa a MSN a 2032, STELLAR-304 y LITESPARK-033 salen bien y zanzalintinib sustituye a cabozantinib en riñón, por encima de 3.000 M en 2035.',
  },
  escenarios_comentario: 'Con nuestros flujos, el alcista vale 43,01 USD (−29,5 %) y el bajista 30,59 USD (−49,8 %): ningún escenario del DCF llega al precio. A 12 meses la lectura es otra, porque el mercado paga un múltiplo sobre el BPA de 2028, el máximo antes del vencimiento: 47,52 USD en el bajista (−22 %), 67,94 en el base (+11,4 %) y 99,02 en el alcista (+62 %). Esa asimetría a 12 meses solo compensa si el mercado sigue sin descontar 2030; el valor intrínseco dice que no compensa.',
  casos_12m: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 3.96, multiplo: null, precio: null, justificacion: 'Ventas de 2028 de 2.950 M (−5 % frente al base) y margen EBITDA del 42,7 %: zanzalintinib tarda y cabozantinib pierde precio neto; 250 M de acciones diluidas.' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 4.47, multiplo: null, precio: null, justificacion: 'Ventas de 3.115 M y margen EBITDA del 45,7 % (1.423 M): EBIT de 1.386 M más 45 M de intereses de la caja, impuestos del 22 % y 250 M de acciones (recompra anunciada de 750 M y dilución de los planes).' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 4.83, multiplo: null, precio: null, justificacion: 'Ventas de 3.230 M y margen del 47,7 %: zanzalintinib aprobado en colorrectal sin restricción y STELLAR-304 positivo.' },
  ],
  per_excluidos: 'Historia adelantada (cierre de cada año ÷ BPA publicado del año siguiente): 2018 a 2025 = 19,3; 50,3; 27,9; 32,6; 24,7; 13,6; 12,0 y 14,0 (2025 sobre nuestro 3,14 de 2026). No excluimos ningún año (el 50,3 de 2019 se apoya en un BPA de 2020 deprimido por el I+D, pero no llega a tres veces la mediana del resto). La mediana de cinco años (2021-2025) es 14,0, el mínimo 12,0 y la media de ocho años 24,3.',
  per_excluidos_v2: 'Historia al cierre (precio ÷ BPA del mismo año): 2019-2025 = 17,3; 57,3; 25,4; 28,6; 36,9; 18,9 y 15,8. Fuera 2018 (8,9 veces, beneficio inflado por la reversión de 238 M de provisión de impuestos diferidos).',
  diferencia_consenso: 'Nuestro BPA de 2026 (3,14 USD) y de 2027 (3,70) quedan un 12 % y un 13 % por debajo del consenso (3,58 y 4,27), pero el consenso es ajustado: excluye los pagos en acciones (unos 125 M al año, 0,37 USD por acción después de impuestos). En la misma base estamos un 1 % y un 4 % por debajo, con unas ventas de 2027 un 3 % menores (2.805 frente a 2.900 M) [D2]. Nuestro precio base a 12 meses (67,94 USD) queda un 24 % por encima del objetivo medio de los analistas (54,87), que es la cifra baja del contraste: el objetivo medio está dentro de nuestro rango (47,52-99,02).',
  objetivo_comentario: 'El objetivo a 12 meses (70,61 USD) queda un 78 % por encima del valor intrínseco (39,74 USD). La distancia no es una tesis a varios años, es lo contrario: la regla de múltiplos aplica 15,2 veces al BPA de 2028, el máximo de la vida de cabozantinib, mientras que el DCF cuenta la caída de 2030-2031. Para cerrar la distancia hacia arriba haría falta que zanzalintinib sustituya a cabozantinib entero; hacia abajo, basta con que el mercado empiece a descontar los genéricos a medida que se acercan. Decide la v3 (sin marcas del selector): el PER actual (16,5) está algo por encima de la mediana adelantada (14,0).',
  valoracion_comentario: 'Pesamos el DCF al 50 %, los escenarios al 30 % y los comparables al 20 %; las transacciones, a cero. El DCF es el único método que ve el vencimiento de 2030-2031, que es lo que decide el valor. Los comparables (PER ajustado de los próximos 12 meses, mediana de 12,0) dan 49,49 USD, pero aplican el múltiplo de empresas con vencimientos más lejanos (Neurocrine, 2038) o ya pasados (Jazz): pesan poco. Las transacciones (12-21 veces las ventas) darían 135,17 USD y suponen una compra por crecimiento que no existe. La dispersión es amplia: de 30,59 (bajista) a 49,49 (comparables), todas por debajo del precio. El valor ponderado es de 39,74 USD (−34,8 %).',
  resumen: {
    recomendacion: 'Mantener',
    conviccion: 'Media',
    justificacion_recomendacion: null,
    horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener con convicción media; no es una compra. El objetivo a 12 meses es de 70,61 USD frente a un precio de 60,99 (cierre del 14-oct): rentabilidad ponderada del 15,8 % y del 11,4 % en el caso base, por debajo del 12 % que pide la regla. Además, el valor intrínseco (39,74 USD) queda un 34,8 % por debajo del precio, así que no pasa el filtro de valor real. El objetivo medio de los analistas (54,87 USD) también está por debajo del precio [D2]. La convicción es media porque las dos reglas del valor intrínseco coinciden y el base está lejos del umbral; subiría hacia vender si STELLAR-304 o la FDA decepcionan, y hacia mantener firme si gana el juicio de la patente '039 en noviembre.

**El negocio.** Un solo producto, cabozantinib, con 2.123 M USD de ventas en EE. UU. en 2025 (+17 %) y 179 M de royalties, sin deuda y con un ROIC del 149,3 % frente a un WACC del 11,11 % [A1]. El problema es la fecha: genérico de MSN no antes del 15-ene-2030 y genéricos con licencia desde el 1-ene-2031 [B5, B6]. Sostenibilidad del crecimiento: «En parte»: la calidad del negocio no protege de un vencimiento de patente, y el relevo depende de zanzalintinib, todavía sin aprobar.

**Finanzas.** Margen EBITDA del 39,7 % en 2025 y flujo libre de 876 M; 1.384 M de caja tras recomprar 2.900 M desde 2023 [A1, A3]. La guía de 2026 se rebajó en agosto a 2.500-2.550 M de ingresos [A3]. Cuentas limpias (Altman 16,00, Beneish −2,59).

**Equipo y gobierno.** Consejo independiente, voto anual y activistas (Caligan, Farallon) que han impuesto disciplina de capital. En contra: 33,24 M de remuneración del consejero delegado con un 20,9 % de votos en contra, y 42,2 M de ventas de directivos en 12 meses frente a 1,19 M de compras [C1, C2, C3].

**Valoración.** El DCF da 37,42 USD con un caso base que ya pondera zanzalintinib hasta 2.350 M de ventas en 2035. El DCF inverso descuenta un crecimiento del 10,9 % anual hasta 2035 frente al 1,6 % de nuestro base: el precio supone que cabozantinib no cae o que zanzalintinib lo sustituye entero. El objetivo a 12 meses es alto porque el mercado paga 15 veces el BPA de 2028 (4,47 USD), el pico antes del vencimiento; esa es la discrepancia con el mercado.

**Riesgos y catalizadores.** El riesgo mayor es que zanzalintinib no llegue a tiempo (bajista del DCF: 30,59 USD); el segundo, un genérico antes de 2030. Catalizadores: juicio de la patente '039 (2-nov), resultados del 3T26 (3-nov, estimada), datos de STELLAR-304 (segundo semestre) y decisión de la FDA en colorrectal (3-mar-2027) [A2, A3, D12]. Los foros están eufóricos por el impulso mientras la posición corta es del 11,37 % [E1, D3].

**Qué cambiaría la decisión.** Comprar por debajo de 39,74 USD, el valor intrínseco; vender por encima de 78,45. Pasaríamos a vender si la FDA aprueba zanzalintinib solo para un subgrupo o STELLAR-304 no es positivo. Revisaríamos el valor al alza si gana el juicio de noviembre (MSN a 2032) o si LITESPARK-033 confirma a zanzalintinib en primera línea de riñón.`,
    tesis: `Exelixis vende cabozantinib, el inhibidor de quinasa más usado con inmunoterapia en el cáncer renal avanzado: 2.123 M USD de ventas en EE. UU. en 2025, un margen EBITDA del 39,7 %, sin deuda y con 1.384 M de caja tras devolver 2.900 M en recompras [A1, A3]. Su valor depende de dos fechas: el genérico de MSN (no antes del 15-ene-2030) y los genéricos con licencia (1-ene-2031) [B5, B6].

El precio, 60,99 USD, es 16,5 veces nuestro BPA de 2027 y 14,8 veces el BPA ajustado de los próximos 12 meses. El DCF inverso dice que descuenta un crecimiento anual de las ventas del 10,9 % hasta 2035: más del triple de lo que crece su mercado (4,2 % según IMARC) y muy por encima de nuestro base, que ya incluye zanzalintinib [B3].

El mercado acierta en que cabozantinib aún crece y en que la caja y las recompras sostienen el BPA hasta 2029. Se equivoca, a nuestro juicio, en pagar un múltiplo constante sobre un beneficio que caerá a la mitad en 2031 si zanzalintinib no lo sustituye. Para invertir hay que creer que zanzalintinib llegará a 5.000-6.000 M en 2035, o que la empresa ganará otra vez en los tribunales; nada de eso está demostrado hoy.`,
    vision_diferencial: {
      mercado_descuenta: 'Un crecimiento del 10,9 % anual hasta 2035 y 16,5 veces el BPA de 2027: trata a Exelixis como si cabozantinib no tuviera fecha de caducidad o como si zanzalintinib ya fuera un éxito en riñón y colorrectal.',
      nuestra_vision: 'El BPA sube de 3,14 USD en 2026 a 4,47 en 2028 y cae a menos de la mitad en 2031 con los genéricos. Zanzalintinib, ponderado por probabilidad, llega a 2.350 M en 2035, menos que el pico de cabozantinib. Valor intrínseco: 39,74 USD.',
      por_que: 'El primer dato de zanzalintinib es modesto: beneficio en supervivencia en colorrectal sin significación en el subgrupo sin metástasis hepáticas y una enmienda mayor que retrasa la FDA [A3, D12]. El riñón, donde está el dinero de cabozantinib, depende de ensayos sin datos y de un socio, Merck, que tiene su propio producto.',
    },
    a_favor: [
      '**Calidad del negocio**: ROIC del 149,3 % y margen EBITDA del 39,7 % en 2025.',
      '**Caja y recompras**: 1.384 M de caja y 2.900 M recomprados desde 2023 a 31,12 USD de media [A3].',
      '**Cabozantinib aún crece**: +10,2 % en el 2T26 y +17 % en 2025 [A3, A1].',
      '**Victoria judicial**: el genérico de MSN no antes del 15-ene-2030, con un juicio en noviembre que podría llevarlo a 2032 [B5].',
      '**Zanzalintinib**: cuatro fases 3 y dos con Merck; decisión de la FDA el 3-mar-2027 [A3, D12].',
    ],
    en_contra: [
      '**Valor intrínseco**: 39,74 USD, un 34,8 % por debajo del precio.',
      '**Vencimiento**: genéricos en 2030-2031 de un producto que es el 92 % de las ventas [B5, B6].',
      '**DCF inverso exigente**: el precio pide un 10,9 % de crecimiento anual hasta 2035.',
      '**Analistas por debajo**: objetivo medio de 54,87 USD y Bank of America en vender a 41 [D2].',
      '**Gobierno**: 33,24 M de remuneración del consejero delegado y 42,2 M de ventas de directivos [C1, C3].',
    ],
    que_vigilar: 'La tesis depende de cuándo empiecen a descontarse los genéricos de 2030-2031 y de si zanzalintinib llega a tiempo. Las señales: la etiqueta de la FDA en colorrectal (3-mar-2027), los datos de STELLAR-304 (segundo semestre de 2026) y la sentencia del juicio de la patente \'039 (desde el 2-nov-2026). Si zanzalintinib sale con una etiqueta amplia y el riñón se confirma, el valor sube hacia 50 USD; si no, hacia 30.',
    cambiaria_recomendacion: [
      'Si el precio baja de 39,74 USD (valor intrínseco) con el BPA intacto, pasaría a compra por valor.',
      'Si la FDA aprueba zanzalintinib solo para el subgrupo sin metástasis hepáticas o STELLAR-304 no es positivo, pasaríamos a Vender (ponderada ≤ −10 %).',
      'Si Exelixis gana el juicio de la patente \'039 y MSN se retrasa a 2032, subiríamos el valor intrínseco en torno a un 10 %.',
      'Si el precio supera 78,45 USD sin cambios en el BPA, vender.',
    ],
    kpis_seguimiento: [
      { kpi: 'Ventas trimestrales de cabozantinib en EE. UU.', nivel_actual: '573 M (2T26, +10,2 %)', umbral_alerta: 'Crecimiento interanual por debajo del 5 %', por_que: 'Sostiene el BPA hasta 2029.' },
      { kpi: 'Descuentos sobre ventas brutas', nivel_actual: '29,5 % (2025)', umbral_alerta: 'Más del 31 %', por_que: 'Mide el precio neto real.' },
      { kpi: 'Etiqueta de zanzalintinib en colorrectal', nivel_actual: 'Decisión el 3-mar-2027', umbral_alerta: 'Solo subgrupo sin metástasis hepáticas', por_que: 'Fija el techo del primer mercado.' },
      { kpi: 'STELLAR-304', nivel_actual: 'Datos en el 2S26', umbral_alerta: 'Supervivencia sin progresión no significativa', por_que: 'Primera prueba en riñón.' },
      { kpi: 'Fecha de genéricos', nivel_actual: 'MSN ≥ 15-ene-2030; licencias 1-ene-2031', umbral_alerta: 'Lanzamiento a riesgo o sentencia contraria en la patente \'039', por_que: 'Es lo que decide el valor.' },
    ],
  },
};
