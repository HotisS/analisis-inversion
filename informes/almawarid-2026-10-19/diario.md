# Diario · Almawarid Manpower Company (1833.SR, Tadawul) · 19-oct-2026

Commit de partida: `829f3ba1906de4d256cc1fe22accb641bd960e95` (19-oct-2026 14:07:51 UTC). Procedimiento completo desde cero (`/analiza-empresa`), no un refresco; fases A-E hechas a mano en un solo hilo, sin subagentes, en un checkout compartido con otros análisis (sin git pull/commit/push; sin tocar cola, memoria, método, lecciones ni el Excel). Horas del contenedor (UTC), aproximadas: inicio ≈ 14:44, fin ≈ 15:16. Modelos de forma: `informes/elm-2026-10-19/` y `informes/edarat-2026-10-19/`.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Hora (UTC) | Fecha del dato |
|---|---|---|---|
| Identificación: mercado principal de Tadawul desde el 19-jun-2023 (30 % a 64 SAR, 48 ajustados), SAR, NIIF (SOCPA), revisión de BDO, 20 M acciones tras la gratuita 4:3 | Intermedios del 2T26 (nota 1); Argaam | ≈ 14:45 | 30-jun-2026 |
| Bolsa (índice KSA porque ^TASI.SR no tiene serie; sector XLI; `--incluir-hoy 1`) | `bolsa.mjs` | ≈ 14:46 | cierre del 19-oct-2026: 87,80 SAR |
| Movimiento (regla 13) | `movimiento.mjs 1833.SR` | ≈ 14:46 | 19-oct-2026 (87,80; −20,9 % en 3 meses) |
| Cuentas primarias: intermedios del 1T26 y del 2T26 (balance auditado a 31-dic-2025 como comparativo) | Almacén público de Argaam (S3) | ≈ 14:48-14:52 | 31-mar-2026 y 30-jun-2026 (BDO, 10-ago-2026) |
| Anuncios de resultados 2023-2025 y trimestres 3T24-2T26 (reproducidos de Tadawul) | Argaam (páginas gratuitas) | ≈ 14:52 | 2023 a 2T26 |
| Balances 2021-2024 y flujos 2021-2025 (secundaria); BAI, zakat, intereses y amortización 2022-2025 | Stock Analysis (WebFetch); Yahoo fundamentals | ≈ 14:54 | 2021-2025 |
| Cuentas anuales auditadas 2021-2025 | Saudi Exchange (403), Euroland (sin la empresa), Argaam (de pago), web.archive (conexión cortada) | ≈ 14:50-14:55 | **hueco** |
| Precio de cierre | Argaam: 87,80 (−3,52 %), 67.400 acciones, 5,95 M SAR | ≈ 14:56 | 19-oct-2026 |
| Comparables (Maharah, SMASCO, Tamkeen, Randstad, Adecco, ManpowerGroup, Persol, Kelly) y consenso | Yahoo `quoteSummary` (`notas/yahoo.mjs`) | ≈ 14:57 | 19-oct-2026 |
| Regulación y noticias de 12 meses (Musaned, sueldos por canales oficiales, proyecto de reglamento de domésticas, junta, gratuita, dividendos, previsiones del 3T26) | Ministerio de Recursos Humanos; Arab News; Argaam; web de inversores | ≈ 14:58-15:02 | oct-2025 a oct-2026 |
| WACC: UST 10 años 5,10 % + 0,51 % = 5,61 %; beta 0,95 (0,94 medida contra KSA); ERP 5,5 + 0,78 de país + 1,0 de tamaño y liquidez → 12,33 % | FRED; Damodaran | ≈ 15:02 | FRED 15-oct-2026; Damodaran oct-2026 |
| Sentimiento: sin fuentes (Hawamer y Mubasher 403; Argaam sin comentarios; Stocktwits vacío) | — | ≈ 15:03 | — |
| Notas A-E | `notas/construir-notas.mjs` | 15:06 | — |
| Supuestos, objetivo, textos, riesgo de IA, `bolsa.contexto` | `supuestos.mjs`, `objetivo.mjs`, `textos.mjs`, `textos-final.mjs`, `resumen.mjs`, `propio.mjs` | 15:06-15:12 | balance a 30-jun-2026 |
| Integración y cálculo (varias pasadas; 18 de 22 controles correctos y 4 explicados; todas las citas con fuente) | `integrar.mjs` + `calcular-empresa.mjs` | 15:09-15:12 | — |
| Word (cobertura 77 %) y PDF (40 páginas) | `rellenar.mjs`; soffice | 15:13 | — |
| Mapa de símbolos (entrada `1833.SR`, edición única con comprobación) y precio | `simbolos.json`; `precios.mjs 1833.SR` | 15:14 | cierre del 19-oct-2026 (87,80 SAR) |
| Revisión a 12 meses y apunte (clave `1833.SR`) | `revision-12m-2026-10-19.md`; `apuntar-12m.mjs` | 15:14-15:15 | precio 87,80 (19-oct) |
| Noticias de 12 meses (regla 13): 0 de gravedad alta | `noticias.mjs --meses 12 --valores 1833.SR` | 15:14 | oct-2025 a oct-2026 |
| Robustez: FRÁGIL, acción robusta Mantener en cartera; límite común 86,45 SAR, robusto 78,09 | `robustez.mjs --actual` | 15:14 | precio 87,80 (19-oct) |

