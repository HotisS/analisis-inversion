# Diario: Suzhou TFC Optical (300394.SZ), análisis value del 19-oct-2026

- Commit de partida: `8423ff3b02a6844db49a7a02c9986fad46ad9951`. Checkout compartido con otro análisis en paralelo: sin pull, commit, push, checkout ni stash desde este hilo.
- Inicio: ≈ 17:06 UTC. Notas A-E escritas ≈ 17:24; DCF, Word y PDF ≈ 17:33; fin ≈ 17:36 UTC (reloj del sistema).
- Análisis nuevo, método completo (no había informe anterior de TFC). Notas A-E escritas por el analista (sin subagentes) con `notas/construir-notas.mjs`, con la forma de `informes/cardinal-health-2026-10-19/`.

## Decisiones

1. **Cuentas oficiales**: `cuentas.mjs` no cubre China. Estados de CNINFO (informe anual 2025 del 8-abr-2026, semestral 1S26 del 19-ago-2026, 1T26 del 21-abr-2026, en `notas/docs/`) y serie F10 de Eastmoney (2016-1S26, `notas/em/`) comprobada con los informes. CNINFO necesitó el orgId correcto (9900023911).
2. **Base de acciones de hoy**: 1.090,8 M tras la ampliación liberada de jun-2026. BPA histórico ÷ 1,4 por cada ampliación posterior (2024, 2025 y 2026) y ÷ 1,8 la de 2021. Se corrigió un primer error de factor (2023 y 2024 iban con una ampliación de menos).
3. **Ejercicio objetivo 2028e**; PER actual = precio ÷ BPA de los próximos 12 meses (2,4/12 de 2026e + 9,6/12 de 2027e = 3,61 → 56,3x).
4. **BPA propio muy por debajo del consenso** (2028e 4,74 frente a 7,90; −40 %): se mantiene. El consenso multiplica por cuatro las ventas de 2025 en tres años cuando el 1S26 creció un 15 %. El ciclo de IA se modela con meseta en 2030e en el base y con una caída de ventas del 10 % en 2028e en el bajista (perfil por años).
5. **Sostenibilidad «En parte»** aunque el motor dice «Sí» (las tres pruebas pasan): el crecimiento lo deciden un cliente (63,9 %) y el capex de IA, no la empresa. Consecuencia: no cumple el requisito de calidad Q1 para comprar aunque ROIC − WACC sea ≈ +89 puntos.
6. **WACC 10,9 %** sin deuda: bono chino a 10 años 1,65 %, beta 1,5, prima 5,5 % y +1 punto por concentración y controles de exportación. Terminal 1,0 %.
7. **Puente** a 30-jun-2026: caja 3.178 (efectivo + tesorería), dividendo a cuenta del 17-sep (545,4) en `otros_ajustes`, minoritarios 6,6, asociadas 11,9, arrendamientos 3,6.
8. **Circulante al 19 %** (18,2 % real en 2025) tras el aviso del motor; el 23 % inicial sobraba.
9. **Columna del sector quitada** en la rentabilidad de bolsa: los ETF sectoriales probados (515880, 515050) tienen en Yahoo cierres sin ajustar por desdoblamiento.
10. **Precio**: el informe usa el cierre de hoy (203,30 CNY, −4,46 %; Tencent con sello 16:14:45 de Pekín = 08:14 UTC, Yahoo regularMarketPrice a las 07:04 UTC). Yahoo aún no tenía la barra diaria del 19-oct: `bolsa.mjs`, `movimiento.mjs`, `precios.mjs` y por tanto `robustez.mjs --actual` usan el cierre del 16-oct (212,80; sin sesión «en curso» en precios.json). La variante «precio −5 %» de robustez (≈ 202) cubre el precio de hoy: no cambia la acción.
11. **Regla 13: «retrasa»** hasta que se fije el precio de la emisión de acciones H (dilución del 11-13 %; la solicitud del 10-abr cumplió seis meses el 10-oct y HKEXnews aún la muestra). Los resultados del 3T26 (29-oct) no retrasan: la tendencia es lateral.
12. **Stock Connect**: 300394 está en la lista de valores de SZSE elegibles (actualizada el 16-oct-2026), pero ChiNext en el sentido norte está limitado a inversores profesionales institucionales (FAQ de HKEX): un particular en IBKR no puede comprar la acción A.
13. **Discrepancia sin resolver**: `bolsa.mjs` da +104 % en un año (total, con dividendos) y `movimiento.mjs` +63 % en 12 meses; probablemente miden desde fechas distintas (fin de mes frente a fecha exacta) en un año con mucha volatilidad. No cambia nada de la valoración.
14. Movimientos del 2-jul (−12 %) y del 28-sep (sector −7 %) explicados con prensa (Sina, JRJ) añadida como fuentes propias P3 y P4.

