# Vertical «Cartera real»: seguimiento de la cartera de verdad

Pedido del usuario (14-oct-2026): «una cuarta vertical más específica para monitorizar la cartera, en lugar de ser más ad hoc… si te conecto a IBKR podrás ver compras históricas, seguir mi cartera, ver rentabilidades… así el seguimiento será mucho más realista».

Las otras verticales dicen **qué comprar** (value, growth) y el escáner dice **cuándo**. Esta dice **cómo va lo que de verdad se tiene**: posiciones, precio medio, peso, liquidez, rentabilidad real frente al índice mundial, lo que el método esperaba frente a lo que pasa y avisos.

Herramienta: `herramientas/cartera-real.mjs`, sin dependencias.

## Regla dura: nada de órdenes (14-oct-2026)

Palabras del usuario: «de momento regla dura no emitir órdenes de compra o venta SALVO EXPLÍCITAMENTE DICHO EN CHAT y CONFIRMADO TRAS TU PEDIR CONFIRMACIÓN».

- Con el conector de IBKR solo se lee: posiciones, saldos, operaciones, rentabilidad y cotizaciones.
- Una orden (lanzarla, prepararla, cambiarla o cancelarla) necesita estos tres pasos, en este orden:
  1. el usuario la pide expresamente en el chat;
  2. Claude le pide confirmación, con valor, títulos, límite y cuenta;
  3. el usuario la confirma.
- Una propuesta de órdenes en un informe no cuenta como petición. La delegación «las órdenes tú mandas» se refiere a decidir las propuestas, no a ejecutarlas en el broker.

## Dónde viven los datos (privado)

El repo es **público**: aquí solo van el código y el método. Las operaciones, los precios de compra, los importes y las cuentas viven en la carpeta privada del proyecto, `/mnt/project-files/cartera/real/`, o en la que diga la variable `CARTERA_REAL`. Las cuentas se guardan como `cuenta-1` y `cuenta-2`, nunca con su número.

| Archivo | Qué es | Quién lo escribe |
|---|---|---|
| `ibkr/foto-AAAA-MM-DD.json` | Lo que da el conector de IBKR: posiciones con coste medio, liquidez por divisa y rentabilidad de la cuenta (TWR por periodos) | La sesión que tiene el conector (solo lectura) |
| `ibkr/operaciones.json` | Historial de operaciones del conector (`get_account_trades`; llega como mucho a 4 trimestres atrás) | Ídem |
| `operaciones.csv` | Todas las operaciones, ya normalizadas (formato abajo) | La herramienta (`--importar-…`, `--partida`) |
| `foto-broker.json` | Títulos según el broker, para el cuadre | La herramienta |
| `previsiones.json` | Lo que esperaba el método para cada posición (objetivo a 12 meses fijo, fecha y precio de arranque) | La herramienta, una vez por posición |
| `historial.json` | Una foto por día (valor total, liquidez, títulos y precio de cada posición) | La herramienta |
| `ultimo.md`, `ultimo.json` | El último informe | La herramienta |
| `informe-semanal-AAAA-MM-DD.md`, `mensaje-semanal.md` | El informe del domingo y su mensaje corto para el chat | La herramienta (`--semanal`) |

## Comandos

```
NODE_USE_ENV_PROXY=1 node herramientas/cartera-real.mjs                   # foto de hoy → ultimo.md
NODE_USE_ENV_PROXY=1 node herramientas/cartera-real.mjs --semanal         # + informe-semanal-… y mensaje-semanal.md
NODE_USE_ENV_PROXY=1 node herramientas/cartera-real.mjs --importar-ibkr   # rehace la cuenta desde ibkr/
NODE_USE_ENV_PROXY=1 node herramientas/cartera-real.mjs --importar-flex informe.csv --cuenta cuenta-2
NODE_USE_ENV_PROXY=1 node herramientas/cartera-real.mjs --partida         # primera carga sin broker (desde escaner/cartera.json)
```

