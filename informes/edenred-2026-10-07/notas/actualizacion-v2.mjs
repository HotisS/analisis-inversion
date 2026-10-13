// actualizacion-v2.mjs — Edenred v2: sostenibilidad del crecimiento (metodología del 10-oct-2026, `dcf.sostenibilidad`).
// Sin investigación nueva: parte de datos.json, borra calc y añade la prueba con datos que ya estaban en el informe.
// - Puente de ingresos 2026e-2029e: separa el crecimiento «intrínseco» de los ingresos operativos (volumen de negocio a
//   comisión media constante: usuarios, comercios, valor facial), la regulación de comisiones (precio) y el other revenue
//   (rendimiento del float) y la divisa (otros). Las contribuciones se ponderan por el peso de los ingresos operativos en el
//   total del año anterior (92-93 %), con los motores de supuestos.mjs (ingresos operativos y other revenue).
// - Mercado final: null. La cuota de competencia.cuota_pct (35 %) es la de títulos restaurante en Francia (valor facial,
//   punto medio del 30-40 % de la Autoridad de la Competencia [14]); los ingresos del DCF son los del grupo (44 países,
//   Mobility incluido). Expresar el mercado francés a la comisión media de Edenred (≈5,6 % del volumen) daría una cuota
//   de varios cientos por cien: no hay perímetro comparable (lección de Grifols/Puig). No hay estadística global del
//   volumen del sector [1]. La prueba de cuota se hace a mano en la justificación (volumen de negocio frente a Pluxee y
//   al mercado potencial que publica la empresa).
// - Reinversión: el circulante es negativo (−30 % de las ventas sin float) y el capex converge a la amortización: la
//   reinversión neta es negativa y la prueba es el poder de precios y la cuota (activos ligeros). El ROIC del motor
//   (130,8 %) no tiene sentido con capital invertido casi nulo; el operativo con el float como pasivo es ≈21 % (estimación propia).
// - Veredicto «En parte»: el volumen se sostiene; el precio no está en manos de Edenred. El caso base ya crece por debajo del
//   intrínseco (6-7 % frente al 8 %) y el bajista (30 %) recoge un tope francés. No se tocan supuestos del DCF: la prueba no
//   pide un crecimiento financiable ni una cuota (activos ligeros, sin mercado comparable), y la síntesis explica por qué el
//   base no baja más. Mismo precio y fecha de corte.
// Escribe datos-v2.json; después:
//   node motor/calcular-empresa.mjs --datos informes/edenred-2026-10-07/datos-v2.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos.json'), 'utf8'));
delete d.calc;

const crec = Object.fromEntries(d.dcf.anios.map((a) => [a.periodo, a.crecimiento_pct]));

d.dcf.sostenibilidad = {
  puente_ingresos: [
    {
      periodo: '2026e', volumen_pct: 7.4, precio_pct: -6.0, otros_pct: -0.1,
      comentario: 'Ingresos operativos +2,1 %: crecimiento intrínseco del 8,0 % del 1S26 (volumen de negocio a comisión media constante) menos 6,5 puntos de los topes de Italia y Brasil [6, 7]; ponderados por su 92 % del total. Otros: el other revenue baja de 229 a ≈210 M por los tipos y el plazo de 15 días en Brasil (−0,6 puntos), compensado en parte por divisa y perímetro (+0,5) [6]. Reparto, estimación propia.',
    },
    {
      periodo: '2027e', volumen_pct: 6.5, precio_pct: -0.9, otros_pct: -0.1,
      comentario: 'Ingresos operativos +6,0 %: volumen al 7 %, algo por debajo del intrínseco del 8,0 % [6], y un punto de precio porque el tope brasileño aún resta enero y febrero frente a 2026 [13]. Other revenue plano: más float con un rendimiento que baja del 5,0 % implícito al 4,3 % (estimación propia).',
    },
    {
      periodo: '2028e', volumen_pct: 6.5, precio_pct: 0, otros_pct: 0,
      comentario: 'Ingresos operativos +7,0 %, todo volumen: empleo formal, penetración en pymes (más de 700.000 usuarios nuevos en 2025) y valores faciales ligados al IPC (más del 50 % del volumen de comidas los sube en 2026) [1, 12]. Precio sin cambios: supone que la ley francesa sale sin tope, como la propuesta actual [15].',
    },
    {
      periodo: '2029e', volumen_pct: 6.1, precio_pct: 0, otros_pct: 0.1,
      comentario: 'Ingresos operativos +6,5 %, en la banda del 5-7 % que la empresa prevé para su mercado atendido [1]; el rendimiento del float baja al 3,8 % y lo compensa el mayor float.',
    },
  ],
  mercado_final: null,
  veredicto: 'En parte',
  justificacion: 'En parte. El volumen se sostiene: 49.000 M de volumen de negocio en 2025 (+9 %), el doble que Pluxee, con una penetración inferior al 40 % en sus mercados históricos y volúmenes de comidas en Brasil e Italia por encima del +10 % en el 1S26 pese a los topes [1, 6, 21]. La reinversión no es la prueba: el circulante negativo financia el crecimiento. El precio, en cambio, no depende de Edenred: tres reguladores han actuado en dos años y la comisión media ya bajaba antes (volumen +9 % frente a ingresos +6,2 % en 2025) [1, 13, 19]. El foso es estrecho y se estrecha. No hay perímetro comparable para la cuota: la del 35 % es solo Francia [14].',
};

