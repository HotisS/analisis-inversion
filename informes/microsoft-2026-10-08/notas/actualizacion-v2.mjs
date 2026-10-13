// actualizacion-v2.mjs — Microsoft v2: prueba de sostenibilidad del crecimiento (metodología del 10-oct-2026) y,
// como la prueba falla, caso base rebajado a lo que la empresa puede financiar (decisión del usuario del 13-oct-2026).
// Sin investigación nueva: parte de datos.json, borra calc y añade `dcf.sostenibilidad` con lo que ya estaba en el
// informe (10-K FY2026, 8-K de segmentos FY27, conferencias, precios de Microsoft 365, Synergy). Mismo precio
// (529,76 USD, cierre del 7-oct) y fecha de corte.
//
// La prueba: con los supuestos de v1 la proyección reinvierte solo el 23 % del NOPAT, que al ROIC de FY2026 (30,9 %)
// financia un 7,1 % anual frente al 12,4 % proyectado, y el capital nuevo tendría que rendir un 42,9 %, por encima de
// 1,25 veces el histórico (38,6 %). La causa no es el crecimiento de los primeros años sino el capex de la cola: de
// FY2031 a FY2036 el capex se acercaba a la amortización (inversión neta del 1,5-4,5 % de las ventas) mientras las
// ventas seguían creciendo un 6,5-13 %, de modo que la rotación del capital (ventas / capital invertido) subía de 0,82
// a 1,07. Para un negocio que se ha vuelto de infraestructura no hay precedente de eso.
// Recorte mínimo: capex de FY2030e-FY2036e +4,5 puntos de las ventas, lo justo para que el financiable (10,5 %) más la
// parte de precio del puente (≈ 2 puntos, que no pide capital) cubra el 12,4 % proyectado; la rotación queda en 0,84,
// la de FY2026. Bajar solo el crecimiento no sirve: el financiable apenas se mueve (7,2 % con −1,5 puntos en la cola) y
// haría falta quitar más de tres puntos al año. Crecimiento, márgenes, WACC, terminal y escenarios no se tocan.
// Escribe datos-v2.json; después:
//   node motor/calcular-empresa.mjs --datos informes/microsoft-2026-10-08/datos-v2.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos.json'), 'utf8'));
delete d.calc;

// 1. Recorte del caso base: capex de la cola (antes 28 / 25 / 23 / 22 / 21 / 20,5 / 20 % de las ventas).
const capex = { FY2030e: 32.5, FY2031e: 29.5, FY2032e: 28, FY2033e: 27, FY2034e: 25.5, FY2035e: 25, FY2036e: 24.5 };
for (const [p, c] of Object.entries(capex)) {
  const a = d.dcf.anios.find((x) => x.periodo === p);
  if (!a) throw new Error(`Falta ${p}`);
  a.capex_pct_ventas = c;
}

