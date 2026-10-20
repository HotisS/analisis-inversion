# Diario · Rexel (RXL.PA) · 2026-10-20

- **Commit de partida**: `2d5cf2f` (Growth: protocolo del backtest de rentabilidad frente a caída máxima). Sin `git pull` ni ninguna operación git: lo hace el hilo principal (encargo `enc-rexel-2026-10-20.md`).
- **Modo**: sin subagentes; fases 2-4 bis hechas en orden A, B, C, D, E por el propio orquestador, con notas `notas/A.json` … `E.json`.
- **Fecha de corte**: 2026-10-20. Sesión de París del 20-oct abierta al empezar (08:31 UTC = 10:31 CEST): el precio del informe es el **cierre del lunes 19-oct-2026 (17:35 CEST, subasta de cierre de Euronext París), 33,07 EUR** (Yahoo, `previousClose` de RXL.PA consultado el 20-oct a las 08:18 UTC).

## Tiempos y datos de cada paso

| Hora (UTC) | Paso | Fecha de los datos |
|---|---|---|
| 08:31 | Lectura de CLAUDE.md, comando, prompt, lecciones (núcleo, UE, Francia, casos), METODO-VIGENTE §2 y §4, MEMORIA | — |
| 08:33 | `cuentas.mjs --esef "Rexel"`: LEI 969500N6AVPA51648T62 (Rexel SA, única entidad); filings.xbrl.org solo tiene 2021-2023 (sin 2024 ni 2025) | ESEF 2022 y 2023 |
| 08:35 | Descargas: URD 2025 y 2024, comunicado y estados del 1S26, ventas 1T26, GCG, ampliación, OCEANE, Moody's, S&P, consenso de la empresa (5-13 oct) | hasta 2026-10-13 |
| 08:36 | `bolsa.mjs` (Yahoo, datos hasta 16-oct) y cierre del 19-oct a mano desde Yahoo (`previousClose` 33,07) | 2026-10-16 / 2026-10-19 |
| 08:37 | `movimiento.mjs RXL.PA` (precio intradía del 20-oct 32,22 a las 10:18 CEST) | 2026-10-20 |
| 08:38-08:43 | Bund (Bundesbank, 3,49 % el 19-oct), BCE (rendimientos mensuales FR/DE), OAT (Investing, 4,925 % el 19-oct), tipos BCE del 19-oct, comparables (Yahoo) | 2026-10-19 |
| 08:43-08:55 | Notas A-D escritas y revisadas (quitadas afirmaciones sin verificar); clave `dcf_mercado` retirada de D.json | hasta 2026-10-19 |
| 08:55-09:00 | Fase E (sentimiento): foro de Boursorama (≈ 45 mensajes jul-oct), RSS de Seeking Alpha; Reddit, Stocktwits y ABC Bourse sin debate. Noticias de Boursorama (79 artículos de Rexel) para la regla 13; Moody's sobre Francia (Aa3 negativa, abril) | 2026-10-20 |
| 09:00-09:09 | `supuestos.mjs`, `propio.mjs`, `textos.mjs`, `resumen.mjs` → integrar → calcular (20 de 21 controles; el tipo de 2024 explicado) → Word (cobertura 90,5 %) → PDF con soffice → robustez | 2026-10-20 |

## Decisiones

- **Cuentas 2024 y 2025 del URD 2025** (el ESEF de 2024-2025 no está en filings.xbrl.org); 2021-2023 del XBRL comprobado contra el URD 2024.
- **EBITDA**: el de la empresa (resultado operativo antes de amortizaciones y de otros ingresos y gastos). En `cuenta`, `ebit` = resultado operativo publicado, `amortizaciones` = amortización de inmovilizado y derechos de uso + amortización de intangibles de compras (PPA), y `no_recurrentes_en_ebitda` = otros gastos − otros ingresos (multa de la Autoridad de la Competencia de 124 M en 2024, reestructuración, deterioros, plusvalías de ventas). Así el EBITDA ajustado del motor coincide con el publicado.
- **GCG** (1.400 M USD de valor empresa, cierre previsto a final de 2026): dentro del DCF desde 2027 (crecimiento «otros»), con su precio en `otros_ajustes` del puente y la caja de la ampliación de 500 M (cobrada el 1-oct) restada. Acciones: 308,45 M en circulación el 1-oct (311,39 M emitidas − 2,94 M de autocartera).
- **WACC**: Bund 3,49 % + prima adicional 0,3 puntos por la parte francesa de las ventas; sensibilidad con la OAT (4,925 %) en el comentario del DCF.
- **Valor real**: pesos DCF 60 % y escenarios 40 % (encargo).
- **Sensibilidad OAT** (copia de datos.json en /tmp, no en el repo): con la tasa libre al 4,925 % el WACC pasa a 9,49 %, el DCF de 35,53 a 27,85 EUR y el valor real de 34,96 a 27,39 EUR (−22 %). Sin la prima adicional de 0,3 puntos (Bund puro), valor real 36,86 EUR.
- **Regla 13**: «no cambia». Ni los resultados del 22-oct (no aplazan, reglas 11 y 13) ni Moody's sobre Francia del 23-oct (no creemos que mueva a Rexel más de un 5 % por sí solo). La fecha del 23-oct y los disturbios del 17-oct vienen del encargo; no encontré fuente primaria leída de ninguno de los dos y el informe lo dice.
- **Correcciones de texto** antes de integrar: Francia creció en 2025 (+2,8 % publicado) y en el 1S26 (+4,1 %); lo que cae es Europa en conjunto (−0,7 % en 2024 y −1,5 % en 2025).

## Resultado

- Recomendación **Mantener**, convicción **Baja** (reglas absoluta Mantener y relativa Comprar discrepan).
- **Línea de 12 meses (v3)**: objetivo 32,65 EUR (13,81 / 33,35 / 50,07); ponderada +2,3 %, base +4,5 %; v2 −14,6 %. BPA 2028e 2,34 / 2,90 / 3,23. PER actual 12,7x, mediana adelantada 9,8x, mínimo 5,9x, media 10,0x; comparables 17,4x.
- Valor real 34,96 EUR (+5,7 %); DCF 35,53; WACC 8,49 %; ROIC − WACC −0,2 puntos; sostenibilidad «En parte».
- **Robustez** (`node herramientas/robustez.mjs rexel-2026-10-20`): veredicto **SÓLIDA**; acción robusta **No mantener**; límite de compra 29,43 EUR (objetivo fijo), **límite robusto 24,55 EUR**; BPA −10 % → ponderada −7,6 % / base −5,7 %; **margen = −7,6 − 15 = −22,6 puntos**. Avisos D3 (sin cierre en precios.json: precios.mjs prohibido en este encargo), M2, M3, M4, E2, M6.
- No se ejecutó `apuntar-12m.mjs` (ni con `--simular`): la robustez ya da v3 y v2.
- Word y PDF: `Rexel - 2026-10-20.docx` y `.pdf`. La síntesis tiene ≈ 735 palabras (algo más de las 650 del prompt).

LECCIÓN: en Rexel, la regla 13 sobre riesgo país conviene medirla contra el CAC 40 y contra las empresas domésticas francesas (BNP, Saint-Gobain), no solo contra el STOXX 600: Rexel cae como el CAC pero mucho menos que las domésticas, y eso separa la causa propia del riesgo país.
LECCIÓN: con PER adelantado, un año de BPA de pico por inflación de materias primas (2022 en distribución eléctrica) hunde el mínimo de 5 años y da un bajista a 12 meses extremo (−58 %); la variante «sin doble castigo» de robustez lo deja ver (8,2 % frente a 2,3 %).
