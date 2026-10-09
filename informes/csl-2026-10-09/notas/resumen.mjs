// Resumen ejecutivo (CSL, corte 2026-10-09). Se escribe el último; cifras del motor tal cual.

const sintesis = `**La recomendación y por qué.** Mantener, con convicción baja. El valor objetivo es de 99,00 USD (141,85 AUD), un 22,8 % por debajo del precio de 128,30 USD (183,84 AUD), y la rentabilidad total esperada a 12 meses es del −20,6 %, con una asimetría de −0,02 veces: el alcista (127,21 USD) no llega al precio y el bajista (71,64) pierde un 44,2 %. Con nuestro coste de capital la regla da Vender; con la prima que hoy pide el mercado (4,2 %) el valor objetivo sube a 117,00 USD y la rentabilidad total a −6,5 %, que es Mantener, y esa regla manda. **La convicción es baja porque las dos reglas discrepan y la diferencia es casi toda tasa de descuento**: pasaríamos a Vender por encima de 132,07 USD (189,23 AUD), un 3 % sobre el precio, y a Comprar por debajo de 97,02 USD (139,02 AUD) o si el margen bruto de Behring del primer semestre de FY27 supera el 52 %.

**El negocio.** CSL es el primer fraccionador de plasma del mundo (≈30 % del mercado y ≈55 % de la inmunoglobulina subcutánea) en un sector concentrado con un foso de escala amplio [B1, B3]. Lo que se ha roto es la rentabilidad: el margen bruto de Behring bajó del 57,1 % en FY19 al 49,6 % en FY26 y no ha recuperado nada desde FY23 [A1], y Vifor, comprada por 11.665 M a 19,4 veces el EBITDA, acumula 4.845 M de deterioros [A1, D29]. El ROIC pasó del 21-26 % de FY17-FY21 al 11,4 % en FY25, solo 2,5 puntos por encima del WACC (8,86 %).

**Finanzas.** El EBITDA subyacente de FY26 es de 5.282 M (33,4 % de margen), con 844 M de reestructuración fuera; la pérdida estatutaria de 2.579 M es contable [A1]. La deuda neta ajustada (10.668 M, 2,0 veces el EBITDA) no preocupa; el circulante, en el 42,4 % de las ventas, sí frena la caja: la conversión de la década es del 75 %.

**Equipo y gobierno.** Restan. Consejero delegado interino desde febrero, directores financiero y comercial nuevos, guía de FY26 rebajada dos veces y escisión de Seqirus aplazada sin fecha [C3, C9, C10]. El consejo es independiente (9 de 10) y cumple 12 de 13 criterios, pero la remuneración tuvo un 42,30 % de votos en contra en 2025 y el consejo excluirá los deterioros del ROIC de los incentivos [C1, C4].

**Valoración.** El DCF da 103,89 USD (−19,0 %). El DCF inverso dice que el precio pide un crecimiento de las ventas del 6,5 % anual durante diez años, frente al 3,7 % de nuestro caso base y a una guía de ingresos planos para FY27, o un margen EBITDA del 40,5 %, cuatro puntos por encima del máximo de la década [D17]. La rentabilidad implícita es del 7,9 % con un Tesoro al 5,28 % [D4]. No discrepamos del consenso en las cifras (mismas ventas y un EBITDA un 5-7 % mayor en FY28-FY29) [D14]; discrepamos del precio, que ha subido un 104 % desde junio y ya está en el precio objetivo medio de los analistas (128,84 USD) [D1, D15].

**Riesgos y catalizadores.** El mayor riesgo es que el margen de Behring no se recupere (el bajista, −44,2 %) durante el cambio de máquinas de aféresis (hasta finales de 2027) y la espera de Horizon 2 [B9, B10]; después, los anticuerpos FcRn en la CIDP y una tasa de descuento más alta (WACC +0,5 puntos: −10 % de valor). Catalizadores con fecha: la junta del 27-oct-2026, el nombramiento del consejero delegado y los resultados semestrales del 9-feb-2027.

**Qué cambiaría la decisión.** Comprar por debajo de 97,02 USD (139,02 AUD) y vender por encima de 132,07 USD (189,23 AUD). Una nueva rebaja de la guía de FY27 o un Tesoro por encima del 5,5 % bajarían el valor.`;

