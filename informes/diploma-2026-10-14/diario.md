# Diario · Diploma PLC (DPLM.L) · 14-oct-2026

- Commit de partida: 7406b34 (regla v3 con tope ×1,1 vigente; v2 de control). Sin `git pull`/commit por encargo (lo hace el coordinador).
- Entorno: nube de Claude Code con red abierta. Fases 2-4 bis hechas por mí sin subagentes: `notas/construir-notas.mjs` escribe A-E; `propio.mjs` + `supuestos.mjs` + `textos.mjs`.
- Identificación: Diploma PLC, LSE DPLM, ISIN GB0001826634, LEI 2138008OGI7VYG8FGR19; NIIF del Reino Unido; ejercicio a 30-sep con etiqueta «fin»; cuentas en GBP y cotización en GBp (tipo 0,01). **FY2026 cerró el 30-sep-2026 sin avance de resultados**: la última información es la actualización del Q3 (16-jul-2026: orgánico 14 %, margen c. 26,5 %, resultado operativo +42 %); resultados FY2026 el **17-nov-2026**. FY2026e va como año fijo (el motor no cuenta su flujo).
- Cuentas: `cuentas.mjs --esef "Diploma"` (FY2021-FY2025). **Corregido**: el XBRL daba solo la deuda a largo plazo en FY2021 (188 → 206,2), FY2022 (340 → 370,6) y FY2025 (380 → 381,1); ingresos completos (cuadran con las notas). DPA del XBRL = solo el final propuesto (0,40-0,44): sustituido por el total (42,6-62,3 p). Activo y pasivo total, D&A, coste de existencias y acciones diluidas de las notas de resultados FY2021-FY2025.
- Documentos leídos: notas de resultados FY2020-FY2025, H1 2026, actualizaciones de enero, marzo y julio de 2026, transcripción del Q3, informe anual 2025 (consejo, remuneración, accionistas), 10-K 2025 de Fastenal y Grainger. Consenso de MarketScreener; comparables de Stock Analysis (WebFetch); gilt del Bank of England (5,39 %); BCE para USD/GBP.
- Decisiones:
  - **BPA estatutario** (con la amortización de intangibles comprados, ~62-84 M al año), como Halma: en un comprador en serie es recurrente. Consenso y empresa usan el ajustado (≈ 28 % mayor); se dice en el texto.
  - EBITDA = EBIT estatutario + toda la amortización; plusvalías por ventas de negocios como no recurrentes (−17,3 M en FY2025).
  - Margen: FY2026e 27,4 % EBITDA (≈ 26,5 % ajustado, guía), bajando a 26,0 % (≈ 24,5 % ajustado) por la «moderación» que anuncia la dirección. Capex 2,2 % en FY2027e y 5,2-5,4 % después (compras del 2 % anual a 1,6 veces las ventas). Circulante 19,5 %.
  - WACC 10,35 % (gilt 5,39 %, beta 0,95, prima 5,5 %). Terminal Gordon 3 %. Pesos DCF 40 / comparables 30 / escenarios 30.
  - Puente a 31-mar-2026 con `otros_ajustes` 47,5 M (pasivos por compras 38,5 M + variación estimada de la deuda neta abr-sep: CDM y otras compras ≈163 M + dividendo 26 M − caja libre ≈180 M).
  - **ROIC**: 14,4 % estatutario (motor) frente a WACC 10,35 % = **4,0 puntos**; **sin fondo de comercio ≈ 24,3 %** (199 M de NOPAT / ≈820 M) → el ROIC cae por el fondo de comercio de las compras. ROATCE de la empresa 20,9 %.
  - Sostenibilidad «En parte»: reinversión 13 % del NOPAT (prueba hecha a mano); el crecimiento se financia, el margen de partida es de pico. Ninguna prueba falla: sin rebaja del base.
  - Convicción baja (el motor sugiere media): la ponderada está a 1,9 puntos del umbral de Vender.
- Resultado: DCF 29,51 GBP; valor intrínseco 38,65 (−51,3 %); rentabilidad implícita del precio 5,9 % (DCF inverso sin solución de crecimiento: explicado). Controles 18 de 19 y 1 explicado. Cobertura 90,6 %; 39 páginas.
- **Línea 12 m (v3)**: objetivo 72,25 GBP; ponderada −8,1 %, base −0,1 % → **Mantener**; v2 +2,7 % / +8,9 %. Comprar < 38,65; vender > 80,98 GBP (8.098 GBp). Detalle en `revision-12m-2026-10-14.md`.
- Robustez: SÓLIDA; acción robusta **No mantener** (no pasa el filtro de valor intrínseco para seguir en cartera). Objeción más fuerte: el DCF castiga a un compuesto que reinvierte en compras a 8 veces el EBIT (con el PER relativo, el valor sigue por debajo del precio: 51,61-65,49).
- Ficha sectorial: `sectores/distribucion-industrial-2026-10-14.md` y `-comparables.json`.
- Tiempo: unos 45 minutos.

## Lecciones

- ESEF del Reino Unido: `cuentas.mjs` toma `NoncurrentBorrowings` cuando no hay total y pierde la deuda corriente (Diploma FY2021-22: 18-30 M); y el DPA que da es el **final propuesto**, no el total del año. Comprobar ambos con la nota de deuda neta y el resumen de resultados.
- Ejercicio a septiembre con corte en octubre: el año recién cerrado y sin publicar va `fijo` con la guía; el motor le da fracción 0, así que el puente (último balance publicado, marzo) necesita `otros_ajustes` con las compras y la caja de abril-septiembre.
