// Textos del analista (escritos después del primer cálculo, con las cifras de calc). Iteración del 18-nov-2026 tras el 3T26.
const limitaciones = `Iteración completa tras los resultados del 3T26 (6-K del 12-nov-2026), con corte el 18-nov-2026 y precio de cierre del martes 17-nov-2026 (12,46 USD, Nasdaq; la sesión del 18-nov no había abierto al cerrar el análisis). Cuentas anuales: 20-F de 2025 (XBRL de la SEC con cuentas.mjs, 2019-2025; sin cambios desde el informe del 19-oct) y estados intermedios no auditados a 30-sep-2026; el LTM es a 30-sep-2026. Criterio de flotante (procesador de pagos, como Adyen): balance limpio de los fondos de comerciantes y flujo operativo sin la variación neta de esos saldos; la caja del puente es la «corporate cash» que publica la empresa (536,9 M) más los activos financieros propios (80,1 M), no los 1.033,9 M de caja en balance. dLocal presenta la cuenta por función y guía el beneficio operativo publicado; el consenso de EBITDA de MarketScreener es ajustado (excluye la remuneración en acciones, ≈ 2,6 % de las ventas). La transcripción completa de la conferencia del 3T26 no se pudo leer (Nasdaq con límite de peticiones y 403; Earnings Whispers con JavaScript): se usaron la carta a los accionistas, la nota de prensa y dos resúmenes de prensa de la conferencia. El consenso tras resultados es el de Yahoo (2026-2027, 17-nov); el de 2028 y el EBITDA, de MarketScreener con datos del 23-oct, anteriores al 3T26. Comparables tomados de Yahoo el 17-18-nov-2026 (Adyen y Wise con la sesión europea del 18-nov en curso), convertidos con los tipos del BCE del 17-nov.`;

const controles_explicados = [];

