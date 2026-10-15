# Backtest: ¿esperar a los resultados? · 2026-10-15 · BPA ingenuo

Generado con `node herramientas/backtest-espera-resultados.mjs`. Protocolo: `espera-resultados-preregistro-2026-10-15.md`. Fechas reales de resultados (8-K 2.02 de la SEC) de 82 empresas de EE. UU.; cada fila es una publicación de resultados con la señal viva. «Salto» = cierre después de los resultados / cierre de la víspera − 1 (lo que cambia por esperar). Compras: esperar se mantiene solo si el salto mediano ≤ −1 %, compras perdidas ≤ 20 % y la rentabilidad a 12 meses no empeora. Ventas: esperar si el salto mediano ≥ +1 % y más del 55 % sube.

## Compras robustas

### Todos (decide): 147 publicaciones de resultados con la compra robusta viva (30 empresas)

| Compras | n | Salto mediano por esperar | Sube | Sube ≥ 5 % | Cae ≥ 10 % | Compra perdida (supera el límite) | Rent. 3 m antes → después | Rent. 12 m antes → después | ¿Esperar? |
|---|--:|--:|--:|--:|--:|--:|--:|--:|---|
| todas | 147 | 0,5 % | 52 % | 29 % | 9 % | 14 % | 1,4 % → 0,8 % | 10,6 % → 8,3 % | no |
| holgadas (margen ≥ 15 puntos) | 111 | 1,2 % | 52 % | 32 % | 12 % | 7 % | 0,9 % → -0,2 % | 9,8 % → 7,4 % | no |
| justas | 36 | 0,4 % | 53 % | 22 % | 0 % | 33 % | 3,6 % → 2,7 % | 12,9 % → 11,4 % | no |
| tendencia bajista | 82 | 0,0 % | 50 % | 28 % | 10 % | 6 % | 0,4 % → -0,0 % | 8,9 % → 7,8 % | no |
| lateral | 18 | -1,9 % | 44 % | 28 % | 17 % | 11 % | 2,8 % → 3,6 % | 15,2 % → -3,4 % | no |
| alcista | 47 | 2,4 % | 60 % | 32 % | 4 % | 28 % | 3,7 % → 1,9 % | 12,5 % → 9,1 % | no |
| bajista y justa | 10 | 3,5 % | 60 % | 10 % | 0 % | 30 % | 1,5 % → 3,0 % | 2,7 % → 0,3 % | no |

### Validación: 102 publicaciones de resultados con la compra robusta viva (16 empresas)

| Compras | n | Salto mediano por esperar | Sube | Sube ≥ 5 % | Cae ≥ 10 % | Compra perdida (supera el límite) | Rent. 3 m antes → después | Rent. 12 m antes → después | ¿Esperar? |
|---|--:|--:|--:|--:|--:|--:|--:|--:|---|
| todas | 102 | 1,7 % | 54 % | 34 % | 12 % | 14 % | 1,4 % → 2,0 % | 11,9 % → 11,1 % | no |
| holgadas (margen ≥ 15 puntos) | 79 | 1,6 % | 54 % | 39 % | 15 % | 8 % | 1,0 % → 2,0 % | 10,6 % → 12,1 % | no |
| justas | 23 | 2,4 % | 52 % | 17 % | 0 % | 35 % | 2,3 % → 2,1 % | 12,1 % → 4,1 % | no |
| tendencia bajista | 56 | 2,6 % | 55 % | 34 % | 13 % | 7 % | 0,5 % → 2,5 % | 7,5 % → 11,9 % | no |
| lateral | 12 | -3,4 % | 33 % | 25 % | 25 % | 0 % | 1,5 % → -1,1 % | 3,9 % → -6,9 % | no |
| alcista | 34 | 2,6 % | 59 % | 38 % | 6 % | 29 % | 4,3 % → 0,5 % | 13,0 % → 12,6 % | no |
| bajista y justa | 8 | 3,6 % | 75 % | 13 % | 0 % | 38 % | 4,0 % → 3,3 % | 3,9 % → -0,1 % | pocos datos |

