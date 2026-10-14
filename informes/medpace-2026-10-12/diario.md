# Diario — Medpace Holdings, Inc. (MEDP), corte 2026-10-12

- Inicio: 2026-10-12 12:11 (Madrid). Commit del repo: c14754d. Prompt sin cambios durante el análisis.
- Sesión de EE. UU. del lunes 12-oct aún no abierta: precio de cierre del viernes 9-oct-2026.

## Fase 1 — Identificación (12:11-12:16)
- Medpace Holdings, Inc., Nasdaq MEDP, ISIN US58506Q1094, CIK 1668397, sede Cincinnati (Ohio), constituida en Delaware. US GAAP, cuentas en USD, ejercicio a 31-dic (etiqueta «fin»). Emisor doméstico: 10-K, 10-Q, DEF 14A y Form 4.
- Últimos documentos: 10-K 2025 (10-feb-26), DEF 14A (1-abr-26), 10-Q 1T26 (23-abr-26) y 2T26 (23-jul-26), 8-K de resultados 2T26 (22-jul-26), 8-K 5.02 (4-jun-26) y 5.03/5.07 (19-may-26, junta).
- Próximos resultados: 3T26 el 21-oct-26 tras el cierre; conferencia el 22-oct-26.
- CRO: comparable natural ICON (informe 2026-10-09). Puntos de atención: ingresos por reembolsos (pass-through) frente a netos; anticipos de clientes (pasivos de contrato) en el circulante; recompras grandes.
- Subagentes A-E lanzados 12:17 en primer plano.

## Reanudación tras el corte (12-oct, tarde)
- El orquestador anterior se cortó por límite de uso. Notas revisadas: A, B, C, E y bolsa completas; D sin `comparables` ni `transacciones`. Sin caracteres mal codificados («Ã», «Â»: 0). Sin subagentes nuevos.
- Comparables: los seis del análisis de ICON (cifras a 8-oct de MarketScreener, Yahoo y Stock Analysis), sin Medpace y con ICON (EBITDA ajustado de MarketScreener, misma base), llevados al cierre del 9-oct con la variación de precio (≤ 2,3 %). Transacciones: las siete del análisis de ICON, con los documentos primarios ya descargados por D en `notas/docs`. Todo en `notas/comparables.mjs`.
- Propio en `propio.mjs` + `supuestos.mjs` + `comparables.mjs` + `textos.mjs`.

## Fases 5-8
- Primer cálculo (crecimiento 7-8 % convergiendo al 3,5 %, prima adicional 0,5): DCF 282,78. Ajustado a un caso base algo más generoso (9,5-8 % en 2028-2031, margen hasta 23 %, sin prima adicional): DCF 321,96 (−47,4 %), WACC 11,22 %, VT 52 %, salida implícita 9,7x EBITDA.
- DCF inverso: el precio pide 16,7 % anual 2027e-2035e (base 7,3 %) o margen del 44,5 %; rentabilidad implícita 7,3 % frente a 11,22 % y 9,8 % del mercado.
- Proyección dentro del 2 % del consenso 2026-2028. Objetivo 326,15 (−46,7 %); relativa 382,27 (−37,5 %); alcista 450,17 (−26,4 %), bajista 212,93 (−65,2 %). Las dos reglas: Vender. Convicción sugerida Alta; se baja a Media (prima histórica permanente: PER mínimo 26,3x en ocho años, sin catalizador que la cierre).
- Sostenibilidad: Sí (7,9 % anual proyectado, cuota 3,4 % → 4,2 %, sin inversión neta). ROIC 752,7 % sin sentido (capital invertido 59 M por anticipos y recompras): explicado en rentabilidad.
- Controles: 18 correctos y 1 explicado (regresión R² 0,11). Word y PDF de 60 páginas; páginas 1-4 revisadas como imagen.

## Lecciones nuevas
- **Comparables de una iteración vecina** (ICON del 9-oct para Medpace del 12-oct): si otra carpeta tiene la tabla de comparables de hace 1-3 días, se puede reutilizar llevando capitalización, valor empresa y múltiplos al nuevo cierre con la variación de precio (EV = cap / (1 − DN/EBITDA ÷ EV/EBITDA)); añade la empresa de aquella carpeta como comparable con su EBITDA en la misma base que los demás. Ahorra un subagente entero.
- **CRO con anticipos y recompras** (Medpace): el capital invertido se acerca a cero y el ROIC del motor sale en cientos por cien; la prueba de reinversión de `sostenibilidad` no da crecimiento financiable. Usa los años con capital apreciable y explica el control.
- **Gordon con WACC alto en negocios sin inversión**: el valor terminal equivale a ~1/(WACC − g) veces el NOPAT (9,7x EBITDA en Medpace), muy por debajo del múltiplo histórico; dilo en `justificacion.terminal`.
- **La tabla «La decisión» usa el crecimiento medio de toda la proyección** (7,9 %), y el DCF inverso el de los años no fijos (7,3 %): no mezcles las dos cifras en la frase de sostenibilidad.
- **Los niveles de compra y venta cambian al escribir la recomendación** (274/350 → 310/425 en Medpace): reléelos en `calc.recomendacion.niveles` después del último cálculo.
- 13-oct-2026: revisión v2 a 12 meses (PER propio × BPA propio): objetivo 627 USD ponderado (612 USD con la media simple), rentabilidad +2,4 % (base +9,7 %), señal Mantener (`revision-12m-2026-10-13.md`).
- 14-oct-2026: objetivo a 12 meses con la regla de múltiplos común (`valoracion.objetivo_12m`): ponderada +2,4 % → +3,7 %, base +9,8 %, señal Mantener (`revision-12m-2026-10-13.md`).

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (5 años; mediana 24.3x, mínimo 21.7x, media larga 23.6x; antes v2 34.5x/26.3x/31.6x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
