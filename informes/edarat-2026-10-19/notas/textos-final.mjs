// Textos finales del analista (Edarat, corte 2026-10-19): objetivo a 12 meses, riesgos, catalizadores, preguntas y resumen.
// Cifras del motor tal cual (último cálculo); hechos con cita de la letra de la nota.
import * as O from './objetivo.mjs';
import R from './resumen.mjs';

const es = (x, d = 2) => (+x).toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d });
const p = (e, y, k) => es(O.P[e][y][k], 1);

const objetivo_12m = {
  ejercicio: '2028e',
  casos: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: O.bpa.Bajista, multiplo: null, precio: null, justificacion: `MIS frena, las GPU se alquilan a medias y la nube sigue sin margen: ventas de ${p('Bajista', '2027e', 'ventas')} M SAR en 2027e (+30 %) y ${p('Bajista', '2028e', 'ventas')} M en 2028e (+8 %), margen EBITDA del 26,5 %: EBITDA de ${p('Bajista', '2028e', 'ebitda')} M, amortización de las GPU ya compradas (${p('Bajista', '2028e', 'amortizacion')} M, la misma que en el base), resultado financiero de −3 M y zakat del 8,5 %: beneficio ≈ ${p('Bajista', '2028e', 'beneficio')} M sobre 7,545 M acciones.` },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: O.bpa.Base, multiplo: null, precio: null, justificacion: `Ventas de ${p('Base', '2028e', 'ventas')} M SAR (+20 % en 2026e, +36 % en 2027e con las GPU y +14 % en 2028e) y margen EBITDA del 31,5 %: EBITDA de ${p('Base', '2028e', 'ebitda')} M, amortización de ${p('Base', '2028e', 'amortizacion')} M (11,5 %), EBIT de ${p('Base', '2028e', 'ebit')} M, resultado financiero de −3 M (deuda de las GPU) y zakat del 8,5 %: beneficio ≈ ${p('Base', '2028e', 'beneficio')} M. Cuadra con 2025: EBIT de 40,55 M − 0,83 M financieros − 3,38 M de zakat = 36,34 M.` },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: O.bpa.Alcista, multiplo: null, precio: null, justificacion: `Más proyectos de IA y GPU llenas: ventas de ${p('Alcista', '2028e', 'ventas')} M SAR (+42 % y +20 %) con margen EBITDA del 34,5 %: beneficio ≈ ${p('Alcista', '2028e', 'beneficio')} M.` },
  ],
  per_historico: {
    base: 'adelantado', anios: 3, actual: O.actual, mediana_5a: O.mediana, minimo_5a: O.minimo, media_larga: O.media,
    excluidos: `Historia adelantada (cierre de cada año ajustado por las acciones gratuitas ÷ BPA real del año siguiente, reexpresado a 7,545 M acciones): 2023 62,83 ÷ 3,27 = ${es(O.perAdel[0][1])}; 2024 229,27 ÷ 4,82 = ${es(O.perAdel[1][1])}; 2025 159,60 ÷ ${es(O.bpa2026)} (nuestro BPA de 2026e) = ${es(O.perAdel[2][1])}. Excluido 2022 (20,03 ÷ 2,30 = ${es(O.per2022)}): el cierre del 29-dic-2022 llegó tres sesiones después de la salida directa a Nomu, sin descubrimiento de precio. Tres años: mediana ${es(O.mediana)}, mínimo ${es(O.minimo)} y media ${es(O.media)}. PER actual: ${es(O.precio)} ÷ ${es(O.bpa2027)} (nuestro BPA de 2027e) = ${es(O.actual)}.`,
    v2: { mediana_5a: O.v2.mediana, minimo_5a: O.v2.minimo, media_larga: O.v2.media, excluidos: `Al cierre (cierre ÷ BPA del mismo año), sin 2022 (12,0x): ${O.perCierre.map(([a, x]) => `${a} ${es(x, 1)}`).join('; ')}.` },
  },
  comparables_per: { mediana: 16.5 },
  consenso: { bpa_ano1: null, bpa_ano2: null, objetivo_medio: null, objetivo_min: null, objetivo_max: null, analistas: 0, tendencia_3m: null, fuente: 'Sin cobertura de analistas (Yahoo, MarketScreener, Argaam) [D3]' },
  diferencia_consenso: 'No hay consenso con el que comparar: ningún analista publica estimaciones de Edarat. El contraste es el propio precio: a 275,40 SAR el mercado paga 43 veces nuestro BPA de 2027e, que ya incluye el salto de las GPU.',
  media: null,
  comentario: null,
};

