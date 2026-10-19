// Textos finales del analista (Almawarid, corte 2026-10-19): objetivo a 12 meses, riesgos, catalizadores, preguntas y resumen.
// Cifras del motor tal cual (último cálculo); hechos con cita de la letra de la nota.
import * as O from './objetivo.mjs';
import R from './resumen.mjs';

const es = (x, d = 2) => (+x).toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d });
const p = (e, y, k) => es(O.P[e][y][k], 1);

const objetivo_12m = {
  ejercicio: '2028e',
  casos: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: O.bpa.Bajista, multiplo: null, precio: null, justificacion: `La construcción frena, los cobros se alargan y la competencia en particulares (721 oficinas en Musaned) y las tasas aprietan el margen: ventas de ${p('Bajista', '2027e', 'ventas')} M SAR en 2027e (+8 %) y ${p('Bajista', '2028e', 'ventas')} M en 2028e (+5 %), margen EBITDA del 6,5 % (el de 2023-2024): EBITDA de ${p('Bajista', '2028e', 'ebitda')} M, amortización de ${p('Bajista', '2028e', 'amortizacion')} M, resultado financiero de −12 M y zakat del 7 %: beneficio ≈ ${p('Bajista', '2028e', 'beneficio')} M sobre 20 M acciones, por debajo de 2026e.` },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: O.bpa.Base, multiplo: null, precio: null, justificacion: `Ventas de ${p('Base', '2028e', 'ventas')} M SAR (+21 % en 2026e, +13 % en 2027e y +10 % en 2028e) y margen EBITDA del 8,0 %: EBITDA de ${p('Base', '2028e', 'ebitda')} M, amortización de ${p('Base', '2028e', 'amortizacion')} M (1,1 %), EBIT de ${p('Base', '2028e', 'ebit')} M, resultado financiero de −12 M (intereses de las indemnizaciones por cese y de los arrendamientos) y zakat del 7 %: beneficio ≈ ${p('Base', '2028e', 'beneficio')} M. Cuadra con 2025: EBIT de 157,9 M − 8,8 M financieros − 10,7 M de zakat = 138,5 M [A6].` },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: O.bpa.Alcista, multiplo: null, precio: null, justificacion: `Hostelería, ocio y saudización tiran más y particulares mantiene el margen: ventas de ${p('Alcista', '2028e', 'ventas')} M SAR (+16 % y +13 %) con margen EBITDA del 8,7 % (el del 1S26): beneficio ≈ ${p('Alcista', '2028e', 'beneficio')} M.` },
  ],
  per_historico: {
    base: 'adelantado', anios: 3, actual: O.actual, mediana_5a: O.mediana, minimo_5a: O.minimo, media_larga: O.media,
    excluidos: `Historia adelantada (cierre de cada año ajustado por la ampliación gratuita 4:3 de feb-2026 ÷ BPA real del año siguiente, reexpresado a 20 M acciones): 2023 93,60 ÷ 4,77 = ${es(O.perAdel[0][1])}; 2024 79,05 ÷ 6,92 = ${es(O.perAdel[1][1])}; 2025 97,57 ÷ ${es(O.bpa2026)} (nuestro BPA de 2026e) = ${es(O.perAdel[2][1])}. Sin exclusiones: la acción cotiza desde el 19-jun-2023 y el cierre de 2023 llega seis meses después, con el bloqueo de los fundadores ya vencido (18-dic) [D5, C4, D13]. Tres años: mediana ${es(O.mediana)}, mínimo ${es(O.minimo)} y media ${es(O.media)}. PER actual: ${es(O.precio)} ÷ ${es(O.bpa2027)} (nuestro BPA de 2027e) = ${es(O.actual)}.`,
    v2: { mediana_5a: O.v2.mediana, minimo_5a: O.v2.minimo, media_larga: O.v2.media, excluidos: `Al cierre (cierre ÷ BPA del mismo año): ${O.perCierre.map(([a, x]) => `${a} ${es(x, 1)}`).join('; ')}.` },
  },
  comparables_per: { mediana: O.compPer },
  consenso: { bpa_ano1: 9.0, bpa_ano2: 10.31, objetivo_medio: 126.14, objetivo_min: 118.8, objetivo_max: 133, analistas: 4, tendencia_3m: null, fuente: 'Yahoo Finance (4 analistas para el objetivo; 1 para el BPA) [D3]' },
  diferencia_consenso: `Nuestro BPA de 2026e (${es(O.bpa2026)}) supera al de Yahoo (9,00), que es de un solo analista y está desfasado: el 1S26 ya suma 5,11 y AlJazira y GIB esperan 2,45-2,74 SAR solo en el 3T26 [D3, D8, D9]. Para 2027e estamos un ${es((O.bpa2027 / 10.31 - 1) * 100, 0)} % por encima (${es(O.bpa2027)} frente a 10,31). El objetivo medio de los analistas (126,14 SAR, +44 %) supone ≈ 11-12 veces el BPA de 2027e; el nuestro es más prudente porque la regla común no deja subir el PER más de un 10 % en un año.`,
  media: null,
  comentario: null,
};

