// Resumen ejecutivo (Puig, corte 2026-10-21, tras las ventas de los nueve meses). Se escribe el último; cifras del motor tal cual.

const sintesis = `**La recomendación y por qué.** Mantener, con convicción baja. A 12 meses, con nuestra regla de múltiplos, el objetivo es de 19,73 EUR: +2,9 % ponderado y +3,0 % en el caso base, con dividendo, sobre el cierre de 19,59 EUR del 21-oct, muy lejos del 15 % que exigimos. El valor intrínseco (síntesis del DCF, los escenarios y los comparables) es de 22,24 EUR, un 13,5 % por encima, pero sale sobre todo de los múltiplos; el DCF solo da 20,45 EUR (+4,4 %). La convicción es baja porque las dos reglas discrepan: con la prima de riesgo que hoy pide el mercado el objetivo sube a 25,59 EUR. El 11-oct recomendábamos Comprar a 18,08 EUR; la acción ha subido un 8,4 % desde entonces y se ha comido el margen.

**Qué ha cambiado con las ventas de los nueve meses (21-oct, tras el cierre).** Buen trimestre: el 3T26 vende 1.390,8 M, +5,6 % comparable y +7,2 % reportado, el mayor de su historia, por encima del +5,0 % que esperaba Jefferies [A11, D22, D25]. Maquillaje (Charlotte Tilbury) acelera al +16,1 %, Fragancias y Moda crece un +3,9 % y Cuidado de la piel cae un 0,8 % por Sturm. En nueve meses, 3.744,5 M (+4,8 % comparable). Reitera la guía de 2026 (crecer más que el mercado de belleza premium con el margen estable) y confirma ISDIN: 900 M al cierre, a finales del 1T27, y 300 M sin intereses en el 1T29 [D22]. Subimos el crecimiento de 2026e del 3,5 % al 4,0 %. Nada nuevo de Estée Lauder desde la ruptura de mayo.

**El negocio.** Puig es perfumería de marca: el 72 % de sus 5.042 M de ventas de 2025 y el 84 % del resultado de los segmentos salen de Rabanne, Carolina Herrera, Jean Paul Gaultier y Byredo, con un 11,1 % de la perfumería selectiva mundial [A1, B3]. ROIC del 13,1 % frente a un WACC del 8,02 %, a la baja desde el 22 % de 2023 por las compras de minoritarios. Su calidad sostiene el crecimiento que proyectamos (4,4 % anual; veredicto: Sí).

**Equipo y gobierno.** Resta. La familia tiene el 93,21 % de los votos y el 43,7 % del capital libre presente votó en 2026 contra la política de remuneración [C4, C7]. Por eso añadimos un punto de prima de riesgo.

**Valoración.** El DCF inverso dice que el precio descuenta un crecimiento del 3,4 % anual hasta 2033e, frente al 4,4 % de nuestro base: rinde un 8,2 %, apenas el coste del capital. Cotiza a 10,3 veces el EBITDA de los próximos 12 meses y 16,7 veces el beneficio, por debajo de sus comparables (13,9 y 28,2 veces), pero esa muestra es frágil. Nuestro BPA de 2028e (1,22 EUR) queda un 4 % por debajo del consenso.

**Riesgos y catalizadores.** El mayor riesgo es que la perfumería se estanque y Puig acabe como Coty o Estée Lauder (bajista: 13,11 EUR, −33,1 %); la asimetría es mala (0,66 veces). ISDIN (1.200 M por el 50 %) es cara y llevará la deuda hacia 2 veces el EBITDA [C13, D17]. Catalizador: el día del inversor del 28-oct.

**Qué cambiaría la decisión.** Compraríamos por debajo de 17,52 EUR y venderíamos por encima de 22,39 EUR. La convicción subiría si el día del inversor fija un margen por encima del 22 % y un crecimiento por encima del 6 %.`;

export const resumen = {
  recomendacion: 'Mantener',
  conviccion: 'Baja',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis,
  tesis: `Puig es una de las tres grandes casas de perfumería de prestigio del mundo: tres de las diez primeras marcas de perfume, un 11,1 % de cuota en perfumería selectiva y 5.042 M de ventas en 2025, con un margen EBITDA del 20,8 % [A1, B3]. El 3T26 confirma que crece más que su mercado (+5,6 % comparable) [D22].

El precio de 19,59 EUR descuenta ya un crecimiento del 3,4 % anual hasta 2033e, cerca del 4,4 % de nuestro caso base; tras subir un 11,6 % en un mes, a 12 meses solo rinde un 2,9 % con nuestra regla.

Para invertir hay que creer que el día del inversor del 28-oct sube el margen objetivo por encima del 22 %; si no, el precio es justo.`,
  vision_diferencial: {
    mercado_descuenta: 'Un crecimiento del 3,4 % anual hasta 2033e con nuestros márgenes, y un objetivo medio de 19,94 EUR de 16 analistas, casi el precio [D5, D6].',
    nuestra_vision: 'Coincidimos con el consenso: nuestro BPA de 2028e (1,22 EUR) queda un 4 % por debajo del suyo y nuestro objetivo a 12 meses (19,73) es casi el mismo.',
    por_que: 'La diferencia con el 11-oct no es la empresa, que lo ha hecho bien, sino el precio: ha subido un 8,4 % y deja poco recorrido [D3].',
  },
  a_favor: [
    '**3T26 récord**: 1.390,8 M de ventas, +5,6 % comparable, por encima de lo esperado [D22, D25].',
    '**Gana cuota**: 11,1 % de la perfumería selectiva [B3].',
    '**Poder de precios**: margen bruto del 75,1 % [A1].',
    '**Más barata que sus comparables**: 10,3 veces el EBITDA de los próximos 12 meses frente a 13,9 veces.',
  ],
  en_contra: [
    '**Rentabilidad a 12 meses del 2,9 %**, muy por debajo del 15 %.',
    '**Asimetría mala**: el bajista pierde un 33,1 % y el alcista gana un 22,0 %.',
    '**Control familiar**: el 93,21 % de los votos [C7].',
    '**ISDIN cara**: 1.200 M por el 50 %, unas 3,7 veces las ventas [D17].',
  ],
  que_vigilar: `La tesis depende de que Puig siga creciendo al menos un 4 % comparable con margen estable. La señal de que no se cumple: Fragancias y Moda por debajo del 3 % comparable en el ejercicio 2026, o un margen objetivo por debajo del 20,5 % en el día del inversor del 28-oct.`,
  cambiaria_recomendacion: [
    'Precio por debajo de 17,52 EUR: pasaríamos a Comprar.',
    'Precio por encima de 22,39 EUR: Vender o reducir.',
    'Día del inversor con margen objetivo por encima del 22 %: revisaríamos al alza el BPA.',
    'Deuda neta por encima de 2,5 veces el EBITDA tras ISDIN: revisaríamos a la baja.',
  ],
  kpis_seguimiento: [
    { kpi: 'Crecimiento comparable del grupo', nivel_actual: '+5,6 % (3T26)', umbral_alerta: '< 3 %', por_que: 'El precio descuenta un 3,4 % anual.' },
    { kpi: 'Margen EBITDA ajustado', nivel_actual: '20,7 % (2025)', umbral_alerta: '< 20 %', por_que: 'Cada punto mueve el valor un 8 %.' },
    { kpi: 'Deuda neta / EBITDA ajustado', nivel_actual: '1,5x (jun-26)', umbral_alerta: '> 2,5x tras ISDIN', por_que: 'El techo que fija la empresa es de 2x.' },
  ],
  confianza: 'Media',
};
