// actualizacion-v2.mjs — DSV v2: sostenibilidad del crecimiento (metodología del 10-oct-2026).
// Sin investigación nueva: parte de datos.json, borra calc y añade `dcf.sostenibilidad` con lo que ya estaba en el
// informe. DSV es un comprador en serie: el +20,4 % de 2026e es casi todo Schenker (cuatro meses más que en 2025);
// frente a los ingresos proforma de 2025 (293.368 M) [1], 2026e crece un 1,5 %. Ese crecimiento comprado va en
// `otros_pct`. El DCF no proyecta compras nuevas (ni su coste en el capex): el crecimiento de 2027e en adelante es
// orgánico. `mercado_final` queda en null: la cuota del 6 % es la estimación de DSV con sus ingresos totales de 2024
// proforma, un perímetro que no coincide con los 208.100 M EUR de Transport Intelligence (solo transitario aéreo y
// marítimo); con ese mercado, los ingresos de DSV (que incluyen Road y Contract Logistics) darían una cuota del
// ≈ 19 %. La prueba de cuota se hace a mano con los volúmenes (TEU y toneladas). No cambia ningún supuesto del DCF:
// la reinversión es el 11 % del NOPAT (activos ligeros para el motor) y el veredicto es «Sí».
// Escribe datos-v2.json; después:
//   node motor/calcular-empresa.mjs --datos informes/dsv-2026-10-07/datos-v2.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos.json'), 'utf8'));
delete d.calc;

// 1. Sostenibilidad del crecimiento.
d.dcf.sostenibilidad = {
  puente_ingresos: [
    {
      periodo: '2026e', volumen_pct: 0.5, precio_pct: 1.0, otros_pct: 18.9,
      comentario: 'Crecimiento comprado: Schenker consolida doce meses frente a ocho en 2025; con los ingresos proforma de 2025 (293.368 M) el crecimiento es del 1,5 % [1, 2]. Ese 1,5 % se reparte entre algo de volumen (salida deliberada de negocio de bajo margen y clientes perdidos en Road) y fletes más caros por Oriente Medio que se repercuten (reparto, estimación propia) [2, 24].',
    },
    {
      periodo: '2027e', volumen_pct: 2.5, precio_pct: -1.1, otros_pct: 0,
      comentario: 'Volumen como el mercado y algo más (Ti: +2,9 % marítimo y +1,6 % aéreo al año hasta 2030) [24]; los fletes se normalizan tras Oriente Medio (WCI a la baja doce semanas seguidas) y bajan los ingresos repercutidos; el margen bruto crece un 2,5 % [2, 26].',
    },
    {
      periodo: '2028e', volumen_pct: 2.5, precio_pct: 1.5, otros_pct: 0,
      comentario: 'Volumen de 2-3 % y precio en línea con la inflación; sin compras nuevas en el DCF. Ingresos a +0,5 % del consenso [56].',
    },
    {
      periodo: '2029e', volumen_pct: 2.5, precio_pct: 1.5, otros_pct: 0,
      comentario: 'Mercado al +2,3 % anual hasta 2030 [24]: el caso base supone una ganancia de cuota pequeña, como tras Panalpina y GIL [1].',
    },
  ],
  mercado_final: null,
  veredicto: 'Sí',
  justificacion: 'Sí: el crecimiento orgánico proyectado (3,2 % anual en 2027e-2035e) apenas supera al del mercado (2,3 % según Ti) [24] sin crecimiento comprado gratis: Schenker ya está en el balance y no se proyectan compras. El foso es estrecho y de costes (escala en compras de transporte y conversión de margen bruto en EBIT superior a la de Kuehne+Nagel y DHL) [1, 17, 18]; el poder de precios es escaso (el margen bruto por TEU cayó de 4.752 a 3.964 DKK) [1, 2], así que crece por volumen. La cuota en volumen (5,4 % en TEU, 8,0 % aérea) pasaría a ≈ 5,6 % en 2035: verosímil. La apuesta del caso base no es el crecimiento sino la conversión.',
};

// 2. Textos que cambian: la frase del veredicto en «El negocio».
const parrafos = d.resumen.sintesis.split('\n\n');
const iNeg = parrafos.findIndex((p) => p.startsWith('**El negocio.**'));
if (iNeg < 0) throw new Error('Falta el párrafo «El negocio»');
parrafos[iNeg] += ' La calidad sostiene el crecimiento que proyectamos: un 3,2 % orgánico anual, casi todo volumen y poco más que el 2,3 % del mercado [24], sin compras nuevas; lo que pide fe no es el crecimiento sino que la conversión vuelva al 40 %.';
d.resumen.sintesis = parrafos.join('\n\n');

// 3. Nivel de compra: el motor del 10-oct exige ahora a la regla relativa una rentabilidad total absoluta de al menos
// el 5 % para dar Comprar sola; con las mismas cifras, el nivel de compra baja de 1.481,37 a 1.299,42 DKK (sale de calc).
const cambiar = (texto, de, a) => {
  if (!texto.includes(de)) throw new Error(`No está «${de}»`);
  return texto.replace(de, a);
};
d.resumen.sintesis = cambiar(d.resumen.sintesis, 'Compraríamos por debajo de 1.481,37 DKK', 'Compraríamos por debajo de 1.299,42 DKK');
d.resumen.cambiaria_recomendacion[2] = cambiar(d.resumen.cambiaria_recomendacion[2], 'por encima de 1.481,37 DKK', 'por encima de 1.299,42 DKK');

writeFileSync(join(dir, 'datos-v2.json'), JSON.stringify(d, null, 2));
console.log('datos-v2.json escrito (dcf.sostenibilidad y frase del veredicto en «El negocio»).');
