// Resumen ejecutivo (Uber, corte 2026-10-28; tercera iteración). Se escribe el último, con las cifras del motor (calc)
// y las de las pruebas de robustez (herramientas/robustez.mjs, 28-oct, cierre del 27-oct).
import { K, n, calc } from './cifras.mjs';

const sens2 = calc.dcf.sensibilidad2.filas, sens = calc.dcf.sensibilidad.filas;
const margenMenos2 = n(sens2[0].v2), waccMas = n(sens[3].v2);
const o = calc.recomendacion.objetivo_12m;
const f = Object.fromEntries(o.filas.map((x) => [x.escenario, x]));
const O = {
  pond: n(o.objetivo_ponderado), base: n(o.objetivo_base), rp: n(o.rentabilidad_ponderada_pct, 1), rb: n(o.rentabilidad_base_pct, 1),
  comprar: n(o.comprar_por_debajo), vender: n(o.vender_por_encima), v3: n(o.selector.v3_sin_selector.rentabilidad_ponderada_pct, 1),
  mb: n(f.Bajista.multiplo, 1), mB: n(f.Base.multiplo, 1), mA: n(f.Alcista.multiplo, 1), asim: n(o.asimetria),
  pb: n(f.Bajista.precio), pA: n(f.Alcista.precio), dcons: n(o.diferencia_consenso_pct, 1),
};
// Pruebas de robustez (robustez.mjs, 28-oct-2026): para quien la tiene manda senal_cartera; para comprar, la acción robusta.
const R = { mantener: '72,66', robusto: '62,57', b1: '65,42', colchonC: '6', colchonM: '10', bpaMenos10: '9,4', bpaMenos10b: '7,1' };
const distIntr = n((calc.sintesis.valor_objetivo / o.objetivo_ponderado - 1) * 100, 1);

