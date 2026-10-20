# Backtest del método value rápido · resultados (2026-10-20)

Estudio. **No cambia el método vigente.** Protocolo fijado antes: `metodo-rapido-preregistro-2026-10-20.md`. Script: `herramientas/backtest-metodo-rapido.mjs`.
Decisión 1 día hábil después de publicar las cuentas; rentabilidad total a 12 meses; índice SPY (EE. UU.) o el del mercado. BPA ingenuo (decide).

**Conjunto US**: 491 empresas del S&P 500/400 de hoy, 5081 decisiones (2012-2025). **Nuestras**: 183 empresas, 462 decisiones.

## 1. US, todas las decisiones

| Grupo | n | Media | Mediana | Exceso medio | Exceso mediano | Bate al índice | ≥ +15 % | < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|
| A | 153 | 21,5 % | 19,3 % | 5,9 % | 0,9 % | 52 % | 54 % | 18 % |
| B1 | 109 | 19,0 % | 14,6 % | 2,3 % | -0,1 % | 50 % | 49 % | 16 % |
| B2 | 90 | 19,9 % | 13,8 % | 3,1 % | -4,5 % | 43 % | 47 % | 24 % |
| C | 42 | 26,3 % | 19,5 % | 11,1 % | 2,0 % | 55 % | 55 % | 14 % |
| Compra sin calidad | 465 | 15,3 % | 11,9 % | 0,2 % | -2,0 % | 46 % | 46 % | 21 % |
| Mantener | 1030 | 15,5 % | 13,0 % | -0,4 % | -1,7 % | 47 % | 47 % | 17 % |
| Vender | 3192 | 16,1 % | 13,7 % | 2,0 % | 0,4 % | 51 % | 48 % | 16 % |
| Todas | 5081 | 16,3 % | 13,6 % | 1,6 % | -0,2 % | 50 % | 48 % | 17 % |

## 2. US, validación por empresas (mitad de validación)

| Grupo | n | Media | Mediana | Exceso medio | Exceso mediano | Bate al índice | ≥ +15 % | < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|
| A | 84 | 19,5 % | 20,6 % | 3,9 % | 0,9 % | 52 % | 55 % | 21 % |
| B1 | 55 | 17,7 % | 14,7 % | 2,7 % | 1,6 % | 53 % | 49 % | 11 % |
| B2 | 51 | 20,0 % | 12,2 % | 3,8 % | -5,3 % | 41 % | 43 % | 25 % |
| C | 22 | 14,0 % | 15,4 % | -0,6 % | 2,6 % | 64 % | 50 % | 18 % |
| Compra sin calidad | 216 | 15,4 % | 8,8 % | 0,5 % | -1,8 % | 47 % | 44 % | 20 % |
| Mantener | 490 | 14,6 % | 11,4 % | -0,9 % | -1,9 % | 45 % | 46 % | 18 % |
| Vender | 1577 | 17,1 % | 14,4 % | 2,8 % | 0,2 % | 51 % | 49 % | 15 % |
| Todas | 2495 | 16,6 % | 13,7 % | 1,9 % | -0,4 % | 49 % | 48 % | 17 % |

## 3. US, por tiempo

**Ajuste 2012-2018**

| Grupo | n | Media | Mediana | Exceso medio | Exceso mediano | Bate al índice | ≥ +15 % | < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|
| A | 76 | 21,8 % | 17,8 % | 6,2 % | 1,1 % | 51 % | 55 % | 17 % |
| B1 | 43 | 19,2 % | 13,9 % | 5,3 % | -0,1 % | 49 % | 47 % | 14 % |
| B2 | 36 | 30,3 % | 17,0 % | 14,7 % | -0,7 % | 50 % | 53 % | 11 % |
| C | 15 | 18,6 % | 22,5 % | 5,3 % | 2,5 % | 53 % | 60 % | 13 % |
| Compra sin calidad | 206 | 17,5 % | 16,1 % | 3,0 % | 0,9 % | 52 % | 53 % | 17 % |
| Mantener | 348 | 19,1 % | 17,3 % | 3,7 % | 2,3 % | 54 % | 53 % | 12 % |
| Vender | 1504 | 15,7 % | 14,9 % | 3,3 % | 2,1 % | 56 % | 50 % | 13 % |
| Todas | 2228 | 16,9 % | 15,4 % | 3,7 % | 1,9 % | 55 % | 51 % | 14 % |

**Validación 2019-2025**

