// actualizacion-v4.mjs — On Holding v4: sostenibilidad del crecimiento (`dcf.sostenibilidad`, metodología del 10-oct).
// No rehace la investigación ni cambia supuestos del DCF: parte de datos-v3.json, borra calc, añade
// `dcf.sostenibilidad` (puente de ingresos 2026e-2029e, mercado final de 2035e y veredicto) y reescribe solo los
// textos que cambian. Escribe datos-v4.json; después:
//   node motor/calcular-empresa.mjs --datos informes/on-2026-10-06/datos-v4.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos-v3.json'), 'utf8'));
delete d.calc;

// 1. Sostenibilidad del crecimiento.
// Mercado final: calzado deportivo mundial de Grand View (el perímetro de competencia.cuota_pct, 2,1 %), 205.800 M USD
// en 2030e [41], extrapolado al 5 % anual (su TCAC prevista) hasta 2035e = 262.659 M USD, al USD/CHF del corte
// (0,8305) = 218.138 M CHF. El motor divide las ventas totales de On (con un 7-8 % de ropa y accesorios) entre ese
// mercado de calzado: la cuota implícita queda ≈ 0,3 puntos por encima de la de calzado. Se dice en la justificación.
d.dcf.sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 17, precio_pct: 4, otros_pct: -4.4,
      comentario: 'Guía de crecimiento «low-20%» a divisa constante, reiterada el 22-sep, con dos trimestres publicados (+24,0 % en el 1S26) [6, 21]. Precio: subidas selectivas sin cifras publicadas [40] y venta a precio completo; volumen: venta directa (+34,3 % en el 2T26), Asia-Pacífico y ropa. Otros: la divisa, que restó 8,1 puntos en el 2T26 y menos en el 2S26 [6]. Reparto entre volumen y precio, estimación propia.' },
    { periodo: '2027e', volumen_pct: 14, precio_pct: 3.5, otros_pct: -0.5,
      comentario: 'Plan a 2029: crecimiento «high-teens» a divisa constante [21]. Volumen: tiendas propias (67 a finales de 2025), Asia-Pacífico (20,5 % de las ventas en el 1S26) y ropa (8,1 %) [1, 6]; precio: el margen bruto subió del 56,0 % al 64,8 % en 2022-1S26 con subidas selectivas [1, 6, 40]. Otros: un franco algo más fuerte (estimación propia).' },
    { periodo: '2028e', volumen_pct: 13, precio_pct: 3.5, otros_pct: -0.5,
      comentario: 'Mismo plan a 2029 [21]; el consenso da +18,4 % en 2028e en CHF [69]. Vuelta de los mayoristas a dos dígitos tras el recorte de entregas del 2T26 [6].' },
    { periodo: '2029e', volumen_pct: 12, precio_pct: 3.5, otros_pct: -0.5,
      comentario: 'Último año del plan: ventas de 5.485 M CHF, un 2 % por debajo del objetivo de 5.600 M CHF por la divisa [21].' },
  ],
  mercado_final: { periodo: '2035e', tamano: 218138 },
  veredicto: 'En parte',
  justificacion: 'Sí hasta 2029, en parte después. On ha demostrado poder de precios: el margen bruto subió del 56,0 % al 64,8 % en 2022-1S26 pese al arancel sobre Vietnam, sin rebajas y frenando a los mayoristas cuando el mercado se volvió promocional [1, 6]. Hasta 2029 hay plan y guía [21]. Después, el foso es estrecho, solo la marca, y su crecimiento no ha pasado por un ciclo: la primera rebaja de la guía llegó en 2026 [6]. Las pruebas lo marcan: la reinversión proyectada financia un 6,0 % anual al ROIC actual frente al 11,3 % proyectado, el capital nuevo tendría que rendir un 58,4 % (48,6 % histórico) y la cuota pasaría del 2,1 % al 4,0 % del calzado deportivo mundial (≈ 3,7 % solo en calzado) [41].',
};

