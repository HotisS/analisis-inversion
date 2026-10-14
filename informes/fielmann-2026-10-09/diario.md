# Diario: Fielmann Group AG (FIE.DE), corte 2026-10-09

- Commit de partida: f1a9bdb (Informe de Evolution (Comprar, convicción baja)).
- Inicio: 09:36 (hora local).

## Fase 1 (09:36-09:42)
- Fielmann Group AG, Xetra, ticker FIE (Yahoo FIE.DE), ISIN DE0005772206, EUR, ejercicio a 31-dic, NIIF-UE.
- Capital social 84 M EUR = 84 M acciones; autocartera pequeña (comprobar en el semestral).
- Últimos resultados: semestral 2026 del 27-ago-2026. Próximos: informe del 3T, 5-nov-2026 (calendario financiero del semestral).
- Guía 2026 rebajada en agosto: ventas 2.500-2.550 M EUR, EBITDA ajustado 560-580 M, margen 22-23 %, margen BAI ajustado ~12 %.
- Descargados por mí: informe anual 2025, semestral 2026 y presentación del semestral (notas/docs).

## Fases 2-4: subagentes (09:37-09:56)
- Cuatro subagentes en paralelo. Las cuatro notas tenían contenido a los 9 minutos (comprobado por tamaño y claves, no por existencia). A terminó a los 15 min (84 llamadas), C a los 15 (90), B a los 16 (105), D a los 18 (111).
- Criterio enviado a A a mitad de trabajo: EBITDA reportado en la cuenta y sin no recurrentes (los ajustes se repiten: 20,8 M en 2024 y en 2025); el consenso, ajustado, se rebaja un 0,85 % de ventas. Así no se resta dos veces (Vuelta 11).
- Integración: la nota de sector no pisó las listas de negocio de la de cuentas (B no escribió segmentos, KPI ni geografías, como se le pidió).

## Integración, cálculo y redacción (09:56-10:06)
- Primer cálculo: DCF 60,44 con circulante del 3 % (el real es el 9 %: el primer año liberaba 143 M). Corregido; también crecimiento medio punto bajo el consenso, terminal 2,25 %, +0,5 pp por liquidez (free float 27 %, 2,8 M EUR/día). DCF final 47,10.
- Beta 0,89 (semanal 5 años ajustada frente al STOXX Europe 600); SDAX 0,81, MDAX 0,80, STOXX 600 Retail 0,70; mensuales 0,34-0,46 descartadas. Fielmann está en el SDAX, no en el MDAX.
- NIIF 16: arrendamientos (594 M) en la deuda del puente; capex del DCF = inmovilizado + altas de derechos de uso (11-12 % de ventas); amortización con la de derechos de uso.
- Etapa 2 usada (5 años): ROIC 13,9 % frente a WACC 7,74 %; aporta 6,2 % del valor (44,37 sin ella).
- Resultado: Comprar, convicción media. Objetivo 49,13 (+32,2 %), RT 36,0 %, asimetría 2,38. Relativa (ERP 4,20 %): 59,79, Comprar. DCF inverso: 2,6 % de crecimiento o 21,2 % de margen.
- Controles: 14 de 15 correctos y 1 explicado (comparables frágiles). Word y PDF de 56 páginas; portada, síntesis y «La decisión» revisadas como imagen.
- Fin: 10:06 (unos 30 minutos).

## Fallos del sistema
1. **Esperar a los subagentes sin `sleep`.** Un subagente que coordina no tiene cómo «esperar» la notificación: si acaba el turno, termina. `sleep` largo está bloqueado. Lo que funcionó: un bucle `until` en primer plano sobre el tamaño de las notas. Arreglo: documentarlo en el comando (`until [ $(cat notas/*.json | wc -c) -gt N ]; do sleep 10; done`).
2. **`integrar` sin `calcular` borra `calc`**, y un `textos.mjs` que lee `calc` deja el resumen vacío en la integración siguiente. Me pasó una vez. Arreglo: que `integrar` conserve el `calc` anterior o que avise de «resumen vacío porque no hay calc».
3. **`_parches` no llega a `meta.huecos`**: para quitar nombres de campo (tcac_previsto_pct, posicion_corta_pct) de los huecos que se imprimen hubo que editar las notas B y D. Arreglo: que `integrar` avise de nombres de campo en `huecos[].campo` (ya lo hace en textos) y acepte parches sobre `meta.huecos`.
4. **`bolsa.mjs` con un índice equivocado**: el subagente lanzó la herramienta contra el ETF del MDAX (el encargo decía MDAX) y la empresa está en el SDAX; además trata `^SDAXI` como índice de precio aunque es de rendimiento, y hubo que calcular las rentabilidades con un script propio. Arreglo: lista de índices de rendimiento conocidos (SDAXI, MDAXI, DAX) en la herramienta, y comprobar el índice en el informe anual antes de lanzarla.
5. **Comparables mezclan fabricantes y minoristas**: la mediana (13x) duplica el valor. El motor avisa de fragilidad pero no hay un campo para excluir un comparable de la mediana como en transacciones. Arreglo: `excluir` también en `comparables.empresas`.
6. **Circulante por defecto**: el primer supuesto (3 %) liberaba 143 M de caja en 2026 y subía el DCF un 28 %. El control lo cazó; conviene que `supuestos` parta siempre de `calc.balance[].circulante_ventas_pct` del último año.

