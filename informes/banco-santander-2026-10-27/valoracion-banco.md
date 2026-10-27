# Banco Santander: valoración bancaria (exceso de rentabilidad sobre el valor tangible, P/VTC justificado y Ke con prima por país)

Corte 27-oct-2026. Línea de compra: **SAN en la Bolsa de Madrid (EUR)**; también ADS SAN en la NYSE (1 ADS = 1 acción). Precio 11,154 €, cierre del 26-oct-2026 (−3,1 %). Base: **resultado y RoTE ordinarios** (sin la plusvalía de Polonia ni los costes de TSB) del Informe Financiero del 2T26, los que sigue el mercado. El 3T26 se publica mañana, 28-oct, antes de la apertura: este cálculo usa el 2T26/1S26. Generado por `notas/valoracion-banco.mjs`.

## Por qué este modelo y no el DCF de EBITDA

En un banco la deuda (depósitos, emisiones) es la materia prima: no hay EBITDA, capital invertido ni valor empresa con sentido. Valor para el accionista = valor contable tangible + valor actual de lo que el banco gane **por encima** de su coste del capital propio (Ke): VTC₀ + Σ (RoTEₜ − Ke) × VTCₜ₋₁ / (1 + Ke)ᵗ + terminal. Contraste: P/VTC justificado (RoTE − g) / (Ke − g). Mismo método que Itaú, BTG y Santander Brasil (27-oct). Se usa el valor **tangible** porque es el que publica el banco por acción y el que usa el mercado; el fondo de comercio de las compras (TSB, Webster) queda fuera del capital: por eso la calidad se da también con el RoE, que sí lo incluye.

## Valor contable tangible por acción de partida (30-jun-2026, con Webster)

TNAV por acción del 2T26: 6,32 € con 14.689 M de acciones. Webster se cerró el 20-ago-2026 (después del 2T26): 329,8 M de acciones nuevas a 10,7896 € (3559 M €) más 48,75 USD por acción en efectivo; el valor contable tangible de Webster era de 38,81 USD por acción (162,0 M de acciones). Fondo de comercio e intangibles nuevos ≈ 5005 M € (estimación propia, sin los ajustes de valor razonable de la compra). **VTC por acción pro forma: 6,08 €** (−0,24 €). La propia matriz estima que Webster resta ≈ 150 puntos básicos de CET1.

## Coste del capital propio en euros

| Concepto | Hoy | Sin prima país | Prima de mercado de Damodaran | Brasil con la subida del 26-oct |
|---|---|---|---|---|
| Tasa libre: Bund a 10 años (Bundesbank, 26-oct-2026) | 3,43 % | 3,43 % | 3,43 % | 3,43 % |
| Beta (medida: mensual a 5 años frente al STOXX 600, bolsa.mjs) | 1,24 | 1,24 | 1,24 | 1,24 |
| Prima de mercado | 5,5 % | 5,5 % | 4,2 % | 5,5 % |
| Prima por riesgo país ponderada (`prima_adicional_pct`) | 1,81 % | 0 | 1,81 % | 2,15 % |
| **Ke** | **12,06 %** | **10,25 %** | **10,45 %** | **12,40 %** |

La tasa libre en euros es el Bund, no el bono español (la sede no es dónde gana el dinero). El riesgo país va aparte, ponderado por el peso de cada país en el beneficio ordinario del 1S26, con la prima por país de Damodaran (actualización de enero de 2026, método por calificación soberana):

| País o negocio | Beneficio ordinario 1S26 (M €) | Peso | Prima país (Damodaran) | Aportación |
|---|---|---|---|---|
| España | 2534 | 32,3 % | 1,55 % | 0,50 |
| Reino Unido | 725 | 9,2 % | 0,78 % | 0,07 |
| Portugal | 471 | 6,0 % | 1,55 % | 0,09 |
| Openbank Europa (Alemania, España, Francia, Italia, nórdicos…) (estimación: media de la zona euro donde opera) | 253 | 3,2 % | 1,00 % | 0,03 |
| Estados Unidos | 989 | 12,6 % | 0,23 % | 0,03 |
| México | 897 | 11,4 % | 2,46 % | 0,28 |
| Brasil | 1093 | 13,9 % | 3,24 % | 0,45 |
| Chile | 469 | 6,0 % | 1,10 % | 0,07 |
| Argentina | 194 | 2,5 % | 9,71 % | 0,24 |
| Resto del grupo (estimación) | 229 | 2,9 % | 1,50 % | 0,04 |
| **Total (sin el centro corporativo, −525 M)** | **7854** | 100 % | | **1,81 %** |

Brasil pesa el 13,9 % del beneficio ordinario de los países en el 1S26 (cálculo propio con los segmentos secundarios; el encargo cita el 14,9 % del 1S26 y el 15,4 % de 2025, probablemente sobre otra base). Argentina pesa poco (2,5 %) pero, con una prima del 9,7 %, aporta casi tanto como México. España aporta 0,5 puntos con una prima de 1,55 (calificación A3); con la prima por CDS de Damodaran (0,47 %) la ponderada bajaría ≈ 0,4 puntos.