const bolsa = {
  comentario: `dLocal pierde un 10,4 % en 2026 (S&P 500 +8,2 %; IPAY −7,5 %) y un 11 % anual en tres años frente al +19 % anual del índice [D1]. La historia es la de una salida a bolsa de 2021 en plena euforia y una caída del 81 % hasta agosto de 2024 (informe bajista, cambio de consejero delegado y devaluaciones de Egipto, Nigeria y Argentina) [B1, D1]. Desde el informe del 19-oct la acción ha caído un 15,1 % (de 14,67 a 12,46 USD) en dos tramos sin relación con las cifras del trimestre: −13,9 % entre el 23 y el 30-oct, con la reelección inesperada de Lula y la caída del real (−11 % el 26-oct) [D20, D21], y −13,4 % entre el 9 y el 17-nov, con el aviso de venta de 12,8 M de acciones de General Atlantic del 17-nov (−6,6 % con 10,9 M de acciones negociadas, casi cinco veces lo normal) [D19]. El día de los resultados (13-nov) cerró plana (−0,1 %). La volatilidad de un año es del 44,2 %.`,
  contexto: {
    movimiento: { fecha: '2026-11-17', var_1m_pct: -15.4, var_3m_pct: -12.9, var_6m_pct: 5.2, var_12m_pct: -8.9, dist_max_52s_pct: -21.0, dist_min_52s_pct: 13.2, dist_max_historico_pct: -73.5, tendencia: 'lateral', volatilidad_60d_pct: 38.0, avisos: [] },
    movimientos_fuertes: [
      { periodo: '9 al 17-nov-2026', var_pct: -13.4, causa: `Tras los resultados (13-nov, −0,1 %), −2,6 % el 16-nov y −6,6 % el 17-nov con 10,9 M de acciones, el día en que General Atlantic presentó el Form 144 para vender 12,8 M de acciones de clase A (≈ 165 M USD, J.P. Morgan) [D19]. Es venta de un accionista de referencia, no un hecho del negocio.`, veredicto: 'retrasa', condicion: 'Hasta el 13D/A de General Atlantic que confirme la venta ejecutada y lo que le queda (plazo de dos días hábiles), o hasta cotizar por debajo de 12,18 USD' },
      { periodo: '23 al 30-oct-2026', var_pct: -13.9, causa: `Reelección de Lula en Brasil (51,79 % frente a 48,21 %, resultado no esperado por el mercado): el 26-oct el real perdió un 11 % frente al dólar y el Bovespa llegó a caer un 17 % [D20, D21]; dLocal cayó un 4,1 % ese día y un 5,1 % el 30-oct (sin noticia propia ese día). Brasil es el 21 % de los ingresos de 9M26 y la empresa confirmó vientos de cara cambiarios en el 4T [A18, D23]. Recogido en la proyección (3 puntos menos de crecimiento en 2027e).`, veredicto: 'no cambia', condicion: null },
      { periodo: 'may-jun 2026', var_pct: -19.9, causa: `Resultados del 1T26 (14-may): BPA de 0,14 USD frente a ≈ 0,17 esperado, gastos operativos +58 %, ajuste fiscal de 9,7 M y FCF ajustado de 14,7 M; −13 % el 15-may [A7, D17].`, veredicto: 'no cambia', condicion: null },
      { periodo: 'jun-jul 2026', var_pct: 33.8, causa: `Entrada en el Russell 2000 el 26-jun y UBS a Comprar con objetivo de 20 USD el 1-jul [D14, D15].`, veredicto: 'no cambia', condicion: null },
    ],
    noticias: [
      { fecha: '2026-11-17', tipo: 'accionista de referencia', hecho: `General Atlantic DO B.V. (10 % del capital) presenta el Form 144 para vender 12.813.179 acciones de clase A (≈ 165 M USD; 4,4 % del capital) por medio de J.P. Morgan, con fecha aproximada de venta el 17-nov; tenía 36,8 M tras vender 9,8 M en agosto. Si se ejecuta entera le quedan ≈ 24 M (≈ 8,4 %), que siguen siendo overhang [C2, D16, D19].`, veredicto: 'retrasa', condicion: 'Hasta el 13D/A de General Atlantic que confirme la venta (≈ 19-20-nov) o hasta cotizar por debajo de 12,18 USD' },
      { fecha: '2026-11-12', tipo: 'resultados', hecho: `3T26: volumen +77 %, ingresos 398,0 M (+41 %; ≈ 1-2 % por debajo del consenso), margen bruto récord de 132,0 M (+28 %), beneficio operativo 76,2 M (+37 %), BPA 0,23 USD frente a 0,21 de consenso y FCF ajustado de 99,1 M; guía 2026 mantenida, con el beneficio operativo en el extremo bajo por divisas [A17, D3, D22, D23].`, veredicto: 'no cambia', condicion: null },
      { fecha: '2026-11-12', tipo: 'accionista de referencia', hecho: `13G/A de Alberto Azar: 15,1 M de acciones a 30-sep (8,5 % de la clase A), frente a 18,5 M en marzo [C12].`, veredicto: 'no cambia', condicion: null },
      { fecha: '2026-11-04', tipo: 'resultados', hecho: `Convocatoria de la junta del 2-dic-2026: reelección de dos consejeros independientes y aprobación de las cuentas de 2025; 286,5 M de acciones en circulación a 23-oct [D24].`, veredicto: 'no cambia', condicion: null },
      { fecha: '2026-10-26', tipo: 'demanda o regulador', hecho: `Reelección de Lula en Brasil: el real cae un 11 % frente al dólar y el Bovespa un 17 % en la apertura; el bono soberano en dólares a 10 años sube unos 20 pb, al 6,48 % [D20, D21]. Efecto en dLocal: ingresos de Brasil traducidos a menos dólares y la publicidad electoral se normaliza [D23].`, veredicto: 'no cambia', condicion: null },
      { fecha: '2026-11-17', tipo: 'recomendación', hecho: `Consenso tras resultados: 10 analistas, 9 en compra y 1 en mantener, objetivo medio de 18,50 USD (15-21) frente a 18,80 hace un mes; BPA de 2027 de 1,12 USD (1,14 hace 30 días) [D3].`, veredicto: 'no cambia', condicion: null },
      { fecha: '2026-08-17', tipo: 'accionista de referencia', hecho: `General Atlantic vendió 9,84 M de acciones a 13,60 USD [C2, D16].`, veredicto: 'no cambia', condicion: null },
      { fecha: '2027-03-17', tipo: 'resultados', hecho: `Resultados del 4T26 y guía de 2027 (fecha estimada por el calendario de 2026: 18-mar-2026); primera guía con el Pilar 2 y con el «año de inversión» anunciado [D23].`, veredicto: 'no cambia', condicion: null },
    ],
    proximos_resultados: '2027-03-17',
    veredicto: 'retrasa',
    condicion: 'Hasta que General Atlantic presente el 13D/A con la venta de las 12,8 M de acciones ejecutada (plazo de dos días hábiles), o hasta cotizar por debajo de 12,18 USD',
    comentario: `La caída del 15 % desde el informe anterior tiene dos causas ajenas al trimestre: el real tras la reelección de Lula (finales de octubre) y la venta de General Atlantic (17-nov); los resultados del 3T26 mejoraron el beneficio y la caja y la acción no se movió ese día. El hecho pendiente es la propia venta: el Form 144 avisa de 12,8 M de acciones (≈ 5,5 sesiones de volumen medio) y el 17-nov se negociaron 10,9 M, así que puede quedar parte por colocar. Por eso el veredicto es retrasa hasta el 13D/A que la confirme (o un precio que la descuente: el límite A de 12,18 USD). Después quedan ≈ 24 M de General Atlantic como overhang sin fecha, que no retrasa por sí solo. Se buscó en los 6-K, 13D/13G, Form 144 y Form 4 de la SEC, Seeking Alpha, Nasdaq, FXC Intelligence y Stocktwits hasta el 18-nov-2026.`,
  },
};

const multiplos_historicos = {
  comentario: `A 12,46 USD, dLocal cotiza a 11,0 veces el EBITDA de los últimos doce meses y a 16,8 veces el beneficio, mínimos de su historia cotizada (medias de 23,0x y 32,5x en 2022-2025, sin 2021, año de la burbuja tras la salida a bolsa). El descuento del 48-52 % tiene causas estructurales: el crecimiento ya no viene con la misma comisión (margen bruto sobre volumen del 1,15 % en 2024 al 0,72 % en el 3T26), los tipos en dólares siguen altos (10 años al 5,10 %) y desde octubre se ha sumado el riesgo de Brasil [A17, D5, D21]. En base adelantada (precio de cierre ÷ BPA del año siguiente) la historia es 31,8x (2022), 45,4x (2023), 17,3x (2024) y 17,5x (2025), y hoy paga 13,0 veces nuestro BPA de 2027e: la mediana es 1,9 veces el PER de hoy, y por eso el selector de método la trata como desrateada y decide la regla v2.`,
};

const comparables = {
  comentario: `dLocal cotiza a 11,4 veces el beneficio de los próximos doce meses, casi en la mediana de sus comparables (11,1x), con un crecimiento esperado de ingresos del 31 % frente al 12 % del grupo. La caída de Brasil ha abaratado también a los comparables brasileños: StoneCo (3,8x) y PagSeguro (5,0x) son adquirentes con riesgo de crédito y de tipos locales [D4]. Adyen (19,0x, +33 %) y Wise (24,6x) cobran mucho más por un riesgo país menor; PayPal (9,9x), Global Payments (5,4x) y Shift4 (7,4x) son negocios maduros o apalancados. El ROIC sobre el capital operativo (83 %) no tiene par en el grupo porque los fondos de comerciantes financian el circulante. El PER mediano da 12,04 USD por acción (−3,4 %) y pesa un 20 % en la síntesis; el EV/EBITDA de los próximos 12 meses no es comparable entre proveedores.`,
};

