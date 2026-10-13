// actualizacion-v2.mjs — CSL v2: sostenibilidad del crecimiento (metodología del 10-oct-2026) con la lectura prudente
// del 13-oct (si la prueba no pasa entera, el caso base se queda en lo que la empresa puede sostener).
// No rehace la investigación: parte de datos.json, borra calc y añade `dcf.sostenibilidad` con lo que ya había en el
// informe y en las notas. Mismo precio (128,30 USD = 183,84 AUD) y fecha de corte (9-oct-2026).
//
// Veredicto, decidido antes de calcular: «En parte».
// - Volumen, sí: la Ig crece un 9 % anual en toneladas en los siete mercados principales [10] y el caso base supone
//   que Behring crece menos que su mercado (cuota de ≈ 30 % a ≈ 23 % en FY2036e, cálculo a mano). La capacidad se
//   pagó en FY17-FY23 (capex del 12-16 % de las ventas); la proyección reinvierte el 14 % del NOPAT y el motor la trata
//   como de activos ligeros (no calcula crecimiento financiable ni rendimiento del capital nuevo). `mercado_final`
//   en null: la cuota del informe (≈ 30 %) es de Behring en proteínas plasmáticas y el DCF proyecta el grupo (con
//   Seqirus y Vifor, el 28 % de las ventas).
// - Precio y margen, no del todo: el poder de precios es desigual (parte D de Medicare, nación más favorecida para
//   Medicaid, albúmina en China, Kcentra) [9, 17, 21]. La mejora del margen EBITDA hasta el 35,5 % iba más allá de la
//   guía de ahorros (≈ 550 M brutos en FY28, la mitad reinvertidos [9]: ≈ 275 M netos, ≈ 1,7 puntos sobre el 33,4 %
//   subyacente de FY26). Recorte mínimo: el margen se queda en el 35,0 % desde FY2030e (antes 35,2 % en FY2030e y
//   35,5 % desde FY2031e). No se toca el crecimiento: medio punto menos de crecimiento casi no mueve la prueba de
//   reinversión (baja también el circulante) y las ventas ya coinciden con el consenso [71].
// Escribe datos-v2.json; después:
//   node motor/calcular-empresa.mjs --datos informes/csl-2026-10-09/datos-v2.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos.json'), 'utf8'));
delete d.calc;

// 1. Caso base: margen EBITDA limitado a lo que demuestra la guía de ahorros.
const MARGEN_TOPE = 35.0;
for (const a of d.dcf.anios) {
  if (a.margen_ebitda_pct > MARGEN_TOPE) a.margen_ebitda_pct = MARGEN_TOPE;
}

// 2. Sostenibilidad del crecimiento.
d.dcf.sostenibilidad = {
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 3.8, precio_pct: 0, otros_pct: -4.1,
      comentario: 'Guía de ingresos planos: Behring sube un dígito medio en volumen (≈ 3,6 puntos del grupo) y Seqirus algo; precio plano por la parte D de Medicare, los precios de nación más favorecida para Medicaid desde el 1-sep-2026, la albúmina en China y Kcentra; otros, Vifor −25 % por los genéricos del hierro (≈ −3,8 puntos) y ≈ −50 M de divisa [9, 17, 21]. Reparto, estimación propia.' },
    { periodo: 'FY2028e', volumen_pct: 3.5, precio_pct: 0.5, otros_pct: -0.2,
      comentario: 'Vifor deja casi de restar; la Ig crece en volumen con el mercado (de 152 a 200 toneladas en FY22-FY25, +9 % anual), pero los FcRn frenan la CIDP [10, 34]. El consenso da +3,5 % [71].' },
    { periodo: 'FY2029e', volumen_pct: 4, precio_pct: 0.5, otros_pct: 0.5,
      comentario: 'Volumen de Ig y HAE por debajo del mercado (≈ 7 % previsto); mezcla hacia la SCIg (Hizentra, ≈ 55 % de cuota) y ANDEMBRY [1, 10]. El consenso da +4,3 % [71].' },
    { periodo: 'FY2030e', volumen_pct: 4, precio_pct: 0.5, otros_pct: 0.5,
      comentario: 'Mismo reparto: volumen con la red de recogida que ya existe (330 centros y ≈ 10 % más de plasma por donación con los nomogramas) y precio casi plano [10].' },
    { periodo: 'FY2031e', volumen_pct: 4, precio_pct: 0.5, otros_pct: 0.5,
      comentario: 'Igual que FY2030e; en Seqirus, las vacunas adyuvadas y de cultivo celular, las únicas que crecieron en FY26 [9].' },
  ],
  mercado_final: null,
  veredicto: 'En parte',
  justificacion: 'El volumen, sí: CSL es el primer fraccionador (≈30 % del mercado, ≈55 % de la SCIg) en un sector con un CR5 del 80 %, y la Ig crece un 9 % anual en toneladas [1, 10]. Con Behring al 5 % y el mercado al 7 %, su cuota bajaría al ≈23 % en FY2036e (cálculo propio; la cuota es solo de plasma, así que no hay mercado final). La capacidad se pagó en FY17-FY23 (capex del 12-16 % de las ventas); la proyección reinvierte el 14 % del NOPAT. El poder de precios, no: parte D de Medicare, nación más favorecida, China y Kcentra [9, 17, 21]. Por eso el margen se queda en el 35,0 % de los ahorros comprometidos [9].',
};

