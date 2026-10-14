# Cola growth (de 4 en 4)

Análisis growth: método en `verticales/growth/metodo.md`, procedimiento en `.claude/commands/analiza-growth.md`. Esta cola es solo de growth; la value es `cola.md`. Ninguna tiene informe value ni growth (comprobado el 14-oct contra `informes/`). Las cifras del porqué son orientativas: se comprueban en cada análisis.

| Tanda | Empresa | Ticker | Por qué growth |
|---|---|---|---|
| 3 | Shopify | SHOP | Plataforma de comercio para marcas (no es minorista); crecimiento ~25 % y margen FCF al alza |
| 3 | Rocket Lab | RKLB | Lanzadores y satélites; Neutron como catalizador; aún en pérdidas: el caso de «tecnología nueva» |
| 3 | BE Semiconductor | BESI.AS | Máquinas de hybrid bonding para chips de IA; tecnología que puede cambiar el empaquetado |
| 3 | Siemens Energy | ENR.DE | Giro de pérdidas a beneficios con la demanda eléctrica de los centros de datos; cambio de percepción fuerte |
| 4 | Datadog | DDOG | Observabilidad en la nube; clientes nativos de IA aceleran el crecimiento |
| 4 | Duolingo | DUOL | Aprendizaje con IA; la acción cayó por miedo a la IA: posible giro de percepción si el crecimiento aguanta |
| 4 | Celestica | CLS | Fabricación de redes y servidores para centros de datos; crecimiento y re-rating por la IA |
| 4 | Wise | WISE | Pagos internacionales de bajo coste; crecimiento de clientes y paso a cotizar en EE. UU. |

Al acabar una empresa: se quita de aquí y queda en `informes-growth/resumen.md`.

## Cómo arrancar la siguiente tanda (para una sesión nueva)

1. `git pull`. Método vigente **v7** (`verticales/growth/metodo.md`; `VIGENTE` en `motor/growth.mjs`). Compras growth aprobadas en `informes-growth/cartera-growth.md`; resumen de las analizadas en `informes-growth/resumen.md`.
2. Un subagente por empresa, las 4 en paralelo, con este encargo (sustituye EMPRESA y slug): «Análisis growth con fecha de corte de hoy, en castellano. No hagas git. Lee enteros `verticales/growth/metodo.md` y `verticales/growth/plantilla.md`; ejemplo hecho: `informes-growth/nu-holdings-2026-10-14/`. Investiga (fuentes primarias primero; con la red abierta, lee los informes trimestrales y la SEC directamente): resultados y guía, precio de cierre (dos fuentes), subida 12 m, múltiplos de hoy y de 3 años, comparables, las 8 señales con prueba, y foros/sentimiento (Reddit, StockTwits/X, Seeking Alpha, Rankia o Investing ES). Nunca datos personales del usuario en consultas. No inventes (null; lo de memoria, marcado). Escribe `informes-growth/<slug>-<fecha>/datos.json` con todos los campos de la plantilla y ejecuta `node motor/growth.mjs` sobre él; corrige avisos. Escribe `informe.md` (14 secciones + fuentes, cabecera con las cifras de `calc`). Sección 13: encaje frente a la cartera vigente (`MEMORIA.md`) y a las compras growth. Si la regla mide mal algo, propón la mejora sin tocar el código.»
3. Al acabar: `node motor/growth.mjs --todos`; Word y PDF de cada una (`pandoc informe.md -o "<Empresa> - growth - <fecha>.docx"` y `soffice --headless --convert-to pdf`); quitar la tanda de esta cola; commit y `git pull --rebase` + push.
4. Entrega única de la tanda: tabla (puntos, ponderada/base, señal, compra hasta), cuáles merecen hueco con peso y en EUR (mínimo 1.000 EUR por posición, bolsillo growth ≤ 20 %), riesgos, y las mejoras del método propuestas.

**Mejoras del método propuestas por los informes, pendientes de probar con el backtest** (`node herramientas/growth-backtest.mjs` y `growth-backtest2.mjs --validacion`; apuntar en `metodo.md` §7): proyección que respete la desaceleración (argenx; es la v8); señal de múltiplo solo si sigue ≤ 1,3 × su mediana (Cloudflare; v8); modo para bancos (Nu: PER o P/VC frente a ROE, morosidad, CET1) y campo explícito `tipo_multiplo` en vez de leer la palabra «ventas» de `metrica`; estado «vigilancia por tendencia» con su condición de activación (Axon); margen bruto del negocio recurrente en empresas mixtas (Axon); revisiones basadas en estimaciones y no en precios objetivo (Nu); fijar cómo se calcula `anios_hasta_objetivo` (Cloudflare).

**Pendiente de recibir**: las empresas de la 5ª hora value sin beneficios pasan a esta cola (decisión del usuario del 14-oct, 15:29); las indicará el hilo value o el coordinador.
