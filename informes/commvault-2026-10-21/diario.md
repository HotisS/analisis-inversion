# Diario: Commvault (CVLT), análisis value del 21-oct-2026

- Commit de partida: `2f975a604501a30f62505de0d1fbc52ccdfde06d` (21-oct-2026 14:37 UTC). Checkout compartido con otros análisis: sin pull, commit ni push.
- Inicio ≈ 14:39 UTC; Word y PDF a las 15:04 UTC; robustez final a las 15:06 UTC (trabajo de investigación y notas antes del resumen de contexto: ≈ 14:39-14:58 en la parte de datos; tiempos de pared aproximados).
- No hay informe anterior de Commvault: iteración primera, todo desde cero.
- Ficha sectorial: la de software (`sectores/software-2026-10-14.md`) excluye ciberseguridad e infraestructura; no hay ficha de protección de datos. **No se escribe ficha en `sectores/`** (encargo): queda pendiente una ficha corta de «copia, recuperación y ciberresiliencia de datos» (perímetro: Commvault, Rubrik, Veeam, Cohesity-Veritas, Dell, NetApp; mercado MRFR 11.650 M USD en 2025, +9,7 %).

## Decisiones

1. **BPA de la regla con la remuneración en acciones como gasto** (BPA «limpio»: GAAP sin amortización de intangibles comprados ni ajustes de compras; reestructuración dentro porque se repite todos los años). El consenso y la empresa la excluyen (no GAAP 4,35 USD en FY2026 frente a 1,67 limpio). Historia del PER y comparables (21,9x) en la misma base.
2. **Historia del PER sin exclusiones arbitrarias**: los PER de 90-100x (FY2021, FY2022, FY2025) se quedan; inflan la mediana (67,2x) y con ella la ponderada. Es la primera objeción.
3. **DCF**: margen EBITDA limpio del 10,2 % (FY2027e) al 19 % (FY2034e); ingresos +10,3 % → +5 %; circulante −37 % (ingresos diferidos corrientes y no corrientes); capex = inmovilizado + aumento de comisiones capitalizadas; WACC 10,57 % (beta 1,15 entre 0,91 mensual y 1,40 semanal); g 3 %. Ningún año fijo (solo un trimestre de FY2027 publicado).
4. **Puente** a 30-jun-2026: convertible al 0 % por su principal (900 M; conversión 236,88, fuera de dinero), caja 929,8, fondo de capital privado 13,5 como asociada.
5. **ROIC**: el del motor (1.014 %) no sirve (capital negativo); medida exigente sin el circulante negativo: 17,8 % en FY2026, ≈ +7 puntos sobre el WACC (pasa ≥ 5 con poco margen).
6. **Regla 13**: `movimiento.mjs` (+10,9 % a 1 mes, +69,9 % a 6 meses, −7,9 % a 12 meses; tres caídas diarias de 16-31 % por resultados). Veredicto «no cambia»: los movimientos son resultados, el rumor de venta y la alianza con Azure, todos dentro del análisis.
7. Resultados del 2T FY2027 el 27-oct-2026: no aplazan nada (regla 11); revisar al día siguiente.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas anuales FY2017-FY2026 y trimestres | `cuentas.mjs --sec CVLT` (XBRL de la SEC); 10-K FY2026 | 31-mar-2026 (10-K presentado el 11-may-2026) |
| Último trimestre (1T FY2027) | 10-Q y nota 8-K | 30-jun-2026 (presentados 28/29-jul-2026) |
| Precio, rangos, beta, cierres de ejercicio | `bolsa.mjs --corte 2026-10-21 --etiqueta fin` | cierre 20-oct-2026 |
| Consenso y comparables | `notas/yahoo-datos.mjs` (Yahoo quoteSummary) | 21-oct-2026 14:43 UTC |
| Ventas de directivos | `form4.mjs` | 21-oct-2025 a 21-oct-2026 |
| Tasa libre | Tesoro de EE. UU. (curva diaria) | 20-oct-2026 (5,12 %) |
| Prima de mercado | Damodaran ERPbymonth | oct-2026 (4,2 %) |
| Gobierno y remuneración | Proxy DEF 14A 2026; 8-K de la junta | 24-jun-2026; 6-ago-2026 |
| Competencia y mercado | 10-K, Rubrik 2T FY2027, Gartner MQ 2026, MRFR, Valuates | 2024-2026 |
| Noticias 12 meses | Reuters, Seeking Alpha, MarketBeat, Motley Fool, demanda Imbert | oct-2025 a oct-2026 |
| Regla 13 | `movimiento.mjs CVLT` | 21-oct-2026 |
| Notas A-E | `notas/construir-notas.mjs` | 21-oct-2026 |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` (19/22 controles, 3 explicados) | 21-oct-2026 |
| Word y PDF | `motor/rellenar.mjs` (cobertura 89,7 %), LibreOffice | 21-oct-2026 15:04 UTC |
| Precio para la cartera | `precios.mjs CVLT` | cierre 20-oct 155,85; sesión 21-oct 163,47 (15:05 UTC) |
| Revisión a 12 meses | `apuntar-12m.mjs commvault-2026-10-21` | 21-oct-2026 |
| Robustez | `robustez.mjs` (cierre) y `--actual` (sesión) | 21-oct-2026 15:06 UTC |

## Resultado

Mantener por la regla a 12 meses (ponderada +14,5 %, base +19,6 % al cierre del 20-oct; +9,2 % / +14,1 % a 163,47), pero la acción robusta es **No mantener**: valor intrínseco 84,03 USD (−46 %). Límite robusto de compra 84,03 USD. Avisos de la robustez: D6 (crecimiento del BPA limpio del 44 % anual, apalancamiento operativo), D7 (−47 % frente al consenso: es la base, no un error), M4 (doble castigo en el bajista), V1, E2.
