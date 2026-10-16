# Escáner diario de precios y señales

Pedido del usuario (14-oct-2026): «escáner diario de actualización de precios que se lance cada día sobre las 9:30 y las 15:00 (EE. UU. y Europa abiertos); si una acción toca banda de comprar (y puede entrar como candidata) o de vender (y está en cartera), se actualiza el análisis con nueva V (Vup) y se emite señal; ideal para trackear y dar valor a todo este trabajo».

Se lanza solo, de lunes a viernes, a las **9:25 y a las 15:45 de Madrid** (Wall Street abre a las 15:30 de Madrid), con una tarea programada que hace los pasos de abajo y publica el resultado en el proyecto. (`perfiles.json` de esta carpeta es de otra herramienta: el buscador de candidatas `/escanea-mercado`.)

> **REGLA DURA (usuario, 14-oct 18:04):** las señales del escáner son **avisos, nunca órdenes**. Ninguna rutina ni paso automático toca el broker ni herramientas de órdenes. Una compra o venta solo se lanza si el usuario la pide explícitamente en el chat **y** la confirma cuando se le pide confirmación.

## Rutinas (plan del 14-oct-2026; horas de Madrid)

| Cuándo | Qué | Cómo |
|---|---|---|
| L-V 9:25 | Vigilancia + escáner: resultados publicados desde la última pasada (cartera, órdenes, lista de espera, suplentes) → actualizar su análisis y revisar su señal; alertas de riesgo de la cartera (salida del consejero delegado, recorte de previsión, investigación abierta, ley francesa de Edenred); escáner de precios con Vup | `--vigilancia`, noticias y leads (paso 1c), búsqueda web, escáner, `--registrar` (avisos en `decisiones.json`) |
| L-V 15:45 | Escáner de precios con EE. UU. abierto | escáner, `--registrar` |
| Domingo 17:50 | Informe semanal (la parte de cartera —rentabilidad frente al índice, liquidez— la dará la vertical de seguimiento de cartera conectada a IBKR cuando exista; hasta entonces sale provisional de `--semanal`) (cartera frente al índice, señales y aciertos, lista de espera, suplentes, liquidez ociosa / XEON) y repaso del método (robustez de todo, informes viejos para la cola) y noticias (seguimiento de avisos y leads, muestra del modelo, propuestas por sector) | `--semanal` → `semanal-ultimo.md`; `noticias.mjs --seguimiento`, `noticias-modelo.mjs --datos --muestra` |
| Primer domingo del mes 17:20 | Backtest con los cierres nuevos (selector y regla de desrateadas, que se apoya en 7 casos); se implanta solo si mejora y lo hace el hilo Mejoras | `node herramientas/backtest-selector.mjs --salida verticales/empresa/backtest/selector-mensual-AAAA-MM.md`, comparar con `selector-resultados-2026-10-14.md` |
| Cuando haga falta | Tandas de análisis nuevos, dinero nuevo o rebalanceo grande, cambios de método, preguntas del usuario | No es rutina |

Además, **cada hora en punto y cinco (7:05 a 22:05, todos los días)** una comprobación mira si alguna rutina se quedó sin hacer y, si es así, la hace; si no, no hace nada.

**Ninguna rutina se pierde** (regla del usuario, 14-oct): `herramientas/rutinas.mjs` guarda en `escaner/ejecuciones.json` la última ejecución completada de cada una. Toda rutina, al arrancar: (1) `node herramientas/rutinas.mjs --pendientes`; (2) hace primero lo pendiente, de la más antigua a la más reciente (de cada rutina, solo la última pasada perdida; si están pendientes a la vez la de la mañana y la de la tarde, la vigilancia y un solo escaneo cubren las dos), marcando `--empieza <id>` al empezar y `--hecha <id>` después del push; (3) luego lo suyo. Una pasada que empezó y no terminó sale como «retomarla». Nada de esto se cuenta al usuario: solo el resultado.

Si no hay nada nuevo, el mensaje del escáner es una sola línea. Las tareas despiertan al hilo «Escáner diario» del proyecto; el resultado se publica en ese hilo y el coordinador lo copia en el chat del proyecto.

## Archivos

**Privacidad (14-oct):** todo lo que lleva datos de la cuenta (la cartera, los escaneos, las decisiones, el registro de señales y los mensajes) vive en la carpeta privada del proyecto, `/mnt/project-files/cartera/real/` (o `$CARTERA_REAL`): la cartera en `escaner-cartera.json` y las salidas del escáner en `escaner/`. En el repo, que es público, solo quedan las reglas, el calendario, el control de rutinas y este procedimiento. En la tabla, «privada/» es esa carpeta.

