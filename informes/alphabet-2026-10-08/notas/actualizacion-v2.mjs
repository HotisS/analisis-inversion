// actualizacion-v2.mjs — Alphabet v2: prueba de sostenibilidad del crecimiento (metodología del 10-oct-2026).
// Sin investigación nueva: parte de datos.json, borra calc y añade `dcf.sostenibilidad` con lo que ya estaba en el
// informe (10-K 2025, 10-Q y comunicado del 2T26, transcripción, WARC, Synergy). Es una actualización de método:
// no cambia supuestos del DCF, ni precio, ni fecha de corte.
// Escribe datos-v2.json; después:
//   node motor/calcular-empresa.mjs --datos informes/alphabet-2026-10-08/datos-v2.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos.json'), 'utf8'));
delete d.calc;

// 1. Prueba de sostenibilidad. Reparto volumen/precio a nivel de grupo: estimación propia con los KPI publicados
//    (clics de pago, coste por clic, impresiones de Network, crecimiento de Cloud) y el paso de crecimiento publicado
//    a orgánico del 2T26 (24,2 % frente a 23 %: divisa y Wiz).
// mercado_final = null: competencia.cuota_pct (24,8 %) es publicidad de Alphabet sobre el gasto publicitario mundial,
// y los ingresos del DCF incluyen Cloud, suscripciones y dispositivos (27 % en 2025): no hay perímetro comparable.
// La prueba de cuota se hace a mano en la justificación.
d.dcf.sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 18.5, precio_pct: 3.5, otros_pct: 1.5,
      comentario: 'Volumen: clics de pago de Search +13 % y Cloud +82 % en el 2T26, con capacidad nueva; precio: coste por clic +3 % y coste por impresión de Network +13 %; otros: divisa y Wiz (crecimiento publicado del 24,2 % frente al 23 % orgánico en el 2T26). Reparto a nivel de grupo, estimación propia [2, 3].' },
    { periodo: '2027e', volumen_pct: 16.5, precio_pct: 3, otros_pct: 0.5,
      comentario: 'Volumen sobre todo de Cloud: algo más de la mitad de la cartera de 514.000 M se reconoce en 24 meses, unos 130.000 M al año; precio, el coste por clic al ritmo de 2025-2026 (+3 % a +7 %) [1, 3, 35].' },
    { periodo: '2028e', volumen_pct: 13, precio_pct: 3, otros_pct: 0,
      comentario: 'Search compara con la aceleración de 2025-2026 y Network sigue cayendo en impresiones (−12 % en el 2T26); el consenso da +19,3 % [2, 75].' },
    { periodo: '2029e', volumen_pct: 11, precio_pct: 3, otros_pct: 0,
      comentario: 'Converge hacia la publicidad mundial (+6,3 % anual previsto) más el peso creciente de la nube [27, 28].' },
  ],
  mercado_final: null,
  veredicto: 'Sí',
  justificacion: 'Sí. Foso: la intención de búsqueda (89,9 % de cuota mundial) más modelos y chips propios; poder de precios: coste por clic +7 % en 2025; y la publicidad creció incluso en 2020 y 2022 [1, 8, 9, 15]. La reinversión, el 49 % del NOPAT, financiaría al ROIC del 37,7 % un 18,6 % frente al 13,1 % proyectado, y el capital nuevo solo tiene que rendir un 20,2 %, la mitad del histórico. La cuota se prueba a mano: con la publicidad en el 24,8 % de un mercado al +6,3 % anual, Cloud y el resto deben crecer un 22 % anual hasta 2035, frente al 37 % de Cloud en 2019-2025 [1, 7, 27]. La duda es el rendimiento del capex, no el crecimiento.',
};

// 2. Textos que cambian: la frase del veredicto en «El negocio», la convicción (el control nuevo «Convicción frente a
//    la sugerida» da Media; se mantiene Baja y se explica) y el nivel de compra, que el motor actual calcula en 241,37
//    (antes 245,16) con los mismos supuestos.
const sustituir = (texto, viejo, nuevo) => {
  if (!texto.includes(viejo)) throw new Error(`No encuentro: ${viejo.slice(0, 60)}`);
  return texto.replace(viejo, nuevo);
};
let s = d.resumen.sintesis;
s = sustituir(s, 'que bajó del 88,0 % al 85,2 % en dos años [15].',
  'que bajó del 88,0 % al 85,2 % en dos años [15]. La calidad sí sostiene el crecimiento que proyectamos: la reinversión neta prevista, el 49 % del NOPAT, financiaría al ROIC actual un 18,6 % anual frente al 13,1 % del caso base, que solo pide al capital nuevo un 20,2 %, la mitad de lo que ha rendido; la duda no es si Alphabet puede crecer, sino cuánto rendirá la inversión en IA, y eso es lo que el precio ya paga.');
s = sustituir(s, 'Por eso la convicción es baja.',
  'Por eso la convicción es baja, un escalón por debajo de la media que dan los criterios: el precio pide 4,7 puntos más de crecimiento que nuestro base, pero el Vender depende del WACC y de un capex cuyo rendimiento aún no se ve en la caja, con 57 de 62 analistas en comprar [75]. La subiría que el margen operativo de Cloud baje del 35 % al entrar la capacidad nueva; la bajaría que el flujo libre vuelva a crecer en el 3T26 y el 4T26 con el capex dentro de la guía.');
s = sustituir(s, 'Compraríamos por debajo de 245,16 USD y mantendríamos entre 245,16 y 313,65.',
  'Compraríamos por debajo de 241,37 USD y mantendríamos entre 241,37 y 313,65.');
d.resumen.sintesis = s;
d.resumen.cambiaria_recomendacion[0] = sustituir(d.resumen.cambiaria_recomendacion[0], '245,16', '241,37');

writeFileSync(join(dir, 'datos-v2.json'), JSON.stringify(d, null, 2));
console.log('datos-v2.json escrito.');
