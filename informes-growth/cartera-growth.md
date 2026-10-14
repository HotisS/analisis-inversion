# Cartera growth (bolsillo growth)

Órdenes growth vigentes (14-oct-2026; compras aprobadas por el usuario a las 15:29 y órdenes delegadas a las 15:39). Método vigente v11. Bolsillo growth ≈ 20 % de la cartera (tope): está lleno, así que un Comprar nuevo solo entra sustituyendo a otra. Son PROPUESTAS: regla dura del usuario (14-oct 18:04), no se emite ninguna orden salvo que él la diga explícitamente en el chat y la confirme tras pedirle confirmación. Ninguna orden se ha ejecutado aún (`informes/ordenes-2026-10-15.md`).

| Valor | Total | Tramo 1 (ya, con límite) | Tramo 2 | Límite máximo | Peso | Motivo de negocio |
|---|---|---|---|---|---|---|
| Nu Holdings (NU) | 86 acciones (≈1.160 EUR) | 43 acciones | 43 tras resultados del 3T (12-nov), si la morosidad no se dispara | 16,6 USD | 4 % | Banco digital que crece +35 % a 15x beneficios |
| Axon (AXON) | 3 acciones (≈1.085 EUR) | 2 acciones | 1 tras resultados del 3T (principios de noviembre) | 476 USD | 3,7 % | Cámaras y software para policía, barata frente a su historia |
| Shopify (SHOP) | 8 acciones (≈1.230 EUR) | 4 acciones | 4 tras resultados del 3T (3-nov) | 192,1 USD | 4 % | Plataforma de comercio (no minorista) que crece más del 30 % a 28x el beneficio bruto |
| Snowflake (SNOW) | 4 acciones (≈1.225 EUR) | 2 acciones, pagadas cancelando la orden con límite value de Deutsche Börse | 2 tras resultados del 3T fiscal (≈2-dic), si el producto crece ≥ 30 % y cumple la guía | 368 USD | 4 % | Datos para IA: el producto acelera cuatro trimestres seguidos (+29 % → +37 %), retención neta 126 %; FCF 22 % |
| Samsara (IOT) | 30 acciones (≈1.105 EUR) | 15 acciones | 15 tras resultados del 3T fiscal (principios de diciembre), si el ARR crece ≥ 27 % y bate la guía | 45,1 USD | 4 % | Sensores y software para flotas: crece ~30 % siete trimestres seguidos, FCF al alza, caja neta; 7 de 8 señales |

- Si el precio supera el límite, no se compra. Salida por tesis (señales de venta de cada informe), no por precio.
- **argenx sale y entra Samsara (14-oct 17:16 UTC, v11):** con las ventas de su propio informe (9.300 M, como el consenso) y no la proyección mecánica (12.612 M), argenx baja de +44 % a +10 % (baja convicción); Samsara da +15 % con convicción media. La orden de argenx no se había ejecutado: cambiarla no cuesta nada. argenx queda de suplente y se revisa con sus resultados del 22-oct.
- Liquidez: los tramos 1 suman ≈3.090 EUR; el de Snowflake se paga cancelando la orden con límite value de Deutsche Börse. Los tramos 2 salen de la liquidez que quede tras las órdenes value ejecutadas o vencidas el 7-nov.
- Suplentes growth, por orden (14-oct 18:29 UTC tras la tanda 12, v11, rentabilidad al precio actual con el objetivo fijo): 1) MongoDB (Comprar baja, +22 %, consejero delegado interino; ≤ 411 USD prudente); 2) Toast (Comprar baja, +15 %; ≤ 32,1 USD); 3) Zscaler (Comprar baja, +15 %; ≤ 244,3 USD); 4) dLocal (Comprar baja, +17 %; ≤ 16,4 USD; detrás de las anteriores porque su señal es frágil: si se proyecta con el beneficio bruto, que crece menos por la caída de la comisión, sale Vender; y sumaría más Latinoamérica a Nu); 5) Dexcom (Comprar baja, +12 %; ≤ 89,5 USD); 6) argenx (Comprar baja, +10 %; ≤ 866,8 USD; resultados 22-oct); 7) Datadog (Comprar media, +12 %; ≤ 282 USD prudente; baja puestos por la alerta de euforia a 6 meses, +156 %); 8) Saab (Comprar baja, +6 %; ≤ 616,3 SEK; resultados 23-oct); 9) Natera (Comprar baja, +8 %; última por la alerta de múltiplo caro: con el múltiplo > 2 × su mediana, el bajista real fue peor que el calculado en 6 de 11 casos del backtest; ≤ 407,5 USD). Mantener: Eli Lilly, Wise (2T el 15-oct), Arista, DoorDash, HubSpot, Insulet, Vertex, Kinsale, TransMedics, Rolls-Royce, Howmet, Construction Partners, Madrigal, Remitly. No comprar: GE Vernova, Celestica, Monolithic Power, Boston Scientific, Comfort Systems, Quanta Services, Insmed, Alnylam, AeroVironment, Celsius, Ascendis.
- **Alerta en Snowflake (14-oct, backtest v13):** sube +166 % en 6 meses con el múltiplo alto. No cambia la señal (la euforia a 6 meses queda como alerta, no como regla), pero el tramo 2 solo se propone si los resultados del ≈2-dic confirman el crecimiento.

## Revisión de precios antes de cada orden

Regla del usuario (14-oct, 16:10): antes de proponer o mantener una orden, se mira el precio actual y se comprueba si los cálculos siguen vigentes. **Cómo se hace (desde el 14-oct 16:50):** el objetivo a 12 meses del informe queda fijo y la rentabilidad es objetivo ÷ precio actual − 1; la orden sigue en pie si el precio está por debajo del «compra hasta» del informe (por construcción, ahí la ponderada es ≥ 5 % y la base ≥ 0). No se recalcula el motor cambiando solo el precio: en empresas valoradas por beneficio o EBITDA (Nu, Dexcom, Arista) el objetivo se movía con el precio y el límite salía artificialmente más bajo (Nu bajó a 18,3 por eso; vuelve a 18,9). El objetivo se rehace solo con resultados o datos nuevos.

| Valor | Precio y hora | Límite (v11) | Ponderada al precio actual | Señal (v11) | ¿Sigue en pie? |
|---|---|---|---|---|---|
| Nu Holdings | 14,90 USD, 14-oct 18:29 UTC | 16,6 USD | +20,2 % | Comprar (media) | Sí |
| Axon | 400,08 USD, 14-oct 18:29 UTC | 476 USD | +36,7 % | Comprar (baja) | Sí |
| Shopify | 171,19 USD, 14-oct 18:29 UTC | 192,1 USD | +17,8 % | Comprar (media) | Sí |
| Snowflake | 337,84 USD, 14-oct 18:29 UTC | 368 USD | +14,4 % | Comprar (media) | Sí |
| Samsara | 40,57 USD, 14-oct 18:29 UTC | 45,1 USD | +16,6 % | Comprar (media) | Sí |

Precios de Yahoo (chart API, sesión en curso). **Rentabilidad esperada del bolsillo growth** (media ponderada por importe, objetivo fijo al precio actual): +20 % con las posiciones completas y +21 % con los tramos 1; lo realista, cerca de la mitad.
