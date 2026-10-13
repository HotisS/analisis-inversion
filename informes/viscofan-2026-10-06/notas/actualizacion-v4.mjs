// Actualización v4 de Viscofan (13 oct 2026): sostenibilidad del crecimiento (`dcf.sostenibilidad`, metodología del 10-oct).
// Sin investigación nueva: parte de datos-v3.json, borra calc, añade el puente de ingresos, el mercado final y el
// veredicto, y reescribe solo la frase obligatoria de «El negocio» en la síntesis. No cambia supuestos del DCF,
// precio ni fecha de corte. Escribe datos-v4.json; después:
//   node motor/calcular-empresa.mjs --datos informes/viscofan-2026-10-06/datos-v4.json
//
// Mercado final: null. La cuota de `competencia.cuota_pct` (≈ 22 %) es solo de envolturas (31 % de 1.800 M de
// contacto alimentario y 17 % de 3.300 M de proteicas [4]), mientras que el motor divide los ingresos totales, que
// incluyen nuevos negocios (13 %) y energía (4,7 %). La prueba se hace a mano: envolturas 1.033,7 M en 2025 [2]; al
// crecimiento medio de la proyección (4,9 %) serían ≈ 1.450 M en 2032e frente a un mercado de ≈ 6.440 M (5.100 M en
// 2025 [4] al 3,4 % anual [26]): ≈ 22,5 % frente al 20,3 % de hoy con esa misma base, +2,2 puntos.
import { readFileSync, writeFileSync } from 'node:fs';

const dir = new URL('../', import.meta.url);
const d = JSON.parse(readFileSync(new URL('datos-v3.json', dir), 'utf8'));
delete d.calc;

const cambiar = (obj, k, viejo, nuevo) => {
  if (typeof obj[k] !== 'string' || !obj[k].includes(viejo)) throw new Error(`No encuentro en ${k}: «${viejo.slice(0, 60)}…»`);
  obj[k] = obj[k].replace(viejo, nuevo);
};

// ── Sostenibilidad del crecimiento ──
d.dcf.sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 4, precio_pct: 2.5, otros_pct: -1.5, comentario: 'Volúmenes en su media histórica del 4 % y creciendo en todas las regiones [41][5]; subidas de precio en el 2S26 para repercutir gas y pieles, con un crecimiento comparable del 4,9 % en el 2T26 [5]; la divisa resta (+1,8 % reportado en el 1S26) [5]. Reparto entre volumen y precio, estimación propia.' },
    { periodo: '2027e', volumen_pct: 4, precio_pct: 1.5, otros_pct: 0.5, comentario: 'Volumen como el mercado y algo de cuota en EE. UU. por la retirada de Viskase [22]; precio por el efecto pleno de las subidas de 2026; otros, nuevos negocios de Beat\'30 [4]. Consenso: +5,9 % [28].' },
    { periodo: '2028e', volumen_pct: 4, precio_pct: 1.5, otros_pct: 0.5, comentario: 'Igual que 2027e; el consenso da +5,9 % [28] y Beat\'30 pide un 8 % anual, que no damos [4].' },
    { periodo: '2029e', volumen_pct: 3.5, precio_pct: 1.5, otros_pct: 0.5, comentario: 'Volumen hacia el 3,4-4 % del mercado [26][41] y precio en línea con la inflación.' },
  ],
  mercado_final: null,
  veredicto: 'Sí',
  justificacion: 'Sí: el caso base pide poco. El 4,9 % anual queda por debajo del 6,5 % de 2020-2025 y sale de volumen al ritmo del mercado (3,4-4 %) [26][41] más un 1,5-2,5 % de precio, que Viscofan repercute aunque con dos o tres trimestres de retraso (lo hizo tras 2022) [3][16]. La reinversión, al ROIC del 16,4 %, financia un 3,2 % anual, el volumen; el precio no pide capital, y el capital nuevo rinde un 16,4 %, menos que el 17,6 % incremental histórico. Foso estrecho pero real: escala y costes de cambio [4]. La cuota de envolturas pasaría de ≈ 20 % a ≈ 22,5 % (prueba a mano). La duda es el margen, no el crecimiento.',
};

// ── Síntesis: frase obligatoria del veredicto en «El negocio» ──
const r = d.resumen;
const partes = r.sintesis.split('\n\n');
const iN = partes.findIndex((p) => p.startsWith('**El negocio.**'));
if (iN < 0) throw new Error('No encuentro «El negocio» en la síntesis');
const o = { t: partes[iN] };
cambiar(o, 't', 'tardó dos años en recuperarse [3][16].', 'tardó dos años en recuperarse [3][16]. La calidad sí sostiene el crecimiento que proyectamos (4,9 % anual frente al 6,5 % de 2020-2025): volumen al ritmo del mercado, que la reinversión financia, más precio.');
partes[iN] = o.t;
// Recortes para no pasar de 650 palabras: la frase del veredicto ya cubre por qué no hay etapa de transición.
const iV = partes.findIndex((p) => p.startsWith('**Valoración.**'));
if (iV < 0) throw new Error('No encuentro «Valoración» en la síntesis');
const v = { t: partes[iV] };
cambiar(v, 't', ' Sin DCF en tres etapas: el mercado crece un 3,4-4 % [26][41] y la proyección ya converge a ese ritmo.', '');
cambiar(v, 't', 'por eso la convicción es baja, y los resultados de enero-septiembre prueban el margen, no cierran esa diferencia.', 'por eso la convicción es baja.');
partes[iV] = v.t;
r.sintesis = partes.join('\n\n');

// ── Nivel de compra: el motor actual (rejilla de precios con la asimetría, cambio posterior al 7-oct) lo da en
// 56,43 € en vez de 57,16 €, también recalculando datos-v3.json: no es efecto de esta actualización. ──
cambiar(r, 'sintesis', 'por debajo de 57,16 € es Comprar', 'por debajo de 56,43 € es Comprar');
r.cambiaria_recomendacion[0] = r.cambiaria_recomendacion[0].replace('por debajo de 57,16 € seguimos en Comprar; entre 57,16 € y 65,83 €', 'por debajo de 56,43 € seguimos en Comprar; entre 56,43 € y 65,83 €');
if (!r.cambiaria_recomendacion[0].includes('56,43')) throw new Error('No cambió el nivel en cambiaria_recomendacion[0]');

writeFileSync(new URL('datos-v4.json', dir), JSON.stringify(d, null, 2));
const palabras = r.sintesis.split(/\s+/).filter(Boolean).length;
console.log(`datos-v4.json escrito. Síntesis: ${palabras} palabras.`);
