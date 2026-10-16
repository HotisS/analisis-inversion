# Diario · Recordati (REC.MI, Euronext Milan) · 16-oct-2026

- Commit de partida: 0f09d25; durante el trabajo el árbol pasó a a17f501 por los commits de otros procesos. Sin `git pull` ni commits propios (los hace el coordinador).
- Entorno: nube de Claude Code. Sin subagentes: notas A-E (`notas/construir-notas.mjs`) y propio (`propio.mjs` + `textos.mjs` + `resumen.mjs`) escritas por mí.
- Fecha de corte 2026-10-16; EUR; ejercicio natural; NIIF-UE; cuenta por función.
- **Cuentas**: `cuentas.mjs` da un ESEF parcial hasta 2024 (`notas/cuentas-xbrl.json`, no usado). Cuentas 2021-2025 de los estados NIIF de los informes anuales 2022, 2024 y 2025 (lista de documentos en recordati.com, PDF en cloudfront); LTM de la relación semestral de junio de 2026.
- **Precio**: 53,00 EUR, cierre del 14-oct (Yahoo no da el del 15-oct). Bund 3,45 % (15-oct).
- **Hallazgo clave**: OPA de exclusión de Respighi BidCo (CVC IX + GBL, con Andrea Recordati de coinversor) subida de 51,29 a 53,00 EUR el 6-oct, «definitiva»; plazo hasta el 23-oct, pago el 2-nov, reapertura posible 3-9 nov. Adhesiones del 50,39 % a 12-oct (con el 46,82 % de Rossini); umbral del 66,67 % renunciable; autorizaciones obtenidas el 7-oct. Regla 13: **retrasa** hasta el resultado definitivo de la OPA.
- **Decisiones**: EBITDA = EBIT + amortizaciones; los no recurrentes (104,1 M en 2025; 56 M en el LTM) en `no_recurrentes_en_ebitda` para llegar al EBITDA de la empresa. Consenso en base NIIF (el motor ya suma los no recurrentes). Puente a 30-jun-2026: deuda 2.260,7, arrendamientos 49,2, caja 391,4, pensiones 16,0, otros −1,4. WACC 7,53 % (beta 0,80, prima 5,5 %, adicional 0,5, Kd 3,8 %, peso de deuda 15 %). Terminal Gordon 2,0 %. Escenarios 25/50/25 (bajista −2/−2 pp y WACC +0,5, terminal 1,5 %; alcista +1,5/+1 pp). Pesos DCF 45 / comparables 15 / transacciones 15 / escenarios 25. Sobi fuera de comparables (MarketScreener devolvía otra empresa). `mercado_final` null (empresa de muchos nichos).
- **Resultado**: DCF 52,88 EUR; valor intrínseco 51,93 (−2,0 %); DCF inverso 4,8 % anual 2027-2032 (= base). Con la prima del mercado, 59,97. ROIC 2025 14,78 % frente a WACC 7,53 % (**+7,25 puntos** sin redondear; 18,5 % sin fondo de comercio). Sostenibilidad «Sí» (motor y a mano: reinversión del 5 % del NOPAT, activos ligeros). Controles 19 de 19.
- **Línea 12 m (v3 ×1,1, selector sin marcas)**: objetivo 62,73 EUR, ponderada +20,9 %, base +21,6 %, pero valor intrínseco < precio → **Mantener**, convicción media. v2: +17,7 % / +13,6 %. Límite de compra 51,93; límite robusto 50,26. Detalle en revision-12m-2026-10-16.md. No ejecutado `apuntar-12m.mjs` (lo hace el coordinador).
- **Robustez**: SÓLIDA, acción robusta «Mantener en cartera»; avisos D3 (REC.MI no está en `precios.json`/`simbolos.json`) y C1 (retrasa por la OPA).
- Próximos resultados: consejo de los 9M el 10-nov-2026, conferencia el 11-nov (recordati.com/investor-events).
- Para subir la confianza: reparto de recomendaciones de los analistas, foros de particulares (FinanzaOnline 403), múltiplos de EV/EBITDA de compras de terceros en enfermedades raras.

## Lecciones

- Italia sin ESEF completo (Recordati): la web publica los PDF en `dg0hkcpvy5xbq.cloudfront.net`; la página de informes y presentaciones de inversores los lista todos.
- Una OPA pendiente con el precio de mercado igual al de la oferta: valorar la empresa independiente, pero el veredicto de la regla 13 es «retrasa» hasta el resultado y la recomendación no puede ser Comprar.
