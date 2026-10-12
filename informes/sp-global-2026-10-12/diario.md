# Diario — S&P Global Inc. (SPGI), corte 2026-10-12

- Commit de partida: a5ae59d (prompt de empresa con bloque de sostenibilidad del crecimiento). No se cambia de versión durante el análisis.
- Fecha de corte: 2026-10-12 (lunes). La sesión de EE. UU. no ha cerrado: precio = cierre del viernes 9-oct-2026.
- Primer análisis de SPGI en el repo (no hay iteraciones anteriores).

## Fase 1 — Identificación
- S&P Global Inc., NYSE: SPGI, ISIN US78409V1044, CIK 64040. Sede: 55 Water Street, Nueva York. Constituida en Nueva York.
- Divisa de cuentas y de cotización: USD (tipo de cambio 1). Ejercicio natural (cierre diciembre, etiqueta «fin»). US GAAP.
- **Hecho clave de perímetro**: el 1-jul-2026 se completó la escisión de Mobility (Mobility Global Inc., NYSE: MBGL), 1 MBGL por cada SPGI con fecha de registro 15-jun-2026 (8-K 2-jul-2026). El 6-jul-2026 (8-K/A) la empresa publicó cuentas pro forma (artículo 11) sin Mobility de 2023, 2024, 2025 y 1T26 y balance pro forma a 31-mar-2026, más la nueva segmentación (Ratings, Indices, Energy —Platts + CERA— y Market Intelligence).
- 2T26 (28-jul-2026): ingresos GAAP 4.146 M (con Mobility); pro forma sin Mobility 3.678 M (+11 %); BPA diluido pro forma 4,08 USD; ajustado 4,83 USD. Guía 2026 sin Mobility: ingresos +5,9-7,9 %, BPA GAAP 16,35-16,60, ajustado 17,50-17,75; recompras > 7.000 M en 2026; dividendo trimestral 0,97 USD.
- Desde 3T26 las cuentas ya no incluyen Mobility. Próximos resultados (3T26): fecha a confirmar por D (históricamente, finales de octubre).
- Decisión de perímetro: el DCF y la valoración se hacen sobre S&P Global **sin Mobility** (la acción cotiza sin ella desde el 1-jul). Serie de cuenta: 2023-2025 pro forma sin Mobility (8-K/A); 2019-2022 reportados (2022 con IHS Markit desde 28-feb-2022 y con Mobility), declarados en `cambios_perimetro`.

## Subagentes
- Lanzados A-E en un solo mensaje, en primer plano.
- Los cinco terminaron (A 11 min, B 13, C 9, D 13, E 5). Notas completas; E sin comentarios de particulares (Stocktwits/Reddit 403, Seeking Alpha con captcha).

## Integración, cálculo y valoración
- Supuestos en notas/propio.mjs (+ textos.mjs). DCF de 10 años (2026e fijo, +7,5 %), crecimiento medio 6,4 %, margen EBITDA 51,5 % → 55 %, amortización 6 % → 2 % (intangibles de IHS que se agotan), capex 1,4 % → 2 %, circulante −10 %, terminal Gordon 3,5 % (explicado en controles: bono al 5,24 %).
- WACC 10,38 % (bono 5,24 %, beta 1,05, prima 5,5 %). DCF 321,80 USD; DCF inverso: el precio descuenta 9,2 % de crecimiento frente a 6,3 % del base (rentabilidad implícita 9,1 %). Con la prima de Damodaran (4,20 %): DCF 405,64, objetivo 398,10.
- Primera pasada (crecimiento 6,5→4 %, terminal 3 %): DCF 288,68 (−29 %) → revisado (fase 6) por estar a >30 % del precio y por debajo del consenso de 2028.
- Proyección frente al consenso: −1,1 % / +0,4 % / +0,3 % en ingresos 2026-2028.
- Resultado: valor objetivo 351,69 USD (−13,8 %), rentabilidad total −12,8 %; regla absoluta Vender, relativa Mantener → Mantener, convicción Baja (sugerida). Escenarios: alcista 422,42 (+3,6 %), bajista 211,29 (−48,2 %).
- Minoritarios a mercado (8.900 M, CME 27 % de S&P DJI + Crisil) frente a 5.139 M contables: ≈ 12,8 USD por acción.
- Controles en «Revisar»: 2, ambos explicados (terminal 3,5 % y regresión R² 0,15). Aviso de rellenar: esg.calificaciones vacía.
- Word: S&P Global - 2026-10-12.docx; PDF de 63 páginas, Word lo abre sin reparar.

## Lecciones nuevas
- **Escisiones recientes (Mobility, 1-jul-2026)**: el 8-K/A de la escisión trae cuentas pro forma (artículo 11) de tres años y un trimestre más el balance pro forma; con eso se arma la serie sin la escindida (2023-2025) y se declara en `cambios_perimetro`. El balance anual queda con la escindida: el ROIC de esos años no es del todo comparable.
- **Deuda que se lleva la escindida**: la escindida emitió 2.000 M en bonos y pagó 1.974 M a la matriz antes de la fecha; si el balance del trimestre es del día anterior a la escisión, hay que restar su deuda (y estimar su caja) en el puente.
- **Yahoo trata una escisión como un desdoblamiento** (SPGI: factor 1,057): las rentabilidades ya incluyen la acción repartida; los cierres de ejercicios anteriores hay que multiplicarlos por el factor para recuperar el precio real.
- **Tasa libre alta (bono al 5,24 %)**: con prima del 5,5 % el WACC de una empresa de beta ~1 pasa del 10 %; la regla relativa (prima de Damodaran) es la que da la lectura útil, y la convicción baja porque la diferencia es de tasa y no de cifras.
- **Minoritarios rescatables (CME en S&P DJI)**: figuran a valor razonable fuera del pasivo; a mercado (por múltiplo del negocio) valen bastante más que el contable. Decidirlo explícitamente: mueve ~3 % del valor.
