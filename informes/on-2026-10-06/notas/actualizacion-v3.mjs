// actualizacion-v3.mjs — On Holding v3: regla relativa (prima implícita de Damodaran, oct-2026) y decisión sobre
// el DCF en tres etapas. No rehace la investigación: parte de datos-v2.json, borra calc, añade la fuente, la
// referencia de mercado, `dcf.etapa2` (no se usa: ver la justificación) y reescribe los textos que citan la
// recomendación, el objetivo o los niveles. Escribe datos-v3.json; después:
//   node motor/calcular-empresa.mjs --datos informes/on-2026-10-06/datos-v3.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos-v2.json'), 'utf8'));
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

// 2. Referencia de mercado (regla relativa).
d.valoracion.referencia_mercado = {
  mercado: 'S&P 500, prima implícita de Damodaran (T12m con payout sostenible)',
  prima_implicita_pct: 4.2,
  fecha: '2026-10',
  fuente: `Prima implícita del S&P 500 de octubre de 2026 [${idDam}].`,
};

// 3. DCF en tres etapas: no se usa (decidido por el negocio antes de calcular).
d.dcf.etapa2 = { usar: false, anios: 10, margen_final_pct: null, justificacion: null };

// 4. Textos reescritos con las cifras de calc (escritos después de un primer cálculo).
const r = `[${idDam}]`;
const T = {
  'resumen.recomendacion': 'Comprar',
  'resumen.conviccion': 'Baja',
  'resumen.justificacion_recomendacion': null,

  'resumen.sintesis': [
    `**La recomendación y por qué.** Comprar, con convicción baja y horizonte de 12 meses, porque las dos reglas discrepan y manda la relativa. Con nuestro WACC del 10,01 %, el valor objetivo es de 27,68 CHF (33,33 USD), un 4,5 % sobre el precio de 26,48 CHF (31,88 USD), sin dividendo: la regla absoluta da Mantener. Con la prima implícita del mercado (4,20 % ${r}), el WACC baja al 7,91 % y el objetivo sube a 36,62 CHF (44,09 USD): rentabilidad total esperada del 38,3 % y asimetría de 10,98 veces, y la regla relativa da Comprar. Es un Comprar solo relativo: el precio implica un 11,1 % anual, más que el 7,9 % que hoy pide el mercado a una acción de beta 1,72, pero apenas más que nuestro coste de capital. Si el mercado entero se abarata, On cae con él, y más que él.`,
    `**El negocio.** On vende a precio completo: margen bruto del 64,8 % en el 1S26, frente al 42,9 % de Nike [6, 39]. El foso es solo la marca [1]. El ROIC del 38,4 % casi cuadruplica el WACC.`,
    `**Sector y ciclo.** En un mercado promocional, On recortó en el 2T26 las entregas a mayoristas (+4,8 % en CHF) y rebajó por primera vez la guía de ventas; la venta directa creció un 34,3 % a divisa constante [6, 43].`,
    `**Finanzas.** Las ventas crecieron un 47,9 % anual en 2020-2025, hasta 3.014 M CHF. El dólar débil restó 8,1 puntos al crecimiento del 2T26 [1, 6]. Sin deuda financiera, tiene 643 M CHF de caja neta tras arrendamientos [7].`,
    `**Equipo y gobierno.** Restan: en trece meses salieron los dos co-CEO no fundadores, y los fundadores, con el 54-57 % del voto y el 13 % del capital, presiden y dirigen [1, 26].`,
    `**Valoración.** El DCF (50 %) da 30,07 CHF; los escenarios (30 %), 29,51 CHF, y los comparables (20 %), 18,98 CHF. El DCF inverso descuenta un crecimiento del 8,1 % anual en 2027-2035 (10,7 % en el caso base). No discrepamos del consenso: nuestras ventas quedan un 1,6-3,7 % por debajo hasta 2028 [69] y su objetivo medio (36,11 CHF [70]) es casi el nuestro con la prima del mercado. La distancia con el precio es de tasa de descuento y no hay un catalizador con fecha confirmada: por eso la convicción es baja. Sin etapa de transición: diez años explícitos ya llevan a On de en torno al 2 % a en torno al 4 % del calzado deportivo mundial. Con un terminal del 1,0 % en vez del 2,0 %, el objetivo relativo sería de 33,43 CHF (+26,2 %): la recomendación sigue.`,
    `**Riesgos y catalizadores.** La marca: el bajista, una pérdida de atractivo como la de Lululemon, vale 18,18 CHF (−31,3 %) [39]. Y el precio del riesgo: por la beta, cada décima de prima son 0,17 puntos de coste de capital, y la regla relativa deja de dar Comprar si la prima implícita pasa del 5,0 % (WACC del 9,2 %). Catalizadores: el 3T26 a mediados de noviembre, la guía de 2027 en marzo y la recompra de hasta 1.000 M USD [21].`,
    `**Qué cambiaría la decisión.** Con la regla combinada, compramos por debajo de 30,75 CHF (37,03 USD) y venderíamos por encima de 40,69 CHF (48,99 USD); entre ambos, Mantener. Pasaríamos a Mantener con una prima implícita por encima del 5,0 %, y a Vender si la venta directa del 3T26 crece menos del 20 % a divisa constante. Subiríamos la convicción si la guía de 2027 apunta a un crecimiento «high-teens» a divisa constante con un margen bruto del 65 % o más.`,
  ].join('\n\n'),

  'resumen.tesis': [
    'On ha crecido como pocas marcas deportivas, y con beneficio: ventas de 425 a 3.014 M CHF entre 2020 y 2025 (TCAC del 47,9 %), margen bruto del 64,8 % en el 1S26, el más alto del sector, ROIC del 38,4 % y 643 M CHF de caja neta después de arrendamientos [1, 6, 7]. Su valor está en una marca que vende a precio completo y en una cartera de crecimiento (Asia, ropa, venta directa) que todavía es pequeña.',
    'Al precio de 26,48 CHF (31,88 USD), el DCF inverso descuenta un crecimiento medio del 8,1 % anual en 2027-2035, frente al 10,7 % de nuestro caso base, o un margen EBITDA final del 18,2 % en lugar del 20,0 %; dicho de otro modo, una rentabilidad del 11,1 % anual. Cotiza a 11,2x EV/EBITDA de los próximos 12 meses, con prima sobre los comparables (8,0x) pero por debajo de cualquier cierre anual desde 2022: el mercado castiga la rebaja de la guía, el dólar débil y la cúpula nueva [6, 68].',
    `El mercado acierta en la dirección y exagera la cuantía, pero la conclusión depende de la tasa. Con nuestro WACC del 10,01 %, el valor objetivo es de 27,68 CHF (+4,5 %) y la regla absoluta da Mantener; con la prima implícita del mercado (4,20 % ${r}), de 36,62 CHF (+38,3 %), y la relativa, que manda, da Comprar. Para invertir hay que creer que el recorte de los mayoristas es temporal, y aceptar que la prima que hoy pide el mercado no vuelve al 5 %. En dólares (0,8305 CHF por USD [45]): objetivo de 33,33 USD (44,09 USD con la prima del mercado), compra por debajo de 37,03 USD y venta por encima de 48,99 USD.`,
  ].join('\n\n'),

  'resumen.vision_diferencial.nuestra_vision': 'El negocio está mejor de lo que dice la cotización: el margen bruto sube (64,8 %), la venta directa crece al 34 % a divisa constante y Asia ya es el 20 % de las ventas [6]. Lo que frena el crecimiento en CHF es sobre todo la divisa y una decisión voluntaria sobre los mayoristas. Con nuestro WACC del 10,01 %, el caso base solo está un 13,6 % por encima del precio; con el 7,91 % que resulta de la prima del mercado, el DCF da 41,36 CHF. La diferencia con el precio es más de tasa que de cifras.',

  'resumen.cambiaria_recomendacion': [
    'Si el precio supera 30,75 CHF (37,03 USD) sin mejora de las previsiones, pasaríamos a Mantener; por encima de 40,69 CHF (48,99 USD), a Vender.',
    `Si la prima implícita del mercado de Damodaran sube por encima del 5,0 % (WACC relativo del 9,2 %), la regla relativa daría Mantener sin que cambie nada de On ${r}.`,
    'Si la venta directa del 3T26 crece menos del 20 % a divisa constante, llevaríamos el caso base hacia el bajista (18,18 CHF) y pasaríamos a Vender.',
    'Si la guía de 2027 apunta a un crecimiento «high-teens» a divisa constante con margen bruto ≥ 65 %, subiríamos el caso base y la convicción a media.',
    'Si el margen bruto de 2026 sin aranceles devueltos queda por debajo del 63 %, revisaríamos a la baja el caso base.',
  ],

  'dcf.lectura': `El DCF da 30,07 CHF por acción (36,21 USD), un 13,6 % por encima del precio de 26,48 CHF. El rango con el WACC y el crecimiento terminal ± 0,5 puntos va de 27,34 a 33,56 CHF, y el valor terminal pesa el 58 %. Con la prima implícita del mercado (4,20 % ${r}), el WACC baja al 7,91 % y el DCF sube a 41,36 CHF (37,99-45,37 CHF): la beta de 1,72 convierte 1,3 puntos menos de prima en 2,2 puntos menos de coste de capital. El DCF inverso es lo importante. Al precio actual el mercado descuenta un crecimiento medio de las ventas del 8,1 % anual en 2027-2035, frente al 10,7 % de nuestro caso base, o, con nuestro crecimiento, un margen EBITDA final del 18,2 % en lugar del 20,0 %. La rentabilidad implícita es del 11,1 % anual en CHF, algo por encima de nuestro WACC (10,01 %) y muy por encima del 7,9 % que hoy pide el mercado a una acción de esta beta. No es exigente para una empresa que crece un 24 % a divisa constante en el 1S26: el mercado ya no paga el plan de 2029.`,

  'dcf.justificacion.wacc': `Todo en CHF. Tasa libre: bono de la Confederación a 10 años, 0,51 % el 6-oct-2026 [75]. Beta: 2,08 en datos mensuales desde la OPV frente al S&P 500, ajustada a 1,72 con la fórmula de Blume [68, 71]. Prima de mercado del 5,5 % más 0,5 puntos por el riesgo de marca, la fabricación en Vietnam y el control de los fundadores. Coste de los fondos propios: 10,47 %; deuda: solo arrendamientos (6 %), al 3,5 %. WACC: 10,01 %. Con la prima implícita del mercado (4,20 % ${r}), el coste de los fondos propios sería del 8,23 % y el WACC del 7,91 %: es la referencia de la regla relativa, no la tasa del caso base.`,

  'dcf.justificacion.terminal': 'Gordon con un crecimiento a perpetuidad del 2,0 % en CHF: On vende en todo el mundo y el mercado de calzado deportivo crece un 5 % anual [41]. La regla del prompt (entre la inflación esperada y la tasa libre menos medio punto) no tiene solución en francos: con el bono al 0,51 % [75], el techo sería un 0,0 %. Mantenemos el 2,0 % con su sensibilidad: con un 1,0 %, el DCF baja a 28,12 CHF y el objetivo con la prima del mercado a 33,43 CHF (+26,2 %), sin cambiar la recomendación. El Gordon implica 7,6x el EBITDA de 2035, bajo la mediana de los comparables (8,0x NTM).',

  'dcf.etapa2.justificacion': 'No se usa. El ROIC (38,4 %) supera de sobra al WACC (10,01 %), pero el recorrido después de 2035 no se demuestra con los datos del informe. Los diez años explícitos ya llevan las ventas de 3.014 a 8.720 M CHF, de en torno al 2 % a en torno al 4 % del calzado deportivo mundial (estimación propia sobre Grand View [41]), y en 2034-2035 crecen al ritmo de ese mercado. El foso es solo la marca [1]: alargar el crecimiento diez años más sería un supuesto, no un dato. Con ella, el DCF subiría de 30,07 a 31,80 CHF (+5,8 %).',

  'valoracion.comentario': `El DCF pesa el 50 % porque On es un crecedor con un plan explícito a 2029 y diez años de proyección captan mejor su valor que un múltiplo de un año. Los escenarios, el 30 %, para incorporar la asimetría; los comparables, solo el 20 %: ningún par combina el crecimiento, el margen bruto y la caja neta de On, y la regresión no explica los múltiplos (R² de 0,02). Sin transacciones verificadas ni suma de partes. La dispersión es grande: comparables 18,98 CHF (−28,3 %) y DCF 30,07 CHF (+13,6 %). El valor objetivo es de 27,68 CHF (33,33 USD), un 4,5 % sobre el precio; con la prima implícita del mercado (4,20 % ${r}), 36,62 CHF (44,09 USD), un 38,3 %. El puente usa el balance a 30-jun-2026 (caja 1.205,6 M CHF, arrendamientos 562,5 M CHF, pensiones 8,1 M CHF) [7]; no incluye los aranceles a devolver (hasta 53 M CHF, 0,16 CHF por acción) [21].`,
};
for (const [ruta, valor] of Object.entries(T)) {
  const partes = ruta.split('.');
  let o = d;
  for (const p of partes.slice(0, -1)) o = o[p];
  if (!(partes.at(-1) in o)) throw new Error(`Ruta inexistente: ${ruta}`);
  o[partes.at(-1)] = valor;
}

writeFileSync(join(dir, 'datos-v3.json'), JSON.stringify(d, null, 2));
console.log(`datos-v3.json escrito (fuente nueva [${idDam}], ${Object.keys(T).length} textos).`);
