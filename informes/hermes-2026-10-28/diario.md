# Hermès, 28-oct-2026: análisis completo nuevo (regla «antes de vender, análisis completo»)

Hora de Madrid. Commit de partida: `a7272a4` (Escáner: el motivo de «no se amplía» sale de reglas.json…). Encargo: el usuario mantiene RMS por decisión propia; sin ella el método la vendería. Análisis anterior: `informes/hermes-2026-10-22/` (v2, tras el 3T26) y `hermes-2026-10-11`. Fases 2-4 hechas por el orquestador, sin subagentes (cinco análisis en paralelo).

- 10:16 Lectura de `analiza-empresa.md`, `prompt.md`, `lecciones.md`, Francia y UE de `lecciones-paises.md`, `METODO-VIGENTE.md` §1-5. Carpeta nueva; notas del 22-oct copiadas a `notas/previo/` como punto de partida.
- 10:17 `cuentas.mjs --esef "Hermes International"`: XBRL 2019-2025 idéntico al del 22-oct (sin cuentas nuevas). `bolsa.mjs` (RMS.PA, CAC.PA con dividendos, GLUX.PA): cierre del 27-oct 1.268,50 EUR (la sesión del 28-oct, abierta). `movimiento.mjs RMS.PA`: −40,7 % a 12 meses, P4 y P5.
- 10:18-10:21 Comprobaciones nuevas: comunicado del 3T26 releído (MFN; cifras iguales a la nota A); consenso tras el 3T26 de S&P Global vía Yahoo (BPA 2026e 43,98, 2027e 48,15; objetivo medio 1.562,78; 9/12/2); recortes de objetivo del 22-23 oct (Goldesel: DZ Bank, LBBW, Bernstein, RBC, Oddo, Goldman, UBS; Berenberg a Mantener); AMF: Thod 15 compra 2.000 + 2.000 acciones el 22 y 23-oct (≈ 5,0 M EUR); Bund 3,42 % (Bundesbank, 27-oct); BCE 27-oct; Kering −11 % el 23-oct por Gucci; foro de Boursorama.
- 10:22 `notas/actualizar-notas.mjs` escribe A-E (A y B sin cambios de cifras; C con las compras; D con precio, bolsa, contexto, consenso, comparables al cierre del 27-oct; E con el foro).
- 10:23 Supuestos: los del 22-oct (2026e +3,0 %, 2027e +7,0 %) salvo Bund 3,42 %, beta 1,21 (ajustada semanal) y terminal 2,9 % (antes 3,0 %, por encima de tasa libre − 0,5). Historia del PER adelantado rehecha con el cierre de 2025 ÷ nuestro BPA de 2026e: mediana 47,9x, mínimo 35,1x, media larga 44,6x (antes 45,6 / 35,0 / 45,0). **Base del BPA: publicado en la historia y en los escenarios.**
- 10:24 Primer cálculo; integración sin citas huérfanas; 2 controles explicados (regresión y estabilidad de comparables). Falta el bloque `riesgos.ia` (también faltaba el 22-oct): añadido.
- 10:25 Textos y resumen al día; síntesis 633 palabras. Word y PDF (`soffice`), portada y «La decisión» revisadas como imagen.
- 10:26-10:28 Con candado: `precios.mjs RMS`, `apuntar-12m.mjs --precios` y `robustez.mjs` (cierre y `--actual`).

## Resultado
- Regla a 12 meses: el selector pasa a **v2** (desrateada: mediana adelantada 47,9x = 1,9 × el PER de hoy, 25,3x). Ponderada **+12,9 %**, base **+9,0 %** → **Mantener** (v3 sin selector, al lado: 24,4 % / 19,7 %). Objetivo 1.414,58 EUR.
- Valor intrínseco 928,27 EUR (−26,8 %); DCF 934,46; DCF inverso 12,0 % frente al 6,6 % del base. Sostenibilidad «Sí»; ROIC − WACC 45,2 puntos.
- Robustez: SÓLIDA. `senal_cartera`: **Vender** (filtro de mantener: valor intrínseco más de un 15 % bajo el precio); `limite_mantener_cot` **1.092,08 EUR**. `vender_por_encima` (banda Vender de la regla, ponderada ≤ −10 %): 1.591,75. Acción robusta: No comprar; nivel ninguno; límite A 928,27.
- Regla 13: «no cambia» (el 3T26 ya está en el precio; compras de la familia; próximos resultados 12-feb-2027).
- Frente al 22-oct: precio −6,5 %; la rentabilidad a 12 meses cae de 24,4 % a 12,9 % por el cambio de v3 a v2 del selector (no por el BPA, que no cambia); valor intrínseco 937,70 → 928,27; filtro de mantener 1.103,18 → 1.092,08. La señal para quien la tiene no cambia (Vender por valor).

Revisión a 12 meses: `revision-12m-2026-10-28.md` · RMS v2 12,9 % / base 9,0 % → Mantener (1.268,50 EUR, 27-oct).
