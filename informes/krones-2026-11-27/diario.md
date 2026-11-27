# Diario · Krones (KRN.DE) · corte 27-nov-2026

- Commit de partida: 87188ae («Tanda 1 (27-nov): Edenred, Netflix, Prysmian, Almawarid y Silicon2 rehechos»). Encargo del hilo principal (tanda 1127): está a ≈6 % de su nivel B (97,21 EUR) y el 3T26/9M26 del 6-nov no se había revisado. Sin subagentes; sin git ni escrituras fuera de la carpeta (temporales en /tmp/claude-0/tanda-1127/krones/).
- Horas (Madrid): inicio 10:38 · documentos del 3T26 leídos 10:41 · consenso, comparables, Bund y BCE 10:45 · notas A-E y propio, primer cálculo 10:50 · Word y PDF 10:53 · robustez, apuntar-12m (flock) y comprobar.mjs 10:54 · revisión y diario 10:56.

## Pasos y fecha de los datos
1. Informe trimestral 9M26 (41 páginas) y presentación de la conferencia: publicados el 6-nov-2026 (krones.com). Transcripción: solo la apertura (Seeking Alpha, de pago); se usa la entrevista al primer ejecutivo de Börsen-Zeitung del 6-nov.
2. Hecho relevante de la guía: 22-oct-2026 (EQS / Deutsche Börse; RTTNews y Börsen-Zeitung para la reacción).
3. Cuentas anuales 2018-2025: del informe del 9-oct (sin XBRL: `cuentas.mjs --esef` no tiene emisores alemanes, lecciones-paises); comprobado el balance de 31-dic-2025 contra el trimestral (caja 549,5; patrimonio 2.128,7).
4. Bolsa: `bolsa.mjs --corte 2026-11-26` (KRN.DE, EXS3.DE, EXH4.DE), cierre del 26-nov 103,40 EUR; `movimiento.mjs` con la toma del 27-nov (105,20 EUR); `movimiento-precio.mjs`.
5. Consenso: Yahoo quoteSummary del 27-nov (BPA 2026e 9,89 y 2027e 10,38, 10 analistas, objetivo 137,70); Stock Analysis del 27-oct (141,80); MarketScreener del 22-oct (2028e, anterior al aviso, solo referencia); recortes de objetivo del 22-23-oct (goldesel).
6. Comparables: Yahoo quoteSummary del 27-nov (guardado en `notas/docs/yahoo-quotesummary-2026-11-27.json`; consulta en `notas/yahoo-consulta.mjs`), tipos del BCE del 26-nov.
7. Bund 3,32 % (Bundesbank, 26-nov); prima implícita de Damodaran de noviembre 4,41 % (misma cifra que la tanda).
8. Operaciones de directivos: Hargreaves Lansdown (datos EQS) al 27-nov: compra de Schawei GmbH el 12-oct.
9. Sentimiento: stock3, goldesel y Seeking Alpha (oct-nov 2026); sin foros con debate real.
10. Cálculo (19 de 19 controles), Word (cobertura 92,2 %, 2 avisos: suma de partes vacía y mapa de comparables sin EV/EBITDA NTM) y PDF de 55 páginas: 27-nov.
11. Robustez (también `--actual`) y `apuntar-12m --precios`, con flock: precio del 26-nov.

## Decisiones
- Notas A-D construidas con `notas/construir-notas.mjs` a partir de las del 9-oct solo para lo que no cambia (cuentas anuales, historia, sector, consejo); todo lo que se mueve se rehace (3T26, LTM sep-26, puente a 30-sep, guía, consenso, bolsa, comparables, WACC). Se quitan de D las fuentes del 9-oct que ya no se usan.
- LTM sep-26 = 2025 − 9M25 + 9M26; la devolución de aranceles de EE. UU. (+10 M de EBITDA, −20 M de ventas) va como no recurrente en el LTM.
- Puente: el trimestral agrupa arrendamientos y otros pasivos financieros (192,6 M); arrendamientos 159,0 M por diferencia (estimación), 31,7 M de pagos aplazados y opciones de venta en otros ajustes.
- DCF: 2026e +0,6 % (fijo), 2027e +2,0 %, 2028e +3,5 % (6.015 M, suelo del objetivo nuevo), margen 11,0/11,0/11,3 %; circulante 17,5 % (17,0 %); Bund 3,32 %; beta 1,10 como el 9-oct (la de bolsa.mjs frente al MDAX da 0,76; explicado).
- Escenarios: se mantienen la estructura y las probabilidades del 9-oct (30/50/20; bajista tipo 2020 en 2027); el alcista pasa a ser el techo del objetivo nuevo (6.250 M y 12 %). No se tocan las probabilidades para acercar el resultado: con 25/50/25 daría Comprar (18,8 %), y se dice como variante.
- Base de BPA publicada en historia y casos; historia adelantada con 2025 ÷ BPA propio de 2026e (9,59). v2 (al cierre) añadida como control.
- Comparables rehechos con un solo proveedor (Yahoo); SIG y Tomra publican en EUR y cotizan en CHF/NOK: convertidos antes de dividir. EV/EBITDA NTM en null (Yahoo no da EBITDA estimado).
- Regla 13: veredicto «no cambia» (caída del 22-oct por la guía, ya en el informe; sin colocaciones ni ventas de directivos; compra de una consejera el 12-oct).

## Revisión a 12 meses
- v3 ponderada 12,1 % / base 21,1 % → **Mantener** (v2 1,8 %), objetivo 113,16 EUR; valor intrínseco 128,32 EUR. Robustez FRÁGIL; si la tienes, Mantener (filtro hasta 105,41 EUR); compra no robusta. **Nivel hoy: ninguno; A 91,02 EUR y B 95,16 EUR** (B estaba en 97,21 con el informe anterior). apuntar-12m: Mantener 5,2 % (112,60) → Mantener 12,1 % (103,40).
- `comprobar.mjs`: ningún ERROR de Krones (los 5 del listado son de otras carpetas de la tanda y de la cartera).
