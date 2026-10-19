// Resumen ejecutivo de DunAn (corte 2026-10-19). Cifras del motor tal cual (cálculo del 19-oct); hechos con cita de la letra de la nota.
const sintesis = [
  '**La recomendación y por qué.** Comprar con convicción baja. El objetivo a 12 meses es de 13,18 CNY: una rentabilidad ponderada del 23,5 % con dividendo y del 21,2 % en el caso base (12,93), frente a un precio de 10,75. El valor intrínseco es de 16,64 CNY (+54,8 %) y el objetivo medio de los analistas de 14,25 [D2]. El mercado paga 10,6 veces nuestro beneficio de 2027 por un negocio con un ROIC del 26,7 % y una caja neta de 2.876 M, el 25 % de la capitalización [A6]. La convicción baja de la Media que sugieren los criterios porque la señal es frágil: con la regla v2 de control la rentabilidad es del 11,3 % (Mantener) y con un BPA un 10 % menor también; la compra que aguanta todas las variantes está por debajo de 10,40 CNY. Subiría si el 3T26 (27-oct) muestra un margen bruto estable y el beneficio de 9M26 cae menos del 5 % [D8].',
  '**El negocio.** DunAn es, con Sanhua, uno de los dos grandes fabricantes mundiales de válvulas de cuatro vías y de expansión electrónicas para aire acondicionado, y vende también a la gestión térmica del coche eléctrico y a equipos de refrigeración [A1, B1]. Su ventaja es de rotación, no de margen: margen EBITDA del 10,8 % en 2025 frente al 19,5 % de Sanhua, pero un capital invertido de solo 3.832 M porque los proveedores financian el circulante [A1, D4]. ROIC del 26,7 % frente a un WACC del 8,54 %. La calidad sostiene el crecimiento que proyectamos: el 5,4 % anual es menos que el histórico (7,3 %) y que el que financia la reinversión al ROIC actual (6,4 %), y no exige ganar cuota.',
  '**Equipo y gobierno.** Gree controla el 38,13 % y es primer cliente; la empresa deposita caja en la financiera de Gree, y el 26 % de los votos minoritarios rechazó ese acuerdo en junio [C2, C3]. Resta: la caja rinde poco y el reparto es bajo (dividendo de 0,10 CNY, el 0,9 % del precio), en parte porque la matriz arrastraba pérdidas [A10].',
  '**Valoración.** El DCF da 15,97 CNY (+48,6 %) con el valor terminal en el 73 %; pesa el 60 %, los escenarios el 30 % y los comparables el 10 %, porque su mediana (22,2 veces) está inflada por la refrigeración de centros de datos. El precio no se iguala con ningún crecimiento razonable: descuenta un margen EBITDA del 7,7 % para siempre, el de los años de crisis, o una rentabilidad del 13,3 % anual. Discrepamos del consenso en el margen: nuestro BPA de 2028e (1,105) está un 13 % por debajo de la media de los analistas [D2].',
  '**Riesgos y catalizadores.** El riesgo principal es que duren la caída del aire acondicionado chino (producción −6,2 % en el 1S26) y el cobre [A6, B2]: el bajista a 12 meses (6,32 CNY, −40,2 %) combina un BPA de 0,68 y 9,3 veces. El segundo, el gobierno: más caja en la financiera de Gree y compras desviadas. Catalizadores: el 3T26 del 27-oct y la propuesta de dividendo de 2026 en abril. El foro de Eastmoney está en capitulación tras devolver la subida del 51 % de septiembre por la refrigeración líquida, que nuestro caso base no cuenta [E1, E3].',
  '**Qué cambiaría la decisión.** Comprar por debajo de 11,55 CNY y vender por encima de 14,76; la compra robusta, por debajo de 10,40. Pasaríamos a Mantener si el margen bruto trimestral baja del 16 % dos trimestres seguidos o si el beneficio de 2026 queda por debajo de 950 M; un reparto de más del 30 % del beneficio subiría la convicción. Desde fuera de China se compra por Stock Connect: 002011 está en la lista de valores aptos para compra y venta de HKEX [D7].',
].join('\n\n');

