# Encargo: rebajar el caso base al crecimiento financiable (lectura prudente de la sostenibilidad)

Repo: la raíz de este repositorio. Trabaja SOLO en la carpeta de tu empresa y en una carpeta temporal. **No toques** cola.md, MEMORIA.md, seguimiento.xlsx, lecciones.md, motor/, herramientas/ ni otras carpetas. **Sin commit ni push.** Sin búsquedas web.

Hoy (13-oct) se hizo una actualización rápida que añadió `dcf.sostenibilidad` (lee la última sección «Actualización» de `diario.md` de tu carpeta y su script `notas/actualizacion-vN.mjs`). La prueba **falla** y el caso base se dejó igual con una explicación. El usuario ha decidido la **lectura prudente**: el caso base debe quedar en lo que la empresa puede financiar (regla del prompt, `verticales/empresa/prompt.md`, bloque `sostenibilidad`: «si es En parte o No, el caso base debe estar por debajo de lo que pide la prueba»).

## Pasos
1. Escribe `notas/actualizacion-v<N+1>.mjs` que parte de `datos-v<N>.json` (el último), borra `calc` y ajusta **solo** los supuestos del DCF necesarios, de forma mínima y justificada:
   - Si falla la reinversión (crecimiento financiable < proyectado, o ROIC implícito del capital nuevo > 1,25× el incremental histórico): baja el `crecimiento_pct` de los años no `fijo` (sobre todo los del final) hasta que el crecimiento medio proyectado quede ≤ el financiable más la parte de precio que no pide capital (justifícala con el puente), o sube la reinversión (capex) si eso es más fiel al negocio. Ajusta el `puente_ingresos` para que siga cuadrando.
   - Si el exceso viene de **subir el margen** (no del crecimiento): limita la mejora del margen EBITDA a la que el histórico o la guía demuestran, o lo que haga que el capital nuevo rinda ≤ 1,25× el ROIC incremental/actual.
   - Si falla la cuota (implícita > 1,5× la actual): baja el crecimiento hasta que la cuota final quede ≤ 1,5× la actual.
   - Ajusta escenarios solo si dejan de tener sentido (normalmente no: son desplazamientos sobre el base).
   Mismo precio y fecha de corte. El veredicto pasa a reflejar que el base ya está dentro de lo financiable.
2. `node motor/calcular-empresa.mjs --datos informes/<carpeta>/datos-v<N+1>.json`. Itera hasta que los controles de sostenibilidad (reinversión, capital nuevo, cuota) pasen o queden explicados por una razón que no sea «el base es optimista».
3. Reescribe en el script todos los textos con cifras que cambian (síntesis entera si hace falta, tesis, `vision_diferencial`, `en_contra`, `dcf.justificacion.crecimiento`/`margenes`, `dcf.lectura`, `escenarios.comentario`, `valoracion.comentario`, `riesgos` con efecto en valor, `cambiaria_recomendacion`, recomendación y convicción): las cifras salen de `calc` tal cual. Si cambia la señal, la síntesis lo dice y explica por qué. Síntesis ≤ 650 palabras.
4. Word: `node motor/rellenar.mjs --plantilla verticales/empresa/plantilla.docx --datos informes/<carpeta>/datos-v<N+1>.json --salida "informes/<carpeta>/<Nombre> - <fecha> v<N+1>.docx"` (mismo nombre base que las versiones anteriores).
5. PDF junto al Word, como en `actualizacion-sostenibilidad.md` (paso 6).
6. Añade a `diario.md` «## Actualización v<N+1> (13 oct 2026): caso base al crecimiento financiable», con la tabla v<N> frente a v<N+1> (señal, convicción, valor objetivo y rentabilidad total con nuestro WACC y con la prima del mercado, comprar por debajo/vender por encima, crecimiento medio proyectado, financiable, veredicto) y qué supuesto cambió y por qué.

## Devuelve (máximo 12 líneas)
Archivos; supuestos cambiados (antes → después); tabla antes → después; si cambia la señal.
