# Séptima hora value (14-oct-2026): puntos clave del método

Lo que se vea fallar o mejorable en los 16 análisis. Los puntos de la sexta hora están en `informes/sexta-hora-2026-10-14/puntos-metodo.md` y no se repiten.

- **cuentas.mjs (SEC) no suma la línea de crédito a la deuda** (IDEXX: 398 M en 2025; deuda real 848 M, no 450). Añadir los conceptos de deuda corriente / línea de crédito (`LineOfCredit`, `ShortTermBorrowings`, `CommercialPaper`) al total.
- **Filtro de valor real y compounders de EE. UU. con el bono al 5,2 %** (IDEXX −50 %, Cintas −39 %, MSCI −27 % en la sexta): el DCF al WACC propio bloquea a casi todas las de calidad alta de EE. UU. Propuesta para el hilo de mejoras: medir en el backtest si el filtro con la prima implícita del mercado selecciona mejor (no cambiar sin prueba).
- **Ejercicio objetivo con cierre en marzo** (Sonova FY2029e; Alibaba usó FY2028e): la regla («el primero que cierra más de 18 meses después del corte») da resultados distintos según quién la lea. Que el motor calcule el ejercicio objetivo a partir de `meta.cierre_ejercicio` y avise si el informe usa otro.
