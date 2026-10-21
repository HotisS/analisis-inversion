# Diario: Airtel Africa (AAF), análisis value del 21-oct-2026

- Commit de partida: `2f975a6` (14:37 UTC). Checkout compartido con otros análisis en paralelo: sin pull, commit ni push desde este hilo.
- Inicio: 14:41 UTC. Fin: ≈ 15:15 UTC (reloj del sistema).
- Análisis nuevo con el método completo. No se ha usado el intento del 19-oct, que se paró a medias. Las notas A-E las escribió el analista, sin subagentes, con `notas/construir-notas.mjs`, en la forma de `informes/cardinal-health-2026-10-19/`.

## Decisiones

1. **Ejercicio a 31 de marzo, con la etiqueta «fin»** (FY2026 = abr-25 a mar-26). Ejercicio objetivo a 12 meses: **FY2029e**. Marzo de 2028 queda a 17 meses del corte, y la regla pide más de 18.
2. **Divisas.** Las cuentas están en USD y la cotización en GBp. `meta.tipo_cambio` = 0,0133467 USD por penique (BCE, 20-oct: 1,1215 USD y 0,84028 GBP por euro). En Yahoo, las surafricanas cotizan en céntimos de rand, pero la capitalización y el EV vienen en rand.
3. **BPA sin divisas** (la base que publica la empresa). FY2026 = 16,2 centavos; el publicado es de 18,6, con 127 M de ganancias de cambio. La historia del PER (adelantada) usa esa misma base; FY2022 está estimado en 18,2 centavos.
4. **PER actual = precio ÷ BPA de los próximos 12 meses**: 5,3/12 de FY2027e + 6,7/12 de FY2028e = 0,255, que da 14,7x.
5. **NIIF 16.** Los arrendamientos (4.369 M) van en la deuda. El capex del DCF incluye las altas de derechos de uso (≈ 9 % de las ventas) y queda siempre por encima de la amortización.
6. **Crecimiento en dólares.** El DCF descuenta 2-4 puntos de devaluación media al año desde FY2028. El bajista es una devaluación como la de 2023-2024: en FY2028e, −12 puntos de crecimiento y −3 de margen.
7. **Minoritarios en el puente.** El 22,15 % de Airtel Money se toma a valor de mercado (≈ 1.457 M) y el resto a valor contable (340 M). La opción de venta de 515 M no se suma, porque la salida a bolsa la deja sin objeto. En `otros_ajustes` van las recompras posteriores a junio y el dividendo final (217 M).
8. **Suma de partes, que aplica.** La telefonía se valora a 5,5 veces el EBITDA de FY2027e (2.975 M) y Airtel Money al 100 % a su precio de mercado (6.580 M).
9. **WACC del 13,7 %**: tasa libre de EE. UU. del 5,12 %, beta 1,0, prima de mercado del 5,5 %, riesgo país de 6 puntos, coste de la deuda del 11 % y peso de la deuda del 30 %.
10. **Tipos impositivos de FY2025 (50,4 %) y FY2026 (42,7 %).** Se explican en `controles_explicados` y no se proyectan: el DCF usa el 40-38 %.
11. **Regla 13: «retrasa».** La tendencia es bajista (P5: −18 % frente a la media de 200 sesiones) y hay resultados a 15 días o menos: Airtel Money el 26-oct y Airtel Africa hacia el 28-oct. No hay colocación pendiente, porque Bharti compra y Airtel Africa no vendió acciones en la salida a bolsa de Airtel Money.
12. **Precio.** El informe usa el cierre del 20-oct (280,6 GBp). La sesión del 21-oct da 281,2 GBp a las 14:28 UTC (Yahoo), 282,2 GBp a las 15:09 UTC (`precios.mjs` y `robustez --actual`) y 281,00 GBp en `movimiento.mjs` (≈ 14:45 UTC).
13. **Sin ficha sectorial de telecomunicaciones.** El encargo no permite escribir fuera de la carpeta. Los comparables salen de Yahoo y del informe de Orange.

## Resultado

- **Regla a 12 meses** (v3, sin marcas del selector): ponderada +9,6 % y base +25,0 % (con dividendo), lo que da **Mantener**. El control v2 da −10,5 %.
- **Valor intrínseco**: 3,36 USD = 251,75 GBp (−10,3 %). El DCF da 3,34 USD con un WACC del 13,68 %, y 3,68 con la prima del mercado.
- **Calidad**: ROIC del 14,5 % frente a un WACC del 13,7 % (+0,8 puntos): **no pasa**. Sostenibilidad: «Sí».
- **Robustez** (`--actual`, 282,2 GBp): FRÁGIL. Acción robusta: no comprar ni mantener por encima de 280,03 GBp. Límite de compra 251,75 GBp; límite robusto 218,33 GBp. Con el BPA −10 %, −1,7 % / +12,1 %.
- **Controles**: 20 de 22 correctos y 2 explicados (tipos impositivos).
- **Word**: 92,1 % de cobertura. Avisos: no hay calificaciones ESG y el mapa de comparables queda sin ROIC.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas anuales FY2021-FY2026 | `herramientas/cuentas.mjs --esef` (filings.xbrl.org) | 2026-03-31 (publicadas el 2026-05-07) |
| Trimestre y puente de deuda | Nota y paquete de inversores del 1T FY2027 | 2026-06-30 (publicados el 2026-07-23) |
| Historia de BPA sin divisas | Notas de resultados FY2022-FY2026 | 2022-05 a 2026-05 |
| Bolsa (cierres, beta, rentabilidades) | `herramientas/bolsa.mjs` (Yahoo) | 2026-10-20 |
| Consenso y comparables | `notas/yahoo-datos.mjs` (Yahoo quoteSummary) | 2026-10-21 |
| Consenso de la empresa | PDF de Airtel Africa | 2026-03-31 |
| Tasa libre | Tesoro de EE. UU. (curva a 10 años) | 2026-10-20 |
| Riesgo país y prima implícita | Damodaran (ctryprem, ERPbymonth) | 2026-01 y 2026-10 |
| Tipos de cambio | BCE | 2026-10-20 (y 21-oct) |
| Airtel Money (precio de salida, detalles, bloqueo) | RNS de Airtel Mobile Commerce | 2026-10-01 a 2026-10-21 |
| Accionistas y recompras | RNS (TR-1, TVR, recompra) | 2026-06-25 a 2026-10-01 |
| Movimiento (regla 13) | `herramientas/movimiento.mjs AAF.L` | 2026-10-21 (sesión en curso) |
| Precio para la decisión | `herramientas/precios.mjs AAF` y `robustez.mjs --actual` | 2026-10-21, 15:09 UTC (282,2 GBp) |
| Noticias de 12 meses | Investegate, prensa (Alliance News, Dow Jones, Business Today, The Paypers) | 2025-10 a 2026-10-21 |