| Archivo | Qué es | Quién lo cambia |
|---|---|---|
| `/mnt/project-files/cartera/real/escaner-cartera.json` (privado; plantilla en `cartera.ejemplo.json`) | Posiciones reales, liquidez, liquidez libre y órdenes ya decididas | El hilo value (dueño de la cartera), cuando el usuario confirma una orden ejecutada |
| `reglas.json` (y privada/`escaner-menciones.json`) | Reglas de MEMORIA.md y METODO-VIGENTE.md §4 que aplica el escáner: tamaño, calidad, no vender, umbrales de venta. **Exclusiones y bloqueos con caducidad** (16-oct, pedido del usuario): la fuente es `menciones` (fecha, motivo con sus palabras, mensaje, caduca: empresa 6 meses, sector 12; lo del método no caduca); `node herramientas/exclusiones.mjs --aplicar` rehace `exclusiones` y `no_vender`, `--lista` las enseña y el domingo `--recordar --marcar` saca «Recordar: X … ¿Se mantiene?» dos semanas antes; al caducar solo deja de valer cuando el usuario lo ha visto. Lo que toca a sus cuentas, en la privada | Quien cambie esas reglas (editar `menciones` y `--aplicar`) |
| privada/`escaner/escaneo-ultimo.json` | Resultado del último escaneo: candidatas, observaciones, señales activas | La herramienta |
| privada/`escaner/decisiones.json` | Lo que sale del Vup de cada candidata | Claude, en cada ejecución |
| privada/`escaner/registro-senales.json` | Registro histórico de todas las señales y su seguimiento | La herramienta (no editar a mano) |
| privada/`escaner/SENALES.md` | El registro en tabla, con el resumen de aciertos | La herramienta |
| privada/`escaner/mensaje-ultimo.md` | El mensaje para el chat del proyecto | La herramienta |
| `noticias.json`; privada/`escaner/expedientes/`, `leads-*.json/.md`, `noticias-*.json/.md` | **Noticias → leads → candidatas** (15-oct, pedido del usuario: «no quiero leer las noticias; quiero que alimenten un registro por compañía o sector y nos den leads»). **El usuario no lee noticias**: solo le llega lo que acaba en candidata. Paso 1c de las 9:25: (1) `NODE_USE_ENV_PROXY=1 node herramientas/noticias.mjs --escribir --amplio` guarda en el **expediente** de cada empresa analizada (value y growth) y de cada sector de `_sectores` (energía, electricidad, frío industrial, IA) lo nuevo de Google Noticias, Yahoo Finance y la SEC (8-K por puntos; formularios 4 con compras P y ventas S fuera de plan), con categoría de la regla 13, gravedad y tono; (2) `node herramientas/leads.mjs --escribir` saca hasta 6 **leads** con reglas explícitas (A caída cerca del límite sin tesis rota; B hecho a favor cerca del límite; C compras de directivos; D condición pendiente de `_condiciones`, las de «Vigilar» de `cola.md`); (3) cada lead pasa el **Vup** y `robustez.mjs` con el precio de ahora: solo si sale compra robusta con calidad (ROIC − WACC ≥ 5 y sostenibilidad «Sí») va al mensaje como **candidata con su límite**; si no, se apunta su `resultado` en `leads-registro.json` y no se dice nada. Las noticias de las órdenes abiertas siguen sirviendo al veredicto de la regla 13: solo sale una línea si cambia una orden. Antes de una orden, `noticias.mjs --meses 12 --valores <clave>`. **Domingo**: `noticias.mjs --seguimiento`; `noticias-modelo.mjs --datos --muestra`; lectura de los expedientes de sector de la semana para proponer al coordinador como mucho 2 empresas no analizadas que salgan repetidas con hechos a favor (antes, `escaner.mjs --simbolos` para ver ROIC y crecimiento). **Primer domingo del mes**: `noticias-modelo.mjs --entrenar` (preregistro en `verticales/empresa/backtest/noticias-modelo-preregistro-2026-10-15.md`: no decide nada hasta pasar la validación en vivo, como pronto a mediados de enero de 2027). `--pruebas` antes de cambiar la herramienta (6 hechos conocidos) | La vigilancia de la mañana (salidas); cualquiera puede añadir homónimos, sectores o condiciones a `noticias.json` |
| `radar.json`, `radar-estado.json` | **Radar de estudio** (hilo Mejoras, 15-oct): valores que no son candidatas pero conviene estudiar si bajan de un precio o tras sus resultados. `node herramientas/radar.mjs` en las pasadas de 9:25 y 15:45; un aviso va al coordinador (que pide el análisis), nunca es señal de compra | El coordinador o Mejoras (lista); la herramienta (estado) |
| `cobertura.json`, `publicados.json`, `revisiones.json` | **Inventario único de cobertura** (15-oct, pedido del usuario: «que no escape nada dentro de nuestro sistema; si algo tiene calidad hay que seguirlo: resultados, noticias…, todo enlazado»). `node herramientas/cobertura.mjs` hace una fila por empresa analizada (último análisis value o growth) con calidad, señal, próximos resultados, índices y si está enlazada en calendario, noticias, expediente, escáner y Excel. **Toda empresa con calidad** (value: ROIC − WACC ≥ 5, excepción o n.d.; growth: puntuación ≥ 60) tiene que estar en todas; marca además las de más de 6 meses («reanalizar») y los resultados publicados después del análisis que nadie ha revisado. `--arreglar` (9:25) pone la fecha de Yahoo a las que no la tienen (la pasada queda en «anteriores») y apunta los últimos publicados en `publicados.json`. La vigilancia de la mañana revisa las de calidad que publicaron (bloque «SEGUIMIENTO POR CALIDAD», hasta 8 por pasada) y apunta cada revisión con `--revisado <clave> --resultados <fecha> [--bpa f] --resultado "…"` en `revisiones.json`. El Excel lo enseña en «Último análisis» y «Seguimiento» | La herramienta y la vigilancia de la mañana |
| `indices.json`, `indices/`, `indices-huecos.json` | **Grandes índices** (15-oct; ampliado el 16-oct a 21): `NODE_USE_ENV_PROXY=1 node herramientas/indices.mjs` descarga los componentes de S&P 500, Nasdaq-100, MSCI World, STOXX Europe 600, EURO STOXX 50, FTSE 100, Nikkei 225, DAX, SMI, CAC 40, IBEX 35, S&P/TSX 60, MSCI Emerging Markets, Hang Seng, CSI 300, MSCI Korea, KOSPI 200, MSCI Taiwan, Nifty 50, S&P/ASX 200 y Straits Times (listas públicas de SSGA, Nasdaq, Xtrackers y Amundi; TSX 60, KOSPI 200, Nifty 50 y parte del Hang Seng, de Wikipedia; ISIN → Yahoo en `indices/isin-yahoo.json`), los compara con la foto anterior y apunta altas y bajas. Domingo: `--altas-calidad` (filtro previo de calidad de las altas sin analizar); primer domingo del mes: `--sin-descarga --huecos` (todos los miembros sin analizar). Lo que pasa el filtro previo (ROIC − WACC ≥ 5 aproximado, sin exclusiones del usuario; bancos y aseguradoras aparte) va al coordinador para análisis completo, como mucho 5 por semana. Ojo: el ROIC − WACC del filtro sale de Yahoo y puede exagerar mucho (16-oct: TMX ≈21 frente a 1,6 del informe, por el fondo de comercio; Recordati ≈19 frente a 7,3); es solo un filtro previo, la calidad la da el análisis. Ninguna alta o baja es señal | La rutina del domingo |
| `salidas-bolsa.json` | **Salidas a bolsa y escisiones** (16-oct, pedido del usuario: «lo mismo con calendario IPOs, etc.»): `NODE_USE_ENV_PROXY=1 node herramientas/salidas-bolsa.mjs` junta el calendario de EE. UU. (API de Nasdaq: fijadas, próximas y registradas), las escisiones de EE. UU. (formularios 10-12B de la SEC) y las nuevas cotizaciones de Hong Kong, Japón y Euronext; las que cotizan con ≥ 2.000 M USD pasan el filtro previo de calidad (las que tienen menos de tres años de cuentas quedan como candidatas growth). `cobertura.mjs` las enseña en «Huecos de fuera». Ninguna es señal | La rutina del domingo |
| `calendario.json` | **Calendario de resultados único** (cartera, órdenes, lista de espera y suplentes; fecha, si está confirmada y fuente). Manda sobre la fecha del informe. Lo leen el escáner, el Excel (`seguimiento.mjs`, columna «Próximos resultados») y los análisis (`node herramientas/calendario.mjs --aplicar` escribe la fecha en cada datos*.json, sin rehacer cálculos) | La vigilancia de la mañana: comprueba las fechas que caen en los próximos 14 días y añade las que se anuncian; después `calendario.mjs --aplicar` y `seguimiento.mjs` |
| privada/`escaner/vigilancia-ultima.json`, `escaner/semanal-ultimo.md` | Última vigilancia y último informe semanal | La herramienta |

