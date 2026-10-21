// Textos del analista (Puig, corte 2026-10-11). Citas: [A3] = fuente 3 de A.json; [D13] = fuente 13 de D.json.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const aqui = path.dirname(fileURLToPath(import.meta.url));
const D = JSON.parse(fs.readFileSync(path.join(aqui, 'D.json'), 'utf8'));

let R = {};
try { R = await import('./resumen.mjs'); } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(String(e))) throw e; }
export const resumen = R.resumen ?? null;

export const limitaciones = `Se valora la acción de clase B de Puig Brands, la única que cotiza (Bolsas españolas, ticker PUIG), en euros; precio de cierre del 21-oct-2026 (19,59 EUR), antes de las ventas de los nueve meses, que se publicaron tras el cierre: la reacción del mercado no está en el precio [D3, D22]. Las acciones de clase A (393,4 M, 5 votos cada una) no cotizan y son de la familia Puig; se valoran igual que las B porque tienen los mismos derechos económicos [C5, D1]. Acciones: 563,3 M (568,2 M menos 4,9 M de autocartera), sin dilución [D1]. Cuentas auditadas solo desde 2021 (estados con fines especiales de la OPV): no hay cinco ejercicios anteriores a 2021 con balance y flujos [A5]. EBITDA del informe = el «ajustado» de la empresa, sin «otros ingresos y gastos operativos» (costes de la OPV en 2024, plusvalía de una fábrica en 2025) [A1]. El resultado de las participadas (ISDIN, Lonia, Granado) va fuera del EBITDA y se valora en el puente. El puente es el del 30-jun-2026, con la deuda estacionalmente alta: el circulante consumió 484 M en el semestre y se pagaron 237,5 M de dividendo y 372 M por minoritarios y earn-outs de Charlotte Tilbury [A2]. Las ventas de los nueve meses no traen balance nuevo, así que el puente sigue siendo el de junio. La compra del 50 % restante de ISDIN (900 M al cierre, previsto a finales del 1T27, y 300 M sin intereses en el 1T29) no está ni en el puente ni en la proyección [C13, D22].`;

export const controles_explicados = [];

const rentabilidad = {
  comentario: `**Puig crea valor, pero cada vez menos por euro invertido.** El ROIC después de impuestos fue del 22,3 % y el 22,0 % en 2022-2023 y bajó al 16,3 % en 2024 y al 13,1 % en 2025, frente a un WACC del 8,1 % [A1, A5]. No ha bajado el margen (el EBIT pasó del 13,6 % al 16,1 % de las ventas): ha subido el capital, porque las compras de minoritarios de Byredo y Sturm (1.122 M en 2024) y la salida a bolsa engordaron el fondo de comercio y el patrimonio [A1]. El ROIC incremental de 2021-2025 es del 12,8 %: el crecimiento comprado rinde algo más que su coste, no mucho más. La rotación del activo (0,59 veces) es la de un negocio de marcas con mucho inventario (202 días). L'Oréal, con un margen EBITDA del 24,3 %, tiene un ROIC del 14,3 % y Estée Lauder del 5,9 % [D11, D12].`,
  confianza: 'Media',
};

const balance = {
  comentario: `La deuda neta bajó de 1.608 M en 2023 a 721 M en 2025 gracias a los 1.377 M de la OPV y a un flujo libre de 521 M, pero sube cada primer semestre: 1.589 M a 30-jun-2026 (1,5 veces el EBITDA ajustado), con 484 M de circulante, el dividendo y 372 M de pagos a minoritarios de Charlotte Tilbury [A1, A2]. Con los 558 M de opciones de compra de minoritarios, la deuda neta ajustada es de 2.155 M (2,0 veces el EBITDA). El circulante comercial es alto y estable (20,4 % de las ventas; 202 días de inventario): es el coste de vender perfume en 150 países. La deuda es solo bancaria, sin rating, y la caja de junio (205 M) se apoya en 924 M de líneas no dispuestas [A2]. La compra de ISDIN (900 M en el 1T27 y 300 M en 2029) llevará la deuda hacia el techo de 2 veces que fija la propia empresa [C13].`,
};

