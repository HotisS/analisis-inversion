# Diario · Elm Company (7203.SR) · 19-oct-2026

Commit de partida: `a1f9540 Cola de índices: fuera Al Majed y Jamjoom (minoristas)`. Procedimiento completo desde cero (`/analiza-empresa`), no un refresco; fases A-E hechas a mano en un solo hilo, sin subagentes. Horas del contenedor (UTC). Modelo saudí: `informes/electrical-industries-2026-10-19/`.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Hora (UTC) | Fecha del dato |
|---|---|---|---|
| Identificación: Tadawul 7203, ISIN SA15GG53GHH3, SAR, NIIF (SOCPA); PIF 67,0 %, autocartera 2,67 %, extranjeros 9,37 % | Informe anual 2025 (web de inversores de Elm) | ≈12:19 | 31-dic-2025 |
| Bolsa (índice KSA, porque ^TASI.SR no tiene serie; sector IGV) | `bolsa.mjs` | 12:20 y 12:45 (repetido) | cierre del 19-oct-2026: 548 SAR (la primera pasada, a las 12:20, tomó 546 antes de la subasta de cierre) |
| Movimiento (regla 13) | `movimiento.mjs 7203.SR` | 12:20 y 12:47 | 19-oct-2026 (lee 546, el último precio antes del cierre) |
| Cuentas sin XBRL: anuales 2021-2025 (BDO desde 2023), intermedios 3T24-2T26, notas de prensa, presentaciones 2025 y 1S26, informe anual 2025 por secciones | elm.sa (cadena TLS incompleta: se añadió el intermedio DigiCert G2 a un paquete propio con `NODE_EXTRA_CA_CERTS`/`--cacert`, sin desactivar la verificación); páginas escaneadas o con fuente codificada leídas como imagen (`pdftoppm`) | 12:21-12:33 | 2025 anual; 1S26 a 30-jun-2026 (publicado el 3/5-ago-2026) |
| Consenso (11 analistas, objetivo 748,77) | MarketScreener; Simply Wall St; Argaam (estimaciones del 3T26 de SNB Capital y Riyad Capital) | ≈12:34 | 19-oct-2026; 11 y 12-oct-2026 |
| Comparables (Solutions by stc, 2P, Tyler, Booz Allen, Maximus, Infosys) | Yahoo `quoteSummary` | ≈12:36 | 19-oct-2026 |
| Noticias de 12 meses y contratos públicos (SASO, Ministerio de Comercio, Al Rajhi, dividendo, Irán) | Argaam, Decypha, MarketScreener | 12:30-12:38 | sep-oct 2026 |
| WACC: UST 10 años 5,10 % + diferencial soberano 0,51 % = 5,61 %; beta 1,05; ERP 5,5 + 0,78 de país; deuda 5 % al 5,8 % → 11,83 % | FRED; Damodaran | ≈12:38 | FRED 15-oct-2026; Damodaran ene/oct-2026 |
| Sentimiento: sin fuentes útiles (Hawamer 403, Stocktwits 404, Reddit 403, TradingView un solo post de 2024) | — | ≈12:38 | — |
| Notas A-E | `notas/construir-notas.mjs` | 12:42 (y 12:45, 12:56) | — |
| Supuestos, puente, objetivo, textos, riesgo de IA, `bolsa.contexto` | `supuestos.mjs`, `propio.mjs`, `objetivo.mjs`, `textos.mjs`, `textos-final.mjs`, `resumen.mjs` | 12:43-12:50 | balance a 30-jun-2026 + dividendo del 1S26 pagado desde el 16-ago |
| Integración y cálculo (dos pasadas; 20 de 23 controles y 3 explicados; todas las citas con fuente) | `integrar.mjs` + `calcular-empresa.mjs` | 12:50-12:56 | — |
| Word (cobertura 84 %) y PDF (40 páginas) | `rellenar.mjs`; soffice | 12:51 y 12:56 | — |
| Revisión a 12 meses y apunte | `revision-12m-2026-10-19.md`; `apuntar-12m.mjs` | 12:53-12:56 | precio 548 (19-oct) |
| Mapa de símbolos (clave `7203.SR`, para no chocar con Toyota 7203) y precio | `simbolos.json`; `precios.mjs 7203.SR` | 12:57 | cierre del 19-oct-2026 (548 SAR) |
| Robustez: SÓLIDA, acción robusta No mantener | `robustez.mjs --actual` | 12:58 | precio 548 (19-oct) |

## Decisiones

