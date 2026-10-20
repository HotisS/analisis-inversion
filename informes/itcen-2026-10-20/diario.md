# Diario · ITCEN GLOBAL Co., Ltd. (124500.KQ) · 20-oct-2026

- Commit de partida: e75420c (HEAD sin cambios al terminar). Checkout compartido con otro análisis en paralelo (Bytes): ni `pull`, ni `commit`, ni `push`, ni `checkout`, ni `stash`. Solo se escribió en esta carpeta, en `verticales/empresa/simbolos.json` (entrada 124500, 6 líneas tras la de VeriSign, sin reordenar) y en lo que escriben `precios.mjs 124500` (`precios.json`) y `apuntar-12m.mjs itcen-2026-10-20` (`objetivo12m-revisados.json`). No se tocaron `cola.md`, `MEMORIA.md`, `METODO-VIGENTE.md`, `lecciones*.md` ni `seguimiento.xlsx`; no se ejecutaron `seguimiento.mjs`, `cobertura.mjs`, `regenerar.mjs` ni nada con `--todas`. Una llamada por error a una herramienta de mensajería del entorno (prohibida en el encargo) falló sin enviar nada y no se repitió.
- Tiempos (UTC): inicio ≈ 14:44; investigación (DART, FnGuide, Naver News y foro, Yahoo, FRED, KRX vía prensa) con una compactación del contexto por medio hasta ≈ 15:05; notas A-E, cálculo, Word y PDF ≈ 15:19; revisión a 12 meses, símbolos, precios, robustez y diario ≈ 15:22.
- Encargo: análisis value completo desde cero; separar oro e informática en ventas y beneficio; valorar descuento de holding, margen y precio del oro, contratos públicos, gobierno (familia y vinculadas) y riesgo de IA; regla 13.
- Sin subagentes: las fases A-E las hice yo (`notas/construir-notas.mjs` escribe A-E.json); parte propia en `propio.mjs` + `supuestos.mjs` + `textos.mjs` + `resumen.mjs` (patrón de Silicon2).
- Sector: sin ficha de comercio de oro ni de integración de sistemas en `sectores/` y el encargo no permite escribir fuera de esta carpeta: los mercados se definen en la nota B. Queda para el coordinador si quiere las fichas.

## Pasos y fecha de los datos

| Paso | Herramienta / fuente | Fecha del dato |
|---|---|---|
| Beta, rentabilidades, volatilidad, cierres de ejercicio | `bolsa.mjs --accion 124500.KQ --indice ^KQ11 --sector 157490.KS --corte 2026-10-20` | cierre 20-oct-2026 |
| Precio del informe | Yahoo `regularMarketPrice` (06:30:18 UTC = 15:30 KST) | cierre 20-oct-2026: 21.450 KRW |
| Precio común (`precios.mjs 124500`) | Yahoo, vela diaria (la del 20-oct llega vacía) | cierre 19-oct-2026: 23.600 KRW |
| Movimiento (regla 13) | `movimiento.mjs 124500.KQ` | 20-oct-2026 (21.450) |
| Cuentas 2021-2025 | DART: anuales de 2025 (rcp 20260323001492), 2023 (20240329003280) y 2021 (20220330001842) | 2022-03-30 a 2026-03-23 |
| Semestre 2026 y balance de 30-jun-2026 | DART: semestral (20260813001059) | 2026-08-13 |
| Trimestres 1T24-2T26 | DART: 1T26, 3T25, 3T24, 1S24, 1T24 | 2024-05-20 a 2026-05-14 |
| CB nº 16 (ajuste del precio) y Galaxia FN | DART: avisos 20260810900127 y 20260804000030 | 2026-08-04 y 2026-08-10 |
| Auditor, consejo, remuneración, vinculadas, garantías, pleitos | DART: anual 2025 (secciones 44, 47, 53, 55, 58, 59) | 2026-03-23 |
| Consenso, objetivo, accionistas, flotante | FnGuide/WiseReport (una casa: BNK) | 2026-10-19 |
| Noticias (presidente, CB, crecimiento hueco, rumor de KGE, stablecoins, STO, CLARITY, oro, KRX) | ZDNet, Bloter, Digital Times, NewsTop, Sidae, Chosun Biz, Hankyung, MK, Pinpoint, CBC, Wikitree, Herald, Aju, Job Post | 2025-12-30 a 2026-10-20 |
| Mercado del oro de la KRX | Herald Economy (datos de la KRX), Aju Business Daily | 2026-08-05 y 2026-10-02 |
| Bono coreano a 10 años | FRED IRLTLT01KRM156N | septiembre de 2026 (4,454 %) |
| Prima de mercado | Damodaran ERPbymonth | octubre de 2026 (4,20 %) |
| Comparables y tipos de cambio | Yahoo quoteSummary (13 fichas), KRW=X, JPYKRW=X, HKDKRW=X | 2026-10-20 |
| Foro | Naver 종목토론실, 400 mensajes (sin datos de autor) | 17-sep al 20-oct-2026 (hora de Corea) |
| Integración, cálculo, Word y PDF | `motor/integrar.mjs`, `motor/calcular-empresa.mjs`, `motor/rellenar.mjs`, LibreOffice | 20-oct-2026 |
| Objetivo a 12 m | `apuntar-12m.mjs itcen-2026-10-20` | 20-oct-2026 |
| Robustez | `robustez.mjs informes/itcen-2026-10-20 --actual` | 23.600 KRW (19-oct; la vela del 20-oct está vacía en Yahoo) |

