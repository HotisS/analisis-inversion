# Diario: Gamma Communications (análisis value, corte 2026-10-21)

- Commit de partida: `6572cb38a51124939e12a81e0e9a4544d81397aa` (21-oct-2026, 16:33 UTC). Checkout compartido con otros análisis en paralelo: sin git pull, commit ni push en esta sesión (al terminar, HEAD ya era `a471f5cc`, de otra sesión).
- Inicio ≈ 16:34 UTC; fin ≈ 17:06 UTC del 21-oct-2026 (con una interrupción por límite de contexto a mitad de la recogida de datos).
- Encargo: análisis value completo desde cero (no había informe anterior de Gamma), procedimiento de `/analiza-empresa`.

## Decisiones

1. **Cuentas**: ESEF de filings.xbrl.org (`cuentas.mjs --esef`, LEI 213800LAQZXPRIZUEH50) solo trae 2024-2025 y su amortización solo recoge intangibles (EBITDA mal): la cuenta 2021-2025 se toma de las notas de resultados anuales y se comprueba con el ESEF en 2024-2025. Patrimonio = activo − pasivo − minoritarios (incluye la reserva de −1,1 M de opciones de venta sobre minoritarios).
2. **BPA de la regla en base ajustada** de la empresa (misma definición desde 2018: fuera la amortización de compras y los extraordinarios), igual que el consenso. El DCF resta 0,4 puntos de margen por extraordinarios que se repiten (2022, 2023, 2025).
3. **Amortización del DCF = la de activos propios** (3,3 % de las ventas en 2025): la de intangibles de compras no es caja ni desgrava (compras de acciones en el Reino Unido). Inversión = capex + arrendamientos. Circulante del 5,8 % con activos y pasivos de contrato (control del motor).
4. **Yahoo da el BPA del consenso de GAMA.L en GBP**, no en peniques (lo que está en peniques es el precio y los objetivos): primer intento dividido por 100 por error, corregido (PER NTM pasó de 1.088x a 11,0x).
5. **Oferta de Epiris (1.120 p, final, juntas el 2-nov-2026)**: la regla v3 da Comprar (ponderada 23,0 %, base 19,6 %, valor intrínseco 12,03 GBP), pero el precio está topado por la oferta. Recomendación **Mantener** apartada de la regla con `justificacion_recomendacion`; regla 13 **«descarta»**. Robustez: FRÁGIL, acción robusta «Mantener en cartera».
6. Puente a 30-jun-2026 con 18,0 M de pasivos de compras y 7,0 M de recompras pagadas tras junio en `otros_ajustes`; acciones 90,6 M (base diluida de la oferta).
7. Gilt a 10 años: el Bank of England no respondió a la descarga; se usa el 5,30 % del 16-oct (serie IUDMNPY) registrado hoy en el informe de Kainos.
8. Tamaño del mercado: no hay serie pública en GBP; estimación propia (ventas de Gamma ÷ ≈ 14 % de cuota en puestos) con el crecimiento de usuarios de nube de Cavell que cita el informe anual. Confianza baja.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas 2024-2025 | `cuentas.mjs --esef` (filings.xbrl.org) | 31-dic-2025 (publicado 7-abr-2026) |
| Cuentas 2021-2023 y BPA ajustado 2018-2023 | Notas de resultados anuales (gammagroup.co) | 2019-2024 |
| Semestre | Interim results 1S 2026 | 30-jun-2026 (publicado 7-sep-2026) |
| Informe anual, gobierno, remuneración | Annual Report 2025 | 7-abr-2026 |
| Votos de la junta | RNS Result of AGM | 13-may-2026 |
| Oferta y calendario | RNS Regla 2.7, scheme document, offer update | 1-sep, 25-sep y 19-oct-2026 |
| Bolsa (rentabilidades, beta, cierres) | `bolsa.mjs --accion GAMA.L --indice MIDD.L --sector EXV2.DE` | cierre del 21-oct-2026 |
| Movimiento (regla 13) | `movimiento.mjs GAMA.L` | 21-oct-2026 |
| Consenso y comparables | `notas/yahoo-datos.mjs` (Yahoo quoteSummary) | 21-oct-2026, 15:38 UTC (GAMA.L) |
| Tipos de cambio | Yahoo chart (GBPUSD, GBPEUR, GBPSEK) → `notas/fx.json` | 21-oct-2026 |
| Gilt a 10 años | Bank of England IUDMNPY (vía informe de Kainos) | 16-oct-2026 |
| Prima implícita | Damodaran ERPbymonth | oct-2026 |
| Sentimiento | Motley Fool UK, AJ Bell, HL, ISPreview (búsqueda web) | mar-oct 2026 |
| Notas A-E | `notas/construir-notas.mjs` | 21-oct-2026 |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` (21 de 22 controles; 1 explicado) | 21-oct-2026 |
| Word y PDF | `motor/rellenar.mjs` (cobertura 90,6 %), LibreOffice | 21-oct-2026 |
| Rentabilidad a 12 meses | `apuntar-12m.mjs gamma-2026-10-21` | 21-oct-2026 |
| Símbolo y precio | `simbolos.json` (GAMA), `precios.mjs GAMA` (1.088 GBp) | cierre del 21-oct-2026 |
| Robustez | `robustez.mjs informes/gamma-2026-10-21 --actual` | 21-oct-2026 |
