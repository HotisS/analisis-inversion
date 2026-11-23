// Resumen ejecutivo (Nemetschek, corte 2026-11-23, versión nueva por la caída). Se escribe el último; cifras del motor tal cual.

const sintesis = `**La recomendación y por qué.** Comprar por la regla, con convicción media. El objetivo a 12 meses es de 68,08 EUR (nuestro BPA de 2028e por el PER de hoy, sin recuperar múltiplo): un 27,1 % sobre el precio de 54,10 EUR con el dividendo y un 26,2 % en el caso base. El valor intrínseco es de 77,51 EUR (+43,3 %) y el objetivo medio de los analistas, de 86,12 EUR [D35]. El precio descuenta que el crecimiento cae a la mitad y las cifras no lo muestran. El motor sugiere convicción alta; la dejamos en media porque a 54,10 EUR la compra no aguanta un BPA un 10 % peor, el múltiplo del sector puede seguir bajando y el ROIC caerá con HCSS. Subiría con una guía orgánica de 2027 de dos dígitos; bajaría si el ARR orgánico baja del 10 %.

**Qué ha pasado.** La acción ha caído un 33 % en un mes, a mínimos de 52 semanas, sin hechos nuevos de la empresa: guía confirmada, sin ventas de directivos ni colocaciones [C25, D47]. Cae todo el software europeo, en su peor semana desde marzo de 2020, por el miedo a que la IA sustituya funciones por las que hoy se paga licencia [D45]. El 23-nov JPMorgan la bajó de «Overweight» a «Underweight» y el objetivo de 110 a 50 EUR: Design pasa más despacio a la suscripción, Media se encoge y HCSS enturbia Build [D41, D42]. Son riesgos que el informe del 6-nov ya tenía [D43, D44].

**El negocio.** El 96 % de los ingresos es recurrente [A17]. El ROIC de 2025 es del 19,2 % frente a un WACC del 8,33 %, pero HCSS triplica el capital invertido (3.380 M) y lo bajará a ≈ 10-12 % (estimación propia). La calidad de la empresa sí sostiene el crecimiento que proyectamos (9,6 % anual de 2027e a 2035e, como su mercado y sin capital nuevo).

**Finanzas.** Sin cifras nuevas: en 9M26 los ingresos crecieron un 16,8 % (14,6 % orgánico a tipo constante) y el margen EBITDA fue del 30,9 % (32,1 % orgánico) [A17]. El consenso de ingresos de 2027e no se ha movido (1.728 M), pero el de BPA baja un 4,8 % en 60 días [D35].

**Valoración.** El DCF inverso dice que el precio supone un crecimiento del 5,5 % anual, frente al 9,6 % de nuestro caso base, o un margen del 26,3 % en vez del 35,5 %, por debajo del de hoy. Cotiza a 15,4 veces el EBITDA y 19,9 veces el beneficio de los próximos 12 meses, por debajo de sus comparables (19,8 y 21,3), también desrateados [D38]. Como el PER de hoy es la mitad de su mediana de cinco años, la regla pasa a la v2: no supone que vuelva la prima (la v3 daría un 39,9 %). Nuestro BPA de 2028e queda un 18 % bajo el consenso porque es publicado [D29].

**Riesgos y catalizadores.** El mayor riesgo es que la IA reduzca las licencias de diseño (bajista: 44,28 EUR); el segundo, que el sector siga perdiendo múltiplo (con el PER de los comparables, el objetivo bajaría a ≈ 56 EUR); el tercero, el ROIC: con las cuentas de 2026, en marzo, quedará ≈ 3 puntos sobre el WACC, por debajo de los 4,5 del filtro de calidad. Catalizador: la guía de 2027 en marzo.

**Qué cambiaría la decisión.** Para comprar, por debajo de 59,79 EUR según la regla y de 53,91 EUR con las pruebas de robustez (nivel A; nivel B hasta 56,36). Para quien la tiene, el precio de venta es el filtro de mantener, 62,53 EUR, calculado con el objetivo fijo; la banda Vender de la regla (ponderada ≤ −10 %) empieza en 76,40 EUR. Pasaríamos a Mantener con una guía orgánica de 2027 por debajo del 10 % o un ARR orgánico por debajo del 10 %.`;

