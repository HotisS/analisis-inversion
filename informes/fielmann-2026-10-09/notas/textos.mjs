// Textos del analista (Fielmann Group, corte 2026-10-09). Las cifras del motor se leen de datos.json (calc de la
// última ejecución); tras cambiar supuestos se integra y calcula dos veces para que los textos queden al día.
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const DIR = dirname(fileURLToPath(import.meta.url));
const RUTA = join(DIR, '..', 'datos.json');
const D = existsSync(RUTA) ? JSON.parse(readFileSync(RUTA, 'utf8')) : {};
const c = D.calc || {};
const g = (ruta, def = null) => ruta.split('.').reduce((o, k) => (o == null ? o : o[k]), c) ?? def;
const n = (x, d = 1) => (x == null || isNaN(x) ? 'n.d.' : Number(x).toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d, useGrouping: Math.abs(x) >= 10000 }));
const e2 = (x) => n(x, 2);
const pc = (x, d = 1) => (x == null ? 'n.d.' : (x > 0 ? '+' : '') + n(x, d).replace('-', '−') + ' %');

const precio = 37.15;
const VO = g('sintesis.valor_objetivo');
const POT = g('sintesis.potencial_pct');
const RT = g('recomendacion.rentabilidad_total_pct');
const ASIM = g('recomendacion.asimetria');
const DIVY = g('recomendacion.dividendo_pct');
const REL = g('recomendacion.relativo') || {};
const DCF = g('dcf.valor_accion');
const DCF2 = g('dcf.valor_accion_dos_etapas');
const WACC = g('dcf.wacc');
const KE = g('dcf.ke');
const VT = g('dcf.peso_terminal_pct');
const MI = g('dcf.multiplo_implicito');
const INV = g('dcf.inverso') || {};
const ESC = g('escenarios') || [];
const esc = (k) => ESC.find((x) => x.escenario === k) || {};
const CL = g('clave') || {};
const MH = g('multiplos_historicos') || [];
const mhE = MH.find((x) => x.campo === 'ev_ebitda_ltm') || {};
const mhP = MH.find((x) => x.campo === 'per_ltm') || {};
const COMP = g('comparables.implicito') || [];
const compE = COMP.find((x) => /EV\/EBITDA próximos/.test(x.metodo)) || {};
const compP = COMP.find((x) => /PER próximos/.test(x.metodo)) || {};
const SENS = g('dcf.sensibilidad.filas') || [];
const SENS2 = g('dcf.sensibilidad2.filas') || [];
const sMarg1 = SENS2.find((f) => f.margen === '-1 pp')?.v2;
const sMarg2 = SENS2.find((f) => f.margen === '-2 pp')?.v2;
const sWaccMas = SENS[3]?.v2;
const sWaccMenos = SENS[1]?.v2;
const NIV = g('recomendacion.comprar_por_debajo');
const NIVV = g('recomendacion.vender_por_encima');
const ROIC = (g('rentabilidad') || []).map((r) => r.roic_pct);
const ROIC25 = ROIC.at(-1);
const B = esc('Bajista'), BA = esc('Base'), AL = esc('Alcista');

export const formato_cuenta = 'naturaleza';

export const limitaciones = `Línea cotizada: la acción ordinaria de Fielmann Group AG en Xetra (FIE), única clase. Cuentas en euros, NIIF-UE, con la cuenta de resultados por naturaleza. El precio es el cierre del 8-oct-2026 (37,15 EUR): a la hora de tomarlo, la sesión del 9 no había cerrado; las rentabilidades, la volatilidad y las betas llegan hasta el 7-oct. Con NIIF 16, el EBITDA excluye los alquileres de las tiendas: los pasivos por arrendamiento (594 M EUR a 30-jun-26) van en la deuda del puente, en la deuda neta ajustada y en el valor empresa de los múltiplos; el capex del DCF incluye las altas de derechos de uso (unos 6 puntos de ventas al año) y la amortización, la de esos derechos; los comparables de EE. UU. (US GAAP) se toman sin sus arrendamientos operativos, porque su EBITDA ya lleva el alquiler. La cuenta lleva el EBITDA reportado: los ajustes de la empresa (integración, reorganización, cotizaciones atrasadas: 20,8 M EUR en 2024 y en 2025) se repiten cada año y no se tratan como no recurrentes; el consenso, que sigue el EBITDA ajustado de la guía, se rebaja en el 0,85 % de las ventas. Las cuentas de 2022-2024 se reexpresaron (seguros de coste cero y NIIF 15): se usa la última versión publicada de cada año. Fielmann publica semestres e informes trimestrales sin cuenta completa: los cuartos trimestres son el año menos los nueve meses. La empresa no publica ventas por tienda comparable ni transcripciones de sus conferencias. Las rentabilidades del SDAX (índice de rendimiento) y del sector (ETF del STOXX Europe 600 Retail) se calcularon con un script propio sobre los históricos de Yahoo.`;