const calidad = {
  comentario: `Las cuentas son limpias en lo grande y opacas en las compras. Ernst & Young firma sin salvedades desde la OPV y la revisión del 1S26 tampoco tiene salvedades [A1, A2]. Altman Z de 2,93 (zona gris por la deuda y los intangibles, no por pérdidas), Piotroski F de 8 sobre 9 y Beneish M de −2,60, lejos del umbral de manipulación. Lo que pide atención son los 558 M de opciones de compra de minoritarios a valor razonable (nivel 3): sus cambios de valor van contra el patrimonio (+182 M en 2024, +33 M en 2025) y no pasan por la cuenta, y los earn-outs que se revalorizan a la baja dan ingresos financieros (86,6 M en 2024) porque las marcas compradas (Sturm) rinden menos de lo previsto [A1]. La empresa los excluye del beneficio ajustado. Casi todos los años hay «otros gastos operativos» no recurrentes; en 2024 fueron 146,6 M, por la OPV [A1]. Los intangibles (4.599 M) superan al patrimonio y no se han deteriorado [A1].`,
};

const capital = {
  comentario: `La familia Puig ha asignado bien el capital en perfumería y peor fuera de ella. Las compras de 2020-2022 (Charlotte Tilbury, Byredo, Uriage, Apivita) llevaron a Puig a triplicar sus ventas en cinco años, como prometía el plan de 2021 [C16]; Charlotte Tilbury dio al maquillaje un margen del 11,4 % en 2025 [A1]. Sturm (265 M en 2024) no ha cumplido: sus earn-outs se revalorizaron a la baja y frena el cuidado de la piel premium [A1, A3]. En 2021-2025 Puig generó 1.756 M de flujo libre y gastó 2.050 M en compras, 740 M en dividendos y 109 M en recompras, con un ROIC incremental del 12,8 %. ISDIN (1.200 M por el 50 %, unas 3,7 veces las ventas según AlphaValue) es la compra más grande desde la OPV y llega cuando la fusión con Estée Lauder se rompió: el riesgo es pagar por crecer en dermocosmética lo que la perfumería ya no da [C13, D17].`,
};

const consenso = {
  guidance: `Puig reafirmó el 30-jul-2026, con los resultados del primer semestre, su objetivo para 2026: crecer por encima del mercado de belleza de gama alta en términos comparables y mantener el margen de EBITDA ajustado estable frente al 20,7 % de 2025 [A3, C16]. El primer semestre cerró con un crecimiento comparable del 4,4 % (4,1 % en el 2T), ventas de 2.353,7 M y un margen del 19,5 % (+0,15 puntos); la deuda neta fue de 1,5 veces el EBITDA ajustado, por debajo del techo de 2,0 veces que la empresa fija a medio plazo [A2, A3]. A diferencia de 2025 (6-8 % comparable), la guía ya no da un rango numérico. El plan a medio plazo se presentará en el día del inversor del 28-oct-2026 [A3].`,
};

const multiplos_historicos = {
  comentario: `Puig solo tiene dos cierres desde la OPV de mayo de 2024 (24,50 EUR): 17,83 EUR en 2024 y 14,87 EUR en 2025 [D3]. Salió a bolsa a unas 15 veces el EBITDA y hoy cotiza a 10,2 veces el de los últimos 12 meses y 9,6 veces el de los próximos, con un PER de 15,6 veces [D5]. La compresión no la explica el beneficio, que subió de 531 M en 2024 a 594 M en 2025, sino el frenazo del mercado de perfumería selectiva (+1 % en 2025) y un flotante pequeño (24,9 %) en una empresa que controla una familia [B1, D4].`,
  confianza: 'Media',
};

