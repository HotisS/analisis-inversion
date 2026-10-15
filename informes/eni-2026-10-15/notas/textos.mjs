// Textos del analista para Eni (corte 2026-10-15). Las cifras de valoración salen del motor (calc) tal cual.
const E8 = 'https://www.sec.gov/Archives/edgar/data/1002242';

const fuentes = [
  { id: 1, titulo: 'Futuros del Brent (BZ=F 106,13 USD; BZZ27 85,56; BZZ28 78,27) y EUR/USD 1,121, 15-oct-2026', editor: 'Yahoo Finance / NYMEX', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/BZ%3DF/' },
  { id: 2, titulo: 'Eni: results for the first quarter 2026 (6-K)', editor: 'Eni S.p.A. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-04-24', url: `${E8}/000110465926048393/tm2612669d1_6k.htm` },
  { id: 3, titulo: 'Eni: report on the purchase of treasury shares (20-24 July 2026), 6-K', editor: 'Eni S.p.A. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-29', url: `${E8}/000117494726000715/form6k-36146_eni.htm` },
  { id: 4, titulo: 'Eni: report on the purchase of treasury shares (17-21 August 2026), 6-K', editor: 'Eni S.p.A. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-26', url: `${E8}/000110465926101096/tm2624087-1_6k.htm` },
  { id: 5, titulo: 'Relazione del Consiglio di Amministrazione all\'Assemblea 2026', editor: 'Eni S.p.A.', tipo: 'Primaria', fecha: '2026-04', url: 'https://www.eni.com/content/dam/enicom/documents/ita/governance/assemblea/2026/Relazione-CdA-Eni-Assemblea-2026.pdf' },
  { id: 6, titulo: 'Eni alza la guidance e porta il buyback a 3,4 miliardi, a ottobre può arrivare il dividendo', editor: 'Milano Finanza', tipo: 'Prensa', fecha: '2026-07-29', url: 'https://www.milanofinanza.it/news/eni-alza-la-guidance-e-porta-il-buyback-a-3-4-miliardi-a-ottobre-puo-arrivare-il-dividendo-202607290816401388' },
  { id: 7, titulo: 'Movimiento del precio de ENI.MI (movimiento.mjs sobre Yahoo Finance): 1, 3, 6 y 12 meses, máximos, media de 200 sesiones', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/ENI.MI/' },
];

const secciones = {
  financieros: {
    comentario: 'Los ingresos siguen al crudo y al gas: 43.987 M en 2020 (Brent de 42 USD), 132.512 M en 2022 (guerra de Ucrania) y 82.151 M en 2025 con el Brent a 69 USD [A1, A2]. El margen EBITDA normalizado (sin efecto inventario ni partidas identificadas) fue del 22,7 % en 2023, del 20,2 % en 2024 y del 19,1 % en 2025: lo explican el precio del crudo (−15 % en 2025), el euro (+4 %) y la química con pérdidas (−820 M en 2025), compensados por más producción (+3 %) [A1]. En el 1S26 el conflicto de Oriente Medio cambió la cuenta: Brent medio de 93 USD, ventas +17,6 %, EBIT ajustado proforma de 8.911 M (+40 %) y beneficio neto ajustado de 3.635 M (+43 %) [A3]. 2020 no es comparable (pérdidas por deterioros del COVID) y 2026 tampoco: Searah sale del perímetro en el 2T26 con una plusvalía de 2.086 M [A3].',
    ajustes: 'Eni publica un resultado «ajustado» que excluye el efecto inventario (valorar existencias a coste de reposición) y las partidas identificadas: deterioros, provisiones medioambientales, plusvalías y derivados. Entre 2020 y 2025 esas partidas restaron 2.200-5.500 M al EBIT de casi todos los años (3.334 M en 2025; 5.548 M en 2023) y sumaron 2.677 M en 2021; aquí van en no recurrentes y se devuelven al EBITDA [A1, A4]. Que se repitan casi todos los años (deterioros de campos maduros, química) es un aviso: el beneficio ajustado sobrestima el de largo plazo, y en el 1S26 hubo otros 1.470 M de deterioros [A3]. El BPA del objetivo a 12 meses es el ajustado menos el cupón de los híbridos (237 M en 2025) [A1]. El LTM a junio de 2026 va en base ajustada.',
  },
  trimestres: {
    ultima_presentacion: 'Resultados del 2T26 (29-jul) [A3, D8]: beneficio neto ajustado de 2.330 M, el doble que un año antes y por encima del consenso (2.090 M); producción de 1,79 Mbep/d, +11 % subyacente. La dirección subió la guía de producción al ≈5 %, el EBIT de GGP por encima de 1.400 M y el flujo de caja a 15.000 M con un Brent de 85 USD, y amplió la recompra a 3.400 M; abrió la puerta a un dividendo extraordinario en octubre si el margen de refino sigue por encima de 9 USD/b. Frente al 1T26 (abril) [P2], el discurso pasó de la resistencia a un mercado volátil a «capturar el alza del escenario»: la guía de flujo de caja pasó de 13.800 a 15.000 M en tres meses. Lo que no se cuantificó: cuánto del beneficio de 2026 se va cuando Ormuz se normalice, y el efecto en la cuenta de desconsolidar Plenitude en el 3T26. Publica semestres completos; los trimestres sueltos no tienen cuenta completa, por eso la tabla va en semestres.',
  },
  balance: {
    vencimientos: [],
    otros_pasivos: 'Híbridos perpetuos de 5.000 M en el patrimonio de Eni más 990 M emitidos en 2026, con cupones del 2-4,9 %; aquí cuentan como deuda (otros ajustes del puente) [A1, A3]. Un híbrido de 1.755 M emitido por una filial va en minoritarios [A3]. Provisiones de desmantelamiento y medioambientales importantes (sitios industriales en Italia) y litigios: demanda climática de Greenpeace y ReCommon (2023). Gearing proforma del 10 % a junio de 2026, en el mínimo de su rango del 10-15 % [A3].',
    comentario: 'La deuda neta antes de arrendamientos bajó de 12.175 M (2024) a 9.386 M (2025) y subió a 11.271 M en junio de 2026 por el circulante (1.520 M) y el pago de dividendo y recompra (2.530 M) [A1, A3]. La liquidez de 20.122 M incluye 11.757 M de activos financieros corrientes que el puente cuenta como caja. El circulante comercial es negativo (−3 % de las ventas en 2025): los proveedores financian existencias y clientes. Rating A-/A3/A- [A3].',
  },
  flujos: {
    comentario: 'El flujo operativo fue de 13.330 M en 2025 y 13.092 M en 2024, con un capex de 8.500-9.200 M (9,6-11,2 % de las ventas, 1,1-1,3 veces la amortización) [A1, A2]. El FCF tras arrendamientos (2.851 M en 2025) no cubrió dividendos y recompras (4.976 M): la diferencia se pagó con ventas de participaciones (KKR en Enilive, Plenitude, Baleine) y deuda [A1]. En 2026 la guía es más holgada: flujo de 15.000 M con inversión neta por debajo de 5.000 M [A3]. Estimación propia: la mitad del capex es mantenimiento de la producción (declinación natural de los campos), en línea con la amortización.',
  },
  calidad: {
    comentario: 'Cuentas auditadas por PwC desde 2019, con opinión favorable también sobre el control interno (cotiza en Nueva York) [A1]. Los puntos de juicio son tres: (1) las partidas identificadas se repiten casi todos los años (2.200-5.500 M), así que el beneficio ajustado es optimista; (2) el tipo impositivo efectivo es muy alto (52-57 % en 2023-2025) porque los contratos de reparto de producción tributan al 50-85 % y los deterioros no son deducibles; (3) las participadas aportan 1.161 M de resultado y un tercio del EBIT ajustado proforma, con información menos detallada [A1, A3]. Indicadores del motor: Altman Z de 1,38 (zona de riesgo, normal en una petrolera con mucho activo fijo y deuda; no es una alerta de quiebra con rating A-), Piotroski F de 6 y Beneish M de −3,06 (sin señal de manipulación).',
    senales: [
      { senal: 'Partidas «identificadas» recurrentes', nivel: 'Media', comentario: 'Deterioros y provisiones casi todos los años; 1.470 M más en el 1S26 [A3].' },
      { senal: 'Plusvalías de reorganización (Searah, 2.086 M en el 1S26)', nivel: 'Baja', comentario: 'Infla el beneficio publicado de 2026; el ajustado la excluye [A3].' },
      { senal: 'Peso de participadas en el beneficio', nivel: 'Baja', comentario: 'Vår Energi, Azule y Searah: resultado contable sin control de caja directo; dividendos recibidos de 868 M en el 1S26 [A3].' },
    ],
  },
  rentabilidad: { comentario: 'Eni no crea valor sobre su coste de capital con el criterio del informe: ROIC del 6,1 % en 2025 frente a un WACC del 7,94 %, y del 7,7 % en 2024. El ROIC solo superó claramente al WACC en 2022 (Brent de 99 USD). El motor mide el capital invertido consolidado sin participadas; con ellas (19.170 M que rinden un 6 %) no cambia la conclusión. Lo que mueve el ROIC es el margen (precio del crudo), no la rotación. El ROIC incremental histórico (16,4 %) sale alto porque mide el salto de 2020 a 2022 y no es fiable. La empresa publica un ROACE ajustado algo más alto, pero tampoco con 5 puntos sobre el WACC a precios normales [A1]. Frente a TotalEnergies (8,4 % con su WACC del 9,4 %) y Shell (11,4 %), Eni está en la parte baja del grupo [D6].', confianza: 'Media' },
  capital: {
    politica: 'Dividendo de 1,10 EUR por acción en 2026 (+5 %), pagado en cuatro tramos; recompras ligadas al precio: el 60 % del flujo de caja por encima del presupuesto (11.500 M) hasta 90 USD de Brent y el 100 % por encima, como recompra o dividendo extraordinario [A3]. Gearing objetivo del 10-15 %. Prioridad a la inversión orgánica (29.000 M brutos en 2026-2030) y a vender participaciones de los descubrimientos y de los satélites para financiar el crecimiento [A1].',
    comentario: 'Asignación de capital con dos caras. Bien: la exploración propia ha creado valor (Zohr, Coral, Baleine) y las ventas de participaciones (KKR pagó por el 30 % de Enilive; EIP y Ares entraron en Plenitude) han traído caja a múltiplos altos [A1]. Mal: el retorno al accionista de 2024 y 2025 (5.080 y 4.976 M) superó al FCF, la química de Versalis sigue en pérdidas pese a años de reestructuración y los deterioros se repiten. El número de acciones baja un 2-4 % al año por la recompra (de 3.572 M de media en 2020 a 2.862 M en circulación hoy) [A1, D7].',
  },
  directivos: { comentario: 'Equipo estable y con historial: Descalzi lleva doce años y empieza su quinto mandato (hasta 2029), con un historial de cumplir o superar las guías de producción y de recompra [C2, C3]. La presidencia cambió en mayo de 2026 (Di Foggia por Zafarana), sin efecto en la gestión: el presidente no es ejecutivo. El riesgo es la sucesión: no hay sucesor público y el nombramiento depende del Gobierno. La participación de la dirección es simbólica (Descalzi 647.621 acciones, ≈17 M EUR) [C1].' },
  gobierno: {
    remuneracion: 'Sin cifra de 2025 localizada (hueco). La política vota cada año en la junta y liga el variable a largo plazo al rendimiento total frente a un grupo de petroleras, al flujo de caja libre y a objetivos de descarbonización [C1]. No se ha podido comprobar el voto en contra de la junta de 2026.',
    control_y_defensas: 'El Estado controla Eni con un 33 % (CDP 30,92 % y el Ministerio 2,17 %) y presenta la lista mayoritaria: nombra al presidente, al consejero delegado y a seis de nueve consejeros; los institucionales eligen al resto con su lista (Dittmeier y Vermeir son de esa lista; el tipo de los demás nuevos consejeros es una estimación) [C1, C3]. El «golden power» permite al Gobierno vetar compras de participaciones relevantes y operaciones estratégicas. Una acción, un voto, sin límites estatutarios. La recompra sube la participación del Estado sin que compre.',
  },
  bolsa: {
    comentario: 'La acción ha ganado un 84,1 % en un año con dividendos, frente al 17,9 % del FTSE MIB y el 54,2 % del sector petrolero europeo [D1]: subió con el Brent tras el cierre de Ormuz (marzo), cayó cuando se reabrió (mayo-junio), y volvió a subir con los resultados del 2T26, la recompra ampliada y el Brent de nuevo por encima de 100 USD en septiembre y octubre [D8, D9]. Beta de 0,44 frente al FTSE MIB (se mueve con el crudo, no con el índice); volatilidad del 27,6 %.',
    contexto: {
      movimiento: { fecha: '2026-10-15', var_1m_pct: 6.4, var_3m_pct: 19.1, var_6m_pct: 15.0, var_12m_pct: 74.6, dist_max_52s_pct: 0.0, dist_min_52s_pct: 73.6, dist_max_historico_pct: 0.0, tendencia: 'alcista', volatilidad_60d_pct: 26.0, avisos: ['P1 Subida fuerte (+74,6 % en 12 meses)', 'P2 En máximos tras subir'] },
      movimientos_fuertes: [
        { periodo: 'mar-2026', var_pct: 23.0, causa: 'Ataques entre EE. UU., Israel e Irán y cierre del estrecho de Ormuz: el Brent llegó a casi 140 USD al contado [A3, D13].', veredicto: 'no cambia', condicion: null },
        { periodo: 'abr-jul-2026', var_pct: -13.4, causa: 'Acuerdo provisional y reapertura de Ormuz: el Brent perdió la mitad hasta 70 USD; caídas diarias del −5,6 % (8-abr) y −7,0 % (17-abr) [A3, D12].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jul-2026', var_pct: 19.0, causa: 'Resultados del 2T26 (29-jul): beneficio ajustado duplicado, guía al alza y recompra de 3.400 M; vuelta del Brent hacia 90 USD [D8].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-22', tipo: 'resultados', hecho: 'Resultados del 3T26 y decisión del consejo sobre el dividendo extraordinario (la prensa estima 0,14-0,38 EUR por acción) y el tramo de noviembre del ordinario (0,27 EUR) [D9, P6].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-07', tipo: 'recomendación', hecho: 'BNP Paribas baja a Neutral; AlphaValue/Baader a Vender (6-oct); Jefferies y UBS reiteran Comprar [D3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-14', tipo: 'accionista de referencia', hecho: 'Recompra en curso: 81,4 M de acciones (1.855 M EUR) del programa de 2026 hasta el 9-oct; autocartera del 5,55 % [D7].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-31', tipo: 'fusión u oferta', hecho: 'Desconsolidación de Plenitude prevista en el 3T26 (Eni se queda el 65 %) y aportación de 2.000 M USD de Ares a una cartera de producción [A3].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-10-22',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La subida de un año (+74,6 %) es el Brent de la crisis de Ormuz más una recompra que se ha duplicado; no hay colocaciones del Estado anunciadas, ampliaciones ni litigios con fecha que puedan mover el precio más de un 5 % en contra. Los resultados del 22-oct y el posible dividendo extraordinario no aplazan nada (regla 11). Los avisos P1 y P2 (subida fuerte y máximos) no cambian la señal, pero explican el riesgo: el precio cotiza el Brent de hoy, no el de la curva de futuros [P1, P7].',
    },
  },
  multiplos_historicos: { comentario: 'Con los cierres de cada año y el beneficio publicado, la acción cotiza hoy por encima de su media de cinco años: EV/EBITDA de 4,9 veces frente a 4,1 (percentil 80) y PER de 13,1 frente a 11,0. Con el BPA ajustado del año siguiente (la base de la regla), la mediana de 2021-2025 es de 7,3 veces y hoy cotiza a 11,5 veces nuestro BPA de 2027e. Nada estructural lo justifica: el crecimiento de la producción es el de siempre y el riesgo del sector no ha bajado; es el beneficio de pico de 2026 y la recompra. 2020 se excluye (pérdidas).' },
  comparables: { comentario: 'El grupo europeo cotiza a 7,1-9,8 veces el beneficio de los próximos doce meses (mediana de 8,25) y a 2,6-4,3 veces el EBITDA, todo con beneficios del pico de 2026-2027 [D6]. Eni (9,6 veces) está en la parte alta, a la par que Shell y Equinor, pese a un ROIC menor. Los comparables no sirven para el valor intrínseco porque miden un beneficio que no se va a repetir: les damos peso 0 en la síntesis. La regresión múltiplo-crecimiento no aplica (crecimientos sin dato comparable).' },
  esg: {
    materialidad: 'Tres asuntos mueven las cifras: (1) las emisiones y el coste del CO₂ en las refinerías y la química italianas (sujetas al comercio de derechos de la UE); (2) la transición, que puede dejar reservas sin valor (Eni ya hizo deterioros por cambiar el escenario de largo plazo) y que justifica Plenitude y Enilive; (3) la seguridad y los derechos humanos en países de riesgo (Libia, Nigeria, Congo) [A1].',
    controversias: 'Demanda climática de Greenpeace y ReCommon ante el tribunal civil de Roma (mayo de 2023), pendiente [A1]. Casos de corrupción internacional cerrados en Italia (Nigeria OPL 245, absolución en 2021). Sin sanciones relevantes en 2024-2026 localizadas.',
  },
  catalizadores: { items: [
    { fecha: '22-oct-2026', evento: 'Resultados del 3T26 y decisión sobre el dividendo extraordinario', efecto: 'Dividendo extra estimado de 0,14-0,38 EUR (0,5-1,5 % del precio)', probabilidad: 'Alta', sentido: '+' },
    { fecha: '3T-4T 2026', evento: 'Desconsolidación de Plenitude (Eni conserva el 65 %)', efecto: 'Baja la deuda consolidada; cambia la cuenta', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'feb-2027', evento: 'Resultados de 2026 y plan estratégico 2027-2030', efecto: 'Recompra de 2027 con un Brent de presupuesto más bajo', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2027', evento: 'Normalización del estrecho de Ormuz y de la oferta del Golfo', efecto: 'Brent hacia la curva de futuros (85,6 USD dic-27)', probabilidad: 'Media', sentido: '−' },
    { fecha: '2026-2028', evento: 'Arranques: Baleine fase 3, Congo LNG, Searah (Kutei), Argentina FLNG', efecto: 'Producción +3-5 % al año', probabilidad: 'Alta', sentido: '+' },
  ], confianza: 'Media' },
  riesgos: {
    items: [
      { riesgo: 'Vuelta del Brent a 65-75 USD cuando se normalice Ormuz', tipo: 'Mercado', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−20 a −50 % sobre el precio (escenario bajista del DCF: 10,31 EUR)', mitigante: 'Coste bajo y PSA que recuperan costes en barriles', senal: 'Futuro del Brent de diciembre de 2027 por debajo de 75 USD' },
      { riesgo: 'Margen de refino y química vuelven a pérdidas', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Cierre de plantas de Versalis y paso a biorrefino', senal: 'SERM por debajo de 6 USD/b' },
      { riesgo: 'Riesgo país en Libia, Egipto, Nigeria, Congo', tipo: 'Geopolítico', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−10 %', mitigante: 'Diversificación en ≈40 países', senal: 'Interrupciones de producción o impagos de Egipto' },
      { riesgo: 'Impuestos extraordinarios sobre beneficios energéticos en Italia', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'El grueso del beneficio se genera fuera de Italia', senal: 'Propuesta en la ley de presupuestos' },
      { riesgo: 'Deterioros recurrentes y beneficio ajustado optimista', tipo: 'Contable', probabilidad: 'Alta', impacto: 'Bajo', efecto_valor: '−3 %', mitigante: 'Se descuentan en el DCF vía capex', senal: 'Partidas identificadas > 3.000 M al año' },
      { riesgo: 'Interferencia del Estado accionista (dividendos, inversiones en Italia, nombramientos)', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Lista minoritaria y cotización en Nueva York', senal: 'Cambio de política de retribución impuesto por el Gobierno' },
    ],
    premortem: 'Octubre de 2029: la acción ha perdido un 40 % desde 25,77 EUR. Lo más probable: el acuerdo con Irán se consolidó en 2027, la OPEP+ devolvió al mercado los barriles recortados y la ola de GNL de Catar y EE. UU. hundió el gas europeo. El Brent volvió a 60-65 USD en 2028, como en 2025. El beneficio ajustado de Eni cayó de casi 8.000 M en 2026 a unos 4.000 M, la recompra se recortó a la mínima (la política la liga al precio) y el mercado volvió a pagar 7 veces el beneficio, su mediana. La señal que lo habría anticipado: el futuro del Brent de diciembre de 2027 por debajo de 80 USD y el margen de refino por debajo de 9 USD/b dos trimestres seguidos.',
    ia: { exposicion: 'Baja', sentido: 'Oportunidad', efecto_valor: '+2 %', comentario: 'La IA no sustituye lo que vende Eni (crudo, gas, carburantes y electricidad) y aumenta la demanda de electricidad y gas para centros de datos, que favorece a GGP y Plenitude. En costes, Eni usa su superordenador HPC6 para la sísmica y la simulación de yacimientos, lo que acorta el tiempo entre descubrimiento y producción [A1]. Riesgo bajo: el único punto expuesto es el negocio minorista de Plenitude (atención al cliente), pequeño en el valor. Señal a vigilar: contratos de suministro de gas o electricidad a centros de datos en Italia.' },
  },
  preguntas: { items: [
    { tema: 'Precio de largo plazo', pregunta: '¿Con qué Brent y qué margen de refino se calcula la recompra de 2027?', por_que: 'La recompra (3.400 M en 2026) es la mitad del atractivo y depende del escenario.' },
    { tema: 'Plenitude', pregunta: '¿Cuánto bajará la deuda consolidada y el EBITDA al desconsolidar Plenitude, y a qué valor se registra el 65 %?', por_que: 'Cambia el puente y los múltiplos.' },
    { tema: 'Deterioros', pregunta: '¿Por qué las partidas identificadas superan 2.000 M casi todos los años si no son recurrentes?', por_que: 'El beneficio ajustado sobrestima el de largo plazo.' },
    { tema: 'Searah y Kutei', pregunta: '¿Qué producción y qué dividendos aportará Searah en 2027-2028?', por_que: 'Una parte creciente del valor está en participadas.' },
    { tema: 'Química', pregunta: '¿Cuándo deja Versalis de perder dinero sin ayuda de interrupciones de suministro?', por_que: 'Lleva años en pérdidas (≈−800 M al año).' },
    { tema: 'Retribución', pregunta: '¿Cómo se reparte el exceso de caja entre dividendo extraordinario y recompra si el Brent sigue por encima de 100 USD?', por_que: 'Decide la rentabilidad para el accionista en 2027.' },
  ], confianza: 'Media' },
  sentimiento: { lectura: 'El tono del comentario financiero italiano es positivo y gira alrededor del dividendo extraordinario del 22-oct y del Brent por encima de 100 USD; no hay debate abierto en foros accesibles. No aporta un riesgo que el informe no recoja: al contrario, refuerza que el precio descuenta el escenario de hoy. El dividendo extra que se discute equivale a un 0,5-1,5 % del precio y no cambia la valoración [E1, E2].', confianza: 'Baja' },
  competencia: { amenazas: 'Lo que puede erosionar la ventaja: menos éxito exploratorio (la ventaja de Eni es encontrar barato), más presión fiscal de los países productores y la transición, que reduce la demanda de crudo a largo plazo. Probabilidad media en los tres; ninguno inmediato.' },
};

export default {
  fuentes,
  limitaciones: 'Línea cotizada: Euronext Milan (ENI.MI, EUR); el ADR (E, NYSE) representa dos acciones. Cuentas 2020-2025 del XBRL ESEF comprobadas con los 20-F; EBITDA normalizado = el ajustado de la empresa (sin efecto inventario ni partidas identificadas). Las participadas (Vår Energi, Azule, Searah, ADNOC R&GT, Saipem) no están en el EBITDA y van en el puente a su valor contable de junio de 2026. El DCF usa el perímetro de junio de 2026 (Searah ya fuera; Plenitude aún consolidada). Los comparables se tomaron de los análisis de Galp y TotalEnergies del mismo día (MarketScreener y Stock Analysis). Trimestres en semestres (Eni no publica la cuenta trimestral completa en el 6-K). Sin transacciones con múltiplo, sin remuneración del consejero delegado ni votos de la junta 2026.',
  controles_explicados: [
    { control: 'Tipo impositivo efectivo razonable', explicacion: 'Petrolera con contratos de reparto de producción: el tipo efectivo ajustado de Eni es del 44 % (2025) y del 52 % (2024), y el publicado es mayor porque los deterioros no son deducibles [A1]. El DCF proyecta un 48-50 % sobre el EBIT.' },
    { control: 'EBIT + resultado financiero = BAI', explicacion: 'La diferencia es el resultado de participadas y otras inversiones (1.587 M en 2025, 1.850 M en 2024, 2.444 M en 2023), que Eni presenta debajo del resultado financiero [A1].' },
    { control: 'BPA = beneficio neto / acciones', explicacion: 'El BPA publicado resta la remuneración de los bonos híbridos perpetuos (237 M en 2025) y usa las acciones diluidas por el bono convertible ligado a sostenibilidad [A1].' },
    { control: 'Crecimiento del BPA base', explicacion: 'El BPA de partida de 2025 es el NIIF (0,78), con 2.381 M de deterioros y efecto inventario; en la misma base que nuestra proyección (ajustado menos híbridos) fue de 1,57 EUR, y el BPA base de 2028e (1,91) supone un 6,8 % anual, por más producción y menos acciones.' },
  ],
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones', tipo: 'Complemento', intentos: '1) 20-F 2025, nota de combinaciones de negocios (sin múltiplos de EBITDA); 2) notas de prensa de KKR-Enilive y EIP-Plenitude (valor de empresa sin EBITDA comparable); 3) prensa sectorial de fusiones en petroleras europeas (sin múltiplos verificables)', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'remuneracion_ceo y votos de la junta 2026', tipo: 'Complemento', intentos: '1) 20-F 2025, Item 6 (sin cifra individual); 2) relazione sulla remunerazione 2026 en eni.com (no descargada en el tiempo del análisis); 3) prensa de la junta del 6-may-2026 (solo el voto de la lista, 51,38 %)', decision: 'Omitido' },
    { seccion: 'sector', campo: 'tamano y serie', tipo: 'Complemento', intentos: '1) 20-F 2025 (sin tamaño del mercado en dinero); 2) estadística de la AIE (en volumen, no en EUR); 3) cálculo propio: no aporta (cuota < 2 %)', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'geografias', tipo: 'Complemento', intentos: '1) 20-F 2025, nota de segmentos por país (no localizada en el texto descargado); 2) informe intermedio 1S26 (sin desglose); 3) ESEF (sin etiqueta de ingresos por país)', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe de sostenibilidad Eni for (no descargado); 2) MSCI y Sustainalytics (de pago); 3) prensa (sin fecha verificable)', decision: 'Omitido' },
  ],
  secciones,
  dcf_justificacion: {
    crecimiento: 'Año base 2025: 82.151 M de ventas con el Brent a 69 USD [A1]. 2026e +12 % (fijo): el 1S26 ya da 42.056 M (+17,6 %) y el 2S va con el Brent por encima de 90-106 USD [A3, P1]. 2027e y 2028e −5 % cada año: la curva de futuros pone el Brent en 85,6 USD a diciembre de 2027 y 78,3 USD a diciembre de 2028 [P1], compensado en parte por un +3 % de volumen al año (guía de producción) [A3]. 2029-2033: +1,5-2,5 %, solo volumen. Es una normalización deliberada: no suponemos un Brent de 100 USD permanente.',
    margenes: 'Margen EBITDA normalizado del 22,4 % en 2026e (el 1S26 con las filiales consolidadas, ≈22,7 %), 21,5 % en 2027e y 20,5 % en 2028e, para converger al 19,5 %: entre el 19,1 % de 2025 (Brent de 69 USD) y el 20,2 % de 2024 (80 USD) [A1]. El mayor peso de la producción propia sube algo el margen frente a 2025, y la química y el refino lo bajan cuando el margen de refino vuelva a 6 USD/b.',
    inversion: 'Capex del 9,0-9,5 % de las ventas (8.300-8.000 M), en línea con 2023-2025 (9,6-11,2 %) y con el plan de 29.000 M brutos en cinco años más lo que se reembolsa con las ventas de participaciones [A1, A3]. Amortización del 8,0-9,0 % de las ventas; capex por encima de la amortización todo el periodo. Circulante comercial del −3 % de las ventas, como en 2025.',
    wacc: 'Tasa libre: Bund a 10 años del 3,42 % el 15-oct-2026 [D4]. Beta de 0,9: la regresión contra el FTSE MIB da 0,44 (mensual de 5 años) y 0,62 ajustada, pero el índice italiano pesa mucha banca; las integradas europeas tienen betas de 0,8-1,0. Prima de mercado del 5,5 % y prima adicional de 1 punto por la producción en países de riesgo (Libia, Egipto, Nigeria, Congo). Coste de la deuda del 4,5 % antes de impuestos; peso de la deuda del 24 % a valor de mercado (deuda neta ajustada de 23.886 M frente a 73.756 M de capitalización). WACC del 7,94 %.',
    terminal: 'Crecimiento terminal del 1,0 %, por debajo de la inflación esperada del euro: la demanda de crudo tiene pico hacia 2030 y Eni tendrá que reponer reservas a coste creciente. El múltiplo implícito se compara con el EV/EBITDA histórico de 2,5-5,1 veces. El valor terminal pesa el 62 % del valor.',
  },
  puente_comentarios: {
    '2026e': 'Volumen +5 % (producción subyacente ≈+5 %, ventas de gas +17 % en el 1S26) y precio +7 % (Brent de 93 USD en el 1S26 y por encima de 100 USD en septiembre-octubre frente a 69 de media en 2025, con el euro más fuerte) [A3, P1].',
    '2027e': 'Volumen +3 % (Baleine 3, Congo LNG, Searah) y precio −8 %: Brent hacia 85-90 USD según la curva de futuros [P1].',
    '2028e': 'Volumen +3 % y precio −8 %: Brent hacia 75-80 USD (futuro de diciembre de 2028: 78,3 USD) y margen de refino de 6 USD/b [P1].',
    '2029e': 'Volumen +3 % con los proyectos aprobados; precio estable (−0,5 %).',
    '2030e': 'Volumen +2,5 %, el ritmo del plan; precio constante.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'La proyección apenas crece (1,5 % de media): tras el pico de 2026 las ventas bajan dos años y luego suben un 1,5-2,5 % por volumen, que es lo que da la cartera de proyectos aprobados (Baleine, Congo LNG, Argentina, Searah) y la guía de +3-5 % de producción [A3]. Se financia con un capex por encima de la amortización (9,0-9,5 % de las ventas) que ya está en el plan de 29.000 M [A1], sin pedir subidas de precio: el precio de 2027-2028 es el de la curva de futuros. Por eso la calidad del negocio sostiene el crecimiento proyectado: Sí. Lo insostenible es el beneficio de 2026, y la proyección ya lo normaliza. El mercado final (petróleo y gas mundial) es tan grande que la prueba de cuota no aplica: mercado final en null.',
  dcf_lectura: 'El DCF da 20,65 EUR por acción, un 19,9 % por debajo del precio de 25,77 EUR, con un WACC del 7,94 % y un valor terminal que pesa el 62 %. El DCF inverso dice que el precio descuenta un crecimiento del 3,1 % anual en los años no fijos (2027-2033), frente al 0,0 % de nuestro caso base, o un margen EBITDA del 21,8 % frente al 19,5 %: el mercado da por hecho que una parte del Brent de la crisis se queda, o que el crudo se mantiene cerca de 90 USD durante años. La rentabilidad implícita en el precio es del 6,7 %, por debajo del WACC. Es exigente para una cíclica en el pico: entre 2023 y 2025 Eni ganó 5.000-8.300 M ajustados con el Brent a 69-83 USD, y nuestro 2028e (≈5.600 M antes de híbridos) ya está en esa franja con más producción y menos acciones. Para llegar al precio hay que creer en un Brent de 85-90 USD sostenido.',
  narrativas: {
    Bajista: 'Ormuz se normaliza del todo en 2027, la OPEP+ recupera cuota y el Brent vuelve a 60-65 USD como en 2025; el refino cae a 4-5 USD/b y el gas europeo se abarata con la ola de GNL. Margen 3 puntos por debajo del base y crecimiento 2 puntos menor cada año (BPA 2028e de 1,27 EUR).',
    Base: 'La crisis se normaliza poco a poco: Brent hacia 85 USD en 2027 y 75-80 en 2028, refino a 6 USD/b, producción +3 % al año. Beneficio ajustado de 2028e de unos 5.600 M, entre el de 2024 y el de 2025 más los proyectos (BPA 2028e de 1,91 EUR).',
    Alcista: 'La crisis deja un suelo de precios más alto: Brent de 85-90 USD sostenido, gas europeo caro y refino por encima de 9 USD/b. Margen 2 puntos por encima del base y crecimiento 2 puntos mayor (BPA 2028e de 2,40 EUR).',
  },
  escenarios_comentario: 'La asimetría es mala: el alcista del DCF da 30,56 EUR (+18,6 %) y el bajista 10,31 EUR (−60,0 %), con un valor ponderado por debajo del precio. El bajista es verosímil, no cosmético: es lo que pasó tras los picos de 2008, 2014 y 2022 (el beneficio ajustado cayó de 13.301 M en 2022 a 4.989 M en 2025). No compensa.',
  per_historico: {
    base: 'adelantado', actual: 11.5, mediana_5a: 7.26, minimo_5a: 5.35, media_larga: 8.95,
    excluidos: 'PER adelantado = precio de cierre del año ÷ BPA ajustado del año siguiente (beneficio neto ajustado menos el cupón de los híbridos, entre las acciones medias) [A1, A4, A5]: 2018 17,17 (13,75 ÷ 0,80); 2020 7,20 (8,55 ÷ 1,19); 2022 5,35 (13,29 ÷ 2,49); 2023 9,49 (15,35 ÷ 1,62); 2024 8,33 (13,09 ÷ 1,57); 2025 6,18 (16,14 ÷ 2,61, nuestro BPA ajustado de 2026e). Excluidos: 2019 (el BPA de 2020 es una pérdida) y 2021 (3,23 veces, sobre el BPA de 2022 de la guerra de Ucrania, 3,79 EUR, atípico). Mediana de 2021-2025 sin 2021: 7,26; mínimo 5,35; media de los seis años válidos 8,95. Actual = 25,77 ÷ 2,24 (nuestro BPA de 2027e) = 11,5. Comparables: mediana del PER de los próximos doce meses de 8,25 [D6].',
    v2: { mediana_5a: 9.18, minimo_5a: 6.17, media_larga: 10.49, excluidos: 'Historia al cierre (precio ÷ BPA ajustado del mismo año): 2018 10,80; 2019 17,29; 2021 10,29; 2023 6,17; 2024 8,09; 2025 10,27. Excluidos 2020 (pérdidas) y 2022 (3,51 veces, BPA de la guerra de Ucrania).' },
  },
  casos_12m: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 1.27, multiplo: null, precio: null, justificacion: 'Brent de 60-65 USD y refino a 4-5 USD/b: EBITDA de 13.900 M, EBIT de 6.900 M, participadas 1.300 M, financieros −900 M, impuesto del 45 %, minoritarios 200 M e híbridos 260 M sobre 2.803 M de acciones (las de hoy menos la recompra anunciada que queda).' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 1.91, multiplo: null, precio: null, justificacion: 'Brent de 75-80 USD: ventas de 83.038 M, EBITDA de 17.023 M y EBIT de 9.715 M del DCF, participadas 1.800 M, financieros −850 M, impuesto del 45 % (44 % ajustado en 2025), minoritarios 250 M e híbridos 260 M; 2.803 M de acciones.' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 2.4, multiplo: null, precio: null, justificacion: 'Brent de 85-90 USD sostenido: EBITDA de 19.500 M, EBIT de 11.900 M, participadas 2.200 M, financieros −800 M, impuesto del 45 %, minoritarios 300 M e híbridos 260 M; 2.803 M de acciones.' },
  ],
  diferencia_consenso: 'Nuestro BPA de 2028e (1,91 EUR) queda un 22 % por debajo del consenso (2,438) y nuestro objetivo base (20,06 EUR) un 24 % por debajo del objetivo medio de los analistas (26,37) [D2, D3]. La diferencia sale de tres sitios: el precio (proyectamos con la curva de futuros, 78 USD en 2028, y un refino de 6 USD/b), los híbridos (restamos su cupón, ≈260 M, que el consenso no resta) y las acciones (el consenso supone recompras no anunciadas: su beneficio de 6.474 M entre su BPA implica 2.655 M de acciones, frente a 2.803 M nuestras). En beneficio neto antes de híbridos la diferencia es del 13 %. La mantenemos: es una cuestión de precio del crudo, no de error.',
  media_12m: 17.37,
  objetivo_comentario: 'El objetivo a 12 meses (18,05 EUR ponderado; 20,06 EUR en el base) queda cerca del valor intrínseco (20,61 EUR): las dos medidas dicen lo mismo, que el precio de 25,77 EUR descuenta un Brent alto durante años. El PER base de 10,5 veces es el tope de la regla (el actual de 11,5 ÷ 1,1), por encima de la mediana histórica de 7,3: la regla ya concede a Eni más de lo que pagó el mercado en 2021-2025. El crecimiento del BPA desde el último real se mide mal con el BPA NIIF de 2025 (0,78, con 2.381 M de partidas): en base ajustada fue de 1,57 EUR y el base de 2028e supone un 6,8 % anual. Lo que cerraría la distancia: un Brent de diciembre de 2028 por encima de 85 USD o un acuerdo de recompra mucho mayor.',
  valoracion_comentario: 'Pesos: DCF 60 % y escenarios 40 %; comparables, transacciones y suma de partes a 0. El DCF es el método más fiable porque permite normalizar el precio del crudo con la curva de futuros; los comparables (PER de 8,25 veces) miden beneficios del pico de 2026-2027 y darían 20,6-23,9 EUR, por encima del DCF pero también por debajo del precio. La dispersión es pequeña: todos los métodos quedan por debajo de la cotización salvo el rango de los analistas (19-32 EUR). El valor intrínseco es de 20,61 EUR (−20,0 %). Las participadas van al valor contable (19.170 M, unas 10-11 veces su resultado normalizado) y los híbridos como deuda (5.990 M) junto a la recompra hecha después del balance (1.055 M).',
  resumen: {
    recomendacion: 'Vender', conviccion: 'Media',
    justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Vender, con convicción media. El objetivo a 12 meses es de 18,05 EUR (20,06 EUR en el caso base) y el valor intrínseco de 20,61 EUR, frente a un precio de 25,77 EUR (cierre del 15-oct-2026); el objetivo medio de los analistas, 26,37 EUR, queda por encima de nuestro alcista. La rentabilidad a 12 meses es del −25,8 % ponderada y del −18,0 % en el base, con dividendo; con la regla v2 de control, −29,6 % y −27,6 %. La razón: el precio cotiza el Brent de la crisis de Ormuz (106 USD) como si fuera a durar, y la curva de futuros (78 USD a finales de 2028) y la historia dicen que no. El motor sugiere convicción baja porque, con la prima de riesgo del mercado, el valor intrínseco da Mantener; nos apartamos porque decide la regla a 12 meses, a 16 puntos de su umbral de Vender. No es alta porque la normalización no tiene fecha: si el Brent se queda por encima de 90 USD en 2027 la tesis se retrasa.

**El negocio.** Eni es la petrolera europea que mejor explora: produce 1,79 Mbep/d (+11 % subyacente en el 1S26) y vende participaciones de sus descubrimientos y de sus filiales de transición para financiarse [A3]. Pero no crea valor sobre su coste de capital: ROIC del 6,1 % en 2025 frente a un WACC del 7,94 %, y solo lo superó en el pico de 2022. La calidad sostiene el crecimiento que proyectamos (veredicto de sostenibilidad: Sí), porque proyectamos poco: +1,5 % de media, solo volumen.

**Sector y ciclo.** Pico por choque de oferta: Brent de casi 140 USD en marzo, 70 en junio y 106 hoy [A3, P1]. Tras el pico de 2022 el beneficio ajustado cayó de 13.301 M a 4.989 M en tres años [A1].

**Finanzas.** Deuda neta ajustada de 23.886 M con los híbridos y la recompra posterior al balance; gearing proforma del 10 % [A3]. El retorno al accionista de 2024-2025 superó al FCF y las partidas «identificadas» (deterioros) se repiten casi todos los años.

**Equipo y gobierno.** Descalzi cumple sus guías y empieza su quinto mandato; el Estado controla con un 33 % y nombra la cúpula [C1, C3]. Resta poco, pero la sucesión depende del Gobierno.

**Valoración.** El DCF da 20,65 EUR y descuenta un crecimiento del 3,1 % anual frente al 0,0 % del base. La regla pone 10,5 veces (el tope sobre el PER actual de 11,5; mediana histórica de 7,3) sobre nuestro BPA de 2028e de 1,91 EUR, un 22 % por debajo del consenso, sobre todo por el precio del crudo, los híbridos y las recompras no anunciadas.

**Riesgos y catalizadores.** El riesgo de la tesis es que el Brent se quede alto (Ormuz otra vez cerrado o la OPEP+ sin reponer). El 22-oct trae resultados y quizá un dividendo extraordinario de 0,14-0,38 EUR (0,5-1,5 % del precio) [D9, P6]. Los foros celebran ese dividendo; no cambia el valor.

**Qué cambiaría la decisión.** Comprar por debajo de 16,63 EUR; mantener entre 16,63 y 21,25 EUR; vender por encima de 21,25 EUR. Revisaríamos si el futuro del Brent de diciembre de 2028 sube por encima de 85 USD o si la recompra de 2027 supera los 4.000 M con un Brent de presupuesto por debajo de 75 USD.`,
    tesis: `Eni es una petrolera integrada con la mejor exploración de Europa: 1,79 Mbep/d en el 1S26, un 11 % más que un año antes, y un modelo de vender participaciones de sus hallazgos y de sus filiales (Plenitude, Enilive, Searah) que ha traído caja a múltiplos altos [A3]. Reparte 1,10 EUR de dividendo y recompra 3.400 M en 2026 [A3].

El precio de 25,77 EUR descuenta, según el DCF inverso, un crecimiento del 3,1 % anual en los años no fijos frente al 0,0 % de nuestro caso base: supone que el Brent se queda cerca de los niveles de la crisis. A 8,6 veces el BPA de consenso de 2026 parece barata, pero a 11,5 veces nuestro BPA de 2027 cotiza por encima de su mediana histórica de 7,3 veces con el BPA del año siguiente.

El mercado acierta en la calidad operativa y se equivoca en la duración del precio: la curva de futuros pone el Brent en 78 USD a finales de 2028 [P1] y el ROIC de Eni (6,1 %) no cubre su coste de capital a precios normales. Para invertir hay que creer que el choque de oferta deja un suelo de 85-90 USD durante años.`,
    vision_diferencial: {
      mercado_descuenta: 'Un beneficio de 2028 de unos 6.500 M (consenso: BPA de 2,44 EUR) con el Brent y el refino altos y las recompras sin pausa; con él la acción cotiza a 10,6 veces, en línea con el sector.',
      nuestra_vision: 'Un BPA de 2028e de 1,91 EUR, con el Brent a 75-80 USD, el refino a 6 USD/b y los híbridos restados; a 10,5 veces da 20,06 EUR, un 22 % por debajo del precio, más un 4 % de dividendo.',
      por_que: 'Los choques de oferta se corrigen con más oferta y menos demanda: 2008, 2014 y 2022. La propia Eni planifica con 70 USD reales y espera que el precio se normalice en el 2S26 [A1, A3]; la curva de futuros baja 28 USD en dos años [P1].',
    },
    a_favor: [
      '**Exploración de primer nivel**: +11 % de producción subyacente en el 1S26 y guía de ≈5 % en 2026 [A3].',
      '**Retribución generosa**: dividendo de 1,10 EUR (4,3 %) y recompra de 3.400 M (4,6 % de la capitalización) [A3].',
      '**Balance sano**: gearing proforma del 10 % y rating A-/A3 [A3].',
      '**Filiales con valor de mercado**: KKR, EIP y Ares han pagado por Enilive y Plenitude; Searah con Petronas [A1, A3].',
      '**Riesgo de IA bajo y con lado positivo**: más demanda de gas y electricidad.',
    ],
    en_contra: [
      '**Precio de pico**: cotiza el Brent de 106 USD; el de diciembre de 2028 está en 78,3 USD [P1].',
      '**No cubre su coste de capital**: ROIC del 6,1 % frente a un WACC del 7,94 %.',
      '**Múltiplo alto frente a su historia**: 11,5 veces el BPA de 2027e frente a una mediana de 7,3.',
      '**Partidas «identificadas» recurrentes**: 3.334 M en 2025 y 1.470 M de deterioros en el 1S26 [A1, A3].',
      '**Estado de control**: 33 % del capital y «golden power» [C1].',
    ],
    que_vigilar: 'La tesis depende de que el Brent y los márgenes de refino vuelvan a niveles de 2024-2025 en 2027-2028. La señal de que no se cumple: un futuro del Brent de diciembre de 2028 por encima de 85 USD, un margen de refino por encima de 9 USD/b dos trimestres seguidos después de reabrirse Ormuz, o la producción del Golfo sin volver en 2027.',
    cambiaria_recomendacion: [
      'Precio por debajo de 21,25 EUR: pasaríamos a Mantener; por debajo de 16,63 EUR la regla daría Comprar (con la calidad aún por debajo del requisito).',
      'Futuro del Brent de diciembre de 2028 por encima de 85 USD durante un mes: revisaríamos el base al alza.',
      'Recompra de 2027 por encima de 4.000 M con un Brent de presupuesto de 70-75 USD: subiría el BPA por acción.',
      'ROIC por encima del 13 % con el Brent por debajo de 80 USD: pasaría el requisito de calidad.',
    ],
    kpis_seguimiento: [
      { kpi: 'Brent (futuro dic-2028)', nivel_actual: '78,3 USD', umbral_alerta: '> 85 USD', por_que: 'Mide la normalización que supone la tesis [P1].' },
      { kpi: 'Producción', nivel_actual: '1,79 Mbep/d (1S26)', umbral_alerta: '< 1,70 Mbep/d', por_que: 'El volumen es el único crecimiento del base [A3].' },
      { kpi: 'Margen de refino SERM', nivel_actual: '14 USD/b (guía 2026)', umbral_alerta: '> 9 USD/b en 2027', por_que: 'Decide el dividendo extraordinario y el refino [A3].' },
      { kpi: 'Gearing proforma', nivel_actual: '10 %', umbral_alerta: '> 15 %', por_que: 'Límite del rango objetivo [A3].' },
    ],
  },
};
