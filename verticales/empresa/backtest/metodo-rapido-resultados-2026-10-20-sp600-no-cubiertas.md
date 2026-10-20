# Backtest del método value rápido · resultados (2026-10-20)

Estudio. **No cambia el método vigente.** Protocolo fijado antes: `metodo-rapido-preregistro-2026-10-20.md`. Script: `herramientas/backtest-metodo-rapido.mjs`.
Decisión 1 día hábil después de publicar las cuentas; rentabilidad total a 12 meses; índice SPY (EE. UU.) o el del mercado. BPA ingenuo (decide).

**Conjunto US**: 155 empresas (muestra sp600-no-cubiertas), 1324 decisiones (2012-2025). **Nuestras**: 0 empresas, 0 decisiones.

## 1. US, todas las decisiones

| Grupo | n | Media | Mediana | Exceso medio | Exceso mediano | Bate al índice | ≥ +15 % | < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|
| A | 29 | 16,5 % | 11,3 % | 2,3 % | -2,6 % | 48 % | 45 % | 34 % |
| B1 | 21 | 9,9 % | 0,4 % | -6,5 % | -7,3 % | 33 % | 33 % | 33 % |
| B2 | 38 | 10,1 % | 1,4 % | -6,3 % | -13,4 % | 34 % | 39 % | 26 % |
| C | 9 | 24,3 % | 38,2 % | 11,2 % | 14,5 % | 67 % | 67 % | 33 % |
| Compra sin calidad | 132 | 13,7 % | 5,6 % | -2,5 % | -7,2 % | 44 % | 40 % | 27 % |
| Mantener | 307 | 12,6 % | 9,0 % | -3,1 % | -4,2 % | 45 % | 41 % | 28 % |
| Vender | 788 | 11,1 % | 5,7 % | -2,8 % | -8,1 % | 40 % | 36 % | 24 % |
| Todas | 1324 | 11,9 % | 6,1 % | -2,8 % | -7,0 % | 41 % | 38 % | 26 % |

## 2. US, validación por empresas (mitad de validación)

| Grupo | n | Media | Mediana | Exceso medio | Exceso mediano | Bate al índice | ≥ +15 % | < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|
| A | 14 | 2,7 % | 5,1 % | -7,6 % | -6,6 % | 50 % | 29 % | 36 % |
| B1 | 13 | 18,3 % | 13,4 % | 0,7 % | -5,1 % | 31 % | 46 % | 15 % |
| B2 | 18 | 0,7 % | -4,4 % | -15,0 % | -19,0 % | 17 % | 28 % | 33 % |
| C | 4 | 26,8 % | 40,4 % | 16,3 % | 22,7 % | 75 % | 75 % | 25 % |
| Compra sin calidad | 86 | 15,0 % | 8,3 % | -0,4 % | -1,7 % | 48 % | 43 % | 22 % |
| Mantener | 181 | 14,6 % | 9,1 % | -1,5 % | -0,6 % | 49 % | 42 % | 23 % |
| Vender | 393 | 11,7 % | 7,5 % | -1,9 % | -6,5 % | 42 % | 38 % | 22 % |
| Todas | 709 | 12,6 % | 7,7 % | -1,9 % | -5,2 % | 44 % | 39 % | 23 % |

## 3. US, por tiempo

**Ajuste 2012-2018**

| Grupo | n | Media | Mediana | Exceso medio | Exceso mediano | Bate al índice | ≥ +15 % | < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|
| A | 11 | 1,6 % | 5,1 % | -8,7 % | 0,6 % | 55 % | 27 % | 45 % |
| B1 | 9 | 4,1 % | 0,4 % | -8,9 % | -7,3 % | 22 % | 33 % | 44 % |
| B2 | 18 | 3,1 % | -3,6 % | -12,6 % | -14,7 % | 28 % | 33 % | 33 % |
| C | 2 | 8,3 % | 8,3 % | -6,4 % | -6,4 % | 50 % | 50 % | 50 % |
| Compra sin calidad | 59 | 22,6 % | 21,1 % | 6,9 % | 5,8 % | 59 % | 56 % | 17 % |
| Mantener | 101 | 18,2 % | 11,9 % | 3,5 % | 1,2 % | 50 % | 44 % | 19 % |
| Vender | 353 | 11,5 % | 6,9 % | -0,2 % | -5,2 % | 43 % | 38 % | 21 % |
| Todas | 553 | 13,3 % | 9,0 % | 0,5 % | -2,7 % | 45 % | 41 % | 21 % |

