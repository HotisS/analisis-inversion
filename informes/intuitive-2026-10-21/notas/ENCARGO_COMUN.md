# Encargo común: Intuitive Surgical, iteración tras los resultados del 3T26 (corte 21-oct-2026)

Empresa: **Intuitive Surgical, Inc.** · ticker ISRG (Nasdaq) · ISIN US46120E6023 · CIK 1035267 · divisa USD (cuentas y cotización) · ejercicio natural (diciembre, etiqueta «fin») · US GAAP. Sin dividendo.
Carpeta de trabajo: `informes/intuitive-2026-10-21/` (repo `/home/user/analisis-inversion`). Notas en `notas/`, documentos en `notas/docs/`.
Fecha de corte: 2026-10-21. Precio del informe: **cierre del 20-oct-2026, 438,00 USD** (antes de los resultados; la reacción de hoy se mide aparte).
Hecho nuevo: **resultados del 3T26 publicados el 20-oct-2026 tras el cierre** (8-K del 20-oct en EDGAR con la nota de prensa; conferencia con analistas; 10-Q cuando salga). Análisis anterior: `informes/intuitive-2026-10-06/` (corte 6-oct, precio 404,76; su última versión de datos es `datos-v5.json`, copiada en `notas/previo/`).

## Cómo trabajar (iteración tras unos resultados)
- Tu nota `notas/<letra>.json` es una **copia de la del 6-oct**: es el punto de partida. Actualiza todo lo que cambia con el 3T26 y **vuelve a comprobar cada cifra que uses** en su fuente original (regla 0: ninguna cifra de un resumen de buscador ni de un «AI summary»; con WebFetch, pide el texto literal de la tabla). Lo que no cambie se queda, pero si ves un error, corrígelo.
- Fuentes nuevas: añádelas al final de la lista `fuentes` de tu nota con id consecutivo (fecha AAAA-MM-DD, tipo Primaria/Datos de mercado/Sectorial/Analistas/Prensa/Foros y redes) y cítalas con `[n]`.
- **Guarda la nota tras cada campo que termines** (con Write, JSON válido; compruébalo con `node -e "JSON.parse(require('fs').readFileSync('<ruta>','utf8'))"`). Pon `"_estado": "en curso"` arriba y `"terminado"` al acabar.
- Lee antes `verticales/empresa/lecciones.md` y la sección «EE. UU.» de `verticales/empresa/lecciones-paises.md`. Ejecuta `node herramientas/prompt-de.mjs <tu letra>` y lee su salida: es tu parte del prompt (formato de cada campo).
- Descargas: `NODE_USE_ENV_PROXY=1 node herramientas/descargar.mjs --dir informes/intuitive-2026-10-21/notas/docs <nombre> <url>`. En la nube, Node sale a internet solo con `NODE_USE_ENV_PROXY=1`. EDGAR: `https://data.sec.gov/submissions/CIK0001035267.json` lista los documentos (8-K del 2026-10-20); la nota de prensa es el anexo 99.1.
- Presupuesto: unos 15-20 minutos y 60-80 llamadas. Trabaja solo dentro del repo y de /tmp. Nunca datos personales en consultas ni User-Agent (usa un User-Agent genérico).
- Al final, devuelve un resumen de diez líneas: qué ha cambiado con el 3T26, qué falta y qué te ha parecido raro.
