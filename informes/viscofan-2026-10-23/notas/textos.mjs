// Textos del analista (Viscofan, corte 2026-10-23, tras los resultados de 9M26). Citas: [A3] = fuente 3 de A.json; [A] = nota A.
export const limitaciones = `Línea cotizada única (Bolsa de Madrid, VIS). Precio de cierre del 22-oct-2026 (54,30 €), anterior a los resultados de 9M26, publicados ese día tras el cierre; el 23-oct abrió a 54,50 € [D]. Acciones: 45,29 M a 30-sep, estimación (46,0 M emitidas menos la autocartera que resulta de las recompras del 3T26) [D]. Viscofan presenta la cuenta por naturaleza: el margen bruto y los días de inventario y de pago se calculan sobre consumos. Reporta un único segmento (NIIF 8): la tabla de divisiones usa la división anterior a 2026 (2022-2025) y las cuatro divisiones nuevas solo tienen datos de 1S26 y 9M26 [B]. El informe de 9M26 no trae estado de flujos: el flujo libre de los últimos 12 meses es a junio [A]. El puente es a 30-sep-2026 con los arrendamientos de junio [D]. La web de Viscofan no envía su certificado intermedio y el 23-oct dejó de responder: el informe de gobierno corporativo, el de remuneraciones y el acta de la junta de 2026 se citan como se leyeron el 6-oct [C]. El consenso es anterior a los resultados [D]. Comparables de otros sectores (ingredientes y envases), al tipo del BCE [D].`;

export const controles_explicados = [
  { control: 'Tipo impositivo efectivo razonable (2025)', explicacion: 'El 10,1 % de 2025 se debe a 18,0 M de activación de bases imponibles negativas en EE. UU.; sin ella habría sido del 20,3 %. No se proyecta: el DCF usa el 21 % en 2026 (20,2 % en 9M26) y sube al 23 %.' },
  { control: 'Regresión múltiplo-crecimiento', explicacion: 'Los comparables son de ingredientes y envases, sin competidores puros cotizados: el crecimiento solo explica el 22 % del múltiplo y no se usa la regresión.' },
];

export const parches = [];

export const dcf_lectura = `El DCF da 63,72 € por acción, un 17,3 % sobre el precio de 54,30 €, con un WACC del 7,42 % y un 75 % del valor en el terminal. El cambio frente al 6-oct tiene dos signos: el margen de 2026 baja (EBITDA de 288,6 M, por debajo de la guía nueva de 290-295 M) y la recuperación al 24 % se retrasa un año; pero la tasa libre pasa al Bund (3,44 %) desde el bono español (4,08 %), y eso pesa más [D]. El DCF inverso dice que a 54,30 € el mercado descuenta un crecimiento negativo (−3,7 % anual) con nuestros márgenes, o una rentabilidad exigida del 8,2 %: el precio no pide nada al crecimiento, pero el valor depende mucho de que el margen vuelva al 23,5-24 %.`;

export const narrativas = {
  Bajista: 'Se repite 2022-2023: energía, pieles y divisa comprimen el margen 2 puntos durante años y un competidor reestructurado (Viskase) vuelve a competir en precio en EE. UU.; Beat\'30 se retrasa y el crecimiento queda en el 3 % anual.',
  Base: 'Las subidas de precio de 2026 recuperan el margen al 23,5 % en 2028 y al 24 % en 2030; volumen al ritmo del mercado y Beat\'30 ejecutado a tiempo, con un crecimiento medio del 4,6 %.',
  Alcista: 'Beat\'30 se cumple casi entero: nueva capacidad de colágeno y celulósica, ahorros en Chequia y Nueva Jersey y margen del 25 %.',
};

export const escenarios_comentario = `La asimetría es favorable: el alcista vale 70,23 € (+29,3 %) y el bajista 44,65 € (−17,8 %), con el base en 63,72 € (+17,3 %). El bajista no es teórico: es lo que pasó en 2022-2023 y lo que la guía rebajada sugiere para 2026 si las coberturas de energía y el dólar no ayudan en el 4T.`;

export const valoracion_comentario = `Pesos: DCF 40 %, escenarios 30 %, comparables 20 % y transacciones 10 %. El valor intrínseco es de 60,80 € (+12,0 %). La recomendación la decide el objetivo a 12 meses por PER (regla v3): +18,3 % ponderado y +20,8 % en el caso base, con el valor intrínseco por encima del precio: Comprar. Pero la historia al cierre (v2, control) da +13,6 % y un BPA un 10 % menor la deja en +6,5 %: es una compra frágil.`;

export const diferencia_consenso = 'Nuestro BPA de 2028e (3,91 €) queda un 6,5 % por debajo del consenso (4,18 €), que es de antes de la rebaja de la guía: proyectamos un EBITDA de 2026 por debajo del rango nuevo y una recuperación del margen más lenta. Nuestro precio base a 12 meses (63,34 €) queda un 6,7 % por debajo del objetivo medio de los analistas (67,90 €) [D].';

