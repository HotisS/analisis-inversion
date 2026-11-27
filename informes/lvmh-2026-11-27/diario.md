# Diario lvmh 2026-11-27

- Commit de partida: 3d983a2 (Escáner 27-nov 9:00). Encargo de la tanda del 27-nov: LVMH (excepción de calidad del usuario) estaba en su nivel B (−0,1 %) con un informe de más de un mes. Iteración nueva sobre `lvmh-2026-10-21`, sin subagentes (fases A-E hechas por mí). Inicio 10:21 (Madrid).
- No hay resultados nuevos desde el 21-oct (3T26 el 12-oct, ya recogido con su conferencia; anuales de 2026 a finales de enero). Notas A y B sin cambios de cifras (copiadas y comprobadas: no hay cuentas nuevas; `cuentas-xbrl.json` del 21-oct sigue valiendo, ESEF de 2025). C, D y E puestas al día; propio/supuestos/textos rehechos.
- Decisiones: mismos supuestos operativos (el consenso solo baja un 0,6-0,9 %, nuestro base ya está un 2,7 % por debajo); Bund 3,32 %; acciones 490,37 M y caja −446 M por las recompras del 19-oct al 20-nov; comparables con precio del 26-nov y BPA de Yahoo (posterior a sus resultados) y EBITDA de MarketScreener del 21-oct (dicho en el criterio); historia del PER y casos en BPA publicado (`base_bpa`), 2020-2024 como en el informe anterior (con 2025 la mediana sería 29,1x y nada cambia: tope y techo mandan). Añadidos `riesgos.ia`, `diferencia_consenso` y `comentario` del objetivo a 12 meses, que faltaban el 21-oct.
- 10:34 Resultado: DCF 373,53 (antes 363,13), valor intrínseco 401,46 (+0,1 %), 12 m 27,7 % / 23,1 % (v2 16,1 %, BPA −10 % 15,2 %): Comprar, convicción baja. Robustez SÓLIDA, nivel B (A ≤ 397,91; B ≤ 401,45), mantener hasta 465,43. Controles 20 de 22 y 2 explicados. `comprobar.mjs`: sin errores en esta carpeta.

## Pasos y fecha de los datos
| Paso | Herramienta / fuente | Fecha de los datos |
|---|---|---|
| Precio, rango, betas, rentabilidades | `bolsa.mjs` (MC.PA, CAC.PA, GLUX.PA) | cierre 26-nov-2026 |
| Movimiento (regla 13) | `movimiento.mjs MC.PA` | 27-nov-2026 (intradía 398,45) |
| Recompras | declaraciones semanales de LVMH | hasta el 20-nov-2026 |
| Operaciones de directivos | AMF BDIF | hasta el 25-nov-2026 |
| Consenso | MarketScreener (cotización del 20-nov) y Yahoo quoteSummary | 27-nov-2026 |
| Comparables | Yahoo (precio y BPA) + MarketScreener (EBITDA) | 26-nov / 21-oct-2026 |
| Bund 10 años | Bundesbank | 26-nov-2026 |
| Prima implícita | Damodaran ERPbymonth | nov-2026 (4,41 %) |
| China y relojes | NBS (17-nov), FH vía blue News (19-nov) | octubre de 2026 |
| Cuentas, balance, puente | semestral 1S26 + ventas 3T26 | 30-jun / 30-sep-2026 |
| Apuntar 12 m y robustez | `apuntar-12m.mjs --precios`, `robustez.mjs --actual` (con flock) | precios.json 26-nov |

Revisión a 12 meses: MC Comprar 28,0 % (386,75) → Comprar 27,7 % (401,05, 26-nov); nivel B, límite A 397,91.
