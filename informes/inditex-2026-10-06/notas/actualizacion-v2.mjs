// actualizacion-v2.mjs — Inditex v2: regla relativa (prima implícita de Damodaran, oct-2026) y decisión sobre
// el DCF en tres etapas (no se usa: se decidió por el negocio antes de calcular). No rehace la investigación:
// parte de datos.json, borra calc, añade la fuente y la referencia de mercado, y reescribe los textos que citan
// la recomendación, el objetivo o los niveles. Escribe datos-v2.json; después:
//   node motor/calcular-empresa.mjs --datos informes/inditex-2026-10-06/datos-v2.json
// No toca «Inditex - 2026-10-06.docx» (modificado por el usuario).
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

// 3. DCF en tres etapas: no se usa. Negocio maduro en un mercado que crece un 3-4 % nominal; los diez años
//    explícitos ya recogen la convergencia (del 7 % al 3 %).
d.dcf.etapa2 = {
  usar: false, anios: 10, margen_final_pct: null,
  justificacion: 'No se usa. El ROIC (42,4 %) supera de sobra al WACC (8,51 %), pero falta el recorrido: Inditex ya vende en todo el mundo, con ≈ 2,4 % de un mercado fragmentado y maduro que crece un 3-4 % nominal [2, 50]. Su crecimiento depende de la superficie, guiada al +5 % y lograda absorbiendo tiendas pequeñas, y el online se ha estancado en torno al 27 % de las ventas [2]. Los diez años explícitos ya bajan del 7 % al 3 %. Nada en el informe demuestra que siga ganando cuota más allá de FY2035. Con una etapa de diez años, el DCF subiría de 42,80 a 43,86 EUR (+2,5 %): no cambiaría la conclusión.',
};

