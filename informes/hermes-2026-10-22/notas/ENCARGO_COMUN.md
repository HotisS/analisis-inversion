# Encargo común: Hermès, análisis completo tras los ingresos del 3T26 (corte 22-oct-2026)

Empresa: **Hermès International SCA** · Euronext París `RMS` (Yahoo `RMS.PA`) · divisa EUR · ejercicio natural (diciembre, etiqueta «fin») · NIIF-UE. **En cartera.**
Carpeta de trabajo: `informes/hermes-2026-10-22/` (repo `/home/user/analisis-inversion`). Notas en `notas/`, documentos en `notas/docs/` (prefijo de tu letra: A_..., B_...). Cuentas XBRL del ESEF (2019-2025) ya en `notas/cuentas-xbrl.json` (mandan para los años completos); `notas/bolsa.json` hecho con `bolsa.mjs` (Yahoo solo llega al cierre del 20-oct, 1.339 EUR; índice CAC 40, sector GLUX.PA).
Fecha de corte: 2026-10-22. Precio del informe: **cierre de París del 21-oct-2026** (anterior a los ingresos): Yahoo aún no lo tiene; D lo saca de Euronext (live.euronext.com) u otra fuente de cierres y lo deja en `identificacion` con su fuente. A las 9:20 de Madrid del 22-oct cotizaba a ≈1.266,5 EUR. La reacción de la sesión del 22-oct la recoge D en `bolsa.contexto` con la hora.
Hecho nuevo: **ingresos de los nueve meses de 2026 publicados el 22-oct a las 08:00 de París, antes de la apertura** (comunicado en finance.hermes.com; conferencia con analistas). Análisis anterior: `informes/hermes-2026-10-11/` (corte 11-oct, con fuentes primarias: URD 2025, semestral 1S26).

## Cómo trabajar
- Tu nota `notas/<letra>.json` es una **copia de la del 11-oct**: solo un punto de partida. Ponla al día con el 3T26 y **vuelve a comprobar cada cifra que cambies** en su fuente original (regla 0: ninguna cifra de un resumen de buscador ni de un «AI summary»; con WebFetch, pide el texto literal de la tabla). Si ves un error, corrígelo.
- Fuentes: añade las nuevas al final de `fuentes` con id consecutivo (fecha AAAA-MM-DD, tipo Primaria/Datos de mercado/Sectorial/Analistas/Prensa/Foros y redes) y cítalas con `[n]`. Quita las que ya no cites.
- **Guarda la nota tras cada campo que termines** (con Write, JSON válido; compruébalo con `node -e "JSON.parse(require('fs').readFileSync('<ruta>','utf8'))"`). Está en `"_estado": "en curso"`; pon `"terminado"` al acabar.
- Lee antes `verticales/empresa/lecciones.md` y las secciones de Francia y «Unión Europea» de `verticales/empresa/lecciones-paises.md`. Ejecuta `node herramientas/prompt-de.mjs <tu letra>` y lee su salida.
- Descargas: `NODE_USE_ENV_PROXY=1 node herramientas/descargar.mjs --dir informes/hermes-2026-10-22/notas/docs <nombre> <url>`. En la nube, Node sale a internet solo con `NODE_USE_ENV_PROXY=1`. User-Agent genérico, nunca datos personales. `pdftotext` está instalado. D: además `herramientas/movimiento.mjs RMS.PA`, el Bund a 10 años del día y el consenso tras los ingresos si ya está.
- No toques `propio.mjs`, `supuestos.mjs`, `textos.mjs` ni `resumen.mjs`: lo que haya que cambiar ahí, dilo en tu resumen final.
- Huecos: un campo sin dato tras **tres búsquedas distintas** va a `huecos` con los tres intentos escritos.
- Presupuesto: unos 15-20 minutos y 60-90 llamadas. Trabaja solo dentro del repo y de /tmp.
- Al final, devuelve un resumen de diez líneas: qué ha cambiado con el 3T26 (ingresos, crecimiento a tipo constante por zona y por oficio, guía), qué falta y qué te ha parecido raro.
