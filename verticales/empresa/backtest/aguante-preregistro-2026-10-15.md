# Aguante de la compra (¿qué umbral evita que una compra acabe en venta?): protocolo fijado ANTES de mirar resultados (15-oct-2026, 10:50 UTC)

Origen: reglas del usuario del 15-oct (10:36): sin compras a plazos y lo comprado no se toca en al menos 3 meses, así que la decisión de compra tiene que ser robusta. Caso a explicar: Zoetis e Intuit, compradas hace poco y que ya daban venta. Este archivo se sube al repo **antes** de ejecutar el backtest y no se cambia después.

## Datos

Los de `backtest-selector.mjs` y `backtest-colchon.mjs` (cierres de ejercicio y BPA de los informes; BPA ingenuo = crecimiento mediano anterior, acotado a −10 %/+25 %). Observación = empresa × cierre t en que la regla dice Comprar **y** en t+1 se puede recalcular la regla con lo conocido entonces (precio t+1, historia hasta t+1, BPA ingenuo desde t+1, que necesita BPA real de t+1). El horizonte es **12 meses** porque los cierres son anuales: es un techo de lo que pasaría a 3 meses (a 3 meses hay menos tiempo para que cambie el precio o el BPA), no la cifra a 3 meses.

## Qué se mide

**Vuelco** = la compra de t da «No mantener» en t+1 (ponderada < 10 % o base < 5 % con el selector, con el precio de t+1). Se separa en:
- **vuelco con subida**: el precio de t+1 está al menos un 10 % por encima del de t (la señal cambia porque se ganó: vender es cobrar);
- **vuelco malo**: el precio no subió un 10 % y aun así la regla dice vender (lo que el usuario no quiere: comprar y que la misma regla mande vender sin que haya pasado nada bueno).

Estrategias: selector solo (Comprar vigente, sin exigir v2); robusta (pasa con v3 ×1,1 **y** v2) con colchón c ∈ {0, 2, 3, 5, 8} sobre los umbrales (ponderada ≥ 15 + c y base ≥ 12 + c con los dos). De cada una: compras, % de vuelco malo, % de vuelco con subida, rentabilidad real mediana a 12 meses y % en pérdida > 10 %. Además, la misma medida por **margen de la compra** (ponderada robusta − 15, la menor de los dos métodos) en tramos 0-3, 3-8, 8-15 y ≥ 15 puntos, para ver desde qué margen las compras aguantan.

## Criterio de adopción

Se adopta el colchón c más pequeño que, en la muestra entera con BPA ingenuo, baje el % de vuelco malo al menos 5 puntos frente a c = 0 conservando al menos el 60 % de las compras, sin cambiar de signo en la mitad de validación (empresas de ticker impar). Si ninguno lo cumple, el umbral de compra no cambia y el aguante se garantiza con la regla de cartera (lo comprado no se toca en 3 meses salvo hecho nuevo y duro), que es una regla del usuario y no necesita backtest. En todo caso se informa del margen desde el que el vuelco malo baja, como criterio de orden entre compras.

## Lo que no se prueba aquí

Los vuelcos por cambio de método (Zoetis e Intuit: v1 → v2 → v3 en dos días) no se pueden medir con cierres: la regla del backtest es siempre la misma. Se explican con los informes.