## Decisiones

- **Precio**: cierre del 19-oct-2026, 87,80 SAR (Argaam y Yahoo coinciden; Tadawul cierra hacia las 12:00-12:20 UTC).
- **Cuentas**: no hay XBRL y Saudi Exchange da 403. Fuente primaria: los intermedios de 2026 (S3 público de Argaam), con el balance auditado de 2025. Las cifras anuales de la cuenta 2023-2025 son los anuncios oficiales a Tadawul reproducidos por Argaam; los balances 2021-2024 y los flujos 2021-2025 vienen de Stock Analysis (secundaria), y BAI, zakat, intereses y amortización de Yahoo. Contrastados con el comparativo auditado de 2025.
- **Cambio de presentación 2023-2024**: las ventas de 2024 (+40 %) incluyen un cambio de presentación (la empresa dio +37 % para 9M24 frente al +60 % de las cifras); no se ajusta, se avisa.
- **EBITDA y EBIT** con los otros ingresos de explotación (ayudas del HRDF, intereses de depósitos), por eso el EBIT supera al «resultado operativo» de Argaam.
- **Crecimiento**: 2026e +21 % (fijo) con el 1S26 (+27 %) y un 2S26 +17 % (trimestres +3-4 % sobre el anterior); 2027e +13 %; después 10 % → 5 %.
- **Margen EBITDA** 8,3 % → 7,6 % en 2032e; amortización 1,1 % y capex 1,2 % con las altas de derechos de uso (arrendamientos en la deuda); circulante 7,5 %; zakat 7 %.
- **Puente** a 30-jun-2026: arrendamientos 66,37; caja con fondos y sukuk 232,65; indemnizaciones por cese 144,49 como pensiones; dividendo del 1S26 (32 M, pagado el 27-ago) como otros ajustes.
- **Impuestos**: tipo efectivo del 7-10 % = zakat (2,5 % de la base patrimonial); explicado en `controles_explicados`. En robustez sale D5: falso positivo (lecciones-paises, Arabia Saudí).
- **Fuentes primarias (6 < 10)**: explicado en controles (Tadawul 403, cuentas anuales de pago).
- **Sostenibilidad «Sí»** con `mercado_final` null: los estudios miden comisiones, no la facturación con sueldos; la prueba de cuota se hace a mano con las cuatro cotizadas (30 % → ≈ 32-35 %).
- **Objetivo a 12 meses**: historia de 3 años (cotiza desde jun-2023) → el selector toma la más baja de v3 (+25,5 %, Comprar) y v2 (+13,2 %, Mantener): decide la v2. Comprar por debajo de 86,46 SAR.
- **Regla 13**: no cambia (caída del 21 % desde agosto sin causa propia; sin colocaciones ni bloqueos pendientes; reglamento de domésticas sin fecha; los resultados del 28-oct no aplazan).
- **No usado**: `noticias.mjs --todas` (denegado por el clasificador de permisos); con la búsqueda sin `--todas` salen 0 avisos altos.
