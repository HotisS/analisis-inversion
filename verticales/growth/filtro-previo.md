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
