# Análisis growth: método (versión vigente v11, 14-oct-2026; v9 y v7 como referencia)

**Qué es.** El segundo tipo de análisis del repo, en paralelo al **análisis value** (el de siempre: informe Word de 28 secciones, DCF y objetivo a 12 meses por PER, `verticales/empresa/`). Lo pidió el usuario el 14-oct: buscar **cambios de tendencia en la valoración o en la percepción de los inversores, crecimiento muy alto, tecnología nueva y potencial comercial y de mercado, aunque la empresa aún no gane dinero**. Aquí no se exige ROIC − WACC ≥ 5 ni se valora por PER.

**Las cuentas las hace el código** (`motor/growth.mjs`, versión `VIGENTE`), igual para todas: el analista investiga y rellena `datos.json`; la puntuación, la proyección de ventas, el objetivo, la señal y el precio máximo de compra salen de la regla.

**Cómo se llegó a v7.** Ocho versiones probadas en dos fases: 20 casos famosos (fase 1) y 51 casos de un universo neutral, el top 17 del ETF ARKK en tres fechas fijas, con reglas fijadas antes de ver datos y una cohorte reservada para validar (fase 2, [backtest/protocolo.md](backtest/protocolo.md)). Resultados: apartado 6.

## 1. Puntuación (0-100)

| Bloque | Puntos | Qué mide (y cómo puntúa el código) |
|---|---|---|
| A. Crecimiento | 25 | Ventas últimos 12 meses y CAGR propio a 2 años (≥ 40 % = 5; 30 = 4; 20 = 3; 15 = 2; 10 = 1) y aceleración (último trimestre frente a la media de los 4 anteriores: ≥ +5 pp = 5 … < −10 pp = 0). |
| B. Mercado y tecnología | 20 | Penetración = ventas / mercado alcanzable (< 2 % = 5 … > 20 % = 1); tecnología diferencial (0-5); posición competitiva (0-5). |
| C. Cambio de tendencia | 20 | 8 señales, 2,5 puntos cada una (abajo). |
| D. Economía unitaria | 15 | Margen bruto (≥ 75 % = 5 … < 20 % = 0); regla del 40 (crecimiento + margen FCF: ≥ 60 = 5 … < 20 = 0); camino a la rentabilidad (FCF creciente 5, FCF positivo 4, equilibrio en ≤ 12 meses 3, ≤ 24 meses 2, más lejos 1, sin camino 0). |
| E. Caja y dilución | 10 | Pista de caja (FCF positivo o ≥ 36 meses = 5; 24-36 = 3; 12-24 = 1; < 12 = 0) y dilución anual (≤ 2 % = 5; ≤ 4 = 3; ≤ 7 = 1; más = 0). |
| F. Ejecución y dirección | 10 | Historial de cumplir lo prometido (0-5) y dirección y asignación de capital (0-5). |

**Las 8 señales de cambio de tendencia** (sí/no, con prueba y fuente): 1) revisiones al alza de las previsiones de los analistas en 3 meses (solo como señal de percepción); 2) precio sobre la media de 200 sesiones y la media girando al alza; 3) fuerza relativa a 6 meses mejor que su índice; 4) el EV/ventas ha subido ≥ 20 % desde su mínimo de 12 meses; 5) inflexión operativa (primer trimestre con beneficio operativo o FCF, o margen ≥ 5 pp mejor); 6) sentimiento mejorando en foros y prensa (si ya es eufórico, no cuenta); 7) compras de directivos o entrada de inversores de referencia; 8) catalizador nuevo en 6 meses.

**Lo que enseñó el backtest de la puntuación:** los fracasos en su pico puntuaban tan alto como las ganadoras (Zoom 88, Peloton 81, Snowflake 75), porque en el pico el crecimiento es máximo. La puntuación sirve para descartar negocios flojos, pero **lo que separa a las ganadoras de los fracasos es la valoración y la euforia** (apartado 3).

## 2. Objetivo a 12 meses

