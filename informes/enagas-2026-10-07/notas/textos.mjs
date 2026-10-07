// Textos del analista para Enagás (corte 2026-10-07). Citas: [A3] = fuente 3 de A.json, [P1] = fuente propia.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const aqui = dirname(fileURLToPath(import.meta.url));
const leer = (f) => JSON.parse(readFileSync(join(aqui, f), 'utf8'));
// Convierte las citas [1, 7] o [3-5] de una nota a [A1, A7] / [A3, A4, A5].
const conv = (txt, L) => (txt == null ? txt : txt.replace(/\[([0-9][0-9,\s\-–]*)\]/g, (_, g) => {
  const ids = [];
  for (const parte of g.split(',')) {
    const [a, b] = parte.trim().split(/[-–]/).map(Number);
    if (b) for (let i = a; i <= b; i++) ids.push(i); else if (a) ids.push(a);
  }
  return `[${ids.map((i) => L + i).join(', ')}]`;
}));

const A = leer('A.json'); const D = leer('D.json'); const E = leer('E.json');

// Fuentes propias: P1-P3 mías; P4-P11 = las ocho de E.json (subagente de transacciones), en el mismo orden.
const fuentes = [
  { id: 1, titulo: 'Circular 5/2026, de 8 de septiembre, de la CNMC: tasa de retribución financiera de regasificación, transporte, gestión técnica y distribución de gas natural 2027-2032 (BOE-A-2026-19426)', editor: 'BOE / CNMC', tipo: 'Primaria', fecha: '2026-09-18', url: 'https://www.boe.es/boe/dias/2026/09/18/pdfs/BOE-A-2026-19426.pdf' },
  { id: 2, titulo: 'Spain 10Y Bond Yield (comprobación a la fecha de corte: 4,12 %, +0,90 pp en un año)', editor: 'Trading Economics', tipo: 'Datos de mercado', fecha: '2026-10-07', url: 'https://tradingeconomics.com/spain/government-bond-yield' },
  { id: 3, titulo: 'Enagás cierra la compra del 31,5 % de Teréga a GIC', editor: 'Forbes España', tipo: 'Prensa', fecha: '2026-07-30', url: 'https://forbes.es/?p=991204' },
  ...E.fuentes.map((f) => ({ ...f, id: f.id + 3 })),
];
const convE = (t) => (t == null ? t : t.replace(/\[([0-9][0-9,\s]*)\]/g, (_, g) => `[${g.split(',').map((x) => 'P' + (Number(x.trim()) + 3)).join(', ')}]`));

// Transacciones: las de D (citas a D) más las de E (citas a P).
const operaciones = [
  ...D.transacciones.operaciones.map((o) => ({ ...o, comentario: conv(o.comentario, 'D') })),
  ...E.transacciones.operaciones.map((o) => ({ ...o, comentario: convE(o.comentario) })),
];

const textos = {};

textos.limitaciones = 'Cotización: BME (Mercado Continuo), única línea. Precio de 16,22 EUR, cierre del 6-oct-2026 (MarketScreener): la fecha de corte cae en plena sesión y Yahoo no tenía aún la barra del 6-oct [D3, D2]. **EBITDA y EBIT sin participadas**: las cuentas meten el resultado por puesta en equivalencia (131,6 M en 2025) dentro del resultado de explotación; aquí se pasa al resultado financiero (el BAI no cambia) y las participadas se valoran en el puente, para no contarlas dos veces [A1]. Por eso el margen EBITDA de este informe es inferior al que publica Enagás. El EBITDA del consenso (definición de la empresa, con participadas antes del PPA) se homogeneiza restando un 22 % de las ventas (≈ 200 M en 2027e, estimación propia: 172 M de participadas en 2026 más ≈ 41 M de Teréga menos ≈ 6 M de Saggas) [A6, D6]. **RAB**: Enagás no publica su base de activos regulada a la fecha del puente; se usa la cifra de gas de 2026 del plan estratégico (≈ 2.700 M, redondeada por la empresa) [A9]. **Asociadas a valor estimado**, no contable (ver valoración). Cuentas de 2018-2020 no disponibles en texto (el PDF de 2021 está escaneado): la serie empieza en 2021. Las cifras de la CNMC van por año de gas (octubre-septiembre) y se asimilan al año natural.';

textos.controles_explicados = [
  { control: 'Regresión múltiplo-crecimiento', explicacion: 'R² de 0,02: en reguladas el múltiplo depende del crecimiento de la RAB y del riesgo regulatorio, no del de las ventas (Elia crece un 43,6 % por un cambio de perímetro). No se usa la regresión.' },
];