export const controles_explicados = [
  { control: 'Comparables estables al quitar una empresa', explicacion: 'La muestra mezcla minoristas (National Vision, Warby Parker, Amplifon) con fabricantes de lentes y audífonos con prima de marca (EssilorLuxottica, Sonova, Demant): la mediana depende de cuál se quite. Por eso los comparables pesan solo un 10 % en el valor objetivo y el texto usa National Vision y Amplifon como referencia más cercana.' },
];

export const parches = [
];
export const huecos_resueltos = [];
export const fuentes = [];
export const huecos = [];

// ---------- Secciones de juicio ----------
export const rentabilidad = {
  comentario: `Fielmann crea valor, pero menos que antes de comprar fuera. El ROIC fue del ${n(ROIC[0])} % en 2019, cayó al ${n(ROIC[3])} % en 2022 (inflación salarial y tiendas de España recién compradas) y se ha recuperado al ${n(ROIC25)} % en 2025, frente a un WACC del ${n(WACC, 2)} %. Lo mueve sobre todo el margen: el EBITDA reportado pasó del 19,3 % al 23,0 % de las ventas entre 2022 y 2025 [A1, A4].

El capital invertido desde 2019 explica la caída: el fondo de comercio subió de 54,6 a 424,6 M EUR con las compras de España y EE. UU. [A1]. Estimación propia con la información por segmentos de 2025: el BAI después de un 30 % de impuestos rinde un 44 % sobre los activos no corrientes sin derechos de uso en Alemania (213,4 M EUR de BAI sobre 340,5 M EUR), un 4,4 % en España (18,6 sobre 298,7) y prácticamente cero en Norteamérica (0,8 sobre 382,5) [A1]. **Las compras de España y EE. UU. todavía no cubren el coste de capital**; España se acerca, EE. UU. está lejos. Los comparables minoristas rinden menos: National Vision un 4,4 % y Amplifon un 6,3 % de ROIC [D22, D17].`,
  confianza: 'Media',
};

export const suma_partes = {
  aplica: false, descuento_holding_pct: 0, partes: [],
  comentario: 'No aplica: Fielmann es un solo negocio minorista (óptica con audiología integrada en las mismas tiendas) repartido por países, con los mismos proveedores, la misma marca y la misma fábrica. Los países difieren en margen (Suiza 29 %, EE. UU. 14 %), pero no hay comparables puros de cada parte con un múltiplo distinto que justifique valorarlas por separado; la diferencia de rentabilidad ya está en el DCF consolidado.',
  confianza: 'Media',
};

export const catalizadores = {
  items: [
    { fecha: '5-nov-2026', evento: 'Informe del tercer trimestre', efecto: 'Primera prueba de la aceleración del segundo semestre que exige la guía (las ventas del 1S26 crecieron un 1,8 %): para llegar al punto medio, el 2S26 debe crecer en torno a un 4 %', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Febrero de 2027', evento: 'Cifras preliminares de 2026 y guía de 2027', efecto: 'Si la guía de 2027 apunta a ventas de unos 2.650 M EUR y margen ajustado del 23 % o más (lo que espera el consenso), valida la base del DCF', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2026-2027', evento: 'Plan de 70 aperturas al año (37 en el 1S26)', efecto: 'Cada tienda nueva tarda en madurar; la contribución de las aperturas de 2026 a las ventas se verá en 2027', probabilidad: 'Media', sentido: '+' },
    { fecha: '2027', evento: 'Puesta en marcha de la planta de Chomutov (República Checa)', efecto: 'Más capacidad de fabricación y logística (hasta 8 millones de artículos al año) y menor coste unitario', probabilidad: 'Media', sentido: '+' },
    { fecha: '2026-2027', evento: 'Transformación del negocio de EE. UU.', efecto: 'El margen EBITDA ajustado de EE. UU. bajó al 12,5 % en el 1S26; el objetivo es el entorno del 25 % en 2030. Cada punto en EE. UU. vale unos 3 M EUR de EBITDA', probabilidad: 'Media', sentido: '+/−' },
    { fecha: 'Junio-julio de 2027', evento: 'Junta general', efecto: 'Dividendo (1,40 EUR en 2026) y votación de la remuneración, que el capital libre rechaza de forma sistemática', probabilidad: 'Alta', sentido: '+/−' },
  ],
  confianza: 'Media',
};

