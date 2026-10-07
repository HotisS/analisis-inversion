# Diario — RATIONAL AG (RAA) — corte 2026-10-07

- Inicio: 2026-10-07 11:40 (hora local).
- Commit de partida: `232dd63 Empresa: DCF en tres etapas y regla relativa (prima implícita del mercado)`. No se cambia de versión del prompt durante el análisis.
- Procedimiento: `.claude/commands/analiza-empresa.md` + `verticales/empresa/prompt.md` (leído entero) + `lecciones.md`.
- En paralelo corren otros análisis: solo se escribe en `informes/rational-2026-10-07/` y en `%TEMP%\analisis-inversion\rational*`.

## Fase 1 — Identificación (11:40-11:46)
- RATIONAL Aktiengesellschaft, Landsberg am Lech. Xetra `RAA` (Yahoo `RAA.DE`), ISIN DE0007010803. Cuentas en EUR, NIIF-UE, ejercicio natural (diciembre). Cotiza en EUR: tipo 1.
- Último informe: semestral 2026, publicado el 6-ago-2026 (ventas 641,5 M, +6 %; +8 % orgánico; EBIT 169,9 M, 26,5 %, con 14 M de devolución de aranceles IEEPA en EE. UU.). Capitalización a 30-jun 7.317 M a 643,50 EUR → 11,37 M acciones.
- Próximos resultados: mitteilung del 3T, primeros de noviembre (fecha exacta a confirmar por D).
- Sesión del 7-oct abierta a las 11:40: el precio será el cierre del 6-oct.

## Fases 2-4 — Subagentes A-D (11:46-12:07)
- Lanzados a las 11:46. A los 10 min (11:51) **ninguno** había escrito contenido en `notas/` (solo el esqueleto): se les recordó por mensaje y a las 11:53 ya había 6-20 KB en cada nota. Terminaron entre 12:03 y 12:07, con 59-74 llamadas cada uno.
- A: cuenta, balance y flujos 2019-2025 (se le pidió añadir 2019-2020 para el bajista), 8 trimestres, LTM jun-26. Caja = efectivo + depósitos a plazo + fondo monetario (544,4 M a dic-25). Extraordinarios: 2,50 € (2021, 2022) y 4,00 € (2025). No recurrentes: devolución IEEPA 13,9 M en 2T26.
- B: penetración (CMD 2024: 4,8 M cocinas relevantes iCombi, 12 % Rational / 13 % competencia / 75 % tradicional; carta 1S26: ≈15 % EE. UU., >50 % Europa, ≈25 % mundo). Unox 360 M EUR, +18 % anual.
- C: no hay fundación ni sociedad patrimonial: familia Meister 47,17 % a título personal (pacto Gabriella Meister + Franziska Würbser 31,58 %; Ulrike Meister 15,59 %) + consejeros (Kurtz) ≈7,8 % (estimación) = 55,2 % estable. Kurtz preside el Aufsichtsrat. `accionista_control` y `presidente_vinculado_control` = true. Voto en contra del sistema de remuneración 2026: 30,81 % (82,55 % del capital libre presente).
- D: precio 577,50 (cierre 6-oct), Bund 3,52 % (Bundesbank, descargado), prima implícita Damodaran 3,70 % (1-oct-2026), beta 1,04 frente a ^MDAXI (1,35 DAX, 1,72 STOXX 600). Consenso MarketScreener 14 analistas, PO medio 795,86.

## Integración y cálculo (12:07-12:25; corte por límite de uso hasta 15:50; 15:52-17:15)
- `propio.mjs` + `supuestos.mjs` + `resumen.mjs`. Reintegrado y recalculado ~8 veces.
- **Normalización del no recurrente** (fallo 5): el LTM jun-26 de A incluía los 13,9 M de devolución arancelaria. Con `_parches` se fija el LTM sin ella (EBITDA 371,9 M, EBIT 335,2, BN 255,6, BPA 22,48; tipo 25,8 %, estimación propia). El 2026e del DCF sí la incluye (es caja). Explicado en `financieros.ajustes` y `meta.limitaciones`.
- **Etapa 2** (`dcf.etapa2.usar: true`, 10 años): ROIC 61,2 % frente a WACC 9,24 % (52 puntos), 75 % de cocinas relevantes sin combi, EE. UU. ≈15 %. Aporta +8,7 % (483,66 frente a 445,14 sin ella).
- Terminal 2,5 % en EUR (BCE 2 % + 0,5 real), coherente con Bund 3,52 % (fallo 9).
- Capex 3,6 % = capex de flujos 2,7 % + pagos de arrendamientos 0,9 pp (NIIF 16).
- Beta: se mantiene 1,04 (MDAX, su índice); 1,35 frente al DAX se da como sensibilidad (−19,9 %). La beta no salió <0,2 (fallo 2 no aplica).
- Puente: sin deuda, sin participadas, sin recompras (fallos 3 y 4 no aplican).
- Variantes del DCF con un script en %TEMP% (copia de datos.json): −2 pp crecimiento −14,8 %; −2 pp margen −7,6 %; recesión 2027e −12,9 %; beta 1,35 −19,9 %; sin etapa 2 −8,0 %; circulante 26 % −1,3 %.
- Resultado: DCF 483,66 (−16,2 %); escenarios 343,70 / 483,66 / 614,86; valor objetivo 466,62 (−19,2 %); RT 12 m −16,4 %, asimetría 0,16x → regla absoluta Vender. Con prima implícita 3,70 % (WACC 7,37 %): objetivo 617,28 (+6,9 %), RT +9,7 %, asimetría 2,58x → regla relativa Mantener. Manda la relativa: **Mantener, convicción media**.
- DCF inverso: crecimiento implícito 8,4 % (base 6,2 %; histórico 2016-2025 8,3 %), margen implícito 34,1 %, rentabilidad implícita 8,1 %.
- Controles: 15 de 16 correctos y 1 explicado (regresión múltiplo-crecimiento, R² 0,07). Cobertura de campos 89,8 %. Word: 51 páginas, 27 gráficos; abre sin reparar; revisadas portada, síntesis y «La decisión».

