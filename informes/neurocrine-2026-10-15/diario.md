# Diario · Neurocrine Biosciences (NBIX) · 15-oct-2026

- Commit de partida: d101b73 (Seguimiento: regenerado). Sin `git pull` ni commits (encargo 9: los hace el coordinador).
- Entorno: nube de Claude Code con red abierta. Fases 2-4 hechas por mí sin subagentes (`notas/construir-notas.mjs` escribe A-E; `propio.mjs` + `supuestos.mjs` + `textos.mjs`).
- Fecha de corte 2026-10-15; precio = cierre del 14-oct (135,91 USD, Yahoo vía bolsa.mjs; la sesión del 15-oct no había cerrado). USD, US GAAP, ejercicio natural.
- Origen: escáner «calidad a precio» (caja neta, rentable, PER adelantado moderado). **La premisa de caja neta está superada**: en mayo de 2026 compró Soleno (VYKAT XR) por 2.830 M en caja; la caja neta pasó de 2.543 M (dic-25) a 482 M (jun-26), sin deuda.
- Fuentes: XBRL de la SEC (`cuentas.mjs --sec NBIX`), 10-K 2025, 10-Q 1T y 2T26, notas de resultados 4T25-2T26, 8-K de Soleno y de la junta, proxy 2026, Form 4 (`form4.mjs`), Stock Analysis (consenso y comparables), FRED, BCE, prensa sectorial (IRA, AUSTEDO, VYKAT XR), Stocktwits y Seeking Alpha (sentimiento).
- Comprobaciones del encargo: INGREZZA 88 % de las ventas de 2025 (2.514 de 2.861 M); 22 patentes hasta 2040 y genéricos pactados desde el 1-mar-2038; IRA: INGREZZA tiene la excepción de pequeña biotecnológica hasta la selección de 2027, con precio negociado desde 2029 (no está en las listas de 2027 ni 2028); AUSTEDO con precio negociado desde 2027 (−38 % sobre lista). CRENESSITY: 135 → 153 → 184 M por trimestre (4T25-2T26), sin guía. Cartera: osavampator (NBI-'845, potenciador AMPA, fase 3 en depresión mayor, datos en 2027); direclidina (agonista M4, fase 3 en esquizofrenia, datos en 2027); NBI-1117570 (M1/M4) en fase 2. Royalties de elagolix (AbbVie) dentro de «otros» (45,6 M en 2025). Pagos en acciones 218 M (46 % del beneficio). 3T26: 29-oct-2026 (fecha estimada).
- Decisiones: BPA publicado normalizado (pagos en acciones y amortización de intangibles dentro; I+D adquirida a 25 M/año); DCF por producto 2026e-2035e con caída de INGREZZA en 2029 (−9,5 %) y terminal «media» (Gordon 1 % y 8x EBITDA) por los genéricos de 2038; WACC 10,61 % (beta 0,8, +1 punto por concentración). Caja del puente = efectivo + valores negociables; participaciones cotizadas (147,3 M) como asociadas. Sostenibilidad «Sí» (motor «Sí»: no salta el control). Pesos DCF 50 / comparables 20 / escenarios 30.
- Resultado: DCF 145,26 USD; valor intrínseco 156,01 (+14,8 %); DCF inverso 4,0 % (base 5,1 %). ROIC 56,6 % frente a WACC 10,61 % (pro forma con Soleno ≈ 26 %).
- **Línea 12 m**: selector → v2 (desrateada, mediana adelantada 29,4x = 1,9 × 15,1x). Objetivo 175,88 USD; ponderada +29,4 %, base +24,8 % → Comprar, convicción baja (absoluta Mantener, relativa Comprar). v3 sin selector 42,8 % / 37,2 %. Comprar < 151,40; vender > 195,43. Detalle en revision-12m-2026-10-15.md.
- Robustez: SÓLIDA en las variantes de múltiplo, pero D6 CONFIANZA (BPA +34 % anual desde 2025) → acción robusta **Mantener**; E2 (resultados en 14 días); D3 (NBIX no está en precios.json: el coordinador debe añadirla a `verticales/empresa/simbolos.json`).
- Word y PDF (soffice): 19 de 20 controles y 1 explicado (crecimiento del BPA). Cobertura 88,7 %. Avisos que quedan: gráficos de comparables y transacciones sin EV/EBITDA NTM (no hay dato gratuito).
- Ficha sectorial nueva: `sectores/biofarma-neurologia-2026-10-15.md` (+ comparables JSON).
- Tiempo: unos 20 minutos de reloj (10:17-10:37 UTC).

## Lecciones

- Un escáner de «caja neta» puede venir con un balance de antes de una compra grande: mirar los 8-K de los últimos seis meses (ítems 1.01/2.01/2.03) antes de nada.
- Stock Analysis abre con WebFetch (no con curl) y da capitalización, EV, márgenes, ROIC y PER adelantado de los comparables de EE. UU. al cierre del día; su PER adelantado es sobre BPA ajustado: pasar a la base publicada con el cociente de la propia empresa.
- En farmacéuticas con patentes fechadas, el terminal «media» con un múltiplo de salida igual al de comparables con precipicio cercano (Jazz, Incyte, 8-9x EBITDA) evita un Gordon que ignora los genéricos.
