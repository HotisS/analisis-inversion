// Textos finales del analista (Almawarid, corte 2026-11-27; tras el 3T26): objetivo a 12 meses, riesgos, catalizadores, preguntas y resumen.
// Cifras del motor tal cual (último cálculo); hechos con cita de la letra de la nota.
import * as O from './objetivo.mjs';
import R from './resumen.mjs';

const es = (x, d = 2) => (+x).toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d });
const p = (e, y, k) => es(O.P[e][y][k], 1);

const objetivo_12m = {
  ejercicio: '2028e',
  base_bpa: 'publicado',
  casos: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: O.bpa.Bajista, multiplo: null, precio: null, justificacion: `La construcción frena, los cobros se alargan y la competencia en particulares (721 oficinas en Musaned) y las tasas aprietan el margen: ventas de ${p('Bajista', '2027e', 'ventas')} M SAR en 2027e (+6 %) y ${p('Bajista', '2028e', 'ventas')} M en 2028e (+4 %), margen EBITDA del 6,6 % (el de 2024): EBITDA de ${p('Bajista', '2028e', 'ebitda')} M, amortización de ${p('Bajista', '2028e', 'amortizacion')} M, resultado financiero de −12 M y zakat del 7 %: beneficio ≈ ${p('Bajista', '2028e', 'beneficio')} M sobre 20 M acciones, por debajo de 2026e.` },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: O.bpa.Base, multiplo: null, precio: null, justificacion: `Ventas de ${p('Base', '2028e', 'ventas')} M SAR (+19 % en 2026e, +11 % en 2027e y +9 % en 2028e) y margen EBITDA del 8,1 %: EBITDA de ${p('Base', '2028e', 'ebitda')} M, amortización de ${p('Base', '2028e', 'amortizacion')} M (1,1 %), EBIT de ${p('Base', '2028e', 'ebit')} M, resultado financiero de −12 M (intereses de las indemnizaciones por cese y de los arrendamientos) y zakat del 7 %: beneficio ≈ ${p('Base', '2028e', 'beneficio')} M. Cuadra con 2025: EBIT de 157,9 M − 8,8 M financieros − 10,7 M de zakat = 138,5 M (cuentas auditadas), y con 2026e: 9M26 de 151,7 M (7,58 SAR) + un 4T26 de ≈ 50 M = ${p('Base', '2026e', 'beneficio')} M [A13, A12]. Frente al 19-oct, el BPA de 2028e baja un 3 % (12,04 → ${es(O.bpa.Base)}).` },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: O.bpa.Alcista, multiplo: null, precio: null, justificacion: `Hostelería, ocio y saudización tiran más y particulares mantiene el margen: ventas de ${p('Alcista', '2028e', 'ventas')} M SAR (+14 % y +12 %) con margen EBITDA del 8,8 %: beneficio ≈ ${p('Alcista', '2028e', 'beneficio')} M.` },
  ],
  per_historico: {
    base: 'adelantado', base_bpa: 'publicado', anios: 3, actual: O.actual, mediana_5a: O.mediana, minimo_5a: O.minimo, media_larga: O.media,
    excluidos: `Historia adelantada (cierre de cada año ajustado por la ampliación gratuita 4:3 de feb-2026 ÷ BPA real del año siguiente, reexpresado a 20 M acciones): 2023 93,60 ÷ 4,77 = ${es(O.perAdel[0][1])}; 2024 79,05 ÷ 6,92 = ${es(O.perAdel[1][1])}; 2025 97,57 ÷ ${es(O.bpa2026)} (nuestro BPA de 2026e) = ${es(O.perAdel[2][1])}. Sin exclusiones: la acción cotiza desde el 19-jun-2023 y el cierre de 2023 llega seis meses después, con el bloqueo de los fundadores ya vencido (18-dic) [D5, C4, D13]. Tres años: mediana ${es(O.mediana)}, mínimo ${es(O.minimo)} y media ${es(O.media)}. PER actual: ${es(O.precio)} ÷ ${es(O.bpa2027)} (nuestro BPA de 2027e) = ${es(O.actual)}.`,
    v2: { mediana_5a: O.v2.mediana, minimo_5a: O.v2.minimo, media_larga: O.v2.media, excluidos: `Al cierre (cierre ÷ BPA del mismo año): ${O.perCierre.map(([a, x]) => `${a} ${es(x, 1)}`).join('; ')}.` },
  },
  comparables_per: { mediana: O.compPer },
  consenso: { bpa_ano1: 9.62, bpa_ano2: 9.86, objetivo_medio: 117.93, objetivo_min: 102, objetivo_max: 133, analistas: 3, tendencia_3m: 'A la baja (126,14 → 117,93 desde el 19-oct)', fuente: 'Yahoo Finance (3 analistas para el objetivo; 1-2 para el BPA) [D3]' },
  diferencia_consenso: `Nuestro BPA de 2026e (${es(O.bpa2026)}) supera al de Yahoo (9,62, un analista): los 9M26 ya suman 7,58 y el 4T25 fue de 1,96 [D3, A12]. Para 2027e estamos un ${es((O.bpa2027 / 9.86 - 1) * 100, 0)} % por encima (${es(O.bpa2027)} frente a 9,86), porque proyectamos +11 % de ventas con el margen de 9M26. El objetivo medio de los analistas (117,93 SAR, +44 %) supone ≈ 12 veces el BPA de 2027e; el nuestro es más prudente porque la regla común, con historia corta, no deja subir el PER.`,
  media: null,
  comentario: null,
};

