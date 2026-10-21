# Encargo común: Puig Brands, iteración tras las ventas del 3T26 (corte 21-oct-2026)

Empresa: **Puig Brands, S.A.** (Barcelona) · Bolsas españolas `PUIG` (Yahoo `PUIG.MC`), acciones de clase B · LEI 549300OVHNSX30L1AQ94 · divisa EUR · ejercicio natural (diciembre, etiqueta «fin») · NIIF-UE. Segmentos: Fragancias y Moda, Maquillaje, Cuidado de la piel. Controlada por la familia Puig (Exea). **Fusión en curso con Estée Lauder** (ver la nota del 11-oct y lo publicado desde entonces).
Carpeta de trabajo: `informes/puig-2026-10-21/` (repo `/home/user/analisis-inversion`). Notas en `notas/`, documentos en `notas/docs/`. Cuentas XBRL del ESEF (2023-2025) en `notas/cuentas-xbrl.json`; `notas/bolsa.json` rehecho con `bolsa.mjs` (cierre del 21-oct: 19,59 EUR).
Fecha de corte: 2026-10-21. Precio del informe: **cierre del 21-oct-2026, 19,59 EUR** (antes de las ventas, publicadas tras el cierre).
Hecho nuevo: **ventas de los nueve meses de 2026 publicadas el 21-oct tras el cierre** (comunicado a la CNMV y en puig.com; conferencia a las 18:00). Prensa: ventas del 3T +5,6 %, por encima de lo esperado. Además el Capital Markets Day es el 28-oct. Análisis anterior: `informes/puig-2026-10-11/` (corte 11-oct, precio 18,08).

## Cómo trabajar (iteración tras unos resultados)
- Tu nota `notas/<letra>.json` es una **copia de la del 11-oct**: es el punto de partida. Actualiza todo lo que cambia con el 3T26 y lo que haya pasado desde el 11-oct (en especial la fusión con Estée Lauder: términos, calendario, efecto en el valor para el accionista de Puig), y **vuelve a comprobar cada cifra que uses** en su fuente original (regla 0: ninguna cifra de un resumen de buscador ni de un «AI summary»; con WebFetch, pide el texto literal de la tabla). Lo que no cambie se queda; si ves un error, corrígelo.
- Fuentes nuevas: añádelas al final de la lista `fuentes` de tu nota con id consecutivo (fecha AAAA-MM-DD, tipo Primaria/Datos de mercado/Sectorial/Analistas/Prensa/Foros y redes) y cítalas con `[n]`.
- **Guarda la nota tras cada campo que termines** (con Write, JSON válido; compruébalo con `node -e "JSON.parse(require('fs').readFileSync('<ruta>','utf8'))"`). Pon `"_estado": "en curso"` arriba y `"terminado"` al acabar.
- Lee antes `verticales/empresa/lecciones.md` y la sección «España» de `verticales/empresa/lecciones-paises.md`. Ejecuta `node herramientas/prompt-de.mjs <tu letra>` y lee su salida: es tu parte del prompt.
- Descargas: `NODE_USE_ENV_PROXY=1 node herramientas/descargar.mjs --dir informes/puig-2026-10-21/notas/docs <nombre> <url>`. En la nube, Node sale a internet solo con `NODE_USE_ENV_PROXY=1`. User-Agent genérico, nunca datos personales. D: consenso antes de las ventas y la reacción, si la hay, en Estée Lauder (EL) tras el cierre.
- Huecos: un campo sin dato tras **tres búsquedas distintas** va a `huecos` con los tres intentos escritos.
- Presupuesto: unos 15-20 minutos y 60-80 llamadas. Trabaja solo dentro del repo y de /tmp.
- Al final, devuelve un resumen de diez líneas: qué ha cambiado con el 3T26, qué falta y qué te ha parecido raro.
