// Resumen ejecutivo (Games Workshop, corte 2026-10-10). Se escribe el último; cifras del motor tal cual.

const sintesis = `**La recomendación y por qué.** Vender, con convicción media. El valor objetivo es de 102,00 GBP, un 37,8 % por debajo del precio de 163,90 GBP, y la rentabilidad total esperada a 12 meses es del −34,8 % con el dividendo. El alcista pierde un 19,5 % y el bajista un 60,1 %. La razón en una frase: es uno de los mejores negocios de la Bolsa de Londres, pero el precio pide que crezca al 15,9 % anual durante ocho años. Los criterios del motor sugieren convicción alta; la dejamos en media porque ese 15,9 % es casi lo que hizo en la década (16,6 % anual) y porque la serie de Amazon es un posible éxito sin fecha ni condiciones públicas que el modelo no puede medir. Subiría a alta si el Core del 1S27 crece menos del 8 % a tipo constante; bajaría si vuelve a crecer por encima del 15 %.

**El negocio.** Games Workshop diseña, fabrica y vende las miniaturas de Warhammer: propiedad intelectual propia, fábricas propias, 598 tiendas propias y miles de comercios [A1]. El ROIC es del 102,3 % y el margen operativo Core del 39,1 %, frente al 0-22 % de los fabricantes de juguetes [A1, B10-B16]. Su calidad sostiene nuestro caso base (7,3 % anual, financiable al 11,6 % con su reinversión), pero no el crecimiento que pide el precio, que depende de multiplicar los aficionados.

**Finanzas.** Los ingresos pasaron de 165,6 M en FY2017 a 659,7 M en FY2026 sin una sola compra y sin deuda; repartió 920 M en dividendos [A1-A8]. FY2026 creció un 6,8 %: el Core un 10,9 % (12,2 % a tipo constante), mientras las licencias caían de 52,5 a 32,9 M tras el pico de Space Marine 2 [A1]. En el 2S26 el Core se frenó al +5,1 %.

**Equipo y gobierno.** Neutro. Kevin Rountree dirige desde 2015 y los avances de resultados se cumplen [C1]. Pero el consejo tiene solo 3 independientes de 7, uno de ellos preside auditoría y remuneración y es el consejero coordinador, y la remuneración tuvo hasta un 29,3 % de votos en contra en mayo de 2025 [C1, C6].

**Valoración.** El DCF da 99,10 GBP (−39,5 %). El DCF inverso dice que el precio supone un crecimiento del 15,9 % anual hasta FY2034e, frente al 7,3 % de nuestro caso base y al 12,3 % de FY2021-FY2026; a este precio, el caso base rinde un 7,8 % anual frente a un WACC del 10,8 %. Cotiza a 16,7 veces el EBITDA y 26,3 veces el beneficio, en el percentil 70 de su década. Comparables (106,17 GBP) y transacciones (118,00 GBP) quedan también por debajo: ningún comprador ha pagado nunca estos múltiplos por un negocio de juguetes o juegos. Con la prima de riesgo del mercado, el objetivo sube a 116,59 GBP (−28,9 %). Discrepamos del mercado en el ritmo, no en la calidad.

**Riesgos y catalizadores.** El riesgo para la recomendación es al alza: que la serie de Amazon o un videojuego multipliquen los aficionados, como Space Marine 2 multiplicó las licencias. A la baja, que el frenazo del 2S26 se prolongue (bajista: 65,32 GBP). Los foros coinciden: nadie discute el negocio, sí el precio. Catalizadores: avance del 1S27 en diciembre y resultados el 12-ene-2027 (fecha estimada) [D10].

**Qué cambiaría la decisión.** Pasaría a Mantener por debajo de 131,58 GBP y a Comprar por debajo de 101,69 GBP. Revisaríamos el caso base al alza si el Core crece por encima del 15 % a tipo constante en el 1S27 o si Amazon fija fecha de estreno con un acuerdo de merchandising público.`;

