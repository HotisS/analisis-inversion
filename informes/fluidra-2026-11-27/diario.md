# Diario — Fluidra (FDR.MC), corte 2026-11-27

- Commit de partida: 3d983a2 (Escáner 27-nov 9:00: revisiones y señales). Sin git pull ni commit (tanda en paralelo; el commit lo hace el coordinador).
- Motivo del encargo: Fluidra (excepción de calidad del usuario) a ≈ 3,6 % de su nivel B con el informe del 19-oct, y resultados de nueve meses (29-oct) con la parte alta de la guía recortada.
- 10:21 (Madrid) inicio. Iteración nueva; punto de partida `informes/fluidra-2026-10-19/`. Sin subagentes: fases A-E hechas por esta sesión. Notas A-E copiadas y actualizadas con `notas/actualiza-notas.mjs` (una sola vez, marca `_actualizado_2026_11_27`).
- Cuentas ESEF (`cuentas.mjs --esef "Fluidra"`): ahora llega a 2025 (2020-2025); 2025 cuadra con A (EBIT 309,3, beneficio 176, BPA 0,93).
- Precio: `bolsa.mjs --corte 2026-11-27` → sesión del 27-nov sin cerrar: cierre del **26-nov, 18,70 EUR**. Beta frente al STOXX 600 (EXSA.DE) 1,10 mensual 5 años (sin cambio). `movimiento.mjs FDR.MC` (27-nov, intradía 18,86): 1 m −0,3 %, 3 m −0,4 %, 6 m +1,4 %, 12 m −20,2 %; mayor subida de un mes +15,3 % (al 5-nov); sin avisos P.
- Documentos del 3T26 (29-oct), con `descargar.mjs` desde fluidra.com (web con Incapsula; los PDF bajan con el nombre adivinado por el patrón del 1T/1S): presentación `Q3-26-Eng_-vDEF.pdf` (29 págs.) y transcripción `FDR-MAD_Transcript_2026-10-29.pdf`; nota de prensa vía ariva.de (Business Wire). No hay XBRL trimestral: cuentas del 3T de la presentación (cuenta resumida, conciliaciones, balance y flujos).
- Hechos del motivo: guía 2026 a tipo constante: ventas +3/+7 % → +3,5/+5,5 %; margen EBITDA ajustado 23,3-24,3 % → 23,3-23,5 %; BPA ajustado +4/+13 % → +5/+9 %. 9M26: ventas 1.780 M (+4,3 % tc), EBITDA ajustado 428 M (24,1 %), beneficio 154 M (−5,9 %) por 45 M de reestructuración y pagos en acciones, BPA ajustado 1,15. 3T26: ventas 521 M, EBITDA ajustado 107 M (20,5 %). Conferencia: devoluciones de aranceles de 6 M netos en el 3T (sostienen el margen del año), sin guía de 2027, subidas de precio de 2027 del 3,5-5 % en EE. UU. y 2 % en Europa.
- Consenso (27-nov): Yahoo quoteSummary (BPA ajustado 2026e 1,37 y 2027e 1,56, al alza en 90 días; objetivo medio 25,93, 15 analistas); MarketScreener (BPA contable 0,99/1,28/1,51, sin fecha visible: puede no recoger la reestructuración del 3T).
- Comparables rehechos con Yahoo (consenso posterior a sus resultados del 3T; cierre del 25-nov en EE. UU.), al euro con el BCE del 26-nov. Hallazgo: Pool Corp, Hayward y Pentair suben un 30-36 % desde mediados de octubre; Fluidra un 6 %. EV/EBITDA NTM a margen constante (estimación propia); Pentair sin crecimiento (Yahoo suma una compra).
- Bund 3,30 % (Bundesbank, 26-nov). Cortos CNMV (27-nov): ninguna posición ≥ 0,5 % (CC&L 0,49 % el 26-nov). `noticias.mjs --meses 2 --valores FDR`: solo los resultados del 29-oct.
- Sentimiento (E): Rankia (página 58, la última): siete mensajes desde septiembre, sin debate tras los nueve meses.
- Decisiones del modelo: margen reportado 2026e 21,2 → 21,0 % (fijo); 2027e-2029e −0,3 puntos (guía con la parte alta recortada y aranceles devueltos que no se repiten); ventas sin cambios; puente a 30-sep-26 (deuda 1.058, arrendamientos 231, caja 144, minoritarios 10, Aiper 86, otros 0); pesos de la síntesis DCF 60 / comparables 15 / escenarios 25 (antes 50/25/25: el EBITDA de Yahoo de los comparables no es homogéneo y su rerating infla el valor).
- Cálculo: DCF 24,66 (WACC 8,07 %, VT 68 %), comparables 27,41, escenarios 14,95/24,66/29,68, VI 24,59 (+31,5 %), ROIC 8,3 %. DCF inverso: −1,0 % de ventas o margen 20,1 %. Controles 20/23 + 3 explicados.
- Objetivo 12 m (v3 ×1,1; selector 1,49 → v3): BPA 2028e 0,89/1,28/1,42 (antes 0,92/1,31/1,45), PER 14,7/18,4/24,8 → ponderada 22,74 (+25,1 %), base 23,55 (+29,4 %); v2 12,8 % Mantener. Base del BPA declarada «publicado» en historia y casos.
- Recomendación Comprar (regla), convicción Media (motor sugiere Alta): no es compra robusta y la calidad es por excepción.
- Word (`rellenar.mjs`, 28 gráficos, cobertura 91,9 %) y PDF con soffice. Síntesis de 648 palabras. Portada y «La decisión» revisadas como imagen.
- `flock … apuntar-12m.mjs fluidra-2026-11-27 --precios`: FDR de Comprar 24,7 % (17,61) a Comprar 25,1 % (18,70, 26-nov).
- `flock … robustez.mjs fluidra-2026-11-27 --actual`: FRÁGIL; si la tienes, Mantener; compra robusta no; **nivel B al precio de hoy**; límites A 18,35 y B 19,19; filtro de mantener 21,27; colchón de BPA 9 % / 13 %. Con el informe viejo al mismo precio salía nivel ninguno (B 18,03).
- `comprobar.mjs`: sin errores de Fluidra (los 3 ERROR son de SAP, Paycom y la cartera); aviso C10: `simbolos.json` apunta a la carpeta vieja de FDR (lo actualiza el coordinador).
- 10:36 fin (reloj del contenedor, hora de Madrid).