| Grupo | n | Media | Mediana | Exceso medio | Exceso mediano | Bate al índice | ≥ +15 % | < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|
| A | 77 | 21,2 % | 19,9 % | 5,7 % | 0,9 % | 52 % | 53 % | 18 % |
| B1 | 66 | 18,8 % | 15,0 % | 0,4 % | -1,0 % | 50 % | 50 % | 17 % |
| B2 | 54 | 12,9 % | 5,5 % | -4,7 % | -12,9 % | 39 % | 43 % | 33 % |
| C | 27 | 30,6 % | 17,5 % | 14,4 % | 1,5 % | 56 % | 52 % | 15 % |
| Compra sin calidad | 259 | 13,5 % | 8,9 % | -2,0 % | -5,5 % | 42 % | 40 % | 25 % |
| Mantener | 682 | 13,6 % | 11,4 % | -2,5 % | -4,0 % | 43 % | 44 % | 20 % |
| Vender | 1688 | 16,4 % | 12,8 % | 0,8 % | -2,0 % | 46 % | 46 % | 17 % |
| Todas | 2853 | 15,7 % | 12,0 % | -0,1 % | -2,8 % | 45 % | 46 % | 19 % |

## 4. US sin calidad (solo números)

| Grupo | n | Media | Mediana | Exceso medio | Exceso mediano | Bate al índice | ≥ +15 % | < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|
| Números A | 543 | 16,7 % | 12,4 % | 1,3 % | -3,2 % | 45 % | 46 % | 23 % |
| Números B | 316 | 19,9 % | 15,3 % | 4,1 % | 1,1 % | 53 % | 51 % | 15 % |
| Mantener | 1030 | 15,5 % | 13,0 % | -0,4 % | -1,7 % | 47 % | 47 % | 17 % |
| Vender | 3192 | 16,1 % | 13,7 % | 2,0 % | 0,4 % | 51 % | 48 % | 16 % |
| Todas | 5081 | 16,3 % | 13,6 % | 1,6 % | -0,2 % | 50 % | 48 % | 17 % |

## 5. Nuestras (sin calidad con fecha)

| Grupo | n | Media | Mediana | Exceso medio | Exceso mediano | Bate al índice | ≥ +15 % | < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|
| Números A | 66 | 14,5 % | 7,6 % | 0,5 % | -2,2 % | 47 % | 39 % | 32 % |
| Números B | 34 | 23,1 % | 5,4 % | 4,8 % | -5,4 % | 38 % | 41 % | 21 % |
| Mantener | 98 | 17,3 % | 6,4 % | -0,8 % | -6,1 % | 43 % | 43 % | 31 % |
| Vender | 264 | 19,3 % | 8,2 % | 4,0 % | -3,6 % | 44 % | 44 % | 25 % |
| Todas | 462 | 18,5 % | 7,1 % | 2,5 % | -3,9 % | 44 % | 43 % | 27 % |

## 6. Año a año (US): exceso mediano frente al SPY

| Año de decisión | Números A (n) | Números A | Números B | Mantener | Vender | Todas |
|---|--:|--:|--:|--:|--:|--:|
| 2012 | 11 | 4,0 % | 7,0 % | 0,7 % | 0,0 % | 1,7 % |
| 2013 | 52 | 4,0 % | 1,1 % | -2,2 % | -0,2 % | 0,0 % |
| 2014 | 33 | -2,0 % | 0,3 % | 0,8 % | 3,1 % | 2,4 % |
| 2015 | 28 | -3,3 % | -4,3 % | 0,2 % | 4,4 % | 3,6 % |
| 2016 | 43 | 2,5 % | 9,3 % | 3,9 % | 0,5 % | 1,5 % |
| 2017 | 30 | -7,7 % | -5,1 % | 6,3 % | 1,5 % | 0,9 % |
| 2018 | 52 | 1,2 % | 7,9 % | 6,4 % | 3,4 % | 4,4 % |
| 2019 | 60 | -12,4 % | -5,9 % | -5,4 % | 1,1 % | -3,7 % |
| 2020 | 36 | -8,1 % | 2,2 % | -2,6 % | -5,5 % | -4,3 % |
| 2021 | 25 | -5,2 % | 2,1 % | 5,7 % | 0,2 % | 1,2 % |
| 2022 | 58 | 1,3 % | 10,4 % | 4,3 % | 4,0 % | 4,6 % |
| 2023 | 55 | -15,6 % | -1,8 % | -16,5 % | -13,4 % | -14,0 % |
| 2024 | 32 | 2,7 % | -12,7 % | -6,8 % | -3,7 % | -4,5 % |
| 2025 | 28 | -15,1 % | -0,9 % | -3,7 % | 2,5 % | 0,3 % |

