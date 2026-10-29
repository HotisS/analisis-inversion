# Encargo común: Lennox, análisis completo tras el 3T26 (corte 29-oct-2026)

Empresa: **Lennox International Inc.** · NYSE `LII` · ISIN US5261071071 · divisa USD · ejercicio natural (diciembre, etiqueta «fin») · US GAAP. No está en cartera; el informe del 15-oct la daba como candidata de nivel A.
Carpeta de trabajo: `informes/lennox-2026-10-29/` (repo `/home/user/analisis-inversion`). Notas en `notas/`, documentos en `notas/docs/` (prefijo de tu letra: A_..., B_...). Cuentas XBRL de la SEC ya en `notas/cuentas-xbrl.json` (2016-2025; mandan para los años completos). `notas/bolsa.json` hecho con `bolsa.mjs` (índice SPY, sector XLI).
Fecha de corte: 2026-10-29. Precio del informe: **cierre de Nueva York del 28-oct-2026** (Yahoo: 332,64 USD, mínimo de 52 semanas; la sesión del 29 no ha abierto). D lo confirma y lo deja en `identificacion` con su fuente.
Hecho nuevo (según el escáner, compruébalo en el comunicado y el 10-Q): **resultados del 3T26 publicados el 28-oct-2026**, con la guía de BPA ajustado 2026 recortada a 21,00-21,50 USD (antes 23-24) y la acción cayendo con fuerza. Comprueba qué se publicó, cuándo (antes o después de la apertura), cifras del trimestre, guía nueva (ventas, BPA, flujo de caja), y qué dijo la dirección sobre volúmenes residenciales, el cambio de refrigerante (R-454B), inventario en distribución, precios, aranceles y 2027.
Análisis anterior: `informes/lennox-2026-10-15/` (copias en `notas/previo/`). **Ojo: se hizo sin subagentes, con notas escritas a mano y muchas cifras de resúmenes de terceros (GuruFocus) porque la web de inversores (Akamai) daba 403.** Ahora hay que abrir los originales: 10-K 2025, 10-Q del 1T-3T26 y los 8-K de resultados en EDGAR (`descargar.mjs` lleva el User-Agent de la SEC), y las transcripciones donde se puedan leer.

## Cómo trabajar
- Tu nota `notas/<letra>.json` es una **copia de la del 15-oct**: solo un punto de partida, de baja calidad. Rehaz y **comprueba cada cifra en su fuente original** (regla 0: ninguna cifra de un resumen de buscador ni de un «AI summary»; con WebFetch, pide el texto literal de la tabla). Corrige errores; lo que no se pueda comprobar, a `null` y a `huecos`. Completa lo que faltaba (ejecuta `node herramientas/prompt-de.mjs <tu letra>` para ver la estructura exacta).
- Fuentes: lista propia de tu nota con id consecutivo (fecha AAAA-MM-DD, tipo Primaria/Datos de mercado/Sectorial/Analistas/Prensa/Foros y redes) y cítalas con `[n]`. Quita las que no cites.
- **Guarda la nota tras cada campo que termines** (con Write, JSON válido; compruébalo con `node -e "JSON.parse(require('fs').readFileSync('<ruta>','utf8'))"`). Está en `"_estado": "en curso"`; pon `"terminado"` al acabar.
- En los textos que se imprimen, nada de comillas invertidas ni las palabras «subagente», «integrador» o «borrador».
- Lee antes `verticales/empresa/lecciones.md` y la sección «EE. UU.» de `verticales/empresa/lecciones-paises.md`.
- Descargas: `NODE_USE_ENV_PROXY=1 node herramientas/descargar.mjs --dir informes/lennox-2026-10-29/notas/docs <nombre> <url>`. En la nube, Node sale a internet solo con `NODE_USE_ENV_PROXY=1`. User-Agent genérico, nunca datos personales. `pdftotext` está instalado.
- No crees `propio.mjs`, `supuestos.mjs`, `textos.mjs` ni `resumen.mjs`: lo que haya que cambiar ahí, dilo en tu resumen final.
- Huecos: un campo sin dato tras **tres búsquedas distintas** va a `huecos` con los tres intentos escritos.
- Presupuesto: unos 20-25 minutos y 60-100 llamadas. Trabaja solo dentro del repo y de /tmp.
- Al final, devuelve un resumen de diez líneas: qué hay de nuevo (3T26, guía), por qué cae la acción, qué cifras del análisis anterior estaban mal, qué falta y qué te ha parecido raro.
