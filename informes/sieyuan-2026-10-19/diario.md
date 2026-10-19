# Diario · Sieyuan Electric (002028.SZ) · 19-oct-2026

Commit de partida: `8e12032`. Procedimiento completo desde cero (`/analiza-empresa`), no un refresco; fases A-E hechas por el mismo agente (sin subagentes). Horas del contenedor (UTC), desde ≈10:26 (el diario recoge el tramo final; las descargas se fechan por los documentos).

## Pasos, con la fecha de los datos

| Paso | Hora (UTC) | Datos a fecha de |
|---|---|---|
| Identificación: acciones A en Shenzhen (002028); en el Stock Connect hacia el norte (lista de HKEX de valores de SZSE elegibles para comprar y vender, n.º 393, CCASS 72028); sin acciones H (solicitud del 11-feb-2026 caducada, no está entre las activas) ni GDR (sin anuncios en CNINFO) | inicio | HKEX 15 y 16-oct-2026; CNINFO 19-oct-2026 |
| Descarga de cuentas (sin XBRL en China): anuales 2021-2025, semestral 1S26 y 1S25, trimestrales 1T25, 3T25 y 1T26, avances de 2025 y 1S26 y anuncios (Toshiba, dividendo, opciones, recompra, ventas de directivos, Hong Kong) de CNINFO en `notas/docs/` | inicio-10:40 | 2025 anual; 1S26 a 30-jun-2026; 3T26 no publicado (sale el 24-oct) |
| Comprobación: estados del anual 2025 en imagen → páginas 72, 74 y 76 renderizadas y leídas; coinciden con la base F10 de Eastmoney, que se usa como serie estructurada (`cuentas-cas-*.json`) | ≈10:35 | 2021-1S26 |
| `bolsa.json` (`--indice 510300.SS --sector 159326.SZ`) y `movimiento.mjs`: máx. 52 s −46,4 % (−47,7 % sobre el máximo intradía de 239,12 del 6-mar), 3 m −22,8 %, 6 m −40,5 %, 12 m +19,7 %; aviso P5 | ≈10:30 | cierre del 19-oct-2026 (125,10 CNY) |
| Causa de la caída del 48 %: 2T26 con beneficio +8 % (cambio y Toshiba al 30 % de Sieyuan Toshiba), orden 14420 de EE. UU. (26-ago, límite a la baja el 27-ago), rebaja de UBS (21-sep, −7,55 % el 22-sep) y venta de HKSCC (21,99 % → 19,86 %) | ≈10:40 | noticias hasta el 19-oct-2026 |
| Notas A-E (`construir-notas.mjs`): cuenta, balance, flujos, LTM, 8 trimestres, 7 líneas (2024-2025), 8 geografías, sector (IEA), 8 competidores, gobierno, consenso, 11 comparables, sentimiento (Guba, ifeng, Sohu) | hasta 10:51 | MarketScreener y Yahoo 19-oct-2026; informes de bancos hasta ago-2026; UBS 21-sep |
| WACC: ChinaBond 10 años 1,6497 %, beta 1,0, prima 5,5 + 1,0 → 8,09 %; Damodaran 4,20 % | 10:47 | bono 19-oct-2026; Damodaran oct-2026 |
| Supuestos y puente (`supuestos.mjs`, `propio.mjs`) | 10:47 | balance a 30-jun-2026 menos el dividendo de julio (547,7 M) |
| Textos, riesgo de IA, `bolsa.contexto` (`textos.mjs`, `textos-final.mjs`) | hasta 10:53 | — |
| `integrar.mjs` + `calcular-empresa.mjs` (21 de 24 controles y 3 explicados; todas las citas con fuente) | 10:53 | — |
| Word (`rellenar.mjs`, cobertura 86,4 %) y PDF (soffice con perfil propio) | 10:53 | — |
| `apuntar-12m.mjs`, `simbolos.json` (002028 → 002028.SZ) y `precios.mjs 002028`, con `flock` | 10:55 | cierre del 19-oct-2026 |
| `robustez.mjs --actual`: SÓLIDA, acción robusta No mantener | 10:56 | precio del 19-oct-2026 |
| `revision-12m-2026-10-19.md` | 10:56 | — |

