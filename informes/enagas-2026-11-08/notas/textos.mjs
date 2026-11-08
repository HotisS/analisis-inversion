// Textos del analista para Enagás (corte 2026-11-08, iteración del informe del 2026-10-07). Citas: [A3] = fuente 3 de A.json, [P1] = fuente propia.
import { readFileSync } from 'node:fs';
import { resumen, objetivo12m_textos } from './resumen.mjs';
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

const A = leer('A.json'); const D = leer('D.json'); const E = leer('E-transacciones.json');

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

textos.limitaciones = 'Cotización: BME (Mercado Continuo), única línea. Precio de 17,80 EUR, cierre del viernes 6-nov-2026; la fecha de corte es el domingo 8-nov [D29]. **Iteración tras los resultados de 9M26** (20-oct-2026) del informe del 7-oct-2026: cuentas anuales, gobierno, sector y transacciones son las del informe anterior, comprobadas contra la nota de 9M26 [A17]; trimestre, LTM, puente, precio, consenso, comparables, tipos y sentimiento se rehacen. **EBITDA y EBIT sin participadas**: las cuentas meten el resultado por puesta en equivalencia (131,6 M en 2025 y 158,9 M en los últimos 12 meses, netos de PPA) en el resultado de explotación; aquí va al resultado financiero (el BAI no cambia) y las participadas se valoran en el puente [A1, A17]. Por eso el margen EBITDA de este informe es inferior al que publica Enagás. El EBITDA del consenso (definición de la empresa, con participadas antes del PPA) se homogeneiza restando un 23 % de las ventas (≈ 210 M en 2027e con Teréga todo el año, estimación propia). **Estimaciones del consenso del 8-oct** (MarketScreener no las ha actualizado tras los 9M26; recomendaciones y objetivos de Investing del 8-nov) [D30, D31]. **Comparables**: estimaciones del 7-oct llevadas al cierre del 6-nov con la variación de precio (National Grid sin el cambio de la libra) [D35]. **Arrendamientos a 30-sep** estimados (≈ 360 M, el 10 % de la deuda bruta) [A17]. **RAB**: Enagás no publica su base regulada a la fecha del puente; se usa la de gas de 2026 del plan (≈ 2.700 M) [A9]. **Asociadas a valor estimado**, no contable. Cuentas de 2018-2020 no disponibles en texto: la serie empieza en 2021.';

textos.controles_explicados = [
  { control: 'Regresión múltiplo-crecimiento', explicacion: 'R² de 0,05: en reguladas el múltiplo depende del crecimiento de la RAB y del riesgo regulatorio, no del de las ventas (Elia crece un 43,6 % por un cambio de perímetro). No se usa la regresión.' },
];

