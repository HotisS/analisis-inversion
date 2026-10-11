// Resumen ejecutivo (Burkhalter, corte 2026-10-11). Se escribe el último; cifras del motor tal cual.

const sintesis = `**La recomendación y por qué.** Mantener, con convicción baja. El valor objetivo es de 111,78 CHF, un 10,3 % por debajo del precio de 124,60 CHF, y con el dividendo la rentabilidad total esperada a 12 meses es del −6,1 %. La asimetría es desfavorable: el alcista gana un 13,5 % y el bajista pierde un 37,2 % (0,36 veces). Las reglas discrepan: con nuestro WACC del 6,4 % la regla da Vender; con la prima de riesgo que hoy pide el mercado da Mantener (valor de 136,60 CHF y rentabilidad del 13,8 %). Manda la relativa. La convicción es baja porque la diferencia está en la tasa de descuento, no en las cifras: nuestro EBITDA de 2026e coincide con el consenso. La subiría hacia Vender un orgánico negativo en el segundo semestre de 2026 (ventas del 2S26 por debajo de 620 M); hacia Comprar, una caída del precio por debajo de 111,33 CHF.

**El negocio.** Burkhalter es el mayor instalador eléctrico y de técnica de edificios de Suiza, con unos 1.208 M de ventas y cerca del 6 % de un mercado fragmentado (estimación) [A1, B1]. Es un negocio de mano de obra (personal = 43,5 % de los ingresos), licitado por precio y con un margen EBIT estable pero bajo (5,4-6,1 % en 2021-2025) [B1, A1]. El ROIC publicado del 55,8 % está inflado porque el fondo de comercio (435,2 M) se compensa contra el patrimonio; con él, ronda el 11 %, por encima del WACC pero sin un foso amplio. La calidad del negocio **sí** sostiene el crecimiento que proyectamos (1,8 % anual), porque no pide ganar cuota ni capital; lo que no ha demostrado es poder de precios.

**Finanzas.** Caja neta (51,8 M a fin de 2025) y un flujo libre que convierte el 127 % del beneficio en 2020-2025, con ayuda del cobro de clientes [A1]. La señal que preocupa está en el semestre: ventas planas (+0,1 %) con cinco compras, facturación de 559,0 a 517,8 M y obra pendiente de facturar de 27,8 a 69,5 M [A6]. El orgánico es negativo.

**Equipo y gobierno.** Resta. Cumple seis de trece criterios: el comité de auditoría lo preside un antiguo CEO, no hay auditoría interna, la retribución variable recibió más del 22 % de votos en contra en las tres últimas juntas y un consejero vendió unos 7,5 M CHF, parte en el máximo de abril [C1, C2, C12]. A favor: la guía cualitativa de BPA se ha cumplido cinco años seguidos y no hay accionista de control [C11].

**Valoración.** El DCF da 119,25 CHF; los escenarios ponderados, 114,54, y los comparables, 87,79 (14,2 veces el EBITDA de los próximos 12 meses frente a una mediana de 8,0 veces, en parte por normas contables y tipos distintos). El DCF inverso dice que el precio supone un crecimiento del 3,3 % anual hasta 2032e, frente al 1,9 % de nuestro caso base, o un margen EBITDA del 7,7 %, por encima del máximo de la serie (6,9 %). Comprar hoy rinde un 6,2 % anual: lo que vale un bono en francos con un dividendo del 4,2 %. Los analistas (precio objetivo medio de 148,18 CHF, todos en mantener) incluyen compras que nosotros no proyectamos [D6].

**Riesgos y catalizadores.** El riesgo mayor es el margen: en 2017-2020 el EBIT del negocio eléctrico se redujo a la mitad con ventas planas, y un bajista así deja el valor en 78,28 CHF [A5]. El segundo, los tipos: con medio punto más de WACC y medio menos de crecimiento terminal, 102,84 CHF. Catalizadores: resultados de 2026 el 12-abr-2027 y junta el 11-may-2027 [D22].

**Qué cambiaría la decisión.** Comprar por debajo de 111,33 CHF y vender por encima de 151,46. Pasaríamos a Vender si el orgánico de 2026 sale por debajo del −2 % o el margen EBITDA del 1S27 baja del 5,8 %.`;

