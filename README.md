# Análisis de inversión

Plantillas Word, prompts y un motor para producir informes de análisis de inversión en tres verticales, por separado:

| Vertical | Se le da | Campos | Gráficos |
|---|---|---|---|
| **Empresa cotizada** (extensa: 30-60 min, 30-50 páginas) | nombre, ticker o ISIN | 27 secciones | 28 |
| **ETF** | nombre, ticker o ISIN | 13 | 10 |
| **Industria o sector** | nombre + ámbito geográfico | 18 | 11 |

Qué campos hay y por qué: [CAMPOS.md](CAMPOS.md).

## Cómo funciona

```
prompt.md ──► el modelo investiga y escribe datos.json ──► rellenar.mjs + plantilla.docx ──► Informe.docx
```

1. **`prompt.md`** le dice al modelo qué buscar en cada campo, de qué fuentes, con qué formato JSON y qué comprobaciones hacer.
2. El modelo devuelve un **`datos.json`** con la estructura exacta del prompt.
3. **`rellenar.mjs`** mete los datos en **`plantilla.docx`**: rellena textos y tablas, y dibuja los gráficos como gráficos nativos de Word (editables, con su hoja de Excel dentro). Imprime la cobertura de campos y avisos (tablas vacías, pesos que no suman 100, campos que no existen).

## Lanzar un análisis

**En claude.ai (o cualquier chat con ejecución de código).** Adjunta los tres archivos de la vertical y pide el análisis:

- `verticales/<vertical>/prompt.md`
- `verticales/<vertical>/plantilla.docx`
- `motor/rellenar.mjs`

Y escribe, por ejemplo: `EMPRESA: Viscofan`, `ETF: IE00B4L5Y983` o `SECTOR: residencias de mayores` / `ÁMBITO: España`.

**En Claude Code, dentro de este repo.** Para empresas, `/analiza-empresa Viscofan` (reparte la investigación entre cuatro subagentes y tarda 30-60 minutos). Para ETF y sectores, «analiza el ETF …» o «analiza el sector …». El [CLAUDE.md](CLAUDE.md) explica el procedimiento y el informe queda en `informes/`.

**A mano, con un datos.json ya hecho:**

```bash
node motor/rellenar.mjs --plantilla verticales/empresa/plantilla.docx --datos datos.json --salida informes/Informe.docx
```

Solo necesita Node 18 o superior; el motor no tiene dependencias.

## Estructura

```
motor/rellenar.mjs            Motor: plantilla + datos → informe (sin dependencias)
motor/calcular-empresa.mjs    Cálculos de empresa: DCF, sensibilidades, DCF inverso, comparables, Altman/Piotroski/Beneish, gobierno, controles
verticales/<vertical>/
  prompt.md                   Prompt con las instrucciones campo a campo
  plantilla.docx              Plantilla Word con los marcadores (generada)
  graficos.json               Definición de los gráficos (va incrustada en la plantilla)
  ejemplo.json                Ejemplo FICTICIO completo; sirve de prueba
construccion/
  <vertical>.mjs              Diseño de cada plantilla (secciones, tablas, gráficos)
  comun.mjs                   Estilos y piezas comunes
  construir.mjs               Genera las plantillas
  probar.mjs                  Prueba: prompt = ejemplo = plantilla, sin avisos
  a-pdf.ps1, pdf-a-png.ps1    Revisión visual con Word (Windows)
herramientas/                 Para los análisis de empresa
  descargar.mjs               Documentos con su texto al lado (PDF por páginas)
  bolsa.mjs                   Cotizaciones de Yahoo: rentabilidades, beta, volatilidad, cierres
  form4.mjs                   Compras y ventas de directivos en EE. UU. (Form 4 de la SEC), por persona
  seguimiento.mjs             seguimiento.xlsx en la raíz: una fila por análisis (iteraciones 1, 2, 3… por empresa) con señal, precios y criterios ✓ = ✗
  escaner.mjs                 Escáner de mercado (Europa, Américas, Asia-Pacífico) → escaneos/escaneo-AAAA-MM-DD.xlsx; perfiles en escaner/perfiles.json
  yahoo.mjs, xlsx.mjs         Buscador, fichas y tipos de cambio de Yahoo (con caché); escritor de .xlsx
  prompt-de.mjs               Parte del prompt de cada subagente (A-D)
motor/integrar.mjs            Junta las notas A-D y la parte del analista en datos.json
informes/                     Informes generados (los ejemplos se versionan)
```

## Cambiar las plantillas

- **Retoques de formato** (colores, márgenes, textos fijos): se pueden hacer directamente en `plantilla.docx` con Word, siempre que no se toquen los `{{marcadores}}`. Ojo: `npm run plantillas` la regenera y pisa esos cambios.
- **Añadir o quitar campos**: cambia a la vez `construccion/<vertical>.mjs` (dónde sale), `verticales/<vertical>/prompt.md` (qué se pide) y `ejemplo.json`; después `npm run plantillas` y `npm test`. La prueba falla si el prompt y el ejemplo no tienen las mismas claves o si la plantilla deja avisos.
- **Gráficos**: edita `verticales/<vertical>/graficos.json` y regenera la plantilla. Tipos: `columnas`, `columnas_apiladas`, `barras`, `barras_apiladas`, `lineas`, `donut`, `tarta`, `dispersion`, `radar`.

### Sintaxis de la plantilla

| Marcador | Qué hace |
|---|---|
| `{{ruta.campo}}` | Pone el valor. Filtros: `\|0` `\|1` `\|2` (decimales), `\|pct`, `\|+pct`, `\|x` (múltiplo), `\|fecha` |
| `{{texto:ruta}}` | Párrafo propio → uno o varios párrafos; admite `**negrita**` |
| `{{lista:ruta}}` | Párrafo con viñeta → una viñeta por elemento |
| `{{grafico:id}}` | Párrafo propio → gráfico definido en `graficos.json` |
| `{{lista[].campo}}` | En una fila de tabla → la fila se repite por cada elemento |
| `{{#}}` | Número de fila en una fila repetida |

Los valores vacíos salen como «n.d.» y las tablas sin filas como «Sin datos»: el informe nunca rellena huecos inventando.

## Comandos

```bash
npm install          # solo para regenerar plantillas (usa la librería docx)
npm run plantillas   # regenera las tres plantillas
npm test             # comprueba prompt, ejemplo y plantilla, y genera los informes de ejemplo
```
