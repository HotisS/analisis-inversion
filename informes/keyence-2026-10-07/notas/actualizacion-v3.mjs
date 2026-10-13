// actualizacion-v3.mjs — Keyence v3: metodología del 10-oct (prueba de sostenibilidad del crecimiento, `dcf.sostenibilidad`).
// Sin investigación nueva: parte de datos-v2.json, borra calc y añade el puente de ingresos, el mercado final y el
// veredicto. No cambia ningún supuesto del DCF: la prueba pasa (capital nuevo al 87,2 % frente a un incremental
// histórico del 87,6 %; reinversión del 8 % del NOPAT que, al ROIC del 94,6 %, financia ≈ 7,8 % anual, más ≈ 1 punto
// de precio que no pide capital, frente al 8,4 % proyectado; crecimiento igual al del mercado, así que la cuota no sube).
// Solo se reescriben la frase del veredicto en «El negocio» y el nivel de compra, que el motor actual mueve de
// 65.834,24 a 63.903,81 JPY sin cambiar datos (regla del 9/10-oct).
// Escribe datos-v3.json; después:
//   node motor/calcular-empresa.mjs --datos informes/keyence-2026-10-07/datos-v3.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos-v2.json'), 'utf8'));
delete d.calc;

// 1. Prueba de sostenibilidad del crecimiento.
d.dcf.sostenibilidad = {
  puente_ingresos: [
    { periodo: 'FY2026e', volumen_pct: 16, precio_pct: 1, otros_pct: 5,
      comentario: 'Volumen: el 1T26 creció un 22,8 % sin divisa (extranjero +24,0 % en moneda local, Japón +19,9 %) [15], y el resto del año se compara con una base más exigente. Otros: divisa; en el 1T fueron 26.100 M JPY, unos 10 puntos [15], y con el yen a ≈ 158 pesa menos el resto del año. Precio: estimación propia de ≈ 1 punto; Keyence no publica subidas de tarifa, pero el margen bruto se ha mantenido entre el 80,8 % y el 85,0 % con la inflación de costes [1, 15].' },
    { periodo: 'FY2027e', volumen_pct: 10, precio_pct: 1, otros_pct: 0,
      comentario: 'Volumen: expansión fuera de Japón (dos tercios de las ventas, más del 15 % en moneda local tres años seguidos) con más ingenieros de venta (plantilla +4,3 % en FY2025) [1, 20]. Sin divisa. El consenso pide algo más [59].' },
    { periodo: 'FY2028e', volumen_pct: 8, precio_pct: 1, otros_pct: 0,
      comentario: 'Volumen en línea con el mercado de visión artificial (+8,3 % anual) [36]; productos nuevos (≈ 70 % «primero del mundo» o del sector) para sostener el precio [2].' },
    { periodo: 'FY2029e', volumen_pct: -6, precio_pct: 1, otros_pct: 0,
      comentario: 'Giro del ciclo de inversión industrial calibrado con FY2019 (−6,0 %) [4]; en esa caída el margen bruto no bajó del 81 %, señal de que el ajuste es de volumen, no de precio [1].' },
    { periodo: 'FY2030e', volumen_pct: 9, precio_pct: 1, otros_pct: 0,
      comentario: 'Recuperación tras el ciclo, como FY2021 tras FY2019-FY2020, pero mucho más moderada (+10 % frente a +40,3 %) [4].' },
  ],
  // Keyence no publica cuota (competencia.cuota_pct = null) ni ventas de visión artificial: no hay perímetro comparable.
  mercado_final: null,
  veredicto: 'Sí',
  justificacion: 'Sí. El foso es amplio: venta directa con ingenieros propios, ≈ 70 % de productos nuevos «primero del mundo» y un margen bruto del 81-85 % durante diez años, prueba del poder de precios [1, 2]. A lo largo del ciclo (FY2019-FY2020 incluidos) creció un 12,3 % anual, ≈ 9,8 % sin divisa, sin compras ni deuda [1, 4]. Las pruebas: el capital nuevo rinde un 87,2 %, igual que el incremental histórico (87,6 %); la reinversión (8 % del NOPAT) financia ≈ 7,8 % al ROIC actual y el punto de precio llega al 8,4 % proyectado; y ese 8,4 % es el ritmo del mercado de visión (+8,3 %) [36], así que la cuota no sube.',
};

// 2. Textos que cambian.
const sint = d.resumen.sintesis.split('\n\n');
const iNeg = sint.findIndex((p) => p.startsWith('**El negocio.**'));
const iVal = sint.findIndex((p) => p.startsWith('**Valoración.**'));
const iQue = sint.findIndex((p) => p.startsWith('**Qué cambiaría la decisión.**'));
if (iNeg < 0 || iQue < 0 || iVal < 0) throw new Error('Síntesis sin «El negocio» o «Qué cambiaría»');
const viejaNeg = 'Ha multiplicado las ventas por 2,8 en diez años sin una sola compra.';
if (!sint[iNeg].includes(viejaNeg)) throw new Error('«El negocio» cambió');
sint[iNeg] = sint[iNeg].replace(viejaNeg, 'Ha multiplicado las ventas por 2,8 en diez años sin compras; la calidad sostiene el 8,4 % anual del base (sostenibilidad: Sí): lo financian la reinversión y un punto de precio, sin ganar cuota.');
// Para no pasar de 650 palabras: el recorrido de la etapa ya lo detalla dcf.etapa2.
const viejaVal = 'ventas exteriores creciendo más del 15 % en moneda local, productividad exterior a la mitad de la japonesa [24] y un mercado previsto al +8,3 % [36]';
if (!sint[iVal].includes(viejaVal)) throw new Error('«Valoración» cambió');
sint[iVal] = sint[iVal].replace(viejaVal, 'productividad exterior a mitad de la japonesa [24] y un mercado al +8,3 % [36]');
if (!sint[iQue].includes('65.834,24')) throw new Error('No encuentro el nivel de compra viejo');
sint[iQue] = sint[iQue].replace('65.834,24', '63.903,81');
d.resumen.sintesis = sint.join('\n\n');
if (!d.resumen.cambiaria_recomendacion[0].includes('65.834,24')) throw new Error('cambiaria[0] sin el nivel viejo');
d.resumen.cambiaria_recomendacion[0] = d.resumen.cambiaria_recomendacion[0].replace('65.834,24', '63.903,81');

writeFileSync(join(dir, 'datos-v3.json'), JSON.stringify(d, null, 2));
console.log(`datos-v3.json escrito; síntesis de ${d.resumen.sintesis.split(/\s+/).length} palabras.`);