## Pasos de cada ejecución

1. `git pull --rebase --autostash origin main`.
2. `NODE_USE_ENV_PROXY=1 node herramientas/escaner-diario.mjs` — precio de ahora de todas las analizadas (value y growth), pruebas de robustez a ese precio con el **objetivo fijo** y reglas contra la cartera. Deja tres listas:
   - **Candidatas**: necesitan Vup antes de ser señal.
   - **Observaciones**: tocan banda pero no hay liquidez libre (o el bolsillo growth está lleno), o ya están en una orden decidida. Se apuntan en el registro sin Vup, para medir después si habría acertado.
   - **Activas**: señales emitidas en los últimos 30 días que siguen en pie. No se repiten.
3. **Vup de cada candidata** (abajo) y `decisiones.json` en la carpeta privada (`/mnt/project-files/cartera/real/escaner/decisiones.json`).
4. `NODE_USE_ENV_PROXY=1 node herramientas/escaner-diario.mjs --registrar` (lee el `decisiones.json` privado) — apunta todo, actualiza el seguimiento y escribe `SENALES.md` y `mensaje-ultimo.md`.
5. Commit y push de lo que sea del repo (`escaner/calendario.json`, `escaner/ejecuciones.json`, `verticales/empresa/precios.json`, análisis), con `git pull --rebase` antes. Las salidas privadas no se suben.
6. Publicar el `mensaje-ultimo.md` privado en el proyecto, tal cual (lenguaje llano, una cifra por dato).