// 2. Prueba de sostenibilidad. Reparto volumen/precio a nivel de grupo: estimación propia con los KPI publicados.
// mercado_final = null: competencia.cuota_pct (20 %) es Azure sobre el mercado de infraestructura en la nube de
// Synergy, y los ingresos del DCF son los del grupo (Azure, algo más de 100.000 M, es menos de un tercio): no hay
// perímetro comparable. La prueba de cuota se hace a mano en la justificación.
d.dcf.sostenibilidad = {
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 15, precio_pct: 2.5, otros_pct: 0,
      comentario: 'Volumen: consumo de Azure (guía del 1T27 de +44-45 % a tipo constante, con la demanda por encima de la capacidad) y puestos de pago (+6-7 %); precio: Microsoft 365 E3 +8 %, E5 +5 % y Office 365 E3 +13 % desde el 1-jul-2026, más la venta de E5, Copilot y E7 sobre la base instalada. Reparto, estimación propia [1, 8, 19, 27].' },
    { periodo: 'FY2028e', volumen_pct: 16, precio_pct: 2, otros_pct: 0,
      comentario: 'Volumen: entra en ingresos la capacidad del capex de FY2026-FY2027 y se reconoce la cartera (678.000 M, el 30 % a 12 meses; +25 % sin OpenAI); precio: ingreso por usuario de Microsoft 365, que en FY2026 creció ≈ 10 puntos más que los puestos (+17 % frente a +6-7 %) [1, 8, 19].' },
    { periodo: 'FY2029e', volumen_pct: 15, precio_pct: 2, otros_pct: 0,
      comentario: 'Volumen: Azure y servicios de IA con el mercado de nube creciendo por encima del 25 % (≈ 28,7 % anual en los últimos 11 trimestres, estimación con Synergy); precio, como en FY2028 [23].' },
    { periodo: 'FY2030e', volumen_pct: 13, precio_pct: 2, otros_pct: 0,
      comentario: 'El volumen modera con la base: Azure ya sería varias veces el tamaño de FY2026; el precio sigue la venta de suites superiores (E5, E7) [19].' },
  ],
  mercado_final: null,
  veredicto: 'En parte',
  justificacion: 'En parte. Foso: costes de cambio (678.000 M de cartera) e integración de Azure, Microsoft 365 y Copilot; poder de precios: E3 +8 % y E5 +5 % desde julio, con el ingreso por usuario creciendo ≈ 10 puntos más que los puestos [1, 19, 27]. Solo se frenó en FY2023 (+6,9 %). Pero ya no es software sin capital: el ROIC bajó del 100,5 % al 30,9 %. Con el capex de v1, la reinversión (23 % del NOPAT) financiaba un 7,1 % frente al 12,4 % proyectado; con la cola más intensiva en capital (rotación 0,84, la de FY2026) financia un 10,5 % y el capital nuevo rinde un 29,3 % frente al 27,7 % histórico. Cuota a mano: Azure al 20 % de un mercado que crece más que el grupo.',
};

// 3. Textos que cambian (cifras de calc tal cual).
const sintesis = [
  '**La recomendación y por qué.** Vender, con convicción baja. El valor objetivo es de 413,69 USD, un 21,9 % por debajo del precio de 529,76, y la rentabilidad total esperada a 12 meses es del −21,2 %; con la prima que pide el mercado (4,2 %), 469,70 USD y −10,7 %: las dos reglas dan Vender. Pasamos de Mantener a Vender porque el caso base invierte ahora lo que exige el crecimiento proyectado: más capex en FY2030-FY2036 baja el DCF de 463,46 a 419,91 USD. El alcista gana un 1,9 % y el bajista pierde un 51,9 %.',
  '**El negocio.** Microsoft gana dinero en la nube y en el software de oficina con un margen operativo del 46,8 %, frente al 35,4 % de AWS y el 23,7 % de Google Cloud [1, 29, 31]. La cartera contratada es de 678.000 M (+84 %) [1, 19]. El ROIC, del 30,9 %, triplica el WACC, pero era del 100,5 % en FY2019: el negocio pasa a ser de infraestructura. La calidad sostiene el crecimiento proyectado solo en parte: hay foso y poder de precios (E3 +8 % desde julio) [27], pero con el capex anterior la reinversión financiaba un 7,1 % anual frente al 12,4 %; con el actual, un 10,5 % más dos puntos de precio.',
  '**Finanzas.** Los ingresos crecieron un 17,8 %, hasta 331.839 M, con un margen EBITDA del 58,4 %. El capex con arrendamientos financieros fue de 145.300 M, el 44 % de las ventas, y el FCF cayó a 63.886 M, un 1,7 % de la capitalización [1, 19]. La deuda neta es pequeña, 30.045 M con 66.594 M de arrendamientos financieros, pero hay 329.100 M de arrendamientos de centros de datos firmados y sin comenzar [1]. OpenAI aporta el 7,3 % de los ingresos y era el 45 % de la cartera en el 2T26 [1, 21].',
  '**Equipo y gobierno.** 12 de 13 consejeros independientes y un consejero coordinador, pero Satya Nadella preside y dirige a la vez [42]. La dirección cumplió su guía de margen todos los años; la de capex de FY2026, no: prometió moderarlo y creció un 80 % [22, 55]. El variable a largo plazo premia el crecimiento de ingresos, sin ninguna métrica de retorno del capital [42].',
  '**Valoración.** El DCF da 419,91 USD, los comparables 424,59 y los escenarios 402,61. El precio descuenta un crecimiento medio del 14,9 % en FY2027-FY2036, frente a nuestro 12,5 %, o una rentabilidad anual del 9,1 %, menos de lo que pide el mercado (9,52 %). El cambio frente a la versión anterior es de capital, no de ingresos. La convicción es baja, como dan los criterios: con la prima del mercado estamos a 0,7 puntos del umbral de Vender y el capex de la cola es estimación nuestra. La subiría una guía de capex de FY2028 por encima del 40 % de las ventas sin que Azure acelere; la bajaría una intensidad de capital que cae más deprisa.',
  '**Riesgos y catalizadores.** OpenAI: si no paga sus compromisos, el crecimiento cae y los arrendamientos firmados no se cancelan (bajista −51,9 %). Los tipos: medio punto más de WACC resta un 8 %. Google Cloud, que creció un 82 % en el 2T26 [32]. Catalizadores: resultados del 1T27 el 28-oct-2026, la decisión de la CMA hacia febrero de 2027 y la guía de capex de FY2028 en julio de 2027 [8, 24, 65].',
  '**Qué cambiaría la decisión.** Mantener por debajo de 517,94 USD (un 2,3 % bajo el precio) y Comprar por debajo de 397,14. Subiríamos a Mantener si la cartera sin OpenAI crece más del 25 % y la guía de FY2028 baja la intensidad de capital con Azure por encima del 35 %; y la convicción del Vender, si el margen bruto de Microsoft Cloud cae por debajo del 63 % o Azure crece menos del 30 %.',
].join('\n\n');

