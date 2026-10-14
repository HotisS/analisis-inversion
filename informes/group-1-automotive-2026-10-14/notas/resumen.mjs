// Resumen ejecutivo (Group 1 Automotive, corte 2026-10-14). Se escribe el último.
export default {
  recomendacion: 'Mantener',
  conviccion: 'Media',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis: `**La recomendación y por qué.** Mantener (no comprar), con convicción media. Con nuestro BPA y nuestro PER, el objetivo a 12 meses es de 246,78 USD frente a 231,59 USD de cierre del 13 de octubre: +7,5 % con el dividendo, y +9,0 % en el caso base. No llega a los umbrales de compra (15 % y 12 %) y la asimetría es pobre (1,9x), porque el bajista (−33 %) es creíble: el beneficio por acción de un concesionario apalancado cae deprisa si el margen vuelve al de 2019. El valor intrínseco es mucho mayor (378,53 USD, +63 %), pero cerrar esa distancia exige que el beneficio deje de caer, algo que aún no se ve. La convicción es media y no alta porque las cifras salen de extractos de búsqueda, no de los documentos completos. Compraríamos por debajo de 216 USD o si el 3T26 (28 de octubre) muestra que el BPA ha tocado fondo; la convicción bajaría si la deuda pasa de 3,5x el EBITDA.

**El negocio.** Cuarto grupo de concesionarios de EE. UU. y uno de los mayores del Reino Unido: ≈259 concesionarios, 22.571 M USD de ventas en 2025 (74 % EE. UU.) [A1, B36]. Gana dinero sobre todo en posventa y financiación y seguros, menos cíclicos que la venta de coches. Su ROIC (≈11 %) supera al WACC (7,6 %) por 3-4 puntos, menos de los 5 que pedimos para comprar.

**Finanzas.** El BPA ajustado bajó de 45,7 USD en 2022 a 40,7 en 2025 y un 13 % más en el 1S26, sostenido por recompras (−30 % de acciones desde 2021) [A7, A16, D6]. La deuda sin floorplan sube a ≈4.500 M con la compra de Hennessy (≈1.300 M), unas 3,3 veces el EBITDA [A40, A48].

**Valoración.** Cotiza a 5,4x el BPA de consenso de los próximos 12 meses, frente a 8,7x de mediana de sus pares y 9,6x de su propia mediana de cinco años. El DCF da 400,53 USD (rango 305,55-536,04) y descuenta un margen del 3,1 % para siempre. Nuestro base a 12 meses (250,29 USD) queda un 24 % por debajo del objetivo medio de los analistas (331,25): usamos un BPA de 2028e más bajo (40,4 frente a 49,0) y el PER actual, no el histórico.

**Riesgos y catalizadores.** El mayor riesgo es la normalización del beneficio bruto por coche con un consumidor que compra menos; el catalizador, los resultados del 28 de octubre y la integración de Hennessy en el 4T26. El sentimiento es negativo (mínimos de 52 semanas, recortes de los analistas) y el mayor accionista externo ha comprado en septiembre [E8, E9].`,
  tesis: 'Group 1 es un concesionario de calidad media, bien gestionado y muy barato (5,4x beneficios), pero en la fase baja del ciclo de márgenes y con más deuda. El precio ya descuenta un margen por debajo del de antes de la pandemia, por eso el valor intrínseco está muy por encima; a 12 meses, sin embargo, el múltiplo no tiene por qué recuperarse mientras el beneficio siga bajando. Es una idea de valor para vigilar, no para comprar hoy.',
  vision_diferencial: {
    mercado_descuenta: 'Que el beneficio de los concesionarios seguirá bajando hacia el de antes de 2020 y que la deuda de Hennessy llega en mal momento: 5,4x beneficios y un margen implícito del 3,1 %.',
    nuestra_vision: 'Estamos más cerca del mercado que de los analistas: BPA de 2028e de 40,4 USD (consenso 49,0) y PER de 6,2x. El valor a largo plazo existe, pero el catalizador para cerrarlo no está a 12 meses.',
    por_que: 'La normalización del beneficio por coche no ha terminado y las recompras, que explicaban el crecimiento del BPA, se frenan con la deuda de Hennessy.',
  },
  a_favor: [
    '**Muy barata**: 5,4x el BPA de consenso y 6,2x el nuestro de 2027e, frente a 8,7x de los pares y 9,6x de su mediana de cinco años.',
    '**Posventa y F&I**: la parte menos cíclica del beneficio bruto; posventa +15,9 % en 2025 [A2].',
    '**Valor intrínseco muy por encima**: DCF de 400,53 USD incluso con margen a la baja.',
    '**Compras del mayor accionista externo** en septiembre de 2026 [E8].',
  ],
  en_contra: [
    '**Beneficio en caída**: BPA ajustado −13 % en el 1S26 por la asequibilidad en EE. UU. [A16].',
    '**Más deuda**: ≈4.500 M sin floorplan con Hennessy, ≈3,3x el EBITDA [A40].',
    '**Reino Unido**: apenas gana dinero tras Inchcape y tuvo deterioros en 2025 [A5].',
    '**Recortes de los analistas**: Morgan Stanley a infraponderar con 232 USD [D11].',
  ],
  que_vigilar: 'Que el BPA ajustado deje de caer frente al año anterior. La primera señal llega el 28 de octubre con el 3T26 (comparativa: 10,45 USD en el 3T25). Si vuelve a caer más de un 10 % y la deuda no baja con la venta de concesionarios, el bajista gana peso.',
  cambiaria_recomendacion: [
    'Si el precio baja de 216 USD con el mismo BPA, pasaríamos a Comprar (ponderada ≥ 15 %).',
    'Si el 3T26 y el 4T26 muestran BPA ajustado creciendo y deuda < 3x, subiríamos el BPA y podríamos pasar a Comprar.',
    'Si el precio sube por encima de 277 USD sin mejora del beneficio, la rentabilidad a 12 meses pasaría a −10 % y venderíamos.',
  ],
  kpis_seguimiento: [
    { kpi: 'BPA ajustado trimestral frente al año anterior', nivel_actual: '9,61 USD en el 2T26 (−17 %)', umbral_alerta: 'Caída > 10 % dos trimestres más', por_que: 'Mide si la normalización del margen ha terminado.' },
    { kpi: 'Gastos generales sobre margen bruto (EE. UU.)', nivel_actual: '66,4 % (2T26)', umbral_alerta: 'Por encima del 70 %', por_que: 'Es la palanca de costes que sostiene el margen.' },
    { kpi: 'Deuda sin floorplan / EBITDA', nivel_actual: '≈3,0x (≈3,3x con Hennessy)', umbral_alerta: 'Por encima de 3,5x', por_que: 'Limita recompras y aumenta el riesgo en el bajista.' },
  ],
  confianza: 'Baja',
};