textos.secciones = {
  financieros: {
    ajustes: '**Ajuste de este informe: participadas fuera del EBITDA y del EBIT.** El resultado de participadas de cada año (163,3 / 146,8 / 147,3 / 146,5 / 131,6 M en 2021-2025 y 158,9 M en los últimos 12 meses a sep-26, netos de PPA) sale del EBITDA y del EBIT y pasa al resultado financiero; el BAI y el beneficio no cambian. Las participadas se valoran aparte, en el puente. El EBITDA sin participadas de 2025 es de 520,3 M; en 9M26 baja a 345,7 M desde 388,2 M (estimación propia con la nota a la CNMV) [A17]. ' + conv(A.financieros.ajustes, 'A'),
  },
  rentabilidad: {
    comentario: 'Enagás **no crea valor sobre su capital invertido al coste actual**: el ROIC (con el EBIT sin participadas) ha oscilado entre el 3,4 % y el 4,6 % en 2021-2025 y fue del 4,1 % en 2025, frente a un WACC del 5,36 %. No es un problema de gestión, sino de diseño regulatorio: la CNMC fijó para 2021-2026 una retribución financiera del 5,44 % antes de impuestos sobre el valor neto de los activos y una parte de la base está casi amortizada y solo cobra extensión de vida útil y operación [B3, B7]. El ROE del 14,5 % de 2025 está inflado por 72,8 M de plusvalías y por el apalancamiento [A7]. Para 2027-2032 la TRF sube al 6,46 % (4,85 % después de impuestos) [P1]: el ROIC debería acercarse al 5 %, todavía por debajo del WACC. El ROIC incremental no sirve aquí porque la inversión de 2021-2025 (≈ 107 M al año) fue menor que la amortización y el capital invertido cayó con las ventas de Tallgrass y GNL Quintero [A1, A3]. Snam, con una RAB creciente, gana un margen EBIT del 46,7 % frente al 24,2 % de Enagás [B20].',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Seis operadores europeos de redes reguladas cotizados (gas: Snam e Italgas; electricidad: Redeia, Terna, Elia y National Grid) y Naturgy como contraste no regulado. No hay otro transportista de gas español cotizado; Fluxys Belgium y REN se descartan por liquidez y por falta de consenso gratuito. Cifras de MarketScreener del 7-oct [D13-D19] llevadas al cierre del 6-nov con la variación de precio de cada uno (de +0,1 % Naturgy a +15,2 % Elia) [D35].',
    comentario: 'Con el EBITDA sin participadas, Enagás cotiza a 10,6x el EBITDA de los próximos 12 meses frente a una mediana de 10,4x, y a un PER de 15,9x frente a 14,3x. Por EV/EBITDA, la mediana daría 17,39 EUR; por PER, 16,01 EUR: los comparables dejan a Enagás algo cara frente al precio de 17,80 EUR. **No debería cotizar con prima**: los pares crecen (ventas esperadas: mediana del 8,2 %) porque su RAB crece un 5-8 % al año con la electrificación, mientras la RAB de gas de Enagás baja de ≈ 3.100 M en 2024 a ≈ 2.700 M en 2026 y ≈ 2.100 M en 2030 [A9]. Por EV/RAB (fuera del motor, en el archivo de comparables de RAB de las notas), los pares cotizaban a 1,17-1,53x en octubre y Enagás está hoy a 1,98x; pero su RAB no recoge activos amortizados que siguen cobrando, así que la cifra no es comparable [D21-D25, A9]. Naturgy (7,3x) marca el suelo de un negocio no regulado. Usamos la mediana de EV/EBITDA y PER con un 25 % de peso.',
  },
  transacciones: {
    operaciones,
    comentario: 'Las operaciones recientes con múltiplo publicado se pagaron a 7,5-11,3x el EBITDA (Open Grid Europe 11,3x, Electricity North West 10,6x, 2i Rete Gas 9,7x, Grain LNG 7,5x) [P4-P10, D26]. En EV/RAB, el rango va de 1,07x (Teréga y Saggas, compradas por la propia Enagás en 2026) a 1,44-1,62x (redes eléctricas británicas) [D6, P6, P8]. Enagás no es un objetivo realista: la disposición adicional 31.ª de la Ley de Hidrocarburos limita a cualquier accionista al 5 % del capital y al 3 % del voto [C1], así que no puede haber prima de control. Por eso las transacciones pesan cero en el valor objetivo; sirven para leer lo que paga el mercado privado por activos de gas regulados: alrededor de 1,07x la RAB en Europa continental, muy por debajo del 1,98x al que cotiza Enagás sobre su RAB del plan.',
  },
  multiplos_historicos: {
    comentario: 'El EV/EBITDA de los últimos 12 meses (11,1x) está por debajo de su media de cinco años (12,6x), pero el PER (16,6x) está muy por encima de su máximo de la serie (13,2x; media de 11,2x). La divergencia tiene una causa: entre 2021 y 2025 Enagás vendió Tallgrass y GNL Quintero y amortizó deuda, con lo que bajó el EV y el EBITDA a la vez, mientras el beneficio recurrente caía de ≈ 400 M a ≈ 235 M por la reducción de la retribución [A1, A7]. Con el Bund en el 3,22 % [D32], pagar el PER más alto de la serie por un beneficio que solo recupera en 2027 lo que perdió en 2021-2026 es exigente.',
    confianza: 'Media',
  },
};

