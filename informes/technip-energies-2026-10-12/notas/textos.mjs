// Textos de juicio del orquestador. Las cifras de valoración salen de calc (segundo cálculo, 12-oct-2026).
export default {
  limitaciones: `Línea cotizada: Euronext París (TE), la única con liquidez; hay ADR sin patrocinar en EE. UU. (THNPY), no usados. Precio: cierre del viernes 9-oct-2026 (29,14 EUR), porque la sesión de París del lunes 12-oct no había cerrado al tomar los datos [D1]. Base contable: las cuentas, el balance, los flujos, el DCF y el puente van en NIIF (las JV de proyecto por puesta en equivalencia, valoradas en el puente a su valor contable de 327,1 M); la empresa publica además cifras «ajustadas» con las JV a su porcentaje, que son las de los trimestres, la guía, los KPI y el consenso [A4, A5]. Ingresos NIIF y ajustados casi coinciden (7.203,8 frente a 7.186,5 M en 2025); el EBITDA ajustado excluye no recurrentes que se repiten cada año, y el motor los descuenta del consenso con un ajuste del 0,8 % de las ventas [A4, D4]. El EBITDA de 2021 y el del LTM usan amortizaciones ajustadas (estimación) [A9, A5]. Acciones: 174,09 M en circulación a 30-sep-2026, sin la dilución de los planes de acciones (≈ 2-3 M), que no se publica a esa fecha [D3]. Minoritarios del puente a 31-dic-2025 (35,3 M) [A1]. No se ha podido leer la transcripción de las conferencias ni el acta detallada de las juntas (web de inversores con error 403). Los segmentos NIIF empiezan en 2022.`,

  controles_explicados: [
    { control: 'Rendimiento del capital nuevo de la proyección', explicacion: 'Technip Energies trabaja con capital invertido negativo (−441 M en 2025) porque los anticipos de clientes superan a los activos operativos: el ROIC y el ROIC incremental salen negativos y no son una medida útil. La prueba de sostenibilidad se hace con la cartera, el margen y el poder de precios (ver dcf.sostenibilidad).' },
    { control: 'Regresión múltiplo-crecimiento', explicacion: 'R² de 0,07: no se usa el valor de la regresión; la valoración por comparables usa las medianas de EV/EBITDA y PER.' },
    { control: 'Múltiplos LTM y NTM de cada comparable coherentes', explicacion: 'El EBITDA NIIF de los últimos 12 meses (420,7 M sin participadas) está hundido por las provisiones de Oriente Medio del 1S26 (margen ajustado del 2T26 del 3,4 %), y el consenso de los próximos 12 meses supone la recuperación de 2027. No hay cambio de proveedor ni de perímetro: el salto es la tesis de recuperación del margen.' },
  ],

  valoracion_comentario: `**Puente en NIIF a 30-jun-2026**: deuda financiera 1.350,9 M (bonos de 600 M a 2028 y de 500 M a 2033), arrendamientos 276,5 M, caja 4.490,4 M, minoritarios 35,3 M, pensiones 67,5 M (88,9 M netas de un 25 % de impuestos), participadas 327,1 M a valor contable [A5, A1]. **Anticipos (regla del puente)**: los pasivos por contrato (4.158,3 M frente a 340,5 M de activos por contrato) se compensan con la ejecución de cada contrato y no se devuelven en caja, así que son circulante y no deuda; el DCF los lleva en el circulante y proyecta que su peso baje del −46 % de las ventas en 2026e al −30 % en 2032e, lo que devuelve unos 1.000 M de caja entre el pico de junio y 2033. Además, la subida del pasivo neto por contrato en el primer semestre (de 3.356,8 a 3.817,8 M, +461 M) es caja de anticipos que la caja del puente ya cuenta y que el DCF no ve: va en otros_ajustes, −2,65 EUR por acción [A1, A5]. **Sensibilidad**: si además se restara como deuda la caja que la propia empresa asocia a proyectos (1.827,5 M a dic-25: caja neta ajustada de 2.827,5 M frente a ~1.000 M «libres») el valor bajaría 10,50 EUR por acción; si se restara todo el pasivo neto por contrato, 21,93 EUR [A4]. **Pesos**: DCF 45 %, comparables 25 %, escenarios 15 %, suma de partes 10 % y transacciones 5 % (llevan prima de control y HAL, con el 20,01 %, no ha pedido consejo ni lanzado oferta [C2]). Los métodos van de 32,32 (comparables) a 44,69 EUR (transacciones): todos por encima del precio de 29,14 EUR.`,

  dcf_justificacion: {
    crecimiento: `2026e +8,0 % (fijo): el 1S26 creció un 0,2 % y la guía condicional del 30-jul pide 7.600-8.500 M de ingresos ajustados (Project Delivery 5.700-6.300 M y TPS 1.900-2.200 M); tomamos 7.780 M, por debajo del punto medio y del consenso (7.961 M), porque nuestra cifra ya exige que el 2S crezca un 17 % (el punto medio de la guía, un 24 %) con obras paradas en Oriente Medio [D4, A5]. 2027e +12,0 % (consenso +15,4 %): la cartera récord de 25.035 M, con 14.413 M ejecutables desde 2028, sostiene el salto de Commonwealth LNG y Coral Norte [A5]. Después +6 %, +2 %, 0 % y +2-2,5 %: la ola de GNL aprobada en 2025 (68,4 Mtpa) se ejecuta en 2027-2029 y no damos por hecha una segunda [B8].`,
    margenes: `Margen EBITDA NIIF sin participadas: 10,3 % en 2021, 10,1 % en 2022, 9,1 % en 2023 (con 337,2 M de ajustes favorables de grado de avance), 8,3 % en 2024 y 7,6 % en 2025 (con 80,7 M de no recurrentes) [A1, A3]. 2026e 5,8 %, coherente con la guía (Project Delivery >5 %, TPS ~15 %) menos no recurrentes [D4]. 2027e-2028e 7,4-7,8 %: recuperación sin volver al 8,5 % del plan de 2024 para Project Delivery [A17]; largo plazo 7,5 %, por debajo de la media 2021-2025 y por encima de Saipem y Técnicas Reunidas (4,4-4,5 % de margen EBIT), en línea con un contratista con un 25 % de TPS [B16, B17].`,
    inversion: `Capex del 2,2 % de las ventas, que incluye las altas de derechos de uso (capex de 89,4 M y pagos de arrendamientos de 77,4 M en 2025, 2,3 % en total); amortización del 1,8 % (1,7 % en 2025, más la asignación del precio de AM&C) [A1]. Circulante (clientes más activos por contrato menos proveedores y pasivos por contrato): −51,8 % de las ventas en 2021, −46,6 % en 2025 y −54 % sobre el LTM de junio. Lo llevamos de −46 % en 2026e a −30 % en 2032e: la intensidad de anticipos baja a medida que se consumen los de los grandes contratos y pesa más TPS. Es la hipótesis que más valor mueve; la explicamos en el puente [A1, A5].`,
    wacc: `Tasa libre: Bund a 10 años del 3,53 % (Bundesbank, 9-oct-2026) [D11]. Beta 0,90: la mensual a 5 años ajustada frente al Stoxx 600; la semanal a 2 años da 0,91 y la de 5 años 1,10 [D1]. Prima de mercado del 5,5 % y prima adicional de 1 punto por concentración (cinco clientes son el 82 % de la cartera) y por el riesgo de los contratos a precio cerrado en Oriente Medio [B1]. Coste de la deuda del 4,0 %, el cupón del bono a 2033 emitido en junio [A5]; peso de la deuda del 10 %, porque la empresa tiene caja neta. Resultado: coste de los fondos propios del 9,48 % y WACC del 8,82 %.`,
    terminal: `Gordon con un crecimiento del 2,0 % en euros: inflación del 2 % y crecimiento real nulo, por debajo del Bund menos medio punto (3,03 %) y coherente con un mercado cíclico cuya capacidad crece un 4-6 % anual [B8]. El valor terminal pesa el 70 % del valor de empresa. El múltiplo de salida de referencia (5,5x EBITDA) está en la mediana de los comparables (5,3x) [D4].`,
  },

  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 5.5, precio_pct: 0.5, otros_pct: 2.0, comentario: 'Volumen: ejecución de North Field South y West, Ruwais y arranque de Commonwealth, con la cartera de 25.035 M [A5]. Otros: AM&C, consolidada desde el 31-dic-25 (estimación propia: ~2 puntos, con el EBITDA implícito en 496 M a 9,8x) [D23]. Precio: revisiones contractuales menores.' },
    { periodo: '2027e', volumen_pct: 11.5, precio_pct: 0.5, otros_pct: 0.0, comentario: 'Pico de ejecución de Commonwealth LNG y Coral Norte, y recuperación de lo diferido en 2026 (500-600 M más allá de 2026 según el 1T26) [A16, A5].' },
    { periodo: '2028e', volumen_pct: 5.5, precio_pct: 0.5, otros_pct: 0.0, comentario: '14.413 M de la cartera de junio se ejecutan desde 2028 [A5]; TPS crece hacia los >2.600 M del plan de 2024 [A17].' },
    { periodo: '2029e', volumen_pct: 1.5, precio_pct: 0.5, otros_pct: 0.0, comentario: 'Meseta: la ola de aprobaciones de 2025 se termina y hace falta reponer cartera [B8].' },
    { periodo: '2030e', volumen_pct: -0.5, precio_pct: 0.5, otros_pct: 0.0, comentario: 'Supuesto prudente de ciclo: sin una nueva ola de GNL las ventas no crecen; TPS compensa en parte.' },
  ],

  sostenibilidad_justificacion: `**En parte.** El crecimiento de 2026-2028 está en la cartera (25.035 M, 3,4 años de ventas) y no exige capital: la empresa trabaja con capital invertido negativo y los clientes financian la obra, así que la prueba del ROIC no sirve y la de cuota no se puede hacer con un mercado medido en Mtpa (cuota del 25 % de la capacidad instalada de licuefacción y más del 35 % de la que está en construcción) [B1]. Lo que no está demostrado es el margen: el poder de precios en el tanto alzado es limitado y el 1S26 obligó a provisionar costes que dependen de negociar con el cliente [A5]. Por eso el caso base queda por debajo de la guía y del consenso en ventas y en margen, y después de 2028 supone una meseta.`,

  dcf_lectura: `El DCF da 44,41 EUR por acción con un WACC del 8,82 % y un valor terminal que pesa el 70 %. La caja explica buena parte: el valor de empresa es de 5.105 M y la deuda neta con arrendamientos, −2.863 M. **El DCF inverso es la clave**: a 29,14 EUR el precio descuenta un crecimiento anual del −0,7 % en 2027e-2033e frente al 3,9 % del caso base, o un margen EBITDA del 4,6 % frente al 7,5 %, o una rentabilidad anual del 15,5 % frente a un WACC del 8,82 %. Es decir, el mercado valora la empresa como si el margen del peor semestre de su historia (5,8 % ajustado en el 1S26) fuera permanente o como si los anticipos fueran deuda. Ninguna de las dos lecturas encaja con la historia: margen del 7,6-10,3 % en 2021-2025 y pasivo neto por contrato estable entre el 47 % y el 52 % de las ventas durante cinco años [A1]. Incluso restando como deuda toda la caja que la empresa asocia a proyectos (−10,50 EUR), el DCF quedaría en ~34 EUR, por encima del precio. Lo exigente no es el precio, es la ejecución en Oriente Medio.`,

  esc_bajista: `El conflicto en Oriente Medio se alarga, North Field East sigue parada y las reclamaciones no se cobran: margen de Project Delivery en el 3-4 % dos años, ventas de 2027 planas y una ola de GNL que no se repite, con lo que los anticipos se consumen sin reponerse. Ya le pasó a Chiyoda con Golden Pass y a Fluor en 2025 [B15, B19].`,
  esc_base: `La guía condicional de 2026 se cumple, la cartera de 25.035 M se ejecuta en 2027-2028 con márgenes de recuperación (7,4-7,8 %) sin volver al plan de 2024, y la intensidad de anticipos se normaliza.`,
  esc_alcista: `Las reclamaciones de Oriente Medio se recuperan, TPS y AM&C suben el margen hacia el 8,5 % y una segunda ola de aprobaciones de GNL (EE. UU., Mozambique) repone cartera después de 2028.`,
  escenarios_comentario: `La asimetría es de 3,43x: el alcista vale 56,53 EUR (+94,0 %) y el bajista 21,16 EUR (−27,4 %). El bajista no es cosmético: recorta 12 puntos el crecimiento y 3,5 puntos el margen de 2027 y 3 y 2 puntos el resto de los años, y al encoger las ventas devuelve anticipos; aun así queda solo un 21 % por debajo del mínimo de 52 semanas (26,94 EUR) [D1]. Lo que compensa es que el precio ya descuenta un crecimiento negativo: el bajista está más cerca del precio que el alcista.`,

  sdp_pd: 'Contratistas EPC cotizados (Saipem, Técnicas Reunidas, JGC, Samsung E&A) cotizan a 5,3x EBITDA de mediana; a EV/EBIT, unas 6 veces [D4].',
  sdp_tps: 'Tecnología de proceso, catalizadores y servicios: Honeywell pagó 13x EBITDA por la tecnología de GNL de Air Products y TE 9,8x por AM&C; 12x EBIT es la zona media [D25, D23].',
  sdp_corp: 'Costes centrales no asignados, al múltiplo medio ponderado de los dos negocios.',
  sdp_comentario: `TPS (licencias, catalizadores, consultoría y equipos) tiene un margen EBIT del 9,4 % y menos riesgo que Project Delivery (6,4 %) [A1]: la suma de partes da 34,89 EUR con EBIT de 2025 y caja del puente. Pesa un 10 % porque los múltiplos por segmento son estimación propia y el EBIT de 2025 no recoge aún el deterioro de 2026.`,

  rentabilidad: `El ROIC que calcula el motor es negativo (−68,8 % en 2025) porque el capital invertido lo es (−441 M): los anticipos de clientes financian todo el circulante y el inmovilizado. Es la firma de un buen contratista, no un problema, pero hace inútiles el ROIC y el ROIC incremental. La medida útil es el ROE, del 16,5-19,7 % en 2021-2025 con un balance sin deuda neta, y el beneficio por euro de cartera. Frente a sus pares, Technip Energies ha ganado dinero todos los años desde 2021, cuando Fluor perdió (margen EBIT del −2,4 % en 2025) y Saipem y Técnicas Reunidas se movieron en el 4-5 % [B15, B16, B17]. El riesgo es que la rentabilidad depende de que los anticipos se renueven: si la cartera no se repone, el capital invertido vuelve a positivo y el ROE se diluye con caja ociosa.`,

  catalizadores: {
    items: [
      { fecha: '29-oct-2026', evento: 'Resultados de los nueve meses de 2026', efecto: 'Primera prueba de la guía condicional (margen de Project Delivery >5 %) y del avance de las reclamaciones en Oriente Medio', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Feb-2027', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Confirmaría o no la recuperación del margen hacia el 7-8 % que supone el consenso', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-2027', evento: 'Reanudación de North Field East y reapertura de Ormuz', efecto: 'Liberaría ingresos diferidos y permitiría revertir provisiones', probabilidad: 'Media', sentido: '+' },
      { fecha: '2027', evento: 'Nuevas aprobaciones de capacidad de GNL (EE. UU., África)', efecto: 'Reposición de cartera y de anticipos para 2029-2030', probabilidad: 'Media', sentido: '+' },
      { fecha: 'May-2027', evento: 'Junta general: dividendo y recompras', efecto: 'Dividendo de ~1 EUR (3,4 %) y posible nueva recompra con la caja libre', probabilidad: 'Alta', sentido: '+' },
      { fecha: '12-18 meses', evento: 'Movimientos de HAL (20,01 %)', efecto: 'Una oferta o un consejero cambiarían la lectura de control; HAL ha subido desde el 15,07 % en 2024 [C2]', probabilidad: 'Baja', sentido: '+' },
    ],
    confianza: 'Media',
  },

  riesgos: {
    items: [
      { riesgo: 'Oriente Medio: obras paradas y reclamaciones sin cobrar', tipo: 'Ejecución / geopolítico', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−27 % (escenario bajista)', mitigante: 'Contratos con cláusulas de fuerza mayor; 75 % de los pedidos de 24 meses fuera de la región [B3]', senal: 'Margen de Project Delivery por debajo del 5 % en los 9M26 o nuevas provisiones' },
      { riesgo: 'Los anticipos se consumen sin reponerse', tipo: 'Balance / ciclo', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−10,50 EUR por acción si la caja asociada a proyectos fuera deuda', mitigante: 'Cartera de 25.035 M con anticipos recientes de Commonwealth y Coral Norte [A5]', senal: 'Pasivo neto por contrato por debajo de 3.000 M o book-to-bill < 0,8 dos semestres' },
      { riesgo: 'Sobrecoste en un gran contrato a precio cerrado (Commonwealth, Coral Norte)', tipo: 'Ejecución', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−10 a −20 % (un año de EBIT)', mitigante: 'Historial sin grandes pérdidas desde 2021; parte de la cartera reembolsable', senal: 'Revisiones de grado de avance negativas; provisiones de cierre de contratos al alza' },
      { riesgo: 'Fin del ciclo de GNL: sobreoferta en 2027-2030 frena las aprobaciones', tipo: 'Sector', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−15 % (ventas planas desde 2028)', mitigante: 'TPS y descarbonización (25 % del EBIT); cuota del 35 % en lo que se construye [B1]', senal: 'Aprobaciones anuales de capacidad por debajo de 20 Mtpa' },
      { riesgo: 'Concentración de clientes', tipo: 'Comercial', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Incluido en los anteriores', mitigante: 'Clientes estatales y majors con relación repetida', senal: 'Cambios en la cartera de QatarEnergy' },
      { riesgo: 'Gobierno: blindajes estatutarios y venta del primer ejecutivo antes del segundo recorte de guía', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'Prima de riesgo (no modelado)', mitigante: '80 % de consejeros independientes; voto a favor de la remuneración del 94,15 % en 2026 [C18]', senal: 'Más ventas de directivos o rotación del director financiero' },
      { riesgo: 'Rendimiento de la caja y divisa', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−1 a −2 %', mitigante: 'Resultado financiero positivo de 109,9 M en 2025 [A1]', senal: 'Bajadas de tipos del BCE y de la Fed' },
    ],
    premortem: `Es octubre de 2029 y la acción vale 17 EUR. El conflicto del Golfo no se cerró en 2026: North Field East estuvo parada dieciocho meses y QatarEnergy se negó a pagar la mayor parte de los costes extra, que acabaron en un arbitraje. Technip Energies provisionó otros 250 M en 2027. A la vez, Commonwealth LNG, el mayor contrato de su historia, sufrió la inflación de mano de obra de la costa del Golfo de EE. UU. y su margen se quedó en el 3 %. Las aprobaciones de GNL se frenaron en 2027-2028 porque la capacidad que entraba hundía el precio del gas, y la entrada de pedidos cayó a la mitad de las ventas. Con menos pedidos, los anticipos se consumieron: el pasivo neto por contrato pasó de 3.800 M a 2.000 M y la caja neta, de 3.100 M a 1.200 M, justo lo que la empresa llamaba caja «asociada a proyectos». El mercado dejó de pagar por la caja y el múltiplo se quedó en 4x un EBITDA más bajo. Lo habrían anticipado tres indicadores: el margen de Project Delivery de los 9M26 por debajo del 5 %, un book-to-bill por debajo de 0,8 dos semestres seguidos y el pasivo neto por contrato cayendo más rápido que las ventas.`,
    confianza: 'Media',
  },

  preguntas: {
    items: [
      { tema: 'Reclamaciones en Oriente Medio', pregunta: '¿Qué importe de costes y reclamaciones está pendiente de negociar con QatarEnergy y cuánto está ya provisionado?', por_que: 'Decide si el margen de 2026 (>5 %) es un suelo o si hay más provisiones; mueve el valor más que cualquier otra hipótesis.' },
      { tema: 'Caja asociada a proyectos', pregunta: '¿Cómo calcula la empresa los ~1.000 M de caja neta «libre» y cuánto de la caja de junio de 2026 está comprometido con proyectos?', por_que: 'La diferencia con la caja contable (−10,50 EUR por acción) es la mayor incertidumbre del puente.' },
      { tema: 'North Field East', pregunta: '¿Qué parte de la obra está suspendida, quién paga la suspensión y qué calendario de reanudación maneja el cliente?', por_que: 'Explica los 500-600 M de ingresos diferidos y el riesgo de nuevos retrasos.' },
      { tema: 'Commonwealth LNG', pregunta: '¿Qué parte del contrato es a precio cerrado y qué protecciones hay frente a la inflación de mano de obra en EE. UU.?', por_que: 'Es el mayor contrato de la cartera y el motor del crecimiento de 2027.' },
      { tema: 'Objetivos de 2028', pregunta: '¿Sigue vigente el marco del Capital Markets Day de 2024 (Project Delivery ~8,5 % y TPS >2.600 M)?', por_que: 'El caso base queda por debajo; si la empresa lo mantiene, el alcista gana probabilidad.' },
      { tema: 'Venta del primer ejecutivo', pregunta: '¿Por qué vendió el primer ejecutivo 106.000 acciones el 21-may-2026, entre los dos recortes de guía?', por_que: 'Señal de gobierno; condiciona la credibilidad de la guía condicional [C15].' },
      { tema: 'HAL', pregunta: '¿Qué intención tiene HAL tras pasar del 20 % y por qué no tiene consejero?', por_que: 'Un accionista que sube con la acción en mínimos puede preparar una oferta o pedir influencia.' },
    ],
    confianza: 'Media',
  },

  resumen: {
    recomendacion: 'Comprar', conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Comprar, con convicción media. El valor objetivo es 39,94 EUR frente a un precio de 29,14 EUR (cierre del 9-oct-2026): potencial del 37,1 % y rentabilidad total esperada del 40,5 % con el dividendo. El alcista vale 56,53 EUR (+94,0 %) y el bajista 21,16 EUR (−27,4 %), una asimetría de 3,43x. La razón: el precio descuenta que el peor semestre de la historia de la empresa se vuelve permanente. La convicción es media, la que sugieren los criterios, porque el bajista pierde más del 25 %; subiría si los resultados del 29-oct mantienen el margen de Project Delivery por encima del 5 % sin nuevas provisiones, y bajaría si el pasivo neto por contrato cae por debajo de 3.000 M.

**El negocio.** Technip Energies construye un 25 % de la capacidad mundial de licuefacción de GNL y más del 35 % de la que está en obra, y ha ganado dinero todos los años desde 2021 con márgenes EBITDA del 7,6-10,3 % [B1, A1]. Sus clientes le pagan por adelantado: el capital invertido es negativo y la caja crece con la cartera. La calidad sostiene el crecimiento proyectado solo en parte: 2026-2028 está en una cartera récord de 25.035 M, pero el margen depende de negociar los sobrecostes de Oriente Medio, y el caso base supone una meseta desde 2029 [A5].

**Finanzas.** La caja neta de 3.139,5 M (sin arrendamientos) es, en su mayor parte, anticipos de clientes: el pasivo neto por contrato es de 3.817,8 M [A5]. Por la regla del puente son circulante, porque se compensan con entregas; el DCF proyecta que se consuman unos 1.000 M hasta 2033 y el puente resta los 461 M que entraron en el primer semestre (−2,65 EUR por acción). Si se restara además la caja que la empresa asocia a proyectos (1.827,5 M), el valor caería 10,50 EUR por acción [A4].

**Equipo y gobierno.** Resta algo: el primer ejecutivo vendió 106.000 acciones (3,8 M EUR) entre los dos recortes de guía, los estatutos blindan al consejo y HAL ha subido al 20,01 % sin consejero [C15, C2]. La guía se cumplió de 2021 a 2024; la de 2026 se ha recortado dos veces.

**Valoración.** El DCF da 44,41 EUR, los comparables 32,32 EUR, la suma de partes 34,89 EUR y las transacciones 44,69 EUR: todos por encima del precio. El DCF inverso dice que el mercado descuenta un crecimiento del −0,7 % anual en 2027e-2033e frente al 3,9 % de nuestro caso base, o un margen del 4,6 % frente al 7,5 %. Nuestras ventas de 2026e y 2027e quedan por debajo del consenso (7.780 y 8.714 M frente a 7.961 y 9.186 M) y nuestro valor objetivo coincide con el precio objetivo medio de los analistas (39,97 EUR) [D4, D5]: la tesis no es discrepar del consenso, sino que el precio está muy por debajo de lo que esperan incluso cifras prudentes. Con la prima implícita del mercado el valor objetivo sería 43,34 EUR; las dos reglas dan Comprar.

**Riesgos y catalizadores.** El mayor es Oriente Medio: obras paradas y reclamaciones sin cobrar (el bajista, −27,4 %). El segundo, que los anticipos se consuman sin reponerse si se frena la ola de GNL. En los foros franceses predominan las compras en la caída, con una minoría que teme que el conflicto se coma la caja: es el mismo riesgo del informe [E1, E2]. Catalizadores: resultados de los 9M26 el 29-oct-2026 y la guía de 2027 en febrero.

**Qué cambiaría la decisión.** Compraríamos por debajo de 38,54 EUR y venderíamos por encima de 49,29 EUR. Pasaríamos a Mantener si el margen de Project Delivery de los 9M26 baja del 5 % con nuevas provisiones, o si el pasivo neto por contrato cae por debajo de 3.000 M con un book-to-bill inferior a 0,8.`,
    tesis: `Technip Energies es el contratista de referencia en GNL: un 25 % de la capacidad de licuefacción instalada en el mundo y más del 35 % de la que se construye, una cartera récord de 25.035 M (3,4 años de ventas) y un negocio de tecnología y servicios (TPS) con un margen del ~15 % [B1, A5]. Sus clientes financian la obra por adelantado, así que trabaja con capital invertido negativo y acumula caja: 4.490,4 M en junio frente a 1.350,9 M de deuda [A5].

A 29,14 EUR, el valor de empresa es de 2.447 M, 3,7 veces el EBITDA de los próximos 12 meses del consenso. El DCF inverso dice que el precio descuenta un crecimiento del −0,7 % anual en 2027e-2033e o un margen EBITDA del 4,6 %, frente al 7,6-10,3 % de 2021-2025. El mercado ha castigado dos recortes de guía por Oriente Medio y duda de la caja, que en gran parte son anticipos [D2, A5].

El mercado acierta en que la caja no es toda libre y en que el margen de 2026 es malo. Se equivoca al tratar el peor semestre como permanente: incluso con ventas por debajo del consenso, margen del 7,5 % a largo plazo y unos 1.000 M de anticipos devueltos, el DCF da 44,41 EUR. Para invertir hay que creer que la empresa cobrará parte de los sobrecostes de Qatar y ejecutará Commonwealth LNG sin pérdidas.`,
    vision_diferencial: {
      mercado_descuenta: `Que el margen del 1S26 (5,8 % ajustado, 3,4 % en el 2T26) es el nuevo normal o que la caja neta es deuda disfrazada: el precio implica un crecimiento del −0,7 % anual o un margen del 4,6 % hasta 2033 [A5].`,
      nuestra_vision: `El margen se recupera al 7,4-7,8 % en 2027-2028, sin volver al 8,5 % del plan de 2024, y los anticipos son circulante que se consume despacio mientras la cartera se repone: el valor está entre 34 EUR (con toda la caja de proyectos como deuda) y 44 EUR.`,
      por_que: `Cinco años de margen del 7,6-10,3 % y de pasivo neto por contrato estable (47-52 % de las ventas), una cartera récord con un 75 % de los pedidos recientes fuera de Oriente Medio y un TPS que sube margen [A1, B3]. El consenso de analistas (39,97 EUR) piensa lo mismo; la diferencia está con el precio, no con ellos.`,
    },
    a_favor: [
      '**Cartera récord**: 25.035 M en junio de 2026, 3,4 años de ventas, con 14.413 M ejecutables desde 2028 [A5].',
      '**El precio descuenta crecimiento negativo**: −0,7 % anual en 2027e-2033e frente al 3,9 % del caso base.',
      '**Caja neta de 3.139,5 M** (sin arrendamientos), el 62 % de la capitalización, aunque en gran parte sean anticipos [A5].',
      '**Líder en GNL**: 25 % de la capacidad instalada y más del 35 % de la que está en construcción [B1].',
      '**TPS sube margen**: guía del ~15 % en 2026 y AM&C consolidada desde el 31-dic-25 [D4, A1].',
      '**Dividendo de 1,00 EUR (3,4 %)** y recompra de 150 M completada en junio [A1, A5].',
    ],
    en_contra: [
      '**Oriente Medio**: margen de Project Delivery del 4,3 % en el 1S26 y guía recortada dos veces [A5].',
      '**La caja es prestada por los clientes**: pasivo neto por contrato de 3.817,8 M; la empresa solo llama «libre» a ~1.000 M [A5, A4].',
      '**Concentración**: cinco clientes son el 82 % de la cartera [B1].',
      '**Venta del primer ejecutivo** de 3,8 M EUR entre los dos recortes de guía [C15].',
      '**Ciclo de GNL**: la ola de 2025 (68,4 Mtpa aprobados) puede no repetirse si la nueva capacidad hunde los precios del gas [B8].',
    ],
    que_vigilar: `La tesis depende de que el margen de Project Delivery toque fondo en 2026 y de que los anticipos no se consuman más rápido que las ventas. La señal de que no se cumple sería un margen por debajo del 5 % en los 9M26 con nuevas provisiones, o un pasivo neto por contrato por debajo de 3.000 M sin un book-to-bill superior a 1.`,
    cambiaria_recomendacion: [
      'Margen EBITDA de Project Delivery de los 9M26 (29-oct-2026) por debajo del 5 % con nuevas provisiones: pasaríamos a Mantener.',
      'Pasivo neto por contrato por debajo de 3.000 M con book-to-bill < 0,8 dos semestres: pasaríamos a Mantener.',
      'Precio por encima de 49,29 EUR: Vender o reducir.',
      'Una pérdida en Commonwealth LNG o Coral Norte superior a 200 M: revisaríamos el caso base a la baja.',
    ],
    kpis_seguimiento: [
      { kpi: 'Margen EBITDA de Project Delivery (ajustado)', nivel_actual: '4,3 % (1S26)', umbral_alerta: '< 5 % en 2026', por_que: 'Mide si Oriente Medio tocó fondo [A5].' },
      { kpi: 'Pasivo neto por contrato', nivel_actual: '3.817,8 M (jun-26)', umbral_alerta: '< 3.000 M', por_que: 'Es el origen de la caja neta [A5].' },
      { kpi: 'Book-to-bill', nivel_actual: '3,5 (1S26); 0,6 (2025)', umbral_alerta: '< 0,8 dos semestres', por_que: 'Reposición de cartera y de anticipos [A5].' },
      { kpi: 'Cartera de pedidos', nivel_actual: '25.035 M', umbral_alerta: '< 20.000 M', por_que: 'Visibilidad de 2027-2029.' },
      { kpi: 'Margen de TPS', nivel_actual: 'guía ~15 % (2026)', umbral_alerta: '< 13 %', por_que: 'La parte de mayor calidad del negocio [D4].' },
    ],
    confianza: 'Media',
  },

  fuentes: [],
};
