// actualizacion-v2.mjs — Rentokil Initial v2: sostenibilidad del crecimiento (metodología del 10-oct-2026).
// No rehace la investigación: parte de datos.json, borra calc y añade `dcf.sostenibilidad` con lo que ya estaba en el
// informe. Puente de ingresos 2026e-2030e: precio por encima de la inflación (Rollins saca 3-4 puntos del precio [20];
// Rentokil sube por encima de la inflación en todas sus regiones [4, 12]), volumen negativo o plano (retención del 80,7 %
// en Norteamérica y número de clientes a la baja, según el director financiero [4, 12]) y `otros` = divisa, compras
// pequeñas (≈120 M de gasto en 2026 [4]) y la salida de SOLitude en 2027 (112 M de ventas, −1,5 puntos [13]).
// El reparto volumen/precio es estimación propia: la empresa no lo publica.
// Mercado final: null. `competencia.cuota_pct` (17,4 %) es solo control de plagas (5.056 M sobre 29.000 M USD) y el
// motor divide los ingresos de todo el grupo (con higiene y Business Services): no hay perímetro comparable (lecciones,
// «Doble clase»/«una sola línea»). La prueba de cuota se hace a mano en la justificación: con el grupo al 3,8 % anual y
// el mercado al 6,2 % [15], la cuota de plagas bajaría del 17,4 % a ≈ 15 % en 2033e.
// No se cambia ningún supuesto del DCF (la prueba no dice que la proyección pida más de lo financiable ni una cuota
// inverosímil). Veredicto «En parte»: el precio sí, el volumen no está demostrado; la síntesis explica por qué no se
// rebaja el caso base.
// Recomendación: el motor del 9/10-oct exige, para un Comprar solo relativo, ≥ 5 % de rentabilidad con nuestro coste de
// capital; aquí es −2,1 %, así que la regla pasa a Mantener. Se sigue la regla y se reescriben los textos que lo dicen.
// Escribe datos-v2.json; después:
//   node motor/calcular-empresa.mjs --datos informes/rentokil-2026-10-07/datos-v2.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos.json'), 'utf8'));
delete d.calc;

// 1. Sostenibilidad del crecimiento.
d.dcf.sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -0.5, precio_pct: 4.0, otros_pct: 1.2,
      comentario: 'Orgánico del 3,6 % en el primer semestre [4]: casi todo precio, por encima de la inflación en todas las regiones [4, 12], con el número de clientes a la baja en Norteamérica (retención del 80,7 %) [4, 12]. Otros: divisa favorable, compras pequeñas (≈120 M de gasto) y SOLitude hasta su venta [4, 13]. Reparto volumen/precio: estimación propia.' },
    { periodo: '2027e', volumen_pct: -0.3, precio_pct: 3.6, otros_pct: -0.8,
      comentario: 'Sale SOLitude (112 M de ventas, −1,5 puntos) [13], compensado en parte por compras pequeñas (+0,7). Precio algo por encima de la inflación, como Rollins (3-4 puntos) [20]; el volumen sigue ligeramente negativo mientras la retención no pase del 80 % [12].' },
    { periodo: '2028e', volumen_pct: 0.0, precio_pct: 3.5, otros_pct: 0.5,
      comentario: 'Volumen plano: supone que Branch 360 y la reinversión de los ahorros en Norteamérica (90 M anualizados) frenan la pérdida de clientes [4, 11]. Precio +3,5 % [4, 20]; compras pequeñas +0,5. El DCF no resta el gasto en compras: sin el crecimiento comprado (−0,5 a −0,7 puntos en 2027e-2030e) daría 3,72 USD en vez de 3,82 (estimación propia).' },
    { periodo: '2029e', volumen_pct: 0.5, precio_pct: 3.5, otros_pct: 0.5,
      comentario: 'Primer año de volumen positivo, con el mercado creciendo al 6,2 % [15]; precio y compras como en 2028e. Es la parte que la empresa no ha demostrado desde 2023 [14, 51, 53].' },
    { periodo: '2030e', volumen_pct: 0.5, precio_pct: 3.5, otros_pct: 0.5,
      comentario: 'Igual que 2029e: un orgánico del 4 %, por debajo del 5 % prometido en 2023 [51] y del 6-7 % de Rollins [16, 19].' },
  ],
  mercado_final: null,
  veredicto: 'En parte',
  justificacion: 'En parte. El precio sí: el foso es estrecho pero real (escala de rutas, marca Terminix, 70 % de ingresos por contrato) y la empresa sube por encima de la inflación sin perder más clientes por ello [12, 15]; el mercado ha crecido un 6,6 % anual sin un año de caída [15]. El volumen no: la retención de Norteamérica es del 80,7 % y el número de clientes baja [4, 12], y el orgánico fue del 2,8 % y el 2,6 % en 2024-2025 [14, 53]. La proyección (3,8 % anual) pide volumen plano desde 2028e. No hay prueba de cuota con el motor (la cuota publicada es solo de plagas); hecha a mano, la de plagas bajaría del 17,4 % a ≈ 15 % en 2033e. El ROIC (7,0 %) no cubre el WACC.',
};

