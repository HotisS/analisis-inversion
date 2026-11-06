// Resumen ejecutivo (Nemetschek, corte 2026-11-06, tras el 3T26). Se escribe el último; cifras del motor tal cual.

const sintesis = `**La recomendación y por qué.** Comprar, con convicción media. El objetivo a 12 meses es de 94,30 EUR (nuestro BPA de 2028e por el PER de la regla): un 39,7 % sobre el precio de 68,00 EUR con el dividendo y un 38,6 % en el caso base; con la regla de control (v2), un 26,9 %. El valor intrínseco es de 79,30 EUR (+16,6 %) y el objetivo medio de los analistas, de 87,13 EUR [D35]. En el DCF el alcista gana un 52,9 % y el bajista pierde un 34,0 % (1,56 veces). El precio castiga a la vez el frenazo del 3T26 y la dilución de Thoma Bravo, y pide menos crecimiento que el del mercado. La convicción es la sugerida: no llega a alta porque el bajista pierde más de un 25 %; subiría con una guía orgánica de 2027 de dos dígitos y bajaría si el ROIC de 2026 queda por debajo del 12,8 %.

**Qué ha cambiado desde el 10-oct.** El 3T26 confirmó la guía, pero el crecimiento orgánico frenó al 12,5 % a tipo constante (13,6 % esperado) y el BPA publicado cayó a 0,40 EUR por la amortización de HCSS y el minoritario [A17, D30]. Bajamos el BPA de 2028e de 2,83 a 2,65; el puente real (deuda neta de 425,9 M y minoritario registrado en 1.791,4 M) sube el DCF de 76,10 a 82,04 EUR [A17].

**El negocio.** El 96 % de los ingresos es recurrente y los clientes pagan por adelantado (594,3 M de ingresos diferidos) [A17]. El ROIC de 2025 es del 19,2 % frente a un WACC del 8,26 %, pero HCSS triplica el capital invertido (3.380 M) y lo bajará a ≈ 10-12 % (estimación propia). La calidad de la empresa sí sostiene el crecimiento que proyectamos (9,6 % anual de 2027e a 2035e, como su mercado y sin capital nuevo).

**Finanzas.** En 9M26 los ingresos crecieron un 16,8 % (14,6 % orgánico a tipo constante), el margen EBITDA fue del 30,9 % (32,1 % orgánico) y el flujo libre antes de compras subió un 8,7 % [A17]. Design frenó por un paso más lento a la suscripción, según la empresa [A20]. Deuda neta: 1,1 veces el EBITDA. El gobierno sigue restando: control familiar del 45 % y remuneración rechazada por el 86 % del capital libre [C3, C16].

**Valoración.** El DCF inverso dice que el precio supone un crecimiento del 7,6 % anual, frente al 9,6 % de nuestro caso base, o un margen del 30,8 % en vez del 35,5 %. Cotiza a 18,5 veces el EBITDA de los próximos 12 meses, la mediana de sus comparables (18,8), y a 33,0 veces el beneficio, frente a 51,5 de media en la década. Nuestro BPA de 2028e queda un 18 % bajo el consenso porque es publicado, con la amortización de HCSS y el 28 % de Build restados [D29].

**Riesgos y catalizadores.** El mayor riesgo es que la IA reduzca las licencias de diseño (bajista: 44,87 EUR); el segundo, el ROIC: con las cuentas de 2026, en marzo, quedará ≈ 3 puntos sobre el WACC, por debajo de los 4,5 del filtro de calidad para mantener; el tercero, los derechos de Thoma Bravo en Build. Catalizadores: la guía de 2027 en marzo y el 1T27, sin la rebaja de ingresos diferidos de HCSS. En los foros el tema ya no es la IA sino la dilución [E3].

**Qué cambiaría la decisión.** Para comprar, por debajo de 79,30 EUR según la regla y de 74,42 EUR con las pruebas de robustez (nivel A). Para quien la tiene, el precio de venta es el filtro de mantener, 86,35 EUR; la banda Vender de la regla (ponderada ≤ −10 %) empieza en 105,53 EUR. Bajaríamos a Mantener con una guía orgánica de 2027 por debajo del 10 % o un ARR orgánico por debajo del 10 %.`;

