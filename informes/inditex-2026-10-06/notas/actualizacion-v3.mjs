// actualizacion-v3.mjs — Inditex v3 (13 oct 2026): sostenibilidad del crecimiento (`dcf.sostenibilidad`, metodología del 10-oct).
// Sin investigación nueva: parte de datos-v2.json, borra calc y añade el puente de ingresos, el mercado final y el veredicto.
// Escribe datos-v3.json; después:
//   node motor/calcular-empresa.mjs --datos informes/inditex-2026-10-06/datos-v3.json
import { readFileSync, writeFileSync } from 'node:fs';

const dir = new URL('../', import.meta.url);
const d = JSON.parse(readFileSync(new URL('datos-v2.json', dir), 'utf8'));
delete d.calc;

// ── Sostenibilidad del crecimiento ──
// Mercado final: venta minorista mundial de prendas y calzado de Euromonitor, el perímetro de competencia.cuota_pct
// (≈ 2,4 %): ≈ 1.646.000 M EUR en 2025 [50], extrapolado al 3,5 % nominal anual (el 3-4 % que prevé Euromonitor [50])
// hasta 2035 (FY2035e acaba en ene-2036) = 2.321.846 M EUR. Estimación propia.
d.dcf.sostenibilidad = {
  puente_ingresos: [
    { periodo: 'FY2026e', volumen_pct: 5, precio_pct: 3.5, otros_pct: -1,
      comentario: 'Volumen: superficie bruta guiada al +5 % con contribución positiva a las ventas [2, 4]. Precio y productividad por m²: venta a precio completo y mezcla (margen bruto del 58,7 % en el 1S26) [4]; el 1S26 creció un 9,2 % a tipo constante y el 2S arrancó al +9 % [4]. Otros: divisa guiada al −1 % [4]. Reparto entre volumen y precio, estimación propia.' },
    { periodo: 'FY2027e', volumen_pct: 4.5, precio_pct: 2.5, otros_pct: 0,
      comentario: 'Superficie al ritmo de los últimos años (+5,3-5,8 % de espacio bruto nuevo, con absorciones) [2, 12] y online integrado con la tienda [2]; precio y mezcla en línea con la inflación del vestido y algo de mezcla (estimación propia) [56]. El consenso da +7,5 % [116].' },
    { periodo: 'FY2028e', volumen_pct: 4, precio_pct: 2.5, otros_pct: 0,
      comentario: 'Menos superficie nueva neta, porque crece sustituyendo tiendas pequeñas [2]; el consenso da +7,1 % [116].' },
    { periodo: 'FY2029e', volumen_pct: 3.5, precio_pct: 2.5, otros_pct: 0,
      comentario: 'Volumen hacia el ritmo de un mercado que crece un 3-4 % nominal [50] más algo de cuota; precio con la inflación.' },
  ],
  mercado_final: { periodo: 'FY2035e', tamano: 2321846 },
  veredicto: 'Sí',
  justificacion: 'Sí: el caso base pide menos que la historia. El 5,3 % anual de FY2026e-FY2035e queda por debajo del 5,9 % de FY2019-FY2025 y sale de superficie (+5 % guiado, bajando) más un 2,5-3,5 % de precio y mezcla, con poder de precios demostrado (margen bruto +240 pb en seis ejercicios) [1, 2, 107]. La reinversión es baja (6 % del NOPAT) porque el circulante negativo financia el crecimiento, no porque falte inversión: el capex neto de amortización, el 9 % del NOPAT, financia al ROIC del 42,4 % un 3,8 % anual, el volumen del puente. La cuota pasaría del 2,4 % al 2,9 % de un mercado mundial fragmentado [50]. El riesgo es de colección, no de capacidad.',
};

// ── Síntesis: frase obligatoria del veredicto en «El negocio» ──
const r = d.resumen;
const partes = r.sintesis.split('\n\n');
const iN = partes.findIndex((p) => p.startsWith('**El negocio.**'));
if (iN < 0) throw new Error('No encuentro «El negocio» en la síntesis');
const viejo = 'El foso es estrecho: no protege de un error de colección como el que hundió el margen de H&M [71].';
if (!partes[iN].includes(viejo)) throw new Error('Cambió «El negocio»');
partes[iN] = partes[iN].replace(viejo, 'Su calidad sostiene el crecimiento que proyectamos, un 5,3 % anual frente al 5,9 % de FY2019-FY2025: superficie y circulante negativo lo financian casi sin capital nuevo, el poder de precios está demostrado y la cuota solo pasaría del 2,4 % al 2,9 % [50]. El foso es estrecho: no protege de un error de colección como el de H&M [71].');
r.sintesis = partes.join('\n\n');

writeFileSync(new URL('datos-v3.json', dir), JSON.stringify(d, null, 2));
console.log('datos-v3.json escrito.');
