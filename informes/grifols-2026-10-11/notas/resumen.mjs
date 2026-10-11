// Resumen ejecutivo (Grifols, corte 2026-10-11). Se escribe el último; cifras del motor tal cual.

const sintesis = `**La recomendación y por qué.** Comprar, con convicción media. El valor objetivo es de 13,99 EUR por acción A, un 41,6 % por encima del precio de 9,88 EUR (cierre del 9-oct-2026), y con el dividendo la rentabilidad total esperada a 12 meses es del 43,9 %. Las dos reglas dan Comprar, con asimetría pobre: alcista +88,8 %, bajista −82,0 % (1,08 veces). La razón en una frase: el precio descuenta que el margen de Grifols se queda donde está, y con 4,9 veces de deuda cada punto de margen vale un 16 % del valor. La convicción es media, la que sugieren los criterios, porque el bajista casi borra las acciones; subiría si el flujo libre de 2026 llega a la guía (500-575 M) y bajaría si el margen ajustado de 2026 se queda por debajo del 25 %.

**El negocio.** Grifols es el tercer productor mundial de hemoderivados (cuota estimada del 18,2 %) [B1], pero no cubre su coste de capital: ROIC del 6,6 % frente a un WACC del 8,2 %, y margen EBITDA del 24,3 % sin ajustes, 4 puntos por debajo del de 2016-2019 [A1]. La calidad de la empresa sostiene en parte el crecimiento que proyectamos (3,8 % anual, por debajo del 6,5 % del mercado): necesita poca inversión nueva, pero un ROIC incremental del 4,4 % no demuestra que el capital ya invertido rinda.

**Finanzas.** Ingresos de 7.524 M en 2025 (+7,0 % a tipo constante) y flujo libre de 505 M tras arrendamientos e intereses, el mejor de la década [A1, A9]. La deuda neta ajustada es de 9.305 M (5,1 veces el EBITDA) y el primer semestre de 2026 solo generó 91 M de caja, con 184 M más de existencias [A7]. El siguiente vencimiento grande son los 2.037 M de 2028 [A7]. En 2024 hubo reexpresión y debilidad material de control interno, ya subsanada [A2].

**Equipo y gobierno.** Resta. La dirección nueva cumplió la guía de 2025 [C1], pero la familia vota en torno al 51 % de los presentes en la junta, hay operaciones vinculadas de calado con Scranton (Haema, BPC, sede, marca) y dos clases de acciones [C1]. Lo recogemos con un punto de prima en el WACC.

**Valoración.** El DCF da 14,21 EUR (+43,8 %). El DCF inverso dice que el precio supone un crecimiento del 0,2 % anual hasta 2033e frente al 3,8 % de nuestro caso base, o un margen final del 23,3 % en vez del 25,5 %: comprar hoy rinde un 9,1 % anual. Cotiza a 9,0 veces el EBITDA de los próximos 12 meses, la mitad de su media histórica. Nuestro caso base está entre un 2,5 % y un 6 % por debajo del consenso en EBITDA y el valor objetivo coincide con el precio objetivo medio de los analistas (14,76 EUR) [D4, D5]. Con la prima de riesgo que hoy pide el mercado, el objetivo sube a 18,65 EUR.

**Riesgos y catalizadores.** El primero es el margen: si la competencia de los anti-FcRn y el exceso de plasma bajan el precio de las inmunoglobulinas, el margen vuelve al 21 % y la acción vale 1,78 EUR. El segundo, la deuda: medio punto más de WACC quita un 19 %. Catalizadores: resultados del 3T26 (4-nov, estimada), la guía de 2027 en febrero y la posible salida a bolsa de Biopharma EE. UU. [C12].

**Qué cambiaría la decisión.** Compraríamos por debajo de 13,54 EUR y venderíamos por encima de 18,89 EUR. Pasaríamos a Mantener si el flujo libre de 2026 queda por debajo de 450 M o el apalancamiento según el contrato no baja de 4,0x a finales de 2026, y a Vender si el margen ajustado cae por debajo del 23 %.`;

