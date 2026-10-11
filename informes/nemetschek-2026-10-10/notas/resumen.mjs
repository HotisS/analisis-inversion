// Resumen ejecutivo (Nemetschek, corte 2026-10-10). Se escribe el último; cifras del motor tal cual.

const sintesis = `**La recomendación y por qué.** Comprar, con convicción baja. El valor objetivo es de 73,35 EUR, un 8,8 % por encima del precio de 67,40 EUR, y con el dividendo la rentabilidad total esperada a 12 meses es del 9,8 %. El alcista gana un 44,2 % y el bajista pierde un 40,1 %: asimetría de 1,10 veces. Las reglas discrepan: con nuestro WACC (8,25 %) sale Mantener; con la prima que hoy pide el mercado (4,20 %) el objetivo sube a 91,82 EUR (+36,2 %) y sale Comprar, que manda. La convicción es baja, la sugerida, porque las reglas no coinciden: gana al mercado, pero no está barata frente a su coste de capital. Subiría si la guía orgánica de 2027 se mantiene por encima del 10 % y el precio no se mueve; bajaría si el ARR crece menos del 10 %.

**El negocio.** Nemetschek es uno de los tres grandes del software de diseño y construcción, con Autodesk y Bentley [B1]. El 92 % de los ingresos es recurrente, el ROIC es del 19,2 % frente a un WACC del 8,25 % y los clientes pagan por adelantado (466,6 M de ingresos diferidos) [A1]. La calidad de la empresa sí sostiene el crecimiento que proyectamos (9,5 % anual de 2027e a 2035e, en línea con el 9,9 % del mercado y sin capital): el riesgo es que la IA reduzca las licencias, no la capacidad de crecer.

**Finanzas.** Los ingresos crecieron al 15,1 % anual en la década, con compras, y el margen EBITDA pasó del 26,1 % al 31,2 % [A1]. El flujo libre fue del 133 % del beneficio. HCSS, cerrada el 1-jul-2026, añade 450 M de deuda neta y deja a Thoma Bravo con ≈ 28 % de Build: la deuda neta ajustada es de 611 M (1,5 veces el EBITDA) y el minoritario resta 1.900 M (estimación propia) [D1, D3].

**Equipo y gobierno.** Resta. La familia Nemetschek controla el 45,07 % de los votos con un pacto y la remuneración del consejero delegado (17,42 M EUR en 2025) la rechazó el 86 % del capital libre presente en la junta; el consejo sube aun así su tope [C2, C3, C16]. A favor: la guía se ha cumplido cinco años seguidos y dos consejeros compraron acciones en agosto [C20, C21].

**Valoración.** El DCF da 76,10 EUR (+12,9 %). El DCF inverso dice que el precio supone un crecimiento del 8,3 % anual, frente al 9,5 % de nuestro caso base, o un margen EBITDA del 32,4 % en vez del 35,5 %: el margen de hoy sin mejora. Comprar rinde un 8,8 % anual con nuestro caso base, medio punto sobre el WACC. Cotiza a 19,2 veces el EBITDA de los próximos 12 meses, en la mediana de sus comparables (18,2 veces), y a 31,6 veces el beneficio, el mínimo de su década (media de 51,5). Los comparables dan 65,95 EUR y las transacciones 85,28. Coincidimos con el consenso en cifras (−1,2 % en ingresos de 2027e) [D6].

**Riesgos y catalizadores.** El mayor riesgo es que la IA generativa abarate el diseño y reduzca los puestos de proyectistas (bajista: 40,35 EUR); el segundo, el ciclo de la construcción (dos puntos menos de crecimiento: 62,09 EUR); el tercero, los derechos de Thoma Bravo en Build, que no se han publicado. Catalizadores: resultados del 3T26 el 5-nov-2026, con el primer trimestre de HCSS [D5], y la guía de 2027 en marzo.

**Qué cambiaría la decisión.** Sería una compra clara por debajo de 70,49 EUR y pasaría a Vender por encima de 102,84 EUR. Bajaríamos a Mantener si el crecimiento orgánico de 2027 se guía por debajo del 10 % o si el ARR crece menos del 10 %.`;

