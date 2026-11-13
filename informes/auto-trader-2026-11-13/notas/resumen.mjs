// Resumen ejecutivo (Auto Trader, corte 2026-11-13). Se escribe el último; cifras del motor tal cual.

const sintesis = `**La recomendación y por qué.** Comprar, con convicción baja. El objetivo a 12 meses es de 6,87 GBP: rentabilidad ponderada del 23,5 % con el dividendo y del 23,7 % en el caso base, por encima del 15 % y el 12 % que pide la compra; el valor intrínseco es de 6,84 GBP (+20,8 %) y el objetivo medio de los analistas, 6,015 GBP [D11]. La razón: cotiza a 13,7 veces nuestro BPA de FY2028e (mediana de cinco años: 22,0 veces) y el BPA sube un 10 % en FY2029e por la recompra ya anunciada. La convicción es baja por tres motivos: las reglas del DCF discrepan (Mantener con su WACC del 9,5 %, Comprar con la prima del mercado), la compra no es robusta (con la regla v2 la rentabilidad es del 12,3 % y con un BPA un 10 % peor, del 13,1 %) y el semestre no mejoró el negocio. Subiría si el segundo semestre acelera de verdad (ingresos sin venta de vehículos por encima del +3 %) y bajaría si los forecourts vuelven a caer por debajo de 13.700.

**El negocio.** Más del 75 % de los minutos en portales de coches y 12 veces el tiempo del segundo [A16]. Margen EBITDA del 66 % y ROIC del 50,9 %, 41,4 puntos sobre el WACC: **la calidad sostiene el crecimiento que proyectamos** (veredicto «Sí»): sale del precio, que aportó +117 GBP al ARPR también en el 1S27, y no necesita capital [A16]. La debilidad está en el volumen: forecourts medios −2,3 % y palanca de stock de −89 GBP.

**Qué cambió desde el 15-oct.** El 1S FY2027 (5-nov) cumplió dos de nuestras señales de alarma: forecourts por debajo de −2 % interanual y ARPR por debajo de +3 % (+1 %) [A16]. Rebajamos FY2027e de +3,6 % a +0,8 % y el BPA de FY2028e de 0,4273 a 0,4144. Pero la guía se mantuvo y el 29 % de los concesionarios perdidos ha vuelto [A16]. La recomendación pasa de Mantener a Comprar por el método, no por el negocio: con el precio un 10,5 % más alto, el PER de hoy (13,7) ya no está 1,8 veces por debajo de su mediana y el selector aplica la v3 en vez de la v2. Por debajo de ≈5,06 GBP volvería a decidir la v2.

**Finanzas.** Conversión en caja del 99 %; la deuda neta ajustada sube a 399 M (1,0 veces el EBITDA) por recompras [A16]. Nuestro BPA de FY2029e queda un 6,4 % por debajo del consenso porque no contamos recompras futuras.

**Valoración.** El DCF da 6,44 GBP; el DCF inverso dice que el precio supone un crecimiento del 2,0 % anual hasta FY2034e, frente al 4,2 % de nuestro base. Cotiza a 11,4 veces el EBITDA, percentil 11 de su década y por debajo de la mediana de los comparables (14,3 veces) [D13-D19].

**Riesgos y catalizadores.** El mayor es la IA: si asistentes o agentes se quedan con la búsqueda, el bajista vale 3,76 GBP (−33,6 %); hoy menos del 1 % del tráfico llega de ella, pero visitas (−3 %) y minutos (−6 %) bajaron en el semestre [A16]. El segundo, que la aceleración prometida no llegue. Catalizadores: recompras de ≈195 M hasta marzo, evento de precios del 1-abr-2027 y resultados del 27-may-2027 [A16]. Corredores y foros giran a favor (Panmure y Jefferies a Comprar; cortos del 4,21 %) [D35, D30, D7].

**Qué cambiaría la decisión.** Compra de nivel B1 a mercado si cotiza en 5,73 GBP o por debajo; compra robusta de nivel A solo por debajo de 5,48 GBP. Quien la tiene la mantiene mientras cotice por debajo de 6,35 GBP (filtro de mantener); la banda de venta de la regla empieza en 7,76 GBP. Venderíamos si se rebaja la guía de 395-415 M o si las visitas caen otro semestre.`;

