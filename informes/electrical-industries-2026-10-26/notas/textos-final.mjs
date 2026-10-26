// Textos finales del analista (EIC, corte 2026-10-26; tras el 3T26): objetivo a 12 meses, riesgos, catalizadores, preguntas y resumen.
// Cifras del motor tal cual (último cálculo); hechos con cita de la letra de la nota.
import * as O from './objetivo.mjs';
import R from './resumen.mjs';

const es = (x, d = 2) => x.toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d });

const objetivo_12m = {
  ejercicio: '2028e',
  casos: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: O.bpa.Bajista, multiplo: null, precio: null, justificacion: 'Fin de la escasez y guerra larga: ventas de 2027e un 5 % por debajo de 2026e (2.565 M SAR) y +3 % en 2028e (2.642 M), margen EBITDA del 23 %: EBITDA de 608 M, amortización de 55 M, resultado financiero de −10 M, impuestos del 6 %: beneficio ≈ 510 M sobre 1.121,8 M acciones.' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: O.bpa.Base, multiplo: null, precio: null, justificacion: 'Ventas de 3.208 M SAR (+17,6 % en 2026e, +10 % en 2027e y +8 % en 2028e) y margen EBITDA del 28 %: EBITDA de 898 M, amortización de 67 M, EBIT de 831 M, resultado financiero de −10 M e impuestos del 6 %: beneficio ≈ 772 M. Cuadra con 2025: EBIT de 675 M − 10 M financieros − 34 M de impuestos = 630 M (0,56 SAR).' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: O.bpa.Alcista, multiplo: null, precio: null, justificacion: 'La escasez dura, la logística se normaliza y la exportación crece: ventas de 3.509 M SAR (+15 % y +13 %) con margen EBITDA del 30,5 %: beneficio ≈ 927 M, todavía un 24 % por debajo del único analista con estimaciones (1,09 SAR de BPA en 2028e).' },
  ],
  per_historico: {
    base: 'adelantado', actual: O.actual, mediana_5a: O.mediana, minimo_5a: O.minimo, media_larga: O.media,
    excluidos: `Historia adelantada (cierre de cada año ÷ BPA real del año siguiente, por acción de hoy): 2021 1,10 ÷ 0,085 = ${es(O.perAdel[0][1])}; 2022 0,94 ÷ 0,181 = ${es(O.perAdel[1][1])}; 2023 2,84 ÷ 0,359 = ${es(O.perAdel[2][1])}; 2024 7,24 ÷ 0,562 = ${es(O.perAdel[3][1])}; 2025 11,20 ÷ 0,68 (nuestro BPA contable de 2026e, con el reembolso de la multa, como la historia, que es contable) = ${es(O.perAdel[4][1])}. Ningún año excluido: sin pérdidas ni BPA atípico (2022 es el mínimo, cuando el mercado no creía en la recuperación). Mediana ${es(O.mediana)}, mínimo ${es(O.minimo)} y media ${es(O.media)}. PER actual: ${es(O.precio)} ÷ 0,681 (nuestro BPA de 2027e) = ${es(O.actual)}. Misma base: historia y casos en BPA contable; los casos de 2028e no llevan partidas extraordinarias.`,
    v2: { mediana_5a: O.v2.mediana, minimo_5a: O.v2.minimo, media_larga: O.v2.media, excluidos: `Al cierre (cierre ÷ BPA del mismo año): ${O.perCierre.map(([a, p]) => `${a} ${es(p, 1)}`).join('; ')}.` },
  },
  comparables_per: { mediana: 19.6 },
  consenso: { bpa_ano1: 0.75, bpa_ano2: 0.86, objetivo_medio: 15.5, objetivo_min: 15.5, objetivo_max: 15.5, analistas: 1, tendencia_3m: 'estables', fuente: 'MarketScreener (estimaciones y objetivo de un analista, sin revisar tras el 3T26; consultado el 26-oct-2026) y Argaam (ANB Capital, 23-jul y 11-oct-2026) [D2, D3, D4, D23]' },
  diferencia_consenso: 'Nuestro BPA de 2027e (0,68) queda un 21 % por debajo del único analista con estimaciones abiertas (0,86) y el de 2028e (0,69), un 37 % por debajo (1,09) [D2]. Hay dos causas: el analista no ha revisado tras el 3T26 (espera 839 M de beneficio en 2026e y los 9M26 suman 580 M con el reembolso) y espera un margen EBITDA del 34 % en 2027e y del 36 % en 2028e, por encima del máximo de 2025 (31 %), con ventas de 3.765 M en 2028e; nosotros 3.208 M con un margen que baja al 28 % [A16, B7]. Revisados los supuestos, mantenemos la diferencia. Su objetivo de 15,50 SAR equivale a 18 veces su BPA de 2027e y queda casi en nuestro alcista a 12 meses.',
  media: null,
  comentario: null,
};

