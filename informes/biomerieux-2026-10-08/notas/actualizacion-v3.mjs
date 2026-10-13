// actualizacion-v3.mjs — bioMérieux v3: caso base al crecimiento financiable (lectura prudente de la sostenibilidad,
// decisión del usuario del 13-oct-2026). Parte de datos-v2.json, borra calc y limita la mejora del margen EBITDA a la
// que la guía demuestra (2026-2028); sin investigación nueva. Escribe datos-v3.json; después:
//   node motor/calcular-empresa.mjs --datos informes/biomerieux-2026-10-08/datos-v3.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos-v2.json'), 'utf8'));
delete d.calc;

// 1. Supuesto cambiado: margen EBITDA. En v2 subía del 24,4 % de 2028e al 25,5 % de 2033e sin guía que lo respalde, y
// el capital nuevo rendía un 22,7 % frente al 15,1 % incremental. La guía (CEBIT que crece más que las ventas) cubre la
// mejora hasta 2028e; desde ahí el margen se queda en el 24,4 %, por encima del máximo de 2019-2025 fuera de la COVID
// (24,1 %). El crecimiento no se toca: 3,9 % medio frente a un financiable del 2,6 % más 1,4 puntos de precio del puente.
const MARGEN = { '2029e': 24.4, '2030e': 24.4, '2031e': 24.4, '2032e': 24.4, '2033e': 24.4 };
for (const a of d.dcf.anios) if (a.periodo in MARGEN) a.margen_ebitda_pct = MARGEN[a.periodo];

// 2. El control del capital nuevo ya pasa: fuera su explicación.
d.meta.controles_explicados = d.meta.controles_explicados.filter((c) => !c.control.startsWith('Rendimiento del capital nuevo'));

