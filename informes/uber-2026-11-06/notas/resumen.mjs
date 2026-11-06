// Resumen ejecutivo (Uber, corte 2026-11-06; cuarta iteración, tras el 3T26). Se escribe el último, con las cifras del motor (calc)
// y las de las pruebas de robustez (herramientas/robustez.mjs, 6-nov, cierre del 5-nov).
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
// Pruebas de robustez (robustez.mjs, 6-nov-2026): para quien la tiene manda senal_cartera; para comprar, la acción robusta.
const R = { mantener: '75,82', robusto: '65,29', b1: '68,26', colchonC: '6', colchonM: '10', bpaMenos10: '9,1', bpaMenos10b: '6,9' };
const distIntr = n((calc.sintesis.valor_objetivo / o.objetivo_ponderado - 1) * 100, 1);

export const resumen = {
  recomendacion: 'Comprar', conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
  sintesis: `**La recomendación y por qué.** Comprar según la regla, con convicción media; para quien ya la tiene, mantener. El objetivo a 12 meses es de ${O.pond} USD (ponderado; base ${O.base}) frente a un precio de ${K.precio} (cierre del 5-nov-2026): rentabilidad del ${O.rp} % ponderada y del ${O.rb} % en el base, sin dividendo, con un bajista de ${O.pb} y un alcista de ${O.pA} (asimetría de ${O.asim} veces). El valor intrínseco es de ${K.objetivo} USD (+${K.potencial} %) y el objetivo medio de los analistas, 100,77 USD, queda por encima de nuestro base [P6]. La razón: el BPA ajustado crece un 19 % de 2027e a 2028e y la acción cotiza a ${O.mB} veces nuestro BPA de 2027e. La convicción es media porque las dos reglas del valor intrínseco dan Comprar, pero la rentabilidad no llega al 25 %, el bajista pierde más de un 25 % y no es compra robusta: con un BPA un 10 % peor la ponderada cae al ${R.bpaMenos10} %. Subiría si las reservas de Mobility vuelven a crecer por encima del 18 % en el 4T26; bajaría si caen por debajo del 12 %.

**El negocio.** Uber tiene el 51,5 % del mercado mundial de VTC [B15] y un ROIC del ${K.roic} %, 9,8 puntos por encima de su WACC del ${K.wacc} %. **La calidad sostiene el crecimiento proyectado (veredicto «Sí»)**: es una plataforma de activos ligeros (capex del 1,6 % de las ventas) que crece un 9,1 % anual en la proyección por volumen; en el 3T26 las reservas brutas crecieron un 20 % a tipo constante, con 215 millones de usuarios al mes y 55 millones de socios de Uber One [P19, P20]. La amenaza es concreta: Waymo opera en 15 ciudades con su aplicación y ha puesto fin a la exclusividad con Uber en Austin y Atlanta [B18, P22].

**Finanzas.** El 3T26 cumplió la guía: ingresos de 14.766 M (+10 %, con 8 puntos restados por cambios de modelo), BPA no GAAP de 0,88 USD (+35 %) y flujo libre de 10.421 M en doce meses [P19]. El BPA publicado no sirve (0,25 USD en el trimestre por −616 M de revalorizaciones; 2024 y 2025 inflados por liberaciones fiscales): historia del PER y escenarios van en la misma base ajustada [P17]. Deuda neta ajustada de ${K.dnAj} M USD (${K.dnEbitda} veces el EBITDA) a 30-sep, ya con los 4.500 M EUR de bonos en euros y antes de pagar el resto de Delivery Hero (hasta unos 8.300 M EUR) y ezCater (2.300 M USD) [P25].

**Equipo y gobierno.** Suma: la guía trimestral se ha cumplido siete trimestres seguidos y el primer ejecutivo y el presidente compraron 15,3 M USD en septiembre [C8-C14, C21, P14]. Resta un poco la salida de la presidenta y directora de Asuntos Corporativos (30-nov) [P26].

**Valoración.** A 12 meses decide la v2: con tres años de historia, el selector toma la más baja de v3 (${O.v3} %) y v2. Múltiplos de la regla: ${O.mb}x, ${O.mB}x y ${O.mA}x sobre BPA de 2028e de 2,99, 4,30 y 4,93 USD. El DCF vale ${K.dcf} USD y el DCF inverso dice que el precio descuenta un crecimiento del ${K.invG} % anual en 2027e-2035e frente al ${K.invBase} % de nuestra base: el mercado pone precio a una desaceleración por el coche autónomo que las cifras aún no muestran. Nuestro BPA de 2028e queda un 26 % bajo el del consenso por la base (restamos la remuneración en acciones), no por las ventas.

**Riesgos y catalizadores.** En el bajista (Waymo y Tesla con aplicación propia) el DCF cae a ${K.bajV} USD; dos puntos menos de margen lo bajan a ${margenMenos2}. Nuevo: la falta de conductores en Brasil, India y Canadá restó 1-2 puntos a Mobility y obliga a invertir en oferta [P20]. Catalizadores: resultado de la OPA sobre Delivery Hero (plazo cerrado el 5-nov; umbral asegurado con Prosus), cierre de ezCater, 700 vehículos sin conductor a fin de año y el acuerdo con Amazon para Uber Eats [P21, P25]. Los foros han pasado del cansancio a un debate dividido.

**Qué cambiaría la decisión.** Para quien la tiene: mantener; se vendería por encima de ${R.mantener} USD, donde deja de pasar el filtro de mantener (la banda Vender de la regla, ponderada ≤ −10 %, empieza en ${O.vender}). Para comprar: la regla da Comprar por debajo de ${O.comprar}, pero la compra robusta (nivel A) exige ${R.robusto} o menos y el nivel B1 ${R.b1}; a ${K.precio} no entra en ningún nivel.`,
  tesis: `Uber es la mayor red de transporte bajo demanda del mundo: 215 millones de usuarios activos al mes, 4.061 millones de viajes en el 3T26 y 225.701 M USD de reservas brutas en los doce meses a septiembre [P19, A19]. La escala le da el mejor margen del sector (EBIT contable del 10,8 % en 2025 frente al −3,0 % de Lyft) y un ROIC del ${K.roic} % con un capex del 0,6 % de las ventas [A1, B4].

El precio (${K.precio} USD, ${K.evNtm} veces el EBITDA contable de los próximos 12 meses y ${O.mB} veces nuestro BPA ajustado de 2027e) descuenta un crecimiento anual de los ingresos del ${K.invG} % entre 2027 y 2035, frente al ${K.invBase} % que proyectamos. Cotiza un 27 % bajo el máximo de noviembre de 2025 con un EBITDA ajustado de doce meses un 23 % mayor [P1, A19].

El mercado acierta al pedir un descuento por el coche autónomo, pero lo pide entero cuando aún no hay datos de pérdida de viajes: el 3T26 volvió a crecer un 20 %. Para invertir hay que creer que Uber será la red de demanda que los fabricantes necesitan para llenar sus flotas (700 vehículos sin conductor a fin de 2026 y más de 2.000 en 2027) [P20].`,
  vision_diferencial: {
    mercado_descuenta: `Un crecimiento de los ingresos del ${K.invG} % anual en 2027e-2035e, más lento que el ${K.invBase} % de nuestra base, y un múltiplo de ${O.mB} veces el BPA ajustado de 2027e, por debajo de los 25,6-51,3 de 2023-2025, por el riesgo de desintermediación del coche autónomo [P13, P22].`,
    nuestra_vision: 'Somos más prudentes que el consenso en el BPA (−26 % en 2028e, por restar la remuneración en acciones y no contar ingresos de la caja) y aun así el precio deja una rentabilidad a 12 meses por encima del 15 %. No tenemos una visión distinta sobre el coche autónomo: es una pregunta abierta.',
    por_que: 'La diferencia sale de la misma base de BPA en historia y escenarios: con el BPA publicado (inflado por liberaciones fiscales) Uber parecería barata en historia y cara hoy; con el ajustado, el PER de hoy (19,0 veces) queda por debajo de los 25,6-51,3 de 2023-2025 [P17].',
  },
  a_favor: [
    '**Escala que se nota en el margen**: EBIT contable del 10,8 % en 2025 frente al 5,3 % de DoorDash y el −3,0 % de Lyft [B4, B5].',
    '**Crecimiento intacto**: reservas brutas +20 % a tipo constante en el 3T26, quinto trimestre seguido por encima del 20 %, y guía del 18-22 % para el 4T26 [P19].',
    `**Calidad**: ROIC del ${K.roic} % frente a un WACC del ${K.wacc} %, con un capex del 0,6 % de las ventas.`,
    '**Delivery gana socios**: Amazon elige a Uber Eats para sus socios Prime en EE. UU. (5-nov) [P21].',
    `**Múltiplo bajo**: ${O.mB} veces nuestro BPA ajustado de 2027e frente a 25,6-51,3 veces en 2023-2025.`,
  ],
  en_contra: [
    '**Coche autónomo**: Waymo en 15 ciudades con aplicación propia y sin exclusividad con Uber en Austin y Atlanta; el Cybercab de Tesla presentado en septiembre [B18, P13, P22].',
    `**No es compra robusta**: con un BPA un 10 % peor la ponderada baja al ${R.bpaMenos10} % y el base al ${R.bpaMenos10b} %.`,
    '**Falta de conductores**: Mobility creció 1-2 puntos menos de lo previsto en el 3T26 y la inversión en oferta puede bajar la tasa de cobro del 4T26 [P20].',
    '**Compras grandes y con deuda**: Delivery Hero (unos 14.800 M USD por el 100 %) y ezCater (2.300 M) [D27, P25].',
    '**Historia corta**: solo tres años de PER útil (2023-2025); el múltiplo de referencia es poco firme.',
  ],
  que_vigilar: 'La tesis depende de que Uber siga ganando viajes en las ciudades donde Waymo y Tesla operan con aplicación propia y de que resuelva la falta de conductores. La señal de alarma sería un crecimiento de las reservas brutas de Mobility por debajo del 12 % a tipo constante (17 % en el 3T26), o que Waymo retire sus coches de la red de Uber en Austin o Atlanta. La segunda condición es que Delivery Hero y ezCater no dejen la deuda neta por encima de dos veces el EBITDA ajustado ni paren las recompras.',
  cambiaria_recomendacion: [
    `Para quien la tiene, por encima de ${R.mantener} USD deja de pasar el filtro de mantener (ponderada < 10 %) y se vendería; la banda Vender de la regla (ponderada ≤ −10 %) empieza en ${O.vender}.`,
    `Para comprar con la regla basta un precio por debajo de ${O.comprar} USD, pero la compra robusta exige ${R.robusto} USD o menos (nivel B1: ${R.b1}).`,
    'Si las reservas brutas de Mobility del 4T26 crecen por debajo del 12 % a tipo constante, rebajaríamos el BPA de los escenarios: con un 10 % menos, la ponderada cae por debajo del 10 % y pasaríamos a Mantener o Vender.',
    'Si Waymo retira sus coches de la red de Uber en Austin o Atlanta, rebajaríamos el caso base hacia el bajista.',
    'Si Uber publica la economía del viaje autónomo con un margen por viaje igual o mayor que el del conductor humano, la convicción subiría a alta.',
  ],
  kpis_seguimiento: [
    { kpi: 'Reservas brutas de Mobility (crecimiento a tipo constante)', nivel_actual: '+17 % (3T26)', umbral_alerta: '< 12 %', por_que: 'Primera señal de pérdida de viajes frente al coche autónomo o por falta de conductores.' },
    { kpi: 'Viajes trimestrales del grupo (crecimiento)', nivel_actual: '+16 % (3T26)', umbral_alerta: '< 10 % dos trimestres', por_que: 'Separa precio de volumen.' },
    { kpi: 'Margen EBITDA contable (después de remuneración en acciones)', nivel_actual: `${K.margenLtm} % (doce meses a sep-26)`, umbral_alerta: '< 13 %', por_que: 'El BPA de 2028e necesita llegar al 16,8 %.' },
    { kpi: 'Vehículos sin conductor en la red de Uber', nivel_actual: 'Objetivo de 700 a fin de 2026', umbral_alerta: '< 2.000 a fin de 2027', por_que: 'Prueba de que Uber es la red de los fabricantes [P20].' },
    { kpi: 'Deuda neta / EBITDA ajustado', nivel_actual: '0,8 veces (sep-26, antes de Delivery Hero)', umbral_alerta: '> 2 veces', por_que: 'Límite para mantener rating y recompras.' },
  ],
  confianza: 'Media',
  _objetivo: {
    diferencia_consenso: `Nuestro BPA base de 2028e (4,30 USD) queda un 26 % por debajo del consenso (5,81, MarketScreener 23-oct) y nuestro precio base (${O.base}) un ${O.dcons.replace('−', '')} % por debajo del objetivo medio de los analistas tras los resultados (100,77) [P5, P6]. Las ventas casi coinciden (75.239 M frente a 76.340 M); la diferencia es de base: el BPA del consenso es no GAAP (sin remuneración en acciones, 3,5 % de las ventas) y cuenta los ingresos de la caja, y nosotros restamos 800 M de intereses sin ingresos porque la caja se va a Delivery Hero. No acercamos la cifra: la historia del PER está en la misma base que nuestros escenarios.`,
    media: o.objetivo_simple,
    comentario: `El valor intrínseco (${K.objetivo} USD) queda un ${distIntr.replace('−', '')} % por debajo del objetivo a 12 meses ponderado (${O.pond} USD; +${O.rp} %, base +${O.rb} %): la distancia es pequeña y las dos lecturas apuntan por encima del precio. El objetivo a 12 meses solo pide que el BPA ajustado crezca de 3,62 USD en 2027e a 4,30 en 2028e al PER de hoy (${O.mB} veces); los catalizadores son los resultados del 4T26 (febrero de 2027) y el cierre de ezCater.`,
  },
};
