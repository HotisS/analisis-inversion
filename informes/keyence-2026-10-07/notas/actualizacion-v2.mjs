// actualizacion-v2.mjs — Keyence v2: regla relativa (prima implícita de Damodaran, oct-2026) y DCF en tres etapas.
// No rehace la investigación: parte de datos.json, borra calc, añade la fuente y la referencia de mercado, y
// pone `dcf.etapa2`. La etapa se decidió por el negocio antes de calcular: ROIC del 94,6 %, ventas exteriores
// (67 %) creciendo más del 15 % en moneda local tres años seguidos, productividad exterior a la mitad de la
// japonesa y un mercado de visión previsto al +8,3 % anual. Con tres etapas, el último año explícito ya no tiene
// que converger al terminal: la cola FY2033e-FY2035e pasa de 6,5/5/3,5 % a 7/6,5/6 % (por debajo del 8,3 % del
// mercado) y la transición dura diez años hasta el 2,5 %. El terminal (2,5 % en JPY) cumple la regla del prompt
// (entre la inflación esperada, ≈ 2 %, y la tasa libre menos medio punto, 2,6 %): no se cambia.
// Escribe datos-v2.json; después:
//   node motor/calcular-empresa.mjs --datos informes/keyence-2026-10-07/datos-v2.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos.json'), 'utf8'));
delete d.calc;

// 1. Fuente nueva: la prima implícita del S&P 500 de Damodaran.
const idDam = Math.max(...d.fuentes.map((f) => f.id)) + 1;
d.fuentes.push({
  id: idDam,
  titulo: 'Implied Equity Risk Premium by month (ERPbymonth.xlsx), octubre de 2026: 4,20 % (T12m with sustainable payout)',
  editor: 'Aswath Damodaran (NYU Stern)',
  tipo: 'Datos de mercado',
  fecha: '2026-10',
  url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx',
});
const r = `[${idDam}]`;

// 2. Referencia de mercado (regla relativa).
d.valoracion.referencia_mercado = {
  mercado: 'S&P 500, prima implícita de Damodaran (T12m con payout sostenible)',
  prima_implicita_pct: 4.2,
  fecha: '2026-10',
  fuente: `Prima implícita del S&P 500 de octubre de 2026 ${r}.`,
};

// 3. DCF en tres etapas: cola explícita sin la convergencia forzada y diez años de transición.
for (const [p, g] of Object.entries({ FY2033e: 7, FY2034e: 6.5, FY2035e: 6 })) {
  const a = d.dcf.anios.find((x) => x.periodo === p);
  if (!a) throw new Error(`Falta ${p}`);
  a.crecimiento_pct = g;
}
d.dcf.etapa2 = {
  usar: true, anios: 10, margen_final_pct: null,
  justificacion: 'El ROIC (94,6 %) multiplica por once el WACC (8,50 %): crecer crea valor. El recorrido se ve en el informe: dos tercios de las ventas ya son exteriores y crecen más del 15 % en moneda local tres años seguidos (+24 % en el 1T26) [15]; la productividad por ingeniero fuera de Japón es la mitad de la japonesa [24], y la visión artificial, de 15.830 M USD, crecerá un 8,3 % anual hasta 2030 [36]. La ventaja se refuerza con la escala: los ingenieros recogen problemas en cientos de miles de plantas y eso alimenta el desarrollo [2]. Por eso FY2035e crece un 6 %, por debajo del mercado, y la transición dura diez años hasta el 2,5 %.',
};

