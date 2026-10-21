# Encargo común: Moncler, análisis completo tras las ventas del 3T26 (corte 21-oct-2026)

Empresa: **Moncler S.p.A.** · Euronext Milán `MONC` (Yahoo `MONC.MI`) · LEI 815600EBD7FB00525B20 · divisa EUR · ejercicio natural (diciembre, etiqueta «fin») · NIIF-UE. Marcas: Moncler y Stone Island; canales DTC y mayorista.
Carpeta de trabajo: `informes/moncler-2026-10-21/` (repo `/home/user/analisis-inversion`). Notas en `notas/`, documentos en `notas/docs/`. Cuentas XBRL del ESEF (2020-2025) ya en `notas/cuentas-xbrl.json` (mandan para los años completos); `notas/bolsa.json` hecho con `bolsa.mjs` (cierre del 21-oct: 42,94 EUR; índice FTSE MIB, sector EXH7.DE).
Fecha de corte: 2026-10-21. Precio del informe: **cierre de Milán del 21-oct-2026, 42,94 EUR** (antes de las ventas, publicadas tras el cierre).
Hecho nuevo: **ventas de los nueve meses de 2026 publicadas el 21-oct tras el cierre** (comunicado en monclergroup.com / eMarket Storage y conferencia). Prensa: ventas del 3T planas. Análisis anterior: `informes/moncler-2026-10-14/` (corte 14-oct, precio 43,44).

**Importante: aquel análisis se hizo solo con extractos de búsqueda, con confianza baja.** Esta vez la red funciona: **rehaz tu nota con fuentes primarias** (informes anuales y semestrales, comunicados de resultados de monclergroup.com, ESEF, Borsa Italiana/Consob) y sustituye toda cifra que viniera de un extracto de buscador.

## Cómo trabajar
- Tu nota `notas/<letra>.json` es una **copia de la del 14-oct**: solo un punto de partida. **Vuelve a comprobar cada cifra que uses** en su fuente original (regla 0: ninguna cifra de un resumen de buscador ni de un «AI summary»; con WebFetch, pide el texto literal de la tabla). Si ves un error, corrígelo.
- Fuentes: añade las nuevas al final de `fuentes` con id consecutivo (fecha AAAA-MM-DD, tipo Primaria/Datos de mercado/Sectorial/Analistas/Prensa/Foros y redes) y cítalas con `[n]`. Quita las de extractos que ya no cites.
- **Guarda la nota tras cada campo que termines** (con Write, JSON válido; compruébalo con `node -e "JSON.parse(require('fs').readFileSync('<ruta>','utf8'))"`). Pon `"_estado": "en curso"` arriba y `"terminado"` al acabar.
- Lee antes `verticales/empresa/lecciones.md` y las secciones «Italia y Polonia» y «Unión Europea» de `verticales/empresa/lecciones-paises.md`. Ejecuta `node herramientas/prompt-de.mjs <tu letra>` y lee su salida.
- Descargas: `NODE_USE_ENV_PROXY=1 node herramientas/descargar.mjs --dir informes/moncler-2026-10-21/notas/docs <nombre> <url>`. En la nube, Node sale a internet solo con `NODE_USE_ENV_PROXY=1`. User-Agent genérico, nunca datos personales. `pdftotext` está instalado. D: además `herramientas/movimiento.mjs MONC.MI`.
- Huecos: un campo sin dato tras **tres búsquedas distintas** va a `huecos` con los tres intentos escritos.
- Presupuesto: unos 20 minutos y 60-90 llamadas. Trabaja solo dentro del repo y de /tmp.
- Al final, devuelve un resumen de diez líneas: qué ha cambiado con el 3T26, qué falta y qué te ha parecido raro.
