# Diario · Alibaba (BABA) · 27-oct-2026

- Commit de partida: 1640d3a (27-oct). Iteración nueva: el informe del 14-oct (extractos de búsqueda, confianza baja) solo como punto de partida.
- Encargo: Hotis 27-oct 11:48 («alibaba y nu, lanza»), tras detectar el hilo de blindaje que el informe del 14-oct mezclaba BPA publicado (historia v3) y ajustado (escenarios).
- Entorno: nube con la red abierta (EDGAR, Yahoo, HKEX, ChinaBond).
- Pasos (hora de Madrid):
  - 11:50 cuentas del XBRL de la SEC (`cuentas.mjs --sec BABA`) y `movimiento.mjs BABA` (cierre del 26-oct, 100,25 USD).
  - 11:52 cinco subagentes A-E en paralelo.
  - 11:57 E (sentimiento) · 12:00 B (sector) · 12:02 D (mercado) · 12:03 C (gobierno) · 12:06 A (cuentas).
  - 12:08 integración, cálculo, robustez · 12:11 Word y PDF · 12:12 `apuntar-12m.mjs --precios`, `comprobar.mjs` (0 errores).
- Decisiones:
  - **BPA no GAAP diluido por ADS en la historia del PER y en los escenarios** (`base_bpa: "ajustado"` en los dos). Historia adelantada de la nota D con los BPA de A; FY2025 excluido (BPA siguiente hundido); FY2026 sobre nuestro FY2027e.
  - Ejercicio objetivo FY2029e (primero que cierra > 18 meses tras el corte; el 14-oct se usó FY2028e).
  - Puente de la nota D a 30-jun-2026: caja y tesorería 474.505 M, deuda 266.530 M (con convertibles y canjeables), participadas y valores estratégicos 457.417 M a valor contable, minoritarios 57.272 M, colocación −60.233 M. No recoge la caja de jul-sep (≈ 17-20 RMB por ADS).
  - WACC en RMB: bono chino 1,63 %, beta 1,0, prima 5,5 %, adicional 2,0 (0,3 país + 1,7 VIE/1260H; sin doble prima país). Terminal 1,1 %.
  - Sostenibilidad «En parte»: el capital nuevo no rinde; crecimiento −1 punto todos los años y margen final 19 % (21 % el 14-oct).
  - Circulante negativo (−29,8 % de las ventas) convergiendo a −25 %.
- Resultado: 20 de 29 controles + 9 explicados. Mantener (regla), convicción baja. DCF 1.040,90 RMB; valor intrínseco 958,16 RMB (143,69 USD, +43,3 %).
- **Línea 12 m**: objetivo ponderado 721,10 RMB (108,14 USD) → +9,0 %; base 773,31 RMB → +16,8 %; v2 −2,7 %; señal Mantener. Robustez frágil; si la tienes, Vender (calidad); no compra; excluida.
- Qué cambia frente al 14-oct: precio −10 % (110,85 → 100,25 USD); base del BPA corregida; ejercicio FY2029e; margen final 19 %; puente con más participadas; WACC 8,32 % (9,15 %). La cifra corregida del 14-oct (≈ −15 %) pasa a +9,0 %, sobre todo por el precio y por mirar un año más allá.

## Lecciones
- Alibaba: el resultado de participadas va después de impuestos en US GAAP: el control BAI − impuestos − minoritarios no cuadra y no es error.
