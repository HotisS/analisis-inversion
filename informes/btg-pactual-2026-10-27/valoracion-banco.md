# BTG Pactual (BPAC11): valoración de banco (27-oct-2026)

Por unit (1 ON + 2 PNA) y en BRL. Precio: **60,00 BRL** (cierre de B3 del 26-oct-2026). Código: `notas/banco-ri.mjs` (modelo) y `notas/supuestos.mjs` (adaptación al motor). Base del beneficio: **lucro líquido ajustado** y ROAE ajustado de los informes trimestrales, que son la referencia del mercado; las NIIF de la CVM quedan de contraste.

## 1. Por qué no vale el DCF de empresa industrial

En un banco, los depósitos, las emisiones y la caja son la materia prima del negocio, no deuda del accionista. No hay flujo libre para toda la empresa que se pueda separar de la financiación. Por eso:

- **Calidad = ROE ajustado − Ke**, en lugar de ROIC − WACC, con la misma regla y los mismos niveles: con ≥ 5 puntos (o 4,5-5 con sostenibilidad «Sí») se abren los niveles de compra; por debajo de 4,5, nunca. Con deuda, caja y minoritarios a cero, el «ROIC» del motor es el ROE sobre el patrimonio ajustado medio.
- **El valor que manda es el de exceso de rentabilidad** (residual income): valor contable por unit + valor actual de (ROE − Ke) × valor contable + terminal.
- El DCF del motor se adapta para que sea un **modelo de dividendos**: «EBITDA» = beneficio antes de impuestos ajustado (margen del 62,5 %), amortización 0, impuestos del 21,5 % → EBIT × (1 − t) = beneficio neto; «capex» = beneficio retenido = (1 − payout) × beneficio; circulante 0; puente de deuda en cero; peso de la deuda 0 % (WACC = Ke). El «FCFF» es entonces JCP + dividendos. **Sus cifras tienen sentido**: 25,95 BRL, frente a 26,37 del modelo de exceso de rentabilidad, porque usa el mismo beneficio y el mismo payout (la diferencia es el calendario: el motor cuenta solo el 18 % de 2026e y descuenta a fin de año). Por eso sí se usa, con un peso del 50 % (y los escenarios, otro 50 %).
- Lo que no tiene sentido en un banco y no se usa: Altman (0,32), Piotroski, deuda neta/EBITDA, circulante, «caja libre» histórica (flujo operativo NIIF de −16.500 M en 2023 y +7.914 M en 2024) y el EV/EBITDA de los comparables.

## 2. Coste del capital propio (Ke) en BRL

| Concepto | Hoy (26-oct) | 23-oct (antes de la elección) | Encargo antes de la elección |
|---|---|---|---|
| Tasa libre: bono de Brasil a 10 años | 15,44 % | 12,98 % | ≈ 13,5 % |
| Beta (ajustada, mensual de 5 años frente al Ibovespa) | 1,28 | 1,28 | 1,28 |
| Prima del mercado | 5,5 % | 5,5 % | 5,5 % |
| Prima país | 0 (ya está en el bono en BRL) | 0 | 0 |
| **Ke** | **22,48 %** | **20,02 %** | **20,54 %** |

Los 3 puntos de prima país del escáner eran una **doble cuenta**: el bono brasileño en BRL ya incluye el riesgo país y la inflación. Otras betas: mensual de 5 años sin ajustar 1,42; semanal de 2 años 1,60; con beta 1,0, Ke del 20,94 %. Con la prima implícita del mercado de Damodaran (oct-2026, 4,20 %) como regla relativa: Ke del 20,8 %. Crecimiento a perpetuidad g = 5,0 % (inflación esperada a largo plazo ≈ 4 % del Focus + 1 punto real).

## 3. Modelo de exceso de rentabilidad (caso base)

