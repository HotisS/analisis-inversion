// Textos del analista (CR Sanjiu, corte 2026-10-20). Las cifras del motor salen de calc tal cual (tras el último cálculo).
const fuentes = [
  { id: 2, titulo: 'Movimiento del precio de 000999.SZ (`herramientas/movimiento.mjs` y `movimiento-precio.mjs`): 1-12 meses, máximos, media de 200 sesiones, sin caídas diarias de −5 %', editor: 'Yahoo Finance (cálculo propio)', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/000999.SZ/history' },
  { id: 3, titulo: 'Calendario de publicación de resultados (预约披露): 3T26 el 24-oct-2026', editor: 'Eastmoney (calendario de SZSE)', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://data.eastmoney.com/bbsj/yysj.html' },
  { id: 4, titulo: '关于公司产品通过谈判首次纳入国家医保目录的公告 (producto incluido por primera vez en la lista nacional de reembolso)', editor: 'China Resources Sanjiu (CNINFO/SZSE)', tipo: 'Primaria', fecha: '2025-12-09', url: 'http://static.cninfo.com.cn/finalpage/2025-12-09/1224857271.PDF' },
];

const secciones = {
  rentabilidad: {
    comentario: 'CR Sanjiu crea valor: ROIC del 14,0 % en 2025 frente a un WACC del 7,58 %, y entre el 17,3 % y el 19,2 % en 2021-2024. El ROIC lo mueve el margen (margen EBIT del 14,7 % en 2025) más que la rotación (0,6-0,7 veces el activo), y ha caído en 2025 porque el capital invertido subió de 19.446 M a 28.364 M con Tasly mientras su beneficio solo entraba nueve meses. Sin fondo de comercio el ROIC es del 17,8 %: el negocio de marcas rinde mucho y las compras lo diluyen. El ROIC incremental histórico es del 11,7 %, por encima del WACC pero por debajo del ROIC medio: cada compra rinde menos que el negocio original [A1, A14]. Frente a sus comparables (ROIC mediano del 11,7 %) está bien; frente a las marcas puras como Jiangzhong (24,6 %) o Dong-E-E-Jiao (16,9 %), peor [D3].',
    confianza: 'Media',
  },
  multiplos_historicos: {
    comentario: 'Cotiza por debajo de su historia: PER de los últimos 12 meses de 13,1 veces frente a una media de 16,9 veces en cinco años (−22 %) y un EV/EBITDA de 9,6 veces frente a 10,5 [D1]. El descuento tiene causas: el beneficio por acción no crece desde 2024 (2,02 → 2,06 → ≈ 1,84 en 2026e), KPC pierde dinero y la mitad del grupo ya es receta expuesta a las compras centralizadas, que el mercado valora menos que las marcas de farmacia. Con el PER adelantado (cierre ÷ BPA del año siguiente) la mediana de cinco años es de 15,5 veces y hoy cotiza a 12,9 veces el BPA de 2027e [P1].',
    confianza: 'Media',
  },
  comparables: {
    comentario: 'CR Sanjiu cotiza a 11,6 veces el beneficio de los próximos 12 meses, frente a una mediana de 16,0 veces de las nueve comparables, y a 9,6 veces el EBITDA frente a 11,0 [D3]. Parte del descuento se justifica: su crecimiento esperado (consenso) es menor que el de la mediana (13,3 %), su margen EBIT (14,7 %) está muy por debajo de las marcas puras y el 72 % del beneficio de Tasly y KPC es de otros. Pero la empresa tiene un ROIC igual o mejor que la mediana (14,0 % frente a 11,7 %) y la marca de farmacia más fuerte del país. Los valores implícitos por comparables (≈ 31-36 CNY por PER y EV/EBITDA) están por encima del precio; los usamos con un 20 % de peso porque el mercado chino de farmacéuticas cotiza alto frente a su crecimiento.',
    confianza: 'Media',
  },
  catalizadores: {
    items: [
      { fecha: '24-oct-2026', evento: 'Resultados del 3T26', efecto: 'Primer trimestre comparable con Tasly en las dos bases; mide el suelo de KPC y del CHC antes de la gripe', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Nov-2026 a feb-2027', evento: 'Temporada de gripe 2026-27 con el nuevo prospecto de Ganmaoling', efecto: 'El 4T y el 1T son la mitad del beneficio del CHC; una ola fuerte (como el 4T25, +22 %) lo mueve ±10 %', probabilidad: 'Media', sentido: '+/−' },
      { fecha: 'Mar-2027', evento: 'Cuentas de 2026 y prueba de deterioro del fondo de comercio de KPC (1.129 M)', efecto: 'Un deterioro total restaría ≈ 0,68 CNY de BPA contable de una vez (no de caja)', probabilidad: 'Media', sentido: '−' },
      { fecha: '2026-2027', evento: 'Registro de TCM2219 (antigripal nuevo) y del GLP-1 BGM0504 para obesidad (socio)', efecto: 'Nuevos productos para 2027-2028; pequeño en ventas al principio', probabilidad: 'Media', sentido: '+' },
      { fecha: 'Dic-2026', evento: 'Nueva lista nacional de reembolso y lotes de compras centralizadas de medicina china', efecto: 'Precio de los productos de receta de Tasly y KPC', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'May-jun-2027', evento: 'Dividendo final de 2026 (≈ 0,55-0,60 CNY)', efecto: 'Rentabilidad por dividendo ≈ 4 %', probabilidad: 'Alta', sentido: '+' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'KPC no toca suelo: pérdidas en 2027 y deterioro de su fondo de comercio y marcas', tipo: 'Negocio / contable', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−6 % (pérdida de KPC de 400 M más en 2027e: −0,07 CNY de BPA)', mitigante: 'Solo el 28 % de la pérdida es de Sanjiu; KPC tiene marca (Xuesaitong, 777) y el grupo la reestructura', senal: 'Ventas de KPC del 3T26 y 4T26 aún −30 % o peor' },
      { riesgo: 'Compras centralizadas y control de precios en la receta (Tasly, KPC, inyectables de medicina china)', tipo: 'Regulatorio', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−10 % (escenario bajista: −1,5 puntos de margen)', mitigante: 'El CHC (sin receta) queda fuera de las compras; Tasly tiene productos exclusivos', senal: 'Dantonic o Shenfu incluidos en un lote con rebaja > 30 %' },
      { riesgo: 'Menos tráfico en farmacias y caída estructural del CHC', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 % (bajista de crecimiento: −2 puntos al año)', mitigante: 'Ventas online creciendo ≈ 30 % y marca líder', senal: 'CHC con el criterio anterior por debajo de 11.000 M en 2026' },
      { riesgo: 'Nuevo prospecto de Ganmaoling (no conducir, no beber) que reste demanda en la temporada 2026-27', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−4 % (−10 % de ventas de Ganmaoling, ≈ 2.000 M en farmacia)', mitigante: 'Afecta a todos los fabricantes de Ganmaoling; no prohíbe la venta', senal: 'Ventas del CHC del 4T26 por debajo del 4T24 (año de gripe normal)' },
      { riesgo: 'Integración de Tasly y rendimiento de lo pagado (6.212 M a 23 veces beneficio)', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Tasly sube beneficio un 15 % en 2025 y el 1S26', senal: 'Beneficio de Tasly de 2026 por debajo de 1.100 M' },
      { riesgo: 'Operaciones vinculadas y uso de Sanjiu como plataforma de compras del grupo estatal', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Votación de los minoritarios en las operaciones vinculadas', senal: 'Compra de un activo del propio grupo China Resources a múltiplo alto' },
      { riesgo: 'Gripe débil dos inviernos seguidos', tipo: 'Cíclico', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−6 %', mitigante: 'Cartera de 45 productos de más de 100 M fuera de la gripe', senal: 'Datos de la CDC china de positividad de gripe por debajo de la media en diciembre' },
    ],
    premortem: 'Octubre de 2029: la acción ha perdido un 40 %, a 15 CNY. La historia más probable empieza con KPC: sus ventas no se recuperaron tras el ajuste de canal de 2026, el grupo deterioró en 2027 su fondo de comercio (1.129 M) y sus marcas, y siguió perdiendo 300-400 M al año. A la vez, el lote nacional de compras de medicina china de 2027 incluyó Dantonic y los inyectables de Shenfu con rebajas del 40 %, y Tasly pasó de ganar 1.100 M a 700 M. El CHC no compensó: el tráfico en farmacias siguió cayendo, el nuevo prospecto de Ganmaoling restó demanda y la gripe fue débil. El BPA cayó de 2,06 a 1,50 CNY y el mercado lo pagó a 10 veces. Indicadores que lo habrían anticipado: ventas de KPC del 3T26 y 4T26, el resultado de las listas de compras de diciembre de 2026 y el CHC del 4T26 frente al 4T24.',
    ia: { exposicion: 'Baja', sentido: 'Neutral', efecto_valor: '0 % a +2 %', comentario: 'El riesgo de IA es bajo. CR Sanjiu vende medicamentos físicos con marca y registro sanitario: la IA no sustituye un antigripal ni un medicamento para el corazón, y el canal (farmacias y hospitales) no se desintermedia por ella. Toca el lado del coste y de la I+D: la empresa usa IA en la fábrica (planta inteligente de Tasly reconocida por el Ministerio de Industria) y en el descubrimiento de medicamentos, y su plan 2026-2030 incluye «AI 智数化» [A1, A6]. El riesgo indirecto es que los asistentes de IA en las plataformas de venta online recomienden genéricos más baratos que una marca: vigilarlo con la cuota de 999 en B2C. Señal: ventas online del CHC creciendo menos que el mercado online (≈ 30 %).' },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'KPC', pregunta: '¿Cuándo espera la dirección que KPC vuelva a beneficio y qué parte de la caída de 2026 es de canal (existencias) y cuál de demanda?', por_que: 'KPC pierde ≈ 370 M en el 1S26; su fondo de comercio es de 1.129 M.' },
      { tema: 'CHC', pregunta: '¿Cuánto cayó el CHC sin KPC en el 1S26 y cuánto de la caída es gripe frente a tráfico en farmacias?', por_que: 'El CHC con el criterio nuevo cae un 23,3 %; la empresa no separa KPC.' },
      { tema: 'Compras centralizadas', pregunta: '¿Qué productos de Tasly y KPC están en lotes de compras centralizadas o en listas de 2026-2027 y con qué rebaja?', por_que: 'La mitad de las ventas ya es receta.' },
      { tema: 'Ganmaoling', pregunta: '¿Se ha registrado ya el nuevo prospecto y qué efecto ve la empresa en los pedidos de la temporada 2026-27?', por_que: 'Plazo del 15-oct-2026; 999 Ganmaoling vende más de 2.000 M en farmacia.' },
      { tema: 'Capex', pregunta: '¿Por qué 2.800 M de capex en 2026 (el doble que en 2025) y cuánto se ha comprometido ya?', por_que: 'En el 1S26 solo se invirtieron 519 M.' },
      { tema: 'Capital', pregunta: '¿Subirá el grupo su participación en Tasly o KPC por encima del 28 %?', por_que: 'El 72 % del beneficio de las filiales es de minoritarios; comprarlos puede crear o destruir valor según el precio.' },
    ],
    confianza: 'Media',
  },
  bolsa: {
    contexto: {
      movimiento: { fecha: '2026-10-20', var_1m_pct: 8.0, var_3m_pct: 2.4, var_6m_pct: -5.7, var_12m_pct: -9.1, dist_max_52s_pct: -15.5, dist_min_52s_pct: 16.5, dist_max_historico_pct: -35.5, tendencia: 'bajista', volatilidad_60d_pct: 23, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'abr-may-2026', var_pct: -11.6, causa: 'Resultados del 1T26 (25-abr): beneficio atribuido −15,3 % con ventas +18,6 % solo por Tasly; caída del 4,3 % el 27-abr y un mes de −11,6 % hasta el 26-may [A8, P2].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jul-2026', var_pct: 13.3, causa: 'Avance de resultados del 1S26 (15-jul): el beneficio del 2T26 sube un 9 % y la caída del semestre (−8 %) es menor de lo temido; rotación del mercado chino hacia valores defensivos de dividendo [A17, A15, P2].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2025-12-09', tipo: 'demanda o regulador', hecho: 'Un producto entra por primera vez en la lista nacional de reembolso tras negociar el precio [P4].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-04-25', tipo: 'resultados', hecho: '1T26: beneficio atribuido −15,3 % (1.076 M) [A8].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-15', tipo: 'directivos', hecho: 'Dimite por jubilación la consejera y vicepresidenta jurídica Zhou Hui (147.593 acciones, sin ventas anunciadas) [C3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-20', tipo: 'demanda o regulador', hecho: 'NMPA, anuncio n.º 66: nuevo prospecto obligatorio de todos los Ganmaoling orales (no conducir ni beber; contraindicado con insuficiencia grave de hígado o riñón); registro antes del 15-oct-2026 y 9 meses para cambiar el producto vendido. No prohíbe la venta [B4].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-22', tipo: 'resultados', hecho: '1S26: ventas +1,4 %, beneficio −8,0 %; KPC pierde ≈ 370 M; dividendo a cuenta de 0,415 CNY [A6, B9].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-24', tipo: 'recomendación', hecho: 'Sinolink mantiene «comprar» y recorta el beneficio de 2026e un 9 %; Southwest publica sin recomendación y BPA de 1,92 CNY; Orient mantiene «comprar» con objetivo 37,20 [D5, D6, D11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-02', tipo: 'ampliación o convertible', hecho: 'Una filial recibe el registro para emitir pagarés y bonos en el mercado interbancario (deuda, no acciones) [A1].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-16', tipo: 'resultados', hecho: 'Fecha ex del dividendo a cuenta (0,415 CNY): el precio de hoy ya no lo incluye [A12].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-24', tipo: 'resultados', hecho: 'Resultados del 3T26 en 4 días [P3]. No aplazan la compra (regla 11).', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-10-24',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción está en tendencia bajista larga (−35,5 % desde el máximo de 2024 ajustado, −9,1 % en 12 meses) pero ha rebotado un 8 % en el último mes hasta la media de 200 sesiones (−1,7 %), sin avisos P1-P5 ni caídas diarias de −5 % en el año [P2]. Las dos subidas y bajadas fuertes las explican sus resultados. No hay hechos pendientes que puedan mover el precio más de un 5 % en contra: ni colocaciones del accionista de control (63,22 %, sin ventas), ni ampliaciones en efectivo, ni ventas de directivos, ni ofertas [C2]. El nuevo prospecto de Ganmaoling y las pérdidas de KPC ya están en las cifras del informe. Los resultados del 24-oct no aplazan (regla 11). Veredicto: no cambia.',
    },
  },
};

const T = {
  fuentes,
  secciones,
  limitaciones: 'Línea cotizada: acción A de Shenzhen (000999), en CNY; no tiene acciones H ni ADR; se compra desde el extranjero por el Stock Connect (Shenzhen-Hong Kong, lista de HKEX del 20-oct-2026, CCASS 70999) [D9]. Cuentas en normas chinas (CAS) de los informes de CNINFO, leídas de la copia estructurada de Eastmoney y cotejadas con los anuales. Perímetro: KPC desde 2023 y Tasly desde el 27-mar-2025 (nueve meses en 2025): 2025 y 2026 no son comparables con los años anteriores. BPA, DPA y precios de cierre de 2018-2023 llevados a la base de acciones de hoy (ampliaciones liberadas de 3 por 10 en 2024 y 2025). La empresa no publica resultado por segmento ni transcripciones; usamos las notas de los brókeres. Minoritarios del puente a valor de mercado de Tasly y KPC (20.444 M frente a 16.303 M contables). Precio: cierre del 20-oct-2026 (25,81 CNY, Sina 15:35:45 de Pekín; Yahoo igual).',
  controles_explicados: [
    { control: 'Compra robusta', explicacion: 'La regla v2 (historia al cierre) da 14,9 %, por debajo del 15 %: no hay compra robusta y la acción robusta es Mantener. Se dice en la síntesis.' },
    { control: 'Transacciones', explicacion: 'Solo dos compras de control del sector con cifras (las de la propia Sanjiu); peso 0 en la valoración.' },
  ],
  veredicto: 'En parte',
  sostenibilidad_justificacion: 'Las pruebas del motor pasan (crecimiento medio del 2,7 % con poca inversión neta y cuota del 1,9 % al 2,0 %), pero el veredicto es «En parte». La marca 999 y la red de farmacias sostienen el nivel de ventas, no el ritmo: proyectamos +4,0-4,5 % al año en 2027-2029 en un mercado que crece un 1,7 % [B2], y eso exige que KPC salga de pérdidas y que el CHC vuelva a crecer, dos cosas que no se ven aún (CHC con el criterio anterior −6,8 % en 2025; ventas orgánicas ≈ −10 % en 2026e) [A1, A6]. El poder de precios no está demostrado: la receta va a compras centralizadas y el CHC compite con genéricos baratos en un canal que pierde tráfico. Un ROIC del 14,0 % frente a un WACC del 7,58 % da margen, pero el ROIC incremental (11,7 %) baja con cada compra.',
  dcf_justificacion: {
    crecimiento: '2026e queda fijo en 30.465 M (−3,6 %): 1S26 real (15.014 M) y un 2S un 8 % por debajo del 2S25, entre el 2T26 (ventas −13,5 % ya con Tasly en las dos bases) y un 4T con gripe normal [A6, A15]. Después, +4,0 % en 2027e y +4,5 % en 2028e-2029e por la recuperación de KPC desde una base hundida (−51 % en el 1S26) y por Tasly, bajando al 2 % en 2035e. Es menos que el consenso (Southwest +4,9 % y +3,6 %; Sinolink +9,2 % y +8,5 % en 2027-2028e) [D5, D6], porque no suponemos que el CHC vuelva a su nivel de 2024.',
    margenes: 'Margen EBITDA del 19,9 % en 2026e (22,3 % en el 1S26 y un 17,5 % en el 2S, más gasto comercial en la temporada de gripe), 20,5 % en 2027e y 21,0 % desde 2028e [A6]. En 2021-2025 estuvo entre el 18,6 % y el 19,7 %; la subida viene de la mezcla de Tasly (margen bruto del 70,6 %) y de que KPC deje de perder. Southwest espera un 17,9 % en 2026e y un 20,3 % en 2028e [D5].',
    inversion: 'Capex del 5,5 % de las ventas en 2026e (la empresa anuncia ≈ 2.800 M con KPC y Tasly, pero en el 1S26 solo invirtió 519 M) bajando al 4,5 % (4,0 % en 2025) [A1, A6]. Amortización del 5,1 % al 4,3 % de las ventas: incluye intangibles comprados de Tasly. Circulante comercial del 40 % de las ventas (42 % a jun-26 anualizado; 31-34 % antes de Tasly), constante [A6].',
    wacc: 'Tasa libre del 1,65 % (bono chino a 10 años, 1,6497 % el 19-oct [D7]); beta 0,8 (la semanal de 5 años ajustada frente al CSI 300 es 0,64 y la mensual sale negativa: la subimos por la deuda de la compra) [D1]; prima de mercado del 5,5 % y prima adicional de 2,0 puntos por China, control estatal y precios regulados. Coste de la deuda del 2,6 % (117,6 M de intereses sobre ≈ 4.500 M) y un 8 % de deuda. WACC del 7,58 %. Con la prima implícita del mercado (4,2 %), el WACC baja al 6,6 % [D8].',
    terminal: 'Crecimiento terminal del 1,0 %, igual que la inflación china esperada y por debajo de la tasa libre menos medio punto (1,15 %): coherente con un bono al 1,65 %. El valor terminal pesa el 59 % del valor. El múltiplo de salida implícito es razonable frente al EV/EBITDA de los comparables (11,0 veces) [D3].',
  },
  dcf_lectura: 'El DCF da 32,91 CNY por acción (+27,5 %), con el valor terminal en el 59 % del total y un WACC del 7,58 %. El DCF inverso dice que el precio de 25,81 CNY descuenta que las ventas caigan un 1,0 % al año en 2027-2035 (frente al +3,4 % de nuestro caso base) o un margen EBITDA del 18,5 % en vez del 21 %, y ofrece una rentabilidad implícita del 8,9 % anual frente a un WACC del 7,6 %. Es una expectativa conservadora: supone que el CHC y KPC no se recuperan nunca y que la mitad de receta se va encogiendo con las compras centralizadas. La historia la apoya en parte (ventas orgánicas negativas en 2025 y 2026), pero el beneficio de 2021-2025 creció un 13 % anual con compras incluidas y la marca sigue siendo la primera del país. El valor depende mucho del margen y del valor dado a los minoritarios: con los minoritarios a valor contable (16.303 M en vez de 20.444 M) el valor sube ≈ 2,5 CNY.',
  puente_comentarios: {
    '2026e': 'Volumen −9,2 %: KPC −51 % en el 1S26 y menos gripe en el CHC; precio −1 % por compras centralizadas y revisión de precios; otros +6,6 % por el primer trimestre de Tasly, que no estaba en 2025 [A6, A15].',
    '2027e': 'Volumen +3,5 %: KPC sale de la base hundida y temporada de gripe normal; precio +0,5 % con la mezcla de Tasly [A6].',
    '2028e': 'Volumen +4,0 %: productos nuevos (55 en desarrollo, 7 en registro) y Tasly; precio +0,5 % [A6].',
    '2029e': 'Volumen +4,0 % por envejecimiento y medicamentos crónicos; precio +0,5 % [A1].',
    '2030e': 'Volumen +3,5 %; precio +0,5 % [A1].',
  },
  narrativas: {
    Bajista: 'Las compras centralizadas alcanzan a Dantonic y a los inyectables de Shenfu, KPC sigue en pérdidas y el CHC pierde un 2-3 % al año con menos tráfico en farmacias: −2 puntos de crecimiento y −1,5 de margen cada año, crecimiento terminal del 0,5 %. Es lo que ya le pasó a KPC en 2025-2026 [A6].',
    Base: 'KPC toca suelo en 2026, el CHC vuelve a crecer al 2-3 % con la gripe normal y Tasly crece al 5 %: ventas +4,0-4,5 % en 2027-2029e y margen EBITDA del 21 %.',
    Alcista: 'Ola de gripe fuerte, recuperación rápida de KPC y productos nuevos (antigripal TCM2219, GLP-1 del socio): +1,5 puntos de crecimiento y +1 de margen.',
  },
  escenarios_comentario: 'La asimetría es favorable: el bajista vale 24,44 CNY (−5,3 %) y el alcista 38,63 (+49,7 %), una asimetría de 9,38 veces. El bajista pierde poco porque el precio ya descuenta ventas en caída. Pero el bajista de 12 meses es peor que el del DCF: con un PER de 11,3 veces y un BPA de 1,88 CNY en 2028e, el precio sería 21,24 CNY (−17,7 %). Compensa a largo plazo; a un año, depende de que el BPA de 2028e no baje del 2,0.',
  suma_partes_comentario: 'No aplica: los tres negocios (CHC, receta y distribución) se gestionan y cotizan juntos dentro del grupo; Tasly y KPC cotizan aparte y se reflejan con sus minoritarios a valor de mercado en el puente.',
  just12m: {
    Bajista: 'BPA de 2028e de 1,88 CNY: 2 puntos menos de crecimiento y 1,5 menos de margen desde 2027e (compras centralizadas en la receta, KPC en pérdidas). PER de 11,3 veces: el base × 0,8, por debajo del mínimo de cinco años (13,8 veces).',
    Base: 'BPA de 2028e de 2,15 CNY (un 12-17 % por debajo del consenso): 2026e −3,6 % con el 1S real y el 2S −8 %, luego +4,0 % y +4,5 % con margen EBITDA del 20,5 % y el 21 %, minoritarios del 18-19 % del beneficio. PER de 14,1 veces: la regla v3 (a mitad de camino hacia la mediana adelantada de 15,5 veces, con tope de ×1,1 sobre los 12,9 de hoy).',
    Alcista: 'BPA de 2028e de 2,36 CNY, todavía por debajo del consenso de Sinolink (2,58): gripe fuerte y recuperación de KPC. PER de 16,0 veces: la mediana de los comparables, por debajo del techo de la regla (base × 1,35).',
  },
  per_excluidos: 'PER adelantado de cada cierre de diciembre (precio ajustado por las ampliaciones liberadas ÷ BPA real del año siguiente en la base de hoy) [P1, A1-A5]: 2021 13,8x; 2022 16,2x; 2023 14,6x; 2024 16,6x; 2025 15,5x (con nuestro BPA de 2026e, 1,84 CNY). Mediana 15,5x y mínimo 13,8x. Media larga de ocho años 15,0x (2018 11,6x, 2019 19,4x y 2020 11,9x: 2019 tenía un BPA alto por plusvalías y 2020 lo hundió la COVID; no se excluyen porque no cumplen la regla de atípicos).',
  per_excluidos_v2: 'PER al cierre (precio de diciembre ÷ BPA del propio año) [P1]: 2021 16,3x; 2022 18,9x; 2023 17,2x; 2024 16,9x; 2025 13,8x. Mediana 16,9x, mínimo 13,8x; media de ocho años 16,3x.',
  diferencia_consenso: 'Nuestro BPA de 2027e (2,00 CNY) y 2028e (2,15) queda un 13 % y un 17 % por debajo de Sinolink (2,31 y 2,58) y un 13 % y un 12 % por debajo de Southwest (2,31 y 2,44) [D5, D6]. La diferencia está en las ventas (proyectamos 31.683 M en 2027e frente a 34.555-35.105 M) y en los minoritarios: los brókeres suponen que el CHC deja de caer en 2026 y que KPC vuelve rápido a beneficio. Nuestro precio base (30,32 CNY) queda un 13,7 % por debajo del objetivo medio de 10 analistas (35,15) [D3]. Lo mantenemos: las ventas del 2T26 cayeron un 13,5 % ya con Tasly en las dos bases, y los recortes de agosto van en nuestra dirección.',
  comentario_12m: 'El objetivo a 12 meses (29,91 CNY, ponderado) queda un 10 % por debajo del valor intrínseco (33,27 CNY). Cerrar la distancia exige ver dos cosas en 2027: que KPC deje de perder dinero y que el CHC vuelva a crecer tras la temporada de gripe. Los resultados del 3T26 (24-oct) y del 4T26 (marzo) son los catalizadores con fecha. El dividendo (≈ 4 %) paga la espera.',
  valoracion_comentario: 'Pesamos el DCF al 50 %, los escenarios al 30 % y los comparables al 20 %. El DCF es el método más fiable porque recoge la estructura de minoritarios (72 % de Tasly y KPC) y el circulante alto; los comparables chinos cotizan a 16 veces beneficio con más crecimiento y sin esa estructura, y por eso dan valores mayores (≈ 31-36 CNY). Transacciones con peso cero: solo las dos compras de la propia Sanjiu, con prima de control. La dispersión es moderada: todos los métodos salvo el bajista dan más que el precio, y el bajista del DCF (24,44) apenas pierde un 5 %. El valor objetivo es 33,27 CNY (+28,9 %).',
};
export default T;
