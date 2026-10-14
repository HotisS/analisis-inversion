# Análisis growth: método (14-oct-2026)

**Qué es.** El segundo tipo de análisis del repo, en paralelo al **análisis value** (el de siempre: informe Word de 28 secciones, DCF y objetivo a 12 meses por PER, `verticales/empresa/`). Lo pidió el usuario el 14-oct: buscar **cambios de tendencia en la valoración o en la percepción de los inversores, crecimiento muy alto, tecnología nueva y potencial comercial y de mercado, aunque la empresa aún no gane dinero**. Por eso aquí no se exige ROIC − WACC ≥ 5 ni se valora por PER: se mide la calidad del crecimiento, el giro de la percepción y lo que puede valer la empresa si el crecimiento se cumple.

**Las cuentas las hace el código** (`motor/growth.mjs`), igual para todas: el analista investiga y rellena `datos.json`; la puntuación, el objetivo, la señal y el precio máximo de compra salen de la regla, no del criterio de cada análisis.

## 1. Puntuación (0-100)

| Bloque | Puntos | Qué mide (y cómo puntúa el código) |
|---|---|---|
| A. Crecimiento | 25 | Ventas últimos 12 meses y CAGR propio a 2 años (≥ 40 % = 5; 30 = 4; 20 = 3; 15 = 2; 10 = 1) y aceleración (último trimestre frente a la media de los 4 anteriores: ≥ +5 pp = 5 … < −10 pp = 0). |
| B. Mercado y tecnología | 20 | Penetración = ventas / mercado alcanzable (< 2 % = 5 … > 20 % = 1); tecnología diferencial (0-5); posición competitiva (0-5). Las dos últimas, con la escala de la plantilla. |
| C. Cambio de tendencia | 20 | 8 señales, 2,5 puntos cada una (abajo). **−3 si hay euforia** (subida > 150 % en 12 meses con foros eufóricos: el giro ya está en el precio). |
| D. Economía unitaria | 15 | Margen bruto (≥ 75 % = 5 … < 20 % = 0); regla del 40 (crecimiento + margen FCF: ≥ 60 = 5 … < 20 = 0); camino a la rentabilidad (FCF creciente 5, FCF positivo 4, equilibrio en ≤ 12 meses 3, ≤ 24 meses 2, más lejos 1, sin camino 0). |
| E. Caja y dilución | 10 | Pista de caja (FCF positivo o ≥ 36 meses = 5; 24-36 = 3; 12-24 = 1; < 12 = 0) y dilución anual de acciones (≤ 2 % = 5; ≤ 4 = 3; ≤ 7 = 1; más = 0). |
| F. Ejecución y dirección | 10 | Historial de cumplir lo prometido (0-5) y dirección y asignación de capital (0-5; fundador con participación, sin ventas masivas). |

**Las 8 señales de cambio de tendencia** (cada una sí/no, con su prueba y su fuente):
1. **Revisiones al alza** de las previsiones de ventas o beneficio de los analistas en los últimos 3 meses (se usa solo como señal de percepción, nunca como cifra del análisis).
2. **Precio sobre la media de 200 sesiones** y la media girando al alza (o cruce reciente).
3. **Fuerza relativa a 6 meses** mejor que su índice.
4. **Mejora del múltiplo**: el EV/ventas ha subido ≥ 20 % desde su mínimo de 12 meses (el mercado empieza a pagar más por lo mismo).
5. **Inflexión operativa**: primer trimestre con beneficio operativo o FCF positivo, o margen ≥ 5 pp mejor que hace un año.
6. **Sentimiento mejorando** en foros y prensa (de negativo o neutro a positivo; si ya es eufórico, no cuenta y aplica la penalización).
7. **Compras de directivos o entrada de inversores de referencia** (Form 4, 13F, entrada en un índice grande).
8. **Catalizador nuevo** en los últimos 6 meses: contrato, producto, aprobación regulatoria, alianza.

## 2. Objetivo a 12 meses (regla cerrada)