// 3. Textos reescritos con las cifras de calc (v3).
const T = {
  'resumen.sintesis': [
    '**La recomendación y por qué.** Mantener, con convicción baja. El valor objetivo, 77,57 EUR, queda un 3,9 % bajo el precio de 80,75 EUR (rentabilidad total del −2,7 %) y la asimetría es mala: +4,9 % en el alcista y −28,2 % en el bajista (0,17 veces). Con nuestro WACC del 8,57 % la regla absoluta da Vender; con la prima que pide el mercado (4,2 %), el valor es de 89,41 EUR (rentabilidad del 11,9 %, asimetría de 1,93) y la relativa, que manda, da Mantener. La señal no cambia frente a la v2; el valor baja de 80,93 EUR porque el margen del base ya no sube más allá de la guía. La convicción es baja porque las reglas discrepan; subiría con un tercer trimestre por encima del +5 % orgánico y bajaría con otra rebaja de la guía.',
    '**El negocio.** Cuchilla y hoja de afeitar: el 83,4 % de las ventas son reactivos [1] que consumen unas 28.550 unidades de BIOFIRE y más de 7.200 de SPOTFIRE [1, 3]. Tiene en torno al 70 % de la PCR sindrómica y el 40 % de la microbiología clínica [1]. Su ROIC (12,7 %) supera al WACC en solo 4 puntos y su margen EBITDA (23,9 %) queda 9-12 puntos bajo DiaSorin y Qiagen [58, 59]. La calidad sostiene el crecimiento proyectado solo en parte, y por eso rebajamos el base: el margen sube al 24,4 % en 2028, como dice la guía, y no al 25,5 % en 2033; el capital nuevo rinde así un 18,1 % (antes, 22,7 %) frente al 15,1 % incremental. La reinversión financia un 2,6 % anual (3,5 % sin fondo de comercio); el resto del 3,9 % proyectado es el 1,4 % de precio, que no pide capital.',
    '**Sector y ciclo.** Los paneles respiratorios cayeron un 17 % en el primer semestre por una gripe débil, mientras el resto crecía un 6 % [3]. La empresa rebajó en abril la guía de 2026 a +3/+5 % y en julio la de 2027-2028, del 7 % anual a +3/+6 % [3, 38].',
    '**Finanzas.** Caja neta de 236 M [2]. El flujo libre (5,9 % de la capitalización) está inflado por la reforma fiscal de EE. UU.: el impuesto pagado bajó de 123 M a 28 M en el semestre [3].',
    '**Equipo y gobierno.** Restan. Institut Mérieux tiene el 59,9 % del capital y el 72,4 % del voto, solo 3 de 8 consejeros son independientes y el capital libre votó en mayoría contra la remuneración del consejero delegado en tres juntas (49-67 %) [1, 23, 24, 25]. La familia compró un 1 % más en 2026 [27, 28].',
    '**Valoración.** DCF de 73,87 EUR, escenarios ponderados de 72,60 EUR y comparables de diagnóstico puro de 90,19 EUR. El precio descuenta un margen final del 25,8 % o un crecimiento del 7,9 % anual en 2027-2033 (nosotros, 24,4 % y 4,4 %): la mejora de margen que hemos quitado, por encima del 24,1 % que no ha superado fuera de la COVID [4]. Cotiza a 8,9x el EBITDA a 12 meses, frente a 9,7x de los comparables y bajo su mínimo de siete años; el objetivo medio de los analistas es 79,54 EUR [47].',
    '**Riesgos y catalizadores.** Otra temporada respiratoria floja (−28 % en el bajista), la competencia de QIAstat-Dx y Cepheid (−13 % con dos puntos menos de margen) y que el criterio de MolDX llegue al hospital (−9 %). Catalizadores: ventas del tercer trimestre el 30 de octubre, la gripe y los resultados de 2026 en febrero.',
    '**Qué cambiaría la decisión.** La regla compra por debajo de 74,78 EUR y vende por encima de 92,39 EUR: el precio está un 8,0 % sobre el umbral de compra. Con un tercer trimestre por debajo del +5 % orgánico o un margen CEBIT de 2026 bajo el 16 %, rebajaríamos otra vez el caso base.',
  ].join('\n\n'),

  'TESIS2': 'A 80,75 EUR, el precio descuenta un margen EBITDA final del 25,8 % con nuestro crecimiento, por encima del 24,1 % que la empresa no ha superado fuera de la COVID, o un crecimiento del 7,9 % anual en 2027-2033 con nuestro margen, por encima del nuevo rango de la empresa (+3/+6 %) [3, 4]. La acción cotiza a 8,9 veces el EBITDA de los próximos 12 meses, por debajo de los comparables de diagnóstico puro (9,7x) y del mínimo de sus siete últimos años (13,4x a los últimos 12 meses). Nuestro DCF da 73,87 EUR y el valor objetivo 77,57 EUR: con nuestro coste de capital, el precio es algo exigente.',
  'TESIS3': 'El mercado acierta en lo esencial: la empresa ha recortado dos veces su guía en 2026, los paneles respiratorios dependen de la gripe y China y Medicare presionan el precio [1, 3, 82]. Para invertir hay que creer que el margen sigue subiendo después de 2028 con SPOTFIRE y los paneles no respiratorios, o aceptar la prima de riesgo que hoy pide el mercado, con la que el valor sube a 89,41 EUR; aun así, la rentabilidad total (11,9 %) no llega al 15 % que la regla exige para comprar: Mantener.',

  'resumen.vision_diferencial.mercado_descuenta': 'Un margen EBITDA final del 25,8 % con un crecimiento del 4,4 % anual, o un crecimiento del 7,9 % en 2027-2033 con un margen del 24,4 %: que la mejora del margen siga después de 2028. El consenso pide un 1-2,5 % más de ventas y un 2-5 % más de EBITDA que nosotros en 2026-2028 [46], y su precio objetivo medio (79,54 EUR) está casi en el precio [47].',
  'resumen.vision_diferencial.nuestra_vision': 'Proyectamos un 4,4 % anual en 2027-2033 y un margen EBITDA que sube al 24,4 % en 2028, como respalda la guía, y se queda ahí: más allá, el capital nuevo tendría que rendir más de 1,25 veces lo que rindió en 2022-2025. A 80,75 EUR la acción rinde un 8,1 % anual con nuestras cifras, por debajo de nuestro WACC del 8,57 % y por encima del 7,5 % que hoy pide el mercado a una acción con su beta.',

  'resumen.en_contra.5': '**Valor por debajo del precio**: con nuestro WACC del 8,57 % la rentabilidad total esperada es del −2,7 % y la regla absoluta da Vender; solo con la prima del mercado (11,9 %) se sostiene el Mantener.',
  'resumen.que_vigilar': 'La tesis depende de que el segundo semestre de 2026 crezca en torno al +6 % orgánico que exige el bajo de la guía, con los paneles no respiratorios de BIOFIRE por encima del +5 % y una temporada respiratoria normal. La señal de que no se cumple sería un tercer trimestre (30 de octubre) por debajo del +5 % orgánico o una nueva rebaja de la guía de 2026; con ella, el caso bajista (57,97 EUR) pasaría a ser el central.',
  'resumen.cambiaria_recomendacion.0': 'Si el precio baja de 74,78 EUR sin cambios en las cifras, pasaríamos a Comprar: con nuestro coste de capital, la rentabilidad total llegaría al 5 %.',
  'resumen.cambiaria_recomendacion.1': 'Si las ventas del tercer trimestre de 2026 crecen menos del +5 % orgánico o la empresa rebaja otra vez la guía, rebajaríamos el caso base; si se acerca al bajista (57,97 EUR), pasaríamos a Vender.',
  'resumen.cambiaria_recomendacion.4': 'Si el precio supera 92,39 EUR, pasaríamos a Vender.',

  'dcf.justificacion.margenes': 'El margen EBITDA antes de no recurrentes fue del 23,9 % en 2025, del 21,6-24,1 % fuera de la COVID y del 22,4 % en el primer semestre de 2026 [2, 4]. Para 2026 suponemos un 23,3 %: el CEBIT crece en el bajo de la guía (0/+10 % orgánico) y la divisa resta 40-50 M [3]. Desde ahí sube 0,5-0,6 puntos al año hasta el 24,4 % de 2028, porque la empresa espera que el CEBIT crezca más que las ventas [3], y se queda ahí hasta 2033: por encima del máximo fuera de la COVID y por debajo de DiaSorin (33,0 %) y de Qiagen (35,7 %) [58, 59]. En la v2 seguía subiendo hasta el 25,5 %; lo quitamos porque, sin guía que lo respalde, el capital nuevo tenía que rendir un 22,7 %, frente al 15,1 % incremental de 2022-2025. Estamos un 2,4 %, un 3,9 % y un 5,0 % por debajo del EBITDA del consenso de 2026-2028 [46]: el consenso no ha recogido del todo el margen del semestre.',
  'dcf.justificacion.terminal': 'Crecimiento a perpetuidad del 2,5 %: inflación del euro cercana al 2 % y medio punto real, por debajo de la tasa libre menos medio punto (3,05 %). El valor terminal equivale a 7,8 veces el EBITDA, por debajo de la mediana de los comparables (9,7x) y de la media histórica de la propia empresa (14,1x): es un supuesto prudente.',
  'dcf.lectura': 'El DCF da 73,87 EUR por acción, un 8,5 % por debajo del precio, con el 69 % del valor en el terminal. El DCF inverso dice que el precio descuenta un crecimiento del 7,9 % anual en 2027-2033 (nosotros, 4,4 %) o un margen EBITDA final del 25,8 % (nosotros, 24,4 %); dicho de otro modo, a 80,75 EUR la acción rinde un 8,1 % anual con nuestras cifras, por debajo del WACC del 8,57 % y por encima del 7,5 % que hoy pide el mercado a una acción con su beta. El crecimiento implícito es exigente: supera el nuevo rango de +3/+6 % [3] con un primer semestre de 2026 plano. La lectura más probable es la del margen: el precio supone que sigue subiendo después de 2028 hasta el 25,8 %, por encima del 24,1 % que la empresa no ha superado fuera de la COVID [2, 4], y esa es la mejora que hemos quitado del caso base porque la reinversión no la financia. Cada punto de margen vale unos 4,9 EUR por acción y cada medio punto de WACC, entre 5,6 y 6,6 EUR.',
  'dcf.sostenibilidad.justificacion': 'En parte. El foso es real: el 83 % de las ventas en reactivos, ≈ 70 % de la PCR sindrómica y ≈ 40 % de la microbiología clínica [1]. El poder de precios es corto: margen bruto +90 pb orgánicos en 2025 y efecto precio en microbiología en el 2T26, pero China recorta precios [1, 3]. Creció un 7,3 % anual en 2019-2025 y la guía bajó al +3/+6 % [3]. Con el margen limitado a la guía, el base cabe: la reinversión financia un 2,6 % anual (3,5 % sin fondo de comercio), el precio aporta un 1,4 % sin capital y el capital nuevo rinde un 18,1 % (incremental: 15,1 %). La cuota no es comprobable.',

  'escenarios.casos.0.narrativa': 'Dos temporadas respiratorias flojas seguidas, las compras centralizadas de China llegan a la microbiología y Medicare restringe más los paneles sindrómicos: el crecimiento cae al 2,4 % anual y el margen se queda en el 22,9 %. Ya pasó en 2022-2023, con ventas planas y el margen CEBIT en el 16,6 % [4].',
  'escenarios.casos.1.narrativa': 'Ventas en el centro de la nueva guía (+4,5 % en 2027-2028) y margen EBITDA que sube del 23,3 % al 24,4 % en 2028, como respalda la guía, y se queda ahí, con más reactivos de SPOTFIRE y la planta de La Balme en marcha.',
  'escenarios.casos.2.narrativa': 'La FDA aprueba el panel de vaginitis de SPOTFIRE con exención CLIA, SPINCHIP arranca en Europa y la gripe se normaliza: el crecimiento vuelve al 6 % de 2023-2025 y el margen llega al 25,4 %, aún por debajo de Qiagen y DiaSorin.',
  'escenarios.comentario': 'Con nuestro WACC, la asimetría es mala: el alcista gana un 4,9 % y el bajista pierde un 28,2 %, 0,17 veces. Con la prima que hoy pide el mercado (4,2 %, WACC del 7,49 %), el mismo análisis da 104,22 EUR en el alcista y 68,62 EUR en el bajista, y la asimetría pasa a 1,93 veces. La diferencia no está en las cifras del negocio, sino en la tasa de descuento: ni siquiera con el coste de capital que hoy usa el mercado la acción llega a ser una compra. El bajista es verosímil, porque repite 2022-2023, y la acción ya ha caído un 47 % desde agosto de 2025 [39].',
  'valoracion.comentario': 'El DCF pesa un 45 % y los escenarios un 30 %, porque el valor depende de cuánto crezcan los reactivos de una base instalada que conocemos bien. Los comparables pesan un 25 %, solo con los cinco de diagnóstico puro (90,19 EUR de media entre EV/EBITDA y PER): la muestra es pequeña y la mediana cambia mucho si entran las grandes de herramientas. Las transacciones pesan cero, porque el control familiar hace improbable una OPA. Los métodos van de 73 a 90 EUR y el precio objetivo medio de los analistas (79,54 EUR [47]) queda entre ellos: el valor objetivo de 77,57 EUR está un 3,9 % por debajo del precio. La dispersión aparece con la tasa de descuento: con la prima implícita del mercado, el DCF sube a 89,84 EUR y el valor objetivo a 89,41 EUR.',

  'riesgos.items.0.efecto_valor': '−5 % por cada 2 puntos menos de crecimiento anual; −28 % en el bajista',
  'riesgos.items.2.efecto_valor': '−13 % (dos puntos menos de margen)',
  'riesgos.items.3.efecto_valor': '−7 % (un punto menos de margen)',
};
const tesis = d.resumen.tesis.split('\n\n');
if (tesis.length !== 3) throw new Error('La tesis no tiene tres párrafos');
tesis[1] = T.TESIS2; tesis[2] = T.TESIS3;
d.resumen.tesis = tesis.join('\n\n');
delete T.TESIS2; delete T.TESIS3;
for (const [ruta, valor] of Object.entries(T)) {
  const partes = ruta.split('.');
  let o = d;
  for (const p of partes.slice(0, -1)) o = o[p];
  if (o === undefined || !(partes.at(-1) in o)) throw new Error(`Ruta inexistente: ${ruta}`);
  o[partes.at(-1)] = valor;
}

writeFileSync(join(dir, 'datos-v3.json'), JSON.stringify(d, null, 2));
console.log(`datos-v3.json escrito (${Object.keys(T).length + 1} textos).`);