textos.justificacion = {
  crecimiento: '**Ingresos desde la retribución regulada**, no con un crecimiento libre (modelo de retribución en las notas, rebasado con los 9M26). 2026e (−6,2 %): el último año del marco 2021-2026 resta 45,1 M de ingresos regulados en 9M26 y las obras de sellado de Castor (≈ 114 M, neutras en EBITDA) ya terminaron [A17]. 2027e (−5,8 %): la retribución del transporte y la regasificación del sector sube de 883 M a 961 M [B7] (con el ≈ 73,5 % de Enagás [B6, B7], +57 M), pero desaparecen los ≈ 114 M de Castor. Almacenamiento, gestión técnica y resto regulado, +2 % al año; otros ingresos, +3 %. 2033-2035: periodo sin metodología, −1,5 % en 2033 y estabilidad después. El consenso espera 907,3 M en 2027e [D30]: nuestros ingresos son un 4,9 % menores, sobre todo por cómo se reparte Castor; en EBITDA la diferencia es del −1,9 %.',
  margenes: 'EBITDA sin participadas: 455 M en 2026e (9M26: 345,7 M; un 4T de ≈ 110 M, por debajo de los 132 M del 4T25 por el marco 2021-2026 y con la retribución del Copex, que se reconoce sobre todo en el 4T) [A17]. Con ≈ 199 M de participadas antes del PPA, la empresa llegaría a ≈ 655 M, algo por encima de su guía de ≈ 620 M, que no ha cambiado. 2027e: 505 M, con la subida de la TRF del 5,44 % al 6,46 % y de los valores unitarios de O&M [P1, B3]. El margen baja del 58,5 % de 2027e al 53,2 % de 2035e porque el opex crece al 1,5 % y la retribución del sector cae un 2 % hasta 2032 [A8, B7]. Frente al consenso homogeneizado, el EBITDA queda un 5,4 % por encima en 2026e y un 1,9 % y un 1,5 % por debajo en 2027e y 2028e: no consolidamos Saggas (está en el puente).',
  inversion: 'Capex sin hidrógeno: 175 M en 2026e (guía de ≈ 225 M menos ≈ 50 M de hidrógeno; 81,1 M invertidos en gas en 9M26) [A6, A17] y 150 M al año en 2027-2032, por encima de la media de 2021-2025 (≈ 107 M) por los negocios adyacentes [A1]. El hidrógeno queda fuera del caso base: sin marco retributivo, su valor a una rentabilidad igual al WACC es nulo; entra en el alcista. Amortización de 280 M en 2026e (208,9 M en 9M26 sin PPA) [A17], −2,5 % al año. En 2033-2035 el capex sube hasta igualar la amortización (223 M). Circulante comercial de −12 % de las ventas, como en 2025.',
  wacc: 'Tasa libre: Bund a 10 años del 3,22 % el 6-nov-2026 [D32], más una prima adicional de 0,45 pp por riesgo país: el diferencial de España frente a Alemania en septiembre de 2026 (3,927 % frente a 3,473 %, BCE) [D33], porque toda la retribución regulada es española. El informe anterior usaba el bono español (4,14 %); hoy la tasa libre más la prima suman 3,67 %. Beta: la sin apalancar de la CNMC (0,45) reapalancada a la estructura de Enagás a valor de mercado (deuda neta ajustada / capitalización de 0,62): 0,66; la de mercado (0,34 frente al MSCI Spain, cinco años) es baja porque el índice es bancario [P1, D29]. Prima de mercado del 5,02 %, la de la CNMC [P1]. Coste de la deuda antes de impuestos del 3,6 % (la deuda viva cuesta el 2,1 % y vence en 3,9 años; la nueva costaría ≈ 4,6 %) [A17]. Peso de la deuda del 38 %. WACC del 5,36 %, 0,51 pp por encima del WACC después de impuestos que reconoce la CNMC (4,85 %) [P1].',
  terminal: 'Gordon con crecimiento del 0,5 %: por debajo de la inflación del 2 % que la CNMC usa para los valores unitarios, porque la RAB de gas se reduce y la demanda prevista baja de 311,6 TWh en 2025 a 283,7 TWh en 2032 [B7]. El múltiplo implícito del valor terminal es de 8,0x el EBITDA, por debajo de la mediana de comparables (10,4x), que crecen. Un múltiplo de 10x supondría que la red de gas sigue invirtiendo como una eléctrica.',
};

textos.lectura = 'El DCF da **13,30 EUR por acción**, un 25,3 % por debajo del precio, con un 55 % del valor en el terminal. **El DCF inverso dice que el precio de 17,80 EUR descuenta una rentabilidad anual del 4,2 %**, por debajo del WACC regulatorio (4,85 %) [P1] y solo 0,5 pp por encima de la tasa libre con el riesgo país (3,67 %) [D32, D33]; o, con nuestro WACC, un crecimiento de los ingresos del 2,7 % anual en 2027-2035 (−0,6 % en nuestro caso) o un margen EBITDA del 62,2 % (53,2 % en 2035e en nuestro caso). Ninguna de las dos cosas tiene precedente: los ingresos cayeron un 0,4 % anual en 2021-2025 y la CNMC prevé que la retribución del sector baje un 2 % entre 2027 y 2032 [B7]. Nuestras cifras de explotación coinciden con el consenso (EBITDA 2027e un 1,9 % por debajo): **la diferencia con el mercado es la tasa de descuento**. Con un WACC 0,5 pp menor el DCF daría 14,87 EUR; el precio pide un WACC de ≈ 4,2 %. Con la prima implícita del mercado (4,41 %) [D34], el WACC baja al 5,11 % y el DCF sube a 14,05 EUR, todavía un 21 % por debajo del precio.';

textos.narrativas = {
  Bajista: 'El periodo regulatorio de 2033 recorta la retribución como lo hizo el de 2021-2026 (la del sector cayó de 1.298 M en 2019 a 883 M en 2026) [B7], la demanda de gas sigue a la baja y el bono español sube otro medio punto. El hidrógeno se retrasa sin coste para Enagás, pero la red de gas pierde valor terminal (crecimiento del 0 %).',
  Base: 'Retribución 2027-2032 según las Circulares 4 y 5/2026 (TRF del 6,46 %) [P1, B3], EBITDA sin participadas de ≈ 500 M estable hasta 2032, dividendo de 1,00 EUR y deuda neta / EBITDA en torno a 4,5x. El hidrógeno no aporta valor neto.',
  Alcista: 'Los tipos vuelven a donde estaban hace un año (−0,6 pp de WACC) [P2], la red troncal de hidrógeno entra en la base regulada con una retribución por encima del coste de capital (3.125 M de inversión prevista en 2025-2030) [B14] y los incentivos nuevos (IFVA) y la eficiencia suben el margen 1,5 pp.',
};

