// actualizacion-v2.mjs — ICON v2: metodología del 10-oct (prueba de sostenibilidad del crecimiento, `dcf.sostenibilidad`).
// Sin investigación nueva: parte de datos.json, borra calc y añade dcf.sostenibilidad con datos del propio informe.
// Escribe datos-v2.json; después:
//   node motor/calcular-empresa.mjs --datos informes/icon-2026-10-09/datos-v2.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos.json'), 'utf8'));
delete d.calc;

// 1. Prueba de sostenibilidad del crecimiento.
d.dcf.sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -1.0, precio_pct: 0, otros_pct: -0.6, comentario: 'Guía de 7.850-8.150 M reafirmada el 29-jul: ventas casi planas por las cancelaciones de 2025 y la salida de Symphony (vendida en mayo, en otros); sin subidas de tarifa publicadas (reparto entre volumen y otros, estimación propia) [7, 78].' },
    { periodo: '2027e', volumen_pct: 3.5, precio_pct: 0, otros_pct: 0, comentario: 'Conversión de la contratación del primer semestre (1,46 veces la facturación, 1,2 veces en honorarios directos) y de una cartera de 23.400 M; el consenso da +3,6 % [7, 78].' },
    { periodo: '2028e', volumen_pct: 4.0, precio_pct: 1.0, otros_pct: 0, comentario: 'Volumen al ritmo del mercado de CRO (4,5 % estimado) y algo de precio por indexación de contratos plurianuales; el consenso da +5,5 % [25, 78].' },
    { periodo: '2029e', volumen_pct: 4.0, precio_pct: 1.0, otros_pct: 0, comentario: 'Igual que 2028e: sin ganar cuota, el volumen sigue al gasto clínico externalizado [18, 25].' },
    { periodo: '2030e', volumen_pct: 4.0, precio_pct: 1.0, otros_pct: 0, comentario: 'Igual que 2028e [18, 25].' },
  ],
  mercado_final: { periodo: '2035e', tamano: 116500 },
  veredicto: 'En parte',
  justificacion: 'En parte. Las tres pruebas pasan: la proyección no pide capital nuevo (la reinversión neta sale negativa porque la amortización incluye los intangibles de PRA; sin ellos, el capex del 2,1 % apenas supera la depreciación del 1,8 %) [1], y el crecimiento medio del 3,5 % queda por debajo del 4,5 % previsto para el mercado, con la cuota del 11 % al 10 % en 2035e [18, 25]. Pero el foso se estrecha (+0,8 % anual en 2023-2025 frente al +34 % acumulado de Medpace), no hay subidas de tarifa publicadas y el ROIC (6,8 %) está bajo el WACC [1, 24]. El +5 % de 2028-2030 exige dejar de perder cuota; si no, es el bajista.',
};

// 2. Frase obligatoria del veredicto en «El negocio» (se acorta el párrafo para no pasar de 650 palabras).
const viejo = '**El negocio.** ICON es una de las tres mayores CRO del mundo, con cerca del 11 % del desarrollo clínico externalizado [1, 18]. El foso se estrecha: de 2023 a 2025 creció un 2,4 % y Medpace un 34 % [1, 24], con un margen EBITDA 4-6 puntos inferior al de IQVIA, Medpace y Charles River [81]. PRA (12.042 M en 2021) hundió el ROIC del 25,7 % al 6,8 % de 2025, por debajo del WACC [9].';
const nuevo = '**El negocio.** ICON es una de las tres mayores CRO del mundo, con cerca del 11 % del desarrollo clínico externalizado [1, 18]. El foso se estrecha: de 2023 a 2025 creció un 2,4 % y Medpace un 34 % [1, 24], con un margen EBITDA 4-6 puntos inferior al de sus pares [81]. PRA hundió el ROIC del 25,7 % al 6,8 %, bajo el WACC [9]. **La calidad sostiene solo en parte el crecimiento proyectado** (3,5 % anual, sin capital nuevo y con la cuota bajando al 10 % en 2035e): el +5 % de 2028-2030 exige dejar de perder cuota sin poder de precios demostrado [1].';
if (!d.resumen.sintesis.includes(viejo)) throw new Error('No encuentro el párrafo «El negocio»');
d.resumen.sintesis = d.resumen.sintesis.replace(viejo, nuevo);
const sobra = ' Cotiza a 12,8 veces el EBITDA de los próximos 12 meses, frente a 14,6 de los comparables.';
if (!d.resumen.sintesis.includes(sobra)) throw new Error('No encuentro la frase de múltiplos');
d.resumen.sintesis = d.resumen.sintesis.replace(sobra, '');
for (const [a, b] of [
  ['; el Beneish M (−2,61) no lo detecta', ''],
  ['Nueve consejeros y directivos vendieron 4,0 M USD en agosto y septiembre, sin compras [48].', 'Consejeros y directivos vendieron 4,0 M USD en agosto y septiembre [48].'],
]) {
  if (!d.resumen.sintesis.includes(a)) throw new Error(`No encuentro: ${a}`);
  d.resumen.sintesis = d.resumen.sintesis.replace(a, b);
}

writeFileSync(join(dir, 'datos-v2.json'), JSON.stringify(d, null, 2));
console.log('datos-v2.json escrito.');