## Resultado

- Regla a 12 meses (v3, sin marcas del selector) al cierre de hoy (203,30): ponderada +1,4 %, base +19,9 % (con dividendo) → **Mantener**; v2 de control −3,6 %. Al cierre del 16-oct (212,80, robustez): −3,1 % / +14,5 %.
- Valor intrínseco 55,57 CNY (−72,7 %); DCF 42,86 (WACC 10,9 %; con la prima del mercado, 52,43). DCF inverso sin solución: el precio supone un 3,0 % anual con nuestros flujos.
- Robustez (`--actual`, con 212,80): SÓLIDA, acción robusta «No mantener»; límite de compra 55,57 CNY (v2 55,57; límite robusto 55,57). BPA −10 %: −12,8 % / +3,1 % (≈ −8,7 % / +7,9 % a 203,30).
- Controles: 18 de 21 correctos y 3 explicados (DCF inverso, caja proyectada, crecimiento del BPA > 25 %).

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Informe anual 2025 | CNINFO (`notas/docs/anual2025`) | 31-dic-2025 (publicado 8-abr-2026) |
| Informe del 1T26 | CNINFO (`t1-2026`) | 31-mar-2026 |
| Informe semestral 1S26 | CNINFO (`s1-2026`) | 30-jun-2026 (publicado 19-ago-2026) |
| Estados 2016-1S26 | Eastmoney F10 (`notas/em/`) | 30-jun-2026 |
| Folleto H (clientes, Frost & Sullivan) | HKEXnews (`ap-hkex`) | 10-abr-2026 |
| Anuncios (recompra, plan de acciones, auditor, ventas) | CNINFO (`notas/docs/`) | hasta 15-oct-2026 |
| Consenso | Eastmoney (`em/forecast.json`), Yahoo | 19-oct-2026 |
| Comparables | `notas/yahoo-datos.mjs` (Yahoo) | 16/19-oct-2026 |
| Datos de bolsa | `bolsa.mjs --accion 300394.SZ --indice 510300.SS --sector 515050.SS` | cierre 16-oct-2026 |
| Precio del informe | Tencent qt.gtimg.cn + Yahoo | cierre 19-oct-2026 (16:14 Pekín) |
| Bono chino a 10 años | ChinaBond | 16-oct-2026 |
| Prima implícita | Damodaran | oct-2026 |
| Stock Connect | HKEX (lista SZSE y FAQ) | 16-oct-2026 / 6-jul-2026 |
| Foros | Guba (Eastmoney), Sina | 14-20 oct-2026 |
| Notas A-E | `notas/construir-notas.mjs` | 19-oct-2026 |
| Integración | `motor/integrar.mjs` | 19-oct-2026 |
| Cálculo | `motor/calcular-empresa.mjs` | 19-oct-2026 |
| Word y PDF | `motor/rellenar.mjs`, LibreOffice | 19-oct-2026 |
| Revisión 12 m | `herramientas/apuntar-12m.mjs` | precio 203,30 (19-oct) |
| Regla 13 | `movimiento.mjs 300394.SZ` | cierre 16-oct-2026 |
| Símbolo | `verticales/empresa/simbolos.json` (entrada 300394) | 19-oct-2026 |
| Precio | `precios.mjs 300394` | cierre 16-oct-2026 (Yahoo sin el 19-oct) |
| Robustez | `robustez.mjs … --actual` | precio 212,80 (16-oct) |
