// Textos del analista (Constellation Software, corte 2026-10-10). Citas: [A3] = fuente 3 de A.json; [D13] = fuente 13 de D.json.
// Las cifras del motor se copian tal cual del último cálculo.
import { resumen as resumenTxt } from './resumen.mjs';
export const resumen = resumenTxt;

export const limitaciones = `Se valora la acción ordinaria de la Bolsa de Toronto (CSU), que cotiza en dólares canadienses; las cuentas están en dólares de EE. UU. Precio, rango de 52 semanas y precios objetivo se convierten a 0,7007 USD por CAD del 9-oct-2026 (Banco de Canadá) [D3]; los cierres de cada ejercicio, al tipo del último día hábil del año [D13]. El precio es el cierre del viernes 9-oct-2026 (3.003,78 CAD = 2.104,75 USD); el corte cae en sábado [D1]. Hay 21,19 M de acciones, sin instrumentos dilutivos [D2]. El puente es del 30-jun-2026: los minoritarios de Topicus y Lumine van a valor de mercado (4.720 M) y el pasivo del IRGA con Joday a su valor contable por fórmula (1.186 M); a la cotización de Topicus ese pasivo valdría 2.347 M, unos 55 USD por acción menos [D5]. Los otros ajustes incluyen 818 M de compras cerradas o comprometidas después del balance, cuyo crecimiento está en la proyección de 2026e [D2]. La cuenta se presenta por naturaleza. La empresa reporta un único segmento (NIIF 8): los segmentos del informe son los tipos de ingreso [A1]. Sin guía de la dirección ni transcripciones gratuitas de las conferencias; consenso y comparables de MarketScreener, con los ingresos contrastados con Yahoo [D6, D7]. Sin calificaciones ESG accesibles ni voto consultivo sobre la remuneración.`;

export const controles_explicados = [
  { control: 'Tipo impositivo efectivo razonable (2023)', explicacion: 'La revaluación del pasivo del IRGA y otras partidas bajo el EBIT no son deducibles: el tipo efectivo sale del 77 %. No se proyecta: el DCF usa un 25 % sobre el EBIT [A2].' },
  { control: 'Tipo impositivo efectivo razonable (2025)', explicacion: 'Mismo motivo: 440 M de revaluación del IRGA y la pérdida de Asseco sin efecto fiscal pleno dejan el tipo en el 37,6 % (353 M sobre 939 M) [A1].' },
  { control: 'Regresión múltiplo-crecimiento explicativa', explicacion: 'Con Guidewire (76 veces el EBITDA) y Enghouse (5 veces) en la muestra, el crecimiento no explica los múltiplos (R² = 0,09); no se usa la regresión.' },
  { control: 'Comparables estables al quitar una empresa', explicacion: 'La mediana del EV/EBITDA de los próximos 12 meses va de 13,1 a 15,2 veces según el comparable que se quite; por eso los comparables pesan solo un 20 % y el texto lo dice.' },
];

const consenso = {
  guidance: `Constellation no publica guía de resultados ni objetivos a medio plazo, y la carta del presidente tampoco da cifras [A11, D5]. Lo único verificable que repite la dirección es su criterio de inversión: dedicar el flujo libre disponible para el accionista (FCFA2S: 2.031 M en los últimos 12 meses) a comprar negocios de software vertical que superen su tasa mínima de rentabilidad, y no recomprar acciones [A10]. Después del 30-jun-2026 cerró o comprometió compras por 818 M [D2]. El consenso de ingresos de 2026e (13.819 M, +18,9 %) supone que el ritmo de compras del primer semestre se mantiene [D6].`,
};

const bolsa = {
  comentario: `**La mitad del valor se fue en nueve meses.** De máximos en mayo de 2025 al mínimo del 17-feb-2026 la acción cayó un 56,4 % en dólares canadienses [D1]. Tres hechos lo explican: el miedo a que la IA generativa abarate el software vertical (el ETF de software IGV llegó a −18 % en el año en marzo de 2026) [B15], la dimisión de Mark Leonard por salud el 25-sep-2025 [C4] y un crecimiento orgánico que bajó al 1 % sin divisa en el 2T26, que costó un −6,8 % el día de resultados [B14]. En 2026 rinde un −9,0 % frente al +12,5 % del S&P/TSX; a diez años, aún un +17,6 % anual frente al +9,4 % [D1]. La volatilidad (44,6 %) es la de una tecnológica pequeña, no la de un grupo de 45.000 M; la beta mensual en dólares frente al S&P 500 (0,69) es baja porque la caída fue propia.`,
};