const transacciones = {
  comentario: `Las operaciones del sector se han pagado a 8,5-20 veces el EBITDA: 20x por Nets (Nexi, 2020, en el pico), 12,3x por Issuer Solutions y 8,5x por Worldpay (2025) [D7, D8]. Nuvei, el comparable más cercano por su exposición a Latinoamérica, se excluyó de bolsa en 2024 con una prima del 56 % y sin múltiplo publicado [D9]. La mediana da 13,79 USD por acción. No la ponderamos: la clase B tiene el 75,4 % del voto y los fundadores no muestran intención de vender; las ventas de General Atlantic son en mercado, no un proceso de venta de la compañía [C1, C11, C13].`,
};

const rentabilidad = {
  comentario: `dLocal crea valor con mucha holgura: el ROIC sobre el capital operativo fue del 83,4 % en 2025 y del 57-117 % en 2021-2025, frente a un WACC del 14,33 %. La cifra es tan alta porque el negocio casi no necesita capital: el circulante comercial lo financian los propios comerciantes (los fondos en tránsito no son de dLocal y los quitamos del balance) y el inmovilizado es software capitalizado (96 M de intangibles a septiembre, con 16,4 M de la compra de activos de AZA Finance) [A1, A18]. El ROIC incremental de 2021-2025 es del 69,9 %. El ROE (37,2 % en 2025) es más bajo porque la empresa guarda 400-550 M de caja propia como colchón para adelantar pagos en monedas con controles de cambio. La tendencia es el riesgo: el margen neto bajó del 31,9 % (2021) al 18,0 % (2025) y al 14,5 % en 9M26 por la comisión, y la rotación del capital subió para compensarlo.`,
};

const dcf_justificacion = {
  crecimiento: `2026e se fija en el +42 % (1.553 M): 1.133,6 M en 9M26 (+50 %) y un 4T26 de ≈ 420 M (+24 %), por debajo del consenso (≈ 429 M) porque la empresa avisa de vientos de cara cambiarios en Brasil, México y Argentina que restan unos 6 puntos al crecimiento del margen bruto del 4T [A17, D3, D23]. Para 2027e (+24 %) y 2028e (+18 %) quedamos por debajo del consenso (+32 % y +22 %): el volumen se frena desde ritmos del +77-92 %, la comisión sigue bajando y el real cotiza un 11 % más bajo que antes de la reelección de Lula (Brasil es el 21 % de los ingresos: ≈ 3 puntos menos en 2027e) [A18, D21]. Después el crecimiento baja del 14 % (2029e) al 4 % (2035e), frente a un mercado de pagos digitales en sus países que crece en torno al 15 % anual hasta 2030 [B2].`,
  margenes: `El margen EBITDA de 2026e (20,0 %, 311 M) sale de la guía de beneficio operativo en su extremo bajo (+27,5 %, ≈ 280 M) más ≈ 33 M de amortizaciones; el LTM está en el 19,9 % y el 3T26 en el 21,2 % [A17]. Lo dejamos en el 20,0 % en 2027e, que la dirección describe como un año de inversión en infraestructura, métodos de pago y equipo comercial [A20], y lo subimos al 20,5 % en 2028e y al 21 % después, por debajo del 22,5 % de 2025 y del 31-36 % de 2021-2022, cuando la comisión era el doble. La palanca es el apalancamiento operativo (gastos operativos −11 % trimestral en el 3T26, plantilla −3 %) frente a la comisión [A19].`,
  inversion: `dLocal apenas necesita capital: el capex (desarrollo de software capitalizado) fue del 3,4 % de las ventas en 2025 y del 2,5 % en 9M26 [A1, A17]; proyectamos el 2,6 % en 2026e y del 3,0 % al 2,6 % después, siempre por encima de la amortización (2,1-2,5 %). El circulante comercial propio, quitados los fondos de comerciantes, es pequeño (≈ 1 % de las ventas). El tipo impositivo sube del 17 % en 2026e (15 % en el 3T26 y 18 % en 9M26 con el ajuste de años anteriores) al 19 % en 2027e y al 20 % desde 2028e por el impuesto mínimo global del Pilar 2 [A17, A14].`,
  wacc: `Tasa libre: bono de EE. UU. a 10 años al 5,10 % (17-nov-2026) [D5]; los flujos están en dólares. Beta de 1,30, entre la de la acción (0,90 mensual a cinco años, 1,63 semanal a dos años) y la de los comparables (≈ 1,4) [D1, D4]. Prima de mercado del 5,5 % y prima adicional del 2,5 % por riesgo país (media ponderada por ingresos de las primas de Damodaran ≈ 4 %, algo más de la mitad porque la beta ya recoge parte). No la subimos tras la reelección de Lula: el bono soberano de Brasil en dólares solo subió unos 20 pb, al 6,48 % [D21]. Deuda del 4,3 % del valor (préstamo de 150 M a SOFR + 2 % y líneas en pesos) al 6,3 %. Resultado: WACC del 14,33 %.`,
  terminal: `Crecimiento a perpetuidad del 3,0 %, por debajo de la tasa libre menos medio punto (4,6 %). Con un WACC del 14,33 %, Gordon implica 6,3 veces el EBITDA de salida, muy por debajo de los comparables (mediana de 10,0x el EBITDA de los últimos 12 meses) y de las transacciones (12,3x): el terminal es prudente y pesa el 42 % del valor empresa. Si dLocal llega a 2035 como un líder de pagos con menos riesgo, el WACC terminal sería menor y el valor mayor; no lo suponemos.`,
};