export const resumen = {
  recomendacion: 'Comprar', conviccion: 'Baja', justificacion_recomendacion: null, horizonte: '12 meses',
  sintesis: `**La recomendación y por qué.** Comprar, con convicción baja. El objetivo a 12 meses es de ${O.pond} USD (ponderado; base ${O.base}) frente a un precio de ${K.precio} (cierre del 27-oct-2026): rentabilidad del ${O.rp} % ponderada y del ${O.rb} % en el base, sin dividendo, con un bajista de ${O.pb} y un alcista de ${O.pA} (asimetría de ${O.asim} veces). El valor intrínseco es de ${K.objetivo} USD (+${K.potencial} %) y el objetivo medio de los analistas, 100,86 USD, queda por encima de nuestro rango central [P6]. La razón: el BPA crece un 19 % de 2027e a 2028e y la acción ya cotiza a ${O.mB} veces nuestro BPA de 2027e, el PER más bajo desde que gana dinero. La convicción es baja porque las reglas del valor intrínseco discrepan (absoluta Mantener, relativa Comprar) y porque no es compra robusta: con un BPA un 10 % peor la ponderada cae al ${R.bpaMenos10} %. Subiría si los resultados del 4-nov confirman reservas brutas de Mobility por encima del 18 %; bajaría si el crecimiento de viajes baja del 12 %.

**El negocio.** Uber tiene el 51,5 % del mercado mundial de VTC [B15] y un ROIC del ${K.roic} %, 9,5 puntos por encima de su WACC del ${K.wacc} %. **La calidad sostiene el crecimiento proyectado (veredicto «Sí»)**: es una plataforma de activos ligeros (capex del 1,6 % de las ventas) que crece un 9,3 % anual por volumen, con reservas brutas +22 % a tipo constante en el 2T26 [A4]. El margen EBIT contable de 2025 (10,8 %) dobla al de DoorDash (5,3 %) [B4]. La amenaza es concreta: Waymo opera en 15 ciudades de EE. UU. y Tesla presentó el Cybercab en septiembre [B18, P13].

**Finanzas.** El BPA publicado no sirve: 2024 y 2025 llevan 6.400 y 5.000 M USD de liberaciones fiscales y cada año ±1.800 M de revalorizaciones de participaciones. Historia del PER y escenarios van en la misma base ajustada (sin esas partidas, impuestos normalizados): 1,20 USD en 2024 y 2,36 en 2025, frente a 4,56 y 4,73 publicados [P17]. Deuda neta ajustada de ${K.dnAj} M USD (${K.dnEbitda} veces el EBITDA) antes de pagar Delivery Hero (unos 9.300 M por el resto) y ezCater (2.300 M) [D27, P9].

**Equipo y gobierno.** Suma: la guía trimestral se ha cumplido seis trimestres seguidos, el consejo tiene 9 de 10 independientes y el primer ejecutivo y el presidente compraron 15,3 M USD en septiembre, a 71-76 USD [C8-C14, C21, P14].

**Valoración.** A 12 meses decide la v2: con solo tres años de historia, el selector toma la más baja de v3 (${O.v3} %) y v2. Múltiplos de la regla: ${O.mb}x, ${O.mB}x y ${O.mA}x sobre BPA de 2028e de 2,99, 4,30 y 4,93 USD. El DCF vale ${K.dcf} USD y el DCF inverso dice que el precio descuenta un crecimiento del ${K.invG} % anual en 2027e-2035e frente al ${K.invBase} % de nuestra base: el mercado pone precio a una desaceleración por el coche autónomo que las cifras aún no muestran. Nuestro BPA de 2028e queda un 26 % bajo el del consenso (base distinta: restamos la remuneración en acciones).

**Riesgos y catalizadores.** En el bajista (Waymo y Tesla con aplicación propia) el DCF cae a ${K.bajV} USD; dos puntos menos de margen lo bajan a ${margenMenos2}. Catalizadores: resultados del 3T26 el 4-nov, fin del plazo de la OPA sobre Delivery Hero el 5-nov y cierre de ezCater [P7, P9]. Los foros muestran cansancio, sin riesgos nuevos.

**Qué cambiaría la decisión.** Para quien la tiene: mantener; se vendería por encima de ${R.mantener} USD, donde deja de pasar el filtro de mantener (la banda Vender de la regla, ponderada ≤ −10 %, empieza en ${O.vender}). Para comprar: la regla da Comprar por debajo de ${O.comprar}, pero la compra robusta (nivel A) exige ${R.robusto} o menos, y el nivel B1 ${R.b1}; a ${K.precio} no entra en ningún nivel.`,
  tesis: `Uber es la mayor red de transporte bajo demanda del mundo: 208 millones de usuarios activos al mes, 3.867 millones de viajes en el 2T26 y 215.622 M USD de reservas brutas en los doce meses a junio [A4]. La escala le da el mejor margen del sector (EBIT contable del 10,8 % en 2025 frente al −3,0 % de Lyft) y un ROIC del ${K.roic} % con un capex del 0,6 % de las ventas [A1, B4].

El precio (${K.precio} USD, ${K.evNtm} veces el EBITDA contable de los próximos 12 meses y ${O.mB} veces nuestro BPA ajustado de 2027e) descuenta un crecimiento anual de los ingresos del ${K.invG} % entre 2027 y 2035, frente al ${K.invBase} % que proyectamos. Ha caído un 34 % desde noviembre de 2025 sin que el consenso de BPA haya bajado [P5, P6].

El mercado acierta al pedir un descuento por el coche autónomo, pero lo pide entero cuando aún no hay datos de pérdida de viajes. Para invertir hay que creer que Uber será la red de demanda que los fabricantes necesitan para llenar sus flotas, como sugieren sus más de 30 socios [B8]. Los resultados del 4-nov son la primera prueba nueva.`,
  vision_diferencial: {
    mercado_descuenta: `Un crecimiento de los ingresos del ${K.invG} % anual en 2027e-2035e, más lento que el ${K.invBase} % de nuestra base, y un múltiplo de ${O.mB} veces el BPA ajustado de 2027e, el más bajo de su historia como empresa rentable, por el riesgo de desintermediación del coche autónomo [P13].`,
    nuestra_vision: 'Somos más prudentes que el consenso en el BPA (−26 % en 2028e, por restar la remuneración en acciones y no contar ingresos de la caja) y aun así el precio deja una rentabilidad a 12 meses por encima del 15 %. No tenemos una visión distinta sobre el coche autónomo: es una pregunta abierta.',
    por_que: 'La diferencia sale de la misma base de BPA en historia y escenarios: con el BPA publicado (inflado por liberaciones fiscales) Uber parecería barata en historia y cara hoy; con el ajustado, el PER de hoy (18,2 veces) queda por debajo de los 25,6-51,3 de 2023-2025 [P17].',
  },
  a_favor: [
    '**Escala que se nota en el margen**: EBIT contable del 10,8 % en 2025 frente al 5,3 % de DoorDash y el −3,0 % de Lyft [B4, B5].',
    '**Crecimiento intacto**: reservas brutas +22 % a tipo constante en el 2T26 y guía del 18-22 % para el 3T26 [A4].',
    `**Calidad**: ROIC del ${K.roic} % frente a un WACC del ${K.wacc} %, con un capex del 0,6 % de las ventas.`,
    '**La dirección compra**: 15,3 M USD del primer ejecutivo y el presidente en septiembre de 2026, sin ventas relevantes después [C21, P14].',
    `**Múltiplo en mínimos**: ${O.mB} veces nuestro BPA ajustado de 2027e frente a 25,6-51,3 veces en 2023-2025.`,
  ],
  en_contra: [
    '**Coche autónomo**: Waymo en 15 ciudades de EE. UU. con aplicación propia en la mayoría y el Cybercab de Tesla presentado en septiembre [B18, P13].',
    `**No es compra robusta**: con un BPA un 10 % peor la ponderada baja al ${R.bpaMenos10} % y el base al ${R.bpaMenos10b} %.`,
    '**Historia corta**: solo tres años de PER útil (2023-2025); el múltiplo de referencia es poco firme.',
    '**Compras grandes y con deuda**: Delivery Hero (unos 14.800 M USD por el 100 %) y ezCater (2.300 M) [D27, P9].',
    '**Litigios que se repiten**: reservas legales de 564 M USD en 2025 y multa neerlandesa de 825 M EUR [A1, B27].',
  ],
  que_vigilar: 'La tesis depende de que Uber siga ganando viajes en las ciudades donde Waymo y Tesla operan con aplicación propia. La señal de alarma sería un crecimiento de las reservas brutas de Mobility por debajo del 12 % a tipo constante, o que Waymo deje de ofrecer sus coches en la red de Uber en Austin o Atlanta. La segunda condición es que Delivery Hero y ezCater no dejen la deuda neta por encima de dos veces el EBITDA ajustado ni paren las recompras.',
  cambiaria_recomendacion: [
    `Para quien la tiene, por encima de ${R.mantener} USD deja de pasar el filtro de mantener (ponderada < 10 %) y se vendería; la banda Vender de la regla (ponderada ≤ −10 %) empieza en ${O.vender}.`,
    `Para comprar con la regla basta un precio por debajo de ${O.comprar} USD, pero la compra robusta exige ${R.robusto} USD o menos (nivel B1: ${R.b1}).`,
    'Si las reservas brutas de Mobility del 3T26 (4-nov) crecen por debajo del 12 % a tipo constante, rebajaríamos el BPA de los escenarios: con un 10 % menos, la ponderada cae por debajo del 10 % y pasaríamos a Mantener o Vender.',
    'Si Waymo deja de ofrecer sus coches en la red de Uber en Austin o Atlanta, rebajaríamos el caso base hacia el bajista.',
    'Si Uber publica la economía del viaje autónomo con un margen por viaje igual o mayor que el del conductor humano, la convicción subiría a media.',
  ],
  kpis_seguimiento: [
    { kpi: 'Reservas brutas de Mobility (crecimiento a tipo constante)', nivel_actual: '+20 % (2T26)', umbral_alerta: '< 12 %', por_que: 'Primera señal de pérdida de viajes frente al coche autónomo.' },
    { kpi: 'Viajes trimestrales del grupo (crecimiento)', nivel_actual: '+18 % (2T26)', umbral_alerta: '< 10 % dos trimestres', por_que: 'Separa precio de volumen.' },
    { kpi: 'Margen EBITDA contable (después de remuneración en acciones)', nivel_actual: `${K.margenLtm} % (doce meses a jun-26)`, umbral_alerta: '< 13 %', por_que: 'El BPA de 2028e necesita llegar al 16,8 %.' },
    { kpi: 'Viajes autónomos de pago de Waymo por semana', nivel_actual: '> 500.000 (sep-2026)', umbral_alerta: '> 2 millones sin pasar por Uber', por_que: 'Escala del competidor con aplicación propia [B20].' },
    { kpi: 'Deuda neta / EBITDA ajustado', nivel_actual: '0,7 veces (jun-26, antes de Delivery Hero)', umbral_alerta: '> 2 veces', por_que: 'Límite para mantener rating y recompras.' },
  ],
  confianza: 'Media',
  _objetivo: {
    diferencia_consenso: `Nuestro BPA base de 2028e (4,30 USD) queda un 26 % por debajo del consenso (5,81) y nuestro precio base (${O.base}) un ${O.dcons.replace('−', '')} % por debajo del objetivo medio de los analistas (100,86) [P5, P6]. Las ventas casi coinciden (75.239 M frente a 76.340 M); la diferencia es de base: el BPA del consenso es no GAAP (sin remuneración en acciones, 3,5 % de las ventas) y cuenta los ingresos de la caja, y nosotros restamos 800 M de intereses sin ingresos porque la caja se va a Delivery Hero. No acercamos la cifra: la historia del PER está en la misma base que nuestros escenarios.`,
    media: o.objetivo_simple,
    comentario: `El valor intrínseco (${K.objetivo} USD) queda un ${distIntr.replace('−', '')} % por debajo del objetivo a 12 meses ponderado (${O.pond} USD; +${O.rp} %, base +${O.rb} %): la distancia es pequeña y las dos lecturas apuntan por encima del precio. El objetivo a 12 meses solo pide que el BPA ajustado crezca de 3,62 USD en 2027e a 4,30 en 2028e al PER de hoy (${O.mB} veces); el catalizador con fecha son los resultados del 3T26 (4-nov-2026).`,
  },
};
