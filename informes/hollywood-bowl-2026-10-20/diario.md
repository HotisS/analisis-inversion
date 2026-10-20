# Diario: Hollywood Bowl Group (BOWL.L), análisis value del 20-oct-2026

- Commit de partida: `9516a7be3dfdf19a838ee59e0dcb60f61b809323` (2026-10-20 08:20 UTC). Checkout compartido con otro análisis en paralelo: sin pull, commit ni push desde este hilo.
- Inicio: 08:20 UTC.
- Análisis nuevo, método completo (no hay informe anterior de Hollywood Bowl en `informes/`). Notas A-E escritas por el analista (sin subagentes), con la forma de `informes/cardinal-health-2026-10-19/`.
- Fin: 08:56 UTC (≈ 36 minutos de trabajo efectivo más la recogida de documentos de antes del corte de contexto).

## Decisiones
- **Precio**: 2,755 GBP (275,5 p), cierre del 19-oct-2026 («previousClose» de Yahoo; la serie diaria no traía ese cierre y `bolsa.mjs` daba el del 16-oct, 267 p). Hoy: 275,5 p a las 07:56 UTC (Yahoo) y 274,55 p en `precios.mjs` a las 08:53 UTC; la decisión usa el de la sesión (`robustez.mjs --actual`).
- **Divisa**: cuentas en GBP; cotiza en GBp (`meta.tipo_cambio` 0,01). Clave `BOWL` añadida a `simbolos.json` (no confundir con la antigua BOWL de Nueva York, hoy LUCK).
- **Cuentas**: ESEF de filings.xbrl.org (FY2021-FY2025) completado con los RNS (el ESEF trae solo el coste de la mercancía, gastos de administración sin la amortización de derechos de uso y una amortización parcial). FY2026 cerrado pero sin publicar: avance del 7-oct-2026 (ventas 261,6 M, 95 centros, caja neta 13,5 M); LTM a 31-mar-2026.
- **NIIF 16**: arrendamientos (235,1 M) en el puente como deuda; la inversión del DCF incluye las altas de derechos de uso (aperturas); amortización con derechos de uso y deterioros de centros (se repiten cada año).
- **Base del BPA**: la nuestra (NIIF 16, deterioros dentro, sin partidas ajustadas), también para la historia del PER (impuesto al tipo general de cada año). El ajustado de la empresa y del consenso es pre-NIIF 16 y sin deterioros (≈ 2,9 p más): no se mezcla.
- **Historia del PER**: solo FY2021-FY2025 (antes, covid y pre-NIIF 16). Mínimo 8,8x (2022).
- **Comparables**: no hay boleras cotizadas en Europa; pubs británicos, gimnasios y ocio bajo techo (mediana del PER 14,4x sin The Gym Group ni XP Factory). Transacciones con peso 0: solo dos con múltiplo (el motor pide tres).
- **Notas A-E** escritas por el analista con `notas/construir-notas.mjs` (sin subagentes); `propio.mjs` con `supuestos.mjs` y `textos.mjs`.
- **Ficha de sector (ocio de proximidad)**: no existe en `sectores/` y no se escribe desde este hilo (checkout compartido: solo escribo en mi carpeta); pendiente para el hilo principal.
- **Calidad**: ROIC 12,5 % − WACC 8,16 % = 4,3 puntos (< 5): no pasa el requisito de calidad. Sostenibilidad: «Sí» (motor y analista).
- **Regla 13**: veredicto «no cambia» (caídas explicadas por dividendo o por el calor ya confirmado; sin colocaciones, litigios ni ofertas; resultados en diciembre, fecha por confirmar).

## Resultado
- Motor: 20 de 20 controles. DCF 3,87 GBP (+40,5 %), valor intrínseco 3,81 (+38,3 %), DCF inverso 2,2 % de crecimiento.
- Revisión a 12 meses (v3): objetivo 2,80 GBP; ponderada +6,5 %, base +12,1 % (v2 +6,8 %) → **Mantener**; comprar por debajo de 2,55 GBP (255 p), vender por encima de 3,26.
- Robustez con la sesión (274,55 p): ponderada +7,0 %, base +12,5 %; SÓLIDA; acción robusta **No mantener**; límite común 255,46 p; filtro de mantener 267,07 p; límite robusto (BPA −10 %) 230,33 p.

## Pasos y fecha de los datos
| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas oficiales FY2021-FY2025 | `herramientas/cuentas.mjs --esef` (filings.xbrl.org) + RNS de resultados | 30-sep-2025 (publicadas el 16-dic-2025) |
| Semestre 1S26 y LTM | RNS de resultados semestrales | 31-mar-2026 (publicado el 27-may-2026) |
| Avance de FY2026 | RNS Trading Statement (Investegate) | 30-sep-2026 (publicado el 7-oct-2026) |
| Acciones en circulación | RNS Total Voting Rights | 30-sep-2026 |
| Bolsa (rentabilidades, beta, cierres de ejercicio) | `herramientas/bolsa.mjs` (Yahoo) | 16-oct-2026 |
| Precio del informe | Yahoo quoteSummary («previousClose») | 19-oct-2026 (cierre) |
| Consenso, comparables y tipos de cambio | `notas/yahoo-datos.mjs` (Yahoo quoteSummary) | 20-oct-2026, 08:29 UTC |
| Gilt a 10 años | Banco de Inglaterra (CSV copiado del análisis de Computacenter) | 15-oct-2026 |
| Prima implícita del mercado | Damodaran, ERPbymonth | oct-2026 |
| Operaciones de directivos y participaciones | RNS (Investegate) | ene-oct 2026 (último, 13-oct-2026) |
| Movimiento (regla 13) | `herramientas/movimiento.mjs BOWL.L` | 20-oct-2026 (08:53 UTC) |
| Cálculo | `motor/integrar.mjs` + `motor/calcular-empresa.mjs` | 20-oct-2026 |
| Revisión a 12 meses | `herramientas/apuntar-12m.mjs` | 20-oct-2026 |
| Precio de la sesión | `herramientas/precios.mjs BOWL` | 20-oct-2026, 274,55 p (≈ 08:53 UTC) |
| Pruebas de robustez | `herramientas/robustez.mjs --actual` | 20-oct-2026 |