const multiplos_historicos = {
  comentario: `Constellation cotiza a 15,3 veces el EBITDA de los últimos 12 meses, el mínimo de su década (media de 21,3 veces, mínimo anterior de 16,2) y un 28 % por debajo de la media; el PER de 46,4 veces está un 27 % por debajo de su media (63,8). El descuento tiene causas estructurales: el ROIC ha bajado del 54-68 % de 2016-2018 al 21,7 % de 2025, porque las compras son cada vez mayores y más caras, y el orgánico se ha frenado [A1]. Pero ese ROIC sigue más de doce puntos por encima del WACC. El PER es poco útil: la amortización de intangibles adquiridos (≈1.200 M) y la revaluación del IRGA deprimen el beneficio contable.`,
};

const comparables = {
  criterio: `Nueve compañías de software vertical o de compras de software: las dos filiales cotizadas de Constellation (Topicus y Lumine), dos compounders de software con estrategia de compras (Roper y Vitec), Enghouse (compras de software en Canadá), y cuatro líderes de software vertical en EE. UU. y Canadá (Tyler, Bentley, Guidewire y Descartes) [D8]. Topicus y Lumine son el referente más directo, aunque no independiente. Se excluyó Lagercrantz por industrial. Los EBITDA de Tyler, Bentley, Guidewire y Descartes se ponen en la misma base que el de Constellation, restando los pagos en acciones [D8, D9].`,
  comentario: `Constellation cotiza a 12,5 veces el EBITDA de los próximos 12 meses, por debajo de la mediana de 13,3 veces, pese a crecer más (17,9 % frente a 11,4 %, casi todo comprado) con un margen algo menor (27,6 % frente a 30,2 %). Sus propias filiales cotizan parecido: Topicus a 12,8 veces y Lumine a 9,8 [D8]. La mediana de EV/EBITDA y PER da 2.027,51 USD (−3,7 %). La muestra es frágil: va de Enghouse, que decrece y cotiza a 5,4 veces, a Guidewire, a 56,2 veces, y la mediana se mueve de 13,1 a 15,2 veces según el comparable que se quite. El múltiplo sirve para decir que Constellation no está cara frente al software vertical, no para fijar su valor: el mercado no paga por su crecimiento comprado.`,
};

const transacciones = {
  comentario: `Siete operaciones de software vertical de 2019-2026 con múltiplo publicado, casi todas compras de capital privado de empresas de software financiero analizadas por Centerview en la opinión sobre MeridianLink: mediana de 15,5 veces el EBITDA y prima del 34 % [D10, D11]. Dan 2.137,21 USD por acción (+1,5 %). Para Constellation tienen otra lectura: son los precios contra los que compite al comprar. Sus compras pequeñas se hacen a múltiplos mucho menores (≈1,3 veces las ventas en 2025, estimación propia con las compras y el crecimiento adquirido), pero las grandes (Altera, DerbySoft, Synchronoss) se acercan a los de capital privado [A1, A9]. Con 45.000 M de capitalización y un accionariado disperso, una opa no es realista.`,
};

const identificacion = { sector: 'Tecnología de la información', industria: 'Software' };
export const secciones = { identificacion, consenso, bolsa, multiplos_historicos, comparables, transacciones };