const comparables = {
  empresas: D.comparables.empresas.filter((e) => !/e\.l\.f/i.test(e.nombre)),
  criterio: `Siete empresas cotizadas de belleza de gama alta: L'Oréal y Estée Lauder (líderes mundiales del lujo), Coty (perfumes con licencias de moda, el modelo más parecido a Puig en fragancias), Interparfums SA e Inter Parfums Inc (perfumes con licencias; la estadounidense controla la francesa), Shiseido (prestigio en Asia) y Beiersdorf (cuidado de la piel). Se quitan e.l.f. Beauty (maquillaje de masas en EE. UU., con un crecimiento del 16 % y un PER de 52 veces que no tienen nada que ver con Puig) y LVMH (los perfumes pesan menos del 10 % del grupo). Kao y las de consumo masivo quedan fuera por mezcla de negocio.`,
  comentario: `Puig cotiza a 9,6 veces el EBITDA de los próximos 12 meses y 15,6 veces el beneficio, frente a medianas de 12,3 y 25,3 veces de sus comparables, con un margen EBITDA más alto (20,8 % frente a 17,3 %) y un crecimiento parecido (5,8 % frente a 3,0 %) [D11, D12]. Solo Coty (7,3 veces, con deuda de 3,7 veces el EBITDA y ventas a la baja) cotiza más barata. La mediana de EV/EBITDA daría 23,54 EUR. El PER de los comparables está inflado por beneficios hundidos (Estée Lauder 31,2 veces, Coty 26,1, Shiseido 25,3), así que el valor por PER (29,37 EUR) es poco fiable. Parte del descuento es merecido: flotante del 24,9 %, dos clases de acciones y una familia con el 93 % de los votos [C7]. Pesan un 15 %.`,
  confianza: 'Media',
};

const transacciones = {
  comentario: `Las marcas de prestigio con crecimiento se han pagado a 3,7-4,7 veces las ventas (ISDIN en 2026, Rhode en 2025, Aesop en 2023) y la de nicho Byredo a 7,6 veces [D13, D14, D17, D19]; Wella, a 12,3 veces el EBITDA [D20]. La mediana de 3,8 veces las ventas daría 33,17 EUR, un 83,5 % más que el precio, pero son compras de marcas sueltas con prima de control. Puig no es opable: la familia tiene el 93,21 % de los votos [C7]. La única operación posible, la fusión con Estée Lauder, se rompió en mayo de 2026 sin publicar términos [C10]. Pesan un 5 %.`,
  confianza: 'Media',
};

const sentimiento = {
  lectura: `El inversor particular está dividido y algo más optimista que en junio. Tras la ruptura con Estée Lauder, el foro de Investing y el de Rankia se llenaron de quejas sobre el trato de la familia al minoritario; en septiembre y octubre domina la idea de que la acción está barata y los analistas la apoyan [E1, E3, E6, E7]. El dato da la razón al enfado: el 43,7 % del capital libre presente en la junta votó contra la política de remuneración [C4]. La compra de ISDIN reparte opiniones entre cara y estratégica, el mismo debate que el informe (unas 3,7 veces las ventas). No hay euforia ni capitulación: el sentimiento no cambia la decisión, pero confirma que el descuento por gobierno es real.`,
};

// Desde el 21-oct, consenso, múltiplos, comparables, transacciones y sentimiento salen de las notas D y E (actualizadas tras el 3T26).
export const secciones = { rentabilidad, balance, calidad, capital };

export const suma_partes = {
  aplica: false, descuento_holding_pct: 0, partes: [],
  comentario: `No se usa en el valor objetivo. Los tres segmentos publican resultado operativo (Fragancias y Moda 683 M, Maquillaje 96 M y Cuidado de la piel 33 M en 2025), pero los costes centrales no asignados y la publicidad compartida hacen que una suma de partes dependa de cómo se repartan [A1]. Además, el 72 % de las ventas y el 84 % del resultado de los segmentos son perfumes: el valor del grupo es el de su perfumería.`,
  confianza: 'Media',
};