export const resumen = {
  recomendacion: 'Comprar',
  conviccion: 'Baja',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis,
  tesis: `Auto Trader es el mercado de coches de segunda mano del Reino Unido: más del 75 % de los minutos en portales de coches y 12 veces el tiempo del segundo [A16]. Ese dominio le da poder de precios: el ARPR se ha duplicado en una década, hasta 3.037 GBP al mes, con un margen EBITDA del 66 %, un ROIC del 50,9 % y una conversión de beneficio en caja del 99 % [A2, A16].

El precio descuenta un negocio que crece la mitad que su historia reciente: el DCF inverso pide ingresos del 2,0 % anual y el PER de 13,7 veces nuestro BPA de FY2028e es el más bajo de la década salvo el de marzo de 2026. El EV/EBITDA de 11,4 veces queda en el percentil 11 de su historia y por debajo de la mediana de sus comparables (14,3 veces) [D13-D19].

El mercado acierta en que el volumen se ha debilitado (forecourts −2,3 %, stock −89 GBP) y en que la IA es un riesgo real [A16]. Creemos que exagera la duración: el precio sigue subiendo el ARPR un 4 % al año, los clientes perdidos vuelven y la recompra reduce un 4,5 % las acciones antes de marzo. Para invertir hay que creer que el segundo semestre acelera y que el evento de precios de abril de 2027 se parece a los anteriores.`,
  vision_diferencial: {
    mercado_descuenta: `Que Auto Trader pasa de crecer un 8 % al año a crecer un 2 % de forma permanente, porque la IA y el conflicto con los concesionarios le quitan el poder de precios. Lo expresa un PER de 13,7 veces nuestro BPA del próximo ejercicio y un EV/EBITDA en el percentil 11 de su década.`,
    nuestra_vision: `El semestre confirma un año de transición, no una ruptura: el beneficio operativo cae solo un 1 %, la palanca de precio sigue en +117 GBP y los forecourts suben desde marzo [A16]. Esperamos un crecimiento del 4,5-5 % desde FY2028 con margen estable y un BPA un 10 % mayor en FY2029e.`,
    por_que: `El foso de audiencia no se ha erosionado frente a los rivales (cuota de minutos superior al 75 %, de 9 a 12 veces el segundo) y menos del 1 % del tráfico llega de la IA [A16]. Los corredores empiezan a verlo igual (Jefferies, Panmure) [D30, D35]. Pero no es una visión muy distinta: el consenso espera algo parecido y su objetivo medio (6,015 GBP) queda entre nuestro bajista y nuestro base.`,
  },
  a_favor: [
    '**Foso de audiencia intacto**: más del 75 % de los minutos y 12 veces el tiempo del segundo portal [A16].',
    '**Poder de precios**: la palanca de precio dio +117 GBP al ARPR en el 1S27, como en FY2026 [A16].',
    '**Barata frente a su historia**: 13,7 veces nuestro BPA de FY2028e frente a una mediana de 22,0 veces.',
    '**Recompra en marcha**: ≈195 M pendientes hasta marzo de 2027, ≈4,5 % del capital al precio de hoy [A16].',
    '**Calidad**: ROIC del 50,9 %, 41,4 puntos sobre el WACC, y conversión en caja del 99 %.',
  ],
  en_contra: [
    '**Volumen a la baja**: forecourts medios −2,3 % y palanca de stock de −89 GBP en el 1S27 [A16].',
    '**Audiencia**: visitas −3 % y minutos −6 % en el semestre, primera señal posible de la IA [A16].',
    '**Compra no robusta**: con la v2 la rentabilidad es del 12,3 % y con un BPA un 10 % peor, del 13,1 %.',
    '**Asimetría del DCF desfavorable**: alcista +29,7 % frente a bajista −33,6 % (0,88 veces).',
    '**Más deuda**: la deuda neta ajustada pasa de 189 M en marzo a 399 M para recomprar [A16].',
  ],
  que_vigilar: `La tesis depende de que el segundo semestre de FY2027 acelere los ingresos, como dijo la empresa el 5-nov, y de que el evento de precios de abril de 2027 aporte al ARPR al menos +80 GBP. La señal de que no ocurre: ingresos sin venta de vehículos del 2S27 por debajo del +2 % (dato del 27-may-2027) o visitas mensuales a la baja por segundo semestre seguido.`,
  cambiaria_recomendacion: [
    'Compra de nivel B1 a mercado si cotiza en 5,73 GBP o por debajo; de nivel A (robusta), en 5,48 GBP o por debajo. Por encima de 6,08 GBP la regla da Mantener.',
    'Quien la tiene la mantiene mientras cotice por debajo de 6,35 GBP (filtro de mantener); la banda Vender de la regla (ponderada ≤ −10 %) empieza en 7,76 GBP.',
    'Si la empresa rebaja la guía de beneficio operativo de FY2027 (395-415 M), pasaríamos a Mantener y revisaríamos el caso base.',
    'Si los ingresos sin venta de vehículos del 2S27 crecen menos del 2 % o las visitas caen otro semestre, rebajaríamos el base hacia el bajista.',
    'Si anuncia recompras de ≈400-500 M para FY2028, el BPA de FY2029e subiría un ≈6 % y la compra pasaría a ser robusta.',
  ],
  kpis_seguimiento: [
    { kpi: 'Forecourts', nivel_actual: '13.762 de media en el 1S27 (−2,3 %); 13.900 en sep-26', umbral_alerta: '< 13.700 al cierre de FY2027', por_que: 'Mide si la salida de clientes se ha cerrado.' },
    { kpi: 'ARPR', nivel_actual: '3.037 GBP/mes (1S27, +1 %)', umbral_alerta: 'Palanca de precio < +80 GBP en abril de 2027', por_que: 'Es el poder de precios que sostiene el base.' },
    { kpi: 'Visitas mensuales', nivel_actual: '81,1 millones (1S27, −3 %)', umbral_alerta: 'Otro semestre a la baja', por_que: 'Primera señal de desintermediación por la IA.' },
    { kpi: 'Ingresos sin venta de vehículos', nivel_actual: '301,8 M en el 1S27 (+0,2 %)', umbral_alerta: '< +2 % en el 2S27', por_que: 'Es la aceleración prometida.' },
    { kpi: 'Posición corta agregada', nivel_actual: '4,21 % (6-nov-2026)', umbral_alerta: '> 6,5 %', por_que: 'Mide la apuesta del mercado contra el foso.' },
  ],
  confianza: 'Media',
};
