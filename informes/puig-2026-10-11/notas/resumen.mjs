// Resumen ejecutivo (Puig, corte 2026-10-11). Se escribe el último; cifras del motor tal cual.

const sintesis = `**La recomendación y por qué.** Comprar, con convicción media. El valor objetivo es de 21,46 EUR, un 18,7 % por encima del precio de 18,08 EUR, y con el dividendo la rentabilidad total esperada a 12 meses es del 21,0 %. Asimetría de 1,06 veces (+30,1 % frente a −28,5 %). Las dos reglas dan Comprar; con la prima de riesgo que hoy pide el mercado, el objetivo sube a 24,72 EUR (+36,7 %). La razón en una frase: el precio descuenta que Puig crece un 1,9 % anual cuando ha crecido un 7,8 % comparable en 2025 y gana cuota. La convicción es media, la que sugieren los criterios, porque el bajista pierde más de un 25 % y la asimetría apenas pasa de 1. Subiría si el día del inversor del 28 de octubre fija un margen por encima del 22 %; bajaría si las ventas de los nueve meses crecen menos de un 3 % comparable.

**El negocio.** Puig es perfumería de marca: el 72 % de sus 5.042 M de ventas y el 84 % del resultado de los segmentos salen de Rabanne, Carolina Herrera, Jean Paul Gaultier y Byredo, con un 11,1 % de la perfumería selectiva mundial [A1, B3]. Su margen EBITDA (20,8 %) supera al de Estée Lauder y Coty, y su ROIC (13,1 %) al WACC del 8,1 %, aunque baja desde el 22 % de 2023 por las compras de minoritarios. El mercado de perfumería selectiva creció solo un 1 % en 2025 [B1]. Su calidad sí sostiene el crecimiento que proyectamos (4,4 % anual, sin capital): ha crecido más que el mercado con precios al alza y margen bruto en máximos; el riesgo es el mercado, no la empresa.

**Equipo y gobierno.** Resta. La familia Puig tiene el 93,21 % de los votos con acciones de clase A de cinco votos [C7]. En la junta de 2026, el 43,7 % del capital libre presente votó contra la política de remuneración, cuyo variable mide margen y ventas, no rentabilidad [C1, C4]. La dirección, renovada en marzo con dos directivos de la casa, cumplió sus guías de 2024 y 2025 [C12, C16]. Por eso añadimos un punto de prima de riesgo.

**Valoración.** El DCF da 20,14 EUR (+11,4 %). El DCF inverso dice que el precio supone un crecimiento de las ventas del 1,9 % anual hasta 2033e, frente al 4,4 % de nuestro caso base y al 5,0 % previsto para el mercado, o un margen EBITDA del 20,1 % en vez del 21,5 %: comprar hoy rinde un 8,7 % anual con nuestro caso base. Cotiza a 9,6 veces el EBITDA de los próximos 12 meses y 15,6 veces el beneficio, frente a medianas de 12,3 y 25,3 veces de sus comparables; los comparables (26,46 EUR) y las transacciones (33,17) quedan por encima, pero Puig no es opable. Nuestras cifras coinciden con el consenso; la discrepancia está en la tasa: pedimos un 8,1 % y el precio da un 8,7 %.

**Riesgos y catalizadores.** El mayor riesgo es que la perfumería se estanque y Puig acabe como Coty o Estée Lauder (bajista: 12,92 EUR). La compra del 50 % de ISDIN por 1.200 M, unas 3,7 veces las ventas, es cara y llevará la deuda hacia 2 veces el EBITDA [C13, D17]; si ISDIN valiera su valor contable, el valor bajaría 1,83 EUR. Catalizadores: día del inversor el 28-oct-2026 y ventas de los nueve meses a finales de octubre. En los foros, el enfado con la familia tras la fusión fallida con Estée Lauder confirma el descuento por gobierno.

**Qué cambiaría la decisión.** Seguiría siendo Comprar por debajo de 20,84 EUR y pasaría a Vender por encima de 25,15 EUR. Bajaríamos a Mantener si el crecimiento comparable de 2026 queda por debajo del 3 % o si el día del inversor rebaja el margen objetivo por debajo del 20,5 %.`;

