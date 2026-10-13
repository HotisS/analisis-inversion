# Encargo combinado (una empresa): A) metodología del informe y B) rentabilidad a 12 meses v2

Haz **A y luego B**, en orden, sobre la misma carpeta. Sin búsquedas web (la red está cerrada) ni cifras inventadas; sin commit; no toques nada fuera de tu carpeta.

**A.** Sigue `verticales/empresa/encargos/actualizacion-sostenibilidad.md` (actualización rápida con la prueba de sostenibilidad del crecimiento; si la prueba falla, rebaja el caso base siguiendo `verticales/empresa/encargos/recorte-caso-base.md` de esa misma carpeta, dentro de la misma versión). Si la carpeta ya tiene `dcf.sostenibilidad` y te digo que solo toca el recorte, haz solo `verticales/empresa/encargos/recorte-caso-base.md`.

**B.** Con la versión que acabas de generar, sigue `verticales/empresa/encargos/revision-12m.md` (revisión v2: PER propio × BPA propio). Además de la media simple de los tres escenarios, calcula la **media ponderada con las probabilidades de `escenarios.casos[].probabilidad_pct`** y la **rentabilidad del base** (método actualizado en `verticales/empresa/objetivo-12m.md`, puntos 4 y 5). Si ya existe un `revision-12m-2026-10-13.md`, reescríbelo con la versión nueva del informe.

**Devuelve**: (1) la tabla antes → después de A (señal, convicción, objetivo, rentabilidad, veredicto de sostenibilidad, supuestos cambiados) en 5 líneas como máximo; (2) la línea JSON de B con los campos de `revision-12m.md` más `"base": <objetivo del base>`, y la nota con «bajista PERx × BPA = X; base … = Y; alcista … = Z».
