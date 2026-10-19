// Textos finales del analista (EIC, corte 2026-10-19): objetivo a 12 meses, riesgos, catalizadores, preguntas y resumen.
// Cifras del motor tal cual (último cálculo); hechos con cita de la letra de la nota.
import * as O from './objetivo.mjs';
import R from './resumen.mjs';

const es = (x, d = 2) => x.toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d });

const objetivo_12m = {
  ejercicio: '2028e',
  casos: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: O.bpa.Bajista, multiplo: null, precio: null, justificacion: 'Fin de la escasez: ventas de 2027e un 7 % por debajo de 2026e (2.669 M SAR) y +5 % en 2028e (2.803 M), margen EBITDA del 24 %: EBITDA de 673 M, amortización de 56 M, resultado financiero de −10 M, impuestos del 6 %: beneficio ≈ 570 M sobre 1.121,8 M acciones.' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: O.bpa.Base, multiplo: null, precio: null, justificacion: 'Ventas de 3.568 M SAR (+25 % en 2026e, +13 % en 2027e y +10 % en 2028e) y margen EBITDA del 29 %: EBITDA de 1.035 M, amortización de 71 M, EBIT de 963 M, resultado financiero de −10 M e impuestos del 6 %: beneficio ≈ 896 M. Cuadra con 2025: EBIT de 675 M − 10 M financieros − 34 M de impuestos = 630 M.' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: O.bpa.Alcista, multiplo: null, precio: null, justificacion: 'La escasez dura y la exportación crece: ventas de 3.895 M SAR (+18 % y +15 %) con margen EBITDA del 31,5 %: beneficio ≈ 1.071 M, todavía un 13 % por debajo del único analista con estimaciones (1,09 SAR de BPA en 2028e).' },
  ],
  per_historico: {
    base: 'adelantado', actual: O.actual, mediana_5a: O.mediana, minimo_5a: O.minimo, media_larga: O.media,
    excluidos: `Historia adelantada (cierre de cada año ÷ BPA real del año siguiente, por acción de hoy): 2021 1,10 ÷ 0,085 = ${es(O.perAdel[0][1])}; 2022 0,94 ÷ 0,181 = ${es(O.perAdel[1][1])}; 2023 2,84 ÷ 0,359 = ${es(O.perAdel[2][1])}; 2024 7,24 ÷ 0,562 = ${es(O.perAdel[3][1])}; 2025 11,20 ÷ 0,725 (nuestro BPA de 2026e) = ${es(O.perAdel[4][1])}. Ningún año excluido: sin pérdidas ni BPA atípico (2022 es el mínimo, cuando el mercado no creía en la recuperación). Mediana ${es(O.mediana)}, mínimo ${es(O.minimo)} y media ${es(O.media)}. PER actual: ${es(O.precio)} ÷ 0,772 (nuestro BPA de 2027e) = ${es(O.actual)}.`,
    v2: { mediana_5a: O.v2.mediana, minimo_5a: O.v2.minimo, media_larga: O.v2.media, excluidos: `Al cierre (cierre ÷ BPA del mismo año): ${O.perCierre.map(([a, p]) => `${a} ${es(p, 1)}`).join('; ')}.` },
  },
  comparables_per: { mediana: 21.35 },
  consenso: { bpa_ano1: 0.75, bpa_ano2: 0.86, objetivo_medio: 15.5, objetivo_min: 15.5, objetivo_max: 15.5, analistas: 1, tendencia_3m: 'sin datos', fuente: 'MarketScreener (estimaciones y objetivo de un analista, 16-oct-2026) y Argaam (ANB Capital, 23-jul-2026) [D2, D3, D4]' },
  diferencia_consenso: 'Nuestro BPA de 2027e (0,77) queda un 10 % por debajo del único analista con estimaciones abiertas (0,86) y el de 2028e (0,80), un 27 % por debajo (1,09) [D2]. La diferencia es de margen: el analista espera un margen EBITDA del 34 % en 2027e y del 36 % en 2028e, por encima del máximo de 2025 (31 %), y ventas de 3.765 M en 2028e; nosotros 3.568 M con un margen que baja al 29 % porque la escasez atrae capacidad nueva al Reino [B7]. El objetivo de 15,50 SAR equivale a 18 veces su BPA de 2027e; la regla común aplica el PER histórico adelantado.',
  media: null,
  comentario: null,
};

