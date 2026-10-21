// Catalizadores y preguntas (DSV, corte 2026-10-21). Citas: [P1] = fuente 1 de propio; [A3] = fuente 3 de A.json.

export const catalizadores = {
  items: [
    { fecha: '2-feb-2027', evento: 'Resultados del 4T26 y guía de 2027', efecto: 'Primer trimestre en que Road debería enseñar las sinergias retrasadas a 2027 y primera guía sin la mayor parte de los costes de integración. La guía de 2026 (24.000-25.000 M de EBIT antes de partidas especiales) exige 6.284-7.284 M en el 4T26, frente a 5.592 M en el 4T25, con plusvalías inmobiliarias incluidas [A15, C30].', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Dic-2026', evento: 'Fin de la integración de Schenker', efecto: 'La dirección prevé cerrar la integración a finales de 2026 (antes, a finales de 2028). Con ella terminan las partidas especiales (≈11.000 M en total, ≈8.700 M a sep-26; ≈5.500 M en 2026) y el flujo libre deja de cargar ≈6.500 M anuales [P1, P3].', probabilidad: 'Media', sentido: '+' },
    { fecha: 'Feb-2027', evento: 'Informe anual 2026 y guía de 2027', efecto: 'Primera guía con las sinergias completas (9.000 M anuales con impacto pleno en 2027) y sin costes de integración: es el año en que el beneficio por acción ajustado debería saltar [P1, P3].', probabilidad: 'Alta', sentido: '+' },
    { fecha: '21-oct-2026 a 1-feb-2027', evento: 'Recompra de 1.500 M DKK', efecto: 'Primera recompra desde Schenker (hasta 2,6 M de acciones, el 1,09 % del capital), con la deuda en 2,5 veces el EBITDA; sirve para planes de incentivos y lo sobrante se propondrá amortizar [A16].', probabilidad: 'Alta', sentido: '+' },
    { fecha: '12 meses', evento: 'Vencimiento de bonos por 13.100 M (1.750 M EUR)', efecto: 'Refinanciación de los bonos que vencen en los próximos doce meses, con 11.800 M de líneas comprometidas sin disponer [P1].', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2026-2027', evento: 'Normalización de los fletes tras el conflicto de Oriente Medio', efecto: 'Las tarifas aéreas y marítimas subieron en el 2T26 por el conflicto y el combustible; su vuelta reduce los ingresos pero no necesariamente el margen bruto por unidad, que es lo que gana el transitario [P1].', probabilidad: 'Media', sentido: '+/−' },
  ],
  confianza: 'Media',
};

export const preguntas = {
  items: [
    { tema: 'Road', pregunta: '¿Cuántos clientes y cuánto margen bruto se han perdido en Alemania, Francia y Países Bajos por la integración de la red de grupaje, y en qué trimestre esperan recuperar la productividad de 2025?', por_que: 'El 1S26 admite caída de productividad y de satisfacción de clientes en Road; la acción cayó un 14,2 % el día de los resultados. Es el riesgo que el precio está descontando [P1].' },
    { tema: 'Sinergias', pregunta: '¿Qué parte de los 9.000 M de sinergias es reducción de plantilla (más de 8.000 empleados de oficina menos) y qué parte depende de cerrar almacenes y unificar sistemas en 2027?', por_que: 'La parte de plantilla ya está hecha; la de red y sistemas es la que más se retrasa en las integraciones de transitarios [P1].' },
    { tema: 'Objetivos 2030', pregunta: '¿Los 9.000 M de mejoras de productividad por IA y tecnología hasta 2030 son netos de la inflación salarial, o hay que restarles 1,5-2 puntos anuales de subida de costes?', por_que: 'La diferencia entre un 40 % y un 45 % de conversión en 2030 vale ≈4.500 M de EBIT; es el supuesto que más separa nuestro caso base del objetivo [P2].' },
    { tema: 'Clientes', pregunta: '¿Compitió DSV por el contrato de logística de infraestructura de AWS que Amazon adjudicó a Kuehne+Nagel en septiembre y qué peso tienen los centros de datos en Contract Logistics?', por_que: 'La tecnología y los centros de datos son el motor de crecimiento de Contract Logistics en 2026; la prensa ligó la caída del 21-sep a ese contrato [P1, P4].' },
    { tema: 'Circulante', pregunta: '¿Cuándo se cobran los 1.800 M de la venta de inmuebles de Schenker y qué parte del circulante del 3,5 % de las ventas es estructural tras la integración?', por_que: 'El flujo libre ajustado del 2T26 cayó a 786 M; el objetivo a largo plazo es un 2-3 % de las ventas [P1].' },
    { tema: 'Capital', pregunta: '¿Hay nuevas compras grandes en el plan antes de bajar de 2,0x de deuda neta sobre EBITDA, o la prioridad tras el desapalancamiento son las recompras?', por_que: 'La estrategia 2030 cuenta con crecimiento por compras; una compra grande antes de demostrar la integración de Schenker sería la señal contraria a la que pide el mercado [P2].' },
  ],
  confianza: 'Media',
};
