// Textos finales del analista (solutions by stc, corte 2026-10-20): objetivo a 12 meses, riesgos, catalizadores, preguntas y resumen.
// Cifras del motor tal cual (último cálculo); hechos con cita de la letra de la nota.
import * as O from './objetivo.mjs';
import R from './resumen.mjs';

const es = (x, d = 2) => x.toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d });
const p = (e, y, k) => O.P[e][y][k].toLocaleString('es-ES');

const objetivo_12m = {
  ejercicio: '2028e',
  casos: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: O.bpa.Bajista, multiplo: null, precio: null, justificacion: `La IA abarata el desarrollo y los centros de contacto, la Administración recorta y stc aprieta precios: ventas de ${p('Bajista', '2027e', 'ventas')} M SAR en 2027e (+4 %) y ${p('Bajista', '2028e', 'ventas')} M en 2028e (+3,5 %), margen EBITDA del 13,4 %: EBITDA de ${p('Bajista', '2028e', 'ebitda')} M, amortización del 2,9 %, EBIT de ${p('Bajista', '2028e', 'ebit')} M, resultado financiero de −10 M, zakat del 8,5 % y minoritarios: beneficio ≈ ${p('Bajista', '2028e', 'beneficio')} M sobre 240 M acciones.` },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: O.bpa.Base, multiplo: null, precio: null, justificacion: `Ventas de ${p('Base', '2028e', 'ventas')} M SAR (+7,5 % en 2026e, +7 % en 2027e y +6,5 % en 2028e) y margen EBITDA del 15,4 %: EBITDA de ${p('Base', '2028e', 'ebitda')} M, amortización de 452 M, EBIT de ${p('Base', '2028e', 'ebit')} M, resultado financiero de −10 M, zakat del 8,5 % y minoritarios de 16 M: beneficio ≈ ${p('Base', '2028e', 'beneficio')} M. Cuadra con 2025: EBIT de 1.641 M + 3 M financieros − 132 M de zakat − 10 M de minoritarios = 1.503 M.` },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: O.bpa.Alcista, multiplo: null, precio: null, justificacion: `Centros de datos e IA de infraestructura aceleran y el ahorro de regalías se queda: ventas de ${p('Alcista', '2028e', 'ventas')} M SAR (+9 % y +8,5 %) con margen EBITDA del 16,4 %: beneficio ≈ ${p('Alcista', '2028e', 'beneficio')} M, cerca del consenso (7,95 SAR de BPA en 2028e) [D2].` },
  ],
  per_historico: {
    base: 'adelantado', actual: O.actual, mediana_5a: O.mediana, minimo_5a: O.minimo, media_larga: O.media,
    excluidos: `Historia adelantada desde la salida a bolsa (dic-2021; cierre de cada año ajustado por la gratuita ÷ BPA real del año siguiente en la base de 240 M acciones): 2021 94,10 ÷ 4,39 = ${es(O.perAdel[0][1])}; 2022 121,40 ÷ 4,97 = ${es(O.perAdel[1][1])}; 2023 174,90 ÷ 6,66 = ${es(O.perAdel[2][1])}; 2024 135,00 ÷ 6,26 = ${es(O.perAdel[3][1])}; 2025 112,55 ÷ ${es(O.bpa2026)} (nuestro BPA de 2026e) = ${es(O.perAdel[4][1])}. Ningún año excluido: el BPA de 2024 lleva ≈ 0,4 SAR de zakat revertido y plusvalía (sin ellos, 2023 daría ≈ 28 veces; la mediana no cambia). Cinco años: mediana ${es(O.mediana)}, mínimo ${es(O.minimo)} y media ${es(O.media)}. PER actual: ${es(O.precio)} ÷ ${es(O.bpa2027)} (nuestro BPA de 2027e) = ${es(O.actual)}.`,
    v2: { mediana_5a: O.v2.mediana, minimo_5a: O.v2.minimo, media_larga: O.v2.media, excluidos: `Al cierre (cierre ÷ BPA del mismo año): ${O.perCierre.map(([a, x]) => `${a} ${es(x, 1)}`).join('; ')}.` },
  },
  comparables_per: { mediana: 10.05 },
  consenso: { bpa_ano1: 6.68, bpa_ano2: 7.45, objetivo_medio: 127.3, objetivo_min: 104.6, objetivo_max: 161.0, analistas: 14, tendencia_3m: 'estable', fuente: 'MarketScreener (estimaciones y objetivo medio de 14 analistas, ya en la base de 240 M acciones, 20-oct-2026) [D2]' },
  diferencia_consenso: `Nuestro BPA de 2027e (${es(O.bpa2027)}) queda un 7 % por debajo del consenso (7,45) y el de 2028e (${es(O.bpa.Base)}), un 8 % por debajo (7,95) [D2]. La diferencia es de margen, no de ventas: el consenso espera ventas de 15.656 M SAR en 2028e (nosotros 15.595 M) con un margen EBITDA del 15,8 % y un margen neto del 12,2 %; nosotros, un 15,4 % y un 11,3 %, con más amortización (arrendamientos de centros de datos) y el zakat del 8,5 % [D2]. Bajamos el margen porque la IA presiona los servicios digitales y los centros de contacto y la mezcla gira hacia la reventa de infraestructura. El objetivo medio (127,30 SAR) equivale a 17 veces el BPA de 2027e del consenso; la regla común parte del PER actual (${es(O.actual, 1)} veces) y solo lo deja subir un 10 %.`,
  media: null,
  comentario: null,
};

