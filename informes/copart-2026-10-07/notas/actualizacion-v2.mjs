// actualizacion-v2.mjs — Copart v2 (13-oct-2026): metodología nueva, prueba de sostenibilidad del crecimiento.
// Sin investigación nueva: parte de datos.json, borra calc y añade `dcf.sostenibilidad` con las fuentes ya citadas.
// La prueba pasa (veredicto «Sí»): el crecimiento medio del 4,5 % sale sobre todo del ingreso por unidad (+3,5-5 %),
// que no pide capital; el volumen (−1,5 a +1,5 %) queda por debajo de lo que financia la reinversión al ROIC actual
// (29,5 % × 10 % ≈ 3 %). No se cambia ninguna cifra: la actualización es de método. `mercado_final` va en null: la
// cuota (62 %) es una estimación por unidades frente a IAA, sin tamaño de mercado en USD ni previsión de crecimiento.
// Escribe datos-v2.json; después:
//   node motor/calcular-empresa.mjs --datos informes/copart-2026-10-07/datos-v2.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos.json'), 'utf8'));
delete d.calc;

d.dcf.sostenibilidad = {
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: -1.5, precio_pct: 5, otros_pct: 0,
      comentario: 'Unidades aún a la baja (−2,9 % globales y −7,5 % de aseguradoras en EE. UU. en el 4T26, inventario de EE. UU. −3,4 %) e ingreso por unidad +5,4 % en el 4T26 y ≈ +5,7 % en FY2026 [16]; reparto entre volumen y precio, estimación propia.' },
    { periodo: 'FY2028e', volumen_pct: 1, precio_pct: 4, otros_pct: 0,
      comentario: 'Volumen: el cliente perdido sale de la base y las no aseguradoras e Internacional crecen (+0,2 % y +10 % en el 4T26) [16]; precio: ingreso por unidad por debajo del +5,4-5,7 % reciente.' },
    { periodo: 'FY2029e', volumen_pct: 1, precio_pct: 3.5, otros_pct: 0,
      comentario: 'Tasa de siniestro total al alza (23,3 %, casi 5 puntos más en cuatro años) frente a una frecuencia de colisión que cae un 3,4 % [16, 22]; precio cerca del ASP de aseguradoras (+3,7 % en el 4T26) [16].' },
    { periodo: 'FY2030e', volumen_pct: 1.5, precio_pct: 3.5, otros_pct: 0,
      comentario: 'Internacional (18 % de las ventas) a doble dígito y servicios nuevos (Title Express) [1, 16].' },
  ],
  mercado_final: null,
  veredicto: 'Sí',
  justificacion: 'Sí. El caso base (4,5 % anual, frente al 13,9 % de FY2017-FY2026) sale sobre todo del ingreso por unidad, que subió ≈ 5,7 % en FY2026 con las unidades a la baja [16]: es poder de precios ligado al precio de remate y a servicios nuevos, y no pide capital. El volumen proyectado (−1,5 % a +1,5 %) no exige ganar cuota (≈ 62 % de las unidades del par, estimación [26]), y la reinversión (1.707 M, el 10 % del NOPAT, aunque el capex medio es del 8 % de las ventas en terreno) lo financia de sobra al ROIC del 29,5 %. En 2008-09 los ingresos solo cayeron un 5,3 % [27]. El riesgo es la cuota frente a IAA [28], y eso es el bajista.',
};

// Textos que cambian: la frase obligatoria del veredicto en «El negocio» y la explicación de la convicción.
const sint = d.resumen.sintesis;
const viejoRec = 'Mantener, con convicción media.';
const nuevoRec = 'Mantener, con convicción media: las dos reglas dan Mantener lejos de sus umbrales (−4,1 % con nuestro WACC y +4,0 % con la prima del mercado), y no discrepamos del consenso; subiría la convicción ver crecer otra vez las unidades de aseguradoras en EE. UU. y la bajaría perder otro gran asegurador.';
const viejoNeg = 'Lo vulnerable: los contratos con aseguradoras se rescinden con semanas de preaviso [26].';
const nuevoNeg = viejoNeg + ' La calidad sí sostiene el crecimiento que proyectamos (veredicto de sostenibilidad: Sí): el 4,5 % anual sale sobre todo del ingreso por unidad, que subió ≈ 5,7 % en FY2026 con menos unidades [16], y no pide ganar cuota ni más capital del que financia un ROIC del 29,5 %.';
for (const [a, b] of [[viejoRec, nuevoRec], [viejoNeg, nuevoNeg]]) {
  if (!sint.includes(a)) throw new Error(`No encuentro en la síntesis: ${a}`);
}
d.resumen.sintesis = sint.replace(viejoRec, nuevoRec).replace(viejoNeg, nuevoNeg);

writeFileSync(join(dir, 'datos-v2.json'), JSON.stringify(d, null, 2));
console.log('datos-v2.json escrito');
