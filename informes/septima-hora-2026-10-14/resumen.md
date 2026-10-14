# Séptima hora value (14-oct-2026): 16 análisis

Método vigente (`METODO-VIGENTE.md`): decide el selector (v3 con tope ×1,1 en 15 de 16; en Tyler decide v2 porque la empresa se ha desrateado: mediana de su PER adelantado 80,4x frente a 35,7x hoy); v2 es el control. Precios: cierres del 14-oct con `precios.mjs` y `apuntar-12m.mjs --precios --actual --simular` (sin cambios de señal frente a los informes). Robustez con `robustez.mjs` en las 16. Word y PDF de cada una en `informes/<empresa>-2026-10-14/`.

**Resultado: dos compras robustas, Aon y Hershey.** Aon ya está en la tabla del 15-oct (2 + 3 acciones ≤ 282,65 USD). Hershey es justa: pasa con los dos métodos hasta 164,49 USD, a 0,1 % del precio. Beiersdorf e Interpump dan Comprar con la regla pero son FRÁGILES (v2 no confirma). Propuestas en `cambios-propuestos.md`.

| Empresa | Precio (cierre 14-oct) | v3 pond. / base | v2 pond. / base | Valor intrínseco vs precio | ROIC − WACC · calidad | Robustez → acción | Comprar por debajo de | Resultados |
|---|---|---|---|---|---|---|---|---|
| **Aon** | 275,35 USD | +32,1 / +26,5 | +19,7 / +15,0 | +24,3 % | +7,6 · Sí | SÓLIDA → **Comprar** | **282,65** (los dos) | 28-oct |
| **Hershey** | 164,25 USD | +19,7 / +23,3 | +15,7 / +12,2 | +5,7 % | +7,75 · Sí | SÓLIDA → **Comprar (justa)** | **164,49** (los dos) | 29-oct |
| Beiersdorf | 81,00 EUR | +25,3 / +21,7 | +15,0 / +10,6 | +26,7 % | +14,5 · En parte | FRÁGIL → Mantener | 79,97 (los dos) | 27-oct |
| Interpump | 35,88 EUR | +20,4 / +18,8 | +9,0 / +7,5 | +14,7 % | +0,9 · No | FRÁGIL → No mantener | falla calidad | 13-nov |
| Stryker | 281,62 USD | +25,6 / +22,1 | +15,2 / +11,1 | −14,1 % | +1,9 · En parte | SÓLIDA → Mantener* | 241,89 | 29-oct |
| IDEXX | 529,01 USD | +21,2 / +20,3 | +13,1 / — | −49,9 % | +38 · Sí | SÓLIDA → No mantener | 260,83 | 3-nov |
| ResMed | 235,29 USD | +21,0 / +18,1 | +13,6 / +9,7 | −16,1 % | +18,4 · Sí | SÓLIDA → No mantener | 197,29 | 29-oct |
| Tyler (decide v2) | 350,11 USD | +31,2 (v3) | +19,3 / +19,4 | −28,4 % | −0,7 · No | SÓLIDA → No mantener | 248,39 | 28-oct |
| Graco | 80,48 USD | +12,8 / +18,5 | +7,3 / +7,9 | −22,9 % | +14,2 · Sí | SÓLIDA → No mantener | 62,09 | 21-oct |
| Sonova | 270,40 CHF | +9,7 / +17,0 | +9,4 / +11,7 | −5,6 % | +10,2 · Sí | FRÁGIL → No mantener | 255,13 | 17-nov |
| CPKC | 122,70 CAD | +9,3 / +14,5 | +10,2 / +10,8 | −17,5 % | −2,0 · No | SÓLIDA → No mantener | 101,19 | 28-oct |
| Daikin | 21.575 JPY | +8,8 / +13,5 | +7,4 / +8,8 | −22,4 % | +2,3 · No | SÓLIDA → No mantener | 16.735,69 | ≈5-nov |
| Colgate | 92,78 USD | +5,8 / +10,7 | +6,9 / +7,0 | −24 % | +36 · Sí | SÓLIDA → No mantener | 70,51 | ≈30-oct |
| AMETEK | 246,83 USD | +1,7 / +8,1 | +6,5 / +10,3 | −39,3 % | +3,5 · No | SÓLIDA → No mantener | 149,91 | ≈29-oct |
| Alfa Laval | 587,80 SEK | −2,1 / +5,6 | +6,3 / +11,4 | −26,7 % | +8,0 · En parte | SÓLIDA → No mantener | 430,84 | 27-oct |
| Sandvik | 365,00 SEK | −6,9 / −0,6 | −12,4 / −13,0 | −28 % | +1,8 · En parte | SÓLIDA → No mantener | 262,84 | 22-oct |

