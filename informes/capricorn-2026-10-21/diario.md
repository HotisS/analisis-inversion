# Diario: Capricorn Metals (CMM.AX), análisis value del 21-oct-2026

- Commit de partida: `8c0d1eb` (MONY Group: análisis value completo 21-oct), 08:09 UTC. Checkout compartido con otro análisis en paralelo: sin pull, commit ni push desde este hilo.
- Inicio: 08:09 UTC.
- Fin: 08:38 UTC (≈ 30 minutos).

## Decisiones

- **Cuentas**: Australia no tiene XBRL en `cuentas.mjs`. Estados auditados (KPMG) de FY2022-FY2026 descargados de la ASX (PDF directos de `announcements.asx.com.au/asxpdf/`; las páginas `displayAnnouncement.do` devuelven las condiciones de uso). Ingresos = ventas de oro; el ajuste de las coberturas y las pérdidas de derivados van al resultado financiero para que BAI y beneficio neto sean los estatutarios (comprobado año a año).
- **BPA de la historia del PER**: subyacente diluido (las coberturas hunden el estatutario de FY2023 y restan en FY2025-FY2026).
- **Oro**: 5.900 AUD/oz plano en el base (cierre del 21-oct); escenarios 5.000 / 6.700 AUD combinados con el plazo de Mt Gibson (12 / 6 / 0 meses de retraso sobre el calendario de la empresa). Los perfiles de crecimiento de los escenarios se calculan en `supuestos.mjs` a partir de las rutas de onzas y precio.
- **Mt Gibson en el base con 6 meses de retraso**: falta la aprobación estatal (Parte IV y Parte V); la federal llegó el 30-jun-2026.
- **WACC 13,5 %**: 5,31 % (RBA F2) + 1,30 × 5,5 % + 1,0 % por mina única con proyecto pendiente. Terminal −3 % (mina que se agota), como Lundin Gold.
- **Puente a 30-jun-2026**: caja 504,8; arrendamientos 20,3; otros ajustes 194,2 (impuesto de FY2026 por pagar 102,8 + dividendo pagado el 9-oct 22,8 + rehabilitación 82,3 − Big Springs mantenido para la venta 13,7). No recoge la caja del 1T FY2027 (535,0 M de caja y oro a 30-sep).
- **PER actual**: precio ÷ (0,69 × FY2027e + 0,31 × FY2028e) = 18,5x, misma base que la historia adelantada. Con solo FY2028e daría Vender (≈ −11 %); con solo FY2027e, Mantener (+8 %). Explicado en `revision-12m-2026-10-21.md`.
- **Regla 13**: veredicto «no cambia»: todos los movimientos fuertes de 12 meses siguen al oro o a noticias ya recogidas (PFS de julio).
- **No se pudo borrar** los `.html` de condiciones de la ASX que dejó el primer intento de descarga en `notas/docs/` (la comprobación de seguridad bloqueó el `rm`); no tienen datos.
- Resultado: Mantener (v3 +0,4 % ponderada, base +7,3 %; v2 +8,2 %). Valor intrínseco 10,35 AUD. Controles 20 de 20. Robustez: SÓLIDA, «No mantener» (valor intrínseco un 25 % bajo el precio), límite de compra 10,35 AUD.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cotización, betas, cierres de junio | `herramientas/bolsa.mjs` (Yahoo CMM.AX, STW.AX, GDX.AX) | 21-oct-2026 (cierre de Sídney) |
| Movimiento (regla 13) | `herramientas/movimiento.mjs CMM.AX` | 21-oct-2026 |
| Noticias de 12 meses | `herramientas/noticias.mjs` y anuncios de la ASX | oct-2025 a 21-oct-2026 |
| Consenso y datos de mercado | Yahoo quoteSummary (`notas/yahoo-datos.mjs`), FNArena | 21-oct-2026 |
| Comparables | Yahoo quoteSummary (`notas/yahoo-comparables.mjs`) | 21-oct-2026 |
| Cuentas anuales | Annual Report 2026 y estados auditados FY2022-FY2025 (ASX) | 30-jun-2026 (publicado 27-ago-2026) |
| Semestre y trimestres | Notas de 1S FY2026 y trimestrales dic-25, mar-26, jun-26 | 31-dic-2025 a 30-jun-2026 |
| Producción y caja del 1T FY2027 | «KGP Q1 Production 31koz» (ASX) | 30-sep-2026 (publicado 5-oct) |
| Mt Gibson, reservas, Range 500 | PFS actualizada y reservas (ASX) | 27-jul-2026 |
| Gobierno | Annual Report 2026, juntas de 2025 y 2026, Appendix 3Y | 27-ago-2026 / 4-sep-2026 |
| Bono a 10 años | RBA F2 | 14-oct-2026 |
| Prima de riesgo y betas sectoriales | Damodaran | oct-2026 / ene-2026 |
| Oro y AUD/USD | Yahoo GC=F y AUDUSD=X | 21-oct-2026 |
| Notas A-E | `notas/construir-notas.mjs` | 21-oct-2026 |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 21-oct-2026 |
| Word y PDF | `motor/rellenar.mjs`, LibreOffice | 21-oct-2026 |
| Revisión a 12 meses | `herramientas/apuntar-12m.mjs` | 21-oct-2026 |
| Precio para la decisión | `herramientas/precios.mjs CMM` | 21-oct-2026 (13,88 AUD, dato de las 05:19 UTC, tras el cierre) |
| Robustez | `herramientas/robustez.mjs --actual` | 21-oct-2026 |