textos.secciones = {
  financieros: {
    ajustes: '**Ajuste de este informe: participadas fuera del EBITDA y del EBIT.** Restamos el resultado de participadas de cada año (163,3 / 146,8 / 147,3 / 146,5 / 131,6 M en 2021-2025 y 138,3 M en el LTM) del EBITDA y del EBIT y lo sumamos al resultado financiero; el BAI y el beneficio no cambian. Las participadas se valoran aparte, en el puente. El EBITDA sin participadas de 2025 es de 520,3 M. ' + conv(A.financieros.ajustes, 'A'),
  },
  rentabilidad: {
    comentario: 'Enagás **no crea valor sobre su capital invertido al coste actual**: el ROIC (con el EBIT sin participadas) ha oscilado entre el 3,4 % y el 4,6 % en 2021-2025 y fue del 4,1 % en 2025, frente a un WACC del 5,63 %. No es un problema de gestión, sino de diseño regulatorio: la CNMC fijó para 2021-2026 una retribución financiera del 5,44 % antes de impuestos sobre el valor neto de los activos y, además, una parte de la base está casi amortizada y solo cobra extensión de vida útil y operación [B3, B7]. El ROE del 14,5 % de 2025 está inflado por 72,8 M de plusvalías y por el apalancamiento (deuda neta / EBITDA de 4,6x) [A7]. Para 2027-2032 la TRF sube al 6,46 % (4,85 % después de impuestos) [P1]: el ROIC debería acercarse al 5 %, todavía por debajo de nuestro WACC. El ROIC incremental no es útil aquí porque la inversión de 2021-2025 (≈ 107 M al año) fue menor que la amortización y el capital invertido cayó con las ventas de Tallgrass y GNL Quintero [A1, A3]. Snam, con una RAB creciente, gana un margen EBIT del 46,7 % frente al 24,2 % de Enagás [B20].',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Seis operadores europeos de redes reguladas cotizados (gas: Snam e Italgas; electricidad: Redeia, Terna, Elia y National Grid) y Naturgy como contraste no regulado. No hay un transportista de gas español cotizado distinto de Enagás; Fluxys Belgium y REN se descartan por liquidez y por falta de consenso gratuito. Las cifras de cada uno son de MarketScreener a la misma fecha [D13-D19].',
    comentario: 'Con el EBITDA sin participadas, Enagás cotiza a 9,5x el EBITDA de los próximos 12 meses frente a una mediana de 10,0x, y a un PER de 14,7x frente a 13,9x. Por EV/EBITDA, la mediana daría 17,12 EUR; por PER, 15,31 EUR; los comparables dan, en conjunto, el precio actual (16,22 EUR). **El descuento en EV/EBITDA está justificado**: los pares crecen (crecimiento esperado de las ventas: mediana del 8,2 %) porque su RAB crece un 5-8 % al año con la electrificación, mientras la RAB de gas de Enagás baja de ≈ 3.100 M en 2024 a ≈ 2.700 M en 2026 y ≈ 2.100 M en 2030 [A9]. Por EV/RAB (fuera del motor, en `notas/rab_comparables.json`), los pares cotizan a 1,17-1,53x y Enagás a 1,79x; pero la RAB de Enagás no recoge los activos totalmente amortizados que siguen cobrando extensión de vida útil y operación, así que la cifra no es comparable [D21-D25, A9]. Naturgy (7,3x) marca el suelo de un negocio no regulado. Usamos la mediana de EV/EBITDA y PER con un 25 % de peso.',
  },
  transacciones: {
    operaciones,
    comentario: 'Las operaciones recientes con múltiplo publicado se pagaron a 7,5-11,3x el EBITDA (Open Grid Europe 11,3x, Electricity North West 10,6x, 2i Rete Gas 9,7x, Grain LNG 7,5x) [P4-P10, D26]. En EV/RAB, el rango va de 1,07x (Teréga y Saggas, compradas por la propia Enagás en 2026) a 1,44-1,62x (redes eléctricas británicas) [D6, P6, P8]. Enagás no es un objetivo realista: la disposición adicional 31.ª de la Ley de Hidrocarburos limita a cualquier accionista al 5 % del capital y al 3 % del voto [C1], así que no puede haber prima de control. Por eso las transacciones pesan cero en el valor objetivo; sirven para leer lo que paga el mercado privado por activos de gas regulados: alrededor de 1,07x la RAB en Europa continental, muy por debajo del 1,79x al que cotiza Enagás sobre su RAB publicada.',
  },
  multiplos_historicos: {
    comentario: 'El EV/EBITDA de los últimos 12 meses (9,7x) está en el mínimo de cinco años (media de 12,6x), pero el PER (14,7x) está en el máximo (media de 11,2x). La divergencia tiene una causa: entre 2021 y 2025 Enagás vendió Tallgrass y GNL Quintero y amortizó deuda, con lo que bajó el EV y el EBITDA a la vez, mientras el beneficio recurrente caía de ≈ 400 M a ≈ 235 M por la reducción de la retribución [A1, A7]. Con el bono español a 10 años en el 4,12 %, 90 pb más que hace un año [P2], pagar el PER más alto de la serie por un beneficio que no crece es exigente.',
    confianza: 'Media',
  },
};