\* Stryker: la herramienta da «Mantener», pero con ROIC − WACC de 1,9 no pasa el filtro de calidad para mantener (4,5). Ninguna de las 16 está en cartera.

## El porqué de cada una

- **Aon.** El corredor con más margen y ROIC del sector, a 13,8x el BPA ajustado de 2027 (mediana de 5 años 21x), porque el mercado teme que la compra de USI (17.000 M a 22x EBITDA) destruya valor. El precio supone un crecimiento del 3,1 % anual; el orgánico va al 5 % pese a tarifas a la baja. El presidente compró 6,55 M USD el 2-sep. Riesgo: deuda ≈4,5x EBITDA y sin recompras hasta 2028; IA medio a 5 años en mediana empresa. Foros divididos.
- **Hershey.** Chocolate dominante en EE. UU. a 17,6x frente a 21,5x de mediana; el cacao a la mitad del pico devuelve margen (BPA ajustado 6,31 → 8,46 en 2026e → 10,15 en 2028e). Justa: con el BPA un 10 % más bajo pasa a Mantener. Riesgo: GLP-1, volumen y ventas del Hershey Trust. IA bajo. Frente a Lindt: más barata y con valor intrínseco sobre el precio, y cabe en la cartera (1 acción ≈147 EUR).
- **Beiersdorf.** NIVEA (56 % de las ventas) cae un 6,8 % en el 1S26 y ha rebajado la guía dos veces; Derma crece un 8 % y hay 4.045 M de caja neta. El BPA de 2028 es casi el de 2025: toda la subida es vuelta del múltiplo, y por eso v2 no confirma. Vigilar por debajo de 79,97 EUR si el 27-oct no rebaja la guía.
- **Interpump.** Barata (15,1x frente a 21,8x) y la hidráulica vuelve a crecer, pero el ROIC apenas cubre el WACC por el fondo de comercio de sus compras (15,2 % sin él) y v2 da +9 %.
- **Stryker.** Orgánico +9 % intacto, pero cotiza en mínimos de una década por el ciberataque, el suministro de Inari y el relevo del CEO. Comprador en serie: el ROIC publicado queda 1,9 puntos sobre el WACC (27,7 % sin fondo de comercio). Valor intrínseco 14 % bajo el precio.
- **IDEXX.** Calidad excepcional (ROIC − WACC +38), recurrente de diagnóstico +9,7 %, 31,7x en mínimos de su historia; pero el DCF con el bono a 5,2 % la deja a la mitad del precio.
- **ResMed.** Líder del CPAP en su PER más bajo en 10 años; tres amenazas (GLP-1 a 3-5 años, vuelta de Philips a EE. UU., aranceles) y valor intrínseco 16 % bajo el precio.
- **Tyler.** Software para administraciones, BPA +15-20 % al año, pero cara frente a su valor intrínseco y el ROIC publicado no cubre el WACC por el fondo de comercio. IA bajo en los sistemas de registro, medio en atención y pagos.
- **Graco.** Calidad alta (+14,2), pero la mitad depende de la vivienda de EE. UU. con la hipoteca al 7,4 %, tres años sin crecer orgánicamente y compras más caras.
- **Sonova.** Más calidad que Demant, pero el caso bajista (−31 %, vuelta a 16,7x) pesa y el ROIC de lo invertido desde 2022 es negativo. IA: poco probable, pero de impacto alto (auriculares que hacen de audífono).
- **CPKC.** Las sinergias de KCS ya están en los márgenes; el crecimiento depende de México (aranceles, T-MEC) y ya está pagado. Calidad No por el fondo de comercio de KCS.
- **Daikin.** El precio ya descuenta que el plan FUSION 30 cumple su margen; calidad 2,3 puntos y valor intrínseco 22 % bajo el precio. Además, el lote mínimo de 100 acciones cuesta ≈12.160 EUR: no cabe.
- **Colgate.** 41 % de cuota mundial en pasta de dientes y Hill's, pero con un orgánico de 1-4 % y el bono al 5,2 % el DCF no llega; Hill's frena y Norteamérica pierde volumen.
- **AMETEK.** Nichos de precisión con pedidos +28 %, pero a 31,4x y tras la mayor compra de su historia (Indicor, 14x EBITDA) con deuda en lo alto del ciclo.
- **Alfa Laval.** Ciclo marino en máximos de 17 años; los centros de datos y el GNL ya están en el precio (24,8x frente a 22,3x).
- **Sandvik.** En el pico de sus dos ciclos (minería 61 %, corte 39 %), con un efecto temporal del precio del tungsteno que infla el beneficio; v2 da Vender.

Puntos de método de esta hora: `puntos-metodo.md`.
