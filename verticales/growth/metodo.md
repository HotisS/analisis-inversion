# Análisis growth: método (versión vigente v4, 14-oct-2026)

**Qué es.** El segundo tipo de análisis del repo, en paralelo al **análisis value** (el de siempre: informe Word de 28 secciones, DCF y objetivo a 12 meses por PER, `verticales/empresa/`). Lo pidió el usuario el 14-oct: buscar **cambios de tendencia en la valoración o en la percepción de los inversores, crecimiento muy alto, tecnología nueva y potencial comercial y de mercado, aunque la empresa aún no gane dinero**. Aquí no se exige ROIC − WACC ≥ 5 ni se valora por PER.

**Las cuentas las hace el código** (`motor/growth.mjs`, versión `VIGENTE`), igual para todas: el analista investiga y rellena `datos.json`; la puntuación, la proyección de ventas, el objetivo, la señal y el precio máximo de compra salen de la regla.

**Cómo se llegó a v4.** Se probaron cuatro versiones sobre 20 casos históricos (13 ganadoras al principio o a mitad de su subida y 7 fracasos en su pico), con los datos de cada fecha: ver [backtest/resultados.md](backtest/resultados.md) y el apartado 6.

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
  2. al menos 4 de las 8 señales;
  3. **valoración**: EV / beneficio bruto de los 12 meses siguientes ≤ 35 (pagar como mucho 35 veces lo que deja la venta después del coste directo);
  4. **sin euforia**: no ha subido ≥ 150 % en 12 meses con un EV / beneficio bruto > 20 (las ganadoras que ya habían subido mucho, como Nvidia en 2016 o AppLovin en 2024, seguían baratas; los fracasos, no);
  5. el precio no exige más múltiplo: base ≥ 0 % y ponderada ≥ 10 %;
  6. bajista no peor que −50 % y pista de caja ≥ 24 meses o FCF positivo.
- **Vender** (o no comprar, si no se tiene): puntuación < 50, ponderada ≤ −10 %, pista < 12 meses o **tesis rota** (dos trimestres seguidos de desaceleración fuerte, pérdida del cliente o producto clave, fraude contable).
- **Mantener** en medio, diciendo qué falta y a qué precio pasaría a Comprar. **En vigilancia** si solo le falta rentabilidad (ponderada entre 0 y 10 %): la tendencia y la valoración acompañan; se revisa en los siguientes resultados (en el backtest, Nvidia 2016 y Tesla 2019 quedaron aquí).
- **Convicción** (solo en Comprar): alta con puntuación ≥ 80 y asimetría ≥ 2; media con ≥ 75; baja el resto.
- **Precio máximo de compra**: el menor entre el que da ponderada 10 % y base 0 %, y el que lleva el EV / beneficio bruto a 35.

## 4. Riesgos que siempre se miran

Dilución (pagos en acciones > 15 % de las ventas se dice en rojo), caja y vencimientos, ejecución, concentración de clientes o de un producto, competencia de gigantes, regulación, crecimiento por un hecho que no se repite, y **la reversión del sentimiento**: en growth el precio cae más que el negocio cuando la percepción gira.

## 5. Encaje en cartera (orientativo; decide el usuario)

- Bolsillo growth: **como mucho el 20 % de la cartera**; cada posición **3,5 % (baja), 4 % (media) o 5 % (alta)** y nunca por debajo de 1.000 EUR. Entrada en dos tramos (mitad ya, mitad tras los siguientes resultados o con una caída del 10 % sin cambio de tesis). Salida por tesis, no por precio.
- No sustituye a la cartera value: al final de cada tanda se dice qué empresas merecerían un hueco, con qué peso y a costa de qué (liquidez primero).
- Valen las preferencias de `MEMORIA.md`: sin juego ni apuestas, sin Accenture ni Rightmove, sin comercio minorista salvo que lo pida.

## 6. Backtest y versiones

| Versión | Qué cambia | Ganadoras con Comprar | Fracasos con Comprar | Rent. media 12 m de las compras | 36 m |
|---|---|---|---|---|---|
| v1 | Base = mín(múltiplo de hoy, mediana 3 años) × desaceleración; Comprar con 70 puntos y 20 % | 0/13 | 0/7 | — | — |
| v2 | Base = múltiplo de hoy, rebaja suave | 3/13 | 1/7 (Palantir 2021) | +68 % | +256 % |
| v3 | v2 + EV/beneficio bruto ≤ 35 + euforia que veta; 60 puntos y 15 % | 3/13 | 0/7 | +110 % | +358 % |
| **v4** | v3 + alcista hasta su mediana o comparables; compra si el precio no exige más múltiplo; ≥ 4 señales | **5/13** | **0/7** | **+114 %** | **+476 %** |

v4 compra Shopify 2017, CrowdStrike 2020, Axon 2023, Duolingo 2023 y Palantir 2023; deja en vigilancia Nvidia 2016 y Tesla 2019; no compra ninguno de los 7 fracasos (Zoom, Peloton, Teladoc, Beyond Meat, Palantir 2021, Snowflake, Rivian). Se le escapan los giros de empresas grandes que crecían poco cuando giraron (Meta 2023, Nvidia 2023, Rheinmetall 2022, Celestica 2024, Netflix 2013): sus puntuaciones de crecimiento eran bajas en ese momento; son casos que el **análisis value** puede ver mejor, y por eso conviven los dos.

**Límites del backtest**: 20 casos; precios y múltiplos históricos en parte aproximados (las fuentes de cotizaciones estaban bloqueadas y varios salen de memoria, marcados en cada caso); las señales y puntuaciones de juicio, aunque se pidió hacerlas con lo que se sabía entonces, pueden llevar algo de sesgo retrospectivo. Se han evitado reglas hechas a medida de un caso concreto. Los casos están en `backtest/casos/` y se recalculan con `node herramientas/growth-backtest.mjs`.

## 7. Cambios del método

Cada mejora que salga de los informes se apunta aquí, con fecha y motivo, y se repasa el backtest para que no empeore.
- 14-oct-2026: v1 → v4 tras el backtest (apartado 6).

## 8. Cada análisis

Plantilla y campos: [plantilla.md](plantilla.md). Queda en `informes-growth/<empresa>-<AAAA-MM-DD>/` (`informe.md`, `datos.json`, Word y PDF) y en `informes-growth/resumen.md`. Cola: `cola-growth.md`, de 4 en 4. Antes de proponer una empresa se comprueba la lista de informes value y growth.
