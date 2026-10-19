// Resumen del analista (Wasion Holdings, corte 2026-10-19). Cifras del motor tal cual (último cálculo).
const sintesis = `**La recomendación y por qué.** Mantener, con convicción media. El objetivo a 12 meses es de 10,68 CNY ponderado (12,54 HKD) y 10,69 CNY en el caso base, frente a un precio de 10,46 CNY (12,28 HKD, cierre del 16-oct): la rentabilidad a 12 meses, con el dividendo del 4 %, es del 6,1 % ponderada y del 6,2 % en el base, lejos del 15 % que pide comprar. El valor intrínseco es mucho mayor (18,09 CNY, +72,9 %): el DCF (19,72 CNY) y la suma de partes (14,83 CNY) dicen que la acción está barata, pero el mercado nunca ha pagado a Wasion más de 9 veces el beneficio de forma sostenida, y la regla común no supone que lo haga en un año. La tesis de valor es a 2-3 años. La convicción es media porque la regla a 12 meses (v3) da Mantener lejos de los umbrales, mientras que las reglas del valor intrínseco (absoluta y relativa) y la v2 de control (19,2 %) dicen comprar; subiría con un 2S26 que cobre (flujo operativo positivo y clientes de más de 180 días a la baja) y bajaría si el deterioro de clientes pasa de 150 M al año. Los analistas (objetivo medio de 20,30 CNY) quedan fuera de nuestro rango a 12 meses (4,31-17,01 CNY).

**La caída del 64 %.** Es cierta (de 33,80 a 12,28 HKD desde el 17-abr) y tiene causas conocidas: la acción se multiplicó por 4,7 en 16 meses con la euforia de la energía para centros de datos, el accionista de control colocó 50 M de acciones a 30 HKD en abril, la solicitud de salida a bolsa de Wayon caducó en julio, Willfar gana un 33,7 % menos y el 1S26 trajo un beneficio plano con el margen bruto 3,9 puntos más bajo y los clientes de 181-365 días doblados [A11, A14, A15, D1]. Con todo, el PER de los próximos 12 meses (7,8 veces) está cerca de su historia, no en mínimos.

**El negocio.** Fabricante chino de contadores inteligentes (red china y exterior), comunicaciones y chips (Willfar, cotizada en Shanghái, 59,55 %) y equipos de distribución y energía para centros de datos (Wayon, ≈ 60 %) [A1]. Las ventas se duplicaron en 2021-2025 (de 4.591 a 10.074 M CNY) y el beneficio se cuadruplicó (de 268 a 1.058 M); el ROIC pasó del 7,0 % al 20,2 % frente a un WACC del 7,78 % [A1, A5]. La sostenibilidad del crecimiento es «Sí»: el capital nuevo solo tiene que rendir un 14,1 %.

**Finanzas.** Caja neta de ≈ 1.650 M a junio de 2026, pero el circulante es el punto débil: 8.893 M de clientes brutos (43 % del activo) y flujo operativo negativo en el 1S26 (−161 M) [A11, A12]. Los minoritarios se llevan el 31 % del beneficio, y las opciones de venta de Wayon (1.437 M) son deuda.

**Equipo y gobierno.** Control familiar del 52,4 %, padre presidente e hijo consejero delegado. A favor, compras del presidente y recompras; en contra, la colocación en máximos [C1, C7].

**Valoración.** EV/EBITDA de 7,1 veces y PER de 7,8 veces frente a medianas de 8,6-17 y 13,8 de los comparables; Willfar cotiza a 14,4 veces y la participación vale el 64 % de la capitalización [B4, D9]. Nuestro BPA de 2027e (1,22) queda un 12 % por debajo del consenso (1,38) porque bajamos el margen [D3]. La regla v2, de control, daría comprar (19,2 %): la diferencia es que la v3 compara el PER actual con la mediana adelantada (6,3 veces), más baja.

**Riesgos y catalizadores.** El riesgo dominante es el cobro: un deterioro de 1.000-2.000 M quitaría un 10-20 % al valor. Le siguen el margen, Willfar y otra colocación. La IA empuja la demanda de Wayon, pero es un ciclo de inversión. Catalizadores: Willfar del 3T26 (hasta el 31-oct), licitaciones de la red china y resultados de 2026 (≈ 26-mar-2027). Regla 13: no cambia.

**Qué cambiaría la decisión.** Compraríamos por debajo de 9,65 CNY (11,33 HKD) y venderíamos por encima de 12,33 CNY (14,47 HKD). Revisaríamos al alza si el 2S26 recupera el margen bruto por encima del 33 % con flujo operativo positivo, y a la baja si los clientes de más de 180 días pasan de 3.000 M.`;

