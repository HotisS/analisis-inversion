// Actualización v4 de Indra (13 oct 2026): sostenibilidad del crecimiento (`dcf.sostenibilidad`, metodología del 10-oct)
// y, como la prueba falla, caso base rebajado al crecimiento financiable (lectura prudente, decisión del usuario del 13-oct).
// Sin investigación nueva: parte de datos-v3.json, borra calc, añade la prueba, ajusta capex y crecimiento del DCF y
// reescribe los textos con cifras. Mismo precio (59,72 €) y fecha de corte (6-oct-2026). Escribe datos-v4.json.
//   node informes/indra-2026-10-06/notas/actualizacion-v4.mjs
//   node motor/calcular-empresa.mjs --datos informes/indra-2026-10-06/datos-v4.json
//
// Prueba con los supuestos de v3: crecimiento medio proyectado del 10,1 % frente a un financiable del 3,4 % (reinversión
// del 18 % del NOPAT al ROIC del 18,5 %) y capital nuevo que rinde un 53,7 % frente al 29,1 % permitido (1,25 × 23,3 %).
// Bajar solo el crecimiento no lo arregla: el circulante (12 % de las ventas) baja con él y el rendimiento del capital
// nuevo apenas se mueve (51 % con 2027e-2032e al 5-2,5 %). Por eso el recorte tiene dos partes:
//  1. Reinversión (más fiel al negocio): el capex bajaba del 5,0 % al 4,1 % en 2029e, pero en el 1S26 fue de 205 M,
//     ≈ 6 % de las ventas, por las fábricas de vehículos y los satélites [6], y el propio informe dice que «el ROIC de
//     2026-2027 será menor aunque el margen suba». Capex del 6 % en 2026e-2029e (ritmo del 1S26 mientras se entregan los
//     PEM), 5,5 % en 2030e y 4,5 % en 2031e; 2032e sigue en el 3,8 %, así que el terminal no cambia.
//  2. Crecimiento, sobre todo al final: 2026e (+29 %, guía) y 2027e (+10 %, cartera) no se tocan; 2028e 10 → 8 %,
//     2029e 8 → 5 %, 2030e 6 → 3,5 %, 2031e 4,5 → 3 %, 2032e 3 → 2,5 % (el terminal).
// Con eso el capital nuevo rinde ≤ 1,25 veces el incremental histórico (el control pasa) y el crecimiento de 2027e-2032e
// queda por debajo del financiable; 2026e se explica por compras ya pagadas (en el capital de 2025) y la guía.
import { readFileSync, writeFileSync } from 'node:fs';

const dir = new URL('../', import.meta.url);
const d = JSON.parse(readFileSync(new URL('datos-v3.json', dir), 'utf8'));
delete d.calc;

const cambiar = (obj, k, viejo, nuevo) => {
  if (typeof obj[k] !== 'string' || !obj[k].includes(viejo)) throw new Error(`No encuentro en ${k}: «${viejo.slice(0, 60)}…»`);
  obj[k] = obj[k].replace(viejo, nuevo);
};

// ── 1. Supuestos del DCF (recorte mínimo) ──
const SUP = {
  '2026e': { capex_pct_ventas: 6 },
  '2027e': { capex_pct_ventas: 6 },
  '2028e': { capex_pct_ventas: 6, crecimiento_pct: 8 },
  '2029e': { capex_pct_ventas: 6, crecimiento_pct: 5 },
  '2030e': { capex_pct_ventas: 5.5, crecimiento_pct: 3.5 },
  '2031e': { capex_pct_ventas: 4.5, crecimiento_pct: 3 },
  '2032e': { crecimiento_pct: 2.5 },
};
for (const [p, o] of Object.entries(SUP)) {
  const a = d.dcf.anios.find((x) => x.periodo === p);
  if (!a) throw new Error(`Falta ${p}`);
  Object.assign(a, o);
}

