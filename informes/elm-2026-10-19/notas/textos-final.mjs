// Textos finales del analista (Elm, corte 2026-10-19): objetivo a 12 meses, riesgos, catalizadores, preguntas y resumen.
// Cifras del motor tal cual (último cálculo); hechos con cita de la letra de la nota.
import * as O from './objetivo.mjs';
import R from './resumen.mjs';

const es = (x, d = 2) => x.toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d });
const p = (e, y, k) => O.P[e][y][k].toLocaleString('es-ES');

const objetivo_12m = {
  ejercicio: '2028e',
  casos: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: O.bpa.Bajista, multiplo: null, precio: null, justificacion: `El Estado aprieta y la IA vacía parte del BPO: ventas de ${p('Bajista', '2027e', 'ventas')} M SAR en 2027e (+5 %) y ${p('Bajista', '2028e', 'ventas')} M en 2028e (+4,5 %), margen EBITDA del 21,3 %: EBITDA de ${p('Bajista', '2028e', 'ebitda')} M, amortización del 3,2 %, EBIT de ${p('Bajista', '2028e', 'ebit')} M, resultado financiero de +40 M y zakat del 6 %: beneficio ≈ ${p('Bajista', '2028e', 'beneficio')} M sobre 78,0 M acciones.` },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: O.bpa.Base, multiplo: null, precio: null, justificacion: `Ventas de ${p('Base', '2028e', 'ventas')} M SAR (+15 % en 2026e, +9 % en 2027e y +8,5 % en 2028e) y margen EBITDA del 24,3 %: EBITDA de ${p('Base', '2028e', 'ebitda')} M, amortización de 412 M, EBIT de ${p('Base', '2028e', 'ebit')} M, resultado financiero de +40 M y zakat del 6 %: beneficio ≈ ${p('Base', '2028e', 'beneficio')} M. Cuadra con 2025: EBIT de 2.030 M + 106 M financieros − 46 M de zakat = 2.090 M.` },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: O.bpa.Alcista, multiplo: null, precio: null, justificacion: `Más organismos con plataformas de reparto de ingresos y la IA abaratando costes: ventas de ${p('Alcista', '2028e', 'ventas')} M SAR (+12 % y +11,5 %) con margen EBITDA del 25,8 %: beneficio ≈ ${p('Alcista', '2028e', 'beneficio')} M, un 3 % por debajo del consenso (38,83 SAR de BPA en 2028e).` },
  ],
  per_historico: {
    base: 'adelantado', actual: O.actual, mediana_5a: O.mediana, minimo_5a: O.minimo, media_larga: O.media,
    excluidos: `Historia adelantada desde la salida a bolsa (feb-2022; cierre de cada año ÷ BPA diluido real del año siguiente): 2022 332 ÷ 16,95 = ${es(O.perAdel[0][1])}; 2023 815 ÷ 23,44 = ${es(O.perAdel[1][1])}; 2024 1.115 ÷ 26,80 = ${es(O.perAdel[2][1])}; 2025 748 ÷ ${es(O.bpa2026)} (nuestro BPA de 2026e) = ${es(O.perAdel[3][1])}. Ningún año excluido: sin pérdidas ni BPA atípico. Cuatro años: mediana ${es(O.mediana)}, mínimo ${es(O.minimo)} y media ${es(O.media)}. PER actual: ${es(O.precio)} ÷ ${es(O.bpa2027)} (nuestro BPA de 2027e) = ${es(O.actual)}.`,
    v2: { mediana_5a: O.v2.mediana, minimo_5a: O.v2.minimo, media_larga: O.v2.media, excluidos: `Al cierre (cierre ÷ BPA del mismo año): ${O.perCierre.map(([a, x]) => `${a} ${es(x, 1)}`).join('; ')}.` },
  },
  comparables_per: { mediana: 12.05 },
  consenso: { bpa_ano1: 29.71, bpa_ano2: 33.74, objetivo_medio: 748.77, objetivo_min: null, objetivo_max: null, analistas: 11, tendencia_3m: 'recortes', fuente: 'MarketScreener (estimaciones y objetivo medio de 11 analistas, 19-oct-2026), Simply Wall St y MarketScreener (recortes de objetivos) [D2, D3, D18]' },
  diferencia_consenso: `Nuestro BPA de 2027e (${es(O.bpa2027)}) queda un 9 % por debajo del consenso (33,74) y el de 2028e (${es(O.bpa.Base)}), un 14 % por debajo (38,83) [D2]. La diferencia es de crecimiento, no de margen: el consenso espera ventas de 14.203 M SAR en 2028e (+14 % anual desde 2025) y nosotros 12.873 M; el margen EBITDA es casi igual (24,7 % frente a 24,3 %). Bajamos el crecimiento porque el orgánico del 2T26 fue de ≈ 7 %, las adjudicaciones de proyectos se frenan con la priorización del gasto público y la IA amenaza el BPO [A10, D14]. El objetivo medio (748,77 SAR) equivale a 22 veces el BPA de 2027e del consenso; la regla común parte del PER actual (17,8 veces) y solo lo deja subir un 10 %.`,
  media: null,
  comentario: null,
};

