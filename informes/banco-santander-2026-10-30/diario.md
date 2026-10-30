# Diario: Banco Santander (SAN), análisis value del 30-oct-2026 (iteración 2, tras el 3T26)

- Petición de Hotis (30-oct, 14:47 Madrid): «Santander que tenemos? Vale la pena repetir ejercicio?»; tras la respuesta, «Lanzalo si» (15:05). Commit de partida: `4c78453`.
- Iteración nueva de `informes/banco-santander-2026-10-27/` (sin tocarla): el 3T26 salió el 28-oct, un día después de aquel corte, y el precio bajó ≈ 8 % (parte, el dividendo a cuenta).
- **Es un banco y el motor no tiene modelo de bancos.** Mismas adaptaciones que el 27-oct (calidad = RoTE ordinario − Ke; valor = exceso de rentabilidad sobre el VTC en `valoracion-banco.md`; DCF del motor de contraste con peso 0).
- Notas: A, B y D las escribe el analista con `notas/construir-notas.mjs` (partiendo del script del 27-oct, cada dato vuelto a comprobar con el 3T26); **C (gobierno) y E (sentimiento) con dos subagentes** (en el 27-oct quedaron pobres: gobierno sin consejo, votos ni remuneración; sentimiento sin foros). Clave del repo `SAN.MC`.

## Decisiones

1. **Precio: 10,512 €, cierre del 29-oct-2026** (`bolsa.mjs`), ya sin el dividendo a cuenta de 0,127 € (ex el 29-oct). La sesión del 30-oct seguía abierta (≈ 10,2-10,3 €); `robustez.mjs --actual` (10,32 €) no cambia la acción.
2. **Cuenta ordinaria del Informe Financiero del 3T26** (6-K en la SEC del 28-oct; santander.com sigue bloqueada): beneficio ordinario 9M26 11.176 M (+16 %), 3T26 3.848 M (+19 %); RoTE ordinario 16,0 % (9M) y 16,8 % (3T); BPA ordinario 0,74 € (9M) y 0,26 (3T, ≈ 2 céntimos sobre el consenso); CET1 12,7 % (−147 p.b. por Webster); morosidad 2,90 %, coste del riesgo 1,16 % (Argentina 10,80 %, Brasil 4,25 %); eficiencia 42,6 %.
3. **VTC de partida = 5,92 € publicado a 30-sep** (ya con Webster y neto del dividendo a cuenta). El 27-oct se estimaba 6,08 € pro forma: el real es 0,16 € más bajo.
4. **Ke 11,83 %** = Bund 3,42 % (Bundesbank, 29-oct) + beta 1,20 (mensual 5 años frente al STOXX 600, `bolsa.mjs`; era 1,24) × 5,5 % + prima país ponderada **1,81** con los pesos del beneficio ordinario de 9M26 (Brasil 13,3 %, Argentina 2,8 %). Sin prima país 10,02 %; con Damodaran 10,27 %; Brasil tras el 26-oct 12,16 %.
5. **Calidad = RoTE ordinario − Ke: 4,17 (9M26)**, 3,37 (2025); el 3T26 aislado 4,97. **No pasa el 4,5** (el 27-oct: 3,54). Pasaría con un RoTE anual ≈ 16,3 %. Sin prima país, 5,98.
6. **Caso base de RoTE**: año 1 (oct-26 a sep-27) del 16,5 % (16,0 el 27-oct) y año 2 del 17,0 % (16,8); resto igual. **Valor: base 9,97 €, ponderado 9,82 €** (bajista 7,46, alcista 11,89); P/VTC justificado 1,59x (9,39 €) frente a 1,78x en bolsa; Ke implícito 11,4 %.
7. **BPA**: 2026e 1,01 (9M real 0,74 + 4T ≈ 0,27), 2027e 1,17; 2028e sin cambios (1,05 / 1,28 / 1,43). Acciones 14.406 M (14.556 − 150,6 M de la recompra de 1.825 M terminada el 28-oct).
8. **Caída del 28-oct (−5,6 %)**, según la nota E: beneficio por encima del consenso, pero ingresos ≈ 370 M y margen de intereses por debajo, provisiones +22 % (Argentina), Brasil −15 % en euros y CET1 del 12,7 % bajo el rango; el sector solo −0,6 %. 29-oct −1,2 % = dividendo. 30-oct ≈ −3 % (rebaja de Erste; sin otra causa confirmada). `bolsa.contexto`: «no cambia».
9. **Gobierno (nota C, 20-F 2025 y CNMV)**: 15 consejeros, 10 independientes; remuneración 2025 de Botín 14,78 M € y Grisi 11,43 M €; política de remuneraciones de 2024 con un 25,2 % en contra; votos de 2026 sin porcentajes (hueco). Directivos: ventas de ≈ 17,8 M € en 12 meses; las sociedades de Ana Botín compraron 300.000 acciones el 29-oct.
10. Convicción baja (el motor sugiere Media): la regla tira de la historia de tipos negativos (v3 y v2 a 18 puntos) y la calidad queda a 0,3 puntos del suelo; explicado en la síntesis.