textos.justificacion = {
  crecimiento: '**Ingresos desde la retribución regulada**, no con un crecimiento libre (modelo en `notas/regulado.mjs`). 2026e (−6,0 %) sale de la guía: los 125,9 M de obras de sellado de Castor de 2025, neutras en EBITDA, no se repiten [A7, A6]. 2027e (+1,9 %): la CNMC calcula que el nuevo marco sube la retribución del transporte y la regasificación del sector de 883 M en 2026 a 961 M en 2027 y la deja en 940 M en 2032 [B7]; Enagás tiene ≈ 73,5 % de esa retribución (estimación a partir de las cuotas de la CNMC) [B6, B7]. Almacenamiento, gestión técnica y resto regulado, +2 % al año (real decreto de almacenamiento en tramitación) [A6]; otros ingresos, +3 %. 2033-2035: periodo regulatorio sin metodología, −1,5 % en 2033 y estabilidad después. El consenso espera 906,7 M en 2027e [D3]: nuestros ingresos son un 3,2 % mayores porque incluyen los de obras y servicios que la empresa factura como regulados.',
  margenes: 'EBITDA sin participadas: 448 M en 2026e (guía de ≈ 620 M menos ≈ 172 M de participadas antes del PPA) [A6] y 504 M en 2027e: la subida de la TRF del 5,44 % al 6,46 % y de los valores unitarios de O&M (+32,6 %) compensa el fin de la retribución por continuidad de suministro [P1, B3, B23]. El margen baja del 53,9 % de 2027e al 48,7 % de 2035e porque el opex crece al 1,5 % (objetivo del plan de eficiencia) y la retribución del sector cae un 2 % hasta 2032 [A8, B7]. Frente al consenso homogeneizado, el EBITDA queda un 1,2 % por encima en 2026e y un 3,9 % y un 2,9 % por debajo en 2027e y 2028e: no consolidamos Saggas (está en el puente).',
  inversion: 'Capex sin hidrógeno: 175 M en 2026e (guía de ≈ 225 M menos ≈ 50 M de hidrógeno) [A6] y 150 M al año en 2027-2032, por encima de la media de 2021-2025 (≈ 107 M) por los negocios adyacentes [A1]. El hidrógeno queda fuera del caso base: sin marco retributivo aprobado, su valor actual a una rentabilidad igual al WACC es nulo; entra en el alcista. Amortización de 280 M en 2026e, −2,5 % al año. En 2033-2035 el capex sube hasta igualar la amortización (223 M) para mantener la base de activos en el valor terminal. Circulante comercial de −12 % de las ventas, como en 2025.',
  wacc: 'Tasa libre: bono español a 10 años del 4,14 % (4,12 % en una segunda fuente) [D11, P2]. Beta: la sin apalancar de la CNMC (0,45) reapalancada a la estructura de Enagás a valor de mercado (deuda / fondos propios de 0,69): 0,68; la beta de mercado (0,35 frente al IBEX, cinco años) es baja porque el IBEX es un índice bancario [P1, D2]. Prima de mercado del 5,02 %, la de la CNMC [P1]. Coste de la deuda antes de impuestos del 3,8 % (estimación propia: la deuda vieja cuesta el 2,0 %, pero el bono español ya paga el 4,1 % y Enagás es BBB+) [A6]. Peso de la deuda del 41 %. WACC del 5,63 %, **0,78 pp por encima** del WACC después de impuestos que reconoce la CNMC (4,85 %), calculado con una tasa libre del 3,27 % [P1].',
  terminal: 'Gordon con crecimiento del 0,5 %: por debajo de la inflación del 2 % que la CNMC usa para los valores unitarios, porque la RAB de gas se reduce y la demanda prevista baja de 311,6 TWh en 2025 a 283,7 TWh en 2032 [B7]. El múltiplo implícito del valor terminal es de 7,6x el EBITDA, por debajo de la mediana de comparables (10,0x), que crecen. Un múltiplo de 10x supondría que la red de gas sigue invirtiendo como una eléctrica.',
};

textos.lectura = 'El DCF da **13,13 EUR por acción**, un 19,1 % por debajo del precio, con un 53 % del valor en el terminal. **El DCF inverso dice que el precio de 16,22 EUR descuenta una rentabilidad anual del 4,6 %**, apenas 0,5 pp por encima del bono español a 10 años (4,12 %) [P2] y por debajo del WACC regulatorio (4,85 %) [P1]; o, con nuestro WACC, un crecimiento de los ingresos del 2,9 % anual en 2027-2035 (0,3 % en nuestro caso) o un margen EBITDA del 54,7 % (48,7 % en 2035e en nuestro caso). Ninguna de las dos cosas tiene precedente: los ingresos cayeron un 0,4 % anual en 2021-2025 y la CNMC prevé que la retribución del sector baje un 2 % entre 2027 y 2032 [B7]. Nuestras cifras de explotación coinciden con el consenso (EBITDA 2027e un 3,9 % por debajo): **la diferencia con el mercado es la tasa de descuento**. El mercado valora a Enagás como un bono con un 6,2 % de cupón; nosotros pedimos una prima de riesgo de acción a una red cuya base de activos se reduce. Con un WACC del 4,6 %, el DCF daría 16,31 EUR, el precio actual.';