const riesgos = {
  items: [
    { riesgo: 'Renovación de contratos con el Estado con menos reparto de ingresos, o plataformas que pasan a manos públicas', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−30 % (escenario bajista frente al base del DCF)', mitigante: 'Diez años operando Absher, Muqeem y Tamm; el PIF como accionista y la integración técnica, cara de sustituir [B4, C8].', senal: 'Cambios de tasas o de reparto al renovar; plataformas de SDAIA o de otras empresas del PIF que solapen las de Elm' },
    { riesgo: 'IA generativa que sustituye trabajo de externalización y desarrollo', tipo: 'Tecnológico', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Nuha, diez servicios de IA en producción y alianza con Humain; el BPO aporta solo el 13 % del margen bruto [B5, B9, A1].', senal: 'Ventas del BPO a la baja dos trimestres seguidos o contratos de centros de servicio no renovados' },
    { riesgo: 'Priorización del gasto público y déficit: menos proyectos y cobro más lento', tipo: 'Macroeconómico', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Las tasas de plataforma (seis primeros productos +14 % en el 1S26) no dependen del presupuesto; 4.800 M adjudicados en el 2T26 [A10].', senal: 'Días de cobro por encima de 180 o flujo operativo anual por debajo del 85 % del beneficio' },
    { riesgo: 'Thiqah no llega al margen del grupo', tipo: 'Ejecución', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Beneficio de 1 M en el 2T26 tras perder 177 M en 2025 [A10, A11].', senal: 'Vuelta a pérdidas de Thiqah en 2026-2027' },
    { riesgo: 'Operaciones vinculadas con el PIF en contra del minoritario', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % a −10 %', mitigante: 'Aprobación en junta y opinión de la comisión de auditoría [C4, C6].', senal: 'Nueva compra a una empresa del PIF a un múltiplo alto' },
    { riesgo: 'Riesgo geopolítico del Golfo (Irán) y del petróleo', tipo: 'País', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−10 %', mitigante: 'Ingresos en SAR por tasas recurrentes; caja neta [D15].', senal: 'Ataques en el Golfo; el 1-mar-2026 la acción cayó un 9 % [D17, D1]' },
  ],
  premortem: 'Octubre de 2029: Elm vale la mitad. Lo que pasó: con el petróleo bajo y el déficit, el Estado recortó proyectos y empezó a renegociar el reparto de ingresos de sus plataformas al renovar los contratos; el Ministerio de Comercio y SASO fueron la excepción, no la regla. SDAIA y Humain llevaron dentro servicios que antes operaba Elm, y la IA generativa redujo a la mitad los centros de servicio de la externalización. Thiqah nunca pasó del 5 % de margen. El crecimiento cayó al 3 % y el margen EBITDA al 20 %; el beneficio se estancó en 2.000 M SAR y el mercado, que ya pagaba 18 veces, pasó a pagar 13, como los contratistas públicos de EE. UU. La señal que nadie quiso leer: el flujo operativo del 35 % del beneficio en el 1S26 y la compra de Thiqah al PIF.',
  ia: {
    exposicion: 'Media', sentido: 'Mixto', efecto_valor: '−10 %',
    comentario: 'La IA toca dos partes muy distintas de Elm. Amenaza: la externalización (2.558 M SAR, el 27 % de las ventas, aunque solo el 13 % del margen bruto) es en buena parte trabajo de centros de servicio y atención que los agentes de IA automatizan, y los proyectos y servicios profesionales venden horas de desarrollo que la IA abarata; además, el Estado puede montar servicios propios con SDAIA y Humain [A1, B9]. Oportunidad: las plataformas de tasas (Absher, Muqeem, Tamm) no cobran por trabajo humano sino por trámite, y Elm tiene datos públicos únicos, su propio modelo en árabe (Nuha) y diez servicios de IA en producción [B5, B9]. Neto, una amenaza moderada (≈ −10 % del valor en 3-5 años, dentro del bajista). Señal: ventas del BPO o contratos de centros de servicio a la baja.',
  },
  confianza: 'Media',
};

const catalizadores = {
  items: [
    { fecha: '≈ 2-nov-2026', evento: 'Resultados del 3T26', efecto: 'Crecimiento orgánico, margen y, sobre todo, conversión de caja frente a la guía del 85-95 % [D8, D9, C10]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'mar-2027', evento: 'Resultados de 2026, guía de 2027 y dividendo del 2S26', efecto: 'Primera guía sin el efecto de la consolidación de Thiqah [C10]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2026-2027', evento: 'Nuevos contratos de plataformas con reparto de ingresos', efecto: 'Ampliar el modelo de Comercio y SASO a más organismos [D10, D11]', probabilidad: 'Media', sentido: '+' },
    { fecha: '2027', evento: 'Margen de Thiqah', efecto: 'Si llega al 10-15 % de margen EBIT, sube el margen del grupo [A10]', probabilidad: 'Media', sentido: '+' },
    { fecha: '2027-2030', evento: 'Renovación de los grandes contratos con el Ministerio del Interior', efecto: 'Riesgo de menos reparto o de cambio de operador [B11]', probabilidad: 'Media', sentido: '−' },
  ],
  confianza: 'Media',
};

const preguntas = {
  items: [
    { tema: 'Contratos con el Estado', pregunta: '¿Cuándo vencen los contratos de Absher, Muqeem y Tamm y qué porcentaje de las tasas se queda Elm en cada uno?', por_que: 'Es el riesgo central: el reparto lo fija el Estado.' },
    { tema: 'Caja', pregunta: '¿Por qué el flujo operativo del 1S26 fue el 35 % del beneficio y qué organismos pagan tarde?', por_que: 'La guía pide un 85-95 % para el año.' },
    { tema: 'Crecimiento orgánico', pregunta: '¿Cuánto crecieron las ventas sin Thiqah ni Sahel en el 1S26 y por segmento?', por_que: 'Nuestro base supone ≈ 9 %; el consenso más.' },
    { tema: 'Thiqah', pregunta: '¿Qué margen EBIT espera de Thiqah en 2027 y por qué se rebajaron 311 M sus activos netos tras la compra?', por_que: 'Pagó 3.386 M SAR al PIF por una empresa con pérdidas.' },
    { tema: 'IA', pregunta: '¿Qué parte del BPO se puede automatizar y qué hará con los centros de servicio?', por_que: 'Es el negocio más expuesto a la IA.' },
    { tema: 'Capital', pregunta: '¿Hay más compras previstas a empresas del PIF?', por_que: 'Operaciones vinculadas con el accionista de control.' },
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
