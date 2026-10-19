// Textos del analista (escritos después del primer cálculo, con las cifras de calc).
const limitaciones = `Análisis completo desde cero con corte el 19-oct-2026 y precio de cierre del viernes 16-oct-2026 (14,67 USD, Nasdaq). Cuentas: 20-F de 2025 (XBRL de la SEC con cuentas.mjs, 2019-2025) y estados intermedios no auditados del 2T26 (6-K del 13-ago-2026); el LTM es a 30-jun-2026. El 3T26 se publica hacia el 18-nov-2026 (fecha estimada por el calendario de 2025). Criterio de flotante (procesador de pagos, como Adyen): el balance se presenta limpio de los fondos de comerciantes (cuentas a pagar a comerciantes fuera del activo y del pasivo, y el flujo operativo sin la variación neta de esos saldos); la caja del puente es la «corporate cash» que publica la empresa (369,1 M) más los activos financieros propios (79,2 M), no los 600-900 M de caja en balance que pertenecen a comerciantes. dLocal presenta la cuenta por función (coste de ventas = comisiones de procesamiento y costes de red) y dejó de publicar el EBITDA ajustado en 2026; el consenso de EBITDA de MarketScreener es ajustado (excluye la remuneración en acciones, ≈ 2,6 % de las ventas). No hay transcripción completa del 1T26 (solo la nota de prensa y la prensa). Los comparables se tomaron de Yahoo Finance el 19-oct-2026 con sus múltiplos de los próximos 12 meses; Adyen en euros convertido.`;

const controles_explicados = [];

const bolsa = {
  comentario: `dLocal sube un 5,5 % en 2026 (S&P 500 +12,8 %) y pierde un 5,1 % anual en tres años frente al +22,9 % anual del índice [D1]. La historia es la de una salida a bolsa de 2021 en plena euforia (cierre de 2021 a 35,69 USD, 102 veces el beneficio del año siguiente) y una caída del 86,9 % hasta agosto de 2024, con el informe bajista de Muddy Waters (nov-2022), la salida del fundador como consejero delegado y las devaluaciones de Egipto, Nigeria y Argentina [B1, D1]. Desde entonces el beneficio por acción ha pasado de 0,39 USD (2024) a 0,68 USD en los últimos doce meses, pero el múltiplo no ha vuelto: la bolsa paga el volumen (+83 % en el 1S26) y castiga la caída de la comisión, como mostraron el −13 % del 15-may y el −14 % del 13-17 de noviembre de 2025 [A5, D17, D18]. La volatilidad de un año es del 43,9 %.`,
  contexto: {
    movimiento: { fecha: '2026-10-16', var_1m_pct: 2.2, var_3m_pct: -0.3, var_6m_pct: 7.2, var_12m_pct: -7.3, dist_max_52s_pct: -7.0, dist_min_52s_pct: 33.2, dist_max_historico_pct: -76.1, tendencia: 'alcista', volatilidad_60d_pct: 34.0, avisos: [] },
    movimientos_fuertes: [
      { periodo: 'may-jun 2026', var_pct: -19.9, causa: `Resultados del 1T26 (14-may): BPA de 0,14 USD frente a ≈ 0,17 esperado, gastos operativos +58 %, un ajuste fiscal de 9,7 M y un FCF ajustado de solo 14,7 M; la acción cayó un 13 % el 15-may [A7, D17].`, veredicto: 'no cambia', condicion: null },
      { periodo: 'jun-jul 2026', var_pct: 33.8, causa: `Entrada en el Russell 2000 el 26-jun (compras de fondos indexados) y UBS a Comprar con objetivo de 20 USD el 1-jul [D14, D15]; el 2T26 (13-ago) confirmó el volumen (+92 %) aunque el BPA quedó por debajo del consenso [D12].`, veredicto: 'no cambia', condicion: null },
      { periodo: '13 y 17-nov-2025', var_pct: -13.3, causa: `Resultados del 3T25: volumen +59 % pero la comisión bajó más de lo esperado; dos caídas diarias del −6,8 % y −7,0 % [D18].`, veredicto: 'no cambia', condicion: null },
      { periodo: '12-feb, 23-feb y 26-mar-2026', var_pct: -16.9, causa: `Tres caídas diarias de −5,7 %, −7,3 % y −5,1 % sin noticia propia encontrada (ni 6-K ni Form 4 esos días): coinciden con la caída de los valores de pagos y de los emergentes en febrero-marzo; queda como hueco [D1].`, veredicto: 'no cambia', condicion: null },
    ],
    noticias: [
      { fecha: '2026-08-17', tipo: 'accionista de referencia', hecho: `General Atlantic vendió 9,84 M de acciones a 13,60 USD en bloque y conserva 36,8 M (≈ 12,7 % del capital); ya vendió en la colocación de septiembre de 2025 [C2, C9, D16]. Puede volver a vender (overhang), pero el bloque de agosto se absorbió y la acción cotiza un 8 % por encima.`, veredicto: 'no cambia', condicion: null },
      { fecha: '2026-08-13', tipo: 'resultados', hecho: `2T26: ingresos +56 %, volumen +92 %, BPA de 0,18 USD frente a 0,20 de consenso; sube la guía de volumen (+60-70 %) y de margen bruto (+25-30 %) y mantiene la de beneficio operativo (+27,5-32,5 %) [A5, D12].`, veredicto: 'no cambia', condicion: null },
      { fecha: '2026-07-01', tipo: 'recomendación', hecho: `UBS pasa a Comprar con objetivo de 20 USD; el consenso de 10 analistas es de compra (9 de 10) con objetivo medio de 18,8 USD [D3, D14].`, veredicto: 'no cambia', condicion: null },
      { fecha: '2026-06-26', tipo: 'recomendación', hecho: `Entra en el Russell 2000 tras la reconstitución anual [D15].`, veredicto: 'no cambia', condicion: null },
      { fecha: '2026-08-05', tipo: 'directivos', hecho: `Sebastián Kanovich (consejero, ex co-consejero delegado) vendió 1,10 M de acciones (≈ 16,2 M USD) entre el 1-jul y el 5-ago a 14,63-15,54 USD con un plan 10b5-1; el consejero William Pruett compró 20.000 acciones a 11,85 USD el 29-may [C4].`, veredicto: 'no cambia', condicion: null },
      { fecha: '2026-04-20', tipo: 'demanda o regulador', hecho: `La sala de apelación confirma la desestimación de la demanda de accionistas de Nueva York; sigue la federal (Laurenzi), sin provisión [C7].`, veredicto: 'no cambia', condicion: null },
      { fecha: '2026-11-18', tipo: 'resultados', hecho: `Resultados del 3T26 (fecha estimada por el calendario de 2025): primer trimestre en que la dirección prometió el apalancamiento operativo del 2S26 [A5].`, veredicto: 'no cambia', condicion: null },
    ],
    proximos_resultados: '2026-11-18',
    veredicto: 'no cambia',
    condicion: null,
    comentario: `La acción está en tendencia alcista (+33 % desde el mínimo de 52 semanas) y a un 7 % del máximo del año, tras recuperar la caída de los resultados del 1T26 con el Russell 2000 y la subida de UBS. No hay colocación anunciada: General Atlantic conserva 36,8 M de acciones y puede volver a vender, pero el bloque de agosto se absorbió sin daño. Los resultados del 3T26 están a unas cuatro semanas (no a 15 días) y la tendencia no es bajista. Veredicto: no cambia. Se buscó en los 6-K, 13D/13G y Form 4 de la SEC, Seeking Alpha, Investing.com y Stocktwits hasta el 18-oct-2026.`,
  },
};

