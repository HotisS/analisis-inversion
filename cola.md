# Cola de análisis de empresas

Solo lo pendiente. Lo cerrado está en `archivo/` (índice en `archivo/HISTORICO.md`); no hace falta leerlo.

**Ritmo**: de cuatro en cuatro (desde el 14-oct; antes de tres en tres). Al cerrar cada empresa: quítala de aquí, `node herramientas/seguimiento.mjs`, commit y push. Ninguna empresa con informe se repite salvo que el usuario lo pida (sería una iteración nueva). Sin juego ni apuestas.

## Pendiente

- **UnitedHealth** (`informes/unitedhealth-2026-10-12/`): ha publicado resultados después de la fecha del informe. Revisarlos (regla E1 de robustez) y actualizar el objetivo a 12 meses como LVMH (`informes/lvmh-2026-10-08/notas/actualizacion-v4.mjs`).

**Séptima hora: propuesta, sin arrancar** (la sexta se cerró el 14-oct a las 18:40 UTC; resumen en `informes/sexta-hora-2026-10-14/resumen.md`). Comprobada contra todos los informes de `informes/` e `informes-growth/`: ninguna tiene análisis. De 4 en 4; se enseña la lista al usuario y se arranca la tanda 1 mientras tanto.

Cómo seguir: `git pull`; `METODO-VIGENTE.md`, `MEMORIA.md` y este archivo; `/analiza-empresa` completo por empresa (Word entero, sin triaje), selector de método del motor, `robustez.mjs`, capa de foros, veredicto de calidad (Sí / En parte / No) y riesgo de IA expreso; ficha sectorial corta si el sector no la tiene (hace falta una de **software**). Al cerrar cada empresa: `apuntar-12m.mjs <carpeta>`, `seguimiento.mjs`, commit, `git pull --rebase --autostash` y push. Al cerrar la hora: precio actual (`precios.mjs` + `apuntar-12m.mjs --precios --actual --simular`) y comparación con `informes/ordenes-2026-10-15.md`; los cambios a la tabla, en un archivo propio para el hilo value. Antes de proponer, comprobar el precio de una acción: si un título vale más del 7 % de la cartera (Lindt, Lotus), no se puede comprar.

| Tanda | Empresa | Ticker | Estilo | Por qué |
|---|---|---|---|---|
| 1 | Sonova | SOON.SW | Valor | Audífonos, compararla con Demant; cotiza lejos de sus máximos |
| 1 | IDEXX Laboratories | IDXX | Crecimiento | Diagnóstico veterinario con consumibles recurrentes (sustituto natural de Zoetis) |
| 1 | ResMed | RMD | Valor | Apnea del sueño; castigada por los fármacos GLP-1, negocio físico |
| 1 | Tyler Technologies | TYL | Valor | Software para administraciones; sirve para la ficha de software y para medir el riesgo de IA en software vertical |
| 2 | Aon | AON | Valor | Corredor de seguros, compararla con Marsh (ficha ya hecha) |
| 2 | Canadian Pacific Kansas City | CP | Crecimiento | Única red ferroviaria Canadá-EE. UU.-México; activo físico que la IA no sustituye |
| 2 | Alfa Laval | ALFA.ST | Crecimiento | Intercambiadores y separadores; energía, marina y centros de datos |
| 2 | AMETEK | AME | Crecimiento | Instrumentos de nicho, comprador en serie; compararla con Roper y Halma |
| 3 | Beiersdorf | BEI.DE | Valor | Nivea y La Prairie, cotiza bajo su media |
| 3 | Colgate-Palmolive | CL | Valor | Higiene oral con marca dominante, castigada |
| 3 | Hershey | HSY | Valor | Chocolate, compararla con Lindt (ficha ya hecha) y el ciclo del cacao |
| 3 | Interpump | IP.MI | Valor | Hidráulica y bombas de alta presión, compras pequeñas, cotiza bajo su media |
| 4 | Stryker | SYK | Crecimiento | Implantes y equipos quirúrgicos, crecimiento recurrente |
| 4 | Sandvik | SAND.ST | Valor | Herramientas de corte y minería, compararla con Epiroc (ficha ya hecha) |
| 4 | Daikin | 6367.T | Valor | Climatización, castigada; ficha de climatización ya hecha |
| 4 | Graco | GGG | Crecimiento | Equipos de dosificación de fluidos, márgenes altos y poco capital |

## Vigilar (cifras v3 ×1,1 al cierre del 14-oct)

- **Bloqueadas por calidad o confianza** (5ª hora): Siemens Healthineers +24,9 % (confianza baja; ROIC − WACC ≈ +1), Partners Group +31,8 % (confianza baja; Comprar por debajo de 679,76 CHF si se confirman balance y reembolsos), Alcon +26,3 %, Sika +25,6 %, Pernod Ricard +18,9 % y Air Liquide (fallan calidad). Kuehne+Nagel pasa los tres por debajo de 184,20 CHF.
- **Edenred** (título-restaurante): si el Senado o un decreto fijan un tope a la comisión, pasa a Mantener y se rehacen Edenred y Pluxee. Si queda claro que no hay tope, se amplía (pasa los tres).
- **Sexta hora, cerca pero sin compra robusta** (14-oct): **Marsh** (propuesta para la lista de espera a ≤ 174,29 USD tras sus resultados del 15-oct); **Lindt** pasa con los dos por debajo de 7.775,57 CHF pero un certificado vale ≈8.400 EUR; LSEG (+25,8 %) y Roper (+21,5 %) fallan calidad por el fondo de comercio; MSCI (+24,5 %) con valor intrínseco −27 %.
- **Group 1 Automotive**: Mantener (−4,3 %); volver a mirar tras los resultados del 28-oct.

## Suplentes del escáner del 10-oct sin analizar

Yelp (YELP).
