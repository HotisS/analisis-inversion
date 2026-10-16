# Diario · Honeywell Aerospace (HONA) · 16-oct-2026

- Commit de partida: 7409c4a. Prompt y regla de múltiplos (v3 con tope ×1,1 y selector) sin cambios durante el análisis.
- Entorno: nube de Claude Code. Sin subagentes: notas A-E escritas por `notas/construir-notas.mjs`; parte propia en `propio.mjs` + `supuestos.mjs` + `textos.mjs`. Ficha sectorial nueva en `notas/ficha-sector.md` (no había ficha de aeroespacial civil).
- Fecha de corte 2026-10-16; divisa USD; ejercicio natural; US GAAP. Precio 163,11 USD, cierre del 15-oct (`bolsa.mjs`).
- Fuentes de núcleo: S-4 de julio (estados combinados auditados 2023-2025 y pro forma), folleto informativo de junio, 10-Q del 2T26, nota de resultados del 2T26, 8-K de cierre de la escisión, 10-K de Honeywell de 2020 y 2022 (segmento Aerospace), Oliver Wyman (MRO 2026-2036), SIPRI, Form 4, consenso de MarketScreener y Stock Analysis, DGS10 (5,19 %), BCE.
- Decisiones:
  - `cuentas.mjs --sec HONA` falla: aún no hay ejercicio anual en el XBRL. Cuentas a mano de los estados combinados; solo tres ejercicios con el perímetro actual (hueco de núcleo registrado) y la historia larga del segmento en los 10-K de Honeywell.
  - EBITDA propio después de licencia de la marca (225 M al año hasta mediados de 2031), pagos en acciones y medioambiente normal; antes de costes de separación e ingreso de pensiones. 2026e al 23,7 %, cuadrado con la guía de EBIT ajustado (4.400 M) menos lo que la empresa excluye.
  - WACC 9,74 % con beta 1,15 (mediana de comparables reapalancada; no hay beta propia).
  - Puente a 27-jun-2026: deuda 16.006, caja 1.057, minoritarios 420 (unas 12 veces su beneficio), pensiones −1.077 (superávit de 2.727 M al 50 % después de impuestos), otros 1.109 (medioambiente después de impuestos, intereses devengados, costes de separación pendientes). Factoring y financiación de proveedores fuera (−2,5 USD por acción si se sumaran).
  - Pesos DCF 50 / escenarios 30 / comparables 20. El valor intrínseco queda justo por encima del precio y depende de ese 20 % (sin comparables, 138,80).
  - BPA de los casos a 12 meses con el ingreso de pensiones (base elegida antes del resultado); sin él la ponderada rozaría el 15 %.
- Resultado: DCF 142,07 (−12,9 %); valor intrínseco 164,68 (+1,0 %); DCF inverso 7,5 % de crecimiento frente al 5,9 % del base; con la prima del mercado 182,14. ROIC 35,4 % frente a WACC 9,74 % (25,69 puntos; unos 20,6 como empresa independiente). Sostenibilidad «Sí» (motor y analista). 20 de 21 controles y 1 explicado (historia del PER inexistente). Cobertura 87,7 %.
- **Línea 12 m (v2 sin historia)**: objetivo 185,99 USD (BPA 2028e 6,99 / 10,33 / 11,33 × PER 15,3 / 18,0 / 23,4), ponderada +14,0 %, base +14,0 % → Mantener. Comprar < 161,73; vender > 206,65. Robustez: FRÁGIL, acción robusta No mantener; límite robusto 145,61. Detalle en `revision-12m-2026-10-16.md`. No apuntado (lo hace el coordinador).
- Regla 13: `movimiento.mjs` (1 m −0,7 %, 3 m −22,9 %, −39,6 % del máximo de 52 semanas, +7,6 % del mínimo, peor mes −30,3 % hasta el 6-ago); veredicto global «no cambia». Próximos resultados: 28-oct-2026 tras el cierre (nota de la empresa del 29-sep).
- Para subir la confianza: primer 10-K (feb-2027) con cuenta completa e intereses; beta propia a partir de 2027; guía de 2027.

## Lecciones

- Escisiones recién cotizadas en EE. UU.: `cuentas.mjs` falla hasta el primer 10-K; las cuentas salen del S-4 o del Form 10 (estados combinados) y del 10-Q. El motor cae si `per_historico` es null: hay que pasar `actual` con el resto a null.
- Escisiones sin historia de PER: el base es el PER de hoy y la rentabilidad a 12 meses es solo el crecimiento del BPA; cualquier ingreso constante que se sume al BPA (pensiones) baja ese crecimiento y puede mover la señal. Decidir la base antes de calcular y decirlo.
