# Santander Brasil: valoración bancaria (exceso de rentabilidad, P/VC justificado y oferta de canje)

Corte 27-oct-2026. Línea de compra: **unit SANB11 en B3 (BRL)**, 1 unit = 1 ordinaria + 1 preferente (acta del consejo del 9-oct-2026). Precio 26,30 BRL, cierre del 26-oct-2026 (−4,47 %). El ADR BSBR sigue cotizando en la NYSE (1 ADR = 1 unit; 4,82 USD el 26-oct) y el banco sigue registrado en la SEC (20-F 2025 presentado el 27-feb-2026): no se ha deslistado. Base contable: **BR GAAP gerencial** (resultado gerencial recurrente y patrimonio del Informe de Resultados del 2T26), la que sigue el mercado; el ROE recurrente del banco excluye el fondo de comercio (1.746 M). Las cuentas NIIF de la CVM se usan para la serie histórica del informe Word. Generado por `notas/valoracion-banco.mjs`.

## Por qué este modelo y no el DCF de EBITDA

En un banco la deuda (depósitos, emisiones) es la materia prima: no hay EBITDA, capital invertido ni valor empresa con sentido. Valor para el accionista = valor contable + valor actual de lo que el banco gane **por encima** de su coste del capital propio (Ke): VC₀ + Σ (ROEₜ − Ke) × VCₜ₋₁ / (1 + Ke)ᵗ + terminal. Contraste: P/VC justificado (ROE − g) / (Ke − g). Mismo método y misma tasa libre que Itaú y BTG (27-oct) para que las cifras se puedan comparar. **Si el ROE queda por debajo del Ke, el banco vale menos que su valor contable**, que es lo que pasa aquí.

## Coste del capital propio en reales

| Concepto | Hoy (26-oct) | Antes de las elecciones (23-oct) | Con la prima de Damodaran |
|---|---|---|---|
| Tasa libre: bono del Tesoro brasileño a 10 años en BRL | 15,435 % | 12,98 % | 15,435 % |
| Beta (medida 0,97-0,99 mensual a 5 años y 0,84 semanal frente a BOVA11; se usa 1,0) | 1,00 | 1,00 | 1,00 |
| Prima de mercado | 5,5 % | 5,5 % | 4,2 % |
| Prima país adicional | 0 (ya está en el bono en reales) | 0 | 0 |
| **Ke** | **20,94 %** | **18,48 %** | **19,64 %** |

El riesgo país ya está dentro del rendimiento del bono en reales: sumar 3 puntos encima, como hacía el escáner, lo contaría dos veces. Con la tasa libre de ≈ 13,5 % que cita el encargo, Ke 19,00 %. Crecimiento terminal: 5,0 % nominal en BRL (IPCA de largo plazo del Focus, 3,5 %, + 1,5 real).

## Calidad: ROE recurrente − Ke (equivalente de ROIC − WACC)

| ROE recurrente (BR GAAP, sin fondo de comercio) | ROE | − Ke hoy (20,94 %) | − Ke pre-elecciones (18,48 %) |
|---|---|---|---|
| Ejercicio 2025 (media de los cuatro trimestres: 17,5 / 16,4 / 17,5 / 17,6) | 17,3 % | -3,64 | -1,18 |
| 1S26 (16,0 % en el 1T26 y 12,5 % en el 2T26) | 14,3 % | -6,64 | -4,18 |

Regla del método: nunca por debajo de 4,5 puntos; ≥ 5 para comprar (A y B1), 4,5-5 solo B2/C. **Santander Brasil queda entre -3,64 y -6,64 puntos con el Ke de hoy, y entre -1,18 y -4,18 con el de antes de las elecciones: no pasa en ningún caso y no es comprable en ningún nivel.** A diferencia de Itaú (al filo con el bono anterior), aquí la conclusión no depende de la tasa libre: el ROE del banco no cubre ni la tasa libre más la prima con un bono del 13 %. El ROIC NIIF del motor (patrimonio NIIF con el fondo de comercio de Banco Real) sale aún más bajo.

## Supuestos del caso base (año 1 = jul-2026 a jun-2027)