export const resumen = {
  recomendacion: 'Comprar',
  conviccion: 'Media',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis,
  tesis: `Puig es una de las tres grandes casas de perfumería de prestigio del mundo: tres de las diez primeras marcas de perfume (Rabanne, Carolina Herrera, Jean Paul Gaultier), un 11,1 % de cuota en perfumería selectiva y 5.042 M de ventas en 2025, con un margen EBITDA del 20,8 % y un margen bruto del 75,1 % [A1, B3]. Ha triplicado sus ventas desde 2020 con compras (Charlotte Tilbury, Byredo) y creciendo más que el mercado [C16].

El precio de 18,08 EUR, un 26 % por debajo de la OPV de 2024, descuenta que las ventas crecen un 1,9 % anual hasta 2033, cuando el consenso espera un 5,8 % en los próximos 12 meses. Cotiza a 9,6 veces el EBITDA de los próximos 12 meses, frente a 12,3 veces de sus comparables [D5, D11].

El mercado acierta en dos cosas: la perfumería selectiva se ha frenado (+1 % en 2025) y el minoritario de una empresa con el 93 % de los votos en manos de una familia merece un descuento [B1, C7]. Se equivoca, creemos, en el grado: Puig sigue ganando cuota con precios al alza, y su caja no depende de que el mercado vuelva al auge de 2021-2024. Para invertir hay que creer que Puig crecerá al menos un 4 % anual y mantendrá el margen.`,
  vision_diferencial: {
    mercado_descuenta: 'Un Puig que crece un 1,9 % anual hasta 2033, la mitad de lo que espera el consenso para los próximos 12 meses, con el margen estable; o un margen del 20,1 % con nuestro crecimiento. Es decir, que el frenazo de la perfumería selectiva de 2025 es permanente y que la familia no tratará bien al minoritario.',
    nuestra_vision: 'Puig crece un 4,4 % anual, algo menos que su mercado, y sube el margen 0,2 puntos al año hasta el 21,5 %. No necesitamos que la perfumería vuelva al auge: basta con que Puig siga haciendo lo que hizo en el 1S26 (+4,4 % comparable con el mercado casi plano).',
    por_que: 'Puig sigue ganando cuota (0,3 puntos en el 1S26) y ha cumplido sus guías de 2024 y 2025 [B3, C16]. El margen bruto en máximos demuestra poder de precios. El descuento por gobierno ya lo cobramos con un punto más de prima de riesgo, y aun así el valor queda por encima del precio.',
  },
  a_favor: [
    '**Barata frente a sus comparables**: 9,6 veces el EBITDA de los próximos 12 meses frente a una mediana de 12,3 veces.',
    '**El precio pide poco**: un crecimiento del 1,9 % anual frente al 4,4 % de nuestro caso base.',
    '**Gana cuota**: 11,1 % de la perfumería selectiva, +0,3 puntos en el 1S26 [B3].',
    '**Poder de precios**: margen bruto del 75,1 %, desde el 72,9 % de 2021 [A1].',
    '**Dirección que cumple**: guías de 2024 (+10,9 % comparable) y 2025 (+7,8 %) cumplidas [C16].',
  ],
  en_contra: [
    '**Control familiar**: el 93,21 % de los votos y un 43,7 % del capital libre en contra de la remuneración [C4, C7].',
    '**Mercado frenado**: la perfumería selectiva creció un 1 % en 2025 [B1].',
    '**ISDIN cara**: 1.200 M por el 50 %, unas 3,7 veces las ventas [D17].',
    '**ROIC a la baja**: del 22,0 % en 2023 al 13,1 % en 2025, por las compras.',
    '**Asimetría justa**: el bajista pierde un 28,5 % y el alcista gana un 30,1 %.',
  ],
  que_vigilar: `La tesis depende de que Puig siga creciendo al menos un 4 % comparable con un mercado de perfumería débil. La señal de que no se cumple sería un crecimiento comparable de Fragancias y Moda por debajo del 3 % en las ventas de los nueve meses o en el ejercicio 2026, o un objetivo de margen a medio plazo por debajo del 20,5 % en el día del inversor del 28 de octubre.`,
  cambiaria_recomendacion: [
    'Si el crecimiento comparable de 2026 queda por debajo del 3 %, pasaríamos a Mantener.',
    'Si el día del inversor fija un margen EBITDA ajustado a medio plazo por debajo del 20,5 %, pasaríamos a Mantener.',
    'Si la deuda neta supera 2,5 veces el EBITDA ajustado tras ISDIN, revisaríamos la recomendación.',
    'Si el precio supera 25,15 EUR, pasaríamos a Vender; por debajo de 20,84 EUR seguimos en Comprar.',
  ],
  kpis_seguimiento: [
    { kpi: 'Crecimiento comparable del grupo', nivel_actual: '+4,4 % (1S26)', umbral_alerta: '< 3 %', por_que: 'El precio descuenta un 1,9 % anual.' },
    { kpi: 'Margen EBITDA ajustado', nivel_actual: '20,7 % (2025)', umbral_alerta: '< 20 %', por_que: 'Cada punto mueve el valor un 8 %.' },
    { kpi: 'Cuota en perfumería selectiva', nivel_actual: '11,1 %', umbral_alerta: 'Pérdida de cuota dos semestres seguidos', por_que: 'Es la prueba de la calidad de las marcas.' },
    { kpi: 'Deuda neta / EBITDA ajustado', nivel_actual: '1,5x (jun-26)', umbral_alerta: '> 2,5x tras ISDIN', por_que: 'El techo que fija la empresa es de 2x.' },
    { kpi: 'Voto libre en contra de la remuneración', nivel_actual: '43,7 % (junta de 2026)', umbral_alerta: '> 50 %', por_que: 'Mide la tensión entre la familia y el minoritario.' },
  ],
  confianza: 'Media',
};