export default {
  resumen: {
    recomendacion: 'Comprar',
    conviccion: 'Baja',
    justificacion_recomendacion: null,
    horizonte: '12 meses (tesis completa a 2-3 años)',
    sintesis,
    tesis: [
      'DunAn fabrica válvulas de cuatro vías, válvulas de expansión electrónicas y otros componentes de refrigeración; con Sanhua forma el duopolio mundial de esas piezas para aire acondicionado y crece en la gestión térmica del coche eléctrico (+26 % en el 1S26) y en equipos [A1, A6, B1]. Ingresó 13.035 M CNY en 2025 con un beneficio de 1.078 M, y su ROIC del 26,7 % triplica el WACC del 8,54 %: el circulante lo financian los proveedores y el inmovilizado es pequeño [A1].',
      'El precio de 10,75 CNY equivale a 10,6 veces nuestro BPA de 2027 y a 6,1 veces el EBITDA de los últimos 12 meses, con 2.876 M de caja neta (2,68 CNY por acción) [A6]. El DCF inverso no tiene solución: aun sin crecer, el negocio vale más que el precio. Lo que el precio descuenta es un margen EBITDA del 7,7 % para siempre o una rentabilidad del 13,3 % anual.',
      'El mercado acierta en que 2026 es un mal año: el aire acondicionado chino cae y el cobre aprieta el margen [A6]. Se equivoca, a nuestro juicio, en tratar la caída como permanente. Para invertir hay que creer que el margen vuelve al 10,5 % en 2028e (fue del 10,8 % en 2025), que Gree no usa su control contra los minoritarios y que la caja acabará repartiéndose o invirtiéndose bien.',
    ].join('\n\n'),
    vision_diferencial: {
      mercado_descuenta: 'Un proveedor de aire acondicionado al principio de un ciclo bajista, controlado por Gree, con caja atrapada y una subida temática (refrigeración líquida) que ya se ha desinflado. El mercado le paga 10,6 veces el beneficio de 2027, el mínimo de cinco años, y valora la caja por debajo de la par.',
      nuestra_vision: 'El beneficio cae en 2026 (BPA de 0,95 en los últimos 12 meses) pero el negocio no se deteriora: el ROIC sigue por encima del 25 %, el flujo de caja libre de los últimos 12 meses es de 1.218 M y el coche eléctrico y los equipos compensan parte del aire acondicionado [A6]. En 2028e esperamos un BPA de 1,105, por debajo del consenso (1,276) [D2].',
      por_que: 'Nuestro BPA ya es más prudente que el de los analistas y aun así el objetivo a 12 meses sale un 23,5 % por encima del precio. Lo que no está claro es el plazo: la regla v2 y un BPA un 10 % menor dejan la rentabilidad en el 11,3 %. Por eso la convicción es baja y la compra robusta está por debajo de 10,40.',
    },
    a_favor: [
      '**Rentabilidad muy por encima de su coste**: ROIC del 26,7 % frente a un WACC del 8,54 % [A1].',
      '**Precio que descuenta la crisis**: el DCF inverso pide un margen EBITDA del 7,7 % para siempre, frente al 10,8 % de 2025.',
      '**Balance con caja**: 2.876 M de caja neta a junio de 2026, el 25 % de la capitalización [A6].',
      '**Duopolio mundial** con Sanhua en válvulas de cuatro vías y de expansión, con homologaciones largas [B1, B5].',
      '**Crecimiento fuera del aire acondicionado**: gestión térmica del vehículo eléctrico +26 % y equipos +35 % en el 1S26 [A6].',
    ],
    en_contra: [
      '**Beneficio a la baja en 2026**: BPA de los últimos 12 meses de 0,95 frente a 1,02 en 2025 y objetivo de incentivos (1.245 M) que no se cumplirá [A6, A12].',
      '**Control de Gree**: primer cliente y accionista del 38,13 %, con depósitos en su financiera que el 26 % de los minoritarios rechazó [C2, C3].',
      '**Margen de la mitad que Sanhua**: EBITDA del 10,8 % frente al 19,5 % [D4].',
      '**Señal frágil**: la regla v2 y un BPA un 10 % menor dan una rentabilidad a 12 meses del 11,3 % (Mantener).',
      '**Reparto bajo**: dividendo de 0,10 CNY, el 0,9 % del precio, con un payout del 10 % [A10].',
    ],
    que_vigilar: 'La tesis depende de que el margen EBITDA vuelva al 10,2-10,5 % en 2027-2028 (9,2 % en el 1S26). La señal de que no se cumple es un margen bruto trimestral por debajo del 16 % dos trimestres seguidos, o un 3T26 (27-oct) con el beneficio de 9M26 más de un 10 % por debajo del de 9M25 [A6, D8]. En el gobierno, vigilar los depósitos en Gree Group Finance y que el dividendo de 2026 suba.',
    cambiaria_recomendacion: [
      'Si el precio supera 11,55 CNY sin cambio en el BPA, pasaríamos a Mantener; por encima de 14,76, a Vender.',
      'Si el margen bruto trimestral baja del 16 % dos trimestres seguidos (3T26 y 4T26), pasaríamos a Mantener.',
      'Si el beneficio de 2026 queda por debajo de 950 M CNY (BPA < 0,88), recortaríamos el BPA de 2028e y pasaríamos a Mantener.',
      'Si los depósitos en Gree Group Finance superan el 50 % de la caja o Gree reduce sus compras por debajo del 18 % de las ventas, pasaríamos a Mantener.',
      'Si la empresa propone repartir más del 30 % del beneficio de 2026, subiríamos la convicción.',
    ],
    kpis_seguimiento: [
      { kpi: 'Margen bruto trimestral', nivel_actual: '17,0 % en el 2T26 (15,4 % en el 1T26; 16,4 % en el 1S26), estimación con el 1T26 y el 1S26', umbral_alerta: '< 16 % dos trimestres seguidos', por_que: 'Mide si el cobre y los precios de los clientes se repercuten [A6].' },
      { kpi: 'Margen EBITDA anual', nivel_actual: '9,2 % en el 1S26; 10,8 % en 2025', umbral_alerta: '< 9 % en 2026', por_que: 'El caso base pide un 10,5 % en 2028e.' },
      { kpi: 'Ventas de gestión térmica del vehículo', nivel_actual: '+26 % en el 1S26', umbral_alerta: 'crecimiento < 10 %', por_que: 'Es el motor del crecimiento fuera del aire acondicionado [A6].' },
      { kpi: 'Caja neta y depósitos en Gree Group Finance', nivel_actual: 'caja neta de 2.876 M (jun-26)', umbral_alerta: 'depósitos > 50 % de la caja', por_que: 'La caja es el 25 % de la capitalización; si queda atrapada, el descuento es permanente [C2].' },
      { kpi: 'Dividendo por acción', nivel_actual: '0,10 CNY (payout 10 %)', umbral_alerta: 'sin subida en abril de 2027', por_que: 'Es la vía para cerrar la distancia con el valor intrínseco [A10].' },
    ],
    confianza: 'Media',
  },
};
