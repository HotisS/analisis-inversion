// Textos del analista (BayCurrent, corte 2026-10-19). Citas con la letra de la nota ([A3] = fuente 3 de A.json).
export default {
  limitaciones: 'Cifras en millones de JPY con el ejercicio de marzo a febrero etiquetado por el año en que EMPIEZA, como hace la empresa desde el 15-oct-2026 (FY2025 = mar-2025 a feb-2026; sus documentos anteriores lo llamaban «FY2026»). Japón no tiene XBRL público: cuenta, balance y flujos se copiaron de los tanshin NIIF y se comprobaron con el yuho auditado. El último ejercicio real es FY2025; el LTM llega a agosto de 2026 (primer semestre de FY2026). No hay línea de proveedores: «otros pasivos corrientes» (gastos de personal devengados e impuestos indirectos) hace ese papel en el circulante. El EBITDA del informe incluye la amortización de los derechos de uso de oficinas y es ≈ 1 punto de margen mayor que el que publica la empresa. Precio: cierre del 19-oct-2026 en Tokio (10.740 JPY, 15:30 hora local [D2]); bolsa.mjs solo tenía hasta el 16-oct (10.195), así que las rentabilidades y la beta de la tabla de bolsa llegan a ese día. La beta mensual frente al ETF del TOPIX sale negativa por cierres anómalos del ETF: el WACC usa una beta de 1,0 más 1 punto de prima por el riesgo de la IA. Los comparables extranjeros se pasan a JPY con los tipos del 19-oct (158,47 JPY por USD y 177,74 por EUR [D14]). Una acción cuesta ≈ 61 EUR, pero en Tokio se compra por lotes de 100 acciones: ≈ 6.040 EUR por lote, el 20 % de una cartera de 30.000 EUR.',
  controles_explicados: [
    { control: 'Último ejercicio cerrado coherente con la fecha de corte', explicacion: 'FY2025 (etiqueta «inicio») cerró el 28-feb-2026, 7,6 meses antes del corte.' },
  ],
  huecos: [],
  secciones: {
    historia: {
      resumen: 'BayCurrent nace en marzo de 1998 en Fujisawa (Kanagawa) como PC Works, una pequeña empresa de consultoría de gestión y TI, sistemas y externalización; en 2006 toma el nombre de Baycurrent Consulting [A5]. En 2014 sus directivos la compran al fundador con el apoyo de un fondo (MBO a través de Byron Holdings, que la absorbe); de ahí viene el fondo de comercio de 19.187 M JPY [A5]. Sale a bolsa en la Mothers de Tokio en septiembre de 2016, pasa a la primera sección en 2018 y a Prime en 2022 [A5]. Con Yoshiyuki Abe al frente desde 2016, deja la parte de sistemas y se convierte en consultora generalista para grandes empresas, con un único «pool» de consultores: los ingresos pasan de ≈ 20.000 M JPY a 148.332 M en FY2025 [A1]. En 2024 se traslada a Azabudai y pasa a holding [A5]. En 2025 falla la sucesión del consejero delegado [C3]; en febrero de 2026 la acción cae a la mitad por el miedo a la IA y en octubre presenta un plan para llegar a 500.000 M de ingresos en 2030 [D7, A10].',
      hitos: [
        { anio: '1998', hito: 'Fundación de PC Works en Fujisawa (consultoría de gestión y TI, sistemas, externalización).' },
        { anio: '2006', hito: 'Cambio de nombre a Baycurrent Consulting.' },
        { anio: '2014', hito: 'Compra por los directivos con un fondo (Byron Holdings); fondo de comercio de 19.187 M JPY.' },
        { anio: '2016', hito: 'Salida a bolsa en la Mothers de Tokio; Yoshiyuki Abe consejero delegado.' },
        { anio: '2018-2022', hito: 'Primera sección (2018) y mercado Prime (2022); split 10:1 en noviembre de 2022.' },
        { anio: '2024', hito: 'Sede en Azabudai y paso a holding (Baycurrent, Inc.) [A5].' },
        { anio: '2025', hito: 'Daisuke Kitakaze consejero delegado en mayo; dimite por salud en noviembre y vuelve Abe [C3].' },
        { anio: '2026', hito: '«Sacudida Anthropic» (−57 % desde octubre de 2025); recompra de 30.000 M; plan a 2030 de 500.000 M de ingresos [D7, D12, A10].' },
      ],
      confianza: 'Alta',
    },
    rentabilidad: {
      comentario: 'Rentabilidad excepcional: ROIC del 81,1 % en FY2025 (137,8 % sin el fondo de comercio de la compra de 2014) frente a un WACC del 9,4 %, más de 70 puntos por encima. Lo explica el modelo: la empresa vende horas de consultores, no necesita fábricas ni inventarios, invierte ≈ 2 % de las ventas en oficinas y el circulante es el 11 % de las ventas [A1]. La tendencia es estable en el 77-96 % desde FY2021: el capital invertido crece al ritmo del negocio (sobre todo cuentas a cobrar) y el margen se mantiene en el 34-37 %. El ROE (35,8 %) es menor que el ROIC por la caja ociosa (72.308 M en febrero); el plan de octubre quiere llevarlo al ≈ 80 % en 2030 bajando la caja al 25 % de las ventas [A11]. El riesgo para esta rentabilidad no es el capital sino el precio de la hora: si la IA reduce las horas o el precio por consultor, el margen cae y el ROIC con él.',
      confianza: 'Alta',
    },
    esg: {
      calificaciones: [],
      materialidad: 'Para una consultora lo material es la gente (contratación de ≈ 1.500-2.000 consultores al año, horas de trabajo, rotación, formación), la confidencialidad de la información de los clientes y la ciberseguridad propia, y la independencia en los proyectos públicos de defensa [A4, C2]. El impacto ambiental es pequeño (oficinas).',
      controversias: 'Sin controversias graves encontradas. Puntos débiles de gobierno: la sucesión fallida de 2025, un consejero delegado que preside el consejo y la comisión de nombramientos, y un variable ligado al EBITDA y no al rendimiento sobre el capital [C1, C2, C3]. Calificaciones de MSCI o Sustainalytics no comprobadas en fuente primaria: no se dan.',
      confianza: 'Baja',
    },
  },
  parches: [],
  huecos_resueltos: [],
  dcf_justificacion: {
    crecimiento: 'FY2026e (+32,1 %, fijo): 196.000 M JPY, con un primer semestre de 92.913 M (+35,7 %) y un segundo de ≈ 103.100 M (+29 %), por encima de la guía de 190.000 M que la empresa dice que superará [A3, A4] y del consenso (194.233 [D2]). Después, +22 % en FY2027e (consenso +24,8 %), +18 % en FY2028e y descenso hasta el 6 % en FY2033e: los ingresos llegarían a ≈ 458.000 M en FY2033e, frente a los 500.000 M que el plan de la empresa quiere en FY2030 [A10]. Proyectamos menos que el plan porque crecer al 27 % anual cuatro años más exige contratar ≈ 2.000 consultores al año con costes de contratación ya un 30 % sobre lo previsto [A13], y porque la IA puede reducir las horas que compran los clientes.',
    margenes: 'Margen EBITDA del informe (resultado operativo + toda la amortización): 35,2 % en FY2026e, calibrado con el resultado operativo del semestre (32,2 %) y el segundo semestre habitual (34-35 %) [A3]. Sube despacio hasta el 37 % en FY2030e por la mezcla (proyectos de dirección general y de IA más caros) y la escala de los gastos generales, que en FY2025 crecieron un 67 % por la contratación de comerciales [A1]. El plan de la empresa apunta al 40 % (sin derechos de uso) en FY2030 [A10]: no lo damos por hecho.',
    inversion: 'Inversión del 2,1 % de las ventas: ≈ 0,8 % en oficinas y equipos más ≈ 1,3 % de altas de derechos de uso de oficinas nuevas, porque los alquileres futuros de la plantilla que crece no están en el puente (que solo resta los 8.873 M de arrendamientos firmados) [A3]. Amortización del 2,1 % (2,2 % en el 1S FY2026). Circulante del 11 % de las ventas (11,5 % en FY2025): crecer consume caja por las cuentas a cobrar. Sin compras.',
    wacc: 'Tasa libre del 2,958 % (bono japonés a 10 años del 16-oct-2026 [D4]); beta de 1,0 (la semanal a cinco años frente al TOPIX es 0,77 y la mensual no sirve por datos rotos del ETF [D1]); prima de mercado del 5,5 % y 1 punto de prima adicional por el riesgo de que la IA reduzca las horas facturables. Sin deuda (peso del 1 %: arrendamientos). WACC del 9,37 %. Con la prima implícita del mercado (4,2 % [D5]) el WACC baja al 8,09 % y el DCF sube a 10.784 JPY.',
    terminal: 'Crecimiento a perpetuidad del 2,0 %, por debajo de la tasa libre japonesa menos medio punto (2,46 %). Equivale a 9,4 veces el EBITDA de salida, muy por debajo de las 25 veces de hoy: el DCF supone que en 2034 BayCurrent será una consultora madura. El valor terminal pesa un 65 %.',
  },
  puente_comentarios: {
    'FY2026e': 'Consultores medios +26 % (6.339 en agosto, 7.000-7.200 previstos en el 3T [A4]), ingreso por consultor +6 % (+6,6 % en el 1S) y ocupación estable en la parte media del 80-90 %.',
    'FY2027e': 'Consultores +17 % (≈ 1.300 netos) y precio +5 %; el consenso espera +24,8 % [D2].',
    'FY2028e': 'Consultores +14 % y precio +4 %: el plan anterior ya daba 250.000 M en FY2028 y la empresa cree llegar en FY2027 [A10].',
    'FY2029e': 'Consultores +11 % y precio +4 %.',
    'FY2030e': 'Consultores +9 % y precio +3 %: ≈ 363.000 M de ingresos, un 27 % menos que los 500.000 M del plan [A10].',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'El crecimiento proyectado (15,4 % medio en FY2026e-FY2033e) está por debajo del histórico (28,2 % anual en FY2020-FY2025) y se financia solo: la empresa reinvierte el 5 % de su beneficio operativo después de impuestos y tiene un ROIC del 81 % [A1]. La cuota de mercado pasaría del 7,4 % al 10,6 % de un mercado que la empresa estima que crece un ≈ 10 % anual [B1]: posible para la consultora japonesa que más crece, pero depende de seguir contratando ≈ 1.300-2.000 consultores al año. El riesgo no es el capital sino la demanda: si la IA reduce las horas que compran los clientes, el volumen no llega; lo recoge el bajista.',
  dcf_lectura: 'El DCF da 8.839,58 JPY por acción, un 17,7 % bajo el precio, con un WACC del 9,37 % y un valor terminal que pesa el 65 %. El DCF inverso dice que el precio descuenta un crecimiento de los ingresos del 17,1 % anual en FY2027e-FY2033e con nuestro margen (frente al 13,0 % de nuestro caso base), o un margen EBITDA del 44,5 % con nuestro crecimiento: el mercado ya paga buena parte del plan de 2030 (≈ 27 % anual y 40 % de margen). Con la prima de riesgo que hoy pide el mercado (4,2 %) el DCF vale 10.784 JPY (+0,4 %): a ese coste del capital el precio es justo, sin margen de seguridad. El rango con ± 0,5 puntos de WACC y crecimiento terminal va de 7.931 a 10.029 JPY.',
  narrativas: {
    Bajista: 'La IA sustituye una parte del trabajo de análisis, documentación y programación por el que hoy se paga a consultores jóvenes: los clientes piden equipos más pequeños y precio por resultado. Ingresos 8 puntos por debajo del base cada año (+14 % en FY2027e, +10 % en FY2028e y después casi planos) y margen 4 puntos menor por la caída del precio por consultor y la ocupación. Con un WACC medio punto mayor, el DCF vale 4.889 JPY (−54,5 %).',
    Base: 'La demanda de transformación con IA de las grandes empresas japonesas sigue 3-5 años: crecimiento del 22 % en FY2027e bajando al 6 % en FY2033e y margen EBITDA del 35-37 %; la IA sube la productividad interna pero no reduce el número de consultores que se facturan en este periodo.',
    Alcista: 'BayCurrent cumple casi todo el plan de 2030: crece 4 puntos más cada año (+26 % y +22 % en FY2027e-FY2028e) y el margen sube 1,5 puntos más por la IA interna y los contratos a largo plazo; el DCF vale 11.143 JPY (+3,8 %).',
  },
  escenarios_comentario: 'La asimetría del DCF es mala: el alcista vale 11.143 JPY (+3,8 %) y el bajista 4.889 (−54,5 %). Incluso si la empresa cumple casi todo su plan, con nuestro WACC el precio de hoy apenas deja ganancia; si la IA reduce las horas facturables, la pérdida es de la mitad. El valor ponderado de los escenarios (8.428 JPY) queda un 21,5 % bajo el precio.',
  casos_12m: {
    Bajista: 'La IA recorta horas y precio: ventas +14 % en FY2027e y +10 % en FY2028e y margen 4 puntos menor: BPA de 372,26 JPY en FY2028e (−23 % frente al base) y el PER vuelve a 13,8 veces, el de febrero de 2026 en la «sacudida Anthropic».',
    Base: 'Ventas +32,1 % en FY2026e, +22 % en FY2027e y +18 % en FY2028e; margen EBITDA del 36 %, amortización del 2,1 %, impuestos del 25,8 % y 146,98 M de acciones sin recompras nuevas: BPA de 484,15 JPY en FY2028e (+24,6 % anual desde los 249,16 de FY2025).',
    Alcista: 'Cuatro puntos más de crecimiento y 1,5 puntos más de margen (plan de 2030 casi cumplido): BPA de 539,70 JPY; la regla no da más PER que el base porque la mediana de cinco años (25,5), la media larga (19,9) y los comparables (12,3) están por debajo.',
  },
  diferencia_consenso: 'Nuestro BPA de FY2026e (325,57 JPY) coincide con el consenso (326,07) y el de FY2027e (404,20) queda un 1,1 % por debajo (408,81) [D2]: ventas algo menores (+22 % frente a +24,8 %) con el mismo margen. Sin consenso de FY2028e. Nuestro objetivo base a 12 meses (13.072 JPY) está un 39,9 % por encima del objetivo medio de los analistas (9.342 JPY, 13 analistas), porque muchos objetivos son anteriores a los resultados del 15-oct (el más alto, 11.200 JPY, es del 19-oct [D3]) y porque la regla común lleva el PER de 28,6 a 27,0 veces, cerca de su mediana de cinco años, mientras los analistas usan ≈ 23-26 veces el BPA del año próximo.',
  objetivo_comentario: 'El objetivo a 12 meses (11.463 JPY, ponderado 25/50/25) queda un 6,7 % sobre el precio (+7,8 % con el dividendo): no llega al 15 % que pide un Comprar. El base (13.072 JPY, +22,8 % con dividendo) supone que el BPA crece un 24,6 % anual hasta FY2028e y que el PER baja poco (de 28,6 a 27,0 veces, a mitad de camino de su mediana adelantada de cinco años, 25,5). El bajista (5.137 JPY, −51 %) aplica el PER de febrero de 2026 (13,8 veces), cuando el mercado temió que la IA hundiera el negocio, a un BPA un 23 % menor: es lo que hunde la ponderada. Además, el valor intrínseco (8.257 JPY) queda un 23,1 % bajo el precio: falla también el filtro de valor real. Crecimiento del BPA base: +24,6 % anual desde el último real (FY2025), por debajo del +30,7 % anual de FY2020-FY2025.',
  valoracion_comentario: 'Pesos: DCF 50 %, escenarios 40 % y comparables 10 %. El DCF es el método más fiable para un negocio sin deuda ni inversión, pero depende mucho del WACC: con la prima del mercado sube de 8.840 a 10.784 JPY. Los escenarios recogen la asimetría por la IA (−54,5 % / +3,8 %). Los comparables pesan poco: su mediana (12,3 veces el BPA y ≈ 11 veces el EBITDA) es de empresas que crecen un 3-10 % y dan 4.661 JPY, un valor sin sentido para una empresa que crece un 30 %. Sin transacciones con múltiplo publicado. El valor intrínseco de la síntesis es de 8.257 JPY (−23,1 %); con la prima del mercado, 9.956 JPY (−7,3 %). El puente suma 57.503 M de caja y depósitos, resta 8.873 M de arrendamientos y 9.554 M del dividendo a cuenta ya devengado.',
  catalizadores: {
    items: [
      { fecha: '2027-01-14', evento: 'Resultados de los nueve meses de FY2026 (fecha estimada por la del año pasado)', efecto: 'Consultores frente a la guía de 7.000-7.200, ingreso por consultor (+5-7 %) y si sube la guía anual', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-04', evento: 'Resultados de FY2026 y guía de FY2027', efecto: 'Primera guía bajo el plan de 2030: ≈ 25-30 % de crecimiento si mantiene el ritmo', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-02', evento: 'Recompra de fin de ejercicio con la nueva política de caja (25 % de los ingresos)', efecto: 'Con ≈ 57.500 M de caja y depósitos frente a ≈ 50.000 M objetivo, recompra o compra de empresas', probabilidad: 'Media', sentido: '+' },
      { fecha: 'Continuo', evento: 'Nuevos agentes de IA para trabajo de oficina y consultoría (Anthropic, OpenAI, Google) y resultados de Accenture', efecto: 'Pueden repetir la caída de febrero de 2026', probabilidad: 'Alta', sentido: '−' },
      { fecha: 'Sin fecha', evento: 'Ventas del fundador (8,06 M de acciones, 5,31 %)', efecto: 'Lastre de oferta: ≈ 87.000 M JPY al precio de hoy', probabilidad: 'Media', sentido: '−' },
      { fecha: '2027-05', evento: 'Junta de accionistas', efecto: 'Renovación del consejo y del consejero delegado (Abe)', probabilidad: 'Alta', sentido: '+/−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'IA: los clientes compran menos horas de consultor o pagan por resultado (la empresa vende consultores por mes)', tipo: 'Tecnología', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−50 % (escenario bajista)', mitigante: 'Hoy la IA es el 50-60 % de los ingresos: la demanda de implantación crece; uso interno de la IA para subir el margen [A13]', senal: 'Ingreso por consultor por debajo del +3 %, ocupación bajo el 80 % o proyectos creciendo menos que los consultores' },
      { riesgo: 'Múltiplo: 28,6 veces el BPA de los próximos 12 meses tras subir un 184 % desde el mínimo de febrero', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−20 a −50 %', mitigante: 'Crecimiento del BPA del 25-30 % anual', senal: 'Un trimestre con crecimiento de ingresos bajo el 20 %' },
      { riesgo: 'Contratación: crecer exige ≈ 1.500-2.000 consultores al año en un mercado laboral japonés escaso', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 a −15 %', mitigante: 'Marca y salarios altos; costes de contratación asumidos en la guía', senal: 'Consultores del 3T por debajo de 7.000 o costes de contratación otra vez sobre el plan' },
      { riesgo: 'Nuevo plan: compras, empresas conjuntas y extranjero, que la empresa no ha hecho nunca', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'Caja neta y ROIC del 81 %; payout del 40 %', senal: 'Una compra grande fuera de Japón o a múltiplos altos' },
      { riesgo: 'Gobierno y sucesión: consejero delegado que preside el consejo y la comisión de nombramientos; sucesor dimitido en 2025', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Seis de nueve consejeros externos [C2]', senal: 'Salida de Abe, Ikehira o Nakamura' },
      { riesgo: 'Concentración en grandes clientes: estrategia de «clientes clave» sin cifras publicadas', tipo: 'Clientes', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 a −10 % si se pierde un gran cliente', mitigante: 'Ningún cliente supera el 10 % de los ingresos [A5]', senal: 'La empresa empieza a publicar un cliente por encima del 10 % o pierde un cliente clave' },
      { riesgo: 'Ventas del fundador y de fondos (lastre de oferta)', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−5 % temporal', mitigante: 'Liquidez de ≈ 9.565 M JPY al día [D1]', senal: 'Informe de participación del fundador por debajo del 5 %' },
    ],
    premortem: 'Octubre de 2027: la acción ha caído un 50 %. En la primavera de 2027 las grandes empresas japonesas empezaron a usar agentes de IA para hacer el análisis, la documentación y la gestión de proyectos que antes pagaban a equipos de consultores; los departamentos de compras pidieron equipos más pequeños y precios por resultado. BayCurrent siguió contratando para cumplir el plan de 2030 y la ocupación bajó del 80 %; el ingreso por consultor dejó de crecer. La guía de FY2027 salió con un +15 % en vez del +25 % esperado y el margen bajó 3 puntos. El mercado volvió a pagar 14 veces el beneficio, como en febrero de 2026, y el fundador vendió lo que le quedaba. La señal temprana: proyectos creciendo menos que los consultores y la ocupación en la parte baja del 80-90 % en los resultados de enero o abril.',
    ia: {
      exposicion: 'Alta', sentido: 'Mixto', efecto_valor: '−50 % en el bajista; +5-10 % si la IA solo sube la productividad interna',
      comentario: 'Es el riesgo central. BayCurrent vende horas de consultores: ingresos = consultores × ocupación × precio por consultor [B7]. La IA generativa y los agentes hacen cada vez mejor el trabajo de los consultores jóvenes (investigación, análisis, presentaciones, programación y gestión de proyectos), que es la base de la pirámide de una consultora que contrata ≈ 1.500-2.000 personas al año. A corto plazo la IA ayuda: es el 50-60 % de los ingresos, porque las grandes empresas japonesas están empezando a implantarla y necesitan ayuda [A13]. A medio plazo el riesgo es doble: que el cliente necesite menos consultores para el mismo proyecto (menos volumen) y que pague por resultado y no por mes (menos precio). El mercado ya lo descontó una vez: en febrero de 2026, con los agentes de IA de Anthropic, la acción cayó a 3.780 JPY (13,8 veces el beneficio) [D7]. Nuestro bajista (25 % de probabilidad) lo cuantifica: ingresos 8 puntos menos al año y margen 4 puntos menor dan un BPA un 23 % inferior en FY2028e y un precio de 5.137 JPY (−51 %). Señales: ingreso por consultor por debajo del +3 %, ocupación bajo el 80 %, proyectos creciendo menos que los consultores, o Accenture y las Big 4 recortando plantilla en Japón.',
    },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'IA y precio', pregunta: '¿Qué parte de los contratos se cobra por consultor y mes y qué parte por resultado, y cómo ha cambiado el tamaño medio de los equipos por proyecto en los proyectos de IA?', por_que: 'Es el escenario bajista (−51 %): si los equipos se encogen, el volumen no llega.' },
      { tema: 'Ocupación', pregunta: '¿Cuál fue la ocupación exacta de cada trimestre y la de los consultores contratados en el último año?', por_que: 'La empresa solo da «la parte media del 80-90 %»; una caída es la primera señal de exceso de plantilla.' },
      { tema: 'Clientes', pregunta: '¿Qué peso tienen los diez mayores clientes y cuántos «clientes clave» hay?', por_que: 'La estrategia de clientes clave concentra ventas; ningún cliente supera el 10 %, pero no hay más cifras.' },
      { tema: 'Contratación', pregunta: '¿Cuánto cuesta contratar un consultor hoy frente a 2024 y cuál es la rotación anual?', por_que: 'Los costes de contratación del 1S fueron un 30 % superiores al plan.' },
      { tema: 'Compras y extranjero', pregunta: '¿Qué tamaño y qué múltiplos tendrían las compras y empresas conjuntas del nuevo plan?', por_que: 'La empresa no ha hecho nunca una compra; el plan prevé un 20 % de ingresos fuera de Japón en 2035.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Baja', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener, con convicción baja. El objetivo a 12 meses es de 11.463 JPY (nuestro BPA de FY2028e × el PER de la regla común, ponderado 25/50/25): +7,8 % con el dividendo y +22,8 % en el caso base, frente a un precio de 10.740 JPY (cierre del 19-oct-2026 en Tokio). La ponderada no llega al 15 % que pide un Comprar y el valor intrínseco (8.257 JPY) queda un 23,1 % por debajo del precio. La razón: BayCurrent es un negocio excelente (ROIC del 81 %, sin deuda, crecimiento del 28 % anual), pero el precio ha subido un 184 % desde el mínimo de febrero y ya descuenta buena parte del plan de 2030; si la IA reduce las horas que compran los clientes, el bajista pierde la mitad. La convicción es baja porque las reglas discrepan (Vender con nuestro WACC, Mantener con la prima del mercado) y porque el riesgo de la IA es difícil de medir.

**El negocio.** Consultora japonesa para grandes empresas y administraciones: estrategia, IA, ciberseguridad y defensa [B5]. Vende horas de 6.339 consultores en un único «pool», con ocupación del 80-90 % y un margen EBITDA del ≈ 35 % [A4]. Ningún cliente pesa más del 10 % [A5]. Calidad «Sí»: ROIC del 81,1 % frente a un WACC del 9,4 %. Sostenibilidad del crecimiento «Sí»: proyectamos un 15,4 % anual, la mitad del histórico, sin necesidad de capital.

**Finanzas.** Ingresos de 148.332 M JPY en FY2025 (+27,8 %) y de 92.913 M en el primer semestre de FY2026 (+35,7 %); BPA de 249,16 JPY en FY2025 y guía de 323,79 para FY2026, que la empresa dice que superará [A1, A3]. Caja neta de ≈ 48.600 M a agosto de 2026 tras una recompra de 30.000 M [A3]. El flujo libre fue de 32.893 M en FY2025, el 22 % de las ventas [A1].

**Equipo y gobierno.** Yoshiyuki Abe (consejero delegado desde 2016) y su equipo han cumplido la guía inicial en cuatro de cinco años [C6]. Debilidades: la sucesión falló en 2025, Abe preside el consejo y la comisión de nombramientos, y el fundador ha vendido la mitad de su participación en un año [C3, C5].

**Valoración.** El DCF da 8.840 JPY (−17,7 %) y el DCF inverso descuenta un 17,1 % de crecimiento anual frente al 13,0 % de nuestro base (o un margen del 44,5 %). Con la prima del mercado el DCF vale 10.784 JPY: precio justo, sin margen. La regla a 12 meses lleva el PER de 28,6 a 27,0 veces en el base y a 13,8 en el bajista (el de febrero de 2026).

**Riesgos y catalizadores.** El riesgo central es la IA: que los clientes compren menos horas o paguen por resultado (bajista −51 % a 12 meses). Después, el múltiplo, la contratación de ≈ 2.000 consultores al año, las primeras compras del plan nuevo y las ventas del fundador. Catalizador: resultados de los nueve meses a mediados de enero de 2027. Sentimiento eufórico tras el stop-high del 16-oct.

**Qué cambiaría la decisión.** Comprar si el precio baja hasta el valor intrínseco (≈ 8.250 JPY) con el negocio intacto; vender por encima de ≈ 12.900 JPY. Un ingreso por consultor por debajo del +3 % o la ocupación bajo el 80 % empeorarían la tesis; una guía de FY2027 por encima del +25 % con margen estable la mejoraría.`,
    tesis: 'BayCurrent es la consultora japonesa que más crece: ingresos +28 % anual desde 2020 sin una sola compra, margen EBITDA del 35 %, ROIC del 81 % y caja neta [A1]. Su modelo de un único «pool» de consultores generalistas, asignados a grandes clientes, mantiene la ocupación alta y la deja ganar cuota en un mercado de ≈ 2 billones de JPY que crece un 10 % al año [B1].\n\nEl precio ya descuenta mucho: 28,6 veces el BPA de los próximos 12 meses tras subir un 184 % desde febrero, y el DCF inverso pide un 17 % de crecimiento anual durante siete años. En ocho meses el mercado ha pasado de temer que la IA destruya el negocio (13,8 veces) a pagarle casi el plan de 2030.\n\nEl mercado acierta en que el negocio es excelente y en que la IA hoy le da trabajo, pero el modelo sigue siendo vender horas de personas. Con la regla común, el caso base gana un 23 %, pero el bajista pierde la mitad y la ponderada se queda en un 8 %: no hay margen para el riesgo central.',
    vision_diferencial: {
      mercado_descuenta: 'Que BayCurrent cumple en gran parte el plan de 2030 (≈ 25 % anual de crecimiento y margen hacia el 40 %) y que el miedo a la IA de febrero fue exagerado; los analistas suben objetivos tras el semestre.',
      nuestra_vision: 'Coincidimos en el BPA de los dos próximos años (325,57 y 404,20 JPY frente a 326,07 y 408,81) y en que el negocio es excelente; discrepamos en el riesgo: la IA puede reducir las horas que se facturan antes de 2030, y el precio no deja margen para ello.',
      por_que: 'El ingreso por consultor solo sube un 6 % al año: el crecimiento depende de contratar. Si la IA hace que un equipo de cinco consultores pase a tres, el volumen cae aunque la demanda de proyectos crezca. La caída del 57 % de 2025-2026 muestra cuánto puede pagar menos el mercado.',
    },
    a_favor: [
      '**Crecimiento orgánico**: ingresos +28 % anual desde 2020 y +35,7 % en el 1S FY2026, sin compras.',
      '**Rentabilidad**: ROIC del 81 %, margen EBITDA del 35 % y caja neta.',
      '**Guía fiable**: cumplida en cuatro de cinco años; la de FY2026 se superará.',
      '**La IA hoy da trabajo**: 50-60 % de los ingresos; ciberseguridad y defensa crecen.',
      '**Clientes diversificados**: ninguno supera el 10 % de los ingresos.',
    ],
    en_contra: [
      '**Riesgo de la IA**: vende horas de consultores; el bajista pierde la mitad.',
      '**Precio**: 28,6 veces el BPA de los próximos 12 meses, +184 % desde febrero, avisos P1 y P2.',
      '**Valor real**: el valor intrínseco (8.257 JPY) queda un 23 % bajo el precio.',
      '**Contratación**: ≈ 2.000 consultores al año con costes un 30 % sobre el plan.',
      '**Gobierno**: sucesión fallida en 2025 y ventas del fundador.',
    ],
    que_vigilar: 'La tesis depende de que la IA siga creando proyectos sin reducir el tamaño de los equipos ni el precio por consultor. La señal en contra sería un ingreso por consultor creciendo menos del 3 %, la ocupación bajo el 80 % o los proyectos creciendo menos que los consultores en los resultados de enero o abril de 2027.',
    cambiaria_recomendacion: [
      'Precio por debajo de ≈ 8.250 JPY (valor intrínseco) con el negocio intacto: Comprar.',
      'Precio por encima de ≈ 12.900 JPY: Vender.',
      'Ingreso por consultor por debajo del +3 % u ocupación bajo el 80 %: rebajar.',
      'Guía de FY2027 por encima del +25 % con margen estable y sin compras caras: revisar al alza.',
      'Una compra grande en el extranjero a múltiplos altos: rebajar.',
    ],
    kpis_seguimiento: [
      { kpi: 'Ingreso por consultor', nivel_actual: '+6,6 % (1S FY2026)', umbral_alerta: '< +3 %', por_que: 'Mide el precio de la hora frente a la IA.' },
      { kpi: 'Ocupación', nivel_actual: 'Media del 80-90 %', umbral_alerta: '< 80 %', por_que: 'Primera señal de exceso de plantilla.' },
      { kpi: 'Proyectos frente a consultores', nivel_actual: '+25,5 % frente a +30,9 %', umbral_alerta: 'Proyectos < consultores − 10 puntos', por_que: 'Si los equipos se encogen, el volumen no llega.' },
      { kpi: 'Consultores', nivel_actual: '6.339 (ago-26)', umbral_alerta: '< 7.000 en el 3T', por_que: 'Motor del crecimiento.' },
      { kpi: 'Margen EBITDA de la empresa', nivel_actual: '33,1 % (1S FY2026)', umbral_alerta: '< 30 %', por_que: 'Coste de contratación y precio.' },
    ],
  },
};