## Calidad: RoTE (y RoE) ordinario − Ke (equivalente de ROIC − WACC)

| Rentabilidad ordinaria | Valor | − Ke hoy (12,06 %) | − Ke sin prima país (10,25 %) |
|---|---|---|---|
| RoTE ordinario 2025 (reexpresado sin Polonia) | 15,2 % | 3,14 | 4,95 |
| RoTE ordinario 1S26 (16,0 % en el 2T26) | 15,6 % | 3,54 | 5,35 |
| RoE ordinario 1S26 (con el fondo de comercio) | 13,6 % | 1,54 | 3,35 |

Regla del método: nunca por debajo de 4,5 puntos; ≥ 5 para comprar (A y B1), 4,5-5 solo B2/C. **Con el Ke de hoy (prima país incluida) Banco Santander queda entre 3,14 y 3,54 puntos con el RoTE: no pasa el suelo de 4,5 y no es comprable en ningún nivel.** Sin la prima país pasaría (5,35 en el 1S26, 4,95 en 2025): la conclusión de calidad depende de esa prima, y la mantenemos porque el banco gana el 40 % de su beneficio en América Latina. Con el RoE (que incluye el fondo de comercio pagado por TSB, Webster y compras anteriores) no pasa en ningún caso. Con la prima de Brasil subida como su bono el 26-oct, el exceso baja a 3,20. El plan de 2028 (RoTE > 20 %) sí pasaría con holgura si se cumple.

## Supuestos del caso base (año 1 = jul-2026 a jun-2027)

| Año | VTC inicial (€) | RoTE % | Exceso (RoTE − Ke) × VTC | Factor de descuento | VA del exceso | BPA implícito | Reparto implícito | Crecimiento del VTC % |
|---|---|---|---|---|---|---|---|---|
| 1 | 6,08 | 16,0 | 0,240 | 0,892 | 0,214 | 0,973 | 0,547 | 7,0 |
| 2 | 6,51 | 16,8 | 0,308 | 0,796 | 0,246 | 1,093 | 0,638 | 7,0 |
| 3 | 6,96 | 17,5 | 0,379 | 0,711 | 0,269 | 1,218 | 0,766 | 6,5 |
| 4 | 7,41 | 18,0 | 0,440 | 0,634 | 0,279 | 1,334 | 0,890 | 6,0 |
| 5 | 7,86 | 18,0 | 0,467 | 0,566 | 0,264 | 1,414 | 0,982 | 5,5 |
| 6 | 8,29 | 17,5 | 0,451 | 0,505 | 0,228 | 1,451 | 1,036 | 5,0 |
| 7 | 8,70 | 17,0 | 0,430 | 0,451 | 0,194 | 1,480 | 1,088 | 4,5 |
| 8 | 9,10 | 17,0 | 0,449 | 0,402 | 0,181 | 1,546 | 1,183 | 4,0 |
| 9 | 9,46 | 16,5 | 0,420 | 0,359 | 0,151 | 1,561 | 1,230 | 3,5 |
| 10 | 9,79 | 16,5 | 0,435 | 0,320 | 0,139 | 1,616 | 1,322 | 3,0 |

Terminal: VTC del año 10 10,09 €, RoTE 16,5 %, exceso 0,448 €, crecimiento 3,0 % → valor terminal 4,94 €, VA 1,58 €.

**Valor a 30-jun-2026: 6,08 (VTC pro forma) + 2,16 (VA de los excesos de 10 años) + 1,58 (terminal) = 9,83 €; llevado al 27-oct-2026 (con el dividendo a cuenta de 0,127 € aún dentro): 10,20 € por acción**, frente a 11,154 € de precio (-8,6 %).

## Escenarios (Ke de hoy)

| Escenario | Prob. | Supuesto | Valor (€ por acción) | Frente al precio |
|---|---|---|---|---|
| Bajista | 25 % | el coste del riesgo sube (Brasil y México tras el 26-oct, consumo en EE. UU.), los tipos del BCE y del Banco de Inglaterra bajan y el RoTE se queda en el 13-15 % | 7,64 | -31,5 % |
| Base | 50 % | RoTE ordinario del 16 % en el primer año (15,6 % en el 1S26) que sube al 17,5-18 % con las sinergias de TSB y Webster, sin llegar al >20 % del plan de 2028; luego vuelve al 16,5 % | 10,20 | -8,6 % |
| Alcista | 25 % | se cumple el plan de 2028 (RoTE > 20 %, beneficio > 20.000 M) y el RoTE se queda en el 18-20 % | 12,16 | 9,1 % |
| **Ponderado** | | | **10,05** | **-9,9 %** |

