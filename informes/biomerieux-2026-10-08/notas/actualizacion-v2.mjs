// actualizacion-v2.mjs — bioMérieux v2: sostenibilidad del crecimiento (metodología del 10-oct-2026).
// No rehace la investigación: parte de datos.json, borra calc y añade `dcf.sostenibilidad` con lo que ya
// estaba en el informe (guía de julio de 2026, efecto precio del 2T26, divisa del 1S26, base instalada).
// Escribe datos-v2.json; después:
//   node motor/calcular-empresa.mjs --datos informes/biomerieux-2026-10-08/datos-v2.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos.json'), 'utf8'));
delete d.calc;

// 1. Sostenibilidad del crecimiento.
d.dcf.sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 2, precio_pct: 1, otros_pct: -2.5,
      comentario: 'Guía de +3/+5 % orgánico con un primer semestre del +0,2 % (paneles respiratorios −17 %): tomamos el bajo, +3 %, con un punto de precio en microbiología e industria, donde la empresa citó efecto precio positivo en el 2T26. La divisa resta unos 2,5 puntos (−87 M en el semestre) [3]. Reparto entre volumen y precio: estimación propia.' },
    { periodo: '2027e', volumen_pct: 3, precio_pct: 1.5, otros_pct: 0,
      comentario: 'Centro de la nueva guía de +3/+6 % orgánico [3]: volumen de reactivos sobre una base de unas 28.550 unidades de BIOFIRE y más de 7.200 de SPOTFIRE [1, 3]; precio de 1,5 puntos (estimación propia): en 2025 el margen bruto subió 90 pb orgánicos pese a los aranceles y en el 2T26 hubo efecto precio positivo en microbiología e industria [1, 3]; en 2024 la microbiología creció un 8,3 % por volumen y precio [8].' },
    { periodo: '2028e', volumen_pct: 3, precio_pct: 1.5, otros_pct: 0,
      comentario: 'Igual que 2027e, centro de la guía [3]. El consenso pide un 1-2,5 % más de ventas [46].' },
    { periodo: '2029e', volumen_pct: 3.5, precio_pct: 1.5, otros_pct: 0,
      comentario: 'SPOTFIRE y los paneles no respiratorios (+10 % orgánico en 2025) suben el volumen medio punto [1, 4]; sin compras.' },
    { periodo: '2030e', volumen_pct: 3.5, precio_pct: 1.5, otros_pct: 0,
      comentario: 'Como 2029e: microbiología al ritmo histórico del mercado (5-6 %) [1].' },
  ],
  // La cuota del informe (≈ 70 %) es la de BIOFIRE en PCR sindrómica multiplex, un segmento sin tamaño publicado;
  // el mercado con tamaño (DIV clínico, 72.000 M EUR) no tiene cuota en competencia: no hay perímetro comparable.
  mercado_final: null,
  veredicto: 'En parte',
  justificacion: 'En parte. El foso es real: el 83 % de las ventas en reactivos, ≈ 70 % de la PCR sindrómica y ≈ 40 % de la microbiología clínica [1]. El poder de precios es corto: margen bruto +90 pb orgánicos en 2025 y efecto precio en microbiología en el 2T26, pero China recorta precios [1, 3]. Creció un 7,3 % anual en 2019-2025 y la guía bajó al +3/+6 % [3]. La reinversión no llega: el 20 % del NOPAT, al ROIC del 12,7 %, financia un 2,5 % anual (3,5 % sin fondo de comercio ni intangibles) frente al 3,9 % proyectado. La cuota no se puede probar: el 70 % es de un segmento sin tamaño publicado.',
};

// 2. Control nuevo explicado (el motor lo marca; el caso base no se rebaja, ver la síntesis).
d.meta.controles_explicados.push({
  control: 'Rendimiento del capital nuevo de la proyección ≤ 1,25 × el histórico',
  explicacion: 'El ROIC histórico (12,7 %) y el incremental (15,1 %) llevan en el denominador 1.129 M de fondo de comercio (728 M) e intangibles, sobre todo de compras (BioFire, Specific Diagnostics, Hybiome); sin ellos, el ROIC de 2025 es del 17,5 % (cálculo propio). El crecimiento proyectado es orgánico, sobre la base instalada, y está en el centro de la guía de +3/+6 % y por debajo del consenso [3, 46]. Con medio punto menos de crecimiento cada año, el valor objetivo bajaría de 80,93 a 80,09 EUR y la recomendación no cambia: no se rebaja el base y el veredicto queda en «En parte».',
});