textos.escenarios_comentario = 'Asimetría muy desfavorable: el alcista da 18,75 EUR (+5,3 %) y el bajista 9,19 EUR (−48,4 %), una relación de 0,11x. El bajista no es exagerado: entre 2019 y 2026 la retribución del sector cayó un 32 % con la revisión regulatoria anterior [B7] y Enagás recortó su dividendo de 1,74 a 1,00 EUR [A9]. Lo que más mueve el valor es la tasa de descuento: −0,5 pp de WACC suman 1,57 EUR por acción y +0,5 pp restan 1,28 EUR.';

textos.suma_partes = {
  aplica: false, descuento_holding_pct: 0, partes: [],
  comentario: 'No se aplica como método separado: el negocio regulado en España se valora por DCF y las participadas (TAP, Teréga, Saggas, BBG y el resto) van en el puente a un valor estimado de 2.204 M (ver valoración), que es en la práctica la suma de partes. El hidrógeno no tiene todavía ingresos ni marco retributivo y se trata como opción en el escenario alcista.',
  confianza: 'Media',
};

textos.valoracion_comentario = '**Pesos**: DCF 50 %, escenarios 25 % y comparables 25 %; transacciones 0 % porque la ley impide una prima de control [C1]. El DCF es el método más fiable para una regulada con la retribución fijada hasta 2032; los comparables crecen más y pesan menos. **Puente a 30-sep-26**: deuda neta de 2.979 M con Teréga ya pagada [A17], menos 89 M de otros ajustes (Saggas, 31 M por pagar [A17]; opción de venta de Reganosa, 86,6 M [A1]; menos la cuenta a cobrar del laudo de GSP, 206,6 M [A4]): deuda neta ajustada de 2.890 M. **Asociadas a 2.204 M en vez de 1.555,9 M contables** (estimación propia: los 164 M de dividendos de participadas de 2025 [C12] como renta de 20 años al 8 % = 1.600 M, más Teréga y Saggas al precio pagado, 604 M). **EV/RAB**: 1,98x sobre la RAB de gas de 2026 del plan (2.700 M) [A9], frente a 1,07x de Teréga y Saggas. Valor objetivo de 14,24 EUR (−20,0 %). Dispersión: los comparables dan 16,01-17,39 EUR y el DCF 13,30 EUR; la diferencia es la tasa de descuento.';

textos.catalizadores = {
  items: [
    { fecha: 'Antes del 31-dic-2026', evento: 'Cierre de la compra del 20 % de Saggas (pasa al 92,5 % y a integración global)', efecto: 'EBITDA de ≈ 24 M al año en 2027-2032 que hoy está en asociadas', probabilidad: 'Alta', sentido: '+' },
    { fecha: '4T26', evento: 'Cobro de 129 M de Castor tras la sentencia del Supremo (previsto en el 2S26; la nota de 9M26 no lo menciona)', efecto: 'Caja de ≈ 0,50 EUR por acción', probabilidad: 'Media', sentido: '+' },
    { fecha: '16-feb-2027 (estimada)', evento: 'Resultados de 2026 y objetivos de 2027 (primer año del nuevo marco)', efecto: 'El mercado espera un EBITDA de 723,5 M en 2027e (+16 %) y no hay política de dividendo comprometida más allá de 2026', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '1S27', evento: 'Plan estratégico con la inversión en hidrógeno y decisión del comité de anulación del CIADI sobre el laudo de GSP (303 M USD)', efecto: 'El plan fija el capex de hidrógeno y su efecto en el rating; el laudo, frente a los 206,6 M que ya suma el puente', probabilidad: 'Media', sentido: '+/−' },
    { fecha: '2026-2027', evento: 'Tramitación de los cuatro primeros tramos de la red troncal de hidrógeno (iniciada el 30-sep-2026) y transposición de la Directiva 2024/1788', efecto: 'Define cómo se retribuye la red troncal y si Enagás puede ser a la vez gestor de gas y de hidrógeno [A17]', probabilidad: 'Media', sentido: '+/−' },
    { fecha: 'Finales de 2027', evento: 'Decisión final de inversión de H2Med y de los primeros tramos de la red troncal', efecto: 'Paso de opción a inversión: hasta 3.125 M en 2025-2030 con más deuda', probabilidad: 'Baja', sentido: '+/−' },
  ],
  confianza: 'Media',
};