export const dcf_justificacion = {
  crecimiento: `2026e +4,0 %: los nueve meses crecen un 4,1 % reportado (+4,8 % comparable), con un 3T26 del +7,2 % reportado (+5,6 % comparable) y la divisa a favor por primera vez en el año; la guía, reiterada el 21-oct, pide crecer más que el mercado de belleza premium [A11, D22]. El consenso da +3,7 % [D5]. 2027e-2028e +5,5 %: el consenso da +6,1 % y +5,2 % [D5]; Puig creció un 10,9 % y un 7,8 % comparable en 2024-2025 y ganó 0,3 puntos de cuota en el 1S26 [A3, B3]. Luego baja medio punto al año hasta el 3 % de 2033e. La media (4,4 %) está por debajo del 5 % que estimamos para el mercado de perfumería selectiva y muy por debajo del 18,2 % anual de 2021-2025, que incluye compras [B1]. ISDIN no entra: no ha cerrado.`,
  margenes: `Margen EBITDA ajustado del 20,7 % en 2026e (la guía: estable) que sube al 21,5 % en 2030e, 0,2 puntos por año, como en 2024-2025 (20,2 % y 20,7 %) [A1, C16]. El consenso da un 20,7-20,9 % en 2026e-2028e [D5]. El techo del 21,5 % queda por debajo del 24,3 % de L'Oréal y por encima del 16,5 % de Estée Lauder [D11]. El margen bruto (75,1 %) ya está en máximos; la mejora tiene que venir de diluir costes fijos, porque la publicidad (32,7 % de las ventas) no baja [B1].`,
  inversion: `Capex del 5,6 % de las ventas: el de caja de 2025 (3,9 %) más los pagos de arrendamientos (1,8 %), para que el DCF pague el alquiler de sus 330 tiendas y oficinas (NIIF 16) [A1, B1]. La amortización (4,7 % en 2025, incluida la de derechos de uso) converge al 5,2 %. Circulante del 20,5 % de las ventas, el de 2025 (20,4 %); el negocio necesita unos 20 céntimos de circulante por euro de ventas nuevas. Tipo impositivo del 25 %, frente al 24,7 % de 2025 [A1].`,
  wacc: `Tasa libre del 3,47 %, el Bund alemán a 10 años del 21-oct-2026 [D8]. Beta de 0,86: la de Damodaran para productos del hogar y cuidado personal (0,74 desapalancada) reapalancada con un 21 % de deuda sobre capital [D10]; la de la propia acción (0,47-0,71 frente al STOXX 600) solo tiene 29 meses de historia [D3]. Prima de mercado del 5,5 % y una prima adicional de 1 punto por el control: la familia tiene el 93 % de los votos, el flotante es del 24,9 % y el capital libre votó en un 43,7 % contra la política de remuneración [C4, C7]. Coste de la deuda del 4,0 % y un 19 % de deuda a valor de mercado. WACC del 8,02 %; con la prima implícita del mercado (4,20 %), el 7,12 % [D21].`,
  terminal: `Crecimiento a perpetuidad del 2,5 %: inflación del euro de unos 2 % y algo de crecimiento real, por debajo de la tasa libre menos medio punto (3,03 %). El múltiplo de salida implícito es de 9,6 veces el EBITDA, por debajo de los 10,2 de hoy y de la mediana de 12,3 veces de los comparables.`,
};

export const etapa2_justificacion = `No se usa. El ROIC (13,1 %) supera al WACC en 5 puntos justos, y el mercado de perfumería selectiva creció solo un 1 % en 2025: no hay base para alargar el crecimiento más allá de 2033e [B1].`;

export const dcf_lectura = `El DCF da 20,45 EUR por acción, un 4,4 % por encima del precio de 19,59 EUR, con un 70 % del valor en el terminal. **Tras la subida de octubre, el precio ya pide casi lo que esperamos.** El DCF inverso dice que los 19,59 EUR suponen un crecimiento de las ventas del 3,4 % anual en 2027e-2033e, frente al 4,4 % de nuestro caso base, o un margen EBITDA del 20,9 % en vez del 21,5 %. Comprar a este precio rinde un 8,2 % anual si se cumple el caso base, apenas lo que cuesta el capital (WACC del 8,02 %). El 11-oct, a 18,08 EUR, el precio pedía un 1,9 % y rendía un 8,7 %: la acción ha subido un 8,4 % en doce días y se ha comido el margen [D3]. El valor es sensible a la tasa: con el WACC y el crecimiento a perpetuidad medio punto arriba o abajo va de 17,55 a 24,61 EUR.`;

export const narrativas = {
  Bajista: 'El mercado de perfumería selectiva se queda en el +1 % de 2025, las imitaciones baratas y las marcas nacidas en redes quitan precio, y Puig crece como Coty o Estée Lauder en 2024-2026: menos del 1 % anual y 3 puntos menos de margen por más publicidad. Es lo que les pasó a esos dos competidores, cuyo margen operativo cayó al 5 % y al −1 % [B8, B9].',
  Base: 'Puig crece algo por debajo de su mercado (4,4 % anual), con un margen que sube 0,2 puntos al año hasta el 21,5 %, y la compra de ISDIN se paga a su valor.',
  Alcista: 'La perfumería de nicho (Byredo) y Charlotte Tilbury vuelven a crecer a un dígito alto, como en 2024, y el día del inversor fija un margen del 22-23 %: ventas un 6,4 % anual y margen del 22,5 %.',
};

