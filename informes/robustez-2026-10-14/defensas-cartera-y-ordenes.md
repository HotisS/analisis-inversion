# Defensa de cada decisión de la cartera y de las órdenes del 15-oct (14-oct-2026, 17:30 UTC)

Sobre la tabla rehecha a las 17:05 (`informes/ordenes-2026-10-15.md`, commit 18a738f). Cifras de `node herramientas/robustez.mjs` al último cierre (Europa 14-oct; EE. UU. y Tokio 13-oct). La v3 ×1,1 decide y la v2 controla. **Colchón de BPA**: cuánto puede bajar nuestro BPA antes de perder la decisión. **Límite**: con el objetivo fijo y en la divisa del broker. Para cada valor van las objeciones más fuertes que se le pueden poner, con la respuesta: si la decisión se sostiene, o si cambia.

## Resumen: qué se sostiene y qué cambia

| Valor | Decisión de la tabla | Pruebas | ¿Se sostiene? |
|---|---|---|---|
| Edenred | Mantener sin ampliar | frágil (v3 +24,8 / v2 +10,3; v2 sin doble castigo +12,5) | **Sí** |
| Daiichi Sankyo | Mantener (no se amplía por tamaño) | sólida, Comprar con los dos; colchón 15 % | **Sí** |
| Uber | Mantener | sólida en Mantener, pero colchón de BPA del 2 % | **Sí, en vigilancia** |
| Viscofan | Mantener | sólida, Comprar; colchón 8 % | **Sí** |
| Netflix | Mantener | sólida; el filtro de valor real se pierde por encima de 71,88 USD (hoy ≈70) | **Sí, en el borde** |
| SAP | Mantener | sólida; colchón 15 % | **Sí** |
| Intuit | Mantener sin ampliar | frágil (v3 +26,0 / v2 +14,7) | **Sí** |
| Alphabet, Puig, Hermès | Vender | sólidas en «no mantener» | **Sí** |
| Zoetis | Vender | frágil: v3 +15,4 Comprar, v2 +5,4 | **Sí** (la v3 está en su tope) |
| ICE, Equifax, IBKR | Vender | fallan calidad o tamaño | **Sí** |
| Nemetschek | Comprar 29 ≤ 71 | sólida; colchón 15 % | **Sí** |
| Bureau Veritas | Comprar 76 ≤ 27,80 | Comprar con los dos; resultados el 21-oct | **Sí, mejor en dos tramos** |
| LVMH | Comprar 5 ≤ 392 | el informe es de antes del 3T del 12-oct, y la señal de alarma del propio informe se ha cumplido a medias (Moda −5 % orgánico) | **No mañana: pasa a espera** |
| ANYCOLOR | Comprar 100 ≤ 3.137 JPY | pasa con los dos al límite; historia del PER de 3 años; colchón 6 % | **Sí, es la más floja** |
| Constellation | Cancelada | el motivo de la tabla está mal (CAD contra USD) | **Sí, por otro motivo** |
| Booking, Verisk (espera) | límite v3 | frágiles: solo pasan con v3 | **Límite al nivel robusto** |
| argenx, Nu (growth) | Comprar | la señal se sostiene; la rentabilidad está inflada | **Sí, con cifra corregida** |

## Lo que se queda

### Edenred: 136 títulos, no se amplía (v3 +24,8 % / v2 +10,3 %)
1. *«Con v3 da +24,8 % y cumple los tres requisitos: ¿por qué no ampliar?»* Porque la v3 sale de una mediana adelantada de 27,8x construida con 2018-2022, antes de los topes de comisión de Italia y Brasil. Hoy el mercado paga 12,4x. Es un cambio de régimen, no un despiste del mercado (prueba M1). Con la v2 da +10,3 %, y con la v2 sin el doble castigo del bajista (la corrección que está probando el hilo Mejoras), +12,5 %. Ninguna lectura prudente llega al 15 %, así que no se amplía.
2. *«Entonces, ¿por qué no venderla?»* Porque pasa el filtro de mantener con todas las variantes: la ponderada más baja es +10,3 %, el base +16,3 % y el valor intrínseco, 42,22 EUR, queda un 46 % por encima del precio. Aguanta un 13 % menos de BPA antes de dejar de pasar el filtro. Además el usuario la quiere conservar.
3. *«La ley francesa puede poner un tope por decreto.»* Nuestro BPA bajista (2,01) ya lo recoge, un 23 % bajo el base. Los resultados del 21-oct y el Senado son las dos fechas que pueden cambiar la decisión. Se amplía solo si se descarta el tope.

