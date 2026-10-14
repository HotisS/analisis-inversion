# Cartera growth (bolsillo growth)

**Compras aprobadas por el usuario el 14-oct-2026, 15:29** («ok a las compras growth»), con el método v7 (`verticales/growth/metodo.md`). Se pagan con liquidez; la cartera value no cambia. Bolsillo growth ≈ 16 % de la cartera con Shopify y ≈ 20 % con Snowflake (tope 20 %): queda lleno, y cualquier Comprar nuevo tiene que decir qué growth sustituye y por qué.

| Valor | Total | Tramo 1 (ya, con límite) | Tramo 2 | Límite máximo | Peso | Motivo de negocio |
|---|---|---|---|---|---|---|
| Nu Holdings (NU) | 86 acciones (≈1.190 EUR) | 43 acciones | 43 tras resultados del 3T (12-nov), si la morosidad no se dispara | 18,9 USD | 4 % | Banco digital que crece +35 % a 15x beneficios |
| argenx (ARGX) | 2 acciones (≈1.450 EUR) | 1 acción | 1 tras resultados del 3T (22-oct) | 1.134 USD | 4,9 % | Vyvgart crece > 60 %; nuevas indicaciones |
| Shopify (SHOP), añadida el 14-oct a las 15:46 con la delegación del usuario («las órdenes tú mandas», 15:39) | 8 acciones (≈1.250 EUR) | 4 acciones | 4 tras resultados del 3T (3-nov) | 193,2 USD | 4 % | Plataforma de comercio (no minorista) que crece más del 30 % a 28x el beneficio bruto |
| Axon (AXON) | 3 acciones (≈1.100 EUR) | 2 acciones | 1 tras resultados del 3T (principios de noviembre) | 528 USD | 3,7 % | Cámaras y software para policía, barata frente a su historia |
| Snowflake (SNOW), añadida el 14-oct (tanda 5) en lugar de Datadog, con la delegación del usuario (15:39) | 4 acciones (≈1.170 EUR) | 2 acciones, pagadas cancelando la orden con límite value de Deutsche Börse | 2 tras resultados del 3T fiscal (≈2-dic), si el producto crece ≥ 30 % y cumple la guía | 374 USD (la regla da 378,5) | 4 % | Datos para IA: el producto acelera cuatro trimestres seguidos (+29 % → +37 %), retención neta 126 % y guía subida de +27 % a +36 %; FCF 22 % |

- Si el precio supera el límite, no se compra: se recalcula con `node motor/growth.mjs` al precio del día.
- Salida por tesis (señales de venta de cada informe), no por precio.
- Liquidez: los tramos 1 (≈2.450 EUR) caben junto a las órdenes con límite value; los tramos 2 (≈2.400 EUR) solo con la liquidez que quede tras las órdenes value ejecutadas o vencidas el 7-nov.
- Datadog → Snowflake (tanda 5, 14-oct 16:15 UTC): Datadog entró en lugar de Duolingo (que el usuario descartó a las 16:07 por miedo al ciclo y a la IA), pero partiendo de su propia guía (frena al ~28 %) su ponderada cae a ≈ +9 %. Snowflake es el mismo tipo de negocio (software de datos en la nube) y su guía va **por encima** de la regla: su +16,8 % al precio actual no depende de la proyección. La orden de Datadog no se había ejecutado, así que cambiarla no cuesta nada. El tramo 1 de Snowflake (≈585 EUR) sale de cancelar la orden con límite de Deutsche Börse; el tramo 2, de la liquidez del 7-nov.
- Suplentes growth, por orden (14-oct 16:50 UTC, método v9, rentabilidad al precio actual con el objetivo del informe fijo): 1) Samsara (Comprar media, +20 %, 7/8 señales; ≤ 47,0 USD); 2) Datadog (Comprar media, +14 %; ≤ 282 USD prudente); 3) Natera (Comprar baja, +20 %; diagnóstico genético, poco riesgo de IA; ≤ 407 USD prudente); 4) MongoDB (Comprar baja, +25 %, consejero delegado interino; ≤ 411 USD prudente); 5) Toast (Comprar baja, +20 %, ciclo de la restauración; ≤ 31,9 USD); 6) Zscaler (Comprar baja, +16 %; ≤ 248,6 USD); 7) Dexcom (Comprar baja, +12 %; ≤ 89,5 USD). En vigilancia: Arista (+6 % solo por la caída del día; ciclo de IA), DoorDash (+11 % solo por la caída del día; ciclo de consumo y solapa con Uber), Wise (+6 %; 2T el 15-oct) y HubSpot (riesgo alto de IA). Insulet: Mantener (54,5 puntos). No comprar: GE Vernova (−9 %), Celestica.

## Revisión de precios antes de cada orden

Regla del usuario (14-oct, 16:10): antes de proponer o mantener una orden, se mira el precio actual y se comprueba si los cálculos siguen vigentes. **Cómo se hace (desde el 14-oct 16:50):** el objetivo a 12 meses del informe queda fijo y la rentabilidad es objetivo ÷ precio actual − 1; la orden sigue en pie si el precio está por debajo del «compra hasta» del informe (por construcción, ahí la ponderada es ≥ 5 % y la base ≥ 0). No se recalcula el motor cambiando solo el precio: en empresas valoradas por beneficio o EBITDA (Nu, Dexcom, Arista) el objetivo se movía con el precio y el límite salía artificialmente más bajo (Nu bajó a 18,3 por eso; vuelve a 18,9). El objetivo se rehace solo con resultados o datos nuevos.

| Valor | Precio y hora | Límite | Ponderada / base al precio actual | Señal (v9) | ¿Sigue en pie? |
|---|---|---|---|---|---|
| Nu Holdings | 15,07 USD, 14-oct 16:50 UTC | 18,9 USD | +32,0 % / +26,0 % | Comprar (media) | Sí |
| argenx | 824,83 USD, 14-oct 16:50 UTC | 1.134 USD | +44,4 % / +39,5 % | Comprar (baja) | Sí |
| Axon | 403,49 USD, 14-oct 16:50 UTC | 528 USD | +37,5 % / +31,4 % | Comprar (baja) | Sí |
| Shopify | 171,94 USD, 14-oct 16:50 UTC | 193,2 USD | +18,0 % / +21,2 % | Comprar (media) | Sí |
| Snowflake | 341,91 USD, 14-oct 16:50 UTC | 374 USD | +16,2 % / +19,4 % | Comprar (media) | Sí |

Precios de Yahoo (chart API, sesión en curso). Las cinco órdenes siguen en pie.