export const resumen = {
  recomendacion: 'Comprar',
  conviccion: 'Baja',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis,
  tesis: `Nemetschek es uno de los tres grandes del software de diseño y construcción: 1.191,2 M de ingresos en 2025, un 92 % recurrentes, un margen EBITDA del 31,2 % y un ROIC del 19,2 % [A1]. Con HCSS, cerrada el 1-jul-2026, gana la obra civil de EE. UU. y facturará unos 1.700 M en 2027 según el consenso [D1, D6].

El precio de 67,40 EUR, un 38 % por debajo del máximo de 52 semanas, descuenta un crecimiento del 8,3 % anual hasta 2035 con el margen de hoy. Cotiza a 19,2 veces el EBITDA de los próximos 12 meses, como Autodesk, y a 31,6 veces el beneficio, el mínimo de su década [D9, D10].

El mercado acierta al quitarle la prima: la IA puede cambiar cómo se cobra el software de diseño y Nemetschek ha cedido el 28 % de su mejor división. Se equivoca si cree que el negocio ya lo nota: el ARR crece un 17,4 % a tipo constante y la guía orgánica de 2026 se confirmó en julio [A8]. Para invertir hay que creer que la empresa crecerá con su mercado y subirá el margen cuatro puntos.`,
  vision_diferencial: {
    mercado_descuenta: `Un crecimiento del 8,3 % anual con el margen de hoy (32,4 %): que Nemetschek sigue creciendo, pero sin mejorar márgenes y sin la prima de calidad que tuvo durante la década.`,
    nuestra_vision: `Un crecimiento del 9,5 % anual, el del mercado, y un margen EBITDA que sube al 35,5 % con la escala de la suscripción y HCSS al ≈ 40 %. La diferencia con el precio es pequeña (12,9 % en el DCF).`,
    por_que: `Porque Build ya gana un 39,8 % de margen y HCSS un ≈ 40 %, y la suscripción sube el margen al madurar [A8, D3]. No tenemos una visión distinta de la del consenso en cifras: la diferencia está en el múltiplo, no en el negocio.`,
  },
  a_favor: [
    '**Ingresos recurrentes**: el 92 % de las ventas, con 466,6 M cobrados por adelantado [A1].',
    '**Crecimiento orgánico del 14-15 %** confirmado para 2026 y ARR +17,4 % a tipo constante [A8].',
    '**ROIC del 19,2 %**, más del doble del WACC (8,25 %).',
    '**PER de 31,6 veces**, el mínimo de la década (media de 51,5 veces).',
    '**HCSS** añade obra civil de EE. UU. con un margen EBITDA del ≈ 40 % [D3].',
  ],
  en_contra: [
    '**Riesgo de la IA** sobre las licencias de diseño: el bajista vale 40,35 EUR.',
    '**Thoma Bravo con ≈ 28 % de Build**: 1.900 M de minoritario y derechos no publicados [D1].',
    '**Gobierno**: el 86 % del capital libre votó contra la remuneración y el consejo sube el tope [C3, C9].',
    '**No es barata frente a sus comparables**: 19,2 veces el EBITDA de los próximos 12 meses, la mediana es de 18,2.',
    '**Media (Maxon) estancado** en ≈ 121 M de ingresos desde 2023 [A1].',
  ],
  que_vigilar: `La tesis depende de que el crecimiento orgánico se mantenga por encima del 10 % mientras la IA llega al diseño. La señal de que no se cumple sería un ARR por debajo del 10 % a tipo constante o una guía orgánica de 2027 de un dígito, sobre todo si el frenazo viene de Design.`,
  cambiaria_recomendacion: [
    'Si el precio supera 102,84 EUR, pasaríamos a Vender.',
    'Si la guía orgánica de 2027 queda por debajo del 10 %, pasaríamos a Mantener.',
    'Si el ARR crece menos del 10 % a tipo constante, revisaríamos el caso base hacia el bajista.',
    'Si se publica una opción de venta de Thoma Bravo por encima de 2.000 M, revisaríamos el puente.',
    'Si el precio baja de 70,49 EUR sin cambios en el negocio, subiríamos la convicción.',
  ],
  kpis_seguimiento: [
    { kpi: 'ARR a tipo constante', nivel_actual: '1.249,5 M (+17,4 %, jun-26)', umbral_alerta: '< +10 %', por_que: 'La IA se vería primero aquí.' },
    { kpi: 'Crecimiento orgánico de Design', nivel_actual: '+7,3 % reportado (1S26)', umbral_alerta: '< +5 %', por_que: 'Es la división expuesta a la IA.' },
    { kpi: 'Margen EBITDA de Build', nivel_actual: '39,8 % (1S26)', umbral_alerta: '< 35 %', por_que: 'Mide la integración de HCSS.' },
    { kpi: 'Margen EBITDA del grupo', nivel_actual: 'Guía 2026: ≈ 31 % con HCSS', umbral_alerta: '< 30 % en 2027', por_que: 'Sostiene la subida al 35,5 %.' },
    { kpi: 'Minoritarios en la cuenta', nivel_actual: '3,8 M (2025)', umbral_alerta: '> 25 % del beneficio de Build', por_que: 'Mide lo que se lleva Thoma Bravo.' },
  ],
  confianza: 'Media',
};