export const resumen = {
  recomendacion: 'Mantener',
  conviccion: 'Baja',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis,
  tesis: `CSL es el mayor fraccionador de plasma del mundo: Behring factura 11.387 M con un margen de segmento del 40,5 % y lidera un mercado de más de 35.000 M que crece en volumen de inmunoglobulina un 9 % anual [A1, B3, B12]. Hasta FY21 eso daba un ROIC del 21-26 % y un crecimiento de doble dígito. Desde entonces el margen bruto de Behring ha perdido 7,5 puntos, la compra de Vifor ha destruido valor y el equipo directivo ha cambiado entero [A1, C3].

El precio de 128,30 USD (183,84 AUD), tras subir un 104 % desde junio, descuenta la vuelta a la CSL de antes: un crecimiento del 6,5 % anual durante diez años, o un margen EBITDA del 40,5 %, frente a una guía de ingresos planos para FY27 y un máximo de margen del 36,1 % en la década [D1, D17]. Cotiza a 14,0 veces el EBITDA, la mitad de su historia, pero con prima frente a sus comparables (10,3 veces).

El mercado acierta en que el foso existe y en que el coste por litro baja; se equivoca al dar por hecha la recuperación del margen antes de que el cambio de máquinas y Horizon 2 lo demuestren [B9, B10]. Para invertir hay que creer que Behring vuelve al 55 % de margen bruto y aceptar una rentabilidad implícita del 7,9 % con un Tesoro al 5,28 % [D4]. Nosotros no lo pagaríamos a este precio, pero tampoco venderíamos: con la prima que hoy pide el mercado la acción vale 117,00 USD y la distancia es de tasa, no de negocio.`,
  vision_diferencial: {
    mercado_descuenta: `Que lo peor ha pasado: los deterioros de FY26 limpiaron Vifor, el programa de ahorros (≈550 M en FY28) y el coste por litro devuelven el margen, y un consejero delegado nuevo relanza el crecimiento [D17]. Con el precio a 128,30 USD, eso exige un crecimiento del 6,5 % anual o un margen EBITDA del 40,5 %. El precio objetivo medio de los 17 analistas (128,84 USD) coincide con la cotización [D15].`,
    nuestra_vision: `El foso de Behring es real, pero su margen bruto lleva tres años parado en el 49-50 % y los próximos dos años traen un cambio de máquinas en todos los centros de EE. UU., ensayos para Horizon 2 y más competencia de los FcRn [B9, B10, B21]. Esperamos un crecimiento medio del 3,7 % y un margen del 35,5 % a largo plazo: eso vale 103,89 USD con nuestro WACC y 126,61 con la prima del mercado.`,
    por_que: `Porque la historia reciente de la propia CSL no da precedentes de la recuperación que pide el precio: la guía de crecimiento de doble dígito de 2023 se abandonó, la de FY26 se rebajó dos veces y la de FY27 es de ingresos planos [C9, C10, D17]. Pero nuestras cifras no se apartan del consenso: la diferencia es la tasa de descuento, y por eso no hay una tesis de venta con convicción.`,
  },
  a_favor: [
    '**Líder con foso de escala**: ≈30 % del mercado de proteínas plasmáticas y ≈55 % de la Ig subcutánea [B1, B3].',
    '**Demanda que crece**: el volumen de Ig en los siete mercados principales sube un 9 % anual desde FY22 [B3].',
    '**Ahorros con calendario**: 176 M en FY26 y hasta ≈550 M anuales en FY28 [A6, D17].',
    '**Balance holgado**: deuda neta de 1,8 veces el EBITDA, 84 % a tipo fijo y vida media de 10 años [A1].',
    '**Recompra de 1.150 M AUD** hasta junio de 2027, ≈1,3 % del capital [D7].',
  ],
  en_contra: [
    '**El precio pide un 6,5 % de crecimiento anual** durante diez años frente a una guía de ingresos planos [D17].',
    '**Margen bruto de Behring estancado** en el 49,6 %, 7,5 puntos por debajo de FY19 [A1].',
    '**Asignación de capital fallida**: ROIC incremental de la década del −16,1 % y 7.079 M de deterioros en FY26 [A1].',
    '**Equipo provisional**: consejero delegado interino y tres relevos en la cúpula en doce meses [C3, C7, C8].',
    '**Sustitución en neurología**: VYVGART vendió 4.151 M en 2025 (+90 %) y la CIDP será ≈22 % de la Ig de CSL [B3, B21].',
  ],
  que_vigilar: `La tesis depende del margen bruto de Behring: hoy en el 49,6 %, tiene que subir hacia el 52-55 % en FY27-FY28 para que el precio tenga sentido. La señal de que no ocurre sería un primer semestre de FY27 (9-feb-2027) con el margen por debajo del 50 %, una pérdida de productividad en la recogida de plasma durante el cambio a Haemonetics o un retraso de los ensayos de Horizon 2 más allá de julio de 2027 [B9, B10].`,
  cambiaria_recomendacion: [
    'Si el precio baja de 97,02 USD (139,02 AUD), pasaríamos a Comprar.',
    'Si el precio supera 132,07 USD (189,23 AUD), pasaríamos a Vender.',
    'Si el margen bruto de Behring del 1S27 supera el 52 %, subiríamos el margen del caso base y el valor objetivo.',
    'Si la empresa rebaja la guía de FY27 (NPAT subyacente +5 %), pasaríamos a Vender.',
    'Si el Tesoro a 10 años supera el 5,5 %, el valor con la prima del mercado bajaría hacia el umbral de venta.',
  ],
  kpis_seguimiento: [
    { kpi: 'Margen bruto de CSL Behring', nivel_actual: '49,6 % (FY26)', umbral_alerta: '< 50 % en el 1S27', por_que: 'Behring es el 72 % de los ingresos y su margen lleva tres años estancado.' },
    { kpi: 'Crecimiento de la Ig en moneda constante', nivel_actual: 'Plano en FY26; +7 % en el 2S26', umbral_alerta: '< 4 % en el 1S27', por_que: 'La guía pide un dígito medio-alto; por debajo, los FcRn o los precios están mordiendo.' },
    { kpi: 'Ahorros del programa de transformación', nivel_actual: '176 M (FY26)', umbral_alerta: '< 400 M en FY27', por_que: 'Sostienen el salto del margen EBITDA del 32,2 % al 34,3 %.' },
    { kpi: 'Ingresos de CSL Vifor', nivel_actual: '2.379 M (FY26)', umbral_alerta: '< 1.780 M en FY27 (peor que −25 %)', por_que: 'Más genéricos y deterioros.' },
    { kpi: 'Voto en contra del informe de remuneración', nivel_actual: '42,30 % (2025)', umbral_alerta: '> 25 % el 27-oct-2026', por_que: 'Abre otro ciclo de dos strikes y presiona la sucesión del presidente.' },
  ],
  confianza: 'Media',
};
