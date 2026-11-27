# Diario · Fortinet (FTNT) · 27-nov-2026

- Commit de partida: 87188ae (Tanda 1 (27-nov): Edenred, Netflix, Prysmian, Almawarid y Silicon2 rehechos). Encargo de la tanda del 27-nov: sin subagentes, sin git, escribir solo en esta carpeta.
- Motivo: el escáner pedía versión nueva (resultados del 3T26 del 28-oct sin revisar y «corregir dato»). El dato era el aviso D2 CORREGIR de `robustez.mjs` sobre el informe del 15-oct: «el precio del informe (184,05) es 1,364 veces el de mercado (134,96): parece otra divisa». Comprobado con el histórico del Nasdaq (fuente de la bolsa) y con el 10-Q: no hay error de divisa (cotiza y publica en USD); 184,05 fue el cierre real del 14-oct y la acción cayó de verdad (174,08 → 139,10 el 29-oct, −20,1 %, tras el 3T26). Se corrige rehaciendo el informe al cierre del 25-nov (134,96).
- Tiempo: 10:38-11:00 de Madrid (≈45 minutos con la lectura del método).
- Partí de los scripts de notas del 15-oct (`construir-notas.mjs`, `propio.mjs`, `supuestos.mjs`) y cambié todo lo que depende de fecha; los textos que cambian están en `textos.mjs`, que importa los del 15-oct (`textos-base.mjs`) y los sustituye.

## Pasos (hora de Madrid · fecha de los datos)

1. 10:40 · `movimiento.mjs FTNT` (cierre 25-nov) y `robustez.mjs` sobre el informe anterior (D2 CORREGIR, E3, V1); escáner del 27-nov 09:13 y expediente FTNT (noticias hasta el 27-nov), solo lectura.
2. 10:42 · `cuentas.mjs --sec FTNT` (XBRL 2016-2025, descargado hoy).
3. 10:43 · 8-K del 3T26, anexo 99.1 (28-oct-2026), 10-Q del 3T26 (30-oct-2026, acciones a 27-oct) y anexo 99.1 del 2T26 (29-jul, guía de servicios de julio).
4. 10:44 · Transcripción del 3T26 (Motley Fool, 29-oct-2026).
5. 10:45 · `bolsa.mjs` (cierre 25-nov) y contraste con el histórico del Nasdaq (14-oct a 25-nov); bono a 10 años del Tesoro (25-nov, 4,85 %); prima de Damodaran de noviembre (4,41 %, la misma que usan las otras carpetas de la tanda).
6. 10:46 · Consenso y comparables con Yahoo quoteSummary (27-nov): FTNT y PANW, CSCO, CHKP, ZS, CRWD, OKTA.
7. 10:47 · `form4.mjs` (27-nov-2025 a 27-nov-2026).
8. 10:48 · Sentimiento: Stocktwits (19-25-nov) y RSS de Seeking Alpha (hasta el 23-nov).
9. 10:50-10:53 · Notas A-E, propio, `integrar.mjs`, `calcular-empresa.mjs`: 20 de 21 controles correctos y 1 explicado (tipo impositivo de 2023).
10. 10:53 · Word con `rellenar.mjs` (cobertura 87,5 %) y PDF con soffice; portada y síntesis revisadas como imagen.
11. 10:54 · `apuntar-12m.mjs fortinet-2026-11-27 --precios` y `robustez.mjs --actual` (con flock); `comprobar.mjs` sin errores en esta carpeta (se añadió `base_bpa: publicado`).

## Decisiones

- 2026e fijo al +20,2 % (punto medio de la guía de 8.125-8.215 M) y margen EBITDA del 34,8 %; capex del 6,3 % (infraestructura guiada de 390-420 M más comisiones). Resto de la senda como en octubre (+10 %, +9 %… 4 %).
- Impuesto del 18 % (antes 19 %): 17 % en 9M26 y la empresa normaliza al 18 %.
- BPA 2028e: 3,11 / 3,75 / 4,06 (antes 2,99 / 3,66 / 3,96). El bajista se alinea con el desplazamiento del DCF (+6 % y +5 %).
- Historia del PER: el cierre de 2025 se divide ahora por nuestro 2026e de 3,24 (24,5x); el mínimo de 5 años baja de 25,9 a 24,5. Base del BPA declarada: publicado (GAAP) en historia y casos.
- Comparables rehechos con el consenso de Yahoo (no llevados al precio): PER de los próximos 12 meses ponderando los dos ejercicios; Palo Alto con el ejercicio a jul-27 porque el de jul-28 de Yahoo (2,16) no es coherente.
- Recomendación Mantener (la regla), convicción media: la regla a 12 meses y el valor intrínseco discrepan.

## Revisión a 12 meses

- v3 −0,8 % ponderada / +1,4 % base → Mantener; v2 +8,4 %. Objetivo 133,87 USD; valor intrínseco 58,47. Nivel de compra: ninguno (A 58,47; B 58,46). Si la tienes: Vender (filtro de mantener hasta 68,79).

## Lecciones (para quien integre)

- El aviso D2 de `robustez.mjs` («otra divisa») salta también con una caída real de más de un tercio entre el informe y hoy (Fortinet, −27 %). Antes de buscar un error de divisa, mirar el histórico del Nasdaq o el `movimiento.mjs`: si la caída está ahí, el dato a corregir es solo el precio viejo y se arregla con la versión nueva.
- El margen bruto por línea (producto) avisa antes que el total: la alerta del 65 % del informe anterior saltó en el 3T26 (64,4 %).
