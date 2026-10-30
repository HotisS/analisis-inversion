# Encargo común: A. O. Smith, análisis completo (corte 30-oct-2026)

Empresa: **A. O. Smith Corporation** · NYSE `AOS` · ISIN US8318652091 · divisa USD · ejercicio natural (diciembre, etiqueta «fin») · US GAAP. No está en cartera; candidata de compra (el escáner la ve a ≈13 % de su límite).
Carpeta de trabajo: `informes/ao-smith-2026-10-30/` (repo `/home/user/analisis-inversion`). Notas en `notas/`, documentos en `notas/docs/` (prefijo de tu letra: A_..., B_...). Cuentas XBRL de la SEC ya en `notas/cuentas-xbrl.json` (mandan para los años completos). `notas/bolsa.json` hecho con `bolsa.mjs` (índice SPY, sector XLI).
Fecha de corte: 2026-10-30. Precio del informe: **cierre de Nueva York del 29-oct-2026** (Yahoo: 63,49 USD; +12,6 % en un mes). D lo confirma y lo deja en `identificacion` con su fuente.
Hechos nuevos (según el escáner, compruébalos en los 8-K y el 10-Q): **venta del 81 % del negocio en China** (cierre previsto en el 1S27: comprador, precio, qué se queda la empresa, uso del dinero, efecto en ventas, BPA y guía; si China pasa a actividades interrumpidas) y los **resultados del 3T26** (fecha, cifras, guía 2026). Explica también la subida del último mes.
Análisis anterior: `informes/ao-smith-2026-10-09/` (copias en `notas/previo/`). No tenía nota de sentimiento. Sirve como punto de partida, pero hay que volver a comprobar las cifras en el 10-K 2025, los 10-Q de 2026 y los 8-K de EDGAR (`descargar.mjs` lleva el User-Agent de la SEC).

## Cómo trabajar
- Tu nota `notas/<letra>.json` es una **copia de la del 9-oct** (E está vacía): solo un punto de partida. Comprueba cada cifra en su fuente original (regla 0: ninguna cifra de un resumen de buscador ni de un «AI summary»). Corrige errores; lo que no se pueda comprobar, a `null` y a `huecos`. Completa lo que falte (ejecuta `node herramientas/prompt-de.mjs <tu letra>` para ver la estructura exacta).
- **El perímetro importa**: si la venta de China cambia la empresa que queda, deja claras las cifras con y sin China (en el texto, las notas y, A, en `cambios_perimetro`).
- Fuentes: lista propia de tu nota con id consecutivo (fecha AAAA-MM-DD, tipo Primaria/Datos de mercado/Sectorial/Analistas/Prensa/Foros y redes) y cítalas con `[n]`. Quita las que no cites.
- **Guarda la nota tras cada campo que termines** (con Write, JSON válido; compruébalo con `node -e "JSON.parse(require('fs').readFileSync('<ruta>','utf8'))"`). Está en `"_estado": "en curso"`; pon `"terminado"` al acabar.
- En los textos que se imprimen, nada de comillas invertidas ni las palabras «subagente», «integrador» o «borrador».
- Lee antes `verticales/empresa/lecciones.md` y la sección «EE. UU.» de `verticales/empresa/lecciones-paises.md`.
- Descargas: `NODE_USE_ENV_PROXY=1 node herramientas/descargar.mjs --dir informes/ao-smith-2026-10-30/notas/docs <nombre> <url>`. En la nube, Node sale a internet solo con `NODE_USE_ENV_PROXY=1`. User-Agent genérico, nunca datos personales. `pdftotext` está instalado.
- No crees `propio.mjs`, `supuestos.mjs`, `textos.mjs` ni `resumen.mjs`: lo que haya que cambiar ahí, dilo en tu resumen final.
- Huecos: un campo sin dato tras **tres búsquedas distintas** va a `huecos` con los tres intentos escritos.
- Presupuesto: unos 20-25 minutos y 60-100 llamadas. Trabaja solo dentro del repo y de /tmp.
- Al final, devuelve un resumen de diez líneas: qué hay de nuevo (venta de China, 3T26, guía), por qué se mueve la acción, qué cifras del análisis anterior estaban mal, qué falta y qué te ha parecido raro.
