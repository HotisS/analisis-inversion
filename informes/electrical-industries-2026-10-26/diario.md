# Diario · Electrical Industries Company (1303.SR) · 26-oct-2026

Iteración nueva tras los resultados del 3T26 (publicados el 22-oct-2026). Procedimiento completo (`/analiza-empresa`): carpeta nueva, fases A-E hechas a mano en este hilo, en orden y sin subagentes (cuatro análisis a la vez). Informe anterior (`electrical-industries-2026-10-19`) solo como punto de partida: cada dato se vuelve a comprobar. Mismo ticker y clave (`1303.SR`). Horas de Madrid (UTC+1 desde el 25-oct) sacadas de `TZ=Europe/Madrid date`.

Commit de partida: `60b9454 Informe tras resultados 26-oct: Rexel (análisis completo)` (11:12; al abrir el encargo, 11:09, era `c85310b`; otros hilos hacen commit en paralelo, el prompt y el motor no cambian entre ambos).

## Pasos, con la fecha de los datos

| Paso | Hora (Madrid) | Datos a fecha de |
|---|---|---|
| Lectura del encargo, `analiza-empresa.md`, `prompt.md` entero, `lecciones.md`, Arabia Saudí en `lecciones-paises.md`, contratistas en `lecciones-casos.md`, `METODO-VIGENTE.md` §1-5 | 11:09-11:11 | — |
| Comprobación de que los resultados existen: anuncio de Tadawul de los 9M26 (Mubasher, 22-oct-2026 08:00) y ficha de resultados de Argaam (22-oct) | 11:10 | 22-oct-2026 |
| Carpeta nueva `informes/electrical-industries-2026-10-26/` con `notas/` y `notas/docs/` | 11:10 | — |
| `bolsa.mjs` (1303.SR, índice KSA, sector GRID) | 11:12 | cierre del 25-oct-2026 (10,17 SAR); la sesión del 26-oct seguía abierta (Tadawul cierra a las 13:00 de Madrid) |
| `movimiento.mjs 1303.SR` (1 m −31,2 %, 6 m −41,2 %, 12 m −1,7 %; P3, P4, P5) | 11:12 | sesión del 26-oct en curso (10,47) |
| Fase A (cuentas): cuenta 2021-2025 recomprobada con las sumas trimestrales de Argaam (2025: ventas 2.296,2, bruto 860,3, beneficio 629,9 M SAR); 3T26 y 9M26 del anuncio de Tadawul (vía Mubasher) y de Argaam; LTM sep-26; los estados de los 9M26 no se pudieron descargar (API de Argaam IR no disponible, Tadawul 403, Stock Analysis hasta jun-26): hueco de núcleo | 11:13-11:16 | 22-oct-2026 (resultados); balance 30-jun-2026 |
| Fase B (sector): fábrica de cubas y radiadores (150 M SAR, 25-oct), guerra y Ormuz (S&P Global, 22-jul) como motor nuevo | 11:16 | 26-oct-2026 |
| Fase C (gobierno): lista de anuncios de Tadawul a 26-oct (sin cambios de consejo ni accionistas desde el 23-jul); Argaam (ANB «Overweight») | 11:17 | 26-oct-2026 |
| Fase D (mercado): consenso MarketScreener sin revisar tras el 3T26 (un analista, objetivo 15,50); ANB esperaba 219,5 M de beneficio en el 3T26 (real 177,7; 151,6 sin el reembolso); FRED DGS10 4,96 % (22-oct); comparables del 16/18-oct llevados al 23/25-oct con Yahoo (`eic-precios-comparables.mjs` en el scratchpad) | 11:17-11:19 | 22 a 26-oct-2026 |
| Fase E (sentimiento): Hawamer (títulos sin mensajes), Investing (sin fechas), Stocktwits 404 → omitido | 11:18 | 26-oct-2026 |
| `construir-notas.mjs` → notas A-E | 11:19 | — |
| Supuestos (`supuestos.mjs`), BPA por escenario (`eic-bpa.mjs` en el scratchpad), `objetivo.mjs` | 11:20-11:21 | 9M26 publicados |
| Primer `integrar.mjs` + `calcular-empresa.mjs` (DCF 5,78; Mantener) | 11:21 | — |
| Textos (`textos.mjs`, `textos-final.mjs`, `resumen.mjs`) reescritos con el 3T26; dos pasadas de integrar + calcular: 19 de 25 controles y 6 explicados; todas las citas con fuente | 11:22-11:26 | — |
| Word (`rellenar.mjs`, cobertura 83,6 %, 27 gráficos) y PDF (soffice, 45 páginas); portada y «La decisión» revisadas como imagen | 11:26 | — |
| `apuntar-12m.mjs electrical-industries-2026-10-26` y comprobación con grep en `objetivo12m-revisados.json` (1 coincidencia) | 11:26 | cierre del 25-oct (10,17) |
| `robustez.mjs --actual` y `--json`: SÓLIDA, No mantener, nivel ninguno, A 7,47 / B1 7,81, sin CORREGIR | 11:27 | sesión del 26-oct (10,49, de `precios.json`) |
| `revision-12m-2026-10-26.md` | 11:27 | — |