1. **Ventas del ejercicio objetivo (dentro de 2 años) con regla mecánica**: crecimiento de partida = media entre el pasado (mitad 12 meses, mitad último trimestre) y el CAGR propio a 2 años, entre −20 % y +60 %; decae un 15 % cada año. Bajista: la mitad de ese crecimiento; alcista: ×1,2. La proyección del analista se guarda como contraste (`ventas_analista_m`) pero no entra: así todas se miden igual y como en el backtest.
2. **Múltiplo**: EV/ventas de los 12 meses siguientes (o EV/EBITDA si la empresa ya es rentable de forma estable; se explica).
   - **Base** = el múltiplo de hoy, rebajado por la desaceleración: × √(crecimiento del año objetivo ÷ crecimiento actual), como mucho −30 %. *No se supone vuelta a la media histórica*: es lo que hacía v1 y castigaba justo los cambios de tendencia que buscamos.
   - **Bajista** = base × 0,6.
   - **Alcista** = el mayor entre base × 1,3, su mediana de 3 años y la de los comparables, con techo base × 1,6 (premia a las que cotizan por debajo de su historia cuando la percepción gira).
3. **Precio** = (múltiplo × ventas + caja dentro de 12 meses − deuda) ÷ acciones dentro de 12 meses (con la dilución).
4. **Probabilidades** 25/50/25; 35/50/15 si la pista es < 24 meses, la ejecución es dudosa o depende de un solo producto o de un hecho que no se repite (como la pandemia).
5. **Rentabilidad ponderada**, la del base, la del bajista y la asimetría. **DCF inverso** como contraste: qué crecimiento a 10 años descuenta el precio.

## 3. Señal

- **Comprar**, si se cumplen todos:
  1. puntuación ≥ 60;
  2. (sin mínimo de señales: cuentan dentro de la puntuación; en el universo neutral, exigir 4 dejaba fuera a las ganadoras de 2019, que se compraban en plena caída);
  3. **valoración**: EV / beneficio bruto de los 12 meses siguientes ≤ 35 (pagar como mucho 35 veces lo que deja la venta después del coste directo);
  4. **sin euforia**: no ha subido ≥ 150 % en 12 meses con un EV / beneficio bruto > 20 (las ganadoras que ya habían subido mucho, como Nvidia en 2016 o AppLovin en 2024, seguían baratas; los fracasos, no);
  5. el precio no exige más múltiplo: base ≥ 0 % y ponderada ≥ 5 %;
  6. bajista no peor que −50 % y pista de caja ≥ 24 meses o FCF positivo.
- **Vender** (o no comprar, si no se tiene): puntuación < 50, ponderada ≤ −10 %, pista < 12 meses o **tesis rota** (dos trimestres seguidos de desaceleración fuerte, pérdida del cliente o producto clave, fraude contable).
- **Mantener** en medio, diciendo qué falta y a qué precio pasaría a Comprar. **En vigilancia** si solo le falta rentabilidad (ponderada entre 0 y 5 %): se revisa en los siguientes resultados.
- **Convicción** (solo en Comprar): alta con puntuación ≥ 80 y asimetría ≥ 2; media con ≥ 75; baja el resto.
- **Precio máximo de compra**: el menor entre el que da ponderada 5 % y base 0 %, y el que lleva el EV / beneficio bruto a 35.

## 4. Riesgos que siempre se miran

Dilución (pagos en acciones > 15 % de las ventas se dice en rojo), caja y vencimientos, ejecución, concentración de clientes o de un producto, competencia de gigantes, regulación, crecimiento por un hecho que no se repite, y **la reversión del sentimiento**: en growth el precio cae más que el negocio cuando la percepción gira.

## 5. Encaje en cartera (orientativo; decide el usuario)

- Bolsillo growth: **como mucho el 20 % de la cartera**; cada posición **3,5 % (baja), 4 % (media) o 5 % (alta)** y nunca por debajo de 1.000 EUR. Entrada en dos tramos (mitad ya, mitad tras los siguientes resultados o con una caída del 10 % sin cambio de tesis). Salida por tesis, no por precio.
- No sustituye a la cartera value: al final de cada tanda se dice qué empresas merecerían un hueco, con qué peso y a costa de qué (liquidez primero).
- Valen las preferencias de `MEMORIA.md`: sin juego ni apuestas, sin Accenture ni Rightmove, sin comercio minorista salvo que lo pida.

## 6. Backtest y versiones

**Fase 1, 20 casos famosos** (13 ganadoras, 7 fracasos; elegidos sabiendo cómo acabaron: sirve para ver el mecanismo, no la tasa de acierto). v1 no compraba nada (suponía vuelta del múltiplo a su media); v4 compraba 5 ganadoras y ningún fracaso; v7, 7 ganadoras (Shopify 2017, CrowdStrike 2020, Axon 2023, Duolingo 2023, Palantir 2023, Nvidia 2016, Tesla 2019) y ningún fracaso (Zoom, Peloton, Teladoc, Beyond Meat, Palantir 2021, Snowflake, Rivian). Aviso: en estos casos las señales de tendencia salieron casi todas «sí» (6-7 de 8) y en el universo neutral casi todas «no» (0-3): parte de la fase 1 lleva sesgo retrospectivo.

