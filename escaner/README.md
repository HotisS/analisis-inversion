# Escáner diario de precios y señales

Pedido del usuario (14-oct-2026): «escáner diario de actualización de precios que se lance cada día sobre las 9:30 y las 15:00 (EE. UU. y Europa abiertos); si una acción toca banda de comprar (y puede entrar como candidata) o de vender (y está en cartera), se actualiza el análisis con nueva V (Vup) y se emite señal; ideal para trackear y dar valor a todo este trabajo».

Se lanza solo, de lunes a viernes, a las **9:30 y a las 15:45 de Madrid** (Wall Street abre a las 15:30 de Madrid), con una tarea programada que hace los pasos de abajo y publica el resultado en el proyecto. (`perfiles.json` de esta carpeta es de otra herramienta: el buscador de candidatas `/escanea-mercado`.)

## Archivos

| Archivo | Qué es | Quién lo cambia |
|---|---|---|
| `cartera.json` | Posiciones reales, liquidez, liquidez libre y órdenes ya decididas | El hilo value (dueño de la cartera), cuando el usuario confirma una orden ejecutada |
| `reglas.json` | Reglas de MEMORIA.md y METODO-VIGENTE.md §4 que aplica el escáner: tamaño, calidad, exclusiones, no vender, umbrales de venta | Quien cambie esas reglas en MEMORIA.md |
| `escaneo-ultimo.json` | Resultado del último escaneo: candidatas, observaciones, señales activas | La herramienta |
| `decisiones.json` | Lo que sale del Vup de cada candidata | Claude, en cada ejecución |
| `registro-senales.json` | Registro histórico de todas las señales y su seguimiento | La herramienta (no editar a mano) |
| `SENALES.md` | El registro en tabla, con el resumen de aciertos | La herramienta |
| `mensaje-ultimo.md` | El mensaje para el chat del proyecto | La herramienta |

## Pasos de cada ejecución

1. `git pull --rebase --autostash origin main`.
2. `NODE_USE_ENV_PROXY=1 node herramientas/escaner-diario.mjs` — precio de ahora de todas las analizadas (value y growth), pruebas de robustez a ese precio con el **objetivo fijo** y reglas contra la cartera. Deja tres listas:
   - **Candidatas**: necesitan Vup antes de ser señal.
   - **Observaciones**: tocan banda pero no hay liquidez libre (o el bolsillo growth está lleno), o ya están en una orden decidida. Se apuntan en el registro sin Vup, para medir después si habría acertado.
   - **Activas**: señales emitidas en los últimos 30 días que siguen en pie. No se repiten.
3. **Vup de cada candidata** (abajo) y `escaner/decisiones.json`.
4. `NODE_USE_ENV_PROXY=1 node herramientas/escaner-diario.mjs --registrar escaner/decisiones.json` — apunta todo, actualiza el seguimiento y escribe `SENALES.md` y `mensaje-ultimo.md`.
5. Commit y push (`escaner/`, `verticales/empresa/precios.json`), con `git pull --rebase` antes.
6. Publicar `mensaje-ultimo.md` en el proyecto, tal cual (lenguaje llano, una cifra por dato).

## Cuándo una acción es candidata

**Compra (no está en cartera):**
- Value: precio de ahora ≤ **límite robusto** = el menor de los límites de compra del método vigente y de v2 (pasa con los dos), con el objetivo fijo; acción robusta «Comprar» en `robustez.mjs --actual` (la confianza baja y las marcas de CONFIANZA la bajan a Mantener); calidad: ROIC − WACC ≥ 5 puntos (LVMH, excepción) y sostenibilidad «Sí»; no excluida (juego, Accenture, Rightmove, Adobe, comercio minorista, Duolingo, HubSpot). Si solo la frenan resultados publicados después del informe (E1) o un precio que se ha movido más de un 15 % (E3), también es candidata, con **Vup obligatorio**.
- Growth: precio ≤ «compra hasta» del informe, señal robusta «Comprar», rentabilidad de hoy (objetivo fijo) por encima de los listones de v11.
- Y además: liquidez libre para una posición de al menos 1.000 EUR (5 % de la cartera, tope 7 %), y en growth hueco en el bolsillo (≤ 20 %). Varias candidatas se reparten la liquidez por orden de rentabilidad.

