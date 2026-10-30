# Banco Santander: valoración bancaria (exceso de rentabilidad sobre el valor tangible, P/VTC justificado y Ke con prima por país)

Corte 30-oct-2026 (iteración 2; la anterior es del 27-oct, antes del 3T26). Línea de compra: **SAN en la Bolsa de Madrid (EUR)**; también ADS SAN en la NYSE (1 ADS = 1 acción). Precio 10,512 €, cierre del 29-oct-2026, ya sin el dividendo a cuenta (ex el 29-oct); la sesión del 30-oct sigue abierta (≈ 10,2 €). Base: **resultado y RoTE ordinarios** (sin la plusvalía de Polonia ni los costes de integración de TSB y Webster) del Informe Financiero del 3T26 (28-oct-2026), los que sigue el mercado. Generado por `notas/valoracion-banco.mjs`.

## Qué cambia frente al 27-oct

| Dato | 27-oct (1S26) | 30-oct (9M26) |
|---|---|---|
| Precio | 11,154 € (26-oct, con el dividendo de 0,127 € dentro) | 10,512 € (29-oct, sin él) |
| VTC por acción de partida | 6,08 € (jun-2026 + Webster, estimado) | **5,92 € (sep-2026, publicado, ya neto del dividendo a cuenta)** |
| RoTE ordinario | 15,6 % (1S26) | 16,0 % (9M26); 16,8 % en el 3T26 |
| CET1 | 14,0 % (jun, antes de Webster) | 12,7 % (sep; −147 p.b. por Webster) |
| Tasa libre y beta | Bund 3,43 %, beta 1,24 | Bund 3,42 % (29-oct), beta 1,20 (bolsa.mjs) |
| Prima país ponderada | 1,81 % (pesos del 1S26) | 1,81 % (pesos de 9M26) |

## Por qué este modelo y no el DCF de EBITDA

En un banco la deuda (depósitos, emisiones) es la materia prima: no hay EBITDA, capital invertido ni valor empresa con sentido. Valor para el accionista = valor contable tangible + valor actual de lo que el banco gane **por encima** de su coste del capital propio (Ke): VTC₀ + Σ (RoTEₜ − Ke) × VTCₜ₋₁ / (1 + Ke)ᵗ + terminal. Contraste: P/VTC justificado (RoTE − g) / (Ke − g). Mismo método que Itaú, BTG y Santander Brasil (27-oct). Se usa el valor **tangible** porque es el que publica el banco por acción y el que usa el mercado; el fondo de comercio de las compras (TSB, Webster) queda fuera del capital: por eso la calidad se da también con el RoE, que sí lo incluye.

## Valor contable tangible por acción de partida (30-sep-2026)

TNAV por acción del 3T26: **5,92 €** (6,32 € en junio; −6 % en el trimestre por Webster, cerrada el 20-ago con 329,8 M de acciones nuevas y 7.089 M € en efectivo), con 14.556 M de acciones. Con los dividendos en efectivo, +11 % interanual. La iteración anterior lo estimaba en 6,08 € pro forma: el dato real es 0,16 € más bajo (el dividendo a cuenta de 0,127 € ya restado, más fondo de comercio de Webster del estimado y la recompra a ≈ 2 veces el VTC). Acciones hoy: 14.406 M (se restan las 150,6 M de la recompra de 1.825 M terminada el 28-oct).

## Coste del capital propio en euros

| Concepto | Hoy | Sin prima país | Prima de mercado de Damodaran | Brasil con la subida del 26-oct |
|---|---|---|---|---|
| Tasa libre: Bund a 10 años (Bundesbank, 29-oct-2026) | 3,42 % | 3,42 % | 3,42 % | 3,42 % |
| Beta (medida: mensual a 5 años frente al STOXX 600, bolsa.mjs) | 1,20 | 1,20 | 1,20 | 1,20 |
| Prima de mercado | 5,5 % | 5,5 % | 4,2 % | 5,5 % |
| Prima por riesgo país ponderada (`prima_adicional_pct`) | 1,81 % | 0 | 1,81 % | 2,14 % |
| **Ke** | **11,83 %** | **10,02 %** | **10,27 %** | **12,16 %** |

