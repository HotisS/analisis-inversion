# Diario · Wolters Kluwer (WKL.AS) · corte 13-nov-2026

- 13-11 08:54 Inicio. Commit de partida: 645f096. Nube, sin subagentes (tanda de 10 análisis paralelos; notas A-E hechas por el orquestador). Punto de partida: informes/wolters-kluwer-2026-10-15/.
- 13-11 08:54 cuentas.mjs --esef: 2020-2025, mismas cifras que el XBRL del 15-oct (sin cuentas anuales nuevas). Avisos de siempre: deuda solo largo, gastos generales solo ventas, DPA pagado.
- 13-11 08:57 Precio: Yahoo history llega al 11-nov (88,42); el cierre del 12-nov es 89,50 (regularMarketPrice del chart a las 16:35 UTC; previo 88,42). Corte 13-nov en sesión: se usa el cierre del 12-nov. Bund 3,36 % (12-nov, Bundesbank). ERP Damodaran nov-2026 4,41 %. Actualización 9M (4-nov): orgánico 6 % (3T ~7 %), guía reiterada, deuda neta 4.070 M a 30-sep, venta del negocio fiscal de consumo alemán por 40 M, mandato de recompra 2027 de 75 M; la recompra de 2026 está casi parada desde mediados de septiembre (264,3 de 500 M).
- 13-11 09:03 Notas A, C, D y E actualizadas con construir-notas.mjs (copias del 15-oct revisadas): 9M26, AFM (13-nov), consenso (MarketScreener 26-oct + Yahoo 13-nov), comparables rehechos (Yahoo 12-nov + MarketScreener), puente a 30-sep (deuda neta publicada 4.070), contexto de bolsa (regla 13: no cambia). B sin cambios (sector y competencia anuales).
- 13-11 09:04 Primer cálculo: DCF 133,34 (WACC 6,68 %), VI 121,28 (+35,5 %); BPA 2028e 4,49/5,89/6,45 (acciones 219,6 M con la recompra anunciada de 2026 y el mandato de 2027). PER actual 16,2x; mediana adelantada 27,8x → 1,72 < 1,8: el selector pasa de v2 a v3 solo por el precio (a menos de un 5 % del escalón). v3: 100,74 EUR, +15,5 % / base +20,0 % → regla Comprar por 0,5 puntos; v2 de control 5,5 %. Robustez (precio de precios.json 87,42 del 10-nov): FRÁGIL, no es compra robusta (v2 8,0 %, BPA −10 % 6,7 %); si la tienes, Mantener; límites A 81,13 y B1 84,82; filtro de mantener hasta 93,94. Decisión: recomendación Mantener (convicción Baja) con justificación, por la v2, el BPA −10 % y el colchón de 0,5 puntos.
- 13-11 09:08 Textos reescritos (textos.mjs) con las cifras del motor; síntesis 646 palabras. Controles 21/23 + 2 explicados (comparables frágiles; compra robusta v2). Word 61 páginas, 27 gráficos, cobertura 93,9 %; PDF con soffice. Portada, síntesis y «La decisión» revisadas como imagen.
- 13-11 09:08 revision-12m-2026-11-13.md; apuntar-12m.mjs --precios (con flock): WKL v3 18,2 % / base 22,9 % → Comprar al precio de precios.json (87,42 del 10-nov; v2 8,0 %). robustez.mjs: FRÁGIL, no compra robusta, si la tienes Mantener, límites A 81,13 y B1 84,82, filtro de mantener 93,94. comprobar.mjs: sin ERROR de esta carpeta (C10: simbolos.json aún apunta a la carpeta del 15-oct; lo cambia el coordinador).

**Línea 12 m**: v3 (selector: 1,72 < 1,8, salto por el precio) 100,74 EUR, ponderada +15,5 %, base +20,0 % a 89,50 → regla Comprar por 0,5 puntos; v2 de control +5,5 %; recomendación del informe Mantener (convicción baja); robustez frágil, acción robusta no comprar; nivel ninguno (A ≤ 81,13, B1 ≤ 84,82 EUR).

## Qué cambió frente al 15-oct
- Precio 78,06 → 89,50 (+14,7 %): rebote del sector y +6,7 % el 4-nov con el avance de 9M (orgánico 6 %, beneficio operativo ajustado +10 %, guía reiterada).
- Selector v2 → v3 solo por el precio; la señal de la regla pasa de Mantener (+6,0 %) a Comprar justo en el umbral (+15,5 %), sin cambiar el BPA (5,87 → 5,89 en 2028e).
- WACC 6,80 → 6,68 % (Bund 3,51 → 3,36 %); DCF 127,64 → 133,34; VI 117,15 → 121,28 (potencial +50 % → +35 %).
- Consenso: objetivo medio 89,91 → 96,31 EUR (Barclays 105, BofA 102); BPA sin cambios.
- Recompra de 2026 casi parada (264,3 de 500 M); mandato nuevo de 75 M para ene-feb 2027; venta del negocio fiscal de consumo alemán por 40 M.

## Lecciones
- Con el selector cerca del escalón (1,72 frente a 1,8), una subida del 15 % sin cambio de BPA convierte un Mantener (+6 %) en un Comprar en el umbral (+15,5 %); la robustez lo frena (v2 y BPA −10 %). Ya cubierto por la lección del 28-oct (dar la otra versión al lado).
- MarketScreener seguía sin actualizar 9 días después del avance (página del 26-oct); el earningsTrend de Yahoo sí (con epsTrend a 7/30/90 días, útil para «revisiones»).
