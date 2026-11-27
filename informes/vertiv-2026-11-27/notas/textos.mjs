// Textos del analista (Vertiv, corte 2026-11-27). Cifras del motor tal cual (calc). Citas con letra de nota.
// Fuentes nuevas de esta iteración: A27-A32 (10-Q y nota del 3T26, transcripción, UIG, KES, dividendo),
// C27-C29 (Form 4, 13G/A, 10-Q), D42-D55 (Yahoo, MarketScreener, Tesoro, Damodaran, comparables, prensa).
import { resumen } from './resumen.mjs';

export const textos = {
  meta: {
    limitaciones: `Línea cotizada única (NYSE: VRT), cuentas y cotización en USD. Precio: cierre del 25-nov-2026 (173,37 USD); el 26-nov la bolsa de EE. UU. cerró por Acción de Gracias y la sesión del 27-nov no había abierto a la hora del corte. Comparables europeos convertidos a 1,0964 USD/EUR y 1,1966 USD/CHF (Yahoo, 27-nov) [D47]. Hasta febrero de 2020 la acción era la SPAC GS Acquisition Holdings, por eso la historia de múltiplos empieza en 2020. El EBITDA de las cuentas es GAAP (EBIT reportado más depreciación y amortización de intangibles, con la contraprestación contingente dentro) y ya descuenta el alquiler operativo (US GAAP, ASC 842): los pasivos por arrendamiento operativo no van en el puente. El EBITDA y el BPA del consenso son ajustados (el motor resta un 0,8 % de las ventas al EBITDA del consenso). El puente es el balance del 30-sep-2026 más el pago de UIG del 26-oct (1.450 M) y la mitad del earn-out máximo de UIG (575 M, estimación propia): la compra no tiene aún balance publicado. Desde 2026 Vertiv no publica pedidos ni cartera trimestrales. Las transcripciones son de terceros. EV/EBITDA NTM de los comparables estimado con margen constante (Yahoo no da EBITDA estimado). Sin servicios de pago: faltan las calificaciones ESG y las revisiones del consenso a 12 meses.`,
    controles_explicados: [
      { control: 'Tipo impositivo efectivo razonable (2024)', explicacion: 'El 35,2 % de 2024 se debe a la pérdida de 449,2 M USD por el valor razonable de los warrants, que no es deducible. No se proyecta: el DCF usa un 23 %, el tipo efectivo de 2025.' },
      { control: 'BPA = beneficio neto / acciones (2022)', explicacion: 'El BPA diluido publicado (-0,04 USD) resta del numerador la ganancia de 90,9 M por los warrants, que serían dilutivos; el básico es 0,20 USD.' },
      { control: 'Circulante del primer año de proyección', explicacion: 'El 4,0 % de 2026 es deliberado: a 30-sep-2026 el circulante con anticipos es de ≈ 303 M (existencias 3.288,4 + clientes 4.379,7 − proveedores 3.244,7 − ingresos diferidos 4.120,5), un 2,3 % de las ventas de doce meses [A27]. Se normaliza de forma gradual hasta el 11 % en 2030, lo que consume caja en 2027-2030.' },
      { control: 'Caja proyectada coherente con la histórica', explicacion: 'El salto lo explica el crecimiento: el flujo libre de los doce meses a sep-26 ya es de 3.140 M y la guía de flujo libre ajustado de 2026 es de 2.600-2.800 M, frente a 766-1.887 M en 2023-2025 [A28].' },
      { control: 'Crecimiento del BPA base ≤ 25 % anual', explicacion: 'No es un rebote: el BPA GAAP de 2026e ya es de ≈ 6,29 USD con tres trimestres publicados (4,21 en 9M26) y la guía del 4T26 [A28]. Desde 2026e, nuestro base de 2028e (10,36) crece un 28 % anual, por debajo del consenso (11,95 en MarketScreener) [D43].' },
      { control: 'Regresión múltiplo-crecimiento', explicacion: 'La pendiente sale negativa (R² = 0,56) porque nVent, la que más crece, es la que más ha caído: refleja la venta del sector de centros de datos, no una relación económica; el informe no usa el valor de la regresión.' },
    ],
  },

  dcf: {
    justificacion: {
      crecimiento: `2026 queda fijo en la guía subida el 28-oct: 14.650 M USD (+43,2 %; 38 % orgánico) con tres trimestres publicados [A28]. Para 2027 proyectamos un 30 % (19.044 M), un 2,8 % por debajo del consenso (19.590 M) [D42], aunque ya incluye UIG y KES [A30, A31]: los pedidos orgánicos del 3T26 crecieron «más de un 100 %» y la dirección espera para 2027 un crecimiento orgánico «significativamente por encima del mercado» [A29]. 2028 al 18 % (22.472 M, un 6 % bajo el consenso de 23.911 M) [D43]. Después, una desaceleración gradual: 12 % en 2029, 9 % en 2030 y del 7 % al 4 % hasta 2035. Las ventas de 2030 (≈ 27.400 M) equivalen al 22,9 % del mercado de infraestructura física que Dell'Oro prevé para ese año (120.000 M) [B13], frente a una cuota del 20 % hoy.`,
      margenes: `Margen EBITDA en base GAAP: 20,9 % en 2025 y 25,3 % en el 3T26 [A28]. Para 2026, 24,2 %: la guía de margen operativo ajustado (23,5-24,5 %) más la depreciación y menos la contraprestación contingente (96,1 M en nueve meses) [A28]. 2027 y 2028 al 26,0 % y al 26,6 %, por debajo del consenso ajustado (26,5 % y 27,4 %) menos su diferencia de base [D43]. A largo plazo, 26 %: entre el margen de Electrical Americas de Eaton (29,9 %) y el de Energy Management de Schneider (21,8 %) [B27, B26]. No suponemos más mejora porque Eaton (Boyd Thermal), Schneider (Motivair) y Modine entran en refrigeración, su terreno más rentable [D41, D36, B31].`,
      inversion: `Capex del 4,0 % de las ventas en 2026 (guía; 4,2 % en 9M26) y 2027, bajando al 3,4 % en 2032-2035, frente al 2,2 % de 2025: la ampliación de capacidad no se repite a ese ritmo [A28, A29]. Amortizaciones del 3,1 % en 2026 (331,4 M en nueve meses, dos tercios de intangibles) [A28], con suelo del 2,8 % y subida al 3,3 %; en 2035 el capex (3,4 %) supera la amortización. Circulante comercial (con anticipos) del 4,0 % de las ventas en 2026: a septiembre es del 2,3 % porque los ingresos diferidos llegan a 4.120,5 M [A27]. Lo normalizamos al 11 % en 2030, entre el 9,7 % de 2025 y el 15,3 % de 2024. Tipo impositivo del 23 % (23,5 % efectivo en 2025; 19,5 % en 9M26).`,
      wacc: `Todo en USD. Tasa libre: Tesoro a 10 años, 4,85 % el 25-nov-2026 [D45] (5,31 % el 5-oct en el informe anterior [D11]). Prima de mercado: la implícita de Damodaran a 1-nov-2026, 4,41 % [D46]. Beta de 1,50, entre la del sector de equipos eléctricos de EE. UU. (1,25) [P2] y la propia de cinco años (2,18 frente al SPY; 1,79 ajustada) [D44]; la propia recoge un ciclo concentrado en pocos clientes y caídas del 70 % en 2021-2022 y del 61 % desde mayo de 2026. Coste de la deuda antes de impuestos del 5,3 %, la media de los cupones de los bonos (4,125-5,95 %) [A27]. Peso de la deuda del 4,5 % (2.955 M frente a 68.100 M de capitalización). Coste de los fondos propios del 11,47 % y WACC del 11,13 %, sin prima adicional.`,
      terminal: `Crecimiento perpetuo del 3,0 % en USD, por debajo de la tasa libre nominal (4,85 %) y coherente con una inflación de largo plazo del 2-2,5 % y un crecimiento real moderado. Múltiplo de salida de 12x el EBITDA, la mediana de las transacciones del sector (12,0x) y por debajo de la de los comparables hoy (14,7x NTM, con un crecimiento del 15,6 %): en 2035 Vertiv crecerá al 4 %. Usamos la media de los dos métodos porque divergen: Gordon implica 8,3x y el múltiplo implica un crecimiento perpetuo del 5,4 %. El valor terminal pesa el 59 % del valor empresa.`,
    },
    lectura: `El DCF da 150,03 USD por acción, un 13,5 % por debajo del precio de 173,37, con un 59 % del valor en el terminal. Hace siete semanas la distancia era del 43,8 %: ha bajado el precio un 31,5 % y ha subido nuestro valor (142,31 → 150,03) porque 2026 sale 650 M más alto y el Tesoro baja del 5,31 % al 4,85 %. **El DCF inverso** dice que, para valer 173,37 USD con nuestro WACC del 11,13 %, Vertiv tendría que crecer un 12,9 % anual de 2027 a 2035, frente al 10,6 % de nuestro caso base; o tener un margen EBITDA del 29,4 % (26 % en el base), el de Electrical Americas de Eaton [B27]; o que el inversor acepte un 9,7 % anual. Ya no es un precio que exija una década sin pausa: pide 2,3 puntos más de crecimiento al año que nosotros, o 3,4 de margen. Con un WACC del 10,1 % y un crecimiento perpetuo del 4 % el DCF da 174,17, el precio. La diferencia con el mercado es de grado, no de tesis.`,
    sostenibilidad: {
      puente_ingresos: [
        { periodo: '2026e', volumen_pct: 35.0, precio_pct: 2.5, otros_pct: 5.7, comentario: 'Guía del 28-oct: 38 % orgánico en el punto medio (volumen y precio; Vertiv no los separa, reparto estimación propia) y ≈ 6 puntos de compras (PurgeRite, Great Lakes y menores) y divisa [A28].' },
        { periodo: '2027e', volumen_pct: 22.0, precio_pct: 3.0, otros_pct: 5.0, comentario: 'Pedidos orgánicos del 3T26 +100 % y guía cualitativa de crecimiento orgánico «significativamente por encima del mercado» [A29]; otros = UIG y KES, cerradas en octubre [A30, A31].' },
        { periodo: '2028e', volumen_pct: 15.5, precio_pct: 2.5, otros_pct: 0.0, comentario: 'Mercado de infraestructura física de centros de datos al 22 % anual hasta 2030 según Dell\'Oro [B13]; proyectamos menos que el mercado.' },
        { periodo: '2029e', volumen_pct: 9.5, precio_pct: 2.5, otros_pct: 0.0, comentario: 'Desaceleración hacia el crecimiento del mercado maduro; precio en línea con la inflación de costes.' },
      ],
      mercado_final: { periodo: '2030e', tamano: 120000 },
      veredicto: 'Sí',
      justificacion: 'La calidad sostiene el crecimiento proyectado. El ROIC de 2025 es del 28,9 % y el incremental del 48,4 %, y la proyección apenas pide inversión neta (reinversión del 9 % del NOPAT) porque los anticipos financian el circulante: el motor la trata como de activos ligeros y la prueba es la cuota y el precio. La cuota implícita en 2030e es del 22,9 % del mercado de Dell\'Oro (120.000 M) [B13], frente al 20 % de hoy, lejos del umbral de 1,5 veces; el precio solo aporta 2,5-3 puntos al año, por debajo de lo que la empresa ya logra con un precio-coste positivo pese a los aranceles [A29]. El capex bruto (3,4-4,0 % de las ventas) supera la amortización en todos los años.',
    },
    confianza: 'Media',
  },

  narrativas: {
    Bajista: `Los hiperescaladores digieren en 2028 tres años de inversión récord, como ya hicieron en 2023 (−7 %) [B22, B23, B24, B25]: las ventas de Vertiv caen un 18,5 % en 2028 y apenas crecen en 2029, con el margen 5 puntos por debajo ese año, como en 2009 (ventas de Emerson Network Power −15 %, resultado −29 %) [B34] o 2022 (margen bruto del 33,7 % al 28,4 %) [A2]. Después, Eaton, Schneider y Modine en refrigeración restan 1,5 puntos de crecimiento y de margen para siempre.`,
    Base: `La guía de 2026 se cumple (14.650 M) y 2027-2028 quedan algo por debajo del consenso (22.472 M en 2028, margen EBITDA del 26,6 %); el crecimiento se modera hasta el 4 % en 2035 con un margen estable del 26 % y una cuota del 22,9 % de un mercado que crece al 22 % hasta 2030 [B13].`,
    Alcista: `La IA sostiene el gasto más allá de 2030 y Vertiv gana cuota con la refrigeración líquida, los servicios de fluidos (PurgeRite, KES), la energía detrás del contador de UIG y la arquitectura de 800 V CC de NVIDIA [B10, A30, A31]: crecimiento 5 puntos mayor cada año (35 % en 2027, 23 % en 2028), margen 2 puntos mayor (28 %) y un mercado que paga 18x el EBITDA de salida.`,
  },
  escenarios: {
    comentario: `La asimetría ya no es tan desfavorable como en octubre (0,09x): el alcista gana un 65,9 % (287,60 USD) y el bajista pierde un 54,3 % (79,28 USD), 1,21x. El valor ponderado de los escenarios es de 166,74 USD, un 3,8 % bajo el precio. El bajista no es cosmético: una pausa de un año en el gasto de los hiperescaladores ya ocurrió en 2023, y la caída de ventas de 2028 se calibra con Emerson Network Power en 2009 [B34]; se limita a 2028-2029 con el perfil, y si fuese permanente valdría mucho menos. Lo que ha cambiado es el precio: a 173,37 USD el mercado paga un valor entre el base y el ponderado, no el alcista.`,
    confianza: 'Media',
  },

  suma_partes: {
    aplica: false, descuento_holding_pct: 0, partes: [],
    comentario: `No aplica. Vertiv publica sus segmentos por región (Américas, Asia Pacífico y EMEA) y no por línea de producto: no hay ventas ni margen separados de energía, refrigeración y servicios con los que aplicar múltiplos distintos [A1]. Las tres regiones venden lo mismo a los mismos clientes, con márgenes que reflejan la mezcla de centros de datos (en el 3T26, 29,4 % en Américas, 17,0 % en Asia Pacífico y 28,0 % en EMEA) [A28].`,
    confianza: 'Alta',
  },

  puente: { fecha: '2026-09-30', deuda_financiera: 2955.2, arrendamientos: 0, caja: 3711.7, minoritarios: 0, pensiones: 60.4, asociadas: 0, otros_ajustes: 2264.6 },

  valoracion: {
    comentario: `**Puente** (10-Q del 3T26) [D48]: deuda nominal de 2.955,2 M (850 de bonos garantizados al 4,125 % de 2028, 2.100 de bonos de 2036-2066 y 5,2 de pagarés), caja e inversiones a corto de 3.711,7 M y pensiones netas de impuestos de 60,4 M (estimación propia sobre los 76,5 M de 2025) [D4]. En otros ajustes, 2.264,6 M: el pago de UIG del 26-oct (1.450 M) [D50], el earn-out de PurgeRite en balance (239,6 M) [D48] y la mitad del earn-out máximo de UIG (575 M de 1.150 M, estimación propia: se paga solo si UIG gana más, y ese EBITDA está en la proyección solo en parte). Con todo, la caja neta de 756 M pasa a una deuda neta ajustada de 1.569 M. Los arrendamientos operativos se quedan fuera porque el EBITDA de US GAAP ya descuenta su gasto.

**Pesos.** DCF 45 %, comparables 30 % y escenarios 25 %. Las transacciones (92,56 USD) no pesan: son compras pequeñas de empresas privadas a 10-13x, y nadie va a comprar una compañía de 68.100 M. Los comparables (170,93 USD, −1,4 %) pesan menos que el DCF porque el grupo entero ha caído por la misma duda sobre el ciclo: miden el precio relativo, no el absoluto. La dispersión es grande (de 92,56 a 287,60 USD); el precio queda entre el DCF (150,03) y los comparables, y el objetivo medio de los analistas (326,89 USD) [D42] está por encima incluso del alcista.`,
    confianza: 'Media',
  },

  secciones: {
    identificacion: { fundacion: '1965 (Liebert); Vertiv desde 2016', empleados: 34000 },
    rentabilidad: {
      comentario: `Vertiv crea valor desde 2023. El ROIC pasó del 3,1 % de 2022 al 16,9 % en 2023, al 20,3 % en 2024 y al 28,9 % en 2025, frente a un WACC del 11,13 %: 17,8 puntos de diferencia. En 2020-2022 (7,0 %, 5,9 % y 3,1 %) lo destruía. Lo mueve el margen, no la rotación: el NOPAT pasó de 134 a 1.400 M USD con un capital invertido que solo creció de 4.327 a 5.341 M. El ROIC incremental es del 48,4 %, pero está inflado por los anticipos de clientes (el circulante cayó del 20,1 % de las ventas en 2023 al 9,7 % en 2025 y al 2,3 % en sep-26) [A1, A27]. Sin ellos el ROIC seguiría por encima del 20 %. UIG (1.450 M más earn-out) sumará capital en 2026 sin EBITDA comparable todavía: el ROIC de 2026 bajará por perímetro. Frente a los comparables, el 28,9 % supera al de ABB (25,1 %) y Trane (26,6 %) y duplica el de Schneider (14,0 %) y Eaton (10,6 %) [D25, D26, D27, D29].`,
      confianza: 'Alta',
    },
    capital: {
      comentario: `De 2020 a 2025 Vertiv generó 3.807 M USD de flujo libre y destinó 2.400 M a compras, 600 M a recompras y 129 M a dividendos. La recompra fue buena: 9,08 M de acciones a Platinum Equity por 599,9 M en el 1T24, unos 66 USD por acción frente a los 173,37 de hoy [A1, A20]. Las compras dan resultados mixtos: E&I (11x) no alcanzó el EBITDA del earn-out, aunque sin deterioros [A2]; PurgeRite va mejor de lo previsto (su earn-out en balance sube a 239,6 M de un máximo de 250) [A27]. Lo que cambia es el ritmo: en doce meses ha cerrado seis compras, la mayor UIG (1.450 M en caja, ~13x el EBITDA de 2027, más hasta 1.150 M contingentes) [A30], y en 2026 no ha recomprado acciones pese a tener 2.400 M autorizados [A27]. El 13-nov subió el dividendo un 60 %, a 0,40 USD anuales (0,2 % de rentabilidad) [A32]. La dilución es baja: 386,2 M de acciones diluidas en 2023 frente a 392,8 M hoy. Veredicto: buen asignador hasta ahora, con riesgo de compras en serie en la parte alta del ciclo.`,
    },
    comparables: {
      comentario: `Todo el grupo ha caído desde octubre y Vertiv más: Eaton pasa de 32,3x a 19,6x el PER NTM y nVent de 33,1x a 15,1x [D18, D20, D47]. Vertiv es la que más crece (38,3 % de ventas NTM frente a una mediana del 15,6 %) y la más rentable (ROIC del 28,9 % frente al 13,8 %), y hoy cotiza en línea con la mediana: 14,2x el EBITDA NTM frente a 14,7x y 19,6x el PER NTM frente a 18,5x. Las medianas dan 178,58 USD (EV/EBITDA NTM) y 163,28 USD (PER NTM), 170,93 de media, un 1,4 % bajo el precio. La regresión múltiplo-crecimiento sale con pendiente negativa (R² = 0,56) porque los que más crecen, nVent y Vertiv, son los que más han caído: el mercado castiga ahora la exposición a centros de datos, y no se usa. Ojo: el EV/EBITDA NTM de los comparables está estimado con margen constante [D47], y su BPA es ajustado, el de Vertiv en el PER NTM también (consenso).`,
    },
    multiplos_historicos: {
      comentario: `A 22,0x el EBITDA de los últimos 12 meses, Vertiv cotiza en la media de sus cierres de 2020-2025 (21,2x) y lejos del máximo de 30,3x de 2025. El PER LTM (32,4x) está un 47 % por debajo de la media (61,6x), distorsionada por los beneficios deprimidos de 2021-2023. Con el PER adelantado, la medida de la regla a 12 meses, la acción cotiza a ≈ 20x nuestro BPA de 2027e frente a una mediana de 33,3x en 2023-2025 [D44]. La empresa de 2020-2022 (margen EBIT del 4-5 %, ROIC del 3-7 %) no es la de hoy (22,8 % y 28,9 %), así que la media larga no es una referencia de vuelta; lo que dice la serie es que el mercado ya no paga una prima por el crecimiento.`,
    },
    bolsa: {
      contexto: {
        movimiento: { fecha: '2026-11-25', var_1m_pct: -16.9, var_3m_pct: -35.6, var_6m_pct: -44.8, var_12m_pct: 2.6, dist_max_52s_pct: -53.9, dist_min_52s_pct: 15.7, dist_max_historico_pct: -53.9, tendencia: 'bajista', volatilidad_60d_pct: 86.0, avisos: ['P3 Caída fuerte: −36 % en tres meses', 'P5 Un 36 % por debajo de la media de 200 sesiones (tendencia bajista)'] },
        movimientos_fuertes: [
          { periodo: 'jul-2026', var_pct: -32.1, causa: 'El 29-jul (−16,6 %, de 290 a 223 USD) las ventas del 2T26 quedaron 76 M bajo el punto medio de su guía por la cadena de suministro y los proyectos por fases [D55]; es el mes de mayor caída de los últimos seis.', veredicto: 'no cambia', condicion: null },
          { periodo: 'oct-2026', var_pct: -23.2, causa: 'Del 7 al 23-oct (253 → 194 USD) caen las de infraestructura de IA por inflación y deuda [D51], sin noticia propia; el 28-oct sube un 16,5 % con el 3T26 (ventas 460 M sobre su guía y guía de 2026 subida) [A28].', veredicto: 'no cambia', condicion: null },
          { periodo: 'nov-2026', var_pct: -29.5, causa: 'Del 29-oct (245,92) al 25-nov (173,37): el 4 y 5-nov −12,9 % y −14,0 % con el Nasdaq −5,5 % tras las elecciones de mitad de mandato, sin noticia de la empresa y con nVent −12,8 % [D52]; el 16-nov por NVIDIA [D53]; el 20-nov −10,1 % en otra jornada de ventas del sector [D54]. La causa es la duda del mercado sobre el ciclo de inversión en IA de 2028, que es el escenario bajista del informe.', veredicto: 'no cambia', condicion: null },
        ],
        noticias: [
          { fecha: '2026-10-28', tipo: 'resultados', hecho: 'Resultados del 3T26: ventas 4.312,8 M (+61,2 %), BPA ajustado 2,21 (0,39 sobre el consenso) y guía de 2026 subida a 14.650 M y 7,15 USD [A28, D51].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-10-27', tipo: 'fusión u oferta', hecho: 'Cierre de la compra de UIG por ≈ 1.450 M en caja más hasta 1.150 M de earn-out (~13x EBITDA de 2027) y de KES (no material) [A30, A31]. Recogidas en el puente.', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-10-29', tipo: 'recomendación', hecho: 'Tras los resultados suben su objetivo Bernstein (376), RBC (351), Citi (362), TD Cowen (357) y Wells Fargo (345); GLJ mantiene vender con 187 (2-nov) [D42].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-10-27', tipo: 'accionista de referencia', hecho: 'BlackRock baja al 6,8 % (26,19 M acciones) en su 13G/A [C28]; gestora pasiva, sin colocación.', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-10-28', tipo: 'directivos', hecho: 'Sin ventas ni compras en mercado en los Form 4 desde el 1-oct [C27]; en el 3T26 adoptaron planes 10b5-1 de venta el presidente de EMEA (hasta 36.662 acciones) y Sanjay Sanghi (hasta 250.508) [C29], menos del 0,1 % del capital.', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-11-13', tipo: 'resultados', hecho: 'Dividendo anual subido un 60 %, a 0,40 USD [A32].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-10-28', tipo: 'demanda o regulador', hecho: 'La demanda colectiva de valores del SDNY (2022) sigue con la moción de desestimación pendiente; las derivadas, suspendidas [A27]. Sin fecha.', veredicto: 'no cambia', condicion: null },
        ],
        proximos_resultados: '2027-02-10',
        veredicto: 'no cambia',
        condicion: null,
        comentario: 'La caída del 31,5 % desde el informe anterior no viene de la empresa: el 3T26 batió su guía en 460 M de ventas, subió la previsión de 2026 y dio pedidos orgánicos +100 %. Cae con todo el sector de infraestructura de IA (nVent −12,8 % y Eaton −7,4 % el 5-nov) por la duda sobre el gasto de 2028, que el informe ya modela en el bajista. No hay colocaciones, ampliaciones ni ventas de directivos pendientes; los próximos resultados, hacia el 10-feb-2027 (estimada por Yahoo), no retrasan nada según la regla 11. Veredicto: no cambia.',
      },
    },
    catalizadores: {
      items: [
        { fecha: 'Feb-2027 (≈ 10-feb, estimada)', evento: 'Resultados de 2026, guía de 2027 y cartera anual en el 10-K', efecto: 'Primera cifra de cartera desde dic-25 (15.000 M) y primera guía numérica de 2027: con pedidos del 3T +100 %, una cartera por encima de 22.000 M confirmaría el base', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: 'Ene-feb 2027', evento: 'Resultados y guía de inversión de Microsoft, Alphabet, Amazon y Meta', efecto: 'Su capex es el indicador adelantado de la demanda de Vertiv; una guía de 2027 plana adelantaría el bajista, una al alza alejaría la duda de 2028', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: '2027', evento: 'Integración de UIG y primeros hitos de su earn-out (12 meses tras el cierre)', efecto: 'Hasta 1.150 M en caja si UIG llega a sus objetivos de EBITDA: más ventas y más pago', probabilidad: 'Media', sentido: '+/−' },
        { fecha: '2026-2027', evento: 'Despliegues de la arquitectura de 800 V CC de NVIDIA', efecto: 'Más contenido por MW para Vertiv o reparto de cuota hacia ABB y Eaton en energía', probabilidad: 'Media', sentido: '+/−' },
        { fecha: '2027', evento: 'Recompras con los 2.400 M autorizados hasta dic-27', efecto: 'No ha recomprado en 2026; a 173 USD, una recompra sería una señal de la dirección', probabilidad: 'Baja', sentido: '+' },
        { fecha: 'Jun-2027', evento: 'Junta de accionistas', efecto: 'Voto de la remuneración (11,6 % en contra en 2026) tras un bonus por encima del máximo del plan', probabilidad: 'Alta', sentido: '+/−' },
      ],
      confianza: 'Media',
    },
    riesgos: {
      items: [
        { riesgo: 'Pausa en la inversión de los hiperescaladores en 2028', tipo: 'Demanda / ciclo', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−47 % (escenario bajista: 79,28 frente a 150,03 USD)', mitigante: 'Pedidos orgánicos del 3T26 +100 %, anticipos de 4.120,5 M y base instalada de servicios', senal: 'Guía de capex de 2027 de los cuatro grandes plana o a la baja; anticipos por debajo de 3.000 M' },
        { riesgo: 'Compresión adicional del múltiplo del sector', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−20 % si el PER NTM baja al percentil 25 de los comparables con BPA un 10 % menor (estimación propia)', mitigante: 'Ya cotiza en la mediana del grupo (19,6x frente a 18,5x) con más del doble de crecimiento', senal: 'PER NTM del grupo por debajo de 15x' },
        { riesgo: 'Entrada de Eaton, Schneider y Modine en refrigeración líquida', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−9,1 % por 2 puntos menos de margen (sensibilidad del DCF: 136,38 USD)', mitigante: 'Liderazgo en térmica, diseños de referencia con NVIDIA, servicios de fluidos', senal: 'Margen operativo ajustado por debajo del 23 % con ventas al alza' },
        { riesgo: 'Ejecución y calidad: desfases de entregas y rumores de fallos de producto', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−4,5 % por 1 punto menos de margen (143,21 USD)', mitigante: 'El 3T26 batió la guía en 460 M; capex del 4 % y 5.000 técnicos de campo', senal: 'Otro trimestre bajo la guía o una provisión de garantías por encima de 80 M (57,2 M en sep-26)' },
        { riesgo: 'Reversión de los anticipos de clientes', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '≈ −5,9 USD por acción de caja si vuelven al nivel de dic-25 (1.815 M)', mitigante: 'Liquidez de 6.200 M', senal: 'Ingresos diferidos en el 10-Q por debajo de 3.000 M' },
        { riesgo: 'Concentración de clientes no publicada', tipo: 'Comercial', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Recogido en el bajista', mitigante: 'Ningún cliente supera el 10 % de las ventas según el 10-K; mezcla «como el mercado» según la dirección', senal: 'Retrasos de un gran cliente que se confirmen' },
        { riesgo: 'Compras en serie en lo alto del ciclo (UIG)', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−1,5 USD por acción si se paga todo el earn-out de UIG sin el EBITDA esperado (575 M más que en el puente)', mitigante: 'Múltiplo de ~13x, por debajo de los de cotización', senal: 'Deterioros de fondo de comercio o earn-outs pagados enteros' },
        { riesgo: 'Aranceles y fabricación en México y China', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−4,5 % por 1 punto de margen', mitigante: 'Precio-coste positivo en 2026 con contramedidas; reclamación de devolución de aranceles IEEPA', senal: 'Mención de presión de aranceles en el margen bruto' },
      ],
      premortem: `Noviembre de 2029: la acción ha perdido un 40 % desde 173 USD. La historia más probable empieza en 2027. Los cuatro grandes hiperescaladores descubren que la monetización de la IA va más despacio que la capacidad instalada y anuncian para 2028 un capex plano. Los pedidos de Vertiv, que ya no se publicaban, se frenan; la primera señal pública es una guía de 2028 con crecimiento de un dígito en febrero de 2028. Los anticipos, 4.120 M en sep-26, se dan la vuelta y el flujo libre de un año cae a la mitad. UIG, comprada en lo alto, no llega a su earn-out pero exige integración, y Eaton y Schneider ofrecen paquetes de energía y refrigeración con descuento: el margen ajustado vuelve del 25 % al 21 %. El mercado, que en noviembre de 2026 ya pagaba solo 20x, paga 15x un BPA un 25 % menor. Los indicadores que lo habrían anticipado: la decisión de dejar de publicar pedidos (feb-26), la caída de todo el sector en noviembre de 2026 pese a los buenos resultados, la ausencia de recompras a 173 USD y la guía de capex de 2027 de los hiperescaladores.`,
      ia: { exposicion: 'Alta', sentido: 'Mixto', efecto_valor: '+/−50 % (escenarios alcista y bajista)', comentario: 'La IA es la demanda de Vertiv: los centros de datos son en torno al 85 % de las ventas [B2] y el crecimiento de 2026 (+43 %) viene de la construcción de centros de IA, que necesitan más energía y refrigeración líquida por rack [A29]. No sustituye su producto (es infraestructura física), así que el riesgo no es tecnológico sino de ciclo: si la inversión en IA se frena, las ventas caen como en el bajista (−54 % de valor); si sigue, el alcista (+66 %). Un riesgo técnico menor: arquitecturas nuevas (800 V CC, refrigeración directa al chip) que redistribuyan cuota hacia ABB, Eaton o los fabricantes de chips. Señal: guía de capex de los hiperescaladores y cuota de Vertiv en los diseños de referencia de NVIDIA.' },
      confianza: 'Media',
    },
    preguntas: {
      items: [
        { tema: 'Pedidos', pregunta: '¿Cuál es la cartera a sep-26 y qué parte se entrega después de 2027, ahora que los pedidos del 3T crecieron más de un 100 %?', por_que: 'El mercado duda de 2028; la cartera es la única forma de verlo y no se publica hasta el 10-K.' },
        { tema: 'Anticipos', pregunta: '¿Qué parte de los 4.120,5 M de ingresos diferidos corresponde a los cinco primeros clientes y con qué calendario se consumen?', por_que: 'Explican buena parte del flujo libre de 2026 y su reversión cambia la caja de un año.' },
        { tema: 'Concentración', pregunta: '¿Qué peso tienen en las ventas los cinco y los diez primeros clientes, y cuántos son neoclouds con balance débil?', por_que: 'El 10-K no lo publica y es la variable del escenario bajista.' },
        { tema: 'UIG', pregunta: '¿Qué EBITDA de 2027 esperan de UIG, qué objetivos disparan los 1.150 M de earn-out y cuánto valdrá en el primer balance?', por_que: 'Es la mayor compra de su historia; el puente supone la mitad del earn-out.' },
        { tema: 'Recompras', pregunta: '¿Por qué no se ha recomprado en 2026 con 2.400 M autorizados y la acción un 54 % bajo su máximo?', por_que: 'A estos precios, la recompra diría lo que piensa la dirección del valor.' },
        { tema: 'Calidad', pregunta: '¿Cuántas reclamaciones de garantía hay por compresores y SAI y por qué la provisión subió de 43,2 a 57,2 M en nueve meses?', por_que: 'Los rumores de fallos se citaron en la conferencia y la dirección los atribuyó a todo el sector.' },
        { tema: 'Margen', pregunta: 'Con el margen operativo ajustado al 25,2 % en el 3T26, ¿cuál es el techo y qué lo limita?', por_que: 'Cada punto de margen vale ≈ 6,8 USD por acción en el DCF.' },
        { tema: 'Remuneración', pregunta: '¿Por qué el bonus del CEO se pagó por encima del máximo y por qué el variable a largo plazo no mide ROIC ni TSR relativo?', por_que: 'Un incentivo ligado a beneficio operativo premia crecer comprando en lo alto del ciclo.' },
      ],
      confianza: 'Media',
    },
  },

  fuentes: [
    { id: 2, titulo: 'Betas by Sector (US), enero de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Sectorial', fecha: '2026-01', url: 'https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/Betas.html' },
  ],
  huecos: [],
  huecos_resueltos: [{ seccion: 'identificacion', campo: 'proximos_resultados' }],
  _parches: [{ ruta: 'gobierno.presidente_ceo_separados', valor: false }],
  resumen,
};