export const dcf_justificacion = {
  crecimiento: `Constellation crece comprando: de 2016 a 2025 los ingresos pasaron de 2.125 a 11.623 M (20,8 % anual), con un orgánico del 2-4 % y el resto adquirido [A1, B2]. El DCF lo trata así: 2026e +18,9 % (fijo: dos trimestres publicados con +19 % y el consenso en 13.819 M) [A9, D6]; luego el crecimiento baja de 14 % en 2027e a 5 % en 2035e, con un orgánico del 3 % y un crecimiento comprado que se reduce de 11 a 2 puntos a medida que el tamaño hace más difícil reinvertir todo el flujo libre. El consenso da +16,7 % en 2027e y +13,6 % en 2028e [D6], algo más que nosotros.`,
  margenes: `Margen EBITDA del 28,0 % todos los años, el de 2025 (28,2 %) y por debajo del 31 % de 2020 [A1]. Las compras recientes tienen márgenes menores (Altera, en hospitales) y la IA puede bajar costes de desarrollo y soporte, pero no hay datos para suponer ninguna de las dos cosas; el consenso da un 27,2 % en 2026e y un 27,4 % en 2027e [D6].`,
  inversion: `La clave del modelo: las adquisiciones son la inversión. Cada punto de crecimiento comprado cuesta ≈1,3 veces las ventas adquiridas (estimación propia: en 2025 compró por 1.579 M y el crecimiento no orgánico fue de ≈11,5 puntos, ≈1.160 M de ventas) [A1, B2]. El capex del DCF suma esas compras, el capex propio (0,6 %) y las altas de derechos de uso (≈1 %): 18,0 % de las ventas en 2026e, que baja al 5,5 % en 2035e. La amortización, sobre todo de intangibles adquiridos (11,9 % de las ventas en 2025), converge al capex. El circulante es negativo (−18 % de las ventas: cobra el mantenimiento por adelantado).`,
  wacc: `Tasa libre del 5,22 %, el Tesoro de EE. UU. a 10 años del 8-oct-2026, porque los flujos están en dólares [D4]. Beta de 0,79: la mensual a 5 años de la acción en dólares frente al S&P 500 (0,69), ajustada por Blume; la semanal da 0,86 [D1]. Prima de mercado del 5,5 %, sin prima adicional (vende en EE. UU., Europa y Canadá). Coste de la deuda del 6,3 % y un 9,4 % de deuda a valor de mercado. WACC del 9,11 %; con la prima implícita del mercado (4,20 %), el 8,18 % [D12].`,
  terminal: `Crecimiento a perpetuidad del 3,0 %: inflación esperada en dólares de unos 2,5 % y un orgánico real pequeño, por debajo de la tasa libre menos medio punto (4,72 %). Supone que, en el largo plazo, Constellation crece como su orgánico y deja de reinvertir con prima. El múltiplo de salida implícito es de 10,7 veces el EBITDA, por debajo de los 15,3 veces de hoy y de la mediana de los comparables.`,
};

export const etapa2_justificacion = `No se usa. El ROIC de 2025 (21,7 %) supera al WACC en más de 12 puntos, pero la proyección explícita ya tiene diez años de crecimiento decreciente: alargarla sería suponer que puede seguir reinvirtiendo miles de millones al año con rentabilidades altas cuando ya hoy compra a precios de capital privado.`;

export const dcf_lectura = `El DCF da 2.484,20 USD por acción (3.545 CAD), un 18,0 % por encima del precio, con un 66 % del valor en el terminal. **El precio descuenta una Constellation que sigue comprando, pero menos que antes.** El DCF inverso dice que, con nuestros márgenes y la misma relación entre crecimiento comprado e inversión, los 2.104,75 USD de hoy suponen un crecimiento anual del 7,4 % de 2027e a 2035e, frente al 9,1 % de nuestro caso base y al 20,8 % de la década pasada; o, con nuestro crecimiento, un margen EBITDA del 25,1 % en vez del 28,0 %. Comprar a este precio rinde un 9,9 % anual si se cumple el caso base, apenas por encima del WACC del 9,1 %. No es un precio exigente para el historial de la empresa, pero tampoco una ganga: el valor depende de que el orgánico no pase a negativo y de que las compras sigan rindiendo por encima del coste de capital. Cada punto menos de crecimiento anual quita unos 223 USD por acción (−9 %).`;

export const narrativas = {
  Bajista: `La IA generativa abarata el software a medida y los clientes renegocian el mantenimiento: el orgánico pasa a negativo (como el −19 % de Altera en el 2T26 o las licencias, −8 % en 2025) [A10, B2], y la competencia del capital privado sube los precios de compra y baja el capital desplegado. Crecimiento 4 puntos menor cada año, margen EBITDA del 25 % y crecimiento a perpetuidad del 2 %.`,
  Base: `Orgánico del 3 % y compras que bajan poco a poco del 11 % al 2 % del crecimiento: ingresos +9,1 % de media en 2027-2035 con un margen EBITDA del 28 %, el de 2025.`,
  Alcista: `El orgánico vuelve al 4-5 % de 2021-2022, la IA baja los costes de desarrollo y soporte de unos 1.700 M de I+D anual, y el capital desplegado sube con compras grandes a buenos precios. Crecimiento 2 puntos mayor y margen del 29 %.`,
};