export const resumen = {
  recomendacion: 'Mantener',
  conviccion: 'Baja',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis,
  tesis: `Burkhalter es el mayor grupo suizo de instalaciones eléctricas y técnicas de edificios: 1.207,5 M CHF de ventas en 2025, 87 sociedades locales y un margen EBIT del 6,1 % [A1, A6]. Desde la fusión con poenina en 2022 combina electricidad con climatización y fontanería, convierte el beneficio en caja y reparte el 90 % como dividendo [A1, A9].

El precio, 124,60 CHF, es 19,1 veces el beneficio de los próximos 12 meses y 15,7 veces el EBITDA de los últimos 12, con una prima del 17-22 % sobre su media de 2020-2025 y muy por encima de sus comparables europeos. El DCF inverso dice que el mercado descuenta un crecimiento del 3,3 % anual hasta 2032e, o un margen EBITDA del 7,7 % para siempre: más de lo que el negocio ha dado sin compras.

El mercado acierta en que es un negocio estable, con caja y dividendo en francos, y en que los tipos suizos justifican múltiplos más altos que los de sus comparables. Se equivoca, a nuestro juicio, en el crecimiento: el orgánico del 1S26 fue negativo y el BPA sube por margen y compras [A6]. Para invertir hay que creer que la electrificación de los edificios devuelve el orgánico al 3 % anual o aceptar una rentabilidad del 6 % en francos.`,
  vision_diferencial: {
    mercado_descuenta: 'Un crecimiento de las ventas del 3,3 % anual hasta 2032e con márgenes del 7,4 %, o un margen EBITDA del 7,7 % para siempre con un crecimiento del 1,9 %; en la práctica, que las compras pequeñas sigan sumando y que el margen siga subiendo.',
    nuestra_vision: 'Orgánico del 2,0-2,5 % en 2027-2028 que converge al 1 %, sin compras, y un margen EBITDA del 7,4 %, por debajo del consenso (7,6 % en 2028e). Nuestro EBITDA de 2028e es un 5,9 % menor que el del consenso.',
    por_que: 'Las ventas del 1S26 se estancaron pese a cinco compras y la facturación cayó un 7 % [A6]. El mercado suizo de la construcción lleva siete años plano en términos nominales [B7] y los contratos se licitan por precio [B1]. Las compras que el consenso incluye no crean valor evidente si se pagan con acciones a 20 veces el beneficio.',
  },
  a_favor: [
    '**Caja y dividendo**: caja neta de 51,8 M a fin de 2025 y un dividendo de 5,20 CHF (4,2 %) [A1].',
    '**Guía cumplida**: el BPA subió cada año de 2021 a 2025, de 3,99 a 5,78 CHF [C7, A1].',
    '**Poco capital**: capex del 0,8 % de las ventas y una conversión en caja del 127 % del beneficio en 2020-2025.',
    '**Electrificación**: el Gebäudeprogramm pagó 516,4 M CHF en 2025, 186 M para instalaciones técnicas [B10].',
    '**Con la prima del mercado** el valor sería de 136,60 CHF (+9,6 %).',
  ],
  en_contra: [
    '**Orgánico negativo**: ventas del 1S26 +0,1 % con cinco compras y facturación −7 % [A6].',
    '**Cara frente a sus comparables**: 19,1 veces el beneficio frente a 16,1 veces de mediana.',
    '**ROIC inflado**: 55,8 % publicado, ≈ 11 % con el fondo de comercio compensado (435,2 M) [A1].',
    '**Asimetría desfavorable**: el bajista pierde un 37,2 % y el alcista gana un 13,5 %.',
    '**Gobierno flojo**: 6 de 13 criterios, comité de auditoría no independiente y más del 22 % de votos en contra de la retribución variable [C1, C2].',
    '**Dividendo fiscalmente menos atractivo** cuando se agoten las reservas de capital, en unos tres años [A9].',
  ],
  que_vigilar: `La tesis depende de si el orgánico de 2026 es un bache o una tendencia. La señal está en las ventas y en la facturación del segundo semestre (resultados del 12-abr-2027): ventas del 2S26 por debajo de 620 M, o una obra pendiente de facturar que no se convierte en facturas, confirmarían que el BPA crece solo por margen y compras.`,
  cambiaria_recomendacion: [
    'Si el precio baja de 111,33 CHF, pasaríamos a Comprar; por encima de 151,46 CHF, a Vender.',
    'Si el crecimiento orgánico de 2026 queda por debajo del −2 %, pasaríamos a Vender.',
    'Si el margen EBITDA del 1S27 baja del 5,8 % (el del 1S25), revisaríamos el caso base hacia el bajista.',
    'Si el orgánico vuelve a más del 3 % en el 1S27 con la facturación al alza, subiríamos el caso base y pasaríamos a Comprar por debajo de 130 CHF.',
  ],
  kpis_seguimiento: [
    { kpi: 'Crecimiento de ventas semestral', nivel_actual: '+0,1 % (1S26, con compras)', umbral_alerta: '< 0 % en el 2S26', por_que: 'El precio descuenta un 3,3 % anual.' },
    { kpi: 'Margen EBITDA semestral', nivel_actual: '6,0 % (1S26)', umbral_alerta: '< 5,8 % en el 1S27', por_que: 'Cada punto de margen permanente vale en torno a un 15 % del valor.' },
    { kpi: 'Obra pendiente de facturar (activos por obra)', nivel_actual: '183,9 M (jun-26)', umbral_alerta: '> 200 M a fin de año', por_que: 'Sostiene las ventas netas mientras la facturación cae.' },
    { kpi: 'Bono de la Confederación a 10 años', nivel_actual: '0,59 %', umbral_alerta: '> 1,0 %', por_que: 'El valor es muy sensible a la tasa de descuento.' },
    { kpi: 'Voto en contra de la retribución variable', nivel_actual: '22,8 % (junta de 2026)', umbral_alerta: '> 30 %', por_que: 'Mide la presión de los accionistas sobre el gobierno.' },
  ],
  confianza: 'Media',
};
