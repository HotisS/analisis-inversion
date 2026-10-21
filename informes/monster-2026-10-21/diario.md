# Diario: Monster Beverage (MNST), análisis value del 21-oct-2026

- Commit de partida: `d2977589ca710f25edf7eec154dccbc8edd93c12` (16:34 UTC). Checkout compartido con otros análisis en paralelo: sin pull, commit ni push desde este hilo; no se tocan cola.md, MEMORIA.md, METODO-VIGENTE.md, lecciones ni seguimiento.xlsx.
- Inicio: 16:35 UTC. Fin: 17:04 UTC (reloj del sistema).
- Análisis nuevo con el método completo (no hay informe anterior de Monster). Notas A-E escritas por el analista (sin subagentes) con `notas/construir-notas.mjs`, con la forma de `informes/cardinal-health-2026-10-19/`.

## Decisiones

1. **Split 2:1 del 11-ago-2026**: todo BPA y número de acciones en acciones de hoy. XBRL de 2021-2025 × 2 en acciones (÷ 2 en BPA); de 2016-2020 × 4 (también el split de marzo de 2023). Los cierres de Yahoo ya están ajustados. Comprobado con el proforma del 10-Q del 2T26 (1.977 M acciones diluidas; BPA del 1S26 0,58).
2. **BPA en base GAAP diluida** (con las pérdidas del alcohol): la única serie completa; el ajustado de la empresa existe solo desde 2025 y difiere ≈ 6 %.
3. **Ejercicio objetivo 2028e**; **PER actual = precio ÷ BPA de 2027e** (el ejercicio siguiente, literal de `objetivo-12m.md`) = 36,3x. Con el BPA de los próximos 12 meses sería 37,0x y la señal no cambia.
4. **Caja = efectivo + inversiones a corto y largo** (títulos de tesorería): 4.200,5 M a 30-jun-2026 en el puente; balance histórico igual. Sin deuda (préstamo de 750 M devuelto en abril de 2025). Arrendamientos operativos fuera (US GAAP). Ingresos diferidos de Coca-Cola (≈ 200 M) no restados (< 0,3 % del valor).
5. **No recurrentes** = deterioros del alcohol (43, 135 y 50 M en 2023-2025, estado de flujos del 10-K). Las pérdidas de explotación del alcohol se quedan dentro del margen.
6. **ROIC** del motor (38,7 % en 2025; capital = patrimonio − caja neta) válido: el capital invertido es positivo (4.900 M). ROIC − WACC ≈ +29,7 puntos.
7. **DCF con etapa de transición** (10 años, del 5 % al 3 %, margen 31,5 %): justificada por ROIC ≥ WACC + 5 y recorrido internacional; sin ella el DCF baja de 28,05 a ≈ 25,9 USD. No cambia la señal.
8. **Mercado final**: ingresos netos de fabricantes de Ken Research (52.643 M en 2025, TCAC 7,5 %) → 75.576 M en 2030e; cuota 15,0 % → 18,1 % (×1,2).
9. **Ficha sectorial**: no existe la de bebidas energéticas y el encargo no permite escribir en `sectores/`: queda pendiente para el hilo principal (hueco documentado en la nota B).
10. **Comparables**: Coca-Cola Consolidated excluida (PER adelantado de Yahoo de 5,4x, erróneo). Mediana 15,8x.
11. **Precio**: el informe usa el cierre del 20-oct (47,04 USD); la decisión se comprueba con la sesión del 21-oct en `robustez.mjs --actual` (46,77 USD, `precios.mjs` a las 17:02 UTC; 46,75 en Yahoo a las 16:38 UTC).
12. **Caída de septiembre de 2026 (−9,4 %)** sin causa concreta tras tres búsquedas: hueco documentado (rotación, rebajas de objetivo, salida de Gehring).
13. **Regla 13**: veredicto «no cambia» (sin aviso P; movimientos grandes con causa en resultados; los resultados del 3T26 del ≈ 5-nov no retrasan).

