# Diario Equifax 2026-10-28

- Commit de partida: a7272a4 Escáner: el motivo de «no se amplía» sale de reglas.json (Daiichi no lo decidió Hotis); comprobar.mjs vigila C7 en los grupos de cerca y C20
- Motivo: análisis completo nuevo antes de vender (regla de Hotis: la mantiene por decisión propia; sin ella el método la vendería por calidad).
- 10:17 (Madrid) Inicio. Fases 2-4 hechas por mí, sin subagentes (cinco análisis en paralelo). Punto de partida: notas A-E y propio del 20-oct, copiadas y recomprobadas dato a dato donde cambian.
- 10:18 `cuentas.mjs --sec EFX`: XBRL anual 2016-2025 idéntico al del 20-oct. EDGAR: el 10-Q del 3T26 se presentó el 20-oct; deuda (157,7 + 5.049,0), caja (192,9), minoritarios (120,8 + 20,5) y recompras (3,64 M acciones, 652 M en 9M) cuadran con el puente.
- 10:19 `movimiento.mjs` y `bolsa.mjs` al cierre del 27-oct: 175,71 USD (+10,8 % desde el 19-oct; +20,5 % en un mes). Causas: 15-oct +7,3 % (sin hecho claro; FHFA sin anuncio en la MBA), 20-oct +11,3 % (3T26), 22-oct +6,6 % (Argus a compra).
- Form 4: venta del consejero delegado el 23-oct (37.792 acciones, 6,91 M) con plan 10b5-1; ventana de 12 meses por fecha de operación: 32,79 M de ventas.
- Consenso (Yahoo, 28-oct): BPA ajustado 2026e 8,51, 2027e 9,55 (10,08 hace 30 días); objetivo medio 200,35 (20 analistas, 155-245); RBC rebaja a mantener (26-oct, titular de Seeking Alpha). Transcripción del 3T26 leída: originaciones «un dígito alto» más bajas en 2027, sin guía de 2027 hasta febrero, >550 M de contratos públicos.
- Regulador: Pulte no anunció el informe doble en la MBA (12-oct) ni en la orden ejecutiva (23-oct); el 26-oct promete «más medidas esta semana» (FICO −13 %). `bolsa.contexto` = «retrasa» para compras (no para la venta, regla 11).
- Supuestos: sin cambios de negocio (BPA 8,92 / 10,63 / 11,94 en 2028e). WACC 10,25 → 10,21 % (Tesoro 4,99 % del 27-oct, deuda 6,1 %, peso 20,1 %). Comparables llevados al 27-oct con la variación de precio (mediana PER 22,1x).
- Base del BPA: AJUSTADO en historia del PER y escenarios (declarado `base_bpa` en los dos).
- Resultado: DCF 148,48 (−15,5 %), valor intrínseco 160,03 (−8,9 %). Selector: 33,3 / 18,6 = 1,79 < 1,8 → decide la v3 (el 20-oct decidía la v2): ponderada 31,0 %, base 25,3 %; v2 de control 18,7 % / 13,8 %. Regla: Mantener (valor intrínseco < precio).
- Recomendación del informe: Vender, convicción Baja (calidad ROIC − WACC −0,9 < 4,5; las reglas absoluta y relativa discrepan).
- Word y PDF (soffice): 68 páginas, cobertura 92,7 %, sin avisos; 3 controles explicados.
- `apuntar-12m.mjs --precios` y `robustez.mjs --actual` con candado: SÓLIDA; senal_cartera Vender (calidad); limite_mantener_cot 188,27; vender_por_encima 255,66; compra robusta no.
- 2026-10-28: revisión a 12 meses (revision-12m-2026-10-28.md): v3 ponderada 31,0 % (30,9 en apuntar), base 25,3 %; señal de la regla Mantener; recomendación del informe Vender por calidad.
- 10:30 Fin.

## Lección general
- El selector de método salta con el precio en las dos direcciones: Equifax pasa de v2 (18,8 %) a v3 (31,0 %) solo por subir un 10,8 %, con el BPA igual; a 1,79 del umbral de 1,8, la cifra a 12 meses no es estable. En empresas a menos de un 5 % del umbral conviene dar la v2 al lado en la síntesis.
