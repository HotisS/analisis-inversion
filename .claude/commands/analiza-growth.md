---
description: Análisis growth de una empresa (método de verticales/growth/metodo.md) → informe.md, datos.json, Word y PDF en informes-growth/
---

Análisis growth de: $ARGUMENTS

1. `git pull`. Lee `verticales/growth/metodo.md` y `verticales/growth/plantilla.md` enteros y síguelos. No leas el método value ni sus informes salvo para el encaje en cartera (`MEMORIA.md`, cartera vigente).
2. Comprueba que la empresa no tiene informe en `informes/` ni en `informes-growth/`; si lo tiene, dilo y sigue solo si el ángulo growth lo justifica.
3. Investiga con búsqueda web (fuentes primarias primero) y rellena `informes-growth/<empresa>-<AAAA-MM-DD>/datos.json`. Capa de foros y sentimiento obligatoria. **Bloque `cualitativo` obligatorio** (plantilla, sección 4 bis; 20-oct-2026): foso con cifras, riesgo de IA con veredicto y qué vigilar, ciclo y sector con el último bache, por qué podría perder y fuente del mercado alcanzable (nunca de memoria). Nunca datos personales del usuario en consultas.
4. `node motor/growth.mjs informes-growth/<carpeta>/datos.json` y corrige lo que digan los avisos.
5. Escribe `informe.md` con la plantilla, copiando las cifras de `calc`. Genera Word y PDF (pandoc y soffice).
6. `node motor/growth.mjs --todos` para rehacer `informes-growth/resumen.md`; quita la empresa de `cola-growth.md`.
7. Commit y `git pull --rebase` + push a main (otra sesión empuja a main a la vez).
8. **Pruebas de robustez, obligatorias antes de dar la señal** (14-oct-2026): `NODE_USE_ENV_PROXY=1 node herramientas/robustez-growth.mjs --precios <carpeta>` (`verticales/empresa/robustez.md`, sección growth). Si la proyección mecánica supera las ventas del propio informe o del consenso, la rentabilidad que se comunica es la menor; un `CORREGIR` bloquea la señal. Antes de las pruebas, el bloque `contexto_mercado` del informe (sección 10 bis de la plantilla, regla 13 de `METODO-VIGENTE.md`): `NODE_USE_ENV_PROXY=1 node herramientas/movimiento.mjs <símbolo>`, movimientos fuertes con causa, noticias de 12 meses y veredicto (no cambia / retrasa hasta qué / descarta); sin él, G10 y no se propone la orden.
9. Entrega: veredicto de robustez, señal y convicción, puntuación, señales activas, objetivo y rentabilidades, precio máximo de compra, peso orientativo, riesgo principal y rutas.
