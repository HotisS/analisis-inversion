// actualizacion-v3.mjs — Vertiv v3: metodología del 10-oct (sostenibilidad del crecimiento, `dcf.sostenibilidad`).
// Sin investigación nueva: parte de datos-v2.json (que añadió la regla relativa), borra calc y añade el puente de
// ingresos 2026e-2029e, el mercado final de Dell'Oro (120.000 M USD en 2030e, mismo perímetro que la cuota del 20 %)
// y el veredicto. La prueba pasa (activos ligeros por los anticipos; cuota implícita del 21,9 % en 2030e): no se
// cambia ningún supuesto del DCF. Solo cambian la frase del veredicto en «El negocio» y la explicación de la
// convicción (control nuevo «Convicción frente a la sugerida»: los criterios dan Alta; se mantiene Baja).
// Escribe datos-v3.json; después:
//   node motor/calcular-empresa.mjs --datos informes/vertiv-2026-10-07/datos-v3.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos-v2.json'), 'utf8'));
delete d.calc;

// 1. Prueba de sostenibilidad.
d.dcf.sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 28, precio_pct: 3, otros_pct: 5.9, comentario: 'Guía de crecimiento orgánico del 30-32 % (31 % en el punto medio), con el precio por encima de la inflación y «price-cost» positivo incluidos los aranceles [5, 21, 22]; el reparto entre volumen y precio es estimación propia (Vertiv no lo publica). Otros: compras de PurgeRite, Great Lakes y tres menores (5 de los 24 puntos del 2T26) y divisa [5].' },
    { periodo: '2027e', volumen_pct: 25, precio_pct: 3, otros_pct: 0, comentario: 'Volumen apoyado en la cartera de 15.000 M USD de dic-25, firme en su mayoría y a entregar en 12-18 meses [1, 7]; precio como en 2026. Sin UtilityInnovation Group, aún sin cerrar [14].' },
    { periodo: '2028e', volumen_pct: 17.5, precio_pct: 2.5, otros_pct: 0, comentario: 'El volumen se modera con el mercado (Dell\'Oro: +22 % anual hasta 2030) [33]; precio en torno a la inflación.' },
    { periodo: '2029e', volumen_pct: 9.5, precio_pct: 2.5, otros_pct: 0, comentario: 'Volumen ya por debajo del crecimiento previsto del mercado [33]; el precio no supone más poder que la inflación.' },
  ],
  mercado_final: { periodo: '2030e', tamano: 120000 },
  veredicto: 'Sí',
  justificacion: 'El base crece un 13,2 % anual, por debajo del 22 % que Dell\'Oro prevé para el mercado hasta 2030 [33]: la cuota implícita en 2030e (21,9 %, ventas del grupo sobre el mercado) queda por debajo del 23 % de 2025 con el mismo cálculo [1, 33]. La prueba de cuota se hace en 2030e, último año con previsión del mercado. La reinversión es pequeña (9 % del NOPAT) porque los anticipos financian el circulante, pero no es un negocio sin capital: el capex supera la amortización y, si los anticipos se normalizan antes, la reinversión subirá. El poder de precios es del ciclo actual (precio por encima de la inflación con aranceles [21, 22]); en 2022 el margen bruto cayó al 28,4 % [2]. Lo que limita el crecimiento es el ciclo de inversión de los clientes, no la calidad.',
};

// 2. Textos que cambian.
const sint = d.resumen.sintesis;
const cambios = [
  [
    'La convicción es baja porque la discrepancia es de tasa y de largo plazo, no de cifras próximas, y ningún catalizador con fecha la cierra.',
    'La convicción es baja, aunque los criterios darían alta, porque la discrepancia es de tasa y de duración del ciclo, no de cifras próximas, y ningún catalizador con fecha la cierra.',
  ],
  [
    'y Eaton paga 9.500 M por Boyd Thermal para entrar en su terreno [104].',
    'y Eaton paga 9.500 M por Boyd Thermal para entrar en su terreno [104]. La calidad sostiene el crecimiento proyectado: el 13,2 % anual del base queda por debajo del 22 % de su mercado, la cuota no sube y los anticipos financian la reinversión.',
  ],
  [
    'Vertiv vende la energía (SAI, cuadros, busway) y la refrigeración, cada vez más líquida, que necesita un centro de datos, más los servicios de su base instalada; los centros de datos son en torno al 85 % de las ventas [27].',
    'Vertiv vende la energía (SAI, cuadros, busway) y la refrigeración que necesita un centro de datos, más servicios; los centros de datos son en torno al 85 % de las ventas [27].',
  ],
  [
    'Las transacciones (77,80 USD) no pesan. Discrepamos del mercado en la duración del ciclo, no en 2027.',
    'Las transacciones (77,80 USD) no pesan.',
  ],
  [
    'Deuda neta ajustada de 152 M y grado de inversión desde febrero [6]. Desde febrero ya no publica pedidos ni cartera trimestrales [25].',
    'Deuda neta ajustada de 152 M y grado de inversión desde febrero [6]; ya no publica pedidos trimestrales [25].',
  ],
  [
    'Catalizadores: resultados del 3T26 a finales de octubre, el capex de los hiperescaladores para 2027 y la cartera anual del 10-K en febrero de 2027.',
    'Catalizadores: el 3T26 (finales de octubre), el capex de los hiperescaladores para 2027 y la cartera anual del 10-K (febrero de 2027).',
  ],
];
let s = sint;
for (const [a, b] of cambios) {
  if (!s.includes(a)) throw new Error(`No encuentro en la síntesis: ${a.slice(0, 60)}`);
  s = s.replace(a, b);
}
d.resumen.sintesis = s;

writeFileSync(join(dir, 'datos-v3.json'), JSON.stringify(d, null, 2));
console.log(`datos-v3.json escrito (síntesis de ${s.split(/\s+/).length} palabras).`);
