# Screening de megatendencias (15-oct-2026)

Petición de Hotis: identificar tendencias o megatendencias y los sectores que se benefician de forma indirecta (chips y energía con la IA, defensa con la guerra), iterarlo 10 veces, probarlo en los últimos 10 años y presentar lo que da hoy: sectores y candidatos de cada sector. Los candidatos son propuestas para analizar con value o growth, **no señales de compra**.

Informe legible con los resultados: `/mnt/project-files/estrategia/megatendencias/megatendencias-2026-10-15.md`.

## Archivos

| Archivo | Qué hace |
|---|---|
| `universo.json` | 56 sectores (ETF o cesta de líderes) y 16 megatendencias con sus artículos de Wikipedia y sus sectores directos (D) e indirectos (I) |
| `descargar.py` | Precios semanales de Yahoo desde 2009 y visitas mensuales de Wikipedia desde jul-2015 → `datos/` |
| `motor.py` | Datos en euros, señales en cada fecha (sin mirar el futuro) y las 10 versiones |
| `backtest.py` | Backtest de las versiones: diseño dic-2016 a dic-2021, validación desde ene-2022 (`--validar` para verla) |
| `episodios.py` | Cuándo detectó la v10 cada megatendencia conocida y qué pasó después |
| `hoy.py` | Aplica la v10 hoy → `resultados/hoy.json` |
| `candidatos.mjs` | Candidatos de cada sector (ETF + `candidatos-extra.json`) con datos de Yahoo, exclusiones y si ya están analizados |

Requiere Python 3 con pandas y numpy; los candidatos, Node (`NODE_USE_ENV_PROXY=1` en la nube).

```
python3 megatendencias/descargar.py
python3 megatendencias/hoy.py
NODE_USE_ENV_PROXY=1 node megatendencias/candidatos.mjs ciber nube equipos_chips semis biotech
```

## Método vigente: v10

1. **Fuerza de cada megatendencia** = z(atención) + z(momento de sus sectores directos). Atención = cuota de visitas en Wikipedia de sus artículos sobre el total de Wikipedia en inglés, últimos 3 meses frente a los 12 anteriores (con un mes de retraso, que es cuando se publica). Momento = rentabilidad a 6 meses frente al MSCI World en euros (IWDA).
2. **Nota de cada sector** = z(momento del sector: media de z(12 meses sin el último) y z(6 meses), siempre frente al índice) + z(fuerza de la megatendencia más fuerte de la que es directo o indirecto). Mismo peso.
3. **Filtros**: solo sectores por encima de su media de 10 meses; como mucho 2 sectores por megatendencia (la principal de cada sector).
4. **Se eligen 5** (y 3 reservas). Revisión trimestral.

## Protocolo y resultados

Fijado antes de mirar: muestra de diseño = elecciones de dic-2016 a dic-2021; validación = desde ene-2022 (12 meses medidos hasta sep-2026). Cifra principal: exceso medio de los 5 sectores frente a IWDA en euros a 12 meses. La v10 se congeló en el commit 74116ae antes de ver la validación (en la primera ejecución se imprimió la validación de v1-v5 por error de diseño del script; no se usó para nada).

| Versión | Diseño: exceso 12 m | Fechas que gana | Cartera trimestral | Validación: exceso 12 m | Cartera |
|---|---|---|---|---|---|
| v1 momento 12 m | +10,6 | 66 % | 17,4 % | +13,4 | 28,3 % |
| v2 momento 6 m + tendencia | +7,4 | 67 % | 17,4 % | +7,2 | 9,1 % |
| v3 atención → directos | +4,2 | 57 % | 7,3 % | +9,9 | 4,5 % |
| v4 indirectos de megatendencias fuertes | +6,0 | 67 % | 22,6 % | +4,8 | 13,1 % |
| v5 indirectos rezagados | +0,8 | 53 % | 6,9 % | +3,6 | 18,6 % |
| v6 contagio por correlación | +0,7 | 46 % | 10,2 % | +7,1 | 5,7 % |
| v7 momento + megatendencia | +6,0 | 67 % | 19,8 % | +9,2 | 11,7 % |
| v8 v7 + atención al alza obligatoria | +4,9 | 64 % | 19,8 % | +9,2 | 13,1 % |
| v9 v8 + prioridad indirectos + máx. 2 | +6,2 | 67 % | 18,1 % | +8,4 | 20,6 % |
| **v10 rejilla de 48, zona estable** | **+8,5** | **72 %** | **18,4 %** | **+7,9** | **15,2 %** |

Índice: 13,4 % anual en diseño y 10,9 % en validación. Década (dic-2016 a sep-2026): v10 16,8 % anual frente a 12,2 % del índice; peor caída −20 %. Detalle en `resultados/backtest.json` y `resultados/episodios.json`.

Aprendizajes: comprar al rezagado no funciona (v5, v6); la atención sola no basta (v3); momento y megatendencia juntos ganan a cada uno por separado (+6,6 y +4,3 frente a +8,5); el límite de 2 por megatendencia mejora en todas las combinaciones. El momento puro (v1) ganó en la validación: los sectores que salen en la v10 y en la v1 a la vez son los de más convicción.

Límites: supervivencia (ETF y cestas de hoy), mapa de relaciones hecho hoy, sin comisiones ni impuestos.