const multiplos_historicos = {
  comentario: `A 14,67 USD, dLocal cotiza a 14,6 veces el EBITDA de los últimos doce meses y a 21,6 veces el beneficio, en el mínimo de su historia cotizada (medias de 23,0x y 32,5x en 2022-2025, sin 2021, año de la burbuja tras la salida a bolsa). El descuento del 34-37 % tiene causas estructurales: el crecimiento de los ingresos ya no viene con la misma comisión (margen bruto sobre volumen del 1,15 % en 2024 al 0,72 % en el 2T26) y los tipos de interés en dólares son más altos (10 años al 5,09 %) [A5, D5]. En base adelantada (precio de cierre ÷ BPA del año siguiente) la historia es 31,8x (2022), 45,4x (2023), 17,3x (2024) y 17,2x (2025), y hoy paga 14,4 veces nuestro BPA de 2027e.`,
};

const comparables = {
  comentario: `dLocal cotiza a 14,3 veces el beneficio de los próximos doce meses, por encima de la mediana de sus comparables (≈ 12x), con un crecimiento esperado de ingresos del 33,7 % frente al 15-20 % del grupo. La prima es pequeña para ese diferencial: Adyen (20,9x, +30 %) y Wise (24,1x) cobran más por un riesgo país mucho menor, mientras PayPal (10x), Global Payments (5,4x) y Shift4 (6,7x) son negocios maduros o apalancados, y StoneCo y PagSeguro (5-6x) son adquirentes brasileños con riesgo de crédito y de tipos locales [D4]. Su ROIC sobre el capital operativo (83 %) no tiene par en el grupo porque los fondos de comerciantes financian el circulante. El PER mediano da 12,44 USD por acción, un 15 % por debajo del precio: es la lectura más severa y pesa un 20 %. El EV/EBITDA de los próximos 12 meses no es comparable entre proveedores, por lo que la síntesis usa el PER.`,
};

const transacciones = {
  comentario: `Las operaciones del sector se han pagado a 8,5-20 veces el EBITDA: 20x por Nets (Nexi, 2020, en el pico), 12,3x por Issuer Solutions y 8,5x por Worldpay (2025) [D7, D8]. Nuvei, el comparable más cercano por su exposición a Latinoamérica, se excluyó de bolsa en 2024 con una prima del 56 % y sin múltiplo publicado [D9]. La mediana da 12,54 USD por acción. No la ponderamos: la clase B (fundadores y General Atlantic) tiene el 79,55 % del voto y no hay indicio de venta, y las operaciones son de negocios maduros de países desarrollados [C1].`,
};