// ── 2. Prueba de sostenibilidad ──
d.dcf.sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 18.5, precio_pct: 1, otros_pct: 9.5, comentario: 'Guía de más de 7.000 M [1, 8]. Un tercio es compra: Hispasat e Hisdesat (277 M anuales) y TESS todo el año; en el 1S26 las compras aportaron 377 M y el orgánico fue del 16 % [1, 8]. Volumen: ejecución de la cartera (20.533 M, 3,3 veces las ventas) y de los PEM [8]. Precio: Indra no lo publica; un punto, con la revisión de precios en defensa compensada por la presión de la IA en Minsait (reparto, estimación propia) [7].' },
    { periodo: '2027e', volumen_pct: 10, precio_pct: 1, otros_pct: -1, comentario: 'Cartera: Defensa explica 8.364 M del aumento de 2025 y el book-to-bill fue de 1,58 veces en el 1S26 [1, 8]. Otros: la venta de BPO y de Minsait Business Consulting [8]. El consenso da +10,7 % [23].' },
    { periodo: '2028e', volumen_pct: 7, precio_pct: 1, otros_pct: 0, comentario: 'Siguen las entregas de los PEM y de los vehículos de TESS; por debajo del +12,4 % del consenso [23] porque Minsait crece poco [7].' },
    { periodo: '2029e', volumen_pct: 4, precio_pct: 1, otros_pct: 0, comentario: 'Pasado el pico de entregas: España se comprometió a las capacidades de la OTAN con menos gasto [1] y la cartera actual se ejecuta en cinco o seis años.' },
  ],
  // competencia.cuota_pct es null (hueco del informe: Indra no publica cuotas y no hay cuotas verificables por contratista
  // en España), así que no hay perímetro comparable para la cuota implícita.
  mercado_final: null,
  veredicto: 'En parte',
  justificacion: 'En parte. El foso es institucional (contratista nacional; el Estado es cliente, financiador y accionista) y el ROIC (18,5 % en 2025, 22,8 % en 2024) dobla el WACC [1], pero no hay poder de precios demostrado: el margen sube por mezcla, no por precio [14]. La v3 pedía un 10,1 % anual con una reinversión que solo financiaba un 3,4 % y un capital nuevo al 53,7 %. El base de la v4 sube el capex al ritmo del 1S26 (6 % de las ventas) [6] y crece un 5,3 % anual en 2027e-2032e, por debajo del 5,6 % financiable; el capital nuevo rinde un 28,9 %, dentro de 1,25 veces el incremental (23,3 %). El +29 % de 2026e es guía y un tercio son compras ya pagadas [1, 8]. Cuota: sin dato publicado.',
};

// ── 3. Escenario base: la narrativa describe el nuevo base (los desplazamientos no cambian) ──
d.escenarios.casos.find((c) => c.escenario === 'Base').narrativa = 'Se cumple la guía de 2026 y la cartera da un +10 % en 2027; después Indra crece lo que su reinversión puede financiar (8 %, 5 % y 3,5 % en 2028-2030), con un capex del 6 % de las ventas hasta 2029 por las fábricas y los satélites [6] y un margen EBITDA que llega al 15 % en 2029 por la mezcla hacia Defensa y Espacio.';

// ── 4. Recomendación y textos con cifras (de calc, tal cual) ──
const r = d.resumen;
r.recomendacion = 'Mantener';
r.conviccion = 'Baja';
r.justificacion_recomendacion = null;