| Año | VC inicial (R$) | ROE % | Exceso (ROE − Ke) × VC | Factor de descuento | VA del exceso | BPA implícito | Dividendo implícito | Crecimiento del VC % |
|---|---|---|---|---|---|---|---|---|
| 1 | 25,77 | 13,5 | -1,92 | 0,827 | -1,59 | 3,48 | 1,93 | 6,0 |
| 2 | 27,32 | 14,5 | -1,76 | 0,684 | -1,20 | 3,96 | 2,19 | 6,5 |
| 3 | 29,09 | 15,5 | -1,58 | 0,565 | -0,89 | 4,51 | 2,62 | 6,5 |
| 4 | 30,98 | 16,0 | -1,53 | 0,467 | -0,72 | 4,96 | 2,94 | 6,5 |
| 5 | 33,00 | 16,5 | -1,47 | 0,387 | -0,57 | 5,44 | 3,46 | 6,0 |
| 6 | 34,98 | 16,5 | -1,55 | 0,320 | -0,50 | 5,77 | 3,67 | 6,0 |
| 7 | 37,07 | 16,8 | -1,53 | 0,264 | -0,41 | 6,23 | 4,19 | 5,5 |
| 8 | 39,11 | 17,0 | -1,54 | 0,218 | -0,34 | 6,65 | 4,50 | 5,5 |
| 9 | 41,27 | 17,0 | -1,63 | 0,181 | -0,29 | 7,02 | 4,95 | 5,0 |
| 10 | 43,33 | 17,0 | -1,71 | 0,149 | -0,26 | 7,37 | 5,20 | 5,0 |

Terminal: VC del año 10 45,50 R$, ROE 17,0 %, exceso -1,79 R$, crecimiento 5,0 % → valor terminal -11,25 R$, VA -1,68 R$.

**Valor a 30-jun-2026: 25,77 (VC) − 6,75 (VA de los excesos de 10 años) − 1,68 (terminal) = 17,34 R$; llevado al 27-oct-2026 y sin el JCP de 0,40 R$ ya descontado: 18,05 R$ por unit**, frente a 26,30 R$ de precio (-31,4 %).

## Escenarios (Ke de hoy)

| Escenario | Prob. | Supuesto | Valor (R$ por unit) | Frente al precio |
|---|---|---|---|---|
| Bajista | 25 % | coste del crédito que se queda en el 4,2-4,5 % de la cartera con la Selic alta más tiempo (ROE del 10,5-14 %) y cartera que crece 1,5 puntos menos | 13,48 | -48,7 % |
| Base | 50 % | ROE recurrente del 13,5 % en el primer año (2S26-1S27), que vuelve al 16-17 % en tres-cinco años (su nivel de 2024-2025, 17,3 %); patrimonio +6-6,5 % → 5 % | 18,05 | -31,4 % |
| Alcista | 25 % | la Selic baja desde 2027, el coste del crédito vuelve al 3,5 % y el ROE recupera el 17,5-19 % (el 21 % de 2021 no se repite) | 21,47 | -18,4 % |
| **Ponderado** | | | **17,76** | **-32,5 %** |

## Sensibilidad al coste del capital

| Ke | Valor caso base (R$) | P/VC justificado (ROE 16 %, g 5 %) | Valor por P/VC (R$) |
|---|---|---|---|
| Hoy 20,94 % | 18,05 | 0,69x | 17,78 |
| Prima de Damodaran 19,64 % | 19,85 | 0,75x | 19,36 |
| Antes de las elecciones 18,48 % | 21,76 | 0,82x | 21,03 |
| Tasa libre del 13,5 % (Ke 19,00 %) | 20,86 | 0,79x | 20,25 |
| 16,0 % | 27,24 | 1,00x | 25,77 |
| 14,0 % | 33,93 | 1,22x | 31,50 |

**Qué descuenta el precio.** A 26,30 R$ la unit cotiza a 1,02 veces su valor contable BR GAAP. Con el caso base de ROE, el Ke que iguala el valor al precio es 16,36 %; con Gordon (ROE 16 %, g 5 %), 15,78 %: el precio pide un coste del capital igual a la tasa libre (15,435 %) sin prima de riesgo. Pero el precio de hoy **no lo fija el negocio sino la oferta de canje** (siguiente apartado).

