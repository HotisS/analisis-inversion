// actualizacion-v2.mjs — Olympus v2: metodología del 10-oct (prueba de sostenibilidad del crecimiento, `dcf.sostenibilidad`).
// Sin investigación nueva: parte de datos.json, borra calc, añade dcf.sostenibilidad y reescribe los textos que cambian.
// Escribe datos-v2.json; después:
//   node motor/calcular-empresa.mjs --datos informes/olympus-2026-10-09/datos-v2.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos.json'), 'utf8'));
delete d.calc;

// 1. Recorte mínimo del caso base (encargo-recorte, lectura prudente del 13-oct). La prueba falla: con el ROIC de
// FY2026 (7,9 %) la reinversión financia un 1,7 % anual frente al 3,7 % proyectado, y el capital nuevo «rendiría» un
// 31,9 %. Casi todo el exceso viene de la vuelta del margen desde un año deprimido (FY2026: 15,9 % de margen EBITDA,
// con 26.872 M del programa de plantilla, ≈ 30.000 M de ventas retenidas por la FDA y 18.000 M de aranceles), no del
// crecimiento: bajar el crecimiento no mueve la prueba (con un 3,0 % de media, financiable 1,6 % e implícito 31,2 %,
// porque la reinversión baja con él). Lo que sí estaba por encima de lo demostrado era el margen final: 23,0 % frente al
// 22,7 % de FY2025, el último año limpio. Se limita a ese 22,7 % desde FY2030e. El crecimiento no se toca: con el ROIC
// de FY2025 (15,1 %) la reinversión financia un 3,3 % anual, más el precio del puente (≈ 0,6 puntos de media en diez
// años) da 3,9 %, por encima del 3,7 % proyectado. El control del capital nuevo se explica en meta.controles_explicados.
for (const a of d.dcf.anios) if (a.margen_ebitda_pct > 22.7) a.margen_ebitda_pct = 22.7;
d.meta.controles_explicados.push({
  control: 'Rendimiento del capital nuevo de la proyección ≤ 1,25 × el histórico',
  explicacion: 'El motor mide el aumento del NOPAT desde FY2026, un año deprimido por partidas que no se repiten (26.872 M del programa de plantilla, unos 30.000 M de ventas retenidas por la FDA, 18.000 M de aranceles y las pérdidas de SIS), y el ROIC incremental histórico es negativo por la venta de Evident y esas mismas partidas. La vuelta del margen hasta el 20,4 % de FY2027e es la guía de la empresa y el consenso [10, 11, 59], no rendimiento de capital nuevo. Medido desde FY2025 (NOPAT de unos 118.500 M y ROIC del 15,1 %), el capital nuevo rinde en torno al 16 %, por debajo de 1,25 veces ese ROIC. El margen final se limitó al 22,7 % de FY2025 para no pedir más de lo demostrado.',
});

// 2. Prueba de sostenibilidad del crecimiento.
d.dcf.sostenibilidad = {
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 2.5, precio_pct: 0.5, otros_pct: 3,
      comentario: 'La aspiración de la empresa a tipo constante es del 3 % en FY2027 [10]; el resto es divisa: la guía (+4,4 % a +6,5 %) usa 155 JPY/USD y el 1T creció un 16,4 % publicado frente a un 5 % a tipo constante [9, 11]. Reparto entre volumen (vuelta de los productos retenidos, EVIS X1) y precio (China a la baja), estimación propia.' },
    { periodo: 'FY2028e', volumen_pct: 3, precio_pct: 1, otros_pct: 0,
      comentario: 'Aspiración del 4 % a tipo constante [10]: renovación de unos 70.000 procesadores a EVIS X1 [18]; precio positivo fuera de China (estimación propia).' },
    { periodo: 'FY2029e', volumen_pct: 3.5, precio_pct: 1, otros_pct: 0,
      comentario: 'Aspiración del 5 % a tipo constante [10]; dejamos 4,5 % por la presión de la compra centralizada en China [15].' },
  ],
  mercado_final: null,
  veredicto: 'En parte',
  justificacion: 'En parte. El foso sostiene el crecimiento: en torno al 70 % de los endoscopios GI del mundo, con costes de cambio altos (procesador, endoscopios, reprocesado y servicio son un sistema) [18], y un 3,7 % anual de media, apenas por encima del 3,4 % del mercado [37], así que la cuota casi no se mueve (prueba a mano: la cuota publicada es de un segmento y el mercado final va en blanco). Con el ROIC de FY2025 (15,1 %), la reinversión financia un 3,3 % anual y el precio aporta el resto. Con el de FY2026 (7,9 %), solo un 1,7 %: el crecimiento depende de que el margen vuelva. Por eso el margen final se limita al 22,7 % de FY2025.',
};