## Cuándo una acción es candidata

**Compra (no está en cartera):**
- Value: precio de ahora ≤ **límite robusto** = el menor de los límites de compra del método vigente y de v2 (pasa con los dos), con el objetivo fijo; acción robusta «Comprar» en `robustez.mjs --actual` (la confianza baja y las marcas de CONFIANZA la bajan a Mantener); calidad: ROIC − WACC ≥ 5 puntos (LVMH, excepción) y sostenibilidad «Sí»; no excluida (juego, Accenture, Rightmove, Adobe, comercio minorista, Duolingo, HubSpot). Si solo la frenan resultados publicados después del informe (E1) o un precio que se ha movido más de un 15 % (E3), también es candidata, con **Vup obligatorio**.
- Growth: precio ≤ «compra hasta» del informe, señal robusta «Comprar», rentabilidad de hoy (objetivo fijo) por encima de los listones de v11.
- Calendario: los resultados cercanos no aplazan la compra ni la parten en tramos (regla 11 de `METODO-VIGENTE.md`, 15-oct): se avisa de la fecha y se compra entera; si publicó resultados después del informe, el Vup es obligatorio. Al día siguiente de unos resultados de algo vigilado, la vigilancia de la mañana los revisa y actualiza el análisis.
- Y además: liquidez libre para una posición de al menos 1.000 EUR (5 % de la cartera, tope 7 %), y en growth hueco en el bolsillo (≤ 20 %). Varias candidatas se reparten la liquidez por orden de rentabilidad.

**Venta (está en cartera; nunca Edenred ni el oro):**
- Value: deja de pasar el filtro para mantener al precio de ahora (ponderada ≥ 10 %, base ≥ 5 %, valor intrínseco no más de un 15 % bajo el precio), o ROIC − WACC < 5, o cruza un umbral apuntado (Netflix > 71,88 USD; Uber > ≈72,3 USD).
- Growth: rentabilidad de hoy ≤ −10 % (regla de venta de v11), o tesis rota (en el Vup).

## Vup: actualizar el análisis antes de emitir

Para cada candidata, antes de convertirla en señal:

1. **Lo publicado después del informe.** Mirar (búsqueda web, fuente primaria primero: nota de resultados, presentación, regulador) si desde la fecha de corte (`fecha_corte` en la salida) hay resultados, cambio de guía, profit warning, operación corporativa, cambio de consejero delegado o un hecho que toque la **señal de alarma** del informe (se imprime con la candidata). Nunca poner datos personales del usuario en las consultas.
2. **Revisión con el método vigente.** Si hay resultados o guía nueva que mueven el BPA del ejercicio objetivo (value), estimar el factor (BPA nuevo ÷ BPA del informe; por ejemplo, si la guía baja un 5 %, 0,95) y recalcular: `node herramientas/escaner-diario.mjs --vup <clave> --bpa 0,95`. Dice si la compra robusta sigue en pie y a qué límite (o, en una venta, hasta dónde pasa el filtro de mantener). En growth, si la guía de ventas baja o se cumple la «tesis rota» del informe, se descarta.
3. **Pruebas de robustez.** Ya van en el escaneo (y en `--vup`); repasar las marcas que salen con la candidata.
4. **Decisión.** Emitir solo si la señal se sostiene tras los tres pasos; si no, descartar y decir por qué. Con resultados en menos de 14 días se dice la fecha, pero la compra se propone entera y sin esperar (regla 11). Si el cambio es grande (BPA ±10 % o tesis tocada), además se pide al coordinador una versión nueva del informe.

`decisiones.json` (una entrada por candidata; el ejemplo es ilustrativo):

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