r.sintesis = [
  `**La recomendación y por qué.** Mantener, ahora con convicción baja. El caso base ya solo crece lo que Indra puede financiar, y el valor objetivo baja a 54,54 €, un 8,7 % por debajo del precio de 59,72 € (rentabilidad total esperada del −8,2 %, asimetría de 0,20 veces). Con nuestro WACC (9,11 %) la regla da Vender; con la prima que hoy descuenta el mercado (4,20 %) [44], el WACC baja al 7,98 %, el objetivo sube a 61,54 € y la rentabilidad total al 3,5 %: Mantener, que manda. La convicción es baja porque las dos reglas discrepan; subiría con un FCF sin PEM que confirme la guía y más contratación en 2027, y bajaría si el capex sigue al 6 % sin pedidos nuevos.`,
  `**El negocio.** Indra es el contratista tecnológico de referencia de la defensa española: cartera de 20.533 M, 3,3 veces las ventas [8], con Defensa y Espacio en el 59 % del EBIT del 1S26 [7]. Defensa y Espacio ganan un 20,9 % y un 40,5 % de margen EBITDA, frente al 8,1 % de Minsait [14]. El ROIC (18,5 %) dobla el WACC y el foso es institucional: el Estado es cliente, financiador y primer accionista (SEPI, 28 %) [1]. ¿Sostiene su calidad el crecimiento que proyectábamos? Solo en parte: la reinversión del base (31 % del NOPAT, con un capex del 6 % de las ventas hasta 2029 [6]) financia un 5,6 % anual, no el 10 % de antes. Por eso crecemos un 8 %, 5 %, 3,5 %, 3 % y 2,5 % en 2028-2032; el +29 % de 2026 es guía y un tercio son compras [1, 8].`,
  `**Sector y ciclo.** Es un ciclo de rearme, no económico: el gasto español en defensa pasó del 1,43 % al 2,0 % del PIB en dos años [35], con objetivos hasta 2035 [1]. No lo alargamos: España se comprometió a menos gasto que la OTAN [1], la cartera se ejecuta en cinco o seis años y Minsait no tiene ese recorrido [7].`,
  `**Finanzas.** El FCF del 1S26 fue de 1.487 M reportados y de 15 M sin anticipos PEM [6]: la caja neta contable de 846 M es una deuda neta ajustada de 695 M, sobre todo por 1.472 M de anticipos PEM a devolver [5].`,
  `**Equipo y gobierno.** Restan: tres presidentes y dos consejeros delegados en dieciocho meses [5, 16], operaciones vinculadas (856 M facturados al Estado y el conflicto con EM&E) [1, 39] y un voto de remuneraciones del 59,9 % [16].`,
  `**Valoración.** El DCF (35 %) da 50,19 € y los escenarios (25 %), 48,97 €; los comparables (25 %), 66,39 €; la suma de partes (15 %), 54,23 €. El precio ofrece una rentabilidad implícita del 8,2 % (con el WACC del mercado, el DCF da 62,08 €) y descuenta un crecimiento del 12,5 % anual hasta 2032 (8,7 % el nuestro). Discrepamos del consenso (objetivo medio de 67,12 €) [43] en el crecimiento desde 2028 (8 % frente a 12,4 %) y en el margen de 2028 (14,7 % frente a 15,2 %) [23].`,
  `**Riesgos y catalizadores.** El mayor riesgo son el presupuesto y los PEM: si se retrasan o se reparten (Santa Bárbara los ha recurrido ante el Supremo [1]), el bajista vale 29,72 € (−50,2 %). Catalizadores: los resultados de 9M26 a finales de octubre, que exigen unos 360 M de FCF sin PEM en el segundo semestre [8], y el plan estratégico (4T26-1T27), con la decisión sobre Minsait.`,
  `**Qué cambiaría la decisión.** Con las dos reglas, compraríamos por debajo de 52,19 € y venderíamos por encima de 66,16 €. Un FCF sin PEM de 2026 inferior a 250 M nos llevaría a rebajar el valor; una venta de Minsait por encima de 8 veces el EBITDA lo subiría, y más pedidos de Defensa en 2027 con menos capex, el crecimiento de 2028-2030.`,
].join('\n\n');