export const escenarios_comentario = `La asimetría es mala: el alcista vale 23,90 EUR (+22,0 %) y el bajista 13,11 (−33,1 %), 0,66 veces. El bajista no es cosmético: deja las ventas casi planas siete años y quita tres puntos de margen, lo que ya les pasó a Coty y Estée Lauder. El alcista está limitado porque no damos a Puig un margen como el de L'Oréal. El valor ponderado por probabilidad es de 19,31 EUR, un 1,4 % por debajo del precio. Con la prima de riesgo que hoy pide el mercado (4,20 %), el bajista sube a 15,59 EUR y el alcista a 28,94, una asimetría de 2,3 veces.`;

export const valoracion_comentario = `Pesos: DCF 55 %, escenarios 25 %, comparables 15 %, transacciones 5 % y suma de partes 0 %. El DCF manda porque la caja de Puig es predecible (conversión del 79 % del beneficio en 2021-2025) y recoge el descuento por gobierno en el WACC. Los escenarios pesan un 25 % porque el riesgo de que la perfumería se estanque es real. Los comparables (unos 30 EUR) pesan solo un 15 % por dos razones: su PER está inflado por beneficios hundidos, y la muestra es frágil, porque la mediana del EV/EBITDA de los próximos 12 meses va de 12,7 a 15,1 veces según qué comparable se quite (24,50 a 29,36 EUR por acción). Las transacciones (33,17 EUR) pesan un 5 % porque llevan prima de control y Puig no es opable. La dispersión (19,31-33,17 EUR) es grande y el valor intrínseco, 22,24 EUR, queda un 13,5 % por encima del precio, sobre todo por los múltiplos. La participación en ISDIN (50 %) va al precio de la compra del otro 50 % (1.200 M en vez de 168 M contables): a valor contable, el valor por acción bajaría 1,83 EUR [A2, C13].`;

export const sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 2.0, precio_pct: 2.5, otros_pct: -1.0, comentario: '1S26: +4,4 % comparable con −2,1 puntos de divisa; subidas de precio en EE. UU. desde agosto de 2025 por los aranceles; reparto entre volumen y precio, estimación propia [A3, B1].' },
    { periodo: '2027e', volumen_pct: 3.0, precio_pct: 2.5, otros_pct: 0.0, comentario: 'Consenso de +6,1 % [D5]; Puig ganó 0,3 puntos de cuota en perfumería selectiva en el 1S26 y tiene tres de las diez primeras marcas [B3, B1]. Sin ISDIN.' },
    { periodo: '2028e', volumen_pct: 3.0, precio_pct: 2.5, otros_pct: 0.0, comentario: 'Consenso de +5,2 % [D5]; precio y mezcla hacia el nicho (Byredo, Penhaligon\'s) y el maquillaje de Charlotte Tilbury.' },
    { periodo: '2029e', volumen_pct: 2.5, precio_pct: 2.5, otros_pct: 0.0, comentario: 'Mercado de perfumería selectiva previsto al +5 % anual (estimación propia sobre L\'Oréal y el folleto de la OPV) [B5, B13].' },
  ],
  mercado_final: null,
  veredicto: 'Sí',
  justificacion: `Sí. El 4,4 % anual del caso base apenas necesita capital (la reinversión neta es el 12 % del beneficio operativo después de impuestos) y queda por debajo de lo que Puig ya ha demostrado: un 10,9 % y un 7,8 % comparable en 2024-2025, un 4,4 % en el 1S26 con el mercado casi plano, y 0,3 puntos más de cuota en perfumería selectiva [A3, B3]. El poder de precios está probado: el margen bruto subió del 72,9 % al 75,1 % en cuatro años y Puig subió precios en EE. UU. en 2025 sin perder cuota [A1, B1]. El riesgo no es la calidad sino el mercado: si la perfumería se queda en el +1 % de 2025, el crecimiento caerá, y eso es el escenario bajista. No se da cuota implícita porque el mercado de perfumería no incluye el maquillaje ni el cuidado de la piel de Puig.`,
};

