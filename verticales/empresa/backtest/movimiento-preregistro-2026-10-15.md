# Movimiento del precio como regla de compra: protocolo fijado ANTES de mirar resultados (15-oct-2026, 11:50 UTC)

Encargo del usuario (15-oct, 11:31): el análisis de movimiento del precio y de noticias tiene que ser parte del método y de la selección de compras. La comprobación y la explicación entran ya (regla 13 de §4, `herramientas/movimiento.mjs`, bloque `bolsa.contexto`). Aquí se fija cómo se decide si alguna **regla numérica** sobre el precio merece cambiar señales. Este archivo se sube al repo antes de ejecutar el backtest y no se cambia después.

## Datos

Cierres y BPA de `backtest-selector.mjs` (observación = empresa × cierre t; regla vigente con BPA ingenuo; compra robusta = pasa con v3 ×1,1 y v2). Precios diarios de Yahoo (`movimiento.mjs`, 12 años) por el símbolo de `simbolos.json`; las métricas del precio se miden en el último cierre disponible hasta el **31 de diciembre de t** (los cierres del backtest son de ejercicio; en las empresas con ejercicio no natural hay un desfase de meses que se acepta y se dice). Rentabilidad real = la de la observación (precio t+1 + dividendo).

## Reglas candidatas (se miden sobre las compras robustas)

| Regla | Qué bloquea |
|---|---|
| R1 subida fuerte | +25 % en 1 mes, o +40 % en 3 meses |
| R2 cerca de máximos tras subir | a ≤ 5 % del máximo de 52 semanas y +20 % en 3 meses |
| R3 caída fuerte | −20 % en 1 mes, o −30 % en 3 meses |
| R4 en mínimos | a ≤ 3 % del mínimo de 52 semanas |
| R5 bajo la media | ≥ 15 % por debajo de la media de 200 sesiones |

De cada regla: compras que bloquea (n y %), rentabilidad real mediana y % en pérdida > 10 % de las bloqueadas frente a las que quedan, y lo mismo en todos los cierres (no solo compras) como contexto. Mitades por ticker (pares diseño, impares validación).

## Criterio de adopción

Una regla pasa a cambiar señales (de Comprar a Esperar) si, en la muestra entera con BPA ingenuo, las compras que bloquea tienen una rentabilidad real mediana **al menos 5 puntos por debajo** de las que quedan **y** un % en pérdida > 10 % **al menos 5 puntos por encima**, con el mismo signo en la mitad de validación, y bloquea **≤ 25 %** de las compras. Si solo cumple una de las dos, queda como aviso (P1-P5 de `movimiento.mjs`) y la causa se explica en el informe. Si ninguna cumple, el movimiento del precio no cambia señales por sí solo: exige explicación y veredicto (regla 13), que es lo que pide el usuario.

## Lo que no se prueba aquí

Las noticias (recomendaciones, ventas de directivos, colocaciones, demandas, fusiones) no están en los datos del backtest: entran como comprobación obligatoria con veredicto, no como regla numérica.
