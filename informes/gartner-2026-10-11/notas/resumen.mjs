// Resumen ejecutivo (Gartner, corte 2026-10-11). Se escribe el último; cifras del motor tal cual.

const sintesis = `**La recomendación y por qué.** Comprar, con convicción media. El valor objetivo es de 258,48 USD, un 35,2 % por encima del precio de 191,15 USD; sin dividendo, esa es la rentabilidad total esperada a 12 meses. La asimetría es de 2,04 veces (+80,4 % en el alcista frente a −39,4 % en el bajista) y las dos reglas dan Comprar; con la prima de riesgo que hoy pide el mercado, el objetivo sube a 298,15 USD (+56,0 %). La razón: el precio descuenta unas ventas planas hasta 2033e y el valor de contratos ya vuelve a crecer un 2 %. La convicción es media porque el bajista pierde más de un 25 %: si la IA sustituye la investigación de pago, la pérdida es grande. Subiría si la retención de cartera de GTS vuelve al 100 % y bajaría si cae por debajo del 95 % (resultados del 3T26, 3 de noviembre).

**El negocio.** Gartner vende suscripciones de investigación para directivos: Insights es el 78 % de los ingresos, con un margen de contribución del 77 %, el 85 % de los clientes renueva y cobra por adelantado, lo que da un circulante del −36 % de las ventas y un ROIC del 51,1 % frente a un WACC del 9,3 % [A2, B1]. La amenaza es real: el valor de contratos pasó de crecer un 8 % en 2024 al 1 % en 2025 por los recortes federales y por clientes que gastan menos (retención de cartera de GTS del 102 % al 97 %) [A3, A4]. Su calidad sostiene **en parte** el crecimiento que proyectamos: el 2,8 % anual no pide capital y es la cuarta parte del 11,5 % de 2016-2025, pero el volumen no está demostrado hoy.

**Finanzas.** Flujo libre de 1.289 M en los últimos 12 meses (10,7 % de la capitalización) y deuda neta ajustada de 1.671 M (1,2 veces el EBITDA) [A3]. El patrimonio es negativo por las recompras, no por pérdidas. El BPA ajustado excluye 155,9 M de pagos en acciones, que nosotros restamos [A2].

**Equipo y gobierno.** Neutro: 12 consejeros independientes de 13, una acción un voto y sin accionista de control [C1]. Restan la sucesión de Hall (69 años, primer ejecutivo y presidente), recompras a 283-453 USD de media en 2024-2025 y una demanda colectiva por la guía de 2025 [C1, B20].

**Valoración.** El DCF da 254,13 USD (+32,9 %). El DCF inverso dice que el precio supone unas ventas planas (0,0 % anual) en 2027e-2033e, frente al 3,4 % de nuestro caso base, o un margen EBITDA del 18,3 % en vez del 23,5 %: comprar hoy rinde un 11,3 % anual con nuestro caso base, frente a un WACC del 9,3 %. Cotiza a 9,1 veces el EBITDA de los próximos 12 meses, en mínimos de diez años y frente a una mediana de 13,9 veces de los comparables, que tienen el doble de margen. Nuestras cifras quedan algo por debajo del consenso (−2,7 % en ventas de 2028e), pero su precio objetivo medio (189,08 USD) es el precio de hoy [D8]: discrepamos de los analistas en el valor, no en las cifras.

**Riesgos y catalizadores.** El mayor riesgo es la sustitución por la IA generativa: el bajista, con ingresos a la baja y el margen de 2020, vale 115,79 USD. Cada punto menos de crecimiento anual resta un 8 % y dos puntos de margen, un 9 %. Los foros pasan del miedo a un optimismo prudente; la posición corta es del 13,2 % [E5, D5]. Catalizadores: el 3T26 (3-nov) y la guía de 2027 (febrero).

**Qué cambiaría la decisión.** Comprar por debajo de 246,07 USD y vender por encima de 318,96. Pasaríamos a Mantener si el valor de contratos crece menos de un 1 % en el 3T26 o el 4T26, o si la retención de cartera de GTS baja del 95 %.`;

const tesis = `Gartner es la mayor empresa de investigación y asesoramiento para directivos: 6.497 M USD de ingresos en 2025, un valor de contratos de 5.283 M a junio de 2026 y más de 13.000 empresas clientes, con unos ingresos de Insights 17 veces los de investigación de Forrester [A2, A4, B1, B7]. Cobra por adelantado, invierte un 2 % de las ventas y convierte en caja el 149 % del beneficio: un ROIC del 51,1 %. En diez años ha recomprado 6.768 M de acciones [A1].

El precio, 191,15 USD, descuenta que ese negocio deja de crecer. A 9,1 veces el EBITDA de los próximos 12 meses, en mínimos de diez años, el DCF inverso pide unas ventas planas hasta 2033e o un margen EBITDA del 18,3 %. La caída del 77 % desde noviembre de 2024 responde al frenazo del valor de contratos (del +8 % al +1 %), a los recortes federales y al miedo a que la IA generativa sustituya la investigación de pago [D4, A4].

El mercado acierta en que el crecimiento de doble dígito no vuelve pronto, y exagera al suponer que no habrá ninguno: el valor de contratos se ha acelerado del +1,0 % del 4T25 y el 1T26 al +1,7 % del 2T26, la retención de clientes aguanta en el 85 % y la dirección ha subido dos veces la guía de beneficio de 2026 [A3, A4, D28]. Para invertir hay que creer que la IA reduce el gasto por cliente, pero no el número de clientes, y que Gartner puede subir sus tarifas al ritmo de la inflación. Con eso, la acción rinde un 11,3 % anual.`;

