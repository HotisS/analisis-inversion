// actualizacion-v2.mjs — Cochlear v2: metodología del 10-oct (prueba de sostenibilidad del crecimiento, `dcf.sostenibilidad`).
// Sin investigación nueva: parte de datos.json, borra calc, añade `dcf.sostenibilidad` y reescribe solo los textos que cambian.
// Mismo precio (129,00 AUD) y fecha de corte (8-oct-2026). Las cifras del DCF no se tocan: la prueba pasa.
//
// Las pruebas, con la proyección del informe (cálculo con el motor):
// - Reinversión: 629 M acumulados en FY2027e-FY2036e, el 13 % del NOPAT; el motor lo trata como «activos ligeros» (< 15 %)
//   y no calcula el crecimiento financiable. Es engañoso (lecciones, 13-oct): el circulante baja del 32 % al 29 % de las ventas
//   y libera caja. A mano: 629 M de capital para 1.637 M de ventas nuevas (3.985 − 2.347,6) = 0,38 AUD de capital por AUD de
//   ventas, dentro del 0,19 (FY2021-FY2024: +139 M de capital, +738 M de ventas) y el 0,58 (FY2021-FY2026: +494 M, +850 M)
//   históricos. El NOPAT de FY2036e (665 M, 16,7 % de las ventas) queda por debajo del 17,0-18,0 % de FY2022-FY2025: el
//   aumento del NOPAT sobre FY2026 (298 M, un año deprimido) es sobre todo recuperación de margen hasta menos de lo ya visto.
// - Cuota: `competencia.cuota_pct` (60 %) es la cuota que da la empresa en implantes cocleares y de conducción ósea, y el
//   motor dividiría los ingresos del grupo (con servicios y Acoustics) entre el mercado de implantes cocleares de GMI: no hay
//   perímetro comparable, así que `mercado_final` = null y la prueba se hace a mano. Implantes cocleares de Cochlear FY2026:
//   1.435,2 M AUD [1] frente a un mercado de ≈ 2.877 M AUD en 2025 [27, 35] = 49,9 % (GMI: 49,5 %). Si los implantes crecen
//   como el grupo, FY2035e = 1.435,2 × 3.795 / 2.347,6 = 2.320 M frente a 6.042 M AUD en 2035e [27]: 38,4 % (40,3 % con
//   FY2036e). La cuota baja: el base crece un 5,5 % anual frente al 7,6 % previsto para el mercado.
// - Puente: volumen (unidades) + precio + divisa; el reparto es estimación propia con las unidades (+5 % en FY2026, +9-16 %
//   en FY2023-FY2025), la subida media del 3 % de Nexa en desarrollados y la caída de precio en China [1, 32].
// Veredicto: Sí. No cambia ningún supuesto.
//
// Escribe datos-v2.json; después:
//   node motor/calcular-empresa.mjs --datos informes/cochlear-2026-10-08/datos-v2.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos.json'), 'utf8'));
delete d.calc;

