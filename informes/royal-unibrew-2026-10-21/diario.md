# Diario: Royal Unibrew (RBREW), análisis value del 21-oct-2026

- Commit de partida: `914ca459dc8a323dd5a38e81017f564248d4227a`. Checkout compartido con otros análisis en paralelo: sin pull, commit ni push desde este hilo.
- Inicio: ≈ 15:14 UTC (primeros archivos de la carpeta). Fin: ≈ 15:45 UTC (reloj del sistema). Gran parte de la investigación (cuentas, documentos, consenso, comparables) se hizo antes de escribir la carpeta.
- Análisis nuevo y desde cero, con el método completo. El intento del 19-oct, que se paró a medias, no se ha usado. Las notas A-E las ha escrito el analista, sin subagentes, con `notas/construir-notas.mjs`, siguiendo la forma de `informes/cardinal-health-2026-10-19/`.

## Decisiones

1. **Cuentas.** Se sacaron con `cuentas.mjs` (ESEF), que dejó n.d. el beneficio neto de 2024-2025 y los gastos generales a medias. Se completaron a mano con los informes anuales de 2022 a 2025 y el semestral de 2026:
   - gastos generales = distribución + administración;
   - capex con intangibles y altas de derechos de uso;
   - arrendamientos NIIF 16 en la deuda.
2. **BPA sin extraordinarios**, la base de la propia empresa y del consenso: 2022 = 23,1 DKK, sin la plusvalía de 360 M de Hansa Borg; 2024 = 25,2, sin las participaciones polacas.
3. **Ejercicio objetivo: 2028e.** Es el último año con PepsiCo en Dinamarca, Finlandia y bálticos. La pérdida de 2029 (−9 % de ventas y 300 M de costes de transición) está en el DCF y en los escenarios, pero no en el BPA de la regla: es la objeción principal.
4. **PER actual** = precio ÷ BPA de los próximos 12 meses (2,3/12 de 2026e + 9,7/12 de 2027e = 37,49 → 11,8x). Es la misma base que la historia adelantada. Con solo 2026e da 12,7x y con solo 2027e 11,6x: en los tres casos decide el tope ×1,1.
5. **Puente a 30-jun-2026:**
   - deuda financiera 6.209 y arrendamientos 455 (de los 6.664 de hipotecas y entidades de crédito);
   - caja 54;
   - `otros_ajustes` 322: las recompras pagadas después del balance, porque las acciones ya están netas de ellas (47,36 M diluidas).
6. **WACC 7,11 %:** beta de 0,80, por encima de la medida (0,26-0,69), por el sesgo del índice danés; prima específica de 0,5 puntos (concentración nórdica y PepsiCo); tasa libre del Bund.
7. **EBIT de 2030e (2.598) por debajo del de 2028e (2.677)**, cuando la empresa guía lo contrario: elegimos ser más prudentes que la guía.
8. **Sin ficha sectorial de bebidas.** El encargo no permite escribir fuera de la carpeta, así que el perímetro y los comparables están en las notas B y D. Queda pendiente para el hilo principal.
9. **Comparables:** se excluye Coca-Cola HBC (la capitalización mezcla peniques y libras, y la compra de CCBA distorsiona el crecimiento).
10. **Huecos:**
    - Movimiento de marzo de 2026 (−15,8 %) y rebote de julio (+13 %) sin causa propia tras tres búsquedas: se explican por el sector y por la recuperación.
    - Remuneración individual del consejero delegado, voto de remuneración, años del auditor, cuota de mercado y consenso de 2028: no encontrados (huecos de complemento).
11. **Regla 13: «no cambia».**
    - Las caídas tienen causa publicada: PepsiCo y el semestral.
    - No hay colocaciones.
    - Los directivos compran.
    - Los resultados del 11-nov están a 21 días; con tendencia bajista, solo retrasarían si estuvieran a 15 días o menos.
