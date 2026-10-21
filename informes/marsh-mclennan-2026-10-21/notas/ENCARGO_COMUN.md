# Encargo común: Marsh, análisis completo tras los resultados del 3T26 (corte 21-oct-2026)

Empresa: **Marsh & McLennan Companies, Inc.** (ahora «Marsh») · NYSE `MRSH` · CIK 62709 · ISIN US5717481023 · divisa USD (cuentas y cotización) · ejercicio natural (diciembre, etiqueta «fin») · US GAAP. Segmentos: Risk & Insurance Services (Marsh, Guy Carpenter) y Consulting (Mercer, Oliver Wyman).
Carpeta de trabajo: `informes/marsh-mclennan-2026-10-21/` (repo `/home/user/analisis-inversion`). Notas en `notas/`, documentos en `notas/docs/`. `notas/cuentas-xbrl.json` (SEC, 10-K) y `notas/bolsa.json` ya hechos con las herramientas.
Fecha de corte: 2026-10-21. Precio del informe: **cierre de la NYSE del 20-oct-2026, 191,26 USD**.
Hecho nuevo: **resultados del 3T26 publicados el 15-oct-2026** (nota de prensa, 10-Q, conferencia con analistas; según el repaso rápido del 16-oct: BPA ajustado 2,03 USD (+10 %), crecimiento subyacente 5 % (seguros 3 %, consultoría 8 %), margen plano — compruébalo en la fuente). Análisis anterior: `informes/marsh-mclennan-2026-10-14/` (corte 14-oct, el día antes de los resultados).

## Cómo trabajar (iteración tras unos resultados)
- Tu nota `notas/<letra>.json` es una **copia de la del 14-oct**: es el punto de partida. Actualiza todo lo que cambia con el 3T26 y **vuelve a comprobar cada cifra que uses** en su fuente original (regla 0: ninguna cifra de un resumen de buscador ni de un «AI summary»; con WebFetch, pide el texto literal de la tabla). Lo que no cambie se queda, pero si ves un error, corrígelo.
- Fuentes nuevas: añádelas al final de la lista `fuentes` de tu nota con id consecutivo (fecha AAAA-MM-DD, tipo Primaria/Datos de mercado/Sectorial/Analistas/Prensa/Foros y redes) y cítalas con `[n]`.
- **Guarda la nota tras cada campo que termines** (con Write, JSON válido; compruébalo con `node -e "JSON.parse(require('fs').readFileSync('<ruta>','utf8'))"`). Pon `"_estado": "en curso"` arriba y `"terminado"` al acabar.
- Lee antes `verticales/empresa/lecciones.md` y la sección «EE. UU.» de `verticales/empresa/lecciones-paises.md`. Ejecuta `node herramientas/prompt-de.mjs <tu letra>` y lee su salida: es tu parte del prompt (formato de cada campo).
- Descargas: `NODE_USE_ENV_PROXY=1 node herramientas/descargar.mjs --dir informes/marsh-mclennan-2026-10-21/notas/docs <nombre> <url>`. En la nube, Node sale a internet solo con `NODE_USE_ENV_PROXY=1`. EDGAR: `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=62709&type=10-Q`; `pdftotext` está instalado.
- Huecos: un campo sin dato tras **tres búsquedas distintas** va a `huecos` con los tres intentos escritos («1) …; 2) …; 3) …»).
- Presupuesto: unos 15-20 minutos y 60-80 llamadas. Trabaja solo dentro del repo y de /tmp. Nunca datos personales en consultas ni User-Agent (usa uno genérico).
- Al final, devuelve un resumen de diez líneas: qué ha cambiado con el 3T26, qué falta y qué te ha parecido raro.
