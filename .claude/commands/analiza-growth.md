---
description: Análisis growth de una empresa (método de verticales/growth/metodo.md) → informe.md, datos.json, Word y PDF en informes-growth/
---

Análisis growth de: $ARGUMENTS

1. `git pull`. Lee `verticales/growth/metodo.md` y `verticales/growth/plantilla.md` enteros y síguelos. No leas el método value ni sus informes salvo para el encaje en cartera (`MEMORIA.md`, cartera vigente).
2. Comprueba que la empresa no tiene informe en `informes/` ni en `informes-growth/`; si lo tiene, dilo y sigue solo si el ángulo growth lo justifica.
3. Investiga con búsqueda web (fuentes primarias primero) y rellena `informes-growth/<empresa>-<AAAA-MM-DD>/datos.json`. Capa de foros y sentimiento obligatoria. Nunca datos personales del usuario en consultas.
4. `node motor/growth.mjs informes-growth/<carpeta>/datos.json` y corrige lo que digan los avisos.
5. Escribe `informe.md` con la plantilla, copiando las cifras de `calc`. Genera Word y PDF (pandoc y soffice).
6. `node motor/growth.mjs --todos` para rehacer `informes-growth/resumen.md`; quita la empresa de `cola-growth.md`.
7. Commit y `git pull --rebase` + push a main (otra sesión empuja a main a la vez).
8. Entrega: señal y convicción, puntuación, señales activas, objetivo y rentabilidades, precio máximo de compra, peso orientativo, riesgo principal y rutas.
