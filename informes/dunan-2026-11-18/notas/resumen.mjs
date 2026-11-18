// Resumen ejecutivo de DunAn (corte 2026-11-18). Cifras del motor tal cual (cálculo del 18-nov); hechos con cita de la letra de la nota.
const sintesis = [
  '**La recomendación y por qué.** Comprar con convicción baja. El objetivo a 12 meses es de 13,20 CNY: rentabilidad ponderada del 23,1 % con dividendo y del 20,6 % en el base (12,93), frente a un precio de 10,80. El valor intrínseco es de 17,29 (+60,1 %) y el objetivo medio de los analistas, 14,28 [D3]. La asimetría a 12 meses es de 2,19. La razón: el 3T26 confirma que 2026 es un bache de margen y no un deterioro, y el precio sigue en 10,4 veces nuestro BPA recurrente de 2027e. La convicción es baja (el motor sugiere media) porque la señal es frágil: con la historia del PER al cierre (v2) la rentabilidad es del 11,5 % y con un BPA un 10 % menor también queda en Mantener. Subiría con un margen bruto por encima del 18 % en el 4T26 y un flujo operativo de 2026 por encima de 1.000 M; bajaría con un margen bruto trimestral por debajo del 16 %.',
  '**El negocio.** DunAn forma con Sanhua el duopolio mundial de válvulas de cuatro vías y de expansión para aire acondicionado, y crece en coche eléctrico y en centros de datos: más de 700 M en 9M26, el doble [A13, B1]. Margen EBITDA del 10,8 % (la mitad que Sanhua) con muy poco capital: ROIC del 26,7 % frente a un WACC del 8,49 % [A1, D4]. Sostenibilidad: Sí; proyectamos un 6,3 % anual, por debajo del 7,3 % histórico y del 6,9 % que financia su reinversión.',
  '**Finanzas.** El 3T26 vende 3.536 M (+18,1 %) y gana 261 M (+11,9 %), con un margen bruto del 18,9 % tras el 16,3 % del 1S26 [A13]. En 9M26 las ventas suben un 10,7 % y el beneficio baja un 5,3 %. Empeora la caja: flujo operativo de 594 M (−18,9 %) por existencias y efectos a cobrar y capex de 395 M (+62 %) [A13]. Caja neta de 2.727 M. El aviso de dilución del 4,9 % anual viene de la ampliación de Gree de 2022; en 2026 las acciones bajan a 1.073,98 M [A14].',
  '**Equipo y gobierno.** Gree controla el 38,14 %, es primer cliente y tiene caja de DunAn en su financiera (26 % de los minoritarios en contra) [C11, C3]. Ahora entra en la refrigeración líquida citando a DunAn como su fabricante de componentes: apoyo comercial y posible conflicto [B11].',
  '**Valoración.** El DCF da 16,73 CNY (+54,9 %) y pesa el 60 %; escenarios el 30 % y comparables el 10 % (mediana de 22,1 veces, inflada por la refrigeración de centros de datos). El precio descuenta un margen EBITDA del 7,5 % para siempre o una rentabilidad del 13,8 % anual. Nuestro BPA recurrente de 2028e (1,134) está un 11 % por debajo del consenso, que usa el publicado.',
  '**Riesgos y catalizadores.** Que la caída del aire acondicionado chino dure y el cobre vuelva a apretar: el bajista a 12 meses da 6,32 CNY (−40,5 %). Después, el reparto con Gree en centros de datos. Catalizadores: resultados de 2026 (antes del 30-abr-2027) con el dividendo, y el 1T27. El foro ve la acción barata y se frustra porque no sube tras el 3T [E1].',
  '**Qué cambiaría la decisión.** Nivel de compra hoy: B (límite 10,88 CNY; el nivel A pide 10,41). La regla da Comprar por debajo de 11,56. Para quien la tiene, se mantiene por debajo de 12,09 (filtro de mantener); la banda Vender de la regla empieza en 14,77. Pasaríamos a Mantener con un margen bruto trimestral por debajo del 16 % o un beneficio recurrente de 2026 por debajo de 950 M.',
].join('\n\n');