const T = {
  'resumen.recomendacion': 'Vender',
  'resumen.conviccion': 'Baja',
  'resumen.sintesis': sintesis,
  'resumen.tesis': [
    'Microsoft es el segundo proveedor mundial de nube, con un 20 % del mercado, y el dueño del software de oficina de las empresas: ingresos de 331.839 M en FY2026, un margen operativo del 46,8 % y un ROIC del 30,9 % [1, 23]. Su ventaja son los costes de cambio: una cartera contratada de 678.000 M, que crece un 84 %, y la integración de Azure, Microsoft 365 y Copilot, con más de 30 millones de puestos de pago [1, 19].',
    'El precio, 529,76 USD, descuenta un crecimiento medio del 14,9 % durante diez años, por encima del 12,5 % de nuestro caso base, o una rentabilidad anual del 9,1 %, por debajo del 9,52 % que pide el mercado. Cotiza a 15,5 veces el EBITDA de los próximos 12 meses y 25,5 veces el beneficio, una prima del 38 % y del 15 % sobre sus comparables, y por debajo de su media histórica. No es barato ni para lo que pide el mercado.',
    'El mercado acierta en la calidad del negocio y se equivoca, a nuestro juicio, en el capital que exige. El capex con arrendamientos llegó a 145.300 M en FY2026 y la guía apunta a más en FY2027; el flujo libre cayó a un 1,7 % de la capitalización y el ROIC ha bajado de 100,5 % a 30,9 % en siete años [1, 19]. Nuestro caso base ya supone que la intensidad de capital baja del 44 % al 24,5 % de las ventas en diez años, lo justo para crecer un 12,5 % anual con la rotación del capital de hoy. Para invertir habría que creer además que la cartera de OpenAI, el 45 % del total, es firme y que el capex baja más deprisa [21]. Ni el alcista (539,59 USD) supera el precio con holgura; si falla una condición, el bajista resta un 51,9 %.',
  ].join('\n\n'),
  'resumen.vision_diferencial.nuestra_vision': 'Vemos el mismo negocio con un crecimiento algo menor (17,5 %, 18 % y 17 %), un margen que se queda en el 63 % y más capital para crecer: el capex baja al 24,5 % de las ventas en FY2036, no al 20 %, porque una parte de la cartera depende de un solo cliente, la nueva vida útil de los edificios pasará gasto de alquiler al EBITDA y la nube de IA no crece sin centros de datos. Con esos supuestos el DCF da 419,91 USD; con la prima del mercado, 487,43, un 8,0 % por debajo del precio. La diferencia ya no es solo de tasa de descuento: también de capital.',
  'resumen.en_contra.4': '**Asimetría mala**: el bajista resta un 51,9 % y el alcista suma un 1,9 %.',
  'resumen.cambiaria_recomendacion': [
    'Si el precio baja de 517,94 USD (un 2,3 % bajo el actual) sin cambio en los fundamentales, pasaríamos a Mantener; por debajo de 397,14 USD, a Comprar.',
    'Si la cartera comercial sin OpenAI crece más del 25 % y la guía de FY2028 baja el capex con arrendamientos por debajo del 40 % de las ventas, subiríamos a Mantener.',
    'Si el margen bruto de Microsoft Cloud cae por debajo del 63 % o Azure crece menos del 30 % en dos trimestres seguidos, subiríamos la convicción del Vender.',
    'Si OpenAI renegocia o reduce sus compromisos con Azure, subiríamos la convicción del Vender.',
    'Si la guía de FY2028 lleva el capex con arrendamientos por encima del 50 % de las ventas sin que Azure acelere, subiríamos la convicción del Vender.',
  ],
  'dcf.justificacion.inversion': 'El capex incluye las altas de arrendamientos financieros. FY2027: 52 % de las ventas, unos 203.000 M, coherente con más de 50.000 M en el 1T27 y unos 175.000 M en el año natural 2026 [8, 19]. Baja al 34 % en FY2029 y al 24,5 % en FY2036, frente al 13-14 % de FY2020-FY2022, porque la IA exige reponer GPU cada pocos años [1]. Desde FY2030 va 4,5 puntos por encima de la versión anterior: así la inversión neta sigue al crecimiento y las ventas sobre el capital invertido se quedan en 0,84 veces, como en FY2026 (0,82), en vez de subir a 1,07; es lo que pide la prueba de sostenibilidad. La amortización sube del 11,6 % de las ventas al 20,5 % y converge al 18,5 %. El circulante comercial se mantiene en el 12 % de las ventas y no cuenta los ingresos anticipados: es un supuesto prudente.',
  'dcf.justificacion.terminal': 'Gordon con un crecimiento del 3,5 % nominal en dólares (un 1 % real con una inflación de unos 2,3-2,5 %), coherente con la tasa libre del 5,27 %. Antes del terminal, una etapa de transición de cinco años (FY2037-FY2041) en la que el crecimiento baja del 6,5 % al 3,5 % con el margen constante. El múltiplo de salida implícito es de 7,7 veces el EBITDA, bajo frente a las 11,2 veces de los comparables: el DCF no descuenta un múltiplo de mercado alcista, sino un negocio maduro intensivo en capital.',
  'dcf.etapa2.justificacion': d.dcf.etapa2.justificacion.replace('La etapa añade 632.644 M de valor, un 19 % del total.', 'La etapa añade 571.166 M de valor, un 19 % del valor empresa.'),
  'dcf.lectura': 'El DCF da 419,91 USD por acción, un 20,7 % por debajo del precio, con un WACC del 10,34 %. El valor terminal pesa un 50 % y la etapa de transición un 19 %: dos tercios del valor están más allá de FY2036. Frente a la versión anterior (463,46 USD) solo cambia el capex de FY2030-FY2036, 4,5 puntos más alto para financiar el crecimiento proyectado. **El DCF inverso dice que el precio descuenta un crecimiento medio del 14,9 % anual en FY2027-FY2036, frente al 12,5 % de nuestro caso base, o un margen EBITDA del 72,4 % frente al 63 %; dicho de otro modo, una rentabilidad anual implícita del 9,1 %.** Es exigente frente a la historia (TCAC del 14,7 % en FY2017-FY2026, partiendo de una base cuatro veces menor) pero no frente al consenso, que espera un 21,7 % en FY2029. El precio rinde un 9,1 % al año, menos que el 9,52 % que pide hoy el mercado con su prima implícita y que nuestro WACC: con la prima del mercado, el DCF sube a 487,43 USD, todavía un 8,0 % por debajo del precio.',
  'escenarios.casos.1.narrativa': 'Azure crece por encima del 35 % dos años y modera después; Copilot y la subida de precios de las suites sostienen la productividad. El capex con arrendamientos alcanza su máximo en FY2027 (52 % de las ventas) y baja al 24,5 % en diez años, lo que necesita el crecimiento para que el capital rote como hoy; el ROIC se estabiliza en el 25-30 %.',
  'escenarios.comentario': 'La asimetría es muy desfavorable: el alcista vale 539,59 USD (+1,9 %) y el bajista 254,97 (−51,9 %), una relación de 0,04 veces. El valor ponderado, 402,61 USD, queda un 24,0 % por debajo del precio. El bajista es verosímil, no cosmético: Microsoft ya frenó al 6,9 % en FY2023 y la acción cayó un 37 % en 2022 y un 36,9 % entre octubre de 2025 y junio de 2026 [61]. Pierde más que en la versión anterior porque el capex, en porcentaje de las ventas, no baja aunque frene el crecimiento. Con la prima implícita del mercado la asimetría mejora a 0,43 veces (632,32 frente a 288,47 USD), pero sigue sin compensar.',
  'valoracion.comentario': d.valoracion.comentario.replace('La dispersión es amplia: de 358,20 USD (transacciones) a 536,81 (DCF con la prima del mercado). El valor objetivo, 450,46 USD, está un 15,0 % por debajo del precio.', 'La dispersión es amplia: de 358,20 USD (transacciones) a 487,43 (DCF con la prima del mercado). El valor objetivo, 413,69 USD, está un 21,9 % por debajo del precio.'),
  'riesgos.items.0.efecto_valor': '−18 % (crecimiento −2 p.p. al año); bajista −51,9 %',
  'riesgos.items.1.efecto_valor': '−6 % (margen −2 p.p.); −23 % si además frena el crecimiento',
  'riesgos.items.3.efecto_valor': '−8 % por +0,5 p.p. de WACC (386,36 USD)',
  'riesgos.items.4.efecto_valor': '−6 % (margen −2 p.p.)',
  'riesgos.items.5.efecto_valor': '−3 % (margen −1 p.p.)',
  'riesgos.items.6.efecto_valor': '≈ −5 % (crecimiento −0,5 p.p. al año; estimación con la tabla de sensibilidad)',
  'preguntas.items.0.por_que': d.preguntas.items[0].por_que.replace('bajista −44,8 %', 'bajista −51,9 %'),
  'meta.controles_explicados.0.explicacion': 'El 3,5 % es nominal en dólares: con el bono a 10 años al 5,27 % y una inflación esperada de unos 2,3-2,5 %, supone un 1 % real, por debajo del límite de la tasa libre menos medio punto. Con un 3,0 % el DCF baja a 405,64 USD (tabla de sensibilidad).',
};
if (T['dcf.etapa2.justificacion'] === d.dcf.etapa2.justificacion) throw new Error('etapa2 sin cambiar');
if (T['valoracion.comentario'] === d.valoracion.comentario) throw new Error('valoracion sin cambiar');
for (const [ruta, valor] of Object.entries(T)) {
  const partes = ruta.split('.');
  let o = d;
  for (const p of partes.slice(0, -1)) o = o[p];
  if (o === undefined || !(partes.at(-1) in o)) throw new Error(`Ruta inexistente: ${ruta}`);
  o[partes.at(-1)] = valor;
}

writeFileSync(join(dir, 'datos-v2.json'), JSON.stringify(d, null, 2));
console.log(`datos-v2.json escrito (${Object.keys(T).length} textos).`);
