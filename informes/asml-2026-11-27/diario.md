# Diario · ASML Holding (ASML.AS) · 27-nov-2026

- Commit de partida: `35e7572` («Tanda 2 (27-nov): Paycom, SAP, LVMH, Fluidra y Eastroc rehechos»). Encargo de la tanda del 27-nov: el escáner pide versión nueva; el informe anterior (`informes/asml-2026-10-14/`) tenía mes y medio y se hizo sin red (cifras de extractos de búsqueda). Sin subagentes: fases A-E a mano.
- Horas de Madrid: inicio 10:56; cuentas XBRL, bolsa y movimiento 10:56-10:58; noticias, 6-K del 3T26, transcripción, consenso y comparables 10:58-11:04; notas A-E y supuestos 11:04-11:08; textos, cálculo, Word y PDF 11:08-11:13; revisión 12 m, apuntar y robustez (con flock), comprobar 11:13-11:16.

## Pasos y fecha de los datos
| Paso | Fuente | Fecha de los datos |
|---|---|---|
| Cuentas anuales 2018-2025 (`cuentas.mjs --sec ASML`) | XBRL del 20-F en la SEC (companyfacts) | 31-dic-2025 |
| Trimestres 3T25-3T26, balance y flujos del 3T26 | 6-K del 14-oct-2026 (anexos 99.1-99.3) | 27-sep-2026 |
| Transcripción del 3T26 (conferencia y entrevista) | Motley Fool, Earnings Whispers | 14-oct-2026 |
| Junta de 2026 (dividendo 7,50, auditor PwC desde 2027) | 6-K del 22-abr-2026 | 22-abr-2026 |
| Precio, rango, rentabilidades, betas (`bolsa.mjs`) | Yahoo | cierre 26-nov-2026 (1.168,20) |
| Movimiento (`movimiento.mjs ASML.AS`) | Yahoo | 27-nov-2026, sesión en curso (1.231,40) |
| Consenso y objetivos | Yahoo quoteSummary | 27-nov-2026 |
| Comparables (8) | Yahoo quoteSummary + BCE | precios 25/27-nov; BCE 26-nov |
| Bund 10 años | Bundesbank (Svensson) | 26-nov-2026 (3,32 %) |
| Prima implícita | Damodaran ERPbymonth (valor de nov. tomado de la nota de SAP de hoy) | nov-2026 (4,41 %) |
| Noticias y controles a China (MATCH) | noticias.mjs, TIKR, IBTimes, De Belegger, NOS, IO+, SCMP | jun a 26-nov-2026 |
| Sentimiento | Stocktwits API, RSS de Seeking Alpha, Motley Fool, Zacks | oct a 27-nov-2026 |

## Decisiones
- Cuentas del XBRL de la SEC (el informe de octubre no tenía balance histórico): circulante con activos y pasivos de contrato (anticipos), lo que da un circulante del −14 % de las ventas en 2025; en el DCF, del −12 % al −7 %. Resultado de participadas (Zeiss SMT) dentro del financiero para que cuadre el BAI. Gastos generales = I+D + comerciales (ingresos − coste − EBIT).
- LTM a sep-26 sin la plusvalía de Mistral AI (509,7 M). Puente a 27-sep: deuda ≈ 2.697 M (estimada: dic-25 menos lo devuelto en 2026), caja 12.735 M, asociadas 3.369 M (Zeiss SMT + Mistral), otros ajustes −1.368 M (préstamos a Zeiss SMT −2.086 M y dividendo del 4-nov +718 M). Acciones 382,0 M (estimación: diluidas medias del 3T26 menos la mitad de la recompra del trimestre).
- Beta 1,35 (antes 1,2 estimada sin datos): semanal 2 años 1,31 y ajustada semanal 5 años 1,40 frente al STOXX 600; la mensual frente al AEX (2,27) no sirve. WACC 10,69 %. **El valor intrínseco depende de ella**: con 1,2 el DCF sube a ≈ 1.040 EUR y el filtro de mantener se cumpliría.
- Historia del PER adelantada rehecha a mano con cierres de Euronext (no ADR) y BPA publicado; 2021 fuera (burbuja, 50x). `base_bpa: publicado` en historia y casos.
- Comparables rehechos con el consenso de Yahoo posterior a sus resultados (no llevados al precio): mediana PER NTM 20,2x.
- Regla 13: veredicto **no cambia**. La caída de noviembre (−18,2 % en un mes; −9,3 % el 20-nov, +8,9 % el 23-nov) es del sector (SOXX −10,5 % y +13,6 % esos días). MATCH sin votar desde abril: en el bajista, sin fecha.
- No hubo día del inversor desde nov-2024; el próximo es el 10-jun-2027. Sin guía de 2027 hasta el 27-ene-2027.
- Recomendación: Mantener (sigue la regla); convicción baja (la sugerida: reglas absoluta Vender y relativa Mantener).

## Resultado
- v3 27,5 % / base 36,4 % → Mantener (valor intrínseco 956,95 < precio). Objetivo ponderado 1.482,07 EUR. DCF 915,62 (WACC 10,69 %); con la prima del mercado 1.111,29. DCF inverso: 12,3 % de crecimiento frente a 8,9 % del base.
- Robustez SÓLIDA; Si la tienes: **Vender** (no pasa el filtro de mantener: límite 1.125,82 EUR); ¿Compra robusta?: no. Sin nivel A ni B. Calidad: ROIC − WACC 76,2; sostenibilidad Sí. Aviso D6 (BPA +40 % anual 2025-2028: 2026 ya casi cerrado en 41 EUR).
- `apuntar-12m.mjs asml-2026-11-27 --precios` y `robustez.mjs asml-2026-11-27 --actual` con flock. `comprobar.mjs`: ningún ERROR en esta carpeta (C10: `simbolos.json` apunta aún a la carpeta vieja de ASML; lo cambia el coordinador).
- Línea de la revisión a 12 meses: ASML: Mantener 20,1 % (1.477,20) → Mantener 27,5 % (1.168,20, 26-nov).

## Lecciones
- ASML (20-F con XBRL en la SEC) da balance completo con pasivos de contrato: no hace falta suponer circulante nulo como en octubre. Los estados trimestrales completos están en el anexo 99.3 del 6-K (`financial_statementsxusx.htm`), aunque asml.com bloquee la descarga.
- Beta de un valor que pesa mucho en su índice local (ASML en el AEX): la mensual frente a ese índice sale inflada (2,27); usar un índice amplio (STOXX 600, `--indice-beta EXSA.DE`).
