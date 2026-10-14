# Cola de análisis de empresas

Solo lo pendiente. Lo cerrado está en `archivo/` (índice en `archivo/HISTORICO.md`); no hace falta leerlo.

**Ritmo**: de cuatro en cuatro (desde el 14-oct; antes de tres en tres). Al cerrar cada empresa: quítala de aquí, `node herramientas/seguimiento.mjs`, commit y push. Ninguna empresa con informe se repite salvo que el usuario lo pida (sería una iteración nueva). Sin juego ni apuestas.

## Pendiente

- **UnitedHealth** (`informes/unitedhealth-2026-10-12/`): ha publicado resultados después de la fecha del informe. Revisarlos (regla E1 de robustez) y actualizar el objetivo a 12 meses como LVMH (`informes/lvmh-2026-10-08/notas/actualizacion-v4.mjs`).

**Octava hora: PARADA el 14-oct a las 21:40 UTC por petición del usuario; se sigue mañana desde la tanda 1.** Broadridge, Jack Henry, FactSet y Sage se empezaron pero ninguna llegó a terminarse; las notas a medias están en `/mnt/project-files/analisis/octava-hora-parcial-2026-10-14/` (se pueden reutilizar o empezar de cero). La séptima se cerró el 14-oct a las ≈22:00 UTC (resumen en `informes/septima-hora-2026-10-14/resumen.md`: compras robustas Aon y Hershey). La lista de la octava sale del escáner (perfil `calidad-a-precio`) y de foros y cartas de gestores; diagnóstico, lista y fuentes en `informes/septima-hora-2026-10-14/octava-hora-propuesta.md`. Comprobada contra `informes/` e `informes-growth/`.

Cómo seguir: `git pull`; `METODO-VIGENTE.md`, `MEMORIA.md` y este archivo; `/analiza-empresa` completo por empresa, selector de método, `robustez.mjs`, foros, veredicto de calidad y riesgo de IA expreso. Al cerrar cada empresa: `apuntar-12m.mjs <carpeta>`, `seguimiento.mjs`, commit y push. Al cerrar la hora: precio actual y comparación con la tabla de órdenes vigente; cambios en un archivo propio para el hilo value.

| Tanda | Empresas |
|---|---|
| 1 | Broadridge (BR), Jack Henry (JKHY), FactSet (FDS), Sage (SGE.L) |
| 2 | Burckhardt Compression (BCHN.SW), Thales (HO.PA), DO & CO (DOC.VI), Rai Way (RWAY.MI) |
| 3 | Gentex (GNTX), Autodesk (ADSK), Cencora (COR), Paycom (PAYC) |
| 4 | MSA Safety (MSA), Rollins (ROL), Diagnostyka (DIA.WA), Qualys (QLYS) |

## Vigilar (cifras v3 ×1,1 al cierre del 14-oct)

- **Bloqueadas por calidad o confianza** (5ª hora): Siemens Healthineers +24,9 % (confianza baja; ROIC − WACC ≈ +1), Partners Group +31,8 % (confianza baja; Comprar por debajo de 679,76 CHF si se confirman balance y reembolsos), Alcon +26,3 %, Sika +25,6 %, Pernod Ricard +18,9 % y Air Liquide (fallan calidad). Kuehne+Nagel pasa los tres por debajo de 184,20 CHF.
- **Edenred** (título-restaurante): si el Senado o un decreto fijan un tope a la comisión, pasa a Mantener y se rehacen Edenred y Pluxee. Si queda claro que no hay tope, se amplía (pasa los tres).
- **Séptima hora** (14-oct): **Beiersdorf** pasa con los dos por debajo de 79,97 EUR si el 27-oct no rebaja la guía; Interpump y Stryker fallan calidad.
- **Sexta hora, cerca pero sin compra robusta** (14-oct): Marsh sustituida por Aon; **Lindt** pasa con los dos por debajo de 7.775,57 CHF pero un certificado vale ≈8.400 EUR; LSEG (+25,8 %) y Roper (+21,5 %) fallan calidad por el fondo de comercio; MSCI (+24,5 %) con valor intrínseco −27 %.
- **Group 1 Automotive**: Mantener (−4,3 %); volver a mirar tras los resultados del 28-oct.

## Suplentes del escáner del 10-oct sin analizar

Yelp (YELP).