// 3. Textos reescritos con las cifras de calc.
const T = {
  'resumen.recomendacion': 'Mantener',

  'resumen.sintesis': [
    '**La recomendación y por qué.** Mantener, con convicción baja. El valor objetivo, 80,93 EUR, es casi el precio de 80,75 EUR (rentabilidad total esperada del 1,4 %): con nuestro WACC del 8,57 %, la regla absoluta da Mantener. Con la prima de riesgo que hoy pide el mercado (4,2 %), el valor objetivo sube a 93,63 EUR (rentabilidad total del 17,2 %, asimetría de 3,86 veces) y la relativa da Comprar, pero un Comprar solo relativo exige al menos un 5 % con nuestro coste de capital. Pasamos de Comprar a Mantener por esa regla, no por cifras nuevas. La convicción es baja porque las reglas discrepan y nuestro crecimiento pide algo más de lo que financia la reinversión; subiría con un tercer trimestre por encima del +5 % orgánico y bajaría con otra rebaja de la guía.',
    '**El negocio.** Cuchilla y hoja de afeitar: el 83,4 % de las ventas son reactivos [1] que consumen unas 28.550 unidades de BIOFIRE y más de 7.200 de SPOTFIRE [1, 3]. Tiene en torno al 70 % de la PCR sindrómica y el 40 % de la microbiología clínica [1]. Su ROIC (12,7 %) supera al WACC en solo 4 puntos y su margen EBITDA (23,9 %) queda 9-12 puntos por debajo de DiaSorin y Qiagen [58, 59]. La calidad sostiene el crecimiento proyectado solo en parte: el foso basta para la guía de +3/+6 %, pero reinvertimos el 20 % del NOPAT, que al ROIC actual financia un 2,5 % anual (un 3,5 % sin fondo de comercio ni intangibles) frente al 3,9 % proyectado. No rebajamos el base porque ya está en el centro de la guía y por debajo del consenso: con medio punto menos al año, el valor objetivo bajaría a 80,09 EUR, con la misma recomendación.',
    '**Sector y ciclo.** Los paneles respiratorios cayeron un 17 % en el primer semestre por una gripe débil, mientras el resto crecía un 6 % [3]. La empresa rebajó en abril la guía de 2026 a +3/+5 % y en julio la de 2027-2028, del 7 % anual a +3/+6 % [3, 38].',
    '**Finanzas.** Caja neta de 236 M [2]. El flujo libre (5,9 % de la capitalización) está inflado por la reforma fiscal de EE. UU.: el impuesto pagado bajó de 123 M a 28 M en el semestre [3].',
    '**Equipo y gobierno.** Restan. Institut Mérieux tiene el 59,9 % del capital y el 72,4 % del voto, solo 3 de 8 consejeros son independientes y el capital libre votó en mayoría contra la remuneración del consejero delegado en tres juntas (49-67 %) [1, 23, 24, 25]. La familia compró un 1 % más en 2026 [27, 28].',
    '**Valoración.** DCF de 78,38 EUR, escenarios ponderados de 77,03 EUR y comparables de diagnóstico puro de 90,19 EUR. El precio descuenta un crecimiento del 5,5 % anual en 2027-2033 o un margen final del 26,0 %, frente a nuestro 4,4 % y 25,5 %: poco exigente frente a 2023-2025, exigente frente al primer semestre de 2026. Cotiza a 8,9 veces el EBITDA de los próximos 12 meses, frente a 9,7x de los comparables y bajo su mínimo de siete años; el objetivo medio de los analistas es 79,54 EUR [47].',
    '**Riesgos y catalizadores.** Otra temporada respiratoria floja (−24 % en el bajista), la competencia de QIAstat-Dx y Cepheid (−12 % con dos puntos menos de margen) y que el criterio de MolDX llegue al hospital (−9 %). Catalizadores: ventas del tercer trimestre el 30 de octubre, la gripe y los resultados de 2026 en febrero.',
    '**Qué cambiaría la decisión.** La regla compra por debajo de 77,94 EUR y vende por encima de 98,17 EUR: el precio está un 3,6 % por encima del umbral de compra. Con un tercer trimestre por debajo del +5 % orgánico o un margen CEBIT de 2026 bajo el 16 %, rebajaríamos el caso base.',
  ].join('\n\n'),

  'TESIS3': 'El mercado acierta en lo esencial: la empresa ha recortado dos veces su guía en 2026, los paneles respiratorios dependen de la gripe y China y Medicare presionan el precio [1, 3, 82]. Para invertir hay que creer que el crecimiento vuelve al 5 % con SPOTFIRE y los paneles no respiratorios, o aceptar la prima de riesgo que hoy pide el mercado, con la que el valor sube a 93,63 EUR. Eso sería un Comprar solo por coste de oportunidad, y con nuestro coste de capital la rentabilidad total (1,4 %) no llega al 5 % que la regla exige: Mantener.',

  'resumen.en_contra.5': '**Solo compra relativa**: con nuestro WACC del 8,57 % la rentabilidad total esperada es del 1,4 %, por debajo del 5 % que la regla exige para comprar.',

  'resumen.cambiaria_recomendacion.0': 'Si el precio baja de 77,94 EUR sin cambios en las cifras, pasaríamos a Comprar: con nuestro coste de capital, la rentabilidad total llegaría al 5 %.',
  'resumen.cambiaria_recomendacion.1': 'Si las ventas del tercer trimestre de 2026 crecen menos del +5 % orgánico o la empresa rebaja otra vez la guía, rebajaríamos el caso base; si se acerca al bajista (61,51 EUR), pasaríamos a Vender.',
  'resumen.cambiaria_recomendacion.2': 'Si el margen CEBIT de 2026 queda por debajo del 16 % (17,9 % en 2025), rebajaríamos el margen del caso base.',
};
const tesis = d.resumen.tesis.split('\n\n');
if (tesis.length !== 3) throw new Error('La tesis no tiene tres párrafos');
tesis[2] = T.TESIS3;
d.resumen.tesis = tesis.join('\n\n');
delete T.TESIS3;
for (const [ruta, valor] of Object.entries(T)) {
  const partes = ruta.split('.');
  let o = d;
  for (const p of partes.slice(0, -1)) o = o[p];
  if (o === undefined || !(partes.at(-1) in o)) throw new Error(`Ruta inexistente: ${ruta}`);
  o[partes.at(-1)] = valor;
}

writeFileSync(join(dir, 'datos-v2.json'), JSON.stringify(d, null, 2));
console.log(`datos-v2.json escrito (${Object.keys(T).length} textos).`);