// 3. Textos reescritos con las cifras de calc.
const sintesis = [
  '**La recomendación y por qué.** Vender, con convicción baja. El valor objetivo es de 1.902,53 JPY frente a un precio de 2.000 JPY: un potencial del −4,9 % y una rentabilidad total esperada del −3,4 % con el dividendo de 30 JPY. Con la prima del mercado (4,20 %), −3,0 %. Las dos reglas dan Vender, no por la rentabilidad sino por la asimetría: el bajista (−40,8 %) pesa más del doble que el alcista (+17,9 %), 0,44x. El 9-oct decíamos Mantener; la prueba de sostenibilidad nos hizo limitar el margen final al 22,7 % de FY2025 (antes, 23,0 %). La convicción es baja, y no media como sugieren los criterios, porque el precio está solo un 1,1 % por encima del umbral de venta y la señal depende de 0,3 puntos de margen: es reducir, no salir. La subiría un segundo trimestre sin vuelta de los productos retenidos.',
  '**El negocio.** Olympus tiene en torno al 70 % del mercado mundial de endoscopios gastrointestinales [18], base instalada con servicio recurrente y un ROIC del 15-17 % en los ejercicios limpios, el doble de su WACC (7,18 %). Ese foso es amplio pero se estrecha: en FY2026 el ROIC cayó al 7,9 %, porque SIS perdió 14.986 M de JPY y en China los fabricantes locales ya tienen el 20-30 % del mercado [10, 36]. ¿Sostiene su calidad el crecimiento que proyectamos? En parte: el 3,7 % anual apenas supera el 3,4 % del mercado [37] y no exige ganar cuota, pero con el ROIC de FY2026 la reinversión solo financia un 1,7 % anual (con el de FY2025, un 3,3 %, más el precio). Depende de que el margen vuelva.',
  '**Finanzas.** Las ventas de FY2026 (1.010.676 M) crecieron un 1,3 % y el margen EBITDA bajó al 15,9 %, desde el 22,7 %, por los aranceles de EE. UU. (18.000 M netos), unos 30.000 M de ventas retenidas por la FDA y 26.872 M del programa de plantilla [1, 10]. El flujo libre acumulado de FY2022-FY2026 solo convirtió el 23 % del beneficio,, y en mayo de 2026 recompró con deuda: deuda neta ajustada de 271.170 M (1,5x EBITDA). El primer trimestre de FY2027 marca el giro: ventas +16,4 % y margen ajustado del 12,8 % frente al 6,4 % [9, 11].',
  '**Equipo y gobierno.** Suma en estructura y resta en historial. El consejo tiene 9 independientes de 10 y comités solo de independientes, sin accionista de control [38]. Pero hay tres primeros ejecutivos en 24 meses [53] y la guía de beneficio se incumplió en FY2024, FY2025 y FY2026; Bob White, que viene de Medtronic, aún no tiene historial propio.',
  '**Valoración.** El DCF da 1.905,08 JPY y los comparables 1.941,40 JPY; los escenarios ponderados, 1.837,85 JPY. Nuestra proyección coincide con el consenso hasta FY2029e, con diferencias inferiores al 1,1 % en EBITDA [59]. El DCF inverso dice que el precio exige un margen EBITDA estable del 23,3 %, por encima del 22,7 % de FY2025, o un crecimiento del 4,5 % anual, frente al 3,4 % de su mercado [37]. Discrepamos en el precio de un riesgo regulatorio abierto, no en las cifras.',
  '**Riesgos y catalizadores.** El riesgo mayor es la FDA. La alerta 89-04 sobre Aizu sigue en vigor en la versión del 19 de agosto de 2026 [20], y una reinspección fallida nos llevaría al bajista (1.183,91 JPY). El segundo es el margen: cada punto menos en todos los años resta un 8 % (1.745,72 JPY). Catalizadores: resultados del 10 de noviembre, vuelta de los productos retenidos y revisión estratégica de SIS [9].',
  '**Qué cambiaría la decisión.** Venderíamos por encima de 1.978,63 JPY y compraríamos por debajo de 1.685,64 JPY. Volveríamos a Mantener si el precio baja de ese umbral o si la FDA levanta la alerta, y pasaríamos a Comprar si, además, el margen ajustado del semestre supera el 16 %.',
].join('\n\n');

