# Diario · Graco (GGG) · 14-oct-2026

- Commit de partida: e4faded (regla v3 con tope ×1,1 y selector de método).
- Entorno: nube de Claude Code, sin subagentes (notas A-E y propio escritos en esta sesión con `notas/construir-notas.mjs`, `supuestos.mjs`, `textos.mjs` y `propio.mjs`; las cinco notas comparten un único catálogo de fuentes, misma numeración). Cuentas con `cuentas.mjs --sec GGG` (2016-2025) comprobadas con el 10-K de 2025; 10-Q del 3T25, 1T26 y 2T26 y sus comunicados; proxy 2026, 8-K de juntas, nombramientos, Corob y Valco Melton; Form 4 (`form4.mjs`); FRED (bono, vivienda, hipoteca); MarketScreener y Stock Analysis (consenso); transcripción del 2T26 (Earnings Whispers). Sin acceso: artículos y comentarios de Seeking Alpha (403), Reddit.
- Tiempos: inicio 20:54 UTC; Word, PDF (soffice), `apuntar-12m --simular` y robustez hacia las 22:15 UTC.
- Ficha sectorial reutilizada: `sectores/hidraulica-bombas-2026-10-14.md` y su JSON de comparables (PH, IEX, NDSN, DOV, Atlas Copco, Alfa Laval; más Interpump de su informe de hoy), pasados de EUR a USD con el BCE (1,1195). Sin `mercado_final` (la ficha no lo tiene con este perímetro).
- Decisiones:
  - **Deuda**: `cuentas.mjs` dejaba 1,6 M en 2025 (solo la parte corriente de la deuda a largo) y no sumaba los «notes payable to banks» (23,1 M; `ShortTermBankLoansAndNotesPayable`): sumados a mano en todos los años. Patrimonio 2017-2021 = activo − pasivo (faltaba). La amortización del XBRL sí incluye la de intangibles (77 + 28 M en 2025).
  - No recurrentes: −14,1 M (2025, contingente de Corob), +7,7 M (2024, reorganización), −0,8 M (2023, deterioro − contingente); LTM −23,1 M (con 9 M de devoluciones de aranceles). BPA normalizado de la historia del PER sin la liquidación de pensiones de 2023 (42,1 M antes de impuestos).
  - Puente a 26-jun-26: deuda 29,2, caja 507,6, pensiones 26,0 netas, otros ajustes 408,6 (Valco Melton 447 − ≈40 de ventajas fiscales + contingente 1,6). Arrendamientos operativos fuera (US GAAP).
  - WACC 10,37 % (bono 5,21 %, beta 0,95); terminal «media» (Gordon 3 % + 17x EBITDA). Capex 4,8 % desde 2028e para pagar ≈0,4 puntos de compras pequeñas.
  - Sostenibilidad «Sí» (reinversión del 7 % del NOPAT: prueba a mano; ROIC incremental 19 %, la mitad del crecimiento es precio). Calidad: ROIC 24,6 % − WACC 10,37 % = 14,2 puntos → **Sí**.
- Resultado: **Mantener, convicción media** (la sugerida). DCF 57,96 (−28,0 %); valor intrínseco 62,09 USD (−22,9 %); con la prima del mercado 67,53. DCF inverso: 10,5 % de crecimiento anual frente al 3,9 % del base; rentabilidad implícita 7,3 %. 17 de 17 controles. Cobertura 89,9 %. Avisos del Word: suma de partes y calificaciones ESG vacías.
- **Línea 12 m (v3)**: objetivo 89,66 USD (25,4x × 3,71 en el base), ponderada +12,8 %, base +18,5 % → Mantener; v2 de control 7,3 % / 7,9 % (`apuntar-12m --simular`). Compra < 62,09 USD; venta > 100,91. Consenso 91,14 USD (10 analistas). Detalle en revision-12m-2026-10-14.md. `apuntar-12m` solo con `--simular` (no escrito).
- Robustez (`robustez.mjs`, sin `--escribir`): **SÓLIDA**, sin CORREGIR. Acción robusta «No mantener» (si estuviera en cartera: valor intrínseco un 23 % bajo el precio y v2 < 10 %). Avisos: D3 sin cierre en `precios.json` (archivo compartido, no tocado), V1, E2 (resultados el 21-oct-2026). GGG no añadido a `verticales/empresa/simbolos.json` (archivo compartido: lo hace el coordinador).
- Próximos resultados: 21-oct-2026 tras el cierre (3T26; conferencia el 22-oct).
- Una acción: 80,48 USD = 71,89 EUR, muy por debajo del 7 % de 30.000 EUR.

## Lecciones

- `cuentas.mjs --sec` en Graco: la deuda sale con un solo concepto (a largo o la parte corriente, según el año) y omite `ShortTermBankLoansAndNotesPayable` («notes payable to banks»); el aviso de `parciales` lo marca, pero hay que buscar el concepto en companyfacts y sumarlo. Tampoco da `StockholdersEquity` antes de 2022: patrimonio = activo − pasivo.
- Un comprador que cambia la definición de su BPA ajustado (Graco, desde el 2T26 sin amortización de compras) hace que el consenso «ajustado» de Stock Analysis (3,29) y el GAAP de MarketScreener (3,22) no sean comparables: usar el GAAP y decirlo.
- Con el bono estadounidense al 5,2 %, una empresa de calidad con caja neta y PER de 23-25x da un valor intrínseco un 20-30 % bajo el precio y bloquea la compra aunque la regla de múltiplos dé +12-18 %: el límite de compra lo marca el valor intrínseco, no la v3.