## Decisiones

- EBIT propio: resultado operativo + gastos financieros netos − ingresos de inversiones − cambios de valor razonable + resultado no operativo; las diferencias de cambio (−125 M más en el 1S26) y la tesorería van al resultado financiero; las subvenciones recurrentes (283 M en 2025) se quedan en el EBIT. Deterioro del fondo de comercio de 烯晶碳能 (107,5 M en 2024) devuelto al EBITDA.
- Crecimiento por debajo del consenso (+24/+20/+15 % en 2026-2028e frente a +31/+29/+27 %): red china casi plana (State Grid ≈ +1 % en 7M26), EE. UU. cerrado (orden 14420) y objetivo de la propia empresa de +25 % en 2026. El BPA de 2028e (6,44) queda un 29 % bajo el consenso (aviso D7 de robustez, deliberado).
- Beta 1,0 en lugar de la ajustada (0,79): volatilidad de 2026 del 54 % y exposición exterior.
- Historia adelantada del PER sin 2021 (burbuja, 30,9x). 2025 se mide con nuestro BPA de 2026e (31,8x).
- Sostenibilidad «Sí» del motor, con la salvedad escrita: la cuota mundial sube 1,6 veces (0,8 % → 1,3 %), por encima del límite relativo de 1,5 veces, y pasa por el margen absoluto de 10 puntos.
- Riesgo de IA: exposición baja, oportunidad (demanda de redes por centros de datos), limitada por el cierre de EE. UU.

## Resultado

Mantener, convicción media. Objetivo a 12 meses 128,43 CNY (ponderada +3,2 %; base 132,02, +6,1 %); v2 de control +17,7 %. Valor intrínseco 101,38 CNY (−19,0 %). ROIC 44,2 % − WACC 8,09 %. Robustez SÓLIDA, acción robusta No mantener, límite robusto 101,20 CNY. No es compra robusta (regla 6): falla la rentabilidad (v3 3,3 % < 15 %), el valor intrínseco bajo el precio y BPA −10 % (−7,0 %). Próximos resultados: 24-oct-2026.

## Huecos

- Peso de EE. UU. en las ventas (la empresa solo da «exterior»).
- EBITDA trimestral, segmentos de 2021-2023 en la segmentación vigente, CR5 del sector, cuota de cada competidor, desglose de la remuneración, transacciones con múltiplo, posición corta, foros internacionales (ver `meta.huecos`).
- ISIN (CNE000001KQ8) tomado de un documento sin verificación cruzada.

## Lecciones propuestas

- China/CNINFO: en algunos informes anuales (2025 de Sieyuan) los estados financieros son imágenes y no hay OCR en la nube; renderizar las páginas con `pdftoppm` y leerlas como imagen, o usar la base F10 de Eastmoney (`RPT_F10_FINANCE_*`) y comprobarla contra esas páginas.
- CNINFO corta conexiones con varias consultas a la vez y la paginación por `pageNum` falla: consultas en serie con reintentos y tramos de `seDate`.
- ChinaBond: la curva a 10 años del día sale por POST a `searchYc` (ya en lecciones-paises: confirmado).
- Stock Connect: la lista oficial de HKEX de valores de SZSE elegibles es un xls; convertirla con soffice a csv y buscar el código (002028 → CCASS 72028).
- HKEX: una solicitud de salida a bolsa caducada (más de seis meses) desaparece del listado `appactive` y su folleto da 404; buscar en CNINFO el anuncio de la solicitud y decir «caducada».
- MarketScreener: el ID de la URL cambia entre fichas parecidas (6496811 era incorrecto; el bueno es SIEYUAN-ELECTRIC-CO-LTD-6498002); comprobar el nombre en la página.
- `precios.mjs` se llama con la clave del mapa (002028), no con el símbolo de Yahoo.