// 3. Textos con las cifras de calc.
const T = {
  'resumen.sintesis': [
    '**La recomendación y por qué.** Mantener, con convicción baja y en el borde de la venta. El valor objetivo es de 97,37 USD (139,52 AUD), un 24,1 % por debajo del precio de 128,30 USD (183,84 AUD), y la rentabilidad total esperada a 12 meses es del −21,8 %, con una asimetría de −0,06 veces: el alcista (124,86 USD) no llega al precio y el bajista (70,01) pierde un 45,4 %. Con nuestro coste de capital la regla da Vender; con la prima que hoy pide el mercado (4,2 %) el valor objetivo sube a 115,04 USD y la rentabilidad total a −8,1 %, que es Mantener, y esa regla manda. **La convicción es baja porque las dos reglas discrepan y la diferencia es casi toda tasa de descuento**: pasaríamos a Vender por encima de 129,50 USD (185,56 AUD), un 0,9 % sobre el precio, y a Comprar por debajo de 95,42 USD (136,73 AUD) o si el margen bruto de Behring del primer semestre de FY27 supera el 52 %.',
    '**El negocio.** CSL es el primer fraccionador de plasma del mundo (≈30 % del mercado y ≈55 % de la inmunoglobulina subcutánea) en un sector concentrado con un foso de escala amplio [1, 10]. Lo que se ha roto es la rentabilidad: el margen bruto de Behring bajó del 57,1 % en FY19 al 49,6 % en FY26 [1], y Vifor, comprada por 11.665 M a 19,4 veces el EBITDA, acumula 4.845 M de deterioros [1, 85]. El ROIC pasó del 21-26 % de FY17-FY21 al 11,4 % en FY25, 2,5 puntos sobre el WACC (8,86 %). **La calidad sostiene solo en parte el crecimiento proyectado**: el volumen sí (la Ig crece un 9 % anual y el caso base pierde cuota), el precio no [9, 10, 21]; por eso el margen EBITDA se queda en el 35,0 % de los ahorros comprometidos.',
    '**Finanzas.** El EBITDA subyacente de FY26 es de 5.282 M (33,4 % de margen), con 844 M de reestructuración fuera; la pérdida estatutaria de 2.579 M es contable [1]. La deuda neta ajustada (10.668 M, 2,0 veces el EBITDA) no preocupa; el circulante, en el 42,4 % de las ventas, sí frena la caja: la conversión de la década es del 75 %.',
    '**Equipo y gobierno.** Restan. Consejero delegado interino desde febrero, directores financiero y comercial nuevos, guía de FY26 rebajada dos veces y escisión de Seqirus aplazada [17, 18, 38]. El consejo es independiente (9 de 10), pero la remuneración tuvo un 42,30 % de votos en contra en 2025 [1, 39].',
    '**Valoración.** El DCF da 101,84 USD (−20,6 %). El DCF inverso dice que el precio pide un crecimiento de las ventas del 6,8 % anual durante diez años, frente al 3,7 % de nuestro caso base y a una guía de ingresos planos para FY27, o un margen EBITDA del 40,4 %, más de cuatro puntos por encima del máximo de la década [9]. La rentabilidad implícita es del 7,9 % con un Tesoro al 5,28 % [65]. No discrepamos del consenso en las ventas, y nuestro EBITDA es un 5-7 % mayor en FY28-FY29 [71]; discrepamos del precio, que ha subido un 104 % desde junio y ya está en el objetivo medio de los analistas (128,84 USD) [62, 72].',
    '**Riesgos y catalizadores.** El mayor riesgo es que el margen de Behring no se recupere (el bajista, −45,4 %) durante el cambio de máquinas de aféresis y la espera de Horizon 2 [22, 23]; después, los anticuerpos FcRn en la CIDP y una tasa de descuento más alta (WACC +0,5 puntos: −10 % de valor). Catalizadores con fecha: la junta del 27-oct-2026, el nombramiento del consejero delegado y los resultados semestrales del 9-feb-2027.',
    '**Qué cambiaría la decisión.** Además de los niveles de precio, una nueva rebaja de la guía de FY27 o un Tesoro por encima del 5,5 % bajarían el valor.',
  ].join('\n\n'),

  'resumen.tesis': d.resumen.tesis
    .replace('un crecimiento del 6,5 % anual durante diez años, o un margen EBITDA del 40,5 %', 'un crecimiento del 6,8 % anual durante diez años, o un margen EBITDA del 40,4 %')
    .replace('la acción vale 117,00 USD', 'la acción vale 115,04 USD'),

  'resumen.vision_diferencial.mercado_descuenta': d.resumen.vision_diferencial.mercado_descuenta
    .replace('un crecimiento del 6,5 % anual o un margen EBITDA del 40,5 %', 'un crecimiento del 6,8 % anual o un margen EBITDA del 40,4 %'),
  'resumen.vision_diferencial.nuestra_vision': d.resumen.vision_diferencial.nuestra_vision
    .replace('un margen del 35,5 % a largo plazo: eso vale 103,89 USD con nuestro WACC y 126,61 con la prima del mercado.', 'un margen del 35,0 % a largo plazo, el que dan los ahorros comprometidos: eso vale 101,84 USD con nuestro WACC y 124,14 con la prima del mercado.'),

  'resumen.en_contra.0': '**El precio pide un 6,8 % de crecimiento anual** durante diez años frente a una guía de ingresos planos [9].',
  'resumen.cambiaria_recomendacion.0': 'Si el precio baja de 95,42 USD (136,73 AUD), pasaríamos a Comprar.',
  'resumen.cambiaria_recomendacion.1': 'Si el precio supera 129,50 USD (185,56 AUD), un 0,9 % sobre el actual, pasaríamos a Vender.',

  'dcf.justificacion.margenes': 'Margen EBITDA del 32,2 % en FY27e, después de ≈300 M de reestructuración en caja: el subyacente de FY26 fue del 33,4 % [1, 9]. Sube al 34,3 % en FY28e con ≈550 M de ahorros brutos (la mitad reinvertidos) [9] y se queda en el 35,0 % desde FY30e: ≈275 M netos son ≈1,7 puntos sobre el 33,4 %, y no suponemos más mejora porque CSL no ha demostrado poder de precios (prueba de sostenibilidad). Queda por debajo del máximo de FY21 (36,1 %). Lo protegen la recuperación parcial del margen bruto de Behring con las máquinas de Haemonetics y la baja del coste por litro (−15 % desde el pico) [10, 23]; no damos por hecho Horizon 2. Nuestro EBITDA queda un 5,3 % por encima del consenso en FY28e y un 6,7 % en FY29e [71]: el consenso no recoge los ahorros o mantiene costes de reestructuración.',

  'dcf.justificacion.terminal': d.dcf.justificacion.terminal
    .replace('10,7 veces el EBITDA', '10,6 veces el EBITDA')
    .replace('96.208 M en vez de 85.407 M', '94.852 M en vez de 83.838 M'),

  'dcf.lectura': 'El DCF da 101,84 USD por acción (145,92 AUD), un 20,6 % por debajo del precio, con un 60 % del valor en el terminal. **El precio descuenta una CSL que vuelve a crecer como antes.** El DCF inverso dice que, con nuestros márgenes, el precio pide un crecimiento de las ventas del 6,8 % anual de FY27e a FY36e, frente al 3,7 % de nuestro caso base, al +3,5-4,3 % que da el consenso para FY28e-FY29e y a la guía de ingresos planos de FY27 [9, 71]. Con nuestro crecimiento, pide un margen EBITDA del 40,4 %, más de cuatro puntos por encima de cualquier año de la década (36,1 % en FY21). Lo exigente no es el negocio sino la tasa: la rentabilidad implícita en el precio es del 7,9 %, por debajo de nuestro WACC (8,86 %) y cerca de lo que hoy pide el mercado a una acción de su beta (8,0 %). Con esa prima el DCF da 124,14 USD, un 3 % por debajo del precio. Comprar hoy es aceptar una rentabilidad propia del 7,9 % con un Tesoro al 5,28 % y apostar a que el nuevo equipo recupera el margen de Behring más allá de los ahorros comprometidos.',

  'escenarios.casos.0.narrativa': d.escenarios.casos[0].narrativa.replace('margen del 32,5 %', 'margen del 32,0 %'),
  'escenarios.casos.1.narrativa': 'Ingresos planos en FY27, ahorros de ≈550 M en FY28 (la mitad reinvertidos) y la Ig creciendo a un dígito medio-alto: crecimiento medio del 3,7 % y margen EBITDA del 35,0 % desde FY30, el que dan los ahorros, por debajo del máximo de FY21.',
  'escenarios.casos.2.narrativa': d.escenarios.casos[2].narrativa.replace('margen del 37,5 %', 'margen del 37,0 %'),
  'escenarios.comentario': 'La asimetría es mala con nuestro coste de capital: el alcista vale 124,86 USD (−2,7 %) y el bajista 70,01 (−45,4 %), una asimetría de −0,06 veces: ni el escenario bueno da recorrido. El bajista no es cosmético: es prolongar los márgenes de FY23-FY26. Con la prima implícita del mercado (4,2 %) la foto mejora sin dar para comprar: alcista de 151,76 USD, bajista de 84,89 y asimetría de 0,54 veces. Tras subir un 104 % desde junio, el precio ya paga la recuperación.',

  'valoracion.comentario': d.valoracion.comentario
    .replace('entre 75,96 y 103,89 USD', 'entre 75,96 y 101,84 USD')
    .replace('(126,61)', '(124,14)'),

  'riesgos.items.0.efecto_valor': 'Bajista: 70,01 USD, −31 % sobre el valor base',
  'riesgos.items.3.efecto_valor': 'WACC +0,5 puntos: 91,69 USD (−10 % sobre el DCF)',
  'preguntas.items.0.por_que': 'Es el supuesto que más mueve el valor: el precio pide un margen EBITDA del 40,4 %.',
};

for (const [ruta, valor] of Object.entries(T)) {
  const partes = ruta.split('.');
  let o = d;
  for (const p of partes.slice(0, -1)) o = o[p];
  if (o === undefined || !(partes.at(-1) in o)) throw new Error(`Ruta inexistente: ${ruta}`);
  if (o[partes.at(-1)] === valor) throw new Error(`Sin cambio (ancla no encontrada): ${ruta}`);
  o[partes.at(-1)] = valor;
}

writeFileSync(join(dir, 'datos-v2.json'), JSON.stringify(d, null, 2));
console.log(`datos-v2.json escrito (margen tope ${MARGEN_TOPE} %, sostenibilidad «${d.dcf.sostenibilidad.veredicto}», ${Object.keys(T).length} textos).`);