// 4. Textos reescritos con las cifras de calc.
const T = {
  'resumen.recomendacion': 'Mantener',
  'resumen.conviccion': 'Baja',
  'resumen.justificacion_recomendacion': null,

  'resumen.sintesis': [
    `**La recomendación y por qué.** Mantener, con convicción baja, porque las dos reglas discrepan y manda la relativa. Con nuestro WACC del 8,50 %, el valor objetivo es de 66.566,47 JPY frente a un precio de 81.490 JPY: rentabilidad total esperada del −17,6 %, con el alcista un 16,3 % arriba y el bajista un 47,5 % abajo; la regla absoluta da Vender. Con la prima implícita del mercado (4,20 % ${r}), el WACC baja al 7,51 % y el objetivo sube a 75.201,52 JPY (−7,0 %): la regla relativa da Mantener. Es un Vender solo absoluto: Keyence no cubre su coste de capital, pero está tan cara como el mercado, no más. La convicción es baja porque nuestras cifras a tres años coinciden con el consenso (−1,6 % a −4,9 %), la diferencia está en la tasa y en el largo plazo, y el Mantener depende de la etapa de transición: con cinco años en vez de diez, la relativa daría Vender (−10,2 %).`,
    '**El negocio.** Venta directa con ingenieros propios, fabricación subcontratada y entrega en el día: margen bruto del 83 %, margen operativo del 51,0 % y un ROIC del 94,6 % sin la caja, frente a márgenes del 3-28 % de Cognex, Omron, SMC, Fanuc, Sick o Mettler-Toledo [1, 27, 28, 29, 30, 31, 32, 33, 34, 35]. Ha multiplicado las ventas por 2,8 en diez años sin una sola compra. La debilidad: los gastos de venta suben del 24,5 % al 29,3 % de las ventas porque crecer fuera de Japón exige contratar antes de vender [1].',
    '**Sector y ciclo.** El ciclo está en expansión: el 1T26 creció un 32,8 % (+24,0 % en moneda local fuera de Japón) [15]. Pero 26.100 M JPY de ese crecimiento fueron divisa, y Keyence ya cayó un 6,0 % y un 2,5 % en FY2019-FY2020 [4].',
    '**Finanzas.** Sin deuda y con 2,99 billones de JPY de efectivo y valores, el 15,2 % de la capitalización, que rentan en torno al 0,6 % [1, 9]. En diez años no hubo recompras. Conversión de beneficio en caja del 92 %.',
    `**Valoración.** El DCF, ahora en tres etapas, da 63.376,65 JPY (57.852,47 sin la transición); el valor terminal pesa un 38 % y la transición un 28 %. Usamos la etapa porque el ROIC es del 94,6 % y el recorrido está en los datos: ventas exteriores creciendo más del 15 % en moneda local, productividad exterior a la mitad de la japonesa [24] y un mercado previsto al +8,3 % [36]. El terminal del 2,5 % en yenes cumple la regla nueva (entre la inflación objetivo del 2 % y el JGB menos medio punto, 2,6 %): no lo tocamos. El DCF inverso pide un 11,4 % anual en diez años (8,4 % en nuestra base) o, dicho de otro modo, ofrece un 7,0 %: menos que nuestro WACC y algo menos que el 7,5 % que pide el mercado a su beta. Cotiza a 40,2 veces el beneficio, su media de diez años, con el bono tres puntos más alto.`,
    '**Riesgos y catalizadores.** A corto plazo, el riesgo es al alza: el consenso (13 compras de 15, objetivo de 97.866,67 JPY) y el 2T del 29-oct-2026 contra una base fácil [60, 63]. A la baja, el giro del ciclo (bajista de 42.817,25 JPY) y un yen más fuerte (cada yen frente al dólar resta ≈ 1.100 M JPY de resultado operativo) [15].',
    '**Qué cambiaría la decisión.** Con la regla combinada, compraríamos por debajo de 65.834,24 JPY y venderíamos por encima de 84.206,58 JPY, solo un 3,3 % sobre el precio. Pasaríamos a Vender si el crecimiento exterior en moneda local baja del 8 % dos trimestres seguidos, y subiríamos el base con un crecimiento exterior por encima del 15 % cuatro trimestres seguidos y un margen operativo del 55 %.',
  ].join('\n\n'),

  'resumen.tesis': [
    'Keyence vende sensores, sistemas de visión, equipos de medición y microscopios digitales directamente a las fábricas, con ingenieros de venta propios, sin distribuidores y sin fábricas: subcontrata la producción y entrega desde su stock en el día. El resultado es un margen bruto del 83 %, un margen operativo del 51,0 %, un ROIC del 94,6 % y ninguna deuda [1, 23]. Ha crecido un 12,3 % al año en diez años sin compras, y dos tercios de las ventas ya son de fuera de Japón [1].',
    'El precio, 81.490 JPY, es 40,2 veces el beneficio de los últimos doce meses, su media de diez años. El DCF inverso dice qué descuenta: un crecimiento del 11,4 % anual durante diez años con nuestro margen, seguido de nuestra transición de diez años, o una rentabilidad del 7,0 % anual para el accionista, con el JGB a 10 años al 3,103 % [65]. Frente a sus comparables, la prima es del 12 % [67, 68, 69, 70, 71, 72, 73].',
    `El mercado acierta con el negocio y, a nuestro juicio, cobra poco por el tiempo. Aun dando a Keyence veinte años de crecimiento por encima del terminal, el valor objetivo es de 66.566,47 JPY con nuestro WACC (regla absoluta: Vender) y de 75.201,52 JPY con la prima implícita del mercado (4,20 % ${r}; regla relativa: Mantener, que es la que manda). Para comprar habría que creer que la próxima década superará a la pasada, que tuvo el viento a favor de un yen que pasó de ≈ 108 a ≈ 156 por dólar. No lo creemos, pero tampoco hay base para vender: está tan cara como el mercado.`,
  ].join('\n\n'),

  'resumen.vision_diferencial.mercado_descuenta': 'Que Keyence vale lo que siempre ha valido: 40 veces el beneficio. El consenso espera un +24 % de ventas en FY2026e y un 54,8 % de margen EBITDA, con trece compras de quince analistas y un objetivo medio de 97.866,67 JPY [59, 60]. Implícitamente, descuenta un 11,4 % de crecimiento anual durante diez años o una rentabilidad del 7,0 %.',
  'resumen.vision_diferencial.nuestra_vision': `Las cifras a tres años del consenso son razonables y casi idénticas a las nuestras. Lo que no compartimos es el largo plazo: crecimiento medio del 8,4 % en diez años (con un año de corrección del ciclo, como FY2019), diez más de transición hasta el 2,5 %, margen del 53 % y un WACC del 8,50 %. Eso vale 63.376,65 JPY en el DCF y 66.566,47 JPY en la síntesis; con la prima implícita del mercado ${r}, 75.201,52 JPY.`,

  'resumen.en_contra.0': '**El precio exige un 11,4 % anual durante diez años**, frente al 8,4 % de nuestro base y al 12,3 % histórico con yen débil.',
  'resumen.en_contra.1': '**Rentabilidad implícita del 7,0 %**, solo 3,9 puntos sobre un JGB a 10 años al 3,103 % y por debajo del 7,5 % que pide el mercado a su beta.',
  'resumen.en_contra.3': '**Ciclo**: FY2019-FY2020 restaron un 8 % de las ventas; el bajista vale 42.817,25 JPY.',
  'resumen.que_vigilar': 'La tesis depende de que el crecimiento vuelva a una cifra de un dígito alto cuando pase el ciclo y de que el mercado exija una prima normal sobre un JGB al 3 %. La señal de que nos equivocamos sería un crecimiento exterior en moneda local por encima del 15 % durante cuatro trimestres seguidos con un margen operativo por encima del 55 %, como en FY2017 y FY2021: eso acercaría el crecimiento real al 11,4 % que descuenta el precio.',

  'resumen.cambiaria_recomendacion': [
    'Si el precio supera 84.206,58 JPY, pasaríamos a Vender; por debajo de 65.834,24 JPY, a Comprar.',
    'Si el crecimiento exterior en moneda local baja del +8 % dos trimestres seguidos, recortaríamos la etapa de transición y el base, y pasaríamos a Vender.',
    'Si el crecimiento exterior en moneda local supera el +15 % durante cuatro trimestres seguidos con margen operativo por encima del 55 %, revisaríamos el crecimiento del base al alza.',
    'Si Keyence anuncia una recompra de más del 5 % del capital (≈ 1 billón de JPY), subiría el valor por acción y la convicción en la asignación de capital.',
    'Si el JGB a 10 años baja del 2,5 % (con el terminal al 2,0 % por coherencia), el objetivo con la prima del mercado subiría a 79.738,45 JPY (−1,5 %): seguiríamos en Mantener.',
  ],

  'dcf.justificacion.crecimiento': 'FY2026e +22 % (1.426.533 M JPY), un 1,6 % por debajo del consenso (+24 %) [59]: 26.100 M JPY del 1T fueron divisa [15]. FY2027e +11 % y FY2028e +9 %, también algo por debajo del consenso. FY2029e −5 %: un giro del ciclo como el de FY2019 (−6,0 %) [4]. Luego 10 %, 9 %, 8 %, 7 %, 6,5 % y 6 %: con la etapa de transición, el último año ya no tiene que llegar al terminal, y el 6 % queda por debajo del 8,3 % previsto para la visión artificial [36]. La media de diez años es del 8,4 %, frente al 12,3 % de FY2016-FY2025, que incluyó ≈ 2,5 puntos anuales de yen débil (estimación propia) [1, 16].',
  'dcf.justificacion.wacc': `Todo en JPY. Tasa libre: JGB a 10 años al 3,103 % a 6-oct-2026 (Ministerio de Finanzas) [65], contrastado con Trading Economics (3,11 % el 7-oct) [95]. Beta de 1,07 a cinco años mensual frente al Nikkei 225, ajustada de Blume a 1,05 [58, 64]. Prima de mercado del 5,14 %, la de Damodaran para Japón (madura más 0,91 puntos de riesgo país) [93]. Sin deuda, el WACC es el coste del capital: 8,50 %. Con la prima implícita del S&P 500 de octubre (4,20 % ${r}), sería del 7,51 % y el DCF daría 74.341,75 JPY: la regla relativa pasa a Mantener.`,
  'dcf.justificacion.terminal': 'Gordon con un 2,5 % nominal en JPY. Cumple la regla del prompt: está entre la inflación esperada (el objetivo del 2 % del Banco de Japón, que el JGB al 3,1 % ya descuenta) y la tasa libre menos medio punto (2,6 %); el 1-1,5 % de antes sí sería incoherente con ese bono. Se aplica en FY2045e, al final de la transición. El múltiplo implícito es de 11,2x el EBITDA, menos de la mitad de los 24,8x de hoy. Un múltiplo de salida de 20x, como el de Mettler-Toledo y Rockwell (22-23x NTM) [72, 73], equivaldría a crecer un 5,05 % a perpetuidad en yenes; por eso no lo usamos.',
  'dcf.wacc.nota': 'Tasa libre: rendimiento del JGB a 10 años a 6-oct-2026, 3,103 % (Ministerio de Finanzas de Japón, curva a vencimiento constante, fila «2026/10/6», columna 10Y) [65]. Beta 1,07 (5 años, mensual, frente al Nikkei 225, sin ajustar) [58]; contraste 1,02 (Stock Analysis) [64]; ajustada de Blume = 1,05. Sin deuda financiera [9]: peso de la deuda 0. Prima de mercado: 5,14 %, la de Damodaran para Japón [93]. Terminal del 2,5 %, dentro del intervalo de la regla (inflación ≈ 2 %; JGB − 0,5 = 2,6 %).',

  'dcf.lectura': `El DCF en tres etapas da 63.376,65 JPY por acción, un 22,2 % por debajo del precio, con un rango de 57.501,88 a 71.471,90 JPY al mover WACC y crecimiento terminal medio punto. Sin la transición de diez años daría 57.852,47 JPY: la etapa aporta un 9,5 % y pesa un 28 % del valor empresa; el terminal, un 38 %. Con la prima implícita del mercado (4,20 % ${r}), el WACC baja al 7,51 % y el DCF sube a 74.341,75 JPY. El DCF inverso: para justificar 81.490 JPY con nuestros márgenes, las ventas tendrían que crecer un 11,4 % al año de media en FY2026e-FY2035e, frente al 8,4 % del caso base y al 12,3 % de los últimos diez años, con un yen débil. Con nuestro crecimiento, haría falta un margen EBITDA del 70,4 %: imposible. El precio descuenta una rentabilidad anual del 7,0 %, por debajo del 8,50 % que exigimos y del 7,5 % que hoy pide el mercado a una acción de beta 1,05. Es exigente frente a la historia y a la tasa libre, no frente al consenso a tres años.`,

  'escenarios.casos.1.narrativa': 'Las ventas siguen al consenso hasta FY2028e con un descuento del 1,6-3,8 % (+22 %, +11 %, +9 %), con el margen EBITDA en el 54-54,5 % [59]. En FY2029e llega la corrección del ciclo (−5 %, margen del 51 %), calibrada con FY2019 [4]; luego el crecimiento vuelve al 10 % por la expansión fuera de Japón, baja al 6 % en FY2035e y, en la etapa de transición, al 2,5 % en FY2045e, con el margen en el 53 %.',
  'escenarios.comentario': 'La asimetría es desfavorable con nuestro WACC: el alcista (94.786,53 JPY) gana un 16,3 %, el base pierde un 22,2 % y el bajista (42.817,25 JPY) un 47,5 % (0,34 veces). Con la prima implícita del mercado mejora a 1,09 veces (alcista de 118.155,35 JPY y bajista de 47.958,13 JPY). El bajista no es cosmético: FY2019-FY2020 encadenaron dos años de caída (−6,0 % y −2,5 %) y la acción perdió un 28,5 % en 2022 [4, 58]; 42.817,25 JPY combinarían el ciclo con una caída del múltiplo por debajo del mínimo de diez años (29,9x). El perfil del bajista concentra la caída en FY2027e y no la convierte en una pérdida de nivel permanente.',

  'riesgos.items.1.efecto_valor': '−32 % sobre el base (bajista: 42.817,25 JPY)',
  'riesgos.premortem': 'Octubre de 2029. No comprar Keyence a 81.490 JPY fue un error: cotiza a 115.000 JPY. Qué pasó. Primero, el ciclo no giró: la automatización de fábricas en EE. UU. y la India, empujada por la relocalización y la falta de mano de obra, mantuvo el crecimiento exterior por encima del 15 % en moneda local tres años seguidos, como en el 1T26 (+24 %) [15]. Las ventas llegaron a 1,9 billones de JPY en FY2028, un 10 % por encima de nuestro base. Segundo, el margen volvió al 56 %, como en FY2017 y FY2021, porque los ingenieros de venta contratados en 2022-2025 maduraron [1]. Tercero, la empresa usó por fin la caja: recompró un 5 % del capital y subió el payout al 40 %. Y cuarto, el mercado nunca exigió el 8,5 %: siguió pagando 40 veces el beneficio, aunque el JGB rindiera un 3 %. Las señales que lo habrían anticipado: el crecimiento en moneda local del 2T y 3T FY2026 por encima del 20 %, el margen operativo por encima del 55 % y el primer anuncio de recompra.',

  'valoracion.comentario': `El DCF pesa un 50 % porque es el único método que separa lo que vale el negocio de lo que el mercado paga por el sector. Los escenarios pesan un 25 % para recoger el ciclo y los comparables un 25 %: Keyence no tiene un par de verdad (margen del 52 % frente al 12-37 %) y la muestra es frágil. Las transacciones no pesan: nadie puede comprar ≈ 16,7 billones de JPY de valor empresa, y sus múltiplos (96.950,89 JPY por acción) llevan prima de control. La dispersión es grande, de 42.817,25 JPY (bajista) a 96.950,89 JPY. El valor objetivo es de 66.566,47 JPY (−18,3 %); con la prima implícita del mercado (4,20 % ${r}), 75.201,52 JPY (−7,7 %). Puente a 20-jun-2026: sin deuda, 2.995.278 M JPY de efectivo, depósitos y valores, y 99.243 M JPY de asociadas a valor de cotización [1, 9].`,
};
for (const [ruta, valor] of Object.entries(T)) {
  const partes = ruta.split('.');
  let o = d;
  for (const p of partes.slice(0, -1)) o = o[p];
  if (o === undefined || !(partes.at(-1) in o)) throw new Error(`Ruta inexistente: ${ruta}`);
  o[partes.at(-1)] = valor;
}

writeFileSync(join(dir, 'datos-v2.json'), JSON.stringify(d, null, 2));
console.log(`datos-v2.json escrito (fuente nueva [${idDam}], ${Object.keys(T).length} textos).`);