cambiar(r, 'tesis', 'El DCF inverso implica un crecimiento de las ventas del 11,1 % anual hasta 2032 y un margen final del 15,5 %, es decir, que se cumple el consenso hasta 2028 y que el ciclo no se agota [23].', 'El DCF inverso implica un crecimiento de las ventas del 12,5 % anual hasta 2032 y un margen final del 16,7 %, es decir, que se cumple el consenso hasta 2028 y que después Indra sigue creciendo cerca de un 9 % al año [23].');
cambiar(r, 'tesis', `Nuestro valor objetivo es de 58,59 € (−1,9 %), con métodos entre 54 € (suma de partes) y 66 € (comparables); con la prima de riesgo que hoy pide el mercado (4,20 %) [44], sería de 66,22 € (+10,9 %).`, `Nuestro valor objetivo es de 54,54 € (−8,7 %), con métodos entre 49 € (escenarios) y 66 € (comparables): el caso base crece solo lo que Indra puede financiar con su reinversión (un 5,3 % anual en 2027-2032). Con la prima de riesgo que hoy pide el mercado (4,20 %) [44], sería de 61,54 € (+3,0 %).`);
cambiar(r, 'tesis', 'Con nuestro WACC la asimetría (+23,8 % frente a −42,0 %) no compensa; con el del mercado, sí (1,70 veces), pero la rentabilidad total esperada del 11,4 % no llega al 15 %.', 'La asimetría no compensa ni con nuestro WACC (+10,1 % frente a −50,2 %) ni con el del mercado (0,90 veces), y la rentabilidad total esperada con la prima del mercado (3,5 %) queda lejos del 15 %.');

r.vision_diferencial.nuestra_vision = 'Coincidimos con el crecimiento hasta 2027, no después: desde 2028 proyectamos lo que la reinversión de Indra puede financiar (8 % en 2028 frente al +12,4 % del consenso, y un 5,3 % anual en 2027-2032) [23]. Vemos además menos margen en 2028 (14,7 % frente a 15,2 %) por TESS y Movilidad, y una caja neta que en realidad es una deuda neta ajustada de 695 M una vez sumados los anticipos PEM y los demás pasivos asimilables (motor).';
cambiar(r.vision_diferencial, 'por_que', 'El mercado no siempre hace ese ajuste en los múltiplos de valor empresa.', 'El mercado no siempre hace ese ajuste en los múltiplos de valor empresa. Y la reinversión de nuestro base (31 % del NOPAT, con un capex del 6 % de las ventas hasta 2029 [6]) financia un 5,6 % anual al ROIC de 2025: crecer como el consenso exigiría que el capital nuevo rindiera bastante más que el histórico.');

r.en_contra[4] = '**Asimetría desfavorable**: el bajista pierde un 50,2 % y el alcista gana un 10,1 % (0,20x).';

r.cambiaria_recomendacion = [
  'Precio: con las dos reglas combinadas, por debajo de 52,19 € pasaríamos a Comprar; por encima de 66,16 €, a Vender (motor).',
  'Una prima implícita del mercado más baja ya no basta para Comprar: un Comprar solo relativo exige al menos un 5 % de rentabilidad total con nuestro WACC, y hoy es del −8,2 % (motor).',
  'Si el FCF sin PEM de 2026 queda por debajo de 250 M, rebajaríamos el valor objetivo y la recomendación.',
  'Si el margen EBITDA del 9M26 baja del 13 %, revisaríamos márgenes a la baja.',
  'Si el plan estratégico anuncia la venta de Minsait por encima de 8x EBITDA, subiríamos el valor objetivo.',
  'Si la contratación de Defensa mantiene un book-to-bill por encima de 1 en 2027 y el capex baja del 5 % de las ventas, subiríamos el crecimiento de 2028-2030 hacia el del consenso.',
];

d.dcf.justificacion.crecimiento = '2026e +29 %: guía de más de 7.000 M (consenso 7.045 M), un tercio por compras: Hispasat e Hisdesat (277 M anuales) y TESS todo el año [1, 23]. 2027e +10 %, algo por debajo del consenso (+10,7 %) porque descontamos la venta de BPO y de Minsait Business Consulting [8, 23]. Desde 2028e, lo que la reinversión puede financiar (prueba de sostenibilidad): 8 %, 5 %, 3,5 %, 3 % y 2,5 % en 2032e, frente al +12,4 % del consenso en 2028e [23]. La media de 2027e-2032e (5,3 %) queda por debajo del 5,6 % financiable al ROIC de 2025; la cartera de Defensa se ejecuta en cinco o seis años y España se comprometió a menos gasto que la OTAN [1].';
d.dcf.justificacion.inversion = 'Amortizaciones del 3,8 % de las ventas en 2026e (4,4 % en el 1S26 con Hispasat y el efecto PPA) que bajan al 3,5 %. Capex del 6,0 % de las ventas en 2026e-2029e, el ritmo del 1S26 (205 M brutos para fábricas de vehículos y satélites) [6], mientras se entregan los PEM; baja al 5,5 % en 2030e, al 4,5 % en 2031e y al 3,8 % en 2032e, por encima de las amortizaciones. Circulante comercial del 12 % de las ventas, como el 12,4 % de 2025; los anticipos PEM se tratan como deuda en el puente y no como circulante. La reinversión neta acumulada es de 1.524 M, el 31 % del NOPAT.';
cambiar(d.dcf.justificacion, 'terminal', '8,2 veces', '8,3 veces');

