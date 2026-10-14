// Textos del analista (Danaher, corte 2026-10-14). Sector y ESG reutilizados del análisis de Thermo Fisher de hoy.
import TMO from '../../thermo-fisher-2026-10-14/notas/textos.mjs';
export default {
  limitaciones: 'Análisis hecho desde la nube con la red limitada a la búsqueda web y con un presupuesto corto (≈20 minutos): las cifras salen de extractos de búsqueda de los comunicados, del 10-Q del 2T26 y de Stock Analysis. El precio (215,60 USD) está implícito en la capitalización del 7-oct-2026, no es un cierre del 13-oct. El EBIT y las amortizaciones de 2023-2025 son estimaciones. El PER histórico solo tiene tres años limpios (2023-2025). Sector y comparables se reutilizan del análisis de Thermo Fisher de hoy.',
  controles_explicados: [
    { control: 'Al menos 10 fuentes primarias', explicacion: 'Sin red para abrir sec.gov; las primarias se citan por extracto de búsqueda.' },
  ],
  parches: [], huecos_resueltos: [],
  secciones: {
    sector: TMO.secciones?.sector,
    esg: TMO.secciones?.esg,
  },
  dcf_justificacion: null,
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Sí. El orgánico proyectado (4-6 % desde 2027) es el del mercado de bioprocesado y diagnóstico en recuperación y el de la guía inicial de 2026 (3-6 %), sin ganar cuota; el resto de 2026-27 es Masimo, ya pagado. El capex del 4,5 % de las ventas está por encima de la amortización a partir de 2033 y la reinversión neta es pequeña, así que la prueba de financiación se hace a mano: el flujo libre (5.260 M en 2025) cubre capex, dividendo y la reducción de la deuda de Masimo. No hace falta rebajar el base.',
  dcf_lectura: 'El DCF da un valor muy por debajo del precio con un WACC del 9,2 % y el bono al 5,22 %: como en Thermo Fisher, el mercado paga a Danaher un múltiplo que el flujo libre (≈3,5 % de rentabilidad) no justifica con estos tipos. El DCF inverso exige un crecimiento muy superior al de nuestro base.',
  narrativas: {
    Bajista: 'El bioprocesado no recupera (los retrasos de clientes se repiten), el respiratorio de Cepheid cae y Masimo diluye margen: orgánico del 2 % y un punto y medio menos de margen.',
    Base: 'El orgánico vuelve al 4-5 % en 2027 con la recuperación del bioprocesado (pedidos +mid-teens en el 2T26), Masimo aporta un año completo y el margen sube medio punto al año.',
    Alcista: 'Ciclo fuerte de biológicos (GLP-1, anticuerpos, terapias génicas) y sinergias de Masimo antes de lo previsto: orgánico del 6-7 %.',
  },
  escenarios_comentario: null,
  suma_partes_comentario: 'No aplica: sin resultados por segmento en los extractos.',
  valoracion_comentario: null,
  rentabilidad_comentario: 'Danaher no crea valor sobre el capital total tras sus grandes compras: con 47.414 M de fondo de comercio y 21.358 M de intangibles a junio de 2026, el NOPAT de ≈3.900 M rinde ≈5-6 % sobre ≈80.000 M de capital invertido, por debajo del WACC del 9,2 % [A5]. Sin fondo de comercio, el ROIC operativo es muy alto (los consumibles de bioprocesado tienen márgenes de más del 30 %).',
  diferencia_consenso: null,
  oj: {
    Bajista: 'BPA ajustado de 9,55 USD en 2028e: 8,53 en 2026e (punto medio de la guía) y +6 % anual en 2027-28 (orgánico del 2 % y Masimo).',
    Base: 'BPA ajustado de 10,30 USD en 2028e: 9,40 en 2027e (+10 %: año completo de Masimo y orgánico del 4-5 %) y +9,6 % en 2028e (orgánico del 5 %, margen +0,5 puntos y menos intereses al reducir deuda).',
    Alcista: 'BPA ajustado de 10,90 USD en 2028e: orgánico del 6-7 % y sinergias de Masimo adelantadas.',
  },
  catalizadores: { items: [
    { fecha: '21-oct-2026', evento: 'Resultados del 3T26', efecto: 'Guía de orgánico del 2-3 % en el trimestre; la clave son los pedidos de bioprocesado y si los ≈100 M de resinas siguen en 2027 [A4].', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Ene-2027', evento: 'Guía de 2027', efecto: 'Primera guía con Masimo un año completo; nuestro base pide ≈9,40 USD de BPA.', probabilidad: 'Alta', sentido: '+/−' },
  ] },
  riesgos: { items: [
    { riesgo: 'Retrasos de bioprocesado que se repiten', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: 'Bajista del objetivo a 12 meses', mitigante: 'Pedidos +mid-teens en el 2T26 [A4].', senal: 'Pedidos por debajo de las ventas dos trimestres.' },
    { riesgo: 'Masimo diluye rentabilidad y distrae', tipo: 'Ejecución', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '≈−5 % si el BPA de 2027e queda en 9,0 USD', mitigante: 'Danaher Business System; historial de integración (Cytiva, Pall).', senal: 'Margen de Diagnóstico a la baja.' },
    { riesgo: 'Caída del respiratorio de Cepheid', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Resta 1-1,5 puntos de orgánico', mitigante: 'Base instalada de GeneXpert.', senal: 'Temporada de gripe débil.' },
    { riesgo: 'Deuda de Masimo con tipos altos', tipo: 'Financiero', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'Menos recompras', mitigante: 'FCF de ≈5.300 M al año [A2].', senal: 'Deuda neta/EBITDA > 3x a finales de 2027.' },
  ] },
  preguntas: { items: [
    { tema: 'Bioprocesado', pregunta: '¿Cuánto del retraso de resinas es calendario y cuánto pérdida de cuota?', por_que: 'Decide el orgánico de 2027.' },
    { tema: 'Masimo', pregunta: '¿Cuál es la aportación de Masimo al BPA de 2027?', por_que: 'Decide el BPA de 2027e del base.' },
  ] },
  fuentes: [], huecos: [],
};
