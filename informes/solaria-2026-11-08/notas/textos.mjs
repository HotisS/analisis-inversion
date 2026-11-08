// Textos del analista (Solaria, corte 2026-11-08). Cifras del motor tal cual; hechos con cita a la nota de origen.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { resumen as resumenTxt } from './resumen.mjs';
export const resumen = resumenTxt;

const aqui = dirname(fileURLToPath(import.meta.url));
const A = JSON.parse(readFileSync(join(aqui, 'A.json'), 'utf8'));

export const limitaciones = `Se valora la acción ordinaria de Solaria Energía y Medio Ambiente en la Bolsa de Madrid (SLR), en euros. La fecha de corte es domingo: el precio es el cierre del viernes 6-nov-2026 (16,15 EUR) [D1]. Acciones: 131,6 M en circulación (132,64 M emitidas tras la colocación de abril de 2026 menos ≈ 0,99 M de autocartera; la autocartera exacta a la fecha no está publicada) [A6, D2, D3]. Cuentas NIIF-UE por naturaleza y sin aprovisionamientos: el EBITDA supera la cifra de negocios porque los «otros ingresos» (activaciones de obra, penalizaciones a proveedores, seguros y plusvalías por desconsolidar filiales) no están en ventas [A1]. Toda la valoración (DCF, BPA del objetivo a 12 meses e historia del PER) va en base AJUSTADA: sin las plusvalías de Generia (54,6 M en 2025) y Gravyx (37,8 M en el 1S26) ni la reversión del deterioro de Puertollano (28,9 M en 2024), que no son caja [A1, A2, A6]. La cuenta, el balance y los flujos de 2020-2025 salen del XBRL del ESEF, contrastados con las cuentas auditadas (el XBRL etiquetaba al revés la compra y la venta de autocartera de 2025 y repetía el BPA como DPA en 2021-2022) [A1-A5]. El último balance publicado es el de 30-jun-2026: los resultados de los nueve meses no habían salido a la fecha de corte (en 2025 se publicaron con el Capital Markets Day; este año el día del inversor es el 19-nov) [A16, D7]. El consenso de MarketScreener es del 24/25-sep, anterior al 9M26, y mide «ingresos totales» (ventas más otros ingresos) y un EBITDA con rotaciones de activos [D10, D11]. No hay transcripciones públicas de las conferencias.`;

export const controles_explicados = [
  { control: 'Caja proyectada coherente', explicacion: 'Los tres últimos años reales tuvieron un flujo libre medio de −196 M por el plan de construcción (capex de 398 M en 2025 y 276 M solo en el 1S26); la proyección baja la inversión a medida que termina el plan, con 3,6 GW a fin de 2026, y sigue negativa (−119 M de media en 2026e-2028e).' },
  { control: 'Proyección propia frente a consenso', explicacion: 'El EBITDA del consenso (355 / 447 / 515 M) incluye rotaciones de activos y otros ingresos sin caja, y es anterior al 9M26; el nuestro es recurrente (sin plusvalías). La guía de la empresa para 2026 es de 331 M con la plusvalía de Gravyx (37,8 M) dentro: sin ella, ≈ 293 M, nuestro 2026e. La diferencia está explicada en diferencia_consenso.' },
  { control: 'Regresión múltiplo-crecimiento', explicacion: 'R² bajo: no se usa la regresión.' },
  { control: 'Compra robusta', explicacion: 'Con la regla v2 de control la ponderada es del 16,4 % y el base del 10,6 %; no hay compra en ninguna versión porque el valor intrínseco queda por debajo del precio y la calidad no pasa (ROIC − WACC 0,4 puntos).' },
  { control: 'Margen EBITDA', explicacion: 'Margen sobre la cifra de negocios por encima del 100 % en varios años y trimestres: la cuenta es por naturaleza y los otros ingresos (activaciones, penalizaciones, plusvalías) no están en ventas.' },
  { control: 'Peso del valor terminal', explicacion: 'El 82 % del valor está en el terminal porque los flujos de 2026e-2028e son negativos por el plan de construcción (capex del 165 % de las ventas en 2026e); es lo normal en un productor eléctrico en plena inversión y se recoge en la sensibilidad (7,14-16,99 EUR).' },
  { control: 'Tipo impositivo', explicacion: '2020: ingreso por impuestos por la activación de créditos fiscales (bases negativas de años anteriores).' },
  { control: 'Circulante del primer año', explicacion: 'El circulante negativo de 2025 (−26,8 % de las ventas) son proveedores de obra; baja a −20 % en 2026e y a −5 % al terminar el plan de construcción.' },
];

