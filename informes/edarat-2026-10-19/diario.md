# Diario · Edarat Communication and Information Technology Co. (9557.SR, Nomu) · 19-oct-2026

Commit de partida: `c6e3bbef0fbe8fc6ae8e368d92ef961d0e6726f8` (19-oct-2026 14:01:36 UTC). Procedimiento completo desde cero (`/analiza-empresa`), no un refresco; fases A-E hechas a mano en un solo hilo, sin subagentes, en un checkout compartido con otro análisis (sin git pull/commit/push; sin tocar cola, memoria, método, lecciones ni el Excel). Horas del contenedor (UTC), aproximadas: inicio ≈ 14:07, fin ≈ 14:44. Modelos: `informes/elm-2026-10-19/` y `informes/electrical-industries-2026-10-19/`.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Hora (UTC) | Fecha del dato |
|---|---|---|---|
| Identificación: Nomu desde el 26-dic-2022 (salida directa del 20 %), SAR, NIIF (SOCPA), auditor PKF Al-Bassam, 7,56 M acciones | Cuentas del 1S26 (nota 1); anuncios de Tadawul | ≈ 14:08 | 30-jun-2026 |
| Bolsa (índice KSA porque ^TASI.SR no tiene serie; sector IGV; `--incluir-hoy 1`) | `bolsa.mjs` | ≈ 14:10 | cierre del 19-oct-2026: 275,40 SAR |
| Movimiento (regla 13) | `movimiento.mjs 9557.SR` | ≈ 14:10 | 19-oct-2026 (275,40; sin avisos P) |
| Anuncios oficiales (127, 2022-2026) y 44 adjuntos | API de Euroland (widgets de la web de Edarat; Saudi Exchange da 403) + `descargar.mjs` | ≈ 14:11-14:18 | hasta el 29-sep-2026 |
| Cuentas: auditadas 2022 (escaneadas, leídas como imagen); intermedias 1S26 (revisión limitada); anuncios de resultados 2022-2025 y semestrales | Euroland (adjunto de Tadawul); Argaam S3 (público) | ≈ 14:12-14:20 | 31-dic-2022; 30-jun-2026 (publicado el 29-jul-2026) |
| Balances y flujos 2023-2024 (secundaria) | Stock Analysis (WebFetch); EBITDA y BAI de Yahoo | ≈ 14:20 | 2023-2025 |
| Precio de cierre | Argaam (ficha de Edarat): 275,40 (−3,37 %), 1.136 acciones | ≈ 14:21 | 19-oct-2026 |
| Comparables (Elm, Solutions by stc, 2P, MIS, Equinix, Digital Realty, WSP, Jacobs) | Yahoo `quoteSummary` (`notas/comparables-yahoo.mjs`) | ≈ 14:22 | 19-oct-2026 |
| Noticias de 12 meses (contratos, MIS, GPU, consejo, mercado principal, ampliación) | Anuncios de Tadawul; Argaam | ≈ 14:15-14:25 | oct-2025 a oct-2026 |
| Mercado (centros de datos y colocation) | Mordor (vía W.Media); Arizton | ≈ 14:24 | 2025 |
| WACC: UST 10 años 5,10 % + 0,51 % = 5,61 %; beta 1,10 de sector; ERP 5,5 + 0,78 de país + 1,5 de tamaño e iliquidez; deuda 3 % al 9 % → 13,77 % | FRED (curl); Damodaran | ≈ 14:25 | FRED 15-oct-2026; Damodaran ene/oct-2026 |
| Sentimiento: sin fuentes (Hawamer 403, Stocktwits 404, Reddit 403) | — | ≈ 14:26 | — |
| Notas A-E | `notas/construir-notas.mjs` | ≈ 14:32 | — |
| Supuestos, objetivo, textos, riesgo de IA, `bolsa.contexto` | `supuestos.mjs`, `objetivo.mjs`, `textos.mjs`, `textos-final.mjs`, `resumen.mjs`, `propio.mjs` | ≈ 14:33-14:39 | balance a 30-jun-2026 |
| Integración y cálculo (varias pasadas; 20 de 24 controles correctos y 4 explicados; todas las citas con fuente) | `integrar.mjs` + `calcular-empresa.mjs` | 14:38-14:42 | — |
| Word (cobertura 77 %) y PDF (40 páginas) | `rellenar.mjs`; soffice | 14:40 y 14:42 | — |
| Revisión a 12 meses y apunte (clave `9557.SR`) | `revision-12m-2026-10-19.md`; `apuntar-12m.mjs` | 14:41 | precio 275,40 (19-oct) |
| Mapa de símbolos (entrada `9557.SR`, edición única con comprobación) y precio | `simbolos.json`; `precios.mjs 9557.SR` | 14:42 | cierre del 19-oct-2026 (275,40 SAR) |
| Robustez: SÓLIDA, acción robusta No mantener | `robustez.mjs --actual` | 14:42 | precio 275,40 (19-oct) |

## Decisiones