export const resumen = {
  recomendacion: 'Comprar', conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
  sintesis, tesis,
  vision_diferencial: {
    mercado_descuenta: `Unas ventas planas de 2027e a 2033e con nuestro margen, o un margen EBITDA del 18,3 % con nuestro crecimiento: una Gartner que la IA generativa estanca, valorada a 9,1 veces el EBITDA de los próximos 12 meses, por debajo de su mínimo de diez años (14,8 veces) y de Dun & Bradstreet en su venta (8,3 veces).`,
    nuestra_vision: `Un crecimiento del 2,8 % anual (3,4 % desde 2027e) que sube del 2,5 % de 2027e al 4 % de 2029e-2030e, con un margen EBITDA contable que pasa del 22,6 % al 23,5 %, algo por debajo del consenso en ventas. Es una Gartner mucho más lenta que la de 2016-2025, pero no una que deje de crecer.`,
    por_que: `El valor de contratos ya se acelera (del +1,0 % del 4T25 al +1,7 % del 2T26) y la retención de clientes aguanta en el 85-86 % [A3, A4]. La IA reduce lo que gasta cada cliente (retención de cartera del 97 %), pero no ha hecho que se vayan, y Gartner la incorpora con AskGartner [B1]. Con un circulante negativo, cada punto de crecimiento genera caja; y el flujo libre (10,7 % de la capitalización) paga esperar.`,
  },
  a_favor: [
    '**Caja abundante y barata**: flujo libre de 1.289 M en los últimos 12 meses, el 10,7 % de la capitalización.',
    '**Negocio de suscripción con circulante negativo**: los ingresos diferidos (2.810 M) financian el crecimiento y el ROIC es del 51,1 %.',
    '**El precio no pide crecimiento**: el DCF inverso descuenta unas ventas planas (0,0 % anual) hasta 2033e.',
    '**Aceleración incipiente**: el valor de contratos pasa del +1,0 % al +1,7 % en dos trimestres y la guía de BPA ajustado sube de 12,30 a 14,00 USD.',
    '**Recompras a precios bajos**: 1.081,8 M en el primer semestre de 2026 a 153,49 USD de media, y 500 M más autorizados en julio.',
  ],
  en_contra: [
    '**Riesgo de sustitución por la IA**: la retención de cartera de GTS ha bajado del 102 % al 97 %; el bajista vale 115,79 USD (−39,4 %).',
    '**Sin crecimiento demostrado**: los ingresos de 2026 caen un 1,2 % y la plantilla comercial ha bajado un 4,5 % desde dic-2024.',
    '**Recompras caras en el pasado**: 1.991 M en 2025 a unos 283 USD de media, en parte con deuda.',
    '**Persona clave**: Hall, 69 años, es primer ejecutivo desde 2004 y presidente, sin sucesor público.',
    '**Analistas escépticos**: solo 3 de 15 recomiendan comprar y el precio objetivo medio (189,08 USD) es el precio actual.',
  ],
  que_vigilar: `La tesis depende de que la IA reduzca el gasto por cliente pero no el número de clientes. La señal es la retención de cartera de GTS: si vuelve al 100 % (97 % a junio de 2026), el valor de contratos se acercará al 4 % del caso base; si baja del 95 % con una retención de clientes por debajo del 84 %, estaremos en el bajista. El dato llega cada trimestre; el próximo, el 3-nov-2026.`,
  cambiaria_recomendacion: [
    'Si el valor de contratos crece menos de un 1 % interanual en el 3T26 o el 4T26, pasaríamos a Mantener.',
    'Si la retención de cartera de GTS baja del 95 % o la de clientes del 84 %, pasaríamos a Mantener o Vender.',
    'Si la guía de 2027 (febrero) da ingresos por debajo del +2 % sin divisa, revisaríamos el caso base a la baja.',
    'Si el precio supera los 318,96 USD sin cambios en las cifras, pasaríamos a Vender o reducir.',
    'Si Hall sale sin un sucesor interno creíble, bajaríamos la convicción.',
  ],
  kpis_seguimiento: [
    { kpi: 'Crecimiento del valor de contratos (sin divisa)', nivel_actual: '+2 % (jun-2026)', umbral_alerta: '< +1 %', por_que: 'Adelanta los ingresos de Insights un año.' },
    { kpi: 'Retención de cartera de GTS', nivel_actual: '97 % (jun-2026)', umbral_alerta: '< 95 %', por_que: 'Mide si la IA reduce lo que gastan los clientes.' },
    { kpi: 'Retención de clientes de GTS', nivel_actual: '85 % (jun-2026)', umbral_alerta: '< 84 %', por_que: 'Mide si la IA hace que los clientes se vayan.' },
    { kpi: 'Plantilla comercial con cuota', nivel_actual: '4.874 (jun-2026)', umbral_alerta: 'Sigue bajando en 2027', por_que: 'El crecimiento sigue a la contratación comercial.' },
    { kpi: 'Margen EBITDA ajustado', nivel_actual: '≥ 24,6 % (guía 2026)', umbral_alerta: '< 23,5 %', por_que: 'La «nueva base» del director financiero sostiene el DCF.' },
  ],
  confianza: 'Media',
};
