// Resumen ejecutivo (Uber, corte 2026-10-08). Se escribe el último, con las cifras del motor.
import { K, n, calc } from './cifras.mjs';

const sens2 = calc.dcf.sensibilidad2.filas, sens = calc.dcf.sensibilidad.filas;
const margenMenos2 = n(sens2[0].v2), waccMas = n(sens[3].v2);

export const resumen = {
  recomendacion: 'Mantener', conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
  sintesis: `**La recomendación y por qué.** Mantener, con convicción media. El valor objetivo es de ${K.objetivo} USD frente a un precio de ${K.precio} (cierre del 9-oct-2026): una rentabilidad total esperada del ${K.rent} %, sin dividendo, con un alcista de +${K.alc} % y un bajista de ${K.baj} % (asimetría de ${K.asim} veces). Con la prima de riesgo que hoy pide el mercado (4,2 %), el objetivo sube a ${K.relObj} USD y la rentabilidad al ${K.relPot} %, por debajo del 15 % que pide Comprar. Esta es la segunda iteración: desde la del 8-oct el precio ha subido un 1,8 % y no hay hechos nuevos, así que la conclusión no cambia. La convicción es media, la que sugieren los criterios (las dos reglas dan Mantener, lejos de sus umbrales); subiría si Waymo o Tesla firman con Uber en sus grandes ciudades y bajaría si lanzan su propia aplicación en ellas.

**El negocio.** Uber tiene el 51,5 % del mercado mundial de VTC [B15] y un ROIC del ${K.roic} %, el doble de su WACC del ${K.wacc} %. Su calidad sostiene el crecimiento del caso base (9,3 % anual) sin apenas capital, porque es una plataforma de activos ligeros. Su margen EBIT contable de 2025 (10,8 %) supera con holgura a DoorDash (5,3 %) y Lyft (−3,0 %) [B4, B5]. Las reservas brutas crecieron un 22 % a tipo constante en el 2T26 y la guía del 3T26 apunta a un 18-22 % [A4]. La amenaza es concreta: Waymo opera en 15 ciudades de EE. UU., la mayoría con aplicación propia; Tesla, en seis metrópolis [B18, B20, B21].

**Finanzas.** El flujo libre que publica Uber (10.116 M USD en los doce meses a junio) está inflado: no resta la remuneración en acciones (1.938 M) y suma reservas de seguros con caja restringida [A1, A4]. La deuda neta ajustada es de ${K.dnAj} M USD (${K.dnEbitda} veces el EBITDA), antes de financiar Delivery Hero: unos 14.800 M USD por el 100 %, con cierre en el 2S27 [D27].

**Equipo y gobierno.** Suma. La guía trimestral se ha cumplido o superado en los seis últimos trimestres y el plan a tres años de 2024 va por delante (EBITDA ajustado +47 % anual en 2023-2025) [C8-C14]. Consejo con 9 de 10 independientes y una acción, un voto. El primer ejecutivo y el presidente compraron 15,3 M USD de acciones en septiembre [C21].

**Valoración.** El DCF vale ${K.dcf} USD y los comparables, con el EBITDA de todos después de remuneración en acciones, ${K.cNtmV} (EV/EBITDA) y ${K.cPerV} (PER); la suma de partes ${K.sp}. El DCF inverso dice que el precio descuenta un crecimiento anual de los ingresos del ${K.invG} % en 2027e-2035e, frente al ${K.invBase} % de nuestra base, que coincide con el consenso a ±2 % hasta 2028. No discrepamos del consenso en las cifras: el precio ya descuenta una desaceleración algo más rápida, que es la forma en que el mercado pone precio al coche autónomo.

**Riesgos y catalizadores.** El riesgo mayor es la desintermediación: en el bajista (Waymo y Tesla con aplicación propia en las grandes ciudades) el valor cae a ${K.bajV} USD. Dos puntos menos de margen bajan el DCF a ${margenMenos2} USD; medio punto más de WACC, a ${waccMas}. La multa neerlandesa de 825 M EUR del 8-oct (0,45 USD por acción) ya está en el puente [B27]. Catalizadores: resultados del 3T26 el 4-nov [E15], la directiva europea de plataformas el 2-dic y el cierre de Delivery Hero en el 2S27.

**Qué cambiaría la decisión.** Compraríamos por debajo de ${K.comprar} USD y venderíamos por encima de ${K.vender}. Pasaríamos a Comprar si las reservas brutas de Mobility siguen creciendo por encima del 18 % a tipo constante mientras Waymo se expande, y a Vender si el crecimiento de viajes del grupo baja del 10 % dos trimestres seguidos.`,
  tesis: `Uber es la mayor red de transporte bajo demanda del mundo: 208 millones de usuarios activos al mes, 3.867 millones de viajes en el 2T26 y 215.622 M USD de reservas brutas en los doce meses a junio [A4]. La escala le da el mejor margen del sector (EBIT contable del 10,8 % en 2025 frente al −3,0 % de Lyft) y un ROIC del ${K.roic} % con un capex del 0,6 % de las ventas [A1, B4]. La red de dos lados y Uber One (46 millones de miembros a cierre de 2025) hacen que el usuario de Movilidad y Reparto gaste tres veces más [B1].

El precio (${K.precio} USD, ${K.evNtm} veces el EBITDA contable de los próximos 12 meses) descuenta un crecimiento anual de los ingresos del ${K.invG} % entre 2027 y 2035, frente al ${K.invBase} % que proyectamos y que coincide con el consenso. Es el múltiplo más bajo desde que es rentable, en 2023: ${K.mhActual} veces el EBITDA de los últimos 12 meses frente a una media de ${K.mhMedia}, y está por debajo de la mediana de sus comparables (${K.cNtmMed} veces).

El mercado acierta al pedir un descuento: Waymo y Tesla ya operan sin conductor con aplicación propia [B18, B21], y si el coche autónomo hace del viaje una mercancía barata, la red pierde poder de precio. Para invertir hay que creer que Uber será la red de demanda que los fabricantes necesitan para llenar sus flotas, como sugieren sus más de 30 socios y su cuota al alza en San Francisco y Los Ángeles [B8]. Hoy no hay datos para demostrarlo ni para descartarlo.`,
  vision_diferencial: {
    mercado_descuenta: `Un crecimiento de los ingresos del ${K.invG} % anual en 2027e-2035e, más lento que el ${K.invBase} % de nuestra base, alineada con el consenso hasta 2028, y un riesgo de desintermediación por el coche autónomo que justifica una caída del 30 % desde noviembre de 2025 aunque las cifras se cumplieron trimestre a trimestre [D4, C11-C14].`,
    nuestra_vision: 'Coincidimos con el consenso en las cifras hasta 2028 (±2 %) y en que el coche autónomo es el riesgo central. Discrepamos en dos detalles: el flujo libre que el mercado usa para la rentabilidad por flujo (7 %) está inflado por la remuneración en acciones y las reservas de seguros, y la compra de Delivery Hero, a 15,8 veces el EBITDA, consume la capacidad de recompra de 2026-2027.',
    por_que: 'Las dos cosas se ven en los documentos de la SEC: la remuneración en acciones (1.938 M USD en los doce meses a junio) y el aumento de las reservas de seguros (+830 M en 1S26) [A1, A4], y la caída de las recompras de 3.019 M en el 1T26 a 510 M en el 2T26 tras anunciar la OPA [A3]. No tenemos una visión distinta sobre el coche autónomo: es una pregunta abierta.',
  },
  a_favor: [
    `**Escala que se nota en el margen**: EBIT contable del 10,8 % en 2025 frente al 5,3 % de DoorDash y el −3,0 % de Lyft [B4, B5].`,
    `**Crecimiento intacto**: reservas brutas +22 % a tipo constante en el 2T26 y guía del 18-22 % para el 3T26 [A4].`,
    `**Rentabilidad sobre el capital**: ROIC del ${K.roic} % frente a un WACC del ${K.wacc} %, con un capex del 0,6 % de las ventas.`,
    '**La dirección compra**: 15,3 M USD de compras del primer ejecutivo y el presidente en septiembre de 2026 [C21].',
    '**Cumple lo que promete**: seis trimestres seguidos en o por encima de la guía [C8-C14].',
    `**Precio exigente solo a medias**: ${K.evNtm} veces el EBITDA de los próximos 12 meses frente a ${K.cNtmMed} de mediana de sus comparables.`,
  ],
  en_contra: [
    '**Coche autónomo**: Waymo en 15 ciudades de EE. UU. y más de 500.000 viajes de pago a la semana, con aplicación propia en la mayoría [B18, B20].',
    `**Escenario bajista profundo**: ${K.bajV} USD (${K.bajP} %) frente a un alcista de ${K.alcV} USD; asimetría de ${K.asim} veces.`,
    '**Flujo libre inflado**: la remuneración en acciones (1.938 M USD en los doce meses a junio) no resta en el flujo que publica Uber [A4].',
    '**Compra grande y con deuda**: Delivery Hero, unos 14.800 M USD por el 100 % a unas 15,8 veces el EBITDA de 2025 [D27].',
    '**Litigios que se repiten**: reservas legales y regulatorias de 564 M USD en 2025 y 1.123 M en 2024; multa neerlandesa de 825 M EUR el 8-oct-2026 [A1, B27].',
  ],
  que_vigilar: 'La tesis depende de que Uber siga ganando viajes en las ciudades donde Waymo y Tesla operan con aplicación propia. La señal de alarma sería un crecimiento de las reservas brutas de Mobility por debajo del 12 % a tipo constante, o que Waymo pase a ofrecer su servicio solo en su aplicación en Austin o Atlanta, donde hoy es socio de Uber. La segunda condición es que la compra de Delivery Hero no deje la deuda neta por encima de dos veces el EBITDA ajustado ni pare las recompras.',
  cambiaria_recomendacion: [
    `Si el precio baja de ${K.comprar} USD sin cambios en las cifras, pasaríamos a Comprar.`,
    'Si las reservas brutas de Mobility crecen por debajo del 12 % a tipo constante dos trimestres seguidos, revisaríamos el caso base a la baja: con el bajista ganando peso, al precio actual pasaríamos a Vender.',
    'Si Waymo deja de ofrecer sus coches en la red de Uber en Austin o Atlanta, rebajaríamos el valor al de un caso intermedio entre base y bajista.',
    'Si Uber publica la economía del viaje autónomo con un margen por viaje igual o mayor que el del conductor humano, pasaríamos a Comprar.',
    `Si la prima de riesgo implícita del mercado baja del 4 % o la tasa libre baja del 4,75 %, la rentabilidad esperada con la prima del mercado superaría el 15 % y pasaríamos a Comprar.`,
  ],
  kpis_seguimiento: [
    { kpi: 'Reservas brutas de Mobility (crecimiento a tipo constante)', nivel_actual: '+20 % (2T26)', umbral_alerta: '< 12 %', por_que: 'Primera señal de pérdida de viajes frente al coche autónomo.' },
    { kpi: 'Viajes trimestrales del grupo (crecimiento)', nivel_actual: '+18 % (2T26)', umbral_alerta: '< 10 % dos trimestres', por_que: 'Separa precio de volumen.' },
    { kpi: 'Margen EBITDA contable (después de remuneración en acciones)', nivel_actual: `${K.margenLtm} % (doce meses a jun-26)`, umbral_alerta: '< 13 %', por_que: 'El caso base necesita llegar al 18 %.' },
    { kpi: 'Viajes autónomos de pago de Waymo por semana', nivel_actual: '> 500.000 (sep-2026)', umbral_alerta: '> 2 millones sin pasar por Uber', por_que: 'Escala del competidor con aplicación propia [B20].' },
    { kpi: 'Deuda neta / EBITDA ajustado', nivel_actual: '0,7 veces (jun-26, antes de Delivery Hero)', umbral_alerta: '> 2 veces', por_que: 'Límite para mantener rating y recompras.' },
    { kpi: 'Recompras trimestrales', nivel_actual: '510 M USD (2T26)', umbral_alerta: '< 500 M dos trimestres', por_que: 'Sin recompras, la remuneración en acciones diluye.' },
  ],
  confianza: 'Media',
};