La tasa libre en euros es el Bund, no el bono español (la sede no es dónde gana el dinero). El riesgo país va aparte, ponderado por el peso de cada país en el beneficio ordinario de 9M26, con la prima por país de Damodaran (actualización de enero de 2026, método por calificación soberana):

| País o negocio | Beneficio ordinario 9M26 (M €) | Peso | Prima país (Damodaran) | Aportación |
|---|---|---|---|---|
| España | 3695 | 30,7 % | 1,55 % | 0,48 |
| Reino Unido | 1282 | 10,6 % | 0,78 % | 0,08 |
| Portugal | 712 | 5,9 % | 1,55 % | 0,09 |
| Openbank Europa (Alemania, España, Francia, Italia, nórdicos…) (estimación: media de la zona euro donde opera) | 516 | 4,3 % | 1,00 % | 0,04 |
| Estados Unidos | 1514 | 12,6 % | 0,23 % | 0,03 |
| México | 1402 | 11,6 % | 2,46 % | 0,29 |
| Brasil | 1596 | 13,3 % | 3,24 % | 0,43 |
| Chile | 648 | 5,4 % | 1,10 % | 0,06 |
| Argentina | 341 | 2,8 % | 9,71 % | 0,27 |
| Resto del grupo (estimación) | 335 | 2,8 % | 1,50 % | 0,04 |
| **Total (sin el centro corporativo, −865 M)** | **12.041** | 100 % | | **1,81 %** |

Brasil pesa el 13,3 % del beneficio ordinario de los países en 9M26 (13,9 % en el 1S26). Argentina pesa poco (2,8 %) pero, con una prima del 9,7 %, aporta casi tanto como México. España aporta ≈ 0,5 puntos con una prima de 1,55 (calificación A3); con la prima por CDS de Damodaran (0,47 %) la ponderada bajaría ≈ 0,3 puntos.

## Calidad: RoTE (y RoE) ordinario − Ke (equivalente de ROIC − WACC)

| Rentabilidad ordinaria | Valor | − Ke hoy (11,83 %) | − Ke sin prima país (10,02 %) |
|---|---|---|---|
| RoTE ordinario 2025 (reexpresado sin Polonia) | 15,2 % | 3,37 | 5,18 |
| **RoTE ordinario 9M26** | **16,0 %** | **4,17** | 5,98 |
| RoTE ordinario del 3T26 (un trimestre) | 16,8 % | 4,97 | 6,78 |
| RoE ordinario 9M26 (con el fondo de comercio) | 13,7 % | 1,87 | 3,68 |

Regla del método: nunca por debajo de 4,5 puntos; ≥ 5 para comprar (A y B1), 4,5-5 solo B2/C. **Con el Ke de hoy (prima país incluida) Banco Santander queda en 4,17 puntos con el RoTE de 9M26 (3,37 en 2025): mejora frente al 27-oct (3,5), pero sigue sin pasar el suelo de 4,5 y no es comprable en ningún nivel.** Solo el 3T26 aislado (16,8 %) daría 4,97: un trimestre no basta; si el 4T26 repite ese nivel, el año cerraría en ≈ 16,2 % (≈ 4,37 puntos), aún por debajo. Con la beta anterior (1,24) el exceso sería 3,95. Sin la prima país pasaría (5,98): la conclusión de calidad depende de esa prima, y la mantenemos porque el banco gana ≈ 34 % de su beneficio en América Latina. Con el RoE no pasa en ningún caso. Con la prima de Brasil subida como su bono el 26-oct, el exceso baja a 3,84. Pasaría con un RoTE ordinario anual de ≈ 16,3 %: el plan de 2028 (> 20 %) lo daría con holgura si se cumple.

