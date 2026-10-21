# Encargo común: Netflix, iteración tras los resultados del 3T26 (corte 21-oct-2026)

Empresa: **Netflix, Inc.** · ticker NFLX (Nasdaq) · ISIN US64110L1061 · CIK 1065280 · divisa USD (cuentas y cotización) · ejercicio natural (cierre en diciembre, etiqueta «fin») · US GAAP · desdoblamiento 10 por 1 en noviembre de 2025 (todas las series por acción en acciones de hoy).
Carpeta de trabajo: `informes/netflix-2026-10-21/` (repo `/home/user/analisis-inversion`). Notas en `notas/`, documentos en `notas/docs/`.
Fecha de corte: 2026-10-21. Precio del informe: cierre del 20-oct-2026, **68,69 USD** (antes de los resultados; la reacción de hoy se mide aparte).
Hecho nuevo: **resultados del 3T26 publicados el 20-oct-2026 tras el cierre** (carta a los accionistas, 10-Q, entrevista en vídeo con analistas). Análisis anterior: `informes/netflix-2026-10-11/` (corte 11-oct, precio 70,30).

## Cómo trabajar (iteración tras unos resultados)
- Tu nota `notas/<letra>.json` es una **copia de la del 11-oct**: es el punto de partida. Actualiza todo lo que cambia con el 3T26 y **vuelve a comprobar cada cifra que uses** en su fuente original (regla 0: ninguna cifra de un resumen de buscador ni de un «AI summary»; WebFetch, pide el texto literal de la tabla). Lo que no cambie se queda, pero si ves un error, corrígelo.
- Fuentes nuevas: añádelas al final de la lista `fuentes` de tu nota con id consecutivo (fecha AAAA-MM-DD, tipo Primaria/Datos de mercado/Sectorial/Analistas/Prensa/Foros y redes) y cítalas con `[n]`. Quita las fuentes que ya no cites solo si estás seguro de que nadie las cita en tu nota.
- **Guarda la nota tras cada campo que termines** (con Write, JSON válido; compruébalo con `node -e "JSON.parse(require('fs').readFileSync('<ruta>','utf8'))"`). Pon `"_estado": "en curso"` arriba y `"terminado"` al acabar.
- Lee antes `verticales/empresa/lecciones.md` y la sección «EE. UU.» de `verticales/empresa/lecciones-paises.md`. Ejecuta `node herramientas/prompt-de.mjs <tu letra>` y lee su salida: es tu parte del prompt (formato de cada campo).
- Descargas: `NODE_USE_ENV_PROXY=1 node herramientas/descargar.mjs --dir informes/netflix-2026-10-21/notas/docs <nombre> <url>`. En la nube, Node sale a internet solo con `NODE_USE_ENV_PROXY=1`. EDGAR: `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=1065280&type=10-Q` o `https://efts.sec.gov/LATEST/search-index?q=...`; la carta trimestral está en `ir.netflix.net`.
- Presupuesto: unos 15-20 minutos y 60-80 llamadas. Trabaja solo dentro del repo y de /tmp. Nunca datos personales en consultas ni User-Agent.
- Al final, devuelve un resumen de diez líneas: qué ha cambiado con el 3T26, qué falta y qué te ha parecido raro.