## Actualización v2 (13 oct 2026): sostenibilidad del crecimiento

Sin investigación nueva. Script: `notas/actualizacion-v2.mjs` (parte de `datos.json`), salida `datos-v2.json`, `Fielmann Group - 2026-10-09 v2.docx` y su PDF. Mismo precio (37,15 EUR, cierre del 8-oct) y fecha de corte. Sin cambios en los supuestos del DCF.

| | v1 | v2 |
|---|---|---|
| Recomendación · convicción | Comprar · Media | Comprar · Media |
| Valor objetivo (WACC 7,74 %) | 49,13 EUR, RTE 36,0 %, asimetría 2,38x | 49,13 EUR, RTE 36,0 %, asimetría 2,38x |
| Objetivo con la prima del mercado (WACC 6,81 %) | 59,79 EUR, RTE 64,7 % | 59,79 EUR, RTE 64,7 % |
| Comprar por debajo / vender por encima | 51,14 / 64,46 EUR | 48,10 / 64,46 EUR (cambio del motor, no de supuestos) |
| Sostenibilidad del crecimiento | — | **En parte** (4,5 % proyectado; 2,8 % financiable al ROIC actual) |

- **Puente 2026e-2029e** (estimación propia sobre KPI, semestral y ZVA): volumen 1,6-3,2 puntos (aperturas, EE. UU., España, audiología), precio 1,1-1,6 (cristales de más valor; el mercado alemán crece en valor con menos unidades) y otros 0,5-0,7 (audiología, compras pequeñas, divisa).
- **Mercado final en null**: la cuota publicada (25,1 %) es solo de la óptica minorista alemana en valor con IVA y la proyección es del grupo; no hay perímetro comparable.
- **Reinversión**: la proyección reinvierte el 20 % del NOPAT, que al ROIC del 13,9 % financia un 2,8 % anual frente al 4,5 % proyectado; el capital nuevo tendría que rendir un 21,5 % frente a un incremental histórico del 6,5 %. Salta el control y se explica: unos dos puntos al año son precio, mezcla y audiología, y el incremental lo hunden las compras de EE. UU. y la caída de margen de 2022-2024.
- **No se recorta el base**: recalculado aparte con el crecimiento limitado al 2,9 % medio (2027e-2033e: 3 / 3,5 / 3,5 / 3 / 2,5 / 2,25 / 2,25 %), el DCF da 39,79 EUR, el objetivo 42,89 EUR (RTE 19,2 %; relativa 51,94 EUR, +43,6 %) y sigue en Comprar. Lo dice la síntesis en «El negocio».
- Síntesis: frase del veredicto en «El negocio», frase de la convicción en el primer párrafo (control nuevo «La síntesis explica la convicción») y nivel de compra 48,10 EUR (también en `cambiaria_recomendacion`). 614 palabras.

**Fallos del sistema vistos**
1. Los niveles de compra cambian al recalcular con el motor nuevo (51,14 → 48,10 EUR con los mismos datos): una actualización «de método» mueve cifras impresas sin que el diario lo note. Arreglo: que el motor imprima la diferencia con el `calc` anterior.
2. La prueba de reinversión trata todo el crecimiento como comprado con capital: en un minorista con poder de precios penaliza el componente de precio y mezcla del puente, que el motor ya conoce. Arreglo: comparar el crecimiento financiable con el volumen del puente, no con el total.
3. El ROIC incremental histórico mezcla compras (EE. UU.) con crecimiento orgánico; en un comprador ocasional el control compara con una referencia que la proyección no repite.
4. No hay forma de dar la sensibilidad «crecimiento limitado a lo financiable» dentro del informe: hubo que recalcular a mano en una copia. Arreglo: que el motor la calcule cuando el veredicto es «En parte» o «No».
- 13-oct-2026: revisión v2 a 12 meses (PER propio × BPA propio): objetivo 50,5 EUR, rentabilidad +39,7 %, señal Comprar (`revision-12m-2026-10-13.md`).

## Actualización v3 (13 oct 2026): caso base al crecimiento financiable

