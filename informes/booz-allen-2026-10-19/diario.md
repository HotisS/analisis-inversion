# Diario · Booz Allen Hamilton (BAH) · 19-oct-2026

- Commit de partida: cbe789c («Cola de índices: APR (pareja 8, primera)»). Sin pull, commit ni push (los hace el coordinador). Iteración del análisis del 15-oct (`informes/booz-allen-2026-10-15/`, sin tocar); mismo ticker. En paralelo, Olympus y Munters en el mismo repo.
- Entorno: nube de Claude Code. Sin herramienta de subagentes: fases A-E hechas por mí, partiendo de los scripts del 15-oct copiados a `notas/` (`construir-notas.mjs`, `propio.mjs`, `supuestos.mjs`, `textos.mjs`) y comprobando cada dato a hoy.
- Tiempo: 16:02-16:15 UTC (18:02-18:15 de Madrid). Corto porque no hay hechos nuevos desde el 15-oct: el trabajo es comprobar, no investigar.

## Pasos y fecha de los datos

| Paso | Herramienta / fuente | Fecha de los datos |
|---|---|---|
| Cuentas XBRL | `cuentas.mjs --sec BAH` (16:02 UTC) | FY2017-FY2026 (cierre 31-mar-2026); idénticas a las del 15-oct salvo la etiqueta FY en el periodo (arreglado el filtro del script) |
| 10-K FY2026 y último 10-Q | EDGAR (descargados de nuevo) | 10-K del 22-may-2026; 10-Q y nota del 1T27 (trimestre a 30-jun-2026) del 24-jul-2026; ninguna presentación nueva desde el 8-K del 24-ago (cierre de Ultra) |
| Próximos resultados | Comunicado de Business Wire del 11-sep-2026 | 2T27 el viernes 23-oct-2026, antes de la apertura (llamada 8:00 EDT) |
| Precio | `bolsa.mjs --corte 2026-10-19 --cierre-mes 3 --etiqueta fin` | Cierre del viernes 16-oct-2026: 74,26 USD (la sesión del 19-oct estaba abierta) |
| Precio del día | `movimiento.mjs BAH` / `precios.mjs BAH` / Yahoo | 73,69 USD a las 16:05 UTC (18:05 Madrid) del 19-oct; `precios.json` en curso 73,645 |
| Consenso | MarketScreener (WebFetch, 19-oct) | Sin cambios desde el 14-oct: 15 analistas, Mantener, 84,38 (63-140); BPA 5,92 / 6,39 / 7,02 |
| Comparables | Stock Analysis del 14-oct × variación de Yahoo 14→16-oct | Cierre del 16-oct; mediana PER adelantado 12,0x (11,6x) |
| Bono a 10 años | CSV del Tesoro | 5,09 % el 16-oct (5,21 % el 13-oct en el anterior) |
| Prima implícita | Damodaran oct-2026 | 4,20 % (sin cambios) |
| Form 4 | `form4.mjs --ticker BAH --desde 2025-10-19` | Hasta el 19-oct; último Form 4 del 17-ago-2026; compras 2,01 M (Rozanski), ventas 0,06 M (controller) |
| Posición corta | Stock Analysis | 5,81 % del flotante (página del 19-oct) |
| Noticias 12 meses | `noticias.mjs --meses 12 --valores BAH --todas` + búsquedas | Hasta el 19-oct (última relevante: Truist 8-oct; nada material 15-19 oct) |
| Presupuesto federal | ASTHO (H.R. 6500) | Prórroga a niveles de FY2026 hasta el 11-dic-2026 (aprobada 1-2-sep-2026) |
| Sentimiento | API de Stocktwits y RSS de Seeking Alpha | Últimos mensajes 12-oct y 8-oct: sin cambios |
| Movimiento (regla 13) | `movimiento.mjs BAH` | 19-oct: 1 m −4,4 %, 3 m +15,4 %, 6 m −8,7 %, 12 m −24,2 %, tendencia bajista, sin avisos P |

## Decisiones

- Supuestos del DCF, escenarios, pesos y BPA de los tres casos iguales que el 15-oct (no hay datos nuevos de la empresa). Solo cambia la tasa libre (5,09 %).
- `bolsa.contexto` (regla 13) añadido: faltaba en el informe del 15-oct. Veredicto global «no cambia»: los resultados del 23-oct no aplazan (regla 11) y no hay colocaciones, ampliaciones ni decisiones con fecha ajenas al análisis; la prórroga que vence el 11-dic es un riesgo ya recogido.
- Sostenibilidad «En parte» mantenida: el crecimiento orgánico sigue negativo hasta que se publique el 2T27; el disparador de la cola (orgánico positivo el 23-oct) sigue pendiente.
- Corregida la justificación del terminal (el múltiplo implícito es 12,6x, no 10-11x).
- La fuente del 15-oct para la fecha de resultados (BriefGlance) se sustituye por el comunicado de Business Wire; la prensa de Washington Technology de la rebaja de guía, por la nota oficial del 2T26.

## Resultado

- DCF 107,94 USD (WACC 7,97 %); valor intrínseco 99,13 (+33,5 %); DCF inverso −2,5 % de ventas al año o margen 9,1 %; rentabilidad implícita 9,7 %. ROIC 25,0 % − WACC 7,97 % = 17,0 puntos. Sostenibilidad: motor «Sí», informe «En parte».
- **Línea 12 m**: v3 ×1,1 (selector: 19,0 / 13,4 = 1,42) ponderada +32,6 %, base +30,3 %; v2 +22,4 % / +19,0 %; BPA −10 %: +19,7 % / +17,6 %. Objetivo 96,08 USD. Regla Comprar (< 85,60; vender > 109,38); **informe Mantener**, convicción media.
- `apuntar-12m.mjs`: entrada escrita en `objetivo12m-revisados.json` (fecha 2026-10-19, carpeta booz-allen-2026-10-19).
- Robustez (`--actual`, 73,65 a las 16:05 UTC y al cierre): SÓLIDA, acción vigente Comprar, **acción robusta Mantener** por Q1 (sostenibilidad En parte). D5 VARIANTE (tipo fiscal del 1 % en FY2026: ya va con BPA normalizado), E2 (resultados en 4 días), M6. Sin CORREGIR ni C1-C3. Límite robusto 77,29 USD; colchón de BPA 14 % (15 % con el precio del día).
- Word y PDF (soffice con perfil `/tmp/lo-booz`): 44 páginas, cobertura 89,4 %, 20 de 21 controles y 1 explicado (tipo fiscal). Síntesis de 647 palabras.
- `simbolos.json`: BAH ya está (su campo `carpeta` apunta aún a la del 15-oct; no lo toco, es archivo compartido).
