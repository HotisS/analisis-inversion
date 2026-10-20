# Diario — Engie 2026-10-20 (análisis value completo)

- Encargo: /tmp/claude-0/fr/enc-engie-2026-10-20.md (hilo principal; sin git, sin apuntar-12m, sin seguimiento/cobertura/precios).
- Commit de partida: `2d5cf2f` (2026-10-20 08:23 UTC) «Growth: protocolo del backtest de rentabilidad frente a caída máxima».
- Inicio: 2026-10-20 08:31 UTC. Sin subagentes: fases 2-4 bis hechas por mí en orden A-E.
- Empresa: ENGIE SA, Euronext París ENGI (Yahoo ENGI.PA), ISIN FR0010208488, LEI LAXUQCHT4FH58LRZDY46, EUR, ejercicio natural, NIIF-UE.

## Pasos y fecha de los datos

| Hora UTC | Paso | Fecha del dato |
|---|---|---|
| 08:31 | `cuentas.mjs --esef "Engie"`: entidad correcta (ENGIE, LEI LAXUQCHT4FH58LRZDY46), ejercicios 2020-2025 | XBRL ESEF del URD 2021-2025 |
| 08:32 | `bolsa.mjs` (ENGI.PA, EXSA.DE, EXH9.DE): la serie diaria de Yahoo acaba el 16-oct (fila del 19-oct vacía) | 16-oct-2026 |
| 08:35 | Precio: cierre Euronext París del lunes 19-oct-2026 (17:35 CEST) = 22,77 EUR, del campo `previousClose` del gráfico de Yahoo, consultado el 20-oct a las 08:17 UTC (barra de 1 minuto 15:29 UTC = 22,77) | 19-oct-2026 |
| 08:33-08:45 | Documentos: URD 2025 (ESEF FR), informe financiero semestral 1S26 (AMF), presentaciones y transcripciones FY25 y 1S26, databook FY25, cuentas 2025 | 31-jul-2026 (1S26), 25/26-feb-2026 (FY25) |
| 08:51 | `movimiento.mjs ENGI.PA`: 22,81 € (intradía del 20-oct) · 1 m −5,1 % · 3 m −17,2 % · 6 m −20,5 % · 12 m +16,6 % · −22,8 % del máximo de 52 s · media 200 −12,8 % (bajista) · vol. 21 %; sin avisos P1-P5 | 20-oct-2026 08:51 UTC |
| 08:52-08:58 | Sentimiento: foro de Boursorama (≈40 hilos jul-oct), hilos «Engie et les taux», nuclear belga, «groupes liés à l'État massacrés»; ABC Bourse | 20-oct-2026 |
| 09:00 | Rentabilidad 31-jul → 19-oct (Yahoo, `notas/docs/yahoo-relativo-0731-1019.csv`): Engie −16,0 %, STOXX 600 −1,3 % (16-oct), utilities −1,0 % (16-oct), CAC −7,5 %, Orange −14,3 %, Veolia −7,4 %, Iberdrola +2,8 %, Enel −8,0 % | 19-oct-2026 |
| 09:00 | Búsqueda de las violencias del 17-oct y de la caída del 3-mar: sin fuente; el 4-mar el Estado bajó de un tercio de los votos por la ampliación de capital (AMF) | — |
| 08:58-09:03 | Notas A-E (`construir_notas.py`), supuestos, BPA propio (`bpa.mjs`) y `propio.mjs`; primera pasada de integrar + calcular | — |

## Decisiones

- **EBIT del informe** = «résultat des activités opérationnelles» publicado (XBRL); no recurrente = EBIT recurrente de la empresa − publicado (en `no_recurrentes_en_ebitda`); parte recurrente de asociadas en `participadas_en_ebitda` (sale del EBITDA y se valora en el puente a ≈9× = 9.500 M).
- **Base del BPA** del objetivo a 12 m: NRIgs por acción tras cupones de híbridos (la que publica Engie y sigue el consenso). Base 2028e 2,05 € (NRIgs 5.508 M, mitad de la guía 5.200-5.800 M).
- **Historia del PER adelantada** sin 2021 y 2022 (BPA del año siguiente = pico de la crisis energética): mediana 5 a 7,8x, mínimo 7,1x, media larga 9,3x; actual 11,6x.
- **WACC** con la regla del repo: Bund 3,49 % + beta 0,83 × 5,5 % + 0,8 de prima adicional (0,6 Francia + 0,2 Latinoamérica) → 6,14 %. Bajista sin ajuste de WACC (la sensibilidad a tipos va aparte); circulante al 5 % de las ventas (el real).
- **Sensibilidad OAT** (copias en /tmp/claude-0/fr/engie-2026-10-20/): tasa libre 4,93 % con prima adicional 0,8 → WACC 6,86 %, DCF 14,73 € (−35 %), valor real 14,20 €; con prima adicional 0,2 (la OAT ya recoge Francia) → WACC 6,56 %, DCF 17,69 € (−22 %), valor real 17,11 €. Valor real con Bund: 21,89 €.

