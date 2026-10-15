# Auto Trader: prueba de conservadurismo (15-oct-2026)

Precio 5,124 GBP (cierre 14-oct; a media sesión del 15-oct, 5,30). Hoy: **v2 11,5 % / base 11,9 % → Mantener** (decide la v2 por el selector: mediana adelantada 22,0x = 1,83 × PER actual 12,0x); v3 sin selector 22,5 % / 22,9 % (Comprar). Valor intrínseco 6,80 (≥ precio), ROIC − WACC 41,8 puntos, sostenibilidad «Sí» (motor también «Sí»). **Lo único que la deja fuera es el múltiplo a 12 meses de la v2.**

| Supuesto | Nuestro | Consenso | Histórico propio (5-10 años) | Comparables | ¿Decide? |
|---|---|---|---|---|---|
| WACC (gilt 5,39 %, beta 0,77, prima 5,5 %) | 9,11 % | n.d. | ROIC 46-56 % | Prima implícita del mercado 4,2 % → WACC 8,2 %, valor 7,67 | No: el valor intrínseco aguanta hasta un WACC > 10,5 % (10,1 % → 5,78) |
| Ventas FY27-29e | +3,6 / +4,5 / +5,0 % (709,7 M en FY29) | +3,9 / +5,5 / +5,0 % (718,2 M) | TCAC 8 % en 11 años; +3,9 % en FY26 | Mediana NTM +7,3 % | No (−1 % del consenso) |
| Margen EBITDA | 66 → 67 % | 66,3 / 66,7 / 66,6 % | 62,8-71 % | Mediana 55,9 % | No |
| Beneficio neto FY29e | 339,5 M | 325,7 M | — | — | No (por encima del consenso) |
| BPA FY29e (base) | 0,4685 (724,7 M acc.) | 0,4919 (≈662 M acc.) | BPA FY22-26 +7,4 % anual con recompras | — | **Sí**: la diferencia es solo la recompra no anunciada |
| Múltiplo a 12 m (base) | v2: 12,0x (PER de hoy); v3: 13,2x | Objetivo medio 5,59 = 11,4x BPA FY29e del consenso | Adelantado 22,0x (mín. 12,3x hoy); al cierre 24,8x | PER NTM mediana 15,5x (Rightmove 15,5x, Scout24 17,2x) | **Sí** |
| Múltiplo terminal | Gordon 3 % = 12,2x EBITDA | n.d. | EV/EBITDA medio 17,1x | 10,8x NTM; transacciones 23-26x | No (solo valor intrínseco) |
| Recorte por IA | Bajista 25 %: ventas planas, margen −6 pp (−47 % de valor) | No explícito | <1 % del tráfico desde asistentes | Todo el sector desrateado | En parte (pondera) |
| Probabilidades | 25/55/20 | — | — | — | Poco: 25/50/25 → 13,7 %; 20/50/30 → 17,7 % pero base 11,9 % (no pasa) |

## Qué haría falta (umbrales calculados con `motor/objetivo12m.mjs`, notas/tmp/umbrales.mjs y recompra28.mjs)

1. **Múltiplo**: un PER base v2 de **12,4x** (hoy 12,0x, +3 %) → v2 15,0 % / 15,7 %. Es pedir que vuelva un 3 % del múltiplo; la v3 supone un 10 %. Defendible solo si la caída es temporal, y hoy no hay dato que lo pruebe (IA y Deal Builder siguen abiertos): **sería forzar**.
2. **BPA**: un BPA FY29e de **0,487** (+4 %; +14 % sobre FY28e) → v2 15,9 % / 16,4 %. Es casi el consenso (0,4919), que lo consigue con recompras. Con las recompras del ritmo del consenso, netas de intereses, la v2 queda en 14,9 %: **en el filo**. Una recompra **anunciada** de ≈400 M para FY2028 la haría pasar (15,3 % / 15,8 %); 300 M no (14,5 %).
3. **Precio**: con el objetivo fijo, **compra robusta por debajo de 4,97 GBP** (−3 %).
4. WACC, crecimiento, margen y terminal no deciden: el valor intrínseco ya está un 33 % por encima del precio.

**Conclusión**: no somos conservadores en el negocio (nuestro beneficio neto supera al consenso); el método lo es en el múltiplo, y con motivo: el desrate es de régimen hasta que los semestres digan lo contrario. La distancia es pequeña (3 % de múltiplo o una recompra anunciada).

## Para Mejoras (sesgos del método, no de la empresa)

- **Escalón del selector**: el corte del 1,8 se mide con el precio del día. A 5,124 decide la v2 (11,5 %); a 5,26 (+2,7 %) decidiría la v3 (22,1 %). Propuesta a probar con backtest: banda de histéresis o mezcla continua de v2 y v3 entre 1,5 y 2,1 veces.
- **La v2 en desrateadas no compra nunca al precio del informe** si el BPA crece menos de ≈12 % al año: su base es el PER del día (elasticidad del objetivo al precio 2,09, M6), así que el límite queda siempre ≈ precio × (1 + crecimiento del BPA + dividendo) ÷ 1,15. Solo compra si el precio cae después del informe. Medir en el backtest de desrateadas (hoy 7 cierres).
- **Recompras no anunciadas**: penaliza a los recompradores en serie con política declarada (Auto Trader recompró en todos los ejercicios de FY2017 a FY2026 salvo FY2021, el del confinamiento). Variante a probar: contar la política de devolución declarada con un descuento (por ejemplo, la mitad).

## Veredicto: **esperar**

No es compra entera ya: la acción robusta es Mantener. **Orden límite a 4,97 GBP (5,88 EUR), 340 acciones (≈1.690 GBP ≈ 2.000 EUR)**, válida hasta el 25-oct (los resultados del 5-nov están a 21 días; dentro de los 10 días previos no se compra). Si no se ejecuta, **reevaluar tras el 1S FY2027 (5-nov)**: con forecourts ≥ −1 %, guía confirmada y, sobre todo, una recompra anunciada para FY2028 de ≥ 400 M, pasaría la v2 sin forzar nada. La tesis no depende de un catalizador de días: aguanta los 3 meses.