const rentabilidad = {
  comentario: `dLocal crea valor con mucha holgura: el ROIC sobre el capital operativo fue del 83,4 % en 2025 y del 57-117 % en 2021-2025, frente a un WACC del 14,59 %. La cifra es tan alta porque el negocio casi no necesita capital: el circulante comercial lo financian los propios comerciantes (los fondos en tránsito no son de dLocal y los quitamos del balance) y el inmovilizado es software capitalizado (74 M de intangibles) [A1, A6]. El ROIC incremental de 2021-2025 es del 69,9 %. El ROE (37,2 % en 2025) es más bajo porque la empresa guarda 300-450 M de caja propia como colchón de liquidez para adelantar pagos en monedas con controles de cambio. El «ROIC medio del 30 %» del escáner mide el capital con toda esa caja dentro. La tendencia es el riesgo: el margen neto bajó del 31,9 % (2021) al 18,0 % (2025) por la comisión, y la rotación del capital subió para compensarlo.`,
};

const dcf_justificacion = {
  crecimiento: `2026e se fija en el +46 % (1.597 M): 735,5 M en el 1S26 (+55 %) y un 2S26 que crece un 40 % sobre un 2S25 ya alto, coherente con la guía de volumen (+60-70 %) y de margen bruto (+25-30 %) y con los 1.595 M del consenso [A5, D2]. Para 2027e (+25 %) y 2028e (+18 %) quedamos por debajo del consenso (+30 % y +22 %): el volumen se frena desde ritmos del +80-90 % y la comisión sigue bajando. Después el crecimiento baja del 14 % (2029e) al 4 % (2035e). Es mucho menos que el +45,5 % anual de 2021-2025, pero el mercado de pagos digitales de sus países crece en torno al 15 % anual hasta 2030 (de 2,1 a 4,2 billones de USD) [B2].`,
  margenes: `El margen EBITDA de 2026e (20,0 %) sale de la guía de beneficio operativo (280-291 M) más 35 M de amortizaciones; el LTM está en el 19,6 % y el 1S26 en el 18,0 % [A5, A6]. Lo subimos al 20,5 % en 2027e y al 21 % desde 2028e, por debajo del 22,5 % de 2025 y del 31-36 % de 2021-2022, cuando la comisión era el doble. La palanca es el apalancamiento operativo (plantilla estable, más del 60 % del código escrito con IA) frente a la comisión, que cae entre un 10 % y un 20 % al año [A14]. El consenso ajustado de 2028e (≈ 20,6 % tras quitar la remuneración en acciones) queda cerca [D2].`,
  inversion: `dLocal apenas necesita capital: el capex (sobre todo desarrollo de software capitalizado) fue del 3,4 % de las ventas en 2025 y del 2,8-3,0 % en 2023-2024 [A1]; proyectamos del 3,2 % al 2,6 %, siempre por encima de la amortización (2,2-2,5 %). El circulante comercial propio, una vez quitados los fondos de comerciantes, es pequeño (≈ 1 % de las ventas) [A6]. El tipo impositivo sube del 17 % en 2026e (14 % en 2025) al 19 % en 2027e y al 20 % desde 2028e por el impuesto mínimo global del Pilar 2, que la dirección anunció para 2027 [A14, B1].`,
  wacc: `Tasa libre: bono de EE. UU. a 10 años al 5,09 % (16-oct-2026) [D5]; los flujos están en dólares. Beta de 1,30, entre la de la acción (0,94 mensual a cinco años, 1,54 semanal a dos años) y la mediana de los comparables (≈ 1,4) [D1, D4]. Prima de mercado del 5,5 % y prima adicional del 2,5 % por riesgo país: el 79 % de los ingresos viene de países con prima de Damodaran entre el 2 % (México) y más del 7 % (Argentina, Egipto, Nigeria); la media ponderada por ingresos ronda el 4 % y aplicamos algo más de la mitad porque la beta ya recoge parte [B1]. Deuda casi nula (1,5 % del valor, líneas a corto para adelantar pagos al 6 %). Resultado: WACC del 14,59 %.`,
  terminal: `Crecimiento a perpetuidad del 3,0 %: por debajo de la inflación más el crecimiento real de los pagos digitales en emergentes y de la tasa libre menos medio punto (4,6 %). Con un WACC del 14,59 %, Gordon implica unas 6 veces el EBITDA de salida, muy por debajo de los comparables (8-20x) y de las transacciones (mediana 12,3x): el terminal es prudente y pesa solo el 41 % del valor empresa. Si dLocal llega a 2035 como un líder de pagos con bajo riesgo, el WACC terminal sería menor y el valor mucho mayor; no lo suponemos.`,
};

const puente = [
  `Volumen: guía de +60-70 % (1S26 +83 %, 2T26 +92 %), con los grandes comerciantes de VTC, comercio electrónico y remesas en Brasil, México y Argentina [A5, B8]. Precio: el margen bruto crece un 25-30 % con un volumen del 60-70 %, y los ingresos sobre volumen bajan de ≈ 2,7 % a ≈ 2,3 % por mezcla local-a-local (61 % en el 2T26) y tramos de precio [A5, A14].`,
  `Volumen: +40 % con la base de comerciantes actual (retención neta del 145 % en 2025) y nuevas licencias en África y Asia [A1, B10]. Precio: la dirección dice que la caída de la comisión es «asintótica»; suponemos −15 %, algo menos que en 2026 [A14].`,
  `Volumen: +28 %, todavía por encima del crecimiento del mercado (≈ 15 %), lo que supone seguir ganando cuota [B2]. Precio: −10 % por la renegociación de los grandes comerciantes (dos superan el 10 % de los ingresos) [A1].`,
  `Volumen: +22 %, con la cuota del TAM subiendo del 2,4 % al ≈ 3,5 % del volumen (estimación propia). Precio: −8 %.`,
  `Volumen: +17 % y precio −6 %: el crecimiento converge hacia el del mercado de pagos digitales en emergentes [B2].`,
];