## Revisión de comité (resumen)
1. Convergencia: no hay tesis de convergencia al alza; el precio ya descuenta una década como la anterior con un WACC normal. Mantener sale de la regla.
2. DCF inverso exigente frente a la tasa libre, no frente al mercado: lo dice la síntesis.
3. Supuesto más agresivo: margen EBITDA del 29 % plano hasta 2045e con Unox creciendo al 18 %.
4. Proyección entre −1,1 % y −2,6 % del consenso en ventas: dentro del 10 %.
5. Comparables: la mediana (9,2x) mezcla fabricantes de cocina de bajo ROIC; se usa con peso 20 % y se cita el subgrupo de calidad (13,3x).
8. Bajista verosímil (2009 −8 %, 2020 −23 %) más pérdida permanente de 2 pp de crecimiento y margen.
9. Dato crítico: la prima de riesgo (3,70 % frente a 5,5 %) decide entre Vender y Mantener; el Bund (3,52 %) está descargado del Bundesbank.

## Fallos del sistema
1. **Los subagentes no guardan por partes en los primeros 10 minutos** (los cuatro, pese a la instrucción). Arreglo: que `prompt-de.mjs` añada «escribe tu primer campo antes de la llamada n.º 15», o que el comando lance un control automático (Monitor) a los 10 min que mande el aviso solo.
2. **El LTM incluye no recurrentes sin aviso**: la devolución de aranceles de 13,9 M entró en el EBITDA LTM y en los múltiplos. Arreglo: campo `financieros.ltm.no_recurrentes` (importe) que el motor reste del EBITDA/EBIT LTM y declare, en vez de `_parches` a mano sobre cuatro cifras.
3. **La beta depende del índice (1,04 MDAX, 1,35 DAX, 1,72 STOXX 600)** y decide en parte la recomendación. Arreglo: que `bolsa.mjs` calcule siempre la beta frente al índice local y frente a uno amplio (MSCI Europe/STOXX 600) y el motor avise si difieren más de 0,3.
4. **«Crecimiento previsto para su mercado» en «La decisión» (9,9 %) sale de un estudio en USD de mercado pagado (Global Industry Analysts) citado de su ficha**: pesa visualmente como si el precio fuera barato frente al mercado. Arreglo: que el motor solo muestre esa fila con `sector.confianza` Alta o con dos fuentes.
5. **La prima de Damodaran está medida contra el bono de EE. UU. (5,29 %)** y se aplica sobre el Bund (3,52 %): la regla relativa usa una prima de un mercado con otra tasa libre. Arreglo: documentar en el prompt si se ajusta por el diferencial de tasas libres o se toma la prima implícita del índice local cuando exista.
6. **`descargar.mjs` tardó más de 120 s con un .xls de Damodaran (betaEurope.xls) y lo guardó como xlsx con bytes extra**: no se pudo leer sin librería. Arreglo: tiempo máximo explícito, detectar el formato real (BIFF frente a ZIP) y no renombrar.
7. **Sección `capital` por debajo del 60 % de cobertura** porque `capital.adquisiciones` está vacía en una empresa sin compras desde 1993. Arreglo: que el motor no penalice la cobertura si `capital.comentario` declara que no hubo adquisiciones (o aceptar una fila «Ninguna en 10 años»).
8. **Corte por límite de uso** (12:25-15:50) y una sesión colgada después: no se perdió nada porque las notas estaban guardadas; el diario y los `.mjs` permiten reanudar. Arreglo: que el comando pida guardar `propio.mjs` antes de cada cálculo (ya ocurre de hecho).
9. La herramienta de Bash bloquea `sleep` largos en primer plano: para esperar a los subagentes hay que usar Monitor o un bucle con condición. Arreglo: decirlo en el comando (`analiza-empresa.md`, «Esperar a los subagentes»).

- Fin: 17:15. Tiempo efectivo ≈ 2 h 05 min (11:40-12:25 y 15:52-17:15), sin contar el corte.

## Corrección de la prima implícita (17:16-17:25)
- El coordinador señaló que la prima de referencia es «ERP (T12m with sustainable payout)» de ERPbymonth.xlsx: **4,20 %** en oct-2026, no 3,70 % («ERP (T12m)» sin ajustar, la que tomó D). Sobrescrita en `propio.mjs` (`valoracion.referencia_mercado`), recalculado y textos actualizados (síntesis, tesis, visión diferencial, cambiaría, justificación del WACC, lectura, escenarios, valoración). Nuevo: WACC relativo 7,89 %, objetivo con la prima del mercado 564,55 EUR (−2,2 %), rentabilidad total +0,5 %, asimetría 1,35x, niveles 504,42 / 645,34. La regla relativa sigue en Mantener. Mismo .docx regenerado (51 páginas) y revisadas portada, síntesis y «La decisión».
- Fallo del sistema añadido: el subagente D eligió la columna equivocada de Damodaran. Arreglo: que `prompt-de.mjs D` nombre la columna exacta («ERP (T12m with sustainable payout)») y que el motor avise si la prima es menor que la del mes anterior en más de 0,4 puntos o si no coincide con la cabecera de la página de Damodaran.
