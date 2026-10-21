# Encargo común: Moody's, análisis completo tras los resultados del 3T26 (corte 21-oct-2026)

Empresa: **Moody's Corporation** · NYSE `MCO` · ISIN US6153691059 · CIK 0001059556 · divisa USD (cuentas y cotización) · ejercicio natural (diciembre, etiqueta «fin») · US GAAP. Segmentos: Moody's Investors Service (MIS, calificaciones) y Moody's Analytics (MA, datos y software). BPA ajustado de la empresa como base del objetivo a 12 meses (con su historia en la misma base).
Carpeta de trabajo: `informes/moodys-2026-10-21/` (repo `/home/user/analisis-inversion`). Notas en `notas/`, documentos en `notas/docs/`. Cuentas XBRL de los 10-K (2016-2025) ya descargadas por `cuentas.mjs` en `notas/cuentas-xbrl.json` (mandan para los años completos). `notas/bolsa.json` ya hecho con `bolsa.mjs` (cierre del 20-oct: 475,35 USD; índice ^GSPC, sector IYF).
Fecha de corte: 2026-10-21. Precio del informe: **cierre del 20-oct-2026, 475,35 USD** (antes de los resultados; la reacción de hoy se mide aparte, con hora).
Hecho nuevo: **resultados del 3T26 publicados el 21-oct-2026 antes de la apertura** (8-K de las 6:58 ET con el comunicado y la guía de 2026; conferencia a las 11:30 ET). Análisis anterior: `informes/moodys-2026-10-14/` (corte 14-oct, precio 464,23). `notas/previo/datos-anterior.json` es su versión v2.

**Importante: aquel análisis se hizo solo con extractos de búsqueda, con confianza baja** (balance, gobierno, consenso, beta). Esta vez la red funciona: **rehaz tu nota con fuentes primarias** (8-K, 10-Q, 10-K y proxy en EDGAR; investors.moodys.com) y sustituye toda cifra que viniera de un extracto de buscador.

## Cómo trabajar
- Tu nota `notas/<letra>.json` es una **copia de la del 14-oct**: solo un punto de partida. **Vuelve a comprobar cada cifra que uses** en su fuente original (regla 0: ninguna cifra de un resumen de buscador ni de un «AI summary»; con WebFetch, pide el texto literal de la tabla). Si ves un error, corrígelo.
- Fuentes: añade las nuevas al final de `fuentes` con id consecutivo (fecha AAAA-MM-DD, tipo Primaria/Datos de mercado/Sectorial/Analistas/Prensa/Foros y redes) y cítalas con `[n]`. Quita las de extractos que ya no cites.
- **Guarda la nota tras cada campo que termines** (con Write, JSON válido; compruébalo con `node -e "JSON.parse(require('fs').readFileSync('<ruta>','utf8'))"`). Pon `"_estado": "en curso"` arriba y `"terminado"` al acabar.
- Lee antes `verticales/empresa/lecciones.md` y la sección «EE. UU.» de `verticales/empresa/lecciones-paises.md`. Ejecuta `node herramientas/prompt-de.mjs <tu letra>` y lee su salida: es tu parte del prompt.
- Descargas: `NODE_USE_ENV_PROXY=1 node herramientas/descargar.mjs --dir informes/moodys-2026-10-21/notas/docs <nombre> <url>`. En la nube, Node sale a internet solo con `NODE_USE_ENV_PROXY=1`. EDGAR: `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001059556&type=8-K` (User-Agent genérico, nunca datos personales). Directivos: `node herramientas/form4.mjs --ticker MCO`. D: además `herramientas/movimiento.mjs MCO`.
- Huecos: un campo sin dato tras **tres búsquedas distintas** va a `huecos` con los tres intentos escritos.
- Presupuesto: unos 20 minutos y 60-90 llamadas. Trabaja solo dentro del repo y de /tmp.
- Al final, devuelve un resumen de diez líneas: qué ha cambiado con el 3T26, qué falta y qué te ha parecido raro.