## Resultado

- Regla a 12 meses (v3, sin marcas del selector): ponderada −0,3 %, base +6,2 % al cierre → **Mantener**; v2 de control +8,7 % / +10,8 %. Con la sesión (46,77): +0,3 % / +6,9 %, Mantener.
- Valor intrínseco 26,77 USD (−43,1 %); DCF 28,05 (WACC 8,97 %); con la prima del mercado 32,94. DCF inverso: 14,3 % de crecimiento anual implícito.
- Robustez (cierre y `--actual`): SÓLIDA, acción robusta «No mantener» (valor intrínseco un 43 % bajo el precio); límite de compra 26,77 USD (v2 26,77; robusto 26,77); BPA −10 %: −10,3 % / −4,4 %.
- Calidad: sostenibilidad «Sí» y ROIC − WACC ≈ +29,7 puntos: pasa.
- Controles: 21 de 21 correctos. Avisos del Word: sin suma de partes, sin calificaciones ESG, sin vencimientos (no hay deuda), sin EV/EBITDA NTM de los comparables ni múltiplos de transacciones (no existen).
- Revisión a 12 meses: `MNST: v3 ponderada -0.3 %, base 6.2 % → Mantener (v2: 8.7 % Mantener)` (apuntar-12m.mjs).

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas oficiales 2016-2025 | `herramientas/cuentas.mjs --sec MNST` (XBRL de la SEC) | 10-K 2025, presentado el 27-feb-2026 (cierre 31-dic-2025) |
| Documentos primarios | 10-K 2025, 2023 y 2022; 10-Q 3T25, 1T26 y 2T26; notas de resultados 4T24-2T26 con datos de Nielsen; 8-K (split, junta, consejo, Gehring, Burroughs); proxy 2026; resultados del 2T26 de Celsius | 2023 a 25-sep-2026 (último trimestre: 2T26, 6/7-ago-2026) |
| Datos de bolsa | `herramientas/bolsa.mjs` (Yahoo; SPY y XLP) | cierre del 20-oct-2026 |
| Consenso y comparables | `notas/yahoo-datos.mjs` (Yahoo quoteSummary) | 21-oct-2026 16:38 UTC (sesión abierta) |
| Mercado de bebidas energéticas | Ken Research, TBRC (GII), Red Bull, Nielsen (exhibit 99.2 del 2T26) | 2025; Nielsen hasta el 25-jul-2026 |
| Tasa libre | Tesoro de EE. UU., curva diaria (CSV) | 20-oct-2026 (5,12 %) |
| Prima de mercado | Damodaran, ERPbymonth | oct-2026 (4,20 %) |
| Directivos | `herramientas/form4.mjs` | 21-oct-2025 a 21-oct-2026 |
| Analistas y noticias | MarketBeat, Seeking Alpha (RSS), conferencia del 2T26 (resumen de prensa) | hasta el 20-oct-2026 |
| Sentimiento | Stocktwits, Seeking Alpha, MarketBeat | 25-sep a 20-oct-2026 |
| Movimiento (regla 13) | `herramientas/movimiento.mjs MNST` | 21-oct-2026 (46,77 USD) |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 21-oct-2026 |
| Word y PDF | `motor/rellenar.mjs`, `soffice` | 21-oct-2026 17:01 UTC |
| Revisión a 12 meses | `herramientas/apuntar-12m.mjs monster-2026-10-21` | precio 47,04 (20-oct) |
| Símbolo | `verticales/empresa/simbolos.json` (entrada MNST añadida al final) | 21-oct-2026 |
| Precios | `herramientas/precios.mjs MNST` | cierre 20-oct-2026; sesión 21-oct 46,77 (17:02 UTC) |
| Robustez | `herramientas/robustez.mjs … --actual` | cierre 20-oct (47,04) y sesión del 21-oct (46,77) |