// 1. Prueba de sostenibilidad.
d.dcf.sostenibilidad = {
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 3, precio_pct: 1, otros_pct: -3.5,
      comentario: 'Guía de crecimiento de un dígito bajo en moneda constante: unidades al +3 % (+5 % en FY2026) y precio +1 % (Nexa +3 % en desarrollados, China y emergentes a la baja); el dólar australiano a 0,70 USD resta ≈ 3,5 puntos (reparto entre volumen y precio, estimación propia) [1, 32, 49].' },
    { periodo: 'FY2028e', volumen_pct: 4.5, precio_pct: 1, otros_pct: 0,
      comentario: 'Consenso del +5,6 % [82]; unidades por debajo del +5-16 % anual de FY2022-FY2026 por la madurez del ciclo de procesadores y la compra centralizada china [1].' },
    { periodo: 'FY2029e', volumen_pct: 5, precio_pct: 1.5, otros_pct: 0,
      comentario: 'Consenso del +6,9 % [82]; el volumen depende de la derivación de adultos (penetración del ≈ 3 %) y el precio, de las indicaciones nuevas en desarrollados [1, 24].' },
  ],
  mercado_final: null,
  veredicto: 'Sí',
  justificacion: 'Sí. El foso son los costes de cambio: cada implantado compra procesadores de Cochlear de por vida (servicios, el 27 % de las ventas) y Nexa subió el precio un 3 % en desarrollados [1]. El base crece un 5,5 % anual, menos que el 7,3 % de FY2016-FY2026 y que el 7,6 % previsto para el mercado [1, 16, 27]. El motor ve una reinversión de activos ligeros (13 % del NOPAT) porque el circulante baja del 32 % al 29 %; aun así, cada AUD de ventas nuevas pide 0,38 de capital, dentro del 0,19-0,58 de FY2021-FY2026, y el margen del NOPAT final (16,7 %) queda bajo el 17-18 % de FY2022-FY2025. Cuota: los implantes, al ritmo del grupo, pasarían del ≈ 50 % al ≈ 40 % del mercado de 2035 [27]. El riesgo es el volumen de adultos y el precio en China: está en el bajista.',
};

// 2. Textos que cambian: la frase del veredicto en «El negocio», la convicción explicada (control nuevo) y los niveles de
// compra que mueve el motor actual (103,06 → 98,66; el de venta sigue en 128,20).
const reemplazar = (ruta, viejo, nuevo) => {
  const partes = ruta.split('.');
  let o = d;
  for (const p of partes.slice(0, -1)) o = o[p];
  const k = partes.at(-1);
  if (typeof o[k] !== 'string' || !o[k].includes(viejo)) throw new Error(`No está en ${ruta}: ${viejo.slice(0, 60)}`);
  o[k] = o[k].split(viejo).join(nuevo);
};

reemplazar('resumen.sintesis',
  'La razón principal: tras caer un 55 % en un año, el precio todavía exige que el grupo crezca un 9,1 % anual durante diez años, cuando los implantes de adultos en países desarrollados crecieron un 1 % en FY2026.',
  'La razón principal: tras caer un 55 % en un año, el precio todavía exige que el grupo crezca un 9,1 % anual durante diez años, cuando los implantes de adultos en países desarrollados crecieron un 1 % en FY2026. La convicción es baja porque la relativa está en el borde (−8,1 % frente al umbral del −10 %) y hasta FY2029 coincidimos con el consenso; subiría con otro recorte de la guía y bajaría si los adultos vuelven a crecer.');
reemplazar('resumen.sintesis',
  'Advanced Bionics, su rival cotizado, gana un 6,8 % [28]. El problema no es el foso, sino el crecimiento:',
  'Advanced Bionics, su rival cotizado, gana un 6,8 % [28]. La calidad sí sostiene el 5,5 % anual que proyectamos (el mercado, 7,6 %): pide poco capital nuevo y su cuota en implantes bajaría del 50 % al 40 % [27]. El problema no es el foso, sino el volumen:');
reemplazar('resumen.sintesis',
  ' El beneficio subyacente excluye desde FY2026 el gasto en la nube (94,3 M antes de impuestos), que existe desde FY2022 [1].',
  '');
reemplazar('resumen.sintesis',
  ' Cotiza a 15,8 veces el EBITDA, un 47 % por debajo de su media histórica, pero ese descuento refleja que el crecimiento de dos dígitos ha desaparecido.',
  '');
reemplazar('resumen.sintesis', 'Compraríamos por debajo de 103,06 y mantendríamos entre 103,06 y 128,20.', 'Compraríamos por debajo de 98,66 y mantendríamos entre 98,66 y 128,20.');
reemplazar('resumen.cambiaria_recomendacion.0', '103,06', '98,66');
reemplazar('escenarios.comentario', '103,06', '98,66');

writeFileSync(join(dir, 'datos-v2.json'), JSON.stringify(d, null, 2));
console.log(`datos-v2.json escrito; síntesis de ${d.resumen.sintesis.split(/\s+/).length} palabras.`);
