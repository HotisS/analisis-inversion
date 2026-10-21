# Encargo común: Interparfums SA, iteración tras las ventas del 3T26 (corte 21-oct-2026)

Empresa: **Interparfums SA** (París) · Euronext París `ITP` (Yahoo `ITP.PA`) · divisa EUR · ejercicio natural (diciembre, etiqueta «fin») · NIIF-UE. Filial cotizada (≈74 %) de Inter Parfums Inc. (Nasdaq IPAR); no confundir con la matriz. Perfumes con licencias (Jimmy Choo, Coach, Montblanc, Lacoste, Moncler, Kate Spade…) y marcas propias (Lanvin, Rochas, Annick Goutal).
Carpeta de trabajo: `informes/interparfums-sa-2026-10-21/` (repo `/home/user/analisis-inversion`). Notas en `notas/`, documentos en `notas/docs/`. Cuentas XBRL del ESEF (2020-2025) en `notas/cuentas-xbrl.json` (mandan para los años completos); `notas/bolsa.json` hecho con `bolsa.mjs` (cierre del 21-oct: 34,82 EUR; índice CAC 40, sector EXH7.DE).
Fecha de corte: 2026-10-21. Precio del informe: **cierre de París del 21-oct-2026, 34,82 EUR** (ya recoge las ventas).
Hecho nuevo: **ventas de los nueve meses de 2026, publicadas el 20-oct por la tarde** (prensa: 3T +4,8 %, «vise le haut de son objectif annuel»); la acción subió ≈7 % el 21-oct. Análisis anterior: `informes/interparfums-sa-2026-10-15/` (corte 15-oct, precio 32,08; hecho con fuentes primarias: URD 2025, comunicados de la AMF/DILA, BDIF).

## Cómo trabajar
- Tu nota `notas/<letra>.json` es la del 15-oct: **ponla al día** con lo publicado desde entonces (comunicado de ventas del 3T26 y su guía, cambios de licencias, recomendaciones de analistas, precio y foros). No rehagas lo que no ha cambiado, pero corrige cualquier error que veas.
- Regla 0: ninguna cifra de un resumen de buscador ni de un «AI summary»; con WebFetch, pide el texto literal. El comunicado está en la web de inversores (puede dar 403), en el archivo AMF/DILA (info-financiere.fr) o en Actusnews/Business Wire.
- Fuentes: añade las nuevas al final de `fuentes` con id consecutivo (fecha AAAA-MM-DD, tipo Primaria/Datos de mercado/Sectorial/Analistas/Prensa/Foros y redes) y cítalas con `[n]`.
- **Guarda la nota tras cada campo que termines** (Write, JSON válido; compruébalo con `node -e "JSON.parse(require('fs').readFileSync('<ruta>','utf8'))"`). Pon `"_estado": "en curso"` arriba y `"terminado"` al acabar.
- Lee antes `verticales/empresa/lecciones.md` y la sección «Unión Europea» (y Francia si existe) de `verticales/empresa/lecciones-paises.md`. Ejecuta `node herramientas/prompt-de.mjs <tu letra>` y lee su salida.
- Descargas: `NODE_USE_ENV_PROXY=1 node herramientas/descargar.mjs --dir informes/interparfums-sa-2026-10-21/notas/docs <nombre> <url>`. En la nube, Node sale a internet solo con `NODE_USE_ENV_PROXY=1`. User-Agent genérico, nunca datos personales. `pdftotext` está instalado. D: además `herramientas/movimiento.mjs ITP.PA`, consenso y comparables al 21-oct (precios del 21-oct), Bund del 21-oct.
- No toques `propio.mjs`, `supuestos.mjs` ni `textos.mjs`: si algo de ellos debe cambiar, dilo en tu resumen.
- Huecos: un campo sin dato tras **tres búsquedas distintas** va a `huecos` con los tres intentos escritos.
- Presupuesto: unos 15 minutos y 40-70 llamadas. Trabaja solo dentro del repo y de /tmp.
- Al final, devuelve un resumen de diez líneas: qué ha cambiado con el 3T26, qué falta y qué te ha parecido raro.
