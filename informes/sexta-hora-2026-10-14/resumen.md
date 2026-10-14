# Sexta hora value (14-oct-2026): 16 análisis

Método vigente (`METODO-VIGENTE.md`): decide el selector (en las 16, «sin marcas» → v3 con tope ×1,1); v2 es el control. Precios revisados a las 18:24 UTC con `precios.mjs` y `apuntar-12m.mjs --precios --actual --simular` (EE. UU. en sesión; Europa al cierre del 14-oct). Robustez con `robustez.mjs` en las 16. Word y PDF de cada una en `informes/<empresa>-2026-10-14/`.

**Resultado: ninguna de las 16 es compra robusta hoy.** Cuatro dan Comprar con la regla (LSEG, Marsh, Roper, Lindt), pero las cuatro son FRÁGILES: v2 no confirma. Solo Marsh entra en la lista de espera (abajo).

| Empresa | Precio (hora) | v3 pond. / base | v2 pond. / base | Valor intrínseco vs precio | ROIC − WACC · calidad | Señal | Robustez → acción | Comprar por debajo de | Resultados |
|---|---|---|---|---|---|---|---|---|---|
| Lindt (LISP) | 7.840 CHF (cierre) | +27,1 / +21,9 | +15,5 / +11,1 | 0 % | +7,7 · Sí | Mantener (baja) | FRÁGIL → Mantener | 7.775,57 (los dos) | 19-ene |
| LSEG | 83,98 GBP (cierre) | +25,8 / +22,1 | +14,5 / — | +11,6 % | −3,0 · En parte | Mantener (baja) | FRÁGIL → Mantener | 83,34 (los dos), pero falla calidad | 22-oct |
| MSCI | 559,96 USD (18:24) | +24,5 / +22,8 | +15,3 / +11,7 | −26,6 % | +34,2 · Sí | Mantener (media) | SÓLIDA → No mantener | 411,68 | 20-oct |
| Roper | 370,59 USD (18:24) | +21,5 / +21,9 | +10,9 / +11,7 | +29,1 % | −2,0 · No | Mantener (media) | FRÁGIL → Mantener | 357,34 (los dos), pero falla calidad | 22-oct |
| Marsh (MRSH) | 179,02 USD (18:24) | +20,4 / +20,0 | +13,4 / +10,3 | +7,6 % | +6,8 · Sí | Mantener (baja) | FRÁGIL → Mantener | **174,29 (los dos)** | **15-oct** |
| Symrise | 96,98 EUR (cierre) | +15,7 / +20,4 | +12,6 / +9,6 | −6,1 % | +2 a +4 · No | Mantener (baja) | SÓLIDA → Mantener* | 91,07 | 28-oct |
| Belimo | 800 CHF (cierre) | +13,9 / +18,2 | +16,7 / +12,4 | −46,5 % | +30 · Sí | Mantener (media) | SÓLIDA → No mantener | 427,67 | 18-ene |
| Waste Connections | 156,05 USD (18:24) | +13,6 / +16,6 | +9,5 / +7,7 | −21 % | +0,6 · En parte | Mantener (media) | SÓLIDA → No mantener | 121,36 | 21-oct |
| Demant | 354,80 DKK (cierre) | +11,4 / +19,2 | +12,9 / +13,2 | −14,4 % | +3,4 · En parte | Mantener (baja) | FRÁGIL → No mantener | 303,60 | 3-nov |
| Novonesis | 449 DKK (cierre) | +8,4 / +13,0 | +7,9 / +9,7 | −25,2 % | −2,0 · En parte | Mantener (media) | SÓLIDA → No mantener | ≈336 DKK | 5-nov |
| Sartorius Stedim | 216,40 EUR (cierre) | +1,6 / +10,4 | +18,2 / +15,2 | −55,6 % | −2,9 · No | Mantener (media) | SÓLIDA → No mantener | 96,08 | 22-oct |
| Lotus Bakeries | 12.800 EUR (cierre) | +0,5 / +8,6 | +6,2 / +11,5 | −58,6 % | +10,2 · Sí | Mantener (media) | SÓLIDA → No mantener | 5.296,97 | 5-feb |
| Euronext | 166,80 EUR (cierre) | −4,1 / −0,7 | −3,8 / −5,1 | +9,1 % | +3,5 · Sí** | Mantener (baja) | SÓLIDA → No mantener | 136,94 | 5-nov |
| Epiroc (A) | 269,40 SEK (cierre) | −7,8 / +2,1 | −9,4 / −3,1 | −49,7 % | +6,5 · Sí | Mantener (media) | SÓLIDA → No mantener | 135,39 | 28-oct |
| Diploma | 79,30 GBP (cierre) | −8,1 / −0,1 | +2,7 / +8,9 | −51,3 % | +4,0 · En parte | Mantener (baja) | SÓLIDA → No mantener | 38,65 | 17-nov |
| Cintas | 207,93 USD (18:24) | −9,3 / −4,3 | −2,0 / +0,9 | −39,3 % | +20 · Sí | Mantener (media) | SÓLIDA → No mantener | 125,35 | ≈17-dic |