const riesgos = {
  items: [
    { riesgo: 'Cambios regulatorios del Ministerio de Recursos Humanos: tasas por trabajador extranjero, reglamento de trabajadoras domésticas, Musaned', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 % a −25 % si sube el coste sin poder repercutirlo en contratos de uno a dos años', mitigante: 'Licencia desde 2012; las subidas de tasas se repercuten al renovar (margen bruto de particulares +5,6 puntos en un año); el pago de sueldos por canales oficiales de Musaned (ene-2026) ya está en vigor sin daño visible [A1, B3].', senal: 'Aprobación del nuevo reglamento de trabajadoras domésticas (proyecto de mar-2026) o subida de tasas por trabajador (iqama, permisos)' },
    { riesgo: 'Concentración en construcción (43 % de las ventas del 3T26, −8 % interanual) y en el grupo vinculado Al Ayuni (13,6 % de las ventas de 9M26)', tipo: 'Cliente', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 % a −20 % si los grandes proyectos frenan o Al Ayuni reduce contratos', mitigante: 'Hostelería y ocio (+56 % en el 3T26) y comercio (+129 %) compensan; contratos de uno a dos años; las operaciones con Al Ayuni las aprueba la junta [A12, A9].', senal: 'Ventas a construcción por debajo de 300 M por trimestre (331,6 M en el 3T26); ventas a Al Ayuni y Limak en la junta de 2027' },
    { riesgo: 'Cobros: clientes netos de 491,8 M a sep-2026 (+32 % en nueve meses con ventas +22 %) y provisión de insolvencias de 62,0 M', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % a −10 % (provisiones como las de 2024 y caja retenida)', mitigante: 'Caja e inversiones de 238 M sin deuda; flujo operativo del 77 % del beneficio en 9M26 [A12].', senal: 'Flujo operativo por debajo del 50 % del beneficio un año entero; pérdidas de crédito por encima del 0,5 % de las ventas' },
    { riesgo: 'Competencia en particulares y por horas (721 oficinas locales, Maharah, SMASCO, Tamkeen)', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % a −10 %', mitigante: 'Escala, marca Hemma y app del servicio por horas; margen bruto de particulares del 13,9 % en 9M26 [A12, B2].', senal: 'Margen bruto de particulares por debajo del 10 %' },
    { riesgo: 'Liquidez de la acción y salida de los fundadores (Alomaier y Al-Ayuni, 23,94 % cada uno)', tipo: 'Mercado', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−10 % temporal ante una colocación', mitigante: 'Volumen de ≈ 5,4 M SAR al día; bloqueo vencido en dic-2023 sin ventas conocidas [D2, C4].', senal: 'Anuncio de colocación o de venta de un accionista de referencia' },
    { riesgo: 'Ciclo saudí: petróleo bajo y recorte o aplazamiento del gasto público y de los gigaproyectos', tipo: 'Macroeconómico', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Servicio a particulares y por horas, de demanda estable; Mundial 2034 y Expo 2030 [A1].', senal: 'Adjudicaciones de obra pública en caída dos trimestres seguidos' },
    { riesgo: 'Información incompleta: cuentas anuales auditadas y registro de accionistas no accesibles', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: '±5 %', mitigante: 'Cuentas de 2025 auditadas sin salvedades y 3T26 revisado por BDO, ya en XBRL oficial [A13, A12].', senal: 'Salvedad o párrafo de énfasis en las cuentas de 2026' },
  ],
  premortem: 'Octubre de 2028: Almawarid vale un 40 % menos. Lo que pasó: el Estado recortó los gigaproyectos con el petróleo a 55 USD y la construcción, el 43 % de las ventas, cayó un tercio; miles de trabajadores con visado de la empresa quedaron sin ceder, con su sueldo, su alojamiento y su iqama a cargo de Almawarid. El Ministerio aprobó el nuevo reglamento de trabajadoras domésticas con más derechos y nuevas tasas, que las familias no aceptaron pagar con 721 oficinas compitiendo en Musaned. Al Ayuni, que compraba el 15 % de las ventas, recortó contratos y pagó tarde: las provisiones de insolvencias se dispararon como en 2024. El beneficio volvió a 120 M y el mercado, que pagaba 8 veces, pagó 7. La señal que nadie quiso leer: la construcción plana en ≈ 350 M por trimestre desde 2025 y los clientes creciendo más que las ventas.',
  ia: {
    exposicion: 'Baja', sentido: 'Mixto', efecto_valor: '±5 %',
    comentario: 'La IA no sustituye a un obrero de la construcción, una camarera o una trabajadora doméstica, que son el 90 % del negocio [A1]. Puede ayudar (asignar trabajadores, rutas del servicio por horas, cobros) y puede quitar algo de contratación administrativa de saudíes, que aún es pequeña. Neto, poca exposición (≈ ±5 % del valor).',
  },
  confianza: 'Media',
};

const catalizadores = {
  items: [
    { fecha: '2026-12 a 2027-05', evento: 'Junta extraordinaria de la ampliación gratuita 5 por 4', efecto: 'Sin efecto en el valor; precio y límites ÷ 1,25 [C7, C8]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2027-03-30', evento: 'Resultados de 2026 y dividendo del 2S26', efecto: 'Beneficio ≈ 202 M (4T26 que la dirección espera por encima de los 39,2 M del 4T25) y posible política de dividendos [C10, C6]', probabilidad: 'Alta', sentido: '+' },
    { fecha: '2026-2027', evento: 'Reglamento de trabajadoras domésticas (proyecto de mar-2026)', efecto: 'Más derechos y costes para el servicio a particulares [B3]', probabilidad: 'Media', sentido: '−' },
    { fecha: '2027', evento: 'Junta de 2027: operaciones con Al Ayuni y Limak Al Ayuni', efecto: 'Peso del grupo vinculado [A9]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2027-2030', evento: 'Expo 2030, Mundial 2034 y gigaproyectos', efecto: 'Demanda de hostelería, ocio y construcción [A1]', probabilidad: 'Media', sentido: '+' },
  ],
  confianza: 'Media',
};

const preguntas = {
  items: [
    { tema: 'Al Ayuni', pregunta: '¿A qué precios y márgenes se cede personal a Al Ayuni y a Limak Al Ayuni frente a otros clientes de construcción, y cuánto les queda por cobrar?', por_que: 'El 15 % de las ventas va a un accionista del 23,9 %.' },
    { tema: 'Ocupación', pregunta: '¿Qué ocupación tiene la plantilla cedida (trabajadores con contrato frente a disponibles) y cuántos trabajadores esperan cliente?', por_que: 'Cada punto de ocupación cae casi entero al beneficio.' },
    { tema: 'Construcción', pregunta: '¿Por qué cayeron un 65 % las ventas a Limak Al Ayuni en el 3T26 y qué «situación geopolítica» frena al segmento de empresas?', por_que: 'La construcción es el 43 % de las ventas y fue la primera caída interanual.' },
    { tema: 'Cobros', pregunta: '¿Por qué los clientes netos crecieron un 32 % en nueve meses, más que las ventas, y qué antigüedad tienen?', por_que: 'La caja va por detrás del beneficio.' },
    { tema: 'Regulación', pregunta: '¿Cómo afectaría el nuevo reglamento de trabajadoras domésticas al margen de particulares y a la duración de los contratos?', por_que: 'Particulares y por horas son el 19 % de las ventas y un tercio del margen bruto.' },
    { tema: 'Dividendos', pregunta: '¿Qué política de dividendos estudia el consejo (porcentaje del beneficio, frecuencia)?', por_que: 'Con caja neta y poco capex, el reparto puede subir.' },
    { tema: 'Accionistas', pregunta: '¿Mantienen Alomaier y Al-Ayuni su 23,94 % y piensan vender?', por_que: 'Overhang y control de un grupo vinculado.' },
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
  sostenibilidad_justificacion: R.sostenibilidad_justificacion ?? null,
};