const T = (s) => s;
export const secciones = {
  identificacion: { ticker: 'SLR', mercado: 'Bolsa de Madrid (Mercado Continuo)', industria: 'Productor independiente de renovables', sede: 'Madrid', fundacion: '2002', empleados: 212 },
  negocio: { kpis: A.negocio.kpis },
  multiplos_historicos: {
    comentario: T(`Solaria cotiza a 11,8 veces el beneficio de los últimos 12 meses frente a una media de 22,7 en seis cierres y a 11,3 veces el EBITDA frente a 18,6. El descuento tiene dos causas estructurales: el precio capturado de la solar se ha hundido (de 42,28 EUR/MWh en 2024 a 29,68 en el 1S26 según UNEF) y el beneficio de 2024-2026 lleva plusvalías sin caja que el mercado no paga [B10, A1, A6]. 2020 fue el año de la burbuja renovable (PER de 62 veces el BPA de 2021) y queda fuera de la regla de 12 meses. Precios de cierre de Yahoo [D1].`),
    confianza: 'Alta',
  },
  rentabilidad: {
    comentario: T(`Solaria no crea valor hoy: un ROIC del 6,8 % en 2025 frente a un WACC del 6,43 %, solo 0,4 puntos por encima, y el ROIC incremental histórico es del 7,2 %. El ROIC llegó al 11,8 % en 2022 con el pool en 167,52 EUR/MWh y ha bajado con el precio de la energía [B13, A1]. Lo mueve la rotación, muy baja (0,07-0,11 veces el capital), propia de un productor de electricidad: el margen es alto pero cada euro de ventas necesita unos diez de capital. Dos cosas lo deforman: 584,2 M de obra en curso que aún no rinde (hacia arriba cuando entre en servicio) y las plusvalías de 2024-2025 (hacia abajo si se quitan) [A1]. Frente a los competidores, Acciona Energía (margen EBIT del 32,5 %) y EDPR (35,6 %) tienen márgenes menores pero más escala y diversificación [B20, B18].`),
    confianza: 'Media',
  },
  bolsa: {
    comentario: T(`La acción ha perdido un 37,3 % desde el máximo del 24-abr-2026 y en 12 meses gana un 7,1 %. Tres causas: la colocación de abril a 24 EUR, que diluyó un 6,2 % y marcó el techo; la subida de los tipos en una empresa con 4,5 veces de deuda neta sobre EBITDA; y una posición corta declarada del 7,49 % del capital, que amplifica cada noticia (−12 % antes del 1S26 y +9,5 % después) [D6, D8, D18]. Volatilidad de 60 sesiones del 52 %. Es una acción de beta alta frente al IBEX en cinco años (1,00 mensual) y muy baja en dos (0,36 semanal), lo que dice que se mueve por causas propias [D1].`),
  },
};

export const parches = [];
export const huecos_resueltos = [];

