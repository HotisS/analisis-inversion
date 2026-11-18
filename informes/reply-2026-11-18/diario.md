# Diario: Reply (REY.MI), análisis value del 18-nov-2026

- Commit de partida: `254cbac` («Nvidia 18-nov: análisis value tras los resultados del 3T FY27»). Checkout compartido con otros 9 agentes (tanda del 18-nov): sin pull, commit, push, checkout ni stash; `apuntar-12m.mjs` y `robustez.mjs` con `flock /tmp/tanda-1118.lock`.
- Motivo: Reply publicó el 3T26 (nueve meses) el 12-nov, después del informe del 21-oct, y estaba a −3,0 % de su límite B (124,08 EUR).
- Sin subagentes: fases A-E hechas por el analista, con el mismo esquema de notas que el informe anterior (`notas/construir-notas.mjs` → A-E, `propio.mjs`, `supuestos.mjs`, `textos.mjs`), con cada cifra que cambia comprobada de nuevo.

## Horas (Madrid, `TZ=Europe/Madrid date +%H:%M`; el reloj del contenedor avanzó poco durante la sesión)

| Paso | Hora |
|---|---|
| Inicio, lectura del procedimiento, prompt, lecciones y método | 12:21 |
| `cuentas.mjs --esef` (LEI), `bolsa.mjs`, `movimiento.mjs`, `noticias.mjs` | 12:22 |
| Informe de nueve meses, nota de prensa y transcripción del 3T26 | 12:23-12:25 |
| Notas A-E reconstruidas, consenso y comparables de Yahoo | 12:26 |
| Supuestos, BPA, integrar y primer cálculo | 12:27 |
| Textos, Word y PDF | 12:28-12:30 |
| `apuntar-12m.mjs --precios`, `robustez.mjs --actual`, `comprobar.mjs` | 12:31 |

## Fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas oficiales 2020-2025 | `cuentas.mjs --esef 815600DAEFB0388F3521` (filings.xbrl.org) | Informe anual 2025 (cierre 31-dic-2025); sin XBRL trimestral |
| Resultados leídos | Interim Management Report at 30 September 2026, nota de prensa y transcripción de la conferencia del 3T26 | 12-nov-2026 (datos a 30-sep-2026) |
| Semestral (balance, TFR, earn-out de junio, acciones) | Half-Year Financial Report 2026; recompra de julio (comunicado del 3-ago) | 30-jun / 31-jul-2026 |
| Precio | `bolsa.mjs` (Yahoo) | Cierre del 17-nov-2026: 127,10 EUR (la sesión del 18-nov estaba abierta: 129,70) |
| Consenso y comparables | `notas/yahoo-datos.mjs` (quoteSummary) | 18-nov-2026 (sesión abierta); fichas LTM de comparables del 21-oct |
| Analistas | Teleborsa (Intermonte, 13-nov) | 13-nov-2026 |
| Tasa libre | Bundesbank (Bund 10 años) | 17-nov-2026 (3,39 %) |
| Prima de mercado | Damodaran ERPbymonth | Nov-2026 (4,41 %) |
| Tipo de cambio | BCE | 17-nov-2026 (1,0989 USD/EUR) |
| Movimiento (regla 13) | `movimiento.mjs REY.MI` | 18-nov-2026 (129,70) |

## Decisiones

1. **Cuentas**: el XBRL ESEF trae lo mismo que el 21-oct (2020-2025); se reutiliza el cuadre con los informes anuales hecho entonces (mismas cifras en `construir-notas.mjs`). Lo nuevo sale del informe de nueve meses, que no está auditado, se para en el BAI y no trae balance completo.
2. **Ingresos NIIF frente a ingresos de gestión**: el informe de 9 meses solo da los de gestión (con subvenciones: 1.987,9 M). Las subvenciones de 9M26 no se publican: 16,4 M en el 1S (semestral) y ≈ 8 M estimados para el 3T (10,0 en el 3T25). LTM NIIF a septiembre 2.614,8 M (estimación propia, marcada).
3. **2026e fijo al +9,8 % NIIF** (antes 8,3 %): nueve meses NIIF ≈ +9,2 % y 4T al ≈ +11,5 % (perímetro ≈ 4 puntos con FedTec + orgánico 7,5 %). Intermonte: +10,0 % en ingresos de gestión. **2027e al 8,0 %** (antes 7,5 %): FedTec todo el año. Precio −0,5 en 2026-2028 (antes −1 en 2026-2027): la dirección niega tener que bajar márgenes por la IA.
4. **Margen 18,3 % sin cambios**: 9M EBITDA 354,9 M + 4T al ≈ 18,8 % ≈ 491 M (Intermonte 493,9).
5. **BPA 2026e = 7,60** (antes 7,50): bajo el EBIT −8,8 M (earn-out −13,2, financiero +5,1 con +4,5 de cambio, participadas −0,2, y ≈ −0,5 en el 4T). 2027e 8,41; 2028e 7,54 / 9,02 / 9,58 (antes 7,40 / 8,85 / 9,40).
6. **Puente a 30-sep-2026**: deuda 35,2; arrendamientos 137,7; caja + activos financieros corrientes 569,9; minoritarios 2,1, pensiones 63,1 y asociadas 11,0 (de junio, sin dato nuevo); otros_ajustes 68,2 (earn-out de junio 63,2 + 5,0 de ajuste del 3T). Ya no se ajusta la recompra de julio (la caja de septiembre la recoge). FedTec: precio y aplazado no publicados.
7. **Acciones 36,33 M** (las de 31-jul). En el 3T se gastaron 27 M en recompra (19,7 en julio); de los ≈ 7 M restantes no hay comunicado mensual: ≈ 0,15 % del capital, inmaterial. La recompra **no terminó el 23-oct** como decía el informe anterior: sigue en vigor, pero el banco no compra porque el precio está fuera de los límites del mandato (CFO, 12-nov).
8. **Historia y casos en BPA publicado** (`base_bpa: 'publicado'` en los dos sitios, añadido ahora: el informe del 21-oct no lo declaraba). PER actual = 127,10 ÷ (1,4/12 × 7,60 + 10,6/12 × 8,41) = 15,3x.
9. **WACC 8,60 %** (Bund 3,39 %, beta 0,90, prima 5,5 %, adicional 0,5 %). Terminal 2 %.
10. **Comparables**: PER NTM rehecho con el consenso de Yahoo del 18-nov (mediana 11,0x; antes 10,7x); ventas, margen y deuda de las fichas del 21-oct (no cambian la regla: solo la mediana del PER entra en el alcista, y no decide).
11. **Recomendación del informe: Comprar (regla), convicción baja**: la v3 da 21,8 % / 20,3 % y el valor intrínseco (127,89) supera en un 0,6 % al cierre (127,10). Se dice en la síntesis que a 129,70 (sesión) vuelve a ser Mantener y que la compra robusta pide 121,33 (A) o 126,85 (B).
12. **Sostenibilidad «Sí»** (motor y juicio): capital nuevo al 26,1 % frente a 21,1 % incremental (1,24 veces, al borde del 1,25); financiable 5,5 % frente a 6,2 % proyectado, cubierto por precio (no por volumen). Lo dice la justificación.
13. **Regla 13: no cambia**. La caída del 12-nov (139,10) al 17-nov (127,10), −8,6 %, no tiene noticia negativa: Intermonte subió estimaciones el 13-nov y bajó el objetivo de 195 a 185 solo por el tipo sin riesgo. Sin colocaciones ni hechos con fecha; próximos resultados a mediados de marzo de 2027. Sin avisos P1-P5.
14. **Sentimiento** = null (como el 21-oct; sin debate de particulares). No se repitió la búsqueda completa por presupuesto.