**Validación 2019-2025**

| Grupo | n | Media | Mediana | Exceso medio | Exceso mediano | Bate al índice | ≥ +15 % | < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|
| A | 18 | 25,6 % | 21,2 % | 9,0 % | -5,4 % | 44 % | 56 % | 28 % |
| B1 | 12 | 14,3 % | 4,5 % | -4,7 % | -14,0 % | 42 % | 33 % | 25 % |
| B2 | 20 | 16,5 % | 7,2 % | -0,6 % | -7,8 % | 40 % | 45 % | 20 % |
| C | 7 | 28,9 % | 42,7 % | 16,3 % | 30,9 % | 71 % | 71 % | 29 % |
| Compra sin calidad | 73 | 6,6 % | -3,2 % | -10,0 % | -20,9 % | 32 % | 27 % | 34 % |
| Mantener | 206 | 9,9 % | 6,6 % | -6,4 % | -6,0 % | 42 % | 40 % | 32 % |
| Vender | 435 | 10,7 % | 4,8 % | -4,9 % | -10,2 % | 37 % | 35 % | 26 % |
| Todas | 771 | 10,8 % | 4,6 % | -5,1 % | -9,7 % | 39 % | 37 % | 29 % |

## 4. US sin calidad (solo números)

| Grupo | n | Media | Mediana | Exceso medio | Exceso mediano | Bate al índice | ≥ +15 % | < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|
| Números A | 157 | 14,2 % | 5,1 % | -1,6 % | -8,6 % | 42 % | 40 % | 27 % |
| Números B | 72 | 12,1 % | 9,7 % | -3,9 % | -1,9 % | 44 % | 43 % | 31 % |
| Mantener | 307 | 12,6 % | 9,0 % | -3,1 % | -4,2 % | 45 % | 41 % | 28 % |
| Vender | 788 | 11,1 % | 5,7 % | -2,8 % | -8,1 % | 40 % | 36 % | 24 % |
| Todas | 1324 | 11,9 % | 6,1 % | -2,8 % | -7,0 % | 41 % | 38 % | 26 % |

## 5. Nuestras (sin calidad con fecha)

| Grupo | n | Media | Mediana | Exceso medio | Exceso mediano | Bate al índice | ≥ +15 % | < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|
| Todas | 0 | 0,0 % | 0,0 % | 0,0 % | 0,0 % | 0 % | 0 % | 0 % |

## 6. Año a año (US): exceso mediano frente al SPY

| Año de decisión | Números A (n) | Números A | Números B | Mantener | Vender | Todas |
|---|--:|--:|--:|--:|--:|--:|
| 2012 | 3 | 12,7 % | 3,6 % | 6,1 % | -0,0 % | 8,6 % |
| 2013 | 9 | 6,3 % | -2,1 % | -0,7 % | -7,0 % | -4,5 % |
| 2014 | 11 | -8,3 % | 0,0 % | -0,9 % | -4,7 % | -4,7 % |
| 2015 | 7 | 1,8 % | 13,8 % | 2,6 % | -1,9 % | 1,5 % |
| 2016 | 15 | 2,6 % | 12,7 % | 15,4 % | 9,1 % | 10,8 % |
| 2017 | 14 | -7,3 % | -25,9 % | -11,1 % | -11,9 % | -11,9 % |
| 2018 | 15 | -15,8 % | 8,5 % | -1,3 % | -0,0 % | -1,2 % |
| 2019 | 12 | -20,4 % | -22,0 % | -26,8 % | -16,5 % | -19,7 % |
| 2020 | 9 | 38,9 % | 11,7 % | -2,3 % | -2,3 % | -0,3 % |
| 2021 | 4 | -9,1 % | -22,1 % | 1,1 % | -3,7 % | -3,3 % |
| 2022 | 17 | -1,1 % | 11,0 % | -0,4 % | 2,2 % | 1,8 % |
| 2023 | 21 | -8,2 % | -35,1 % | -31,6 % | -22,4 % | -24,8 % |
| 2024 | 12 | -25,0 % | -27,5 % | 8,1 % | -14,3 % | -13,9 % |
| 2025 | 8 | -9,2 % | -19,3 % | -6,6 % | -10,2 % | -9,7 % |

