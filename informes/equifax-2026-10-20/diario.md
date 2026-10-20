# Diario Equifax 2026-10-20

- Commit de partida: f784354 Niveles de compra value A, B1, B2 y C (regla 16, aprobada por Hotis 20-oct)
- Inicio: 10:48 UTC. Iteración nueva tras resultados 3T26 (publicados 20-oct antes de la apertura).
- Método: iteración tras resultados (lecciones, «Iteración tras unos resultados»): notas A-D del 8-oct copiadas como punto de partida y cinco subagentes con encargo acotado a lo que cambia, cada dato recomprobado; E (foros) nuevo. Cuentas de la SEC con `cuentas.mjs` (XBRL 2016-2025), nota de resultados del 3T26 del 20-oct, `bolsa.mjs` y `movimiento.mjs` al cierre del 19-oct.
- Subagentes: E 3 min, C 4 min, A 7 min, B 8 min, D 11 min.
- Cambios de supuestos frente al 8-oct: 2026e fijado con la guía del 20-oct (6.661 M, EBITDA ajustado 2.125 M, FICO ≈375 M); negocio sin FICO +6,0 % en 2027e (antes 7,0 %) y +7,0 % en 2028e-2029e (antes 7,5 %) por la hipoteca (tipo a 30 años 7,40 %) y el informe doble; margen sin FICO +0,3 puntos en 2027e por la guía de +100 pb; WACC 10,25 % (bono 5,15 %, beta 1,21, deuda 6,3 %, peso 21,8 %).
- Objetivo a 12 meses en BPA AJUSTADO con la historia del PER también en ajustado (la del 8-oct mezclaba bases: mediana 47,9x → 33,3x). Selector: desrateada → v2: 18,8 % ponderada, 14,0 % base, Comprar por la regla.
- BPA 2028e del consenso de MarketScreener es CONTABLE (9,82): se retira de `consenso.estimaciones` con un parche para que la variante «BPA consenso» de `robustez.mjs` no compare bases distintas (daba 9,9 % y «No mantener»).
- Recomendación del informe: **Vender** (me aparto de la regla con justificación): calidad ROIC − WACC −0,9 (mantener exige ≥ 4,5, §4.2), colchón de BPA corto (BPA −10 % → 7,1 %), DCF 147,31 por debajo del precio. Convicción Media (el motor sugiere Baja porque sus reglas discrepan).
- Robustez (cierre 19-oct): SÓLIDA, acción robusta «Mantener en cartera» por números; calidad −0,9 → no pasa el filtro de mantener.
- 2026-10-20: revisión a 12 meses (revision-12m-2026-10-20.md): v2 ponderada 18,8 %, base 14,0 %; señal de la regla Comprar; recomendación del informe Vender por calidad.

## Fallos del sistema
1. `robustez.mjs` toma el BPA del consenso de `consenso.estimaciones` sin mirar si es contable o ajustado: con Equifax daba una variante «No mantener» falsa. Arreglo: campo `consenso.base_bpa` y no hacer la variante si no coincide con la base de los casos.
2. `historia-adelantada.mjs` construyó el 14-oct la historia de Equifax con el BPA contable mientras los casos iban en ajustado (mediana 47,9x frente a 33,3x en la misma base). Revisar las migradas con BPA ajustado (Equifax, ICE, Intuit…).
3. La regla de calidad para mantener (ROIC − WACC ≥ 4,5) solo la aplican el escáner y el coordinador; `robustez.mjs` da «Mantener en cartera» sin mirarla. Arreglo: que la acción robusta de mantener la incluya.
