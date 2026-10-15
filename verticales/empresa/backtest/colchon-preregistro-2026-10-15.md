# Colchón de la compra robusta: protocolo fijado ANTES de mirar resultados (15-oct-2026, 12:05 UTC)

Origen: punto 4 de la 8ª hora value (`/mnt/project-files/analisis/octava-hora-2026-10-15/puntos-metodo.md`): Burckhardt pasaba de FRÁGIL a SÓLIDA con un 2 % menos de precio. Una compra «robusta» (pasa con v3 ×1,1 y con v2) que se decide por décimas no es robusta. Se prueba si exigir un **colchón** sobre los umbrales de compra mejora las compras robustas. Este archivo se sube al repo **antes** de ejecutar el backtest y no se cambia después.

## Datos

Los de `backtest-selector.mjs` (cierres de ejercicio y BPA de los informes del repo; observación = empresa × cierre t con ≥ 3 años de historia, precio t+1 y BPA t+2; horizonte 12 meses; pesos 25/50/25). BPA ingenuo (crecimiento mediano anterior, acotado a −10 %/+25 %) como caso principal; BPA real como techo. Mitades fijas por orden alfabético del ticker (pares diseño, impares validación).

## Estrategias

Compra robusta vigente = pasa el umbral con v3 ×1,1 **y** con v2 (ponderada ≥ 15 % y base ≥ 12 % con los dos). Variantes con colchón **c**: ponderada ≥ 15 + c y base ≥ 12 + c, con los dos métodos, para c ∈ {0 (vigente), 2, 3, 5, 8} puntos. Además, para situar, el selector solo (la regla vigente sin exigir v2) con c = 0.

De cada una: compras, rentabilidad real mediana a 12 meses (con dividendo), % con ≥ 15 %, % con < −10 %, y las **compras que pierde** cada colchón frente a c = 0 (rentabilidad mediana y % < −10 % de las perdidas: si las perdidas son tan buenas como las que quedan, el colchón solo quita compras).

## Criterio de adopción

Se adopta el colchón c más pequeño que, en la muestra entera con BPA ingenuo: (a) baje el % de compras con < −10 % al menos 3 puntos frente a c = 0; (b) conserve al menos el 60 % de las compras de c = 0; (c) no baje la rentabilidad mediana de las compras; y (d) en la mitad de validación (a) y (c) tengan el mismo signo. Si ningún c lo cumple, no hay colchón: la compra robusta sigue siendo pasar con los dos métodos, y el caso Burckhardt se trata con la regla de orden ya vigente (una compra a décimas del umbral y con resultados cerca se hace tras los resultados, §4 regla 6), sin número nuevo.

## Lo que no se prueba aquí

Comprar «tras resultados» es una regla de momento, no de umbral: el backtest con cierres anuales no la puede medir. El veredicto FRÁGIL/SÓLIDA de `robustez.mjs` (acuerdo entre variantes) tampoco: aquí solo hay dos métodos por cierre.
