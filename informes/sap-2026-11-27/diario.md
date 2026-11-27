# Diario · SAP SE (SAP.DE) · 27-nov-2026

- Commit de partida: `3d983a2` («Escáner 27-nov 9:00: revisiones y señales»). Encargo de la tanda del 27-nov (rehacer informe value; en cartera; el escáner la pone en nivel A para ampliar). Informe anterior: `informes/sap-2026-10-21/` (día de resultados del 3T26). Sin subagentes: fases A-E hechas a mano partiendo de las notas del 21-oct, con cada dato que cambia comprobado a hoy.
- Horas de Madrid: inicio 10:21; precio, bolsa y movimiento 10:21-10:22; noticias, transcripción, recompra, consenso y comparables 10:22-10:28; notas y supuestos 10:28-10:32; textos, cálculo, Word y PDF 10:32-10:36; revisión 12 m, apuntar y robustez (con flock), comprobar 10:36-10:37.

## Pasos y fecha de los datos
| Paso | Fuente | Fecha de los datos |
|---|---|---|
| Precio, rango, rentabilidades, beta (`bolsa.mjs`) | Yahoo | cierre 26-nov-2026 (194,14) |
| Movimiento (`movimiento.mjs`) | Yahoo | 27-nov-2026, sesión en curso (192,90) |
| Cuentas, LTM y balance | notas del 21-oct (Quarterly Statement 3T26; 6-K del 26-oct comprobado) | 30-sep-2026 |
| Transcripción del 3T26 | Motley Fool (AOL) | 21-oct-2026 |
| Recompra y acciones | sap.com, Share Buy-back 2026 | 20-nov-2026 |
| Consenso y objetivos | MarketScreener (cierre 20-nov) y Yahoo quoteSummary | 27-nov-2026 |
| Comparables | Yahoo quoteSummary + BCE 1,0975 | 25/26-nov-2026 |
| Bund 10 años | Bundesbank (Svensson) | 26-nov-2026 (3,32 %) |
| Prima implícita | Damodaran ERPbymonth | nov-2026 (4,41 %) |
| Noticias (Saueressig, ciberataque, recorte de plantilla, venta del sector) | SAP News, SecurityWeek, Cyber Security News, Bloomberg vía Oninvest, Forbes | 17 a 27-nov-2026 |
| Sentimiento | Stocktwits API, RSS de Seeking Alpha | 3 a 27-nov-2026 |

## Decisiones
- Sin trimestre nuevo: cuentas, LTM, balance y segmentos iguales; puente a 30-sep con 522 M de recompras posteriores en otros ajustes y 1.149,6 M acciones (−2,66 M del 1-oct al 20-nov).
- Supuestos del DCF y escenarios sin cambios (la transcripción modera 2027 y el consenso sube un 1-2 %: se compensan). Tasa libre 3,32 %.
- Comparables rehechos con el consenso posterior a sus resultados (no llevados al precio): BPA ajustado de Yahoo menos pagos en acciones (% de ventas del 10-K, como en octubre); EBITDA NTM = LTM × crecimiento de ingresos (estimación propia). Mediana PER NTM 17,9x.
- `base_bpa: publicado` en objetivo_12m y en per_historico (la historia y los casos son NIIF de actividades continuadas).
- Añadido `riesgos.ia` (faltaba en el informe del 21-oct).
- Regla 13: veredicto **retrasa** por el ciberataque confirmado el 27-nov (código alterado en GitHub según Der Spiegel; SAP no ve acceso a datos de clientes pero no dice si el código llegó a productos). Condición: que SAP aclare el alcance. La caída del 17-20-nov (−13,9 %) es de sector (rivales −10 a −16 %): no cambia. Recorte de 10.000 empleos (Bloomberg, sin confirmar): no cambia.
- Recomendación: Comprar (sigue la regla), convicción baja (sugerida: reglas absoluta y relativa discrepan).

## Resultado
- v3 26,8 % / base 28,7 %; v2 19,0 % / 17,0 %; BPA −10 % 14,3 % / 16,0 %. Objetivo ponderado 243,74 EUR. Valor intrínseco 199,13 (+2,6 %); DCF 202,04 (WACC 9,10 %).
- Robustez SÓLIDA; Si la tienes: Mantener; ¿Compra robusta?: no (Esperar: C1 ciberataque y B1). Sin el C1: nivel B al cierre (A ≤ 193,03; B ≤ 199,12). Filtro de mantener 223,88 EUR; banda de venta de la regla > 273,60.
- `apuntar-12m.mjs sap-2026-11-27 --precios` y `robustez.mjs sap-2026-11-27 --actual` con flock. `comprobar.mjs`: ningún ERROR en esta carpeta (C10: `simbolos.json` apunta aún a la carpeta vieja de SAP; lo cambia el coordinador).
- Línea de la revisión a 12 meses: SAP: Mantener 24,2 % (208,65) → Comprar 26,8 % (194,14, 26-nov).
