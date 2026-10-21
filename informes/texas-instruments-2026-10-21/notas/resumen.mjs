// Resumen ejecutivo (Texas Instruments, corte 2026-10-21, tras el 3T26).
const sintesis = `**La recomendación y por qué.** Mantener, con convicción baja, y no comprar. A 12 meses, con nuestro PER y nuestro BPA de 2028e, TI vale 261,10 USD ponderado (−6,3 % con el dividendo sobre 284,65 USD) y 286,37 USD en el caso base (+2,6 %): no llega para comprar (+15 % y +12 %) ni cae lo bastante para vender (−10 %). El valor intrínseco es mucho menor, 148,79 USD (−47,7 %): el precio pide un crecimiento del 18,3 % anual durante nueve años, frente al 5,5 % de nuestro caso base. La convicción es baja porque la venta empieza a solo un 4 % por encima del precio (296,43 USD) y el BPA depende de un ciclo que ya va por su segundo año.

**El negocio.** TI es la mayor empresa de semiconductores analógicos del mundo (16,2 % del mercado [B7, B11]), con fábricas propias de 300 mm recién terminadas y un catálogo de decenas de miles de productos para industria y automoción. El 3T26 fue fuerte: ventas de 6.055 M USD (+28 %), margen bruto del 64,2 % y BPA de 2,62 USD, por encima de la guía; la guía del 4T es plana sobre el 3T [A2]. El capex baja de unos 5.000 M al año a 2.000-3.000 M y la caja libre de 12 meses ya es de 8.422 M [A2, A14].

**Equipo y gobierno.** Consejo con 11 independientes de 12, pero presidente y primer ejecutivo en la misma persona desde enero, director financiero nuevo desde agosto y un bonus discrecional, sin fórmulas [C1, C5, C7]. Los directivos han vendido 117 M USD en 12 meses sin compras [C21].

**Valoración.** DCF de 134,29 USD; comparables entre 192 y 196 USD; transacciones 162,66 USD. TI cotiza a 28,7 veces el BPA de los próximos 12 meses frente a 19,8 de sus comparables y a 23,4 de su mediana adelantada de cinco años [D5, D12]. Los analistas, con 19 compras de 36 y un objetivo medio de 324,71 USD, pagan el ciclo; nosotros lo proyectamos también (BPA de 10,28 USD en 2027e, igual que el consenso), pero no el múltiplo.

**Riesgos y catalizadores.** El riesgo principal es que el rebote de 2026 sea reposición de inventario (bajista a 12 meses de 158,78 USD). La compra de Silicon Labs (≈7.500 M USD en efectivo) sube la deuda en 2027 y la investigación antidumping china amenaza su mayor mercado [D3, B13]. Fuera de hora la acción no se movió tras los resultados [D10].

**Qué cambiaría la decisión.** Compraríamos por debajo de 148,79 USD y venderíamos por encima de 296,43 USD. Una guía del 1T27 sin la caída estacional y un margen bruto por encima del 65 % subirían el BPA de 2028e hacia el consenso.`;

export default {
  recomendacion: 'Mantener', conviccion: 'Baja', horizonte: '12 meses', justificacion_recomendacion: null,
  sintesis,
  tesis: `Texas Instruments es la mayor empresa de semiconductores analógicos del mundo y la de menor coste de fabricación, con fábricas propias de 300 mm recién terminadas [B1, B7]. Tras un ciclo de inversión de más de 20.000 M USD, el capex baja y la caja libre sube: 8.422 M en los últimos 12 meses [A2].

El precio, 284,65 USD, ya paga ese giro y más: 27,7 veces nuestro BPA de 2027e, frente a una mediana adelantada de 23,4 veces, y un DCF inverso que pide crecer un 18,3 % anual durante nueve años.

El mercado acierta en el ciclo de 2026-2027, que también proyectamos. Discrepamos en el múltiplo: TI es cíclica y sus ventas solo crecieron un 3,2 % anual en 2016-2025. A 12 meses, el precio está en su sitio; a varios años, está caro.`,
  vision_diferencial: {
    mercado_descuenta: 'Un ciclo largo con las fábricas llenas, márgenes de récord y una caja libre que vuelve a recompras: un crecimiento del 18,3 % anual en nueve años con nuestros márgenes, o una rentabilidad del 7,2 % anual para el accionista.',
    nuestra_vision: 'Compartimos el ciclo cercano (BPA de 10,28 USD en 2027e, como el consenso), pero no su duración: después crecemos como el mercado analógico, un 5-6 %, y el bajista de reposición de inventario es verosímil.',
    por_que: 'TI ha tenido dos caídas de ventas en cinco años (2019 y 2023-2024, −22 % en dos años) y el rebote de 2026 lleva subidas de precio y reposición de canal de fase alta [A1].',
  },
  a_favor: [
    '**Líder del analógico**: 16,2 % del mercado mundial y el coste de fabricación más bajo con 300 mm [B7, B11].',
    '**Ciclo al alza**: ventas del 3T26 +28 % y margen bruto del 64,2 % [A2].',
    '**Caja libre al alza**: 8.422 M USD en 12 meses al bajar el capex [A2].',
    '**Dividendo creciente**: +7 %, hasta 1,52 USD por trimestre [D2].',
    '**Guía cumplida**: 11 trimestres sin quedar por debajo de su horquilla [C8-C18].',
  ],
  en_contra: [
    '**Precio exigente**: el DCF da 134,29 USD; el precio pide un 18,3 % de crecimiento anual en nueve años.',
    '**Múltiplo alto**: 28,7 veces el BPA de los próximos 12 meses frente a 19,8 de sus comparables [D11, D12].',
    '**Silicon Labs**: ≈7.500 M USD en efectivo por un negocio sin beneficio operativo [D3].',
    '**China**: investigación antidumping sobre el analógico de EE. UU. [B13].',
    '**Gobierno**: presidente y primer ejecutivo en la misma persona y bonus discrecional [C1, C5].',
  ],
  que_vigilar: 'La tesis depende de que el ciclo se modere en 2027 y de que el múltiplo vuelva hacia su historia. Lo que la rompería: guías trimestrales que sigan sin la caída estacional, con el margen bruto por encima del 65 %, y la vuelta de las recompras. Lo que la confirmaría: una guía del 1T27 con caída y existencias del canal altas.',
  cambiaria_recomendacion: [
    'Si el precio baja de 148,79 USD, pasaríamos a Comprar.',
    'Si el precio sube por encima de 296,43 USD, la ponderada cae por debajo del −10 % y pasaríamos a Vender.',
    'Si la guía del 1T27 crece sobre el 4T26, subiríamos el crecimiento de 2027e hacia el consenso.',
    'Si China impone aranceles al analógico de EE. UU., recortaríamos las ventas de 2027e-2028e un 5 %.',
  ],
  kpis_seguimiento: [
    { kpi: 'Guía de ventas trimestral', nivel_actual: '5.800-6.300 M USD (4T26)', umbral_alerta: 'Por debajo del trimestre anterior más allá de lo estacional', por_que: 'Marca el giro del ciclo.' },
    { kpi: 'Margen bruto', nivel_actual: '64,2 % (3T26)', umbral_alerta: '< 60 %', por_que: 'Carga de las fábricas.' },
    { kpi: 'Caja libre de 12 meses', nivel_actual: '8.422 M USD', umbral_alerta: '< 6.000 M', por_que: 'Sostiene dividendo y recompras.' },
    { kpi: 'Existencias (días)', nivel_actual: 'Altas a propósito', umbral_alerta: 'Subida con ventas planas', por_que: 'Señal de corrección.' },
  ],
};