- **Precio**: cierre del 19-oct-2026, 275,40 SAR (Argaam y Yahoo coinciden; Tadawul cierra hacia las 12:00 UTC).
- **Cuentas**: no hay XBRL y Saudi Exchange da 403. Fuente primaria: anuncios oficiales de Tadawul (vía la API de Euroland, que alimenta la web de inversores de Edarat) y sus adjuntos; cuentas del 1S26 del almacén público de Argaam. Los PDF anuales de 2023-2025 son de pago en Argaam: el balance y los flujos de 2023-2024 vienen de Stock Analysis (secundaria); el balance de 2025 sale de las cuentas del 1S26 (comparativo auditado).
- **Acciones**: 7,545 M (7,56 M emitidas menos autocartera y acciones del plan de empleados); todo el BPA reexpresado tras las ampliaciones gratuitas de 2023, 2024, 2025 y jun-2026.
- **Semestres en lugar de trimestres**: Nomu solo exige cuentas semestrales.
- **Crecimiento**: 2026e +20 % (fijo) con el 1S26 (+22 %) y un 2S25 muy fuerte; 2027e +36 % (negocio actual +15 % con el contrato de 200 MW de MIS y Rackspace, más ≈ 50 M de alquiler de GPU); después 14 % → 6 %.
- **GPU**: plan de 150 M SAR (pedido de 127,5 M): capex del 30-32 % de las ventas en 2026-2027e y amortización de 30 M al año (13 % de las ventas en 2027e). En el bajista del objetivo a 12 meses la amortización se mantiene en importe (capex comprometido).
- **Margen EBITDA** 25 % → 31-31,5 % con las GPU → 29,5 % en 2032e; circulante del 32 % (MIS paga tarde); zakat e impuestos del 8,5 %.
- **WACC 13,77 %**: beta de sector (1,10) porque la medida (0,34) no vale con ≈ 3.600 acciones al día; prima adicional 2,28 % (0,78 de país + 1,5 por tamaño e iliquidez de Nomu).
- **Impuestos**: tipo efectivo del 10,5 % (2023) y 10,1 % (2024): zakat sobre la parte saudí y 20 % sobre la extranjera (fundadores libaneses); explicados en `controles_explicados`.
- **DCF inverso sin solución**: el precio está tan lejos del DCF (70,94 frente a 275,40) que ni un margen del 60 % lo justifica; explicado en controles (rentabilidad implícita 6,1 %).
- **Historia de PER**: excluido 2022 (cierre tres sesiones después de la salida directa; 8,7x). Tres años útiles → el selector toma la más baja de v3 y v2: decide la v2 (+4,0 % / 0,0 %). Con 2022 dentro decidiría la v3 y daría +1,2 % / +18,7 %: Mantener igual.
- **Sostenibilidad «En parte»** (el motor daba «Sí»): sin foso, MIS = 55 % de las ventas del 1S26, nube al 7,6 % de margen bruto y GPU sin clientes. Calidad: ROIC 58,6 % − WACC 13,77 % pasa, pero la sostenibilidad no: no pasa el filtro de calidad.
- **Puente**: préstamo 5,26 M, arrendamientos 0,85 M, caja 36,24 M, indemnizaciones por cese 11,02 M (como pensiones), asociada 0,40 M.
- **Regla 13**: «no cambia». +87 % en un año con causa (resultados de 2025, contratos de MIS y colocation); el +44 % de enero de 2026 no tiene noticia propia encontrada; la caída del 17-ago (−12,6 %, 2.679 acciones) es ruido de liquidez. Sin colocación anunciada y sin bloqueos por vencer (salida directa de 2022; MIS vendió el 10 % en 2024 para dar flotante). Vigilar el paso al mercado principal (Al Rajhi Capital asesor desde abr-2026): posible venta de MIS o de los fundadores.
- **Liquidez, concentración y proyecto** (pedido expreso): liquidez muy baja (≈ 1 M SAR al día, solo inversores cualificados); concentración en MIS (39 % → 40 % → 55 % de las ventas, 56,5 M por cobrar, además accionista y avalista); riesgo de proyecto en ingeniería (por hitos, ligada a MIS) y en las GPU (150 M sin contratos anunciados).
- **Riesgo de IA**: exposición alta, sentido mixto (≈ ±20 %).
- **Claves**: `identificacion.ticker` = `9557.SR`; `simbolos.json` con la clave `9557.SR`.
- **Huecos**: sentimiento, consenso (sin analistas), ISIN y empleados, remuneración del consejero delegado, participaciones actuales de los fundadores, guía, cuota de los cinco primeros, calificaciones ESG, margen anual por segmento, trimestres, posiciones cortas.

## Resultado

Mantener, convicción media. A 12 m (v2 por el selector de historia corta): ponderado 286,29 SAR (+4,0 %), base 275,39 (0,0 %); v3 sin selector +6,0 % / +18,7 %; con BPA −10 %: −6,4 % / −10,0 %. Valor intrínseco 70,85 (−74,3 %); DCF 70,94 (WACC 13,77 %). ROIC 58,6 %, sostenibilidad «En parte» (no pasa calidad). Comprar por debajo de 70,85; vender por encima de 318,10. Robustez SÓLIDA, acción robusta No mantener; límite robusto 70,84 SAR. Próximos resultados: anuales de 2026 hacia el 9-feb-2027.

## Lecciones propuestas (no escritas en `lecciones*.md`, por encargo)

- **Arabia Saudí (Nomu)**: los anuncios y adjuntos oficiales de Tadawul se leen por la API de Euroland (POST a GetNews con `companyCode=sa-<código>`; adjuntos en `ksastorage.eurolandir.com/press-releases-attachments/`), cuando Saudi Exchange da 403. Las cuentas intermedias más recientes suelen estar en el S3 público de Argaam; las históricas, de pago.
- **Nomu**: solo cuentas semestrales; salida directa sin descubrimiento de precio → el cierre del año de la salida no sirve para la historia de PER.
- **Beta de valores ilíquidos**: con < 1 M EUR al día la beta medida no vale; usar la de sector y una prima de tamaño e iliquidez explícita.