Valor contable de partida: 79.553 M de patrimonio ajustado ÷ 3.862,552 M de units = **20,60 BRL** (30-jun-2026). ROE sobre el valor contable de inicio; payout del 30 % hasta 2030 que sube al 79 % en 2035 (el que deja crecer el patrimonio al 5 % con un ROE del 24 %). Ke 22,48 %.

| Periodo | VC al inicio | ROE | BPA | DPA | Exceso (ROE − Ke) × VC | VA del exceso |
|---|---|---|---|---|---|---|
| 2H26 | 20,60 | 26,2 % | 2,70 | 0,81 | 0,38 | 0,35 |
| 2027 | 22,48 | 26,3 % | 5,91 | 1,77 | 0,86 | 0,63 |
| 2028 | 26,62 | 25,1 % | 6,68 | 2,00 | 0,70 | 0,42 |
| 2029 | 31,30 | 25,0 % | 7,83 | 2,35 | 0,79 | 0,39 |
| 2030 | 36,78 | 24,8 % | 9,12 | 2,74 | 0,85 | 0,34 |
| 2031 | 43,16 | 24,6 % | 10,62 | 4,25 | 0,92 | 0,30 |
| 2032 | 49,54 | 24,4 % | 12,09 | 6,04 | 0,95 | 0,25 |
| 2033 | 55,58 | 24,2 % | 13,45 | 8,07 | 0,96 | 0,21 |
| 2034 | 60,96 | 24,1 % | 14,69 | 10,28 | 0,99 | 0,18 |
| 2035 | 65,37 | 24,0 % | 15,69 | 12,42 | 0,99 | 0,14 |

| Composición | BRL por unit |
|---|---|
| Valor contable (30-jun-2026) | 20,60 |
| VA de los excesos 2H26-2035 | 3,21 |
| VA del terminal (exceso perpetuo desde 2035, creciendo al 5 %) | 0,87 |
| Valor a 30-jun-2026 | 24,68 |
| **Valor a 27-oct-2026** (capitalizado al Ke) | **26,37** (1,28 veces el valor contable; −56 % sobre el precio) |

Escenarios (mismo payout): bajista, ROE −4 puntos → **18,77**; alcista, ROE +2 puntos → **30,86**. El DCF adaptado del motor da 18,94 / 25,95 / 30,06; síntesis ponderada (DCF 50 %, escenarios 50 %): **25,59 BRL**, el valor intrínseco del informe.

## 4. Sensibilidad: tasa libre × ROE (valor por unit, BRL)

| Tasa libre (Ke) | ROE −4 | ROE −2 | Base | ROE +2 |
|---|---|---|---|---|
| 12,98 % (20,02 %), 23-oct | 23,11 | 27,66 | 32,77 | 38,51 |
| 13,50 % (20,54 %), encargo antes de la elección | 22,07 | 26,38 | 31,23 | 36,66 |
| 14,50 % (21,54 %) | 20,26 | 24,17 | 28,56 | 33,48 |
| **15,44 % (22,48 %), hoy** | 18,77 | 22,35 | **26,37** | 30,86 |

Cada punto de tasa libre vale ≈ 2,6 BRL por unit (≈ 10 %). **El efecto Lula en el valor**: de 32,77 a 26,37 BRL (−20 %) solo por el Ke, frente a una caída del precio del 24,8 %. Con un ROE del 26,3 % constante para siempre, el valor sería de 29,98 BRL hoy y de 37,49 con la tasa del 23-oct.

## 5. P/VC justificado (Gordon): (ROE − g) ÷ (Ke − g)

| Caso | P/VC justificado | Valor por unit (× 20,60) |
|---|---|---|
| ROE 25 %, Ke 22,48 % | 1,14x | 23,57 |
| ROE 24 %, Ke 22,48 % | 1,09x | 22,39 |
| ROE 25 %, Ke 20,02 % (23-oct) | 1,33x | 27,43 |
| **Precio** | **2,91x** | 60,00 |

