// Textos del analista para Stryker (corte 2026-10-14). Cifras de calc tal cual tras el último cálculo.
// Letras: A = cuentas (A1 10-K 2025, A2 XBRL, A3 2T26, A4 10-Q, A5 1T26, A6 4T25, A7 4T22, A8 4T21, A9 4T19, A10 4T17, A11-12 ciberataque, A13 Inari, A14 CMR, A15 Ortho Tech),
// B = sector, C = gobierno, D = mercado (D1 Yahoo, D2 MarketScreener, D3 Barchart, D4 comparables del repo, D6 FRED, D7 Damodaran, D16 fecha 3T, D17 Truist, D18 Wells Fargo), E = foros, P = propias.
export default {
  limitaciones: 'Línea cotizada: NYSE (SYK), cuentas en USD (US GAAP). Cuenta, balance y flujos de 2016-2025 del XBRL de la SEC; la deuda se corrigió con la nota de deuda del 10-K (el XBRL solo sumaba la deuda a largo y el papel comercial: faltaba el vencimiento corriente) y el patrimonio de 2019-2025 con el 10-K. Los arrendamientos son operativos (US GAAP): su coste ya está en el EBITDA y no van al puente. Segmentos solo 2023-2025 (la segmentación cambió con la venta de columna y con Ortho Tech en 2026). Objetivo a 12 meses, PER histórico y comparables en BPA AJUSTADO de la empresa (base del consenso); la cuenta, en BPA contable. Comparables tomados de los informes del repositorio de Edwards, Intuitive y Straumann (6-14 oct-2026), sin rehacerlos uno a uno. BPA ajustado de consenso 2028 no disponible gratis. Análisis hecho por un solo analista en una sesión.',
  controles_explicados: [
    { control: 'Crecimiento del BPA base ≤ 25 % anual', explicacion: 'Diferencia de base, no de crecimiento: el último real es el BPA contable de 2025 (8,40 USD, con 660 M de impuestos por traspasos de propiedad intelectual y 732 M de amortización de intangibles comprados); en la base ajustada del objetivo (13,63 USD) el BPA base de 2028e (18,20) crece un 10,1 % anual, en línea con la guía y el consenso (16,58 en 2027).' },
    { control: 'Circulante del primer año', explicacion: 'Supuesto del 30,0 % frente al 30,1 % real: la variación de 625 M es la del crecimiento de las ventas, no un salto de supuesto.' },
  ],
  huecos: [
    { seccion: 'valoracion', campo: 'BPA ajustado de consenso 2028', tipo: 'Complemento', intentos: '1) MarketScreener (BPA contable); 2) Barchart (solo 2026-2027); 3) Tickflow y Seeking Alpha no abren', decision: 'Omitido' },
  ],
  secciones: {
    rentabilidad: {
      comentario: 'El ROIC publicado, con todo el fondo de comercio de sesenta compras, es del 11,2 % en 2025 (13,5 % en 2024) frente a un WACC del 9,27 %: crea valor, pero solo 1,9 puntos por encima. Sin el fondo de comercio (19.291 M) el ROIC es del 27,7 % (NOPAT de 3.638 M sobre 13.133 M de capital): el negocio orgánico es excelente y lo que diluye el retorno es el precio pagado por las compras (Inari a 8,1 veces ventas, Wright a ≈5,4) [A1, D8]. El ROIC incremental de diez años es del 9,3 %, por debajo del WACC actual: el crecimiento comprado apenas cubre su coste de capital con el bono al 5,21 % [P2]. Lo mueve sobre todo la rotación (0,55 veces el capital), no el margen. Frente a los comparables, el ROIC publicado supera a Zimmer (6,2 %), Medtronic (8,6 %) y Abbott (7,5 %) y queda lejos de Intuitive (30,2 %), que no compra empresas [D4]. Decidimos con el publicado: no pasa el requisito de calidad (ROIC − WACC ≥ 5 puntos).',
      confianza: 'Media',
    },
    capital: {
      politica: 'Prioridades declaradas: (1) compras, (2) dividendo y (3) recompras [A1]. Dividendo trimestral de 0,88 USD (3,52 al año, 1,2 % de rentabilidad), subido todos los años desde 1993. Sin recompras desde 2019; tras el 2T26 la empresa dijo que reanudaría recompras en el segundo semestre con la autorización existente [E1]. Deuda neta objetivo implícita: vuelve a ≈1,5 veces el EBITDA ajustado tras cada compra grande.',
      adquisiciones: [
        { anio: '2025', objetivo: 'Inari Medical (trombectomía venosa)', importe: 4810, ev_ebitda: null, financiacion: 'Caja y 3.000 M de bonos', resultado: 'Crecimiento del 12,5 % del vascular de EE. UU. en el 1S26, pero el 2T26 cae un 6,7 % por un problema de suministro aún abierto en el 3T26 [A3, D18].' },
        { anio: '2026', objetivo: 'Amplitude Vascular Systems (litotricia periférica)', importe: 706, ev_ebitda: null, financiacion: 'Caja (435 M) e hitos (271 M a valor razonable)', resultado: 'Producto en desarrollo; sin ventas [A4].' },
        { anio: '2026', objetivo: 'CMR Surgical (≈400 M en preferentes y opción de compra del 100 %)', importe: 400, ev_ebitda: null, financiacion: 'Caja', resultado: 'Anunciada el 12-oct-2026; pendiente de cierre [A14].' },
        { anio: '2022', objetivo: 'Vocera (comunicación clínica)', importe: 2563, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Integrada en Medical; sin deterioros [A1].' },
        { anio: '2020', objetivo: 'Wright Medical (extremidades)', importe: 4222, ev_ebitda: null, financiacion: 'Deuda', resultado: 'Traumatología y extremidades crece un 11,5 % a tipo constante en el 2T26 [A3].' },
        { anio: '2018-2019', objetivo: 'K2M y negocio de columna', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Deterioro de 456 M del fondo de comercio de columna y pérdida de 362 M en 2024; vendido a VB Spine en 2025 [A1].' },
        { anio: '2013', objetivo: 'Mako Surgical (robot ortopédico)', importe: 1650, ev_ebitda: null, financiacion: 'Caja', resultado: 'La mejor compra: Mako sostiene el crecimiento de rodilla y cadera y desde 2026 encabeza la unidad Ortho Tech [A15].' },
      ],
      comentario: 'En 2016-2025 Stryker gastó 22.488 M en compras, 9.191 M en dividendos y 850 M en recompras [A2]. El resultado es mixto: Mako y Wright funcionan; columna terminó en un deterioro de 818 M y una venta; Inari aún no ha demostrado nada y ya tiene un problema de suministro. El ROIC incremental de diez años (9,3 %) y el ROIC publicado (11,2 %) dicen que el crecimiento comprado apenas cubre el coste de capital con tipos del 5 %. La dilución es mínima (acciones diluidas de 378,5 a 386,5 M en diez años) y la deuda se ha mantenido en grado de inversión. La inversión en CMR Surgical abre una nueva frontera (robots de tejidos blandos frente a Intuitive) y probablemente una compra grande más; es la decisión de capital que más vigilar.',
      confianza: 'Media',
    },
    competencia: { cuota_pct: 17.0 },
    comparables: {
      comentario: 'Stryker cotiza a 17,3 veces el BPA de los próximos 12 meses y 15,3 veces el EBITDA, por encima de la mediana de los comparables (15,9x y 11,7x) y muy por debajo de los crecedores de calidad (Intuitive 39,2x, Edwards 27,1x, Straumann 26,2x) [D4]. La prima frente a Medtronic, Zimmer o Boston se justifica por crecer el doble (8-9 % orgánico frente a 4-6 %) con un ROIC publicado similar o mejor. Usaríamos el PER: el EV/EBITDA mezcla EBITDA ajustados de distinta definición. Con la mediana de PER, el valor sale en 257,38 USD; con el percentil 75, 429,10. El mercado ya no paga a Stryker como crecedor de calidad.',
    },
    catalizadores: {
      items: [
        { fecha: '29-oct-2026', evento: 'Resultados del 3T26 [D16]', efecto: 'Comprobar si el problema de vascular periférico se resolvió y si la guía (8,3-9,3 % y 14,95-15,10 USD) se mantiene', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: 'Ene-2027', evento: 'Guía de 2027 y relevo del consejero delegado (Stiles) [P5]', efecto: 'Primera guía del nuevo consejero delegado; el consenso espera un BPA de 16,58 USD', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: '2S26-2027', evento: 'Reanudación de recompras', efecto: 'Hasta ≈1.000 M con la autorización existente; apoyo al BPA del 0,5-1 %', probabilidad: 'Media', sentido: '+' },
        { fecha: '2027', evento: 'Cierre de la inversión en CMR Surgical y decisión sobre la opción de compra [P4]', efecto: 'Entrada en robots de tejidos blandos; posible compra grande y más deuda', probabilidad: 'Media', sentido: '+/−' },
        { fecha: '2026-2027', evento: 'Aranceles de la Sección 232 sobre dispositivos médicos', efecto: 'Un arancel nuevo devolvería un coste de ≈150-200 M al año', probabilidad: 'Media', sentido: '−' },
      ],
      confianza: 'Media',
    },
    riesgos: {
      items: [
        { riesgo: 'Inari no recupera el crecimiento (problema de suministro en vascular periférico que se alarga)', tipo: 'Operativo / integración', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % (≈1,5 pp menos de crecimiento del grupo un año)', mitigante: 'Vascular periférico pesa ≈2,5 % de las ventas', senal: 'Vascular de EE. UU. negativo otra vez en el 3T26 (29-oct)' },
        { riesgo: 'Pérdida de credibilidad de la dirección y del múltiplo (relevo del consejero delegado, aviso de septiembre, posibles demandas)', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 % (PER a 15x, nivel de Medtronic)', mitigante: 'Sucesión interna; historial de cumplir la guía', senal: 'Recorte de la guía de 2026 o guía de 2027 por debajo del 8 % orgánico' },
        { riesgo: 'Compra grande nueva (CMR Surgical u otra) a múltiplo alto', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % a −10 % por dilución del ROIC', mitigante: 'Disciplina relativa: deuda neta ≈1,6 veces EBITDA', senal: 'Ejercicio de la opción sobre CMR o una compra por encima de 5.000 M' },
        { riesgo: 'Aranceles a dispositivos médicos (Sección 232) y precios', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−4 % (≈0,6 pp de margen)', mitigante: 'Fabricación mayoritaria en EE. UU.; los aranceles de 2025 se anularon y se reversaron 158 M [A3]', senal: 'Decisión de la Sección 232' },
        { riesgo: 'Nuevo ciberataque o fallo de sistemas', tipo: 'Operativo', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−3 % (un trimestre perdido como el 1T26)', mitigante: 'Sistemas reconstruidos con Microsoft y Unit 42 [A11, A12]', senal: 'Nuevo 8-K de incidente' },
        { riesgo: 'Robots rivales en ortopedia (Velys, ROSA, CORI) o entrada de Intuitive', tipo: 'Competencia', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−10 % (rodilla y cadera pierden 2 pp de crecimiento)', mitigante: 'Base instalada de Mako y datos de 2,5 millones de intervenciones', senal: 'Rodilla de EE. UU. por debajo del 4 %' },
        { riesgo: 'La IA cambia el negocio (riesgo de que «se coma» parte del valor)', tipo: 'Tecnología', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: '−2 %', mitigante: 'Vende objetos físicos implantados en quirófano; la IA mejora la planificación (Mako) y la comunicación clínica (Vocera) que vende Stryker', senal: 'Que la planificación con IA reduzca la ventaja de Mako frente a robots baratos' },
        { riesgo: 'Fármacos GLP-1 retrasan prótesis de rodilla', tipo: 'Demanda', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Sin efecto en volúmenes de 2025-2026 (rodilla +8 % en el 2T26)', senal: 'Volúmenes de rodilla en EE. UU. por debajo del 3 %' },
      ],
      premortem: 'Es octubre de 2029 y la acción ha perdido un 40 %, hasta ≈170 USD. Lo más probable: el problema de vascular periférico fue el primer síntoma de una integración de Inari peor de lo dicho y Penumbra ganó cuota en trombectomía venosa; Stryker reconoció un deterioro de parte de los 4.810 M pagados. El nuevo consejero delegado, para mantener el «crecimiento en la parte alta del sector», ejerció la opción sobre CMR Surgical y compró otra empresa de vascular a 8-10 veces ventas, con deuda al 5 %: el ROIC publicado bajó del 11 % al 9 %, por debajo del WACC. A la vez, la Sección 232 trajo aranceles del 10-15 % y el margen ajustado dejó de subir 100 pb al año. El mercado pasó a pagar a Stryker como a Zimmer (10-12 veces) en lugar de 17. Indicadores que lo habrían anticipado: el vascular de EE. UU. del 3T26 y 4T26, el tamaño de la siguiente compra y la guía de margen de 2027.',
      confianza: 'Media',
    },
    preguntas: {
      items: [
        { tema: 'Inari', pregunta: '¿Qué causó exactamente el problema de suministro de vascular periférico, cuándo se resolverá y cuántas ventas se han perdido de forma definitiva?', por_que: 'Es la tesis de la compra de 4.810 M y el motivo de la caída de septiembre.' },
        { tema: 'Asignación de capital', pregunta: '¿A qué precio y con qué condiciones se ejercería la opción sobre CMR Surgical, y qué ROIC exigen a esa compra?', por_que: 'Una compra grande más diluye un ROIC publicado que ya está solo 1,9 puntos sobre el WACC.' },
        { tema: 'Márgenes', pregunta: '¿Cuánto del +100 pb anual de margen ajustado se mantiene en 2027 sin la reversión de aranceles y con el coste del ciberataque fuera?', por_que: 'El BPA de 2028 depende de ese margen.' },
        { tema: 'Aranceles', pregunta: '¿Qué exposición tiene Stryker a la Sección 232 sobre dispositivos médicos, por país de fabricación?', por_que: 'En 2025 los aranceles costaron ≈158 M de beneficio bruto.' },
        { tema: 'Mako', pregunta: '¿Qué cuota de las rodillas de Stryker en EE. UU. se hace ya con Mako y cuánto margen queda de penetración?', por_que: 'Mide cuánto dura el arrastre del robot.' },
        { tema: 'Recompras', pregunta: '¿Las recompras anunciadas son recurrentes o solo usan la autorización vieja?', por_que: 'Cambia el BPA en ≈1 % al año.' },
        { tema: 'Impuestos', pregunta: '¿Cuándo terminan los traspasos de propiedad intelectual entre países que cargan el tipo contable (28,1 % en 2025)?', por_que: 'El BPA contable va 1,7 USD por debajo del ajustado por ellos.' },
      ],
      confianza: 'Media',
    },
  },
  dcf_justificacion: {
    crecimiento: 'Ventas un 8,5 % en 2026e (guía orgánica del 8,3-9,3 % más divisa y AVS; consenso 27.195 M) [A3, D2], 8,5 % en 2027e y bajando hasta el 5 % en 2032e. Solo crecimiento orgánico: no proyectamos compras, aunque Stryker hará más. La historia apoya el 8-10 % (orgánico de 9,7-11 % en 2023-2025) [A6]; bajamos hacia el 5 % porque el mercado ortopédico crece un 4-5 % y las cuotas no suben siempre [B3].',
    margenes: 'EBITDA contable sin deterioros del 26,8 % en 2026e subiendo al 29,0 % en 2032e. Parte del 26,4 % de 2025 (6.629 M) y del margen operativo ajustado de la empresa (26,3 % en 2025, objetivo de +100 pb al año) [A6], restando ≈1,7 % de las ventas de reestructuración e integración, que se repiten. Asumimos +40-60 pb al año, la mitad de lo que promete la empresa, por aranceles y precio plano.',
    inversion: 'Capex del 3,1-3,3 % de las ventas (3,0 % en 2025, más sistemas Mako cedidos que no pasan por el capex) y amortización del 4,6 % bajando al 3,3 %: la depreciación es el 1,8 % y la amortización de intangibles comprados (732 M en 2025) baja a medida que se amortiza lo comprado sin compras nuevas. Circulante del 30 % de las ventas, igual que en 2025 (existencias en consigna) [A1].',
    wacc: 'Tasa libre del 5,21 % (bono del Tesoro a 10 años del 13-oct-2026) [P2], beta de 0,87 (ajustada mensual de 5 años; la semanal de 2 años es 0,58 y la de 5 años 0,87) [D1], prima de mercado del 5,5 %, coste de la deuda del 4,8 % antes de impuestos (cupones de las emisiones de 2025 del 4,55-5,2 %) y peso de la deuda del 12 % a valor de mercado. WACC del 9,27 %. Con la prima implícita del mercado (4,2 %) el WACC baja al 8,28 %.',
    terminal: 'Gordon con crecimiento del 3,0 %: inflación esperada en USD de ≈2,5 % más 0,5 de crecimiento real, por debajo de la tasa libre menos medio punto (4,71 %). El múltiplo de salida implícito se compara con los 11,7 veces EBITDA de la mediana de comparables. El valor terminal pesa un 71 % del valor empresa.',
  },
  puente_comentarios: {
    '2026e': 'Guía orgánica 8,3-9,3 %, casi todo volumen; precio ligeramente positivo; divisa y AVS +0,4 [A3].',
    '2027e': 'Volumen de Mako, traumatología y endoscopia; vuelta de Inari; precio +0,5.',
    '2028e': 'Volumen del 7,5 %, en línea con 2023-2025; precio +0,5.',
    '2029e': 'Convergencia hacia el mercado: volumen 7 %.',
    '2030e': 'Volumen 6,5 %: cuota ortopédica de ≈17 % a ≈19 %.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Sí. El motor no hace la prueba de reinversión (6 % del NOPAT) porque la amortización de intangibles comprados supera al capex; la hacemos a mano. Reinversión orgánica real: capex neto de depreciación (≈1,2 % de las ventas) más circulante (30 % del aumento de ventas) ≈ 960 M al año, un 17 % del NOPAT ajustado. Al ROIC sin fondo de comercio (27,7 %) financia un 4,7 % y sobre el capital tangible (sin intangibles, ≈50 %) un 8,5 %, frente al 7,2 % medio proyectado. La historia lo confirma: diez años de orgánico del 8-11 % con el mismo capex. Cuota en ortopedia: de ≈17 % a ≈19 % en 2032 (mercado al 4,8 %), dentro de 1,5 veces. Foso amplio (robot instalado, costes de cambio) y precio casi plano: el crecimiento es volumen, no precio.',
  dcf_lectura: 'El DCF da 248,23 USD por acción (−11,9 %) con un WACC del 9,27 %, y el valor terminal pesa un 71 %. El valor intrínseco ponderado (DCF, comparables y escenarios) es de 241,89 USD, un 14,1 % por debajo del precio. El DCF inverso dice que el precio de 281,62 USD descuenta un crecimiento del 10,2 % anual en 2027e-2032e frente a nuestro 7,0 %, o un margen EBITDA del 31,8 % frente a nuestro 29,0 %; o, con nuestras cifras, una rentabilidad del 8,6 % anual frente a un WACC del 9,27 % y un 8,28 % con la prima del mercado. Es exigente frente a nuestro caso base, pero no frente a la historia de Stryker (crecimientos del 10 % con compras). La distancia la explica casi toda la tasa libre del 5,21 %: con la prima implícita del mercado el valor sube a 302,03 USD. Nuestro DCF no incluye compras futuras, que es como Stryker ha crecido.',
  narrativas: {
    Bajista: 'El problema de Inari se alarga a 2027, la Sección 232 trae aranceles y el margen deja de subir: orgánico del 6 % y margen 1 punto por debajo; el mercado exige más rentabilidad (+0,5 pp de WACC). Ya pasó con columna (2019-2024).',
    Base: 'Orgánico del 8,5 % en 2026-2027 bajando al 5 %, margen +40-60 pb al año e Inari recuperado en 2027.',
    Alcista: 'Mako y vascular sostienen un orgánico del 9-10 % y el margen sube como promete la empresa (+100 pb al año en 2026-2028).',
  },
  escenarios_comentario: 'Asimetría negativa con nuestro WACC: el alcista da 264,45 USD (−6,1 %) y el bajista 199,84 (−29,0 %), porque los tres escenarios quedan por debajo del precio con una tasa libre del 5,21 %. Con la prima implícita del mercado la asimetría es de 0,96 veces (bajista 239,93, alcista 321,72). La lectura a 12 meses es distinta: con el múltiplo de su historia, el objetivo a 12 meses es de 350,47 USD. El valor intrínseco dice que el precio no tiene margen de seguridad; el múltiplo, que está barata frente a su historia.',
  casos_12m: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 16.56, multiplo: null, precio: null, justificacion: 'Ventas de 2028e un 2 % anual por debajo del base (30.180 M) y margen operativo ajustado del 26,6 %: Inari no se recupera y vuelven aranceles. BPA ajustado de 16,56 USD (387 M de acciones, tipo del 16 %).' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 18.2, multiplo: null, precio: null, justificacion: 'Ventas de 31.935 M (8,5 %, 8,5 % y 8 %) y margen operativo ajustado del 27,6 % (+40 pb al año desde el 26,3 %); gasto financiero de 380 M y tipo del 16 %: BPA ajustado de 18,20 USD, un 10 % anual desde 13,63.' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 19.22, multiplo: null, precio: null, justificacion: 'Ventas de 32.830 M y margen ajustado del 28,1 % (la empresa cumple los +100 pb anuales de 2026-2027): BPA ajustado de 19,22 USD.' },
  ],
  per_excluidos: 'Historia ADELANTADA en BPA ajustado (precio de cierre ÷ BPA ajustado del año siguiente) [D1, A6, A7, A8, A9, A10]: 2017 21,2x (154,84 ÷ 7,31); 2018 19,0x (156,75 ÷ 8,26); 2020 27,0x (245,04 ÷ 9,09); 2021 28,6x (267,42 ÷ 9,34); 2022 23,1x (244,49 ÷ 10,60); 2023 24,6x (299,46 ÷ 12,19); 2024 26,4x (360,05 ÷ 13,63); 2025 23,4x (351,47 ÷ 15,03, nuestro BPA de 2026e). Excluido 2019 (28,3x con el BPA de 2020 hundido por el COVID). Últimos cinco: mediana 24,6x, mínimo 23,1x; media de ocho años 24,2x (se usa 24,0 redondeado a la baja). Actual = 281,62 ÷ 16,55 (nuestro BPA ajustado de 2027e) = 17,0x.',
  per_excluidos_v2: 'Historia AL CIERRE (precio ÷ BPA ajustado del mismo año): 2021 29,4x; 2022 26,2x; 2023 28,3x; 2024 29,5x; 2025 25,8x; mediana 28,3x, mínimo 25,8x; media de ocho años (2017 23,9x, 2018 21,4x, 2019 25,4x y 2021-2025; 2020 excluido, 33,0x por el COVID) 26,2x.',
  diferencia_consenso: 'Nuestro BPA ajustado de 2027e (16,55 USD) coincide con el consenso (16,58) [D3]; el de 2028e (18,20) no tiene consenso ajustado gratuito, pero con el EBIT ajustado de MarketScreener para 2028 (8.855 M) y nuestro gasto financiero y tipo sale ≈18,3 [D2]. Nuestro precio base (340,34 USD) queda un 6,1 % por debajo del objetivo medio de 29 analistas (362,62), que vienen recortando (Truist a 310, Stifel a 330) [D17]: la diferencia es de múltiplo, no de beneficio.',
  objetivo_comentario: 'Base del BPA: el objetivo usa el BPA AJUSTADO (13,63 USD en 2025), el del consenso y los comparables; el control del motor que pide explicar un crecimiento del 29,4 % anual mide desde el BPA contable (8,40), que lleva 660 M de impuestos no recurrentes y la amortización de lo comprado. En base ajustada el crecimiento es del 10,1 % anual. El objetivo a 12 meses (350,47 USD, +25,7 % con dividendo; base 340,34, +22,1 %) queda un 45 % por encima del valor intrínseco (241,89): la regla supone que el PER vuelve a 18,7 veces (de 17,0) y el DCF dice que, con el bono al 5,21 % y sin compras futuras, el negocio no vale el precio actual. Para cerrar la distancia hace falta que bajen los tipos o que Stryker siga creciendo al 10 % con compras que rindan más que su coste. La tesis a 12 meses es de múltiplo y el filtro de valor real la bloquea.',
  valoracion_comentario: 'Pesos: DCF 40 %, comparables (PER) 20 %, escenarios 40 %; transacciones y suma de partes, 0 (Stryker es compradora, y sus segmentos tienen márgenes iguales). El DCF es el método más fiable para una empresa estable, pero aquí depende de la tasa libre: con la prima del mercado el valor sube de 248,23 a 302,03. Los comparables por PER dan 257,38 en la mediana y 429,10 en el percentil 75: la dispersión refleja que el mercado paga 10-16 veces a los grandes que crecen poco y 26-39 a los crecedores de calidad. Las transacciones (EV/ventas de 5-9 veces) darían más de 500 USD, pero son compras de activos pequeños de crecimiento rápido, no comparables con el grupo entero.',
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Baja', justificacion_recomendacion: null, horizonte: '12 meses (tesis de múltiplo); más de un año para el valor intrínseco',
    sintesis: `**La recomendación y por qué.** Mantener con convicción baja. El objetivo a 12 meses es de 350,47 USD (+25,7 % ponderada con dividendo; +22,1 % la del base), por debajo del objetivo medio de 29 analistas (362,62) [D2], pero el valor intrínseco es de 241,89 USD, un 14,1 % por debajo de los 281,62 del 14-oct-2026, así que no pasa el filtro de valor real y la regla da Mantener. La convicción es baja porque las reglas discrepan (absoluta Vender, relativa Mantener) y la diferencia es de tasa: con la prima implícita del mercado el valor objetivo es de 283,90 (+2,1 %). La subiría un 3T26 (29-oct) con vascular de EE. UU. en positivo y la guía intacta; la bajaría un recorte de la guía.

**El negocio.** Foso amplio en ortopedia (el robot Mako ata al cirujano a las prótesis de Stryker) y crecimiento orgánico del 8-11 % durante una década [A6]. Calidad: **En parte**. Sin el fondo de comercio el ROIC es del 27,7 %, pero el publicado, con sesenta compras, es del 11,2 % frente a un WACC del 9,27 % (1,9 puntos): no pasa el requisito de 5 puntos, y el ROIC incremental de diez años (9,3 %) dice que las compras apenas cubren su coste. La sostenibilidad del crecimiento es «Sí»: la reinversión orgánica (≈17 % del NOPAT) sobre el capital tangible financia el 7,2 % proyectado, como en los últimos diez años.

**Finanzas.** 2026 está distorsionado: el ciberataque de marzo hundió el 1T26 (orgánico 2,4 %) [A5] y el 2T26 (9,0 %) incluye 158 M de reversión de aranceles [A3]. Deuda neta de ≈11.470 M (1,6 veces el EBITDA ajustado) tras pagar 4.810 M por Inari; contraprestaciones contingentes de 756 M [A4].

**Equipo y gobierno.** Resta algo: relevo del consejero delegado en enero (Stiles, sucesión interna) [P5], aviso tardío del problema de Inari, ventas de la consejera Ronda Stryker por ≈581 M USD antes de septiembre [C3] y un variable que premia crecer sin métrica de retorno.

**Valoración.** El precio descuenta un crecimiento del 10,2 % anual en 2027e-2032e frente a nuestro 7,0 %: exigente con un bono al 5,21 %, razonable si Stryker sigue comprando como siempre. A 17,0 veces el BPA ajustado de 2027 cotiza en mínimos de una década (mediana adelantada de 24,6x): la regla v3 lleva el PER a 18,7x y de ahí sale el +25,7 %.

**Riesgos y catalizadores.** (1) Inari: el problema de suministro sigue en el 3T26 (−5 % de valor si se alarga) [D18]; (2) una compra grande nueva (opción sobre CMR Surgical, anunciada el 12-oct) [P4] que diluya el ROIC; (3) aranceles de la Sección 232. Riesgo de que la IA se coma el negocio: bajo; Stryker vende implantes y equipos físicos y usa la IA en planificación (Mako) y comunicación clínica. Foros divididos: los artículos largos ven una oportunidad y los mensajes cortos castigan la credibilidad de la dirección [E1, E2]; no hay euforia ni capitulación.

**Qué cambiaría la decisión.** Comprar por debajo de 241,89 USD (el valor intrínseco), si además el ROIC publicado volviera a 5 puntos sobre el WACC; vender por encima de 393,33. Un 3T26 con vascular negativo otra vez, o el ejercicio de la opción sobre CMR por más de 5.000 M, empeorarían la tesis.`,
    tesis: 'Stryker es el mayor fabricante diversificado de tecnología quirúrgica y ortopédica: 25.116 M USD de ventas, orgánico del 10,3 % en 2025 y margen operativo ajustado del 26,3 % [A6]. Su ventaja es el robot Mako, que ata la rodilla y la cadera de Stryker al quirófano, y una fuerza comercial especializada que convierte cada compra en crecimiento.\n\nEl precio (281,62 USD) descuenta un crecimiento del 10,2 % anual en 2027e-2032e con nuestro WACC del 9,27 %, y cotiza a 17,0 veces el BPA ajustado de 2027, el múltiplo más bajo en diez años, tras caer un 23,9 % en un año por el ciberataque, el problema de Inari y el relevo del consejero delegado [D1].\n\nEl mercado acierta en que las compras rinden poco (ROIC publicado del 11,2 %) y en que el bono al 5,21 % castiga los activos de larga duración; se equivoca si cree que el crecimiento orgánico del 8-9 % está roto: el 2T26 volvió al 9,0 % [A3]. Para invertir hay que creer que el PER vuelve a 18-19 veces en un año sin una compra que destruya valor.',
    vision_diferencial: {
      mercado_descuenta: 'Que Stryker deja de ser un crecedor de calidad: múltiplo de 17 veces, como Abbott o Medtronic, tras un año de problemas operativos (ciberataque, Inari) y con relevo en la cúpula.',
      nuestra_vision: 'El negocio orgánico sigue intacto (9,0 % en el 2T26) y el múltiplo debería recuperar parte del camino hacia su historia; pero el valor intrínseco con tipos del 5 % no da margen de seguridad y la calidad publicada no pasa nuestro listón.',
      por_que: 'Coincidimos con el consenso en el BPA (16,55 frente a 16,58 en 2027) y discrepamos en el precio: el problema de Inari es de suministro y pesa ≈2,5 % de las ventas, no de demanda.',
    },
    a_favor: [
      '**Crecimiento orgánico de primera**: 10,3 % en 2025 y 9,0 % en el 2T26, casi todo volumen [A6, A3].',
      '**Mínimos de valoración de una década**: 17,0 veces el BPA de 2027 frente a una mediana adelantada de 24,6x.',
      '**Mako**: más de 2,5 millones de intervenciones; Ortho Tech crece un 10 % a tipo constante.',
      '**Margen ajustado al alza**: +100 pb en 2024 y en 2025, hasta el 26,3 %.',
      '**Objetivo a 12 meses de 350,47 USD** (+25,7 % ponderada).',
    ],
    en_contra: [
      '**ROIC publicado del 11,2 %**, solo 1,9 puntos sobre el WACC del 9,27 %: las compras diluyen.',
      '**Valor intrínseco de 241,89 USD**, un 14,1 % por debajo del precio.',
      '**Inari**: vascular de EE. UU. −6,7 % en el 2T26 y problema abierto en el 3T [A3, D18].',
      '**Compra en serie sin freno**: 4.810 M en Inari, 706 M en AVS y ≈400 M en CMR en 20 meses.',
      '**Relevo del consejero delegado** y ventas de 581 M de una consejera de la familia fundadora [C3].',
    ],
    que_vigilar: 'La tesis depende de que el orgánico se mantenga en el 8-9 % sin el problema de Inari y de que la siguiente compra no diluya más el ROIC. La señal de que no se cumple: vascular de EE. UU. negativo en el 3T26 (29-oct) o una guía de 2027 por debajo del 8 % orgánico.',
    cambiaria_recomendacion: [
      'Precio por debajo de 241,89 USD con el ROIC publicado a 5 puntos sobre el WACC: pasaría a Comprar.',
      'Precio por encima de 393,33 USD: Vender.',
      'Si el vascular de EE. UU. vuelve a caer en el 3T26 o se recorta la guía de 2026, revisaríamos el BPA un 5 % a la baja.',
      'Si Stryker ejerce la opción sobre CMR Surgical por más de 5.000 M, rebajaríamos la calidad (ROIC) y el escenario base.',
    ],
    kpis_seguimiento: [
      { kpi: 'Crecimiento orgánico trimestral', nivel_actual: '9,0 % (2T26)', umbral_alerta: '< 7 %', por_que: 'Es la base del BPA de 2028.' },
      { kpi: 'Vascular de EE. UU.', nivel_actual: '−6,7 % (2T26)', umbral_alerta: 'Negativo en el 3T26', por_que: 'Mide la integración de Inari.' },
      { kpi: 'Margen operativo ajustado', nivel_actual: '26,3 % (2025)', umbral_alerta: '< 26,5 % en 2026', por_que: 'Sin +40 pb al año no se llega al BPA base.' },
      { kpi: 'ROIC publicado − WACC', nivel_actual: '1,9 puntos', umbral_alerta: '< 0', por_que: 'Calidad de la asignación de capital.' },
      { kpi: 'Deuda neta / EBITDA ajustado', nivel_actual: '1,6x', umbral_alerta: '> 2,5x', por_que: 'Avisa de una compra grande.' },
    ],
  },
};