export const comparables_criterio = `Ocho productores independientes de renovables cotizados en Europa con activos propios y consenso gratuito: Grenergy, Acciona Energía y Ecoener (España), EDP Renováveis, ERG, Ørsted, Voltalia y Scatec, con datos de Yahoo al cierre del 6-nov-2026 en euros [D21, D22]. Fuera Neoen y Encavis (excluidas de bolsa tras sus OPA) y Boralex y Northland (sin datos completos). Grenergy y Voltalia mezclan generación con venta de proyectos; Ørsted es eólica marina. El EV/EBITDA de los próximos 12 meses es una estimación propia de D (Yahoo no da EBITDA estimado): pesa poco.`;
export const comparables_comentario = `Solaria cotiza a 9,5 veces el BPA de los próximos 12 meses del consenso frente a una mediana de 18 veces, y a 7,8 veces el EBITDA frente a 13,2. Por múltiplos valdría 30-34 EUR, pero esa cifra está inflada: el BPA y el EBITDA del consenso de Solaria incluyen plusvalías por rotación de activos y otros ingresos sin caja que los comparables no tienen en esa proporción, y son anteriores al 9M26. Con nuestro BPA recurrente de 2027e (1,12 EUR) el PER sube a 14,4 veces, todavía por debajo de la mediana: el descuento que queda se explica por la deuda (4,5 veces el EBITDA), la exposición a mercado del 35 % en plena canibalización solar y un gobierno con un solo consejero independiente. La regresión crecimiento-múltiplo no explica nada (R² 0,08). Por eso los comparables pesan solo un 10 %.`;

export const transacciones_comentario = `Once compras de productores renovables europeos entre 2021 y 2024 se pagaron a una mediana de 15,8 veces el EBITDA (de 10,5 a 21,7), con primas de control del 19-54 % en las OPA: Opdenergy por Antin (15,5x, prima del 46 %), Encavis por KKR (15,8x, 54 %), Neoen por Brookfield (≈ 20,5x, estimación propia, 26,9 %) y Atlantica por ECP (10,5x) [F1-F6]. Son plataformas con contratos largos y más diversificadas que Solaria, y los múltiplos de terceros salen de la tabla del experto de la OPA de Neoen [F2]. Una oferta por Solaria es improbable: la familia Díaz-Tejeiro tiene el 36,6 % y no hay ningún proceso abierto [C1]. Además, aplicadas al EBITDA del consenso (con plusvalías) inflan el valor. Por eso pesan solo un 5 %.`;

export const etapa2_justificacion = null;

export const dcf_justificacion = {
  crecimiento: `2026e es fijo: la cifra de negocios crece un 60 % hasta 316 M (167,2 M en el 1S26, con 99,6 M de hitos de «powered land» para centros de datos) [A6]. 2027e +20 % y 2028e +16 %: la capacidad pasa de 3,06 GW en junio a 3,6 GW a fin de 2026 y entran 1,2 GWh de baterías y Garoña (715 MW) [A7, D5], con el precio capturado aún a la baja (39 EUR/MWh en el 1S26 frente a 50 un año antes). Después, del 9 % al 2 %. Es menos de lo que espera el consenso (ingresos totales de 607 M en 2028e, con otros ingresos dentro) y de lo que ha prometido la empresa, que ha incumplido sus objetivos de capacidad cada año (6,2 GW prometidos para 2025, 3,1 GW reales) [D10, C11-C18].`,
  margenes: `Margen EBITDA recurrente sobre la cifra de negocios del 92 % en 2026e (guía de 331 M menos Gravyx, ≈ 293 M) bajando al 80 % en 2033e: las activaciones de obra (18,5 M en 2025) y las penalizaciones a proveedores (18,6 M) desaparecen al terminar la construcción, y el impuesto a la producción (9,6 M) sigue [A1, A6]. En 2025 el margen recurrente fue del 107 % y en 2023 del 104,5 %. No se proyectan plusvalías de rotación de activos.`,
  inversion: `Capex del 165 % de las ventas en 2026e (≈ 520 M; 276 M en el 1S26) que baja al 38 % en 2035e [A6]. La cifra final está por encima de la amortización (23 %) porque un productor eléctrico necesita unos 8-10 euros de capital por euro de ventas para crecer: con menos capex el motor marcaba que el capital nuevo rendiría el 13,4 % frente al 7,2 % histórico. Circulante negativo (proveedores de obra), del −20 % al −5 %.`,
  wacc: `Bund a 10 años del 6-nov-2026, 3,29 % (Bundesbank) [D23]. Beta 0,85: entre la sectorial de Damodaran reapalancada con la deuda de Solaria (0,71) y la mensual a cinco años frente al IBEX con dividendos (1,00) [D25, D1]; la semanal a dos años (0,36) está deformada por los cortos. Prima de mercado del 5,5 % y 1 punto más por el 35 % de producción a precio de mercado y el riesgo de los centros de datos. Deuda al 3,9 % (91 % de proyecto, 84 % fija o cubierta) con un peso del 42 % a mercado [D5]. WACC del 6,43 %.`,
  terminal: `Gordon con un crecimiento del 2 %, la inflación del euro, por debajo del Bund menos medio punto: las plantas solares tienen vida finita (30-35 años) y el precio capturado no tiene por qué crecer. El valor terminal pesa el 82 %, mucho, porque los flujos de los próximos años son negativos por la inversión.`,
};

