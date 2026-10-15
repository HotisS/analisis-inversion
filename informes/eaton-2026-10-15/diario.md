# Diario: Eaton (ETN), 15-oct-2026

- Inicio: commit 70ba47e. Trabajo en solitario, sin subagentes, sin commits (encargo de la tanda de electricidad).
- 16:39 UTC: precio intradía 399,31; el informe usa el cierre del 14-oct (408,85, `notas/bolsa.json`, índice SPY, sector XLI).
- Cuentas: `cuentas.mjs --sec ETN` (CIK 1551182). Desde 2020 el XBRL no da EBIT ni EBITDA: EBIT = BAI + intereses netos; deuda = corto + largo plazo (la de la herramienta salía incompleta). Arrendamientos operativos fuera de la deuda (US GAAP).
- Mobility (Dana, canje en el 1T27): el DCF la trata como neutra en valor; el BPA de 2028e ya va sin ella (≈380 M de acciones).
- BPA: el informe va en GAAP. El ajustado de Eaton excluye la amortización de intangibles (1,74 USD por acción en 2026), los gastos de compras (1,08) y la reestructuración (0,22). El consenso mezcla bases, por eso el aviso D7.
- Controles explicados: sostenibilidad «Sí» frente a «En parte» del motor (el histórico del 3,5 % resta las ventas de Lighting e Hydraulics), regresión con R² de 0,02 y el salto LTM/NTM de Vertiv. Comparables y transacciones pesan 0.
- Resultados: DCF 237,93; VI 234,38 (−42,7 %); WACC 10,39 %; ROIC 15,8 % − WACC = 5,4 (cumple, por poco; tras Boyd ≈12-13 %).
- 12 m (v3 ×1,1): ponderada +3,7 %, base +14,0 %, objetivo 419,97 → Mantener. v2: 8,6 / 14,4. Robustez SÓLIDA, acción robusta no mantener; con BPA −10 %: −6,6 / 2,7. Límite robusto 234,38.
- Regla 13: veredicto «no cambia» (caídas de junio y septiembre por el sector, sin noticia propia).
- Sin hacer por el encargo: `precios.mjs` (escribe en verticales/; de ahí el aviso D3), `simbolos.json`, apuntar-12m (solo `--simular`), `seguimiento`, `cola`.

## Lecciones (para quien mantenga `lecciones.md`)
- SEC con XBRL de función (Eaton y similares): desde 2020 `cuentas.mjs` deja el EBIT y el EBITDA en null y la deuda incompleta. Construirlos a mano (BAI + intereses; corto + largo plazo) y cuadrarlos con el 10-K.
- Industriales con amortización de intangibles grande: el BPA ajustado del consenso puede estar un 15-20 % por encima del GAAP. Compararlo en la misma base antes de leer el aviso D7.

Línea 12 m: ETN · 2026-10-15 · 408,85 USD · v3 +3,7 % / base +14,0 % · objetivo 419,97 · v2 8,6 % · Mantener (robusta: no mantener) · límite robusto 234,38 · VI 234,38.