### Daiichi Sankyo: 100 títulos (v3 +38,8 % / v2 +27,5 %)
1. *«El BPA de FY2025 está inflado»* (tipo fiscal del 4 % y beneficio neto mayor que el EBIT, prueba D5). Es cierto para el año publicado, pero nuestro BPA de FY2028 (155,9) se proyecta con el tipo normal del DCF, y la v3 ya está en su tope. Con la v2 sigue dando +27,5 %.
2. *«La mediana de 46x es de la euforia de los ADC.»* Sí (prueba M1), y por eso decide el control: la v2 da Comprar igualmente. Es la más sólida de la cartera: aguanta un 15 % menos de BPA y seguiría siendo Comprar.
3. *«Riesgos propios: corrección de cuentas, provisiones a fabricantes, I-DXd retirada.»* Están en el bajista del informe. No se amplía por tamaño (otro lote de 100 la llevaría al ≈10 %), no por la tesis.

### Uber: 28 títulos (v2 +11,5 % al cierre de 71,32; +15,2 % a 69,05)
1. *«Es la que menos aguanta.»* Cierto. Deja de pasar el filtro de mantener (≥ 10 %) por encima de 72,30 USD o con un BPA un 2 % más bajo. No hay historia del PER útil (M2), así que la rentabilidad es solo crecimiento del BPA: el objetivo se mueve con el precio (M6).
2. *«Con el consenso daría +50 %.»* Nuestro BPA de 2028 (4,30) va un 26 % por debajo del consenso (5,80) porque quitamos las liberaciones fiscales que inflan el beneficio publicado (tipo efectivo de −76 % en 2025, prueba D5). Somos prudentes a propósito. Por eso se queda: la cifra prudente pasa justo y la de la calle pasa de sobra.
3. *«Waymo y Tesla.»* Es el riesgo principal del informe. La señal de venta es un crecimiento de las reservas de Mobility por debajo del 12 %, o un precio por encima de 72,30 sin mejora de BPA. Se revisa con los resultados de principios de noviembre.

### Viscofan: 32 títulos (v3 +24,0 % / v2 +16,0 %)
1. *«El margen cae (21,9 % en el 2T26) y la guía ha fallado dos veces.»* Por eso el BPA base no supone volver al margen de Beyond25. Aun así aguanta un 8 % menos de BPA y sigue siendo Comprar con los dos métodos, y un 12 % menos y sigue pasando el filtro de mantener.
2. *«Danville (EE. UU.).»* Es un riesgo puntual: costó un 13 % en una sesión. El bajista del informe lo incluye.
3. *«¿Por qué no ampliarla, si es robusta?»* Se puede hasta ≈7 títulos más sin pasar del 7 % de la cartera. No compensa una orden tan pequeña frente a Nemetschek o Bureau Veritas, que dan más.

### Netflix: 23 títulos (v3 +30,7 % / v2 +18,5 %)
1. *«El valor intrínseco (61,10) está un 13 % por debajo del precio.»* Esa es la objeción que más pesa. El filtro de mantener admite hasta un 15 % bajo el precio, que se rompe por encima de 71,88 USD (hoy ≈70). **Si sube de 71,88 sin que mejore el informe, se vende.**
2. *«El crecimiento se frena (+12 % guiado) y YouTube gana tiempo de pantalla.»* Ya está en el base. La rentabilidad pasa con los dos métodos y aguanta un 16 % menos de BPA.
3. Resultados el 20-oct. Una guía de 2027 por debajo de +10 % rompe la tesis.

### SAP: 7 títulos (v3 +28,8 % / v2 +19,0 %)
1. *«Riesgo de la IA: el bajista es de −35 %.»* Está en el escenario bajista (19,7x, 0,72 del base). Sin doble castigo da lo mismo, y aguanta un 15 % menos de BPA.
2. *«Precio justo: el DCF inverso pide nuestro base.»* Por eso no se amplía (el valor intrínseco, 191,35, queda un 3 % bajo el precio), pero el filtro de mantener llega hasta 225 EUR. Resultados el 21-oct.