const puente = [
  `Volumen: guía de +60-70 % en su extremo alto (9M26 +81 %, 3T26 +77 %), con VTC, viajes, reparto y publicidad en Brasil, México, Colombia y Sudáfrica [A17, A21]. Precio: los ingresos sobre volumen bajan de ≈ 2,7 % (2025) a ≈ 2,2 % por la mezcla local-a-local (62 % del volumen en el 3T26) y pay-out, los tramos de precio de los grandes comerciantes y las divisas del 4T [A17, A21].`,
  `Volumen: +40 % con la base de comerciantes actual (retención neta del 140 % en el 3T26 y retención de volumen del 173 %) y nuevas licencias en África y Asia [A19]. Precio: −13 %, algo menos que en 2026, porque la comisión sobre volumen se quedó plana en el 0,72 % en el 3T26 [A17]. Otros: −3 % por el real tras la reelección de Lula [D21].`,
  `Volumen: +28 %, todavía por encima del crecimiento del mercado (≈ 15 %), lo que supone seguir ganando cuota [B2]. Precio: −10 % por la renegociación de los grandes comerciantes (dos superan el 10 % de los ingresos) [A18].`,
  `Volumen: +22 %, con la cuota del TAM subiendo del 2,4 % al ≈ 3,5 % del volumen (estimación propia). Precio: −8 %.`,
  `Volumen: +17 % y precio −6 %: el crecimiento converge hacia el del mercado de pagos digitales en emergentes [B2].`,
];

const sost_justificacion = `Sí. El negocio no necesita capital para crecer (reinversión del 3 % del NOPAT; ROIC del 83 % e incremental del 70 %), así que la prueba es la cuota y el precio. La cuota pasa del 2,4 % al 3,0 % del mercado en 2030e medido en ingresos a la comisión de 9M26 (2,26 % del volumen), 1,25 veces la actual y por debajo del límite de 1,5 veces; dLocal ganó cuota en cada uno de los últimos cinco años (volumen +81 % en 9M26 frente a un mercado del ≈ 15 %) [A17, B2]. El poder de precios es lo débil: la comisión cae cada año, y por eso el puente de ingresos la resta (−6 a −28 % anual) en vez de suponer que se estabiliza. El crecimiento proyectado (14 % anual) queda muy por debajo del histórico (45,5 %) y del financiable al ROIC actual.`;

const dcf_lectura = `El DCF da 13,87 USD por acción, un 11,3 % por encima del precio, con un WACC del 14,33 % y un valor terminal que pesa el 42 %. El DCF inverso dice que el precio de 12,46 USD descuenta un crecimiento de los ingresos del 8,8 % anual en 2027e-2035e (frente a nuestro 10,9 %) o, con nuestro crecimiento, un margen EBITDA del 18,9 % (frente a nuestro 21 % y al 21,2 % del 3T26): el precio rinde un 15,7 % anual, más que nuestro coste de capital. Es poco exigente frente a la historia de dLocal (+45 % anual en 2021-2025) y frente a la guía de 2026, y supone que la comisión sigue cayendo sin que el apalancamiento operativo lo compense. Con la prima implícita del mercado (4,41 %) el WACC baja al 12,98 % y el DCF sube a 15,64 USD (+25,5 %). La variable que decide sigue siendo la comisión: plana en el 0,72 % dos trimestres seguidos, pero con ayudas puntuales (Argentina, Nigeria).`;

const esc = [
  `La comisión vuelve a caer un 20 % al año (Adyen o Stripe con adquirencia local en México y Brasil, y uno de los dos grandes comerciantes reparte su volumen, como pasó en Egipto en 2025), el real y el peso argentino siguen depreciándose y 2027 repite un año como 2024. El margen EBITDA se queda en el 17-17,5 % y el volumen crece la mitad de lo esperado.`,
  `Se cumple la guía de 2026 en sus extremos (volumen alto, beneficio operativo bajo) y el volumen crece un 40 % en 2027 con una comisión que baja más despacio y el real estable en el nivel de noviembre; 2027 es de inversión (margen del 20 %) y el apalancamiento lleva el margen al 21 % desde 2029. El BPA llega a 1,15 USD en 2028e.`,
  `La comisión se estabiliza en 2027, como en el 2T y el 3T26, y el volumen sigue por encima del 40 %: los ingresos crecen cerca del consenso y el margen EBITDA sube al 22-22,5 %, el nivel de 2025, con más productos (cobros en cuenta, pagos a proveedores, monedas estables) y Asia en un porcentaje medio-alto de un dígito de los ingresos de 2027.`,
];

const esc_comentario = `La asimetría con nuestro coste de capital es de 1,89 veces: el alcista gana un 59,1 % (19,83 USD) y el bajista pierde un 31,2 % (8,57 USD), y el valor ponderado (14,04 USD) queda por encima del precio. Con la caída del 15 % desde octubre la asimetría ha pasado de menos de 1 a casi 2. El bajista no es teórico: en 2024 las devaluaciones de Egipto y Nigeria y la comisión hundieron el EBITDA un 18 % con ingresos creciendo. Con la prima implícita del mercado la asimetría sube a 3,36 veces.`;

const sdp = `No aplica: dLocal tiene un solo negocio (procesamiento de pagos de cobro y de pago para comerciantes globales), con los mismos clientes, la misma plataforma y la misma comisión en todos sus países; la segmentación es geográfica y los márgenes por país no se publican [A1].`;