textos.riesgos = {
  items: [
    { riesgo: 'Tipos de interés: la acción se valora como un bono', tipo: 'Mercado', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−9 % por cada +0,5 pp de WACC (sensibilidad del DCF)', mitigante: 'Más del 80 % de la deuda a tipo fijo, coste del 2,1 % y vida media de 3,9 años [A17]', senal: 'Bund a 10 años por encima del 3,7 % (3,22 % hoy)' },
    { riesgo: 'Revisión regulatoria de 2033 o revisión a mitad del periodo 2027-2032', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−30 % a −43 % (escenario bajista)', mitigante: 'Seis años sin revisiones intermedias; circulares ya publicadas en el BOE [P1, B3]', senal: 'Consulta pública de la CNMC sobre la metodología de 2033 o recurso contra las Circulares 4 y 5/2026' },
    { riesgo: 'Hidrógeno: inversión sin retribución asegurada', tipo: 'Estratégico', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−5 % a −10 % si se invierte 1.000-3.000 M a una rentabilidad 1 pp por debajo del WACC (estimación propia)', mitigante: 'Fondos CEF y condición de PCI; la decisión de inversión no llega hasta finales de 2027 [B11, B12]', senal: 'Plan del 1S27 con inversión de hidrógeno sin marco retributivo aprobado' },
    { riesgo: 'Rebaja del rating por debajo de BBB+', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−3 % a −5 % (+0,3 pp de coste de la deuda y presión sobre el dividendo)', mitigante: 'FFO / deuda neta del 20,5 % frente al umbral del 15 % [A17]', senal: 'FFO / deuda neta por debajo del 18 % o deuda neta por encima de 3.200 M (2.979 M a sep-26), o perspectiva negativa de S&P o Fitch' },
    { riesgo: 'Recorte del dividendo de 1,00 EUR a partir de 2027', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 % (un dividendo de ≈ 0,80 EUR con el payout del 40 % del FFO, estimación propia)', mitigante: 'Política de ≈ 40 % del FFO y FFO de 472 M en 2025 [A9, A8]', senal: 'Objetivos de 2027 sin cifra de dividendo' },
    { riesgo: 'Demanda de gas a la baja y activos varados', tipo: 'Sector', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Contenido en el valor terminal: crecimiento del 0 % resta ≈ 0,8 EUR', mitigante: 'La retribución no depende de la demanda en 2027-2032 [B3]', senal: 'Demanda nacional por debajo de 300 TWh antes de 2030 (311,6 TWh en 2025) [B7]' },
    { riesgo: 'Garantía a los acreedores de TAP (588,8 M) y Perú (laudo GSP, dividendos de TgP)', tipo: 'Contingencia', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−4 % si se pierde el laudo (206,6 M a valor razonable en el puente)', mitigante: 'Laudos del CIADI de 2024 y 2025 a favor de Enagás [A4]', senal: 'Decisión del comité de anulación del CIADI (1S27)' },
    { riesgo: 'Influencia del Gobierno vía SEPI en un gestor técnico del sistema', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'Difícil de cuantificar: prima de riesgo', mitigante: 'SEPI tiene el 5 % y dos dominicales de quince; mayoría de independientes [C1]', senal: 'Nombramientos de consejeros con trayectoria política o compras que no superen el WACC' },
  ],
  ia: { exposicion: 'Baja', sentido: 'Neutral', efecto_valor: '≈ 0 %', comentario: 'La retribución de Enagás la fija la CNMC sobre su base de activos y no depende del volumen transportado en 2027-2032 [B3], así que la IA no toca sus ingresos. El efecto indirecto es la demanda eléctrica de los centros de datos: la demanda de gas para generación sube un 19 % en 9M26 [A17], lo que refuerza el papel de la red como respaldo, pero sin efecto en la retribución hasta el periodo de 2033. En costes, la automatización de la operación y el mantenimiento puede ayudar al plan de eficiencia (opex +1,5 % al año), una mejora pequeña frente a un opex de ≈ 350 M. Señal a vigilar: que la CNMC use la demanda de los centros de datos para justificar nueva inversión regulada en gas o en hidrógeno.' },
  premortem: 'Noviembre de 2029: la acción cotiza a 10,7 EUR, un 40 % menos. La cadena empezó con los tipos: el Bund volvió por encima del 3,7 % y los inversores que compraban Enagás por su 5,6 % de dividendo encontraron casi lo mismo en deuda pública sin el riesgo de una red que se encoge. En 2027 Enagás publicó su plan de hidrógeno con más de 3.000 M de inversión y la retribución de la red troncal quedó para un real decreto posterior. Con la deuda ya en 2.979 M tras Teréga [A17] y el FFO / deuda neta en el 20 %, la empresa recortó el dividendo a 0,80 EUR, el 40 % del FFO que ya había anunciado [A9]. En 2028 la CNMC abrió la consulta de la metodología de 2033 recordando que la demanda iba camino de 283,7 TWh [B7] y que la mitad de los activos estaban amortizados: el mercado anticipó un recorte como el de 2021-2026. El indicador que lo habría anticipado: el PER, que en noviembre de 2026 estaba en 15,6x el beneficio de 2027e frente a una mediana histórica de 11,9x.',
  confianza: 'Media',
};

textos.preguntas = {
  items: [
    { tema: 'Dividendo', pregunta: '¿Qué dividendo por acción espera pagar en 2027-2030 con el payout del 40 % del FFO, y cuánto del FFO vendrá de los dividendos de participadas?', por_que: 'El 6,2 % de rentabilidad por dividendo sostiene el precio; con un FFO de ≈ 500 M el 40 % da ≈ 0,77 EUR por acción.' },
    { tema: 'Hidrógeno', pregunta: '¿Invertirá en la red troncal antes de que haya un marco retributivo aprobado y con qué rentabilidad mínima?', por_que: 'Con un WACC del 5,6 % y una TRF de gas del 6,46 % antes de impuestos, invertir a la retribución del gas destruye valor.' },
    { tema: 'RAB', pregunta: '¿Cuál es la RAB regulatoria de transporte, regasificación y almacenamiento a 31-dic-2025 con la metodología de la Circular 4/2026, y qué parte de la retribución viene de activos totalmente amortizados (REVU, IFVA)?', por_que: 'Sin esa cifra no se puede comparar el EV/RAB (1,79x sobre la RAB del plan) con el 1,07x de Teréga y Saggas.' },
    { tema: 'Participadas', pregunta: '¿Qué dividendos espera de TAP, Teréga y BBG en 2027-2032 y hasta cuándo duran los contratos de TAP?', por_que: 'Valoramos las participadas en 2.204 M, frente a 1.706,6 M contables con Teréga y Saggas; cada 10 % de error son ≈ 0,85 EUR por acción.' },
    { tema: 'Deuda', pregunta: '¿Qué deuda neta y qué FFO / deuda neta prevé a finales de 2026 y 2027 con Teréga y Saggas, y qué umbral pidió S&P para mantener el BBB+?', por_que: 'La deuda neta ya es de 2.979 M y el FFO / deuda neta ha bajado al 20,5 % (27,4 % un año antes) [A17].' },
    { tema: 'Castor y Perú', pregunta: '¿Cuándo cobrará los 129 M de Castor y los 200 M a largo plazo de su desmantelamiento, y qué valor da al laudo de TgP pendiente?', por_que: 'Son ≈ 1,3 EUR por acción que el puente no recoge o recoge solo en parte.' },
    { tema: 'Separación de actividades', pregunta: '¿Exige la Directiva 2024/1788 separar el gestor de la red de hidrógeno de Enagás en una sociedad distinta, y con qué coste?', por_que: 'Puede obligar a crear una filial con financiación propia y cambiar el perfil de riesgo del grupo.' },
  ],
  confianza: 'Media',
};

textos.resumen = resumen;

textos.fuentes = fuentes;

textos.huecos = [
  { seccion: 'trimestres', campo: 'Sesión de preguntas de la conferencia de 9M26', tipo: 'Complemento', intentos: '1) Web de inversores de Enagás: solo la nota a la CNMV y la nota de prensa del 20-oct; 2) Seeking Alpha: la última transcripción es la del 2T26; 3) Quartr y GuruFocus: resumen de pago o sin el texto del 3T26', decision: 'Omitido' },
  { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Registro de posiciones cortas de la CNMV (consulta por emisor): sin acceso sin navegador, como en análisis anteriores; 2) Comunicaciones de posiciones cortas en la ficha de Enagás de la CNMV: 403; 3) Proveedores gratuitos (MarketScreener, Investing): no publican la posición corta española', decision: 'Omitido' },
  { seccion: 'transacciones', campo: 'Tallgrass, GNL Quintero, Nortegas, Redexis, Madrileña Red de Gas, Nedgia, TenneT, Amprion, 50Hertz e Italgas-DEPA con múltiplo', tipo: 'Complemento', intentos: '1) Notas oficiales de Enagás de las ventas de Tallgrass y GNL Quintero: dan precio y plusvalía, no EV/EBITDA, y no son activos europeos; 2) Nota de Italgas sobre DEPA Infrastructure: solo el precio de las acciones (733 M), el 11x es de un bróker; 3) Fluxys-OGE (2023) sin condiciones publicadas; las españolas, sin revisar por tiempo', decision: 'Omitido' },
];
textos.huecos_resueltos = [
  { seccion: 'bolsa', campo: 'posicion_corta_pct' },
  { seccion: 'transacciones', campo: 'Tallgrass (Enagás a Blackstone, 2025), GNL Quintero (2023), Open Grid Europe (Snam, 2025, terminada en nov-2025), Nortegas, Redexis, Madrileña Red de Gas, Gas Networks Ireland' },
];

// ── Iteración del 8-nov-2026: bloques nuevos (antes venían de las actualizaciones v2-v5 del informe del 7-oct) ──
textos.parches = [];

textos.referencia_mercado = { mercado: 'S&P 500, prima implícita de Damodaran (T12m con payout sostenible)', prima_implicita_pct: 4.41, fecha: '2026-11', fuente: 'Damodaran, prima implícita mensual, noviembre de 2026 [D34]' };

textos.etapa2 = { usar: false, anios: 10, margen_final_pct: null, justificacion: 'No procede. El ROIC sin participadas (4,1 % en 2025) está por debajo del WACC: crecer no crea valor. Además, la RAB de gas baja de ≈ 3.100 M en 2024 a ≈ 2.100 M en 2030 [A9] y la CNMC prevé que la retribución del sector baje un 2 % entre 2027 y 2032 [B7]: no hay crecimiento que alargar.' };

textos.sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 0, precio_pct: -5.0, otros_pct: -1.2, comentario: 'Precio: el último año del marco 2021-2026 resta 45,1 M de ingresos regulados en 9M26 (amortización de la base y fin de la retribución por continuidad de suministro) [A17]; sin reparto publicado entre base y tarifa, va como precio (estimación propia). Otros: obras de sellado de Castor, ≈ 114 M frente a 125,9 M en 2025 (108,7 M en 9M26, ya terminadas) [A17].' },
    { periodo: '2027e', volumen_pct: 0, precio_pct: 6.5, otros_pct: -12.3, comentario: 'Precio: el nuevo marco sube la retribución del transporte y la regasificación del sector de 883 a 961 M (TRF del 5,44 % al 6,46 % y O&M +32,6 %) [B7, P1]; con el 73,5 % de Enagás, +6,3 puntos; almacenamiento y GTS al 2 %, +0,2. Otros: sin obras de Castor (−12,4) y no regulados +3 % (+0,2) [A17].' },
    { periodo: '2028e', volumen_pct: -0.4, precio_pct: 0.3, otros_pct: 0.2, comentario: 'Volumen: la retribución del sector baja de 961 a 940 M en 2032 porque la RAB se amortiza sin inversión que la reponga [A9, B7]. Precio: almacenamiento y GTS al 2 %. Otros: Alisios y Axent, +3 % [A17].' },
    { periodo: '2029e', volumen_pct: -0.4, precio_pct: 0.3, otros_pct: 0.2, comentario: 'Igual que 2028e: la RAB que se amortiza (−0,44 % al año en la retribución del sector) frente a la indexación del resto regulado [A9, B7].' },
    { periodo: '2030e', volumen_pct: -0.4, precio_pct: 0.3, otros_pct: 0.2, comentario: 'Igual que 2028e; la RAB de gas del plan baja a ≈ 2.100 M en 2030 [A9].' },
  ],
  mercado_final: { periodo: '2032e', tamano: 940.1 },
  veredicto: 'Sí',
  justificacion: 'Sí: proyectamos casi nada (−1,2 % anual con la salida de las obras de Castor; ≈ 0 % sin ellas). El foso es legal (85,5 % de la retribución del transporte y 53,9 % de la regasificación) y el precio lo fija la CNMC hasta 2032 [B6, B7]. La subida de 2027 es la nueva TRF, ya en el BOE; después, la RAB se amortiza [A9]. La prueba de reinversión no aplica: hasta 2032 el capex queda por debajo de la amortización (desinversión, no «activos ligeros») y el ROIC no llega al WACC. Cuota: el motor divide los ingresos del grupo, con almacenamiento, GTS y otros, entre la retribución del sector en 2032 (940,1 M) [B7]; en el mismo perímetro, Enagás sigue en el 73,5 %.',
};

textos.objetivo_12m = {
  ejercicio: '2028e',
  base_bpa: 'ajustado',
  casos: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 1.03, multiplo: null, precio: null, justificacion: 'Proyección del informe con los desplazamientos del bajista (−1 pp de crecimiento y −3 pp de margen desde 2027): EBITDA sin participadas ≈ 464 M en 2028e; resultado financiero de ≈ −80 M, impuesto del 28 % sobre el resultado sin participadas y participadas de ≈ 185 M netas de PPA; 260,3 M de acciones.' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 1.13, multiplo: null, precio: null, justificacion: 'EBITDA sin participadas de 499,7 M y amortización de 266,2 M (notas/regulado.mjs); resultado financiero de ≈ −80 M (deuda de ≈ 3.000 M con Teréga que se refinancia por encima del 2,1 % actual); impuesto del 28 % (el de 9M26 sobre el resultado sin participadas) [A17]; participadas de ≈ 185 M netas de PPA (127,1 M en 9M26 con dos meses de Teréga). Cuadre: con este método, el 9M26 da los 195,8 M de beneficio recurrente publicados.' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 1.18, multiplo: null, precio: null, justificacion: 'Desplazamientos del alcista (+0,7 pp de crecimiento y +1,5 pp de margen: incentivos IFVA y eficiencia): EBITDA sin participadas ≈ 516 M en 2028e; resto igual que el base. El hidrógeno no aporta beneficio antes de 2028.' },
  ],
  per_historico: {
    base: 'adelantado', base_bpa: 'ajustado', actual: 15.6, mediana_5a: 11.9, minimo_5a: 9.3, media_larga: 11.7, anios: 5,
    excluidos: 'Historia ADELANTADA (precio de cierre de cada año ÷ BPA del año siguiente, normalizado sin plusvalías ni partidas que no se repiten, la misma base que los casos): 2020 11,6x (17,97 ÷ 1,54); 2021 12,5x (20,40 ÷ 1,63); 2022 11,9x (15,52 ÷ 1,30); 2023 fuera (2024 con pérdidas por Tallgrass); 2024 9,3x (11,78 ÷ 1,26); 2025 13,2x (13,15 ÷ 1,00, nuestro BPA recurrente de 2026e). Actual: 17,80 ÷ 1,14 (nuestro BPA de 2027e) = 15,6x. Las cuentas empiezan en 2021, así que no hay ocho años.',
    v2: { actual: 15.6, mediana_5a: 11.05, minimo_5a: 9.5, media_larga: 11.2, base: 'cierre' },
  },
  comparables_per: { mediana: 14.3 },
  consenso: { bpa_ano1: 1.15, bpa_ano2: 1.12, objetivo_medio: 17.17, objetivo_min: 13.0, objetivo_max: 19.8, analistas: 20, tendencia_3m: 'estables', fuente: 'Investing (8-nov-2026) y MarketScreener (8-oct-2026) [D31, D30]' },
  diferencia_consenso: objetivo12m_textos.diferencia_consenso,
  media: null,
  comentario: objetivo12m_textos.comentario,
};

textos.secciones.bolsa = {
  contexto: {
    movimiento: { fecha: '2026-11-06', var_1m_pct: 7.7, var_3m_pct: 6.6, var_6m_pct: 7.4, var_12m_pct: 25.7, dist_max_52s_pct: -0.4, dist_min_52s_pct: 35.4, dist_max_historico_pct: -19.5, tendencia: 'alcista', volatilidad_60d_pct: 13.4, avisos: [] },
    movimientos_fuertes: [
      { periodo: 'oct-nov-2026', var_pct: 10.0, causa: 'Subida de un mes hasta el 5-nov sin un día de más del 3 %: resultados de 9M26 «en línea» con la guía (+2,4 % el 20-oct) [A17, D29] y bajada del Bund a 10 años de 3,49 % a 3,22 % [D32]. No hay hecho nuevo que cambie las cifras.', veredicto: 'no cambia', condicion: null },
    ],
    noticias: [
      { fecha: '2026-10-20', tipo: 'resultados', hecho: 'Resultados de 9M26: EBITDA de 491,5 M y beneficio recurrente de 195,8 M, en línea con la guía de 2026, que se mantiene; deuda neta de 2.979 M con Teréga [A17].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-10-08', tipo: 'recomendación', hecho: 'Citi inicia la cobertura en mantener con un objetivo de 16,50 EUR; consenso de 20 analistas en «Neutral» y objetivo medio de 17,17 EUR [D31].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-09-18', tipo: 'demanda o regulador', hecho: 'El BOE publica las Circulares 4 y 5/2026: TRF del 6,46 % en 2027-2032, en vigor desde el 1-oct-2026 [P1, A17].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-07-30', tipo: 'fusión u oferta', hecho: 'Cierre de la compra del 31,5 % de Teréga por 573 M; el 20 % de Saggas (31 M) se cerrará antes de fin de año [A17].', veredicto: 'no cambia', condicion: null },
    ],
    proximos_resultados: '2027-02-16',
    veredicto: 'no cambia',
    condicion: null,
    comentario: 'La acción sube un 9,6 % en un mes y está a un 0,4 % del máximo de 52 semanas, con tendencia alcista y volatilidad baja (13 %). La subida se explica por unos 9M26 sin sorpresas y por la bajada de los tipos alemanes, no por un hecho nuevo. Se buscó con noticias.mjs (12 meses), la nota a la CNMV de 9M26 y la ficha de Investing: no hay colocaciones, ampliaciones, operaciones de directivos ni litigios nuevos. Los resultados de 2026 llegarán hacia el 16-feb-2027 (fecha estimada por el calendario de años anteriores; la agenda aún no la publica). Veredicto: no cambia.',
  },
};

export { textos };
