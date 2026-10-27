# Diario: BTG Pactual (BPAC11), análisis value del 27-oct-2026

- Encargo del coordinador (27-oct, ≈ 09:00 Madrid), según `encargo-comun.md`: análisis completo de Banco BTG Pactual S.A., unit BPAC11 de B3 en BRL. Commit de partida: `bd7cfc6`.
- Análisis nuevo, método completo (no hay informe anterior de BTG). Notas A-E escritas por el analista (sin subagentes) con `notas/construir-notas.mjs`, con la forma de `informes/regeneron-2026-10-24/`. Sin 20-F ni XBRL: cuentas de la CVM (datos abiertos, NIIF consolidadas) e informes trimestrales del banco (PDF de la web de RI, encontrados por búsqueda porque la web es JavaScript).
- No hecho aquí (lo hace el coordinador): commit, `cola.md`, lecciones, `cobertura.mjs`, `seguimiento.mjs`. Hecho con cerrojo: `apuntar-12m.mjs` y la clave BPAC11 en `simbolos.json`.

## Decisiones

1. **Unit = 1 ON + 2 PNA** (comprobado en la composición accionarial de RI y en el canje de Banco Pan). Todo por unit: 11.587,655 M de acciones fuera de autocartera ÷ 3 = 3.862,552 M de units.
2. **Base del beneficio: lucro líquido ajustado** y ROAE ajustado (los del banco, el consenso y la prensa). NIIF de la CVM como contraste (16.006 M frente a 16.685 M en 2025).
3. **Es un banco**: deuda, caja y minoritarios del puente a cero; **calidad = ROE ajustado − Ke** con la misma regla que ROIC − WACC (≥ 5, o 4,5-5 con «Sí»; < 4,5 nunca). Resultado: 26,2 − 22,48 = **3,7 puntos** (4,2 con el 2T26) → ningún nivel de compra.
4. **Valor que manda: exceso de rentabilidad** (`notas/banco-ri.mjs`): 26,37 BRL. Contraste: P/VC justificado 1,14x (23,57), suma de partes ≈ 35,27 (peso 0). El DCF del motor se adapta a **modelo de dividendos** (EBITDA = beneficio antes de impuestos; capex = beneficio retenido; circulante 0; WACC = Ke); da 25,95, coherente con el anterior, y se usa (DCF 50 % + escenarios 50 % = 25,59). Detalle en `valoracion-banco.md`.
5. **Ke en BRL = 22,48 %**: tasa libre 15,44 % (bono a 10 años del 26-oct) + beta 1,28 × 5,5; **sin prima país** (ya está en el bono; los 3 puntos del escáner eran doble cuenta). Sensibilidad: 23-oct 12,98 % → Ke 20,02 % → 32,77 BRL; encargo ≈ 13,5 % → 20,54 % → 31,23. Regla relativa: Damodaran oct-2026 4,20 % → Ke 20,8 % → 29,60.
6. **g = 5,0 %** (IPCA largo ≈ 4 % del Focus + 1 real). Control «≤ 3 %» explicado (BRL nominal).
7. **BPA**: 2026e 5,28 (1S26 real 2,58 + 2H26 2,70); 2027e 5,91 (consenso 6,13, −3,6 % por el 26-oct); 2028e 6,68 (bajista 5,41 con ROE −4; alcista 7,35 con ROE +2).
8. **Historia del PER adelantada** 2019-2025 (sin 2018: falta el BPA de 2019): mediana 9,7x, mínimo 6,3x, media 11,0x. PER actual 10,2x. Comparables 7,5x.
9. **Sostenibilidad «En parte»** (el motor da «Sí»): ROE máximo de la historia, en parte por la propia Selic; CET1 justo para crecer el 17 % anual.
10. **Regla 13: retrasa** hasta el Copom de primeros de noviembre y los resultados del 3T26 (10-nov). −24,8 % el 26-oct tras la reelección de Lula.
11. **Riesgo de IA**: exposición media, mixto, ±3 %.
12. **Convicción baja** (los criterios dan media): las dos reglas dicen Mantener/no comprar pero en sentidos opuestos (+5 % a 12 meses frente a −57 % de valor intrínseco); explicado en la síntesis.