export const objetivo12m_comentario = 'El objetivo a 12 meses ponderado (61,93 €; base 63,34 €) y el valor intrínseco (60,80 €) están cerca: las dos vías dicen que la acción vale un 12-17 % más que el precio. La rentabilidad viene de un PER de 16 veces (por debajo de su mediana de 17,3) sobre un BPA que vuelve a crecer en 2027-2028 con el margen. Con la historia al cierre (v2) la rentabilidad es del +13,6 %, por debajo del 15 %.';

export const catalizadores = {
  items: [
    { fecha: 'Dic-2026', evento: 'Dividendo a cuenta de al menos 1,40 €', efecto: 'Rentabilidad por dividendo de más del 5 % con el complementario', probabilidad: 'Alta', sentido: '+' },
    { fecha: 'Feb-2027', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Prueba de si el 4T alcanza los 82-87 M de EBITDA que pide la guía; el segundo año de Beat\'30', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2027', evento: 'Subidas de precio de mayo-junio de 2026 a año completo', efecto: 'Margen EBITDA hacia el 23 %', probabilidad: 'Media', sentido: '+' },
    { fecha: '2028', evento: 'Planta de České Budějovice en marcha', efecto: 'Capacidad y ahorros de coste', probabilidad: 'Media', sentido: '+' },
    { fecha: '2026-2027', evento: 'Cortos (3,1 % del capital) y salida del STOXX Europe 600', efecto: 'Presión técnica; una recompra de cortos tras un buen 4T empujaría al alza', probabilidad: 'Media', sentido: '+/−' },
  ],
  confianza: 'Media',
};

export const riesgos = {
  items: [
    { riesgo: 'El margen no se recupera (energía, pieles, divisa)', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−24 % a 12 meses (bajista: 41,93 €)', mitigante: 'Subidas de precio ya aplicadas; margen bruto del 3T26 +0,3 puntos', senal: 'Margen EBITDA trimestral por debajo del 21 % dos trimestres' },
    { riesgo: 'Guía de 2026 incumplida por segundo año (el 4T necesita +15-22 % de EBITDA)', tipo: 'Gestión', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'El dólar ya suma en el 3T', senal: 'EBITDA de 2026 por debajo de 290 M' },
    { riesgo: 'Competencia en precio en EE. UU. (Viskase reestructurada o vendida)', tipo: 'Mercado', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−10 %', mitigante: 'Viskase pierde volumen por capacidad', senal: 'Precios a la baja en celulósica en EE. UU.' },
    { riesgo: 'Danville (EE. UU.): riesgo medioambiental y reputacional tras el informe de Hunterbrook', tipo: 'ESG', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'No consta demanda; solo una sanción laboral de OSHA en 2024', senal: 'Actuación de la EPA o demandas' },
    { riesgo: 'Circulante creciente (50,5 % de las ventas)', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−2 a −3 %', mitigante: 'Objetivo retributivo de reducción de existencias', senal: 'Existencias por encima de 450 M' },
  ],
  premortem: 'Octubre de 2028: la acción vale 40 €. El gas siguió caro en 2027, las pieles subieron y el dólar volvió a caer; Viscofan subió precios tarde y el margen se quedó en el 21 %. La guía se rebajó por tercer año y el PER bajó a 12 veces. La señal: un margen bruto trimestral por debajo del 65 % dos trimestres seguidos.',
  confianza: 'Media',
};

export const preguntas = {
  items: [
    { tema: 'Guía', pregunta: '¿Cómo se llega a 82-87 M de EBITDA en el 4T26 con más de 5 M de coste de coberturas?', por_que: 'Es un 15-22 % más que el 4T25 tras un 3T plano [A].' },
    { tema: 'Precio', pregunta: '¿Cuánto suman las subidas de precio de mayo-junio y cuánto falta por repercutir de la energía?', por_que: 'Decide la vuelta del margen al 23-24 % [A].' },
    { tema: 'Circulante', pregunta: '¿Por qué las existencias suben un 13,6 % en nueve meses?', por_que: 'El circulante ya es la mitad de las ventas [A].' },
    { tema: 'NIIF 18', pregunta: '¿Adoptará la NIIF 18 en 2026 y cómo cambia el EBITDA?', por_que: 'Llevaría las diferencias de cambio a las líneas operativas [A].' },
    { tema: 'Cortos', pregunta: '¿Hay algo en Danville que justifique un 3,1 % del capital en cortos?', por_que: 'Cuatro fondos están cortos [D].' },
  ],
  confianza: 'Media',
};

export const resumen = {
  recomendacion: 'Comprar',
  conviccion: 'Baja',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis: `**La recomendación y por qué.** Comprar, con convicción baja. El objetivo a 12 meses da un +18,3 % ponderado con dividendo y un +20,8 % en el caso base (63,34 €) sobre el cierre del 22-oct (54,30 €), y el valor intrínseco (60,80 €) está un 12 % por encima del precio. La convicción es baja porque la compra es frágil: con la historia al cierre (v2) la rentabilidad baja al +13,6 % y con un BPA un 10 % menor al +6,5 %; la subiría un 4T26 que cumpla la guía y la bajaría una tercera rebaja.

**Qué ha pasado en 9M26.** Ingresos de 965,4 M (+3,1 %; +4,5 % comparable), con un 3T récord (335,7 M, +5,5 %). EBITDA de 207,7 M (−4,9 %; +1,6 % comparable) y margen del 21,5 %: la divisa resta 6,2 puntos y la energía 5,1 M en el 3T. Beneficio neto de 111,8 M (+2,9 %). La empresa baja la guía de EBITDA de 2026 a 290-295 M (antes 305-314) y mantiene ingresos y beneficio; dividendo a cuenta de al menos 1,40 € [A].

**El negocio.** Líder mundial de envolturas para embutidos, con ROIC del 16,4 % y deuda bancaria neta de 266,6 M (1,0 veces el EBITDA) [A].

**Valoración.** DCF de 63,72 € (WACC del 7,42 %), escenarios de 44,65 a 70,23 €. Cotiza a 14,7 veces el beneficio de los próximos 12 meses, en línea con comparables de peor calidad y por debajo de su mediana histórica (17,3 veces adelantado) [D].

**En cartera.** La acción robusta es Mantener: no hay nivel de compra al precio de hoy (54,50 €). Ampliar solo por debajo de 52,76 € (B1) o de 50,47 € (A).

**Qué cambiaría la decisión.** Vender por encima de 71,35 €; comprar con más convicción por debajo de 50,47 €.`,
  tesis: 'Viscofan es el líder de un nicho con barreras (envolturas de celulosa y colágeno), con un ROIC del 16 % y caja estable. Cotiza barata frente a su historia porque el margen lleva dos años bajo por energía y divisa y porque la dirección ha rebajado la guía dos octubres seguidos. Si el margen vuelve al 23,5 % en 2028, el BPA crece un 5-6 % al año y el PER vuelve a 16 veces.',
  vision_diferencial: {
    mercado_descuenta: 'Que el margen se queda bajo: a 54,30 € el precio no pide crecimiento (DCF inverso negativo) y hay un 3,1 % del capital en cortos [D].',
    nuestra_vision: 'El margen se recupera, pero más despacio que lo que dice el consenso: BPA de 2028e de 3,91 € frente a 4,18 €.',
    por_que: 'Las subidas de precio de mayo-junio ya se notan en el margen bruto del 3T26 y el dólar ha dejado de restar; el coste de la energía es temporal [A].',
  },
  a_favor: [
    '**3T récord en ingresos**: 335,7 M, +5,5 % [A].',
    '**Valor intrínseco por encima del precio**: 60,80 € (+12,0 %).',
    '**ROIC del 16,4 %** frente a un WACC del 7,4 %.',
    '**Dividendo**: a cuenta de al menos 1,40 € en diciembre y recompras de 99,7 M en nueve meses [A].',
    '**PER bajo para su historia**: 14,7 veces frente a una mediana adelantada de 17,3 [D].',
  ],
  en_contra: [
    '**Segunda rebaja de la guía de EBITDA** en dos años [C].',
    '**El 4T26 exige mucho**: +15-22 % de EBITDA [A].',
    '**Compra frágil**: la v2 da +13,6 % [D].',
    '**Cortos del 3,1 %** del capital [D].',
    '**Circulante** en el 50,5 % de las ventas [D].',
  ],
  que_vigilar: 'El margen EBITDA del 4T26 (resultados de febrero de 2027) y la guía de 2027. Si el margen no vuelve por encima del 22,5 %, el caso base se acerca al bajista.',
  cambiaria_recomendacion: [
    'Por encima de 71,35 € la regla de 12 meses daría Vender.',
    'Por debajo de 50,47 € la compra sería robusta (nivel A).',
    'Un EBITDA de 2026 por debajo de 290 M rebajaría el caso base.',
  ],
  kpis_seguimiento: [
    { kpi: 'Margen EBITDA trimestral', nivel_actual: '21,9 % (3T26)', umbral_alerta: '< 21 %', por_que: 'Decide la recuperación del BPA.' },
    { kpi: 'Crecimiento comparable de ingresos', nivel_actual: '+3,9 % (3T26)', umbral_alerta: '< 3 %', por_que: 'Volumen y precio.' },
    { kpi: 'Deuda bancaria neta', nivel_actual: '266,6 M (sep-26)', umbral_alerta: '> 300 M', por_que: 'Recompras y circulante.' },
    { kpi: 'Posiciones cortas (CNMV)', nivel_actual: '3,1 %', umbral_alerta: '> 4 %', por_que: 'Presión y riesgo de noticia.' },
  ],
  confianza: 'Media',
};
