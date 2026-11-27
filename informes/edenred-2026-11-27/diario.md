# Diario edenred 2026-11-27

- Commit de partida: 3d983a2 («Escáner 27-nov 9:00: revisiones y señales»). Tanda del 27-nov (encargo común de 5 agentes, sin subagentes): rehacer Edenred por el voto del Senado del 19-nov sobre la ley del título restaurante y el cruce del 10 % de Xavier Niel. Punto de partida: `informes/edenred-2026-10-21/` (notas A-E, propio, supuestos y textos copiados y puestos al día; cada dato que cambia, comprobado de nuevo).
- 09:57 Madrid: lectura del procedimiento, prompt, lecciones (Francia; flotante/vales en casos) y METODO-VIGENTE (v3 ×1,1, selector, niveles A/B, regla 13).
- 09:59 `cuentas.mjs --esef` (LEI): mismas cuentas 2019-2025 (sin ejercicio nuevo). `bolsa.mjs` (corte 26-nov) y `movimiento.mjs EDEN.PA`.
- 10:00-10:08 Noticias desde el 21-oct (`noticias.mjs --dias 45`) y fuentes primarias: texto de la comisión del Senado (ppl26-142), informe n.º 141, Public Sénat (voto del 19-nov); AMF 226C2147 (Rock Investment 10,55 %), DD de Adoue (22-oct), avisos de cortos (Ilex 2,00 %), capital a 31-oct (DILA); Brasil (cautelar del 9-nov, recurso de la AGU); bono de 800 M y mandato de recompra de 50 M. Transcripción del 3T26 (Investing). Consenso y comparables con Yahoo quoteSummary; Bund 3,32 % (Bundesbank); ERP de noviembre 4,41 % (Damodaran).
- 10:08-10:14 Notas A-E puestas al día (script propio en /tmp), propio y supuestos (acciones 232,5 M, Bund, puente: otros_ajustes 3.013, asociadas 213). Supuestos operativos sin cambios: no hay resultados nuevos.
- 10:14 Primer cálculo: DCF 48,76, valor intrínseco 45,24, WACC 8,12 %. **El selector pasa a v2** (mediana adelantada 21,0x / PER 11,6x = 1,81): 16,6 % / 17,0 %; v3 29,3 %.
- 10:15-10:17 Textos y síntesis reescritos (651 palabras); B (historia, drivers, amenazas) al día con el Senado.
- 10:17 Word (cobertura 92,4 %) y PDF (67 págs.). `comprobar.mjs`: aviso C5 (base_bpa) → corregido; sin ERROR en Edenred.
- 10:18 `apuntar-12m.mjs edenred-2026-11-27 --precios` (con flock): 26,1 % → 16,7 % (v2). `robustez.mjs --actual` (con flock): SÓLIDA, si la tienes Mantener, compra robusta no; filtro de mantener 26,86; colchón de BPA 7 % para mantener.
- Revisión a 12 meses: v2 decide, ponderada 16,6 % (apuntar 16,7 %), base 17,0 %, objetivo 28,20 EUR; recomendación Mantener (sostenibilidad «En parte»), convicción media.

## Pasos y fecha de los datos
| Paso | Fecha de los datos |
|---|---|
| Cuentas (ESEF y URD 2025, 1S26) | 31-dic-2025 y 30-jun-2026 |
| Ventas del 3T26 y transcripción | 21-oct-2026 |
| Capital y autocartera | 31-oct-2026 |
| Precio, bolsa, beta | cierre del 26-nov-2026 |
| Movimiento (regla 13) | 27-nov-2026 a media mañana |
| Senado (texto de la comisión, voto) | 4-nov y 19-nov-2026 |
| Niel (AMF 226C2147) | posición del 16-nov, publicada el 24-nov-2026 |
| Cortos (AMF) | 24-nov-2026 |
| Brasil (cautelar y recurso) | 9-10-nov-2026 |
| Consenso y comparables (Yahoo) | 27-nov-2026 |
| Bund / ERP | 26-nov-2026 / 1-nov-2026 |
| Robustez y 12 m | precio del 26-nov-2026 |

## Decisiones
- No se toca el caso base: el Senado deja el tope como facultad desde el 1-jul-2028 (algo mejor que la Asamblea) y la cautelar brasileña es provisional; los dos están en el bajista o el alcista.
- Niel no se valora (derivados liquidables en efectivo, sin intención de control); va en catalizadores y gobierno.
- Comparables rehechos con Yahoo (precio del 26/27-nov); ROIC, DN/EBITDA y FCF del último ejercicio de Stock Analysis (19-oct).
- Lección posible: el selector salta a v2 con una caída de precio sin cambio de cifras y el filtro de mantener cae de 33,50 a 26,86 EUR (ver respuesta final).
