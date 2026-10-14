# Cartera growth (bolsillo growth)

**Compras aprobadas por el usuario el 14-oct-2026, 15:29** («ok a las compras growth»), con el método v7 (`verticales/growth/metodo.md`). Se pagan con liquidez; la cartera value no cambia. Bolsillo growth ≈ 16 % de la cartera con Shopify y ≈ 20 % con Datadog (tope 20 %): queda lleno, y cualquier Comprar nuevo tiene que decir qué growth sustituye y por qué.

| Valor | Total | Tramo 1 (ya, con límite) | Tramo 2 | Límite máximo | Peso | Motivo de negocio |
|---|---|---|---|---|---|---|
| Nu Holdings (NU) | 86 acciones (≈1.190 EUR) | 43 acciones | 43 tras resultados del 3T (12-nov), si la morosidad no se dispara | 18,9 USD | 4 % | Banco digital que crece +35 % a 15x beneficios |
| argenx (ARGX) | 2 acciones (≈1.450 EUR) | 1 acción | 1 tras resultados del 3T (22-oct) | 1.134 USD | 4,9 % | Vyvgart crece > 60 %; nuevas indicaciones |
| Shopify (SHOP), añadida el 14-oct a las 15:46 con la delegación del usuario («las órdenes tú mandas», 15:39) | 8 acciones (≈1.250 EUR) | 4 acciones | 4 tras resultados del 3T (3-nov) | 193,2 USD | 4 % | Plataforma de comercio (no minorista) que crece más del 30 % a 28x el beneficio bruto |
| Axon (AXON) | 3 acciones (≈1.100 EUR) | 2 acciones | 1 tras resultados del 3T (principios de noviembre) | 528 USD | 3,7 % | Cámaras y software para policía, barata frente a su historia |
| Datadog (DDOG), añadida el 14-oct (tanda 4) en lugar de Duolingo, que el usuario descartó (16:07: «duolingo me da miedo ciclo e IA, quizás mejor datadog o wise»), con su delegación de órdenes (15:39) | 5 acciones (≈1.215 EUR; 4 no llegan al mínimo de 1.000 EUR) | 3 acciones, pagadas cancelando la orden con límite value de Deutsche Börse | 2 tras resultados del 3T (principios de noviembre, fecha sin anunciar), si el crecimiento supera el ~28 % de la guía | 282 USD (la regla da 299,3; 282 es el máximo con la guía como punto de partida) | 4 % | Observabilidad en la nube: cuatro trimestres acelerando (+36 %), margen bruto 80 %, FCF 27 % |

- Si el precio supera el límite, no se compra: se recalcula con `node motor/growth.mjs` al precio del día.
- Salida por tesis (señales de venta de cada informe), no por precio.
- Liquidez: los tramos 1 (≈2.450 EUR) caben junto a las órdenes con límite value; los tramos 2 (≈2.400 EUR) solo con la liquidez que quede tras las órdenes value ejecutadas o vencidas el 7-nov.
- Datadog (tanda 4): tras Shopify no quedaba liquidez. El tramo 1 (≈730 EUR) sale de cancelar la orden con límite de Deutsche Börse, la suplente value de menor rentabilidad (+8,6 %); cancelar una orden no ejecutada no cuesta comisión ni impuesto. El tramo 2, de la liquidez del 7-nov. Duolingo queda descartada por el usuario (miedo al ciclo y a la IA).
- Suplente growth (tanda 4): Wise (Comprar baja, +7,6 %, frágil; se revisa con su 2T del 15-oct y, si sube a convicción media, se propone como sustituta; ≤ 12,5 USD). Celestica: no comprar.