export const escenarios_comentario = `La asimetría es justa con nuestro coste de capital: el alcista vale 3.131,17 USD (+48,8 %) y el bajista 1.220,49 (−42,0 %), una asimetría de 1,16 veces. El bajista no es cosmético: si el orgánico se vuelve negativo, el modelo de compras también se resiente, porque las empresas que compra pierden valor y el flujo libre que reinvierte baja. La caída de 2025-2026 ya llevó la acción a 2.196 CAD en febrero, cerca de ese escenario [D1]. Con la prima de riesgo que pide hoy el mercado (4,20 %), la asimetría mejora a 2,81 veces y el valor objetivo sube a 2.710,71 USD. El valor ponderado por probabilidad es de 2.297,67 USD.`;

export const valoracion_comentario = `Pesos: DCF 50 %, comparables 20 %, escenarios 20 %, transacciones 10 % y suma de partes 0 %. El DCF manda porque es el único método que separa el crecimiento comprado de su coste: los múltiplos tratan igual a una empresa que crece un 18 % comprando que a otra que crece igual sin invertir. Los comparables pesan menos (20 %) por la fragilidad de la muestra, y las transacciones (10 %) porque son el precio al que compite Constellation al comprar, no una opa probable. La dispersión es moderada: de 2.027,51 USD (comparables) a 2.484,20 USD (DCF), con el precio dentro del rango. El valor objetivo es de 2.320,86 USD (3.312,20 CAD).`;