### Diseño: 45 publicaciones de resultados con la compra robusta viva (14 empresas)

| Compras | n | Salto mediano por esperar | Sube | Sube ≥ 5 % | Cae ≥ 10 % | Compra perdida (supera el límite) | Rent. 3 m antes → después | Rent. 12 m antes → después | ¿Esperar? |
|---|--:|--:|--:|--:|--:|--:|--:|--:|---|
| todas | 45 | -0,3 % | 49 % | 18 % | 2 % | 13 % | 1,4 % → -0,7 % | 9,8 % → 4,2 % | no |
| holgadas (margen ≥ 15 puntos) | 32 | -0,4 % | 47 % | 13 % | 3 % | 6 % | -6,2 % → -7,4 % | 6,8 % → 1,5 % | no |
| justas | 13 | 0,3 % | 54 % | 31 % | 0 % | 31 % | 5,8 % → 5,6 % | 16,5 % → 17,2 % | no |
| tendencia bajista | 26 | -0,7 % | 38 % | 15 % | 4 % | 4 % | -1,8 % → -3,2 % | 9,4 % → 3,8 % | no |
| lateral | 6 | 1,2 % | 67 % | 33 % | 0 % | 33 % | 7,1 % → 4,7 % | 15,7 % → 8,1 % | pocos datos |
| alcista | 13 | 1,6 % | 62 % | 15 % | 0 % | 23 % | 3,3 % → 5,2 % | 9,8 % → 8,3 % | no |
| bajista y justa | 2 | -3,1 % | 0 % | 0 % | 0 % | 0 % | -1,6 % → -0,5 % | -2,4 % → 2,9 % | pocos datos |

## Señales de venta (no pasan el filtro de mantener)

### Todos (decide): 457 publicaciones con señal de venta viva (43 empresas)

| Ventas | n | Salto mediano por esperar | Sube | Sube ≥ 5 % | Cae ≥ 10 % | Rent. 3 m antes → después | ¿Esperar? |
|---|--:|--:|--:|--:|--:|--:|---|
| todas | 457 | 0,1 % | 50 % | 20 % | 7 % | 1,6 % → 2,1 % | no |
| tendencia alcista | 252 | 0,1 % | 50 % | 19 % | 5 % | 1,3 % → 1,8 % | no |
| lateral | 71 | 0,7 % | 56 % | 18 % | 4 % | 1,6 % → 2,0 % | no |
| bajista | 131 | -0,4 % | 47 % | 24 % | 11 % | 1,9 % → 3,0 % | no |

### Validación: 210 publicaciones con señal de venta viva (19 empresas)

| Ventas | n | Salto mediano por esperar | Sube | Sube ≥ 5 % | Cae ≥ 10 % | Rent. 3 m antes → después | ¿Esperar? |
|---|--:|--:|--:|--:|--:|--:|---|
| todas | 210 | -0,6 % | 46 % | 20 % | 7 % | 0,8 % → 1,0 % | no |
| tendencia alcista | 115 | -0,6 % | 45 % | 21 % | 6 % | 0,2 % → 0,5 % | no |
| lateral | 38 | -1,0 % | 50 % | 16 % | 8 % | -0,1 % → 0,7 % | no |
| bajista | 57 | -0,4 % | 44 % | 21 % | 9 % | 4,0 % → 3,0 % | no |

### Diseño: 247 publicaciones con señal de venta viva (24 empresas)

| Ventas | n | Salto mediano por esperar | Sube | Sube ≥ 5 % | Cae ≥ 10 % | Rent. 3 m antes → después | ¿Esperar? |
|---|--:|--:|--:|--:|--:|--:|---|
| todas | 247 | 0,6 % | 54 % | 20 % | 6 % | 2,0 % → 2,7 % | no |
| tendencia alcista | 137 | 0,6 % | 54 % | 17 % | 4 % | 1,7 % → 2,2 % | no |
| lateral | 33 | 1,7 % | 64 % | 21 % | 0 % | 5,7 % → 4,3 % | sí |
| bajista | 74 | -0,4 % | 49 % | 26 % | 12 % | 1,5 % → 3,2 % | no |
