# Diario · Pernod Ricard (RI.PA) · 19-oct-2026

- Commit de partida: 250a336 («Cola de índices: Anker Innovations (pareja 11)»). Sin git pull, commit ni push (encargo: hay otras cuatro sesiones en el mismo clon). Inicio 17:53 UTC, fin 18:10 UTC aprox.
- Iteración nueva sobre `informes/pernod-ricard-2026-10-18` (falló por ROIC − WACC 0,18) y `-2026-10-14`; carpetas anteriores sin tocar. Sin herramienta Agent: fases A-E hechas por mí con `notas/construir-notas.mjs` (adaptado del 18-oct) escribiendo `notas/A..E.json`.
- Datos y su fecha:
  - Cuentas: `cuentas.mjs --esef 52990097YFPX9J0H5D87` (19-oct; entidad PERNOD RICARD, FY2020-FY2025; FY2026 aún no está en filings.xbrl.org). FY25-FY26 recomprobados contra la nota de resultados del 27-ago-2026 (cuenta resumida, balance, deuda neta 10.662, factoring 1.105, BPA 5,85 sobre 252,342 M). FY24 contra la nota del FY25. FY21-FY23 de los URD (sin cambios).
  - 1T27: nota del 15-oct-2026 (−0,9 % orgánico; perímetro −127 M; guía confirmada).
  - Precio y bolsa: `bolsa.mjs` y `movimiento.mjs` (cierre del 19-oct, 67,46 EUR; la sesión de París ya había cerrado).
  - Consenso: MarketScreener consultado el 19-oct (estimaciones casi iguales al 16-oct; 20 analistas, 80,45 EUR). Noticias de Zonebourse del 1 al 19-oct (RBC 69→71, BNP 58→60, Redburn 82→65, investigación fiscal en India del 19-oct).
  - Bund 3,49 % (Bundesbank, 19-oct); BCE 1,1225 USD (19-oct); prima de Damodaran 4,20 % (oct-2026).
  - Gobierno: BDIF consultada el 19-oct (última declaración de directivos, 16-oct: pignoración de 950.917 acciones). **Nuevo**: posiciones cortas publicadas por la AMF (Marshall Wace 0,58 % a 15-oct; AQR 0,59 % a 30-sep): el informe del 18-oct las daba por inexistentes.
  - Comparables: MarketScreener del 12-oct llevados al 19-oct (Europa) o 16-oct (EE. UU.) con los cierres de Yahoo.
  - Sector (B): nota del 18-oct releída; segmentos FY25-FY26 comprobados. Sentimiento (E): ventana de tres meses al 19-oct (fuera la lectura de oct-2025; añadida Seeking Alpha de sep-2026).
- Decisiones:
  - **Historia del PER sin exclusiones** (FY2021-FY2026, seis años): ninguna cumple una regla de exclusión y 19-26x era el múltiplo de Pernod antes de la pandemia. El informe del 18-oct quitaba FY21-FY23 a mano, dejaba tres años y forzaba la v2 por historia corta. Ahora mediana 17,5x / actual 12,1x = 1,45 (< 1,8): decide la v3 ×1,1.
  - DCF, escenarios (30/50/20), puente y pesos 40/20/40 iguales al 18-oct salvo la tasa libre (3,49 %).
  - Sostenibilidad «En parte» (el motor dice «Sí»): precio y mezcla negativos en el FY26 y el 1T27.
  - Recomendación Mantener con justificación (la regla v3 da Comprar): v2 13,2 %, BPA −10 % ≈ 10,5 %, ROIC − WACC 0,17, sostenibilidad «En parte».
- Resultado (calc): DCF 91,14 EUR (+35,1 %, VT 75 %, WACC 6,60 %); escenarios 54,62 / 91,14 / 101,61; valor intrínseco 84,98 EUR (+26,0 %); DCF inverso −6,0 % anual o margen final 27,7 %.
- **Línea 12 m: v3 ×1,1 (selector sin marcas), objetivo 77,68 EUR, ponderada +22,1 %, base +22,3 % → regla Comprar; v2 13,2 % / 11,9 % Mantener.** Apuntada con `apuntar-12m.mjs pernod-ricard-2026-10-19 --fecha 2026-10-19` (RI: Mantener 9,3 % → Comprar 22,1 %).
- Robustez `--actual` (18:04 UTC, Euronext cerrado, 67,54 EUR): FRÁGIL; acción robusta **Mantener en cartera**; límite v3 71,65, v2 66,44, robusto 64,92; colchón de BPA 7 % (comprar) / 11 % (mantener).
- Regla 13: veredicto «no cambia»; próximos resultados 18-feb-2027 (1S27), junta 20-nov-2026.
- Word (28 gráficos, cobertura 90,5 %) y PDF con soffice (50 páginas). Controles: 18 de 20 y 2 explicados (regresión R² 0,10; compra robusta).

## Lecciones (para que el hilo principal decida)

- Quitar a mano años «de auge» de la historia del PER cuando no cumplen ninguna regla de exclusión cambia la regla que decide (con 3 años el selector fuerza la v2): en Pernod, 9,3 % frente a 22,1 %. El cambio de régimen ya lo trata el selector (desrateada ≥ 1,8); no se debe anticipar quitando años.
- Francia: las posiciones cortas netas ≥ 0,5 % están en la misma API de la BDIF (`TypesInformation=VAD`, documento «DeclarationPositionsCourtes»), no solo en el registro de la AMF; buscar sin filtro de tipo.
