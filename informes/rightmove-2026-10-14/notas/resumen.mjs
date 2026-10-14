// Resumen ejecutivo (Rightmove, corte 2026-10-14). Se escribe el último; cifras del motor tal cual.
const sintesis = `**La recomendación y por qué.** Comprar, con convicción baja. El objetivo a 12 meses es de 5,53 GBP (nuestro BPA de 2028 por el PER de la regla común) y la rentabilidad a 12 meses es del 15,2 % ponderada y del 13,1 % en el caso base, con dividendo; el valor intrínseco es de 5,21 GBP, un 6,6 % sobre el precio de 4,889. El objetivo medio de los analistas, 5,95, queda dentro de nuestro rango (3,88-7,38). La razón en una frase: el precio, el más bajo en múltiplos de la década, descuenta que el portal dominante del Reino Unido pierde el poder de precios, y las recompras ya anunciadas (≈11 % del capital en 12 meses) suben el beneficio por acción aunque eso no pase. La convicción es baja porque la ponderada está a 0,2 puntos del umbral del 15 %, la asimetría es de 1,04 veces y la regla del valor intrínseco solo da Comprar con la prima del mercado; subiría a media si el tribunal rechaza certificar la demanda colectiva tras la vista del 2-3 de noviembre de 2026.

**El negocio.** Rightmove tiene el 89 % del tiempo en portales inmobiliarios británicos (Comscore) y más del 85 % de su tráfico es directo u orgánico [B1]. Cobra una suscripción mensual a 19.272 clientes con un ARPA de 1.621 GBP que sube un 6-8 % al año [A1, A3]. El margen EBITDA es del 68,5 % y el ROIC del 545 %, frente a un WACC del 10,05 %. La calidad de la empresa sostiene el crecimiento proyectado (veredicto: Sí): el 5,4 % anual del caso base sale solo del precio, sin capital, y es menor que el 6,6 % de 2019-2025.

**Finanzas.** Ingresos de 425,1 M en 2025 (+9 %), caja libre de ≈226 M y ninguna deuda [A1, A10]. 2026 es año de inversión: ingresos +6-8 % (guía rebajada en julio por la obra nueva) y beneficio subyacente +3-5 % [A3]. La línea de 200 M financiará recompras por encima de la caja libre [A3].

**Valoración.** El DCF da 5,50 GBP (+12,5 %) y la síntesis 5,21; con la prima del mercado, 5,96. El DCF inverso dice que el precio descuenta un crecimiento del 3,4 % anual frente al 5,2 % de nuestro base, o un margen del 63,3 % frente al 71 %. Cotiza a 16,9 veces el beneficio frente a una media de 24,9 en 2019-2025 y por debajo de su mínimo (18,5), y a 11,8 veces el EBITDA, con poca prima sobre comparables peores. El objetivo a 12 meses supera al valor intrínseco porque el BPA de 2028 crece un 36 %, la mitad por recompras anunciadas.

**Riesgos y catalizadores.** El mayor riesgo es la demanda colectiva de ≈1.500 M por tarifas excesivas: si limita las subidas, el bajista vale 3,66 GBP (−25,1 %) [C4]. Después, CoStar con OnTheMarket y la búsqueda con IA, que hoy trae menos del 0,5 % de las visitas [B1, B2]. Los foros están divididos: los inversores ven exagerado el miedo a la IA y aplauden las recompras, mientras los agentes inmobiliarios son hostiles a los precios; esa hostilidad es la base del litigio [E3].

**Qué cambiaría la decisión.** Compraríamos con más convicción por debajo de 4,90 GBP y venderíamos por encima de 6,26. Pasaríamos a Mantener si el tribunal certifica la demanda y la guía de 2027 no supera un +5 % de ingresos, o si el ARPA crece menos de un 4 % en un semestre.`;