## Resultado

- Regla a 12 meses (v3, sin marcas del selector): ponderada **+5,2 %**, base **+12,4 %** → **Mantener**. v2 de control +18,0 % / +15,8 %. BPA −10 %: −5,1 % / +1,4 %.
- Valor intrínseco **25,59 BRL (−57,3 %)**; exceso de rentabilidad 26,37; con la prima del mercado 29,60. DCF inverso: rentabilidad exigida implícita del 14,6 % (Ke implícito del modelo, 14,7 %; con P/VC, 11,9 %).
- Robustez (`robustez.mjs`, cierre del 26-oct): **SÓLIDA**, acción vigente y robusta **No mantener**; nivel de compra hoy: ninguno; límite de compra 25,59 BRL; vender por encima de 70,11. Sin `--actual`: a la hora de cerrar no había sesión del 27-oct (B3 abre a las 14:00 de Madrid).
- Controles: 18 de 21 correctos y 3 explicados (g del 5 % en BRL, caja libre de banco, capitalización de Yahoo con otro número de units).
- **El método no da una señal fiable** para este banco: el CAPM en BRL con la tasa del día de mayor tensión pide un 22,5 % y el mercado paga un Ke implícito del 12-15 %. Lo sólido es «no comprar».
- Revisión a 12 meses apuntada: `BPAC11: v3 ponderada 5.2 %, base 12.4 % → Mantener (v2: 18 % Mantener)`.

## Pasos y fecha de los datos (hora de Madrid)

| Paso | Herramienta o fuente | Fecha del dato | Hecho |
|---|---|---|---|
| Datos de bolsa y betas | `bolsa.mjs BPAC11.SA` | hasta el 23-oct-2026 (sin barra del 26) | 27-oct 09:02 |
| Informes trimestrales del banco | ER 2T26, 4T25, 1T25, 2T25, 4T23, 3T23, 2T22, 4T21 (PDF de RI) | hasta el 10-ago-2026 | 27-oct 09:06 |
| Tasa libre | Trading Economics, bono de Brasil a 10 años | 26-oct-2026 (15,44 %) | 27-oct 09:07 |
| Consenso, comparables y precio | `notas/yahoo-datos.mjs`, intradía de Yahoo | 26-oct-2026 (60,00 BRL) | 27-oct 09:10 |
| Prensa de la elección | InfoMoney, Investir e Coçar, Google News | 26-oct-2026 | 27-oct 09:10-09:17 |
| Movimiento (regla 13) | `movimiento.mjs BPAC11.SA` + cálculo a mano con el cierre del 26-oct | 26-oct-2026 | 27-oct 09:11 |
| Cuentas NIIF | Datos abiertos de la CVM (DFP 2021-2025, ITR 2026) | 30-jun-2026 | 27-oct 09:12 |
| Prima del mercado | Damodaran, ERPbymonth.xlsx | oct-2026 (4,20 %) | 27-oct 09:18 |
| Notas A-E | `notas/construir-notas.mjs` | corte 27-oct-2026 | 27-oct 09:24 |
| Símbolo nuevo | `simbolos.json` (con cerrojo) | — | 27-oct ≈ 09:25 |
| Modelo de banco | `notas/banco-ri.mjs` | 30-jun-2026 → 27-oct | 27-oct 09:25 |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 27-oct-2026 | 27-oct 09:32 |
| Word y PDF | `motor/rellenar.mjs`, `soffice` | 27-oct-2026 | 27-oct 09:34 |
| Precios y revisión a 12 meses | `precios.mjs BPAC11`, `apuntar-12m.mjs` (con cerrojo) | cierre del 26-oct | 27-oct 09:33-09:34 |
| Robustez | `robustez.mjs` (sin `--actual`: B3 cerrada hasta las 14:00) | cierre del 26-oct | 27-oct 09:33 |
