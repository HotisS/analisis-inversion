# Diario: Lundin Gold (LUG.TO), análisis value del 20-oct-2026

- Commit de partida: `58013cc` (Cola de índices: Cheryong Electric (pareja 20)), 11:44 UTC. Checkout compartido con otro análisis en paralelo: sin pull, commit ni push desde este hilo.
- Inicio: 11:44 UTC.
- Análisis nuevo, método completo (no hay informe anterior de Lundin Gold ni de otra minera de oro en `informes/`). Notas A-E escritas por el analista (sin subagentes), con la forma de `informes/cardinal-health-2026-10-19/`.
- Decisiones:
  - Divisas: cuentas en USD y cotización en CAD. `identificacion.precio` en USD (91,25 / 1,4097 = 64,73); `meta.tipo_cambio` 0,70937 USD por CAD (Banco de Canadá, 19-oct). Cierres de la historia del PER pasados a USD con el tipo de cada 31 de diciembre; el consenso de Yahoo y MarketScreener (en CAD) pasado a USD.
  - Oro del caso base: 4.150 USD/oz plano (cierre del 19-oct ≈ 4.160). Bajista 3.300 (perfil de 2027 −18,3 puntos de crecimiento, margen −5,5, WACC +0,5, g −4 %); alcista 4.900 (perfil +16,1, margen +3). Producción de la guía (500.000 oz) hasta 2028 y caída suave después por la ley.
  - WACC 14,7 %: bono de EE. UU. 5,15 % + 1,10 × 5,5 % + 3,5 % de prima de Ecuador (Caa3; ≈ 0,27 × 12,9 %). Terminal −3 % (agotamiento de la mina).
  - Plata fuera de ingresos (stream con LunR desde abril de 2026) y su pasivo fuera del puente. Puente a 30-jun-2026: caja 507,1; otros ajustes 516,7 (dividendo del 2T pagado en septiembre 261,2 + impuestos a pagar 178,5 + 50 % de la reclamación del SRI 77).
  - BPA ajustado de la empresa; historia adelantada sin 2018-2019 (sin beneficio normal). PER actual sobre 0,2 × 2026e + 0,8 × 2027e.
  - LTM a junio de 2026: DPA 7,04 (3,95 ordinario + 3,09 de las acciones de LunR, extraordinario).
  - Convicción media (el motor sugiere alta): todo depende del oro; con oro a 4.900 el base a 12 meses sería ≈ +17 %.
  - Comparables: Endeavour cotiza en peniques; Yahoo da su capitalización en GBP (corregido a 1,34 USD por GBP).
  - `simbolos.json`: la entrada LUG la recogió el commit paralelo `dc7f22a` (TeamViewer), porque el checkout es compartido.
- Revisión a 12 meses: v3 −15,5 % ponderada, base −5,4 % → Vender (v2 −17,2 %, Vender); objetivo 50,74 USD (71,53 CAD). Apuntada con `apuntar-12m.mjs`.
- Robustez (`--actual`, 12:16 UTC, antes de la apertura de Toronto): SÓLIDA, acción robusta «No mantener»; límite de compra 35,20 CAD. BPA −10 %: −23,3 % / −14,3 %. Variante «sin doble castigo»: −9,4 % (Mantener).
- Fin del análisis: 12:17 UTC (33 minutos desde el inicio anotado); pendiente volver a pasar robustez con el precio del día tras la apertura de Toronto (13:30 UTC).

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas 2021-2025 | Informes anuales auditados (NIIF, USD), copiados a mano (Canadá sin XBRL) | 31-dic-2025 |
| Trimestres y balance | Estados intermedios del 1T y 2T 2026 | 30-jun-2026 |
| Producción y ventas del 3T | Nota de prensa de Lundin Gold | 8-oct-2026 (dato a 30-sep) |
| Reservas y recursos | Nota de reservas a 31-dic-2025 y AIF 2025 | 31-dic-2025 |
| Precio, rangos, beta, cierres | `herramientas/bolsa.mjs` (Yahoo) | 19-oct-2026 |
| Precio de la decisión | `herramientas/precios.mjs LUG` | 19-oct-2026 (91,25 CAD) |
| Movimiento (regla 13) | `herramientas/movimiento.mjs LUG.TO` | 19-oct-2026 |
| Noticias de 12 meses | `herramientas/noticias.mjs` | 20-oct-2026 |
| Consenso | MarketScreener y Yahoo (CAD) | 19-oct-2026 |
| Comparables | Yahoo quoteSummary | 19-oct-2026 |
| Tipo de cambio | Banco de Canadá (Valet, FXUSDCAD) | 19-oct-2026 (1,4097) |
| Tasa libre | Tesoro de EE. UU. (10 años, 5,15 %) | 19-oct-2026 |
| Beta sectorial, prima país, prima implícita | Damodaran (betaGlobal, ctryprem, ERPbymonth) | ene-2026 / oct-2026 |
| Oro | Yahoo (GC=F) | 19-oct-2026 (≈ 4.160 USD/oz) |
| Robustez | `herramientas/robustez.mjs --actual` | 19-oct-2026 (precio) |

Precio de hoy: Toronto no había abierto al terminar (abre a las 13:30 UTC), así que robustez no se volvió a pasar. Referencia de la sesión de Estocolmo (LUG.ST): 626,6 SEK a las 12:16 UTC (−3,6 % sobre el cierre anterior), ≈ 88,2 CAD (≈ 62,8 USD) al cambio de ese momento. Con ese precio la señal sigue en Vender (la variante «precio −5 %» da −11,1 % ponderada).
