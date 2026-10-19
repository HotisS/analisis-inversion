# Diario · APR Co., Ltd. (278470.KS) · 19-oct-2026

- Commit de partida: 3e0f31e («Seguimiento: rehecho tras integrar la pareja 5»; al terminar, HEAD estaba en 58d9d9d por los commits del coordinador). Checkout compartido con otro análisis en paralelo: sin `git pull`, `commit`, `push`, `checkout` ni `stash`. Solo se escribió en esta carpeta, en `verticales/empresa/simbolos.json` (entrada 278470, 7 líneas añadidas al final de `empresas`, sin reordenar) y en lo que escriben `precios.mjs 278470` (`precios.json`) y `apuntar-12m.mjs apr-2026-10-19` (`objetivo12m-revisados.json`). No se tocaron `cola.md`, `MEMORIA.md`, `METODO-VIGENTE.md`, `lecciones*.md` ni `seguimiento.xlsx`; no se ejecutaron `seguimiento.mjs`, `cobertura.mjs`, `regenerar.mjs` ni nada con `--todas`.
- Tiempos (UTC, reloj del entorno): inicio ≈ 15:16; investigación (DART, avisos, IR, FnGuide, Naver News, Yahoo, FRED) con una compactación del contexto por medio; notas A-E, cálculo, Word y PDF ≈ 15:47; revisión a 12 meses, símbolos, precios y robustez ≈ 15:50.
- Encargo: análisis value completo desde cero; valorar la moda de la cosmética coreana, la dependencia de Amazon y EE. UU. y los aranceles; regla de historia corta del selector; regla 13.
- Sin subagentes: las fases A-E las hice yo (`notas/construir-notas.mjs` escribe A-E.json); parte propia en `propio.mjs` + `supuestos.mjs` + `textos.mjs` + `resumen.mjs` (patrón de d'Alba).

## Pasos y fecha de los datos

| Paso | Herramienta / fuente | Fecha del dato |
|---|---|---|
| Beta, rentabilidades, volatilidad, cierres de ejercicio | `bolsa.mjs --accion 278470.KS --indice ^KS11 --sector 228790.KS --corte 2026-10-19` | cierre 16-oct-2026 (sin barra del 19-oct) |
| Precio del informe | Yahoo `regularMarketPrice` (chart y quoteSummary, script del scratchpad) | cierre 19-oct-2026, 15:30 KST: 331.500 KRW |
| Precio común | `precios.mjs 278470` | cierre 16-oct-2026 (325.500 KRW; Yahoo sin la barra del 19-oct) |
| Movimiento (regla 13) | `movimiento.mjs 278470.KS` | 16-oct-2026 |
| Cuentas 2021-2025 | DART: informes anuales de 2025 (rcp 20260323001257), 2023 (20240321000964) y 2022 (20230329001036) | 2023-03-29 a 2026-03-23 |
| Semestre 2026 y balance de 30-jun-2026 | DART: informe semestral (20260814002503) | 2026-08-14 |
| Trimestres 3T24-2T26 | Avisos KRX de resultados provisionales; presentaciones del 1T26 y 2T26 (apr-in.aprd.io) | 2024-11-06 a 2026-08-05 |
| Dividendos, junta, plan de valor, fusión, Fidelity, fecha del 3T26 | DART: avisos sueltos | hasta 2026-10-16 |
| Consenso y objetivos | FnGuide/WiseReport (media de 3 meses, 22 casas) | 2026-10-16 |
| Noticias (llamada del 12-oct, KRX, recortes, aranceles, Costco, Europa, exportaciones) | Naver News (Maeil, News1, Bizwatch, Hankyung, Edaily, Korea Economic TV, Seoul Economic, Financial News, Newsis) | 2026-05-07 a 2026-10-19 |
| Bono coreano a 10 años | FRED IRLTLT01KRM156N | septiembre de 2026 |
| Prima de mercado | Damodaran ERPbymonth | octubre de 2026 |
| Comparables y tipos de cambio | Yahoo quoteSummary (12 fichas), KRW=X, JPYKRW=X, EURKRW=X | 2026-10-19 |
| Mercado final | Ficha sectorial `sectores/higiene-cosmetica-2026-10-14.md` (L'Oréal) | 2026-10-14 |
| Foro | Naver 종목토론실, 400 mensajes | 13 al 19-oct-2026 (hora de Corea) |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 19-oct-2026 |
| Word y PDF | `motor/rellenar.mjs`, LibreOffice | 19-oct-2026 |
| Objetivo a 12 m | `apuntar-12m.mjs apr-2026-10-19` | 19-oct-2026 |
| Robustez | `robustez.mjs informes/apr-2026-10-19 --actual` | 19-oct-2026 (precio de `precios.json`: 16-oct) |

## Decisiones

- **DART** por el visor de secciones (`notas/dart.mjs`: `dsaf001/main.do` + `report/viewer.do`, con reintentos por errores SSL y decodificación EUC-KR para los avisos de la KRX). Fuente primaria de todas las cuentas; ninguna cifra contable sale de fuentes secundarias.
- **Precio**: 331.500 KRW, cierre del 19-oct (Yahoo `regularMarketPrice`), porque el histórico diario no traía aún la barra del día. `bolsa.mjs`, `movimiento.mjs` y `precios.mjs` se quedaron en el 16-oct (325.500); dicho en el informe y en la revisión.
- **NIIF 18**: la empresa la aplica por adelantado desde 2026. La serie 2021-2025 es la publicada; 2026e se proyecta en la base nueva (la del consenso). Diferencia en 2025: 365.521 frente a 361.391 M.
- **2026e fijo**: +101 % de ventas (3.070.000 M: 1S real 1.360.889 M y 2S de ≈ 1.709.000 M), beneficio operativo ≈ 724.500 M (3T26 al 21,5 %, la previsión de la empresa a los analistas; 4T al 23 %). Después 35 / 18 / 12 / 9 / 7 / 5 / 4 %; margen EBITDA del 24 % bajando al 21 %: no damos el margen del consenso porque publicidad y comisiones suben (del 30,7 % al 39,2 % de las ventas entre el 1S25 y el 1S26), arancel del 12,5 % y won fuerte.
- WACC 11,45 % (bono 4,45 %, beta 1,0 en vez de la medida 0,42-0,52, prima 5,5 % + 1,5 por moda, concentración en EE. UU. y Amazon, y aranceles; sin deuda), como d'Alba; g 3,0 %. Capex 1,8 % (incluye altas de derechos de uso), amortización 1,2 %, circulante 10 %, impuesto 25,5 %. Pesos DCF 50 / comparables 20 / escenarios 30. Escenarios 25/50/25: bajista −10 pp de crecimiento y −6 pp de margen; alcista +5 / +1,5 (cerca del consenso).
- Puente a 30-jun-2026: sin deuda, arrendamientos 84.908, caja 289.268 (efectivo + activos financieros a corto), pensiones 1.700 después de impuestos, otros ajustes +62.330 (dividendo a cuenta de 93.595 pagado el 31-ago menos 31.265 de activos financieros a largo a valor razonable).
- BPA propio: resultado financiero +10.000 M, impuesto 25,5 %, 37,45 M de acciones. 2028e: 13.638 / 21.894 / 25.228 KRW (consenso 27.194).
- **Historia del PER**: dos cierres (salida a bolsa el 27-feb-2024). 2024 adelantado (6,5x) excluido como BPA atípico (+174 % de BPA en 2025); con él dentro la ponderada sería ≈ −9 % y la conclusión no cambia. `per_historico.anios: 1` con v2 (17,7x y 29,9x) al lado: el selector de historia corta elige la más baja (v3).
- Regla 13: veredicto **no cambia**. La caída del 13-oct tiene causa conocida (previsión de margen del 3T26 en una llamada privada), ya recogida en el 2S26; la revisión de la KRX no tiene fecha y su efecto en el valor es pequeño; sin bloqueos, colocaciones ni convertibles; resultados el 30-oct (no aplazan).
- `insiders_sin_operaciones: false` porque no se comprobó el registro de operaciones de directivos de DART (hueco declarado).

## Resultado

- Recomendación de la regla **Mantener**, convicción media. v3 1,6 % / base 11,2 % (a 331.500; 3,5 % / 13,2 % a 325.500 con `--actual`); v2 17,7 % / 17,1 %; BPA −10 % −8,4 % / 0,2 %. Objetivo 331.761 KRW; valor intrínseco 256.463 KRW (−22,6 %); DCF 250.455 KRW.
- **Acción robusta: No mantener (no comprar)**; veredicto SÓLIDA. Límite robusto común **256.462,69 KRW** (= límite con objetivo fijo; lo fija el valor intrínseco).
- ROIC 2025 100,2 % − WACC 11,45 % = 88,8 puntos; sostenibilidad Sí: la calidad pasa.
- Controles: 19 de 22 correctos y 3 explicados (perímetro de 2024, caja proyectada, crecimiento del BPA desde 2025). Cobertura de campos 85,3 %; capital y gobierno por debajo del 60 % (sin adquisiciones; operaciones de directivos no comprobadas).
- Huecos: consenso previo por trimestre y BPA de 3T24-2T25, FCF de los últimos doce meses, calificaciones ESG, Goodai y Anua, operaciones de directivos, posición corta, historia de múltiplos de más de dos años.
