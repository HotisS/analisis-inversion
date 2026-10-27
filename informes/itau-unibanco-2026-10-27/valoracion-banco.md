# Itaú Unibanco: valoración bancaria (exceso de rentabilidad y P/VC justificado)

Corte 27-oct-2026. Precio de la línea de compra: ADR ITUB (NYSE) 7,70 USD al cierre del 26-oct-2026 × 5,4064 BRL/USD = 41,63 BRL por acción (1 ADR = 1 acción preferente ITUB4; ITUB4 cerró a 41,70 BRL en B3 el mismo día). Base contable: **BR GAAP gerencial** (resultado recurrente gerencial y patrimonio del MD&A del 2T26), que es la que sigue el mercado; las cuentas NIIF del 20-F se usan para la serie histórica del informe Word. Generado por `notas/valoracion-banco.mjs`.

## Por qué este modelo y no el DCF de EBITDA

En un banco la deuda (depósitos, emisiones) es la materia prima, no financiación: no hay EBITDA, ni capital invertido, ni valor empresa, ni circulante con sentido. El valor para el accionista es el patrimonio contable más el valor actual de lo que el banco gane **por encima** de su coste del capital propio (Ke): valor = VC₀ + Σ (ROEₜ − Ke) × VCₜ₋₁ / (1 + Ke)ᵗ + terminal. Como contraste, el P/VC justificado en estado estacionario: (ROE − g) / (Ke − g). Este es el valor intrínseco que manda. El DCF del motor se ha adaptado a flujo para el accionista (beneficio − retención para crecer con el CET1 objetivo; deuda y caja 0 en el puente; peso de la deuda 0, WACC = Ke) y solo sirve de comprobación.

## Coste del capital propio en reales

| Concepto | Hoy (26-oct) | Antes de las elecciones (23-oct) | Con la prima de Damodaran |
|---|---|---|---|
| Tasa libre: bono del Tesoro brasileño a 10 años en BRL | 15,44 % | 12,98 % | 15,44 % |
| Beta (ajustada; medida 1,11-1,19 frente a Ibovespa y EWZ) | 1,10 | 1,10 | 1,10 |
| Prima de mercado | 5,5 % | 5,5 % | 4,2 % |
| Prima país adicional | 0 (ya está en el bono en reales) | 0 | 0 |
| **Ke** | **21,49 %** | **19,03 %** | **20,06 %** |

El riesgo país ya está dentro del rendimiento del bono en reales: sumar 3 puntos encima, como hacía el escáner, lo contaría dos veces. Crecimiento terminal: 5,0 % nominal en BRL (IPCA de largo plazo del Focus, 3,5 %, más 1,5 de crecimiento real), entre la inflación y la tasa libre menos medio punto.

## Calidad: ROE recurrente − Ke (equivalente de ROIC − WACC)

| ROE recurrente | ROE | − Ke hoy (21,49 %) | − Ke pre-elecciones (19,03 %) |
|---|---|---|---|
| Ejercicio 2025 | 23,4 % | 1,91 | 4,37 |
| 1S26 anualizado | 24,5 % | 3,01 | 5,47 |

Regla del método: nunca por debajo de 4,5 puntos; ≥ 5 para comprar (niveles A y B1), 4,5-5 solo B2/C. **Con el Ke de hoy, Itaú queda entre 1,9 y 3,0 puntos: no pasa el suelo de 4,5 y no es comprable en ningún nivel.** Con el bono de antes de las elecciones quedaba en 4,4-5,5 (al filo). La conclusión depende más de la tasa libre brasileña que del banco.

## Supuestos del caso base (año 1 = jul-2026 a jun-2027)

