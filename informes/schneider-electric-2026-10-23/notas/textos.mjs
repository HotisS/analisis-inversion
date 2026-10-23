// Textos del analista (Schneider Electric, corte 2026-10-23, tras las ventas del 3T26 y la compra de PTC). Citas: [A3] = fuente 3 de A.json; [D] = nota D.
export const limitaciones = `Se valora la acción de Schneider Electric en Euronext París (SU), en euros, al cierre del 22-oct-2026 (235,75 EUR); el 23-oct cotizaba a ≈228,80 a las 16:00 de Madrid [D]. Acciones: 594,4 M diluidas, ya con las 25 M de la ampliación del 19-20 de octubre (6.000 M EUR a 240 EUR) [D]. El puente es el balance de 30-jun-2026 más la caja neta de la ampliación (en otros ajustes). La compra de PTC (23.700 M USD de valor empresa, cierre previsto en el 3T27) no está en el DCF: la caja de la ampliación va en el puente y la deuda futura no, lo que equivale a suponer que PTC vale lo que se paga; el objetivo a 12 meses sí la recoge en el BPA de 2028e (acrecimiento de un dígito bajo menos ≈0,90 EUR de amortización del precio de compra, estimación propia) [D]. El consenso es casi todo sin PTC [D]. El BPA de la empresa es el ajustado (sin reestructuración ni deterioros, pero con la amortización de intangibles de compras). En 2026 cambió la segmentación geográfica: no se compara con 2025 [B]. El análisis del 14-oct se hizo solo con extractos de búsqueda; este lo sustituye.`;

export const controles_explicados = [
  { control: 'BAI − impuestos − minoritarios = beneficio neto', explicacion: 'Entre el BAI y el beneficio neto van el resultado de las asociadas y sus deterioros (−388 M en 2025) y, en 2020, actividades interrumpidas [A].' },
];

export const parches = [];

export const dcf_lectura = `El DCF da 224,71 EUR por acción, un 4,7 % por debajo del cierre del 22-oct (235,75) y casi igual que el precio de hoy (≈228,80), con un WACC del 9,33 % y un 64 % del valor en el terminal. El WACC sube frente al 14-oct por la beta (1,25 frente a 1,10): Schneider se mueve un 25-40 % más que el CAC 40 [D]. El DCF inverso dice que a 235,75 EUR el mercado descuenta un crecimiento del 6,9 % anual en 2027e-2035e, muy cerca del 6,2 % de nuestro caso base: el precio ya es razonable, pero no barato.`;

export const narrativas = {
  Bajista: 'Los centros de datos se frenan en 2027-2028 (la inversión en IA se corta) y PTC rinde menos de lo pagado: crecimiento 3 puntos menor y margen 1,5 puntos menor.',
  Base: 'Ventas +12 % en 2026, +10 % en 2027 y convergencia al 3 % en 2035, con el margen de EBITA hacia el 21 %; PTC vale lo que se paga.',
  Alcista: 'Los centros de datos siguen a tres cifras y PTC aporta sinergias tempranas: crecimiento 2 puntos mayor y un punto más de margen.',
};

export const escenarios_comentario = `El bajista (163,84 EUR, −30,5 %) pesa más que el alcista (272,25 EUR, +15,5 %): la asimetría es mala porque el caso base ya supone un ciclo de inversión en centros de datos fuerte hasta 2028.`;

export const valoracion_comentario = `Pesos: DCF 50 %, escenarios 30 % y comparables 20 %. Valor intrínseco de 228,62 EUR (−3,0 % frente al cierre del 22-oct; ≈ el precio de hoy). La recomendación la decide el objetivo a 12 meses por PER (regla v3): +14,0 % ponderado y +19,0 % en el caso base al cierre del 22-oct; al precio de hoy (228,80) sube al +17,5 %, pero el valor intrínseco sigue justo por debajo del precio: Mantener. Además, con un WACC del 9,33 % el ROIC (12,8 %) solo lo supera en 3,5 puntos: no llega a la calidad que exige una compra (5 puntos).`;

export const objetivo12m_comentario = 'El objetivo a 12 meses ponderado (264,53 EUR; base 276,26) usa un PER de 21,6 veces, la mediana de los comparables, sobre un BPA de 2028e con PTC (12,79 EUR), un 9 % por debajo del consenso. Con la historia al cierre (v2) la rentabilidad es del +17,5 %.';