d.dcf.lectura = 'El DCF da **50,19 € por acción, un 16,0 % por debajo del precio**, con un valor terminal que pesa el 74 % del valor empresa (9.381 M). La sensibilidad es alta: con el WACC ±1 punto el valor va de 42,66 € a 60,45 €. **El DCF inverso dice que el precio de 59,72 € descuenta un crecimiento medio de las ventas del 12,5 % anual hasta 2032 (frente al 8,7 % de nuestro caso base) o un margen EBITDA final del 16,7 % (frente al 15,0 %)**; dicho de otro modo, el mercado acepta una rentabilidad del 8,2 %, por debajo de nuestro WACC del 9,11 % y por encima del 7,98 % que resulta de la prima implícita del mercado (4,20 %) [44], con la que el DCF sube a 62,08 €. Nuestro base crece lo que Indra puede financiar: con un capex del 6 % hasta 2029 (el ritmo del 1S26) [6], la reinversión financia un 5,6 % anual, y de 2027e a 2032e crecemos un 5,3 %. El precio pide crecer casi como en 2021-2025 (12,6 % anual, con compras) y que el ciclo de defensa no se agote. Con nuestro WACC no vemos margen de seguridad; con el del mercado, casi ninguno.';

d.escenarios.comentario = 'La asimetría es muy desfavorable: el alcista da 65,76 € (+10,1 %) y el bajista 29,72 € (−50,2 %), una relación de 0,20 veces. El valor ponderado (25/50/25) es de 48,97 €, un 18,0 % por debajo del precio; con la prima implícita del mercado la relación sube a 0,90 veces. El bajista es verosímil: no exige una crisis, solo que el 2,0 % del PIB en defensa no siga subiendo y que los nuevos programas industriales cuesten más de lo previsto, algo que ya muestran el margen de TESS y el de Movilidad [8, 14]. Pesa más que en la v3 porque el base ya crece poco al final y el capex es mayor.';

d.valoracion.comentario = 'Pesos: DCF 35 %, escenarios 25 %, comparables 25 % y suma de partes 15 %; transacciones 0 % porque solo dos operaciones publican múltiplo y no esperamos una OPA. El DCF y los escenarios recogen el riesgo de ejecución que los múltiplos de mercado no ven; los comparables (66,39 €) están sesgados al alza por empresas casi puras de defensa, y la suma de partes (54,23 €) corrige ese sesgo. Con el caso base al crecimiento financiable, el DCF (50,19 €) y los escenarios (48,97 €) quedan por debajo de los múltiplos: la dispersión va de 49 € a 66 € y el valor objetivo de 54,54 € está un 8,7 % por debajo del precio. Con la prima implícita del mercado (4,20 %) [44], el DCF y los escenarios se recalculan con un WACC del 7,98 % y el objetivo sube a 61,54 € (+3,0 %), por debajo del consenso (67,12 €) [43]. La confianza es media: los datos son buenos, pero el puente depende de cómo se traten 3.600 M de anticipos públicos.';

d.riesgos.items[0].efecto_valor = '−50 % (escenario bajista)';
d.riesgos.items[1].efecto_valor = '−22 % del DCF por cada 2 pp de margen (sensibilidad del DCF)';

writeFileSync(new URL('datos-v4.json', dir), JSON.stringify(d, null, 2));
const palabras = r.sintesis.split(/\s+/).filter(Boolean).length;
console.log(`datos-v4.json escrito. Síntesis: ${palabras} palabras.`);
