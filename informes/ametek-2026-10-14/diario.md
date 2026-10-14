# Diario · AMETEK (AME) · 14-oct-2026

- Commit de partida: dbabaaa («Seguimiento: regenerado»). Sin `git pull` ni commits (lo hace el coordinador).
- Entorno: nube de Claude Code con red abierta. Cuentas con `cuentas.mjs --sec AME`; documentos de EDGAR con `descargar.mjs` (10-K 2025 y 2022, 10-Q 2T26, notas de resultados 3T24 y 1T25-2T26, 8-K de Indicor (anuncio, presentación y cierre), First Aviation, crédito y préstamo a plazo, papel comercial, dividendo, juntas 2025 y 2026, nombramientos; proxy 2026); Form 4 con `form4.mjs`; precio y bolsa con `bolsa.mjs` (cierre del 14-oct); bono del Tesoro (5,19 %) del CSV oficial; BCE; consenso de MarketScreener y MarketBeat (WebFetch); Keysight y Teledyne de Stock Analysis; sentimiento del RSS de Seeking Alpha y la API de Stocktwits; tamaño de mercado de MarketsandMarkets y GMI (páginas abiertas).
- Reutilizado del repo: múltiplos de Roper, Halma, Spirax, Mettler-Toledo y Fortive de los informes del 14-oct. Ficha sectorial nueva: `sectores/instrumentos-precision-2026-10-14.md` (+ `-comparables.json`).
- Notas A-E y propio hechos por mí sin subagentes (`notas/construir-notas.mjs` escribe A-E; `propio.mjs` + `supuestos.mjs` + `textos.mjs`).
- **Regla de 12 meses: v3 ×1,1 con selector de método**, `per_historico.base: "adelantado"` y `per_historico.v2` relleno con la historia al cierre.
- Decisiones:
  - `cuentas.mjs`: **la deuda salía solo con el largo plazo** (LongTermDebtNoncurrent; aviso de `parciales`). Corregida con DebtCurrent (papel comercial y vencimientos del año): 2.544 / 2.385 / 3.313 / 2.080 / 2.283 M en 2021-2025 (cuadra con LongTermDebt del XBRL). `DepreciationAndAmortization` sí incluye la amortización de intangibles (145,5 + 277,3 = 422,8 en 2025, nota de segmentos).
  - **Indicor Instrumentation** (5.000 M en caja, ≈14x EBITDA, ≈1.100 M de ventas) cerró el 26-ago-2026, después del balance de junio: los 5.000 M van en `otros_ajustes` del puente y sus ventas en 2026e (+350 M) y 2027e. Su amortización de intangibles (≈115 M/año) es estimación propia con la proporción de FARO (23,2 M sobre 1.024 M). El EV/EBITDA LTM del motor (25,8x) y la DN/EBITDA (0,6x) mezclan deuda y EBITDA de momentos distintos: explicado en limitaciones.
  - BPA GAAP en todo (historia del PER, casos, consenso de MarketScreener también GAAP). Sin recompras ni compras futuras; la caja amortiza la deuda de Indicor (intereses 191 / 310 / 235 M en 2026-2028).
  - DCF orgánico salvo Indicor. Circulante 16,5 % (el real de 2025 con anticipos); en el primer cálculo el 21 % generaba 571 M de salida en el primer año.
  - WACC 9,70 % (Tesoro 5,19 %, beta 0,95, prima 5,5 %, deuda 11 %). Escenarios 25/50/25. Pesos DCF 40 / comparables 20 / escenarios 40.
  - **ROIC publicado 13,2 % frente a WACC 9,70 % (3,5 puntos)**: no llega a 5 por el fondo de comercio (7.171 M de 12.454 M de capital). Sin fondo de comercio: 31,2 % (capital medio 2024-2025). Decide el publicado: **calidad No**. Con Indicor bajará hacia el 10-11 %.
  - Sostenibilidad «Sí» (orgánico proyectado por debajo del mercado, sin inversión neta, poder de precios); `mercado_final` en null porque la cuota (5,4 %) es la de EIG.
- Resultado: DCF 142,48; valor intrínseco 149,91 (−39,3 %); DCF inverso 13,4 % anual 2027-2035 (base 5,6 %), rentabilidad implícita 7,2 %. Con la prima del mercado, 175,60.
- **Línea 12 m (v3 ×1,1, el selector deja la v3)**: objetivo 249,72 USD, ponderada +1,7 %, base +8,1 % → **Mantener**; **v2 6,6 % / 10,3 % → Mantener**. Robustez: **SÓLIDA**, acción robusta **No mantener** (V1: valor intrínseco −39 %; además ROIC − WACC 3,5 < 4,5). Comprar < 149,91; vender > 278,91; filtro de mantener hasta 176,36. Convicción media (la sugerida).
- Precio de una acción ≈220,4 EUR (1,1195 USD/EUR): 0,7 % de una cartera de 30.000 EUR.
- Word y PDF (soffice): 18 de 18 controles correctos. Cobertura 89,4 %. Avisos: tablas vacías de suma de partes y calificaciones ESG.
- Pendiente para el coordinador: `AME` no está en `verticales/empresa/simbolos.json` (aviso D3 de robustez); `apuntar-12m.mjs` sin `--simular` y `seguimiento.mjs`.
- Para subir la confianza: EBITDA de Indicor y reparto del precio (10-Q del 3T26), pedidos orgánicos del 3T26 (≈29-oct, fecha estimada; la de 2025 fue el 30-oct), rating, calificaciones ESG.
- Tiempo: unos 20 minutos de reloj (20:07-20:27 UTC).

## Lecciones

- `cuentas.mjs --sec` en AMETEK: la deuda salió solo con el largo (faltaba DebtCurrent, donde va el papel comercial); el aviso de `parciales` lo marcaba. Comprobar con `LongTermDebt` del XBRL o la nota de deuda.
- Compra grande cerrada entre el último balance y el corte (Indicor): precio en `otros_ajustes` y sus ventas en la proyección; los múltiplos LTM del motor quedan inflados (deuda nueva sin su EBITDA) y hay que decirlo.
- La amortización de intangibles de una compra sin reparto publicado se puede estimar con la proporción de la última compra similar de la misma empresa (FARO: 2,3 % del precio al año).