export default {
  resumen: {
    recomendacion: 'Comprar',
    conviccion: 'Baja',
    justificacion_recomendacion: null,
    horizonte: '12 meses (tesis completa a 2-3 años)',
    sintesis,
    tesis: [
      'DunAn fabrica válvulas de cuatro vías, válvulas de expansión electrónicas y otros componentes de refrigeración; con Sanhua forma el duopolio mundial de esas piezas para aire acondicionado [B1]. Gana poco por unidad, pero con muy poco capital: ROIC del 26,7 % en 2025 y 2.727 M de caja neta a sep-26 [A1, A13]. Crece fuera del aire acondicionado: coche eléctrico (+52 % en 2025) y centros de datos (más de 700 M en 9M26, el doble) [A1, A13].',
      'El precio de 10,80 CNY equivale a 10,4 veces nuestro BPA recurrente de 2027e y a 6,0 veces el EBITDA de los últimos 12 meses, con 2,54 CNY por acción de caja neta. El DCF inverso no tiene solución en crecimiento: el precio pide un margen EBITDA del 7,5 % para siempre, el de 2021-2022, frente al 10,8 % de 2025 y el 18,9 % de margen bruto del 3T26 [A13].',
      'El mercado acierta en que 2026 es un año flojo (beneficio de 9M26 −5,3 %) y en que la caja se reparte poco. Se equivoca, a nuestro juicio, en tratarlo como permanente: el 3T26 ya crece un 11,9 % en beneficio y el margen bruto vuelve al nivel de 2025 [A13]. Para invertir hay que creer que el margen EBITDA vuelve al 10,5 % en 2028 y que el mercado pagará 11,4 veces el beneficio, solo un 10 % más que hoy.',
    ].join('\n\n'),
    vision_diferencial: {
      mercado_descuenta: 'Un proveedor de aire acondicionado en un ciclo bajista, controlado por Gree, con caja que no reparte y una historia de centros de datos que ya se pagó y se devolvió en septiembre-octubre. Tras el límite al alza del 27-oct la acción ha vuelto a 10,80.',
      nuestra_vision: 'El beneficio toca fondo en 2026 (BPA recurrente de 0,94) y el negocio no se deteriora: el margen bruto del 3T26 vuelve al 18,9 %, las ventas crecen un 18,1 % y los centros de datos ya son una cifra (más de 700 M) [A13]. Con un BPA recurrente de 1,134 en 2028e y 11,4 veces, el precio llega a 12,93 en el base.',
      por_que: 'Nuestro BPA es más prudente que el de los analistas (recurrente y con menos margen) y aun así el objetivo sale un 23,1 % por encima del precio. Lo que no está claro es el plazo: la regla v2 y un BPA un 10 % menor dan Mantener, por eso la compra es de nivel B y no A.',
    },
    a_favor: [
      '**Rentabilidad muy por encima de su coste**: ROIC del 26,7 % frente a un WACC del 8,49 % [A1].',
      '**El 3T26 vuelve a crecer**: ventas +18,1 %, beneficio +11,9 % y margen bruto del 18,9 % [A13].',
      '**Segunda curva con cifra**: centros de datos por encima de 700 M en 9M26, el doble [A13].',
      '**Precio que descuenta la crisis**: el DCF inverso pide un margen EBITDA del 7,5 % para siempre, frente al 10,8 % de 2025.',
      '**Balance con caja**: 2.727 M de caja neta a sep-26, el 23,5 % de la capitalización [A13].',
    ],
    en_contra: [
      '**Beneficio de 2026 a la baja**: 9M26 −5,3 % y objetivo de incentivos (1.245 M) que no se cumplirá [A13, A12].',
      '**Caja operativa más débil**: flujo operativo de 9M26 −18,9 % por existencias y efectos a cobrar [A13].',
      '**Control de Gree**: accionista del 38,14 %, primer cliente, depósitos en su financiera y ahora también competidor potencial en refrigeración líquida [C11, B11].',
      '**Señal frágil**: la regla v2 da un 11,5 % y un BPA un 10 % menor también deja la compra en Mantener.',
      '**Reparto bajo**: dividendo de 0,10 CNY, el 0,9 % del precio, con un payout del 10 % [A10].',
    ],
    que_vigilar: 'La tesis depende de que el margen EBITDA vuelva al 10,2-10,5 % en 2027-2028 (9,9 % supuesto en 2026e) y de que el circulante se normalice. La señal de que no se cumple es un margen bruto trimestral por debajo del 16 %, un beneficio recurrente de 2026 por debajo de 950 M o un flujo operativo de 2026 por debajo de 1.000 M [A13]. En el gobierno, vigilar los depósitos en Gree Group Finance, el reparto de la refrigeración líquida con Gree y que el dividendo de 2026 suba.',
    cambiaria_recomendacion: [
      'Si el precio supera 11,56 CNY sin cambio en el BPA, pasaríamos a Mantener; para quien la tiene, se vende por encima de 12,09 (filtro de mantener). La banda Vender de la regla empieza en 14,77.',
      'Si el margen bruto trimestral baja del 16 % (4T26 o 1T27), pasaríamos a Mantener.',
      'Si el beneficio recurrente de 2026 queda por debajo de 950 M CNY (BPA < 0,88), recortaríamos el BPA de 2028e y pasaríamos a Mantener.',
      'Si Gree anuncia que se queda el negocio de refrigeración líquida o los depósitos en Gree Group Finance superan el 50 % de la caja, pasaríamos a Mantener.',
      'Si la empresa propone repartir más del 30 % del beneficio de 2026, subiríamos la convicción.',
    ],
    kpis_seguimiento: [
      { kpi: 'Margen bruto trimestral', nivel_actual: '18,9 % en el 3T26 (16,3 % en el 1S26)', umbral_alerta: '< 16 %', por_que: 'Mide si el cobre y los precios de los clientes se repercuten [A13].' },
      { kpi: 'Beneficio recurrente anual', nivel_actual: '717 M en 9M26 (−2,7 %)', umbral_alerta: '< 950 M en 2026', por_que: 'Nuestro BPA recurrente de 2026e es 0,94 [A13].' },
      { kpi: 'Ventas a centros de datos', nivel_actual: '> 700 M en 9M26 (el doble)', umbral_alerta: 'crecimiento < 30 %', por_que: 'Es la segunda curva que sostiene el volumen de 2027e-2028e [A13].' },
      { kpi: 'Flujo operativo', nivel_actual: '594 M en 9M26 (−18,9 %)', umbral_alerta: '< 1.000 M en 2026', por_que: 'El circulante subió un 33 % en nueve meses [A13].' },
      { kpi: 'Dividendo por acción', nivel_actual: '0,10 CNY (payout 10 %)', umbral_alerta: 'sin subida en abril de 2027', por_que: 'Es la vía para cerrar la distancia con el valor intrínseco [A10].' },
    ],
    confianza: 'Media',
  },
};