**Fase 2, universo neutral** (protocolo fijado antes: top 17 de ARKK el 29-mar-2019, 31-mar-2021 y 31-mar-2023; 24 meses frente al Nasdaq-100; ajuste en 2019-2021, validación en 2023 sin mirarla hasta elegir versión). Solo el 22 % de esas 51 empresas batió al Nasdaq-100 a 24 meses: comprar la lista entera era mala idea.

| Versión | Ajuste 2019-21: compras, precisión | Validación 2023: compras, precisión | Las 51: compras, precisión (margen 95 %) |
|---|---|---|---|
| v4 (4 señales, ponderada ≥ 10 %) | 0 | 2, 50 % | 2, 50 % (9-91) |
| v5 (2 señales) | 2, 100 % | 2, 50 % | 4, 75 % (30-95) |
| v6 (sin mínimo de señales) | 3, 100 % | 2, 50 % | 5, 80 % (38-96) |
| **v7 (v6 + ponderada ≥ 5 %)** | **4, 100 %** | **2, 50 %** | **6, 83 % (44-97)** |
| v8 (v7 + proyección con desaceleración + señal de múltiplo con tope) | 4, 100 % | 2, 50 % | 6, 83 % (44-97) |
| **v9 (v7 + partida de la proyección = menor entre la mecánica y la guía de la empresa más lo que suele batirla)** | **4, 100 %** | **2, 50 %** | **6, 83 % (44-97)** |

Regla fijada de antemano para elegir: la mejor precisión en el ajuste (fase 2 + fase 1) con al menos 5 compras, y a igualdad, el mayor exceso. v7 y v8 empatan en precisión (100 %); v7 tiene más exceso en la fase 1 (Tesla 2019, que v8 deja fuera), así que **gana v7**. Las mejoras de v8 quedan pendientes de más evidencia.

**Tasa de acierto realista con v7 (las 51 empresas, 24 meses frente al Nasdaq-100):**
- Comprar: 6 casos, 5 baten al índice (83 %, margen 44-97 %); exceso mediano +125 pp; peor compra −36 % (Exact Sciences 2023). En la validación pura, 1 de 2 (Shopify +99 %, Exact Sciences −36 %).
- Mantener: 20 casos, solo 2 baten al índice (exceso mediano −37 pp). Vender / no comprar: 25 casos, 4 baten (mediana −63 pp).
- Se le escaparon 6 de las 11 que batieron al índice: Nvidia y Zillow 2019, CRISPR e Intellia 2019 (biotecnológicas sin ventas, que el método no sabe valorar), Coinbase 2023 y Twilio 2023 (por un punto). Las compras de 2019 fueron Tesla, Roku, Square y Twitter.
- **Lectura honesta:** el método es sobre todo un buen filtro (evita casi todo lo que acaba mal) y compra poco. Con 6 compras el margen es enorme: lo prudente es esperar que acierte algo más de la mitad de las veces, no el 83 %. Los precios y datos de entonces son en parte de memoria (marcados en cada caso) y el universo ARKK está sesgado a tecnología y biotecnología de EE. UU.

## 7. Cambios del método