const riesgos = {
  items: [
    { riesgo: 'Dependencia de MIS, accionista del 30 % y cliente del 55 % de las ventas del 1S26', tipo: 'Cliente', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−30 % a −50 % del beneficio si MIS reduce sus proyectos', mitigante: 'Contrato de 200 MW adjudicado en sep-2026 (varios años de trabajo) y clientes de colocation a 3-5 años (Mobily, SenseTime, Edge Network) [D10, B8, B9, B10].', senal: 'Ventas a MIS por debajo del 30 % del total sin otros clientes que lo compensen; saldo de MIS por encima de 60 M SAR' },
    { riesgo: 'Las GPU no se alquilan o se alquilan barato (150 M SAR, más que todo el patrimonio)', tipo: 'Ejecución', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−20 % (30 M al año de amortización sin ventas que la cubran)', mitigante: 'Demanda de IA en Arabia Saudí y soberanía de datos; entrega en cinco fases en seis meses [D11, B1].', senal: 'Sin contratos de GPU anunciados al 1T27; margen EBITDA de 2027 por debajo del 27 %' },
    { riesgo: 'Liquidez de la acción (≈ 1 M SAR al día en Nomu)', tipo: 'Mercado', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: 'Movimientos de ±10 % en un día con pocos miles de acciones', mitigante: 'Paso al mercado principal en marcha (Al Rajhi Capital) [D16].', senal: 'Volumen medio por debajo de 2.000 acciones al día' },
    { riesgo: 'Margen de la nube aplastado por los hiperescaladores y el coste de la colocation', tipo: 'Competencia', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Nube soberana local y VMware de Rackspace para clientes regulados [B11].', senal: 'Margen bruto de la nube por debajo del 10 % otro semestre' },
    { riesgo: 'Venta de MIS o de los fundadores al pasar al mercado principal (overhang)', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 % a −15 % temporal', mitigante: 'Flotante ya de ≈ 50 %: no hace falta colocación para el paso [D3].', senal: 'Anuncio de colocación o de venta de un accionista principal' },
    { riesgo: 'Operaciones vinculadas en contra del minoritario (MIS, Edarat Lebanon)', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % a −10 %', mitigante: 'Consejo con mayoría independiente desde sep-2026 y aprobación en junta con informe del auditor [C1, A10].', senal: 'Nuevas compras a MIS o precios de proyectos de MIS fuera de mercado' },
    { riesgo: 'Proyectos de centros de datos aplazados por recortes de gasto (petróleo, déficit)', tipo: 'Macroeconómico', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Ingresos recurrentes de nube y colocation (40 % de las ventas) [A3].', senal: 'Menos adjudicaciones de ingeniería en 2027' },
    { riesgo: 'Endeudamiento por las GPU y el límite del préstamo (pasivo / patrimonio tangible ≤ 1,25)', tipo: 'Financiero', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Caja de 36 M a jun-26 y beneficio de ≈ 40 M al año [A2].', senal: 'Pasivo total por encima de 1,1 veces el patrimonio tangible' },
  ],
  premortem: 'Octubre de 2029: Edarat vale un 60 % menos. Lo que pasó: MIS terminó el diseño del centro de 200 MW y no adjudicó otro; sus nuevos proyectos fueron a una ingeniería global que el operador final prefería. Las ventas de ingeniería volvieron a 60 M SAR al año. Las GPU, compradas en 2026 a precios de máximo, se alquilaron a la mitad de lo previsto porque los hiperescaladores abrieron en Riad regiones con GPU más nuevas y baratas; la amortización de 30 M al año se comió el beneficio y Edarat tuvo que renegociar el préstamo. La nube siguió con márgenes de un dígito. El beneficio cayó a 20 M y el mercado, que pagaba 43 veces, pasó a pagar 15, como las ingenierías. Al pasar al mercado principal, MIS vendió parte de su 30 % y la acción, sin compradores naturales, cayó más. La señal que nadie quiso leer: el 55 % de las ventas del 1S26 a MIS y el margen de la nube en el 7,6 %.',
  ia: {
    exposicion: 'Alta', sentido: 'Mixto', efecto_valor: '+20 % / −20 %',
    comentario: 'La IA es el motor de la tesis y su mayor riesgo. Oportunidad: Arabia Saudí construye centros de datos de IA de cientos de megavatios y Edarat diseña uno de 200 MW para MIS (197,8 M SAR con IVA), y la demanda de GPU para entrenar e inferir modelos en el país (soberanía de datos) justifica su plan de 150 M [D10, D11, B1]. Amenaza: el alquiler de GPU es un negocio de capital que se deprecia rápido; si la oferta mundial de GPU sigue creciendo y los hiperescaladores abren regiones en el país, el precio baja y la inversión no se recupera en cinco años [B7]. Además, la IA abarata el diseño y la supervisión de ingeniería a medio plazo. Neto, alta exposición en los dos sentidos (≈ ±20 % del valor). Señal: contratos de GPU firmados y su precio por hora.',
  },
  confianza: 'Media',
};

const catalizadores = {
  items: [
    { fecha: '4T26-1T27', evento: 'Entrega y puesta en marcha de las GPU (cinco fases en seis meses)', efecto: 'Primeros contratos de alquiler de GPU, o su ausencia [D11]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '≈ 9-feb-2027', evento: 'Resultados de 2026', efecto: 'Peso de MIS, margen de la nube y conversión de caja [D14]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2027', evento: 'Paso al mercado principal de Tadawul', efecto: 'Más liquidez y entrada en índices; posible venta de MIS o de los fundadores [D16]', probabilidad: 'Media', sentido: '+/−' },
    { fecha: '2T27', evento: 'Arranque del contrato de Rackspace (VMware, 28,27 M SAR en 42 meses)', efecto: 'Ventas recurrentes de nube [D18]', probabilidad: 'Alta', sentido: '+' },
    { fecha: '2026-2028', evento: 'Ejecución del diseño y la supervisión del centro de IA de 200 MW de MIS', efecto: 'Ingeniería de ≈ 172 M SAR sin IVA en varios años [D10]', probabilidad: 'Alta', sentido: '+' },
    { fecha: '2027', evento: 'Nuevos contratos de ingeniería con clientes distintos de MIS', efecto: 'Bajaría la concentración [B13]', probabilidad: 'Media', sentido: '+' },
  ],
  confianza: 'Media',
};

const preguntas = {
  items: [
    { tema: 'MIS', pregunta: '¿A qué precios se hacen los proyectos de MIS frente a los de otros clientes, y por qué el margen bruto de ingeniería subió al 55 % cuando MIS pasó al 55 % de las ventas?', por_que: 'La mitad del beneficio depende de una vinculada.' },
    { tema: 'GPU', pregunta: '¿Qué clientes y a qué precio por hora van a alquilar las GPU, y con qué contratos?', por_que: '150 M SAR sin cliente anunciado.' },
    { tema: 'Nube', pregunta: '¿Por qué el margen bruto de la nube cayó del 30,5 % al 7,6 % en el 1S26 y a quién se paga la capacidad de colocation?', por_que: 'Es el 40 % de las ventas.' },
    { tema: 'Cobros', pregunta: '¿Cuándo paga MIS los 56,5 M SAR que debe y en qué plazos?', por_que: 'El circulante come el flujo de caja.' },
    { tema: 'Contrato de 200 MW', pregunta: '¿En cuántos años se reconocen los 197,8 M SAR y con qué margen?', por_que: 'Define 2027-2028.' },
    { tema: 'Accionistas', pregunta: '¿Piensan MIS o los fundadores vender al pasar al mercado principal?', por_que: 'Overhang sobre una acción poco líquida.' },
    { tema: 'Edarat Lebanon', pregunta: '¿Qué presta Edarat Lebanon y por qué la empresa no la integra?', por_que: 'Vinculada del consejero delegado.' },
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
  sostenibilidad_justificacion: 'En parte. El crecimiento proyectado (12 % anual en 2027-2032e, con el salto de las GPU) es menor que el de 2021-2025 (+53 % anual) y que el del mercado de centros de datos (13 %), y la cuota pasaría del 2,4 % al ≈ 2,7 % [B1]. Pero no está demostrado que la calidad lo sostenga: no hay foso (sin poder de precios, con el margen de la nube en el 7,6 %), la mitad de las ventas y del margen viene de una vinculada (MIS) y el crecimiento de 2027 depende de 150 M SAR en GPU, más que todo el patrimonio, sin clientes anunciados [A2, D11]. El ROIC histórico es alto (ingeniería con poco capital), pero el capital nuevo es de otra naturaleza.',
};
