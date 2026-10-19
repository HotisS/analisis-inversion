# Diario · Wasion Holdings (3393.HK) · 19-oct-2026

Commit de partida: `8e12032`. Procedimiento completo desde cero (`/analiza-empresa`), no un refresco. Fases A-E hechas por el mismo analista, sin subagentes (`notas/construir-notas.mjs`). Horas del contenedor (UTC) según las marcas de los archivos.

## Pasos y fecha de sus datos

| Paso | Hora (UTC) | Datos a fecha de |
|---|---|---|
| Identificación: Main Board de Hong Kong (3393.HK), ISIN KYG9463P1081, cuentas en CNY y precio en HKD; filial cotizada Willfar (688100.SS, 59,55 %); Wayon Energy con solicitud de salida a bolsa caducada | inicio | HKEXnews hasta el 16-oct-2026 |
| Descarga de cuentas HKEX (sin XBRL): informes anuales 2021-2025, intermedios 2025 y 2026, anuncios de resultados 2021-1S26, colocación, Boyu, spin-off, recompras, Willfar 1S26, anuncios de pedidos y de acciones | ≈10:27 | 2025 anual (22-abr-2026); 1S26 a 30-jun-2026 (27-ago y 18-sep-2026); acciones a 16-oct-2026 |
| `bolsa.mjs` y `movimiento.mjs` (1 m −12,8 %, 3 m −31,3 %, 6 m −61,9 %, 12 m −8,0 %; −62,9 % desde el máximo; avisos P3, P4 y P5) y `movimiento-precio.mjs` | ≈10:26 | cierre del 16-oct-2026 (12,28 HKD; HKEX cerrada el 19-oct) |
| Notas A-E: cuenta, balance, flujos, semestres, 3 segmentos, geografías, sector, foso, equipo y gobierno (votos de la junta), consenso, 8 comparables, sentimiento (Guba y Simply Wall St) | hasta ≈10:43 | consenso Yahoo/Stock Analysis 19-oct; comparables Yahoo 16/17-oct; noticias hasta el 16-oct |
| WACC: ChinaBond 10 años 1,6497 % (19-oct; 1,648 % el 16-oct), beta 1,1, ERP 5,5 + 1,0 → 7,78 %; tipos del BCE | ≈10:33 | bono 19-oct-2026; BCE 16-oct-2026 (0,85194 CNY/HKD); Damodaran oct-2026 (4,20 %) |
| Supuestos y puente (`supuestos.mjs`, `propio.mjs`) | ≈10:44-10:45 | balance a 30-jun-2026; Willfar a mercado del 16-oct; recompras hasta el 16-oct |
| Textos, riesgo de IA, `bolsa.contexto` (regla 13), suma de partes, resumen (`textos.mjs`, `textos-final.mjs`, `resumen.mjs`) | hasta ≈10:55 | — |
| `integrar.mjs` + `calcular-empresa.mjs` (16 de 20 controles correctos y 4 explicados; todas las citas con fuente) | ≈10:55 | — |
| Word (`rellenar.mjs`, cobertura 88,1 %) y PDF (soffice, 44 páginas) | ≈10:55 | — |
| `apuntar-12m.mjs` (v3 6,1 % / 6,2 % Mantener; v2 19,2 % Comprar) | ≈10:56 | precio del 16-oct-2026 |
| `simbolos.json` (3393.HK) y `precios.mjs 3393.HK` (con candado) | ≈10:56 | cierre del 16-oct-2026 |
| `robustez.mjs --actual`: FRÁGIL, acción robusta No mantener; BPA −10 %: −4,1 % / −4,0 % | ≈10:56 | precio del 16-oct-2026 |
| `revision-12m-2026-10-19.md` | ≈10:57 | — |

## Decisiones

