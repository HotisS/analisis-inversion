# Diario · Computacenter (CCC.L) · análisis value desde cero · 20-oct-2026

- Commit de partida: `47c9863` («Cola de índices: fuera ChiNext y STAR…»). Checkout compartido con otro análisis en paralelo: sin git pull, commit ni push desde esta tarea (el otro hilo hizo `77f4bfe`, que ya incluye la entrada CCC de `simbolos.json`).
- Inicio ≈ 07:42 UTC; informe y robustez terminados ≈ 08:20 UTC (≈ 40 minutos más la parte de documentación previa a la compactación del contexto).
- No se usó el intento parado del 19-oct (no está en `informes/`). Todo dato se tomó de nuevo.

## Decisiones

- **Cuentas**: ESEF de filings.xbrl.org (2022-2025) con `cuentas.mjs --esef`; 1S26 del RNS 7571T (PDF); resultados de 2024 y 2025 del NSM de la FCA. La web de inversores, Investegate y lse.co.uk dan 403. 2020 fuera de la cuenta (criterio de agente/principal no reexpresado).
- **Divisa**: cuentas en GBP, cotización en peniques (GBp): `meta.tipo_cambio` 0,01 y precios por acción en GBP.
- **Ventas NIIF, no facturación bruta**: el DCF y el BPA usan ventas NIIF (criterio de agente); la facturación bruta (12.988 M en 2025) se da solo como indicador.
- **Margen**: EBITDA ajustado del 3,39 % en 2026e (guía ≥ 380 M de beneficio antes de impuestos) y 3,30 % después por la mezcla de hiperescala (margen bruto 9,6 % en el 1S26). No se supone vuelta a los márgenes de 2021-2023.
- **Circulante**: −1,5 % de las ventas, media entre el cierre de año (−5,6 %, cobros anticipados) y junio (≈ +2 %), para no inflar la caja.
- **Caja neta / puente**: a 30-jun-2026 (caja de junio, sin los cobros de fin de año). Deuda asimilada: «invoice financing» sin recurso (140,5 M) y venta de cuentas a cobrar (43,4 M), más el dividendo a cuenta ya descontado en el precio (28,6 M) → `otros_ajustes` 212,5. Pensiones 21,2 × 0,75.
- **WACC 10,57 %**: gilt 5,31 % (BoE, `curl --http1.1`), beta 1,0, prima 5,0 % + 0,5 por concentración (un cliente = 30 % de las ventas).
- **Escenarios**: bajista con `perfil` en 2027e (−15 puntos: frenazo del cliente de hiperescala, como el exceso de pedidos de 2022) en vez de un recorte uniforme permanente; prob. 30/50/20.
- **Objetivo a 12 meses**: ejercicio 2028e; PER actual con el BPA de los próximos 12 meses (2,4/12 de 2026e + 9,6/12 de 2027e = 2,71; 18,5x). Historia adelantada con el BPA ajustado diluido de los informes anuales (2018 75,7 p: tabla de cinco años del informe de 2022).
- **Convicción media** frente a la «alta» sugerida: base solo −3,5 %, estimaciones +19 % en 90 días y avance del 3T inminente (explicado en la síntesis).
- **Comparables**: el gráfico de crecimiento frente a EV/EBITDA NTM no se dibuja (Yahoo no da EBITDA estimado; no se inventa).
- **Ficha sectorial**: no hay ficha de «revendedores de TI con servicios» en `sectores/`; no se crea desde aquí (restricción de escritura del encargo). Queda pendiente para el hilo principal; la sección B del informe cubre el sector.
- **Regla 13**: movimientos fuertes de 12 meses con causa en resultados y guía (no cambian); la caída de octubre (−9,8 % en un mes) por la rebaja de Dell por Barclays y la venta del hardware de IA (no cambia: no hay dato nuevo de la empresa). Sin avisos P.
- **Robustez (`--actual`, 48,96 GBP)**: SÓLIDA, acción robusta «No mantener». No es compra.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas 2021-2025 | `cuentas.mjs --esef` (filings.xbrl.org) + informes anuales ESEF 2022-2025 | 31-dic-2025 (publicado 11-mar-2026) |
| Semestre y guía | RNS 7571T, resultados del 1S26 | 30-jun-2026 (publicado 8-sep-2026) |
| Resultados 2024 y 2025 (perspectivas) | NSM de la FCA (RNS 0178B y 3274W) | 18-mar-2025 y 12-mar-2026 |
| Accionistas fundadores | RNS 0061O (PDMR) | 27-jul-2026 |
| Bolsa (series, beta, volatilidad) | `bolsa.mjs` (Yahoo) | cierre del 16-oct-2026 |
| Precio del informe | Yahoo «previousClose» y MarketScreener | cierre del 19-oct-2026 (50,25 GBP) |
| Consenso, comparables y divisas | `yahoo-datos.mjs` (Yahoo quoteSummary) y MarketScreener | 20-oct-2026, 07:30 UTC |
| Tasa libre | Banco de Inglaterra, IUDMNPY | 15-oct-2026 |
| Mercado (Gartner) | Gartner, previsión de gasto en TI | abril-mayo de 2026 |
| Noticias de 12 meses | `noticias.mjs` y artículos abiertos | hasta el 19-oct-2026 |
| Regla 13 | `movimiento.mjs CCC.L` | 20-oct-2026 (4.900 GBp) |
| Precios | `precios.mjs CCC` | cierre 16-oct (serie) y sesión del 20-oct (4.896 GBp, ≈ 08:15 UTC) |
| Cálculo | `integrar.mjs` + `calcular-empresa.mjs` (21 de 21 controles) | 20-oct-2026 |
| Word y PDF | `rellenar.mjs` + LibreOffice | 20-oct-2026 |
| 12 meses | `apuntar-12m.mjs` | 20-oct-2026 (v3 −15,4 % / base −3,5 %, Vender) |
| Robustez | `robustez.mjs --actual` | 20-oct-2026, 48,96 GBP |
