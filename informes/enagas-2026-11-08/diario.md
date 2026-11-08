# Diario — Enagás, S.A. (BME: ENG) · corte 2026-11-08

Actualización pedida por Hotis el 8-nov a las 23:15 («y enagas actualiza»), fuera de la pausa de la cola por ser petición expresa. Commit de partida: `991bd6b`. Iteración sobre `informes/enagas-2026-10-07` (precedente: Nemetschek 6-nov): notas A-E copiadas y rehecho lo que cambia con los 9M26; sin subagentes. Horas de Madrid.

## Tiempos
- 23:16 Inicio. Lectura de `METODO-VIGENTE.md`, `MEMORIA.md`, `cola.md`, `analiza-empresa.md` y el informe del 7-oct (`datos-v5.json`: Mantener −7,7 % a 16,22).
- 23:18 Fuentes primarias: nota de resultados de 9M26 a la CNMV (20-oct-2026) y nota de prensa. La web de inversores de Enagás cambió de rutas: los PDF están en `/en/investor-relations/financial-information/results-reports-presentations/?page=1`. Precio con `bolsa.mjs`: 17,80 EUR (cierre del 6-nov). Bund a 10 años 3,22 % (Bundesbank, 6-nov); prima implícita de Damodaran de noviembre 4,41 %. Consenso: MarketScreener (8-oct) e Investing (8-nov); Yahoo quoteSummary falla (limitación declarada).
- 23:23 Notas al día (`notas/actualizar-notas.mjs`): A con 3T26 y LTM sep-26, y las participadas dentro del EBITDA con el campo `participadas_en_ebitda` (sustituye a los parches del 7-oct); D con precio, consenso, tipos y comparables; E nuevo de sentimiento (Rankia; confianza baja). `regulado.mjs` recalibrado con 9M26 (EBITDA sin participadas 2026e 455 M, 2027e 504,6 M).
- 23:24 Decisiones:
  - Tasa libre: Bund 3,22 % + 0,45 de prima país, en vez del bono español (4,14 % el 7-oct). WACC 5,36 %.
  - Puente a 30-sep-2026: deuda financiera 3.156,3 + arrendamientos 360 − caja 537,3; asociadas a valor estimado 2.204 (Teréga ya pagada); otros ajustes −89,0 (Saggas por pagar 31 + opción de Reganosa 86,6 − laudo de GSP 206,6).
  - Hidrógeno fuera del base, como antes.
- 23:29 Cálculo: DCF 13,30; valor intrínseco 14,24 (−20,0 %); objetivo 12 m 14,64; ponderada −12,1 %, base −4,2 % → **Vender**, convicción Baja (con la prima del mercado −11,2 %, a 1,2 puntos del umbral). 19 de 20 controles y 1 explicado. Word: 28 gráficos, cobertura 91,4 %; único aviso, la tabla de suma de partes vacía a propósito.
- 23:30 PDF. 23:33 `revision-12m-2026-11-08.md`; `apuntar-12m.mjs --precios`: ENG v3 −12,2 % / −4,2 % → Vender (antes Vender −10,9 % a 16,81 en el escáner).
- 23:34 `robustez.mjs`: SÓLIDA; si la tienes, Vender (filtro de mantener hasta 14,22); compra robusta no (límite 12,08); ROIC − WACC −1,3 puntos: sin nivel. `cobertura.mjs --arreglar`, `seguimiento.mjs`, `comprobar.mjs`: 0 errores.

## Resultado
- Vender, convicción Baja. Frente al 7-oct: Mantener −7,7 % a 16,22 → Vender −12,1 % a 17,80. El BPA de 2028e casi no cambia (1,14 → 1,13): el cambio lo explica el precio.