## Pasos y fecha de los datos

| Paso | Fecha de los datos |
|---|---|
| Cuentas anuales (ESEF 2020-2025, informe anual 2025) | 31-dic-2025 |
| Resultados 9M26 (presentación, nota, transcripción) | 30-sep-2026 (publicados 29-oct) |
| Guía 2026 | 29-oct-2026 |
| Precio, rango, volumen, rentabilidades, beta | cierre 26-nov-2026 |
| Movimiento (regla 13) | 27-nov-2026 (intradía) |
| Consenso Yahoo / MarketScreener | 27-nov-2026 |
| Comparables (Yahoo) | cierre 25-nov (EE. UU.), 27-nov (Europa) |
| Bund / BCE | 26-nov-2026 |
| Cortos CNMV | 26-nov-2026 |
| Foros (Rankia) | hasta 29-oct-2026 (sin mensajes después) |
| Gobierno (IAGC, IARC 2025) | 26-mar-2026 (sin cambios) |

Lecciones candidatas (no escritas; las decide el coordinador): (1) la web de Fluidra tiene Incapsula pero los PDF del trimestre bajan con `descargar.mjs` adivinando el nombre con el patrón de trimestres anteriores (`Q3-26-Eng_-vDEF.pdf`, `FDR-MAD_Transcript_<fecha>.pdf`); (2) al rehacer un informe tras resultados, el objetivo v3 se reancla al precio (M6) y la v2 de control puede pasar de «no» a «sí» sin mejores cifras: decirlo en el resultado del nivel.