- **Precio**: cierre del 19-oct-2026, 548 SAR (Tadawul cierra hacia las 12:00 UTC; la subasta fijó el cierre a las 12:18). `bolsa.mjs` se repitió con `--incluir-hoy 1` para tomarlo; `movimiento.mjs` seguía leyendo 546 y se deja como lo da la herramienta.
- **Ticker y claves**: `identificacion.ticker` = `7203.SR` (como EIC con 1303.SR), para que la clave de `objetivo12m-revisados.json` no choque con Toyota (7203 en Tokio). El primer `apuntar-12m.mjs` escribió la clave `7203`; se renombró solo esa entrada (la mía, sin tocar las demás) a `7203.SR` y se volvió a apuntar. `simbolos.json`: entrada `7203.SR`, añadida con una sola lectura-escritura comprobando que el formato no cambiaba.
- **Thiqah**: compra bajo control común al PIF (3.385,9 M SAR); el exceso de 3.121,8 M fue a reservas, sin fondo de comercio. Por eso el ROIC contable (116,8 %) está inflado; sumándolo, ≈ 40 %: la calidad sigue pasando (ROIC − WACC ≥ 5).
- **Crecimiento 2026e del 15 %** (fijo), por debajo de la guía (+17-19 %) y del consenso (+17 %): el 2S26 ya compara con Thiqah consolidada y el orgánico del 2T26 fue de ≈ 7 %. Después 9 % → 4,5 % en 2032e (media 6,9 %, igual que IMARC).
- **Margen EBITDA** 24,5 % → 23,8 %; amortización 3,2 %; capex 3,5 → 3,3 %; circulante del 9 % de las ventas (6,7 % en 2025) por los cobros públicos más lentos (166 días); zakat del 6 %.
- **Impuestos**: zakat. 2023 (7,9 %), 2024 (6,5 %) y 2025 (2,1 %, con una reversión de 69 M) explicados en `controles_explicados`. Robustez marca D5 en 2025: falso positivo (lecciones-paises, Arabia Saudí); con el BPA de 2025 normalizado al 6 % el PER adelantado de 2024 pasaría de 41,6x a 43,3x y la mediana seguiría en 30,55x; el base va con el tope ×1,1, así que no cambia nada.
- **Puente**: préstamo de SNB 1.535,7 M, arrendamientos 712,9 M, caja + murabahas + fondos monetarios 3.906,3 M, indemnizaciones por cese 625,9 M (como pensiones), asociadas + inversiones no cotizadas 287,2 M, minoritarios 16,2 M y otros ajustes +389,9 M (dividendo del 1S26 pagado tras el balance).
- **PER histórico**: cuatro años (desde la salida a bolsa de feb-2022), ninguno excluido; no está «desrateada» (30,55 < 1,8 × 17,80) y la historia pasa de tres años: decide la v3.
- **Mercado final**: IMARC (servicios de TI de Arabia Saudí) llevado a 2032e: 72.300 M SAR; cuota del 20,9 % al 22,5 %.
- **Regla 13**: «cambia la tesis» (−41 % en un año por causas propias: orgánico a la baja, Thiqah, cobro público, castigo al software por la IA), ya incorporada en el caso base; la recomendación no es de compra, así que no hay que esperar a los resultados del 3T26 (≈ 2-nov).
- **Riesgo de IA**: exposición media, sentido mixto, ≈ −10 % del valor (BPO y proyectos amenazados; las plataformas de tasas se benefician).
- **Huecos**: sentimiento, cuota de los cinco primeros, calificaciones ESG, crecimiento orgánico trimestral, comparación con el consenso trimestral, remuneración del consejero delegado, porcentajes de voto, fechas de nombramiento, recomendaciones de mantener/vender y objetivos mínimo y máximo, posiciones cortas y transacciones comparables.

## Resultado

Mantener, convicción media. A 12 m (v3): ponderado 677,09 SAR (+25,3 %), base 650,92 (+20,5 %); v2 +13,4 % / +9,6 %; con BPA −10 %: +12,9 % / +8,6 %. Valor intrínseco 387,14 (−29,4 %); DCF 389,53 (WACC 11,83 %). ROIC 116,8 % contable (≈ 40 % ajustado), sostenibilidad «Sí». Comprar por debajo de 387,14; vender por encima de 762,88. Robustez SÓLIDA, acción robusta No mantener. Próximos resultados: 3T26 hacia el 2-nov-2026.

## Lecciones propuestas (no escritas en `lecciones*.md`, por encargo)

- **Arabia Saudí**: la web de inversores de Elm (elm.sa) sirve una cadena TLS incompleta; se resuelve añadiendo el intermedio DigiCert Global G2 TLS RSA SHA256 2020 CA1 a un paquete propio (`NODE_EXTRA_CA_CERTS`), nunca desactivando la verificación.
- **Arabia Saudí**: Tadawul fija el cierre con la subasta hacia las 12:10-12:20 UTC; un `bolsa.mjs` lanzado antes toma el último precio de la sesión, no el cierre. Repetirlo con `--incluir-hoy 1` después de las 12:20 UTC.
- **Claves de símbolos**: un ticker numérico de Tadawul puede coincidir con uno de Tokio (7203 = Toyota): usar `NNNN.SR` como `identificacion.ticker` y como clave.