export const catalizadores = {
  items: [
    { fecha: 'Principios de nov-2026 (estimada)', evento: 'Resultados del 3T26', efecto: 'Crecimiento orgánico tras el 1 % sin divisa del 2T26 y capital desplegado', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Feb-mar 2027', evento: 'Resultados de 2025 completos y carta anual del presidente (la primera sin Mark Leonard)', efecto: 'Cómo explica Mark Miller la estrategia de compras y la IA', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Continuo', evento: 'Compras grandes (como Altera o DerbySoft)', efecto: 'Prueba de que puede reinvertir el flujo libre a buenos precios', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2026-2027', evento: 'Evolución del mantenimiento de Altera (−19 % orgánico en el 2T26)', efecto: 'La compra más grande de los últimos años; su caída arrastra el orgánico del grupo', probabilidad: 'Media', sentido: '−' },
    { fecha: 'Mayo de 2027', evento: 'Junta general', efecto: 'Primer año completo sin Leonard en el consejo; votos de los consejeros', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Sin fecha', evento: 'Posible escisión de otro grupo operativo (como Topicus y Lumine)', efecto: 'Revelaría valor de un grupo por separado', probabilidad: 'Baja', sentido: '+' },
  ],
  confianza: 'Media',
};

export const riesgos = {
  items: [
    { riesgo: 'La IA generativa erosiona el software vertical (menos barreras de entrada, presión sobre el mantenimiento)', tipo: 'Tecnológico', probabilidad: 'Media', impacto: 'Alto', efecto_valor: 'Bajista: 1.220,49 USD, −51 % sobre el valor base', mitigante: 'Software crítico con datos propios y clientes pequeños que no desarrollan', senal: 'Orgánico negativo dos trimestres seguidos' },
    { riesgo: 'Menor rentabilidad de las compras al hacerse más grandes y competir con el capital privado', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Alto', efecto_valor: 'Cada punto menos de crecimiento anual quita ≈223 USD (−9 %)', mitigante: 'Disciplina de tasa mínima y miles de compras pequeñas', senal: 'ROIC por debajo del 18 % o capital desplegado a la baja' },
    { riesgo: 'Sucesión: sin Mark Leonard en el día a día ni en el consejo', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Retrasa el ritmo de compras del caso base', mitigante: 'Miller dirigió Volaris; estructura descentralizada en seis grupos', senal: 'Salidas en la dirección de los grupos operativos' },
    { riesgo: 'Altera y las compras grandes en sectores en declive', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Altera aporta 301 M de ingresos semestrales', mitigante: 'Peso pequeño en el grupo (≈5 % de los ingresos)', senal: 'Mantenimiento de Altera por debajo de −10 % orgánico' },
    { riesgo: 'Pasivo del IRGA con Joday a mercado', tipo: 'Contable', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: 'A la cotización de Topicus, ≈55 USD por acción menos', mitigante: 'El pasivo se liquida por fórmula, no a mercado', senal: 'Ejercicio de la opción de venta de Joday' },
    { riesgo: 'Tipos de interés y coste de capital', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'WACC del 10,1 %: el DCF baja a 2.040,07 USD (−18 %)', mitigante: 'Deuda neta ajustada de 1,3 veces el EBITDA', senal: 'Tesoro a 10 años por encima del 5,75 %' },
    { riesgo: 'Divisa: cuentas en dólares y cotización en dólares canadienses; el 35 % de las ventas en Europa', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: 'Mueve el orgánico 1-2 puntos al año', mitigante: 'Costes en las mismas divisas que los ingresos', senal: 'Dólar fuerte frente al euro y la libra' },
  ],
  premortem: `Octubre de 2029: la acción ha caído un 40 %, a unos 1.260 USD (1.800 CAD). La historia más probable empieza en 2027: los asistentes de programación permiten a los clientes medianos de los verticales de Constellation (municipios, concesionarios, clubes) migrar a software genérico configurado con IA, y el mantenimiento empieza a perder un 1-2 % orgánico al año. Las empresas que compra pierden valor y los vendedores lo saben: los precios no bajan tanto como su crecimiento, y la dirección, sin la voz de Leonard en el consejo, responde con compras grandes a precios de capital privado para mantener el capital desplegado. El ROIC baja del 21,7 % al 13 %, cerca del WACC, y el mercado deja de pagar prima por la reinversión: el múltiplo baja a 10 veces el EBITDA, como Enghouse o Vitec. El indicador que lo habría anticipado: el orgánico sin divisa del 2T26 (1 %) y el −19 % de Altera.`,
  confianza: 'Media',
};

export const preguntas = {
  items: [
    { tema: 'IA y orgánico', pregunta: '¿Qué parte del mantenimiento ha perdido o renegociado precio por alternativas con IA, y en qué verticales?', por_que: 'El orgánico sin divisa bajó al 1 % en el 2T26; es la variable que separa el base del bajista.' },
    { tema: 'Rentabilidad de las compras', pregunta: '¿Qué tasa interna de rentabilidad han dado las compras de más de 250 M de los últimos cinco años frente a la tasa mínima?', por_que: 'El ROIC ha bajado del 54-68 % al 21,7 % y las compras grandes se pagan a precios de capital privado.' },
    { tema: 'Altera', pregunta: '¿Por qué cae un 19 % el mantenimiento de Altera y qué plan hay?', por_que: 'Es la mayor compra reciente y arrastra el orgánico del grupo.' },
    { tema: 'Capital desplegado', pregunta: '¿Cuánto flujo libre espera poder reinvertir al año en 2027-2028 y a qué precios?', por_que: 'El DCF supone compras que bajan del 11 % al 2 % del crecimiento.' },
    { tema: 'IRGA', pregunta: '¿Qué pasa con el pasivo del IRGA si Joday ejerce su opción de venta y a qué valor se liquidaría?', por_que: 'A mercado vale 1.161 M más que en libros, ≈55 USD por acción.' },
    { tema: 'Sucesión', pregunta: '¿Qué papel tendrá Mark Leonard en la estrategia de participaciones minoritarias (PEMS) y quién decide las compras grandes?', por_que: 'Su salida coincide con la mayor caída de la acción.' },
    { tema: 'Dividendo y recompras', pregunta: '¿Recompraría acciones si el precio cae por debajo de su valor intrínseco, en vez de comprar empresas?', por_que: 'No ha recomprado nunca y el precio está en el mínimo de su década en EV/EBITDA.' },
  ],
  confianza: 'Media',
};

export const fuentes = [];
export const huecos = [];

export const sostenibilidad_veredicto = 'En parte';
export const sostenibilidad_justificacion = `El crecimiento del caso base (10,1 % anual de media) es, sobre todo, comprado. Ese tramo es financiable: comprar el 11 % de crecimiento de 2027e cuesta unos 2.000 M (1,3 veces las ventas que compra), lo mismo que el FCFA2S de un año (2.031 M) [A10]. El orgánico es lo que flojea: del 2-4 % en 2024-2025 bajó al 1 % sin divisa en el 2T26, el más bajo de la década, y las licencias caen [A10, B2]. El foso de cada nicho y el 74,9 % de ingresos recurrentes sostienen un 3 % orgánico, pero no lo garantizan con la IA. La cuota del mercado de software vertical apenas sube (del 7,9 % al 8,3 % en 2031e). Por eso el crecimiento baja del 14 % al 5 % y el bajista quita 4 puntos al año.`;