const val_comentario = `El puente es el balance de 30-sep-2026: deuda financiera de 163,5 M (150 M del préstamo sindicado y 13,6 M en pesos), arrendamientos de 3,8 M y minoritarios de 0,5 M [A18]. La decisión clave es la caja: de los 1.033,9 M de caja del balance, 497,0 M son fondos de comerciantes en tránsito, que se deben; solo cuentan los 536,9 M de «corporate cash» más 80,1 M de activos financieros propios (617,0 M) [A17, A18]. Acciones: 293,8 M (286,5 M en circulación a 23-oct más 7,4 M potenciales de los planes de acciones), sin los ≈ 180 M USD de recompra pendientes hasta marzo de 2027 [C13, A18]. Pesos: DCF (50 %) y escenarios (30 %), porque el valor depende de la comisión y del riesgo país; PER de comparables (20 %); transacciones, nada.`;

const bpa = [
  `Bajista (−6 puntos de crecimiento y −3 de margen desde 2027e): ingresos de 2.053 M en 2028e (+18 % y +12 %) y margen EBITDA del 17,5 %. Resultado operativo de 312 M, 8 M de ingresos financieros netos y un 20 % de impuestos entre 293,8 M de acciones.`,
  `Base: ingresos de 2.272 M (+24 % en 2027e y +18 % en 2028e) y margen EBITDA del 20,5 %; resultado operativo de 414 M, ingresos financieros netos de 8 M (8,5 M en 9M26), un 20 % de impuestos (Pilar 2) y 293,8 M de acciones, sin recompras no ejecutadas. La fórmula cuadra con 2025 (0,65 USD) y da 0,81 en 2026e (9M26 publicado 0,56; consenso 0,86) y 0,96 en 2027e.`,
  `Alcista (+5 puntos de crecimiento y +2 de margen): ingresos de 2.464 M (consenso 2.532 M) y margen EBITDA del 22,5 %; beneficio neto de 405 M.`,
];

const per_excluidos = `Historia adelantada en BPA publicado (cierre de cada año ÷ BPA publicado del año siguiente; para el cierre de 2025, nuestro BPA de 2026e de 0,81 USD): 2022 31,8x (15,57 ÷ 0,49); 2023 45,4x (17,69 ÷ 0,39); 2024 17,3x (11,26 ÷ 0,65); 2025 17,5x (14,14 ÷ 0,81). Excluido 2021 (102x: 35,69 ÷ 0,35, burbuja de la salida a bolsa de junio de 2021). Solo hay cuatro años válidos: mediana, mínimo y media de los cuatro. La historia al cierre (control v2) es 44,5x, 36,1x, 28,9x y 21,8x.`;

const dif_consenso = `Nuestro BPA de 2028e (1,15 USD) queda un 8,7 % por debajo del consenso (1,26, MarketScreener del 23-oct) y el de 2027e (0,96) un 14 % por debajo (1,12, Yahoo del 17-nov) [D2, D3]. La diferencia está en las ventas (2.272 M frente a 2.532 M en 2028e: suponemos que la comisión sigue cayendo y que el real no recupera) y en el margen de 2027 (20 %, año de inversión). La revisamos supuesto a supuesto y la mantenemos. Nuestro precio base (14,95 USD) queda un 19 % por debajo del objetivo medio de los analistas (18,50), que implica unas 14,7 veces su BPA de 2028e frente a nuestras 13,0 veces sobre el nuestro.`;

const obj_comentario = `El objetivo a 12 meses (15,70 USD, +27,5 % con dividendo; base 14,95, +21,5 %) queda un 16 % por encima del valor intrínseco (13,56 USD). Decide la regla v2 porque la mediana adelantada (24,6x) es 1,9 veces el PER de hoy (13,0x): el selector trata la historia como de otro régimen y deja el múltiplo base en el PER actual, sin recuperación; la v3 sin selector daría +40,9 % (17,36 USD). El margen está cerca del umbral del selector (1,89 frente a 1,8). La rentabilidad sale del crecimiento del BPA (0,96 → 1,15 USD) y no de una revalorización. Es sensible al BPA: con un 10 % menos, la ponderada bajaría al 14,9 % y el base al 9,4 %. Cerraría la distancia una comisión estable en el 4T26 y una guía de 2027 con el beneficio operativo creciendo más de un 20 %.`;

