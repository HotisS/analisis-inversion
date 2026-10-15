# Filtro previo de candidatas growth (14-oct-2026)

Hotis (14-oct 21:16): «baja el ritmo de growth, afina la puntería porque estás fallando al escoger candidatos». Este filtro se pasa ANTES del análisis completo (unos 5 minutos por empresa). Solo se analizan las que pasan las cuatro pruebas.

## Diagnóstico (68 informes growth: 16 Comprar, 52 no)
- De las tandas 11 a 17 (28 empresas) solo dieron Comprar dLocal e Ypsomed, las dos con convicción baja.
- La causa principal fue elegir empresas rentables y físicas (defensa, industria, infraestructura) después de una gran subida. Se valoran por EV/EBITDA y su múltiplo estaba por encima de su propia historia. Son 16 de las 24 Vender.
- La segunda causa fueron empresas de un solo producto o cliente (biotecnológicas recién lanzadas) y empresas que crecen poco, o crecen sobre todo comprando otras.
- Las Comprar tienen en común:
  - crecimiento de ventas ≥ 15 %;
  - si se valoran por EBITDA, un múltiplo ≤ 1,1 veces su mediana de 3 años;
  - ventas repartidas;
  - un precio que descuenta como mucho el 80 % de su crecimiento actual.

## Las cuatro pruebas (descarta si falla una)
| | Prueba | Pasa si |
|---|---|---|
| A | Crecimiento de ventas en 12 meses (orgánico si hay compras) | ≥ 15 % |
| B | Solo rentables estables: EV/EBITDA de los próximos 12 meses frente a su mediana de 3 años | ≤ 1,1 veces |
| C | Peso del mayor cliente o producto | ≤ 40 % |
| D | Crecimiento que descuenta el precio, con DCF inverso a 10 años (margen FCF maduro del sector, descuento 10 %, perpetuo 3 %), dividido entre A | ≤ 0,8 |

## Prueba sobre los 68 informes
- No pierde ninguna de las 16 Comprar.
- Descarta 35 de las 52 que no dieron Comprar. En las tandas 11-17 descarta 18 de las 26.
- Ojo: las cifras de corte se fijaron mirando estos mismos casos. Se valida con las próximas tandas: se apunta cuántas de las que pasan el filtro dan Comprar.
- Script de la prueba: lee `datos.json` de cada informe (crecimiento, organico, multiplo_actual / mediana_3a, metrica, clientes_top2_pct, dcf_inverso_crecimiento_10a_pct).

## Fuentes de candidatas
1. El escáner del repo con el perfil `growth-alto` de `escaner/perfiles.json`, que está inactivo por defecto: `node herramientas/escaner.mjs --perfiles growth-alto`.
2. Foros y cartas de fondos growth (Reddit, Seeking Alpha, X, cartas trimestrales). Solo cuentan los nombres que se repiten en varias fuentes.
3. Para cada candidata se apunta de dónde sale.

## Resultado de la primera tanda con el filtro (tanda 18, 15-oct)
- **2 de 4 dan Comprar:** Rubrik (media) y Reddit (baja). En las tandas 11-17, sin filtro, fueron 2 de 28. Son solo 4 casos: es una señal buena, no una prueba.
- **Credo (Vender):** la prueba C se pasó con un dato mal tomado. El filtro usó el 34 % de un trimestre; el 10-Q, contando por cliente final, da un 61 % para los dos mayores. Con el dato bueno la habría descartado. **Corrección:** la C se toma siempre del último 10-K/10-Q (o informe anual), por cliente final, y suma los dos mayores.
- **Zeta Global (Vender):** cotiza a 1,8 veces su EV/ventas mediano de 3 años y crece en parte comprando empresas. Se probó añadir «EV/ventas ≤ 1,5 veces su mediana» también a las no rentables. **No se adopta:** habría descartado dos Comprar anteriores, Natera (2,25 veces) y Datadog (1,69). Queda como aviso dentro del análisis, no como filtro.
- Propuestas de los analistas, pendientes de backtest (no aplicadas):
  - En la D, cuando el crecimiento pasa del 60 %, dividir por el crecimiento del 2.º año (Credo).
  - Una alerta de euforia a 6 meses para las de margen bruto alto: subida > 100 % con el múltiplo > 1,4 veces su mediana (Rubrik).
  - Una alerta cuando los usuarios del mercado principal crecen < 3 % y las ventas > 30 % (Reddit).
  - Separar de la dilución pasada las acciones entregadas en compras (Zeta).

## Resultado de la ronda de 16 (15-oct)
- **11 de 16 dan Comprar** (Hinge Health y Sezzle con convicción media; el resto, baja), 4 Mantener (Guardant por el veto de euforia, Flywire, Nordic y Rambus) y 1 Vender (SiTime). Sin filtro, en las tandas 11-17, fueron 2 de 28.
- **Pero ninguna mejora las cinco compras:** casi todas rinden entre +7 y +16 % con convicción baja. El filtro elige empresas baratas frente a su crecimiento, y eso da muchos Comprar flojos. El listón real para entrar es batir a Snowflake (+16 %, convicción media).
- **Tres fallos de dato del filtro:** Sanil (C: el informe oficial coreano da un 52 % para los dos mayores clientes), Sezzle (B: 1,3-2,0 bien medida) y Benefit Systems (B: 1,25). Corrección: la B se mide igual en el filtro y en el análisis, con el EBITDA conocido en cada fecha a los dos lados; la C de Corea se toma de DART.
- **Dónde falla la prueba D:** en empresas con el crecimiento en pico y un múltiplo muy por encima de su historia (SiTime, 1,4 veces; Guardant, 3 veces) el precio parece «barato frente al crecimiento» y no lo es. Propuesta pendiente de backtest: en la D, cuando el crecimiento pasa del 60 %, dividir por el del 2.º año (Credo); para las no rentables, mirar el EV/ventas frente a su mediana como aviso (no como filtro, porque perdería Natera y Datadog).
- Alertas propuestas por los analistas (pendientes de backtest; ninguna aplicada):
  - euforia a 6 meses con margen alto (Rubrik, Hinge);
  - 35/50/15 automático en prestamistas (Affirm) y con clientes muy concentrados (Sanil);
  - canal o socio > 50 % de los ingresos (Klaviyo, Life360);
  - ARR que crece > 5 puntos más que las ventas (SailPoint);
  - accionista de control > 50 % (SailPoint);
  - en cíclicas, crecimiento medido frente al pico anterior (Nordic);
  - suelo del primer año en el punto medio de la guía si la empresa la bate de forma sistemática (Flywire);
  - veto de euforia con varias referencias, no un solo día (Guardant);
  - dilución bruta y no neta de recompras (Elastic).