const riesgos = {
  items: [
    { riesgo: 'IA generativa que abarata el desarrollo de software y sustituye los centros de contacto', tipo: 'Tecnológico', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−15 %', mitigante: 'Más de la mitad de las ventas es infraestructura (centros de datos, redes, nube), que la IA hace crecer; contrato de supercomputación con Aramco [A2, B8].', senal: 'Servicios digitales y upsource a la baja dos trimestres seguidos (digital −23 % en el 2T26; upsource +0 % en el 1S26)' },
    { riesgo: 'Recorte y retraso del gasto público', tipo: 'Macroeconómico', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Sector privado (+21 % en el 1S26) y cartera de pedidos de 14.500 M SAR [A8, A11].', senal: 'Ventas a la Administración por debajo del 0 % o deudas públicas de más de un año por encima de 500 M' },
    { riesgo: 'stc aprieta precios de transferencia, regalías o contratos', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 % (escenario bajista)', mitigante: 'stc necesita a solutions como su brazo de TI; las regalías se redefinieron en 2026 a favor de solutions [C6].', senal: 'Margen de las ventas a stc o nuevas condiciones del contrato de marca; caída del peso de stc sin sustituto' },
    { riesgo: 'Circulante: cobros públicos que no vuelven', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Caja neta de 693 M SAR a jun-26 y flujo libre del 1S26 de 315 M [D12, A3].', senal: 'Flujo operativo anual por debajo del 60 % del beneficio' },
    { riesgo: 'Riesgo geopolítico del Golfo (Irán) y del petróleo', tipo: 'País', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−10 %', mitigante: 'Ventas en SAR y caja neta [D12].', senal: 'Ataques en el Golfo; el 1-mar-2026 el mercado cayó un 2,2 % y la acción un 6,4 % [D15, D1]' },
    { riesgo: 'Devaluación en Egipto (pulse)', tipo: 'Divisa', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−2 %', mitigante: 'Fuera de Arabia Saudí solo se vende el 6,4 % [A1].', senal: 'Nueva devaluación de la libra egipcia' },
  ],
  premortem: 'Octubre de 2029: solutions vale un tercio menos. Lo que pasó: el Estado, con el petróleo bajo, recortó proyectos y siguió pagando tarde; los agentes de IA vaciaron los centros de contacto de upsource y los clientes exigieron rebajas del 20-30 % en desarrollo. La infraestructura de IA siguió creciendo, pero con márgenes de reventa del 8-10 % y con los hiperescaladores llevándose la nube. stc, presionada en su propio negocio, recuperó margen subiendo regalías y apretando los precios de lo que compra a su filial. El margen EBITDA bajó al 13 % y el beneficio se estancó en 1.400 M SAR; el mercado, que ya pagaba 13 veces, pasó a pagar 10, como Capgemini. La señal que nadie quiso leer: el flujo operativo negativo de 2025 y la caída del 23 % de los servicios digitales en el 2T26.',
  ia: {
    exposicion: 'Alta', sentido: 'Mixto', efecto_valor: '−10 % a −15 %',
    comentario: 'La IA toca a solutions en tres partes. Amenaza directa: los centros de contacto de upsource (2.757 M SAR de ventas en 2025 antes de eliminaciones, ≈ 10 % del grupo neto) son el trabajo que mejor automatizan los agentes de IA, y ya están estancados (+0 % en el 1S26); los servicios digitales (1.983 M, 16 %) venden horas de desarrollo que los asistentes de código abaratan, y cayeron un 23 % en el 2T26 [A8, A2]. Amenaza de precio: los servicios gestionados (34 %) se renegocian con la expectativa de que la IA reduzca personal. Oportunidad: la infraestructura (50 %) crece con la IA: centros de datos, supercomputación para Aramco (1.400 M), redes y ciberseguridad; pero es la parte de menos margen, con mucha reventa [B8, A2]. Neto, una amenaza moderada sobre el margen y el múltiplo más que sobre las ventas (≈ −10-15 % del valor en 3-5 años, recogido en el bajista). Señal: ventas de digital y upsource y margen bruto del grupo.',
  },
  confianza: 'Media',
};

const catalizadores = {
  items: [
    { fecha: '≈ 28-oct-2026', evento: 'Resultados del 3T26', efecto: 'Crecimiento, margen sin la reversión de regalías y flujo operativo; previsiones de beneficio de 419-469 M SAR [D8, D9, D10]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'feb-2027', evento: 'Resultados de 2026, guía de 2027 y dividendo', efecto: 'Primer dividendo en la base nueva de acciones; guía de margen [C8]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '1T27', evento: 'Arranque de Center3 (364 M) y Madares', efecto: 'Ventas de infraestructura y de plataforma con reparto de ingresos [B6, B7]', probabilidad: 'Alta', sentido: '+' },
    { fecha: '2027-2028', evento: 'Salida a bolsa de pulse en el Golfo', efecto: 'Pondría precio a la filial regional [D16]', probabilidad: 'Baja', sentido: '+' },
    { fecha: '2027', evento: 'Presupuesto saudí de 2027', efecto: 'Gasto público del 25,7 % del PIB previsto: ritmo de adjudicaciones [B4]', probabilidad: 'Alta', sentido: '−' },
  ],
  confianza: 'Media',
};

const preguntas = {
  items: [
    { tema: 'IA', pregunta: '¿Cuánto cayeron las ventas y el margen de los servicios digitales y de upsource por la IA y qué plan hay para los centros de contacto?', por_que: 'Son las líneas más expuestas: −23 % y +0 %.' },
    { tema: 'stc', pregunta: '¿Qué margen tienen las ventas a stc frente a las de terceros y cuánto ahorra al año la nueva definición de regalías?', por_que: 'Precios de transferencia con el accionista de control.' },
    { tema: 'Caja', pregunta: '¿Qué organismos deben los 380 M SAR de más de un año y por qué los pasivos de contrato bajaron a la mitad desde 2022?', por_que: 'El flujo operativo de 2025 fue negativo.' },
    { tema: 'Caja en stc Bank', pregunta: '¿Por qué hay 801,6 M SAR de la caja en stc Bank y a qué tipo?', por_que: 'Uso de la caja del minoritario en el grupo.' },
    { tema: 'Margen', pregunta: '¿Qué margen bruto tiene el contrato de Aramco y los centros de datos frente al del grupo (21 %)?', por_que: 'La mezcla gira hacia infraestructura de menos margen.' },
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
  bolsa_contexto: R.bolsa_contexto ?? null,
};
