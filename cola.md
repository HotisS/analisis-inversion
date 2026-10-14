# Cola de análisis de empresas

Solo lo pendiente. Lo cerrado está en `archivo/` (índice en `archivo/HISTORICO.md`); no hace falta leerlo.

**Ritmo**: de cuatro en cuatro (desde el 14-oct; antes de tres en tres). Al cerrar cada empresa: quítala de aquí, `node herramientas/seguimiento.mjs`, commit y push. Ninguna empresa con informe se repite salvo que el usuario lo pida (sería una iteración nueva). Sin juego ni apuestas.

## Pendiente

**Sexta hora: propuesta, sin arrancar.** La quinta hora se cerró el 14-oct (resumen en `archivo/HISTORICO.md`). La sexta la hace **una sesión nueva** (con red abierta), de 4 en 4. El usuario quiere ver la lista antes de cada hora: se le enseña y se arranca la tanda 1 mientras tanto (MEMORIA).

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

## Vigilar

- **Quinta hora, cerca de Comprar pero bloqueadas** (14-oct): Siemens Healthineers (+39,7 %, confianza baja y ROIC − WACC ≈ +1), Alcon (+39,3 %, calidad −4,5), Kering (+16,2 %, calidad −4,1), Pernod Ricard (+22,9 %, calidad +0,5), Sika (+27,4 %, falla calidad y valor intrínseco −5,6 %). Kuehne+Nagel pasa los tres requisitos por debajo de 184,20 CHF.
- **Rightmove**: fuera de la cartera por decisión del usuario (14-oct); no proponerla.

- **Precios sin cierre del 13-oct** en los análisis del 14-oct (Halma, Spirax, KONE, Schneider, Experian, Texas Instruments, Danaher): recalcular con `herramientas/apuntar-12m.mjs <carpeta> --precio X` antes de comprar. Experian es la más cercana a Comprar (por debajo de ≈2.447 p).

- **Group 1 Automotive (GPI)**: analizado el 14-oct desde la nube solo con búsqueda web (confianza baja; Mantener, ponderada +7,5 %, base +9,0 %, compra por debajo de 216 USD). Volver a mirar tras los resultados del 28-oct.
- **Título restaurante (Edenred, Pluxee)**: si el pleno fija un tope a la comisión o el Gobierno anuncia el decreto, Edenred pasa a Mantener y se rehacen Edenred y Pluxee en la cartera.

## Suplentes (del escáner del 10-oct, sin analizar)

Booking (BKNG), ANYCOLOR (5032.T), Moncler (MONC.MI), Sectra (SECT-B.ST), Yelp (YELP).
