// Resumen ejecutivo (Amazon, corte 2026-10-12). Se escribe el último.

const sintesis = `**La recomendación y por qué.** Mantener, con convicción baja. Nuestro valor objetivo es de 213,96 USD frente a un precio de 262,43 USD (cierre del 9-oct-2026), una rentabilidad total esperada del −18,5 % a doce meses. Los escenarios son asimétricos en contra: el alcista apenas gana un 1,0 % y el bajista pierde un 59,0 % (asimetría de 0,02x). La razón principal es que el precio supone que los 220.000 M de capex de IA de 2026 rendirán lo mismo que el capital antiguo [A15]. La regla da Mantener porque discrepan sus dos versiones: con nuestro WACC (12,1 %) sale Vender; con la prima que hoy pide el mercado (4,20 %), el objetivo sube a 251,97 USD (−4,0 %) y sale Mantener. Por eso la convicción es baja. Subiría si el 3T26 (29-oct, fecha estimada) mostrara AWS por encima del +35 % con un capex de 2027 plano; bajaría si el capex de 2027 pasa de 250.000 M sin aceleración de AWS.

**El negocio.** Amazon tiene un foso amplio en tres negocios que comparten infraestructura. AWS hizo en 2025 el 18 % de las ventas y el 57 % del beneficio operativo, con un 35,4 % de margen [A1]; la publicidad (76.072 M de ventas en doce meses, +26 % sin divisa) es el segundo motor [A11]. El ROIC de 2025 (20,8 %) supera al WACC en 8,7 puntos. **La calidad sostiene el crecimiento que proyectamos solo en parte**: la reinversión financia un 10,4 % anual frente al 11,3 % proyectado, y la proyección supone que el capital nuevo rinde un 28,1 % frente al 20,8 % histórico, algo que la IA aún no ha demostrado.

**Finanzas.** Las ventas crecieron un 19,6 % en el 2T26 y el margen EBITDA de doce meses llega al 18,9 %, pero el flujo libre es negativo (−7.604 M) porque el capex se comió todo el flujo operativo [A11]. La deuda bruta casi se duplicó en seis meses, hasta 132.549 M [A8]; la deuda neta ajustada es de 68.827 M (0,5x EBITDA). El beneficio neto no sirve como medida: el 2T26 llevó 53.415 M de revalorizaciones de Anthropic frente a 27.461 M de beneficio operativo [A8].

**Equipo y gobierno.** Cumple 8 de 13 criterios. Resta que el variable no tenga métricas, los pagos de unos 1.800 M a Blue Origin, del presidente ejecutivo, y 457 M de ventas de directivos sin compras en doce meses [C1, C8]. La dirección cumplió la guía trimestral en diez de diez trimestres [C14-C23].

**Valoración.** El DCF da 187,97 USD. El DCF inverso dice que el precio exige un crecimiento del 15,2 % anual en 2027-2033 frente al 10,8 % de nuestro caso base, o un margen EBITDA del 36,9 % frente al 30,5 %. Visto de otra forma, promete un 9,9 % anual, menos que nuestro WACC (12,1 %) y que lo que pide el mercado (10,4 %). Coincidimos con el consenso hasta 2028 (−2,7 % en ventas); discrepamos en los años siguientes. Los comparables (336,39 USD) y la suma de partes (236,97 USD) pesan poco porque no ven el capex.

**Riesgos y catalizadores.** El mayor riesgo es el exceso de capacidad de IA: en el bajista, AWS repite el frenazo de 2022-2023 y el valor cae a 107,53 USD. Le siguen la concentración en Anthropic y OpenAI, que son a la vez clientes y participadas (20,6 USD por acción en el puente), y el juicio de la FTC del 29-mar-2027 [B25]. En los foros el tono está dividido: el flujo libre negativo es la gran discusión [E3, E4].

**Qué cambiaría la decisión.** Compraríamos por debajo de 203,69 USD y venderíamos por encima de 271,09 USD. Pasaríamos a Comprar si AWS crece por encima del 35 % dos trimestres seguidos con el capex estabilizado, y a Vender si su crecimiento baja del 25 %.`;

