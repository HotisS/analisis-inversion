// Textos del analista (L'Oréal, corte 2026-10-23, tras las ventas del 3T26). Citas con letra de nota: [A2] = fuente 2 de A.json; [A] = nota A.
export default {
  limitaciones: 'Se valora la acción de L’Oréal en Euronext París (OR), en euros, al cierre del 22-oct-2026 (413,00 EUR, Euronext), anterior a las ventas del 3T26, publicadas ese día tras el cierre; la reacción del 23-oct no estaba aún al hacer el corte [D]. Acciones: 533,9 M diluidas [D]. Cuentas NIIF-UE de los documentos de registro, los comunicados anuales y el ESEF; el BPA y el beneficio son los «sin partidas no recurrentes» que publica la empresa, que excluyen cada año entre 302 y 681 M de deterioros y reestructuraciones [A]. L’Oréal solo publica ventas en el 1T y el 3T. El puente es el balance de 30-jun-2026; Galderma (20 %) va a precio de mercado y Sanofi (7,27 %) fuera de la deuda [A, D]. El consenso (FactSet) es anterior a las ventas del 3T26 [D]. El análisis del 14-oct se hizo sin fuentes primarias; este lo sustituye.',
  controles_explicados: [
    { control: 'Regresión múltiplo-crecimiento', explicacion: 'Con ocho grupos de belleza y gran consumo de márgenes muy distintos (4-28 %) el crecimiento solo explica el 27 % del múltiplo; no se usa la regresión.' },
    { control: 'Comparables estables al quitar una empresa', explicacion: 'Coty y Shiseido (en reestructuración) y P&G mueven la mediana: por eso los comparables pesan un 15 %.' },
  ],
  parches: [],
  huecos_resueltos: [],
  secciones: {
    comparables: {
      comentario: 'L’Oréal cotiza a 19,0 veces el EBITDA de los próximos 12 meses y 28,1 veces el beneficio, frente a una mediana de 13,4 y 23,9 veces de ocho grupos de belleza y cuidado personal: una prima del 42 % y del 18 % [D]. La prima la justifican el margen (24,2 % frente al 18,7 %), el ROIC (18 %) y un crecimiento que dobla el de la mediana (6,9 % comparable en nueve meses frente al 3,4 % esperado para los comparables) [A, D].',
    },
    transacciones: {
      comentario: 'Ocho compras de belleza de 2023-2026, entre ellas Aesop (de la propia L’Oréal), Kering Beauté (≈4.004 M de valor empresa) e ISDIN [D]. A sus múltiplos medianos de ventas L’Oréal valdría 303,01 EUR por acción: es solo referencia, porque L’Oréal no es comprable (la familia tiene el 34,8 % y Nestlé el 20,2 %) [C].',
    },
    multiplos_historicos: {
      comentario: 'A 413 EUR L’Oréal cotiza a 21,0 veces el EBITDA de los últimos 12 meses y 31,7 veces el beneficio, por encima de su media de 2022-2025 al cierre (19,6 y 29,2 veces) [D]. Con el PER adelantado (cierre sobre el BPA del año siguiente) la historia limpia da una mediana de 27,6 veces y hoy cotiza a 28,1 veces: el mercado ya paga la vuelta al crecimiento de 2026 [D].',
    },
    catalizadores: {
      items: [
        { fecha: 'Nov-2026', evento: 'Revisión del consenso tras el 3T26 (+7,2 % comparable, un 3 % por encima de las ventas esperadas)', efecto: 'Subidas de BPA de 2026e-2027e', probabilidad: 'Alta', sentido: '+' },
        { fecha: 'Feb-2027', evento: 'Resultados de 2026 y dividendo', efecto: 'Margen operativo del año (21,3 % en el 1S26) y primer año con Kering Beauté', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: '1-jul-2027', evento: 'Entrada de la licencia de belleza de Gucci (hoy de Coty)', efecto: '≈+1 punto de crecimiento anual en 2027-2028', probabilidad: 'Alta', sentido: '+' },
        { fecha: '2026-2027', evento: 'Decisión de Nestlé sobre su 20,2 % (Pablo Isla entra en el consejo como vicepresidente propuesto por Nestlé)', efecto: 'Una recompra por L’Oréal subiría el BPA; una colocación presionaría el precio', probabilidad: 'Baja', sentido: '+/−' },
        { fecha: '2027', evento: 'Vuelta del comercio de viaje en Asia', efecto: 'Norte de Asia ya crece un 7,8 % en el 3T26', probabilidad: 'Media', sentido: '+' },
      ],
      confianza: 'Media',
    },
    riesgos: {
      items: [
        { riesgo: 'Pérdida de la prima de crecimiento (la belleza vuelve al 3-4 %)', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−24 % a 12 meses (bajista: 312,20 EUR)', mitigante: 'Cuota creciente: +6,9 % frente a un mercado del ≈4,5-5 %', senal: 'Crecimiento comparable por debajo del 5 % dos trimestres' },
        { riesgo: 'Gran Consumo se frena (+3,8 % en el 3T26) y Latinoamérica cae (−1,0 % comparable, México)', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−3 a −5 %', mitigante: 'Profesionales y Dermatológica crecen un 14 %', senal: 'Gran Consumo por debajo del 3 %' },
        { riesgo: 'Compras caras (Kering Beauté, Galderma, Gucci) y fondo de comercio del 71 % del patrimonio', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−3 a −5 %', mitigante: 'Licencias a 50 años; Galderma vale más que lo pagado', senal: 'Deterioros (provisión de 458 M sobre Aesop en las cuentas individuales de 2025)' },
        { riesgo: 'Litigios en EE. UU. (≈11.800 demandas por alisadores, ≈620 por talco) y la liquidación de IPI en Brasil (673 M, provisionados 45 M)', tipo: 'Regulatorio', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−1 a −3 %', mitigante: 'Sin provisión material: la empresa defiende que no hay relación causal', senal: 'Primeros juicios con jurado' },
        { riesgo: 'Divisas', tipo: 'Financiero', probabilidad: 'Alta', impacto: 'Bajo', efecto_valor: '−1 a −3 % del BPA', mitigante: 'Fabricación local; a los tipos de septiembre la divisa resta solo un 0,3 % en 2026', senal: 'Euro por encima de 1,20 USD' },
        { riesgo: 'Venta de Nestlé en el mercado', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 a −10 % temporal', mitigante: 'L’Oréal ya recompró a Nestlé en 2021', senal: 'Cambio en el pacto o en el consejo' },
      ],
      premortem: 'Octubre de 2028: la acción vale 310 EUR. En 2027 el mercado de belleza creció un 3 %, Gran Consumo se estancó y Gucci aportó menos de lo esperado; el mercado dejó de pagar 28 veces el beneficio y bajó a 22, el PER de los años de crecimiento lento. La señal: crecimiento comparable por debajo del 5 % en dos trimestres seguidos.',
      confianza: 'Media',
    },
    preguntas: {
      items: [
        { tema: 'Crecimiento', pregunta: '¿Cuánto del +7,2 % comparable del 3T26 es calendario del cambio informático y cuánto demanda?', por_que: 'El comparable y el ajustado se separan hasta 10 puntos en algunas zonas y trimestres [A].' },
        { tema: 'Kering Beauté y Gucci', pregunta: '¿Qué margen aporta Kering Beauté y qué ventas espera de Gucci desde julio de 2027?', por_que: 'Es la mitad del crecimiento extra de 2027-2028.' },
        { tema: 'Nestlé', pregunta: '¿Hay conversaciones con Nestlé sobre su 20,2 %? ¿Lo recompraría L’Oréal con deuda o con Sanofi?', por_que: 'Cambia el BPA y el balance.' },
        { tema: 'No recurrentes', pregunta: '¿Por qué hay partidas «no recurrentes» todos los años (302-681 M)?', por_que: 'El BPA ajustado que usamos las excluye [A].' },
        { tema: 'Aesop', pregunta: '¿Por qué la provisión de 458 M sobre Aesop UK en las cuentas individuales y no en el consolidado?', por_que: 'Posible deterioro del fondo de comercio [B].' },
      ],
      confianza: 'Media',
    },
  },
  dcf_justificacion: {
    crecimiento: 'Partimos de 2025 (44.052 M EUR) [A]. 2026e queda fijo en +8,0 % publicado: nueve meses al +7,7 % (+6,9 % comparable, +2,0 de perímetro con Kering Beauté desde abril, −1,2 de divisa) y un 3T al +11,9 %; con un 4T parecido el año acaba en ≈47.600 M, algo por encima del consenso previo (47.193 M) [A, D]. 2027e-2028e +6,5 % (orgánico del 5,5 % y Gucci desde julio de 2027) y luego converge al 3,0 % en 2035e.',
    margenes: 'Margen EBITDA del 24,3 % en 2026e (resultado operativo del 20,5 %; el 1S26 fue del 21,3 % y el 2S es siempre más bajo) y +0,2 puntos al año hasta el 25,3 %, lo que L’Oréal ha hecho de 2021 (19,1 %) a 2025 (20,2 %) [A]. El consenso pide un 24,3 % en 2026e [D].',
    inversion: 'Amortización del 3,8 % de las ventas (la de 2025) [A]. Capex del 4,6 %: inversión del 3,4 % de 2025 más las altas de derechos de uso. Circulante comercial del 7,5 % de las ventas, el de 2025 [A].',
    wacc: 'Bund a 10 años del 3,44 % (22-oct-2026) y beta de 0,87 [D]; prima de mercado del 5,5 %. Coste de la deuda del 3,2 % (rating AA / Aa1) y un 7 % de deuda en la estructura de capital. WACC del 7,82 %.',
    terminal: 'Crecimiento a perpetuidad del 2,5 %: inflación del euro (2 %) más medio punto real, por debajo del Bund menos medio punto. El valor terminal es el 64 % del valor.',
  },
  puente_comentarios: {
    '2026e': 'Comparable del +7 % (volumen ≈3,5 % y precio y mezcla ≈3,5 %) y +2 de perímetro, con la divisa en ≈−1 [A].',
    '2027e': 'Orgánico del 5,5 % y +1 punto de perímetro (Kering Beauté el primer trimestre y Gucci desde julio).',
    '2028e': 'Orgánico del 5,5 % y +1 punto por el primer año entero de Gucci.',
    '2029e': 'Orgánico del 5 % (mercado del 4,5 %) y el último medio punto de Gucci.',
    '2030e': 'El crecimiento converge al del mercado más medio punto.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Sí. El caso base (4,8 % anual en 2027e-2035e) pide menos de lo que L’Oréal ha hecho en cualquier periodo de cinco años desde 2010 (8,1 % anual en 2021-2025) y lo financia un ROIC del 18 % con una reinversión del 7 %; solo exige ganar algo de cuota en un mercado que crece un 4-5 % [A, B].',
  dcf_lectura: 'El DCF da 289,72 EUR por acción, un 29,8 % por debajo de 413 EUR, con un WACC del 7,82 % y un valor terminal del 64 %. El DCF inverso dice que a 413 EUR el mercado descuenta un crecimiento del 9,9 % anual en 2027e-2035e frente al 4,8 % de nuestro caso base, o que el accionista gana un 6,3 % anual. Con la prima que hoy pide el mercado (4,2 %) el DCF sube a 367,02 EUR, aún un 11 % por debajo [D].',
  narrativas: {
    Bajista: 'La belleza vuelve al 3-4 % y L’Oréal deja de superar al mercado: 2,5 puntos menos de crecimiento y 1,5 de margen.',
    Base: 'L’Oréal crece un 5,5 % orgánico más Gucci en 2027-2028, converge al 3 % en 2035 y sube el margen 0,2 puntos al año.',
    Alcista: 'China y el comercio de viaje vuelven y Gucci rinde más: 1,5 puntos más de crecimiento y 1 de margen.',
  },
  escenarios_comentario: 'El DCF da 209,42 EUR en el bajista (−49,3 %), 289,72 en el base (−29,8 %) y 339,35 en el alcista (−17,8 %): con nuestro coste de capital ni el alcista llega al precio.',
  suma_partes_comentario: 'No aplica a las divisiones (no se publica el resultado completo por división). Las dos participaciones cotizadas (Sanofi, ≈6.640 M, y Galderma, ≈9.450 M) se suman en el puente a precio de mercado [A, D].',
  valoracion_comentario: 'El DCF pesa un 55 %: es un negocio estable y previsible. Los escenarios, un 30 %, y los comparables un 15 %, porque la muestra mezcla grupos en reestructuración (Coty, Shiseido) con gran consumo (Unilever, P&G). Valor intrínseco de 291,66 EUR (−29,4 %). La recomendación la decide el objetivo a 12 meses por PER (regla v3): +3,5 % ponderado y +8,1 % en el caso base, Mantener.',
  rentabilidad_comentario: 'L’Oréal crea valor con holgura: ROIC del 18,0 % en 2025 frente a un WACC del 7,8 %, y del 29-33 % sin el fondo de comercio; se ha mantenido en el 17-20 % desde 2021 pese a las compras [A].',
  just12m: {
    Bajista: 'BPA de 2028e del escenario bajista (crecimiento 2,5 puntos menor y margen 1,5 puntos menor desde 2027e); resultado financiero de −50 M en 2026e y 0 después (intereses menos dividendos de Sanofi), impuesto del 25 %, 533,9 M de acciones. Múltiplo con la regla común.',
    Base: 'BPA de 2028e del caso base del DCF (2026e +8,0 %, 2027e-2028e +6,5 %; margen EBITDA del 24,3-24,7 %), sin contar el resultado de Galderma. Múltiplo con la regla común.',
    Alcista: 'BPA de 2028e del escenario alcista (crecimiento 1,5 puntos mayor y un punto más de margen desde 2027e). Múltiplo con la regla común.',
  },
  diferencia_consenso: 'Nuestro BPA de 2026e (13,60 EUR) y de 2027e (14,71) quedan un 0,7 % y un 1,6 % por debajo del consenso (13,70 y 14,95), que es de antes del 3T26 y probablemente suba; la diferencia sale de que no sumamos el resultado de Galderma. Nuestro precio base a 12 meses (439,52 EUR) queda un 5 % por encima del objetivo medio de los analistas (418 EUR) [D].',
  objetivo12m_comentario: 'El objetivo a 12 meses ponderado (≈420 EUR; base 439,52) queda muy por encima del valor intrínseco (291,66 EUR): la rentabilidad a 12 meses viene de crecer el BPA un 7-8 % al año con el mercado pagando unas 28 veces el beneficio; el valor intrínseco dice que con un 4,8 % de crecimiento a largo plazo la acción vale menos de 300 EUR. Con la historia al cierre (v2, control) la rentabilidad es del +10,2 %.',
  fuentes: [],
  huecos: [],
};