## Sensibilidad al coste del capital

| Ke | Valor caso base (€) | P/VTC justificado (RoTE 17 %, g 3 %) | Valor por P/VTC (€) |
|---|---|---|---|
| Hoy 12,06 % | 10,20 | 1,55x | 9,40 |
| Sin prima país 10,25 % | 12,96 (ponderado 12,76) | 1,93x | 11,74 |
| Prima de Damodaran 10,45 % | 12,59 | 1,88x | 11,43 |
| Beta 1,0 10,74 % | 12,08 | 1,81x | 11,00 |
| Brasil tras el 26-oct 12,40 % | 9,80 | 1,49x | 9,06 |
| Ke + 1 punto (13,06 %) | 9,11 | 1,39x | 8,46 |
| Ke − 1 punto (11,06 %) | 11,57 | 1,74x | 10,56 |

**Qué descuenta el precio.** A 11,154 € la acción cotiza a 1,83 veces su VTC pro forma (1,76 veces el de junio sin Webster; el banco publicaba 1,91 veces a 12,084 € el 30-jun). Con el caso base de RoTE, el Ke que iguala el valor al precio es 11,34 %; con Gordon (RoTE 17 %, g 3 %), 10,63 %: el mercado le pone un coste del capital de ≈ 11,3 %, entre el Ke sin prima país (10,25 %) y el nuestro (12,06 %). Dicho de otro modo: el precio ya da por buena la mitad del camino al plan de 2028 o no cobra la prima por América Latina.

## La oferta de canje por Santander Brasil (efecto en el grupo)

Banco Santander anunció el 30-jul-2026 una oferta voluntaria de canje por el ≈ 10 % de Santander Brasil que no tiene: 0,4056 acciones nuevas de SAN por unit o ADR (≈ 0,4000 tras el JCP de octubre, estimación del informe de Santander Brasil), sin aceptación mínima, con una contraprestación de hasta 1.908 M € y **hasta el 1,1 % del capital** de SAN; neutra en el CET1 según la matriz. Registrada en la CVM, B3 y SEC (Form F-4) el 21-sep-2026; cierre esperado en el 1S27.

| Concepto | Valor |
|---|---|
| Units de minoritarios (10,1 % de 3.744 M) | 378 M |
| Acciones nuevas de SAN con aceptación total (× 0,4000) | **151 M (1,05 % de las ≈ 14.450 M en circulación)** |
| Beneficio ordinario que pasa al grupo (≈ 10,5 % del de la filial, con el 1S26 anualizado) | ≈ 256 M € al año |
| Efecto en el BPA (sobre un beneficio de ≈ 15.200 M en 2026e) | **+0,63 %** |
| Efecto en el CET1 | Neutro según la matriz (paga con acciones; los minoritarios de Brasil ya restaban poco capital) |

Lectura: SAN emite papel a ≈ 1,8 veces su VTC para comprar una filial que cotiza a ≈ 1,0 vez su valor contable: es acrecitiva en BPA (pequeña) y sube la exposición a Brasil del 89,5 % al ≈ 100 %, justo cuando el riesgo país brasileño sube. Si la aceptación es parcial, el efecto es proporcional. No cambia la valoración de forma material.

## Contraste con el DCF del motor

Igual que en los bancos brasileños: «ingresos» = margen bruto NIIF menos pérdidas por deterioro de activos financieros; «margen EBITDA» calibrado para que el beneficio después de impuestos sea RoTE ordinario × patrimonio tangible; «capex» = retención para que el capital crezca con el balance; amortización y circulante 0; deuda, caja y minoritarios 0; WACC = Ke. Es un descuento de dividendos y debe acercarse al modelo de exceso de rentabilidad. Peso 0 en la síntesis: el valor intrínseco es el ponderado del modelo bancario, que entra como «suma de partes» al 100 %.

## Sensibilidad a los tipos de interés

| Canal | Efecto | Lectura |
|---|---|---|
| Ke (tasa libre + 1 punto) | valor base de 10,20 a 9,11 € | Cada punto de Ke quita ≈ 11 % del valor |
| Margen de intereses | Más del 95 % de los ingresos ligados a la actividad con clientes; margen de intereses +7 % en el 1S26 con los tipos del BCE ya bajados, gracias a volúmenes (TSB) y a la gestión del balance; cartera de renta fija de 165.000 M con una duración de 1,9 años en la de disponible para la venta | La bajada de tipos en Europa ya pasó; en Brasil y México los tipos altos suben el margen pero también el coste del riesgo |
| Coste del riesgo | 1,15 % del crédito (12 meses); Brasil 4,14 %, Argentina 11,1 %, México 2,74 %, España 0,41 % | Un punto más de coste del riesgo en Brasil (100.000 M de crédito) resta ≈ 1.000 M antes de impuestos, ≈ 4 % del beneficio del grupo |

