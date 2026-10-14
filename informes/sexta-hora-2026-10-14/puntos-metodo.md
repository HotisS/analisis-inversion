# Sexta hora value (14-oct-2026): puntos clave del método

Se rellena con lo que se vea fallar o mejorable en los 16 análisis (datos que faltan, sectores donde el PER no sirve, confianza…). El problema de las medianas de PER de 2021-2025 en v3 lo lleva el hilo de mejoras: aquí no se repite.

- **apuntar-12m.mjs no imprime el base de la cifra v2** (solo la ponderada y la señal). Como v2 manda en los requisitos (base ≥ 12 %), conviene que la salida y `objetivo12m-revisados.json` lo den. (MSCI: v2 ponderada 15,1 %, base 11,7 %, calculado a mano con la función del motor.)
- **cuentas.mjs (SEC) solo recoge la depreciación del inmovilizado**: en empresas con mucha amortización de intangibles y software activado (MSCI) el EBITDA sale ≈170 M bajo. Sumar la amortización de intangibles y llevar el software activado al capex.
- **cuentas.mjs --esef en bolsas con cámara de compensación** (Euronext): toma como ingresos solo los de contratos con clientes y como deuda solo la de largo plazo. Hay que corregir las dos cosas a mano (lo mismo valdrá para Deutsche Börse, LSEG y cualquier grupo con ingresos de tesorería o deuda a corto relevante).
- **Calidad en grupos con fondo de comercio grande** (Euronext tras Borsa Italiana: ROIC 10,9 % frente a WACC 7,4 %, +3,5 puntos): la regla ROIC − WACC ≥ 5 deja fuera negocios con foso claro y margen del 60 % por el precio pagado en compras. Propuesta: dar también el ROIC sin fondo de comercio y decidir con el publicado (como ahora) salvo excepción razonada, igual que LVMH.