**Cuenta 2 por el Flex Web Service de IBKR** (elegido por el usuario el 14-oct: el conector solo ve las cuentas de un usuario). El usuario creó en el Portal del Cliente una Activity Flex Query con estas secciones: Account Information, Open Positions, Trades, Cash Report, Cash Transactions y Corporate Actions. Es en XML y cubre los últimos 365 días. Activó además el token del Flex Web Service. Los dos van en las **variables de entorno** del entorno de la nube:
- `IBKR_FLEX_TOKEN`;
- `IBKR_FLEX_QUERY_CUENTA2` (otra cuenta: `IBKR_FLEX_QUERY_CUENTA3`, y así).

`--importar-ibkr` descarga el informe (SendRequest, y GetStatement con reintentos mientras se genera), lo convierte al formato del conector en `ibkr/foto-…-cuenta-2.json` y `ibkr/operaciones-cuenta-2.json` (junta las operaciones con las que ya había, sin repetir) y lo combina con la cuenta 1. **El token no se escribe nunca** en el repo, en el disco, en el registro ni en un mensaje. Sin las variables, el paso se salta sin avisar. El número de cuenta del XML no se guarda. El historial anterior a 365 días se sube a mano en XML o CSV: `--importar-flex archivo --cuenta cuenta-2`.

**Pasada diaria (9:25) y rutina del domingo** (las lanza la tarea programada del escáner):
1. Con el conector de IBKR, en solo lectura, guardar en `ibkr/` la foto del día y el historial de operaciones de la cuenta 1 (formato abajo). Nunca se lanza ni se prepara una orden.
2. `--importar-ibkr`, que baja también el Flex de la cuenta 2.
3. A diario, sin opción, deja `ultimo.md`, los avisos y la foto del día en el historial. Los domingos, `--semanal`, y se publica `mensaje-semanal.md` en el chat del proyecto, tal cual.

Si el conector no está en la sesión, se salta el paso 1 y se usa la última foto: el informe sale igual, con los precios de hoy.

**Para el hilo Mejoras:**
- `compras-y-ventas.json`: fecha y precio de cada compra y venta, y rentabilidad del año de cada posición, la del precio y la de la posición.
- Las tres series desde el 15-oct, en el informe y en `historial.json` (`total_eur` y `congelada_eur`): cartera real, cartera del 13-oct congelada sin ninguna orden (`cartera-congelada-2026-10-13.json`) e índice mundial.

## Qué mide y cómo

- **Posiciones**: los títulos se reconstruyen con las operaciones y se cuadran con la foto del broker. Si no coinciden, se avisa. Los títulos y el precio medio se ajustan por desdoblamientos (Yahoo da los cierres ajustados).
- **Precio medio**: el de las compras, con comisiones. Si una parte se compró antes de donde llega el historial del broker, entra como **arrastre**: coste medio de IBKR y fecha desconocida. Esas posiciones (†) no se comparan con el índice, porque no se sabe desde cuándo.
- **Desde la compra**: ganancia en euros (valor de hoy + ventas + dividendos − compras) ÷ lo invertido. Cada compra va al cambio de su día.
- **Índice igual**: lo que habría ganado **el mismo dinero, los mismos días**, en el MSCI World (IWDA, en euros). Es la comparación justa: cada compra se compara con el índice desde su fecha.
- **Del año**: lo mismo desde el 31-dic, con el valor que tenía la posición ese día.
- **Cartera entera**:
  - Con el historial completo (Flex Query desde el principio): rentabilidad del año con el método Dietz modificado, que descuenta las aportaciones.
  - Si no: la rentabilidad por tiempo que da IBKR de la cuenta (en su divisa base, pasada a euros), frente al índice en las mismas fechas.
  - Desde el alta de la vertical (14-oct-2026), con las fotos propias del historial, y la de la última semana.
- **Lo previsto frente a lo real**: cada posición guarda el **objetivo a 12 meses del método** (value: `objetivo12m-revisados.json`; growth: `objetivo_12m` del informe), congelado el día que arranca:
  - Una compra nueva arranca el día de la compra, a su precio medio.
  - Una posición que ya estaba antes de la vertical arranca el día del alta, al precio de ese día, porque no se sabe qué esperaba el método cuando se compró.
  - «Previsto hasta hoy» = la rentabilidad prevista × días ÷ 365 (lineal, hasta 12 meses). «Real» = lo que ha hecho el precio en su moneda desde el arranque, que es lo que mide el método.
