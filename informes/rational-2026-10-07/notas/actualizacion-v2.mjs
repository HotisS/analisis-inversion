// actualizacion-v2.mjs — Rational v2 (13-oct-2026): metodología del 10-oct, prueba de sostenibilidad del crecimiento.
// Sin investigación nueva: parte de datos.json, borra calc y añade `dcf.sostenibilidad` con las cifras y fuentes que ya
// tenía el informe. La prueba pasa: la proyección (6,2 % anual medio) reinvierte ≈ 10 % del NOPAT, que al ROIC del 61,2 %
// financia ≈ 6,1 % anual, y unos 3 puntos al año son precio (no piden capital); el capital nuevo rendiría un 56,6 %,
// por debajo del ROIC actual y del incremental histórico (84,6 %). La cuota del 50 % es de hornos combinados y el grupo
// incluye el iVario: `mercado_final` va en null y la prueba de cuota se hace a mano con las ventas del iCombi.
// No cambia ninguna cifra del DCF. Con el motor actual salta el control de convicción (las reglas discrepan: sugerida
// «Baja»); se baja de Media a Baja y se explica en la síntesis.
// Recalcular con el motor actual baja el nivel de compra de 504,42 a 459,62 EUR (regla del 9/10-oct): se corrige en la
// síntesis y en `cambiaria_recomendacion`. Escribe datos-v2.json; después:
//   node motor/calcular-empresa.mjs --datos informes/rational-2026-10-07/datos-v2.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos.json'), 'utf8'));
delete d.calc;

// 1. Prueba de sostenibilidad del crecimiento.
d.dcf.sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 5.5, precio_pct: 2, otros_pct: -1.5,
      comentario: 'El 1S26 creció un 5,8 % publicado y un 8 % orgánico (con adelanto de pedidos al 1T); la divisa restó ≈ 2 puntos [5]. Precio: subidas del 4-5 % en EE. UU., el 20 % de las ventas, más las habituales en el resto (estimación propia) [1]. Unidades: +6 % en 2025 [1].' },
    { periodo: '2027e', volumen_pct: 4, precio_pct: 3, otros_pct: 0,
      comentario: 'Unos 4 puntos de unidades, por debajo del +6 % de 2025, y 3 de precio; el consenso da +7,7 % [1, 47].' },
    { periodo: '2028e', volumen_pct: 4, precio_pct: 3, otros_pct: 0,
      comentario: 'Mismo reparto; consenso +8,0 % [47].' },
    { periodo: '2029e', volumen_pct: 4, precio_pct: 3, otros_pct: 0,
      comentario: 'Sustitución de aparatos tradicionales: el 75 % de las cocinas relevantes no tiene horno combinado [17].' },
    { periodo: '2030e', volumen_pct: 4, precio_pct: 3, otros_pct: 0,
      comentario: 'EE. UU., con una penetración del ≈ 15 % frente a más del 50 % en Europa, sostiene las unidades [13].' },
  ],
  // La cuota del 50 % es de hornos combinados [16, 20]; los ingresos del grupo incluyen el iVario (12 %): perímetro no comparable.
  mercado_final: null,
  veredicto: 'Sí',
  justificacion: 'Sí. El caso base crece un 6,2 % anual y reinvierte ≈ 10 % del NOPAT (346 M): al ROIC del 61,2 % eso financia ≈ 6,1 %, y unos 3 puntos al año son precio, que no pide capital. El capital nuevo rendiría un 56,6 %, menos que el ROIC actual y que el incremental histórico (84,6 %). Hay inversión neta, aunque el motor hable de activos ligeros. Poder de precios probado: el margen bruto volvió del 55 % al 59 % tras la inflación y en 2026 traslada el arancel [1]. Cuota, a mano (el 50 % es de hornos combinados [16, 20]): con el iCombi al ritmo del grupo y el mercado al 6,3 % histórico, en 2035e seguiría en ≈ 50 %. Ciclo: −8 % en 2009 y −23 % en 2020 [15, 20], superado en 2022.',
};

// 2. Textos que cambian: el veredicto en «El negocio» y la convicción (Media → Baja).
const T = {
  'resumen.conviccion': 'Baja',
  'resumen.sintesis': d.resumen.sintesis
    .replace('Mantener, con convicción media. El valor objetivo',
      'Mantener, con convicción baja (antes media): las reglas discrepan y todo depende de la prima de riesgo. El valor objetivo')
    .replace('Por eso el DCF usa una etapa de transición de diez años, que aporta un 8,7 % del valor.',
      'Por eso el DCF usa una etapa de transición de diez años, que aporta un 8,7 % del valor. La calidad de la empresa sostiene el crecimiento que proyectamos: el 6,2 % anual del caso base se financia con el ROIC actual y un 10 % del beneficio reinvertido, y la cuota seguiría en torno al 50 %.')
    .replace('Compraríamos por debajo de 504,42 EUR', 'Compraríamos por debajo de 459,62 EUR (un Comprar que solo da la regla relativa exige un 5 % de rentabilidad con nuestro WACC)')
    .replace('o el margen bruto cae del 57 % sin efecto arancel.',
      'o el margen bruto cae del 57 % sin efecto arancel. La convicción subiría si las dos reglas coincidieran; con una prima del mercado del 5,5 %, la nuestra, ambas dirían Vender.'),
  'resumen.cambiaria_recomendacion.0': 'Precio por debajo de 459,62 EUR: pasaríamos a Comprar (un Comprar solo de la regla relativa exige además un 5 % de rentabilidad total con nuestro WACC).',
};
if (T['resumen.sintesis'].includes('504,42') || T['resumen.sintesis'] === d.resumen.sintesis || (T['resumen.sintesis'].match(/convicción/g) || []).length < 2 || T['resumen.sintesis'].includes('convicción media') || !T['resumen.sintesis'].includes('La calidad de la empresa sostiene'))
  throw new Error('No se aplicaron los reemplazos de la síntesis');
for (const [ruta, valor] of Object.entries(T)) {
  const partes = ruta.split('.');
  let o = d;
  for (const p of partes.slice(0, -1)) o = o[p];
  if (o === undefined || !(partes.at(-1) in o)) throw new Error(`Ruta inexistente: ${ruta}`);
  o[partes.at(-1)] = valor;
}

writeFileSync(join(dir, 'datos-v2.json'), JSON.stringify(d, null, 2));
console.log(`datos-v2.json escrito (${Object.keys(T).length} textos y dcf.sostenibilidad).`);