- **Divisa**: todo en CNY (`meta.divisa`), cotización en HKD con el cambio del BCE del 16-oct (`tipo_cambio` 0,85194). Límites y objetivos se dan en las dos.
- **Caída del 64 %**: comprobada (33,80 → 12,28 HKD desde el 17-abr). Causas: subida previa ×4,7 por la euforia de la IA, colocación del control (21-abr, 50 M a 30 HKD), caducidad de la solicitud de Wayon (≈ 27-jul; probable, sin anuncio), Willfar −33,7 % (17-ago) y el 1S26 (27-ago: beneficio +1 %, margen bruto 31,3 %, clientes de 181-365 días ×2).
- **Perímetro y minoritarios**: Willfar consolidada (59,55 %); sus minoritarios (40,45 %) a valor de mercado en el puente (4.684 M); el resto a valor contable sin los 570 M de inversores de Wayon cubiertos por opciones de venta, que van como deuda (1.437 M) en `otros_ajustes`, junto con ≈ 153 M de recompras pagadas desde junio (estimación).
- **Circulante**: 33 % de las ventas en 2026e (32 % a junio de 2026) que sube al 38 %; resta valor y hace que el DCF inverso no tenga solución (explicado).
- **Beta 1,1** en lugar de la medida (0,56 mensual, 0,91 semanal de 2 años): el Hang Seng no recoge el riesgo de un fabricante pequeño de licitaciones.
- **Sostenibilidad**: «Sí» (veredicto del motor): el capital nuevo debe rendir un 14,1 %, por debajo del ROIC de 2025 (20,2 %); la fórmula simple da 9,9 % financiable frente al 11,8 % proyectado, por eso se sube la reinversión (circulante y capex) y se deja la salvedad escrita.
- **Suma de partes**: Willfar a mercado menos caja neta (10.627 M), Wayon a la ronda de Boyu (4.750 M), contadores a 8 veces el resultado del segmento (4.790 M): 14,83 CNY por acción.
- **Objetivo a 12 meses**: historia adelantada 2018-2025 sin exclusiones; 2025 (14,7x, euforia) se queda porque la mediana de 5 años no cambia. La v2 se guarda en `per_historico.v2` (control).
- **Huecos** (9): años de auditor, consenso semestral, CR5 y TCAC histórico del sector, ratings ESG, ratio de salario medio, transacciones, EV/EBITDA NTM y ROIC de comparables, posiciones cortas y foros occidentales.

## Resultado

Mantener, convicción media. A 12 m (v3): ponderado 10,68 CNY / 12,54 HKD (+6,1 %), base 10,69 (+6,2 %); v2 de control +19,2 % (Comprar). Valor intrínseco 18,09 CNY (+72,9 %). ROIC 20,2 % frente a WACC 7,78 %. Comprar por debajo de 11,33 HKD; vender por encima de 14,47 HKD. Robustez FRÁGIL (No mantener); límite robusto 10,24 HKD. Regla 13: no cambia. Próximos resultados: anuales hacia el 26-mar-2027.

## Lecciones propuestas

- **HKEX, solicitudes caducadas**: el folleto de solicitud (Application Proof) de una filial que no sale a bolsa en seis meses devuelve 404, y la lista JSON de solicitudes activas de HKEX (`appactive_app_sehk_e.json`) confirma la caducidad; las cifras hay que sacarlas de la prensa china que resumió el folleto. Va a `lecciones-paises.md` (China/Hong Kong).
- **Consenso de Hong Kong y acciones A**: el `earningsTrend` de Yahoo (quoteSummary) da BPA y ventas de consenso con su valor de hace 90 días para 3393.HK y 688100.SS; sirve donde MarketScreener pide registro.
- **Opciones de venta a minoritarios de una filial** (Wayon, 1.437 M): van a `otros_ajustes`, y los minoritarios que cubren se quitan de `minoritarios` para no restarlos dos veces. Va a `lecciones-casos.md`.
- **Filial cotizada relevante**: minoritarios de la filial a valor de mercado en el puente y suma de partes con la filial a su capitalización menos caja neta; aquí la participación vale el 64 % de la matriz.