export const sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 75.0, precio_pct: -15.0, otros_pct: 0.0, comentario: 'Producción del 1S26 +51 % por la capacidad nueva y servicios de infraestructura de 99,6 M (×4,5) [A7]; precio medio de venta −22 % en el 1S26 [A7].' },
    { periodo: '2027e', volumen_pct: 24.0, precio_pct: -4.0, otros_pct: 0.0, comentario: 'Año entero de los 3,6 GW, baterías (1,2 GWh) y Garoña (715 MW); precio capturado algo más bajo por la canibalización [A7, B10].' },
    { periodo: '2028e', volumen_pct: 16.0, precio_pct: 0.0, otros_pct: 0.0, comentario: 'Centros de datos contratados (438 MW) y baterías que permiten vender fuera de las horas solares [A7].' },
  ],
  mercado_final: null,
  veredicto: 'En parte',
  justificacion: `La prueba de reinversión pasa tras subir el capex final: el capital nuevo rinde un 7,2 %, igual que el ROIC incremental histórico. Pero el crecimiento que financia la propia caja al ROIC actual (5,2 % anual) queda lejos del proyectado (12,8 %, con el +60 % fijo de 2026e): el resto lo pone la deuda y el capital nuevo, como la colocación de 310 M de abril [C10]. El poder de precio es nulo (precio capturado −22 % en el 1S26) y el foso es estrecho: los permisos de acceso a red [B4]. La cuota no se prueba con el motor (la cifra de negocios incluye servicios de infraestructura); en producción, Solaria tiene el 4,6 % de la fotovoltaica española [B7]. Por eso «En parte».`,
};

export const dcf_lectura = `El DCF da 10,96 EUR por acción, un 32,1 % por debajo del precio, con un 82 % del valor en el terminal porque los flujos de 2026e-2028e son negativos. El DCF inverso dice que, con nuestro WACC del 6,43 %, el precio descuenta un crecimiento del 10,4 % anual en 2027e-2035e con un margen del 88 %, frente a nuestro 7,6 % con un margen final del 80 %: el mercado ya paga que se cumpla buena parte del plan de centros de datos y baterías. Visto al revés, a este precio el accionista obtiene un 5,6 % anual, por debajo del WACC (6,43 %) y de lo que hoy pide el mercado con su beta (5,9 %). Con la prima implícita del mercado (4,41 %) el DCF sube a 14,29 EUR, todavía por debajo del precio. El valor es muy sensible al WACC: con el WACC y el crecimiento terminal ±0,5 puntos va de 7,14 a 16,99 EUR.`;

export const narrativas = {
  Bajista: 'El precio capturado sigue cayendo como en 2024-2026 (horas a precio cero en máximos), la capacidad vuelve a quedarse corta y los centros de datos se retrasan con el cambio de Gobierno. El margen recurrente baja cinco puntos y el crecimiento tres; con 4,5 veces de deuda, casi todo el golpe va al accionista.',
  Base: 'Solaria llega a 3,6 GW a fin de 2026, conecta las baterías y cobra los hitos de los 438 MW de centros de datos contratados; el precio capturado se estabiliza en torno a 35-40 EUR/MWh y la inversión baja desde 2028.',
  Alcista: 'El decreto de centros de datos sale tras las elecciones, Solaria firma más MW de «powered land» y las baterías le permiten vender fuera de las horas solares; el precio capturado se recupera con el gas.',
};