1. **Ejercicio objetivo**: el mismo que en value (el primero que cierra más de 18 meses después del análisis; hoy, 2028).
2. **Ventas propias** del ejercicio objetivo en tres escenarios, con nuestra proyección (el consenso solo se usa de contraste, como en value).
3. **Múltiplo**: EV/ventas sobre las ventas de los 12 meses siguientes. Si la empresa ya gana dinero de forma estable y el PER tiene sentido, puede usarse EV/EBITDA y se explica.
   - **Base** = el menor entre el múltiplo actual y su mediana de 3 años, **rebajado en proporción a la desaceleración** (crecimiento del año objetivo ÷ crecimiento actual, como mucho −40 %): los múltiplos growth se comprimen cuando el crecimiento baja.
   - **Bajista** = base × 0,6, o el mínimo de 3 años si es menor (un mal año en growth recorta el múltiplo un 40 % o más).
   - **Alcista** = el mayor entre la mediana de 3 años y la de los comparables, sin bajar del base y con techo base × 1,4.
4. **Precio** = (múltiplo × ventas + caja dentro de 12 meses − deuda) ÷ acciones dentro de 12 meses (hoy × (1 + dilución anual)). La caja descuenta la quema del año: así la dilución y la caja entran en el precio, no solo en la puntuación.
5. **Probabilidades** 25/50/25; el bajista sube a 35 (y el alcista baja a 15) si la pista es < 24 meses, la ejecución es dudosa o el crecimiento depende de un solo cliente o producto.
6. **Rentabilidad ponderada** = objetivo ponderado / precio − 1 (+ dividendo); se dan también la del base, la del bajista y la **asimetría** (alcista ÷ bajista).
7. **DCF inverso**: qué crecimiento a 10 años descuenta el precio de hoy. No entra en la cuenta, pero se dice si es razonable.

## 3. Señal

- **Comprar**, si se cumplen los seis: puntuación ≥ 70; ponderada ≥ 20 %; base ≥ 10 %; al menos 3 de las 8 señales; pista ≥ 24 meses o FCF positivo; bajista no peor que −45 %. (El listón de rentabilidad es más alto que en value, 20 % frente a 15 %, porque el riesgo también lo es.)
- **Vender**: puntuación < 50, ponderada ≤ −10 %, pista < 12 meses o **tesis rota** (dos trimestres seguidos de desaceleración fuerte, pérdida del cliente o producto clave, fraude contable).
- **Mantener** en medio: se dice qué requisito falta y a qué precio o con qué señal pasaría a Comprar.
- **Convicción** (solo en Comprar): alta con puntuación ≥ 80 y asimetría ≥ 2; media con ≥ 75; baja el resto.
- **Precio máximo de compra**: el que da una ponderada del 20 % y una base del 10 %.

## 4. Riesgos que siempre se miran

Dilución (emisiones, convertibles y pagos en acciones sobre ventas: > 15 % se dice en rojo), caja y vencimientos, ejecución (guías incumplidas, rotación de directivos), concentración de clientes o de un producto, competencia de gigantes, regulación, valoración extrema (EV/ventas > 30x) y **la reversión del sentimiento**: en growth el precio cae más que el negocio cuando la percepción gira.

## 5. Encaje en cartera (orientativo; decide el usuario)

- Bolsillo growth: **como mucho el 20 % de la cartera**; cada posición, **3,5 % (baja), 4 % (media) o 5 % (alta)** y nunca por debajo de 1.000 EUR.
- Entrada en dos tramos (mitad ya, mitad tras los siguientes resultados o con una caída del 10 % sin cambio de tesis). Salida por **tesis**, no por precio: las señales de venta se dicen en cada informe.
- No sustituye a la cartera value: al final de cada tanda se dice qué empresas merecerían un hueco, con qué peso y a costa de qué (liquidez primero).
- Las preferencias de `MEMORIA.md` siguen valiendo: sin juego ni apuestas, sin Accenture ni Rightmove, sin comercio minorista salvo que lo pida.

## 6. Cada análisis

Plantilla y campos de `datos.json`: [plantilla.md](plantilla.md). Queda en `informes-growth/<empresa>-<AAAA-MM-DD>/` (`informe.md`, `datos.json`, Word y PDF) y en el resumen común `informes-growth/resumen.md`. La cola growth es `cola-growth.md`, de 4 en 4. Antes de proponer una empresa se comprueba la lista de informes value y growth; si ya tiene informe value, solo se analiza en growth si el ángulo lo justifica y se dice.