## Resultado

- Regla a 12 meses (v3): ponderada **−6,1 %**, base **+2,2 %**, objetivo 9,63 € → Mantener por la regla, **no pasa el filtro de mantener → «No mantener»** (filtro hasta 8,97 €; banda Vender > 10,97 €). v2 −23,9 % / −27,1 %. Sin doble castigo −0,4 %. BPA −10 %: −15,2 % / −7,8 %. Con el precio de la sesión (10,32 €): −4,3 % / +4,1 %, misma acción.
- Valor intrínseco 9,82 € (−6,6 %); DCF adaptado 10,58 (+0,6 %).
- Robustez: **SÓLIDA, «No mantener»; compra robusta: no** (calidad). Límites en EUR: comprar ≤ 8,58 (robusto 6,84) solo si pasara la calidad; filtro de mantener 8,97.
- Controles: 21 de 25 correctos y 4 explicados (actividades interrumpidas de Polonia y BPA con AT1).
- **Conclusión: la misma que el 27-oct.** Mejora la calidad (3,5 → 4,2) y baja el precio (11,15 → 10,51), pero ni pasa la calidad ni llega el precio al de compra.

## Pasos y fecha de los datos (hora de Madrid)

| Paso | Herramienta o fuente | Fecha del dato | Hecho |
|---|---|---|---|
| Cuentas oficiales | ESEF 2021-2025 (`cuentas-xbrl.json` del 27-oct, sin cambios: no hay cuentas anuales nuevas) | 2025 | 30-oct 15:08 |
| Documentos primarios | 6-K en la SEC: Informe Financiero, nota de prensa y presentación del 3T26; fin de la recompra de 1.825 M; SREP 2027 | 28-oct-2026 | 30-oct 15:09 |
| Datos de bolsa y movimiento (regla 13) | `bolsa.mjs` (SAN.MC frente a ^IBEX, EXV1.DE, beta frente a ^STOXX), `movimiento.mjs SAN.MC` | cierre del 29-oct (movimiento con la sesión del 30-oct) | 30-oct 15:12 |
| Consenso y comparables | `notas/yahoo-datos.mjs` (Yahoo) | 30-oct-2026 | 30-oct 15:12 |
| Tasa libre | Bundesbank (Bund 10 años, 3,42 % el 29-oct) | 29-oct-2026 | 30-oct 15:16 |
| Valoración bancaria | `notas/valoracion-banco.mjs` → `valoracion-banco.md` | corte 30-oct-2026 | 30-oct 15:18 |
| Notas C y E | subagentes (20-F 2025, CNMV, prensa y foros) | hasta el 30-oct-2026 | 30-oct 15:20 |
| Notas A, B y D | `notas/construir-notas.mjs` | corte 30-oct-2026 | 30-oct 15:21 |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 30-oct-2026 | 30-oct 15:22 |
| Word y PDF | `motor/rellenar.mjs`, `soffice` | 30-oct-2026 | 30-oct 15:22 |
| Robustez | `robustez.mjs` y `--actual` (10,32 € en sesión) | cierre del 29-oct | 30-oct 15:23 |
| Revisión a 12 meses | `apuntar-12m.mjs --precios` (SAN.MC), `simbolos.json` → carpeta nueva, `comprobar.mjs` (0 errores) | cierre del 29-oct | 30-oct 15:25 |

Revisión a 12 meses: `revision-12m-2026-10-30.md` (v3 −6,1 % / base +2,2 %, No mantener; marca «¡REVISAR!» por la distancia v3-v2).