export const riesgos = {
  items: [
    { riesgo: 'Alemania (61 % de las ventas) sigue estancada: el mercado óptico pierde unidades por cuarto año y Fielmann, con el 57 % de las gafas, ya no puede crecer ganando cuota', tipo: 'Mercado', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: sMarg1 != null ? `−${n((1 - sMarg1 / DCF) * 100, 0)} % por cada punto de margen EBITDA perdido` : 'n.d.', mitigante: 'Precio bajo y garantías que captan clientes en recesión; audiología y servicios médicos', senal: 'Ventas de Alemania por debajo del +2 % en el 2S26 y en 2027' },
    { riesgo: 'EE. UU. no llega a rentabilizar las compras: 410 M EUR pagados y un BAI de 0,8 M EUR en 2025', tipo: 'Ejecución', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Unos −4 EUR por acción si se deteriora la mitad del fondo de comercio y el negocio se queda en el margen actual (estimación propia)', mitigante: 'El plan es orgánico y con inversión limitada (540 M USD hasta 2030, incluidas compras pequeñas)', senal: 'Margen EBITDA ajustado de EE. UU. por debajo del 12 % en 2026-2027' },
    { riesgo: 'Inversión acelerada sin crecimiento: capex de más de 200 M EUR previsto en 2026 y 70 aperturas al año que no se traducen en ventas', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Alto', efecto_valor: `Escenario bajista: ${e2(B.valor)} EUR (${pc(B.potencial_pct)})`, mitigante: 'Balance con deuda neta de 1,1 veces el EBITDA incluidos los arrendamientos', senal: 'Crecimiento orgánico del grupo por debajo del 3 % en 2027' },
    { riesgo: 'Pérdida de credibilidad de la guía: la de 2026 duró cuatro meses y la de 2022 se rebajó dos veces', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'El múltiplo ya está en mínimos de diez años; otra rebaja lo mantendría ahí', mitigante: 'La guía de margen se ha cumplido casi siempre', senal: 'Nueva rebaja de la guía en el 3T o en la de 2027' },
    { riesgo: 'Control familiar sin contrapeso: el pacto tiene el 72,9 %, el capital libre rechaza la remuneración y la comisión de auditoría no tiene mayoría independiente', tipo: 'Gobierno', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: 'Descuento persistente; no cambia el flujo de caja', mitigante: 'Una acción, un voto; operaciones con la familia de 0,3-0,5 M EUR al año', senal: 'Operaciones vinculadas relevantes o retribución que suba con menor rentabilidad' },
    { riesgo: 'Presión de precio y margen de proveedores: EssilorLuxottica es proveedor dominante, dueño de Apollo y pionero de las gafas inteligentes', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: sMarg1 != null ? `−${n((1 - sMarg1 / DCF) * 100, 0)} % por punto de margen` : 'n.d.', mitigante: 'Fabricación propia en Rathenow y marca propia', senal: 'Margen bruto por debajo del 79 %' },
    { riesgo: 'Falta de ópticos y audioprotesistas titulados que frene la expansión y suba los salarios', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'En 2022 la inflación salarial bajó el margen reportado al 19,3 %', mitigante: 'Refracción automatizada con IA (12 minutos menos en uso paralelo) y formación propia', senal: 'Gastos de personal creciendo más que las ventas' },
  ],
  premortem: `Es octubre de 2029 y la acción ha perdido un 40 %. La historia más probable empieza en Alemania: el consumo siguió débil, el mercado óptico volvió a perder unidades y la empresa, con el 57 % de las gafas, no pudo compensar con cuota. Para cumplir la Vision 2035 aceleró la inversión: 70 aperturas al año, la planta de Chomutov y la transformación de EE. UU., con un capex de más del 8 % de las ventas frente al 4-5 % histórico. Las tiendas nuevas maduraron despacio y el crecimiento orgánico se quedó en el 2-3 %, el que ya tenía en 2025-2026.

En EE. UU. las aseguradoras de visión siguieron fijando el precio y el margen no pasó del 12-13 %: el fondo de comercio se deterioró. Con más gasto de personal y ventas planas, el margen reportado volvió al 20-21 % de 2022-2024. La dirección rebajó la guía otra vez, el BPA se estancó en 2,4-2,6 EUR y el mercado mantuvo un PER de 13-14 veces: 33-35 EUR, más el dividendo, recortado para financiar la inversión.

El indicador que lo habría anticipado es el crecimiento orgánico de Alemania: si en el 2S26 y en 2027 se queda por debajo del 2 %, la tesis de aceleración no se sostiene. El segundo es el margen de EE. UU.: por debajo del 12 % en 2027, la expansión destruye valor.`,
  confianza: 'Media',
};

export const preguntas = {
  items: [
    { tema: 'Crecimiento', pregunta: '¿Qué crecimiento de ventas comparables (por tienda abierta más de un año) tuvo Alemania en el 1S26 y cuánto aportaron las aperturas?', por_que: 'La empresa no publica ventas comparables; el DCF supone una aceleración del 1,8 % del 1S26 al 5 % en 2027 que depende de ello.' },
    { tema: 'EE. UU.', pregunta: '¿Qué rentabilidad sobre el capital invertido tiene EE. UU. hoy y cuándo espera superar el coste de capital?', por_que: '410 M EUR pagados para un BAI de 0,8 M EUR en 2025; es la mayor fuente de destrucción de valor posible.' },
    { tema: 'Inversión', pregunta: '¿Qué parte de los más de 200 M EUR de inversión de 2026 es mantenimiento y cuál expansión, y qué periodo de recuperación tienen las aperturas?', por_que: 'El DCF lleva un capex de inmovilizado del 6 % de las ventas frente al 4,8 % de 2025; si es mayor, el valor baja.' },
    { tema: 'Márgenes', pregunta: '¿Por qué los ajustes del EBITDA (integración, reorganización, cotizaciones atrasadas) aparecen todos los años y cuándo dejarán de hacerlo?', por_que: 'La guía y el consenso se miden en EBITDA ajustado; aquí se valoran como recurrentes (0,85 % de las ventas).' },
    { tema: 'Objetivos 2030', pregunta: '¿Mantiene el objetivo de 4.000 M EUR de ventas y 25 % de margen en 2030 tras rebajar la guía de 2026? ¿Qué parte depende de compras?', por_que: 'El consenso de 2028 (2.819 M EUR) queda muy lejos de esa trayectoria; si la empresa la persigue con compras, el riesgo cambia.' },
    { tema: 'Gobierno', pregunta: '¿Por qué el consejo de supervisión considera independiente a su presidente, en el cargo desde 1994, y por qué el ex director financiero está en la comisión de auditoría?', por_que: 'El capital libre rechaza la remuneración con un 77-80 % de sus votos; es la protección del minoritario.' },
    { tema: 'Lentes de contacto', pregunta: '¿Cuánto margen bruto gana con la marca propia frente a la pérdida de volumen (−4 % en el 1S26)?', por_que: 'Es la categoría donde la venta online sí presiona.' },
  ],
  confianza: 'Media',
};

export const secciones = { rentabilidad, catalizadores, riesgos, preguntas };

// ---------- DCF ----------
export const etapa2_justificacion = `El ROIC de 2025 (${n(ROIC25)} %) supera al WACC (${n(WACC, 2)} %) en más de cinco puntos, y el recorrido de crecimiento está fuera de Alemania: Fielmann tiene algo más del 1 % de las unidades en EE. UU., el mayor mercado óptico del mundo, y el 13 % en España, frente al 57 % en Alemania [B1, A1]. El plan pasa de unos 450 a más de 700 estudios de audiología en Europa hasta 2030 y de 0,3 a 1.000 M USD de ventas en EE. UU. [B4]. Por eso el crecimiento no cae de golpe al terminal en 2033: baja en línea recta durante cinco años. La transición es corta y sin mejora de margen porque el crecimiento orgánico reciente (1,7-3,6 %) y el ROIC nulo de EE. UU. no justifican más [A1, A7]. Aporta un ${n(g('dcf.etapa2_aporte_pct'))} % del valor.`;

export const dcf_justificacion = {
  crecimiento: `2026e se fija con la guía rebajada en agosto (2.500-2.550 M EUR) y el 1S26 (+1,8 %): un +3,2 %, 2.513 M EUR, en la mitad baja de la horquilla y algo por debajo del consenso (2.517) [A7, D4]. Para 2027-2029 se supone un 5,0-5,5 %, medio punto por debajo del consenso (5,6 % y 6,0 %) [D4]: las 70 aperturas de 2026 (5 % de la red) y EE. UU. y España aceleran, pero el crecimiento orgánico fue del 3,6 % en 2025 y del 1,7 % en el 1S26 [A1, A7]. Queda muy por debajo del 10 % anual de la Vision 2035, que no se usa porque incluye compras y la primera guía de su recorrido ya se ha rebajado [A1, C20]. El crecimiento baja al 3,5 % en 2033.`,
  margenes: `Margen EBITDA reportado (NIIF 16, con los ajustes recurrentes dentro). 2026e: 22,3 %, coherente con un EBITDA ajustado de unos 565 M EUR (guía de 560-580) menos unos 6 M EUR de ajustes [A7]. Sube al 23,3 % en 2030, por debajo del 23,8 % ajustado de 2025 y del 25 % que persigue la empresa: es la media entre el 25,3 % de 2019 y el 20,3-20,8 % de 2023-2024, y lo que espera el consenso para 2028 una vez restados los ajustes (23,9 % − 0,85 = 23,0 %) [A1, D4]. El 1S26 (23,4 % reportado) muestra que el margen aguanta con ventas planas, pero EE. UU. (12,5 %) lo diluye a medida que pesa más [A7].`,
  inversion: `Con los arrendamientos en la deuda, el capex incluye dos partes: inmovilizado (5,6-6,0 % de las ventas en 2026-2028 por las aperturas, la fábrica de Chomutov y EE. UU., frente al 4,8 % de 2025 y un plan de más de 200 M EUR) y altas de derechos de uso (6,0 % bajando al 5,5 %, frente al 6,3 % de 2025 y el 7,6 % de 2024) [A1]. En total, un 11-12 % de las ventas frente a una amortización del 9,5-9,8 % (inmovilizado 4,3 % y derechos de uso 5,1 % en 2025) [A1]. El circulante se mantiene en el 9 % de las ventas de 2025 (8-10,5 % desde 2019) [A1]. Tipo impositivo del 29,5 % (29,6 % efectivo en 2025) [A1].`,
  wacc: `Tasa libre: Bund a 10 años, 3,57 % el 8-oct-2026 [D8]. Beta 0,89: la ajustada semanal de cinco años frente al STOXX Europe 600, el mercado de un inversor en euros diversificado. Se compararon tres índices: frente al SDAX (su índice) sale 0,81, frente al MDAX 0,80 y frente al STOXX Europe 600 Retail 0,70; las mensuales de cinco años (0,34-0,46) salen anormalmente bajas por la poca correlación [D1]. Se elige la más alta porque la semanal de dos años frente al STOXX 600 ya da 1,01 tras la rebaja de la guía. Prima de mercado del 5,5 % y 0,5 puntos adicionales por liquidez: el capital libre es el 27 % y se negocian unos 2,8 M EUR al día [D1, C1]. Coste de la deuda del 4,0 % (Schuldschein al 3,3-4,0 %) y peso de la deuda del 20 % (deuda bruta con arrendamientos sobre valor empresa) [A1]. Ke ${n(KE, 2)} % y WACC ${n(WACC, 2)} %.`,
  terminal: `Crecimiento a perpetuidad del 2,25 %: inflación del euro del 2 % más un cuarto de punto real, por debajo de la tasa libre menos medio punto (3,07 %). El mercado óptico alemán creció un 1,7 % anual en 2021-2025, por debajo de la inflación [B5]; el resto lo aportan EE. UU. y España. El múltiplo implícito del valor terminal es de ${n(MI)} veces el EBITDA, bajo frente a la mediana histórica de la acción (${n(mhE.media)} veces) y en línea con National Vision y Amplifon [D15, D17].`,
};

export const dcf_lectura = DCF == null ? null : `El DCF da ${e2(DCF)} EUR por acción (${pc((DCF / precio - 1) * 100)} sobre ${e2(precio)} EUR) con un WACC del ${n(WACC, 2)} %; el valor terminal pesa un ${n(VT, 0)} %. Sin la etapa de transición, ${e2(DCF2)} EUR.

**El precio descuenta que Fielmann no acelere.** El DCF inverso da un crecimiento implícito del ${n(INV.crecimiento_implicito_pct)} % anual en 2027-2033 con nuestros márgenes, frente al ${n(INV.crecimiento_base_pct)} % del caso base; o, con nuestro crecimiento, un margen EBITDA del ${n(INV.margen_implicito_pct)} % frente al ${n(INV.margen_base_pct)} %. Un ${n(INV.crecimiento_implicito_pct)} % es el crecimiento orgánico que la empresa ha tenido en 2025-2026 (3,6 % y 1,7 %) y un ${n(INV.margen_implicito_pct)} % es el margen medio de 2022-2024: el mercado extrapola el peor tramo reciente, no el plan. Visto de otro modo, el precio rinde un ${n(INV.rentabilidad_implicita_pct)} % anual frente a un WACC del ${n(WACC, 2)} %.

No es una exigencia alta: nuestro caso base está algo por debajo del consenso en ventas y en margen. Pero el valor es sensible a ambas cosas: un punto menos de margen en todos los años lo baja a ${e2(sMarg1)} EUR y medio punto más de WACC, a ${e2(sWaccMas)} EUR. Por debajo de unos 40 EUR solo se llega con márgenes de 2022-2024 y crecimiento del 2-3 % a la vez.`;

export const narrativas = {
  Bajista: 'Alemania sigue estancada, las aperturas maduran despacio y EE. UU. no pasa del 12-13 % de margen: el crecimiento se queda en el 2-3 % y el margen reportado vuelve al 21 % de 2022-2024, como ya ocurrió con la inflación salarial. La guía se rebaja otra vez y el crecimiento a largo plazo baja al 1,75 %.',
  Base: 'Las 70 aperturas al año, España y EE. UU. llevan el crecimiento al 5-5,5 % en 2027-2029, algo por debajo del consenso, y el margen reportado sube despacio al 23,3 %, sin llegar al 25 % del plan. La inversión se mantiene alta (11-12 % de las ventas con los derechos de uso).',
  Alcista: 'La refracción automatizada y la red nueva devuelven a Alemania al 3-4 % y EE. UU. avanza hacia el margen europeo: el grupo crece un 7 % en 2027-2029, cerca de la trayectoria de la Vision 2035 sin compras, y el margen reportado llega al 24,3 %.',
};

export const escenarios_comentario = ASIM == null ? null : `La asimetría es favorable: el alcista vale ${e2(AL.valor)} EUR (${pc(AL.potencial_pct)}) y el bajista ${e2(B.valor)} EUR (${pc(B.potencial_pct)}), una relación de ${n(ASIM, 2)} veces. El bajista no es cosmético: reproduce el margen de 2022-2024 y un crecimiento como el del 1S26, y deja la acción un 30 % más abajo. Con un 25 % de probabilidad en cada extremo, el valor ponderado de los escenarios es ${e2(g('sintesis.tabla')?.find((t) => /Escenarios/.test(t.metodo))?.valor)} EUR. Compensa porque el precio ya está cerca del bajista en múltiplos: 6,8 veces el EBITDA de los últimos 12 meses, el mínimo de la serie histórica de la acción.`;

export const valoracion_comentario = VO == null ? null : `El valor objetivo de ${e2(VO)} EUR pondera el DCF (50 %), los escenarios (40 %) y los comparables (10 %). El DCF es el método más fiable: el negocio es estable, la caja es visible (flujo operativo del 89 % del EBITDA en 2025) y el valor depende de dos supuestos que se pueden vigilar, crecimiento y margen [A14]. Los comparables pesan poco porque la muestra es frágil y está sesgada al alza: los fabricantes con marca (Sonova, Demant, EssilorLuxottica) cotizan a 10-15 veces el EBITDA de los próximos 12 meses y dan ${e2(compE.valor_mediana)} EUR por acción, mientras los minoristas más parecidos (National Vision, 6,5 veces; Amplifon, 7,7 veces los últimos 12 meses) cotizan como Fielmann [D15, D17]. Las transacciones no se usan: solo una tiene múltiplo de EBITDA (GN Hearing, fabricante) y las compras de Fielmann se pagaron a 1,0-1,6 veces las ventas sin EBITDA publicado [D24, D27]. La dispersión es grande (de ${e2(B.valor)} a ${e2(compE.valor_mediana)} EUR), pero todos los métodos salvo el escenario bajista quedan por encima del precio. Con la prima implícita del mercado (4,2 %), el DCF sube a ${e2(REL.dcf)} EUR.`;

// ---------- Resumen ----------
function resumen() {
  const sintesis = `**La recomendación y por qué.** Comprar, con convicción media. El valor objetivo es de ${e2(VO)} EUR frente a ${e2(precio)} EUR (cierre del 8-oct): un potencial del ${n(POT)} % y una rentabilidad total esperada del ${n(RT)} % con el dividendo del ${n(DIVY)} %. El alcista gana ${n(AL.potencial_pct)} % y el bajista pierde ${n(Math.abs(B.potencial_pct))} %: asimetría de ${n(ASIM, 2)} veces. La razón: el precio descuenta un crecimiento del ${n(INV.crecimiento_implicito_pct)} % anual, el ritmo orgánico de los últimos semestres, y con un caso base algo por debajo del consenso el valor está claramente por encima.

**El negocio.** Fielmann es el primer óptico de Alemania, con el 57 % de las gafas vendidas y el 25 % del valor, y factura unos 2,3 M EUR por tienda frente a 0,9 M de Apollo [B5, B1]. El margen EBITDA reportado del 23,0 % y el ROIC del ${n(ROIC25)} % frente a un WACC del ${n(WACC, 2)} % muestran un foso real. Lo vulnerable es dónde crece: España rinde un 4 % sobre sus activos y EE. UU. casi nada, con 410 M EUR pagados [A1].

**Finanzas.** Las ventas crecieron un 8,2 % anual desde 2019, la mitad comprado; el orgánico fue del 3,6 % en 2025 y del 1,7 % en el 1S26 [A1, A7]. La conversión en caja es alta y la deuda neta ajustada, con 594 M EUR de arrendamientos, es de 1,3 veces el EBITDA. Las cuentas se han reexpresado tres años seguidos y los ajustes «no recurrentes» se repiten cada año: aquí se tratan como recurrentes.

**Equipo y gobierno.** Resta. La familia controla el 72,9 %, el capital libre vota en contra de la remuneración (77-80 % de sus votos) y la comisión de auditoría no tiene mayoría independiente [C1, C12]. La guía de 2026 duró cuatro meses [C20]. No hay operaciones de directivos en 12 meses [C19].

**Valoración.** El DCF da ${e2(DCF)} EUR y pesa la mitad; los escenarios, ${e2(g('sintesis.tabla')?.find((t) => /Escenarios/.test(t.metodo))?.valor)} EUR. A ${n(CL.ev_ebitda_ltm)} veces el EBITDA de los últimos 12 meses (${n(CL.ev_ebitda_ntm)} los próximos) y ${n(CL.per_ntm)} veces el beneficio esperado, la acción cotiza en mínimos de su historia (media de ${n(mhE.media)} y ${n(mhP.media)} veces) y como National Vision, con el doble de margen. El precio rinde un ${n(INV.rentabilidad_implicita_pct)} % anual frente a un WACC del ${n(WACC, 2)} %. Con la prima implícita del mercado el objetivo sube a ${e2(REL.valor_objetivo)} EUR: las dos reglas dan Comprar. Discrepamos del mercado en que extrapola el peor tramo; no en el plan de la empresa, que no usamos.

**Riesgos y catalizadores.** Alemania estancada (cada punto de margen resta unos ${n(DCF - sMarg1, 0)} EUR por acción), la rentabilidad de EE. UU. y una inversión del 11-12 % de las ventas que no acelere el crecimiento. Catalizadores: el 3T el 5-nov-2026, que debe mostrar la aceleración del segundo semestre, y la guía de 2027 en febrero.

**Qué cambiaría la decisión.** Comprar por debajo de ${e2(NIV)} EUR y vender por encima de ${e2(NIVV)} EUR. Pasaríamos a Mantener si el crecimiento orgánico de 2027 queda por debajo del 3 %, si el margen ajustado baja del 22 % o si el de EE. UU. no supera el 12 %.`;

  return {
    recomendacion: 'Comprar', conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis,
    tesis: `Fielmann vende más de la mitad de las gafas de Alemania con un modelo de precio bajo, fabricación propia y garantías que fidelizan (satisfacción de clientes del 90 %), y gana un margen EBITDA reportado del 23 % y un ROIC del ${n(ROIC25)} % [B1, A1]. Su problema es el crecimiento: el mercado alemán pierde unidades y la empresa ha comprado fuera (España, EE. UU.) a rentabilidades que aún no cubren el coste de capital.

El precio, ${e2(precio)} EUR, cotiza a ${n(CL.ev_ebitda_ltm)} veces el EBITDA y ${n(CL.per_ntm)} veces el beneficio esperado, mínimos históricos. El DCF inverso dice que descuenta un crecimiento del ${n(INV.crecimiento_implicito_pct)} % anual o un margen del ${n(INV.margen_implicito_pct)} %: lo peor de los últimos años, no la media.

Para invertir hay que creer que las 70 aperturas al año y el crecimiento fuera de Alemania llevan las ventas al 5 % anual y que el margen se queda en el 23 %, algo menos que el consenso y mucho menos que el plan de la empresa. Con eso, el valor es de ${e2(DCF)} EUR por DCF y ${e2(VO)} EUR ponderado. El mercado acierta en desconfiar del plan y de un gobierno que no protege al minoritario; se equivoca al pagar como si el negocio no creciera.`,
    vision_diferencial: {
      mercado_descuenta: `Un Fielmann que no vuelve a acelerar: crecimiento del ${n(INV.crecimiento_implicito_pct)} % anual o margen del ${n(INV.margen_implicito_pct)} %, tras la rebaja de la guía de agosto y cinco años de caída de la acción (−5,3 % anual con dividendos) [D1]. El múltiplo de 6,8 veces el EBITDA es el de una cadena estadounidense de margen bajo.`,
      nuestra_vision: `Un crecimiento del 5-5,5 % en 2027-2029 y un margen reportado del 23,3 %: por debajo del consenso y lejos de la Vision 2035. No creemos en los 4.000 M EUR de ventas de 2030, pero tampoco en el estancamiento: la red crece un 5 % al año y fuera de Alemania las ventas crecieron un 6 % en el 2T26, con España al +9 % [A7, A8].`,
      por_que: 'El margen ya ha demostrado aguantar con ventas planas (23,4 % reportado en el 1S26) y la caja cubre inversión, arrendamientos y dividendo. Lo que falta es crecimiento, y las aperturas de 2026 se verán en las ventas de 2027; si el 3T y la guía de 2027 confirman la aceleración, el múltiplo no tiene por qué seguir en mínimos.',
    },
    a_favor: [
      `**Múltiplos en mínimos:** ${n(CL.ev_ebitda_ltm)} veces el EBITDA de los últimos 12 meses y ${n(CL.per_ntm)} veces el beneficio esperado, frente a una media histórica de ${n(mhE.media)} y ${n(mhP.media)} veces.`,
      '**Posición dominante en Alemania:** 57 % de las gafas y 25 % del valor, con 2,3 M EUR de ventas por tienda [B5].',
      `**Rentabilidad:** ROIC del ${n(ROIC25)} % y margen EBITDA reportado del 23,0 % en 2025 [A1].`,
      `**Caja y dividendo:** rentabilidad por FCF del ${n(CL.fcf_yield_pct)} % y por dividendo del ${n(DIVY)} %.`,
      '**Crecimiento fuera de Alemania:** España +7,4 % y EE. UU. +3,3 % en moneda local en el 1S26 [A7].',
    ],
    en_contra: [
      '**Alemania estancada:** +0,8 % en el 1S26 y un mercado que pierde unidades por cuarto año [A7, B5].',
      '**Compras que no rinden:** EE. UU. dio un BAI de 0,8 M EUR en 2025 con 410 M EUR invertidos [A1].',
      '**Guía poco fiable:** la de 2026 se rebajó a los cuatro meses; la de 2022, dos veces [C20].',
      '**Gobierno:** 72,9 % familiar y un 77-80 % del capital libre en contra de la remuneración [C1, C12].',
      '**Inversión creciente:** capex con derechos de uso del 11-12 % de las ventas en la proyección.',
    ],
    que_vigilar: 'La tesis depende de que el crecimiento orgánico vuelva al 4-5 % en 2027 gracias a las aperturas. La señal de que no se cumple sería un tercer trimestre por debajo del +3 % (la guía exige un segundo semestre en torno al 4 %) o una guía de 2027 con ventas por debajo de 2.600 M EUR. El margen de EE. UU. es la segunda condición: por debajo del 12 %, la expansión resta valor.',
    cambiaria_recomendacion: [
      `Precio por encima de ${e2(NIV)} EUR: pasaríamos a Mantener.`,
      'Crecimiento de ventas del 2S26 por debajo del +3 % (dato del 3T y de las preliminares): revisaríamos el crecimiento a la baja y probablemente a Mantener.',
      'Guía de 2027 con margen EBITDA ajustado por debajo del 22 %: el valor caería a la zona de 40 EUR.',
      'Margen EBITDA ajustado de EE. UU. por debajo del 12 % en 2027 o un deterioro del fondo de comercio de esa región.',
      'Una compra relevante pagada con deuda que suba la deuda neta ajustada por encima de 2 veces el EBITDA.',
    ],
    kpis_seguimiento: [
      { kpi: 'Crecimiento de ventas a tipo constante del grupo', nivel_actual: '+2,3 % (1S26)', umbral_alerta: 'Por debajo del +3 % en el 2S26', por_que: 'La guía y el caso base exigen aceleración.' },
      { kpi: 'Ventas de Alemania', nivel_actual: '+0,8 % (1S26)', umbral_alerta: 'Por debajo del +2 % en 2027', por_que: 'Es el 61 % de las ventas y casi todo el beneficio.' },
      { kpi: 'Margen EBITDA ajustado del grupo', nivel_actual: '23,7 % (1S26)', umbral_alerta: 'Por debajo del 22 % anual', por_que: 'Cada punto mueve unos 4-5 EUR por acción.' },
      { kpi: 'Margen EBITDA ajustado de EE. UU.', nivel_actual: '12,5 % (1S26)', umbral_alerta: 'Por debajo del 12 %', por_que: 'Mide si la compra de 410 M EUR llega a rendir.' },
      { kpi: 'Aperturas netas', nivel_actual: '37 en el 1S26 (plan de 70 en 2026)', umbral_alerta: 'Menos de 50 en 2026', por_que: 'Es el motor del crecimiento previsto.' },
    ],
    confianza: 'Media',
  };
}
export const resumenObj = VO != null ? resumen() : null;