| Año | VC inicial (R$) | ROE % | Exceso (ROE − Ke) × VC | Factor de descuento | VA del exceso | BPA implícito | Dividendo implícito | Crecimiento del VC % |
|---|---|---|---|---|---|---|---|---|
| 1 | 18,92 | 24,5 | 0,57 | 0,823 | 0,47 | 4,64 | 3,12 | 8,0 |
| 2 | 20,43 | 24,0 | 0,51 | 0,678 | 0,35 | 4,90 | 3,27 | 8,0 |
| 3 | 22,07 | 23,5 | 0,44 | 0,558 | 0,25 | 5,19 | 3,53 | 7,5 |
| 4 | 23,72 | 23,0 | 0,36 | 0,459 | 0,16 | 5,46 | 3,80 | 7,0 |
| 5 | 25,38 | 22,5 | 0,26 | 0,378 | 0,10 | 5,71 | 4,06 | 6,5 |
| 6 | 27,03 | 22,3 | 0,22 | 0,311 | 0,07 | 6,03 | 4,35 | 6,2 |
| 7 | 28,71 | 22,1 | 0,18 | 0,256 | 0,04 | 6,34 | 4,65 | 5,9 |
| 8 | 30,40 | 21,9 | 0,12 | 0,211 | 0,03 | 6,66 | 4,96 | 5,6 |
| 9 | 32,11 | 21,7 | 0,07 | 0,173 | 0,01 | 6,97 | 5,27 | 5,3 |
| 10 | 33,81 | 21,5 | 0,00 | 0,143 | 0,00 | 7,27 | 5,58 | 5,0 |

Terminal: VC del año 10 35,50 R$, ROE 21,5 %, exceso 0,00 R$, crecimiento 5,0 % → valor terminal 0,02 R$, VA 0,00 R$.

**Valor a 30-jun-2026: 18,92 (VC) + 1,48 (VA de los excesos de 10 años) + 0,00 (terminal) = 20,40 R$; llevado al 27-oct-2026: 21,74 R$ por acción** (4,02 USD por ADR), frente a 41,63 R$ de precio (-47,8 %).

## Escenarios (Ke de hoy)

| Escenario | Prob. | Supuesto | Valor (R$) | Valor (USD por ADR) | Frente al precio |
|---|---|---|---|---|---|
| Bajista | 25 % | coste del riesgo un 25-30 % mayor (ciclo de crédito tras el giro fiscal) y cartera que crece 2 puntos menos | 18,01 | 3,33 | -56,7 % |
| Base | 50 % | ROE recurrente del 24,5 % que baja medio punto al año hasta el 22,5 % y luego al 21,5 %; patrimonio al ritmo de la cartera (8 % → 5 %) | 21,74 | 4,02 | -47,8 % |
| Alcista | 25 % | el ROE se sostiene cerca del 25 % (eficiencia e IA) y la cartera crece 1 punto más | 23,86 | 4,41 | -42,7 % |
| **Ponderado** | | | **21,34** | **3,95** | **-48,7 %** |

## Sensibilidad al coste del capital

| Ke | Valor caso base (R$) | P/VC justificado (ROE 24 %, g 5 %) | Valor por P/VC (R$) |
|---|---|---|---|
| Hoy 21,49 % | 21,74 | 1,15x | 21,80 |
| Prima de Damodaran 20,06 % | 23,80 | 1,26x | 23,87 |
| Antes de las elecciones 19,03 % | 25,55 | 1,35x | 25,62 |
| 17,0 % | 29,88 | 1,58x | 29,96 |
| 15,0 % | 35,90 | 1,90x | 35,95 |
| 13,5 % | 42,29 | 2,24x | 42,29 |

**Qué descuenta el precio.** A 41,63 R$ el banco cotiza a 2,20 veces su valor contable. Con el caso base de ROE, el Ke que iguala el valor al precio es 13,63 %; con la fórmula de Gordon (ROE 24 %, g 5 %), 13,64 %. Es decir: el mercado descuenta un coste del capital **por debajo de la tasa libre de hoy** (15,44 %) e incluso de la de antes de las elecciones. O espera que los tipos en reales bajen mucho y por mucho tiempo (el Focus del 23-oct ve la Selic en 10 % desde 2028), o paga la calidad de Itaú con un Ke de banco de país estable. Con la regla del método (Ke constante con el bono de hoy), ningún banco brasileño con ROE del 24 % vale más de 1,2-1,4 veces su valor contable.

## Contraste con el DCF del motor