const T = {
  'resumen.recomendacion': 'Vender',
  'resumen.conviccion': 'Baja',
  'resumen.sintesis': sintesis,
  'resumen.tesis': [
    'Olympus es el líder mundial de la endoscopia gastrointestinal, con en torno al 70 % de cuota [18], tras vender cámaras (2021) y el negocio científico (2023). Su negocio GIS facturó 697.359 M de JPY en FY2026 con un margen operativo del 19,6 % y crece a doble dígito en Norteamérica, Europa y Asia-Pacífico gracias a la plataforma EVIS X1 [9, 10]. En los ejercicios sin problemas regulatorios el grupo rindió un 15-17 % sobre el capital, el doble de su coste.',
    'El precio de 2.000 JPY descuenta, según el DCF inverso, un margen EBITDA estable del 23,3 % o un crecimiento del 4,5 % anual hasta FY2036: más que la recuperación completa del plan de la dirección (mejoras de 100 puntos básicos al año y crecimiento del 3-4-5 % a tipo constante) [10], y un margen por encima del 22,7 % de FY2025, el último ejercicio limpio. A 10,3x EV/EBITDA y 18,8x PER a 12 meses vista cotiza en la mediana de sus comparables, sin el descuento que justificarían un crecimiento menor y un margen más bajo.',
    'El mercado acierta en la dirección y se adelanta en el plazo. Hay que creer que la FDA levanta la alerta de Aizu en 2027 y que las retenciones terminan en el segundo semestre de FY2027, cosa que la empresa espera pero que no controla [9, 20]. También hay que creer que los aranceles y China no impiden recuperar el margen. Con una asimetría de 0,44x, el precio no paga por esperar.',
  ].join('\n\n'),
  'resumen.vision_diferencial.mercado_descuenta': 'Que la crisis de calidad de 2022-2026 está superada: el margen EBITDA vuelve por encima del 23 % y las ventas crecen algo más que el mercado. Lo dice el DCF inverso (margen implícito del 23,3 %, crecimiento del 4,5 %) y lo confirma el consenso, cuyo EBITDA de FY2029 (260.290 M) coincide con el nuestro [59].',
  'resumen.vision_diferencial.por_que': 'La FDA decide por su cuenta y no publica calendario de reinspecciones. Olympus ha incumplido su guía de beneficio tres años seguidos, y el último trimestre bueno coincide con un yen débil (+16 % en yenes, +5 % a tipo constante) [9]. Esperar a la reinspección cuesta poco: la rentabilidad esperada es del −3,4 %.',
  'resumen.en_contra.1': '**Asimetría de 0,44x**: el bajista (−40,8 %) pesa más del doble que el alcista (+17,9 %).',
  'resumen.cambiaria_recomendacion': [
    'Si el precio baja de 1.978,63 JPY sin cambios en la tesis, volveríamos a Mantener; por debajo de 1.685,64 JPY, a Comprar.',
    'Si la FDA levanta la alerta de importación de Aizu y el margen ajustado del 2S FY2027 supera el 16 %, revisaríamos al alza el margen y probablemente a Mantener o Comprar.',
    'Si los productos retenidos no han vuelto en marzo de 2027 o la FDA abre un decreto de consentimiento, reforzaríamos el Vender.',
    'Si el ROIC vuelve al 15 % de FY2025, la reinversión financiaría el crecimiento proyectado y subiríamos la convicción en el caso base.',
  ],
  'dcf.justificacion.margenes': 'Margen EBITDA (sin participadas ni partidas puntuales, con los gastos de calidad y reestructuración dentro) del 20,4 % en FY2027e: la guía de beneficio operativo (136.500-155.500 M, con 31.500 M de otros gastos) más 68.000 M de amortizaciones da un 20,1 % en el punto medio, y en torno al 20,5 % sin las pérdidas de Swan EndoSurgical, que van fuera del EBITDA del DCF [10, 11]. Sube al 21,8 % en FY2028e y al 22,6 % en FY2029e, con los 24.000 M de ahorro anual del programa de plantilla [9] y el objetivo de 100 puntos básicos de mejora al año [10], y se estabiliza en el 22,7 % de FY2025, el último ejercicio limpio: la prueba de sostenibilidad no deja pedir más de lo demostrado. Queda por debajo del 26,3 % de FY2023 porque los aranceles de EE. UU. (unos 18.000 M netos al año) y la presión de precios en China no desaparecen [10, 13]. El consenso da un 20,1 %, 21,7 % y 22,3 % en FY2027e-FY2029e; nuestra proyección difiere en menos de un 1,1 % en EBITDA [59].',
  'dcf.justificacion.terminal': 'Gordon con un crecimiento del 2,0 % en JPY: entre la inflación esperada en Japón (en torno al 2 %) y la tasa libre menos medio punto (2,59 %). El valor terminal pesa un 66 % del valor empresa. El múltiplo de salida de contraste es 10,5x EBITDA, en línea con la mediana de los comparables a 12 meses vista (10,2x) y con la mediana histórica de Olympus (12,4x en los últimos 12 meses) [59]; el Gordon implica 8,9x, más prudente.',
  'dcf.lectura': '**El DCF da 1.905,08 JPY por acción, un 4,7 % por debajo del precio**, con un WACC del 7,18 % y un valor terminal que pesa el 66 %. El DCF inverso dice que el precio de 2.000 JPY descuenta un crecimiento anual del 4,5 % en FY2027e-FY2036e (nuestra base, 3,7 %) o, con nuestro crecimiento, un margen EBITDA estable del 23,3 % (base, 22,7 %, el de FY2025); la rentabilidad implícita es del 7,0 %, algo por debajo del WACC. Es decir, **el mercado paga algo más que la recuperación completa del plan de Bob White**: que el margen supere su nivel de FY2025 pese a los aranceles y que las ventas crezcan más deprisa que su mercado (3,4 %). No es una exigencia extrema, pero deja poco margen: la recuperación aún no se ha demostrado más allá de un trimestre, la alerta de importación sigue en vigor y la dirección no cumplió la guía de beneficio en FY2024, FY2025 ni FY2026. Un punto menos de margen en todos los años lleva el valor a 1.745,72 JPY; medio punto más de WACC, a 1.706,79.',
  'escenarios.casos.1.narrativa': 'Los productos retenidos vuelven en el segundo semestre de FY2027 y la alerta se levanta en FY2028; el programa de plantilla da sus 24.000 M de ahorro y el margen EBITDA sube del 20,4 % al 22,7 % en FY2030e, el de FY2025, por debajo del de FY2023 por los aranceles. Las ventas crecen un 3,7 % anual de media, algo más que el mercado.',
  'escenarios.casos.2.narrativa': 'Olympus resuelve la FDA en FY2027, la endoscopia quirúrgica se vende o se reestructura (deja de restar), EVIS X1 con EDOF y los desechables (duodenoscopio de un solo uso) aceleran la renovación, y el margen EBITDA llega al 24,7 %, cerca del nivel previo a la crisis de calidad. El crecimiento medio sube al 4,7 %.',
  'escenarios.comentario': 'La asimetría es desfavorable: el alcista vale 2.357,32 JPY (+17,9 %) y el bajista 1.183,91 JPY (−40,8 %), una asimetría de 0,44x. El bajista no es cosmético: el margen EBITDA de FY2026 ya fue del 15,9 % y el bajista solo supone que no se recupera más allá del 19,7 %, algo que ya ocurrió dos de los últimos tres años. Con probabilidades de 25/50/25, el valor ponderado es de 1.837,85 JPY, un 8,1 % por debajo del precio. Para que la apuesta compense hay que dar más del 25 % de probabilidad al alcista o comprar más abajo: por debajo de 1.685,64 JPY la regla daría Comprar.',
  'valoracion.comentario': 'El DCF pesa un 50 %: los flujos de Olympus son previsibles una vez limpios de la FDA y la proyección coincide con el consenso en menos de un 1,1 % hasta FY2029e. Los comparables pesan un 30 % y dan algo más (1.941,40 JPY, media de EV/EBITDA y PER a 12 meses vista), con dos sesgos que se compensan en parte: el EBITDA y el BPA de los comparables de EE. UU. y Reino Unido son ajustados (sin amortización de intangibles adquiridos ni cargos de reestructuración) frente al NIIF de Olympus, lo que rebaja sus múltiplos y el valor implícito; y Hoya e Intuitive, con márgenes del 36 % y el 44 %, cotizan a 18,5x y 24,5x y tiran de la parte alta. Los escenarios pesan un 20 % para recoger la asimetría. Las transacciones no se usan: su mediana (4.267,58 JPY) mezcla compras de crecimiento alto a 8-18 veces ventas con prima de control, y Olympus no tiene accionista que facilite una operación. La dispersión entre métodos es baja (1.838-1.941 JPY) y todos quedan por debajo del precio.',
  'rentabilidad.comentario': 'Olympus creó valor con holgura mientras el negocio estuvo limpio: ROIC del 16,1 % en FY2022, 16,7 % en FY2023 y 15,1 % en FY2025, el doble de un WACC del 7,18 %. FY2024 (10,2 %) y FY2026 (7,9 %) muestran el coste de los problemas de calidad: en FY2026 el ROIC apenas cubre el coste de capital porque el margen EBIT cayó al 9,3 % por los aranceles de EE. UU., unos 30.000 M de ventas retenidas por la FDA y el programa de plantilla [10]. El motor del ROIC es el margen, no la rotación: la rotación del capital es estable (0,55-0,68) y el circulante absorbe un 36 % de las ventas por el inventario de equipos y repuestos (212 días). El ROIC incremental de FY2022-FY2026 es negativo (−19,2 %): el capital invertido creció un 41 % y el beneficio operativo después de impuestos cayó un 36 %. Frente a sus competidores, el margen es inferior al de Boston Scientific o Stryker en sus divisiones de endoscopia (33 % y 30 % de EBIT) y superior al de Fujifilm Healthcare (5,8 %) [27, 28, 30]. La tesis exige volver a un ROIC del 13-15 %, que es lo que supone el margen EBITDA del 22,7 % del caso base, el de FY2025.',
  'riesgos.items.0.efecto_valor': '−41 % en el escenario bajista; −8 % por cada punto de margen perdido',
  'riesgos.items.2.efecto_valor': '−8 % por punto de margen EBITDA (1.745,72 JPY con −1 punto)',
  'riesgos.items.4.efecto_valor': '−5 % si el crecimiento baja un punto en todos los años (1.802,08 JPY)',
};
for (const [ruta, valor] of Object.entries(T)) {
  const partes = ruta.split('.');
  let o = d;
  for (const p of partes.slice(0, -1)) o = o[p];
  if (o === undefined || !(partes.at(-1) in o)) throw new Error(`Ruta inexistente: ${ruta}`);
  o[partes.at(-1)] = valor;
}

writeFileSync(join(dir, 'datos-v2.json'), JSON.stringify(d, null, 2));
console.log('datos-v2.json escrito.');