\* Symrise: la herramienta da «Mantener en cartera», pero con ROIC − WACC de 2-4 puntos no pasa el filtro de calidad para mantener. ** Euronext: el informe dice «Sí», pero +3,5 no llega a los 5 puntos de la regla.

## El porqué de cada una

- **Lindt.** Marca de chocolate premium con poder de precio; el cacao ha bajado a la mitad del pico y el margen de 2027 mejorará. Pero recortó la guía dos veces (de 6-8 % a 0-2 % orgánico), perdió un 7,5 % de volumen y el valor intrínseco iguala al precio: el potencial sale solo de que el PER vuelva de 23 a 25,5x. Pasa con los dos métodos por debajo de 7.775,57 CHF, **pero un solo certificado cuesta ≈8.400 EUR (28 % de la cartera)**: no cabe en la guía del 7 %. No se propone. Riesgo IA bajo. Foros negativos tras los recortes.
- **LSEG.** Crece un 7 % orgánico y el BPA ajustado un 15-17 % al año con recompras; cotiza a 15,9x frente a 22x de su historia por miedo a la IA en los terminales (21 % de ventas) y Elliott ha entrado. Falla calidad por el fondo de comercio de Refinitiv (ROIC 5,7 % frente a WACC 8,7 %). Riesgo IA medio.
- **MSCI.** Peaje sobre la indexación mundial con ROIC del 44 %; pero 26x para crecer un 8-9 % y BlackRock (11 % de ventas) le ha arrancado rebajas de tarifa en 2026-27. La rentabilidad viene solo de recuperar múltiplo; el valor intrínseco está un 27 % por debajo. Riesgo IA medio-bajo (Index a salvo; el margen de Analytics ya cae).
- **Roper.** Cartera de software vertical con caja libre del 31 % de las ventas, a 14,2x EBITDA (mínimo reciente) por miedo a la IA; ≈20 % de ventas expuesto (Aderant, Deltek, Procare). Recompra pagada con deuda (3,4x EBITDA) y compras que no rinden su coste de capital: falla calidad con el ROIC publicado. Riesgo IA medio.
- **Marsh.** El mayor corredor de seguros del mundo a 17,6x frente a una mediana de 23x; sigue creciendo un 4-5 % subyacente pese a ocho trimestres de tarifas a la baja, sin necesitar capital. El descuento es por el ciclo blando de tarifas y el miedo a la IA (pymes y particulares), no por las cifras. Pleito Greensill (2.000 M reclamados, 425 dotados). Riesgo IA medio a 5 años.
- **Symrise.** Aromas y nutrición estables con margen al alza, pero orgánico del 2-3 % frente a una guía del 5-7 %, Swedencare fue mala compra y tras subir un 43 % ya descuenta la meta de 2028. Frente a Givaudan cotiza un 20 % más barata, justo lo que dice su menor calidad. Riesgo IA bajo.
- **Belimo.** Válvulas y actuadores con ROIC del 37 %; los centros de datos (refrigeración líquida) explican más de la mitad del crecimiento del 1S26. A 36,9x el precio pide crecer un 19 % al año durante nueve años. Riesgo IA bajo (la IA la necesita).
- **Waste Connections.** El operador de residuos más rentable de Norteamérica, con vertederos propios, pero a 26x con el bono al 5,2 % y compras que apenas crean valor; litigio de Chiquita Canyon sin estimar. Riesgo IA casi nulo.
- **Demant.** Audífonos con orgánico del 7-8 %, guía mejorada y recompras; pero tras +65 % en el año cotiza a 21x y la calidad no llega a 5 puntos. Con el BPA de consenso cae a +9 %. Riesgo IA bajo (OTC y AirPods solo en pérdidas leves).
- **Novonesis.** Enzimas y biosoluciones con margen del 37 % y orgánico del 8 %, pero el precio descuenta un 11 % de crecimiento anual; el fondo de comercio de la fusión deja el ROIC por debajo del WACC. Riesgo IA bajo.
- **Sartorius Stedim.** El desestocaje terminó y la recuperación ya está en precio (38,6x); frente a Lonza paga un 40 % más de múltiplo con peor ROIC, y la matriz (71,5 %) cobra un canon de marca que sube un 63 %. v2 da +18 % solo porque tiene tres años limpios: no sirve. Riesgo IA bajo.
- **Lotus Bakeries.** Biscoff crece más del 20 % con EE. UU. y Asia, familia estable, pero a 46x descuenta una década de crecimiento y parte de 2026 es moda viral. Riesgo IA bajo.
- **Euronext.** Negocio excelente (58 % recurrente, margen del 63 %) en máximos: 22x frente a una mediana de 17x; el consejero delegado se va en mayo de 2027 sin sucesor. Frente a Deutsche Börse: más barata y con más crecimiento, menos ROIC; las dos en Mantener. Riesgo IA bajo.
- **Epiroc.** Duopolio en roca dura con 66 % de posventa, pero en lo alto del ciclo del cobre y el oro a 30,6x; con un 5 % más de precio pasaría a Vender. Riesgo IA bajo.
- **Diploma.** Distribuidor de piezas técnicas con un ejercicio 2026 excepcional (orgánico 14 %) que la propia dirección dice que vuelve al 5 %; a 39x paga el pico como permanente. Riesgo IA bajo.
- **Cintas.** Uniformes e higiene con márgenes récord y ROIC del 30 %, pero a 34x y con el valor intrínseco un 39 % por debajo; la compra de UniFirst sigue en marcha (cierre esperado a fin de 2026). Riesgo IA bajo.