textos.narrativas = {
  Bajista: 'El periodo regulatorio de 2033 recorta la retribución como lo hizo el de 2021-2026 (la del sector cayó de 1.298 M en 2019 a 883 M en 2026) [B7], la demanda de gas sigue a la baja y el bono español sube otro medio punto. El hidrógeno se retrasa sin coste para Enagás, pero la red de gas pierde valor terminal (crecimiento del 0 %).',
  Base: 'Retribución 2027-2032 según las Circulares 4 y 5/2026 (TRF del 6,46 %) [P1, B3], EBITDA sin participadas de ≈ 500 M estable hasta 2032, dividendo de 1,00 EUR y deuda neta / EBITDA en torno a 4,5x. El hidrógeno no aporta valor neto.',
  Alcista: 'Los tipos vuelven a donde estaban hace un año (−0,6 pp de WACC) [P2], la red troncal de hidrógeno entra en la base regulada con una retribución por encima del coste de capital (3.125 M de inversión prevista en 2025-2030) [B14] y los incentivos nuevos (IFVA) y la eficiencia suben el margen 1,5 pp.',
};

textos.escenarios_comentario = 'Asimetría desfavorable: el alcista da 18,14 EUR (+11,8 %) y el bajista 9,19 EUR (−43,3 %), una relación de 0,27x. El bajista no es exagerado: entre 2019 y 2026 la retribución del sector cayó un 32 % con la revisión regulatoria anterior [B7] y Enagás recortó su dividendo de 1,74 a 1,00 EUR [A9]. El valor ponderado de los tres escenarios es de 13,40 EUR. Lo que más mueve el valor es la tasa de descuento: cada 0,5 pp de WACC son ≈ 1,2-1,4 EUR por acción.';

textos.suma_partes = {
  aplica: false, descuento_holding_pct: 0, partes: [],
  comentario: 'No se aplica como método separado: el negocio regulado en España se valora por DCF y las participadas (TAP, Teréga, Saggas, BBG y el resto) van en el puente a un valor estimado de 2.204 M (ver valoración), que es en la práctica la suma de partes. El hidrógeno no tiene todavía ingresos ni marco retributivo y se trata como opción en el escenario alcista.',
  confianza: 'Media',
};

textos.valoracion_comentario = '**Pesos**: DCF 50 %, escenarios 25 % y comparables 25 %; transacciones 0 % porque la ley impide una prima de control [C1]. El DCF es el método más fiable para una regulada con la retribución fijada hasta 2032; los comparables crecen más y pesan menos. **Puente**: deuda neta de 2.305 M a 30-jun-26 [D1], más 484 M de otros ajustes (Teréga 573 M y Saggas 31 M pagados después del balance [P3, A6], opción de venta de Reganosa 86,6 M [A1], menos la cuenta a cobrar del laudo de GSP, 206,6 M [A4]). **Asociadas a 2.204 M en vez de 1.102,6 M contables** (estimación propia: los 164 M de dividendos que cobró Enagás de sus participadas en 2025 [C12], como renta de 20 años al 8 % = 1.600 M, más Teréga y Saggas al precio pagado, 604 M). Con el valor contable, el valor objetivo bajaría ≈ 1,9 EUR. **EV/RAB**: 1,79x sobre la RAB de gas de 2026 del plan (2.700 M) [A9], frente a 1,07x de Teréga y Saggas: el precio paga mucho por activos fuera de la RAB (extensión de vida útil, gestión técnica). Dispersión: los comparables dan 16,22 EUR y el DCF 13,13 EUR; la diferencia es la tasa de descuento.';

textos.catalizadores = {
  items: [
    { fecha: 'Finales de oct-2026 (sin fecha publicada; 20-26 de octubre en 2020-2025)', evento: 'Resultados de 9M26', efecto: 'Confirmación de la guía (EBITDA ≈ 620 M, beneficio recurrente ≈ 235 M) y primera deuda neta con Teréga (≈ 2.900 M frente a la guía de ≈ 2.400 M sin compras)', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '4T26', evento: 'Cobro de 129 M de operación y mantenimiento de Castor tras la sentencia del Supremo', efecto: 'Caja de ≈ 0,50 EUR por acción ya en el balance; confirma que el Estado ejecuta la sentencia', probabilidad: 'Media', sentido: '+' },
    { fecha: 'Antes del 31-dic-2026', evento: 'Cierre de la compra del 20 % de Saggas (pasa al 92,5 % y a integración global)', efecto: 'EBITDA de ≈ 24 M al año y beneficio de ≈ 4 M en 2027-2032', probabilidad: 'Alta', sentido: '+' },
    { fecha: 'Feb-2027', evento: 'Resultados de 2026 y objetivos de 2027 (primer año del nuevo marco)', efecto: 'El mercado espera un EBITDA de 724 M en 2027e (+16 %); la política de dividendo más allá de 2026 (≈ 40 % del FFO)', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '1S27', evento: 'Plan estratégico con los compromisos de inversión en hidrógeno y decisión del comité de anulación del CIADI sobre el laudo de GSP (303 M USD)', efecto: 'El plan fija el capex de hidrógeno y su efecto en el rating; el laudo (303 M USD), frente a los 206,6 M a valor razonable que ya suma el puente', probabilidad: 'Media', sentido: '+/−' },
    { fecha: '2S26-2027', evento: 'Anteproyecto de ley que transpone la Directiva 2024/1788 (separación del gestor de la red de hidrógeno) y real decreto de almacenamientos', efecto: 'Define si Enagás puede ser a la vez gestor de gas y de hidrógeno y cómo se retribuye la red troncal', probabilidad: 'Media', sentido: '+/−' },
    { fecha: 'Finales de 2027', evento: 'Decisión final de inversión de H2Med y de los primeros tramos de la red troncal', efecto: 'Paso de opción a inversión: hasta 3.125 M en 2025-2030 con más deuda', probabilidad: 'Baja', sentido: '+/−' },
  ],
  confianza: 'Media',
};

