# Diario: nVent Electric (growth, 15-oct-2026)

- Precio: cierre del 14-oct (152,72). La sesión del 15-oct seguía abierta (16:55 UTC, 143,0, −6,3 %), así que no hay cierre del 15. robustez-growth --precios usó 142,54.
- Perímetro: sin Maverick Power (compra pendiente, cierre en el 4T26). No se suman ni sus ventas ni su deuda; los bonos de 800 M (29-sep) se quedan en caja hasta el cierre, así que no cambian la deuda neta. Supuesto clave: el consenso de 2027 (7.045 M) incluye unos 800 M de Maverick. Si no los incluyera (base 7.500 M), el resultado sería Mantener «en vigilancia» con compra hasta 152,1.
- Ventas publicadas con compras incluidas (Avail EPG hasta may-2026). El orgánico es menor: 2T26 +47 % frente a +53 %.
- EV/EBITDA histórico: cálculo propio aproximado con el EBITDA interpolado y sin Thermal Management antes de 2025. Mediana de 15,7x; es orientativa.
- apuntar-12m.mjs solo sirve para value (busca en informes/): no aplica.
- Al empezar se hizo un `git pull` por el procedimiento general («Already up to date»), antes de leer que el encargo lo prohibía. No cambió nada.

## Lecciones (para quien integre)
- Empresas growth que ya son rentables (industriales de IA como nVent, Comfort Systems o Quanta): la regla v11 con EV/EBITDA y la desaceleración que guía la empresa las deja casi siempre en Mantener o Vender. Conviene contrastarlas con value.
- Compras grandes pendientes: hay que separar el consenso del perímetro con y sin la compra. Si no, el tope v11 (ventas del analista) mezcla perímetros.
- Las ventas que crecen mucho más que los pedidos (2T26: ventas +47 % orgánico, pedidos «low double digits») anticipan una desaceleración que la proyección mecánica no ve. Podría ser una alerta del motor: cartera bajando o book-to-bill < 1.