export const resumen = {
  recomendacion: 'Vender',
  conviccion: 'Media',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis,
  tesis: `Games Workshop es Warhammer: una propiedad intelectual de 50 años que diseña, fabrica y vende ella misma, con 598 tiendas propias, un margen operativo Core del 39 % y un ROIC del 102 % [A1]. En diez años ha cuadruplicado los ingresos, hasta 659,7 M, sin deuda ni compras, y ha repartido 920 M en dividendos [A1-A8].

El precio de 163,90 GBP, aun después de caer un 30 % desde junio, descuenta que la próxima década será como la anterior: un crecimiento del 15,9 % anual hasta FY2034e. Cotiza a 26,3 veces el beneficio, en el percentil 70 de su historia y por encima de cualquier transacción del sector [D1, D32-D36].

El mercado acierta en la calidad: el foso es real y el aficionado, fiel. Se equivoca en el ritmo: la base de partida es cuatro veces mayor que en FY2017, el 2S26 ya creció solo un 5,1 % en el Core y las licencias son irregulares [A1]. Para comprar a este precio hay que creer que la serie de Amazon convertirá Warhammer en un fenómeno de masas; nosotros esperamos un 7,3 % anual, que ya es mucho para su tamaño.`,
  vision_diferencial: {
    mercado_descuenta: `Que Games Workshop seguirá creciendo como en la década pasada, al 15-16 % anual, gracias a la expansión internacional del aficionado y al efecto de la pantalla (Amazon y los videojuegos), con un PER de 26 veces que se mantiene.`,
    nuestra_vision: `El Core seguirá creciendo, pero a un ritmo menor: 9-10 % dos años y luego a la baja hacia el 4 %, con licencias irregulares de 25-35 M. Un 7,3 % anual de media, por debajo del 12,3 % de FY2021-FY2026.`,
    por_que: `Porque el crecimiento ya se está frenando (Core +5,1 % en el 2S26, BPA de FY2027e por debajo del de FY2026 según el consenso) y porque, con 660 M de ventas, crecer al 16 % exige añadir 100 M de ingresos al año, el tamaño entero de la empresa de 2016 [A1, D8].`,
  },
  a_favor: [
    '**Negocio excepcional**: ROIC del 102,3 % y margen operativo Core del 39,1 % [A1].',
    '**Sin deuda y con caja**: 182,9 M y todo el excedente repartido en dividendos [A1].',
    '**Poder de precios**: subidas del 2-6 % cada año con el volumen al alza [B2].',
    '**Opcionalidad de pantalla**: acuerdo con Amazon para cine y series de Warhammer 40,000 [B2].',
    '**Historial**: ingresos del 16,6 % anual en la década sin compras [A1-A8].',
  ],
  en_contra: [
    '**El precio pide un 15,9 % anual** durante ocho años, frente al 7,3 % de nuestro caso base.',
    '**Frenazo reciente**: Core +5,1 % en el 2S26 [A1].',
    '**Licencias irregulares**: de 52,5 a 32,9 M en un año [A1].',
    '**Múltiplos altos**: 26,3 veces el beneficio, en el percentil 70 de su década.',
    '**Gobierno mejorable**: 3 independientes de 7 y votos altos en contra de la remuneración en 2024-2025 [C1, C5, C6].',
  ],
  que_vigilar: `La tesis bajista depende de que el Core crezca menos del 10 % anual. La señal de que nos equivocamos sería un Core del 1S27 por encima del 15 % a tipo constante sin ayuda de las licencias, o un anuncio de Amazon con fecha de estreno y merchandising: entonces el crecimiento que pide el precio dejaría de ser una extrapolación.`,
  cambiaria_recomendacion: [
    'Si el precio baja de 131,58 GBP, pasaríamos a Mantener.',
    'Si el precio baja de 101,69 GBP, pasaríamos a Comprar.',
    'Si el Core del 1S27 crece por encima del 15 % a tipo constante, revisaríamos el caso base al alza.',
    'Si Amazon fija fecha de estreno con un acuerdo de merchandising público, subiríamos el alcista.',
    'Si el Core del 1S27 crece menos del 8 %, subiríamos la convicción de Vender.',
  ],
  kpis_seguimiento: [
    { kpi: 'Crecimiento del Core a tipo constante', nivel_actual: '+12,2 % (FY2026); +5,1 % en el 2S26', umbral_alerta: '> 15 % o < 8 % en el 1S27', por_que: 'Es lo que separa el precio de nuestro valor.' },
    { kpi: 'Ingresos de licencias', nivel_actual: '32,9 M (FY2026)', umbral_alerta: '> 50 M (nuevo éxito)', por_que: 'Margen del 90 %: mueven el beneficio.' },
    { kpi: 'Tiendas propias', nivel_actual: '598', umbral_alerta: 'Menos de 20 aperturas netas al año', por_que: 'Mide la expansión internacional.' },
    { kpi: 'Margen bruto Core', nivel_actual: '71,1 %', umbral_alerta: '< 69 %', por_que: 'Aranceles y costes frente a poder de precios.' },
    { kpi: 'Serie de Amazon', nivel_actual: 'En desarrollo, sin fecha', umbral_alerta: 'Fecha de estreno', por_que: 'La única palanca que justificaría el precio.' },
  ],
  confianza: 'Media',
};
