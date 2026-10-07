// Textos cualitativos del analista (Edenred, corte 2026-10-07): catalizadores, preguntas.
// Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = propia.

export const catalizadores = {
  items: [
    { fecha: '12-oct-2026', evento: 'Debate en la Asamblea Nacional de la proposición de ley 2892 sobre el título restaurante (procedimiento acelerado desde el 28-sep) [B7, B8]', efecto: 'Fija el marco francés: solo digital desde 2028, uso en cualquier alimento, prohibición de descuentos a las empresas y transparencia de comisiones; el texto descarta un tope. Una enmienda que lo introduzca sería el riesgo; sin tope, despeja la mayor incógnita regulatoria que queda.', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '21-oct-2026', evento: 'Ingresos del 3T26 [A6]', efecto: 'Primer trimestre completo con Brasil en red abierta (desde el 11-may) y último con efecto residual de Italia; mide si el crecimiento intrínseco aguanta en torno al 8 %.', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Nov-2026', evento: 'Interoperabilidad plena del PAT en Brasil (360 días desde el decreto 12.712) [B5]', efecto: 'Cualquier tarjeta podrá aceptarse en cualquier red: presión adicional sobre la comisión y sobre la cuota en comida en Brasil (≈10 % de los ingresos operativos) [A8].', probabilidad: 'Alta', sentido: '−' },
    { fecha: '4-ene a 31-may-2027', evento: 'Ventana de ejercicio de las opciones de compra de Rock Investment (grupo de Xavier Niel) sobre el 8,00 % del capital [C6]', efecto: 'Si elige la entrega física, entra un accionista de referencia con el 8 % en una empresa con el 98 % de capital flotante; con las aproximaciones de fondos admitidas el 18-jun-2026 [C10], sostiene la opción de una operación corporativa.', probabilidad: 'Media', sentido: '+' },
    { fecha: '2-mar-2027', evento: 'Resultados de 2026 y confirmación de la guía de 2027 (EBITDA +8 % / +12 % comparable, conversión ≥65 %) [A6]', efecto: 'Es la prueba de que 2026 fue el valle: el precio descuenta poco crecimiento, así que confirmar la guía con la regulación brasileña completa es la principal palanca de revalorización.', probabilidad: 'Alta', sentido: '+' },
    { fecha: '2026-2027 (sin fecha)', evento: 'Recurso de la ABBT ante el Supremo de Brasil contra el decreto del PAT [B20]', efecto: 'Una suspensión del tope devolvería parte de los ≈20 puntos de EBITDA que Italia y Brasil restan en 2026; una confirmación cierra la puerta.', probabilidad: 'Baja', sentido: '+' },
    { fecha: '2026-2027 (sin fecha)', evento: 'Investigación de la AGCM italiana por abuso de posición dominante en vales de comida (abierta en marzo de 2026) y nuevo juicio en París de la multa francesa de 2019 [C11, C1]', efecto: 'Multas posibles de un orden de magnitud similar a la de 2019 (158 M EUR, 0,68 EUR por acción) y demandas de daños de comercios.', probabilidad: 'Media', sentido: '−' },
    { fecha: 'Hasta nov-2027', evento: 'Recompras: mandato de 50 M EUR hasta el 31-oct-2026 con intención de ampliarlo a 100 M EUR hasta el 30-nov-2027 [C12]', efecto: 'Con la deuda neta de la empresa en 1.764 M a jun-26 y el A− confirmado, hay margen para recomprar más; cada 100 M EUR son ≈1,5 % del capital al precio actual.', probabilidad: 'Alta', sentido: '+' },
  ],
  confianza: 'Alta',
};

export const preguntas = {
  items: [
    { tema: 'Float y caja libre', pregunta: '¿Qué parte de los 3.319 M de efectivo y activos financieros de junio de 2026 corresponde a fondos de clientes sin restricción legal, y en qué escenario regulatorio (como el plazo de 15 días de Brasil) tendría que inmovilizarse o devolverse?', por_que: 'Es la cifra que más mueve el puente: 2.739 M (11,96 EUR por acción) según se trate como caja libre o como pasivo operativo.' },
    { tema: 'Rendimiento del float', pregunta: '¿Qué sensibilidad tiene el other revenue a 100 pb de tipos en euros y en reales, y qué cobertura tiene la cartera (plazos, swaps en BRL y MXN)?', por_que: 'La URD no la publica [A1]; el other revenue es el 17 % del EBITDA de 2025 y cae si bajan la Selic y el euríbor.' },
    { tema: 'Brasil tras la interoperabilidad', pregunta: '¿Cuánto del margen de comida en Brasil queda tras el tope del 3,6 % y la red abierta, y qué cuota se pierde cuando la interoperabilidad sea plena en noviembre de 2026?', por_que: 'Brasil comida es ≈10 % de los ingresos operativos y el golpe de 2026 se concentra ahí [A8].' },
    { tema: 'Francia', pregunta: 'Si la ley francesa termina con un tope de comisión (lo que el texto actual descarta), ¿qué parte del ≈7 % de los ingresos operativos que es comida en Francia estaría expuesta?', por_que: 'Es el escenario bajista: Italia y Brasil ya han demostrado que los topes se aprueban.' },
    { tema: 'Operación corporativa', pregunta: '¿Qué contestó el consejo a las aproximaciones de fondos de junio de 2026 y qué pretende Rock Investment con sus opciones sobre el 8 %?', por_que: 'Las transacciones del sector se pagan a 15-20x EBITDA frente a ≈6x de Edenred; la prima de control es el alcista más claro.' },
    { tema: 'Conversión de caja', pregunta: '¿Qué parte de la conversión ≥65 % de 2027-28 viene del crecimiento del float y cuál del negocio, si el plazo de pago a comercios se acorta en otros países?', por_que: 'El flujo libre que publica la empresa incluye la variación del float; nuestro DCF no la cuenta.' },
    { tema: 'Remuneración', pregunta: '¿Por qué el plan de acciones de rendimiento mide el EBITDA y no el ROIC o el flujo libre por acción, con un 23-34 % de votos en contra en tres juntas?', por_que: 'Premiar EBITDA favorece comprar crecimiento (Reward Gateway, 1.150 M GBP en 2023).' },
  ],
  confianza: 'Media',
};