export const escenarios_comentario = `La asimetría es mala: el alcista (21,45 EUR) gana un 32,8 % y el bajista (2,57 EUR) pierde un 84,1 %. Es el efecto de la deuda: con 1.329 M de deuda neta y un valor empresa de 3.363 M, cinco puntos de margen menos se comen casi todo el valor del capital. El bajista es verosímil: es lo que ya ha pasado con el precio capturado (−22 % en un año) y con los objetivos de capacidad [A7, C18].`;

export const suma_partes = { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: Solaria publica segmentos geográficos, no por negocio (generación, servicios de infraestructura para centros de datos, baterías); el resultado de cada uno no se puede separar con datos públicos [A1].', confianza: 'Media' };

export const valoracion_comentario = `Pesos: DCF 60 %, escenarios 25 %, comparables 10 % y transacciones 5 %. El DCF es el método más fiable para un productor eléctrico con vida de activos larga y capital intensivo; los escenarios recogen la enorme sensibilidad al precio de la energía. Los comparables y las transacciones dan valores de 26-34 EUR, pero sobre un EBITDA del consenso que incluye plusvalías sin caja, por eso pesan poco. El valor intrínseco queda en 13,98 EUR (−13,4 %). La recomendación la decide el objetivo a 12 meses (regla v3), que da +23,9 % ponderado; pero el valor intrínseco por debajo del precio impide la compra.`;

export const excluidos = 'Historia ADELANTADA en base AJUSTADA (precio de cierre de cada año ÷ BPA del año siguiente sin plusvalías ni reversiones): 2021 23,8x (17,12 ÷ 0,72); 2022 19,9x (17,12 ÷ 0,86); 2023 34,5x (18,61 ÷ 0,54, BPA de 2024 sin la reversión de Puertollano); 2024 10,2x (7,82 ÷ 0,77, BPA de 2025 sin la plusvalía de Generia); 2025 17,1x (18,15 ÷ 1,06, nuestro BPA de 2026e sin Gravyx). Excluido 2020 (23,64 ÷ 0,38 = 62,2x: burbuja renovable de 2020). Mediana, mínimo y media de 2021-2025. Cierres de Yahoo [D1]; BPA de las cuentas [A1-A5].';

export const just12m = {
  Bajista: 'Precio capturado a la baja, capacidad corta y centros de datos retrasados: BPA de 2028e de 1,03 EUR y el PER mínimo de cinco años (10,2 veces, el de 2024, cuando la acción cotizó a 7,82 EUR).',
  Base: '3,6 GW a fin de 2026, baterías y centros de datos contratados: BPA recurrente de 2028e de 1,24 EUR (sin plusvalías de rotación) y PER de 15,8 veces, el actual con el tope de ×1,1.',
  Alcista: 'Decreto de centros de datos y más contratos de «powered land»: BPA de 1,44 EUR y la media larga del PER (21,1 veces).',
};

export const diferencia_consenso = `Nuestro BPA base de 2028e (1,24 EUR) queda un 36 % por debajo del consenso (1,95) [D11]. La mayor parte es de base: el consenso mide ingresos totales (607 M en 2028e) y un EBITDA (515 M) que incluyen plusvalías por rotación de activos (Generia, Gravyx) y otros ingresos sin caja; nosotros proyectamos solo el negocio recurrente (378 M de EBITDA) [D10]. El resto es de crecimiento: partimos de la capacidad rebajada (3,6 GW a fin de 2026) y de un precio capturado a la baja. Revisado supuesto a supuesto, lo mantenemos. Nuestro precio base a 12 meses (19,59 EUR) queda un 12,5 % por debajo del objetivo medio de los analistas (22,39), que está dentro de nuestro rango (10,51-30,38).`;

export const objetivo12m_comentario = `El objetivo a 12 meses ponderado es de 20,02 EUR (+23,9 %; base 19,59 EUR, +21,3 %) y el valor intrínseco de 13,98 EUR (−13,4 %): el objetivo queda un 43 % por encima, así que la tesis de valor no es a 12 meses. La regla de 12 meses supone que el mercado mantiene un PER de unas 16 veces sobre un beneficio que crece un 17 % hasta 2028e; el DCF dice que, contando toda la inversión que hace falta para ese crecimiento, la acción ya está cara. Para cerrar la distancia haría falta que el CMD del 19-nov demuestre que los centros de datos dan caja sin nuevas ampliaciones. Con la historia al cierre (v2, control) la ponderada baja al 16,4 % y el base al 10,6 %.`;

export const catalizadores = {
  items: [
    { fecha: '≈ 16 a 19-nov-2026', evento: 'Resultados de 9M26 (fecha sin confirmar; en 2025 salieron con el CMD)', efecto: 'Precio capturado del 3T, avance hacia la guía de 331 M y cuánto del EBITDA es rotación', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '19-nov-2026', evento: 'Capital Markets Day en Londres', efecto: 'Guía 2027-2030, plan de capital (¿más ampliaciones?) y contratos de centros de datos', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '29-nov-2026', evento: 'Elecciones generales anticipadas', efecto: 'Destino del real decreto de centros de datos y de la regulación del acceso a red', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2026-2027', evento: 'Vencimientos de deuda: 237 M en 2026 y 153 M en 2027 (pagarés del MARF incluidos)', efecto: 'Refinanciación a tipos más altos', probabilidad: 'Media', sentido: '−' },
    { fecha: 'Fin de 2026', evento: 'Entrada en servicio de 3,6 GW y 1,2 GWh de baterías', efecto: 'Primera prueba de la capacidad rebajada', probabilidad: 'Media', sentido: '+/−' },
    { fecha: 'Febrero de 2027', evento: 'Resultados de 2026', efecto: 'EBITDA recurrente frente a la guía y conversión en caja', probabilidad: 'Alta', sentido: '+/−' },
  ],
  confianza: 'Media',
};

export const riesgos = {
  items: [
    { riesgo: 'Canibalización solar: el precio capturado sigue cayendo', tipo: 'Mercado', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−50 % a −84 % (bajista)', mitigante: '65 % de la producción con PPA, baterías de 1,2 GWh', senal: 'Precio capturado solar de UNEF por debajo de 30 EUR/MWh dos trimestres seguidos [B10]' },
    { riesgo: 'Deuda y nuevas ampliaciones de capital', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−10 % a −20 %', mitigante: 'Deuda de proyecto sin recurso, 84 % fija o cubierta', senal: 'Plan de capital del CMD con otra ampliación o deuda neta/EBITDA > 5x [D5]' },
    { riesgo: 'Calidad del beneficio: plusvalías de rotación sin caja', tipo: 'Contable', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Experto independiente en Generia', senal: 'Más del 15 % del EBITDA del año en plusvalías de desconsolidación [A1, A6]' },
    { riesgo: 'Ejecución: capacidad y centros de datos por debajo de lo prometido', tipo: 'Operativo', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−15 %', mitigante: '438 MW de centros de datos ya contratados', senal: 'Menos de 3,6 GW en operación a fin de 2026 [A7, C18]' },
    { riesgo: 'Regulación: decreto de centros de datos, acceso a red y modo reforzado tras el apagón', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 % a +15 %', mitigante: '3,4 GW de acceso asegurado', senal: 'Decreto que no se aprueba tras las elecciones del 29-nov [B4, D19]' },
    { riesgo: 'Gobierno: control familiar, un solo independiente y operaciones vinculadas', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Consejero delegado sin sueldo y con el 8,8 %', senal: 'Voto en contra del presidente por encima del 40 % (40,3 % en 2026) [C3]' },
    { riesgo: 'Posiciones cortas (7,49 % del capital)', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '±10 % en días', mitigante: 'Cierre de cortos ante buenas noticias', senal: 'Cortos por encima del 10 % [C6]' },
    { riesgo: 'Tipos de interés al alza', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−15 % por +0,5 puntos de WACC', mitigante: 'Deuda a tipo fijo', senal: 'Bund a 10 años por encima del 3,8 % [D23]' },
  ],
  premortem: `Es noviembre de 2029 y Solaria vale un 40 % menos. Lo que pasó: España siguió instalando 8-10 GW de solar al año sin almacenamiento suficiente y el precio capturado de mediodía cayó por debajo de 25 EUR/MWh; la parte vendida a mercado, que Solaria subió al 35 % con Garoña, ganó casi nada. Los centros de datos llegaron más tarde de lo prometido tras el cambio de Gobierno, y los hitos de «powered land» que inflaron 2026 no se repitieron. Para seguir construyendo, Solaria hizo otra ampliación por debajo de 15 EUR y siguió presentando plusvalías de rotación como EBITDA, que el mercado dejó de pagar. La señal que lo habría anticipado era el precio capturado del 1S26 (39 EUR/MWh, −22 %) y la rebaja de capacidad de 4,3 a 3,6 GW en septiembre de 2026 [A7].`,
  ia: { exposicion: 'Media', sentido: 'Oportunidad', efecto_valor: '+10 %', comentario: 'La IA no amenaza lo que vende Solaria (electricidad y suelo con acceso a red), pero sí puede darle demanda: los centros de datos necesitan potencia firme y Solaria ya ha contratado 438 MW de «powered land» con dos operadores y un campus de hasta 500 MW en Uruguay [A7, D7]. Esos ingresos (99,6 M en el 1S26) ya pesan más que la venta de energía. El riesgo es que la demanda de IA se frene o que los operadores construyan su propia generación. Señal: nuevos contratos firmados con fecha de conexión en el CMD del 19-nov.' },
  confianza: 'Media',
};

export const preguntas = {
  items: [
    { tema: 'Calidad del EBITDA', pregunta: '¿Cuánto del EBITDA de 2026 y de la guía 2027-2030 son plusvalías por desconsolidar filiales y cuánto es caja?', por_que: 'Gravyx (37,8 M) es el 18 % del EBITDA del 1S26 y su valor lo fijó el socio, que también es accionista de Solaria [A6].' },
    { tema: 'Centros de datos', pregunta: '¿Los hitos de «powered land» (99,6 M en el 1S26) son recurrentes o un cobro único por cada campus?', por_que: 'Explican la mitad de la cifra de negocios del 1S26 y no tienen historia [A7].' },
    { tema: 'Capital', pregunta: '¿Hará falta otra ampliación para el plan 2027-2030?', por_que: 'El flujo libre fue de −196 M de media en tres años y la de abril se hizo a 24 EUR [A, C10].' },
    { tema: 'Precio', pregunta: '¿A qué precio capturado está cerrando los PPA nuevos y por qué sube la parte a mercado al 35 %?', por_que: 'El precio medio de venta en España cayó a 37 EUR/MWh en el 1S26 [A7].' },
    { tema: 'Capacidad', pregunta: '¿Por qué 2.352 MW en el cuadro operativo de 2025 y 3,1 GW en el titular?', por_que: 'Cambia el ROIC del capital ya invertido y la credibilidad de los objetivos [A9].' },
    { tema: 'Gobierno', pregunta: '¿Cómo responderá el consejo al 40,3 % en contra de la reelección del presidente?', por_que: 'Casi todo el capital libre presente votó en contra [C3].' },
    { tema: 'Partes vinculadas', pregunta: '¿Por qué el consejero delegado compra pagarés de la empresa (35,8 M en 2025-2026) y por qué se notificaron tarde?', por_que: 'Operación vinculada notificada meses después del plazo [C7, C8].' },
  ],
  confianza: 'Media',
};

export const fuentes = [];
export const huecos = [];
