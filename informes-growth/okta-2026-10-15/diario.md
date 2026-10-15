# Diario: Okta growth (15-oct-2026)

- Encargo de la tanda en paralelo (sin subagentes, sin commit). Precio: cierre del 14-oct 211,92 USD (sesión del 15-oct abierta a las 16:40 UTC: 209,51).
- Cuentas leídas de la SEC directamente (8-K ex. 99.1 de los cinco últimos resultados y XBRL companyfacts). `cuentas.mjs` necesita `--sec`; no hizo falta.
- `apuntar-12m.mjs <carpeta> --simular` busca en `informes/` (solo value): no aplica a growth (ENOENT). Se deja anotado.
- Motor v11: Comprar (baja), 67,7 puntos, ponderada +7,9 %, compra hasta 217,8. Robustez: SÓLIDA; Mantener con 35/50/15 y con ventas −10 %.

## Lecciones (para quien integra)
1. **El motor da Comprar a una empresa que crece un 11 % y que el filtro previo descarta (A y D).** La puntuación llega a 67,7 sin crecimiento (bloque A 8,3/25) gracias a las señales de tendencia (15/20; cinco de ellas son la propia subida del precio), la caja (10/10) y la economía (13/15). Propuesta: exigir el crecimiento mínimo del filtro previo (≥ 15 %) también como requisito de Comprar dentro de v11, o que la puntuación del bloque A tenga un mínimo (p. ej. ≥ 10/25).
2. **Las señales 2, 3 y 4 (media de 200, fuerza relativa, mejora de múltiplo) cuentan la misma subida tres veces.** En una subida de +191 % puntúan 7,5 puntos solo por precio. Pendiente de backtest: contar una sola señal de precio cuando la subida a 6 meses supera el 100 %.
3. La euforia a 12 meses (≥ 150 %) se queda corta por poco (138 %; ~147 % en el máximo del 9-oct): la alerta propuesta de euforia a 6 meses (> 100 % y múltiplo > 1,4 × mediana) saltaría aquí, como en Rubrik y Hinge. Otro caso a favor de probarla.
4. Riesgo de IA específico de la identidad de empleados: el cobro por usuario sufre si la IA reduce plantillas; el cobro por agente aún no es material. Vale para cualquier software por puesto (lecciones-casos).