## Qué cambió frente al 21-oct

- Valor intrínseco 124,09 → **127,89 EUR** (DCF 130,97 → 134,78; escenarios 95,10/130,97/141,33 → 97,68/134,78/145,49).
- Regla v3: ponderada 21,1 % → **21,8 %**, base 21,1 % → **20,3 %**; objetivo 153,94 → **153,43**. v2 de control 12,5 % → **12,1 %** (Mantener).
- Señal del informe: Mantener → **Comprar** (al cierre de 127,10; con convicción baja). Robustez a 129,70: **frágil**, «si la tienes» Mantener, acción robusta No comprar, nivel ninguno.
- Límites: A 121,74 → **121,33**; B 124,09 → **126,85** EUR. Filtro de mantener 140,75 EUR.
- Consenso: BPA 2026/2027 7,70/8,32 → 7,77/8,51; objetivo medio 153,36 → 161,73.
- **Señal de alarma del 21-oct** (orgánico < 5 % o margen subyacente < 17 %): **no se cumple** (orgánico a tipo constante 7,5 %, margen subyacente 17,9 %). La condición para revisar al alza (3T con orgánico ≥ 7 % y margen ≥ 18 %) **se cumple** (orgánico de 9 meses 7,5 %; margen del 3T 18,0 %), aunque el margen del 3T quedó 0,7 puntos bajo el del 3T25.

## Resultado

- Regla 12 m v3: ponderada **+21,8 %**, base **+20,3 %** → Comprar (al cierre 127,10). v2 control +12,1 % / +9,6 % (apuntar-12m: 12,2 %) → Mantener.
- Con la sesión (`robustez.mjs --actual`, 129,70): v3 19,4 % / 17,9 % → Mantener (valor intrínseco < precio); v2 9,9 %.
- Valor intrínseco 127,89 EUR; con la prima del mercado 147,18. DCF inverso 3,5 % frente a 5,6 % del base.
- Calidad: ROIC 22,8 % − WACC 8,60 % = **+14,2 puntos**; sostenibilidad **Sí**; pruebas ampliadas 10 de 10.
- Robustez: **FRÁGIL**; «si la tienes» **Mantener**; acción robusta **No comprar**; nivel hoy **ninguno** (informativo: ninguno); límites A 121,33 y B 126,85 EUR; filtro de mantener (`limite_mantener_cot`) **140,75 EUR**; colchón de BPA para mantener 8 %; BPA −10 %: 7,5 % / 6,2 %.
- Objeciones más fuertes: (1) el valor intrínseco cubre el precio por un 0,6 %: un +5 % de precio (133) deja la ponderada en 13,7 % → respuesta: por eso la compra robusta está en 121-127, no en el cierre; (2) la v2 de control no pasa ni mantener a 129,70 (9,9 %) → respuesta: la v2 está sesgada contra las desrateadas y el método vigente decide con la v3; para mantener basta la vigente; (3) un BPA un 10 % peor deja la v3 en 7,5 % (no pasa mantener; colchón del 8 %) → respuesta: el BPA de 2026 ya está casi cerrado y el de 2027 queda bajo el consenso; el riesgo es el margen de 2027-2028 por la IA.
- Controles: 20 de 21 correctos y 1 explicado (compra robusta v3+v2). Cobertura del Word 83,9 % (sin sentimiento).
- `comprobar.mjs`: sin errores de esta carpeta; aviso C10 de `simbolos.json` (lo actualiza el coordinador).

## Lecciones

- Reply: el informe trimestral solo da ingresos «de gestión» (con subvenciones) y se para en el BAI; para el LTM NIIF hay que estimar las subvenciones del trimestre y el beneficio. La recompra «termina» según la autorización, pero el mandato con el banco sigue: leer la conferencia antes de dar por terminado un programa.
