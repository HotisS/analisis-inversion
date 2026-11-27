# Diario: Vertiv (VRT), 27-nov-2026

- Commit de partida: `87188ae` (Tanda 1 (27-nov): Edenred, Netflix, Prysmian, Almawarid y Silicon2 rehechos).
- Inicio: 10:38 (Madrid). Fin: 11:01.
- Encargo: tanda 1127, en checkout compartido y sin subagentes.
- Iteración nueva sobre `informes/vertiv-2026-10-07/`, que no se toca.

## Motivo y dato corregido

`robustez.mjs informes/vertiv-2026-10-07` daba BLOQUEADA por **[D2 CORREGIR]**: «el precio del informe (253,14) es 1,460 veces el de mercado (173,37): parece otra divisa (CAD/USD)».
- **Era una falsa alarma.** Los dos precios son USD de la NYSE. La serie diaria de Yahoo confirma la caída real del 6-oct al 25-nov: −31,5 %. Las causas están en `bolsa.contexto`:
  - la venta sectorial del 7 al 23 de octubre;
  - la caída del Nasdaq del 4 y 5 de noviembre;
  - NVIDIA el 16-nov;
  - el −10,1 % del 20-nov.
- Otros datos corregidos con fuente primaria:
  - `proximos_resultados` era un texto largo y ahora es una fecha, 2027-02-10.
  - La «compra de UIG en sep-26» era la fecha del acuerdo (1-sep). El cierre fue el 26-oct (8-K y nota del 10-Q).
- `mensaje-ultimo.md` no menciona a Vertiv. La cobertura la tenía como «resultados 2026-10-28 sin revisar».

## Decisiones

- **BPA en base GAAP (publicado)** en la historia del PER y en los casos.
- En el PER adelantado, 2022 sale como atípico (11,5x frente a una mediana del resto de 35,4x) y 2021 como pérdidas. La historia queda en 4 años (aviso M2).
- Selector: 33,3 ÷ 20,4 = 1,63, por debajo de 1,8, así que decide la v3. La v2 se muestra como control: 20,3 %, Mantener.
- 2026e fijo con la guía del 28-oct: 14.650 M y +43,2 %. 2027e +30 %, un 2,8 % por debajo del consenso, que ya incluye UIG. 2028e +18 %.
- El margen EBITDA está en base GAAP. El ajustado del consenso suma unos 0,8 puntos.
- Puente: deuda nominal de 2.955 M y la mitad del earn-out máximo de UIG. Con eso, la caja neta de 756 M (sep-26) pasa a una deuda neta ajustada de 1.569 M.
- WACC 11,13 %:
  - Treasury a 10 años del 4,85 %;
  - beta 1,5 (Damodaran por sector; la de mercado es 2,18 y la ajustada 1,79);
  - prima de mercado del 4,41 % (Damodaran, nov-26).
- Comparables rehechos con Yahoo (mediana del PER NTM 18,5x). Yahoo no da EBITDA estimado, así que el EV/EBITDA NTM se estima con margen constante.
- Recomendación: Mantener, con convicción baja. La rentabilidad a 12 meses es alta (+33,5 %), pero el valor intrínseco (160,48) queda por debajo del precio.

## Pasos (con la fecha del dato)

| Hora (aprox.) | Paso | Fecha del dato |
|---|---|---|
| 10:38 | Encargo, robustez del informe anterior y escáner | robustez y escáner al 27-nov |
| 10:40 | `cuentas.mjs` (XBRL de la SEC) | 10-Q 3T26, presentado el 28-oct-2026 |
| 10:42 | Nota de resultados, 10-Q, 8-K de UIG, KES y dividendo; transcripción de la llamada | 28-oct, 26/27-oct y 13-nov-2026 |
| 10:45 | Precio y `movimiento.mjs VRT` | cierre del 25-nov-2026 |
| 10:46 | Consenso y objetivos (Yahoo); MarketScreener 2026e-2028e | 27-nov-2026 |
| 10:47 | Treasury a 10 años; prima de Damodaran | 25-nov-2026; 1-nov-2026 |
| 10:48 | Comparables (Yahoo) | 25/26-nov-2026 |
| 10:49 | Form 4 (`form4.mjs`) y 13G/A de BlackRock | hasta el 27-nov-2026 |
| 10:50 | Noticias y sentimiento (E.json: Stocktwits, Seeking Alpha, foros) | noticias del 6 al 26-nov; sentimiento del 25 al 27-nov |
| 10:51 | Notas A-E puestas al día, `supuestos`, `objetivo`, `textos`, `resumen` | corte 27-nov |
| 10:57 | `integrar.mjs` y `calcular-empresa.mjs` (19 de 24 controles correctos y 5 explicados) | corte 27-nov |
| 10:58 | Word (`rellenar.mjs`, cobertura del 92,2 %) y PDF (soffice) | corte 27-nov |
| 10:59 | `apuntar-12m.mjs --precios` y `robustez.mjs --actual` (con flock) | precio del 25-nov |
| 11:00 | `comprobar.mjs`: ningún ERROR en esta carpeta | 27-nov |

## Resultado

- **Recomendación: Mantener, convicción baja.**
  - Objetivo a 12 meses: 231,15 USD, +33,5 % ponderada y +34,0 % en el base.
  - Valor intrínseco: 160,48 USD (−7,4 %). El DCF da 150,03 y los comparables 170,93.
- **Robustez: SÓLIDA.** Si la tienes, Mantener; no es compra robusta.
  - Límite de compra: 160,48. Límite robusto: 160,47. Mantener hasta 188,80.
  - Colchón de BPA: 18 % para mantener.
  - Marcas: D6 CONFIANZA (el BPA crece un 45 % al año desde 2025 porque 2026 ya está casi cerrado) y los avisos M2, M6, P3 y P5. Ninguna CORREGIR.
- **Nivel: ninguno**, ni A ni B, porque el valor intrínseco está por debajo del precio.
- **Calidad.** ROIC − WACC de 17,8 puntos y sostenibilidad «Sí». Pruebas ampliadas: 7 de 10.

## Lecciones propuestas (para el coordinador)

1. La D2 de robustez («otra divisa») da un CORREGIR falso cuando el precio cae de verdad un 30-35 %, porque 1,46 se parece al cambio CAD/USD. Debería mirar la serie diaria antes de marcarlo.
2. Yahoo no da EBITDA estimado. El EV/EBITDA NTM de los comparables sale con margen constante.
3. Para leer el texto del `primary_doc.xml` de un 13G/A hay que quitar primero las etiquetas de estilo.
