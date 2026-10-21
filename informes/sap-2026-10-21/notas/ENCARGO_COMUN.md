# Encargo común: SAP SE, iteración tras los resultados del 3T26 (corte 21-oct-2026)

Empresa: **SAP SE** (Walldorf) · Xetra `SAP` (Yahoo `SAP.DE`), ADR en NYSE `SAP` · ISIN DE0007164600 · EDGAR CIK 1000184 (20-F y 6-K) · divisa EUR · ejercicio natural (diciembre, etiqueta «fin») · NIIF · cuenta por función. **Está en la cartera del usuario: prioridad máxima y rigor máximo.**
Carpeta de trabajo: `informes/sap-2026-10-21/` (repo `/home/user/analisis-inversion`). Notas en `notas/`, documentos en `notas/docs/`. Cuentas XBRL del 20-F (hasta 2025) en `notas/cuentas-xbrl.json` (mandan para los años completos); `notas/bolsa.json` hecho con `bolsa.mjs` (cierre del 21-oct: 208,65 EUR; índice DAX, sector EXV3.DE).
Fecha de corte: 2026-10-21. Precio del informe: **cierre de Xetra del 21-oct-2026, 208,65 EUR** (antes de los resultados, publicados tras el cierre).
Hecho nuevo: **resultados del 3T26 publicados el 21-oct hacia las 22:00 de Madrid** («Quarterly Statement Q3 2026», sap.com/investors y 6-K en EDGAR; prensa: «Q3 cloud growth propels revenue beyond expectations»). Análisis anterior: `informes/sap-2026-10-11/` (corte 11-oct, precio del 9-oct; fuentes primarias), con revisiones a 12 meses del 13 y 14-oct.

## Cómo trabajar
- Tu nota `notas/<letra>.json` es la del 11-oct: **ponla al día** con todo lo publicado desde entonces, sobre todo el 3T26 (ingresos, nube, «current cloud backlog», margen operativo no NIIF, flujo libre, guía de 2026 y de 2027-2028 si la hay, recompras, despidos o reestructuración) y la reacción del ADR tras el cierre si existe. Corrige cualquier error que veas.
- Regla 0: ninguna cifra de un resumen de buscador ni de un «AI summary»; con WebFetch pide el texto literal de las tablas. Fuente primaria: el comunicado y sus tablas en sap.com y el 6-K de EDGAR (curl con User-Agent genérico a sec.gov).
- Fuentes: añade las nuevas al final de `fuentes` con id consecutivo (fecha AAAA-MM-DD, tipo Primaria/Datos de mercado/Sectorial/Analistas/Prensa/Foros y redes) y cítalas con `[n]`.
- **Guarda la nota tras cada campo que termines** (Write, JSON válido; compruébalo con `node -e "JSON.parse(require('fs').readFileSync('<ruta>','utf8'))"`). Pon `"_estado": "en curso"` arriba y `"terminado"` al acabar.
- Lee antes `verticales/empresa/lecciones.md` y las secciones «Unión Europea» y «Alemania» (si existe) de `verticales/empresa/lecciones-paises.md`. Ejecuta `node herramientas/prompt-de.mjs <tu letra>` y lee su salida.
- Descargas: `NODE_USE_ENV_PROXY=1 node herramientas/descargar.mjs --dir informes/sap-2026-10-21/notas/docs <nombre> <url>`. En la nube, Node sale a internet solo con `NODE_USE_ENV_PROXY=1`. User-Agent genérico, nunca datos personales. `pdftotext` está instalado. D: además `herramientas/movimiento.mjs SAP.DE`, consenso a 21-oct (antes y, si ya hay, después de los resultados), comparables con precios del 21-oct, Bund del 21-oct (Bundesbank) y `bolsa.contexto` con veredicto.
- No toques `propio.mjs`, `supuestos.mjs` ni `textos*.mjs`: si algo de ellos debe cambiar (puente, acciones, guía), dilo en tu resumen con la cifra y la fuente.
- Huecos: un campo sin dato tras **tres búsquedas distintas** va a `huecos` con los tres intentos escritos.
- Presupuesto: unos 15 minutos y 40-70 llamadas. Trabaja solo dentro del repo y de /tmp.
- Al final, devuelve un resumen de diez líneas: qué ha cambiado con el 3T26, qué falta y qué te ha parecido raro.