export default {
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses para la señal; la tesis de valor (DCF y suma de partes) es a 2-3 años',
    sintesis,
    tesis: 'Wasion es uno de los cinco mayores fabricantes chinos de contadores inteligentes y se ha convertido en un grupo de tres negocios: contadores para la red china y el exterior, comunicaciones y chips (Willfar, cotizada en Shanghái) y equipos de distribución y energía para centros de datos (Wayon) [A1]. En cinco años duplicó ventas y multiplicó por cuatro el beneficio, con un ROIC que pasó del 7 % al 20 % [A1, A5].\n\nEl precio (12,28 HKD) ha caído un 64 % desde abril y cotiza a 7,8 veces el beneficio de los próximos 12 meses, la mitad que los comparables, y la filial Willfar vale el 64 % de la capitalización [D9]. El mercado duda de la calidad del beneficio de 2026: margen bruto −3,9 puntos, clientes de 181-365 días doblados y flujo operativo negativo en el 1S26 [A11].\n\nEl mercado tiene razón a medias. El negocio vale más que el precio (DCF de 19,72 CNY), pero a 12 meses la acción solo rinde un 6 % porque nunca ha cotizado a un múltiplo de calidad y el cobro está por demostrar. Para invertir hay que creer que los clientes pagarán y que el margen tocó fondo.',
    vision_diferencial: {
      mercado_descuenta: 'Que el beneficio de 2026 es de mala calidad (no se cobra) y que la euforia de la IA ha terminado: rentabilidad implícita del 11,3 % anual, PER de 7,8 veces y Wasion valorada por debajo de su participación en Willfar más el resto a precio de saldo.',
      nuestra_vision: 'El negocio crecerá menos que lo que esperan los analistas (BPA de 2027e un 12 % por debajo) pero vale más que el precio: 18,09 CNY de valor intrínseco. A 12 meses no vemos catalizador para que el mercado pague un múltiplo distinto del de su historia.',
      por_que: 'El circulante y los minoritarios justifican parte del descuento; el resto es de Hong Kong y de una empresa que el mercado ha visto quince años como un fabricante de contadores barato.',
    },
    a_favor: [
      '**ROIC del 20,2 %** en 2025 frente a un WACC del 7,78 %, desde el 7 % en 2021 [A1].',
      '**Pedidos récord**: energía digital +101 % y exterior +108 % en el 1S26 [A11].',
      '**Willfar a mercado** vale el 64 % de la capitalización de Wasion [D9].',
      '**PER de 7,8 veces** frente a una mediana de 13,8 de los comparables [B4].',
      '**Compras del presidente y recompras** (13,2 M de acciones) tras la caída [A17, C7].',
    ],
    en_contra: [
      '**Clientes de 181-365 días doblados** en el 1S26 (2.593 M) y flujo operativo negativo [A11, A12].',
      '**Margen bruto del 31,3 %**, 3,9 puntos menos que un año antes [A11].',
      '**Willfar**: beneficio del 1S26 un 33,7 % menor [A14].',
      '**Colocación del control en máximos** (30 HKD) y mandato de emisión renovado [A15, C3].',
      '**Minoritarios del 31 %** del beneficio y opciones de venta de Wayon por 1.437 M [A12].',
    ],
    que_vigilar: 'La tesis depende del cobro. Si en el balance de diciembre de 2026 los clientes de más de 180 días bajan y el flujo operativo del 2S26 es positivo, el beneficio es real y el descuento se puede cerrar; si siguen subiendo, el valor intrínseco baja un 10-20 %. La segunda señal es el margen bruto del 2S26 (la dirección promete mejoras de coste).',
    cambiaria_recomendacion: [
      'Precio por debajo de 9,65 CNY (11,33 HKD): pasaría a Comprar (ponderada a 12 meses ≥ 15 %).',
      'Precio por encima de 12,33 CNY (14,47 HKD): pasaría a Vender.',
      'Clientes de más de 180 días por encima de 3.000 M o deterioro anual por encima de 150 M: bajaríamos el caso base.',
      'Margen bruto del 2S26 por encima del 33 % con flujo operativo positivo: subiríamos el margen de la proyección.',
      'Otra colocación del accionista de control: regla 13, retrasar hasta su precio.',
    ],
    kpis_seguimiento: [
      { kpi: 'Clientes de 181-365 días', nivel_actual: '2.593 M (jun-26)', umbral_alerta: '> 3.000 M', por_que: 'Riesgo de cobro.' },
      { kpi: 'Margen bruto', nivel_actual: '31,3 % (1S26)', umbral_alerta: '< 30 %', por_que: 'Mezcla y competencia.' },
      { kpi: 'Flujo operativo semestral', nivel_actual: '−161 M (1S26)', umbral_alerta: 'Negativo en el 2S26', por_que: 'Calidad del beneficio.' },
      { kpi: 'Beneficio de Willfar', nivel_actual: '202 M (1S26, −33,7 %)', umbral_alerta: 'Caída en 9M26', por_que: 'Es el 64 % de la capitalización.' },
      { kpi: 'Pedidos de centros de datos de Wayon', nivel_actual: '1.892 M (1S26, +153 %)', umbral_alerta: 'Caída interanual', por_que: 'Ciclo de inversión en IA.' },
    ],
    confianza: 'Media',
  },
};