export const resumen = {
  recomendacion: 'Comprar',
  conviccion: 'Media',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis,
  tesis: `Nemetschek es uno de los tres grandes del software de diseño y construcción: 1.337,1 M de ingresos en los últimos 12 meses, un 96 % recurrentes en 9M26, y un margen EBITDA orgánico del 32,1 % [A17]. Con HCSS, cerrada el 1-jul-2026, gana la obra civil de EE. UU. y facturará unos 1.700 M en 2027 según el consenso [D29].

El precio de 68,00 EUR, un 29 % bajo el máximo de 52 semanas, descuenta un crecimiento del 7,6 % anual hasta 2035 con el margen de hoy. Cotiza a 18,5 veces el EBITDA de los próximos 12 meses, como sus comparables, y a 33,0 veces el beneficio, el mínimo de su década [D28, D38].

El mercado acierta al quitarle la prima: la IA puede cambiar cómo se cobra el diseño, Design frenó en el 3T26 y Thoma Bravo se queda el 28 % de la mejor división. Se equivoca si cree que el crecimiento orgánico cae ya a un dígito: el ARR orgánico crece un 16,6 % a tipo constante y la guía de 2026 se confirmó entera [A17]. Para invertir hay que creer que crecerá con su mercado, subirá el margen y que el reparto con Thoma Bravo ya está en el precio.`,
  vision_diferencial: {
    mercado_descuenta: `Un crecimiento del 7,6 % anual con un margen del 30,8 %: que Nemetschek crece menos que su mercado, sin mejorar el margen y sin la prima de calidad de la década, y que la dilución de Thoma Bravo pesa más que HCSS.`,
    nuestra_vision: `Un crecimiento del 9,6 % anual, el del mercado, y un margen EBITDA que sube al 35,5 % con la escala de la suscripción y de Build (44,7 % orgánico en el 3T26). En BPA publicado somos más prudentes que la calle (−18 %).`,
    por_que: `Porque el frenazo del 3T26 viene del ritmo de migración en Design y no de precios ni de bajas, según la empresa, y el ARR orgánico sigue al 16,6 % [A17, A20]. La diferencia con el mercado está en el múltiplo y el crecimiento a largo plazo, no en el beneficio de 2027-2028.`,
  },
  a_favor: [
    '**Ingresos recurrentes**: el 96 % de las ventas de 9M26, con 594,3 M cobrados por adelantado [A17].',
    '**Guía de 2026 confirmada**: 14,6 % orgánico a tipo constante en 9M26 y ARR orgánico +16,6 % [A17].',
    '**Build orgánico** crece un 25,6 % con un margen del 44,7 % en el 3T26 [A17].',
    '**PER de 33,0 veces**, frente a una media de 51,5 en la década; el precio descuenta un 7,6 % de crecimiento.',
    '**Balance**: deuda neta de 425,9 M tras HCSS (1,1 veces el EBITDA con arrendamientos) [A17].',
  ],
  en_contra: [
    '**Riesgo de la IA** sobre las licencias de diseño: el bajista vale 44,87 EUR.',
    '**Thoma Bravo con ≈ 28 % de Build**: 1.791,4 M de minoritario y 12,3 M del beneficio del 3T26 [A17].',
    '**ROIC a la baja**: el capital invertido se triplica a 3.380 M; ≈ 10-12 % tras HCSS (estimación propia).',
    '**Frenazo orgánico**: 12,5 % a tipo constante en el 3T26, por debajo del 13,6 % esperado [D30].',
    '**Gobierno**: el 86 % del capital libre votó contra la remuneración y el consejo sube el tope [C3, C9].',
  ],
  que_vigilar: `La tesis depende de que el crecimiento orgánico vuelva a dos dígitos altos en 2027 mientras la IA llega al diseño, y de que HCSS rinda lo bastante para que el ROIC no se hunda. La señal de que no se cumple sería una guía orgánica de 2027 de un dígito, un ARR orgánico por debajo del 10 % o un ROIC de 2026 por debajo del 12,8 %.`,
  cambiaria_recomendacion: [
    'Si el precio supera 86,35 EUR, el filtro de mantener deja de cumplirse (precio de venta para quien la tiene); la banda Vender de la regla empieza en 105,53 EUR.',
    'Si la guía orgánica de 2027 queda por debajo del 10 %, pasaríamos a Mantener.',
    'Si el ARR orgánico crece menos del 10 % a tipo constante, revisaríamos el caso base hacia el bajista.',
    'Si el ROIC de 2026 resta menos de 4,5 puntos al WACC (por debajo del 12,8 %), el filtro de calidad pediría vender.',
    'Si se publica una opción de venta de Thoma Bravo por encima de 2.000 M, revisaríamos el puente.',
  ],
  kpis_seguimiento: [
    { kpi: 'ARR orgánico a tipo constante', nivel_actual: '1.270,1 M (+16,6 %, sep-26)', umbral_alerta: '< +10 %', por_que: 'La IA se vería primero aquí.' },
    { kpi: 'Crecimiento de Design a tipo constante', nivel_actual: '+8,6 % (9M26); +6,5 % en el 3T26', umbral_alerta: '< +5 %', por_que: 'Es la división expuesta a la IA y la que frenó.' },
    { kpi: 'Margen EBITDA orgánico de Build', nivel_actual: '44,7 % (3T26); 41,5 % (9M26)', umbral_alerta: '< 38 %', por_que: 'Sostiene la subida del margen del grupo.' },
    { kpi: 'ROIC con el capital de HCSS', nivel_actual: '≈ 10-12 % (estimación propia)', umbral_alerta: '< 12,8 % en las cuentas de 2026', por_que: 'Filtro de calidad para mantener (WACC + 4,5).' },
    { kpi: 'Minoritarios en la cuenta', nivel_actual: '12,3 M (3T26)', umbral_alerta: '> 30 % del beneficio antes de impuestos de Build', por_que: 'Mide lo que se lleva Thoma Bravo.' },
  ],
  confianza: 'Media',
};
