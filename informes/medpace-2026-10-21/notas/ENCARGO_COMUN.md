# Encargo común: Medpace Holdings, Inc., iteración tras resultados (corte 21-oct-2026)

Empresa: **Medpace Holdings, Inc.** · Nasdaq/NYSE `MEDP` · divisa USD · US GAAP · ejercicio natural (diciembre, etiqueta «fin»). Investigación clínica por encargo (CRO) para biotecnológicas pequeñas y medianas.
Carpeta de trabajo: `informes/medpace-2026-10-21/` (repo `/home/user/analisis-inversion`). Notas en `notas/`, documentos en `notas/docs/`. Cuentas XBRL de EDGAR (10-K) en `notas/cuentas-xbrl.json` (mandan para los años completos); `notas/bolsa.json` hecho con `bolsa.mjs`.
Fecha de corte: 2026-10-21. Precio del informe: **cierre del 21-oct-2026, 662.48 USD** (antes de los resultados, publicados tras el cierre).
Hecho nuevo: **resultados del 3T26 publicados el 21-oct hacia las 22:15 de Madrid, con la guía de 2026** (comunicado y 8-K en EDGAR). Análisis anterior: `informes/medpace-2026-10-12/`.

Tu nota es la del 12-oct (fuentes primarias): **ponla al día** con lo publicado desde entonces y corrige cualquier error que veas.

## Cómo trabajar
- Regla 0: ninguna cifra de un resumen de buscador ni de un «AI summary»; con WebFetch pide el texto literal de las tablas. Fuente primaria: el 8-K (anexo 99.1) en EDGAR (curl con User-Agent genérico, nunca datos personales) y la web de inversores.
- Fuentes: añade las nuevas al final de `fuentes` con id consecutivo (fecha AAAA-MM-DD, tipo Primaria/Datos de mercado/Sectorial/Analistas/Prensa/Foros y redes) y cítalas con `[n]`. Quita las de extractos que ya no cites.
- **Guarda la nota tras cada campo que termines** (Write, JSON válido; compruébalo con `node -e "JSON.parse(require('fs').readFileSync('<ruta>','utf8'))"`). Pon `"_estado": "en curso"` arriba y `"terminado"` al acabar.
- Lee antes `verticales/empresa/lecciones.md` y la sección «Estados Unidos» de `verticales/empresa/lecciones-paises.md`. Ejecuta `node herramientas/prompt-de.mjs <tu letra>` y lee su salida.
- Descargas: `NODE_USE_ENV_PROXY=1 node herramientas/descargar.mjs --dir informes/medpace-2026-10-21/notas/docs <nombre> <url>`. En la nube, Node sale a internet solo con `NODE_USE_ENV_PROXY=1`. `pdftotext` está instalado. D: además `herramientas/movimiento.mjs MEDP`, consenso a 21-oct, comparables con precios del 20-21-oct, tipo del Tesoro a 10 años del 21-oct y `bolsa.contexto` con veredicto (reacción fuera de hora si la hay).
- No toques `propio.mjs`, `supuestos.mjs` ni `textos.mjs`: si algo de ellos debe cambiar (puente, acciones, guía), dilo en tu resumen con la cifra y la fuente.
- Huecos: un campo sin dato tras **tres búsquedas distintas** va a `huecos` con los tres intentos escritos.
- Presupuesto: unos 15 minutos y 40-70 llamadas. Trabaja solo dentro del repo y de /tmp.
- Al final, devuelve un resumen de diez líneas: qué ha cambiado con los resultados, qué falta y qué te ha parecido raro.
