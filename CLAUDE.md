# Instrucciones para Claude Code en este repo

Este repo produce informes Word de análisis de inversión en tres verticales: empresa cotizada, ETF e industria/sector. El README explica la arquitectura.

## Empresa cotizada: usa `/analiza-empresa`

Para empresas, el procedimiento está en `.claude/commands/analiza-empresa.md` (con `verticales/empresa/lecciones.md` y las herramientas de `herramientas/`: descargas, datos de bolsa, extracto del prompt por subagente; y `motor/integrar.mjs` para juntar las notas) (también si el usuario lo pide con otras palabras: «analiza Viscofan»). Es un análisis largo, de 30-60 minutos, en dos pasos de código: `motor/calcular-empresa.mjs` hace todas las cuentas (DCF, comparables, indicadores, controles) y `motor/rellenar.mjs` genera el Word. Las secciones sin información tras tres búsquedas no se imprimen y se avisan (protocolo de huecos del prompt).

## ETF y sector

«Analiza la empresa X», «analiza el ETF X», «analiza el sector X (en España)»:

1. Elige la vertical: `empresa`, `etf` o `sector`. Si no está claro (por ejemplo, un nombre que es a la vez empresa y ETF), pregunta.
2. Lee **entero** `verticales/<vertical>/prompt.md` y síguelo como instrucciones: papel, proceso, reglas de datos, campos y comprobaciones. La entrada es lo que ha dicho el usuario; para el sector, si no dice ámbito, España.
3. Investiga con búsqueda web y lectura de documentos. Prioriza siempre fuentes primarias (cuentas, regulador, KID, estadística oficial).
4. Escribe el JSON en `informes/<vertical>-<nombre-corto>-<AAAA-MM-DD>.json`.
5. Genera el informe:
   `node motor/rellenar.mjs --plantilla verticales/<vertical>/plantilla.docx --datos informes/<archivo>.json --salida "informes/<Nombre> - <AAAA-MM-DD>.docx"`
6. Corrige el JSON según los avisos y repite hasta que solo queden avisos de datos que de verdad no existen.
7. Responde con la ruta del informe y cinco líneas como máximo: conclusión, cobertura y las tres lagunas principales.

Reglas que no se negocian: no inventar cifras (mejor `null`), citar fuentes con `[n]`, y no cambiar la estructura del JSON.

## Cuando el usuario pide cambiar las plantillas o los prompts

- Cada campo vive en tres sitios que deben coincidir: `construccion/<vertical>.mjs` (plantilla), `verticales/<vertical>/prompt.md` (bloques JSON) y `verticales/<vertical>/ejemplo.json`.
- Tras cualquier cambio: `npm run plantillas` y `npm test`. La prueba compara las claves del prompt con las del ejemplo y rellena la plantilla buscando avisos.
- Para revisar el aspecto: `powershell -File construccion/a-pdf.ps1 informes/ejemplo-<vertical>.docx` y después `construccion/pdf-a-png.ps1` para ver las páginas.
- `motor/rellenar.mjs` no debe tener dependencias: tiene que funcionar subido suelto a un chat.
- Los `ejemplo.json` son ficticios a propósito: no poner datos de empresas reales ahí.