export const catalizadores = {
  items: [
    { fecha: '28-oct-2026', evento: 'Día del inversor (Capital Markets Day) en Madrid: plan a medio plazo con objetivos de crecimiento y margen', efecto: 'Un objetivo de margen del 22-23 % o de crecimiento por encima del 6 % llevaría al alcista; uno conservador confirmaría el precio', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '22-oct-2026', evento: 'Reacción del mercado a las ventas de los nueve meses (publicadas el 21-oct tras el cierre)', efecto: 'El 3T26 (+5,6 % comparable) supera el +5,0 % que esperaba Jefferies; la acción llega con un +11,6 % en un mes [D22, D25]', probabilidad: 'Alta', sentido: '+' },
    { fecha: '1T27', evento: 'Cierre de la compra del 50 % de ISDIN (900 M al cierre) tras la autorización de competencia', efecto: 'Consolida unas ventas de unos 650 M (dato de prensa) y sube la deuda hacia 2 veces el EBITDA', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Feb-2027', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Primer año con ISDIN y prueba de si el margen se mantiene estable', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Mayo-junio de 2027', evento: 'Junta general: votos sobre remuneración y dividendo', efecto: 'Si el capital libre vuelve a votar en un 40 % en contra, el descuento por gobierno seguirá', probabilidad: 'Media', sentido: '−' },
    { fecha: '2028-2031', evento: 'Ventana de la opción sobre el 15 % restante de Charlotte Tilbury', efecto: 'Pago a los fundadores que ya está en el puente (parte de los 558 M de opciones)', probabilidad: 'Media', sentido: '+/−' },
  ],
  confianza: 'Media',
};

export const riesgos = {
  items: [
    { riesgo: 'La perfumería selectiva se estanca tras el auge de 2021-2024', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−33,1 % (escenario bajista)', mitigante: 'Cuota del 11,1 % al alza y tres de las diez primeras marcas', senal: 'Crecimiento comparable de Fragancias y Moda por debajo del 3 % dos trimestres seguidos' },
    { riesgo: 'Gobierno: la familia decide sola (93 % de los votos) y puede tomar decisiones que no favorecen al minoritario', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 % (un punto más de prima de riesgo)', mitigante: 'Siete de trece consejeros independientes y comisión de auditoría independiente', senal: 'Nuevas operaciones con Exea o con sociedades de la familia; voto libre en contra por encima del 40 %' },
    { riesgo: 'ISDIN pagada cara: 1.200 M por el 50 % (unas 3,7 veces las ventas)', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−1,83 EUR si ISDIN valiera su valor contable', mitigante: 'Puig conoce ISDIN desde hace años (50 % desde 2021) y 300 M se pagan sin intereses en 2029', senal: 'Crecimiento de ISDIN por debajo del 8 % o deterioro del fondo de comercio' },
    { riesgo: 'Promoción y publicidad: la competencia (L\'Oréal con Kering Beauté) obliga a gastar más', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−8 % por cada punto de margen EBITDA', mitigante: 'Margen bruto del 75,1 %, en máximos', senal: 'Publicidad y promoción por encima del 33 % de las ventas' },
    { riesgo: 'Divisa: el 35 % de las ventas son de América y la cuenta está en euros', tipo: 'Financiero', probabilidad: 'Alta', impacto: 'Bajo', efecto_valor: '−3 % por un dólar un 10 % más débil (estimación propia)', mitigante: 'Fabricación en Europa y precios en dólares', senal: 'Efecto divisa por encima de −2 puntos en las ventas' },
    { riesgo: 'Comercio de viaje y conflictos (Oriente Medio): 10 % de las ventas', tipo: 'Geopolítico', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−2 %', mitigante: 'Impacto de solo 14 M en el 1S26', senal: 'Caídas del canal de viaje y del Golfo' },
    { riesgo: 'Maquillaje dependiente de una sola marca (Charlotte Tilbury) y de su fundadora', tipo: 'Negocio', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Colaboración de la fundadora prorrogada en 2024 y Puig con el 85 %', senal: 'Margen de Maquillaje por debajo del 9 %' },
  ],
  premortem: `Octubre de 2029: la acción ha caído un 40 %, a unos 11 EUR. La historia más probable empieza en el día del inversor de octubre de 2026: Puig promete un crecimiento por encima del mercado, pero en 2027 el mercado de perfumería selectiva crece solo un 1-2 %, como en 2025, porque el consumidor joven compra brumas corporales y perfumes de imitación y la generación que disparó las ventas de 2021-2024 ya tiene su fragancia. Puig defiende la cuota con más publicidad y el margen cae del 20,7 % al 18 %. ISDIN, que costó 1.200 M, crece al 4 % y obliga a deteriorar parte del fondo de comercio; con la deuda en 2 veces el EBITDA, se recorta el dividendo. El mercado deja de ver a Puig como una L'Oréal pequeña y la valora como a Coty, a 7 veces el EBITDA. El indicador que lo habría anticipado: el +1 % del mercado selectivo en 2025 y el frenazo del crecimiento comparable del 7,8 % al 4,4 % en el 1S26.`,
  confianza: 'Media',
};

export const preguntas = {
  items: [
    { tema: 'Crecimiento', pregunta: '¿Qué crecimiento comparable espera la dirección para la perfumería en 2027 si el mercado selectivo sigue cerca del +1 % de 2025?', por_que: 'Es la diferencia entre el 3,4 % que descuenta el precio y el 4,4 % de nuestro caso base.' },
    { tema: 'ISDIN', pregunta: '¿Qué EBITDA tiene ISDIN y qué múltiplo se pagó? ¿Qué sinergias se esperan y cuándo?', por_que: 'La compra (1.200 M por el 50 %) vale 2,13 EUR por acción y el EBITDA no se ha publicado.' },
    { tema: 'Margen', pregunta: '¿Por qué el margen EBITDA ajustado no sube más deprisa con un margen bruto del 75 %? ¿Qué parte de la publicidad es fija?', por_que: 'Cada punto de margen mueve el valor un 8 %.' },
    { tema: 'Gobierno', pregunta: '¿Por qué el 43,7 % del capital libre votó contra la política de remuneración en 2026, y piensa el consejo cambiar las métricas a ROIC o rentabilidad para el accionista?', por_que: 'El plan a largo plazo mide margen y ventas, no la rentabilidad del capital invertido.' },
    { tema: 'Estée Lauder', pregunta: 'Tras la ruptura de mayo con Estée Lauder, ¿contempla la familia otras operaciones de integración o solo compras como ISDIN?', por_que: 'Una operación de control es lo único que acercaría el precio al de las transacciones (33,17 EUR).' },
    { tema: 'Minoritarios', pregunta: '¿Cuánto costará el 15 % restante de Charlotte Tilbury y las opciones de Sturm, Kama y Loto del Sur, y cuándo?', por_que: 'Son 558 M de pasivos en el puente, a valor razonable de nivel 3.' },
    { tema: 'Cuidado de la piel', pregunta: '¿Qué plan hay para Dr. Barbara Sturm, cuyas previsiones se han revisado a la baja?', por_que: 'El margen del segmento bajó al 6,0 % y es la compra que no ha funcionado.' },
  ],
  confianza: 'Media',
};

export const fuentes = [];
export const huecos = [];
export const parches = [
  { ruta: 'identificacion.sector', valor: 'Consumo básico' },
  { ruta: 'identificacion.industria', valor: 'Productos de cuidado personal' },
];

export const just12m = {
  Bajista: 'La perfumería se estanca y el mercado paga a Puig como a Coty: BPA de 2028e de 0,92 EUR, el de nuestro escenario bajista.',
  Base: 'Nuestro BPA de 2028e (1,22 EUR, un 4 % por debajo del consenso de 1,27) a un PER que baja de 17,3 a 16,2 veces, hacia la mediana adelantada desde la OPV (15,2 veces) [D5].',
  Alcista: 'El día del inversor fija un margen del 22-23 % y la perfumería de nicho acelera: BPA de 2028e de 1,34 EUR y un PER de 21,9 veces, todavía por debajo de L\'Oréal.',
};

export const objetivo12m_comentario = 'Objetivo ponderado a 12 meses de 19,73 EUR (+2,9 % con dividendo), en línea con el consenso (19,94 EUR, 16 analistas) [D5, D6]. La historia de PER es corta (dos años desde la OPV), y la regla usa el PER adelantado (v3), que da un 2,9 %; con el PER de cierre (v2) daría un 5,2 %. Las dos lecturas dan Mantener.';