const catalizadores = {
  items: [
    { fecha: '19-20-nov-2026', evento: '13D/A de General Atlantic tras el Form 144 del 17-nov', efecto: 'Confirma cuántas de las 12,8 M de acciones vendió y cuánto le queda (≈ 24 M si vendió todo); fin de la presión vendedora inmediata [D19]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2-dic-2026', evento: 'Junta general (dos consejeros independientes y cuentas de 2025)', efecto: 'Sin efecto esperado en el valor [C13]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Hacia el 17-mar-2027', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Primera guía con el Pilar 2 y el «año de inversión»; la acción cayó un 14 % con el 3T25 y un 13 % con el 1T26 [D17, D18, D23]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Hasta el 19-mar-2027', evento: 'Recompra pendiente (≈ 180 M de los 300 M)', efecto: '≈ 4,9 % del capital al precio actual; apoyo al BPA [A18]', probabilidad: 'Alta', sentido: '+' },
    { fecha: 'Sin fecha', evento: 'Nuevas ventas de General Atlantic (≈ 24 M de acciones tras el Form 144)', efecto: 'Overhang de ≈ 8 % del capital [C11]', probabilidad: 'Media', sentido: '−' },
    { fecha: 'Sin fecha', evento: 'Real brasileño y política fiscal del nuevo mandato de Lula', efecto: 'Brasil es el 21 % de los ingresos; cada 10 % de real resta ≈ 2 % de los ingresos en dólares (estimación propia) [A18, D21]', probabilidad: 'Media', sentido: '+/−' },
  ],
  confianza: 'Media',
};

const riesgos = {
  items: [
    { riesgo: 'Caída de la comisión más rápida que el crecimiento del volumen (mezcla local-a-local y pay-out, tramos de precio de grandes comerciantes, competencia de Adyen y Stripe con adquirencia local)', tipo: 'Competitivo', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−31 % en el escenario bajista (comisión −20 % anual y margen del 17,5 %)', mitigante: 'El margen bruto absoluto crece un 25-30 % en 2026 y la comisión se quedó plana en el 0,72 % en el 3T26 [A17]', senal: 'Margen bruto creciendo menos del 20 % interanual o comisión por debajo del 0,65 %' },
    { riesgo: 'Divisas y riesgo país: real tras la reelección de Lula, peso argentino y mexicano; devaluaciones y controles en Argentina, Nigeria y Egipto (en 2024 hundieron el EBITDA un 18 %)', tipo: 'País', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−10 a −20 % (un año como 2024)', mitigante: 'Más de 40 países; coberturas a plazo en reales y rands; el 4T26 ya lleva el efecto avisado (≈ 6 puntos del crecimiento del margen bruto) [A18, D23]', senal: 'Real por encima de 6 por dólar o nueva restricción de repatriación' },
    { riesgo: 'Concentración: los 10 primeros comerciantes son el 62 % de los ingresos y dos superan el 10 % cada uno', tipo: 'Comercial', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 a −25 % si uno de los dos internaliza el cobro (estimación propia)', mitigante: 'Retención neta del 140 % y de volumen del 173 % [A19]', senal: 'Peso de los 10 primeros por encima del 65 % o salida de un gran comerciante' },
    { riesgo: 'Ventas de General Atlantic (aviso de 12,8 M de acciones el 17-nov y ≈ 24 M restantes) y de inversores históricos (Azar −3,4 M)', tipo: 'Gobierno', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: 'Presión de precio de −5 a −10 % alrededor de cada bloque (−6,6 % el 17-nov)', mitigante: 'Recompra de ≈ 180 M pendiente, que absorbe ≈ 14,4 M de acciones a 12,46 USD [A18]', senal: 'Nuevo Form 144 o colocación registrada' },
    { riesgo: 'Pilar 2 y fiscalidad local (Brasil: reforma tributaria e IOF; Argentina: indagaciones)', tipo: 'Regulatorio', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−4 a −6 % (tipo del 15 % al 20 %, ya en la base)', mitigante: 'Ya incorporado en el caso base [A14]', senal: 'Tipo efectivo de 2027 por encima del 22 %' },
    { riesgo: 'Gobierno: clase B con el 75,4 % del voto', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Prima de riesgo +0,5 puntos ≈ −5 %', mitigante: 'Dividendo del 30 % del FCF ajustado y recompras; consejo con cinco independientes [A1, C5]', senal: 'Operaciones vinculadas nuevas o cambios en el consejo' },
    { riesgo: 'Litigios y cumplimiento (blanqueo, sanciones, datos) en 40 países con controles de cambio; demanda federal de accionistas (Laurenzi)', tipo: 'Legal', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−3 a −5 %', mitigante: 'Demanda de Nueva York desestimada en apelación (abr-2026); sin novedades en Argentina en 2026 [A18, C7]', senal: 'Sanción de un banco central o provisión nueva' },
  ],
  premortem: `Noviembre de 2029: la acción vale 7 USD. La comisión siguió cayendo un 20 % al año: Adyen y Stripe abrieron adquirencia local en México y Brasil, y el mayor comerciante de VTC repartió su volumen entre tres procesadores. El volumen creció, pero los ingresos solo un 10 %. El real siguió débil durante el segundo mandato de Lula, Argentina volvió a devaluar en 2027 y el Pilar 2 subió el tipo al 20 %. 2027, el «año de inversión», se alargó a 2028: el margen EBITDA se quedó en el 17 %, el BPA de 2028 en 0,85 USD y el mercado lo pagó como a StoneCo y PagSeguro (5-8x), mientras General Atlantic terminaba de vender. Lo habrían anticipado el margen bruto sobre volumen por debajo del 0,65 %, la guía de 2027 y el peso de los dos grandes comerciantes.`,
  ia: {
    exposicion: 'Media',
    sentido: 'Mixto',
    efecto_valor: '+3 a +5 % a 3-5 años (estimación propia: ≈ 1 punto de margen EBITDA por productividad, compensado en parte por el riesgo de los pagos con agentes)',
    comentario: `La IA ya ayuda en costes: los gastos operativos cayeron un 11 % en el 3T26 frente al 2T con menos plantilla (−3 %) y menos gasto en terceros gracias a la automatización, y el margen bruto por empleado superó los 100.000 USD por trimestre [A17, A19]. En ingresos es mixta: las empresas de IA son una vertical nueva de comerciantes globales que cobran suscripciones en emergentes (oportunidad), pero los pagos iniciados por agentes y los rieles nuevos (monedas estables, pagos instantáneos tipo Pix) pueden reducir el valor de la capa de procesamiento local y empujar más la comisión. Señal: gastos operativos sobre margen bruto en 2027 y el peso de los comerciantes de IA en el volumen.`,
  },
  confianza: 'Media',
};

const preguntas = {
  items: [
    { tema: 'Divisas', pregunta: '¿Cuánto resta el real tras la reelección de Lula al margen bruto de 2027 si se queda en el nivel de noviembre, y qué parte está cubierta?', por_que: 'Brasil es el 21 % de los ingresos; restamos ≈ 3 puntos al crecimiento de 2027e.' },
    { tema: 'Comisión', pregunta: '¿Cuál habría sido el margen bruto sobre volumen del 3T26 sin el menor coste de anticipos en Argentina y la recuperación puntual de Nigeria?', por_que: 'La comisión plana en el 0,72 % sostiene el caso base; si las ayudas fueron grandes, la caída sigue.' },
    { tema: '2027', pregunta: '¿Qué significa en gastos operativos el «año de inversión» de 2027 y cuánto crecerá el beneficio operativo?', por_que: 'Proyectamos un margen EBITDA del 20 % en 2027e; cada punto vale ≈ 6 % del BPA.' },
    { tema: 'Accionistas', pregunta: '¿Tiene General Atlantic algún compromiso de no venta tras el bloque de noviembre y qué piensa hacer con las ≈ 24 M de acciones restantes?', por_que: 'Es el overhang que pesa en el precio y retrasa la compra.' },
    { tema: 'Concentración', pregunta: '¿Qué peso tienen hoy los dos comerciantes que superan el 10 % de los ingresos y cuándo vencen sus contratos?', por_que: 'Los 10 primeros son el 62 % de los ingresos; una renegociación mueve el valor un 15-25 %.' },
    { tema: 'México', pregunta: '¿Qué parte de la caída del 17 % trimestral del margen bruto de México son costes atrasados que no se repiten?', por_que: 'México es el 18 % de los ingresos de 9M26 y su margen bruto cayó un 2 % interanual con ingresos +64 %.' },
  ],
  confianza: 'Media',
};

const resumen = {
  recomendacion: 'Comprar',
  conviccion: 'Baja',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis: `**La recomendación y por qué.** Comprar según la regla, con convicción baja; la acción robusta es Mantener. A 12,46 USD (cierre del 17-nov-2026, −15,1 % desde el informe del 19-oct) el objetivo a 12 meses es de 15,70 USD: rentabilidad ponderada del +27,5 % con dividendo y del +21,5 % en el base, y el valor intrínseco (13,56 USD) queda un 8,8 % por encima del precio. El objetivo medio de los analistas (18,50) queda por encima de nuestro objetivo, dentro del rango de escenarios (9,57-23,32). La razón: el precio ha caído por el real y por la venta de General Atlantic, no por el trimestre, que mejoró beneficio y caja. La convicción es baja porque la regla absoluta (con nuestro WACC) da Mantener y solo la relativa da Comprar, y porque la compra no aguanta un BPA un 10 % peor (ponderada 14,9 %, base 9,4 %); la subiría una guía de 2027 con el beneficio operativo creciendo más de un 20 %.

**El negocio.** dLocal cobra y paga en más de 40 países emergentes para comerciantes globales. En el 3T26 movió 18.345 M USD (+77 %), con ingresos de 398,0 M (+41 %, planos frente al 2T), margen bruto récord de 132,0 M (+28 %) y beneficio operativo de 76,2 M (+37 %) [A17]. ROIC del 83,4 % frente a un WACC del 14,33 %. La calidad sostiene el crecimiento proyectado (sostenibilidad «Sí»): no necesita capital y la cuota pasa del 2,4 % al 3,0 % en 2030e. El problema sigue siendo el precio por operación: margen bruto sobre volumen del 0,72 % (0,99 % un año antes), plano frente al 2T con ayudas puntuales [A17].

**Brasil y divisas.** La reelección de Lula hundió el real un 11 % el 26-oct [D21]. Brasil es el 21 % de los ingresos de 9M26 y la empresa sitúa el beneficio operativo de 2026 en el extremo bajo de la guía (≈ +27,5 %) por divisas en Brasil, México y Argentina [A18, D23]. Hemos bajado 2027e al +24 % (antes +25 %) con margen del 20 %.

**Equipo y gobierno.** Neutral con sesgo negativo: la guía se cumple en volumen y margen bruto, pero General Atlantic avisó el 17-nov de la venta de 12,8 M de acciones (−6,6 % ese día) y le quedarían ≈ 24 M; la clase B tiene el 75,4 % del voto [C11, C13].

**Valoración.** DCF de 13,87 USD; escenarios, 14,04; PER de comparables, 12,04. El DCF inverso descuenta un crecimiento del 8,8 % anual (nuestro 10,9 %) y rinde un 15,7 % anual, más que nuestro WACC. Decide la regla v2 (la mediana histórica es 1,9 veces el PER de hoy); con la v3 sin selector la ponderada sería del +40,9 %.

**Riesgos y catalizadores.** Comisión (bajista −31,2 %), divisas y riesgo país, concentración y el overhang de General Atlantic. Catalizadores: el 13D/A de General Atlantic (≈ 19-20-nov), la guía de 2027 (hacia el 17-mar-2027) y ≈ 180 M de recompra pendiente. El repaso de precio y noticias **retrasa** la compra hasta ese 13D/A.

**Qué cambiaría la decisión.** Compra robusta (nivel A) por debajo de 12,18 USD; nivel B hasta 12,99 tras el 13D/A. Para quien la tiene, se vende por encima de 14,42 USD (filtro de mantener); la banda Vender de la regla está en 17,65. Pasaríamos a Vender si el margen bruto sobre volumen baja del 0,65 % o la guía de 2027 da un beneficio operativo por debajo del +15 %.`,
  tesis: `dLocal es la plataforma que usan los grandes comerciantes globales para cobrar y pagar en mercados emergentes con medios de pago locales sin tener filiales en cada país. Gana una comisión por pago y un diferencial cambiario; su ventaja son las licencias y conexiones en más de 40 países. Crece mucho (volumen +81 % en 9M26) con un ROIC del 83 % y devuelve caja (dividendo del 30 % del FCF ajustado y 120 M de recompras en 2026).

A 12,46 USD cotiza a 11,4 veces el beneficio de los próximos doce meses, en la mediana de sus comparables (11,1x) para un crecimiento de ingresos del 31 %, y a 11,0 veces el EBITDA, la mitad de su media histórica. El precio descuenta un crecimiento del 8,8 % anual hasta 2035.

El mercado tiene razones para desconfiar: la comisión cae, Brasil se ha complicado y General Atlantic vende. Pero la caída de noviembre es de flujo y de divisa, y el trimestre mejoró beneficio, márgenes y caja. Para invertir hay que creer que la comisión se mantiene cerca del 0,7 % y que 2027 no es un año perdido.`,
  vision_diferencial: {
    mercado_descuenta: `Un crecimiento de los ingresos del 8,8 % anual en 2027-2035 con un margen EBITDA del 21 %, o un margen del 18,9 % con nuestro crecimiento. Los analistas son más optimistas que nosotros: 9 de 10 en compra con un objetivo medio de 18,50 USD y un BPA de 2027 de 1,12 USD [D3].`,
    nuestra_vision: `Nuestro BPA es más bajo que el del consenso (0,96 USD en 2027e y 1,15 en 2028e) y aun así el precio rinde más que nuestro coste de capital: valor intrínseco de 13,56 USD y objetivo a 12 meses de 15,70.`,
    por_que: `El precio ha descontado el real y la venta de General Atlantic, que son hechos de flujo y de divisa; el negocio sigue creciendo por encima del 70 % en volumen y la comisión ha dejado de caer dos trimestres. Si 2027 no es peor que nuestro caso, el precio de hoy deja margen.`,
  },
  a_favor: [
    `**Trimestre sólido**: beneficio operativo +37 %, BPA de 0,23 USD frente a 0,21 de consenso y FCF ajustado de 99,1 M [A17, D3].`,
    `**ROIC del 83,4 %** sobre el capital operativo, 69 puntos sobre el WACC.`,
    `**Barata frente a su historia**: 11,0 veces el EBITDA frente a una media de 23,0x.`,
    `**Recompra** de ≈ 180 M pendiente hasta marzo de 2027 (≈ 4,9 % del capital) [A18].`,
    `**Rentabilidad a 12 meses** del +27,5 % ponderada con la regla más prudente (v2).`,
  ],
  en_contra: [
    `**La compra no es robusta**: con un BPA un 10 % peor, ponderada del 14,9 % y base del 9,4 %.`,
    `**Overhang**: General Atlantic avisó de la venta de 12,8 M de acciones y le quedarían ≈ 24 M [C11].`,
    `**Brasil y divisas**: real −11 % tras la reelección de Lula; beneficio operativo de 2026 en el extremo bajo de la guía [D21, D23].`,
    `**La comisión cae**: 0,72 % frente al 0,99 % de hace un año [A17].`,
    `**Concentración**: los 10 primeros comerciantes son el 62 % de los ingresos [A18].`,
    `**2027, año de inversión** sin guía todavía [A20].`,
  ],
  que_vigilar: `La tesis depende de que el margen bruto crezca al menos un 20-25 % al año aunque la comisión siga bajando y de que 2027 no se coma el apalancamiento operativo ganado en 2026. La señal de que no se cumple: un margen bruto sobre volumen por debajo del 0,65 % en el 4T26, o una guía de beneficio operativo de 2027 por debajo del +15 %. A corto plazo, el 13D/A de General Atlantic y el real.`,
  cambiaria_recomendacion: [
    'Si el 13D/A de General Atlantic confirma la venta y el precio sigue por debajo de 12,99 USD, la compra de nivel B queda libre; por debajo de 12,18 USD, compra robusta (nivel A).',
    'Si la guía de 2027 da un beneficio operativo por debajo del +15 % o el margen bruto sobre volumen baja del 0,65 %, pasaríamos a Vender.',
    'Si uno de los dos grandes comerciantes internaliza el cobro, pasaríamos a Vender.',
    'Para quien la tiene: vender por encima de 14,42 USD (filtro de mantener); la banda Vender de la regla está en 17,65 USD.',
    'Si el real pasa de 6 por dólar o Argentina devalúa con restricciones de repatriación, revisaríamos el valor a la baja.',
  ],
  kpis_seguimiento: [
    { kpi: 'Margen bruto sobre volumen (net take rate)', nivel_actual: '0,72 % (3T26)', umbral_alerta: '< 0,65 %', por_que: 'Decide el valor: separa el bajista del base.' },
    { kpi: 'Crecimiento del margen bruto', nivel_actual: '+28 % (3T26)', umbral_alerta: '< +20 %', por_que: 'Mide si el volumen compensa la comisión.' },
    { kpi: 'Beneficio operativo sobre margen bruto', nivel_actual: '58 % (3T26)', umbral_alerta: '< 50 % en 2027', por_que: 'Mide cuánto se come el «año de inversión».' },
    { kpi: 'Volumen (TPV)', nivel_actual: '+77 % (3T26)', umbral_alerta: '< +35 %', por_que: 'Base del crecimiento.' },
    { kpi: 'Peso de los 10 primeros comerciantes', nivel_actual: '62 % (9M26)', umbral_alerta: '> 65 %', por_que: 'Riesgo de concentración.' },
    { kpi: 'Participación de General Atlantic', nivel_actual: '≈ 24 M de acciones tras el Form 144', umbral_alerta: 'Nuevo Form 144', por_que: 'Overhang sobre el precio.' },
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