## Supuestos del caso base (año 1 = oct-2026 a sep-2027)

| Año | VTC inicial (€) | RoTE % | Exceso (RoTE − Ke) × VTC | Factor de descuento | VA del exceso | BPA implícito | Reparto implícito | Crecimiento del VTC % |
|---|---|---|---|---|---|---|---|---|
| 1 | 5,92 | 16,5 | 0,276 | 0,894 | 0,247 | 0,977 | 0,562 | 7,0 |
| 2 | 6,33 | 17,0 | 0,327 | 0,800 | 0,262 | 1,077 | 0,633 | 7,0 |
| 3 | 6,78 | 17,5 | 0,384 | 0,715 | 0,275 | 1,186 | 0,746 | 6,5 |
| 4 | 7,22 | 18,0 | 0,445 | 0,639 | 0,285 | 1,299 | 0,866 | 6,0 |
| 5 | 7,65 | 18,0 | 0,472 | 0,572 | 0,270 | 1,377 | 0,956 | 5,5 |
| 6 | 8,07 | 17,5 | 0,458 | 0,511 | 0,234 | 1,413 | 1,009 | 5,0 |
| 7 | 8,48 | 17,0 | 0,438 | 0,457 | 0,200 | 1,441 | 1,059 | 4,5 |
| 8 | 8,86 | 17,0 | 0,458 | 0,409 | 0,187 | 1,506 | 1,151 | 4,0 |
| 9 | 9,21 | 16,5 | 0,430 | 0,366 | 0,157 | 1,520 | 1,198 | 3,5 |
| 10 | 9,53 | 16,5 | 0,445 | 0,327 | 0,146 | 1,573 | 1,287 | 3,0 |

Terminal: VTC del año 10 9,82 €, RoTE 16,5 %, exceso 0,459 €, crecimiento 3,0 % → valor terminal 5,19 €, VA 1,70 €.

**Valor a 30-sep-2026: 5,92 (VTC) + 2,26 (VA de los excesos de 10 años) + 1,70 (terminal) = 9,88 €; llevado al 29-oct-2026: 9,97 € por acción**, frente a 10,512 € de precio (-5,2 %).

## Escenarios (Ke de hoy)

| Escenario | Prob. | Supuesto | Valor (€ por acción) | Frente al precio |
|---|---|---|---|---|
| Bajista | 25 % | el coste del riesgo sube (Brasil y México tras el 26-oct, consumo en EE. UU.), los tipos del BCE y del Banco de Inglaterra bajan y el RoTE se queda en el 13-15 % | 7,46 | -29,0 % |
| Base | 50 % | RoTE ordinario del 16,5 % en el primer año (16,0 % en 9M26 y 16,8 % en el 3T26) que sube al 17,5-18 % con las sinergias de TSB y Webster, sin llegar al >20 % del plan de 2028; luego vuelve al 16,5 % | 9,97 | -5,2 % |
| Alcista | 25 % | se cumple el plan de 2028 (RoTE > 20 %, beneficio > 20.000 M) y el RoTE se queda en el 18-20 % | 11,89 | 13,1 % |
| **Ponderado** | | | **9,82** | **-6,6 %** |

## Sensibilidad al coste del capital

| Ke | Valor caso base (€) | P/VTC justificado (RoTE 17 %, g 3 %) | Valor por P/VTC (€) |
|---|---|---|---|
| Hoy 11,83 % | 9,97 | 1,59x | 9,39 |
| Sin prima país 10,02 % | 12,79 (ponderado 12,60) | 1,99x | 11,81 |
| Prima de Damodaran 10,27 % | 12,32 | 1,93x | 11,40 |
| Beta 1,0 10,73 % | 11,52 | 1,81x | 10,72 |
| Brasil tras el 26-oct 12,16 % | 9,58 | 1,53x | 9,05 |
| Ke + 1 punto (12,83 %) | 8,86 | 1,42x | 8,43 |
| Ke − 1 punto (10,83 %) | 11,36 | 1,79x | 10,58 |

