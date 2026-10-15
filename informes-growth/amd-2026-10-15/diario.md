# Diario: AMD growth, 15-oct-2026

- Precio: cierre del 14-oct (570,82 USD); la sesión del 15-oct seguía abierta (≈ 546-548 USD a las 16:40-17:00 UTC).
- Cuentas del XBRL de la SEC y de la nota del 2T26 (8-K). Caja y deuda pro forma con los bonos de 4.750 M del 17-ago. Acciones con World Labs (8.200 M en acciones, ≈ 14,6 M de acciones).
- Motor v11: 82,3 puntos, Vender (ponderada −26,2 %), euforia; compra hasta 397,40 USD. Robustez: FRÁGIL, acción robusta Vender/No comprar; con las ventas del analista, Mantener (+3,8 %).
- `apuntar-12m.mjs --simular` no sirve para growth (busca en `informes/`): no aplica.

## Lecciones (para quien integre)
1. **Euforia sensible a la fecha de referencia**: la subida a 12 meses cae justo en la semana de un salto de hace un año (OpenAI, +24 % el 6-oct-2025). Con el cierre del 14-oct da +162 % (euforia) y con el precio del 15-oct frente al 15-oct-2025, +130 % (sin euforia). Propuesta: medir la subida contra la media de cierres de ±5 sesiones de hace un año, o marcarlo como alerta cuando el veto dependa de una sola sesión.
2. **Empresas con contratos que cambian de escala (GW)**: la proyección mecánica (39 % que decae) queda un 26 % bajo el consenso, y además el crecimiento del año objetivo que resulta (10,5 % sobre unas ventas NTM ya guiadas al +67 %) rebaja el múltiplo al máximo (−30 %): doble castigo. Pendiente de probar con backtest: que `crecimiento_obj_pct` no pueda quedar más de X puntos por debajo del de la propia proyección mecánica del año 2 (33 %).
3. **Warrants a clientes ligados a ventas (OpenAI, Meta)**: v11 solo usa la dilución pasada. Hasta un 20 % de dilución potencial no entra en el cálculo; se cuantifica a mano (≈ 3 % en 12 meses). Candidato a usar `dilucion_esperada_pct` (v14) cuando la dilución va ligada a ventas ya proyectadas.
4. AMD solo da guía trimestral: la alerta «sin guía anual» no protege aquí, porque la mecánica ya está por debajo del consenso.