## Decisiones

- **Resultados comprobados antes de empezar**: el anuncio de Tadawul de los 9M26 existe (22-oct-2026, 08:00; Mubasher) y Argaam publica sus tablas el mismo día.
- **Precio**: cierre del 25-oct (10,17 SAR); la sesión del 26-oct (domingo a jueves; cierre a las 13:00 de Madrid) seguía abierta.
- **Balance**: sin los estados de los 9M26 (API de Argaam IR no disponible en esta sesión, Tadawul 403, Stock Analysis aún en junio), el puente sigue a 30-jun-2026 con el dividendo pagado el 23-ago (139,1 M) menos el reembolso cobrado en julio (26,1 M): +113,0 M de otros ajustes. Patrimonio a 30-sep (1.319,1 M) del anuncio. Hueco de núcleo registrado.
- **LTM sep-26** = LTM jun-26 + 3T26 − 3T25 (ventas 2.698,6; EBIT 805,4; beneficio 788,7 con el reembolso). EBITDA con amortización del 3T26 estimada; FCF LTM en null.
- **Misma base del PER (aviso del hilo)**: comprobado. Historia contable (BPA publicado del año siguiente; 2025 ÷ nuestro BPA contable de 2026e, 0,68 con el reembolso) y casos de 2028e sin extraordinarios. Si se usara el recurrente de 2026e (0,655) el PER de 2025 sería 17,1x y la mediana no cambia (12,89x): la regla no se mueve.
- **Circulante del DCF a su nivel real**: 38 % de las ventas (37,4 % en 2025, 38,2 % en 2024), sin liberar caja.
- **Beta reapalancada con la deuda de EIC**: ajustada mensual de 5 años 1,11; desapalancada con D/E ≈ 1,2 % y tipo del 6 % da 1,10 y reapalancada con la misma estructura 1,11 → 1,1. No se copia de un comparable.
- **Consenso tras resultados**: MarketScreener sigue con las cifras previas (un analista); contrastado con Investing (sin previsiones) y Argaam (ANB, previsión trimestral de 219,5 M sin objetivo). Marcado como anterior a los resultados; confianza baja.
- **Comparables**: los del 16/18-oct (Stock Analysis) llevados al 23/25-oct con la variación del precio de Yahoo (lección de reutilización); mediana del PER NTM 19,6x.
- **Supuestos**: ventas 2026e 2.700 M (+17,6 %; antes 2.870), margen 30,8 % (antes 32 %), senda de margen un año adelantada (29,5 % en 2027e, 28 % en 2028e, 24,5 % en 2031e); capex con la fábrica de cubas (150 M en 2027-2029). WACC 12,23 % (Treasury 4,96 % del 22-oct).
- **Disparador del informe anterior**: «margen bruto trimestral por debajo del 33 % → bajar el base». El 3T26 dio 33,9 %: no se cumplió del todo, pero el base se rebaja igual por las ventas y el beneficio recurrente del trimestre.
- **Convicción**: baja (el motor sugiere media) por los datos de núcleo que faltan (balance de los 9M26) y el consenso sin revisar.
- **Sentimiento**: omitido (Hawamer solo títulos; Investing sin fechas; Stocktwits 404).

## Resultado

Mantener, convicción baja. A 12 m (v3): ponderado 9,26 SAR (−6,5 %; apuntado −6,4 %), base 9,59 (−3,2 %); v2 +4,9 %. Valor intrínseco 7,85 (−22,8 %); DCF 5,78. ROIC 70,0 %, WACC 12,23 %. Comprar por debajo de 7,85; vender por encima de 10,57. Robustez SÓLIDA (No mantener), límite robusto 7,47, B1 7,81. Regla 13: no cambia.