12. **Precio:** el informe y la decisión usan el mismo precio, el cierre de hoy (441,20 DKK, 21-oct; la bolsa cerró a las 17:00 CEST). `precios.mjs` lo confirmó a las 15:40 UTC.

## Resultado

- **Regla a 12 meses (v3, sin marcas del selector):** ponderada +27,9 % y base +24,0 % con dividendo → **Comprar**, convicción media. La v2 de control da +16,0 % y +12,9 %.
- **Valor intrínseco:** 586,60 DKK (+33,0 %). DCF 623,63 (WACC 7,11 %); con la prima del mercado, 765,43.
- **Calidad:** ROIC del 14,2 % con fondo de comercio frente a un WACC del 7,11 % (+7,1 puntos). Sostenibilidad «Sí».
- **Robustez (`--actual`, 441,20):** SÓLIDA, acción robusta Comprar de nivel A.
  - Límite común: 441,21 DKK (un céntimo sobre el precio). Nivel B1 hasta 463,14.
  - BPA −10 %: +15,4 % y +12,0 %.
- **Controles:** 21 de 21 correctos.
- **Word:** 41 páginas; cobertura del 86,9 %. Los avisos que quedan son de datos que no existen: EV/EBITDA de los comparables de los próximos 12 meses, serie del sector y calificaciones ESG.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas oficiales 2021-2025 | `herramientas/cuentas.mjs` (ESEF), completado con los informes anuales de 2022-2025 | Informe anual de 2025 (feb-2026; cierre a 31-dic-2025) |
| Semestral y trimestres | Interim Report H1 2026 (CA 43/2026); Q1 Trading Statement (CA 18/2026) | 17-ago-2026 (cierre a 30-jun-2026); 21-abr-2026 |
| PepsiCo | CA 17/2026; nota de Carlsberg | 21-abr-2026 |
| Acciones propias y recompra | CA 54/2026 | 16-oct-2026 |
| Datos de bolsa | `herramientas/bolsa.mjs` (Yahoo: RBREW.CO, ^OMXC25, EXH3.DE) | Cierre del 21-oct-2026 |
| Movimiento (regla 13) | `NODE_USE_ENV_PROXY=1 node herramientas/movimiento.mjs RBREW.CO` | 21-oct-2026 (441,20 DKK) |
| Consenso y comparables | Yahoo quoteSummary (S&P Global), Stock Analysis | 21-oct-2026 |
| Rebajas de los analistas | Prensa financiera (BNP, Deutsche Bank, Goldman, Nordea, Citi, Morgan Stanley) | 21/22-abr-2026 |
| Tasa libre | Bundesbank, Bund a 10 años | 21-oct-2026 (3,47 %) |
| Tipos de cambio | BCE | 21-oct-2026 |
| Prima de mercado | Damodaran, ERPbymonth | oct-2026 (4,20 %) |
| Directivos | Anuncios de la empresa (CA 19, 21 y 45/2026), insynshandel | 16-mar a 18-ago-2026 |
| Sector y costes | Eurostat (cerveza de la UE, 2025), Sveriges Bryggerier/Delfi (2024), aluminio de la LME | 2024-2025; 6-oct-2026 |
| Sentimiento | getquin, Simply Wall St, Affärsvärlden, Ritzau | abr-ago-2026 |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 21-oct-2026 |
| Word y PDF | `motor/rellenar.mjs`, `soffice` | 21-oct-2026 |
| Revisión a 12 meses | `herramientas/apuntar-12m.mjs royal-unibrew-2026-10-21` | Precio 441,20 (21-oct) |
| Símbolo | `verticales/empresa/simbolos.json` (entrada RBREW añadida) | 21-oct-2026 |
| Precios | `NODE_USE_ENV_PROXY=1 node herramientas/precios.mjs RBREW` | Cierre del 21-oct-2026 (15:40 UTC) |
| Robustez | `herramientas/robustez.mjs … --actual` | 21-oct-2026 (441,20) |
