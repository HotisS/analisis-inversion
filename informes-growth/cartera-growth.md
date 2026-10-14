# Cartera growth (bolsillo growth)

**Compras aprobadas por el usuario el 14-oct-2026, 15:29** («ok a las compras growth»), con el método v7 (`verticales/growth/metodo.md`). Se pagan con liquidez; la cartera value no cambia. Bolsillo growth ≈ 16 % de la cartera con Shopify y ≈ 20 % con Snowflake (tope 20 %): queda lleno, y cualquier Comprar nuevo tiene que decir qué growth sustituye y por qué.

| Valor | Total | Tramo 1 (ya, con límite) | Tramo 2 | Límite máximo | Peso | Motivo de negocio |
|---|---|---|---|---|---|---|
| Nu Holdings (NU) | 86 acciones (≈1.190 EUR) | 43 acciones | 43 tras resultados del 3T (12-nov), si la morosidad no se dispara | 18,3 USD (antes 18,9; recalculado el 14-oct 16:10 UTC) | 4 % | Banco digital que crece +35 % a 15x beneficios |
| argenx (ARGX) | 2 acciones (≈1.450 EUR) | 1 acción | 1 tras resultados del 3T (22-oct) | 1.134 USD | 4,9 % | Vyvgart crece > 60 %; nuevas indicaciones |
| Shopify (SHOP), añadida el 14-oct a las 15:46 con la delegación del usuario («las órdenes tú mandas», 15:39) | 8 acciones (≈1.250 EUR) | 4 acciones | 4 tras resultados del 3T (3-nov) | 193,2 USD | 4 % | Plataforma de comercio (no minorista) que crece más del 30 % a 28x el beneficio bruto |
| Axon (AXON) | 3 acciones (≈1.100 EUR) | 2 acciones | 1 tras resultados del 3T (principios de noviembre) | 528 USD | 3,7 % | Cámaras y software para policía, barata frente a su historia |
| Snowflake (SNOW), añadida el 14-oct (tanda 5) en lugar de Datadog, con la delegación del usuario (15:39) | 4 acciones (≈1.170 EUR) | 2 acciones, pagadas cancelando la orden con límite value de Deutsche Börse | 2 tras resultados del 3T fiscal (≈2-dic), si el producto crece ≥ 30 % y cumple la guía | 374 USD (la regla da 378,5) | 4 % | Datos para IA: el producto acelera cuatro trimestres seguidos (+29 % → +37 %), retención neta 126 % y guía subida de +27 % a +36 %; FCF 22 % |

- Si el precio supera el límite, no se compra: se recalcula con `node motor/growth.mjs` al precio del día.
- Salida por tesis (señales de venta de cada informe), no por precio.
- Liquidez: los tramos 1 (≈2.450 EUR) caben junto a las órdenes con límite value; los tramos 2 (≈2.400 EUR) solo con la liquidez que quede tras las órdenes value ejecutadas o vencidas el 7-nov.
- Datadog → Snowflake (tanda 5, 14-oct 16:15 UTC): Datadog entró en lugar de Duolingo (que el usuario descartó a las 16:07 por miedo al ciclo y a la IA), pero partiendo de su propia guía (frena al ~28 %) su ponderada cae a ≈ +9 %. Snowflake es el mismo tipo de negocio (software de datos en la nube) y su guía va **por encima** de la regla: su +16,8 % al precio actual no depende de la proyección. La orden de Datadog no se había ejecutado, así que cambiarla no cuesta nada. El tramo 1 de Snowflake (≈585 EUR) sale de cancelar la orden con límite de Deutsche Börse; el tramo 2, de la liquidez del 7-nov.
- Suplentes growth, por orden (14-oct 16:33 UTC, al precio actual y con la candidata v9, que parte de la guía de la empresa más lo que suele batirla): 1) Samsara (Comprar media, +20,4 %, 7/8 señales; ≤ 47,0 USD); 2) Datadog (Comprar media, +15,1 %; ≤ 282 USD prudente); 3) MongoDB (Comprar baja, +25,4 %, pero consejero delegado interino tras la salida del anterior; ≤ 411 USD prudente); 4) Zscaler (Comprar baja, +16,6 %; ≤ 248,6 USD); 5) Dexcom (Comprar baja, +10,5 %; ≤ 88,4 USD); 6) Toast (Comprar baja, ~+11 % con su guía pasada a ventas; ≤ 31,9 USD); 7) Wise (Comprar baja, +5,5 %, frágil; se revisa con su 2T del 15-oct). En vigilancia: HubSpot (Mantener con la v9, +1,9 %; riesgo alto de que la IA se coma el negocio) e Insulet (Mantener, 54,5 puntos). Celestica: no comprar.

## Revisión de precios antes de cada orden

Regla del usuario (14-oct, 16:10): antes de proponer o mantener una orden, se mira el precio actual y se recalcula con `node motor/growth.mjs` (mismo `datos.json`, solo cambia el precio).

| Valor | Precio y hora | Límite | Ponderada / base al precio actual | Señal | ¿Sigue en pie? |
|---|---|---|---|---|---|
| Nu Holdings | 15,09 USD, 14-oct 16:10 UTC | 18,3 USD (antes 18,9) | +27,2 % / +21,8 % | Comprar (media) | Sí; el límite baja a 18,3 USD |
| argenx | 828,94 USD, 14-oct 16:10 UTC | 1.134 USD | +43,7 % / +38,8 % | Comprar (baja) | Sí |
| Axon | 404,80 USD, 14-oct 16:10 UTC | 528 USD | +37,1 % / +31,0 % | Comprar (baja) | Sí |
| Shopify | 172,48 USD, 14-oct 16:10 UTC | 193,2 USD | +17,6 % / +20,8 % | Comprar (media) | Sí |
| Datadog | 273,96 USD, 14-oct 16:10 UTC | 282 USD | +14,7 % / +17,8 % | Comprar (media) | Sustituida por Snowflake a las 16:15 |
| Snowflake | 340,27 USD, 14-oct 16:15 UTC | 374 USD | +16,8 % / +20,0 % | Comprar (media) | Sí (entra) |
| Dexcom (suplente) | 84,09 USD, 14-oct 16:15 UTC | 90,7 USD | +16,7 % / +19,8 % | Comprar (baja) | Suplente |
| Samsara (suplente) | 40,94 USD, 14-oct 16:15 UTC | 42,9 USD | +21,6 % / +24,8 % | Comprar (media) | Suplente |
| Zscaler (suplente) | 223,60 USD, 14-oct 16:15 UTC | 212 USD | +25,6 % / +19,5 % | Comprar (baja) | Suplente; por encima del límite prudente |

Precios de Yahoo (chart API, sesión en curso). Las órdenes vivas siguen por debajo de su límite y en Comprar.