export const resumen = {
  recomendacion: 'Comprar',
  conviccion: 'Media',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis,
  tesis: `Grifols es el tercer productor mundial de medicamentos derivados del plasma, con 7.524 M de ingresos en 2025, la mayor red privada de recogida de plasma y posiciones fuertes en inmunoglobulinas (26 % del volumen de EE. UU.) y alfa-1 (más del 69 % del mercado mundial) [A1, B1]. Es un negocio con barreras de entrada altas en un mercado que crece un 6-7 % al año, pero que tras la pandemia perdió 8 puntos de margen y se endeudó para comprar Biotest y centros de plasma [A1, B11].

El precio descuenta que nada mejora. A 9,88 EUR, el DCF inverso dice que el mercado supone un crecimiento del 0,2 % anual hasta 2033e o un margen EBITDA final del 23,3 %, el de hoy. Cotiza a 9,0 veces el EBITDA de los próximos 12 meses, la mitad de su media histórica, con 4,9 veces de deuda neta y un ROIC del 6,6 %, por debajo del coste de capital.

Para invertir hay que creer que la nueva dirección devuelve el margen ajustado al 25-27 % que pide la guía y el consenso, con plasma más barato (Egipto) y eficiencias, y que el flujo libre de 500-575 M de 2026 baja la deuda hacia 3,5x en 2027 [D2, D4]. Si lo hace, el valor de las acciones sube mucho por el apalancamiento: nuestro DCF da 14,21 EUR. Si el margen vuelve al 21 %, como en 2021-2023, las acciones valen casi nada. Es una apuesta asimétrica a la baja en el bajista, compensada por su probabilidad.`,
  vision_diferencial: {
    mercado_descuenta: `Que el margen EBITDA se queda en el 23-24 % de hoy, que la deuda no baja lo bastante deprisa y que el gobierno (familia, Scranton, CNMV) justifica un descuento permanente: 9,0 veces el EBITDA, la mitad de su media histórica.`,
    nuestra_vision: `El margen sube al 25,5 % publicado (unos 27 % ajustado) en 2030, por debajo de lo que espera el consenso, y la deuda baja hacia 4x en 2027-2028 con un flujo libre de 500-600 M al año. No es un caso de crecimiento: crecemos un 3,8 % anual, menos que el mercado.`,
    por_que: `La guía de 2025 se cumplió, el flujo libre de 2025 (468 M según la empresa) superó la guía y los vencimientos de 2027 ya están refinanciados [C16, A7]. Con tanta deuda, poca mejora de margen basta para que el valor de las acciones suba mucho: el precio no descuenta ni esa poca mejora.`,
  },
  a_favor: [
    '**El precio descuenta crecimiento casi nulo**: el DCF inverso pide un 0,2 % anual frente a nuestro 3,8 %.',
    '**Múltiplo en mínimos de la década**: 9,5 veces el EBITDA de los últimos 12 meses, frente a una media de 18,2.',
    '**Flujo libre en mejora**: 505 M en 2025 tras arrendamientos e intereses, frente a −209 M en 2023 [A1].',
    '**Posición de mercado difícil de copiar**: más de 400 centros de plasma y el 26 % del volumen de inmunoglobulinas de EE. UU. [A1, B1].',
    '**Deuda refinanciada hasta 2028** y liquidez de 2.030 M [A7].',
  ],
  en_contra: [
    '**Apalancamiento**: 4,9 veces de deuda neta; el bajista deja la acción en 1,78 EUR (−82,0 %).',
    '**No cubre su coste de capital**: ROIC del 6,6 % frente a un WACC del 8,2 % y ROIC incremental del 4,4 %.',
    '**Caja del semestre débil**: 91 M de flujo libre en el 1S26 frente a una guía anual de 500-575 M [A7].',
    '**Gobierno**: control familiar (≈ 51 % de los votos presentes) y operaciones vinculadas con Scranton [C1, C6].',
    '**Competencia en inmunoglobulinas**: los anti-FcRn crecen deprisa en CIDP (Vyvgart, 4.200 M USD en 2025) [B10].',
  ],
  que_vigilar: `La tesis depende de que el margen EBITDA ajustado de 2026 llegue al 25 % y de que el flujo libre del año entre en la guía de 500-575 M, para que la deuda baje hacia 3,5x en 2027. La señal de que no se cumple sería un 3T26 con el flujo libre acumulado por debajo de 250 M o un margen ajustado del 2S26 por debajo del 25 %.`,
  cambiaria_recomendacion: [
    'Si el flujo libre antes de M&A de 2026 queda por debajo de 450 M, pasaríamos a Mantener.',
    'Si el apalancamiento según el contrato de crédito no baja de 4,0x a finales de 2026, pasaríamos a Mantener.',
    'Si el margen EBITDA ajustado de 2026 cae por debajo del 23 %, pasaríamos a Vender.',
    'Si se recompran Haema y BPC a Scranton sin informe independiente o con deuda nueva, revisaríamos la prima de gobierno.',
    'Si la acción supera 18,89 EUR sin cambios en los supuestos, pasaríamos a Mantener.',
  ],
  kpis_seguimiento: [
    { kpi: 'Flujo libre antes de M&A (definición de la empresa)', nivel_actual: '91 M en el 1S26; 468 M en 2025', umbral_alerta: '< 450 M en 2026', por_que: 'Paga la bajada de deuda.' },
    { kpi: 'Margen EBITDA ajustado', nivel_actual: '23,9 % en el 1S26; 24,3 % en 2025', umbral_alerta: '< 25 % en el 2S26', por_que: 'Es el supuesto que más mueve el valor.' },
    { kpi: 'Apalancamiento según el contrato de crédito', nivel_actual: '4,2x a jun-2026', umbral_alerta: '> 4,0x a dic-2026', por_que: 'Objetivo de 3,5x en 2027 y refinanciación de 2028.' },
    { kpi: 'Inmunoglobulinas a tipo constante', nivel_actual: '+12,8 % en el 1S26', umbral_alerta: '< +6 %', por_que: 'Principal motor del crecimiento y del margen.' },
    { kpi: 'Existencias', nivel_actual: '3.296 M a dic-2025 (+184 M en el 1S26)', umbral_alerta: 'Más de 3.600 M a dic-2026', por_que: 'Se comen la caja.' },
  ],
  confianza: 'Media',
};
