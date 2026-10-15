# Puntos de método de la octava hora (15-oct-2026), para el hilo Mejoras

1. **Escáner frente a informe (valor intrínseco).** El escáner compara lo que descuenta el precio con el crecimiento pasado de las ventas; el informe, con el crecimiento futuro del caso base. Por eso 7 de 16 pasaron el escáner y fallaron por valor intrínseco. Propuesta: en el perfil `calidad-a-precio`, usar el crecimiento de ventas del consenso a 2 años (Yahoo lo da) en lugar del pasado, y excluir lo que ha subido más del 60 % desde su mínimo de 52 semanas (Qualys y Paycom).
2. **Tasa libre y prima del escáner** desalineadas con el DCF de los informes (USD 4,1 frente a 5,2; prima 4,2 frente a 5,5). Corregido el 15-oct (6565ad3).
3. **La herramienta de robustez no mira la sostenibilidad del analista.** DO & CO sale «Acción robusta: Comprar» con sostenibilidad «En parte», que §4 no deja comprar. Propuesta: que `robustez.mjs` aplique el requisito 3 completo.
4. **Burckhardt cambia de FRÁGIL a SÓLIDA con un −2 % de precio.** Con colchones de BPA del 1-3 %, la acción robusta salta de un día a otro. Propuesta: exigir un colchón mínimo (¿5 %?) para la compra robusta o, si no, comprar tras resultados.
5. **`cuentas.mjs --sec`** sigue sin sumar `DebtCurrent` (Cencora, Broadridge) y da la amortización sin intangibles (EBITDA de Broadridge: 1.438 frente a 1.809).
6. **Suiza, Polonia e Italia (Rai Way) sin XBRL utilizable**: cuentas copiadas de PDF; confianza media.
7. **ROIC con capital invertido negativo** (Qualys, Sage: ingresos cobrados por adelantado): el motor da n.d. o una cifra sin sentido. Propuesta: ROIC sobre el capital operativo a largo plazo, como se hizo a mano con Booking.
8. **Citas `[A3]` dentro de las notas**: `integrar.mjs` no las traduce (hay que escribir `[3]`).
9. **Temporales `notas/tmp/`** entraban en el repo: ya en `.gitignore` (15-oct).