**Qué descuenta el precio.** A 10,512 € la acción cotiza a 1,78 veces su VTC de septiembre (el banco publicaba 2,08 veces a 12,328 € el 30-sep). Con el caso base de RoTE, el Ke que iguala el valor al precio es 11,41 %; con Gordon (RoTE 17 %, g 3 %), 10,88 %: el mercado le pone un coste del capital de ≈ 11,4 %, entre el Ke sin prima país (10,02 %) y el nuestro (11,83 %).

## La oferta de canje por Santander Brasil (efecto en el grupo)

Banco Santander anunció el 30-jul-2026 una oferta voluntaria de canje por el ≈ 10 % de Santander Brasil que no tiene: 0,4056 acciones nuevas de SAN por unit o ADR (≈ 0,4000 tras el JCP de octubre, estimación del informe de Santander Brasil), sin aceptación mínima, con una contraprestación de hasta 1.908 M € y **hasta el 1,1 % del capital** de SAN; neutra en el CET1 según la matriz. Registrada en la CVM, B3 y SEC (Form F-4) el 21-sep-2026; necesita la aprobación de la junta de SAN para la ampliación; cierre esperado en el 1S27.

| Concepto | Valor |
|---|---|
| Units de minoritarios (10,1 % de 3.744 M) | 378 M |
| Acciones nuevas de SAN con aceptación total (× 0,4000) | **151 M (1,05 % de las 14.406 M en circulación)** |
| Beneficio ordinario que pasa al grupo (≈ 10,5 % del de la filial, con 9M26 anualizado) | ≈ 250 M € al año |
| Efecto en el BPA (sobre un beneficio de ≈ 15.200 M en 2026e) | **+0,59 %** |
| Efecto en el CET1 | Neutro según la matriz (paga con acciones; los minoritarios de Brasil ya restaban poco capital) |

Lectura: SAN emite papel a ≈ 1,8 veces su VTC para comprar una filial que cotiza a ≈ 1,0 vez su valor contable: es acrecitiva en BPA (pequeña) y sube la exposición a Brasil del 89,5 % al ≈ 100 %, justo cuando el riesgo país brasileño sube. Santander Brasil no cumplió el consenso en el 3T26 (29-oct). No cambia la valoración de forma material.

## Contraste con el DCF del motor

Igual que en los bancos brasileños: «ingresos» = margen bruto NIIF menos pérdidas por deterioro de activos financieros; «margen EBITDA» calibrado para que el beneficio después de impuestos sea RoTE ordinario × patrimonio tangible; «capex» = retención para que el capital crezca con el balance; amortización y circulante 0; deuda, caja y minoritarios 0; WACC = Ke. Es un descuento de dividendos y debe acercarse al modelo de exceso de rentabilidad. Peso 0 en la síntesis: el valor intrínseco es el ponderado del modelo bancario, que entra como «suma de partes» al 100 %.

## Sensibilidad a los tipos de interés

| Canal | Efecto | Lectura |
|---|---|---|
| Ke (tasa libre + 1 punto) | valor base de 9,97 a 8,86 € | Cada punto de Ke quita ≈ 11 % del valor |
| Margen de intereses | ≈ 95 % de los ingresos ligados a la actividad con clientes; margen de intereses de 34.614 M en 9M26 (+10 %; +7 % sin compras) y 11.903 M en el 3T26 (+1,8 % en el trimestre) | La bajada de tipos en Europa ya pasó; en Brasil y México los tipos altos suben el margen pero también el coste del riesgo |
| Coste del riesgo | 1,16 % del crédito (12 meses); Brasil 4,25 %, Argentina 10,80 %, México 2,73 %, EE. UU. 1,39 %, España 0,43 % | Un punto más de coste del riesgo en Brasil (≈ 100.000 M de crédito) resta ≈ 1.000 M antes de impuestos, ≈ 4 % del beneficio del grupo |

