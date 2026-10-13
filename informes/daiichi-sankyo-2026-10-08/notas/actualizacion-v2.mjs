// actualizacion-v2.mjs — Daiichi Sankyo v2: prueba de sostenibilidad del crecimiento (metodología del 10-oct-2026).
// No rehace la investigación: parte de datos.json, borra calc y añade `dcf.sostenibilidad` con los datos que ya
// tenía el informe. Es una actualización de método: no cambia supuestos del DCF, precio ni fecha de corte.
//  - Puente de ingresos FY2026e-FY2030e por producto: volumen = más pacientes de Enhertu y Datroway (indicaciones
//    nuevas) menos la erosión de Lixiana y American Regent; precio = revisión anual del NHI en Japón (−4,02 % en
//    abril de 2026 sobre un 27,3 % de las ventas, ≈ −1 punto); otros = divisa, hitos de ventas de Enhertu y salida
//    de Daiichi Sankyo Healthcare (junio de 2027). Reparto entre volumen y precio: estimación propia.
//  - mercado_final = null: la cuota del 35,8 % es de Enhertu y Datroway (ventas de producto combinadas con
//    AstraZeneca) sobre la suma de ventas de ADC de cinco grupos; los ingresos del grupo (con Lixiana, American
//    Regent y las licencias) no comparan con ese perímetro, y no hay previsión de esa suma para FY2035.
// Escribe datos-v2.json; después:
//   node motor/calcular-empresa.mjs --datos informes/daiichi-sankyo-2026-10-08/datos-v2.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos.json'), 'utf8'));
delete d.calc;

// 1. Prueba de sostenibilidad.
d.dcf.sostenibilidad = {
  puente_ingresos: [
    { periodo: 'FY2026e', volumen_pct: 10, precio_pct: -1, otros_pct: 1.5,
      comentario: 'Guía de ventas de producto de Enhertu de 894.900 M (+28 %, adyuvancia y neoadyuvancia HER2+ aprobadas en mayo de 2026) y de 127.200 M de Datroway, menos Lixiana (−11,5 %) [4, 11]. Precio: revisión del NHI del −4,02 % sobre el 27,3 % de ventas en Japón [34]. Otros: yen más débil (aportó 41.900 M en el 1T) e hitos de ventas de 93.800 M frente a 86.000 M [2, 4].' },
    { periodo: 'FY2027e', volumen_pct: 10.5, precio_pct: -1, otros_pct: -7,
      comentario: 'Volumen de Enhertu y Datroway en las indicaciones nuevas. Otros: se acaban los hitos de ventas de Enhertu (93.800 M, unos 4 puntos) y sale Daiichi Sankyo Healthcare en junio de 2027 (90.700 M de ventas, unos 3 puntos en diez meses) [1, 4, 16].' },
    { periodo: 'FY2028e', volumen_pct: 11, precio_pct: -1, otros_pct: -0.5,
      comentario: 'Enhertu en líneas tempranas y Datroway en pulmón si AVANZAR sale bien, y los primeros DXd de Merck [4, 16]; consenso +10,3 % [61]. Otros: los dos últimos meses de Daiichi Sankyo Healthcare.' },
    { periodo: 'FY2029e', volumen_pct: 7.5, precio_pct: -1, otros_pct: 0,
      comentario: 'Rumbo al objetivo del plan (más de 3 billones en FY2030 y 2,3 billones en oncología), con Lixiana perdiendo exclusividad en Europa y Japón [16, 32].' },
    { periodo: 'FY2030e', volumen_pct: 6.5, precio_pct: -1, otros_pct: 0,
      comentario: 'Ventas de 2,96 billones, algo por debajo del plan [16]; el precio en EE. UU. no cambia: Enhertu no puede entrar en la negociación de Medicare antes de la lista de 2031 [35].' },
  ],
  mercado_final: null,
  veredicto: 'Sí',
  justificacion: 'Sí: la proyección pide poco y ya incluye el fin de la exclusividad de Enhertu. Crece un 4,1 % anual, frente al 10,4 % de FY2017-FY2025 y al 11,2 % previsto para los ADC [28], y solo por volumen de Enhertu y Datroway, con el precio a la baja por el NHI [34]. Foso estrecho pero real: la plataforma DXd, por la que terceros pagaron 5.350 M USD por adelantado [20, 21]. Sin cuota comparable; a mano, el grupo entero facturaría unos 20.000 M USD en FY2035e frente a un mercado de ADC de 48.100 M USD [28]. La reinversión del 12 % del NOPAT engaña: el crecimiento lo compra la I+D, (unos 2,9 billones en cinco años, en resultados) [57].',
};

// 2. Textos que cambian: la frase obligatoria del veredicto en «El negocio».
const T = {
  'resumen.sintesis': d.resumen.sintesis.replace(
    'La caída del 31,6 % en doce meses ha llevado la acción a su valor, no por debajo.',
    'La caída del 31,6 % en doce meses ha llevado la acción a su valor, no por debajo. La convicción es media porque las dos reglas coinciden y la rentabilidad queda lejos de los dos umbrales (15 % y −10 %); la subiría un AVANZAR positivo en pulmón y la bajaría otra corrección contable o unas provisiones a fabricantes por encima de los 80.000 M previstos.',
  ).replace(
    'pero el reparto del 50 % del margen bruto con AstraZeneca le pone techo al margen [2].',
    'pero el reparto del 50 % del margen bruto con AstraZeneca le pone techo al margen [2]. La calidad sostiene el crecimiento que proyectamos: un 4,1 % anual, menos de la mitad del previsto para su mercado (11,2 %) y del de FY2017-FY2025 (10,4 %), que sale del volumen de Enhertu y Datroway y no de subir precios; la prueba de sostenibilidad da «Sí».',
  ),
};
if (T['resumen.sintesis'] === d.resumen.sintesis) throw new Error('No se encontró la frase de «El negocio»');
for (const [ruta, valor] of Object.entries(T)) {
  const partes = ruta.split('.');
  let o = d;
  for (const p of partes.slice(0, -1)) o = o[p];
  if (o === undefined || !(partes.at(-1) in o)) throw new Error(`Ruta inexistente: ${ruta}`);
  o[partes.at(-1)] = valor;
}

writeFileSync(join(dir, 'datos-v2.json'), JSON.stringify(d, null, 2));
console.log(`datos-v2.json escrito (sostenibilidad: ${d.dcf.sostenibilidad.veredicto}; ${Object.keys(T).length} textos).`);