### Intuit: 5 títulos, no se amplía (v3 +26,0 % / v2 +14,7 %)
1. *«Con v3 es Comprar.»* Frágil: la mediana adelantada (49x) es 3,3 veces el PER de hoy (15x). La caída del múltiplo es miedo a la IA en impuestos y contabilidad, y ese miedo puede no pasar. Con la v2, +14,7 %: no llega al 15 %, así que no se amplía.
2. *«Entonces, ¿se vende?»* No: pasa el filtro de mantener con todas las variantes (la peor, +14,7 %; aguanta un 13 % menos de BPA) y el valor intrínseco (430) queda un 43 % por encima.
3. *«Sostenibilidad "En parte" y TurboTax pierde clientes.»* Es lo que impide ampliar. La señal de venta es una campaña fiscal de 2027 con TurboTax cayendo más de un 3 %.

## Lo que se vende

- **Alphabet** (v3 −2,6 % / v2 +1,0 %, sólida): no pasa el filtro de mantener con ninguna variante, y el valor intrínseco (252,74) queda un 29 % bajo el precio. *«Es el mejor negocio de la lista.»* Sí, pero a 26x de beneficio el precio ya lo descuenta. Se vende por coste de oportunidad: unos 20 puntos frente a ANYCOLOR o Nemetschek.
- **Zoetis** (v3 +15,4 % / v2 +5,4 %, frágil): *«Con v3 casi es Comprar.»* Su v3 es el tope sobre una mediana de 36x de antes de que Librela tuviera competencia (M1). Con v2 no pasa ni el filtro de mantener (5,4 %). Con la acción robusta, se vende.
- **Puig** (+6,0 %, sólida) y **Hermès** (v2 +13,2 %; valor intrínseco un 28 % bajo el precio, sólida en «no mantener»): ninguna variante las sostiene.
- **ICE** y **Equifax**: fallan calidad (ROIC por debajo del WACC). La v3 les da +22,5 % y +32,0 %, pero la calidad es requisito y no se compensa con rentabilidad. Equifax además exige crecer su BPA un 27 % al año (D6). Las dos son posiciones de menos de 1.000 EUR. **IBKR**: menos de 1.000 EUR.

## Lo que se compra

### Nemetschek: 29 ≤ 71 EUR (v3 +34,4 % / v2 +22,2 %, sólida)
1. *«La IA puede comerse las licencias de diseño.»* Es el bajista del informe (40,35 EUR). Aun así aguanta un 15 % menos de BPA y sigue siendo Comprar con los dos métodos.
2. *«No es barata frente a sus comparables (19,2x EBITDA).»* La rentabilidad sale del crecimiento del BPA, no de que suba el múltiplo. El límite de 71 queda por debajo del robusto (73,35).
3. *«Gobierno: el 86 % del capital libre votó contra la remuneración.»* Es una pega real, pero no cambia la cifra.

### Bureau Veritas: 76 ≤ 27,80 EUR (v3 +26,6 % / v2 +19,5 %)
1. *«La historia del PER es de 3 años (M2).»* La v2, con historia más larga, también da Comprar. El límite robusto es 28,32, por encima del 27,80 de la orden.
2. *«La guía de 2026 cambió dos veces y publica el 21-oct.»* Su propia señal de alarma es un crecimiento orgánico por debajo del 4 % en el 3T. **Propuesta: 38 acciones mañana y 38 tras el 21-oct si el orgánico es ≥ 4 %.**
3. *«Wendel vende.»* Es presión de oferta, no cambia el negocio. Aguanta un 10 % menos de BPA.

### LVMH: 5 ≤ 392 EUR, **no se compra mañana; pasa a la lista de espera**
1. *«El informe es del 8-oct y LVMH publicó el 3T el 12-oct»* (E1). Comprobado: orgánico del grupo +1 % (+3 % en el 2T) y nueve meses −2 % publicados, en línea con el −2,9 % de 2026 del informe. **Pero Moda y Marroquinería cayó un −5 % orgánico**, y la señal de alarma del propio informe es «crecimiento orgánico de Moda negativo en el 3T26 y el 4T26». La mitad ya se ha cumplido.
2. *«Calidad 3,4, por debajo de 5.»* Excepción aceptada por el usuario. Pero con una excepción de calidad y la alarma a medias, la compra deja de ser defendible hasta ver el 4T (finales de enero) o una revisión del informe con el 3T.
3. Las cifras (v3 +29,6 % / v2 +17,8 %; colchón de BPA del 11 %) se sostendrían si el BPA de 2028 no baja más de un 11 %. Lo que falta saber es si Moda se estabiliza. Esos ≈1.960 EUR quedan en liquidez y siguen la regla de la tabla: los tramos 2 de growth y la lista de espera.

