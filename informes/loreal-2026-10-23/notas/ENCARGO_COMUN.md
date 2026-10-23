# Encargo común: L'Oréal, análisis completo tras las ventas del 3T26 (corte 23-oct-2026)

Empresa: **L'Oréal SA** · Euronext París `OR` (Yahoo `OR.PA`) · divisa EUR · ejercicio natural (diciembre, etiqueta «fin») · NIIF-UE. No está en cartera.
Carpeta de trabajo: `informes/loreal-2026-10-23/` (repo `/home/user/analisis-inversion`). Notas en `notas/`, documentos en `notas/docs/` (prefijo de tu letra: A_..., B_...). Cuentas XBRL del ESEF ya en `notas/cuentas-xbrl.json` (mandan para los años completos); `notas/bolsa.json` hecho con `bolsa.mjs` (Yahoo solo llega al 21-oct; índice CAC 40, sector GLUX.PA).
Fecha de corte: 2026-10-23. Precio del informe: **cierre de París del 22-oct-2026**, anterior a las ventas (Yahoo da 413,00 EUR a las 17:35 de Madrid; D lo confirma con Euronext u otra fuente de cierres y lo deja en `identificacion` con su fuente). La reacción de la sesión del 23-oct la recoge D en `bolsa.contexto` con la hora, si ya hay datos.
Hecho nuevo: **ventas de los nueve meses de 2026 publicadas el 22-oct después del cierre de París** (comunicado en loreal-finance.com; conferencia con analistas).
Análisis anterior: `informes/loreal-2026-10-14/` (corte 14-oct). **Ojo: se hizo sin poder abrir las fuentes primarias, solo con extractos de búsqueda.** Ahora sí hay que abrir los documentos originales: el documento de registro universal 2025, el informe semestral 1S26 y el comunicado del 3T26. Rehaz con ellos todo lo que dependa de cifras.

## Cómo trabajar
- Tu nota `notas/<letra>.json` es una **copia de la del 14-oct**: solo un punto de partida. Ponla al día con el 3T26 y **vuelve a comprobar cada cifra** en su fuente original (regla 0: ninguna cifra de un resumen de buscador ni de un «AI summary»; con WebFetch, pide el texto literal de la tabla). Si ves un error, corrígelo; lo que no se pueda comprobar, a `null` y a `huecos`.
- Fuentes: añade las nuevas al final de `fuentes` con id consecutivo (fecha AAAA-MM-DD, tipo Primaria/Datos de mercado/Sectorial/Analistas/Prensa/Foros y redes) y cítalas con `[n]`. Quita las que ya no cites.
- **Guarda la nota tras cada campo que termines** (con Write, JSON válido; compruébalo con `node -e "JSON.parse(require('fs').readFileSync('<ruta>','utf8'))"`). Está en `"_estado": "en curso"`; pon `"terminado"` al acabar.
- Lee antes `verticales/empresa/lecciones.md` y las secciones de Francia y «Unión Europea» de `verticales/empresa/lecciones-paises.md`. Ejecuta `node herramientas/prompt-de.mjs <tu letra>` y lee su salida.
- Descargas: `NODE_USE_ENV_PROXY=1 node herramientas/descargar.mjs --dir informes/loreal-2026-10-23/notas/docs <nombre> <url>`. En la nube, Node sale a internet solo con `NODE_USE_ENV_PROXY=1`. User-Agent genérico, nunca datos personales. `pdftotext` está instalado. D: además `herramientas/movimiento.mjs OR.PA`, el Bund a 10 años del día y el consenso (y si ya hay revisiones tras las ventas).
- No toques `propio.mjs`, `supuestos.mjs`, `textos.mjs`, `resumen.mjs` ni `construir.mjs`: lo que haya que cambiar ahí, dilo en tu resumen final.
- Huecos: un campo sin dato tras **tres búsquedas distintas** va a `huecos` con los tres intentos escritos.
- Presupuesto: unos 20-25 minutos y 60-100 llamadas. Trabaja solo dentro del repo y de /tmp.
- Al final, devuelve un resumen de diez líneas: qué ha cambiado con el 3T26 (ventas, crecimiento comparable por división y por zona, guía), qué cifras del análisis anterior estaban mal, qué falta y qué te ha parecido raro.