const sost_justificacion = `Sí. El negocio no necesita capital para crecer (reinversión del 3 % del NOPAT; ROIC del 83 % e incremental del 70 %), así que la prueba es la cuota y el precio. La cuota pasa del 2,4 % al 3,1 % del mercado en 2030e medido en ingresos a la comisión de hoy, 1,3 veces la actual y por debajo del límite de 1,5 veces; dLocal ganó cuota en cada uno de los últimos cinco años (volumen +60 % en 2025 frente a un mercado del ≈ 15 %) [A1, B2]. El poder de precios es lo débil: la comisión cae cada año, y por eso el puente de ingresos la resta (−6 a −19 % anual) en vez de suponer que se estabiliza. El crecimiento proyectado (14,5 % anual) queda muy por debajo del histórico (45,5 %).`;

const dcf_lectura = `El DCF da 13,66 USD por acción, un 6,9 % por debajo del precio, con un WACC del 14,59 % y un valor terminal que pesa solo el 41 %. El DCF inverso dice que el precio de 14,67 USD descuenta un crecimiento de los ingresos del 12,4 % anual en 2027e-2035e (frente a nuestro 11,0 %) o, con nuestro crecimiento, un margen EBITDA del 22,5 % (frente a nuestro 21 % y al 22,5 % de 2025): el precio rinde un 13,8 % anual, casi lo que pedimos. No es exigente frente a la historia de dLocal (+45 % anual en 2021-2025), pero sí frente a una comisión que cae un 15-20 % al año. La valoración depende sobre todo de la tasa de descuento: con la prima implícita del mercado (4,20 %) el WACC baja al 12,9 % y el DCF sube a 15,84 USD (+8 %). La variable de negocio que decide es la comisión: si se estabiliza en 2027, el crecimiento de los ingresos se acerca al del volumen y el valor supera los 19 USD (escenario alcista).`;

const esc = [
  `La comisión sigue cayendo un 20 % al año sin freno (entra Adyen o Stripe con adquirencia local en México y Brasil, y uno de los dos grandes comerciantes internaliza el cobro, como pasó en Egipto en 2025), y una nueva devaluación en Argentina, Nigeria o Egipto deja otro año como 2024. El margen EBITDA se queda en el 18 % del 1S26 y el volumen crece la mitad de lo esperado.`,
  `Se cumple la guía de 2026 y el volumen crece un 40 % en 2027 con una comisión que baja más despacio; el apalancamiento operativo lleva el margen EBITDA al 21 %. Los ingresos crecen un 14,5 % anual de media en 2026-2035 y el BPA llega a 1,21 USD en 2028e.`,
  `La comisión se estabiliza en 2027, como sugiere la dirección, y el volumen sigue creciendo por encima del 40 %: los ingresos crecen cerca del consenso y el margen EBITDA vuelve al 23 %, el nivel de 2024-2025, con más productos (cobros en cuenta, pagos a proveedores, stablecoins) y nuevos países en África y Asia.`,
];

const esc_comentario = `La asimetría con nuestro coste de capital es de 0,78 veces: el alcista gana un 33,2 % (19,54 USD) y el bajista pierde un 42,7 % (8,41 USD), y el valor ponderado (13,82 USD) queda por debajo del precio. El bajista no es teórico: en 2024 las devaluaciones de Egipto y Nigeria y la comisión hundieron el EBITDA un 18 % con ingresos creciendo. Con la prima implícita del mercado la asimetría sube a 1,61 veces. Para quien exija un 14,6 %, el perfil no compensa; para quien acepte el 12,9 % que pide hoy el mercado, sí, por poco.`;

const sdp = `No aplica: dLocal tiene un solo negocio (procesamiento de pagos de cobro y de pago para comerciantes globales), con los mismos clientes, la misma plataforma y la misma comisión en todos sus países; la segmentación es geográfica y los márgenes por país no se publican [A1].`;

const val_comentario = `El puente es el balance de 30-jun-2026: deuda financiera de 64,6 M (líneas a corto para adelantar pagos), arrendamientos de 2,7 M y minoritarios de 0,3 M [A6]. La decisión clave es la caja: de los ≈ 900 M de caja e inversiones del balance, la mayor parte son fondos de comerciantes en tránsito, que se deben y no son de los accionistas; solo cuentan los 369,1 M de «corporate cash» que publica la empresa más 79,2 M de activos financieros propios (448,3 M) [A5, A6]. Coincide con caja − cuentas a pagar a comerciantes + cuentas a cobrar (427,9 M frente a 424,5 M publicados a dic-2025). Acciones: 295,9 M diluidas del 2T26, sin las recompras pendientes (≈ 214 M USD hasta marzo de 2027). Pesos: DCF (50 %) y escenarios (30 %), porque el valor depende de la comisión y del riesgo país; PER de comparables (20 %); transacciones, nada.`;