### ANYCOLOR: 100 ≤ 3.137 JPY (v3 +21,6 % / v2 +15,4 % a 3.140)
1. *«La historia del PER es de 3 años (M2) y salió a bolsa en 2022.»* Al límite de 3.137, la v2 también da Comprar (base 12,0 %, justo en el listón). Es la compra más floja: aguanta un 6 % menos de BPA.
2. *«Riesgo de la IA: avatares generados.»* Medio. Lo que se vende son personas concretas con sus fans, no la animación. El riesgo más grande es que se vaya talento de primera fila (el informe lo vigila).
3. *«Nuestro BPA va un 16 % bajo el consenso.»* Somos prudentes; con el BPA de la calle daría más. Un lote, sin ampliar. Si abre por encima de 3.137, no se compra.

## Canceladas y lista de espera

- **Constellation, cancelada.** La tabla dice «−19 % a 3.087 CAD», pero eso compara el precio en CAD con el objetivo en USD (el informe lleva las cuentas en USD). Bien calculado: v2 +15,1 % / base +17,0 % a 3.093 CAD, con el límite real en 3.096 CAD. **Se cancela igual, por otro motivo:** el BPA base de 2028 (80,10) exige crecer un 49 % al año desde 2025 (24,15, deprimido por la contabilidad NIIF de las opciones de venta de minoritarios), y solo aguanta un 1 % menos de BPA (D6, confianza).
- **Wolters Kluwer y Auto Trader**: frágiles, v3 +15,1 % y +19,1 % frente a v2 +5,1 % y +8,4 %. Las dos son desrateadas por miedo a la IA y la v3 está en su tope. Con la acción robusta no pasan ni el filtro de mantener. Canceladas con razón.
- **Booking** (≤ 171,5 USD) y **Verisk** (≤ 182,74 USD): solo pasan con v3. Las dos son desrateadas (M1) y la v2 da 14,3 % y 12,6 %. **Propuesta: el límite robusto (pasa con los dos), ≤ 156,0 USD en Booking y ≤ 172,9 USD en Verisk.** Booking además tiene el riesgo de los agentes de IA que reservan.
- **Adyen** (≤ 908,88, el valor intrínseco): con los dos métodos pasa de sobra (+35,5 % / +22,8 %). Lo único que falta es que el precio baje al valor intrínseco. Sólida.
- **Moncler, Amadeus, Experian**: confianza de datos baja (V3); no se compran hasta confirmar las cifras. **DSV y Coloplast**: fuera por calidad; además DSV exige crecer el BPA un 37 % al año (D6).

## Growth (tramos 1)

Las cinco señales se sostienen con todas las variantes (v9, v7, ventas del analista y pesos 25/50/25). Lo que no se sostiene es la **rentabilidad** de dos de ellas:
- **argenx**: el +44 % sale de la proyección mecánica de ventas (12.612 M), un 36 % por encima de las ventas de su propio informe (9.300 M) y del consenso (9.330 M). Con esas ventas da **+9 % / base +4 %**. Sigue siendo Comprar con los listones v9 (5 % y 0 %), pero en la tabla debe contar con la cifra menor. *«Entonces, ¿por qué comprarla?»* Por la puntuación growth (lanzamientos de Vyvgart en nuevas indicaciones). La rentabilidad a 12 meses es modesta; es una posición pequeña (convicción baja) y en dos tramos.
- **Nu**: +27 % → **+15 %** con las ventas del analista. Se compra igual.
- Axon, Shopify y Snowflake: la cifra aguanta con las ventas del analista (Axon +34 %, Shopify +17 %, Snowflake +10 %). Snowflake y Shopify se quedarían en Mantener con pesos 35/50/15, más pesimistas: son las de menos margen.
- Suplente **Natera**: +22 % → +8 % con sus propias ventas y el consenso, y sube un 127 % en un año: no debería ir por delante de Samsara y Datadog.
