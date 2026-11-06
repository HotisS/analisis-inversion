# Diario — Zoetis (ZTS), corte 2026-11-06

- Commit de partida: `df11955 GigaCloud Technology (GCT): análisis value y growth del 6-nov-2026`.
- Encargo: análisis completo tras el 3T26 (publicado el 5-nov-2026). Iteración del informe `zoetis-2026-10-28` (que no tenía cuentas nuevas). Hotis la mantiene hasta el 15-abr-2027 por decisión propia (`no_vender` en `escaner/reglas.json`): se informa la señal, el filtro de mantener y el nivel, sin proponer ventas ni órdenes. Sin subagentes.
- Horas en hora de Madrid (UTC+1).

## Fase 1 — Identificación y descargas (09:26-09:28)
- Zoetis Inc., NYSE ZTS, ISIN US98978V1035, CIK 0001555280, USD, US GAAP, ejercicio a 31-dic.
- Precio: cierre del 5-nov-2026, **82,11 USD** (bolsa.mjs; la sesión del 6-nov no había abierto). Próximos resultados: 4T26 en febrero de 2027.
- `cuentas.mjs --sec ZTS`: 10-Q del 3T26 (balance a 30-sep-2026) y 8-K con la nota de resultados (EX-99.1). Descargados: presentación del 3T26 (q4cdn), transcripción de la conferencia (Motley Fool, antes de que la publicara la web de inversores), 8-K del dividendo, CSV del Tesoro, FRED BBB, ERP de Damodaran (noviembre) y quoteSummary de Yahoo.
- `movimiento.mjs ZTS` (sin `--escribir`): 1 m +14,8 %, +18,8 % sobre el mínimo de 52 semanas, 11,4 % bajo la media de 200 sesiones, −34 % en 12 meses. Movimientos fuertes: +25,1 % hasta el 4-nov sin causa propia; **−7,9 % el 5-nov** con el S&P 500 −4,4 % y el XLV −2,5 %, tras +7,5 % el 4-nov.

## Fases 2-4 — Notas A-E (09:28-09:34)
- E (09:28): RSS de Seeking Alpha, API de Stocktwits y Stocktwits News. Tono Dividido, tendencia **Empeora** (alivio de octubre → decepción el 5-nov pese a la batida). `noticias.mjs`: resultados, guía, Burry (venta fiscal citada el 6-oct). Veredicto de la regla 13: **no cambia**.
- D (09:29) con `notas/D-actualizar.mjs` desde `D-28oct.json`: precio, 407,6 M de acciones, consenso tras resultados de Yahoo (BPA ajustado 2026 6,26; 2027 **6,41**, −13,3 % en 90 días; 4T26 1,31 frente al 1,11-1,21 que implica la guía; 5 compras y 11 mantener; objetivo medio 88,38, de 74 a 115, 13 analistas). MarketScreener sin actualizar tras resultados (contable 5,62 / 6,02 / 6,55): se usa y se dice. Comparables llevados al 5-nov (Virbac y Vetoquinol al 4-nov: Yahoo sin la barra de Euronext del 5). Tasa libre 4,84 % (Tesoro, 5-nov), coste de la deuda 5,96 % (BBB, 4-nov), peso de la deuda 19,5 %. Puente de la deuda a 30-sep.
- C (09:31-09:32): `form4.mjs` sin compras ni ventas en mercado de directivos; historial de la guía de 2026 con la del 5-nov; autocartera 94,40 M de acciones (18,81 %).
- A (09:32) con `notas/A-actualizar.mjs` desde `A-28oct.json`: últimos 12 meses a sep-26 (ventas 9.494, EBITDA 3.899, BPA 5,93, FCF 2.233); trimestres: sale el 3T24, entra el 3T26 (2.391 M, −1 % orgánico, BPA 1,44, «Superior»); KPIs, liquidez y política de capital (1.690 M de recompras en nueve meses).
- B (09:39): frases del 3T26 en los motores del sector (pérdida de cuota en dermatología de 7 a 4 puntos; promociones).