## Decisiones

- **Negocios**: oro (Web3) 87 % de las ventas brutas y 90 % del beneficio operativo de 2025 (7.761.400 M y 252.400 M; margen 3,25 %); informática 13 % y 10 % (1.124.900 M y 27.900 M; 2,5 %). Antes del auge el margen del oro fue del 0,5-0,9 %; en el 2T26, del 0,6 %.
- **Proyección del consolidado** (100 %), con los minoritarios en el BPA (76,5 % del beneficio, como en 2025) y en el puente. 2026e fijo: 10,2 billones de ventas y ≈ 168.300 M de beneficio operativo (1S real + 2S con el oro al 0,8 %). 2027e −11,8 % (volumen −8 %, precio −4 %); después 2,5-4 %. Margen EBITDA del 1,6 % desde 2027e (oro al 1,1 %, informática al 3-3,5 %).
- **Minoritarios en el puente a valor de mercado**: 706.000 M (≈ 75 % del valor de las filiales, en vez de los 457.079 M contables). Efecto: el motor no los mueve por escenario y el bajista del DCF sale negativo (−5.626 KRW); bien hecho ≈ 2.650 KRW. Explicado en escenarios y limitaciones.
- **Suma de partes** con el descuento de holding del 20 % como fila explícita (−42.800 M) sobre la parte de la matriz (≈ 25 %), no sobre el 100 % de las filiales; `descuento_holding_pct` 0 para no aplicarlo dos veces.
- **CB nº 16**: deuda a su nominal en el DCF (40.000 M; también el de ITCEN PNS, 10.000 M) y acciones en el BPA (24,26 M). Ganancia del derivado del CB en el 1S26 (≈ 17.200 M) fuera del BPA normalizado.
- WACC 12,0 % (bono 4,45 %, beta 1,3, prima 5,5 % + 3 puntos, deuda 25 % al 5,5 %), g 2 %. Escenarios 30/50/20 (bajista más probable: la fiebre del oro ya remite). Pesos: DCF 45, suma de partes 25, escenarios 20, comparables 10 (los comparables por PER usan el BPA de BNK).
- **Historia del PER**: 2022 y 2024 excluidos como atípicos; quedan 3 años → selector de historia corta → **v2** (−0,2 %) frente a v3 (21,1 %).
- Comparables: fuera ITCEN ENTEC (su BPA de Yahoo da 2x).
- Mercado final: la negociación anual del oro de la KRX como referencia de escala (no cuota): 39,2 % hoy y 41,6 % en 2030e.
- Regla 13: **no cambia** (causas conocidas y recogidas; ningún hecho con fecha que cambie la conclusión).

## Resultado

- Regla **Mantener**, convicción media: ponderada −0,2 % / base +6,9 % (con 21.450; `apuntar-12m` igual). v3 sin selector 21,1 %. Objetivo 21.410 KRW; valor intrínseco 7.511 KRW (−65 %); DCF 7.484 KRW; suma de partes 1.623 KRW.
- **Robustez** (con 23.600 KRW): veredicto SÓLIDA; **acción robusta: No mantener** (no comprar). Límite común **7.511,25 KRW** (el valor intrínseco). BPA −10 %: −18,4 % / −12,6 % (con 21.450, ≈ −10 % / −4 %).
- ROIC 2025 59,4 % − WACC 12,0 % = 47,4 puntos, pero de pico (7-10 % en 2021-2023); sostenibilidad Sí.
- Controles: 18 de 23 correctos y 5 explicados. Cobertura de campos 87 %; directivos y gobierno por debajo del 60 %.
- Huecos: BPA y consenso trimestral, flujo libre LTM, ventas por país, ESG, tamaño del comercio físico de oro en Corea, votaciones de la junta, empleados del grupo, posición corta, consenso 2027e-2028e.