const bpa = [
  `Bajista (−6 puntos de crecimiento y −3 de margen desde 2027e): ingresos de 2.128 M en 2028e (+19 % y +12 %) y margen EBITDA del 18 %, el del 1S26. Resultado operativo de 334 M, 8 M de ingresos financieros netos y un 20 % de impuestos entre 295,9 M de acciones.`,
  `Base: ingresos de 2.355 M (+25 % en 2027e y +18 % en 2028e) y margen EBITDA del 21 %; resultado operativo de 440 M, ingresos financieros netos de 8 M (como en 2025), un 20 % de impuestos (Pilar 2) y 295,9 M de acciones (diluidas del 2T26, sin recompras no ejecutadas). La fórmula cuadra con 2025 (0,65 USD) y da 0,82 en 2026e, igual que el consenso.`,
  `Alcista (+5 puntos de crecimiento y +2 de margen): ingresos de 2.553 M (consenso 2.542 M) y margen EBITDA del 23 %; beneficio neto de 429 M.`,
];

const per_excluidos = `Historia adelantada (cierre de cada año ÷ BPA publicado del año siguiente; para el cierre de 2025, nuestro BPA de 2026e de 0,82 USD): 2022 31,8x (15,57 ÷ 0,49); 2023 45,4x (17,69 ÷ 0,39); 2024 17,3x (11,26 ÷ 0,65); 2025 17,2x (14,14 ÷ 0,82). Excluido 2021 (102x: 35,69 ÷ 0,35, burbuja de la salida a bolsa de junio de 2021). Solo hay cuatro años válidos: mediana, mínimo y media de los cuatro. La historia al cierre (control v2) es 44,5x, 36,1x, 28,9x y 21,8x.`;

const dif_consenso = `Nuestro BPA de 2028e (1,21 USD) queda un 4,7 % por debajo del consenso (1,27) y el de 2027e (1,02) un 6 % por debajo (1,08) [D2]. La diferencia está en las ventas (2.355 M frente a 2.542 M en 2028e): suponemos que la comisión sigue cayendo un 10 % en 2028; el margen EBITDA es parecido una vez quitada la remuneración en acciones del consenso ajustado. Nuestro precio base (19,24 USD) queda un 2,3 % por encima del objetivo medio de los analistas (18,80), con un múltiplo (15,9x) parecido al que implica ese objetivo sobre el BPA de 2028e del consenso (14,8x).`;

const obj_comentario = `El objetivo a 12 meses (20,30 USD, +39,7 % con dividendo; base 19,24, +32,4 %) queda un 51 % por encima del valor intrínseco (13,46 USD). La distancia es grande y se explica por dos cosas: el PER que la regla supone dentro de un año (15,9x, a mitad de camino del actual hacia una mediana de 24,6x hecha con solo cuatro años, dos de ellos de crecimientos del 70-80 %) y un WACC del 14,59 % que penaliza el largo plazo. La rentabilidad es frágil: con el PER de hoy (14,4x) y nuestro BPA, el base rendiría un 20 %; con un BPA un 10 % menor, en torno al +26 %. La regla no recomienda comprar porque el valor intrínseco está por debajo del precio. Cerraría la distancia una comisión estable en el 3T26 y el 4T26 o una prima de riesgo país menor.`;