## 7. Mejoras (US): exceso mediano frente al SPY · % < −10 % · n

| Variante | todas | validación (empresas) | diseño (empresas) | 2012-2018 | 2019-2025 |
|---|--:|--:|--:|--:|--:|
| Vigente (números A, 15/12, ×1,1) | -3,2 % · 23 % · 543 | -2,2 % · 24 % · 277 | -3,5 % · 22 % · 266 | -1,0 % · 16 % · 249 | -7,3 % · 28 % · 294 |
| 1a. Umbral 20/15 | -4,3 % · 26 % · 114 | -6,0 % · 30 % · 56 | -4,2 % · 22 % · 58 | -4,3 % · 23 % · 62 | -3,5 % · 31 % · 52 |
| 1b. Umbral 10/8 | -2,0 % · 21 % · 779 | -1,2 % · 20 % · 386 | -2,8 % · 21 % · 393 | 0,2 % · 16 % · 350 | -5,2 % · 24 % · 429 |
| 2a. Tope ×1,0 | -4,7 % · 23 % · 445 | -6,1 % · 24 % · 225 | -4,2 % · 22 % · 220 | -1,9 % · 17 % · 196 | -8,1 % · 28 % · 249 |
| 2b. Tope ×1,2 | -3,2 % · 23 % · 544 | -2,2 % · 24 % · 277 | -3,5 % · 22 % · 267 | -0,9 % · 16 % · 250 | -7,3 % · 28 % · 294 |
| 3. g máx. +15 % | 3,9 % · 8 % · 13 | 2,7 % · 17 % · 6 | 12,5 % · 0 % · 7 | 29,0 % · 0 % · 6 | 3,9 % · 14 % · 7 |
| 4. Números A + calidad completa | 0,9 % · 18 % · 153 | 0,9 % · 21 % · 84 | 1,2 % · 13 % · 69 | 1,1 % · 17 % · 76 | 0,9 % · 18 % · 77 |
| 5. El 20 % con más ponderada cada año | -1,0 % · 20 % · 1022 | -2,1 % · 21 % · 503 | -0,6 % · 20 % · 522 | 1,1 % · 17 % · 448 | -3,2 % · 23 % · 574 |

**Veredicto con el criterio fijado** (mejora el exceso mediano en validación por empresas Y en 2019-2025, sin subir las pérdidas > 10 % más de 3 puntos):

- 1a. Umbral 20/15: no pasa (validación empresas -6,0 frente a -2,2; 2019-2025 -3,5 frente a -7,3)
- 1b. Umbral 10/8: **pasa** (validación empresas -1,2 frente a -2,2; 2019-2025 -5,2 frente a -7,3)
- 2a. Tope ×1,0: no pasa (validación empresas -6,1 frente a -2,2; 2019-2025 -8,1 frente a -7,3)
- 2b. Tope ×1,2: no pasa (validación empresas -2,2 frente a -2,2; 2019-2025 -7,3 frente a -7,3)
- 3. g máx. +15 %: **pasa** (validación empresas 2,7 frente a -2,2; 2019-2025 3,9 frente a -7,3)
- 4. Números A + calidad completa: **pasa** (validación empresas 0,9 frente a -2,2; 2019-2025 0,9 frente a -7,3)
- 5. El 20 % con más ponderada cada año: **pasa** (validación empresas -2,1 frente a -2,2; 2019-2025 -3,2 frente a -7,3)
- 6. ¿Vender sirve? Exceso mediano Vender 0,4 % frente a Mantener -1,7 % (validación empresas: 0,2 frente a -1,9; 2019-2025: -2,0 frente a -4,0).

## 8. Números A por sector (US)

| Sector | n | Exceso mediano | < −10 % |
|---|--:|--:|--:|
| Real Estate | 92 | -10,3 % | 23 % |
| Industrials | 83 | -0,3 % | 17 % |
| Consumer Discretionary | 78 | -4,0 % | 27 % |
| Information Technology | 70 | 3,6 % | 19 % |
| Financials | 61 | 0,0 % | 21 % |
| Health Care | 39 | -1,0 % | 21 % |
| Energy | 34 | -17,5 % | 38 % |
| Communication Services | 30 | -0,6 % | 23 % |
| Materials | 28 | -13,0 % | 29 % |
| Utilities | 21 | -1,0 % | 14 % |
| Consumer Staples | 7 | 0,7 % | 43 % |
