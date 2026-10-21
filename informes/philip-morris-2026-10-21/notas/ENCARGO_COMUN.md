# Encargo común: Philip Morris International, iteración tras los resultados del 3T26 (corte 21-oct-2026)

Empresa: **Philip Morris International Inc.** · NYSE `PM` · ISIN US7181721090 · CIK 0001413329 · divisa USD (cuentas y cotización) · ejercicio natural (diciembre, etiqueta «fin») · US GAAP. BPA ajustado (sin amortización de intangibles de Swedish Match, reestructuración, deterioros, etc.) como base, igual que el análisis anterior.
Carpeta de trabajo: `informes/philip-morris-2026-10-21/` (repo `/home/user/analisis-inversion`). Notas en `notas/`, documentos en `notas/docs/`. `notas/bolsa.json` ya rehecho con `bolsa.mjs` (cierre del 20-oct: 199,90 USD).
Fecha de corte: 2026-10-21. Precio del informe: **cierre del 20-oct-2026, 199,90 USD** (antes de los resultados; la reacción de hoy se mide aparte).
Hecho nuevo: **resultados del 3T26 publicados el 21-oct-2026 antes de la apertura** (8-K de las 7:04 ET con el comunicado y las tablas; webcast a las 9:00 ET; guía de 2026 actualizada). Análisis anterior: `informes/philip-morris-2026-10-20/` (corte 20-oct, precio 201,05). Su diario explica las decisiones (BPA ajustado, RBH, patrimonio negativo, minoritarios a mercado).

## Cómo trabajar (iteración tras unos resultados)
- Tu nota `notas/<letra>.json` es una **copia de la del 20-oct**: es el punto de partida. Actualiza todo lo que cambia con el 3T26 (y la guía) y **vuelve a comprobar cada cifra que uses** en su fuente original (regla 0: ninguna cifra de un resumen de buscador ni de un «AI summary»; con WebFetch, pide el texto literal de la tabla). Lo que no cambie se queda, pero si ves un error, corrígelo.
- Fuentes nuevas: añádelas al final de la lista `fuentes` de tu nota con id consecutivo (fecha AAAA-MM-DD, tipo Primaria/Datos de mercado/Sectorial/Analistas/Prensa/Foros y redes) y cítalas con `[n]`.
- **Guarda la nota tras cada campo que termines** (con Write, JSON válido; compruébalo con `node -e "JSON.parse(require('fs').readFileSync('<ruta>','utf8'))"`). Pon `"_estado": "en curso"` arriba y `"terminado"` al acabar.
- Lee antes `verticales/empresa/lecciones.md` y la sección «EE. UU.» de `verticales/empresa/lecciones-paises.md`. Ejecuta `node herramientas/prompt-de.mjs <tu letra>` y lee su salida: es tu parte del prompt (formato de cada campo).
- Descargas: `NODE_USE_ENV_PROXY=1 node herramientas/descargar.mjs --dir informes/philip-morris-2026-10-21/notas/docs <nombre> <url>`. En la nube, Node sale a internet solo con `NODE_USE_ENV_PROXY=1`. EDGAR: `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001413329&type=8-K` (User-Agent genérico, nunca datos personales). D: el consenso de antes de los resultados y su revisión tras ellos si ya hay datos; la reacción del precio de hoy (premercado o sesión) con hora.
- Huecos: un campo sin dato tras **tres búsquedas distintas** va a `huecos` con los tres intentos escritos.
- Presupuesto: unos 15-20 minutos y 60-80 llamadas. Trabaja solo dentro del repo y de /tmp.
- Al final, devuelve un resumen de diez líneas: qué ha cambiado con el 3T26, qué falta y qué te ha parecido raro.