## Supuestos y cálculo (09:34-09:39)
- **Guía**: no se rebajó por tercera vez. Ventas acotadas a 9.220-9.320 M; BPA ajustado al alza (6,25-6,35); contable a la baja (5,50-5,60) por 89 M de deterioros (PetMedix).
- Cambios de supuestos frente al 28-oct: 2026e −2,6 % → **−2,1 %** (punto medio de la guía acotada); **2027e +2,0 % → +1,0 %** (la dirección planifica 2027 sin mejora del consumo ni de la competencia; consenso de 2027 a la baja); 2028e +4,0 → +3,5 %; margen EBITDA de 2026-2028 medio punto más bajo (39,7 / 39,8 / 40,3: el precio neto resta un 1 %); acciones 414,3 → 406,4 M (recompras ya hechas). ERP 4,41 % (Damodaran, noviembre). WACC 8,32 → **8,24 %**. Escenarios 30/50/20 sin cambio.
- DCF 102,86 USD (antes 100,56); valor intrínseco **98,60** (+20,1 %); DCF inverso: ventas planas (0,0 %) hasta 2035 o margen del 35,2 %; rentabilidad implícita 9,3 %.
- Sostenibilidad: **Sí** (2,6 % anual; cuota 23,6 → 23,4 %).
- Objetivo a 12 meses: BPA contable 2028e 4,83 / 5,99 / 6,38. **Base de BPA: publicado** en historia y escenarios. Historia adelantada con 2025 ÷ 5,55 (punto medio de la guía contable nueva): mediana 28,9x, mínimo 22,7x, media larga 30,6x. Comparables 16,4x.
- Controles: 20 correctos y 2 explicados (R² 0,29; comparables frágiles 9,4-14,2x). Ningún «Revisar».
- Comité: recomendación de la regla (**Mantener**), convicción **Media**, sin apartarse.

## Word y PDF (09:39)
- `Zoetis - 2026-11-06.docx` y `.pdf` (60 páginas): cobertura 92,2 %, 28 gráficos, 20 huecos de complemento. Páginas 1-4 revisadas como imagen. Síntesis de 637 palabras (recortada desde 693).

## Rentabilidad a 12 meses y robustez (09:40)
- `flock … apuntar-12m.mjs zoetis-2026-11-06 --precios`: **v2 ponderada 3,6 %, base 5,5 % → Mantener** (selector v2 por desrateada; v3 sin selector 13,5 %). Antes (28-oct, a 78,23): 5,0 % Mantener.
- `robustez.mjs zoetis-2026-11-06` (sin `--escribir`): **FRÁGIL** (v3 ×1,3 daría Comprar). **Si la tienes: Vender** (no pasa el filtro de mantener); `limite_mantener_cot` **77,37 USD**; banda Vender de la regla 94,54. ¿Compra robusta?: no; nivel ninguno (A 66,81; B1 69,85; regla 74,00). Colchón de BPA: ninguno. Avisos M1, P5 (con el `movimiento.json` compartido del 20-oct), M6.
- Detalle en `revision-12m-2026-11-06.md`.
- 2026-11-06: revisión 12 m v2 (regla vigente, selector v2): objetivo 82,97 USD, ponderada +3,6 %, base +5,4 % (5,5 % en apuntar-12m), señal Mantener; senal_cartera Vender (filtro de mantener ≤ 77,37).

## simbolos.json (09:41)
- `verticales/empresa/simbolos.json`: `ZTS` apuntaba a `zoetis-2026-10-28`; cambiado a `zoetis-2026-11-06` bajo `flock`. Primer intento con `JSON.stringify` reordenó las claves numéricas (1303, 1519…) al principio del objeto; se rehízo sobre el texto de HEAD con reemplazo literal, conservando el cambio de UBER que ya había hecho otro analista. Diff final: solo las dos líneas de `carpeta`.

## Frente al informe del 28-oct
- Precio 78,23 → 82,11. Ponderada 5,0 → 3,6 %; base 6,6 → 5,4 %. `limite_mantener_cot` 74,67 → 77,37; banda Vender 91,24 → 94,54; compra 71,40 → 74,00; nivel A 64,49 → 66,81. DCF 100,56 → 102,86; valor intrínseco 95,87 → 98,60. Sentimiento: de «mejora» a «empeora».

## Fallos del sistema vistos
1. `robustez.mjs` lee el `movimiento.json` compartido (20-oct) para P5 y no el `bolsa.contexto` del informe (5-nov): el aviso sale con cifra y fecha viejas (16 % frente a 11,4 %).
2. Reescribir `simbolos.json` con `JSON.parse` + `JSON.stringify` reordena las claves numéricas: hace falta reemplazo de texto (o una utilidad común que lo haga bien).
3. `apuntar-12m.mjs` y el motor redondean la base distinto (5,5 % frente a 5,4 %).
- Fin: 09:42.