// 4. Textos reescritos con las cifras de calc.
const T = {
  'resumen.recomendacion': 'Vender',
  'resumen.conviccion': 'Baja',
  'resumen.justificacion_recomendacion': null,

  'resumen.sintesis': [
    `**La recomendación y por qué.** Vender, con convicción baja. Nuestro valor objetivo es 44,48 EUR, un 17,4 % por debajo del precio de 53,82 EUR; con el dividendo ordinario (2,2 %), la rentabilidad total esperada a 12 meses es del −15,1 %, y el alcista gana un 9,4 % frente al −48,1 % del bajista (0,20 veces). Las dos reglas coinciden: con la prima implícita del mercado (4,20 % ${r}) el WACC apenas cambia (8,48 % frente a 8,51 %), porque nuestra prima ya era la madura de Damodaran (4,23 %) y la beta es 1; el objetivo queda en 44,65 EUR (−14,8 % de rentabilidad total). No es un Vender solo absoluto: Inditex está cara frente a su coste de capital y frente a lo que hoy pide el mercado. La convicción es baja porque discrepamos en la tasa y en lo que dura el crecimiento, no en la operativa, y no vemos un catalizador propio con fecha.`,
    '**El negocio.** El diseño cercano y la reposición dentro de la temporada permiten vender a precio completo: margen bruto del 58,3 % en FY2025 y margen EBITDA del 28,3 %, frente a una mediana del 17,6 % en sus comparables [1]. El ROIC del 42,4 % quintuplica el WACC. El foso es estrecho: no protege de un error de colección como el que hundió el margen de H&M [71].',
    '**Sector y ciclo.** En Europa, el 67 % de sus ventas, el gasto en vestido cae en volumen desde 2023 y la confianza del consumidor está en −15,8 [4, 53, 55]. Inditex gana cuota, así que su crecimiento depende de la superficie, guiada al +5 %, más que del mercado [2].',
    '**Finanzas.** Entre FY2019 y FY2025 las ventas crecieron un 5,9 % anual y el BPA un 9,3 %; en euros el crecimiento bajó al 3,2 % en FY2025 por la divisa y repuntó al 7,6 % en el 1S26 [2, 4]. El flujo libre acumulado fue el 90 % del beneficio y la caja neta sin arrendamientos suma 10.398 M [5].',
    `**Valoración.** El DCF da 42,80 EUR con un WACC del 8,51 % y una proyección a menos del 1,4 % del consenso hasta FY2028e [116, 132]; con la prima del mercado, 43,01 EUR. El DCF inverso pide un crecimiento del 8,2 % anual hasta FY2035e, frente al 5,0 % de nuestra base y el 5,9 % histórico, o aceptar una rentabilidad del 7,3 %, por debajo tanto de nuestro WACC como del 8,5 % que pide el mercado a una acción de beta 1. Frente a sus pares no está cara: 12,8x EBITDA NTM frente a 12,2x (50,77 EUR). No usamos la etapa de transición: es un negocio maduro en un mercado que crece un 3-4 %, y diez años explícitos ya recogen su ventaja; con ella, el DCF solo subiría un 2,5 %.`,
    '**Riesgos y catalizadores.** Nuestro riesgo es tener razón tarde: el arranque del 2S (+9 % a tipo constante) es bueno y los resultados del 2-dic-2026 pueden sostener el múltiplo [4, 120]. Un punto más de WACC resta un 14 % al DCF; un punto menos de crecimiento anual, un 7 %. La guía de superficie de marzo de 2027 es la siguiente prueba [20].',
    '**Qué cambiaría la decisión.** Con la regla combinada, compraríamos por debajo de 39,85 EUR y venderíamos por encima de 48,84 EUR; entre ambos, Mantener. No basta con un factor: un Bund por debajo del 3 % (objetivo de 47,50 EUR) o un punto más de crecimiento anual (47,07 EUR) dejan la rentabilidad cerca del −10 %, pero el bajista sigue pesando más del doble que el alcista y la regla mantiene Vender. Pasaríamos a Mantener con las dos cosas a la vez o con el precio por debajo de 48,84 EUR.',
  ].join('\n\n'),

  'resumen.tesis': [
    'Inditex es el mejor operador de la moda cotizada: 39.864 M de ventas en FY2025, un margen EBITDA del 28,3 % (frente a una mediana del 17,6 % en sus comparables), un ROIC del 42,4 % y 10.398 M de caja neta sin arrendamientos [1, 5]. Su modelo de proximidad y reposición dentro de la temporada le permite vender a precio completo: el margen bruto ha subido 240 pb en seis ejercicios y la guía de «margen estable ±50 pb» se ha cumplido o superado cada año desde FY2022 [1, 107].',
    'El precio, 53,82 EUR, descuenta más que eso. Con nuestros márgenes, exige que las ventas crezcan un 8,2 % anual entre FY2027e y FY2035e, frente al 5,9 % de FY2019-FY2025 y al 7,1-7,5 % que el consenso espera solo para los dos próximos ejercicios [116]; dicho de otro modo, implica una rentabilidad del 7,3 % anual, solo 3,8 puntos sobre un Bund en el 3,49 % [132]. Cotiza a 23,4 veces el beneficio de los próximos 12 meses y a 12,8 veces el EBITDA.',
    `El mercado acierta en la calidad y paga por ella lo mismo que por TJX o Ross, pero exige poco a cambio: para invertir hay que creer que Inditex crecerá nueve años como en su mejor etapa reciente, o aceptar una rentabilidad inferior a la del mercado. Nuestro valor objetivo es 44,48 EUR (−17,4 %), y con la prima implícita del mercado (4,20 % ${r}) apenas cambia: 44,65 EUR. Las dos reglas dan Vender. La debilidad de la recomendación es el calendario: el arranque del 2S (+9 % a tipo constante) es bueno y no vemos un catalizador propio que fuerce la convergencia en 12 meses [4].`,
  ].join('\n\n'),

  'resumen.vision_diferencial.por_que': `Los precedentes apoyan la cautela: el crecimiento en euros bajó de +10,4 % a +3,2 % entre FY2023 y FY2025, la divisa restó 3-4 puntos cada año y la acción perdió un 38,9 % en 2021-2022 sin que el negocio fallara, solo por tipos y múltiplos [2, 114]. Hoy la prima de riesgo implícita en el precio (3,8 puntos sobre el Bund) es menor que la que pide el mercado en su conjunto: la prima implícita del S&P 500 es del 4,20 % ${r} y la madura de Damodaran, del 4,23 % [135], para una acción de beta 1.`,

  'resumen.cambiaria_recomendacion': [
    'Si el precio baja de 48,84 EUR, pasaríamos a Mantener; por debajo de 39,85 EUR (rentabilidad total esperada ≥ 15 %), a Comprar.',
    'Si en marzo de 2027 Inditex guía una superficie bruta superior al 5 % y el crecimiento a tipo constante de FY2026 supera el 10 %, subiríamos un punto el crecimiento anual del DCF (46,02 EUR; objetivo de 47,07 EUR): sola, esa mejora no basta para salir de Vender, porque el bajista sigue pesando más del doble que el alcista.',
    'Si además el Bund baja del 3,0 % de forma sostenida (WACC del 8,0 %; objetivo de 47,50 EUR por sí solo), pasaríamos a Mantener.',
    'Si el margen bruto de FY2026 sale por debajo del 57,8 % (fuera del rango ±50 pb), mantendríamos Vender con convicción media.',
  ],

  'dcf.lectura': `El DCF da **42,80 EUR por acción, un 20,5 % por debajo del precio** (rango de 37,94 a 49,57 EUR con WACC y crecimiento terminal ±0,5 puntos), con el valor terminal en el 60 % del valor empresa. Con la prima implícita del mercado (4,20 % ${r}) el WACC pasa al 8,48 % y el DCF a 43,01 EUR: la conclusión no depende de la prima. **El DCF inverso es la clave**: para justificar 53,82 EUR con nuestros márgenes, las ventas tendrían que crecer un 8,2 % anual entre FY2027e y FY2035e, frente al 5,0 % de nuestro caso base, la TCAC del 5,9 % de FY2019-FY2025 y el 7,1-7,5 % que el consenso espera solo para FY2027e-FY2028e. Con nuestro crecimiento, el margen EBITDA tendría que llegar al 33,1 %, casi cinco puntos por encima del máximo histórico (28,3 %). Dicho de otra forma, el precio descuenta una rentabilidad anual del 7,3 %, 3,8 puntos sobre el Bund y por debajo del 8,5 % que hoy pide el mercado a una acción de beta 1. Es exigente.`,

  'dcf.justificacion.wacc': `WACC del 8,51 % en EUR. Tasa libre: Bund a 10 años, 3,49 % el 6-oct-2026 [132, 134], no el bono español, porque el 84 % de las ventas está fuera de España [131, 133]. Beta de 1,0 (Blume frente al EURO STOXX 50, 1,09; distribución europea, 0,94) [114, 118]. Prima de mercado madura de Damodaran, 4,23 %, más una prima país del 1,0 % ponderada por las ventas (estimación propia) [4, 135]. Coste de los fondos propios del 8,72 %; deuda: solo arrendamientos, al 3,6 % y con un peso del 3,6 % [5]. Con la prima implícita del S&P 500 de octubre (4,20 % ${r}), el WACC sería del 8,48 %: casi idéntico.`,

  'valoracion.comentario': `Pesos: DCF 50 %, escenarios 30 % y comparables 20 %. El DCF es el método más fiable para un negocio sin deuda, con márgenes estables y una historia larga de cuentas; los escenarios añaden la asimetría. Los comparables pesan menos porque todo el grupo cotiza a múltiplos altos y la muestra útil es corta (seis). Transacciones a cero: Inditex no es opable. La dispersión tiene una lectura clara: los métodos absolutos (DCF 42,80 y escenarios 43,10 EUR) dicen que el precio es caro; los relativos (comparables 50,77 EUR, regresión 59,53 EUR, analistas 60,39 EUR), que está en precio frente a sus pares. El valor objetivo es de 44,48 EUR; con la prima implícita del mercado (4,20 % ${r}), 44,65 EUR. Puente a 31-jul-2026: caja e inversiones 10.399 M, deuda 1 M, arrendamientos 6.197 M y Tempe (50 %) 431 M [1, 5].`,
};
for (const [ruta, valor] of Object.entries(T)) {
  const partes = ruta.split('.');
  let o = d;
  for (const p of partes.slice(0, -1)) o = o[p];
  if (!(partes.at(-1) in o)) throw new Error(`Ruta inexistente: ${ruta}`);
  o[partes.at(-1)] = valor;
}

writeFileSync(join(dir, 'datos-v2.json'), JSON.stringify(d, null, 2));
console.log(`datos-v2.json escrito (fuente nueva [${idDam}], ${Object.keys(T).length} textos).`);