El motor solo sabe hacer un DCF de EBITDA. Se ha adaptado así: ingresos = margen financiero + comisiones + seguros netos de pérdidas esperadas (NIIF); «margen EBITDA» = beneficio antes de impuestos sin participadas sobre esos ingresos; impuestos + minoritarios ≈ 10 % (tipo efectivo NIIF con el JCP deducible); «capex» = retención necesaria para que el patrimonio crezca con la cartera y el CET1 se quede en el objetivo; circulante 0; deuda 0, caja 0 y minoritarios 0 en el puente; peso de la deuda 0 (WACC = Ke). Así el DCF es un descuento del flujo para el accionista y debe acercarse al modelo de exceso de rentabilidad. Su cifra se usa solo como comprobación; ROIC, EV/EBITDA, DN/EBITDA y circulante del motor no significan nada en un banco.

Calibración usada (notas/supuestos.mjs): el «margen EBITDA» de cada año es ROE × (patrimonio / ingresos de 2025 = 1,47) ÷ (1 + g) ÷ (1 − 9 %), de modo que el beneficio después de impuestos es el ROE del caso base por el patrimonio inicial; el «capex» es g × 1,47 ÷ (1 + g) de los ingresos, la retención que mantiene el patrimonio al ritmo de la cartera. **Resultado del motor: 22,55 R$ por acción en el caso base (16,79 bajista y 25,86 alcista)**, a menos de un 4 % del modelo de exceso de rentabilidad (21,74): las dos vías cuadran porque descuentan lo mismo (lo que el banco puede repartir) al mismo Ke. El valor terminal pesa solo el 26 % porque con un Ke del 21,5 % lo lejano casi no vale. El DCF tiene peso 0 en la síntesis; el valor intrínseco es el ponderado del modelo de exceso de rentabilidad (21,34 R$), que entra en el motor como una «parte» con valor directo (suma de partes al 100 %).

## Sensibilidad a la Selic y a la tasa libre

| Canal | Efecto de +1 punto | Lectura |
|---|---|---|
| Ke (tasa libre + 1 punto, Ke 22,49 %) | valor base de 21,74 a 20,50 R$ | El canal que domina: cada punto de tasa libre quita ≈ 6 % del valor |
| Ke (tasa libre − 1 punto, Ke 20,49 %) | valor base a 23,14 R$ | |
| Tasa libre de 13,5 % (Ke 19,55 %) | valor base a 24,63 R$ | Nivel aproximado de antes de las elecciones citado en el encargo; medido, el 23-oct estaba en 12,98 % |
| Margen del capital propio («working capital and other»: 137.357 M de saldo medio al 12,0 % en el 2T26) | ≈ +1.370 M antes de impuestos y ≈ +0,9 mil M después (≈ +1,8 % del resultado recurrente), antes de coberturas | Itaú cubre parte de ese capital a tipo fijo, así que el efecto real es menor (estimación propia) |
| Coste del crédito y demanda de crédito | negativo con retraso (particulares y pymes) | Una Selic alta más tiempo sube la morosidad de 15-90 días y frena la cartera |

Neto: una Selic más alta apenas mueve el beneficio de Itaú (el margen del capital propio compensa parte del coste del crédito), pero el método la castiga a fondo por el Ke. Por eso el valor intrínseco es sobre todo una apuesta sobre la tasa libre en reales, no sobre el banco.

## Regla a 12 meses (v3) con el BPA recurrente

BPA recurrente gerencial: 2026e 4,56 R$ (1S26 real 24.689 M + 2S ≈ 25.600 M), 2027e 4,91 y 2028e 5,25 (bajista 4,45, alcista 5,55). PER adelantado de B3 (cierre ÷ BPA del año siguiente; sin 2019 por la COVID): mediana de 5 años 6,8x, mínimo 6,4x, media larga 8,6x; PER actual 8,5x (41,63 ÷ 4,91). Base 7,7x (8,5 ÷ 1,1, tope), bajista 6,2x (base × 0,8), alcista 9,8x (mediana de los comparables). Resultado del motor: bajista 27,59, base 40,43 y alcista 54,39 R$; rentabilidad con dividendo (6,9 %) del +4,0 % en el base y del +4,7 % ponderada: **Mantener**, lejos del 15 % de compra. Y aunque llegara, el valor intrínseco (21,34) está muy por debajo del precio y la calidad no pasa el suelo.