const riesgos = {
  items: [
    { riesgo: 'Fin del ciclo de escasez y caída del margen', tipo: 'Mercado', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−38 % (escenario bajista frente al base del DCF)', mitigante: 'Cartera de 3.300 M SAR (1,4 años de ventas), contenido local y única fábrica saudí de alta tensión [A11, B1].', senal: 'Margen bruto trimestral por debajo del 33 % o cartera de pedidos a la baja' },
    { riesgo: 'Retraso o recorte del plan de inversión de Saudi Electricity', tipo: 'Comercial', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 % a −25 %', mitigante: 'Plan de 220.000 M SAR en 2025-2030 con 39.000 M invertidos en el 1S26 (+6 %); Aramco y exportación como segunda pata [B5, B6].', senal: 'Inversión trimestral de SEC por debajo de 8.000 M SAR o recortes presupuestarios por el petróleo' },
    { riesgo: 'Nueva capacidad local (Voltamp, filiales de fabricantes extranjeros)', tipo: 'Competencia', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−10 % por cada 2 puntos de margen EBITDA', mitigante: 'Homologación lenta de SEC y Aramco; diseños de Pauwels hasta 380 kV [B1, B7].', senal: 'Adjudicaciones de SEC a fábricas nuevas en el Reino' },
    { riesgo: 'Cobre y chapa magnética con precios fijados al firmar', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Cartera rotando en 12-18 meses y anticipos de clientes [A1].', senal: 'Subida del cobre de más del 20 % en un trimestre' },
    { riesgo: 'Circulante que absorbe caja con un reparto del 89 % del beneficio', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−3 %', mitigante: 'Deuda casi nula y líneas de murabaha con diez bancos [A1, A11].', senal: 'Flujo operativo semestral negativo o anticipos por debajo de 450 M SAR' },
    { riesgo: 'Ventas de accionistas de referencia y directivos', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−3 % a −5 % (presión de oferta)', mitigante: 'Liquidez de ≈ 46 M SAR al día; free float del 68,5 % [D1].', senal: 'Nuevas bajadas de Adja o de la familia Al-Tuwaijri' },
    { riesgo: 'Riesgo geopolítico del Golfo (Irán)', tipo: 'País', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−10 %', mitigante: 'Demanda local con presupuesto público; caja neta [A6].', senal: 'Ataques a infraestructuras saudíes; el 1-mar-2026 la acción cayó un 8 % [D21]' },
  ],
  premortem: 'Octubre de 2029: EIC vale la mitad. Lo que pasó: la escasez mundial de transformadores terminó en 2027, cuando las fábricas nuevas de Corea, India, China y EE. UU. entraron en producción. En el Reino, Voltamp abrió su planta y dos fabricantes extranjeros ampliaron las suyas; SEC, con el petróleo a la baja, alargó su plan de inversión y apretó precios en los concursos de 2027. La cartera de EIC, estancada desde 2025, bajó de 3.300 a 2.200 M SAR, las ventas de 2028 cayeron a los niveles de 2025 y el margen EBITDA volvió al 20 %. El beneficio se quedó en 450 M SAR y el mercado, que ya pagaba 15 veces, pasó a pagar 10. La ampliación de 380 kV, decidida en el pico, tuvo poca carga. Las ventas de la familia fundadora y de los directivos en 2025-2026 fueron la señal que nadie quiso leer.',
  ia: {
    exposicion: 'Baja', sentido: 'Positivo', efecto_valor: '+0 % a +3 %',
    comentario: 'EIC fabrica transformadores y aparamenta: la IA no sustituye el producto ni el canal de concursos. Le favorece de forma indirecta: los centros de datos de IA (en EE. UU., Europa y los nuevos campus del Golfo) son una de las causas de la escasez mundial de transformadores que ha disparado su margen, y el Reino anuncia centros de datos que piden subestaciones de alta tensión [B1, B9]. Le perjudicaría un parón de la inversión en centros de datos, que aceleraría el fin de la escasez y la bajada del margen que ya recoge el caso base. Ninguna de las dos vías mueve el valor más de un 3 % en 3-5 años. Señal: pedidos de subestaciones para centros de datos en el Golfo.',
  },
  confianza: 'Media',
};

const catalizadores = {
  items: [
    { fecha: '≈ 22-oct-2026', evento: 'Resultados del 3T26', efecto: 'Margen bruto y ventas del trimestre; primera lectura de si el margen del 1S26 (37,8 %) aguanta [D20, A6]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'mar-2027', evento: 'Resultados de 2026, cartera de pedidos y dividendo', efecto: 'La cartera a fin de 2026 dirá si los pedidos vuelven a crecer (+3 % en 2025) [A11]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2026-2027', evento: 'Concursos de SEC del plan 2025-2030', efecto: 'Nuevos acuerdos marco de transformadores y subestaciones; precio frente a los de 2025 [B5]', probabilidad: 'Media', sentido: '+' },
    { fecha: '3T27', evento: 'Producción comercial de la ampliación de 380 kV', efecto: 'Más capacidad en muy alta tensión (192 M SAR de inversión) [B8]', probabilidad: 'Alta', sentido: '+' },
    { fecha: '2027', evento: 'Arranque de la fábrica de Voltamp en el Reino', efecto: 'Primera capacidad nueva de transformadores de distribución en competencia directa [B7]', probabilidad: 'Media', sentido: '−' },
  ],
  confianza: 'Media',
};

const preguntas = {
  items: [
    { tema: 'Precio de la cartera', pregunta: '¿Qué margen bruto tiene la cartera de 3.300 M SAR frente al 37,5 % de 2025, y qué parte se firmó en 2024-2025 a precios de escasez?', por_que: 'El caso base supone que el margen baja del 32 % al 24,5 %; el analista, que sube al 36 %.' },
    { tema: 'Cartera estancada', pregunta: '¿Por qué la cartera solo creció un 3 % en 2025 con ventas un 16 % mayores, y cuánto de los 2.500 M de acuerdos marco se convertirá en pedidos en 2026-2027?', por_que: 'Si los pedidos no crecen, las ventas de 2027e tampoco.' },
    { tema: 'Competencia local', pregunta: '¿Qué cuota espera perder en distribución cuando entren Voltamp y las ampliaciones de los fabricantes extranjeros, y cómo puntúa SEC el contenido local en los concursos de 2026?', por_que: 'Es el riesgo central del bajista.' },
    { tema: 'Materias primas', pregunta: '¿Qué parte del cobre y la chapa magnética de la cartera está cubierta o indexada?', por_que: 'Precios fijados al firmar.' },
    { tema: 'Dividendo', pregunta: '¿Mantendrá el reparto del 89 % del beneficio si el circulante vuelve a absorber caja?', por_que: 'En 2022 el flujo operativo fue negativo.' },
    { tema: 'Accionistas', pregunta: '¿Qué intención tienen Adja y la familia Al-Tuwaijri con sus participaciones tras las ventas de 2024-2026?', por_que: 'Presión vendedora y señal sobre el pico del ciclo.' },
  ],
  confianza: 'Media',
};

export default {
  objetivo_12m: { ...objetivo_12m, comentario: R.objetivo_comentario ?? null },
  riesgos, catalizadores, preguntas,
  resumen: R.resumen,
  dcf_lectura: R.dcf_lectura ?? null,
  escenarios_comentario: R.escenarios_comentario ?? null,
  valoracion_comentario: R.valoracion_comentario ?? null,
};