const catalizadores = {
  items: [
    { fecha: '18-nov-2026 (estimada)', evento: 'Resultados del 3T26', efecto: 'Primer trimestre con el apalancamiento operativo prometido para el 2S26; la guía de beneficio operativo (280-291 M) exige ≈ 163-174 M en el semestre frente a 116,9 M del 1S26 [A5]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Febrero-marzo de 2027', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Primera guía con el Pilar 2 y con el crecimiento del volumen ya frenado; la acción cayó un 14 % con el 3T25 y un 13 % con el 1T26 por la comisión [D17, D18]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Hasta marzo de 2027', evento: 'Recompra de hasta 300 M (≈ 214 M pendientes)', efecto: '≈ 5 % del capital al precio actual; apoyo al BPA [A6]', probabilidad: 'Alta', sentido: '+' },
    { fecha: 'Sin fecha', evento: 'Nuevas ventas de General Atlantic (36,8 M de acciones)', efecto: 'Overhang de ≈ 12,7 % del capital; la venta de agosto fue a 13,60 USD [C2]', probabilidad: 'Media', sentido: '−' },
    { fecha: 'Sin fecha', evento: 'Renegociación o internalización de uno de los dos grandes comerciantes (más del 10 % de los ingresos cada uno)', efecto: 'Caída de la comisión y del crecimiento; ya ocurrió en Egipto en 2025 [A1, B1]', probabilidad: 'Media', sentido: '−' },
  ],
  confianza: 'Media',
};

const riesgos = {
  items: [
    { riesgo: 'Caída de la comisión más rápida que el crecimiento del volumen (mezcla local-a-local, tramos de precio de grandes comerciantes, competencia de Adyen y Stripe con adquirencia local)', tipo: 'Competitivo', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−43 % en el escenario bajista (comisión −20 % anual y margen del 18 %)', mitigante: 'El margen bruto absoluto sigue creciendo (+25-30 % en 2026); la dirección dice que sin un gran comerciante de VTC la comisión habría estado casi plana [A5, A14]', senal: 'Margen bruto creciendo menos del 20 % interanual' },
    { riesgo: 'Concentración: los 10 primeros comerciantes son el 61 % de los ingresos y dos superan el 10 % cada uno', tipo: 'Comercial', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 a −25 % si uno de los dos internaliza el cobro (estimación propia)', mitigante: 'Retención neta del 145 % y 98,8 % del volumen de comerciantes con más de dos años [A1, B1]', senal: 'Peso de los 10 primeros por encima del 65 % o salida de un gran comerciante' },
    { riesgo: 'Divisas y controles de capital: devaluaciones y restricciones de repatriación en Argentina, Nigeria y Egipto (en 2024 hundieron el EBITDA un 18 %)', tipo: 'País', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−10 a −20 % (un año como 2024)', mitigante: 'Diversificación en más de 40 países; Argentina pesa el 14,7 % de los ingresos y Egipto el 5,5 % (2025) [A1, B1]', senal: 'Diferencias de cambio y pérdidas por controles en el resultado financiero' },
    { riesgo: 'Pilar 2 y fiscalidad local (Brasil: reforma tributaria e IOF; Argentina: indagaciones)', tipo: 'Regulatorio', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−4 a −6 % (tipo del 14 % al 20 %, ya en la base)', mitigante: 'Ya incorporado en el caso base [A14]', senal: 'Tipo efectivo de 2027 por encima del 22 %' },
    { riesgo: 'Gobierno: clase B con el 79,55 % del voto; ventas de General Atlantic y de fundadores', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Prima de riesgo +0,5 puntos ≈ −5 %', mitigante: 'Recompras y dividendo del 30 % del FCF ajustado; consejo renovado en dic-2025 [A1, C5]', senal: 'Nueva colocación o 13D/A con ventas' },
    { riesgo: 'Litigios y cumplimiento (blanqueo, sanciones, datos) en 40 países con controles de cambio; demanda federal de accionistas (Laurenzi)', tipo: 'Legal', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−3 a −5 %', mitigante: 'Demanda de Nueva York desestimada en apelación (abr-2026) [C7]', senal: 'Sanción de un banco central o provisión nueva' },
  ],
  premortem: `Octubre de 2029: la acción vale 7 USD. La comisión siguió cayendo un 20 % al año: Adyen y Stripe abrieron adquirencia local en México y Brasil, y el mayor comerciante de VTC repartió su volumen entre tres procesadores. El volumen creció, pero los ingresos solo un 10 % y el margen bruto se estancó. Argentina volvió a devaluar en 2027 y Egipto restringió otra vez la repatriación; el Pilar 2 subió el tipo al 20 %. El margen EBITDA se quedó en el 17-18 %, el BPA de 2028 en 0,85 USD y el mercado lo pagó como a StoneCo y PagSeguro (8-10x). Lo habrían anticipado el margen bruto sobre volumen por debajo del 0,6 %, el peso de los dos grandes comerciantes y la guía de 2027.`,
  ia: {
    exposicion: 'Media',
    sentido: 'Mixto',
    efecto_valor: '+3 a +5 % a 3-5 años (estimación propia: ≈ 1 punto de margen EBITDA por productividad, compensado en parte por el riesgo de los pagos con agentes)',
    comentario: `La IA ayuda en costes: más del 60 % del código ya lo escribe la IA y la dirección espera mantener la plantilla estable mientras el volumen crece un 60-70 % [A14]; también mejora la detección de fraude y la tasa de aprobación. En ingresos es mixta: las empresas de IA son una vertical nueva de comerciantes globales que cobran suscripciones en emergentes (oportunidad), pero los pagos iniciados por agentes y los rieles nuevos (stablecoins, pagos instantáneos tipo Pix) pueden reducir el valor de la capa de procesamiento local y empujar más la comisión. Señal: la plantilla y los gastos operativos sobre el margen bruto en 2027, y el peso de los comerciantes de IA en el volumen.`,
  },
  confianza: 'Media',
};

const preguntas = {
  items: [
    { tema: 'Comisión', pregunta: '¿Cuál fue el margen bruto sobre volumen del 3T26 sin el gran comerciante de VTC local-a-local, y en qué nivel esperan que se estabilice en 2027?', por_que: 'Es la variable que decide el valor: el bajista (−20 % anual) vale 8,41 USD y el alcista (estable desde 2027) 19,54.' },
    { tema: 'Concentración', pregunta: '¿Qué peso tienen hoy los dos comerciantes que superan el 10 % de los ingresos y cuándo vencen sus contratos?', por_que: 'Los 10 primeros son el 61 % de los ingresos; una renegociación mueve el valor un 15-25 %.' },
    { tema: 'Apalancamiento operativo', pregunta: '¿Cómo llegan a 280-291 M de beneficio operativo en 2026 con 116,9 M en el 1S26?', por_que: 'Exige un 2S26 un 40-50 % mejor que el 1S26; el 1T26 y el 2T26 quedaron por debajo del consenso.' },
    { tema: 'Divisas', pregunta: '¿Qué saldo de caja tienen atrapado en Argentina, Nigeria y Egipto y qué coste tuvo la repatriación en 2026?', por_que: 'En 2024 las devaluaciones hundieron el EBITDA un 18 %; la caja propia del puente supone que es libre.' },
    { tema: 'Fiscalidad', pregunta: '¿Cuál será el tipo efectivo de 2027 con el Pilar 2?', por_que: 'Proyectamos el 19-20 %; cada punto vale ≈ 1 % del BPA.' },
    { tema: 'Accionistas', pregunta: '¿Tiene General Atlantic algún compromiso de no venta tras el bloque de agosto?', por_que: 'Le quedan 36,8 M de acciones (≈ 12,7 % del capital).' },
  ],
  confianza: 'Media',
};

const resumen = {
  recomendacion: 'Mantener',
  conviccion: 'Media',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis: `**La recomendación y por qué.** Mantener, con convicción media. El objetivo a 12 meses es de 20,30 USD frente a un precio de 14,67 (cierre del 16-oct-2026): una rentabilidad ponderada del +39,7 % con dividendo y del +32,4 % en el caso base, por encima del 15 % que pide la compra. Pero el valor intrínseco (13,46 USD) queda un 8,2 % por debajo del precio, y la regla exige que lo supere. La razón: el mercado probablemente pagará más por el beneficio de 2028, pero con un coste de capital del 14,59 % (riesgo país incluido) el negocio vale algo menos de lo que cuesta. La convicción es media porque la regla de múltiplos (+39,7 %) y el valor intrínseco (−8,2 %) apuntan en sentidos opuestos y la diferencia es sobre todo de tasa de descuento; la subirían dos trimestres de comisión estable, y la bajaría un 3T26 con el beneficio operativo lejos de la guía.

**El negocio.** dLocal cobra y paga en más de 40 países emergentes para comerciantes globales (comercio electrónico, VTC, software y suscripciones, remesas) y gana una comisión por cada pago, más un diferencial cambiario [A1, B1]. Movió 40.816 M USD en 2025 (+60 %) y 31.749 M en el 1S26 (+83 %) [B1]. Es muy rentable: ROIC del 83,4 % sobre el capital operativo frente a un WACC del 14,59 %, porque los fondos de los comerciantes financian el circulante. La calidad sostiene el crecimiento que proyectamos (sostenibilidad: «Sí»): no necesita capital y la cuota pasa del 2,4 % al 3,1 % de su mercado en 2030e. El problema es el precio: el margen bruto sobre volumen ha caído del 1,15 % (2024) al 0,72 % (2T26) y los ingresos crecen la mitad que el volumen [A5].

**Geografías.** Brasil (18,9 % de los ingresos en 2025), México (16,7 %), Argentina (14,7 %), el resto de Latinoamérica (29,5 %: Chile, Colombia, Perú, Uruguay, Centroamérica), Egipto (5,5 %) y el resto de África y Asia (14,7 %: Nigeria, Kenia, Sudáfrica, Turquía, India, Indonesia, Filipinas…) [A1]. Argentina, Nigeria y Egipto aportan el riesgo de divisas y de repatriación; Brasil y México, la competencia de Adyen y Stripe.

**Equipo y gobierno.** Neutral. Pedro Arnt (ex director financiero de MercadoLibre) dirige desde 2023 y ha cumplido las guías de volumen, pero no las de BPA en 2026 [C1, D12]. La clase B tiene el 79,55 % del voto; General Atlantic y un cofundador venden [C1, C2, C4].

**Valoración.** El DCF da 13,66 USD; los escenarios, 13,82; el PER de los comparables, 12,44. El DCF inverso dice que el precio descuenta un crecimiento del 12,4 % anual (frente a nuestro 11,0 %): rinde un 13,8 % anual, algo menos que nuestro coste de capital. Con la prima implícita del mercado (4,20 %) el valor sube a 15,22 USD (+3,7 %).

**Riesgos y catalizadores.** La comisión (el bajista, −42,7 %), la concentración en dos comerciantes, las devaluaciones y el Pilar 2. Catalizadores: el 3T26 hacia el 18-nov, la guía de 2027 y la recompra de ≈ 214 M pendiente.

**Qué cambiaría la decisión.** Compraríamos por debajo de 13,46 USD, o con dos trimestres de comisión estable y el beneficio operativo del 2S26 en la guía. Venderíamos por encima de 22,76 USD o si uno de los dos grandes comerciantes se va.`,
  tesis: `dLocal es la plataforma que usan los grandes comerciantes globales para cobrar y pagar en mercados emergentes con medios de pago locales (Pix, OXXO, tarjetas locales, monederos móviles) sin tener filiales en cada país. Gana una comisión por pago y un diferencial cambiario; su ventaja son las licencias y conexiones en más de 40 países y la capacidad de mover divisas en mercados con controles. Crece mucho (ingresos +45,5 % anual en 2021-2025) con un ROIC altísimo.

A 14,67 USD cotiza a 14,3 veces el beneficio de los próximos doce meses, en mínimos de su historia y con una prima pequeña sobre sus comparables (≈ 12x) para un crecimiento del 34 %. El precio descuenta un crecimiento del 12,4 % anual hasta 2035 con un coste de capital del 14,6 %.

El mercado tiene razón en desconfiar del precio por operación: la comisión cae un 15-20 % al año y el beneficio por acción del 1S26 (0,33 USD) quedó por debajo del consenso. Para invertir hay que creer que la caída de la comisión se frena en 2027 y que el volumen sigue creciendo por encima del 30 %. Es posible, y la regla de múltiplos le da un +40 % a 12 meses, pero con nuestro coste de capital el precio ya paga el caso base.`,
  vision_diferencial: {
    mercado_descuenta: `Un crecimiento de los ingresos del 12,4 % anual en 2027-2035 con un margen EBITDA del 21 %, o un margen del 22,5 % con nuestro crecimiento. Los analistas van más allá: 9 de 10 recomiendan comprar con un objetivo medio de 18,8 USD y un BPA de 2028e de 1,27 USD [D2, D3].`,
    nuestra_vision: `Coincidimos con el BPA (1,21 USD en 2028e, un 4,7 % menos) y con el objetivo a 12 meses (20,30 USD), pero no con el valor a largo plazo: con un riesgo país del 2,5 % sobre una beta de 1,30, el negocio vale 13,46 USD.`,
    por_que: `La diferencia es de tasa de descuento: el 79 % de los ingresos viene de países con prima de riesgo de entre el 2 % y más del 7 %, y el bajista (2024) ya ocurrió. Con la prima del mercado y sin riesgo país adicional el valor superaría los 17 USD.`,
  },
  a_favor: [
    `**Volumen**: +83 % en el 1S26 y guía de +60-70 % en 2026 [A5].`,
    `**ROIC del 83,4 %** sobre el capital operativo, 68,8 puntos sobre el WACC.`,
    `**Barata frente a su historia**: 14,4 veces el BPA de 2027e frente a una mediana adelantada de 24,6x.`,
    `**Recompra** de ≈ 214 M pendiente hasta marzo de 2027 (≈ 5 % del capital) y dividendo del 30 % del FCF ajustado [A6, A15].`,
    `**Regla de múltiplos**: +39,7 % ponderado a 12 meses.`,
  ],
  en_contra: [
    `**Valor intrínseco por debajo del precio**: 13,46 USD, −8,2 %.`,
    `**La comisión cae**: margen bruto sobre volumen del 0,72 % en el 2T26 frente al 1,15 % de 2024 [A5].`,
    `**Concentración**: los 10 primeros comerciantes son el 61 % de los ingresos [A1].`,
    `**Riesgo país**: Argentina, Egipto y Nigeria pesan más del 20 % de los ingresos [A1].`,
    `**BPA por debajo del consenso** en el 1T26 y el 2T26 [D12, D17].`,
    `**Bajista profundo**: −42,7 % si la comisión no se frena.`,
  ],
  que_vigilar: `La tesis depende de que el margen bruto crezca al menos un 25 % al año aunque la comisión siga bajando, es decir, de que la caída de la comisión se frene. La señal de que no se cumple: un margen bruto sobre volumen por debajo del 0,65 % en el 3T26 o el 4T26, o una guía de beneficio operativo de 2027 por debajo del +20 %. La segunda condición es la de los dos grandes comerciantes: cualquier cambio en su peso.`,
  cambiaria_recomendacion: [
    'Si el precio cae por debajo de 13,46 USD, con la sostenibilidad en «Sí» y el ROIC muy por encima del WACC, pasaríamos a Comprar.',
    'Si el 3T26 y el 4T26 muestran una comisión estable y el beneficio operativo de 2026 llega a la guía (280-291 M), revisaríamos el caso base al alza y el valor superaría el precio.',
    'Si uno de los dos grandes comerciantes internaliza el cobro o la comisión cae más de un 25 % interanual, pasaríamos a Vender.',
    'Si Argentina, Egipto o Nigeria vuelven a devaluar con restricciones de repatriación, revisaríamos el valor a la baja.',
    'Si el precio supera 22,76 USD, venderíamos.',
  ],
  kpis_seguimiento: [
    { kpi: 'Margen bruto sobre volumen (net take rate)', nivel_actual: '0,72 % (2T26)', umbral_alerta: '< 0,65 %', por_que: 'Decide el valor: separa el bajista del base.' },
    { kpi: 'Crecimiento del margen bruto', nivel_actual: '+25-30 % guiado para 2026', umbral_alerta: '< +20 %', por_que: 'Mide si el volumen compensa la comisión.' },
    { kpi: 'Volumen (TPV)', nivel_actual: '+92 % (2T26)', umbral_alerta: '< +35 %', por_que: 'Base del crecimiento.' },
    { kpi: 'Peso de los 10 primeros comerciantes', nivel_actual: '61 %', umbral_alerta: '> 65 %', por_que: 'Riesgo de concentración.' },
    { kpi: 'Caja propia (corporate cash)', nivel_actual: '369,1 M (jun-26)', umbral_alerta: '< 250 M', por_que: 'Colchón para controles de cambio, recompras y dividendo.' },
  ],
  confianza: 'Media',
};

export default {
  limitaciones, controles_explicados,
  secciones: { bolsa, multiplos_historicos, comparables, transacciones, rentabilidad },
  dcf_justificacion, puente, sost_veredicto: 'Sí', sost_justificacion, dcf_lectura,
  esc, esc_comentario, sdp, val_comentario, bpa, per_excluidos, dif_consenso, obj_comentario,
  finales: { catalizadores, riesgos, preguntas, resumen },
};