textos.riesgos = {
  items: [
    { riesgo: 'Tipos de interés: la acción se valora como un bono', tipo: 'Mercado', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−9 % por cada +0,5 pp de WACC (sensibilidad del DCF)', mitigante: 'Más del 80 % de la deuda a tipo fijo, coste del 2,0 % y vida media de 4,4 años [A6]', senal: 'Bono español a 10 años por encima del 4,5 %' },
    { riesgo: 'Revisión regulatoria de 2033 o revisión a mitad del periodo 2027-2032', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−30 % a −43 % (escenario bajista)', mitigante: 'Seis años sin revisiones intermedias; circulares ya publicadas en el BOE [P1, B3]', senal: 'Consulta pública de la CNMC sobre la metodología de 2033 o recurso contra las Circulares 4 y 5/2026' },
    { riesgo: 'Hidrógeno: inversión sin retribución asegurada', tipo: 'Estratégico', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−5 % a −10 % si se invierte 1.000-3.000 M a una rentabilidad 1 pp por debajo del WACC (estimación propia)', mitigante: 'Fondos CEF y condición de PCI; la decisión de inversión no llega hasta finales de 2027 [B11, B12]', senal: 'Plan del 1S27 con inversión de hidrógeno sin marco retributivo aprobado' },
    { riesgo: 'Rebaja del rating por debajo de BBB+', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−3 % a −5 % (+0,3 pp de coste de la deuda y presión sobre el dividendo)', mitigante: 'FFO / deuda neta del 27,4 % frente al umbral del 15 % [A6]', senal: 'Deuda neta por encima de 3.000 M tras Teréga y el hidrógeno, o perspectiva negativa de S&P o Fitch' },
    { riesgo: 'Recorte del dividendo de 1,00 EUR a partir de 2027', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 % (un dividendo de ≈ 0,80 EUR con el payout del 40 % del FFO, estimación propia)', mitigante: 'Política de ≈ 40 % del FFO y FFO de 472 M en 2025 [A9, A8]', senal: 'Objetivos de 2027 sin cifra de dividendo' },
    { riesgo: 'Demanda de gas a la baja y activos varados', tipo: 'Sector', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Contenido en el valor terminal: crecimiento del 0 % resta ≈ 0,8 EUR', mitigante: 'La retribución no depende de la demanda en 2027-2032 [B3]', senal: 'Demanda nacional por debajo de 300 TWh antes de 2030 (311,6 TWh en 2025) [B7]' },
    { riesgo: 'Garantía a los acreedores de TAP (588,8 M) y Perú (laudo GSP, dividendos de TgP)', tipo: 'Contingencia', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−4 % si se pierde el laudo (206,6 M a valor razonable en el puente)', mitigante: 'Laudos del CIADI de 2024 y 2025 a favor de Enagás [A4]', senal: 'Decisión del comité de anulación del CIADI (1S27)' },
    { riesgo: 'Influencia del Gobierno vía SEPI en un gestor técnico del sistema', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'Difícil de cuantificar: prima de riesgo', mitigante: 'SEPI tiene el 5 % y dos dominicales de quince; mayoría de independientes [C1]', senal: 'Nombramientos de consejeros con trayectoria política o compras que no superen el WACC' },
  ],
  premortem: 'Octubre de 2029: la acción cotiza a 9,7 EUR, un 40 % menos. La cadena empezó con los tipos: el bono español, que ya había subido 90 pb en 2026 [P2], se quedó por encima del 4,5 %, y los inversores que compraban Enagás por su 6 % de dividendo encontraron casi lo mismo en deuda pública sin el riesgo de una red que se encoge. En 2027 Enagás publicó su plan de hidrógeno con más de 3.000 M de inversión y la transposición de la Directiva 2024/1788 dejó la retribución de la red troncal para un real decreto posterior. Para no perder el BBB+, la empresa recortó el dividendo a 0,80 EUR, el 40 % del FFO que ya había anunciado [A9]. En 2028 la CNMC abrió la consulta de la metodología de 2033 recordando que la demanda iba camino de 283,7 TWh [B7] y que la mitad de los activos estaban amortizados: el mercado anticipó un recorte como el de 2021-2026. El indicador que lo habría anticipado: el diferencial entre la rentabilidad por dividendo y el bono a 10 años, que en octubre de 2026 era de solo 2,1 pp.',
  confianza: 'Media',
};

textos.preguntas = {
  items: [
    { tema: 'Dividendo', pregunta: '¿Qué dividendo por acción espera pagar en 2027-2030 con el payout del 40 % del FFO, y cuánto del FFO vendrá de los dividendos de participadas?', por_que: 'El 6,2 % de rentabilidad por dividendo sostiene el precio; con un FFO de ≈ 500 M el 40 % da ≈ 0,77 EUR por acción.' },
    { tema: 'Hidrógeno', pregunta: '¿Invertirá en la red troncal antes de que haya un marco retributivo aprobado y con qué rentabilidad mínima?', por_que: 'Con un WACC del 5,6 % y una TRF de gas del 6,46 % antes de impuestos, invertir a la retribución del gas destruye valor.' },
    { tema: 'RAB', pregunta: '¿Cuál es la RAB regulatoria de transporte, regasificación y almacenamiento a 31-dic-2025 con la metodología de la Circular 4/2026, y qué parte de la retribución viene de activos totalmente amortizados (REVU, IFVA)?', por_que: 'Sin esa cifra no se puede comparar el EV/RAB (1,79x sobre la RAB del plan) con el 1,07x de Teréga y Saggas.' },
    { tema: 'Participadas', pregunta: '¿Qué dividendos espera de TAP, Teréga y BBG en 2027-2032 y hasta cuándo duran los contratos de TAP?', por_que: 'Valoramos las participadas en 2.204 M, frente a 1.706,6 M contables con Teréga y Saggas; cada 10 % de error son ≈ 0,85 EUR por acción.' },
    { tema: 'Deuda', pregunta: '¿Qué deuda neta y qué FFO / deuda neta prevé a finales de 2026 con Teréga y Saggas, y qué umbral pidió S&P para mantener el BBB+?', por_que: 'La guía de ≈ 2.400 M excluye las compras; con ellas la deuda neta se acerca a 3.000 M.' },
    { tema: 'Castor y Perú', pregunta: '¿Cuándo cobrará los 129 M de Castor y los 200 M a largo plazo de su desmantelamiento, y qué valor da al laudo de TgP pendiente?', por_que: 'Son ≈ 1,3 EUR por acción que el puente no recoge o recoge solo en parte.' },
    { tema: 'Separación de actividades', pregunta: '¿Exige la Directiva 2024/1788 separar el gestor de la red de hidrógeno de Enagás en una sociedad distinta, y con qué coste?', por_que: 'Puede obligar a crear una filial con financiación propia y cambiar el perfil de riesgo del grupo.' },
  ],
  confianza: 'Media',
};

textos.resumen = {
  recomendacion: 'Vender',
  conviccion: 'Baja',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis: [
    '**La recomendación y por qué.** Vender, con convicción baja. El valor objetivo es de 13,97 EUR frente a 16,22 EUR de precio: un potencial del −13,9 % y una rentabilidad total esperada del −7,7 % con el dividendo del 6,2 %. La asimetría es desfavorable (alcista +11,8 %, bajista −43,3 %: 0,27x). La razón principal: el precio descuenta una rentabilidad anual del 4,6 %, solo 0,5 pp más que el bono español a 10 años [P2], por una red de gas cuya base de activos se reduce. La convicción es baja porque nuestras cifras de explotación coinciden con el consenso y la diferencia es solo la tasa de descuento, sin un catalizador con fecha que la cierre.',
    '**El negocio.** Enagás es un monopolio legal: el 85,5 % de la retribución del transporte de gas en España y el 53,9 % de la regasificación [B6, B7]. Esa posición no se traduce en rentabilidad: el ROIC sin participadas fue del 4,1 % en 2025, frente a un WACC del 5,63 %. La retribución la fija la CNMC sobre una RAB de gas que baja de ≈ 3.100 M en 2024 a ≈ 2.100 M en 2030 [A9].',
    '**Regulación.** El marco de 2027-2032 ya está en el BOE: la tasa de retribución financiera sube del 5,44 % al 6,46 % desde el 1-oct-2026 [P1] y la retribución del transporte y la regasificación del sector pasa de 883 M a 961 M en 2027, para bajar a 940 M en 2032 [B7]. Es una buena noticia, pero no una sorpresa: Enagás ya usaba ≈ 6,5 % en sus proyecciones desde 2027 [A8] y el consenso espera un EBITDA de 724 M en 2027e (+16 %) [D3].',
    '**Finanzas.** El EBITDA sin participadas cayó de 683 M en 2021 a 520 M en 2025. La deuda neta es de 2.305 M (4,6x el EBITDA) y de 2.789 M con los ajustes; sube a ≈ 2.900 M con Teréga [A6, P3]. El flujo operativo de 2025 se hundió a 212,5 M por ajustes de peajes en el circulante [A1]. Rating BBB+ estable y FFO / deuda neta del 27,4 % [A6].',
    '**Gobierno.** La ley limita a cualquier accionista al 5 % del capital y al 3 % del voto: no hay control ni prima de control posible [C1]. SEPI tiene el 5 % y dos dominicales. El historial resta: el suelo de dividendo de 1,74 EUR del plan de 2022 se rompió en 2024 (1,00 EUR) [C14, A9].',
    '**Valoración.** El DCF da 13,13 EUR (WACC del 5,63 %) y los comparables 16,22 EUR (9,5x el EBITDA de los próximos 12 meses frente a una mediana de 10,0x). El DCF inverso exige un crecimiento del 2,9 % anual en 2027-2035 frente al 0,3 % de nuestro caso, o una rentabilidad del 4,6 %. Con un WACC del 4,6 % el DCF daría el precio. Las participadas, a 2.204 M estimados (1.102,6 M contables a 30-jun sin Teréga ni Saggas), aportan ≈ 8,5 EUR por acción.',
    '**Riesgos y catalizadores.** El mayor riesgo para nuestra tesis es que los tipos bajen: cada 0,5 pp de WACC mueve ≈ 1,2-1,4 EUR por acción. A la baja, el plan de hidrógeno del 1S27 y la política de dividendo más allá de 2026 (≈ 40 % del FFO, que daría ≈ 0,77 EUR) [A9]. Catalizadores: resultados de 9M26 a finales de octubre, cobro de 129 M de Castor en el 4T26 y anulación del laudo de GSP en el 1S27.',
    '**Qué cambiaría la decisión.** Compraríamos por debajo de 12,84 EUR y mantendríamos entre 12,84 y 16,66 EUR. Pasaríamos a Mantener si el bono a 10 años baja del 3,6 %, si la empresa fija un dividendo de 1,00 EUR para 2027-2030 cubierto por el FFO, o si el hidrógeno recibe una retribución por encima del 7 % antes de la decisión de inversión.',
  ].join('\n\n'),
  tesis: [
    'Enagás es el transportista de gas de España, con ≈ 73,5 % de la retribución del transporte y la regasificación del sector [B6, B7] y participadas que le pagaron 164 M de dividendos en 2025 [C12]. Su negocio está regulado hasta 2032 con una tasa de retribución del 6,46 % [P1] y un EBITDA sin participadas de ≈ 500 M al año, con un margen superior al 50 %.',
    'El precio de 16,22 EUR descuenta una rentabilidad del 4,6 % anual, por debajo del WACC que la propia CNMC reconoce (4,85 %) y apenas por encima del bono español (4,12 %) [P2]. Por múltiplos, Enagás cotiza en línea con redes europeas que hacen crecer su RAB un 5-8 % al año, mientras la suya se reduce un 6 % anual hasta 2030 [A9].',
    'El mercado acierta en que el marco 2027-2032 da visibilidad y en que el dividendo de 1,00 EUR es seguro hasta 2026. Se equivoca, a nuestro juicio, al tratar un 6,2 % de rentabilidad por dividendo sin crecimiento como un bono: tras el recorte de 2024 [A9], el dividendo a partir de 2027 depende de un 40 % del FFO y del hidrógeno. Para invertir hay que creer que los tipos bajarán o que el hidrógeno tendrá una retribución por encima del coste de capital.',
  ].join('\n\n'),
  vision_diferencial: {
    mercado_descuenta: 'Una rentabilidad del 4,6 % anual, es decir, que Enagás es un sustituto de la deuda pública con un 6,2 % de cupón y que el marco 2027-2032 mejora el beneficio (EBITDA del consenso +16 % en 2027e) [D3].',
    nuestra_vision: 'La mejora regulatoria ya está en el consenso y en el precio. Con el bono a 10 años en el 4,12 % [P2], una red de gas cuya RAB baja del orden de un 6 % al año necesita una rentabilidad de al menos el 5,6 %, y eso da 13,13 EUR por DCF.',
    por_que: 'Los tipos subieron 90 pb en un año y la acción subió un 23 % en 2026 [D2]: el precio no ha incorporado el coste de oportunidad. Además, el dividendo de 2027 en adelante no está comprometido.',
  },
  a_favor: [
    '**Marco regulatorio cerrado hasta 2032**: TRF del 6,46 %, frente al 5,44 % anterior, ya en el BOE [P1].',
    '**Participadas que generan caja**: 164 M de dividendos en 2025 y ≈ 40 M más al año de Teréga [C12, A6].',
    '**Balance con deuda barata**: coste del 2,0 % y más del 80 % a tipo fijo; BBB+ estable [A6].',
    '**Comparables en línea**: 9,5x el EBITDA frente a una mediana de 10,0x de las redes europeas.',
    '**Opciones no valoradas**: laudo de GSP (303 M USD), cobro de Castor (129 M) y dividendos retenidos de TgP en Perú [A6].',
  ],
  en_contra: [
    '**El precio descuenta un 4,6 % de rentabilidad**, 0,5 pp sobre el bono español a 10 años [P2].',
    '**RAB de gas en retroceso**: de ≈ 3.100 M en 2024 a ≈ 2.100 M en 2030 [A9].',
    '**ROIC del 4,1 % frente a un WACC del 5,63 %**: no cubre el coste de capital.',
    '**Dividendo sin compromiso desde 2027**: el 40 % del FFO daría ≈ 0,77 EUR por acción (estimación propia) [A9].',
    '**Hidrógeno con 3.125 M de inversión prevista** y sin marco retributivo [B14].',
    '**Historial de promesas incumplidas**: el suelo de dividendo de 1,74 EUR se rompió en 2024 [C14].',
  ],
  que_vigilar: 'La tesis depende de que el coste de oportunidad siga alto: el bono español a 10 años por encima del 4 %. La señal de que nos equivocamos sería una bajada del bono por debajo del 3,6 % con el diferencial frente al dividendo de Enagás por encima de 2,5 pp, o un dividendo de 1,00 EUR comprometido para 2027-2030 en los resultados de febrero de 2027.',
  cambiaria_recomendacion: [
    'Si el bono español a 10 años baja del 3,6 %, pasaríamos a Mantener (el DCF con un WACC 0,5 pp menor da ≈ 14,5 EUR).',
    'Si Enagás compromete un dividendo de 1,00 EUR para 2027-2030 cubierto por el FFO, pasaríamos a Mantener.',
    'Si el precio baja de 12,84 EUR (rentabilidad total esperada ≥ 15 %), pasaríamos a Comprar.',
    'Si el hidrógeno recibe un marco retributivo con una tasa por encima del 7 % antes de la decisión de inversión de finales de 2027, revisaríamos el alcista y la recomendación.',
  ],
  kpis_seguimiento: [
    { kpi: 'Bono español a 10 años', nivel_actual: '4,12 % (7-oct-2026)', umbral_alerta: '< 3,6 %', por_que: 'Es la variable que separa nuestro valor del precio.' },
    { kpi: 'EBITDA de la empresa (con participadas)', nivel_actual: '314 M en el 1S26; guía ≈ 620 M', umbral_alerta: '< 600 M en 2026', por_que: 'Primera prueba del plan de eficiencia antes del nuevo marco.' },
    { kpi: 'Deuda neta / FFO', nivel_actual: 'FFO / DN del 27,4 % (jun-26)', umbral_alerta: 'FFO / DN < 20 %', por_que: 'Margen sobre el umbral del BBB+ antes del hidrógeno.' },
    { kpi: 'Dividendo por acción de 2027', nivel_actual: '1,00 EUR (2024-2026)', umbral_alerta: '< 0,90 EUR', por_que: 'El precio se apoya en el 6,2 % de rentabilidad por dividendo.' },
    { kpi: 'Inversión anual en hidrógeno', nivel_actual: '≈ 50 M (guía 2026)', umbral_alerta: '> 300 M al año sin marco retributivo', por_que: 'Inversión sin retribución conocida que destruiría valor al WACC actual.' },
  ],
  confianza: 'Media',
};

textos.fuentes = fuentes;

textos.huecos = [
  { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Registro de posiciones cortas de la CNMV (consulta por emisor): sin acceso sin navegador, como en análisis anteriores; 2) Comunicaciones de posiciones cortas en la ficha de Enagás de la CNMV: 403; 3) Proveedores gratuitos (MarketScreener, Investing): no publican la posición corta española', decision: 'Omitido' },
  { seccion: 'transacciones', campo: 'Tallgrass, GNL Quintero, Nortegas, Redexis, Madrileña Red de Gas, Nedgia, TenneT, Amprion, 50Hertz e Italgas-DEPA con múltiplo', tipo: 'Complemento', intentos: '1) Notas oficiales de Enagás de las ventas de Tallgrass y GNL Quintero: dan precio y plusvalía, no EV/EBITDA, y no son activos europeos; 2) Nota de Italgas sobre DEPA Infrastructure: solo el precio de las acciones (733 M), el 11x es de un bróker; 3) Fluxys-OGE (2023) sin condiciones publicadas; las españolas, sin revisar por tiempo', decision: 'Omitido' },
];
textos.huecos_resueltos = [
  { seccion: 'bolsa', campo: 'posicion_corta_pct' },
  { seccion: 'transacciones', campo: 'Tallgrass (Enagás a Blackstone, 2025), GNL Quintero (2023), Open Grid Europe (Snam, 2025, terminada en nov-2025), Nortegas, Redexis, Madrileña Red de Gas, Gas Networks Ireland' },
];

export { textos };
