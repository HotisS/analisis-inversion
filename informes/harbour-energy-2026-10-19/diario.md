# Diario: Harbour Energy plc (HBR.L), análisis value completo, corte 2026-10-19

- Commit de partida: `c41a165d286d400d4b2cac7218b56a39636bc93c` (19-oct-2026 15:16:54 UTC). Checkout compartido con otro análisis: sin pull, commit ni push (encargo).
- Inicio: 19-oct-2026, ≈ 15:22 UTC. Método: `.claude/commands/analiza-empresa.md` + `verticales/empresa/prompt.md` + lecciones (núcleo, Reino Unido, petróleo y gas). Sin informe previo de Harbour: análisis nuevo desde cero.

## Tiempos

| Hora (UTC) | Paso |
|---|---|
| 15:22 | Carpeta, lectura del método y lecciones |
| 15:25-15:40 | Cuentas ESEF (`cuentas.mjs --esef`), bolsa (`bolsa.mjs`), movimiento, descargas de informes y RNS, consenso, comparables (Yahoo), curvas de Brent y TTF |
| 15:40-15:50 | Modelo propio producción × precio (`notas/modelo.mjs`), calibrado con 2025 y el 1S26; bono del Tesoro (10 años) |
| 15:43-15:55 | Notas A-E (`notas/construir-notas.mjs`), `propio.mjs` + `textos.mjs`, `integrar.mjs`, `calcular-empresa.mjs` (controles: 18 correctos y 8 explicados), Word y PDF |
| 15:56-15:58 | Revisión 12 m, `apuntar-12m.mjs`, regla 13, `simbolos.json`, `precios.mjs` (cierre oficial 296,4 peniques: se rehízo el informe con ese precio), `robustez.mjs --actual` |

## Decisiones

1. **Divisa**: cuentas en USD; la acción cotiza en peniques (GBp). `meta.divisa` USD, `divisa_cotizacion` GBp, tipo de cambio 0,013307 USD por penique (GBPUSD 1,3307 el 19-oct a las 15:47 UTC, Yahoo).
2. **Acciones económicas**: 1.505,2 M con voto + 251,5 M sin voto de LetterOne × 1,13 (prima de dividendo del 13 %) = 1.789,4 M; 1.754 M en 2027-2028 tras lo que queda del programa de recompra de 250 M USD. Sin recompras no anunciadas.
3. **BPA**: el ajustado de la empresa (sin deterioros, bajas de exploración, partidas fiscales extraordinarias del EPL ni efectos de divisa no realizados) menos el cupón de los bonos subordinados (≈ 100 M USD al año). La historia del PER, en esa base.
4. **Beneficio de pico** (lección de energía): BPA de 2028 con la curva de futuros (Brent dic-28 78,3; TTF cal-28 ≈ 45 EUR/MWh). Escenarios por mazo de precios, no por un solo precio (`notas/modelo.mjs`).
5. **Impuestos**: tipo real del 75-80 % (EPL del 38 % + 40 % del Reino Unido; 78 % en Noruega) hasta el 31-mar-2030; luego el mecanismo de precios del petróleo y el gas (OGPM). El motor limita el impuesto al 40 % en el ROIC histórico: el ROIC real se calcula a mano (no pasa calidad).
6. **Desmantelamiento**: provisión de 7.423 M a 30-jun-2026 fuera del capex del DCF y restada en el puente neta del activo fiscal (≈ 39 %).
7. **Bonos subordinados** (2.044 M, en patrimonio): en el puente como derechos por delante del accionista (`minoritarios`).

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas 2020-2025 | `herramientas/cuentas.mjs --esef` (filings.xbrl.org, LEI 213800YPC42DYBKVPF97) | Informe anual 2025 (cuentas al 31-dic-2025, publicado 5-mar-2026) |
| Semestre | Resultados del 1S26 (PDF de la empresa) | 30-jun-2026 (publicado 6-ago-2026) |
| Acciones | RNS de derechos de voto y recompras (Investegate) | 30-sep y 13-oct-2026 |
| Bolsa (rentabilidades, beta, cierres anuales) | `herramientas/bolsa.mjs` (Yahoo) | Cierre del 16-oct-2026 |
| Movimiento (regla 13) | `herramientas/movimiento.mjs HBR.L` | 19-oct-2026 (294,8 peniques en sesión, caché de Yahoo) |
| Consenso | MarketScreener, Yahoo, MarketBeat | 19-oct-2026 |
| Comparables | `notas/yahoo-datos.mjs` (Yahoo) | 19-oct-2026 |
| Curvas de precios | Yahoo (Brent NYMEX), TradingView (TTF ICE Endex) | 19-oct-2026 |
| Tipo libre de riesgo | Tesoro de EE. UU., curva diaria (10 años 5,09 %) | 16-oct-2026 |
| Prima de mercado | Damodaran (prima implícita) | oct-2026 |
| Precio del informe | `herramientas/precios.mjs HBR` (la herramienta pide la clave del mapa, no el símbolo de Yahoo) | Cierre oficial del 19-oct-2026: 296,4 peniques (subasta de cierre, 15:35 UTC); GBPUSD 1,3307 (15:47 UTC) → 3,9442 USD |
| Robustez | `herramientas/robustez.mjs --actual` | 19-oct-2026, con el cierre de 296,4 peniques (la sesión ya había cerrado) |

## Resultado

- Regla a 12 meses (selector → v2, desrateada): objetivo 2,61 USD (196 peniques), **−28,6 % ponderada (base −34,8 %) → Vender**; v3 sin selector −20,6 %; BPA −10 %: −35,0 %.
- Valor intrínseco 5,35 USD (+36 %); DCF 5,03 USD (+27,5 %); escenarios 1,01 / 5,03 / 8,57 USD.
- Calidad: no pasa (ROIC real 6,6-9,1 % frente a WACC 8,25 %; el motor da 18,9 % porque limita el impuesto al 40 %). Sostenibilidad «En parte».
- Robustez: SÓLIDA; acción robusta «No mantener». Límite de compra 172,64 peniques; robusto (v3 y v2 con BPA −10 %) 157,27; ni así se compraría (calidad).
- Regla 13: no cambia.
- Archivos fuera de la carpeta tocados: `verticales/empresa/simbolos.json` (solo la entrada HBR), `precios.json` (lo escribe `precios.mjs`) y `objetivo12m-revisados.json` (lo escribe `apuntar-12m.mjs`). Sin commit (checkout compartido).