Cada mejora que salga de los informes se apunta aquí, con fecha y motivo, y se repasa el backtest para que no empeore.
- 14-oct-2026 (noche): **alertas de robustez** (desde v9, campo `alertas` del cálculo, aparte de `avisos`, que son datos que faltan). No cambian cifras ni señal; dicen dónde el método puede chirriar con esa empresa, para defender o revisar la decisión: proyección mecánica > 1,2 × la del analista; ventas del escenario base > 1,2 × el consenso; `ventas_objetivo_m` < mitad de la mecánica (otra unidad: EBITDA); múltiplo de hoy > 2 × su mediana de 3 años (en el backtest neutral, 0 de 7 batieron al QQQ); sin guía anual (o solo trimestral: v9 no recorta); exceso sobre la guía > 10 pp; EV/EBITDA sin `ebitda_ntm_m`; margen EBITDA implícito > 3 pp distinto del de `ebitda_ntm_m` o fuera de 3-65 %; métrica que no es ventas ni EBITDA (Nu); «compra hasta» con bajista < −50 %; dos clientes > 40 % de las ventas (`mercado.clientes_top2_pct`, o tres > 60 %); pagos en acciones > 15 % de las ventas. El informe las cita en Riesgos. **Candidata v11** (no vigente): v9 + ventas de cada escenario = la menor entre la mecánica y la del analista + «compra hasta» que respeta el bajista; neutra en el backtest por construcción (no hay proyecciones del analista en los casos) y cambia Eli Lilly, Comfort Systems y HubSpot en los informes ([backtest/resultados-v11.md](backtest/resultados-v11.md)).
- 14-oct-2026 (17:15): **v9 → v11, vigente** (el usuario pidió optimizar el método con las tandas y que cada decisión sea defendible). v11 = v9 + (1) las ventas de cada escenario son las menores entre la proyección mecánica y la del analista (`valoracion.ventas_objetivo_m`), con control de unidad; (2) el «compra hasta» respeta también el bajista ≥ −50 %; (3) **alertas** de robustez en `calc.alertas` (proyección > 1,2 × analista o consenso, múltiplo > 2 × su mediana, sin guía anual, exceso sobre la guía > 10 pp, EBITDA sin `ebitda_ntm_m`, clientes concentrados, pagos en acciones > 15 %…). En el backtest es neutra (ningún caso tiene ventas del analista; ninguna señal cambia): es una regla de prudencia, no una mejora demostrada ([backtest/resultados-v11.md](backtest/resultados-v11.md)). Indicio para una futura versión: con el múltiplo > 2 × su mediana, 0 de 7 casos neutrales batieron al Nasdaq-100. v10 (margen EBITDA objetivo) queda como contraste ([backtest/resultados-v10.md](backtest/resultados-v10.md)).
- 14-oct-2026 (16:50): **revisión de precio antes de una orden** con el objetivo del informe fijo (rentabilidad = objetivo ÷ precio − 1; la orden sigue si el precio está bajo el «compra hasta»). Recalcular el motor cambiando solo el precio movía el objetivo en las valoradas por beneficio o EBITDA (Nu, Dexcom, Arista) y bajaba el límite sin motivo.
- 14-oct-2026 (16:48): **v7 → v9, vigente** por decisión del usuario (tarjeta, y «ves optimizando metodologías con las tandas»). v9 = v7, pero el crecimiento de partida de la proyección es el menor entre el mecánico y `guia_12m_pct + exceso_guia_pp` (solo recorta; sin guía, igual que v7). En el backtest es neutra: no cambia ninguna de las 71 compras ([backtest/resultados-v9.md](backtest/resultados-v9.md)); es una corrección de prudencia para no proyectar el pasado cuando la empresa ya anunció que frena (Duolingo, Wise, HubSpot). La tasa de acierto realista sigue siendo la de v7. v7 queda al lado como referencia (`node motor/growth.mjs <datos.json> --version v7`).
- 14-oct-2026: v1 → v4 tras la fase 1 del backtest; v4 → v7 tras la fase 2 (universo neutral): fuera el mínimo de 4 señales y ponderada mínima del 5 %.
- Propuestas de los informes pendientes de probar con el backtest: modo para bancos (Nu: PER o P/VC frente a ROE, morosidad y CET1); campo explícito del tipo de múltiplo; proyección que respete la desaceleración (argenx; es la v8); señal de múltiplo con tope (Cloudflare; v8); margen bruto del negocio recurrente en empresas mixtas (Axon); revisiones basadas en estimaciones, no en precios objetivo.

## 8. Cada análisis

Antes de la señal, **precio y noticias con veredicto** (`contexto_mercado`, regla 13 de `METODO-VIGENTE.md` §4, 15-oct-2026): `herramientas/movimiento.mjs --growth <carpeta>` y las noticias de 6 meses, cada una con «no cambia», «retrasa (hasta qué)» o «descarta»; `robustez-growth.mjs` baja el Comprar a «Esperar» con `retrasa` y lo quita con `descarta`.

Plantilla y campos: [plantilla.md](plantilla.md). Queda en `informes-growth/<empresa>-<AAAA-MM-DD>/` (`informe.md`, `datos.json`, Word y PDF) y en `informes-growth/resumen.md`. Cola: `cola-growth.md`, de 4 en 4. Antes de proponer una empresa se comprueba la lista de informes value y growth.
