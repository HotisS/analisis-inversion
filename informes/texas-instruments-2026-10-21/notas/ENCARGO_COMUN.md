# Encargo común: Texas Instruments Incorporated, iteración tras resultados (corte 21-oct-2026)

Empresa: **Texas Instruments Incorporated** · Nasdaq/NYSE `TXN` · divisa USD · US GAAP · ejercicio natural (diciembre, etiqueta «fin»). Semiconductores analógicos y procesadores integrados.
Carpeta de trabajo: `informes/texas-instruments-2026-10-21/` (repo `/home/user/analisis-inversion`). Notas en `notas/`, documentos en `notas/docs/`. Cuentas XBRL de EDGAR (10-K) en `notas/cuentas-xbrl.json` (mandan para los años completos); `notas/bolsa.json` hecho con `bolsa.mjs`.
Fecha de corte: 2026-10-21. Precio del informe: **cierre del 21-oct-2026, 284.65 USD** (antes de los resultados, publicados tras el cierre).
Hecho nuevo: **resultados del 3T26 publicados el 21-oct hacia las 22:00 de Madrid, con la guía del 4T** (comunicado y 8-K en EDGAR). Análisis anterior: `informes/texas-instruments-2026-10-14/`.

**Importante: aquel análisis se hizo solo con extractos de búsqueda (confianza baja).** Esta vez la red funciona: **rehaz tu nota entera con fuentes primarias** (10-K, 10-Q, 8-K de EDGAR, web de inversores) y sustituye toda cifra que viniera de un extracto. Tu nota del 14-oct es solo un punto de partida.

## Cómo trabajar
- Regla 0: ninguna cifra de un resumen de buscador ni de un «AI summary»; con WebFetch pide el texto literal de las tablas. Fuente primaria: el 8-K (anexo 99.1) en EDGAR (curl con User-Agent genérico, nunca datos personales) y la web de inversores.
- Fuentes: añade las nuevas al final de `fuentes` con id consecutivo (fecha AAAA-MM-DD, tipo Primaria/Datos de mercado/Sectorial/Analistas/Prensa/Foros y redes) y cítalas con `[n]`. Quita las de extractos que ya no cites.
- **Guarda la nota tras cada campo que termines** (Write, JSON válido; compruébalo con `node -e "JSON.parse(require('fs').readFileSync('<ruta>','utf8'))"`). Pon `"_estado": "en curso"` arriba y `"terminado"` al acabar.
- Lee antes `verticales/empresa/lecciones.md` y la sección «Estados Unidos» de `verticales/empresa/lecciones-paises.md`. Ejecuta `node herramientas/prompt-de.mjs <tu letra>` y lee su salida.
- Descargas: `NODE_USE_ENV_PROXY=1 node herramientas/descargar.mjs --dir informes/texas-instruments-2026-10-21/notas/docs <nombre> <url>`. En la nube, Node sale a internet solo con `NODE_USE_ENV_PROXY=1`. `pdftotext` está instalado. D: además `herramientas/movimiento.mjs TXN`, consenso a 21-oct, comparables con precios del 20-21-oct, tipo del Tesoro a 10 años del 21-oct y `bolsa.contexto` con veredicto (reacción fuera de hora si la hay).
- No toques `propio.mjs`, `supuestos.mjs` ni `textos.mjs`: si algo de ellos debe cambiar (puente, acciones, guía), dilo en tu resumen con la cifra y la fuente.
- Huecos: un campo sin dato tras **tres búsquedas distintas** va a `huecos` con los tres intentos escritos.
- Presupuesto: unos 15 minutos y 40-70 llamadas. Trabaja solo dentro del repo y de /tmp.
- Al final, devuelve un resumen de diez líneas: qué ha cambiado con los resultados, qué falta y qué te ha parecido raro.