Lo que descuenta el precio: con un ROE del 25 % y g del 5 %, un **Ke del 11,9 %**; con nuestro Ke, un crecimiento a perpetuidad del 21 % (imposible). Con el modelo completo (ROE del 26 % que baja al 24 %), el precio de 60 BRL equivale a un **Ke del 14,7 %** (tasa libre del 7,6 % con la beta de 1,28); el DCF inverso del motor da un 14,6 %. Con un ROE del 26,3 % para siempre, un Ke del 15,8 %. En todos los casos, el mercado pide a BTG menos que el bono del Tesoro brasileño a 10 años (15,44 %).

## 6. Suma de partes (contraste, peso 0)

El banco no publica beneficio por línea de negocio; se reparte el beneficio de 2026e (20.380 M) por el peso de cada línea en los ingresos del 1S26, lo que supone márgenes iguales (no es cierto: la gestión y la banca privada tienen más margen que el crédito).

| Negocio | Peso en ingresos 1S26 | Beneficio 2026e (M) | PER | Valor (M) |
|---|---|---|---|---|
| Gestión de patrimonios y de activos | 22,4 % | 4.565 | 9,0x (entre XP 6,7x y Goldman/Morgan Stanley 12-13x) | 41.085 |
| Banca de inversión y Sales & Trading | 23,6 % | 4.810 | 6,0x | 28.860 |
| Crédito corporativo, Banco Pan y rendimiento del patrimonio | 54,2 % | 11.046 | 6,0x (Bradesco 5,6x, Santander 6,1x, Itaú 8,3x) | 66.276 |
| **Total** | | 20.380 | 6,7x | **136.221 M = 35,27 BRL por unit** (−41 %) |

## 7. Indicadores de banco

| Indicador | Valor | Fuente |
|---|---|---|
| CET1 / Tier 1 / Basilea | 11,6 % / 12,6 % / 16,0 % (2T26); CET1 11,3 % en el 4T25 | ER 2T26, 4T25 |
| LCR | 160,3 % (2T26) | ER 2T26 |
| VaR medio ÷ patrimonio | 0,13 % (4T24), 0,22 % (2T25), 0,30 % (3T25), 0,38 % (4T25), 0,32 % (1T26), 0,22 % (2T26) | ER |
| Peso de Sales & Trading en los ingresos | 30,8 % (2021), 28,9 % (2023), 21,7 % (2025), 18,4 % (1S26) | ER |
| Fase 3 (morosidad NIIF) | 15.236 de 406.815 M = 3,7 % (2T26) | CVM |
| Coste del riesgo | ≈ 2,0 % de la cartera amplia (pérdidas esperadas de 3.832 M en el 1S26; 6.401 M en 2025) | CVM |
| Eficiencia (gastos ÷ ingresos) | 41,1 % (2021), 38,2 % (2023), 35,4 % (2025), 37,1 % (2T26) | ER |
| Sensibilidad a la Selic | «Interest & Others» (el patrimonio a la Selic) = 17,3 % de los ingresos del 1S26: más Selic, más ingreso; menos mercado de capitales y más morosidad | ER 2T26 |
| Sensibilidad al mercado de capitales | Banca de inversión 5,2 % + Sales & Trading 18,4 % + gestión 7,8 % + banca privada 14,6 % = ≈ 46 % de los ingresos | ER 2T26 |

## 8. Conclusión

Con el Ke de hoy, todos los métodos dan entre 19 y 39 BRL por unit (exceso de rentabilidad 26,37; DCF adaptado 25,95; P/VC justificado 23,57; suma de partes 35,27), frente a 60 de precio. **Calidad: ROE − Ke = 26,2 − 22,48 = 3,7 puntos (< 4,5) → ningún nivel de compra.** El método no da una señal fiable para este banco: el CAPM en BRL con la tasa libre del día de mayor tensión pide un 22,5 %, y el mercado lleva años pagando por BTG un Ke implícito del 12-15 %. Lo sólido es solo «no comprar»; la regla a 12 meses (+5,2 % ponderada) dice Mantener.
