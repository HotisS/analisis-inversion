# Diario · Lotes (3533.TW) · corte 20-oct-2026

- Commit de partida: `e370950` (ASPEED: análisis value completo 20-oct). Checkout compartido con otro análisis: sin pull, commit ni push en este encargo.
- Análisis hecho de cero; el intento del 19-oct no se ha usado.
- Horas (UTC): inicio 16:43 · bolsa y movimiento 16:45 · descargas y cuentas 16:50-17:05 · notas A-C hasta ≈ 17:00-17:05 (con la interrupción del contexto) · notas D y E y propio 17:05-17:12 · integrar y calcular 17:12-17:13 · Word y PDF 17:13-17:14 · símbolo, precios, apuntar-12m y robustez 17:15 · revisión a 12 m y diario 17:17.

## Decisiones

- **Cuentas**: MOPS no responde desde la nube. Se usan los estados financieros consolidados auditados por KPMG que publica la web de la empresa (lotes.cc): anuales 2019-2025 (los de 2025 en chino, publicados el 11-mar-2026; los demás en inglés), 1T26 (15-may-2026), informe anual de 2025 (11-may-2026) y actas de la junta de 2026. El 2T26 sale de la OpenAPI de la TWSE (cuenta resumida y balance a 30-jun-2026) y el detalle trimestral, de StockAnalysis (S&P Global). Las notas completas del 2T26 no se han leído.
- **Segmentos**: líneas de producto de la nota XIV (servidores, sobremesa, portátiles, estratégicos, Lintes, automoción, otros), que suman las ventas del grupo.
- **Puente (jun-26)**: caja 16.198 M (efectivo, inversiones a corto y 2.201 M de acciones cotizadas, sobre todo TSMC); deuda 507 M; arrendamientos 997,2 M; minoritarios 2.135,5 M (valor contable); pensiones 43 M; inversiones a largo plazo 943 M (valor contable, como asociadas); otros_ajustes 3.927,8 M = dividendo de 35 TWD aprobado el 12-jun, pendiente de pago a 30-jun (ex dividendo 4-ago), que seguía en la caja.
- **Base de ventas**: 2026e fijo +16,0 % (enero-septiembre oficial 28.835 M + 4T26 ≈ 10.350 M), +20 % en 2027e (Venice, Oak Stream, QD, SO-CAMM), +10 % en 2028e y −8 % en 2029e (digestión del ciclo; precedente 2023 −9,7 %). Margen EBITDA 34 % → 36-37 % → 35 % a largo plazo: no vuelve al 41,6 % de 2024 por las materias primas (≈ 65 % del coste de ventas).
- **Diferencia con el consenso**: nuestro BPA 2027e (91,79) está un 19,8 % por debajo del consenso (114,46); la diferencia es de margen (beneficio neto del 22 % de las ventas frente al 26 %). No se acerca: el consenso recorta y la empresa no sabe si recuperará el margen.
- **Resultado financiero**: intereses de la caja (≈ 2 %) sin diferencias de cambio desde 2027e; 2026e lleva lo ya contabilizado en el 1S26 (790 M, con la plusvalía de 531 M de TSMC). El efecto USD/TWD (+910 M en 2024, −946 M en 2025) va como riesgo, no en la proyección.
- **WACC 9,58 %**: bono de Taiwán 2,03 %, beta 1,10 (mensual 0,64, semanal 1,05-1,14), prima 5,5 % y 1,5 puntos por China (producción) y Taiwán. Terminal Gordon 1,5 % (implica 6,9x EBITDA; el circulante del 44 % y el capex del 8,5 % pesan).
- **Clientes**: primer cliente 8,31 %, tres primeros 21,7 % (informe anual 2025); la concentración real es de plataforma (Intel y AMD), y así se trata en riesgos.
- **Regla 13**: «no cambia». La ampliación de capital de agosto es de la filial Lintes (6715) y Lotes la suscribe; Lotes no tiene emisiones ni convertibles pendientes. Las caídas de junio-septiembre tienen causa conocida (margen del 2T26).
- **Sentimiento**: escaso (PTT abril-mayo y el indicador de CMoney); confianza baja.
- **Convicción Media** (la que sugiere el motor).
- **Precio**: el informe usa 1.805 TWD, cierre del 20-oct (Yahoo regularMarketPrice a las 05:30:29 UTC, coincide con StockAnalysis, 1:30 PM CST). precios.mjs dejó 1.815 (19-oct) porque la barra diaria del 20-oct traía el cierre vacío; robustez --actual tomó 1.815. La señal no cambia: con los dos precios, Mantener y ningún nivel de compra (límite 1.359,43).
- **Avisos del Word que se dejan**: gráficos de EV/EBITDA de los próximos doce meses de los comparables (no hay EBITDA estimado en las fuentes abiertas), suma de partes y calificaciones ESG vacías; la sección de gobierno queda por debajo del 60 % de campos (votos de la junta y remuneración del consejero delegado no publicados en lo leído).

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas 2019-2025 | Estados financieros auditados (KPMG), web de la empresa | 31-dic-2025 (publicados 11-mar-2026) |
| Cuentas 1T26 | Estados del 1T26, web de la empresa | 31-mar-2026 (publicados 15-may-2026) |
| Cuenta y balance 2T26 | OpenAPI TWSE t187ap06_L_ci, t187ap07_L_ci | 30-jun-2026 (leídos 20-oct) |
| Detalle trimestral y LTM | StockAnalysis (S&P Global) | 30-jun-2026 (actualizado 14-ago-2026) |
| Informe anual 2025 (clientes, consejo, plantilla) | Web de la empresa | 11-may-2026 |
| Ventas mensuales | OpenAPI TWSE t187ap05_L y web de la empresa | sep-26 (publicadas 10-oct) |
| Dividendos | OpenAPI TWSE t187ap45_L | 19-oct-2026 |
| Consejeros y pignoraciones | OpenAPI TWSE | 20-oct-2026 |
| Conferencias de resultados | UAnalyze, Fugle, Money Weekly, Commercial Times | 14-may y 13-ago-2026 (análisis hasta 14-sep) |
| Consenso | StockAnalysis (S&P Global) y Yahoo | 20-oct-2026 |
| Comparables | Yahoo quoteSummary (`notas/yq.mjs` del scratchpad) | 20-oct-2026 |
| Precio y bolsa | bolsa.mjs, movimiento.mjs (Yahoo) | 19-oct-2026 (1.815); cierre del 20-oct 1.805 de la cotización |
| Sector | Bishop (vía passive-components.eu), Intel Market Research, TrendForce | 2025-ago a 14-oct-2026 |
| Transacciones | SEC (CommScope), Evertiq, WireNet | 2024-05 a 2025-08 |
| Bono a 10 años | Trading Economics, 2,03 % | 20-oct-2026 |
| Prima implícita | Damodaran, 4,20 % | oct-2026 |
| Sentimiento | PTT, CMoney | abr-may 2026 y 14-oct-2026 |
| Cálculo y Word | integrar, calcular-empresa, rellenar; PDF con LibreOffice | 20-oct-2026 |
| precios.mjs | Yahoo | 1.815 (19-oct; barra del 20-oct sin cierre) |
| apuntar-12m | objetivo12m-revisados.json | 20-oct-2026: v3 −1,4 % / base 7,1 % (v2 7,7 %) |
| Robustez | robustez.mjs --actual | 20-oct-2026 con precio 1.815: SÓLIDA, «No mantener», límite 1.359,43 |

## Lecciones (para quien mantenga las lecciones; no escritas allí por el checkout compartido)

- Taiwán: cuando MOPS no responde, la web de la empresa suele tener los estados financieros auditados en PDF (lotes.cc/data/finance/file/…), y la OpenAPI de la TWSE da la cuenta y el balance resumidos del último trimestre (t187ap06_L_ci, t187ap07_L_ci).
- Taiwán: el dividendo aprobado en junio y pagado en agosto está en la caja del balance de junio; va en `otros_ajustes`.
- Yahoo deja el cierre del día en null en la barra diaria durante horas tras el cierre de Taipéi (05:30 UTC), y precios.mjs guarda el del día anterior; regularMarketPrice ya lo trae.