// Comprobación local del puente (el motor lo vuelve a comprobar con ±1 punto).
for (const p of d.dcf.sostenibilidad.puente_ingresos) {
  const s = p.volumen_pct + p.precio_pct + p.otros_pct;
  if (Math.abs(s - crec[p.periodo]) > 1) throw new Error(`Puente ${p.periodo}: ${s} frente a ${crec[p.periodo]}`);
}

// Textos: la frase obligatoria del veredicto en «El negocio» de la síntesis.
const viejo = 'El foso es estrecho y se estrecha: tres reguladores han actuado sobre las comisiones en dos años.';
const nuevo = 'El foso es estrecho y se estrecha: tres reguladores han actuado sobre las comisiones en dos años. **¿Sostiene la calidad el crecimiento que proyectamos? En parte**: el volumen sí (penetración inferior al 40 %, volumen de negocio +9 % en 2025, doble que Pluxee), porque el circulante negativo lo financia sin capital; el precio no, porque lo fija en parte el regulador. No bajamos más el base porque ya crece por debajo del intrínseco (6-7 % frente al 8,0 % [6]), supone la comisión constante y no la sube, y el tope francés está en el bajista, con un 30 % de probabilidad.';
if (!d.resumen.sintesis.includes(viejo)) throw new Error('No encuentro la frase del foso en la síntesis');
d.resumen.sintesis = d.resumen.sintesis.replace(viejo, nuevo);

// El control nuevo «Convicción frente a la sugerida» pide «Alta» (dos reglas en Comprar, RTE del 57,7 %, asimetría de
// 7,40x). Se mantiene «Media» y se explica: el veredicto de sostenibilidad es «En parte» (el precio lo fija el regulador)
// y el valor depende de dos decisiones de método, el float (11,96 EUR por acción) y la beta (41,80-55,06 EUR).
const vConv = 'La razón: el precio descuenta que la regulación se coma el crecimiento de una década, cuando el golpe de Italia y Brasil ya está en el EBITDA de 2026.';
const nConv = `${vConv} La convicción es media y no alta, como sugieren los criterios, por tres motivos: la calidad sostiene el volumen pero no el precio (veredicto «En parte», abajo), el valor depende del trato del float (11,96 EUR por acción) y de la beta (41,80-55,06 EUR), y la ley francesa llega a la Asamblea el 12-oct [15]. Subiría la convicción una ley francesa sin tope y una guía de 2027 dentro del +8-12 %; la bajaría un tope francés.`;
if (!d.resumen.sintesis.includes(vConv)) throw new Error('No encuentro la frase de la razón en la síntesis');
d.resumen.sintesis = d.resumen.sintesis.replace(vConv, nConv);

// Niveles: el motor actual da «Comprar por debajo» de 41,46 EUR (v1: 48,17) con las mismas cifras; vender sigue en 61,60.
const vNiv = 'Comprar por debajo de 48,17 EUR y vender por encima de 61,60.';
if (!d.resumen.sintesis.includes(vNiv)) throw new Error('No encuentro los niveles en la síntesis');
d.resumen.sintesis = d.resumen.sintesis.replace(vNiv, 'Comprar por debajo de 41,46 EUR y vender por encima de 61,60.');

writeFileSync(join(dir, 'datos-v2.json'), JSON.stringify(d, null, 2));
console.log('datos-v2.json escrito (dcf.sostenibilidad: En parte; síntesis con la frase del veredicto).');