Sin investigación nueva. Lectura prudente de la sostenibilidad (decisión del usuario del 13-oct): el base tiene que quedar en lo que la empresa puede financiar. Script: `notas/actualizacion-v3.mjs` (parte de `datos-v2.json`), salida `datos-v3.json`, `Fielmann Group - 2026-10-09 v3.docx` y su PDF. Mismo precio (37,15 EUR, cierre del 8-oct) y fecha de corte.

| | v2 | v3 |
|---|---|---|
| Recomendación · convicción | Comprar · Media | Comprar · Media |
| Valor objetivo (WACC 7,74 %) | 49,13 EUR, RTE 36,0 %, asimetría 2,38x | 44,79 EUR, RTE 24,3 %, asimetría 1,65x |
| Objetivo con la prima del mercado (WACC 6,81 %) | 59,79 EUR, RTE 64,7 % | 54,31 EUR, RTE 50,0 % |
| DCF · escenarios (bajista / alcista) | 47,10 · 26,02 / 63,72 EUR | 41,96 · 24,82 / 57,53 EUR |
| Comprar por debajo / vender por encima | 48,10 / 64,46 EUR | 43,98 / 58,72 EUR |
| Crecimiento medio proyectado · financiable | 4,5 % · 2,8 % | 3,4 % · 2,7 % |
| Capital nuevo (tope 1,25 × 13,9 % = 17,4 %) | 21,5 % (control explicado) | 17,1 % (pasa) |
| Sostenibilidad del crecimiento | En parte (base sin recortar) | En parte (base dentro de lo financiable) |

- **Supuesto cambiado: solo el crecimiento de 2027e-2033e**, de 5 / 5,5 / 5,5 / 5 / 4,5 / 4 / 3,5 % a 4 / 4,5 / 4 / 3,5 / 3 / 2,75 / 2,5 %. Medio 3,4 % = financiable (2,7 %) + 0,7 puntos de precio, por debajo de los 1,4-1,5 puntos de precio del puente, que no piden capital. Lo que ataba era el control del capital nuevo (17,1 % frente a 17,4 %): recortes menores (3,6 % medio) lo dejaban en 17,7 %.
- **Puente** reajustado: el recorte sale del volumen (2027e-2029e: 2,0 / 2,3 / 1,9 puntos frente a 2,9 / 3,2 / 3,2), con precio 1,4-1,5 y otros 0,6-0,7. Sigue cuadrando con el DCF.
- **Sin cambios** en margen, capex (11-12 % de las ventas con derechos de uso: se mantiene la inversión con menos crecimiento, lo prudente), circulante, WACC, terminal ni desplazamientos de los escenarios; solo sus narrativas (bajista 1,5-2 %, base 4-4,5 %, alcista 6-6,5 % en 2027-2029).
- Fuera la explicación del control del capital nuevo (ahora pasa). Controles: 17 de 18 correctos y 1 explicado (comparables).
- Textos reescritos: síntesis (párrafos 1, 2, 5, 6 y 7; 634 palabras), tesis, visión diferencial, `en_contra` (inversión), qué vigilar, `cambiaria_recomendacion` (43,98 EUR; margen bajo el 22 % → zona de 35 EUR), `dcf.justificacion.crecimiento`, `dcf.lectura` (inverso 2,5 % frente a 3,5 %; margen 22,2 %; −1 punto de margen 37,70 EUR), `escenarios.comentario`, `valoracion.comentario`, riesgo del bajista, pregunta de crecimiento y justificación de la sostenibilidad.
- **No cambia la señal**: Comprar con convicción media (la sugerida); el colchón se estrecha (DCF +12,9 %, y medio punto más de WACC lo deja en 37,62 EUR, casi el precio).
- 13-oct-2026: revisión v2 a 12 meses rehecha con la v3 del informe (PER propio × BPA propio): objetivo 47,25 EUR (ponderado), rentabilidad +31,0 %, base +10,7 %, señal Mantener por el filtro del base (`revision-12m-2026-10-13.md`).
- 14-oct-2026: objetivo a 12 meses con la regla de múltiplos común (`valoracion.objetivo_12m`): ponderada +31,0 % → +14,5 %, base +10,7 %, señal Mantener (`revision-12m-2026-10-13.md`).

- 2026-10-14: datos-v4.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (5 años; mediana 26.9x, mínimo 17x, media larga 34.9x; antes v2 30.1x/17.9x/25.3x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
- 2026-10-14: datos-v4.json y «Fielmann Group - 2026-10-09 v4.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v3 Comprar 26,1 % (antes v3 Comprar 48,3 %). Para comparar, con la regla v2 (historia al cierre, mismo precio): 12,3x / 14,5x / 18,9x, 14,5 % Mantener; con el tope anterior del base (×1,3, 14-oct mediodía): 48,3 % Comprar. Decide la regla vigente (v3 con tope ×1,1; METODO-VIGENTE.md).