## La oferta de canje de la matriz: lo que de verdad fija el precio

Banco Santander, S.A. (89,53 % del capital) anunció el 30-jul-2026 una oferta voluntaria de canje por el ≈ 10 % que no tiene: **0,4056 acciones nuevas de Banco Santander por unit o ADR** (0,2028 por acción), en BDR en B3 o en ADS en la NYSE, sin aceptación mínima y sin buscar la exclusión de bolsa; prima del 15 % sobre el cierre de 25,25 R$ del 30-jul (29,04 R$ por unit al anunciarla). El ratio baja con los JCP y dividendos de Santander Brasil y sube con los dividendos de Banco Santander con fecha de registro antes del fin de la oferta. Se presentó a la CVM, B3 y SEC (Form F-4) el 21-sep-2026 con el laudo de UBS BB; la matriz espera cerrarla en el 1S27.

| Concepto | Valor |
|---|---|
| Ratio ajustado por el JCP de 0,401 R$ (registro 20-oct) | 0,4000 acciones SAN por unit (estimación propia: 4,97 € − 0,401 R$ ÷ 5,637 = 4,8989 €, ÷ 12,248 €) |
| SAN en Madrid, cierre del 26-oct | 11,154 € (−3,1 % en el día; 11,51 € el 23-oct) |
| Valor de la oferta por unit el 26-oct (EUR/BRL 6,0345 de Yahoo) | **26,92 R$** |
| Ídem con la PTAX del euro del 26-oct (6,1487) | 27,43 R$ |
| Precio de SANB11 el 26-oct | 26,30 R$ (descuento del 2,3 % al 4,1 %) |

Lectura: la unit cotiza como un derivado de la acción de la matriz por el tipo de cambio, con un descuento pequeño por plazo (hasta el 1S27) y riesgo de que la oferta no se cierre. Por eso cayó solo un 4,5 % el 26-oct, mientras Itaú caía un 13 % y Bradesco un 21 %: el real se depreció ≈ 7-9 % frente al euro y eso **subió** el valor en reales de la contraprestación, que compensó la caída de SAN (−3,1 %). Mientras la oferta siga viva, el valor intrínseco del banco (17,76 R$) es un suelo teórico muy lejano y el «techo» práctico es el valor de canje.

## Contraste con el DCF del motor

Igual que en Itaú: «ingresos» = ingresos operativos NIIF netos de pérdidas por deterioro (39.835 M en 2025); «margen EBITDA» calibrado para que el beneficio después de impuestos sea ROE BR GAAP × patrimonio BR GAAP (patrimonio / ingresos = 2,47); impuestos del 20 %; «capex» = retención para que el patrimonio crezca con la cartera; amortización y circulante 0; deuda, caja y minoritarios 0; WACC = Ke. Es un descuento de dividendos y debe acercarse al modelo de exceso de rentabilidad. Peso 0 en la síntesis: el valor intrínseco es el ponderado del modelo bancario, que entra como «suma de partes» al 100 %.

## Sensibilidad a la Selic y a la tasa libre

| Canal | Efecto de +1 punto | Lectura |
|---|---|---|
| Ke (tasa libre + 1 punto) | valor base de 18,05 a 16,86 R$ | Cada punto de tasa libre quita ≈ 7 % del valor |
| Ke (tasa libre − 1 punto) | valor base a 19,40 R$ | |
| Margen financiero | Santander Brasil es **pasivo-sensible**: el margen con el mercado fue de −718 M en el 2T26 y −1.486 M en el 4T25 por el coste de la financiación de la cartera de títulos y de la cartera a tipo fijo; en 2025 la subida de la Selic restó margen («sensibilidad negativa al aumento de la tasa de interés», 4T25) | Una Selic alta más tiempo tras las elecciones retrasa la recuperación del margen con el mercado |
| Coste del crédito | Ya en el 3,81 % de la cartera (12 meses) y subiendo; PDD del 2T26 +20,6 % en el trimestre por pymes, agro, segmento masivo y casos de mayorista | Es el canal que más pesa en el ROE |

Neto: a diferencia de Itaú (activo-sensible por su capital propio), una Selic más alta perjudica a Santander Brasil en el margen y en el coste del riesgo, y además el método la castiga en el Ke.