export const catalizadores = {
  items: [
    { fecha: '18-feb-2027', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Margen de EBITA del 19,7-19,9 % y primera guía con la financiación de PTC', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2027', evento: 'Aprobaciones de la compra de PTC (competencia y CFIUS)', efecto: 'Cierre previsto en el 3T27; el diferencial de PTC (≈192 frente a 205 USD) muestra dudas', probabilidad: 'Media', sentido: '+/−' },
    { fecha: 'Ene-2027', evento: 'Fin del bloqueo de 90 días tras la ampliación', efecto: 'Posible presión de oferta', probabilidad: 'Media', sentido: '−' },
    { fecha: '2026-2027', evento: 'Planes de inversión de los grandes de la nube', efecto: 'Los centros de datos son ≈30 % de los pedidos', probabilidad: 'Alta', sentido: '+/−' },
  ],
  confianza: 'Media',
};

export const riesgos = {
  items: [
    { riesgo: 'Frenazo de la inversión en centros de datos para IA', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−30 % (bajista del DCF: 163,84 EUR)', mitigante: 'Redes eléctricas y edificios crecen aparte', senal: 'Pedidos de centros de datos a la baja dos trimestres' },
    { riesgo: 'PTC: precio alto (21 veces el EBITA de 2027e) y deuda de ≈2,6 veces el EBITDA al cierre', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−5 a −10 %', mitigante: 'Rating A confirmado; ampliación de 6.000 M ya hecha', senal: 'Rebaja de rating o retraso de aprobaciones' },
    { riesgo: 'Automatización industrial estancada (EBITA igual que en 2020 pese a ≈9.200 M en compras)', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Crece un 8 % en el 3T26', senal: 'Margen de Automatización por debajo del 14 %' },
    { riesgo: 'Gobierno y dirección: salida de la directora financiera y ventas del presidente', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−2 a −3 %', mitigante: 'Consejo con un 73 % de independientes', senal: 'Más salidas en la cúpula' },
    { riesgo: 'Multa de competencia en Francia y causa penal de 2022', tipo: 'Regulatorio', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: '−1 %', mitigante: 'Multa de 207 M ya pagada y recurrida', senal: 'Sentencia' },
  ],
  premortem: 'Octubre de 2028: la acción vale 160 EUR. Los grandes de la nube recortaron la inversión en 2027, los pedidos de centros de datos cayeron y PTC se cerró con deuda de 2,6 veces el EBITDA; el mercado dejó de pagar 21 veces el beneficio. La señal: la cartera de pedidos bajando dos trimestres.',
  confianza: 'Media',
};

export const preguntas = {
  items: [
    { tema: 'PTC', pregunta: '¿Cuánto amortización del precio de compra generará PTC y cuánto acrecimiento real deja en el BPA ajustado?', por_que: 'Separa nuestro BPA de 2028e del consenso un 9 % [D].' },
    { tema: 'Centros de datos', pregunta: '¿Qué parte de la cartera de pedidos es de centros de datos y con qué plazos?', por_que: 'Es ≈30 % de los pedidos y el motor del crecimiento [B].' },
    { tema: 'Automatización', pregunta: '¿Por qué Automatización gana lo mismo que en 2020 tras ≈9.200 M en compras?', por_que: 'Rentabilidad del capital invertido [A].' },
    { tema: 'Deuda', pregunta: '¿Cuándo vuelve la deuda neta por debajo de 2 veces el EBITDA tras PTC?', por_que: 'Recompras en pausa en 2027-2028 [D].' },
  ],
  confianza: 'Media',
};

export const resumen = {
  recomendacion: 'Mantener',
  conviccion: 'Media',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis: `**La recomendación y por qué.** Mantener, con convicción media. El objetivo a 12 meses da un +14,0 % ponderado y un +19,0 % en el caso base sobre el cierre del 22-oct (235,75 EUR), y un +17,5 % al precio de hoy (≈228,80); pero el valor intrínseco (228,62 EUR) queda justo por debajo del precio y el ROIC (12,8 %) solo supera en 3,5 puntos al WACC (9,33 %): no es la calidad que pide una compra. La convicción es media porque las dos reglas coinciden en no comprar ni vender; la subiría una caída por debajo de 210 EUR y la bajaría un frenazo de los centros de datos.

**Qué ha pasado.** El 16-oct adelantó las ventas del 3T26: 11.460 M EUR, +16,9 % orgánico, con los centros de datos creciendo a tres cifras; la guía de 2026 sube a EBITA ajustado +18-21 % orgánico y margen del 19,7-19,9 % [A]. Pero el 5-oct anunció la compra de PTC por 23.700 M USD (21 veces el EBITA de 2027e), con recompras en pausa en 2027-2028, y el 19-20 de octubre amplió capital por 6.000 M EUR a 240 EUR [D]. La acción cayó un 10 % el 5-oct y un 25 % desde agosto, también por la caída de todo el sector de infraestructura para la IA el 22-oct [D].

**El negocio.** Líder mundial en gestión de la energía y automatización, con ventas de 40.152 M EUR en 2025, EBITA ajustado del 18,7 % y caja libre de 4.635 M [A]. El crecimiento lo tira Gestión de la Energía (centros de datos y redes); Automatización está estancada [A, B].

**Valoración.** DCF de 224,71 EUR (WACC del 9,33 %); escenarios de 163,84 a 272,25 EUR. Cotiza a 20,4 veces el beneficio de los próximos 12 meses, por debajo de su mediana adelantada (22,5) y cerca de los comparables (21,6) [D].

**Qué cambiaría la decisión.** Por debajo de 210,81 EUR la rentabilidad aguanta un BPA un 10 % menor; aun así haría falta un ROIC − WACC de 5 puntos para comprar. Venta por encima de 298,64 EUR.`,
  tesis: 'Schneider es uno de los ganadores de la electrificación y de los centros de datos, con un crecimiento orgánico del 15 % en 2026. La compra de PTC lo convierte en una apuesta mayor por el software industrial, pagada cara y con deuda. Al precio de hoy el mercado ya no pide más de lo que damos en el caso base, pero tampoco hay margen de seguridad.',
  vision_diferencial: {
    mercado_descuenta: 'Un crecimiento del 6,9 % anual hasta 2035 (DCF inverso), muy cerca del nuestro. Los analistas, con BPA sin PTC, dan un objetivo de 326,55 EUR [D].',
    nuestra_vision: 'BPA de 2028e un 9 % por debajo del consenso por las acciones nuevas y la amortización del precio de PTC.',
    por_que: 'La empresa vende PTC como acrecitiva «antes de la amortización del precio de compra», pero su propio BPA ajustado sí la resta [D].',
  },
  a_favor: [
    '**Crecimiento orgánico del 16,9 %** en el 3T26 y guía subida dos veces [A].',
    '**Centros de datos** creciendo a tres cifras [A].',
    '**PER de 20,4 veces**, por debajo de su mediana histórica adelantada [D].',
    '**Rating A** confirmado tras PTC [D].',
  ],
  en_contra: [
    '**PTC, cara y con deuda**: 21 veces el EBITA y deuda de ≈2,6 veces el EBITDA al cierre [D].',
    '**Recompras en pausa** en 2027-2028 y dilución del 4,3 % [D].',
    '**ROIC − WACC de 3,5 puntos**: por debajo del umbral de calidad.',
    '**Ventas del presidente** y salida de la directora financiera [C].',
  ],
  que_vigilar: 'Los pedidos de centros de datos, las aprobaciones de PTC y la guía de 2027 (18-feb-2027).',
  cambiaria_recomendacion: [
    'Por debajo de 210,81 EUR la rentabilidad a 12 meses aguantaría un BPA un 10 % menor (límite robusto), si la calidad llega a 5 puntos.',
    'Por encima de 298,64 EUR la regla de 12 meses daría Vender.',
    'Un frenazo de los pedidos de centros de datos bajaría el caso base hacia el bajista.',
  ],
  kpis_seguimiento: [
    { kpi: 'Crecimiento orgánico trimestral', nivel_actual: '+16,9 % (3T26)', umbral_alerta: '< 8 %', por_que: 'El precio descuenta un 6,9 % anual a largo plazo.' },
    { kpi: 'Margen de EBITA ajustado', nivel_actual: '19,3 % (1S26)', umbral_alerta: '< 18,5 %', por_que: 'Base del BPA.' },
    { kpi: 'Deuda neta / EBITDA', nivel_actual: '1,6x (jun-26)', umbral_alerta: '> 3x tras PTC', por_que: 'Rating A.' },
  ],
  confianza: 'Media',
};
