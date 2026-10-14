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
