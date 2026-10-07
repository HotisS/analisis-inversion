// Actualización v2 de Enagás (7 oct 2026): regla relativa (prima implícita del mercado) y DCF en tres etapas.
// No rehace la investigación: parte de datos.json, añade la referencia de mercado y etapa2, y reescribe
// los textos que citan la recomendación, el valor objetivo o los niveles. Escribe datos-v2.json.
//   node informes/enagas-2026-10-07/notas/actualizacion-v2.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const dir = new URL('../', import.meta.url);
const d = JSON.parse(readFileSync(new URL('datos.json', dir), 'utf8'));
delete d.calc;

const cambiar = (obj, k, viejo, nuevo) => {
  if (typeof obj[k] !== 'string' || !obj[k].includes(viejo)) throw new Error(`No encuentro en ${k}: «${viejo.slice(0, 60)}…»`);
  obj[k] = obj[k].replace(viejo, nuevo);
};

// ── Fuente y referencia de mercado ──
const idD = Math.max(...d.fuentes.map((f) => +f.id)) + 1;
if (idD !== 83) throw new Error(`Id esperado 83, sale ${idD}`);
d.fuentes.push({ id: idD, titulo: 'Implied Equity Risk Premiums by month (ERPbymonth.xlsx): prima implícita del S&P 500, octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' });
d.valoracion.referencia_mercado = { mercado: 'S&P 500, prima implícita de Damodaran (T12m con payout sostenible)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: `Damodaran, prima implícita mensual, octubre de 2026 [${idD}]` };

// ── DCF en tres etapas: no procede ──
d.dcf.etapa2 = { usar: false, anios: 10, margen_final_pct: null, justificacion: 'No procede. El ROIC sin participadas (4,1 % en 2025) está por debajo del WACC (5,63 %): crecer no crea valor. Además, la RAB de gas baja de ≈ 3.100 M en 2024 a ≈ 2.100 M en 2030 [9] y la CNMC prevé que la retribución del sector baje un 2 % entre 2027 y 2032 [23]: no hay crecimiento que alargar.' };

// ── Recomendación ──
const r = d.resumen;
r.recomendacion = 'Mantener';
r.conviccion = 'Baja';
r.justificacion_recomendacion = null;

r.sintesis = [
  `**La recomendación y por qué.** Mantener, con convicción baja. Las dos reglas discrepan. Con nuestro WACC (5,63 %), el valor objetivo es de 13,97 EUR frente a 16,22 EUR: una rentabilidad total esperada del −7,7 % con el dividendo del 6,2 % y una asimetría de 0,27x; la regla absoluta da Vender. Con la prima que hoy descuenta el mercado (4,20 %) [${idD}], el WACC solo baja al 5,30 %, porque la beta es de 0,68: el objetivo sube a 14,66 EUR, la rentabilidad total al −3,5 % y la asimetría a 0,54x; la regla relativa, que manda, da Mantener. Es un Vender solo absoluto: Enagás está cara, pero no tanto como para venderla frente al mercado. Y el Mantener cuelga de un hilo: la asimetría roza el umbral de venta (0,5).`,
  `**El negocio.** Enagás es un monopolio legal: el 85,5 % de la retribución del transporte de gas en España y el 53,9 % de la regasificación [22, 23]. Esa posición no se traduce en rentabilidad: el ROIC sin participadas fue del 4,1 % en 2025, frente a un WACC del 5,63 %. La retribución la fija la CNMC sobre una RAB de gas que baja de ≈ 3.100 M en 2024 a ≈ 2.100 M en 2030 [9].`,
  `**Regulación.** El marco de 2027-2032 ya está en el BOE: la tasa de retribución financiera sube del 5,44 % al 6,46 % desde el 1-oct-2026 [74] y la retribución del sector pasa de 883 M a 961 M en 2027, para bajar a 940 M en 2032 [23]. No es una sorpresa: Enagás ya usaba ≈ 6,5 % desde 2027 [8] y el consenso espera un EBITDA de 724 M en 2027e (+16 %) [52].`,
  `**Finanzas.** El EBITDA sin participadas cayó de 683 M en 2021 a 520 M en 2025. La deuda neta es de 2.305 M (4,6x el EBITDA) y de 2.789 M con los ajustes; sube a ≈ 2.900 M con Teréga [6, 16]. Rating BBB+ estable y FFO / deuda neta del 27,4 % [6].`,
  `**Gobierno.** La ley limita a cualquier accionista al 5 % del capital y al 3 % del voto: no hay prima de control posible [15]. El historial resta: el suelo de dividendo de 1,74 EUR del plan de 2022 se rompió en 2024 (1,00 EUR) [9, 46].`,
  `**Valoración.** El DCF da 13,13 EUR (14,03 con la prima del mercado) y los comparables 16,22 EUR (9,5x el EBITDA de los próximos 12 meses frente a una mediana de 10,0x). El precio descuenta una rentabilidad del 4,6 % anual, por debajo de nuestro WACC y del que pide el mercado (5,30 %); con nuestro WACC exigiría crecer un 2,9 % anual frente al 0,3 % de nuestro caso. Nuestras cifras de explotación coinciden con el consenso: la diferencia es solo la tasa de descuento. Sin DCF en tres etapas: el ROIC no llega al WACC.`,
  `**Riesgos y catalizadores.** Al alza, que los tipos bajen: cada 0,5 pp de WACC mueve ≈ 1,2-1,4 EUR por acción. A la baja, el hidrógeno (plan del 1S27) y el dividendo más allá de 2026 (≈ 0,77 EUR con el 40 % del FFO) [9]; y el mercado: con una prima implícita del 4,4 %, la regla relativa ya da Vender. Catalizadores: resultados de 9M26 a finales de octubre, cobro de 129 M de Castor en el 4T26 y anulación del laudo de GSP en el 1S27.`,
  `**Qué cambiaría la decisión.** Con las dos reglas, compraríamos por debajo de 13,61 EUR y venderíamos por encima de 16,41 EUR. Pasaríamos a Vender si la prima implícita del mercado sube al 4,4 %. Subiríamos la convicción si el bono a 10 años baja del 3,6 %, si la empresa fija un dividendo de 1,00 EUR para 2027-2030 cubierto por el FFO o si el hidrógeno recibe una retribución por encima del 7 %.`,
].join('\n\n');

r.tesis = r.tesis.trimEnd() + ` Con la prima de riesgo que hoy pide el mercado (4,20 %) [${idD}], el objetivo es de 14,66 EUR (−9,6 %): frente al mercado, Enagás no es una venta, pero tampoco una compra, y el Mantener se apoya en el dividendo del 6,2 %.`;

r.vision_diferencial.nuestra_vision = r.vision_diferencial.nuestra_vision.trimEnd() + ` Con la prima que hoy pide el mercado (4,20 %) [${idD}], la exigencia baja al 5,3 % y el DCF sube a 14,03 EUR: sigue por debajo del precio, aunque no lo bastante para vender.`;

r.cambiaria_recomendacion = [
  'Precio: con las dos reglas combinadas, por debajo de 13,61 EUR pasaríamos a Comprar; entre 13,61 y 16,41 EUR, Mantener; por encima de 16,41 EUR (un 1,2 % sobre el precio actual), Vender (motor).',
  `Si la prima implícita del mercado sube al 4,4 % o más (4,20 % en octubre de 2026) [${idD}], la regla relativa da Vender al precio de hoy y pasaríamos a Vender (motor).`,
  'Si el bono español a 10 años baja del 3,6 % (el DCF con un WACC 0,5 pp menor da ≈ 14,5 EUR), subiríamos la convicción del Mantener.',
  'Si Enagás compromete un dividendo de 1,00 EUR para 2027-2030 cubierto por el FFO, subiríamos la convicción del Mantener.',
  'Si el hidrógeno recibe un marco retributivo con una tasa por encima del 7 % antes de la decisión de inversión de finales de 2027, revisaríamos el alcista y la recomendación.',
];

cambiar(d.dcf, 'lectura', 'Con un WACC del 4,6 %, el DCF daría 16,31 EUR, el precio actual.', `Con un WACC del 4,6 %, el DCF daría 16,31 EUR, el precio actual. Con la prima implícita del mercado (4,20 %) [${idD}], el WACC es del 5,30 % (la beta de 0,68 amortigua el cambio) y el DCF, de 14,03 EUR.`);
cambiar(d.valoracion, 'comentario', 'la diferencia es la tasa de descuento.', `la diferencia es la tasa de descuento. Con la prima implícita del mercado (4,20 %) [${idD}], el valor objetivo es de 14,66 EUR (−9,6 %).`);

writeFileSync(new URL('datos-v2.json', dir), JSON.stringify(d, null, 2));
const palabras = r.sintesis.split(/\s+/).filter(Boolean).length;
console.log(`datos-v2.json escrito. Fuente nueva [${idD}]. Síntesis: ${palabras} palabras.`);
