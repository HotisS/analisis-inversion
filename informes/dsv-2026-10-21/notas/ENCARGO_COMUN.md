# Encargo común: DSV, iteración tras los resultados del 3T26 (corte 21-oct-2026)

Empresa: **DSV A/S** · Nasdaq Copenhagen `DSV` (Yahoo `DSV.CO`) · ISIN DK0060079531 · LEI 529900X41C0BSLK67H70 · divisa DKK (cuentas y cotización) · ejercicio natural (diciembre, etiqueta «fin») · NIIF-UE. Comprador en serie (DB Schenker consolidada desde el 30-abr-2025).
Carpeta de trabajo: `informes/dsv-2026-10-21/` (repo `/home/user/analisis-inversion`). Notas en `notas/`, documentos en `notas/docs/`.
Fecha de corte: 2026-10-21. Precio del informe: cierre del 20-oct-2026 (Yahoo aún no lo tiene: el subagente D lo saca de Nasdaq Copenhagen u otra fuente; si no, el del 19-oct, 1.211,5 DKK). Hoy, tras los resultados, cotiza en torno a 1.279 DKK (+5-6 %).
Hecho nuevo: **informe intermedio del 3T26 publicado el 21-oct-2026 por la mañana** (anuncio de compañía en MFN/inderes/ritzau e investor.dsv.com, presentación y conferencia a las 11:00 CEST). Análisis anterior: `informes/dsv-2026-10-19/` (corte 19-oct, sin el 3T26).

## Cómo trabajar (iteración tras unos resultados)
- Tu nota `notas/<letra>.json` es una **copia de la del 19-oct**: es el punto de partida. Actualiza todo lo que cambia con el 3T26 y **vuelve a comprobar cada cifra que uses** en su fuente original (regla 0: ninguna cifra de un resumen de buscador ni de un «AI summary»; con WebFetch, pide el texto literal de la tabla). Lo que no cambie se queda, pero si ves un error, corrígelo.
- Fuentes nuevas: añádelas al final de la lista `fuentes` de tu nota con id consecutivo (fecha AAAA-MM-DD, tipo Primaria/Datos de mercado/Sectorial/Analistas/Prensa/Foros y redes) y cítalas con `[n]`.
- **Guarda la nota tras cada campo que termines** (con Write, JSON válido; compruébalo con `node -e "JSON.parse(require('fs').readFileSync('<ruta>','utf8'))"`). Pon `"_estado": "en curso"` arriba y `"terminado"` al acabar.
- Lee antes `verticales/empresa/lecciones.md` y las secciones «Unión Europea» y «Nórdicos» de `verticales/empresa/lecciones-paises.md` (y `grep -n -i "comprador" verticales/empresa/lecciones-casos.md`). Ejecuta `node herramientas/prompt-de.mjs <tu letra>` y lee su salida: es tu parte del prompt (formato de cada campo).
- Descargas: `NODE_USE_ENV_PROXY=1 node herramientas/descargar.mjs --dir informes/dsv-2026-10-21/notas/docs <nombre> <url>`. En la nube, Node sale a internet solo con `NODE_USE_ENV_PROXY=1`. El informe del 3T26 suele estar en MFN (`mfn.se/one/a/dsv/...`), en `via.ritzau.dk` y en investor.dsv.com.
- Presupuesto: unos 15-20 minutos y 60-80 llamadas. Trabaja solo dentro del repo y de /tmp. Nunca datos personales en consultas ni User-Agent.
- Al final, devuelve un resumen de diez líneas: qué ha cambiado con el 3T26, qué falta y qué te ha parecido raro.