// 2. Recomendación: sigue la regla del motor (Mantener). Convicción baja, la que sugieren los criterios.
d.resumen.recomendacion = 'Mantener';

// 3. Textos que cambian.
const parrafos = d.resumen.sintesis.split('\n\n');
const iPar = (ini) => { const i = parrafos.findIndex((x) => x.startsWith(ini)); if (i < 0) throw new Error(`Falta ${ini}`); return i; };
parrafos[iPar('**La recomendación y por qué.**')] = '**La recomendación y por qué.** Mantener, con convicción baja. Las dos reglas discrepan. Con la prima de riesgo implícita del mercado (4,2 % [61]) el valor objetivo es 4,53 USD (341 GBp), un 14,1 % más, y la rentabilidad total esperada del 17,3 % con una asimetría de 2,42 veces daría Comprar. Con nuestro WACC del 8,74 % el objetivo baja a 3,76 USD (283 GBp, −5,3 %), la rentabilidad total es del −2,1 % y la regla absoluta da Mantener. Manda la relativa, salvo que un Comprar que solo da ella no rinda al menos un 5 % con nuestro coste de capital, y aquí rinde un −2,1 %: una compra que sale solo de la tasa de descuento no se sostiene. Por eso pasamos del Comprar de la versión anterior a Mantener, sin cambiar ninguna cifra. La convicción es baja porque la rentabilidad relativa está a 2,3 puntos del umbral de compra y porque nuestras cifras quedan por debajo del consenso (EBITDA un 4-5 % menor): no tenemos una tesis distinta del mercado sobre el negocio.';
parrafos[iPar('**El negocio.**')] += ' ¿Sostiene la calidad el crecimiento que proyectamos (3,8 % anual)? En parte: el precio sí, porque sube por encima de la inflación sin más bajas [12], pero el volumen no está demostrado (orgánico del 2,8 % y el 2,6 % en 2024-2025 [14, 53]) y la proyección lo pide plano desde 2028. No rebajamos el caso base porque ya queda por debajo del 5 % prometido, del consenso y del 6,2 % del mercado [15], y el bajista (25 %) repite 2024.';
parrafos[iPar('**Qué cambiaría la decisión.**')] = '**Qué cambiaría la decisión.** Por debajo de 3,70 USD (279 GBp) pasaríamos a Comprar, porque también con nuestro coste de capital rendiría al menos un 5 %; por encima de 5,05 USD (380 GBp), a Vender. Dos trimestres de volumen positivo en Norteamérica subirían el caso base y el veredicto de sostenibilidad a «Sí»; un orgánico de control de plagas en Norteamérica por debajo del 2 % en el tercer trimestre, o partidas «one-off» de 2026 por encima de 150 M, nos acercarían al bajista.';
d.resumen.sintesis = parrafos.join('\n\n');

d.resumen.cambiaria_recomendacion = [
  'Si la acción baja de 3,70 USD (279 GBp) sin cambios en las cifras, pasaríamos a Comprar; por encima de 5,05 USD (380 GBp), a Vender.',
  'Si el orgánico de control de plagas de Norteamérica baja del 2 % en el tercer trimestre (22 de octubre), recortaríamos el crecimiento del caso base y el nivel de compra.',
  'Si las partidas «one-off» de 2026 superan los 150 M o hay otra dotación extraordinaria de termitas en el segundo semestre, subiríamos el coste recurrente que restamos del margen y bajaría el valor objetivo.',
  'Si el plan de febrero de 2027 cifra la reinversión en Norteamérica por encima de 100 M anuales sin objetivos de crecimiento, bajaríamos el margen del caso base.',
  'Si Norteamérica encadena dos trimestres de volumen positivo, o se anuncia una recompra de al menos el 5 % del capital, revisaríamos el caso base al alza: el Comprar volvería si la rentabilidad con nuestro coste de capital supera el 5 %.',
];

writeFileSync(join(dir, 'datos-v2.json'), JSON.stringify(d, null, 2));
console.log('datos-v2.json escrito.');
