# Diario — Intercontinental Exchange (ICE), corte 2026-10-28

- Inicio: 2026-10-28 10:17 (hora de Madrid).
- Commit del repo al empezar: a7272a4 Escáner: el motivo de «no se amplía» sale de reglas.json (Daiichi no lo decidió Hotis); comprobar.mjs vigila C7 en los grupos de cerca y C20.
- Prompt: verticales/empresa/prompt.md de ese commit (no se cambia a mitad).
- Motivo: análisis completo nuevo antes de cualquier venta (regla del usuario): Hotis mantiene ICE por decisión propia; sin ella el método la vendería (calidad: ROIC − WACC por debajo de 4,5 en el informe del 8-oct).
- Iteración nueva sobre `informes/ice-2026-10-08/` (v4). Fases 2-4 hechas por mí, sin subagentes (cinco análisis en paralelo). Notas A-D copiadas de la iteración anterior como punto de partida y revisadas campo a campo; E nueva.

## Fase 1 — Identificación
- Intercontinental Exchange, Inc. (Delaware), NYSE: ICE. ISIN US45866F1049. CIK 0001571949. USD, ejercicio natural (31-dic), US GAAP.
- 10:17 Madrid: la sesión de NY del 28-oct no ha abierto → precio = cierre del 27-oct-2026: 155,44 USD (bolsa.mjs y movimiento.mjs).
- Próximos resultados: 3T26 el jueves 29-oct-2026 (mañana). Este informe se hace con el 2T26 como último trimestre publicado: habrá que rehacerlo tras esos resultados.
- 10:17 cuentas.mjs --sec ICE (XBRL 2016-2025) en notas/cuentas-xbrl.json.

## Fases 2-4 (yo, sin subagentes) — 10:18-10:27
- XBRL (cuentas-xbrl.json) frente a A.json de la iteración anterior: ingresos brutos, EBIT, beneficio, BPA, amortizaciones y DPA de 2021-2025 cuadran; A usa ingresos netos de gastos por transacción (la cifra principal de ICE). Sin cambios en las cuentas anuales ni en el LTM (último trimestre publicado: 2T26).
- EDGAR: nada de ICE posterior al 16-sep salvo Form 4. MarketAxess: HSR terminada antes de plazo el 21-oct y junta de accionistas el 29-oct (8-K del 22 y 23-oct).
- BPA ajustado de las notas del 4T (EDGAR, anexo 99.1): 2019 3,88; 2020 4,41 (reexpresado); 2021 5,06; 2022 5,30; 2023 5,62; 2024 6,07; 2025 6,95; 1S26 4,25 (1T 2,35, 2T 1,90).
- Consenso (Yahoo, 28-oct): BPA ajustado 2026e 8,18 y 2027e 8,88 (15 analistas, +1,9 % en 90 días); objetivo medio 187,53 (160-243); 13 comprar, 2 mantener, 1 vender. TD Cowen a mantener (5-oct), Wells Fargo infraponderar (2-oct).
- Tasa libre: Tesoro a 10 años 4,99 % (27-oct, CSV del Tesoro; FRED DGS10 5,00 % el 26-oct). descargar.mjs no pudo con FRED (fetch failed): CSV con curl en notas/docs.
- form4.mjs desde 28-oct-2025: 91 presentaciones, ventas 91,3 M USD (88,9 M en planes 10b5-1; Sprecher 66,4 M), ninguna compra.
- Comparables: los 9 del informe de CME Group del 26-oct (cierre del 23-oct) llevados al 27-oct con el precio (notas/comparables-2026-10-23.json). Mediana PER NTM 25,7x.
- Movimiento (movimiento.mjs ICE): −1,4 % a 12 m, −11,2 % del máximo de 52 s, tendencia alcista, sin avisos P. Caída de junio (−17,4 %) por baja volatilidad y recortes; subida de julio (+26,9 %) por resultados y MarketAxess. Veredicto de la regla 13: no cambia.
- E (sentimiento) hecho por mí: Stocktwits y RSS de Seeking Alpha; Reddit da error. Tono dividido; no mueve la decisión.

## Decisiones
- **Base del BPA: ajustado en historia y casos** (`base_bpa: "ajustado"` en los dos). El informe del 8-oct (v4) tenía la historia en contable (mediana 25,8x, por historia-adelantada.mjs) y los casos en ajustado: aviso H1. Historia nueva: mediana 21,2x, mínimo 18,3x, media larga 21,2x.
- Margen EBITDA 2026e del 67,5 % (antes 66,5 %), sacado de la guía de gastos ajustados del 2T26; 68,0 % desde 2029. Crecimiento 2026e +11,5 % (consenso de Yahoo).
- WACC 8,57 % (Rf 4,99 %, beta 0,91, prima 5,0 %, Kd 5,8 %, deuda 19 %). MarketAxess fuera del DCF, del BPA y del puente.
- Recomendación del informe: **Mantener, convicción baja**, apartándose de la regla (Comprar): compra frágil (v2 11,4 %, BPA −10 % → 8,0 %), calidad que no pasa y resultados mañana. Convicción sugerida por el motor: Media; bajo a Baja por los resultados del 29-oct.

## Cálculo, Word, PDF y señal — 10:27-10:33
- DCF 167,33 USD (+7,6 %), valor intrínseco (síntesis) 177,50 (+14,2 %), DCF inverso 3,8 % de crecimiento y 64,2 % de margen. ROIC 8,1 % frente a WACC 8,57 %.
- Objetivo 12 m 184,29 USD: ponderada +19,8 % (base +17,3 %), v3 Comprar; v2 de control 11,4 % Mantener.
- Controles: 20 de 22 correctos y 2 explicados (regresión R² 0,05; compra robusta v3/v2). Word y PDF de 59 páginas, cobertura 93,8 %, sin avisos salvo ESG sin calificaciones.
- `revision-12m-2026-10-28.md` escrita.
- apuntar-12m.mjs ice-2026-10-28 --precios (con candado): ICE Mantener 14,6 % (161,56) → Comprar 19,9 % (155,44, 27-oct).
- robustez.mjs --actual (con candado): **FRÁGIL**; `senal_cartera` **Vender (calidad: ROIC − WACC −0,5 < 4,5)**; `limite_mantener_cot` 169,37 USD; `vender_por_encima` 206,98; `accion_robusta` No comprar; sin nivel de compra; colchón de BPA 5 % (Comprar) y 9 % (mantener); límite robusto 146,04.
- **Hay que rehacer el informe tras el 3T26 (29-oct-2026).**
- Revisión a 12 meses: Comprar por la regla (ponderada +19,8 %, base +17,3 %, objetivo 184,29 USD); informe Mantener; para quien la tiene, Vender por calidad.
- Fin: 10:34 (hora de Madrid).