## Comparación con la cartera y la lista de espera

- **Ninguna supera a lo que se queda en cartera** (Daiichi +31,7, SAP +26,3, Viscofan +22,6, Netflix +18,5, Uber +15,6, Intuit +13,2) con una cifra robusta: no se propone ninguna rotación (regla 6).
- **Propuesta: Marsh entra en la lista de espera**, en tercer lugar (tras Booking y Verisk, delante de Adyen). Límite **174,29 USD** (precio al que pasa con los dos métodos: v3 +23,7 %, v2 +16,5 %), **7 acciones ≈1.095 EUR**, solo **después de sus resultados del 15-oct** y si el crecimiento orgánico del 3T sigue ≥ 3 %. Hoy cotiza a 179,02 (18:24 UTC), un 2,6 % por encima. Detalle en `cambios-propuestos.md`.
- Lindt pasaría con los dos métodos por debajo de 7.775,57 CHF, pero un certificado vale ≈8.400 EUR: no cabe.

## Puntos del método

En `puntos-metodo.md` (32 puntos). Los que más pesan: (1) el ESEF pierde la deuda a corto y da el dividendo de otro año en 4 de 7 europeas: arreglarlo en `cuentas.mjs`; (2) cuatro empresas fallan calidad solo por el fondo de comercio de compras: distinguir comprador en serie (publicado) de una compra única grande (dar también sin fondo de comercio); (3) el bajista de las cíclicas castiga dos veces (Epiroc); (4) el riesgo de IA no tiene campo propio en el informe; (5) `apuntar-12m.mjs` no imprime el base de v2.
