# Diario: Regeneron (REGN), análisis value del 24-oct-2026

- Petición de Hotis: «REGN - analisis value» (24-oct, 19:12 Madrid). Commit de partida: `df8e3db`.
- Análisis nuevo, método completo (no hay informe anterior de REGN). Notas A-E escritas por el analista (sin subagentes) con `notas/construir-notas.mjs`, con la forma de `informes/united-therapeutics-2026-10-21/`.

## Decisiones

1. **Ejercicio natural**; ejercicio objetivo de la regla a 12 meses: **2028e**. PER actual = precio ÷ BPA propio de 2027e (59,73) = 13,5x.
2. **BPA ajustado (no GAAP)**: lo publica la empresa y lo usa el consenso; el GAAP lo mueve la cartera de acciones. Fórmula calibrada con 2025 (44,31 = publicado).
3. **Cobro de Sanofi** (1.000 M, sexta enmienda del 1-oct-2026): fuera del BPA; al puente después de un 15 % de impuestos (`otros_ajustes` −850).
4. **Historia del PER**: excluido el cierre de 2020 (BPA de 2021 inflado por la COVID); en la v2, excluido 2021.
5. **WACC 9,97 %**: tasa libre 5,00 %, beta 0,85 (medida 0,62) y prima adicional de 0,5 puntos por la dependencia de Dupixent.
6. **Crecimiento**: 2026e fijo (+19,2 %), baja al 4 % en 2030e; 0 % y −3 % en 2031e-2032e por la patente de Dupixent.
7. **Sostenibilidad «Sí»** frente a «En parte» del motor: la base de 2021 (COVID) hunde el histórico; sin ella, +5,6 % anual en 2022-2025. Explicado en los controles.
8. **Riesgo de IA**: exposición baja, mixto, ±2 %.
9. **Regla 13**: «no cambia».

## Resultado

- Regla a 12 meses (v3, sin marcas del selector): ponderada +14,8 %, base +18,0 % → **Mantener** (bajo el 15 % y valor intrínseco por debajo). v2 de control +12,3 % / +8,5 %. BPA −10 %: +3,4 % / +6,3 %.
- Valor intrínseco 677,23 USD (−15,9 %); DCF 657,62 (WACC 9,97 %); con la prima del mercado 735,51.
- Calidad: ROIC 21,1 % − WACC 10,0 % = +11,1 puntos; sostenibilidad «Sí».
- Robustez: SÓLIDA, «No mantener»; nivel de compra hoy ninguno; límite de compra 677,23 USD (A y B1).
- Controles: 16 de 21 correctos y 5 explicados.

## Pasos y fecha de los datos (hora de Madrid)

| Paso | Herramienta o fuente | Fecha del dato | Hecho |
|---|---|---|---|
| Cuentas oficiales 2016-2025 | `herramientas/cuentas.mjs` (XBRL de la SEC) | 10-K 2025 (feb-2026); 10-Q 2T26 (jul-2026) | 24-oct 19:14 |
| Documentos primarios | 10-K 2025, 10-Q 2T26, notas de resultados 4T17-2T26, 8-K (Sanofi, JPM, junta, plan de acciones, cargo del 3T), proxy 2026 | hasta el 6-oct-2026 | 24-oct 19:15 |
| Datos de bolsa y movimiento (regla 13) | `bolsa.mjs`, `movimiento.mjs REGN` | cierre del 23-oct-2026 (805,02 USD) | 24-oct 19:14 |
| Directivos | `form4.mjs` | 24-oct-2025 a 24-oct-2026 | 24-oct 19:14 |
| Consenso y comparables | `notas/yahoo-datos.mjs` (Yahoo) | 24-oct-2026 | 24-oct 19:21 |
| Tasa libre | Tesoro de EE. UU. | 23-oct-2026 (5,00 %) | 24-oct 19:15 |
| Notas A-E | `notas/construir-notas.mjs` | corte 24-oct-2026 | 24-oct 19:29 |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 24-oct-2026 | 24-oct 19:34 |
| Word y PDF | `motor/rellenar.mjs`, `soffice` | 24-oct-2026 | 24-oct 19:35 |
| Precios y revisión a 12 meses | `precios.mjs REGN`, `apuntar-12m.mjs` | cierre del 23-oct | 24-oct 19:35 |
| Robustez | `robustez.mjs … --actual` | cierre del 23-oct (sábado: sin sesión) | 24-oct 19:36 |
| Cobertura y seguimiento | `cobertura.mjs --arreglar`, `seguimiento.mjs` | 24-oct-2026 | 24-oct 19:36 |
