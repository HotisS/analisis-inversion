# Cola de análisis de empresas

Solo lo pendiente. Lo cerrado está en `archivo/` (índice en `archivo/HISTORICO.md`); no hace falta leerlo.

**Ritmo**: de cuatro en cuatro (desde el 14-oct; antes de tres en tres). Al cerrar cada empresa: quítala de aquí, `node herramientas/seguimiento.mjs`, commit y push. Ninguna empresa con informe se repite salvo que el usuario lo pida (sería una iteración nueva). Sin juego ni apuestas.

## Pendiente

- **UnitedHealth** (`informes/unitedhealth-2026-10-12/`): ha publicado resultados después de la fecha del informe. Revisarlos (regla E1 de robustez) y actualizar el objetivo a 12 meses como LVMH (`informes/lvmh-2026-10-08/notas/actualizacion-v4.mjs`).

**Sexta hora: EN MARCHA desde el 14-oct 16:50 UTC (sesión del hilo «sexta hora», tanda 1 en curso).** La quinta hora se cerró el 14-oct (resumen en `archivo/HISTORICO.md`). La sexta la hace **una sesión nueva** (con red abierta), de 4 en 4. El usuario quiere ver la lista antes de cada hora: se le enseña y se arranca la tanda 1 mientras tanto (MEMORIA).

Cómo seguir (sesión nueva):
1. `git pull`; lee `MEMORIA.md`, este archivo y `verticales/empresa/lecciones.md`.
2. Por cada empresa, `/analiza-empresa` completo (Word entero, sin triaje) con la **regla v3** (`per_historico.base: "adelantado"`; si no hay historia del PER adelantado, el motor usa v2 y lo marca). Confianza baja = Comprar pasa a Mantener (lo hace el motor).
3. Capa de foros y sentimiento y veredicto de calidad (Sí / En parte / No) en cada una.
4. Ficha sectorial corta (`verticales/sector/ficha.md`) en `sectores/<sector>-<fecha>.md` si el sector no tiene ya ficha.
5. Al cerrar cada empresa: `node herramientas/apuntar-12m.mjs <carpeta>`, `node herramientas/seguimiento.mjs`, commit, `git pull --rebase` y push.
6. Al cerrar la hora: comparar con la cartera y la tabla de órdenes (`informes/ordenes-2026-10-15.md`), con precio actual y hora del dato en cada orden.

| Tanda | Empresa | Ticker | Estilo | Por qué |
|---|---|---|---|---|
| 1 | MSCI | MSCI | Crecimiento | Índices y analítica, ingresos por suscripción |
| 1 | London Stock Exchange Group | LSEG.L | Valor | Datos (Refinitiv) y bolsa, cotiza bajo su media |
| 1 | Euronext | ENX.PA | Valor | Bolsas europeas, compararla con Deutsche Börse |
| 1 | Marsh McLennan | MMC | Crecimiento | Corredor de seguros, poco capital y recurrente |
| 2 | Cintas | CTAS | Crecimiento | Uniformes y servicios a empresas, márgenes crecientes |
| 2 | Waste Connections | WCN | Crecimiento | Residuos con vertederos propios, monopolios locales |
| 2 | Roper Technologies | ROP | Valor | Cartera de software de nicho, castigada |
| 2 | Diploma | DPLM.L | Crecimiento | Distribución industrial especializada, compras pequeñas |
| 3 | Novonesis | NSIS-B.CO | Crecimiento | Enzimas y biosoluciones, líder mundial |
| 3 | Symrise | SY1.DE | Valor | Aromas, compararla con Givaudan |
| 3 | Lindt & Sprüngli | LISN.SW | Valor | Chocolate premium, marca con poder de precio |
| 3 | Demant | DEMANT.CO | Valor | Audífonos, duopolio de hecho, cotiza bajo su media |
| 4 | Belimo | BEAN.SW | Crecimiento | Válvulas y actuadores, centros de datos |
| 4 | Epiroc | EPI-A.ST | Valor | Equipos de minería, recambios recurrentes |
| 4 | Sartorius Stedim Biotech | DIM.PA | Valor | Consumibles de bioproducción, compararla con Lonza |
| 4 | Lotus Bakeries | LOTB.BR | Crecimiento | Biscoff, crecimiento de marca propia |

## Vigilar (cifras v3 ×1,1 al cierre del 14-oct)

- **Bloqueadas por calidad o confianza** (5ª hora): Siemens Healthineers +24,9 % (confianza baja; ROIC − WACC ≈ +1), Partners Group +31,8 % (confianza baja; Comprar por debajo de 679,76 CHF si se confirman balance y reembolsos), Alcon +26,3 %, Sika +25,6 %, Pernod Ricard +18,9 % y Air Liquide (fallan calidad). Kuehne+Nagel pasa los tres por debajo de 184,20 CHF.
- **Edenred** (título-restaurante): si el Senado o un decreto fijan un tope a la comisión, pasa a Mantener y se rehacen Edenred y Pluxee. Si queda claro que no hay tope, se amplía (pasa los tres).
- **Group 1 Automotive**: Mantener (−4,3 %); volver a mirar tras los resultados del 28-oct.

## Suplentes del escáner del 10-oct sin analizar

Yelp (YELP).
