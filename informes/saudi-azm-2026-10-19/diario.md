# Diario · Saudi Azm for Communication and Information Technology (7211.SR, Tadawul) · 19-oct-2026

Commit de partida: `604e556c31567bd10e0a2ff62218e8892ad37bd1` (19-oct-2026 16:33:11 UTC). Procedimiento completo desde cero (`/analiza-empresa`), no un refresco (no había informe anterior de Saudi Azm); fases A-E hechas a mano en un solo hilo, sin subagentes, en un checkout compartido con otro análisis (sin git pull/commit/push/checkout/stash; sin tocar cola, memoria, método, lecciones ni el Excel; sin seguimiento.mjs, cobertura.mjs ni regenerar.mjs). Horas del contenedor (UTC), aproximadas: inicio ≈ 16:34, fin ≈ 17:05. Modelos de forma: `informes/almawarid-2026-10-19/`, `informes/elm-2026-10-19/` y `informes/cardinal-health-2026-10-19/` (ejercicio a junio).

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Hora (UTC) | Fecha del dato |
|---|---|---|---|
| Identificación: Nomu desde 1-mar-2022, mercado principal desde 2025; SAR; NIIF (SOCPA); **ejercicio a 30 de junio**; 60 M acciones (nominal 0,5) | Informe del consejo FY2025; cuentas | ≈ 16:35 | 30-jun-2025 |
| Bolsa (índice KSA porque ^TASI.SR no tiene serie; sector IGV; `--incluir-hoy 1 --cierre-mes 6`) | `bolsa.mjs` | ≈ 16:35 | cierre del 19-oct-2026: 29,52 SAR |
| Movimiento (regla 13) | `movimiento.mjs 7211.SR` | ≈ 16:36 | 19-oct-2026 (+33,6 % en 3 meses; +28,1 % en el mes al 13-sep) |
| Cuentas: `cuentas.mjs` no cubre Arabia Saudí | — | ≈ 16:36 | — |
| Cuentas anuales auditadas FY2022-FY2025, intermedios 1T-3T FY2026, informes del consejo 2023-2025, actas de juntas (árabe) | Web de inversores azm.com (API JSON:API de Drupal → almacén público de la empresa); `pdftotext` | ≈ 16:37-16:41 | 30-jun-2022 a 31-mar-2026 |
| Cuenta de FY2026 (anuncio a Tadawul) | Mubasher / Argaam; Yahoo fundamentals-timeseries | ≈ 16:42 | 30-jun-2026 (anuncio 2/3-ago-2026) |
| Balance y flujos de FY2026 (**secundaria**: cuentas auditadas no publicadas aún en la web) | Stock Analysis (S&P Global) | ≈ 16:43 | 30-jun-2026 (act. 6-ago-2026) |
| Saudi Exchange | — | ≈ 16:40 | 403: **hueco** |
| Precio de cierre y negociación | Argaam: 29,52 (+2,57 %), 464.984 acciones, 13,85 M SAR; media 3 m 5,39 M SAR | ≈ 16:42 | 19-oct-2026 |
| Comparables (solutions by stc, Elm, 2P, MIS, Arab Sea, Edarat, Infosys, Cognizant, EPAM), FX | Yahoo `quoteSummary` (`notas/yahoo.mjs`) | ≈ 16:44 | 19-oct-2026 |
| Noticias de 12 meses (resultados, memorando de AZM FinTech, recompra, Wasl/SAMA, alianza con Elm, guía +40 %, GIB, junta del 5-nov, nuevo consejo, contrato del Ministerio) | Argaam (10 artículos); Mubasher (lista de anuncios y 3 notas) | ≈ 16:42-16:50 | jun-2026 a 15-oct-2026 |
| Sector: servicios informáticos saudíes 12.091,5 M USD (2025), +6,91 % anual | IMARC | ≈ 16:45 | 2025-2034 |
| WACC: UST 10 años 5,10 % + 0,51 % = 5,61 %; beta 0,90; ERP 5,5 + 0,78 país + 1,5 tamaño/liquidez → 12,70 % | FRED (dato citado del 15-oct; la descarga falló hoy); Damodaran (descargado) | ≈ 16:45 | FRED 15-oct-2026; Damodaran ene/oct-2026 |
| Acceso desde IBKR | Página de IBKR (Saudi Exchange vía SNB Capital) | ≈ 16:45 | 19-oct-2026 |
| Sentimiento: sin fuentes (foros 403; Argaam sin comentarios) | — | — | — |
| Notas A-E | `notas/construir-notas.mjs` | ≈ 16:53 | — |
| Supuestos, objetivo, textos, riesgo de IA, `bolsa.contexto` | `supuestos.mjs`, `objetivo.mjs`, `textos.mjs`, `textos-final.mjs`, `resumen.mjs`, `propio.mjs` | 16:54-16:58 | balance a 30-jun-2026 |
| Integración y cálculo (varias pasadas; 21 de 26 controles correctos y 5 explicados; todas las citas con fuente) | `integrar.mjs` + `calcular-empresa.mjs` | 16:58-17:02 | — |
| Word (cobertura 76,5 %) y PDF (39 páginas) | `rellenar.mjs`; soffice | 17:02 | — |
| Revisión a 12 meses y apunte (clave `7211.SR`) | `revision-12m-2026-10-19.md`; `apuntar-12m.mjs` | 17:02 | precio 29,52 (19-oct) |
| Mapa de símbolos (entrada `7211.SR`, inserción única al principio con relectura y comprobación JSON) y precio | `simbolos.json`; `precios.mjs 7211.SR` | 17:02-17:03 | cierre del 19-oct-2026 (29,52 SAR) |
| Noticias de 12 meses (regla 13): 1 de gravedad alta (compra de AZM FinTech, ya en el informe) | `noticias.mjs --meses 12 --valores 7211.SR` | 17:04 | oct-2025 a oct-2026 |
| Robustez: SÓLIDA; acción robusta **No mantener** (no comprar); límite común 12,91 SAR | `robustez.mjs --actual` | 17:03 | precio 29,52 (19-oct, cierre; Tadawul cierra ≈ 12:00 UTC) |