**Venta (está en cartera; nunca Edenred ni el oro):**
- Value: deja de pasar el filtro para mantener al precio de ahora (ponderada ≥ 10 %, base ≥ 5 %, valor intrínseco no más de un 15 % bajo el precio), o ROIC − WACC < 5, o cruza un umbral apuntado (Netflix > 71,88 USD; Uber > ≈72,3 USD).
- Growth: rentabilidad de hoy ≤ −10 % (regla de venta de v11), o tesis rota (en el Vup).

## Vup: actualizar el análisis antes de emitir

Para cada candidata, antes de convertirla en señal:

1. **Lo publicado después del informe.** Mirar (búsqueda web, fuente primaria primero: nota de resultados, presentación, regulador) si desde la fecha de corte (`fecha_corte` en la salida) hay resultados, cambio de guía, profit warning, operación corporativa, cambio de consejero delegado o un hecho que toque la **señal de alarma** del informe (se imprime con la candidata). Nunca poner datos personales del usuario en las consultas.
2. **Revisión con el método vigente.** Si hay resultados o guía nueva que mueven el BPA del ejercicio objetivo (value), estimar el factor (BPA nuevo ÷ BPA del informe; por ejemplo, si la guía baja un 5 %, 0,95) y recalcular: `node herramientas/escaner-diario.mjs --vup <clave> --bpa 0,95`. Dice si la compra robusta sigue en pie y a qué límite (o, en una venta, hasta dónde pasa el filtro de mantener). En growth, si la guía de ventas baja o se cumple la «tesis rota» del informe, se descarta.
3. **Pruebas de robustez.** Ya van en el escaneo (y en `--vup`); repasar las marcas que salen con la candidata.
4. **Decisión.** Emitir solo si la señal se sostiene tras los tres pasos; si no, descartar y decir por qué. Con resultados en menos de 14 días, la compra se propone en dos tramos (el segundo tras los resultados). Si el cambio es grande (BPA ±10 % o tesis tocada), además se pide al coordinador una versión nueva del informe.

`escaner/decisiones.json` (una entrada por candidata; el ejemplo es ilustrativo):

```json
[
  { "clave": "NEM", "tipo": "COMPRA", "decision": "emitir",
    "vup": "Sin resultados desde el 10-oct (próximos el 5-nov); nada toca la señal de alarma; robustez SÓLIDA al precio de ahora.",
    "motivo": "Software de diseño para construcción que crece al 10 % y cotiza por debajo de su historia.",
    "objecion": "«La IA llega al diseño». Respuesta: el ARR sigue creciendo al 14 %; si baja del 10 %, la señal se retira.",
    "limite": 71.0, "titulos": 14 }
]
```

`decision`: `emitir` o `descartar`; `vup`: qué se miró y qué salió (obligatorio); `motivo` y `objecion`: en lenguaje llano para el mensaje (si faltan, van los automáticos); `limite` y `titulos`: solo si el Vup los cambia.

## Seguimiento

Cada señal guarda el precio en euros y el del índice mundial (IWDA, en euros) en el momento de la señal. En cada ejecución se mide desde entonces: una compra acierta si lo hace mejor que el índice; una venta, si después de vender la acción lo hace peor que el índice. Se guarda la foto a 1, 3, 6 y 12 meses (`a_1m` … `a_12m`). También se siguen las que tocaron banda y no se emitieron (sin liquidez, descartadas en el Vup, ya en órdenes), para ver si los filtros ayudan.
