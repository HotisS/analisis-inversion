# Backtest del método growth

Pide del usuario (14-oct): probar el método con empresas de revalorización excelente y ver si habría dado señal de compra al principio o a mitad del camino, con los datos de entonces; y con fracasos famosos, para ver que no los habría comprado en el pico.

Cada caso es un `casos/<empresa>-<AAAA-MM>.json` con el formato de `../plantilla.md` **en la fecha del caso** (solo información publicada antes de esa fecha) más:

```json
"caso": { "tipo": "ganadora|fracaso", "momento": "principio|mitad|pico", "nota": "por qué esta fecha" },
"crecimiento": { "...": "...", "ultimo_trimestre_pct": 0 },
"valoracion": { "...": "...", "anios_hasta_objetivo": 2 },
"resultado": { "precio_12m": 0, "precio_36m": 0, "rent_12m_pct": 0, "rent_36m_pct": 0, "base_precios": "misma base de acciones que el precio del caso (ajustada por splits posteriores)" }
```

En los casos, `ventas_objetivo_m` va a `null`: la proyección la hace el código con la regla mecánica (así no entra lo que se supo después). `multiplo_actual` puede ir a `null` y lo calcula el código (EV / ventas de los 12 meses siguientes).

`node herramientas/growth-backtest.mjs` corre todas las versiones del método sobre todos los casos y escribe `resultados.md`.