const riesgos = {
  items: [
    { riesgo: 'Cambios regulatorios del Ministerio de Recursos Humanos: tasas por trabajador extranjero, reglamento de trabajadoras domésticas, Musaned', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 % a −25 % si sube el coste sin poder repercutirlo en contratos de uno a dos años', mitigante: 'Licencia desde 2012; las subidas de tasas se repercuten al renovar (margen bruto de particulares +5,6 puntos en un año); el pago de sueldos por canales oficiales de Musaned (ene-2026) ya está en vigor sin daño visible [A1, B3].', senal: 'Aprobación del nuevo reglamento de trabajadoras domésticas (proyecto de mar-2026) o subida de tasas por trabajador (iqama, permisos)' },
    { riesgo: 'Concentración en construcción (46 % de las ventas del 1S26) y en el grupo vinculado Al Ayuni (15,7 % de las ventas de 2025)', tipo: 'Cliente', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 % a −20 % si los grandes proyectos frenan o Al Ayuni reduce contratos', mitigante: 'Hostelería y ocio (+91 %), comercio y sanidad crecen; contratos de uno a dos años; las operaciones con Al Ayuni las aprueba la junta [A1, A9].', senal: 'Ventas a construcción por debajo de 330 M por trimestre; ventas a Al Ayuni y Limak en la junta de 2027' },
    { riesgo: 'Cobros: clientes y activos de contrato de 699 M (24 % de las ventas) y provisión de insolvencias que sube 6,6 M por semestre', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % a −10 % (provisiones como las de 2024 y caja retenida)', mitigante: 'Caja e inversiones de 233 M sin deuda; clientes grandes y vinculados [A1].', senal: 'Flujo operativo por debajo del 50 % del beneficio un año entero; pérdidas de crédito por encima del 0,5 % de las ventas' },
    { riesgo: 'Competencia en particulares y por horas (721 oficinas locales, Maharah, SMASCO, Tamkeen)', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % a −10 %', mitigante: 'Escala, marca Hemma y app del servicio por horas; margen bruto de particulares del 13,9 % en el 1S26 [A1, B2].', senal: 'Margen bruto de particulares por debajo del 10 %' },
    { riesgo: 'Liquidez de la acción y salida de los fundadores (Alomaier y Al-Ayuni, 23,94 % cada uno)', tipo: 'Mercado', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−10 % temporal ante una colocación', mitigante: 'Volumen de ≈ 7 M SAR al día; bloqueo vencido en dic-2023 sin ventas conocidas [D2, C4].', senal: 'Anuncio de colocación o de venta de un accionista de referencia' },
    { riesgo: 'Ciclo saudí: petróleo bajo y recorte o aplazamiento del gasto público y de los gigaproyectos', tipo: 'Macroeconómico', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Servicio a particulares y por horas, de demanda estable; Mundial 2034 y Expo 2030 [A1].', senal: 'Adjudicaciones de obra pública en caída dos trimestres seguidos' },
    { riesgo: 'Información incompleta: cuentas anuales auditadas y registro de accionistas no accesibles', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: '±5 %', mitigante: 'Intermedios de 2026 revisados por BDO, con el balance de 2025 auditado [A1].', senal: 'Salvedad o párrafo de énfasis en las cuentas de 2026' },
  ],
  premortem: 'Octubre de 2028: Almawarid vale un 40 % menos. Lo que pasó: el Estado recortó los gigaproyectos con el petróleo a 55 USD y la construcción, el 46 % de las ventas, cayó un tercio; miles de trabajadores con visado de la empresa quedaron sin ceder, con su sueldo, su alojamiento y su iqama a cargo de Almawarid. El Ministerio aprobó el nuevo reglamento de trabajadoras domésticas con más derechos y nuevas tasas, que las familias no aceptaron pagar con 721 oficinas compitiendo en Musaned. Al Ayuni, que compraba el 15 % de las ventas, recortó contratos y pagó tarde: las provisiones de insolvencias se dispararon como en 2024. El beneficio volvió a 120 M y el mercado, que pagaba 8 veces, pagó 7. La señal que nadie quiso leer: la construcción plana en ≈ 350 M por trimestre desde 2025 y los clientes creciendo más que las ventas.',
  ia: {
    exposicion: 'Baja', sentido: 'Mixto', efecto_valor: '±5 %',
    comentario: 'La IA no sustituye a un obrero de la construcción, una camarera o una trabajadora doméstica, que son el 90 % del negocio [A1]. Puede ayudar (asignar trabajadores, rutas del servicio por horas, cobros) y puede quitar algo de contratación administrativa de saudíes, que aún es pequeña. Neto, poca exposición (≈ ±5 % del valor).',
  },
  confianza: 'Media',
};

const catalizadores = {
  items: [
    { fecha: '2026-10-28', evento: 'Resultados del 3T26', efecto: 'AlJazira espera 54,8 M (+48 %) y GIB 49 M (+32,5 %); nuestro 2S26 supone ≈ 100 M [D8, D9, D12]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '≈ feb-2027', evento: 'Resultados de 2026 y dividendo del 2S26', efecto: 'Beneficio ≈ 200 M y posible política de dividendos [C6]', probabilidad: 'Alta', sentido: '+' },
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
    { tema: 'Cobros', pregunta: '¿Por qué los clientes y los activos de contrato crecieron 145 M en el 1S26, más que las ventas, y qué antigüedad tienen?', por_que: 'La caja va por detrás del beneficio.' },
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
