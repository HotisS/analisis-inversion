# Diario · KONE Oyj (KNEBV) · 14-oct-2026

- Commit de partida: 5de9c7f (Elevance Health, 14-oct). Prompt `verticales/empresa/prompt.md` sin cambios durante el análisis.
- Entorno: nube de Claude Code. La red solo deja la búsqueda web (WebSearch); WebFetch, curl, `descargar.mjs` y `bolsa.mjs` no funcionan (no se probaron, por el encargo). Unas 40 búsquedas. Las cifras salen de los extractos de búsqueda de los comunicados de KONE (Cision, kone.com), Stock Analysis, Fidelity, Snowball, Fintel, Inderes y prensa, con la URL como fuente. **Confianza baja-media**: cuentas de resultados 2021-2025 cuadradas (BAI − impuestos = beneficio neto publicado 2024-2025); balance muy incompleto (sin anticipos, arrendamientos ni deuda bruta), sin beta ni series de precios, y precio de hoy no confirmado (último cierre fechado: 51,40 EUR el 8-oct, Halo; eToro 51,26 en octubre).
- Fecha de corte: 2026-10-14. Divisa: EUR. Cierre: diciembre. Acciones B en Nasdaq Helsinki; acciones en circulación 518,3 M (A + B − autocartera). Próximos resultados: **28-oct-2026** según el calendario oficial de KONE (no el 22-23 que indicaba el encargo; un proveedor daba el 21-oct).
- Notas A-E hechas por mí sin subagentes con `notas/build_notas.py` + `notas/notas_datos.py` (las citas `{clave}` se traducen a la lista propia de cada nota); propio en `propio.mjs` + `supuestos.mjs` + `textos.mjs` + `resumen.mjs`.
- Decisiones:
  - **TKE fuera de las cifras**: KONE acordó el 29-abr-2026 combinarse con TK Elevator (valor empresa 29.400 M, 5.000 M en caja y hasta 270 M de acciones B; junta del 3-jun; cierre como pronto en el 2T27, sujeto a competencia). Se valora KONE sola y la operación va como riesgo, catalizador y opción en el texto.
  - Puente con la deuda neta con intereses de junio de 2026 (−245,5 M, incluye arrendamientos y derivados de TKE) toda como caja neta.
  - Circulante del DCF al 0 % (anticipos de clientes desconocidos) y capex del 2,7 % con las altas de derechos de uso estimadas.
  - WACC 7,85 % (Bund 2,95 %, beta 0,85 estimada, prima 5,5 % + 0,5 por China); g 2,3 %.
  - PER histórico con BPA publicado, 2022 excluido (BPA atípico); cierres derivados del PER de Wisesheets.
- 14-oct, ≈11:45 UTC: informe cerrado, 18 de 18 controles; Word y PDF (soffice). Cobertura 80,5 %.
- **Revisión a 12 meses (v2)**: objetivo 55,57 EUR, ponderada +11,6 %, base +11,6 % (dividendo 3,5 % incluido) → **Mantener**, convicción baja (reglas absoluta Vender / relativa Mantener). Valor intrínseco 45,49 EUR (−11,5 %). Compra < 45,49 EUR; venta > 63,74 EUR. Detalle en `revision-12m-2026-10-14.md`. No se ejecutó `apuntar-12m.mjs` ni `seguimiento.mjs` (encargo).

## Lecciones

- Empresa con una operación transformadora pendiente (TKE): conviene valorarla sola y decirlo, porque el ejercicio objetivo (2028e) cae después del cierre previsto y el BPA combinado depende de la asignación del precio, las sinergias y la dilución. Merecería un campo o una nota estándar en el prompt para «operación pendiente».
- En la nube, el precio del día de una acción europea no aparece en la búsqueda: las páginas de cotización (Halo, eToro) dan cierres de días anteriores; anota la fecha y no la del corte.

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (5 años; mediana 27x, mínimo 24.4x, media larga 30.4x; antes v2 28.6x/25.1x/30.6x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
- 2026-10-14: datos-v2.json y «KONE - 2026-10-14 v2.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v3 Mantener 15,0 % (antes v3 Mantener 15,0 %). Para comparar, con la regla v2 (historia al cierre, mismo precio): 20,2x / 23,8x / 30,6x, 11,6 % Mantener. Decide la regla vigente (v3 con tope ×1,1; METODO-VIGENTE.md).