## Decisiones

- **Ejercicio a 30 de junio**, no a 31-dic como decía el encargo: periodos `FY2022`-`FY2026`, `cierre_ejercicio_mes: 6`, `etiqueta_ejercicio: "fin"`; trimestres con etiqueta fiscal (1T26 = jul-sep 2025); objetivo a 12 meses sobre FY2028e; PER actual sobre el BPA de los próximos 12 meses (8,4/12 de FY2027e + 3,6/12 de FY2028e), como en Cardinal Health.
- **Cuentas de FY2026 de fuente secundaria**: las auditadas no están en la web de inversores. Cuenta del anuncio a Tadawul + Yahoo (cuadran); balance y flujos de Stock Analysis; confianza «Media» y aviso en limitaciones.
- **Clientes = clientes comerciales + activos de contrato** en todos los años (Stock Analysis no los separa en FY2026). Proveedores incluye devengos (subcontratistas, también vinculados) y deudas con vinculadas. Caja = efectivo + fondos a valor razonable + sukuk.
- **Puente**: sin restar la recompra propuesta de 3,6 M acciones (financia el plan de empleados, cuyo coste ya está en el EBIT); 60 M acciones para el valor; 58 M para el BPA.
- **Sostenibilidad «En parte»** aunque las pruebas del motor dan «Sí»: sin foso, sin poder de precios, 75 % de ventas públicas, ≈ 50 % del trabajo subcontratado a empresas de los fundadores e IA. Con ello no pasa el filtro de calidad.
- **Regla 13: retrasa** hasta conocer precio y forma de pago de la compra de AZM FinTech a los fundadores (memorando del 2/3-ago-2026; 12 meses); la junta del 5-nov vota además 191,6 M de contratos marco con vinculadas.
- **Riesgo de IA**: exposición alta, amenaza (−15 % a −25 %); lo recoge el escenario bajista.
- **Robustez D5** (zakat del 6 % y beneficio > EBIT): falso positivo del zakat (lección saudí) y beneficio por encima del EBIT por rendimiento de fondos y asociadas; nuestra proyección ya lo normaliza (+2,5-4 M de resultado financiero frente a 5,3 M).
- Comparables sin EBITDA de 12 meses publicado: no entran en la síntesis (valor intrínseco = DCF y escenarios); se dan como contraste (14,50 SAR por EV/EBITDA).
- No se ejecutó `seguimiento.mjs` (prohibido en este encargo por el checkout compartido).
