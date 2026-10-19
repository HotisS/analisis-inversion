# Diario · CLASSYS Inc. (214150.KQ) · 19-oct-2026

- Commit de partida: 99bd934 («Escáner fuera de hora 19-oct 10:34»). Checkout compartido con otros cinco análisis: sin `git pull`, `commit`, `push`, `checkout` ni `stash`. Solo se escribió en esta carpeta, en `verticales/empresa/simbolos.json` (entrada 214150, edición atómica) y en lo que escriben `precios.mjs 214150` (`precios.json`) y `apuntar-12m.mjs classys-2026-10-19` (`objetivo12m-revisados.json`). No se tocaron `cola.md`, `MEMORIA.md`, `METODO-VIGENTE.md`, `lecciones*.md` ni `seguimiento.xlsx`; no se ejecutaron `seguimiento.mjs`, `cobertura.mjs`, `regenerar.mjs` ni nada con `--todas`.
- Tiempos (UTC): inicio ≈ 09:17 (según el reloj del entorno); notas A-E, cálculo, Word y PDF terminados ≈ 09:48. La investigación ocupó la primera parte de la sesión (antes de una compactación del contexto).
- Encargo: análisis value completo desde cero; explicar la caída del −61 % desde máximos (Bain, colocaciones, resultados). Datos del escáner: PER próximos 12 m 9,5; ROIC medio 23 %; margen EBIT 51 %; ventas +33 %/año; potencial de analistas +100 %.
- Sin subagentes: las fases A-E las hice yo (`notas/construir-notas.mjs` escribe A-E.json); parte propia en `propio.mjs` + `supuestos.mjs` + `textos.mjs` + `resumen.mjs` (patrón de Transsion).

## Pasos y fecha de los datos

| Paso | Herramienta / fuente | Fecha del dato |
|---|---|---|
| Precio, beta, rentabilidades, cierres de ejercicio | `bolsa.mjs --accion 214150.KQ --indice ^KQ11 --sector 143860.KS --corte 2026-10-19` | cierre 19-oct-2026 |
| Precio común | `precios.mjs 214150` | cierre 19-oct-2026 (29.950 KRW) |
| Movimiento (regla 13) | `movimiento.mjs 214150.KQ`; días de ±5 % con Yahoo (script en el scratchpad) | 19-oct-2026 |
| Cuentas 2021-2025 | Informes anuales en inglés 2023, 2024, 2025 e informe de auditoría 2022 (web de IR de CLASSYS) | 2023-03 a 2026-04-22 |
| Trimestres 3T24-2T26, balance de 30-jun-2026 | Fact Sheets 2Q26, 4Q24, 4Q23 e IR Books 4Q25, 1Q26, 2Q26 | hasta 2026-08-12 |
| Consenso y objetivos | FnGuide/WiseReport (media de 3 meses) e informes de agosto-octubre | 2026-10-16 |
| Informe de analista | Samsung Securities | 2026-04-14 |
| Bono coreano a 10 años | FRED IRLTLT01KRM156N | septiembre de 2026 |
| Prima de mercado | Damodaran ERPbymonth | octubre de 2026 |
| Comparables | Yahoo quoteSummary (9 fichas) y USDKRW/CNYKRW | 2026-10-19 |
| Accionistas | Informe anual 2025 (31-mar-2026) y FnGuide | 2026-03-31 / 2026-10-16 |
| Consejo y remuneración | Annual Business Report FY2022 (DART no accesible) | 2023-03-21 |
| Foro | Naver 종목토론실, 400 mensajes | 29-ago a 19-oct-2026 |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 19-oct-2026 |
| Word y PDF | `motor/rellenar.mjs`, LibreOffice | 19-oct-2026 |
| Objetivo a 12 m | `apuntar-12m.mjs classys-2026-10-19` | 19-oct-2026 |
| Robustez | `robustez.mjs informes/classys-2026-10-19 --actual` | 19-oct-2026 |

## Decisiones

- DART (dart.fss.or.kr) devuelve respuesta vacía desde la nube y OpenDART pide clave: cuentas de los informes anuales en inglés (auditados, K-IFRS consolidados). Para 2023 se usa el informe de 2023 (la columna 2023 del de 2025 está reclasificada).
- `meta.divisa` y `divisa_cotizacion` KRW, tipo de cambio 1, millones de KRW. Acciones 65,15 M (emitidas − autocartera).
- **2026e fijo**: +21,5 % de ventas (409.236 M; 1S real 192.700 M y un 2S como el de Daol, por debajo de la guía de 445.000 M), margen EBITDA 44 %. Después 15 / 12 / 10 / 8 / 7 / 5,5 / 4 %; margen 45-45,5 % y 44 % al final (55 % en 2025): la venta directa en Brasil baja el margen de forma estructural.
- Circulante 36 % de las ventas en 2026e (37 % real a jun-26 con MedSystems; 21,9 % en 2025) bajando al 30 %: control «circulante del primer año» explicado.
- WACC 10,38 % (bono 4,45 %, beta 0,90, prima 5,5 % + 1,5 por Bain vendedor, Brasil y gobierno en transición, Kd 4,5 %, deuda 7 %); g 3,0 %. Pesos DCF 50 / comparables 20 / escenarios 30. Escenarios 25/50/25: bajista −5 pp de crecimiento y −6 pp de margen; alcista +3 / +2.
- Puente a 30-jun-2026: deuda 146.660, arrendamientos 1.709, caja 136.101, minoritarios 5.570, activos financieros no corrientes a valor razonable 17.918 como asociadas.
- BPA propio: resultado financiero −2.500 M, impuesto 23 %, minoritarios 600 M. 2028e: 1.988 / 2.553 / 2.823 KRW (consenso 3.766).
- Historia del PER adelantado sin exclusiones: mediana 23,77x, actual 13,33x, cociente 1,78 → decide la v3 (en el umbral; la v2 da también Comprar).
- Regla 13: veredicto **no cambia**. Los resultados del 3T26 (≈ 10-nov) no aplazan la compra (reglas 11 y 13 vigentes). El overhang de Bain es permanente y sin colocación anunciada: se recoge en riesgos y en la prima adicional; si se anunciara un bloque, «retrasa».
- Comparables: Sisram excluida (margen operativo del 1,4 %); Hironic sin PER. PER NTM = precio ÷ (0,2 × BPA 2026e + 0,8 × BPA 2027e).

## Resultado

- Recomendación **Comprar**, convicción media. v3 32,0 % (informe 32,1 %) / base 28,6 %; v2 19,5 % / 16,7 %; BPA −10 % 19,1 % / 16,1 %. Objetivo 38.551 KRW; valor intrínseco 35.715 KRW (+19,2 %). Comprar por debajo de 34.382 KRW; límite robusto 31.043 KRW.
- ROIC 2025 32,70 % − WACC 10,38 % = 22,32 puntos; sostenibilidad Sí.
- Robustez **SÓLIDA**, sin marcas B1/L1/C1-C3; avisos D7 y M6.
- Controles: 20 de 21 correctos y 1 explicado (circulante del primer año). Cobertura de campos 87,2 %; gobierno por debajo del 60 % (consejo de 2022).
- Huecos de núcleo: consejo, remuneración y auditor vigentes (DART); posición corta; múltiplos NTM históricos.