// 2. Textos que cambian (escritos después de un primer cálculo; las cifras salen de calc).
const r = '[76]'; // prima implícita de Damodaran (fuente añadida en la v3)
const sint = d.resumen.sintesis.split('\n\n');
if (sint.length !== 8) throw new Error('La síntesis no tiene 8 párrafos');
sint[0] = `**La recomendación y por qué.** Mantener, con convicción baja y horizonte de 12 meses. Las dos reglas discrepan. Con nuestro WACC del 10,01 %, el valor objetivo es de 27,68 CHF (33,33 USD), un 4,5 % sobre el precio de 26,48 CHF (31,88 USD), sin dividendo: la regla absoluta da Mantener. Con la prima implícita del mercado (4,20 % ${r}), el WACC baja al 7,91 % y el objetivo sube a 36,62 CHF (44,09 USD), con una rentabilidad total esperada del 38,3 % y una asimetría de 10,98 veces: la relativa da Comprar. Pero un Comprar que solo da la relativa exige al menos un 5 % con nuestro coste de capital, y el 4,5 % no llega: la regla combinada da Mantener. On gana al mercado, pero apenas cubre su coste de capital; si el mercado entero se abarata, cae con él, y más que él. La convicción es baja porque la distancia con el precio es de tasa, no de cifras, y porque la calidad solo sostiene en parte el crecimiento que proyectamos.`;
sint[1] = `**El negocio.** On vende a precio completo: margen bruto del 64,8 % en el 1S26, frente al 42,9 % de Nike [6, 39]. El foso es solo la marca [1]. El ROIC del 38,4 % casi cuadruplica el WACC. Su calidad sostiene en parte el crecimiento que proyectamos: hasta 2029 sí, por el poder de precios demostrado y un plan con guía [21]; después, el caso base pide que las ventas pasen del 2,1 % al 4,0 % del calzado deportivo mundial [41] y que el capital nuevo rinda un 58,4 %, más que el 48,6 % histórico, con un foso estrecho que todavía no ha pasado por un ciclo.`;
sint[5] = `**Valoración.** El DCF (50 %) da 30,07 CHF; los escenarios (30 %), 29,51 CHF, y los comparables (20 %), 18,98 CHF. El DCF inverso descuenta un crecimiento del 8,1 % anual en 2027-2035 (10,7 % en el caso base). No discrepamos del consenso: nuestras ventas quedan un 1,6-3,7 % por debajo hasta 2028 [69] y su objetivo medio (36,11 CHF [70]) es casi el nuestro con la prima del mercado. El caso base pide más de lo que la prueba de sostenibilidad da por seguro y no lo recortamos, porque el precio ya descuenta casi exactamente ese límite: con la cuota de 2035 en 1,5 veces la de hoy (3,2 %, un 7,8 % anual en 2027-2035), el objetivo sería de 24,57 CHF (−7,2 %) con nuestro WACC y de 31,95 CHF (+20,7 %) con la prima del mercado, y la recomendación seguiría en Mantener. Por lo mismo, sin etapa de transición. Con un terminal del 1,0 % en vez del 2,0 %, el objetivo relativo sería de 33,43 CHF (+26,2 %): tampoco cambia.`;
sint[6] = `**Riesgos y catalizadores.** La marca: el bajista, una pérdida de atractivo como la de Lululemon, vale 18,18 CHF (−31,3 %) [39]. Y el precio del riesgo: por la beta, cada décima de prima son 0,17 puntos de coste de capital; con una prima implícita por encima del 5,0 % (WACC del 9,2 %), también la regla relativa daría Mantener. Catalizadores: el 3T26 a mediados de noviembre, la guía de 2027 en marzo y la recompra de hasta 1.000 M USD [21].`;
sint[7] = `**Qué cambiaría la decisión.** Con la regla combinada, compraríamos por debajo de 26,35 CHF (31,73 USD), un 0,5 % bajo el precio, y venderíamos por encima de 40,69 CHF (48,99 USD); entre ambos, Mantener. Pasaríamos a Vender si la venta directa del 3T26 crece menos del 20 % a divisa constante. Subiríamos el caso base y la convicción si la guía de 2027 apunta a un crecimiento «high-teens» a divisa constante con un margen bruto del 65 % o más: sería la primera prueba de que la marca sostiene el crecimiento fuera del ciclo favorable, y podría llevar la rentabilidad con nuestro WACC por encima del 5 % que exige el Comprar.`;

const tesis = d.resumen.tesis.split('\n\n');
if (tesis.length !== 3) throw new Error('La tesis no tiene 3 párrafos');
tesis[2] = `El mercado acierta en la dirección y exagera la cuantía, pero la conclusión depende de la tasa. Con nuestro WACC del 10,01 %, el valor objetivo es de 27,68 CHF (+4,5 %) y la regla absoluta da Mantener; con la prima implícita del mercado (4,20 % ${r}), de 36,62 CHF (+38,3 %), y la relativa da Comprar. Como un Comprar solo relativo exige al menos un 5 % con nuestro coste de capital, la recomendación es Mantener. Para comprar hay que creer que el recorte de los mayoristas es temporal y que la marca sostiene el crecimiento después de 2029, cuando nuestro caso base casi duplica su cuota del calzado deportivo, y aceptar que la prima que hoy pide el mercado no vuelve al 5 %. En dólares (0,8305 CHF por USD [45]): objetivo de 33,33 USD (44,09 USD con la prima del mercado), compra por debajo de 31,73 USD y venta por encima de 48,99 USD.`;

const T = {
  'resumen.recomendacion': 'Mantener',
  'resumen.conviccion': 'Baja',
  'resumen.justificacion_recomendacion': null,
  'resumen.sintesis': sint.join('\n\n'),
  'resumen.tesis': tesis.join('\n\n'),
  'resumen.cambiaria_recomendacion': [
    'Si el precio baja de 26,35 CHF (31,73 USD) sin que empeoren las previsiones, pasaríamos a Comprar; por encima de 40,69 CHF (48,99 USD), a Vender.',
    `Si la prima implícita del mercado de Damodaran sube por encima del 5,0 % (WACC relativo del 9,2 %), también la regla relativa daría Mantener ${r}: se perdería el único argumento a favor de comprar.`,
    'Si la venta directa del 3T26 crece menos del 20 % a divisa constante, llevaríamos el caso base hacia el bajista (18,18 CHF) y pasaríamos a Vender.',
    'Si la guía de 2027 apunta a un crecimiento «high-teens» a divisa constante con margen bruto ≥ 65 %, subiríamos el caso base y la convicción a media; si eso lleva la rentabilidad con nuestro WACC por encima del 5 %, a Comprar.',
    'Si el margen bruto de 2026 sin aranceles devueltos queda por debajo del 63 %, revisaríamos a la baja el caso base.',
  ],
};
for (const [ruta, valor] of Object.entries(T)) {
  const partes = ruta.split('.');
  let o = d;
  for (const p of partes.slice(0, -1)) o = o[p];
  if (o === undefined || !(partes.at(-1) in o)) throw new Error(`Ruta inexistente: ${ruta}`);
  o[partes.at(-1)] = valor;
}

writeFileSync(join(dir, 'datos-v4.json'), JSON.stringify(d, null, 2));
console.log(`datos-v4.json escrito (${Object.keys(T).length} textos).`);