- **Señales del escáner**: se leen de `escaner/registro-senales.json`. Cuenta cuántas, a 1 y a 3 meses, baten al índice, y compara las emitidas con las que no se emitieron.

## Avisos

| Aviso | Cuándo |
|---|---|
| Peso | Una posición pasa del tope del 7 %, o queda por debajo de 1.000 €. No aplica a Edenred ni al oro, que no se tocan por decisión del usuario, ni a lo que ya tiene orden de venta. También avisa si el bolsillo growth pasa del 20 %. |
| Va peor de lo previsto | Con 30 días o más, va 15 puntos o más por debajo de lo previsto. También si cae un 20 % desde la compra. Hay que revisar la tesis y la señal de alarma del informe. |
| En su objetivo | El precio llega al objetivo a 12 meses: revisar si se vende. Si ya tiene orden de venta, no avisa. |
| Movimiento | Se mueve un 10 % o más en una semana: mirar si hay noticias. |
| Índice | En el año, la cartera va 5 puntos o más por detrás del índice. |
| Liquidez | 3.000 € o más durante 3 meses o más: pasarlos al fondo monetario XEON (regla de MEMORIA.md). |
| Cuadre | Los títulos del broker y los de las operaciones no coinciden. |

Las reglas de tamaño se leen de `escaner/reglas.json`, el mismo archivo que usa el escáner.

## Formatos

`operaciones.csv` (separador `;`, números con punto):

```
fecha;cuenta;tipo;clave;simbolo;vertical;titulos;precio;divisa;comision;importe_eur;nota
```

- `tipo`: `compra`, `venta`, `dividendo`, `comision`, `interes`, `ingreso`, `retirada`, `arrastre`, `partida` o `saldo`. La clave `EUR` es la liquidez.
- `comision` va en la divisa de la operación.
- `importe_eur`, si falta, se calcula con el cambio del día.
- `saldo` fija la liquidez de una cuenta en una fecha, porque el conector no da los ingresos ni todos los cambios de divisa.
- `partida` es una foto sin historia, a precio de cierre: sirve para una cuenta sin conectar.
- `clave` es la de `verticales/empresa/simbolos.json` (value) o el ticker (growth).

`ibkr/foto-AAAA-MM-DD.json`:

```
{ cuenta, divisa_base, leido, resumen: { liquidez_por_divisa: {GBP, EUR, USD…} },
  posiciones: [{ simbolo, mercado, divisa, titulos, precio, coste_medio }],
  rentabilidad: { por_periodo_pct: { YTD, "1Y", … } } }
```

`ibkr/operaciones.json`:

```
{ cuenta, periodo: { desde, hasta },
  operaciones: [{ trade_time, symbol, sec_type, currency, side, size, price, commission, realized_pnl }] }
```

Son los campos que devuelve `get_account_trades`. Las operaciones de divisa (`CASH`) se ignoran.

**Flex Query de IBKR** (para lo anterior a lo que da el conector, o para una cuenta sin conectar):
1. Portal del Cliente → Rendimiento e informes → Flex Queries → «Activity Flex Query» nueva.
2. Secciones: **Trades** (Execution), **Cash Transactions** y **Open Positions**, con todos sus campos.
3. Formato CSV y periodo «desde el inicio». Si no deja más de un año, se hace un informe por año.

## Límites conocidos (14-oct-2026)

- El conector llega como mucho a 4 trimestres atrás. Lo anterior se ve como arrastre: precio medio sí, fecha no. La Flex Query lo completa.
- El conector no da el detalle de dividendos cobrados: «Desde la compra» los cuenta cuando llegan por Flex Query.
- El conector ve una sola cuenta por usuario. La segunda entra vinculando las cuentas en IBKR o con la Flex Query.
- Los valores vendidos sin símbolo de Yahoo conocido se miden con lo que dice el broker (ganancia), sin precio de hoy, que no hace falta.