## Cálculo y salida

| Hora UTC | Paso | Resultado |
|---|---|---|
| 09:04-09:07 | `textos.mjs`, `resumen.mjs`; integrar + calcular | 19 de 22 controles correctos y 3 explicados (BAI 2022 por EQUANS, BPA 2022 por cupones de híbridos, caja histórica por el pago nuclear de 2025); 0 en «Revisar» sin explicar |
| 09:08 | `rellenar.mjs` → `Engie - 2026-10-20.docx` (cobertura 89,1 %, 26 gráficos; avisos: sin suma de partes, sin serie del sector, sin rentabilidad anual por año) y PDF con soffice (40 páginas) | — |
| 09:09 | `robustez.mjs engie-2026-10-20` | ver abajo |

Resultados (precio 22,77 € del 19-oct):
- Recomendación **Mantener**, convicción **Baja** (regla absoluta Mantener, relativa Comprar).
- Objetivo 12 m 21,87 €: v3 ponderada +2,0 % (robustez +1,9 %), base +0,7 %; v2 −1,5 % / −1,1 %. Con BPA −10 %: −7,7 % / −8,9 %.
- Valor real (DCF 60 % + escenarios 40 %) 21,89 € (−3,9 %); DCF 22,57 €; escenarios 8,16 / 22,57 / 30,14 €; con la prima del mercado 29,67 €.
- ROIC 8,1 % − WACC 6,14 % ≈ +2,0 puntos. Sostenibilidad «En parte» (motor «Sí»).
- Regla 13: **retrasa** hasta la decisión de Moody's sobre Francia del 23-oct.

**Robustez** (`node herramientas/robustez.mjs engie-2026-10-20`, 09:09 UTC): veredicto **SÓLIDA**; acción vigente y **acción robusta: No mantener**; límite de compra (objetivo fijo) 20,19 € (v2 19,50 €); filtro de mantener hasta 21,10 €; **límite de compra robusto 18,28 €**; **margen = BPA −10 % ponderada − 15 = −7,7 − 15 = −22,7 puntos**. Avisos: D3 (sin cierre en precios.json: no se ejecutó precios.mjs, prohibido en el encargo), M2 (historia de 4 años), M4 (doble castigo en el bajista: sin él, +4,2 %), C1 (retrasa por Moody's), M6 (elasticidad del objetivo al precio 0,59).

Qué falla para ser compra robusta: rentabilidad ponderada (+2 %) y base (+0,7 %) muy lejos del 15 % y del 12 %, valor real por debajo del precio, ROIC − WACC de 2 puntos (< 5) y C1 (retrasa). Por precio haría falta bajar de 18,28 €, y aun así el filtro de calidad no se cumple.

LECCIÓN: en utilities francesas muy endeudadas (Engie: fondos propios = 46 % del valor empresa) la sensibilidad del DCF a sustituir el Bund por la OAT es enorme (−22 % a −35 % con 1,44 puntos de diferencial); conviene dar las dos cifras en el comentario del DCF y no doblar el riesgo país (prima adicional por Francia + OAT).
LECCIÓN: con «previousClose» del gráfico de Yahoo se recupera el cierre de la víspera cuando la fila diaria viene vacía (ENGI.PA, 19-oct); movimiento.mjs usa entonces el intradía y hay que decirlo.

Fin: 09:10 UTC. Sin operaciones git, sin apuntar-12m, seguimiento, cobertura, precios ni exclusiones; temporales en /tmp/claude-0/fr/engie-2026-10-20/.
