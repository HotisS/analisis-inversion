// Actualización v2 de CAF (7 oct 2026): regla relativa (prima implícita del mercado) y DCF en tres etapas.
// No rehace la investigación: parte de datos.json, añade la referencia de mercado y etapa2, y reescribe
// los textos que citan la recomendación, el valor objetivo o los niveles. Escribe datos-v2.json.
//   node informes/caf-2026-10-06/notas/actualizacion-v2.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const dir = new URL('../', import.meta.url);
const d = JSON.parse(readFileSync(new URL('datos.json', dir), 'utf8'));
delete d.calc;

const cambiar = (obj, k, viejo, nuevo) => {
  if (typeof obj[k] !== 'string' || !obj[k].includes(viejo)) throw new Error(`No encuentro en ${k}: «${viejo.slice(0, 60)}…»`);
  obj[k] = obj[k].replace(viejo, nuevo);
};
// Sustituye desde un texto dado hasta el final del campo.
const desde = (obj, k, inicio, nuevo) => {
  const i = typeof obj[k] === 'string' ? obj[k].indexOf(inicio) : -1;
  if (i < 0) throw new Error(`No encuentro en ${k}: «${inicio}»`);
  obj[k] = obj[k].slice(0, i) + nuevo;
};

// ── Fuente y referencia de mercado ──
const idD = Math.max(...d.fuentes.map((f) => +f.id)) + 1;
if (idD !== 73) throw new Error(`Id esperado 73, sale ${idD}`);
d.fuentes.push({ id: idD, titulo: 'Implied Equity Risk Premiums by month (ERPbymonth.xlsx): prima implícita del S&P 500, octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' });
d.valoracion.referencia_mercado = { mercado: 'S&P 500, prima implícita de Damodaran (T12m con payout sostenible)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: `Damodaran, prima implícita mensual, octubre de 2026 [${idD}]` };

// ── DCF en tres etapas: no procede ──
d.dcf.etapa2 = { usar: false, anios: 10, margen_final_pct: null, justificacion: 'No procede. El ROIC de 2025 (13,6 %) supera al WACC (8,11 %) en solo 5,5 puntos, y en 2018-2023 estuvo entre el 5,9 % y el 9,7 %: lo sostienen los anticipos de clientes más que el margen. La proyección explícita ya cubre diez años (2026-2035) y converge al 2,5 % porque el mercado ferroviario mundial crece un 3,2 % anual (UNIFE) y el empuje de Solaris se agota [24, 26]. La cartera de 3,7 años de ventas [8] queda dentro de la proyección.' };

// ── Recomendación ──
const r = d.resumen;
r.recomendacion = 'Comprar';
r.conviccion = 'Baja';
r.justificacion_recomendacion = null;

r.sintesis = [
  `**La recomendación y por qué.** Comprar, con convicción baja y horizonte de 12 meses. Las dos reglas discrepan. Con nuestro WACC (8,11 %), el valor objetivo es de 84,06 EUR frente a 78,30 EUR: una rentabilidad total esperada del 9,3 % con el dividendo y una asimetría de 1,21x; la regla absoluta da Mantener. Con la prima que hoy descuenta el mercado (4,20 %) [${idD}], el WACC baja al 7,20 %, el objetivo sube a 97,98 EUR y la rentabilidad total al 27,1 % (asimetría de 2,65x): Comprar, y manda esta regla relativa. Es un Comprar solo relativo: CAF gana al mercado, pero con nuestra prima histórica (5,5 %) no llega al 15 %; con una beta de 0,94, si el mercado entero se abarata, caerá con él.`,
  `**El negocio.** CAF es un integrador de trenes de segundo nivel (≈ 1,5 % del mercado ferroviario mundial) con un fabricante de autobuses dentro, Solaris [1, 24]. Su ventaja es la cartera: 17.743 M a jun-26, 3,7 años de ventas [8]. El ROIC subió del 5,9-9,7 % de 2018-2023 al 13,6 % de 2025, por encima del WACC, pero lo sostiene la rotación más que el margen: el EBIT ferroviario sigue en el 5,2 %, frente al 8,8 % de Siemens Mobility [19].`,
  `**Finanzas.** El beneficio crece (BPA de 5,03 EUR en los últimos 12 meses), pero no se cobra: el FCF después de intereses y arrendamientos fue de −52,5, 16,9 y 4,6 M en 2023-2025, porque el circulante absorbe unos 21 céntimos por euro de ventas nuevas [1, 2, 3]. La deuda neta ajustada, con arrendamientos, factoring, la multa del CADE y el dividendo de julio, es de 531 M [6].`,
  `**Equipo y gobierno.** Ni suma ni resta mucho. Un bloque vasco y de empleados del 39,35 % hace improbable una OPA [6]. Puntos flojos: un 30 % de independientes, un presidente reelegido con un 17,59 % en contra y un incentivo ligado al EBIT, no a la caja [1, 37]. El margen del Plan 2026 (≥ 6,3 %) se quedó en el 5,5 % en 2025 [10].`,
  `**Valoración.** El DCF da 85,68 EUR; los escenarios ponderados, 83,86; los comparables, 90,84; la suma de partes, 67,18. CAF cotiza a 7,0x el EBITDA de los próximos 12 meses, en la mediana del sector (7,3x) [59]. El precio ofrece una rentabilidad implícita del 8,6 % anual, algo más que nuestro WACC y bastante más que el que pide el mercado (7,20 %); en crecimiento descuenta un 2,6 % anual frente a nuestro 4,4 %. Nuestras cifras están en el consenso o algo por debajo, y el objetivo medio de los analistas (69,22-73,95 EUR) queda bajo el precio [46, 48]: la discrepancia entre reglas es solo de tasa de descuento, y por eso la convicción es baja. Sin DCF en tres etapas: la proyección ya cubre diez años y el ROIC solo supera al WACC en 5,5 puntos desde 2025.`,
  `**Riesgos y catalizadores.** El riesgo dominante es el margen: cada punto de EBITDA vale ≈ 21 EUR por acción, y la cartera incluye grandes contratos a precio cerrado (SNCB, más de 1.700 M) [8]. El propio del Comprar relativo es el mercado: con una prima implícita por encima del 5 %, la regla vuelve a Mantener. Catalizadores: resultados de 9M26 (12-nov-2026) y el Plan Estratégico 2027-2030 del 4T26 [8].`,
  `**Qué cambiaría la decisión.** Con las dos reglas, por debajo de 86,50 EUR es Comprar y por encima de 110,62 EUR, Vender. Subiríamos la convicción si el plan 2027-2030 promete un margen EBIT por encima del 6,5 % con un objetivo de caja creíble y el 2S26 confirma un cash flow positivo. Volveríamos a Mantener si el margen EBIT ferroviario baja del 5 % o si el plan incluye una compra de más de 500 M con deuda.`,
].join('\n\n');

desde(r, 'tesis', 'Tampoco es una oportunidad.', `Con nuestro coste de capital no es una oportunidad: el DCF (85,68 EUR) solo supera el precio en un 9,4 %, y lo hace con un margen del 8,6 % que CAF no ha sostenido desde 2018 y con un circulante que debería dejar de crecer más que las ventas. Con la prima de riesgo que hoy pide el mercado (4,20 %) [${idD}], el objetivo es de 97,98 EUR: CAF es barata frente al mercado, no en términos absolutos. Para invertir hay que creer que el plan 2027-2030 convertirá la cartera en caja —la historia de 2022-2025 (FCF casi nulo) dice que hay que verlo [1]— y que el mercado no vuelve a pedir una prima de riesgo más alta.`);

cambiar(r.vision_diferencial, 'mercado_descuenta', 'muy cerca del coste del capital.', `muy cerca de nuestro coste del capital (8,11 %) y por encima del 7,20 % que resulta de la prima implícita del mercado [${idD}].`);
cambiar(r.vision_diferencial, 'nuestra_vision', 'Con eso, CAF vale 84-86 EUR, un 7-9 % más que hoy.', 'Con eso, y con nuestra prima de mercado del 5,5 %, CAF vale 84-86 EUR, un 7-9 % más que hoy; con la prima que hoy pide el mercado, 97,98 EUR.');
cambiar(r.vision_diferencial, 'por_que', 'eso lo veremos en el 4T26 y no hace falta pagarlo por adelantado.', 'eso lo veremos en el 4T26 y es lo que subiría la convicción de un Comprar que hoy solo es relativo.');

r.cambiaria_recomendacion = [
  'Precio: con las dos reglas combinadas, por debajo de 86,50 EUR seguimos en Comprar; entre 86,50 y 110,62 EUR, Mantener; por encima de 110,62 EUR, Vender (motor).',
  `Si la prima implícita del mercado sube por encima del 5 % (4,20 % en octubre de 2026) [${idD}], la regla relativa da Mantener al precio de hoy y pasaríamos a Mantener (motor).`,
  'Si el Plan 2027-2030 fija un margen EBIT ≥ 6,5 % en 2027-2028 y un objetivo de FCF, subiríamos la convicción.',
  'Si el margen EBIT ferroviario baja del 5,0 % en 9M26 o en el ejercicio 2026, o el cash flow de CAF de 2026 es negativo, revisaríamos el valor a la baja (≈ 21 EUR por punto de margen EBITDA; ≈ 6 EUR por la caja) y pasaríamos a Mantener.',
  'Si el plan anuncia una compra de más de 500 M financiada con deuda (DFN/EBITDA por encima de 1,5x), pasaríamos a Mantener.',
];

cambiar(d.dcf, 'lectura', 'medio punto por encima del WACC.', `medio punto por encima del WACC y 1,4 puntos por encima del 7,20 % que resulta de la prima implícita del mercado (4,20 %) [${idD}], con la que el DCF sube a 104,24 EUR.`);
cambiar(d.valoracion, 'comentario', 'quedan entre un 7 % y un 16 % por encima del precio.', `quedan entre un 7 % y un 16 % por encima del precio. Con la prima implícita del mercado (4,20 %) [${idD}], el DCF y los escenarios se recalculan con un WACC del 7,20 % y el valor objetivo sube a 97,98 EUR (+25,1 %).`);

writeFileSync(new URL('datos-v2.json', dir), JSON.stringify(d, null, 2));
const palabras = r.sintesis.split(/\s+/).filter(Boolean).length;
console.log(`datos-v2.json escrito. Fuente nueva [${idD}]. Síntesis: ${palabras} palabras.`);