export const resumen = {
  recomendacion: 'Comprar',
  conviccion: 'Media',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis,
  tesis: `Nemetschek es uno de los tres grandes del software de diseño y construcción: 1.337,1 M de ingresos en los últimos 12 meses, un 96 % recurrentes en 9M26, y un margen EBITDA orgánico del 32,1 % [A17]. Con HCSS, cerrada el 1-jul-2026, gana la obra civil de EE. UU. y facturará unos 1.700 M en 2027 según el consenso [D35].

El precio de 54,10 EUR, un 47 % bajo el máximo de 52 semanas, descuenta un crecimiento del 5,5 % anual hasta 2035 con nuestro margen, o un margen del 26,3 % con nuestro crecimiento. Cotiza a 15,4 veces el EBITDA de los próximos 12 meses, por debajo de sus comparables, y a 26,3 veces el beneficio de los últimos 12, la mitad de su media de la década [D28, D38].

El mercado acierta al quitarle la prima: la IA puede cambiar cómo se cobra el diseño, Design frenó en el 3T26 y Thoma Bravo se queda el 28 % de la mejor división. Se equivoca si cree que el crecimiento cae ya a la mitad: el ARR orgánico crece un 16,6 % a tipo constante y la guía de 2026 se confirmó entera [A17]. Para invertir hay que creer que crecerá con su mercado y que la IA será un módulo que cobrar y no un sustituto.`,
  vision_diferencial: {
    mercado_descuenta: `Un crecimiento del 5,5 % anual con nuestro margen, o un margen del 26,3 % con nuestro crecimiento: que la IA quita licencias a Design desde ya, que el múltiplo del software no vuelve y que la dilución de Thoma Bravo pesa más que HCSS.`,
    nuestra_vision: `Un crecimiento del 9,6 % anual, el del mercado, y un margen EBITDA que sube al 35,5 % con la escala de la suscripción y de Build (44,7 % orgánico en el 3T26). En el objetivo a 12 meses no suponemos que vuelva el múltiplo: solo que crece el BPA.`,
    por_que: `Porque el frenazo del 3T26 viene del ritmo de migración en Design y no de precios ni de bajas, según la empresa, y el ARR orgánico sigue al 16,6 % [A17, A20]. La caída de noviembre es del sector y de una opinión de analista, no de las cifras [D41, D45].`,
  },
  a_favor: [
    '**Ingresos recurrentes**: el 96 % de las ventas de 9M26, con 594,3 M cobrados por adelantado [A17].',
    '**Guía de 2026 confirmada**: 14,6 % orgánico a tipo constante en 9M26 y ARR orgánico +16,6 % [A17].',
    '**El precio descuenta un 5,5 % de crecimiento**, la mitad de nuestro caso base y del mercado (9,9 %).',
    '**Múltiplos por debajo del sector**: 15,4 veces el EBITDA de los próximos 12 meses frente a 19,8 de mediana [D38].',
    '**Compras de consejeros** a 61-62 EUR en julio y agosto, y ninguna venta de directivos en 12 meses [C20, C21, C25].',
  ],
  en_contra: [
    '**Riesgo de la IA** sobre las licencias de diseño: el bajista vale 44,28 EUR.',
    '**Desrateo del sector**: la mediana del PER de los comparables baja de 29,5 a 21,3 veces en tres semanas [D38].',
    '**ROIC a la baja**: el capital invertido se triplica a 3.380 M; ≈ 10-12 % tras HCSS (estimación propia).',
    '**Thoma Bravo con ≈ 28 % de Build**: 1.791,4 M de minoritario y 12,3 M del beneficio del 3T26 [A17].',
    '**Rebaja de JPMorgan** a «Underweight» con 50 EUR y recortes del BPA de 2027e del consenso (−4,8 % en 60 días) [D35, D42].',
  ],
  que_vigilar: `La tesis depende de que el crecimiento orgánico siga en dos dígitos en 2027 mientras la IA llega al diseño, y de que HCSS rinda lo bastante para que el ROIC no se hunda. La señal de que no se cumple sería una guía orgánica de 2027 de un dígito, un ARR orgánico por debajo del 10 % o un ROIC de 2026 por debajo del 12,8 %.`,
  cambiaria_recomendacion: [
    'Si el precio supera 62,53 EUR, el filtro de mantener deja de cumplirse con el objetivo fijo (precio de venta para quien la tiene); la banda Vender de la regla empieza en 76,40 EUR.',
    'Si la guía orgánica de 2027 queda por debajo del 10 %, pasaríamos a Mantener.',
    'Si el ARR orgánico crece menos del 10 % a tipo constante, revisaríamos el caso base hacia el bajista.',
    'Si el ROIC de 2026 supera al WACC en menos de 4,5 puntos (por debajo del 12,8 %), el filtro de calidad pediría vender.',
    'Si la mediana del PER de los comparables baja de 18 veces, el objetivo a 12 meses bajaría por debajo del precio de hoy.',
  ],
  kpis_seguimiento: [
    { kpi: 'ARR orgánico a tipo constante', nivel_actual: '1.270,1 M (+16,6 %, sep-26)', umbral_alerta: '< +10 %', por_que: 'La IA se vería primero aquí.' },
    { kpi: 'Crecimiento de Design a tipo constante', nivel_actual: '+8,6 % (9M26); +6,5 % en el 3T26', umbral_alerta: '< +5 %', por_que: 'Es la división expuesta a la IA y la que frenó.' },
    { kpi: 'Mediana del PER de los comparables', nivel_actual: '21,3 veces (23-nov)', umbral_alerta: '< 18 veces', por_que: 'Mide si el desrateo del software sigue.' },
    { kpi: 'ROIC con el capital de HCSS', nivel_actual: '≈ 10-12 % (estimación propia)', umbral_alerta: '< 12,8 % en las cuentas de 2026', por_que: 'Filtro de calidad para mantener (WACC + 4,5).' },
    { kpi: 'Minoritarios en la cuenta', nivel_actual: '12,3 M (3T26)', umbral_alerta: '> 30 % del beneficio antes de impuestos de Build', por_que: 'Mide lo que se lleva Thoma Bravo.' },
  ],
  confianza: 'Media',
};