export default {
  recomendacion: 'Comprar', conviccion: 'Baja', justificacion_recomendacion: null, horizonte: '12 meses',
  sintesis,
  tesis: `Rightmove es el portal inmobiliario dominante del Reino Unido: 89 % del tiempo en portales, 19.272 agencias y promotores que pagan una suscripción mensual y un margen EBITDA del 68,5 % sin necesidad de capital [B1, A1]. Ha crecido un 6,6 % anual en 2019-2025 subiendo el ARPA y devuelve toda la caja.

El precio, 4,889 GBP, descuenta un crecimiento del 3,4 % anual o un margen del 63,3 % para siempre, y la acción cotiza a 16,9 veces el beneficio, por debajo de su mínimo de la década. El mercado castiga tres cosas: la guía de beneficio de 2026 (+3-5 %) por el plan de IA, la demanda colectiva de ≈1.500 M y el miedo a que la búsqueda con IA sustituya al portal [A16, C4].

Para invertir hay que creer que el poder de precios aguanta: que el tribunal no certifica la demanda o que, si lo hace, no limita las subidas, y que la IA es una herramienta del portal y no su sustituto. Con eso, las recompras (≈11 % del capital en 12 meses) y un ARPA +6-7 % llevan el BPA de 2028 a 0,38 GBP [A3].`,
  vision_diferencial: {
    mercado_descuenta: 'Que el crecimiento se frena al 3,4 % anual o que el margen cae al 63 % por la competencia, la IA y el litigio.',
    nuestra_vision: 'El ARPA seguirá creciendo un 5-7 % mientras la cuota de tiempo esté por encima del 85 %; la inversión en IA es temporal y el margen vuelve al 71 %.',
    por_que: 'La cuota de tiempo marcó récord en 2025 tras tres años de CoStar y el tráfico de IA es < 0,5 % [B1]; pero el litigio es binario y no tenemos ventaja de información sobre él.',
  },
  a_favor: [
    '**Dominio del mercado**: 89 % del tiempo en portales y 85 % de tráfico directo u orgánico [B1].',
    '**Poder de precios demostrado**: ARPA +6 % en 2025 y +7 % en el 1S26 [A1, A3].',
    '**Devolución de caja**: más de 400 M en 12 meses, ≈11 % de la capitalización [A3].',
    '**Valoración**: 16,9 veces el beneficio frente a una media de 24,9 en 2019-2025.',
    '**ROIC del 545 %**: cada libra de ingresos nuevos llega casi entera al beneficio.',
  ],
  en_contra: [
    '**Demanda colectiva** de ≈1.500 M por tarifas excesivas, con vista el 2-3 de noviembre [C4].',
    '**Beneficio plano en 2026**: +3-5 % por el plan de IA de 60 M [A16].',
    '**Obra nueva en caída**: guía de ingresos rebajada al 6-8 % [A3].',
    '**CoStar** invierte para ganar cuota con OnTheMarket [B2].',
    '**Asimetría de solo 1,04 veces** con nuestro WACC.',
  ],
  que_vigilar: 'La tesis depende de que el ARPA siga creciendo un 5-7 % al año. La señal de que no se cumple sería una certificación de la demanda colectiva seguida de una congelación de tarifas, o un ARPA por debajo del +4 % en un semestre con sucursales a la baja.',
  cambiaria_recomendacion: [
    'Si el tribunal certifica la demanda colectiva en noviembre de 2026 y la empresa congela tarifas, pasaríamos a Mantener.',
    'Si el ARPA crece menos de un 4 % interanual en un semestre, pasaríamos a Mantener.',
    'Si la cuota de tiempo en portales (Comscore) baja del 85 %, revisaríamos el foso.',
    'Por encima de 6,26 GBP, Vender; por debajo de 4,90, la compra gana margen.',
  ],
  kpis_seguimiento: [
    { kpi: 'ARPA (crecimiento interanual)', nivel_actual: '+7 % (1S26)', umbral_alerta: '< +4 %', por_que: 'Es todo el crecimiento.' },
    { kpi: 'Sucursales de agencia', nivel_actual: '16.385 (+2 %)', umbral_alerta: 'Caída > 2 %', por_que: 'Mide la amenaza de CoStar.' },
    { kpi: 'Cuota de tiempo (Comscore)', nivel_actual: '89 %', umbral_alerta: '< 85 %', por_que: 'Base del efecto red.' },
    { kpi: 'Margen operativo subyacente', nivel_actual: '69 % (1S26)', umbral_alerta: '< 66 %', por_que: 'El plan de IA no puede alargarse.' },
    { kpi: 'Demanda colectiva', nivel_actual: 'Vista 2-3 nov 2026', umbral_alerta: 'Certificación', por_que: 'Riesgo binario.' },
  ],
  confianza: 'Media',
};