const riesgos = {
  items: [
    { riesgo: 'Fin del ciclo de escasez y caída del margen', tipo: 'Mercado', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−39 % (escenario bajista frente al base del DCF)', mitigante: 'Cartera de 3.300 M SAR (1,4 años de ventas), contenido local y única fábrica saudí de alta tensión [A11, B1].', senal: 'Margen bruto trimestral por debajo del 33 % (33,9 % en el 3T26) o cartera de pedidos a la baja' },
    { riesgo: 'Retraso o recorte del plan de inversión de Saudi Electricity', tipo: 'Comercial', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 % a −25 %', mitigante: 'Plan de 220.000 M SAR en 2025-2030 con 39.000 M invertidos en el 1S26 (+6 %); Aramco y exportación como segunda pata [B5, B6].', senal: 'Inversión trimestral de SEC por debajo de 8.000 M SAR o recortes presupuestarios por el petróleo' },
    { riesgo: 'Nueva capacidad local (Voltamp, filiales de fabricantes extranjeros)', tipo: 'Competencia', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−10 % por cada 2 puntos de margen EBITDA', mitigante: 'Homologación lenta de SEC y Aramco; diseños de Pauwels hasta 380 kV [B1, B7].', senal: 'Adjudicaciones de SEC a fábricas nuevas en el Reino' },
    { riesgo: 'Cobre y chapa magnética con precios fijados al firmar', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Cartera rotando en 12-18 meses y anticipos de clientes [A1].', senal: 'Subida del cobre de más del 20 % en un trimestre' },
    { riesgo: 'Circulante que absorbe caja con un reparto del 89 % del beneficio', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−3 %', mitigante: 'Deuda casi nula y líneas de murabaha con diez bancos [A1, A11].', senal: 'Flujo operativo semestral negativo o anticipos por debajo de 450 M SAR' },
    { riesgo: 'Ventas de accionistas de referencia y directivos', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−3 % a −5 % (presión de oferta)', mitigante: 'Liquidez de ≈ 46 M SAR al día; free float del 68,5 % [D1].', senal: 'Nuevas bajadas de Adja o de la familia Al-Tuwaijri' },
    { riesgo: 'Guerra en el Golfo: entregas, fletes y seguros', tipo: 'País', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−10 % (un año más con el margen del 3T26)', mitigante: 'Demanda local con presupuesto público; fábricas en el Reino; caja neta [A6, A15].', senal: 'Margen bruto del 4T26 y tránsitos por Ormuz; el 1-mar-2026 la acción cayó un 8 % y el 22-oct un 10 % [D21, B14, D1]' },
  ],
  premortem: 'Octubre de 2029: EIC vale la mitad. Lo que pasó: el 3T26 no fue solo la guerra. La escasez mundial de transformadores terminó en 2027, cuando las fábricas nuevas de Corea, India, China y EE. UU. entraron en producción. En el Reino, Voltamp abrió su planta y dos fabricantes extranjeros ampliaron las suyas; SEC, con el petróleo a la baja, alargó su plan de inversión y apretó precios en los concursos de 2027. La cartera de EIC, estancada desde 2025, bajó de 3.300 a 2.200 M SAR, las ventas de 2028 cayeron a los niveles de 2025 y el margen EBITDA volvió al 20 %. El beneficio se quedó en 450 M SAR y el mercado, que ya pagaba 15 veces, pasó a pagar 10. La ampliación de 380 kV, decidida en el pico, tuvo poca carga. Las ventas de la familia fundadora y de los directivos en 2025-2026 y el margen bruto del 3T26 (33,9 %) fueron las señales que nadie quiso leer.',
  ia: {
    exposicion: 'Baja', sentido: 'Positivo', efecto_valor: '+0 % a +3 %',
    comentario: 'EIC fabrica transformadores y aparamenta: la IA no sustituye el producto ni el canal de concursos. Le favorece de forma indirecta: los centros de datos de IA (en EE. UU., Europa y los nuevos campus del Golfo) son una de las causas de la escasez mundial de transformadores que ha disparado su margen, y el Reino anuncia centros de datos que piden subestaciones de alta tensión [B1, B9]. Le perjudicaría un parón de la inversión en centros de datos, que aceleraría el fin de la escasez y la bajada del margen que ya recoge el caso base. Ninguna de las dos vías mueve el valor más de un 3 % en 3-5 años. Señal: pedidos de subestaciones para centros de datos en el Golfo.',
  },
  confianza: 'Media',
};

const catalizadores = {
  items: [
    { fecha: 'mar-2027', evento: 'Resultados de 2026 (4T26), cartera de pedidos y dividendo del 2S26', efecto: 'Margen bruto del 4T26 (¿vuelve hacia el 37 % o se queda en el 34 %?) y si las entregas retrasadas del 3T26 se recuperan; la cartera dirá si los pedidos vuelven a crecer (+3 % en 2025) [A15, A11]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2026-2027', evento: 'Evolución de la guerra y del tráfico por Ormuz', efecto: 'Fletes, seguros y plazos de entrega, la causa que la empresa da al 3T26 [A15, B14]', probabilidad: 'Media', sentido: '+/−' },
    { fecha: '2026-2027', evento: 'Concursos de SEC del plan 2025-2030', efecto: 'Nuevos acuerdos marco de transformadores y subestaciones; precio frente a los de 2025 [B5]', probabilidad: 'Media', sentido: '+' },
    { fecha: '3T27', evento: 'Producción comercial de la ampliación de 380 kV', efecto: 'Más capacidad en muy alta tensión (192 M SAR de inversión) [B8]', probabilidad: 'Alta', sentido: '+' },
    { fecha: '2027', evento: 'Arranque de la fábrica de Voltamp en el Reino', efecto: 'Primera capacidad nueva de transformadores de distribución en competencia directa [B7]', probabilidad: 'Media', sentido: '−' },
    { fecha: '1T27-1T29', evento: 'Obra de la fábrica de cubas y radiadores (150 M SAR)', efecto: 'Capex adicional; integración vertical con efecto en resultados desde el 4T29 [B12, B13]', probabilidad: 'Alta', sentido: '+/−' },
  ],
  confianza: 'Media',
};

const preguntas = {
  items: [
    { tema: 'Margen del 3T26', pregunta: '¿Cuántos puntos de los 6 que perdió el margen bruto en el 3T26 (33,9 % frente al 39,9 %) son fletes y seguros de guerra que se pueden repercutir o que desaparecen, y cuántos son precio de la cartera?', por_que: 'Separa la guerra del ciclo: es lo que decide si el caso base es prudente o generoso.' },
    { tema: 'Entregas retrasadas', pregunta: '¿Qué importe de ventas se retrasó del 3T26 y en qué trimestre se entrega?', por_que: 'El 4T26 de la proyección (≈ 700 M) supone que se recupera parte.' },
    { tema: 'Precio de la cartera', pregunta: '¿Qué margen bruto tiene la cartera de 3.300 M SAR frente al 37,5 % de 2025, y qué parte se firmó en 2024-2025 a precios de escasez?', por_que: 'El caso base supone que el margen baja del 32 % al 24,5 %; el analista, que sube al 36 %.' },
    { tema: 'Cartera estancada', pregunta: '¿Por qué la cartera solo creció un 3 % en 2025 con ventas un 16 % mayores, y cuánto de los 2.500 M de acuerdos marco se convertirá en pedidos en 2026-2027?', por_que: 'Si los pedidos no crecen, las ventas de 2027e tampoco.' },
    { tema: 'Competencia local', pregunta: '¿Qué cuota espera perder en distribución cuando entren Voltamp y las ampliaciones de los fabricantes extranjeros, y cómo puntúa SEC el contenido local en los concursos de 2026?', por_que: 'Es el riesgo central del bajista.' },
    { tema: 'Dividendo y capex', pregunta: '¿Mantendrá el reparto del 89 % del beneficio con 342 M SAR de capex comprometidos (380 kV y fábrica de cubas) y la deuda ya en 123 M?', por_que: 'En 2022 el flujo operativo fue negativo y la deuda subió en el 1S26.' },
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