## 7. Mejoras (US): exceso mediano frente al SPY · % < −10 % · n

| Variante | todas | validación (empresas) | diseño (empresas) | 2012-2018 | 2019-2025 |
|---|--:|--:|--:|--:|--:|
| Vigente (números A, 15/12, ×1,1) | -8,6 % · 27 % · 157 | -11,1 % · 26 % · 93 | -7,6 % · 30 % · 64 | -2,5 % · 27 % · 74 | -13,5 % · 28 % · 83 |
| 1a. Umbral 20/15 | -3,6 % · 20 % · 20 | -18,2 % · 22 % · 9 | 1,4 % · 18 % · 11 | 7,6 % · 17 % · 6 | -16,9 % · 21 % · 14 |
| 1b. Umbral 10/8 | -6,6 % · 28 % · 206 | -6,0 % · 24 % · 119 | -8,2 % · 32 % · 87 | 0,6 % · 26 % · 93 | -12,2 % · 29 % · 113 |
| 2a. Tope ×1,0 | -8,6 % · 27 % · 137 | -13,2 % · 27 % · 81 | -2,1 % · 27 % · 56 | 0,6 % · 29 % · 66 | -13,9 % · 25 % · 71 |
| 2b. Tope ×1,2 | -8,6 % · 27 % · 157 | -11,1 % · 26 % · 93 | -7,6 % · 30 % · 64 | -2,5 % · 27 % · 74 | -13,5 % · 28 % · 83 |
| 3. g máx. +15 % | 13,0 % · 0 % · 3 | 13,0 % · 0 % · 1 | 21,9 % · 0 % · 2 | 13,0 % · 0 % · 1 | 21,9 % · 0 % · 2 |
| 4. Números A + calidad completa | -2,6 % · 34 % · 29 | -6,6 % · 36 % · 14 | -2,6 % · 33 % · 15 | 0,6 % · 45 % · 11 | -5,4 % · 28 % · 18 |
| 5. El 20 % con más ponderada cada año | -6,4 % · 29 % · 272 | -6,0 % · 24 % · 148 | -12,5 % · 37 % · 128 | -1,6 % · 26 % · 114 | -8,7 % · 32 % · 158 |

**Veredicto con el criterio fijado** (mejora el exceso mediano en validación por empresas Y en 2019-2025, sin subir las pérdidas > 10 % más de 3 puntos):

- 1a. Umbral 20/15: no pasa (validación empresas -18,2 frente a -11,1; 2019-2025 -16,9 frente a -13,5)
- 1b. Umbral 10/8: **pasa** (validación empresas -6,0 frente a -11,1; 2019-2025 -12,2 frente a -13,5)
- 2a. Tope ×1,0: no pasa (validación empresas -13,2 frente a -11,1; 2019-2025 -13,9 frente a -13,5)
- 2b. Tope ×1,2: no pasa (validación empresas -11,1 frente a -11,1; 2019-2025 -13,5 frente a -13,5)
- 3. g máx. +15 %: **pasa** (validación empresas 13,0 frente a -11,1; 2019-2025 21,9 frente a -13,5)
- 4. Números A + calidad completa: no pasa (validación empresas -6,6 frente a -11,1; 2019-2025 -5,4 frente a -13,5)
- 5. El 20 % con más ponderada cada año: no pasa (validación empresas -6,0 frente a -11,1; 2019-2025 -8,7 frente a -13,5)
- 6. ¿Vender sirve? Exceso mediano Vender -8,1 % frente a Mantener -4,2 % (validación empresas: -6,5 frente a -0,6; 2019-2025: -10,2 frente a -6,0).

## 8. Números A por sector (US)

| Sector | n | Exceso mediano | < −10 % |
|---|--:|--:|--:|
| Consumer Discretionary | 43 | -13,7 % | 30 % |
| Industrials | 37 | -8,6 % | 30 % |
| Financials | 23 | 6,3 % | 17 % |
| Real Estate | 14 | -15,9 % | 14 % |
| Consumer Staples | 11 | -15,1 % | 45 % |
| Information Technology | 9 | -12,5 % | 44 % |
| Energy | 8 | -21,2 % | 38 % |
| Health Care | 5 | -13,9 % | 20 % |
| Materials | 5 | 24,6 % | 0 % |
| Communication Services | 2 | 0,9 % | 0 % |