export const resumen = {
  recomendacion: 'Mantener',
  conviccion: 'Baja',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis,
  tesis: 'Amazon es tres negocios sobre una misma infraestructura: tiendas con 1.595.000 empleados y entregas en el día, una nube que lidera el mercado con un 28 % de cuota y un 35,4 % de margen operativo, y una publicidad de 76.072 M de ventas que crece al 26 % [A1, A11, B11, D1]. El ROIC de 2025 (20,8 %) supera holgadamente su coste de capital y la dirección ha cumplido su guía trimestral diez veces seguidas [C14-C23].\n\nEl precio (262,43 USD) descuenta mucho: un crecimiento del 15,2 % anual hasta 2033 con nuestro WACC, frente al 10,8 % de nuestro caso base, o una rentabilidad anual del 9,9 % para el accionista. A 13,5x el EBITDA de los próximos doce meses parece barata frente a sus comparables (17,2x) y frente a su historia (mínimo de diez años), pero ese EBITDA no descuenta un capex del 26 % de las ventas que deja el flujo libre en negativo [A11].\n\nEl mercado acierta en el negocio y se adelanta en el rendimiento de la IA. Para invertir hay que creer que los 450.000 M de capex de 2026-2027 rendirán como el capital antiguo y que la cartera de AWS (496.000 M) no depende en exceso de dos laboratorios en los que Amazon también ha invertido [A8]. Nosotros lo vemos posible, no probable: por eso Mantener y no Vender.',
  vision_diferencial: {
    mercado_descuenta: 'Que AWS mantiene un crecimiento cercano al 30 % durante años, que la publicidad sigue al 20 % y que el capex de IA rinde como el de la nube tradicional: un crecimiento del grupo del 15,2 % anual hasta 2033 con nuestro WACC. El consenso de 60 analistas (58 comprar) pone el precio objetivo en 331,36 USD [D5].',
    nuestra_vision: 'Coincidimos con el consenso en 2026-2028, pero no en que ese ritmo dure siete años más con una base de más de un billón de dólares de ventas. Nuestro caso base baja el crecimiento al 7,5 % en 2033 y lleva el margen EBITDA al 30,5 %, con un capex que solo vuelve al 12 % de las ventas cuando la amortización lo alcanza.',
    por_que: 'Porque el exceso de capacidad ya le pasó a la nube en 2022-2023 (AWS pasó del +37 % al +12 %) y porque la cuota de AWS ha caído dos puntos en dos años [B11]. El capex de 2026 (26 % de las ventas) no tiene precedente en Amazon, y el principal cliente de IA es también una participada.',
  },
  a_favor: [
    '**AWS acelera**: +37 % en el 2T26, el mayor crecimiento en 18 trimestres, con una cartera de 496.000 M [A8, A11].',
    '**La publicidad es un segundo motor de alto margen**: 76.072 M de ventas en doce meses, +26 % sin divisa [A11].',
    '**Crea valor**: ROIC del 20,8 % frente a un WACC del 12,1 %.',
    '**Barata por EBITDA**: 13,5x el de los próximos doce meses, frente a 17,2x de los comparables y su mínimo de diez años.',
    '**Participaciones en Anthropic y OpenAI** por 224.895 M (20,6 USD por acción) que el mercado no siempre suma [D1].',
  ],
  en_contra: [
    '**Flujo libre negativo**: −7.604 M en doce meses por un capex de 169.007 M [A11].',
    '**El precio exige un 15,2 % de crecimiento anual** hasta 2033, frente al 10,8 % de nuestro caso base.',
    '**Asimetría desfavorable**: +1,0 % en el alcista frente a −59,0 % en el bajista.',
    '**Deuda en aumento**: la deuda bruta casi se duplicó en seis meses, hasta 132.549 M [A8].',
    '**Concentración en la IA**: Anthropic y OpenAI son a la vez clientes de AWS y participadas [A8].',
    '**Juicio antimonopolio** de la FTC el 29-mar-2027 [B25].',
  ],
  que_vigilar: 'La tesis depende de que el capex de IA rinda. La señal está en dos cifras de cada trimestre: el crecimiento de AWS (37 % en el 2T26) y el capex en caja (unos 220.000 M previstos para 2026). Si AWS se mantiene por encima del 30 % mientras el capex se estabiliza, el precio estaría justificado; si AWS baja del 25 % con el capex aún al alza, se cumple el bajista.',
  cambiaria_recomendacion: [
    'Si AWS crece por encima del 35 % en el 3T26 y el 4T26 y el capex de 2027 no supera al de 2026, pasaríamos a Comprar.',
    'Si AWS crece por debajo del 25 % con un capex creciente, pasaríamos a Vender.',
    'Si el precio baja de 203,69 USD, Comprar; si sube de 271,09 USD, Vender.',
    'Si Anthropic u OpenAI levantan capital a una valoración menor que la registrada, revisaríamos el puente y el riesgo de concentración.',
  ],
  kpis_seguimiento: [
    { kpi: 'Crecimiento de AWS', nivel_actual: '+37 % (2T26)', umbral_alerta: '< 25 %', por_que: 'Es el 57 % del beneficio operativo y la justificación del capex.' },
    { kpi: 'Capex en caja anual', nivel_actual: '≈ 220.000 M previstos en 2026', umbral_alerta: '> 250.000 M en 2027', por_que: 'Decide el flujo libre y el rendimiento del capital nuevo.' },
    { kpi: 'Cartera de AWS', nivel_actual: '496.000 M (jun-26)', umbral_alerta: 'Caída trimestral', por_que: 'Anticipa las ventas de la nube.' },
    { kpi: 'Margen operativo de Norteamérica', nivel_actual: '7,4 % (LTM)', umbral_alerta: '< 6 %', por_que: 'Mide el efecto de aranceles y logística.' },
    { kpi: 'Cuota de AWS en la nube (Synergy)', nivel_actual: '28 % (2T26)', umbral_alerta: '< 26 %', por_que: 'Erosión del foso frente a Azure y Google.' },
  ],
  confianza: 'Media',
};
